"""Archive actual reviewed artifacts and editable tooling; never manufacture success."""
import hashlib,json,os,subprocess
from pathlib import Path
from zipfile import ZIP_DEFLATED,ZipFile
ROOT=Path(__file__).resolve().parents[1]
EXCLUDED={'node_modules','.venv','deps','build','__pycache__','deliverables','.tscircuit','.git','gerber-review-venv','easyeda-baseline','eval'}
MANIFEST='evidence/revision-manifest.json'
# Preserve the prior revision identity before superseding the working manifest.
prior=ROOT/MANIFEST
if prior.exists() and not (ROOT/'evidence/R1-revision-manifest.json').exists():
 (ROOT/'evidence/R1-revision-manifest.json').write_bytes(prior.read_bytes())
for name in ['core','easyeda-converter','circuit-json','circuit-json-util']:
 p=ROOT/'tooling'/name
 (ROOT/'tooling/patches'/f'{name}.patch').write_bytes(subprocess.check_output(['git','diff','--binary'],cwd=p))
export_files=[ROOT/'dist/index/circuit.json',ROOT/'fabrication/R2-gerbers-review.zip',ROOT/'fabrication/JLCPCB-BOM.csv',ROOT/'fabrication/JLCPCB-CPL.csv']
(ROOT/'fabrication/export-manifest.json').write_text(json.dumps({'revision':'R2-review-2026-10-01','status':'BLOCKED / REVIEW ONLY','source_entry':'index.circuit.tsx','sha256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in export_files}},indent=2)+'\n')
files=[]
for folder,dirs,names in os.walk(ROOT):
 dirs[:]=sorted(d for d in dirs if d not in EXCLUDED)
 for name in sorted(names):
  p=Path(folder)/name;r=p.relative_to(ROOT).as_posix()
  if r==MANIFEST or name=='.DS_Store' or name.endswith('.diff.png'):continue
  if name.startswith('.env'):continue
  if p.is_symlink():raise RuntimeError(f'Unexpected archive symlink {r}')
  files.append((r,p))
manifest={'revision':'R2-review-2026-10-01','date':'2026-10-01','source_directory':ROOT.name,'source_commit':None,'status':'USB supplier land clearance fails; not a prototype fabrication candidate; hardware untested','routing_enabled':True,'fabrication_exports_generated':True,'fabrication_exports_approved':False,'dependency_locks':['bun.lock','tooling/core/bun.lock','tooling/easyeda-converter/bun.lock','tooling/circuit-json/bun.lock','tooling/circuit-json-util/bun.lock','firmware/toolchain.json'],'sha256':{r:hashlib.sha256(p.read_bytes()).hexdigest() for r,p in files}}
prior.write_text(json.dumps(manifest,indent=2)+'\n')
out=ROOT/'deliverables/magnetic-shutter-remote-R2-REVIEW-NOT-FOR-FABRICATION.zip'
with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=6) as z:
 for r,p in files:z.write(p,f'{ROOT.name}/{r}')
 z.write(prior,f'{ROOT.name}/{MANIFEST}')
with ZipFile(out) as z:
 assert z.testzip() is None
 for r,digest in manifest['sha256'].items():assert hashlib.sha256(z.read(f'{ROOT.name}/{r}')).hexdigest()==digest
result={'archive':str(out.relative_to(ROOT)),'files':len(files)+1,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'crc_and_all_file_hashes_verified':True}
(ROOT/'deliverables/R2-package-verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
