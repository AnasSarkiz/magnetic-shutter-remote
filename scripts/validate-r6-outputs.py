"""Fail-closed R6 qualification of the current routed revision. No orders/uploads."""
import json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];PYTHON='tooling/gerber-review-venv/bin/python'
commands=[('pcb-layers',['bun','scripts/render-r6-pcb.ts']),('assembly',['bun','scripts/export-assembly.ts','fabrication/R6','evidence/R6']),('gerber',['bun','node_modules/circuit-json-to-gerber/dist/cli.js','dist/index/circuit.json','-o','fabrication/R6/R6-gerbers.zip']),('copper',[PYTHON,'scripts/manufacturing-audit.py','--input','dist/index/circuit.json','--output','evidence/R6/copper-audit.json']),('cam',[PYTHON,'scripts/review-r3-exports.py','fabrication/R6/R6-gerbers.zip','dist/index/circuit.json','--output-directory','evidence/R6/cam-readback']),('cam-render',[PYTHON,'scripts/render-final-cam.py','--archive','fabrication/R6/R6-gerbers.zip','--output-directory','evidence/R6/cam-readback']),('ground',[PYTHON,'scripts/review-r6-ground.py']),('stencil',[PYTHON,'scripts/review-r6-stencil.py']),('legend',[PYTHON,'scripts/review-r6-legend.py']),('manufacturing',[PYTHON,'scripts/review-r6-manufacturing.py']),('authored',['bun','scripts/audit-authored-placements.ts','evidence/R6/authored-placements.json']),('registration',[PYTHON,'scripts/draw-r6-review.py']),('dimensions',[PYTHON,'scripts/draw-r6-dimensions.py']),('schematic',['bun','scripts/render-sheets.ts']),('fit',[PYTHON,'scripts/review-r6-mechanics.py']),('meshes',[PYTHON,'scripts/check-r6-mechanical-meshes.py'])]
results=[]
for name,command in commands:
 with (ROOT/'evidence/R6'/('suite-'+name+'.log')).open('w') as log:completed=subprocess.run(command,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
 results.append({'check':name,'command':command,'exit':completed.returncode});(ROOT/'evidence/R6/output-suite.json').write_text(json.dumps(results,indent=2)+'\n');print(name,completed.returncode,flush=True)
raise SystemExit(any(row['exit'] for row in results))
