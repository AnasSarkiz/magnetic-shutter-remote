"""Check actual source GND copper in board XY mm, +Z TOP. Independent geometry.
Returns are connected through physical copper and plated vias, never net names alone.
"""
import importlib.util,json,sys
from pathlib import Path
from shapely.geometry import box,Point
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
spec=importlib.util.spec_from_file_location('mf',ROOT/'scripts/manufacturing-audit.py');m=importlib.util.module_from_spec(spec);sys.modules['mf']=m;spec.loader.exec_module(m)
c=json.loads((ROOT/'dist/index/circuit.json').read_text());copper,drills,_=m.make_features(c)
gnd=next(e['subcircuit_connectivity_map_key'] for e in c if e['type']=='source_net' and e['name']=='GND')
features=[e for e in copper if e.net==gnd]
names={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'};owners={e['pcb_component_id']:names[e['source_component_id']] for e in c if e['type']=='pcb_component'}
top=unary_union([e.geometry for e in features if e.layer=='top']);bottom=unary_union([e.geometry for e in features if e.layer=='bottom'])
pour=unary_union([e.geometry for e in features if e.layer=='bottom' and e.kind=='pour'])
# TI 7.4.1 requires a solid plane tied to GND and EP, without prescribing a
# layer. Require the complete EP land and a direct GND-pin contact on one continuous TOP plane.
# Bottom coverage is measured independently rather than made a TI rule.
ep=next(e for e in c if e['type']=='pcb_smtpad' and owners[e['pcb_component_id']]=='U2' and 'pin11' in e['port_hints'])
ep_geometry=m.pad(ep)
solid_ep_bottom=pour.covers(ep_geometry)
gnd_pin=next(e for e in c if e['type']=='pcb_smtpad' and owners[e['pcb_component_id']]=='U2' and 'pin5' in e['port_hints'])
qualified_planes=[e for e in features if e.kind=='pour' and e.layer=='top' and e.geometry.covers(ep_geometry) and e.geometry.intersects(m.pad(gnd_pin))]
solid_charger_top=bool(qualified_planes)
# Physical connected-component graph; a plated barrel joins layers by the same ID.
adjacency={i:[] for i in range(len(features))}
for i,a in enumerate(features):
 for j,b in enumerate(features[:i]):
  if (a.layer==b.layer and a.geometry.intersects(b.geometry)) or (a.id==b.id and a.kind==b.kind=='annulus'):
   adjacency[i].append(j);adjacency[j].append(i)
seed=next(i for i,e in enumerate(features) if e.id==ep['pcb_smtpad_id']);visited={seed};pending=[seed]
while pending:
 for i in adjacency[pending.pop()]:
  if i not in visited:visited.add(i);pending.append(i)
required=[(i,e) for i,e in enumerate(features) if e.kind=='smt']
missing=[{'id':e.id,'owner':owners[e.owner]} for i,e in required if i not in visited]
keepout=box(-18,-28,18,-22.9)
rf=[e.id for e in copper if e.geometry.intersection(keepout).area>m.EPS*m.EPS]
returns=[{'ref':owners[e.owner],'pad':e.id,'connected_to_charger_ep':i in visited,'direct_plane_contact':e.geometry.intersects(pour if e.layer=='bottom' else unary_union([p.geometry for p in features if p.kind=='pour' and p.layer=='top']))} for i,e in required]
via_ids=[d.id for d in drills if d.net==gnd and d.geometry.distance(ep_geometry)<3]
result={'datasheet':'TI SLUSF65B, revised August 2026, section 7.4.1 / Figure 7-9','solid_ground_under_entire_exposed_pad_bottom':solid_ep_bottom,'continuous_top_plane_connects_ground_pin_and_covers_entire_exposed_pad':solid_charger_top,'qualified_top_plane_areas_mm2':[e.geometry.area for e in qualified_planes],'all_ground_smt_lands_connected_to_exposed_pad':not missing,'disconnected_ground_pads':missing,'return_pads':returns,'nearby_ground_vias':via_ids,'top_ground_area_mm2':top.area,'bottom_ground_area_mm2':bottom.area,'bottom_pour_area_mm2':pour.area,'rf_keepout_copper_intrusions':rf,'minimum_pour_to_rf_boundary_mm':min(e.geometry.distance(keepout) for e in features if e.kind=='pour'),'thermal_process':'No via-in-pad. EP is soldered; lateral copper feeds plated GND vias to the bottom plane. Thermal performance is POST-PROTOTYPE PHYSICAL VALIDATION.'}
(REVIEW_PATHS.evidence/'ground-plane-review.json').write_text(json.dumps(result,indent=2)+'\n')
print('Continuous TOP plane includes GND and EP:',solid_charger_top,'bottom EP coverage:',solid_ep_bottom,'disconnected GND pads:',missing,'RF intrusions:',rf)
raise SystemExit(not solid_charger_top or bool(missing) or bool(rf))
