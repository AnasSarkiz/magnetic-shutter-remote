"""Record source patches and exact working local dependency identities."""
import hashlib,json,subprocess
from pathlib import Path
root=Path.cwd();manifest={}
for name in ['core','easyeda-converter','circuit-json','circuit-json-util','circuit-json-to-gerber','eval','runframe']:
 folder=root/'tooling'/name
 patch=root/'tooling'/'patches'/f'{name}.patch'
 patch.write_bytes(subprocess.check_output(['git','diff','--binary'],cwd=folder))
 untracked=subprocess.check_output(['git','ls-files','--others','--exclude-standard'],cwd=folder,text=True).splitlines()
 manifest[name]={'base_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=folder,text=True).strip(),'version':json.loads((folder/'package.json').read_text())['version'],'patch_file':str(patch.relative_to(root)),'source_directory':str(folder.relative_to(root)),'untracked_source_files':untracked,'patch_sha256':hashlib.sha256(patch.read_bytes()).hexdigest()}
(root/'tooling/revisions.json').write_text(json.dumps(manifest,indent=2)+'\n')
files=[root/'package.json',root/'bun.lock',root/'index.circuit.tsx',*sorted((root/'src').glob('*.tsx')),*sorted((root/'src').glob('*.ts')),root/'dist/index/circuit.json',root/'node_modules/@tscircuit/core/dist/index.js',root/'tooling/core/dist/index.js',root/'tooling/runframe/dist/standalone.min.js']
files+=list((root/'tooling/vendor').glob('*.tgz'))
record={'revision':'R3-review-2026-10-02','sha256':{str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest()for p in files},'canonical_core_equals_installed':(root/'tooling/core/dist/index.js').read_bytes()==(root/'node_modules/@tscircuit/core/dist/index.js').read_bytes()}
if not record['canonical_core_equals_installed']:raise ValueError('Installed core differs from tested build')
(root/'evidence/R3/current-source-tooling-hashes.json').write_text(json.dumps(record,indent=2)+'\n')
print('7 canonical package sources and working installed core identity recorded')
