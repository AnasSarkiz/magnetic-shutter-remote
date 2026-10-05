"""Measure actual exported J1 mask webs; never imply supplier CAM acceptance."""
import importlib.util
import json
from pathlib import Path
import sys
from zipfile import ZipFile

from gerbonara import GerberFile
from shapely.geometry import box

from qualification_paths import get_review_paths

ROOT = Path(__file__).resolve().parents[1]
PATHS = get_review_paths(ROOT)
spec = importlib.util.spec_from_file_location('mask_cam_review', ROOT / 'scripts/review-r3-exports.py')
review = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = review
spec.loader.exec_module(review)
circuit = json.loads((ROOT / 'dist/index/circuit.json').read_text())
source = next(e for e in circuit if e['type'] == 'source_component' and e['name'] == 'J1')
component = next(e for e in circuit if e['type'] == 'pcb_component' and e['source_component_id'] == source['source_component_id'])
pads = [e for e in circuit if e['type'] == 'pcb_smtpad' and e['pcb_component_id'] == component['pcb_component_id']]
with ZipFile(PATHS.cam_archive) as archive:
    layers = {name: GerberFile.from_string(archive.read(name).decode()) for name in ['F_Cu.gbr', 'F_Mask.gbr', 'F_Paste.gbr']}
flashes = [review.copper_geometry(GerberFile(objects=[obj])) for obj in layers['F_Mask.gbr'].objects]
contacts = []
for pad in pads:
    matching = [shape for shape in flashes if abs(shape.centroid.x - pad['x']) < 0.000002 and abs(shape.centroid.y - pad['y']) < 0.000002]
    if len(matching) != 1:
        raise ValueError('J1 mask aperture cannot be uniquely attributed')
    contacts.append((pad, matching[0]))
pairs = sorted([
    {'pins': [a['port_hints'], b['port_hints']], 'mask_web_mm': ga.distance(gb)}
    for i, (a, ga) in enumerate(contacts) for b, gb in contacts[:i]
], key=lambda pair: pair['mask_web_mm'])
result = {
    'minimum_mask_web_mm': pairs[0]['mask_web_mm'], 'pairs': pairs,
    'supplier_mask_expansion_mm': 0.0508,
    'published_bridge_capability_mm': 0.10,
    'rule_source': 'https://jlcpcb.com/capabilities/pcb-capabilities',
    'rule_checked_date': '2026-10-04',
    'rule_context': 'Soldermask bridge row specifies 0.10 mm and describes minimum pad spacing for 1 oz standard-color inks. Do not substitute pad spacing for actual mask-web measurement.',
    'status': 'JLCPCB PROCESSED-PREVIEW REVIEW REQUIRED: measured web is below nominal 0.10 mm bridge capability. No automatic fabrication acceptance or removal of dams approved.',
}
(PATHS.evidence / 'usb-mask-review.json').write_text(json.dumps(result, indent=2) + '\n')
crop = box(-6, 21, 6, 29)
groups = []
for name, color, opacity in [('F_Cu.gbr', '#d69438', 1), ('F_Mask.gbr', '#05a3cc', 0.45), ('F_Paste.gbr', '#253575', 0.9)]:
    geometry = review.copper_geometry(layers[name]).intersection(crop)
    groups.append(geometry.svg(scale_factor=0.001, fill_color=color, opacity=opacity))
svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="-6 -29 12 8"><rect x="-6" y="-29" width="12" height="8" fill="white"/><g transform="scale(1,-1)">' + ''.join(groups) + '</g></svg>'
(PATHS.evidence / 'J1-actual-cam-overlay.svg').write_text(svg)
print('Actual J1 mask-web minimum mm:', result['minimum_mask_web_mm'])
