"""Freeze exact tool/source/archive identities and readable local reproduce steps."""
import hashlib,json,subprocess,tarfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'tooling/source-archives';out.mkdir(exist_ok=True)
projects=['circuit-json-to-pnp-csv','cli','eval','runframe'];repos=[]
for name in projects:
 directory=ROOT/'tooling'/name
 commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=directory,text=True).strip();branch=subprocess.check_output(['git','branch','--show-current'],cwd=directory,text=True).strip();files=subprocess.check_output(['git','ls-files','-z'],cwd=directory).decode().split('\0')
 archive=out/f'{name}-R6-source.tar.gz'
 with tarfile.open(archive,'w:gz') as t:
  for relative in files:
   p=directory/relative
   if p.is_file() and not any(x in ['node_modules','.git','dist'] for x in p.relative_to(directory).parts):t.add(p,arcname=relative,recursive=False)
 diff=subprocess.check_output(['git','diff','HEAD','--'],cwd=directory);patch=out/f'{name}-R6-working.patch';patch.write_bytes(diff)
 repos.append({'repository':name,'directory':str(directory.relative_to(ROOT)),'branch':branch,'commit':commit,'working_patch':str(patch.relative_to(ROOT)),'source_archive':str(archive.relative_to(ROOT)),'source_archive_sha256':hashlib.sha256(archive.read_bytes()).hexdigest()})
packages={}
for name in ['tscircuit','@tscircuit/cli','@tscircuit/core','@tscircuit/props','@tscircuit/checks','@tscircuit/capacity-autorouter','@tscircuit/eval','@tscircuit/circuit-json-util','circuit-json','circuit-to-svg','circuit-json-to-gerber','circuit-json-to-pnp-csv','easyeda','typescript','@resvg/resvg-js','archiver','commander']:
 p=ROOT/'node_modules'/name/'package.json';packages[name]=json.loads(p.read_text())['version']
manifest={'scope':'R6 engineering prototype, local-only tooling. No general upstream/full-suite release claim.','bun':subprocess.check_output(['bun','--version'],text=True).strip(),'installed_versions':packages,'local_sources':repos,'locked_vendor_archives':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in (ROOT/'tooling/vendor').glob('*.tgz') if p.name.endswith('qualified-source.tgz') or p.name in ['circuit-json-to-pnp-csv-0.0.19.tgz','tscircuit-eval-0.0.1506.tgz','tscircuit-cli-0.1.2237.tgz']},'qualified_importer_history':'evidence/USB4215-import-audit/frozen-toolchain-history.json','dependency_locks':{'bun.lock':hashlib.sha256((ROOT/'bun.lock').read_bytes()).hexdigest(),'tooling/cli/bun.lock':hashlib.sha256((ROOT/'tooling/cli/bun.lock').read_bytes()).hexdigest()}}
(ROOT/'evidence/R6/toolchain-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print('R6 tooling source/archives/manifests recorded')
