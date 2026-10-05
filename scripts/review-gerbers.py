"""Read original export layers. Does not modify or regenerate manufacturing files."""
import json,re,zipfile,math
from pathlib import Path
from gerbonara import GerberFile,ExcellonFile,LayerStack
root=Path('fabrication/review-gerbers')
with zipfile.ZipFile('fabrication/R2-gerbers-review.zip') as z:z.extractall(root)
records={};layers={}
roles={'Cu':'copper','SilkScreen':'silk','Mask':'mask','Paste':'paste'}
for path in sorted(root.glob('*.gbr')):
 parsed=GerberFile.open(path)
 records[path.name]={'objects':len(parsed.objects),'bounds_mm':parsed.bounding_box()}
 (Path('evidence/R2')/(path.stem+'-gerber.svg')).write_text(str(parsed.to_svg(margin=1)))
 if path.stem=='Edge_Cuts':layers[('mechanical','outline')]=parsed
 elif path.stem[2:] in roles:layers[('top' if path.stem.startswith('F_') else 'bottom',roles[path.stem[2:]])]=parsed
npth=ExcellonFile.open(root/'drill_npth.drl')
records['drill_npth.drl']={'objects':len(npth.objects),'bounds_mm':npth.bounding_box()}
# Gerbonara 1.5.0 cannot read G85. Audit that limited grammar explicitly,
# retaining the independent reader failure log instead of hiding it.
slots=[];drills=[];tools={};selected=None;position=None
for line in (root/'drill-L1-L2.drl').read_text().splitlines():
 if m:=re.fullmatch(r'T(\d+)C([\d.]+)',line):tools[m[1]]=float(m[2])
 elif m:=re.fullmatch(r'T(\d+)',line):selected=m[1]
 elif m:=re.fullmatch(r'X(-?[\d.]+)Y(-?[\d.]+)',line):
  position=(float(m[1]),float(m[2]));drills.append((*position,tools[selected]))
 elif m:=re.fullmatch(r'G85X(-?[\d.]+)Y(-?[\d.]+)',line):
  assert position is not None
  end=(float(m[1]),float(m[2]));slots.append({'start':position,'end':end,'width':tools[selected],'length':math.dist(position,end)+tools[selected]})
  drills.pop();position=end
 elif not (line.startswith(';') or line in ['M48','FMAT,2','METRIC','%','G90','G05','M30']):raise ValueError(f'Unaudited NC statement {line}')
circuit=json.loads(Path('dist/index/circuit.json').read_text());vias=[e for e in circuit if e['type']=='pcb_via'];holes=[e for e in circuit if e['type']=='pcb_plated_hole']
assert len(slots)==len(holes)==4
assert len(drills)==len(vias)
for x,y,d in drills:
 assert any(math.hypot(x-v['x'],y-v['y'])<0.0001 and abs(d-v['hole_diameter'])<1e-6 for v in vias)
for slot in slots:
 cx=(slot['start'][0]+slot['end'][0])/2;cy=(slot['start'][1]+slot['end'][1])/2
 assert any(math.hypot(cx-h['x'],cy-h['y'])<0.0002 and abs(slot['width']-min(h['hole_width'],h['hole_height']))<1e-6 and abs(slot['length']-max(h['hole_width'],h['hole_height']))<0.0002 for h in holes)
records['drill-L1-L2.drl']={'parser':'explicit restricted G85 audit; Gerbonara G85 unsupported','round_drills':len(drills),'slots':slots,'circuit_geometry_match':True}
stack=LayerStack(graphic_layers=layers,drill_npth=npth)
for side in ('top','bottom'):
 Path(f'evidence/R2/gerber-{side}.svg').write_text(str(stack.to_pretty_svg(side=side,margin=1)))
Path('evidence/R2/gerber-parse-audit.json').write_text(json.dumps(records,indent=2)+'\n')
print(json.dumps(records,indent=2))
