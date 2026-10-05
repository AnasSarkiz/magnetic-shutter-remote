"""Hash-check original protected files read-only; no board rebuild."""
import hashlib,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];start=json.loads((ROOT/'evidence/R6/START-FROM-R5.json').read_text());failures=[];counts={}
for label,directory,ledger in [('R5',start['source_directory'],start['R5_protected']),('R4',start['R4_directory'],start['R4_protected'])]:
 counts[label]=len(ledger)
 for relative,expected in ledger.items():
  expected=expected['sha256'] if isinstance(expected,dict) else expected
  path=Path(directory)/relative
  if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest()!=expected:failures.append(f'{label}/{relative}')
result={'protected_counts':counts,'total':sum(counts.values()),'modified_or_missing':failures,'original_PCB_source_changed':False if not failures else 'CHECK FAILURE','R5_directory':start['source_directory'],'R4_directory':start['R4_directory']};(ROOT/'evidence/R6/protected-baselines.json').write_text(json.dumps(result,indent=2)+'\n');print(result);raise SystemExit(bool(failures) or result['total']!=972)
