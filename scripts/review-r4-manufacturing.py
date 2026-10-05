"""Read-only R4 DFM metrology. Never edits electronic or fabrication geometry."""
import csv
import hashlib
import importlib.util
import json
import math
import sys
from pathlib import Path
from zipfile import ZipFile

from gerbonara import GerberFile
from shapely.geometry import LineString, box
from shapely.ops import polygonize, unary_union

ROOT = Path(__file__).resolve().parents[1]


def load_review_module():
    spec = importlib.util.spec_from_file_location('r4_export_review', ROOT/'scripts/review-r3-exports.py')
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def unique_index(rows, key):
    indexed = {}
    for row in rows:
        ref = row[key]
        if ref in indexed:
            raise ValueError(f'Duplicate {key}: {ref}')
        indexed[ref] = row
    return indexed


def read_csv(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))


def validate_assembly(circuit, files):
    source = unique_index([e for e in circuit if e['type']=='source_component'], 'name')
    pcb = unique_index([e for e in circuit if e['type']=='pcb_component'], 'source_component_id')
    engineering = unique_index([dict(part, ref=ref) for part in files['parts'] for ref in part['reference_designators']], 'ref')
    bom = unique_index(files['bom'], 'Designator')
    cpl = unique_index(files['cpl'], 'Designator')
    rotations = unique_index(files['rotations'], 'designator')
    if len(source)!=37 or any(set(index)!=set(source) for index in [engineering,bom,cpl,rotations]):
        raise ValueError('Exact fitted reference coverage mismatch')
    result = []
    for ref, component in source.items():
        placed = pcb[component['source_component_id']]
        part, exported, position, resolved = engineering[ref],bom[ref],cpl[ref],rotations[ref]
        if placed.get('do_not_place') or placed['layer']!='top' or position['Layer']!='top':
            raise ValueError(f'{ref}: DNP or wrong assembly side')
        if exported['Comment']!=part['manufacturer_part_number'] or exported['JLCPCB Part #']!=part['lcsc']:
            raise ValueError(f'{ref}: exact MPN/C-number mismatch')
        if component['manufacturer_part_number']!=part['manufacturer_part_number'] or component['supplier_part_numbers']['jlcpcb']!=[part['lcsc']]:
            raise ValueError(f'{ref}: source identity differs')
        for axis in ['x','y']:
            if abs(float(position[f'Mid {axis.upper()}'])-placed['center'][axis])>.000501:
                raise ValueError(f'{ref}: CPL centre mismatch')
        if float(position['Rotation'])!=resolved['rotation']:
            raise ValueError(f'{ref}: CPL rotation mismatch')
        if not placed.get('supplier_pin1_location_map',{}).get('jlcpcb'):
            raise ValueError(f'{ref}: no supplier orientation reference')
        ports = [e for e in circuit if e['type']=='source_port' and e['source_component_id']==component['source_component_id']]
        contacts = []
        for port in ports:
            terminals = [e for e in circuit if e['type']=='pcb_port' and e.get('source_port_id')==port['source_port_id']]
            contacts.extend({'pin':port.get('pin_number'),'name':port['name'],'x_mm':e['x'],'y_mm':e['y']} for e in terminals)
        result.append({'ref':ref,'mpn':part['manufacturer_part_number'],'lcsc':part['lcsc'],
                       'side':'TOP','bom':True,'cpl':True,'rotation_degrees':resolved['rotation'],
                       'source_rotation_degrees':placed['rotation'],'centroid_mm':placed['center'],
                       'pin1_location':placed['pin1_location'],'supplier_pin1_location':placed['supplier_pin1_location_map']['jlcpcb'],
                       'actual_terminals':contacts,'file_consistency':'PASS',
                       'assembly_method':'TOP SMT reflow + secondary manual shell solder' if ref=='J1' else 'TOP SMT reflow',
                       'assembly_excluded':False})
    return result


def matched_flash(layer, center):
    matches = [obj for obj in layer.objects if type(obj).__name__=='Flash' and math.dist((obj.x,obj.y),center)<.000002 and hasattr(obj.aperture,'w')]
    if len(matches)!=1:
        raise ValueError(f'Expected one rectangular aperture at {center}; found {len(matches)}')
    aperture = matches[0].aperture
    return {'x_mm':matches[0].x,'y_mm':matches[0].y,'width_mm':aperture.w,'length_mm':aperture.h}


def aperture_problems(apertures, bounds):
    mask, outline = bounds
    return [{'index':i,'malformed':not shape.is_valid or shape.area<=0,
             'outside_mask_mm2':shape.difference(mask.buffer(.00002)).area,
             'outside_board_mm2':shape.difference(outline.buffer(.00002)).area}
            for i,shape in enumerate(apertures)
            if not shape.is_valid or shape.area<=0 or not mask.buffer(.00002).covers(shape) or not outline.buffer(.00002).covers(shape)]


def inspect_r4():
    review = load_review_module()
    circuit_path = ROOT/'dist/index/circuit.json'
    circuit = json.loads(circuit_path.read_text())
    files = {'parts':json.loads((ROOT/'bom.json').read_text())['parts'],
             'rotations':json.loads((ROOT/'evidence/R4/assembly-rotations.json').read_text()),
             'bom':read_csv(ROOT/'fabrication/R4/JLCPCB-BOM.csv'),
             'cpl':read_csv(ROOT/'fabrication/R4/JLCPCB-CPL.csv')}
    assembly = validate_assembly(circuit, files)
    source_names = {e['source_component_id']:e['name'] for e in circuit if e['type']=='source_component'}
    pcb_names = {e['pcb_component_id']:source_names[e['source_component_id']] for e in circuit if e['type']=='pcb_component'}
    with ZipFile(ROOT/'fabrication/R4/R4-gerbers-review.zip') as archive:
        layers = {name:GerberFile.from_string(archive.read(name).decode()) for name in ['F_Cu.gbr','F_Mask.gbr','F_Paste.gbr','F_SilkScreen.gbr','Edge_Cuts.gbr']}
    raw = json.loads((ROOT/'evidence/R3/C2894893.raweasy.json').read_text())
    raw_pads = [row.split('~') for row in raw['packageDetail']['dataStr']['shape'] if row.startswith('PAD~')]
    usb = []
    for pad in [e for e in circuit if e['type']=='pcb_smtpad' and pcb_names[e['pcb_component_id']]=='J1']:
        pin = pad['port_hints'][0]
        raw_pin = {'pin5':'A12','pin6':'A9','pin7':'B5','pin8':'A5','pin9':'B9','pin10':'B12'}[pin]
        original = next(row for row in raw_pads if row[8]==raw_pin)
        raw_width, raw_length = float(original[4])*.254,float(original[5])*.254
        if max(abs(raw_width-pad['width']),abs(raw_length-pad['height']))>1e-9:
            raise ValueError('Raw supplier land dimensions do not match imported geometry')
        usb.append({'pin':pin,'contact':raw_pin,'manufacturer_width_mm':.8 if pin in ['pin5','pin10'] else .7,
                    'manufacturer_length_mm':1.2,'source':pad,
                    'raw_supplier_width_mm':raw_width,'raw_supplier_length_mm':raw_length,
                    'gerber_copper':matched_flash(layers['F_Cu.gbr'],(pad['x'],pad['y'])),
                    'gerber_mask':matched_flash(layers['F_Mask.gbr'],(pad['x'],pad['y'])),
                    'gerber_paste':matched_flash(layers['F_Paste.gbr'],(pad['x'],pad['y']))})
    slots = []
    readback = json.loads((ROOT/'evidence/R4/cam-readback/readback.json').read_text())
    for hole in [e for e in circuit if e['type']=='pcb_plated_hole' and pcb_names[e['pcb_component_id']]=='J1']:
        expected_box = box(hole['x']-hole['outer_width']/2,hole['y']-hole['outer_height']/2,hole['x']+hole['outer_width']/2,hole['y']+hole['outer_height']/2)
        primitives = [review.primitive_geometry(p) for obj in layers['F_Cu.gbr'].objects for p in obj.to_primitives()]
        local = unary_union([g for g in primitives if expected_box.buffer(.000002).covers(g)])
        if local.is_empty:
            raise ValueError('Missing original shell copper primitive geometry')
        exported = next(hit for hit in readback['drills']['drill-L1-L2.drl'] if hit['source_id']==hole['pcb_plated_hole_id'])
        slots.append({'source':hole,'gerber_copper_bounds_mm':local.bounds,
                      'gerber_copper_width_mm':local.bounds[2]-local.bounds[0],
                      'gerber_copper_length_mm':local.bounds[3]-local.bounds[1], 'drill':exported})
    lines = [LineString([(p.x1,p.y1),(p.x2,p.y2)]) for obj in layers['Edge_Cuts.gbr'].objects for p in obj.to_primitives()]
    outline = list(polygonize(unary_union(lines)))[0]
    paste_shapes = [review.copper_geometry(GerberFile(objects=[obj])) for obj in layers['F_Paste.gbr'].objects]
    mask = review.copper_geometry(layers['F_Mask.gbr'])
    problems = aperture_problems(paste_shapes,(mask,outline))
    paste = [e for e in circuit if e['type']=='pcb_solder_paste']
    smt = [e for e in circuit if e['type']=='pcb_smtpad']
    associations = unique_index(paste,'pcb_smtpad_id')
    if set(associations)!=set(e['pcb_smtpad_id'] for e in smt) or any(e['layer']!='top' for e in paste):
        raise ValueError('Paste does not cover exactly all TOP SMT pads')
    merged = [(i,j) for i,g in enumerate(paste_shapes) for j,h in enumerate(paste_shapes[:i]) if g.intersects(h)]
    paste_summary = [{'ref':ref,'pad_count':sum(pcb_names[e['pcb_component_id']]==ref for e in smt),
                     'apertures':[{'source_id':e['pcb_solder_paste_id'],'width_mm':e.get('width'),'height_mm':e.get('height'),'x_mm':e['x'],'y_mm':e['y']} for e in paste if pcb_names[e['pcb_component_id']]==ref]} for ref in source_names.values()]
    legend = review.copper_geometry(layers['F_SilkScreen.gbr'])
    result = {'circuit_sha256':hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
              'usb_contacts':usb,'usb_shells':slots,'assembly':assembly,
              'paste':{'top_aperture_count':len(paste_shapes),'source_smt_pad_count':len(smt),'problems':problems,'merged_pairs':merged,'per_reference':paste_summary,
                       'minimum_aperture_web_mm':min(g.distance(h) for i,g in enumerate(paste_shapes) for h in paste_shapes[:i]),
                       'geometric_fidelity':'PASS','process_qualification':'BLOCKED — manufacturer/process-qualified thickness and apertures not defined'},
              'legend':{'outside_board_area_mm2':legend.difference(outline).area,'over_mask_opening_area_mm2':legend.intersection(mask).area},
              'qualification':'DFM REVIEW ONLY — USB expanded-land acceptance unresolved; no fabrication candidate'}
    (ROOT/'evidence/R4/manufacturing-review.json').write_text(json.dumps(result,indent=2)+'\n')
    print(f'37 exact fitted identities/centres/rotations checked; {len(paste_shapes)} paste apertures; {len(problems)} geometry problems; {len(merged)} merged pairs. USB qualification remains blocked.')


if __name__=='__main__':
    inspect_r4()
