"""Run required checks without accepting failures or hiding warnings."""
import json,subprocess
from pathlib import Path
commands={name:['bunx','tsci','check',name,'index.circuit.tsx'] for name in ['netlist','pin_specification','source','schematic-placement','placement']}
commands.update(shorts=['bunx','tsci','check','shorts','dist/index/circuit.json'],snapshot=['bunx','tsci','snapshot','index.circuit.tsx'],schema_and_routed=['bun','scripts/check-routed.ts'],drill_pad=['bun','scripts/audit-drills.ts'])
results={}
for name,command in commands.items():
 with open(f'evidence/R2/R2-check-{name}.log','w') as log:
  results[name]={'command':command,'exit_code':subprocess.run(command,stdout=log,stderr=subprocess.STDOUT).returncode}
Path('evidence/R2/R2-check-exits.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
raise SystemExit(int(any(r['exit_code'] for r in results.values())))
