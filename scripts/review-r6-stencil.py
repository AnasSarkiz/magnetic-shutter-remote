"""Measure every actual aperture area/perimeter, including supplier polygons.
TI SLUA271C 4.2–4.4: area >=0.66, aspect >=1.5. No geometry edits.
"""
import importlib.util,json,math,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
spec=importlib.util.spec_from_file_location('manufacturing',ROOT/'scripts/manufacturing-audit.py');m=importlib.util.module_from_spec(spec);sys.modules[spec.name]=m;spec.loader.exec_module(m)
c=json.loads((ROOT/'dist/index/circuit.json').read_text());names={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'};owners={e['pcb_component_id']:names[e['source_component_id']] for e in c if e['type']=='pcb_component'}
pads={e['pcb_smtpad_id']:e for e in c if e['type']=='pcb_smtpad'};rows=[];ep_coverage=None
for e in c:
 if e['type']!='pcb_solder_paste':continue
 geometry=m.pad(e)
 if not geometry.is_valid or geometry.area<=0:raise ValueError('Malformed aperture')
 # Minimum caliper width over convex-hull edges avoids GEOS oriented-envelope warnings.
 points=list(geometry.convex_hull.exterior.coords);widths=[]
 for a,b in zip(points,points[1:]):
  dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy)
  if not length:raise ValueError('Degenerate hull edge')
  projections=[(-dy*x+dx*y)/length for x,y in points[:-1]]
  widths.append(max(projections)-min(projections))
 minimum_width=min(widths)
 area_ratio=geometry.area/(geometry.length*.1);aspect=minimum_width/.1
 row={'id':e['pcb_solder_paste_id'],'ref':owners[e['pcb_component_id']],'shape':e['shape'],'bounds_mm':geometry.bounds,'area_mm2':geometry.area,'perimeter_mm':geometry.length,'area_ratio':area_ratio,'aspect_ratio':aspect,'release_pass':area_ratio>=.66 and aspect>=1.5};rows.append(row)
 if row['ref']=='U2' and 'pin11' in pads[e['pcb_smtpad_id']]['port_hints']:ep_coverage=100*geometry.area/m.pad(pads[e['pcb_smtpad_id']]).area
fail=[r for r in rows if not r['release_pass']];usb=[r for r in rows if r['ref']=='J1']
result={'thickness_mm':.1,'aperture_count':len(rows),'usb_aperture_count':len(usb),'usb_polygon_count':sum(r['shape']=='polygon' for r in usb),'minimum_area_ratio':min(r['area_ratio'] for r in rows),'minimum_aspect_ratio':min(r['aspect_ratio'] for r in rows),'exposed_pad_coverage_percent':ep_coverage,'release_failures':fail,'apertures':rows,'process_reference':'TI SLUA271C sections 4.2–4.4; 0.10 mm stencil strategy retained from R5','scope':'Calculated release geometry, not measured paste transfer; GCT production process approval pending, prototype shell inspection/manual rework may be required.'}
(REVIEW_PATHS.evidence/'stencil-release.json').write_text(json.dumps(result,indent=2)+'\n');print('Apertures',len(rows),'USB',len(usb),'min area/aspect',result['minimum_area_ratio'],result['minimum_aspect_ratio'],'failures',len(fail));raise SystemExit(bool(fail) or len(rows)!=161 or len(usb)!=16)
