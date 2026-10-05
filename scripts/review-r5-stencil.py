"""Compute all exported rectangular aperture release metrics. No CAM edits."""
import importlib.util,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('registration',ROOT/'scripts/audit-r4-qualification.py');a=importlib.util.module_from_spec(spec);sys.modules['registration']=a;spec.loader.exec_module(a)
c=json.loads((ROOT/'dist/index/circuit.json').read_text());source={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'};owners={e['pcb_component_id']:source[e['source_component_id']] for e in c if e['type']=='pcb_component'}
pads={e['pcb_smtpad_id']:e for e in c if e['type']=='pcb_smtpad'};rows=[];ep_coverage=None
for e in c:
 if e['type']!='pcb_solder_paste':continue
 if e['shape']!='rect':raise ValueError('Non-rectangular aperture needs a separately derived wall perimeter')
 p=pads[e['pcb_smtpad_id']];metric=a.rectangular_stencil_metrics((e['width'],e['height']),.1)
 row={'ref':owners[e['pcb_component_id']],'pad':p['port_hints'],'aperture_mm':[e['width'],e['height']],**metric}
 row['release_pass']=metric['area_ratio']>=.66 and metric['aspect_ratio']>=1.5;rows.append(row)
 if row['ref']=='U2' and 'pin11' in p['port_hints']:ep_coverage=100*e['width']*e['height']/(p['width']*p['height'])
fail=[r for r in rows if not r['release_pass']]
result={'thickness_mm':.1,'aperture_count':len(rows),'minimum_area_ratio':min(r['area_ratio'] for r in rows),'minimum_aspect_ratio':min(r['aspect_ratio'] for r in rows),'exposed_pad_coverage_percent':ep_coverage,'release_failures':fail,'apertures':rows,'process_reference':'TI SLUA271C §§4.2–4.4; JLC 0.10 mm stencil option','scope':'Numeric geometry/process strategy, not measured paste transfer. Gerber/source aperture fidelity is checked separately.'}
(ROOT/'evidence/R5/stencil-release.json').write_text(json.dumps(result,indent=2)+'\n')
print('Apertures',len(rows),'minimum area/aspect ratios',result['minimum_area_ratio'],result['minimum_aspect_ratio'],'EP coverage',ep_coverage,'failures',len(fail))
raise SystemExit(bool(fail) or len(rows)!=151)
