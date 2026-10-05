"""Stage the existing project for tsci push without SDKs, caches or unrelated repos."""
import hashlib,json,shutil
from pathlib import Path
root=Path(__file__).resolve().parents[1]
stage=root/'.registry-stage'
if stage.exists():raise RuntimeError('Existing staging folder: inspect before replacing')
stage.mkdir()
files=['index.circuit.tsx','package.json','bun.lock','tsconfig.json','tscircuit.config.json','README.md','VALIDATION.md','REQUIREMENTS.md','SOURCING.md','EXTERNAL-PARTS.md','PHONE-TEST-PROCEDURE.md','BOM.csv','BOM.md','bom.json']
for name in files:shutil.copy2(root/name,stage/name)
for name in ['src','imports','dist','mechanical','references','fabrication','scripts','tests','__snapshots__']:
 shutil.copytree(root/name,stage/name,ignore=shutil.ignore_patterns('__pycache__'))
shutil.copytree(root/'firmware',stage/'firmware',ignore=shutil.ignore_patterns('.venv','deps','build','.west','__pycache__'))
(stage/'tooling').mkdir()
for name in ['vendor','patches']:shutil.copytree(root/'tooling'/name,stage/'tooling'/name)
for name in ['README.md','revisions.json','gerber-review-requirements.txt']:shutil.copy2(root/'tooling'/name,stage/'tooling'/name)
# Preserve editable corrected source and tests, excluding bulky unrelated baselines/snapshots.
for name in ['core','easyeda-converter','circuit-json','circuit-json-util']:
 source=root/'tooling'/name;destination=stage/'tooling'/name;destination.mkdir()
 for child in source.iterdir():
  if child.is_file() and not child.name.startswith('.') and child.suffix in ['.json','.ts','.md','.toml','.lock']:
   shutil.copy2(child,destination/child.name)
 for directory in ['lib','src','cli']:
  if (source/directory).is_dir():shutil.copytree(source/directory,destination/directory)
 revisions=json.loads((root/'tooling/revisions.json').read_text())[name]
 for relative in revisions['untracked_source_files']:
  original=source/relative
  if original.is_file() and relative.startswith('tests/'):
   target=destination/relative;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(original,target)
(stage/'evidence/R2').mkdir(parents=True)
for source in (root/'evidence/R2').iterdir():
 if source.is_file():shutil.copy2(source,stage/'evidence/R2'/source.name)
shutil.copytree(root/'evidence/R1-original-imports',stage/'evidence/R1-original-imports')
(stage/'REGISTRY-CONTENTS.md').write_text('''# Registry review package\n\nThis is the existing R2 tscircuit project initialized and pushed at the user’s request. Circuit sources and imports are copied byte-for-byte. Locked corrected package archives, local patches/source/new regression tests, firmware, drawings, previews and failure evidence are included. Full unrelated upstream test assets, archived delivery ZIPs, dependency folders and SDKs remain in the local R2 workspace/archive. Restore upstream test baselines at tooling/revisions.json commits when running whole-repository suites.\n\nNOT FOR FABRICATION: USB C5184243 clearance fails. Hardware untested. Registry publication does not change validation status.\n''')
entries={str(p.relative_to(stage)):hashlib.sha256(p.read_bytes()).hexdigest() for p in stage.rglob('*') if p.is_file()}
(stage/'registry-source-manifest.json').write_text(json.dumps({'status':'private untested review prototype; fabrication blocked','sha256':entries},indent=2)+'\n')
print(len(entries),'files',sum(p.stat().st_size for p in stage.rglob('*') if p.is_file()),'bytes')
