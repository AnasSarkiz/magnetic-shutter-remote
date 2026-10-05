"""Annotate actual source geometry; this drawing is never fabrication input."""
import importlib.util
import json
import sys
from html import escape
from pathlib import Path
from shapely.geometry import box

spec = importlib.util.spec_from_file_location('assembly_audit', Path('scripts/manufacturing-audit.py'))
audit = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = audit
spec.loader.exec_module(audit)
circuit = json.loads(Path('dist/index/circuit.json').read_text())
copper, drills, widths = audit.make_features(circuit)
drill_geometries = {item.id: item for item in drills}
components = {item['name']: item['source_component_id'] for item in circuit if item['type']=='source_component'}
pcb_ids = {name:next(item['pcb_component_id'] for item in circuit if item['type']=='pcb_component' and item['source_component_id']==source_id) for name,source_id in components.items()}
svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="720" viewBox="0 0 1100 720"><rect width="1100" height="720" fill="#fff"/><g font-family="sans-serif" fill="#173541">']

def text(line, position):
    x,y = position
    svg.append(f'<text x="{x}" y="{y}" font-size="18">{escape(line)}</text>')

def geometry(shape, color):
    return shape.svg(fill_color=color).replace('stroke-width="2.0"','stroke-width="0.012"')

text('R3 — unsent assembly review; original supplier lands preserved', (35,38))
text('J1 HCTL HC-TYPE-C-6P-01A / C2894893',(35,78))
text('U2 TI BQ25185DLHR / C19725033',(590,78))
svg.append('<g transform="translate(260,255) scale(30,-30) translate(0,-23.25)">')
for item in circuit:
    if item.get('pcb_component_id') != pcb_ids['J1']:
        continue
    if item['type']=='pcb_smtpad':
        svg.append(geometry(audit.pad(item),'#c79337'))
    elif item['type']=='pcb_solder_paste':
        svg.append(geometry(audit.pad(item),'#6ab9cd'))
    elif item['type']=='pcb_plated_hole':
        hole = drill_geometries[item['pcb_plated_hole_id']]
        svg.append(geometry(hole.outer,'#c79337'))
        svg.append(geometry(hole.geometry,'white'))
svg.append('<path d="M-6 28H6" stroke="#ad3941" stroke-width=".05" stroke-dasharray=".2 .2"/></g>')
svg.append('<g transform="translate(810,235) scale(90,-90) translate(0,-13)">')
for item in circuit:
    if item.get('pcb_component_id')==pcb_ids['U2'] and item['type'] in ('pcb_smtpad','pcb_solder_paste'):
        svg.append(geometry(audit.pad(item),'#c79337' if item['type']=='pcb_smtpad' else '#6ab9cd'))
svg.append('<rect x="-.690127" y="12.575" width="1.38" height=".85" fill="none" stroke="#ad3941" stroke-width=".025" stroke-dasharray=".05 .04"/></g>')
for line,position in [
 ('Gold: actual copper; blue: actual paste.',(35,395)),
 ('4 original rounded plated slots: 0.5000244 × 1.401064 mm.',(35,425)),
 ('Shell copper: 1.0999978 × 1.7999964 mm; no shell paste.',(35,455)),
 ('Annulus min 0.199465 mm: above JLC absolute 0.18;', (35,485)),
 ('below recommended 0.25. Confirm solder/process margin.',(35,515)),
 ('Reference widths: VBUS 0.70; shell 0.90 (±0.05).',(35,545)),
 ('Actual VBUS 0.7599934; expanded lands unapproved.',(35,575)),
 ('Blue leads: 10 × 0.13999972 × 0.3499993 mm.',(590,395)),
 ('Blue EP: 1.0499979 × 0.62999874 mm.',(590,425)),
 ('Dashed red: TI EP example rotated to 1.38 × 0.85.',(590,455)),
 ('TI leads: 10 × 0.2 × 0.5; stencil 0.125 mm.',(590,485)),
 ('Default paste = 49% copper area (0.7 linear scale).',(590,515)),
 ('Qualified stencil thickness/apertures remain open.',(590,545)),
 ('Also review legend, panel/fixture and strict CPL registration.',(35,625)),
 ('Sources: unmodified circuit.json, HCTL Rev A, TI DLH drawing, JLC capabilities.',(35,660)),
 ('Calculated/exported dimensions only. Hardware reflow, fit and RF tests pending.',(35,690))]:
    text(line,position)
svg.append('</g></svg>')
Path('fabrication/assembly-process-review.svg').write_text(''.join(svg))
legend_text = [item for item in circuit if item['type']=='pcb_silkscreen_text']
legend_paths = [item for item in circuit if item['type']=='pcb_silkscreen_path']
measurements = {
    'minimum_source_text_size_mm':min(item['font_size'] for item in legend_text),
    'source_texts_under_1mm':[{'id':item['pcb_silkscreen_text_id'],'text':item['text'],'font_size_mm':item['font_size']} for item in legend_text if item['font_size']<1],
    'minimum_source_path_stroke_mm':min(item['stroke_width'] for item in legend_paths),
    'paths_under_0_15mm':sum(item['stroke_width']<.15 for item in legend_paths),
    'classification':'Manufacturer process limitation; source font size is not proof of actual printed glyph height. Actual CAM overlap/overhang measured separately.'}
Path('evidence/R3/legend-source-measurements.json').write_text(json.dumps(measurements,indent=2)+'\n')
print('Original land and actual aperture review drawing generated; legend dimensions recorded')
