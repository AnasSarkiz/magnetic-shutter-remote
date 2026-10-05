"""Package verified R4 review evidence only; never grant fabrication approval."""
import hashlib
import importlib.util
import json
import re
import subprocess
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'deliverables/magnetic-shutter-remote-R4-DFM-REVIEW.zip'
SECRET=re.compile(rb'(?:ghp_|github_pat_|sk-proj-)[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|(?:AKIA|ASIA)[A-Z0-9]{16}')


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def collect_files():
    paths=[]
    for directory in ['fabrication/R4','evidence/R4','imports','src']:
        paths.extend(p for p in (ROOT/directory).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
    paths.extend(ROOT/p for p in [
        'index.circuit.tsx','package.json','bun.lock','tsconfig.json','tscircuit.config.json',
        'BOM.csv','BOM.md','bom.json','SOURCING.md','R4-CHANGES.md','PHONE-TEST-PROCEDURE.md','EXTERNAL-PARTS.md',
        'fabrication/USB-FOOTPRINT-REVIEW.md','fabrication/STENCIL-REVIEW.md','fabrication/ASSEMBLY-REVIEW.md',
        'fabrication/BOM-CPL-REVIEW.md','fabrication/LEGEND-REVIEW.md','fabrication/FABRICATION-NOTES-R4.md',
        'fabrication/assembly-process-review.svg','fabrication/assembly-process-review.png',
        'references/C2894893-manufacturer.pdf','references/BQ25185.pdf',
        'mechanical/R3-dimensioned-drawings.pdf','mechanical/dimensions.json','mechanical/remote-and-grip.scad','mechanical/README.md',
        'tscircuit-issues/README.md','tscircuit-issues/STATUS-R4.md',
        'evidence/R3/C2894893.raweasy.json','evidence/R3/C2894893-supported-import.log','evidence/R3/HCTL-sourcing-oct2.json',
        'evidence/R3/legend-source-measurements.json','evidence/R2/ELECTRICAL-QUALIFICATION.md',
        'tooling/revisions.json','tooling/README.md','tooling/gerber-review-requirements.txt',
        'dist/index/circuit.json','dist/index/pcb.png','dist/index/pcb.svg','dist/index/pcb-bottom.svg','dist/index/3d.png',
        'scripts/review-r4-manufacturing.py','scripts/write-r4-reviews.py','scripts/render-legend-review.py',
        'scripts/render-final-cam.py','scripts/draw-r4-assembly.py','scripts/package_r4_dfm.py','scripts/validate-r4.sh',
        'scripts/manufacturing-audit.py','scripts/review-r3-exports.py','scripts/check-routed.ts','scripts/export-assembly.ts',
        'tests/test_r4_review.py','tests/test_design_contract.py','tests/test_manufacturing_audit.py','tests/test_export_readback.py',
    ])
    paths.extend((ROOT/'tscircuit-issues').glob('[0-9][0-9][0-9]-*.md'))
    return sorted(set(paths))


def verify_inputs():
    cam=json.loads((ROOT/'evidence/R4/cam-readback/readback.json').read_text())
    audit=json.loads((ROOT/'evidence/R4/copper-audit.json').read_text())
    detail=json.loads((ROOT/'evidence/R4/manufacturing-review.json').read_text())
    if cam['circuit_sha256']!=sha256(ROOT/'dist/index/circuit.json') or cam['archive_sha256']!=sha256(ROOT/'fabrication/R4/R4-gerbers-review.zip'):
        raise ValueError('Stale source/CAM evidence')
    if audit['failures'] or cam['design_errors'] or detail['paste']['problems'] or detail['paste']['merged_pairs']:
        raise ValueError('Source/export geometric checks fail')
    if len(detail['assembly'])!=37 or any(row['side']!='TOP' or row['assembly_excluded'] for row in detail['assembly']):
        raise ValueError('Assembly coverage mismatch')
    tests=(ROOT/'evidence/R4/tests-final.log').read_text()
    if not re.search(r'Ran 35 tests.*\n\nOK',tests,re.S):
        raise ValueError('Final test evidence missing')
    if not re.search(r'\b0\s+errors\b',(ROOT/'evidence/R4/native-viewer.txt').read_text()):
        raise ValueError('Native zero-error viewer evidence absent')
    return cam


def main():
    cam=verify_inputs()
    commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    branch=subprocess.check_output(['git','branch','--show-current'],cwd=ROOT,text=True).strip()
    if branch!='r4-manufacturing-review' or commit=='4086a414991cca2f92d4f72fd97088c9022f1517':
        raise ValueError('R4 review changes must be committed on the R4 branch before packaging')
    preserved=json.loads((ROOT/'evidence/R4/R3-preservation.json').read_text())
    r3=ROOT/'deliverables/magnetic-shutter-remote-R3-REVIEW-NOT-FOR-FABRICATION.zip'
    if sha256(r3)!=preserved['files'][str(r3.relative_to(ROOT))]:
        raise ValueError('Original R3 package changed')
    provenance={'branch':branch,'review_commit':commit,'R3_baseline_commit':'4086a414991cca2f92d4f72fd97088c9022f1517',
                'no_preexisting_git_commit':True,'scope':'Local commits only; no push/publication'}
    (ROOT/'evidence/R4/git-revisions.json').write_text(json.dumps(provenance,indent=2)+'\n')
    manifests={'revision':'R4 DFM REVIEW ONLY','fabrication_candidate':False,'physical_validation':'PENDING / NOT RUN',
               'ordering_blockers':['USB supplier land qualification','USB solder profile for secondary manual shell joints','Qualified stencil/apertures','Functional legend','Assembly setup/registration'],
               'git':provenance,'current_circuit_sha256':cam['circuit_sha256'],'supported_gerber_archive_sha256':cam['archive_sha256'],
               'files':{str(p.relative_to(ROOT)):sha256(p) for p in sorted((ROOT/'fabrication/R4').glob('*')) if p.is_file() and p.name!='export-manifest.json'},
               'electronic_sources':{str(p.relative_to(ROOT)):sha256(p) for p in [ROOT/'index.circuit.tsx',*sorted((ROOT/'src').glob('*.tsx')),*sorted((ROOT/'imports').glob('*.tsx'))]}}
    (ROOT/'fabrication/R4/export-manifest.json').write_text(json.dumps(manifests,indent=2)+'\n')
    paths=collect_files()
    package_files={}
    for path in paths:
        if not path.exists() or path.is_symlink():
            raise ValueError(f'Missing or unqualified file {path.relative_to(ROOT)}')
        contents=path.read_bytes()
        if SECRET.search(contents):
            raise ValueError(f'Credential-like content requires review: {path.relative_to(ROOT)}')
        package_files[str(path.relative_to(ROOT))]=hashlib.sha256(contents).hexdigest()
    package_manifest=dict(manifests,package_files=package_files,scope='DFM manufacturing preview and R4 evidence; full legacy tool source and issue evidence retained in original R3 editable package',
                          R3_editable_package_sha256=sha256(r3))
    readme='''# Magnetic shutter remote R4 — DFM / assembly review only

NOT APPROVED FOR FABRICATION. NO FABRICATION CANDIDATE.

The circuit, placement, copper, imports, firmware and mechanics are unchanged
from R3. Fresh supported outputs are in fabrication/R4/ (all12 Gerbers/drills,
strict37-row TOP BOM/CPL and the assembly drawing). Read the five fabrication
review documents and FABRICATION-NOTES-R4.md before considering submission.

All35 tests and software/export geometric checks pass. Qualified USB land/profile,
stencil, functional legend and setup/registration decisions remain open. Physical
battery/thermal/RF/fit/phone/runtime tests are PENDING / NOT RUN after prototype
arrival, and do not alone block first prototype fabrication.

No supplier was contacted, file uploaded, order placed or package published.
This ZIP contains R4 preview/evidence and an editable source subset, not a new
full SDK/tool-source distribution. All42 issue reports are retained; full older
issue evidence, dependency/tool sources and compiled firmware remain in the
original R3 editable package whose SHA is recorded in R4-PACKAGE-MANIFEST.json.
Some historical links in retained sourcing/issue reports require that package.
Current DFM review documents resolve against this ZIP's included paths.

Canonical board tool versions remain locked to R3. Reproduce in the existing
project with sh scripts/validate-r4.sh; scripts/render-legend-review.py attributes
original text through canonical CLI without patching fabrication geometry.
'''
    OUT.parent.mkdir(exist_ok=True)
    with ZipFile(OUT,'w',ZIP_DEFLATED,compresslevel=6) as archive:
        archive.writestr('README.md',readme)
        archive.writestr('R4-PACKAGE-MANIFEST.json',json.dumps(package_manifest,indent=2)+'\n')
        for path in paths:
            archive.write(path,str(path.relative_to(ROOT)))
    with ZipFile(OUT) as archive:
        if archive.testzip():raise ValueError('Archive CRC failure')
        for name,digest in package_files.items():
            if hashlib.sha256(archive.read(name)).hexdigest()!=digest:
                raise ValueError(f'Archive hash mismatch: {name}')
    result={'path':str(OUT),'bytes':OUT.stat().st_size,'sha256':sha256(OUT),'included_files':len(package_files)+2,
            'all_file_hashes_verified':True,'archive_crc_verified':True,'fabrication_candidate':False,'git':provenance}
    (ROOT/'deliverables/R4-package-verification.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))


if __name__=='__main__':
    main()
