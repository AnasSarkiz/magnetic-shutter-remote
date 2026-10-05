"""Dimension schedule for original R2 geometry; no electronic footprints authored."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
D=json.loads(Path('mechanical/dimensions.json').read_text())
C=canvas.Canvas('mechanical/R2-dimensioned-drawings.pdf',pagesize=landscape(A4))
W,H=landscape(A4)
def text(x,y,s,size=10):
 C.setFont('Helvetica',size); C.setFillColorRGB(.1,.16,.21); C.drawString(x,y,s)
def line(x,y,a,b): C.setStrokeColorRGB(.25,.35,.4); C.setLineWidth(.6); C.line(x,y,a,b)
def page(n,title):
 text(30,H-32,'MAGNETIC SHUTTER REMOTE | ORIGINAL DESIGN R2',18)
 text(30,H-53,title,12)
 text(30,22,f'{n}/4   All dimensions in mm. Calculated design; hardware fit untested. USB sourcing/footprint gate remains blocked.',9)
def notes(x,y,rows):
 for r in rows:text(x,y,r,10);y-=17
 return y
def dim(x,y,a,b,label):
 line(x,y,a,b)
 if abs(y-b)<.001:line(x,y-4,x,y+4);line(a,b-4,a,b+4);text((x+a)/2-13,y+6,label)
 else:line(x-4,y,x+4,y);line(a-4,b,a+4,b);text(x-33,(y+b)/2,label)
page(1,'PCB outline and placement datum - retained review-board geometry')
s=6; ox=195;oy=292
X=lambda x:ox+x*s
Y=lambda y:oy+y*s
C.setFillColorRGB(.9,.95,.93);C.roundRect(X(-16),Y(-28),32*s,56*s,2*s,fill=1)
C.setFillColorRGB(1,.86,.67);C.rect(X(-16),Y(-28),32*s,5.1*s,fill=1,stroke=0)
for h in D['pcb']['holes']:
 C.setFillColorRGB(1,1,1);C.circle(X(h['x']),Y(h['y']),h['diameter']/2*s,fill=1)
 text(X(h['x'])-6,Y(h['y'])-18,h['name'],9)
for label,x,y in [('J1',0,24),('SW2',-11,-7),('SW3',11.5,-4),('SW1',10,5),('J2',-9,12),('J3',9,16),('U1',0,-16),('U5 bottom',0,6)]:
 line(X(x)-3,Y(y),X(x)+3,Y(y));line(X(x),Y(y)-3,X(x),Y(y)+3);text(X(x)+5,Y(y)+4,label,8)
dim(X(-16),Y(28)+19,X(16),Y(28)+19,'32.0')
dim(X(-16)-24,Y(-28),X(-16)-24,Y(28),'56.0')
notes(365,470,['PCB: 32 x 56 x 1.0, two layers, FR4, corners R2.0 [A]', 'Outline tolerance target +/-0.2; thickness +/-0.1 [A]', 'Datum: PCB centre XY; +Y toward USB; +Z above PCB.', 'Mount H1/H2: ( -13, +24 ) and ( +13, +24 ), dia 2.2 NPTH [A]', 'Harness W1: ( -13, -2 ), dia 3.0 NPTH [A]', 'J1: (0,24), rotation 180 deg, top [A,B]', 'J2: (-9,12), entry toward -Y, lid removed to mate [A,C]', 'J3: (9,16), entry from +Z, lid removed to program [A,D]', 'Shutter SW2 (-11,-7), pair SW3 (11.5,-4), top [A,E]', 'Power SW1 (10,5), rotation 90 deg; slide travel 1.6 [A,F]', 'U1 (0,-16); antenna toward -Y [A,G]', 'U5 temperature sensor: (0,6), underside [A,H]', 'Antenna exclusion: full width, Y=-28 to -22.9 [A,G]', 'No copper, battery, wire, fastener or other part in strip.', 'Crosses mark anchors, not footprint drawings.'])
notes(365,181,['[A] Original engineering coordinates, src/remote-circuit.tsx', '[B] GCT-USB4105-120.pdf; current J1 drill gap FAILS 0.2 target.', '[C,D] JST-PH.pdf / JST-SH.pdf official dimensioned drawings.', '[E,F] C720477-manufacturer.pdf / SHOUHAN-MSK12C02.pdf', '[G] Ebyte E73 manual + radio-land-audit.json', '[H] TI TMP390.pdf; body/land dimensions, DRL package.'])
C.showPage();page(2,'Remote enclosure and battery stack - assembly datums')
# Side section is an envelope drawing; it does not substitute electronic CAD.
s=5; ox=205; by=325
C.setFillColorRGB(.91,.93,.96);C.roundRect(ox-90,by,180,16.8*s,6,fill=1)
C.setFillColorRGB(1,1,1);C.rect(ox-84,by+1.2*s,168,14.4*s,fill=1)
C.setFillColorRGB(.7,.75,.77);C.rect(ox-7.75*s,by+1.5*s,15.5*s,4.2*s,fill=1)
C.setFillColorRGB(.1,.45,.25);C.rect(ox-16*s,by+8*s,32*s,1*s,fill=1)
C.setFillColorRGB(.95,.6,.2);C.rect(ox-s,by+5.7*s,2*s,1.7*s,fill=1)
dim(ox-90,by-20,ox+90,by-20,'36.0')
dim(ox+111,by,ox+111,by+16.8*s,'16.8')
notes(62,260,['Section: Z=0 is external enclosure back [A]', 'Base floor 1.2; PCB bottom 8.0; PCB top 9.0 [A]', 'Lid underside 15.6; external lid top 16.8 [A]', 'Battery top assembly datum 5.7 +/-0.1 [A,I]', 'Thermal contact at (0,6): 2 x 2, gap 1.7 nominal [A,H,J]', 'Bottom C8: maximum height 1.45; nominal cell gap 0.85 [K]', 'PH mated top Z=14.5; lid clearance 1.1 nominal [C]', 'SH mated top Z=15.3; programming with lid removed [D]'])
notes(405,470,['Remote body 36 x 60 x 16.8, corners R3 [A]', 'Maximum width with slider 38.4; cap top Z=17.5 [A]', 'Internal cavity 33.6 x 57.6; walls 1.2 [A]', 'PCB-wall gap 0.8 nominal; calculated minimum 0.5 [A]', 'Printed dimensional tolerance target +/-0.2 [A]', 'Pack: DATA POWER DTP401525(PHR), external [I]', 'Maximum 15.5 x 27 x 4.2; nest 16.5 x 28 [A,I]', 'Pack plan: X +/-7.75, Y=-4.5 to +22.5 [A]', 'Measure actual thickness; add insulating bed shims.', 'Do not compress pouch to establish Z datum.', 'Thermal pad free 2.032; nominal compression 16.3% [J]', 'USB opening 12 x 7, centre (X=0,Y=29,Z=11) [A,B]', 'This opening must be rechecked for a replacement J1.', 'Two M2 x 14 lid screws; dia 1.7 pilot / 2.4 clearance [A]', 'Board support boss dia 4.2, top Z=8; lid boss Z=9.15 [A]'])
notes(405,183,['[I] DTP401525-PHR-v2.pdf, pages 4, 7, 9.', '[J] Henkel BERGQUIST-GAP-PAD-TGP-1500.pdf', 'GP1500-0.080-02-0404 sheet, cut 2 x 2.', '[K] Samsung CL21A106KAYNNNE package height.', 'All [A] dimensions are original design allocations.', 'Thermal gradient, pad pressure, swelling and fit are untested.'])
C.showPage();page(3,'Grip, docking, magnets and antenna clearance')
s=3; ox=194;oy=341
X=lambda x:ox+x*s
Y=lambda y:oy+y*s
C.setFillColorRGB(.90,.93,.95);C.roundRect(X(-34),Y(-74),68*s,108*s,16*s,fill=1)
C.setFillColorRGB(.8,.87,.93);C.roundRect(X(-18),Y(-72),36*s,60*s,3*s,fill=1)
C.setFillColorRGB(1,.8,.55);C.rect(X(-16),Y(-70),32*s,5.1*s,fill=1,stroke=0)
C.setDash(4,3);C.rect(X(-42),Y(-35),84*s,50*s,fill=0);C.setDash()
for x,y in D['magnets']['dock_centres']+D['magnets']['phone_centres']:
 C.setFillColorRGB(.6,.65,.7);C.circle(X(x),Y(y),6.35/2*s,fill=1)
dim(X(-34),Y(-74)-18,X(34),Y(-74)-18,'68.0')
dim(X(-34)-24,Y(-74),X(-34)-24,Y(34),'108.0')
notes(390,470,['Grip plate: 68 x 108 x 6.5, R16, centre Y=-20 [A]', 'Remote dock transform: Y=-42, back Z=6.8 [A]', 'Cradle inside width 36.6; nominal side gap 0.3 [A]', 'Rails 1.6 x 48 x 3.3; centres X=+/-19.1, Y=-38 [A]', 'End stop 36.6 x 1.6 x 1.2; centre Y=-12 [A]', 'Eight K&J D42 magnets total: dia 6.35 x 3.175 [L]', 'Pocket dia 6.65; adhesive allowance 0.15 radial [A]', 'Remote magnets: (+/-13,16); dock (+/-13,-26) [A]', 'Phone magnets: (+/-14,+/-14); verify attraction polarity [A]', 'Separate steel phone plate: 45 x 45 x 0.5 [A]', 'Case/phone envelope width 84, height 180, thickness 10 [A]', 'Phone bottom alignment Y=-35 +/-5; mark on grip [A]', 'Antenna in dock: Y=-70 to -64.9 [A,G]', 'Nearest permitted phone metal Y=-40: 24.9 separation.', 'Battery-antenna planar separation: 18.4 nominal.', 'Chosen metal separation target 15; Ebyte gives no numeric value.', 'Phone/plate RF effects still require physical testing.', '[L] https://www.kjmagnetics.com/d42-neodymium-disc-magnet'])
C.showPage();page(4,'Actuators, wiring and assembly inspection schedule')
notes(38,470,['Button caps: dia 5.8 in dia 6.2 lid holes; radial clearance 0.2 [A]', 'Cap flange dia 8 x 0.8; stem dia 1.6; TPU compliant construction [A]', 'Rest stem tip Z=11.2; nominal switch top Z=11.0; free gap 0.2 [A,E]', 'Switch stroke 0.2 +/-0.1; force 160 +/-50 gf [E]', 'Adjust printed stem to measured switch height and test overtravel; do not preload the switch.', 'SW1 fork inside width 1.7 around nominal 1.3 actuator; travel 1.6 [A,F]', 'Both states must seat fully without side-loading the switch.', '', 'Harness: manufacturer 100 +/-3 length, 26 AWG UL3302 [I]', 'Two wire reservations dia 1.2, centre spacing 1.3; route through W1 with insulated/smooth edge [A]', 'Plan route passes side lanes at X=+/-11 and Y=24, above the cell, away from bottom electronics.', 'Retain full lead length with smooth loops; verify bend radius >=3 and strain relief on actual assembly.', 'Wire ends must not press on cell seals, PCB holes, magnets or exposed solder joints.', '', 'Critical checks before any fabrication release:', '1. Resolve the USB-C supplier-library/clearance blocker; repeat footprint, routing and export checks.', '2. Compare imported electronic models and the complete assembled envelope after J1 is finalized.', '3. Review stencil and through-hole shell soldering with the assembler; no assembler feedback obtained.', '', 'Prototype-only acceptance steps (not passed by these drawings):', 'Pack polarity and protection; charger voltage/current and hot/cold stops; pad thermal error and pressure;', 'actual component heights, battery swelling margin, cable abrasion, button/slider force and travel;', 'magnet retention, docking/drop tests; docked/detached RF; native iPhone and Android camera behavior.', '', 'Dimension sources are listed on sheets 1-3 and in mechanical/dimensions.json.', 'Original enclosure and grip design. No JJC internal dimensions are asserted.'])
C.save()
