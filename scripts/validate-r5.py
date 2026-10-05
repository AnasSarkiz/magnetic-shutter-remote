"""Run all R5 design/export qualification checks without ordering or publishing.
Run from the R5 board root with public supplier-library network access.
Results fail closed; later independent commands still run and record failures.
"""
import json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PYTHON='tooling/gerber-review-venv/bin/python'
commands=[('format',['bun','run','format:check']),('typecheck',['bun','run','typecheck'])]
commands += [('check-'+check,['node_modules/.bin/tsci','check',check,'index.circuit.tsx']) for check in ['netlist','pin_specification','source','schematic-placement','placement']]
commands += [('build',['node_modules/.bin/tsci','build','index.circuit.tsx','--pcb-png','--pcb-svgs','--schematic-svgs','--3d-png']),('shorts',['node_modules/.bin/tsci','check','shorts','dist/index/circuit.json']),('native-checks',['bun','scripts/check-routed.ts','evidence/R5/routed-checks.json']),('snapshot',['node_modules/.bin/tsci','snapshot','index.circuit.tsx']),('assembly-export',['bun','scripts/export-assembly.ts','fabrication/R5','evidence/R5']),('gerber-export',['bun','tooling/circuit-json-to-gerber/dist/cli.js','dist/index/circuit.json','-o','fabrication/R5/R5-gerbers-review.zip']),('copper-audit',[PYTHON,'scripts/manufacturing-audit.py','--input','dist/index/circuit.json','--output','evidence/R5/copper-audit.json']),('cam-readback',[PYTHON,'scripts/review-r3-exports.py','fabrication/R5/R5-gerbers-review.zip','dist/index/circuit.json','--output-directory','evidence/R5/cam-readback']),('cam-render',[PYTHON,'scripts/render-final-cam.py','--archive','fabrication/R5/R5-gerbers-review.zip','--output-directory','evidence/R5/cam-readback']),('ground',[PYTHON,'scripts/review-r5-ground.py']),('stencil',[PYTHON,'scripts/review-r5-stencil.py']),('legend',[PYTHON,'scripts/review-r5-legend.py']),('manufacturing-review',[PYTHON,'scripts/review-r5-manufacturing.py']),('registration',[PYTHON,'scripts/draw-r5-review.py']),('dimensions',[PYTHON,'scripts/draw-r5-dimensions.py']),('schematic-sheets',['bun','run','render:sheets']),('tests',['bun','run','test'])]
results=[]
for name,command in commands:
 with (ROOT/'evidence/R5'/('suite-'+name+'.log')).open('w') as log:completed=subprocess.run(command,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
 results.append({'check':name,'command':command,'exit':completed.returncode})
 (ROOT/'evidence/R5/suite-exits.json').write_text(json.dumps(results,indent=2)+'\n')
 print(name,completed.returncode,flush=True)
raise SystemExit(any(r['exit'] for r in results))
