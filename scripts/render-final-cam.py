"""Render actual unmodified Gerbers plus all original Excellon drills/slots."""
import argparse,importlib.util,json,sys
from pathlib import Path
from zipfile import ZipFile
from gerbonara import GerberFile
from gerber.cam import FileSettings
from gerber.excellon import DrillSlot,loads
from shapely.geometry import LineString,Point,Polygon
from shapely.ops import unary_union,polygonize
s=importlib.util.spec_from_file_location('export_review',Path('scripts/review-r3-exports.py'));m=importlib.util.module_from_spec(s);sys.modules[s.name]=m;s.loader.exec_module(m)
parser=argparse.ArgumentParser()
parser.add_argument('--archive',type=Path,default=Path('fabrication/R3-gerbers-review.zip'))
parser.add_argument('--output-directory',type=Path,default=Path('evidence/R3/final-cam-readback'))
arguments=parser.parse_args()
out=arguments.output_directory;r=json.loads((out/'readback.json').read_text())
with ZipFile(arguments.archive) as z:
 layers={n:GerberFile.from_string(z.read(n).decode()) for n in ['F_Cu.gbr','B_Cu.gbr','Edge_Cuts.gbr','F_SilkScreen.gbr','F_Mask.gbr']}
 lines=[LineString([(p.x1,p.y1),(p.x2,p.y2)]) for obj in layers['Edge_Cuts.gbr'].objects for p in obj.to_primitives()]
 outline=list(polygonize(unary_union(lines)))[0]
 drills=[]
 for name in ['drill-L1-L2.drl','drill_npth.drl']:
  d=loads(z.read(name).decode(),settings=FileSettings(units='metric',format=(3,4),zeros='leading',notation='absolute'))
  for hit in d.hits:
   g=LineString([hit.start,hit.end]).buffer(hit.tool.diameter/2,quad_segs=256) if isinstance(hit,DrillSlot) else Point(*hit.position).buffer(hit.tool.diameter/2,quad_segs=256)
   drills.append(g)
 for side,name in [('top','F_Cu.gbr'),('bottom','B_Cu.gbr')]:
  copper=m.copper_geometry(layers[name]);gap=outline.boundary.distance(copper)
  if not outline.covers(copper) or gap<.3:raise ValueError('Copper fails retained 0.3 mm routed-edge clearance')
  r['layers'][name]['copper_to_outline_mm']=gap
  body=outline.svg(fill_color='#dae0db').replace('stroke-width="2.0"','stroke-width="0.03"')
  body+=copper.svg(fill_color='#cf4545' if side=='top' else '#2879cf').replace('stroke-width="2.0"','stroke-width="0.01"')
  body+=''.join(g.svg(fill_color='white').replace('stroke-width="2.0"','stroke-width="0.02"') for g in drills)
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1400" viewBox="-20 -30 40 60"><g transform="scale(1,-1)">{body}</g></svg>'
  (out/f'CAM-{side}-all-drills.svg').write_text(svg)
 r['drill_to_outline_minimum_mm']=min(outline.boundary.distance(g) for g in drills)
 r['silk_over_smt_opening_area_mm2']=m.copper_geometry(layers['F_SilkScreen.gbr']).intersection(m.copper_geometry(layers['F_Mask.gbr'])).area
 r['visual_scope']='Both rendered copper layers include every actually parsed plated and nonplated drill, including all G85 slots. Silk trim/assembly stencil disposition separately unapproved.'
(out/'readback.json').write_text(json.dumps(r,indent=2)+'\n');print('Actual CAM/drill composite previews generated; routed-edge copper clearance passed')
