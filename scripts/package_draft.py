"""Create an identified draft archive; never include SDKs, caches or fabricate outputs."""
import hashlib
import json
import os
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'node_modules', '.venv', 'deps', 'build', '__pycache__', 'deliverables', '.tscircuit', '.git'}
FILES = []
for folder, directories, filenames in os.walk(ROOT):
    directories[:] = sorted(name for name in directories if name not in EXCLUDED)
    for filename in sorted(filenames):
        path = Path(folder) / filename
        relative = path.relative_to(ROOT).as_posix()
        if relative == 'evidence/revision-manifest.json' or filename == '.DS_Store':
            continue
        if filename.startswith('.env'):
            raise RuntimeError('Environment file must not enter the deliverable')
        FILES.append((relative, path))
manifest = {
    'revision': 'R1-qualification-draft',
    'date': '2026-10-01',
    'status': 'Incomplete; blocked before routing; not manufacturing-ready; no physical testing',
    'source_commit': None,
    'source_directory': ROOT.name,
    'routing_enabled': False,
    'fabrication_exports_generated': False,
    'dependencies': {'board': 'bun.lock', 'firmware': 'firmware/toolchain.json'},
    'sha256': {relative: hashlib.sha256(path.read_bytes()).hexdigest() for relative, path in FILES},
}
manifest_path = ROOT / 'evidence/revision-manifest.json'
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
archive_path = ROOT / 'deliverables/magnetic-shutter-remote-R1-DRAFT.zip'
with ZipFile(archive_path, 'w', ZIP_DEFLATED) as archive:
    for relative, path in FILES:
        archive.write(path, f'{ROOT.name}/{relative}')
    archive.write(manifest_path, f'{ROOT.name}/evidence/revision-manifest.json')
with ZipFile(archive_path) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(FILES) + 1
    for relative, digest in manifest['sha256'].items():
        assert hashlib.sha256(archive.read(f'{ROOT.name}/{relative}')).hexdigest() == digest
print(f'Archive verified: {len(FILES)+1} files, {archive_path.stat().st_size} bytes')
print(f'Archive SHA-256: {hashlib.sha256(archive_path.read_bytes()).hexdigest()}')
