"""Calculated R6 USB access; board XY mm, +Z above. No physical fit claim."""
import json,re,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
d=json.loads((ROOT/'mechanical/dimensions.json').read_text());c=json.loads((ROOT/'dist/index/circuit.json').read_text());source=next(e for e in c if e['type']=='source_component' and e['name']=='J1');placed=next(e for e in c if e['type']=='pcb_component' and e['source_component_id']==source['source_component_id'])
usb=d['usb'];mouth=usb['anchor_y']+2.5749694+2.1
# Exact-series front view: USB mouth axis 1.68 below top; body H=3.16.
# X.XX general tolerance +/-0.25; additional enclosure/PCB allocations explicit.
axis_z=d['remote']['pcb_top_z']+3.16-1.68
axis_tolerance=.25+.25+.3 # conservative sum of both drawing dimensions + PCB Z stack
opening_half=(usb['opening_height']-.2)/2
plug_half=6.5/2
vertical_clearance=opening_half-plug_half-abs(axis_z-usb['opening_centre_z'])-axis_tolerance
body_width_max=8.94+.25
horizontal_clearance=(usb['opening_width']-.2-body_width_max)/2-.2
# CAD cutout starts at Y=26.0; back wall ends Y=30.0. Shoulder reaches >=30.110169.
shoulder_clearance=mouth+2.05-30-.2-.15
if abs(mouth-28.6601694)>1e-8 or vertical_clearance<0 or horizontal_clearance<0 or shoulder_clearance<0:raise ValueError('USB clearance allocation fails; opening/placement needs revision')
result={'manufacturer_drawing':'references/GCT-USB4215-drawing-Rev-A.pdf; Rev A 2024-04-26','nominal_mating_face_y_mm':mouth,'pcb_edge_y_mm':28,'mating_face_overhang_mm':mouth-28,'authored_anchor_mm':[usb['anchor_x'],usb['anchor_y']],'actual_centroid_mm':placed['center'],'rotation_degrees':placed['rotation'],'opening_mm':[usb['opening_width'],usb['opening_height']],'opening_centre_yz_mm':[29,8],'nominal_mouth_axis_z_mm':axis_z,'axis_tolerance_budget_mm':axis_tolerance,'minimum_plug_vertical_gap_mm':vertical_clearance,'minimum_body_horizontal_gap_mm':horizontal_clearance,'plug_shoulder_outside_enclosure_mm':shoulder_clearance,'plug_body_maximum_height_mm':6.5,'plug_shoulder_minimum_length_mm':2.05,'scope':'Manufacturer-derived nominal/tolerance stack. Printing +/-0.2 and PCB Z +/-0.3 are engineering allocations, not measured performance. Both plug orientations have the same envelope. Verify actual selected cable and enclosure during bring-up.','body_to_battery_topview_gap_mm':(mouth-6.75)-(-5.7+27),'body_to_battery_worst_case_mm':(mouth-6.75)-(-5.7+27)-.2-.2,'production_process':'PENDING; manual prototype shell rework may be required'}
(REVIEW_PATHS.evidence/'usb-mechanical-fit.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
