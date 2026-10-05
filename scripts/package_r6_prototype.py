"""Curated, hash-verified engineering-prototype archive; no external upload."""
import argparse,hashlib,json,subprocess,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--inventory-only',action='store_true');args=parser.parse_args()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for filename in ['suite-exits.json','output-suite.json']:
 rows=json.loads((ROOT/'evidence/R6'/filename).read_text());assert rows and all(r['exit']==0 for r in rows),filename
previews=json.loads((ROOT/'evidence/R6/current-preview-outputs.json').read_text())
for name,expected in previews['outputs'].items():assert sha(ROOT/'dist/index'/name)==expected,name
circuit=ROOT/'dist/index/circuit.json';manufacturing=json.loads((ROOT/'evidence/R6/manufacturing-review.json').read_text());assert manufacturing['circuit_sha256']==sha(circuit);assert len(manufacturing['assembly'])==37 and len(manufacturing['usb_paste'])==16 and len(manufacturing['usb_shells'])==4
assert not manufacturing['paste']['problems'] and not manufacturing['paste']['merged_pairs']
subprocess.run(['python3','scripts/check-r6-preservation.py'],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
selected=set()
def add(path):
 p=ROOT/path
 if p.is_file():selected.add(p.relative_to(ROOT).as_posix())
 else:raise FileNotFoundError(p)
def tree(path,extensions=None):
 for p in (ROOT/path).rglob('*'):
  relative=p.relative_to(ROOT)
  if any(part in ['node_modules','.git','__pycache__','.venv','deps','build','.registry-stage'] for part in relative.parts):continue
  if p.is_file() and (extensions is None or p.suffix in extensions):selected.add(relative.as_posix())
for path in ['index.circuit.tsx','package.json','bun.lock','tsconfig.json','tscircuit.config.json','README.md','VALIDATION.md','REQUIREMENTS.md','EXTERNAL-PARTS.md','BOM.md','BOM.csv','bom.json','R6-CHANGES.md','R6-QUALIFICATION.md']:add(path)
for path in ['src','imports','scripts','tests','preview','__snapshots__','dist/index','fabrication/R6','mechanical','references','tscircuit-issues','evidence/R6','evidence/R4','evidence/R4-qualification','evidence/R5','fabrication/R4']:tree(path)
# Historical R1/R2 issue inputs needed by preserved reports; no old delivery ZIPs.
for path in ['evidence/R1-original-imports','evidence/R2']:tree(path)
for path in ['firmware/README.md','firmware/CMakeLists.txt','firmware/prj.conf','firmware/build.sh','firmware/toolchain.json','firmware/requirements-lock.txt']:add(path)
for path in ['firmware/src','firmware/boards','firmware/artifacts']:tree(path)
for path in ['tooling/gerber-review-requirements.txt','tooling/R6-README.md','tooling/revisions-r5.json']:add(path)
tree('tooling/source-archives')
manifest=json.loads((ROOT/'evidence/R6/toolchain-manifest.json').read_text())
for path in manifest['locked_vendor_archives']:add(path)
add('tooling/vendor/schematic-trace-solver-0.0.217.tgz')
q='evidence/USB4215-import-audit'
for p in (ROOT/q).iterdir():
 if p.is_file() and p.suffix in ['.md','.json','.py','.sha256']:add(p.relative_to(ROOT))
for directory in ['inputs','baseline','corrected','final','logs','patches','fixture','tscircuit-issues','vendor','external-process-review']:
 tree(q+'/'+directory)
# Source archives are included; developer source/dependency checkouts are not.
for p in (ROOT/q/'source-bases').glob('*.tar.gz'):
 if 'before-final-test-review' not in p.name:add(p.relative_to(ROOT))
for p in (ROOT/q/'handbook').glob('*.md'):add(p.relative_to(ROOT))
add('evidence/circuit-schema-issues.json')
# No account communication, credentials or assembler upload data in the release.
selected={p for p in selected if not any(part in ['outbound','responses','external-communications'] for part in Path(p).parts) and not p.endswith('.DS_Store') and p!='evidence/R6/package-file-inventory.json' and not (p.startswith('dist/index/') and (Path(p).name.startswith('final-') or Path(p).name=='board.glb'))}
assert not any('/node_modules/' in p or '/.git/' in p or Path(p).name.startswith('.env') for p in selected)
assert all('dist/index/'+name in selected for name in previews['outputs'])
assert not any('dist/index/'+name in selected for name in previews['excluded_legacy_files'])
files={p:{'bytes':(ROOT/p).stat().st_size,'sha256':sha(ROOT/p)} for p in sorted(selected)}
(ROOT/'evidence/R6/package-file-inventory.json').write_text(json.dumps(files,indent=2)+'\n')
print('Inventory',len(files),'files,',sum(e['bytes'] for e in files.values()),'bytes')
if args.inventory_only:raise SystemExit()
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip();branch=subprocess.check_output(['git','branch','--show-current'],cwd=ROOT,text=True).strip()
tracked=set(subprocess.check_output(['git','ls-files','-z'],cwd=ROOT).decode().split('\0'))
assert set(files)<=tracked, 'Package contains uncommitted/untracked inputs'
changed=set(subprocess.check_output(['git','diff','--name-only','HEAD','-z'],cwd=ROOT).decode().split('\0'))
assert not set(files)&changed, 'Package inputs differ from source commit'
source_manifest={'label':'ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED','board_source_commit':commit,'branch':branch,'circuit_sha256':sha(circuit),'prototype_risk':'PROTOTYPE MANUAL REWORK MAY BE REQUIRED FOR FOUR USB SHELL ANCHORS','production_process_qualification':'PENDING','physical_validation':'POST-PROTOTYPE PHYSICAL VALIDATION','files':files}
archive=ROOT/'deliverables/magnetic-shutter-remote-R6-PROTOTYPE.zip';prefix='magnetic-shutter-remote-R6-PROTOTYPE/'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted(files):z.write(ROOT/p,prefix+p)
 z.writestr(prefix+'RELEASE-MANIFEST.json',json.dumps(source_manifest,indent=2)+'\n')
 z.writestr(prefix+'MANIFEST.sha256',''.join(f"{e['sha256']}  {p}\n" for p,e in files.items()))
failures=[]
with zipfile.ZipFile(archive) as z:
 for p,e in files.items():
  with z.open(prefix+p) as stream:
   digest=hashlib.sha256()
   while block:=stream.read(1024*1024):digest.update(block)
  if digest.hexdigest()!=e['sha256']:failures.append(p)
 if z.testzip() is not None:raise ValueError('ZIP CRC failure')
assert not failures
result={'archive':str(archive),'sha256':sha(archive),'bytes':archive.stat().st_size,'entries':len(files)+2,'source_commit':commit,'branch':branch,'payload_hashes_verified':len(files),'mismatches':failures,'status':'ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED'}
(ROOT/'deliverables/R6-package-verification.json').write_text(json.dumps(result,indent=2)+'\n');(ROOT/'deliverables/magnetic-shutter-remote-R6-PROTOTYPE.zip.sha256').write_text(result['sha256']+'  '+archive.name+'\n');print(json.dumps(result,indent=2))
