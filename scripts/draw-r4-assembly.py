"""Assembly review drawing from validated placement and native PCB image."""
import json
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT=Path(__file__).resolve().parents[1]
WIDTH,HEIGHT=A4


def heading(document, title):
    document.setFillColor(colors.HexColor('#133444'))
    document.setFont('Helvetica-Bold',17)
    document.drawString(35,HEIGHT-44,title)
    document.setFillColor(colors.HexColor('#a02f30'))
    document.setFont('Helvetica-Bold',10)
    document.drawString(35,HEIGHT-65,'R4 DFM REVIEW ONLY - NOT APPROVED FOR FABRICATION')


def paragraph(document, paragraph_specification):
    text,y=paragraph_specification
    style=ParagraphStyle('review',fontName='Helvetica',fontSize=10,leading=14,textColor=colors.HexColor('#173541'))
    block=Paragraph(text,style)
    _,height=block.wrap(WIDTH-70,HEIGHT)
    block.drawOn(document,35,y-height)
    return y-height-10


def footer(document, page):
    document.setFillColor(colors.grey)
    document.setFont('Helvetica',8)
    document.drawString(35,22,'Original 36 x 56 x 1 mm PCB; TOP fitted assembly; physical tests NOT RUN')
    document.drawRightString(WIDTH-35,22,str(page))


def main():
    report=json.loads((ROOT/'evidence/R4/manufacturing-review.json').read_text())
    document=canvas.Canvas(str(ROOT/'fabrication/R4/ASSEMBLY-DRAWING.pdf'),pagesize=A4)
    heading(document,'Magnetic shutter remote - assembly review')
    document.drawImage(str(ROOT/'dist/index/pcb.png'),130,260,width=335,height=475,preserveAspectRatio=True,anchor='c',mask='auto')
    y=245
    for text in [
        '<b>37 fitted components / 24 supplier identities; all TOP.</b> The native PCB view above shows actual routed R3 geometry retained in R4. Electrical, copper and placement geometry is unchanged; no view represents a physical board.',
        '<b>J1:</b> six contacts TOP reflow; four grounded plated shell slots require secondary manual soldering. Zero shell paste. Temperature/profile and expanded-land acceptance remain unqualified; do not proceed from these instructions.',
        '<b>J2:</b> external battery plug mates toward -Y. <b>J3:</b> SWD plug mates +Z with lid removed. <b>U1:</b> antenna toward -Y; keep both copper layers and nearby hardware clear per mechanical/RF review.',
        '<b>Assembly:</b> Standard service; U1 X-ray. Battery, thermal pad, printed housing and magnets installed after soldering/inspection. Stencil, functional legend, panel/fixture and supplier placement registration remain open.'
    ]:
        y=paragraph(document,(text,y))
    footer(document,1)
    document.showPage()
    heading(document,'Placement registration - all fitted references')
    style=ParagraphStyle('cell',fontName='Helvetica',fontSize=7.3,leading=8.5)
    headers=['Ref','Exact MPN','C-number','X mm','Y mm','CPL deg','Method']
    rows=[headers]
    for row in report['assembly']:
        rows.append([row['ref'],Paragraph(row['mpn'],style),row['lcsc'],f"{row['centroid_mm']['x']:.3f}",f"{row['centroid_mm']['y']:.3f}",str(row['rotation_degrees']),'SMT + shell' if row['ref']=='J1' else 'TOP SMT'])
    table=Table(rows,colWidths=[28,170,65,43,43,44,60],rowHeights=15)
    table.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#173541')),('TEXTCOLOR',(0,0),(-1,0),colors.white),
        ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTNAME',(0,1),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),7.3),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#f0f5f7'),colors.white]),
        ('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),3),
        ('GRID',(0,0),(-1,-1),.2,colors.HexColor('#bfcacf'))]))
    _,h=table.wrap(WIDTH-70,HEIGHT)
    table.drawOn(document,35,HEIGHT-88-h)
    y=HEIGHT-98-h
    y=paragraph(document,('<b>XY datum:</b> PCB centre, +X right / +Y up. CPL values use canonical component centroids, not enclosure anchors. J1 anchor (0,23.25) differs from centroid (0,23.6749991); supplier-resolved rotation 180 degrees.',y))
    paragraph(document,('All 37 references appear once in BOM and CPL. No DNP or assembly-excluded component. Exact pin views/polarity and supplier registration evidence: fabrication/BOM-CPL-REVIEW.md and evidence/R4/manufacturing-review.json. No assembler preview upload performed.',y))
    footer(document,2)
    document.save()


if __name__=='__main__':
    main()
