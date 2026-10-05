"""Dimensioned qualification illustration, not a component/footprint generator."""
import json
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
report = json.loads((ROOT / "evidence/R8-components/ESP32-footprint-audit.json").read_text())
target = ROOT / "tscircuit-issues/evidence/075/land-comparison.pdf"
page = canvas.Canvas(str(target), pagesize=landscape(A4))
page.setTitle("ESP32-C3 supplier/manufacturer land comparison — qualification blocked")
page.setFont("Helvetica-Bold", 16)
page.drawString(34, 558, "ESP32-C3-WROOM-02-N4 / C2934560")
page.setFont("Helvetica-Bold", 12)
page.setFillColor(colors.darkred)
page.drawString(34, 535, "QUALIFICATION BLOCKED — SUPPLIER VARIATION NOT APPROVED")
page.setFillColor(colors.black)
page.setFont("Helvetica", 10)
page.drawString(34, 513, "Espressif v1.7, Figure 11-1 p38; preserved EasyEDA package ab901810668e4ba2b431728512d738d6")

# Same-centre size overlay deliberately compares dimensions only; not a new land pattern.
scale = 110
cx, cy = 233, 348
page.setFillColor(colors.Color(0.98, 0.79, 0.76))
page.setStrokeColor(colors.darkred)
page.rect(cx-report["actual_contact_width_mm"][0]*scale/2,
          cy-report["actual_contact_height_mm"][0]*scale/2,
          report["actual_contact_width_mm"][0]*scale,
          report["actual_contact_height_mm"][0]*scale, fill=1)
page.setFillColor(colors.Color(0.62, 0.80, 0.99))
page.setStrokeColor(colors.darkblue)
page.rect(cx-1.5*scale/2, cy-0.9*scale/2, 1.5*scale, 0.9*scale, fill=1)
page.setFillColor(colors.black)
page.setFont("Helvetica-Bold", 11)
page.drawCentredString(cx, 430, "Outer contact, same-centre dimension overlay")
page.setFont("Helvetica", 11)
page.setFillColor(colors.darkred)
page.drawCentredString(cx, 273, "Supplier: 1.999996 x 0.999998 mm")
page.setFillColor(colors.darkblue)
page.drawCentredString(cx, 253, "Espressif recommendation: 1.5 x 0.9 mm")
page.setFillColor(colors.black)
page.setFont("Helvetica", 10)
page.drawString(462, 428, "All 18 outer contacts have the same discrepancy.")
page.drawString(462, 401, "Nine EP ground tiles agree: 0.7 x 0.7 mm.")
page.drawString(462, 374, "27/27 raw-source/import copper features retained.")
page.drawString(462, 347, "Conversion discrepancy: 5.085e-14 mm maximum.")
page.drawString(462, 320, "19/19 logical pin identities checked against datasheet.")
page.drawString(462, 293, "No imported definition or generated JSON was edited.")
page.setFont("Helvetica-Bold", 10)
page.drawString(34, 193, "This is NOT a fabrication drawing or a proposed substitute footprint.")
page.setFont("Helvetica", 10)
page.drawString(34, 172, "The manufacturer specifies recommended lands, not a tolerance envelope. No failure tolerance is invented.")
page.drawString(34, 151, "Faithful supplier import does not establish manufacturer approval of the larger copper/paste pattern.")
page.drawString(34, 130, "Raw input, all pad coordinates, native renders and original import are preserved alongside the report.")
page.drawString(34, 91, "Source attribution: JLCEDA/EasyEDA Official Library — https://lceda.cn/ — https://easyeda.com/")
page.drawString(34, 70, "Engineering review date: 2026-10-05. R6/R7 unchanged; R8 is not ready for fabrication.")
page.save()
print(target)
