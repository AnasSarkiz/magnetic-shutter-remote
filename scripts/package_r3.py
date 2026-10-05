"""Archive editable R3 evidence and validated exports; refuse private credentials."""
import hashlib
import base64
import json
import os
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
REVISION = 'R3-review-2026-10-02'
MANIFEST = 'evidence/R3/revision-manifest.json'
EXCLUDED_DIRECTORIES = {
    'node_modules', '.git', '.tscircuit', '.registry-stage', '.venv',
    'gerber-review-venv', '__pycache__', 'deps', 'build', 'deliverables',
    '.codex', '.agents', '.aws', '.cache', 'coverage', '.pytest_cache',
    'site-export', 'cosmos-export', 'benchmarking-dist',
}
SECRET_PATTERN = re.compile(rb'(?:ASIA|AKIA)[A-Z0-9]{16}|(?:ghp_|github_pat_|sk-proj-)[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY')


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def is_embedded_wasm_match(contents, match):
    """Distinguish random base64 bytes from actual credential string fields."""
    start = max(contents.rfind(quote,0,match.start()) for quote in (b'"',b"'",b'`'))
    if start < 0:
        return False
    end = contents.find(contents[start:start+1],match.end())
    if end < 0:
        return False
    encoded = contents[start+1:end]
    prefix = b'data:application/wasm;base64,'
    if encoded.startswith(prefix):
        encoded = encoded[len(prefix):]
    if not encoded.startswith(b'AGFzb'):
        return False
    try:
        decoded = base64.b64decode(encoded,validate=True)
    except ValueError:
        return False
    return decoded[:8] == b'\x00asm\x01\x00\x00\x00'


def curated_files(root):
    included = []
    excluded = []
    for folder, directories, names in os.walk(root):
        directories[:] = sorted(name for name in directories if name not in EXCLUDED_DIRECTORIES)
        for name in sorted(names):
            path = Path(folder) / name
            relative = path.relative_to(root).as_posix()
            if relative == MANIFEST or name == '.DS_Store' or name.endswith('.pyc'):
                continue
            if name.startswith('.env') or name in {'.npmrc','.netrc','credentials','config.json'} and '/.aws/' in relative:
                excluded.append({'path':relative,'reason':'private configuration'})
                continue
            if name == '.npmrc':
                excluded.append({'path':relative,'reason':'package account configuration'})
                continue
            if name.endswith('.html') and relative.startswith(('references/','evidence/')):
                excluded.append({'path':relative,'reason':'raw page may contain signed asset access; qualified public inputs retained separately'})
                continue
            if relative.startswith('tooling/') and '/dist/' in relative and relative != 'tooling/runframe/dist/standalone.min.js':
                continue
            if relative.startswith('tooling/runframe/dist/') and relative != 'tooling/runframe/dist/standalone.min.js':
                continue
            if path.is_symlink():
                raise ValueError(f'Unexpected symlink in curated package: {relative}')
            contents = path.read_bytes()
            if any(not is_embedded_wasm_match(contents,match) for match in SECRET_PATTERN.finditer(contents)):
                raise ValueError(f'Credential-like material requires explicit exclusion: {relative}')
            included.append((relative,path))
    return included,excluded


def create_archive(root):
    actual_circuit = root/'dist/index/circuit.json'
    if (root/'review.circuit.json').read_bytes() != actual_circuit.read_bytes():
        raise ValueError('Native viewer copy differs from validated build')
    manufacturing = json.loads((root/'evidence/R3/routed-manufacturing-33.json').read_text())
    cam = json.loads((root/'evidence/R3/final-cam-readback/readback.json').read_text())
    if manufacturing['failures'] or cam['manufacturing_failures'] or cam['design_errors']:
        raise ValueError('Final source/CAM evidence does not support routed-review status')
    gerbers = root/'fabrication/R3-gerbers-review.zip'
    if sha256(actual_circuit)!=cam['circuit_sha256'] or sha256(gerbers)!=cam['archive_sha256']:
        raise ValueError('Reviewed circuit/export hashes differ from actual final files')
    export_files = [actual_circuit,gerbers,root/'fabrication/JLCPCB-BOM.csv',root/'fabrication/JLCPCB-CPL.csv',root/'dist/index/board.glb',root/'index.circuit.tsx',root/'src/remote-circuit.tsx',root/'package.json',root/'bun.lock',*sorted((root/'src').glob('*')), *sorted((root/'imports').glob('*.tsx'))]
    export_manifest = {'revision':REVISION,'status':'REVIEW ONLY / ASSEMBLY PROCESS BLOCKED','source_commit':None,'routing_attempt':33,'source_entry':'index.circuit.tsx','all_fitted_components_top':37,'complete_original_cam_readback':True,'approved_for_fabrication':False,'pending':['expanded USB copper-land acceptance','qualified stencil','USB shell soldering','legend CAM','panel/fixture','assembler placement registration','physical battery/thermal/RF/fit/phone tests'],'sha256':{str(path.relative_to(root)):sha256(path) for path in export_files if path.is_file()}}
    (root/'fabrication/export-manifest.json').write_text(json.dumps(export_manifest,indent=2)+'\n')
    files,exclusions = curated_files(root)
    exclusion_path=root/'evidence/R3/package-exclusions.json'
    exclusion_path.write_text(json.dumps({'excluded_directories':sorted(EXCLUDED_DIRECTORIES),'excluded_files':exclusions,'scope':'No credentials/private account metadata/dependency caches. Original raw footprint JSON, source imports, failing inputs and qualified sourcing JSON remain included.'},indent=2)+'\n')
    files=[(relative,path) for relative,path in files if relative != str(exclusion_path.relative_to(root))]
    files.append((str(exclusion_path.relative_to(root)),exclusion_path))
    files.sort()
    manifest={'revision':REVISION,'date':'2026-10-02','source_directory':root.name,'source_commit':None,'status':'Routed single-top-face engineering/assembly review; not a prototype fabrication candidate','electrical_native_and_copper_software_checks_passed':True,'complete_cam_fidelity_checks_passed':True,'fabrication_process_approved':False,'hardware_tested':False,'routing_enabled':True,'tooling_sources_and_locks_included':True,'sha256':{relative:sha256(path) for relative,path in files}}
    (root/MANIFEST).write_text(json.dumps(manifest,indent=2)+'\n')
    out=root/'deliverables/magnetic-shutter-remote-R3-REVIEW-NOT-FOR-FABRICATION.zip'
    out.parent.mkdir(exist_ok=True)
    with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=6) as archive:
        for relative,path in files:
            archive.write(path,f'{root.name}/{relative}')
        archive.write(root/MANIFEST,f'{root.name}/{MANIFEST}')
    with ZipFile(out) as archive:
        if archive.testzip() is not None:
            raise ValueError('Archive CRC verification failed')
        for relative,digest in manifest['sha256'].items():
            if hashlib.sha256(archive.read(f'{root.name}/{relative}')).hexdigest()!=digest:
                raise ValueError(f'Archive file changed: {relative}')
        if hashlib.sha256(archive.read(f'{root.name}/{MANIFEST}')).hexdigest()!=sha256(root/MANIFEST):
            raise ValueError('Revision manifest mismatch')
    result={'archive':str(out.relative_to(root)),'revision':REVISION,'files':len(files)+1,'bytes':out.stat().st_size,'sha256':sha256(out),'all_file_hashes_and_crc_verified':True,'status':manifest['status']}
    (root/'deliverables/R3-package-verification.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))


if __name__=='__main__':
    create_archive(ROOT)
