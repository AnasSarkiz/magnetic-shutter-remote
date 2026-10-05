"""Propose native label positions in board XY mm; final Gerbers are checked separately.
No electronic component, copper, supplier import, or manufactured geometry is changed.
"""
import json,sys,importlib.util,math
from pathlib import Path
from shapely.geometry import box
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
s=importlib.util.spec_from_file_location('mf',ROOT/'scripts/manufacturing-audit.py');m=importlib.util.module_from_spec(s);sys.modules['mf']=m;s.loader.exec_module(m)
c=json.loads((ROOT/'dist/index/circuit.json').read_text());copper,drills,_=m.make_features(c)
components=[e for e in c if e['type']=='pcb_component'];names={e['source_component_id']:e['name'] for e in c if e['type']=='source_component'}
occupied=unary_union([x.geometry.buffer(.25) for x in copper if x.kind in ('smt','annulus') and x.layer=='top']+[x.geometry.buffer(.25) for x in drills]+[box(e['center']['x']-e['width']/2-.15,e['center']['y']-e['height']/2-.15,e['center']['x']+e['width']/2+.15,e['center']['y']+e['height']/2+.15) for e in components])
rows=[{'text':'SHUTTER','x':-9.25,'y':-12,'layer':'top','fontSize':2,'rotation':90},
 {'text':'1','x':15.7,'y':19.5,'layer':'top','fontSize':2},
 {'text':'POWER','x':11.4,'y':4.5,'layer':'top','fontSize':2,'rotation':90}]
used=[('top',box(-10.08,-17.08,-8.42,-6.92)),('top',box(-15.225,17.075,-13.775,18.725)),('top',box(-13.225,17.075,-11.775,18.725)),('top',box(14.975,18.675,16.425,20.325)),('top',box(10.575,.875,12.225,8.125))]
def place(specification):
 text,target,layer=specification;w=1.45*len(text);h=1.65
 forbidden=occupied if layer=='top' else unary_union([x.geometry.buffer(.25) for x in drills])
 candidates=[]
 for ix in range(-32,33):
  x=ix*.5
  for iy in range(-43,54):
   y=iy*.5;b=box(x-w/2,y-h/2,x+w/2,y+h/2)
   if x-w/2 < -17.5 or x+w/2>17.5 or y+h/2>27.5 or y-h/2 < -22.5:continue
   if b.intersects(forbidden) or any(layer==l and b.intersects(g.buffer(.18)) for l,g in used):continue
   candidates.append((math.dist((x,y),target),x,y,b))
 if not candidates:raise ValueError('No printable space for '+text)
 _,x,y,b=min(candidates,key=lambda e:e[0]);used.append((layer,b));rows.append({'text':text,'x':x,'y':y,'layer':layer,'fontSize':2})
for specification in [('BAT',(-13.5,20),'top'),('PAIR',(12,-8),'top'),('SWD 1:3V',(11,22),'bottom'),('2:IO 3:GND',(10,20),'bottom'),('4:CLK 5:RST',(9,18),'bottom'),('6:GND',(12,16),'bottom')]:place(specification)
for e in sorted(components,key=lambda e:-len(names[e['source_component_id']])):place((names[e['source_component_id']],(e['center']['x'],e['center']['y']),'top'))
(ROOT/'evidence/R5/authored-markings.json').write_text(json.dumps(rows,indent=2)+'\n')
s='// Native board markings; immutable supplier footprints are preserved.\nexport function FunctionalMarkings() {\n return <>\n'
for r in rows:s+=f'  <silkscreentext text={json.dumps(r["text"])} pcbX={{{r["x"]}}} pcbY={{{r["y"]}}} layer="{r["layer"]}" fontSize={{2}} pcbRotation={{{r.get("rotation",0)}}} anchorAlignment="center" />\n'
s+='  <silkscreenpath layer="top" strokeWidth={0.18} route={[{x:-15.1,y:17.9},{x:-13.9,y:17.9}]} />\n'
s+='  <silkscreenpath layer="top" strokeWidth={0.18} route={[{x:-14.5,y:17.3},{x:-14.5,y:18.5}]} />\n'
s+='  <silkscreenpath layer="top" strokeWidth={0.18} route={[{x:-13.1,y:17.9},{x:-11.9,y:17.9}]} />\n'
s+=' </>;\n}\n';(ROOT/'src/functional-markings.tsx').write_text(s)
print('Placed',len(rows),'native printable labels')
