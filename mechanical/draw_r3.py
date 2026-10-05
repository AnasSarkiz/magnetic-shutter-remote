"""Dimensioned original R3 design; native mechanical drawing, not a footprint."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
D=json.loads(Path('mechanical/dimensions.json').read_text())
C=canvas.Canvas('mechanical/R3-dimensioned-drawings.pdf',pagesize=landscape(A4));W,H=landscape(A4)
def txt(x,y,s,size=10):C.setFont('Helvetica',size);C.setFillColorRGB(.08,.17,.22);C.drawString(x,y,s)
def line(x,y,a,b):C.setStrokeColorRGB(.25,.35,.4);C.setLineWidth(.7);C.line(x,y,a,b)
def dim(x,y,a,b,s):
 line(x,y,a,b)
 if abs(y-b)<.01:line(x,y-4,x,y+4);line(a,b-4,a,b+4);txt((a+x)/2-15,y+7,s)
 else:line(x-4,y,x+4,y);line(a-4,b,a+4,b);txt(x-40,(b+y)/2,s)
def rows(x,y,ss):
 for s in ss:txt(x,y,s);y-=18
 return y
def page(n,s):
 txt(30,H-30,'MAGNETIC SHUTTER REMOTE | ORIGINAL DESIGN R3',18);txt(30,H-52,s,12)
 txt(30,20,f'{n}/4 | mm | All fitted electronics TOP | Calculated geometry; physical fit, thermal and RF tests pending.',9)
page(1,'PCB outline, connector, actuator and antenna datums')
s=6;ox=170;oy=292;X=lambda x:ox+x*s;Y=lambda y:oy+y*s
C.setFillColorRGB(.9,.95,.93);C.roundRect(X(-18),Y(-28),36*s,56*s,2*s,fill=1)
C.setFillColorRGB(1,.85,.65);C.rect(X(-18),Y(-28),36*s,5.1*s,fill=1,stroke=0)
for h in D['pcb']['holes']:C.setFillColorRGB(1,1,1);C.circle(X(h['x']),Y(h['y']),h['diameter']/2*s,fill=1);txt(X(h['x'])-8,Y(h['y'])-18,h['name'],9)
for name,x,y in [('J1',0,23.25),('J2',-13.5,12),('J3',13.2,16),('SW1',15,5),('SW2',-13.5,-7),('SW3',13.5,-4),('U1',0,-16),('U5',0,6)]:line(X(x)-3,Y(y),X(x)+3,Y(y));line(X(x),Y(y)-3,X(x),Y(y)+3);txt(X(x)+4,Y(y)+5,name,8)
dim(X(-18),Y(28)+16,X(18),Y(28)+16,'36.0');dim(X(-18)-20,Y(-28),X(-18)-20,Y(28),'56.0')
rows(330,470,['36 x 56 x 1.0 FR4, 2 copper layers, R2 corners [A]', 'All 37 fitted electronics on TOP; bottom copper has no parts.', 'Board width changed to fit PH/SH connectors and top circuitry.', 'Outline +/-0.2; thickness +/-0.1 fabrication targets [B]', 'XY centre datum; +Y USB; +Z top face.', 'H1/H2: (+/-13,24), dia 2.2 NPTH [A]', 'Old harness opening W1 removed; wiring above board.', 'J1 C2894893: (0,23.25), rotation 180 deg [A,C]', 'Six contact USB-C: independent 5.1k CC1/CC2 pull-downs.', 'J2 PH (-13.5,12), mating from -Y, internal [A,D]', 'J3 SH (13.2,16), mating from +Z, lid removed [A,E]', 'SW1 (15,5), 90 deg; stroke 1.6 [A,F]', 'SW2 (-13.5,-7), SW3 (13.5,-4), top [A,G]', 'TMP390 thermal sensor (0,6), top [A,H]', 'Antenna exclusion X +/-18, Y=-28 to -22.9 [A,I]', 'No copper, wire, battery or metal hardware in strip.'])
rows(330,160,['[A] Original engineering: src/remote-circuit.tsx, dimensions.json.', '[B] https://jlcpcb.com/capabilities/pcb-capabilities', '[C] C2894893-manufacturer.pdf Rev A; no locating holes.', '[D,E] JST-PH.pdf and JST-SH.pdf manufacturer land drawings.', '[F,G] SHOUHAN-MSK12C02.pdf / C720477-manufacturer.pdf', '[H,I] TI TMP390.pdf / Ebyte E73 manufacturer manual.'])
C.showPage();page(2,'Remote enclosure, battery carrier and thermal stack')
s=5;ox=168;oy=345
C.setFillColorRGB(.87,.92,.96);C.rect(ox-100,oy,200,16.8*s,fill=1)
C.setFillColorRGB(1,1,1);C.rect(ox-94,oy+6,188,14.4*s,fill=1)
C.setFillColorRGB(.1,.45,.25);C.rect(ox-90,oy+25,180,5,fill=1)
C.setFillColorRGB(.8,.85,.88);C.rect(ox-38.75,oy+41.5,77.5,21,fill=1)
C.setFillColorRGB(.9,.6,.25);C.rect(ox-5,oy+33,10,8.5,fill=1)
dim(ox-100,oy-20,ox+100,oy-20,'40.0');dim(ox+120,oy,ox+120,oy+84,'16.8')
rows(40,275,['Z=0 external back; PCB bottom=5.0, top=6.0 [A]', 'Body 40 x 60 x 16.8; max slider width 42.4 [A]', 'Walls 1.2, inner cavity 37.6 x 57.6; corners R3 [A]', 'Lid underside 15.6; cap top 17.5 [A]', 'PCB-wall gap 0.8 nominal / 0.5 tolerance allocation.', 'Board support dia 4.2, Z=1.2..5; lid boss Z=6.15..15.6.', 'Magnet + 0.5 cap top 4.675; PCB gap 0.325 nominal.'])
rows(370,470,['DATA POWER DTP401525(PHR), external pack [J]', 'Maximum 15.5 x 27 x 4.2; side space 16.6 [A,J]', 'Pack X +/-7.75; Y=-5.7..21.3; Z=8.3..12.5 [A]', 'Carrier floor Z=7.9..8.3; side gaps 0.55 nominal [A]', 'Carrier thermal aperture 2.4 x 2.4 at (0,6).', 'TMP390 package maximum height 0.6 -> top Z=6.6 [H]', 'Thermal-pad assembled gap target 1.7 [A,K]', 'Actual chip height/contact require measurement + shims.', 'Pouch must not be compressed by lid, shims or pad.', 'C8 maximum height 1.45: top Z=7.45 [L]', 'C8 relief 5 x 3 at (5,17.5); battery gap 0.85 nominal.', 'Battery-to-lid clearance 3.1 nominal, hardware untested.', 'PH mated max height 5.5 -> top Z=11.5 [D]', 'SH mated max height 6.3 -> top Z=12.3 [E]', 'Both connectors outside battery envelope in X.'])
rows(370,174,['[J] DTP401525-PHR-v2.pdf manufacturer pack drawing.', '[K] BERGQUIST GP1500-0.080-02-0404, free 2.032.', 'Henkel thermal-pad datasheet; cut 2 x 2, nominal 16.3% strain.', '[L] Samsung CL21A106KAYNNNE package drawing.', 'No JJC internal dimensions are asserted.'])
C.showPage();page(3,'Grip, docking envelope, magnets and antenna margins')
s=3;ox=176;oy=338;X=lambda x:ox+x*s;Y=lambda y:oy+y*s
C.setFillColorRGB(.87,.92,.95);C.roundRect(X(-34),Y(-74),68*s,108*s,16*s,fill=1)
C.setFillColorRGB(.78,.88,.9);C.roundRect(X(-20),Y(-72),40*s,60*s,3*s,fill=1)
C.setFillColorRGB(1,.85,.65);C.rect(X(-18),Y(-70),36*s,5.1*s,fill=1,stroke=0)
for x,y in D['magnets']['dock_centres']+D['magnets']['phone_centres']:C.circle(X(x),Y(y),6.35/2*s,fill=1)
dim(X(-34),Y(-74)-16,X(34),Y(-74)-16,'68.0');dim(X(-34)-20,Y(-74),X(-34)-20,Y(34),'108.0')
rows(370,470,['Grip 68 x 108, base 6.5; rail top Z=9.8; R16 [A]', 'Dock centre Y=-42; back Z=6.8; button top 24.3 [A]', 'Plate Z=-0.5; total plate-to-button stack 24.8 [A]', 'Cradle inner width 40.6; nominal side gap 0.3 [A]', 'Rails 1.6 x 48 x 3.3, centres X +/-21.1, Y=-38.', 'Stop 40.6 x 1.6 x 1.2, centre Y=-10.9.', 'Eight K&J D42 magnets, dia 6.35 x 3.175 [M]', 'Pockets dia 6.65; nominal adhesive radial gap 0.15 [A]', 'Remote (+/-13,16); dock (+/-13,-26) [A]', 'Phone magnets (+/-14,+/-14), captive behind cover [A]', 'Separate steel phone plate 45 x 45 x 0.5 [A]', 'Phone/case keep-in envelope 84 x 180 x 10 [A]', 'Phone bottom aligned Y=-35 +/-5; mark alignment [A]', 'Antenna Y=-70..-64.9 in dock frame.', 'Nearest permitted phone metal Y=-40: 24.9 gap.', 'Detached battery planar gap to antenna strip: 17.2.', 'Chosen metal margin 15; Ebyte provides no numeric rule.', 'These are calculated margins; RF hardware tests pending.', '[M] https://www.kjmagnetics.com/d42-neodymium-disc-magnet'])
C.showPage();page(4,'USB access, actuator travel, wiring and acceptance schedule')
rows(35,470,['USB-C HCTL HC-TYPE-C-6P-01A C2894893; Rev A body: 8.95 x 6.85 x 3.16 +/-0.15 height [C]', 'Recommended slots 4 x 0.50 x 1.40; shell centres X +/-4.32, row pitch 3.70 [C].', 'Supplier lands: GND 0.80, VBUS 0.76, CC 0.70 wide x 1.20; shell copper 1.10 x 1.80.', 'Opening 12 x 7 at (0,29,8), through front wall; connector mates +Y after 180 deg rotation [A,C].', 'Both USB orientations use separate CC pull-downs; no USB data or USB bootloader.', 'Plug reservation max 10 x 6.5 is an enclosure allocation; test intended cables before enclosure release.', '', 'Shutter/pair caps dia 5.8 in dia 6.2 holes; flange dia 8 x 0.8; stem dia 1.6 x 6.6 [A].', 'Stem rest Z=8.2; switch nominal top 8.0; free gap 0.2; travel 0.2 +/-0.1 [A,G].', 'TPU stem compliance is intentional; adjust to actual assembled height; avoid preload.', 'Side slider fork width 1.7 around nominal 1.3 switch actuator; designed travel 1.6 [A,F].', '', 'Harness: pack supplier lead length 100 +/-3 mm, red BAT+, black GND; actual connector polarity must be verified [J].', 'Two insulated conductor reservations dia 1.2, centre spacing 1.3; loop above left PH bay and outside antenna strip [A].', 'Harness bends and slack are assembly reservations; validate actual bend radius >=3, abrasion and strain relief.', 'No wire-through PCB opening or underside electronic assembly remains.', '', 'Before release: manufacturing copper/holes/slots, full CAM read, strict CPL rotations, stencil + hybrid shell process.', 'The manufacturer pattern does not automatically establish process compliance.', 'Physical acceptance still pending: battery protection, charge current/voltage, temperature cutoff and thermal coupling;', 'pouch clearance, wire retention, button/slider travel, magnet retention/drop tests, RF docked and detached;', 'firmware programming and native iPhone Camera / representative Android camera pairing and shutter behavior.', '', 'All electronics on TOP does not require single-layer copper. Two-layer FR4 remains selected.', 'This drawing is an original mechanical design. Calculated fit is not a physical measurement or acceptance test.'])
C.save()
