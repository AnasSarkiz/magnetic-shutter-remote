"""Dimensioned engineering design; reads final Circuit JSON, does not modify it."""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
c=json.loads((ROOT/'dist/index/circuit.json').read_text());board=next(e for e in c if e['type']=='pcb_board')
D=json.loads((ROOT/'mechanical/dimensions.json').read_text());W,H=A4
out=REVIEW_PATHS.fabrication/'BOARD-DIMENSIONS.pdf';d=canvas.Canvas(str(out),pagesize=A4)
d.setFont('Helvetica-Bold',16);d.drawString(35,H-40,'R6 PCB and enclosure dimensions - ENGINEERING PROTOTYPE')
d.setFont('Helvetica',9);d.drawString(35,H-59,'Original engineering design. These are not JJC internal dimensions. All dimensions in mm.')
s=6;cx=265;cy=475
xy=lambda x,y:(cx+x*s,cy+y*s)
p=d.beginPath();outline=board['outline'];p.moveTo(*xy(outline[0]['x'],outline[0]['y']))
for q in outline[1:]:p.lineTo(*xy(q['x'],q['y']))
p.close();d.setLineWidth(.8);d.drawPath(p)
d.setFillColorRGB(.93,.96,.99);d.rect(*xy(-18,-28),36*s,5.1*s,fill=1,stroke=0)
d.setFillColorRGB(0,0,0);d.setFont('Helvetica',8);d.drawCentredString(cx,cy-25.5*s,'RF no-copper / no-metal region')
for e in [e for e in c if e['type']=='pcb_hole']:
 x,y=xy(e['x'],e['y']);d.circle(x,y,e['hole_diameter']*s/2);d.line(x-4,y,x+4,y);d.line(x,y-4,x,y+4)
for x,y,label in [(0,23.9852,'USB anchor'),(-13.5,-7,'SHUTTER'),(13.5,-4,'PAIR'),(13.2,16,'SWD anchor'),(15,5,'POWER anchor')]:
 a,b=xy(x,y);d.setFillColorRGB(.2,.3,.4);d.circle(a,b,2,fill=1);d.setFillColorRGB(0,0,0);d.setFont('Helvetica',7);d.drawCentredString(a-35 if label=='POWER anchor' else a,b-11,label)
def dim(x1,y1,x2,y2,label):
 d.setLineWidth(.5);d.line(x1,y1,x2,y2)
 if y1==y2:
  for x in [x1,x2]:d.line(x,y1-4,x,y1+4)
  d.setFont('Helvetica',10);d.drawCentredString((x1+x2)/2,y1+7,label)
 else:
  for y in [y1,y2]:d.line(x1-4,y,x1+4,y)
  d.saveState();d.translate(x1-8,(y1+y2)/2);d.rotate(90);d.setFont('Helvetica',10);d.drawCentredString(0,0,label);d.restoreState()
dim(cx-18*s,cy+31*s,cx+18*s,cy+31*s,'36.00')
dim(cx-22*s,cy-28*s,cx-22*s,cy+28*s,'56.00')
d.setFont('Helvetica',9)
lines=[
 'Datum: PCB centre (0,0), +Y toward USB. TOP view. FR4: 1.00 mm, two layers.',
 'Outline R2.0 corners; outline allowance +/-0.20, thickness +/-0.10 (design allocations).',
 'H1/H2: (-13,24), (13,24), diameter 2.20. SW1 holes: (15.756164,3.500130)',
 'and (15.756164,6.500124), diameter 0.900024, unchanged supported supplier import.',
 'USB anchor: (0,23.9852), rotation 180 deg; actual mouth Y=28.660169.',
 'USB opening: 12.0 wide x 9.5 high at Y=29.0, Z=8.0; connector max height 3.41.',
 'Shutter (-13.5,-7), pair (13.5,-4). Cap 5.8 / lid hole 6.2; free gap 0.2; travel 0.2.',
 'Remote body: 40.0 x 60.0 x 16.8; maximum slider width 42.4 / button height 17.5.',
 'Remote interior: 37.6 x 57.6, wall 1.2; PCB bottom Z=5.0, top Z=6.0.',
 'Battery DTP401525(PHR): max 15.5 x 27.0 x 4.2, bottom Z=8.3 +/-0.1.',
 'Grip: 68.0 x 108.0, base 6.5; rail maximum Z=9.8; dock stop gap 0.30.',
 'Sources: final Circuit JSON / matched Gerber outline + drills; mechanical/dimensions.json;',
 'GCT/JST/XUNPU/Ebyte drawings and battery specification listed in mechanical/README.md.',
 'Calculated fit/clearance only. GCT land geometry verified. Production process pending; shell rework possible.',
 'Physical fit, RF, battery, thermal, runtime and phones: POST-PROTOTYPE PHYSICAL VALIDATION.'
]
for i,line in enumerate(lines):d.drawString(35,260-i*13,line)
d.save()
print('R6 dimensions PDF generated from actual source geometry; physical fit remains pending')
