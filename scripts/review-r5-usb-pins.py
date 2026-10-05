"""Read current USB port identity/rails without rewriting supplier definitions."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
c=json.loads((ROOT/'dist/index/circuit.json').read_text());j=next(e for e in c if e['type']=='source_component' and e['name']=='J1')
nets={e['source_net_id']:e['name'] for e in c if e['type']=='source_net'};traces=[e for e in c if e['type']=='source_trace']
expected={1:('pin1','GND'),2:('pin2','GND'),3:('pin3','GND'),4:('pin4','GND'),5:('A12','GND'),6:('A9','USB5V'),7:('B5','CC2'),8:('A5','CC1'),9:('B9','USB5V'),10:('B12','GND')};rows=[]
for p in [e for e in c if e['type']=='source_port' and e['source_component_id']==j['source_component_id']]:
 rails={nets[n] for t in traces if p['source_port_id'] in t.get('connected_source_port_ids',[]) for n in t.get('connected_source_net_ids',[])}
 pin=p['pin_number'];label,rail=expected[pin]
 if p['name']!=label or rails!={rail}:raise ValueError(f'USB pin {pin}: {p["name"]} / {rails}')
 rows.append({'supplier_pin':pin,'contact':p['name'],'net':rail})
if len(rows)!=10:raise ValueError('Exact USB pin coverage differs')
(ROOT/'evidence/R5/usb-pin-registration.json').write_text(json.dumps(rows,indent=2)+'\n')
print('Current C2894893 USB pin registration: 10/10; independent CC1/CC2 rails. Physical plug tests pending.')
