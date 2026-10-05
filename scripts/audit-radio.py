"""Compare unchanged E73 supplier copper with Ebyte's dimensioned 43-terminal drawing."""
import re,json
from pathlib import Path
s=Path('imports/E73_2G4M08S1C.tsx').read_text()
pads=[]
for el in re.findall(r'<smtpad[^>]+/>',s):
 def number(attr):return float(re.search(attr+r'="([-\d.]+)mm"',el).group(1))
 pin=int(re.search(r'pin(\d+)',el).group(1))
 pads.append(dict(pin=pin,x=number('pcbX'),y=number('pcbY'),width=number('width'),height=number('height')))
# Footprint datum uses pad 11's Y and module centreline X. The manufacturer
# module drawing specifies 1.27 pitch, 2.1 inset, 2.6 end setback, 13 mm width.
ytop=next(p['y'] for p in pads if p['pin']==11)
nom={}
for n in range(1,11):nom[n]=(6.5,ytop-14.03+(n-1)*1.27)
for k,n in enumerate(range(11,26,2)):nom[n]=(4.445-k*1.27,ytop)
for k,n in enumerate(range(12,25,2)):nom[n]=(3.81-k*1.27,ytop-2.1)
for k,n in enumerate([26,27,29,31,33,35,37,39,41,43]):nom[n]=(-6.5,ytop-2.6-k*1.27)
for k,n in enumerate(range(28,43,2)):nom[n]=(-4.4,ytop-4.505-k*1.27)
assert len(pads)==len(nom)==43
for p in pads:
 x,y=nom[p['pin']];p.update(nominal_x=x,nominal_y=y,dx=p['x']-x,dy=p['y']-y)
assert max(abs(p['dy']) for p in pads)<.026
Path('evidence/R2/radio-land-audit.json').write_text(json.dumps({'source':'references/E73-2G4M08S1C-manufacturer.pdf, dimensioned module drawing','note':'Drawing is module termination geometry, not a host land recommendation. Existing copper preserved. Pin 3 offset is accepted only as documented landing-overlap assessment, not exact pitch conformity.','pads':pads},indent=2)+'\n')
print('43 pads audited; maximum centre deviation',max(max(abs(p['dx']),abs(p['dy'])) for p in pads),'mm')
