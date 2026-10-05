"""R6 assembly/dimensioned DFM drawings from actual validated source and CPL.
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
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
spec=importlib.util.spec_from_file_location('registration',ROOT/'scripts/audit-r6-registration.py');a=importlib.util.module_from_spec(spec);sys.modules['registration']=a;spec.loader.exec_module(a)
review=json.loads((REVIEW_PATHS.evidence/'manufacturing-review.json').read_text());W,H=A4
pdf=REVIEW_PATHS.fabrication/'ASSEMBLY-DRAWING.pdf';doc=canvas.Canvas(str(pdf),pagesize=A4)
doc.setFont('Helvetica-Bold',16);doc.drawString(35,H-40,'R6 — ENGINEERING PROTOTYPE')
doc.setFont('Helvetica',9);doc.drawString(35,H-59,'37 TOP fitted parts. Not production qualified. Physical tests not performed.')
doc.drawImage(str(ROOT/'dist/index/pcb.png'),115,250,width=365,height=490,preserveAspectRatio=True,mask='auto')
doc.setFont('Helvetica',10)
for y,text in [(220,'PCB: original 36 x 56 x 1 mm, two layers, 2 mm corner radius.'),(202,'Mounting: H1 (-13,24), H2 (13,24), diameter 2.2 mm. Engineering design.'),(184,'GCT USB4215; four shell anchors require prototype inspection; rework possible.'),(166,'Stencil strategy: 0.10 mm, qualified numeric aperture release geometry.'),(148,'SWD: TOP pin 1 marked; BOTTOM table. BAT + is J2 pin 1, BAT - pin 2.'),(130,'Source: index.circuit.tsx / src/remote-circuit.tsx; actual Gerbers and drills reviewed.'),(112,'Battery, RF, thermal, runtime, fit and phone: POST-PROTOTYPE PHYSICAL VALIDATION.')]:doc.drawString(35,y,text)
doc.showPage();doc.setFont('Helvetica-Bold',14);doc.drawString(35,H-40,'Exact placement registration — TOP view')
style=ParagraphStyle('cell',fontName='Helvetica',fontSize=7.3,leading=8.5)
rows=[['Ref','Exact MPN','C-number','X mm','Y mm','CPL deg','Method']]
for r in review['assembly']:rows.append([r['ref'],Paragraph(r['mpn'],style),r['lcsc'],f"{r['centroid_mm']['x']:.3f}",f"{r['centroid_mm']['y']:.3f}",str(r['rotation_degrees']),'SMT + shell' if r['ref']=='J1' else 'TOP SMT'])
t=Table(rows,colWidths=[28,170,65,43,43,44,60],rowHeights=15);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#173541')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),7.3),('GRID',(0,0),(-1,-1),.2,colors.grey)]));_,h=t.wrap(W-70,H);t.drawOn(doc,35,H-75-h)
doc.setFont('Helvetica',8);doc.drawString(35,90,'XY datum: PCB centre. +X right, +Y up. Positions are centroids, not authored anchors.')
doc.drawString(35,76,'J1 authored anchor (0,23.9852); exact centroid above. CPL rotation 180 deg.')
doc.save()
text=subprocess.check_output(['pdftotext','-layout',str(pdf),'-'],text=True);(REVIEW_PATHS.evidence/'assembly-drawing-text.txt').write_text(text)
c=json.loads((ROOT/'dist/index/circuit.json').read_text())
inputs={'authored':json.loads((REVIEW_PATHS.evidence/'authored-placements.json').read_text()),'cpl':a.read_csv(REVIEW_PATHS.fabrication/'JLCPCB-CPL.csv'),'bom':a.read_csv(REVIEW_PATHS.fabrication/'JLCPCB-BOM.csv'),'drawing':a.read_pdf_placements(text),'rotations':json.loads((REVIEW_PATHS.evidence/'assembly-rotations.json').read_text())}
inputs['supplier_terminal_registration']=json.loads((REVIEW_PATHS.evidence/'J1-supplier-terminal-registration.json').read_text())
registration=a.validate_registration(c,inputs)
(REVIEW_PATHS.evidence/'registration.json').write_text(json.dumps({'coverage':len(registration),'registration':registration},indent=2)+'\n')
