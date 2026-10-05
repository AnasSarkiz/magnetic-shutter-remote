"""Run all R6 design/export qualification checks without ordering or publishing.
Run from the R6 board root with public supplier-library network access.
Results fail closed; later independent commands still run and record failures.
"""
import json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PYTHON='tooling/gerber-review-venv/bin/python'
commands=[('format',['bun','run','format:check']),('typecheck',['bun','run','typecheck'])]
commands += [('check-'+check,['node_modules/.bin/tsci','check',check,'index.circuit.tsx']) for check in ['netlist','pin_specification','source','schematic-placement','placement']]
commands += [('build',['node_modules/.bin/tsci','build','index.circuit.tsx','--pcb-png','--pcb-svgs','--schematic-svgs','--3d-png','--glbs']),('shorts',['node_modules/.bin/tsci','check','shorts','dist/index/circuit.json']),('native-checks',['bun','scripts/check-routed.ts','evidence/R6/routed-checks.json']),('snapshot',['node_modules/.bin/tsci','snapshot','index.circuit.tsx']),('outputs',[PYTHON,'scripts/validate-r6-outputs.py']),('comparison',['python3','scripts/compare-r5-r6.py']),('preservation',['python3','scripts/check-r6-preservation.py']),('tests',['bun','run','test'])]
results=[]
for name,command in commands:
 with (ROOT/'evidence/R6'/('suite-'+name+'.log')).open('w') as log:completed=subprocess.run(command,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
 results.append({'check':name,'command':command,'exit':completed.returncode})
 (ROOT/'evidence/R6/suite-exits.json').write_text(json.dumps(results,indent=2)+'\n')
 print(name,completed.returncode,flush=True)
raise SystemExit(any(r['exit'] for r in results))
