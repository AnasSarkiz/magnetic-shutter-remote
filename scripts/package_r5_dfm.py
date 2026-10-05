"""Create a full editable R5 DFM review archive; never grant fabrication approval."""
import hashlib,importlib.util,json,re,sys
from pathlib import Path
from zipfile import ZIP_DEFLATED,ZipFile
ROOT=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
spec=importlib.util.spec_from_file_location('package_review',ROOT/'scripts/package_r3.py');p=importlib.util.module_from_spec(spec);sys.modules[spec.name]=p;spec.loader.exec_module(p)
summary=json.loads((ROOT/'evidence/R5/qualification-summary.json').read_text())
cam=json.loads((ROOT/'evidence/R5/cam-readback/readback.json').read_text())
assert summary['fabrication_candidate'] is False and summary['software_suite_checks']==24 and not summary['failed_checks']
assert not json.loads((ROOT/'evidence/R5/copper-audit.json').read_text())['failures']
assert not cam['manufacturing_failures'] and not cam['design_errors']
assert cam['circuit_sha256']==sha(ROOT/'dist/index/circuit.json')
assert cam['archive_sha256']==sha(ROOT/'fabrication/R5/R5-gerbers-review.zip')
assert (ROOT/'review.circuit.json').read_bytes()==(ROOT/'dist/index/circuit.json').read_bytes()
assert json.loads((ROOT/'evidence/R5/registration.json').read_text())['coverage']==37
assert len(list((ROOT/'tscircuit-issues').glob('[0-9][0-9][0-9]-*.md')))==52
assert re.search(r'Ran 51 tests.*\n\nOK',(ROOT/'evidence/R5/suite-tests.log').read_text(),re.S)
assert json.loads((ROOT/'evidence/R5/R4-preservation-check.json').read_text())['status']=='PASS'
# A copied R4 state is evidence, not this revision's current output.
inputs=[ROOT/'index.circuit.tsx',ROOT/'package.json',ROOT/'bun.lock',ROOT/'tsconfig.json',ROOT/'tscircuit.config.json',ROOT/'bom.json',*sorted((ROOT/'src').glob('*')), *sorted((ROOT/'imports').glob('*.tsx'))]
source_hashes={str(f.relative_to(ROOT)):sha(f) for f in inputs if f.is_file()}
identity=hashlib.sha256(json.dumps(source_hashes,sort_keys=True).encode()).hexdigest()
export={'revision':'R5-DFM-REVIEW','source_baseline_commit':summary['source_baseline_commit'],'source_commit':None,'source_identity_sha256':identity,'fabrication_candidate':False,'pre_fabrication_open':summary['pre_fabrication_open'],'post_prototype_physical_validation':summary['post_prototype_physical_validation'],'circuit_sha256':cam['circuit_sha256'],'archive_sha256':cam['archive_sha256'],'source_inputs':source_hashes,'outputs':{str(f.relative_to(ROOT)):sha(f) for f in sorted((ROOT/'fabrication/R5').iterdir()) if f.is_file() and f.name!='export-manifest.json'}}
(ROOT/'fabrication/R5/export-manifest.json').write_text(json.dumps(export,indent=2)+'\n')
files,excluded=p.curated_files(ROOT)
manifest_path='evidence/R5/revision-manifest.json'
files=[(rel,f) for rel,f in files if rel not in [manifest_path,'evidence/R5/package-exclusions.json']]
exclusions={'excluded_directories':sorted(p.EXCLUDED_DIRECTORIES),'excluded_files':excluded,'scope':'No credentials, account metadata, unrelated files, installed caches, SDK downloads or Git data. Full tool source/tests/fixtures/locks and versioned prebuilt archives retained. Raw signed page HTML excluded; raw supplier footprint JSON and public manufacturer drawings retained.'}
ex_path=ROOT/'evidence/R5/package-exclusions.json';ex_path.write_text(json.dumps(exclusions,indent=2)+'\n');files.append(('evidence/R5/package-exclusions.json',ex_path));files.sort()
manifest={'revision':'R5-DFM-REVIEW','source_baseline_commit':summary['source_baseline_commit'],'source_identity_sha256':identity,'source_commit':None,'fabrication_candidate':False,'hardware_tested':False,'qualification_summary':'evidence/R5/qualification-summary.json','pre_fabrication_open':summary['pre_fabrication_open'],'post_prototype_physical_validation':summary['post_prototype_physical_validation'],'sha256':{rel:sha(f) for rel,f in files}}
(ROOT/manifest_path).write_text(json.dumps(manifest,indent=2)+'\n');files.append((manifest_path,ROOT/manifest_path))
archive_path=ROOT/'deliverables/magnetic-shutter-remote-R5-DFM-REVIEW.zip';archive_path.parent.mkdir(exist_ok=True)
if archive_path.exists():raise ValueError('Preserve an existing review archive instead of overwriting it')
with ZipFile(archive_path,'w',ZIP_DEFLATED,compresslevel=6) as archive:
 for relative,f in files:archive.write(f,relative)
with ZipFile(archive_path) as archive:
 if archive.testzip():raise ValueError('Archive CRC failure')
 for relative,digest in manifest['sha256'].items():
  if hashlib.sha256(archive.read(relative)).hexdigest()!=digest:raise ValueError('Archive hash mismatch: '+relative)
 if archive.read(manifest_path)!=(ROOT/manifest_path).read_bytes():raise ValueError('Revision manifest mismatch')
result={'archive':str(archive_path.relative_to(ROOT)),'sha256':sha(archive_path),'files':len(files),'bytes':archive_path.stat().st_size,'all_file_hashes_and_crc_verified':True,'fabrication_candidate':False,'source_identity_sha256':identity,'issue_reports':52}
(ROOT/'deliverables/R5-package-verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
