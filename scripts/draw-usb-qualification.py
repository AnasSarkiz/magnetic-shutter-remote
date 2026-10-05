"""Annotate original Gerber copper for review, never create manufacturing input."""
import json
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
from gerbonara import GerberFile

ROOT = Path(__file__).resolve().parents[1]


def main():
    with ZipFile(ROOT / 'fabrication/R4/R4-gerbers-review.zip') as archive:
        copper = GerberFile.from_string(archive.read('F_Cu.gbr').decode())
    original_svg = str(copper.to_svg(force_bounds=((-6, 19), (6, 28.8)), fg='#9a7133'))
    layer = ET.fromstring(original_svg)
    layer.set('x', '35')
    layer.set('y', '90')
    layer.set('width', '830')
    layer.set('height', '470')
    layer.set('preserveAspectRatio', 'xMidYMid meet')
    original_transform = next(element for element in layer if element.tag.endswith('g'))
    measurements = json.loads((ROOT / 'evidence/R4/manufacturing-review.json').read_text())
    for contact in measurements['usb_contacts']:
        pad = contact['source']
        label = ET.SubElement(original_transform, 'g', {'transform': f"translate({pad['x']} {pad['y'] + .85}) scale(1 -1)"})
        ET.SubElement(label, 'text', {'text-anchor': 'middle', 'font-size': '.27', 'font-family': 'sans-serif', 'fill': '#173541'}).text = f"{pad['port_hints'][0].removeprefix('pin')}/{contact['contact']}"
    for shell in measurements['usb_shells']:
        hole = shell['source']
        label = ET.SubElement(original_transform, 'g', {'transform': f"translate({hole['x']} {hole['y'] + 1.25}) scale(1 -1)"})
        pin_number = next(hint for hint in hole['port_hints'] if hint.startswith('pin'))
        ET.SubElement(label, 'text', {'text-anchor': 'middle', 'font-size': '.30', 'font-family': 'sans-serif', 'fill': '#173541'}).text = f"shell {pin_number}"
    svg = ET.Element('svg', {'xmlns': 'http://www.w3.org/2000/svg', 'width': '900', 'height': '900', 'viewBox': '0 0 900 900'})
    ET.SubElement(svg, 'rect', {'width': '900', 'height': '900', 'fill': 'white'})
    svg.append(layer)
    annotations = [
        (25, 'J1 / HCTL HC-TYPE-C-6P-01A / C2894893'),
        (53, 'REVIEW ONLY: actual exported TOP copper, +X right / +Y up'),
        (595, 'All four shell lands: actual width 1.099998 mm'),
        (622, 'Recommended PCB copper width: 0.90 +/-0.05 mm'),
        (649, 'Pins 6/A9 and 9/B9 VBUS: actual width 0.759993 mm'),
        (676, 'Recommended PCB copper width: 0.70 +/-0.05 mm'),
        (703, 'Left-to-right contacts: 5/A12, 6/A9, 7/B5, 8/A5, 9/B9, 10/B12'),
        (742, 'Shell pin1 +X/lower row; pin2 +X/upper row; pin3 -X/lower; pin4 -X/upper'),
        (779, 'Physical VBUS terminal 0.56 +/-0.05 is NOT the copper comparison.'),
        (816, 'Original slot drill: 0.500024 x 1.401024 mm, all four parsed separately.'),
        (855, 'No supplier land, routed copper or CAM file is modified by this drawing.'),
    ]
    for y, text in annotations:
        ET.SubElement(svg, 'text', {'x': '25', 'y': str(y), 'font-family': 'sans-serif', 'font-size': '18', 'fill': '#173541'}).text = text
    (ROOT / 'evidence/R4-qualification/usb-width-qualification.svg').write_text(ET.tostring(svg, encoding='unicode') + '\n')


if __name__ == '__main__':
    main()
