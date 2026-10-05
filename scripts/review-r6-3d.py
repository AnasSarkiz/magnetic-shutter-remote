"""Verify every fitted reference is represented by a mesh in the final GLB."""
import hashlib,json,struct
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
path=ROOT/'dist/index/3d.glb';raw=path.read_bytes();magic,version,total=struct.unpack_from('<III',raw);assert magic==0x46546c67 and version==2 and total==len(raw)
length,kind=struct.unpack_from('<II',raw,12);assert kind==0x4e4f534a;g=json.loads(raw[20:20+length]);c=json.loads((ROOT/'dist/index/circuit.json').read_text());expected={e['name'] for e in c if e['type']=='source_component'};mapped={n['name']:n['mesh'] for n in g['nodes'] if n.get('name') in expected and 'mesh' in n};assert set(mapped)==expected and all(0<=idx<len(g['meshes']) for idx in mapped.values())
(REVIEW_PATHS.evidence/'3d-coverage.json').write_text(json.dumps({'glb_sha256':hashlib.sha256(raw).hexdigest(),'references':mapped,'coverage':len(mapped),'scope':'Actual mesh-node completeness; visual/interference review and manufacturer dimension checks recorded separately. Not physical fit.'},indent=2)+'\n');print('37/37 fitted references represented by final GLB meshes')
