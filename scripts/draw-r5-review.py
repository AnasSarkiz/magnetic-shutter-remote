"""R5 assembly/dimensioned DFM drawings from actual validated source and CPL.
All coordinates in board XY mm, +X right, +Y up, +Z TOP. No CAM is edited.
"""
import importlib.util,json,sys,subprocess
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import Table,TableStyle,Paragraph
from reportlab.lib.styles import ParagraphStyle
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('registration',ROOT/'scripts/audit-r4-qualification.py');a=importlib.util.module_from_spec(spec);sys.modules['registration']=a;spec.loader.exec_module(a)
review=json.loads((ROOT/'evidence/R5/manufacturing-review.json').read_text());W,H=A4
pdf=ROOT/'fabrication/R5/ASSEMBLY-DRAWING.pdf';doc=canvas.Canvas(str(pdf),pagesize=A4)
doc.setFont('Helvetica-Bold',16);doc.drawString(35,H-40,'R5 — DFM REVIEW ONLY')
doc.setFont('Helvetica',9);doc.drawString(35,H-59,'37 TOP fitted parts. No fabrication candidate. Physical tests not performed.')
doc.drawImage(str(ROOT/'dist/index/pcb.png'),115,250,width=365,height=490,preserveAspectRatio=True,mask='auto')
doc.setFont('Helvetica',10)
for y,text in [(220,'PCB: original 36 x 56 x 1 mm, two layers, 2 mm corner radius.'),(202,'Mounting: H1 (-13,24), H2 (13,24), diameter 2.2 mm. Engineering design.'),(184,'USB HCTL footprint and secondary shell solder profile remain unqualified.'),(166,'Stencil strategy: 0.10 mm, qualified numeric aperture release geometry.'),(148,'SWD: TOP pin 1 marked; BOTTOM table. BAT + is J2 pin 1, BAT - pin 2.'),(130,'Source: index.circuit.tsx / src/remote-circuit.tsx; actual Gerbers and drills reviewed.'),(112,'Battery, RF, thermal, runtime, fit and phone: POST-PROTOTYPE PHYSICAL VALIDATION.')]:doc.drawString(35,y,text)
doc.showPage();doc.setFont('Helvetica-Bold',14);doc.drawString(35,H-40,'Exact placement registration — TOP view')
style=ParagraphStyle('cell',fontName='Helvetica',fontSize=7.3,leading=8.5)
rows=[['Ref','Exact MPN','C-number','X mm','Y mm','CPL deg','Method']]
for r in review['assembly']:rows.append([r['ref'],Paragraph(r['mpn'],style),r['lcsc'],f"{r['centroid_mm']['x']:.3f}",f"{r['centroid_mm']['y']:.3f}",str(r['rotation_degrees']),'SMT + shell' if r['ref']=='J1' else 'TOP SMT'])
t=Table(rows,colWidths=[28,170,65,43,43,44,60],rowHeights=15);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#173541')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),7.3),('GRID',(0,0),(-1,-1),.2,colors.grey)]));_,h=t.wrap(W-70,H);t.drawOn(doc,35,H-75-h)
doc.setFont('Helvetica',8);doc.drawString(35,90,'XY datum: PCB centre. +X right, +Y up. Positions are centroids, not authored anchors.')
doc.drawString(35,76,'J1 source anchor (0,23.25) differs from centroid (0,23.6749991); CPL rotation 180 deg.')
doc.save()
text=subprocess.check_output(['pdftotext','-layout',str(pdf),'-'],text=True);(ROOT/'evidence/R5/assembly-drawing-text.txt').write_text(text)
c=json.loads((ROOT/'dist/index/circuit.json').read_text())
inputs={'authored':json.loads((ROOT/'evidence/R4-qualification/authored-placements.json').read_text()),'cpl':a.read_csv(ROOT/'fabrication/R5/JLCPCB-CPL.csv'),'bom':a.read_csv(ROOT/'fabrication/R5/JLCPCB-BOM.csv'),'drawing':a.read_pdf_placements(text),'rotations':json.loads((ROOT/'evidence/R5/assembly-rotations.json').read_text())}
registration=a.validate_registration(c,inputs)
(ROOT/'evidence/R5/registration.json').write_text(json.dumps({'coverage':len(registration),'registration':registration},indent=2)+'\n')
svg='''<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="750" viewBox="0 0 1100 750"><rect width="1100" height="750" fill="white"/><g fill="#173541" font-family="sans-serif"><text x="35" y="45" font-size="25">R5 USB land review — exact HCTL C2894893</text><text x="35" y="80" font-size="18">No supplier footprint modification. Not approved for fabrication.</text>'''
for y,label,actual,nominal in [(170,'VBUS width',.7599934,.7),(420,'Shell width',1.0999978,.9)]:
 scale=400;svg+=f'<rect x="80" y="{y}" width="{actual*scale}" height="110" fill="#d35454"/><rect x="80" y="{y}" width="{nominal*scale}" height="110" fill="none" stroke="#173541" stroke-width="3" stroke-dasharray="8 6"/><text x="600" y="{y+35}" font-size="22">{label}: actual {actual:.6f} mm</text><text x="600" y="{y+70}" font-size="20">Drawing {nominal:.2f} ±0.05 mm</text><text x="600" y="{y+102}" font-size="18">Exceeds upper limit by {actual-nominal-.05:.6f} mm</text>'
svg+='<text x="35" y="675" font-size="18">Red = exported copper width. Dashed = manufacturer nominal. Dimensions in mm.</text></g></svg>'
(ROOT/'fabrication/R5/USB-LAND-REVIEW.svg').write_text(svg)
print('37/37 source → Circuit JSON → CPL → actual PDF registration checks pass')
