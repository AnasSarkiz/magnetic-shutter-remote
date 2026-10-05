"""Read-only qualification of the preserved R4 exports; never regenerates CAM."""
import csv
import hashlib
import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path
from zipfile import ZipFile

from gerbonara import GerberFile
from shapely.geometry import LineString
from shapely.ops import polygonize, unary_union

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'evidence/R4-qualification'
POSITION_SERIALIZATION_MM = 0.000501


def load_manufacturing_review():
    specification = importlib.util.spec_from_file_location(
        'qualification_manufacturing_review', ROOT / 'scripts/review-r4-manufacturing.py')
    module = importlib.util.module_from_spec(specification)
    sys.modules[specification.name] = module
    specification.loader.exec_module(module)
    return module


def read_csv(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))


def read_pdf_placements(pdf_text):
    rows = []
    for line in pdf_text.splitlines():
        match = re.fullmatch(
            r'\s*((?:J|U|R|C|Q|LED|SW)\d+)\s+(\S+)\s+(C\d+)\s+'
            r'(-?\d+\.\d+)\s+(-?\d+\.\d+)\s+(\d+)\s+(?:TOP SMT|SMT \+ shell)\s*', line)
        if match:
            ref, mpn, lcsc, x_mm, y_mm, ccw_rotation_degrees = match.groups()
            rows.append({'ref': ref, 'mpn': mpn, 'lcsc': lcsc,
                         'x_mm': float(x_mm), 'y_mm': float(y_mm),
                         'ccw_rotation_degrees': float(ccw_rotation_degrees)})
    return rows


def validate_registration(circuit, inputs):
    review = load_manufacturing_review()
    source = review.unique_index([e for e in circuit if e['type'] == 'source_component'], 'name')
    pcb = review.unique_index([e for e in circuit if e['type'] == 'pcb_component'], 'source_component_id')
    groups = review.unique_index([e for e in circuit if e['type'] == 'pcb_group'], 'pcb_group_id')
    authored = review.unique_index(inputs['authored'], 'ref')
    cpl = review.unique_index(inputs['cpl'], 'Designator')
    bom = review.unique_index(inputs['bom'], 'Designator')
    drawing = review.unique_index(inputs['drawing'], 'ref')
    rotation = review.unique_index(inputs['rotations'], 'designator')
    if len(source) != 37 or any(set(rows) != set(source) for rows in [authored, cpl, bom, drawing, rotation]):
        raise ValueError('Exact 37-reference registration coverage mismatch')
    result = []
    for ref, component in source.items():
        placed = pcb[component['source_component_id']]
        position, literal, printed = cpl[ref], authored[ref], drawing[ref]
        if placed['layer'] != 'top' or position['Layer'] != 'top' or placed.get('do_not_place'):
            raise ValueError(f'{ref}: wrong TOP convention / DNP')
        if 'positioned_relative_to_pcb_group_id' in placed:
            group = groups[placed['positioned_relative_to_pcb_group_id']]
            if group['anchor_position'] != {'x': 0, 'y': 0} or group['positioned_relative_to_pcb_board_id'] != 'pcb_board_0':
                raise ValueError(f'{ref}: nonzero or unsupported group anchor frame')
        elif placed.get('positioned_relative_to_pcb_board_id') != 'pcb_board_0':
            raise ValueError(f'{ref}: unsupported placement coordinate frame')
        if placed['rotation'] != literal['ccw_rotation_degrees']:
            raise ValueError(f'{ref}: authored-to-Circuit JSON rotation mismatch')
        for axis in ['x', 'y']:
            anchor_mm = float(placed[f'display_offset_{axis}'].removesuffix('mm'))
            if abs(anchor_mm - literal[f'{axis}_mm']) > 1e-9:
                raise ValueError(f'{ref}: authored anchor mismatch')
            centroid_mm = placed['center'][axis]
            for label, actual_mm in [('CPL', float(position[f'Mid {axis.upper()}'])),
                                     ('PDF', printed[f'{axis}_mm'])]:
                if abs(actual_mm - centroid_mm) > POSITION_SERIALIZATION_MM:
                    raise ValueError(f'{ref}: {label} centroid mismatch on {axis}')
        for label, angle in [('CPL', float(position['Rotation'])),
                             ('PDF', printed['ccw_rotation_degrees'])]:
            if angle != rotation[ref]['rotation']:
                raise ValueError(f'{ref}: {label} supplier rotation mismatch')
        if ref=='J1':
            registration=inputs.get('supplier_terminal_registration',{})
            if registration.get('terminalCount')!=16 or registration.get('maximumPositionErrorMm',1)>1e-6 or registration.get('rotationDegrees')!=float(position['Rotation']):
                raise ValueError('J1: exact supplier terminal rotation is unverified')
        elif placed['pin1_location'] != placed['supplier_pin1_location_map']['jlcpcb']:
            raise ValueError(f'{ref}: independent audit needs a reviewed nonzero supplier frame adjustment')
        if float(position['Rotation']) != literal['ccw_rotation_degrees'] % 360:
            raise ValueError(f'{ref}: unexpected supplier frame correction')
        if component['manufacturer_part_number'] != bom[ref]['Comment'] or printed['mpn'] != bom[ref]['Comment']:
            raise ValueError(f'{ref}: exact MPN registration mismatch')
        if printed['lcsc'] != bom[ref]['JLCPCB Part #'] or component['supplier_part_numbers']['jlcpcb'] != [printed['lcsc']]:
            raise ValueError(f'{ref}: exact supplier identity mismatch')
        result.append({'ref': ref, 'authored': literal, 'circuit_centroid_mm': placed['center'],
                       'circuit_ccw_rotation_degrees': placed['rotation'], 'cpl': position,
                       'drawing': printed, 'supplier_frame': placed.get('pin1_location', 'exact supplier terminal registration'),
                       'anchor_to_centroid_mm': {axis: placed['center'][axis] - literal[f'{axis}_mm'] for axis in ['x', 'y']},
                       'status': 'PASS — AUTHORITATIVELY VERIFIED'})
    return result


def rectangular_stencil_metrics(aperture, thickness_mm):
    width_mm, length_mm = aperture
    if min(width_mm, length_mm, thickness_mm) <= 0:
        raise ValueError('Stencil dimensions must be positive')
    return {'area_mm2': width_mm * length_mm,
            'area_ratio': width_mm * length_mm / (2 * (width_mm + length_mm) * thickness_mm),
            'aspect_ratio': min(width_mm, length_mm) / thickness_mm,
            'thickness_mm': thickness_mm}


def inspect_charger(circuit, layers):
    source_id = next(e['source_component_id'] for e in circuit if e['type'] == 'source_component' and e['name'] == 'U2')
    pcb_id = next(e['pcb_component_id'] for e in circuit if e['type'] == 'pcb_component' and e['source_component_id'] == source_id)
    review = load_manufacturing_review()
    result = []
    for pad in [e for e in circuit if e['type'] == 'pcb_smtpad' and e['pcb_component_id'] == pcb_id]:
        center_mm = (pad['x'], pad['y'])
        copper = review.matched_flash(layers['F_Cu.gbr'], center_mm)
        paste = review.matched_flash(layers['F_Paste.gbr'], center_mm)
        mask = review.matched_flash(layers['F_Mask.gbr'], center_mm)
        aperture_mm = (paste['width_mm'], paste['length_mm'])
        result.append({'pin': pad['port_hints'][0], 'copper': copper, 'paste': paste, 'mask': mask,
                       'paste_to_actual_copper_percent': 100 * paste['width_mm'] * paste['length_mm'] / (copper['width_mm'] * copper['length_mm']),
                       'rectangular_ratios': [rectangular_stencil_metrics(aperture_mm, thickness_mm) for thickness_mm in [.125, .1, .075]]})
    exposed = next(row for row in result if row['pin'] == 'pin11')
    area_mm2 = exposed['paste']['width_mm'] * exposed['paste']['length_mm']
    return {'apertures': result, 'exposed_pad_actual_paste_area_mm2': area_mm2,
            'nominal_physical_bounding_box_mm': [1.5, .9],
            'nominal_physical_bounding_box_coverage_percent': 100 * area_mm2 / (1.5 * .9),
            'physical_bounding_box_tolerance_coverage_percent': [100 * area_mm2 / (1.6 * 1), 100 * area_mm2 / (1.4 * .8)],
            'exact_physical_metal_area': 'Not uniquely dimensioned: index chamfer has no size',
            'ti_example_rectangular_bounding_area_mm2': 1.38 * .85,
            'ti_example_to_nominal_physical_bounding_box_percent': 100 * 1.38 * .85 / (1.5 * .9),
            'ti_stated_example_percent': 88,
            'ti_stated_example_denominator': 'Not defined uniquely; do not invert rounded 88% to invent die-pad area'}


def preserved_files():
    manifest = json.loads((OUTPUT / 'preservation-before.json').read_text())
    failures = [path for path, digest in manifest['files'].items()
                if hashlib.sha256((ROOT / path).read_bytes()).hexdigest() != digest]
    if failures:
        raise ValueError(f'Protected R4 artifacts changed: {failures}')
    return {'file_count': len(manifest['files']), 'changed_files': failures,
            'base_commit': manifest['base_commit'],
            'r4_archive_sha256': manifest['files']['deliverables/magnetic-shutter-remote-R4-DFM-REVIEW.zip']}


def main():
    circuit = json.loads((ROOT / 'dist/index/circuit.json').read_text())
    pdf_text = subprocess.check_output(['pdftotext', '-layout', str(ROOT / 'fabrication/R4/ASSEMBLY-DRAWING.pdf'), '-'], text=True)
    (OUTPUT / 'assembly-drawing-text.txt').write_text(pdf_text)
    inputs = {'authored': json.loads((OUTPUT / 'authored-placements.json').read_text()),
              'cpl': read_csv(ROOT / 'fabrication/R4/JLCPCB-CPL.csv'),
              'bom': read_csv(ROOT / 'fabrication/R4/JLCPCB-BOM.csv'),
              'drawing': read_pdf_placements(pdf_text),
              'rotations': json.loads((ROOT / 'evidence/R4/assembly-rotations.json').read_text())}
    registration = validate_registration(circuit, inputs)
    with ZipFile(ROOT / 'fabrication/R4/R4-gerbers-review.zip') as archive:
        layers = {name: GerberFile.from_string(archive.read(name).decode()) for name in ['F_Cu.gbr', 'F_Mask.gbr', 'F_Paste.gbr', 'Edge_Cuts.gbr']}
    lines = [LineString([(p.x1, p.y1), (p.x2, p.y2)]) for obj in layers['Edge_Cuts.gbr'].objects for p in obj.to_primitives()]
    polygons = list(polygonize(unary_union(lines)))
    if len(polygons) != 1 or polygons[0].bounds != (-18, -28, 18, 28):
        raise ValueError('Original CAM outline coordinate frame differs')
    readback = json.loads((OUTPUT / 'cam-readback/readback.json').read_text())
    result = {'registration': registration, 'cam_outline_centerline_bounds_mm': polygons[0].bounds,
              'registration_coverage': len(registration), 'charger': inspect_charger(circuit, layers),
              'charger_layout': {'source_copper_pour_or_region_count': sum(e['type'] in ['pcb_copper_pour', 'pcb_copper_region'] for e in circuit),
                                 'maximum_ordinary_trace_width_mm': max(p['width'] for e in circuit if e['type'] == 'pcb_trace' for p in e['route'] if p['route_type'] == 'wire'),
                                 'manufacturer_requirement': 'SLUSF65B section 7.4.1: solid ground plane tied to GND pin and thermal pad',
                                 'status': 'BLOCKED — SUPPLIER CONFIRMATION REQUIRED',
                                 'scope': 'Source and native/CAM visual review show pad-and-trace layout only. No physical thermal failure is claimed.'},
              'cam_readback': readback, 'preservation': preserved_files(),
              'physical_tests': {name: 'NOT RUN / PHYSICAL TEST PENDING' for name in ['battery', 'thermal', 'RF', 'enclosure fit', 'runtime', 'phone compatibility']}}
    (OUTPUT / 'qualification-audit.json').write_text(json.dumps(result, indent=2) + '\n')
    print('37 authored anchors / Circuit JSON centroids / CPL / actual PDF rows agree; full CAM readback retained.')
    print(f"{result['preservation']['file_count']} baseline artifacts unchanged; charger measurements and denominator calculations saved.")


if __name__ == '__main__':
    main()
