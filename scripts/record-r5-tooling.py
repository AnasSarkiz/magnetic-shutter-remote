"""Record exact local tool sources, patches, regression fixtures and archives."""
from pathlib import Path
import subprocess,json,hashlib
ROOT=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
r=json.loads((ROOT/'tooling/revisions-r5.json').read_text())
for name in ['core','props','circuit-json','easyeda-converter','circuit-json-to-gerber','eval','runframe']:
 folder=ROOT/'tooling'/name
 patch=ROOT/'tooling/patches'/(name+'-r5.patch');patch.write_bytes(subprocess.check_output(['git','diff','--binary'],cwd=folder))
 lock=folder/'bun.lock'
 previous=r.get(name,{})
 previous.update({'version':json.loads((folder/'package.json').read_text())['version'],'base_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=folder,text=True).strip(),'source_directory':str(folder.relative_to(ROOT)),
 'changed_source_files':subprocess.check_output(['git','diff','--name-only'],cwd=folder,text=True).splitlines(),
 'new_source_files':subprocess.check_output(['git','ls-files','--others','--exclude-standard'],cwd=folder,text=True).splitlines(),
 'lock_sha256':sha(lock) if lock.exists() else None,'patch_sha256':sha(patch)})
 r[name]=previous
r['working_archives']={str(f.relative_to(ROOT)):sha(f) for f in (ROOT/'tooling/vendor').glob('*r5*.tgz')}
r['viewer_standalone_sha256']=sha(ROOT/'tooling/runframe/dist/standalone.min.js')
r['board_lock_sha256']=sha(ROOT/'bun.lock')
(ROOT/'tooling/revisions-r5.json').write_text(json.dumps(r,indent=2)+'\n')
