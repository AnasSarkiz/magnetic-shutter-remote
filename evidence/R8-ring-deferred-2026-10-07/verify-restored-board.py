from pathlib import Path
import datetime
import json
import os
import subprocess

root=Path('/workspace/magnetic-shutter-remote')
e=root/'evidence/R8-ring-deferred-2026-10-07'
f='fabrication/R8-ring-deferred-2026-10-07'
env=os.environ.copy()
env['PATH']=str(root/'.codex/runtime/node_modules/.bin')+':'+str(root/'node_modules/.bin')+':'+env['PATH']
env['XDG_CONFIG_HOME']=str(root/'.codex/runtime/config')
prefix=['python3','cloud/run-heavy.py','--']
py='tooling/gerber-review-venv/bin/python'
checks=[
 ('format',['bun','run','format:check'],False),
 ('typecheck',['bun','run','typecheck'],True),
 ('smoke',['bash','cloud/smoke.sh'],False),
 ('contracts',['bun','scripts/audit-r8-circuit.ts'],True),
 ('native',['bun','scripts/check-r8-native.ts',str(e/'final-native-checks.json')],True),
 ('shorts',['tsci','check','shorts','dist/index/circuit.json'],True),
 ('cli-style-json',['tsci','check','schematic-placement','dist/index/circuit.json'],True),
 ('electrical-contract',['python3','scripts/review-r8-electrical-contract.py','--output',str(e/'electrical-contract.json')],True),
 ('manufacturing',[py,'scripts/manufacturing-audit.py','--trace-geometry','gerber','--output',str(e/'final-manufacturing.json')],True),
 ('connectivity',[py,'scripts/review-r8-connectivity.py','--output',str(e/'physical-connectivity.json')],True),
 ('widths',[py,'scripts/review-r8-trace-widths.py','--output',str(e/'trace-width-review.json')],True),
 ('power',[py,'scripts/review-r8-power.py','--output',str(e/'power-path-measurements.json')],True),
 ('gerbers',['bun','scripts/export-gerbers.ts','dist/index/circuit.json',f+'/gerbers'],True),
 ('assembly',['bun','scripts/export-assembly.ts',f,str(e)],True),
 ('archive',['python3','scripts/export-r8-gerber-zip.py',f+'/gerbers',f+'/R8-first-prototype-Gerbers.zip'],True),
 ('readback',[py,'scripts/review-r8-exports.py',f+'/R8-first-prototype-Gerbers.zip','dist/index/circuit.json','--output',str(e/'final-readback')],True),
 ('process',[py,'scripts/review-r8-process.py',f+'/R8-first-prototype-Gerbers.zip','dist/index/circuit.json','--output',str(e/'final-process')],True),
 ('visual',['bun','scripts/render-r8-review.ts',str(e)],True),
]
results=[]
for name,cmd,guard in checks:
 command=(prefix if guard else [])+cmd
 log=e/'checks'/f'{name}.log'
 start=datetime.datetime.now(datetime.timezone.utc).isoformat()
 with log.open('w') as out:code=subprocess.run(command,cwd=root,env=env,stdout=out,stderr=subprocess.STDOUT).returncode
 results.append({'name':name,'command':command,'exit_code':code,'started_utc':start,'finished_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'log':str(log.relative_to(root))})
 (e/'check-results.json').write_text(json.dumps(results,indent=2)+'\n')
 print(name,code,flush=True)
 if code:
  print(log.read_text()[-5000:],flush=True)
  raise SystemExit(code)
(e/'REPRODUCE-COMMANDS.json').write_text(json.dumps({'artifact_mode':'Exact byte restoration of previously native-generated/published0.3.12, not a new router run','native_build_receipt':'evidence/R8-bottom-silk-2026-10-06/REPRODUCE-COMMANDS.json','checks':results,'environment':{'PATH_prefix':['$PWD/.codex/runtime/node_modules/.bin','$PWD/node_modules/.bin'],'XDG_CONFIG_HOME':'$PWD/.codex/runtime/config','heavy_jobs':'Serial through cloud/run-heavy.py; no SDK/3D build.'}},indent=2)+'\n')
