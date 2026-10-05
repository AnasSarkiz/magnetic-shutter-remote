"""Read-only exact R6 assembly, J1 geometry, paste/mask CAM metrology."""
import hashlib,importlib.util,json,math,sys
from pathlib import Path
from zipfile import ZipFile
from gerbonara import GerberFile
from shapely.geometry import LineString,box
from shapely.ops import unary_union,polygonize
ROOT=Path(__file__).resolve().parents[1]
from qualification_paths import get_review_paths
REVIEW_PATHS=get_review_paths(ROOT)
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,ROOT/path);result=importlib.util.module_from_spec(spec);sys.modules[name]=result;spec.loader.exec_module(result);return result
review=module('export_review','scripts/review-r3-exports.py');r5=module('assembly_review','scripts/review-r5-manufacturing.py');m=module('manufacturing','scripts/manufacturing-audit.py')
def validate_r6_assembly(circuit, files):
    source = r5.unique_index([e for e in circuit if e['type']=='source_component'], 'name')
    pcb = r5.unique_index([e for e in circuit if e['type']=='pcb_component'], 'source_component_id')
    engineering = r5.unique_index([dict(part, ref=ref) for part in files['parts'] for ref in part['reference_designators']], 'ref')
    bom = r5.unique_index(files['bom'], 'Designator')
    cpl = r5.unique_index(files['cpl'], 'Designator')
    rotations = r5.unique_index(files['rotations'], 'designator')
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
        if ref!='J1' and not placed.get('supplier_pin1_location_map',{}).get('jlcpcb'):
            raise ValueError(f'{ref}: no supplier orientation reference')
        ports = [e for e in circuit if e['type']=='source_port' and e['source_component_id']==component['source_component_id']]
        contacts = []
        for port in ports:
            terminals = [e for e in circuit if e['type']=='pcb_port' and e.get('source_port_id')==port['source_port_id']]
            contacts.extend({'pin':port.get('pin_number'),'name':port['name'],'x_mm':e['x'],'y_mm':e['y']} for e in terminals)
        result.append({'ref':ref,'mpn':part['manufacturer_part_number'],'lcsc':part['lcsc'],
                       'side':'TOP','bom':True,'cpl':True,'rotation_degrees':resolved['rotation'],
                       'source_rotation_degrees':placed['rotation'],'centroid_mm':placed['center'],
                       'pin1_location':placed.get('pin1_location'),'supplier_pin1_location':placed.get('supplier_pin1_location_map',{}).get('jlcpcb'),
                       'actual_terminals':contacts,'file_consistency':'PASS',
                       'assembly_method':'TOP SMT reflow + secondary manual shell solder' if ref=='J1' else 'TOP SMT reflow',
                       'assembly_excluded':False})
    return result



c=json.loads((ROOT/'dist/index/circuit.json').read_text());parts=json.loads((ROOT/'bom.json').read_text())['parts'];owners={e['pcb_component_id']:next(s['name'] for s in c if s['type']=='source_component' and s['source_component_id']==e['source_component_id']) for e in c if e['type']=='pcb_component'}
files={'parts':parts,'rotations':json.loads((REVIEW_PATHS.evidence/'assembly-rotations.json').read_text()),'bom':r5.read_csv(REVIEW_PATHS.fabrication/'JLCPCB-BOM.csv'),'cpl':r5.read_csv(REVIEW_PATHS.fabrication/'JLCPCB-CPL.csv')};assembly=validate_r6_assembly(c,files)
registration=json.loads((REVIEW_PATHS.evidence/'J1-supplier-terminal-registration.json').read_text())
if registration['terminalCount']!=16 or registration['rotationDegrees']!=180 or registration['maximumPositionErrorMm']>1e-6:raise ValueError('J1 supplier rotation not verified')
# Independent Python check: all supplier-labelled terminal centres under the CPL pose.
supplier=json.loads((ROOT/'evidence/USB4215-import-audit/final/circuit.json').read_text())
supplier_ports={e['source_port_id']:e.get('pin_number') for e in supplier if e['type']=='source_port'}
j1=next(e for e in c if e['type']=='source_component' and e['name']=='J1')
current_ports={e['source_port_id']:e.get('pin_number') for e in c if e['type']=='source_port' and e['source_component_id']==j1['source_component_id']}
current_positions={current_ports[e['source_port_id']]:(e['x'],e['y']) for e in c if e['type']=='pcb_port' and e.get('source_port_id') in current_ports}
for terminal in [e for e in supplier if e['type']=='pcb_port']:
 actual=current_positions[supplier_ports[terminal['source_port_id']]]
 expected=(-terminal['x'],23.9852-terminal['y'])
 if math.dist(actual,expected)>1e-6:raise ValueError('Independent supplier terminal/CPL registration failed')
for row in assembly:
 if row['ref']=='J1':row['assembly_method']='TOP SMT; prototype inspect all four shell joints, manual rework may be required. Production method pending.'
with ZipFile(REVIEW_PATHS.cam_archive) as archive:layers={name:GerberFile.from_string(archive.read(name).decode()) for name in ['F_Cu.gbr','F_Mask.gbr','F_Paste.gbr','F_SilkScreen.gbr','Edge_Cuts.gbr']}
cu=review.copper_geometry(layers['F_Cu.gbr']);mask=review.copper_geometry(layers['F_Mask.gbr']);paste_shapes=[review.copper_geometry(GerberFile(objects=[obj])) for obj in layers['F_Paste.gbr'].objects]
lines=[LineString([(p.x1,p.y1),(p.x2,p.y2)]) for obj in layers['Edge_Cuts.gbr'].objects for p in obj.to_primitives()];outline=list(polygonize(unary_union(lines)))[0]
problems=r5.aperture_problems(paste_shapes,(mask,outline));merged=[(i,j) for i,g in enumerate(paste_shapes) for j,h in enumerate(paste_shapes[:i]) if g.intersects(h)]
paste=[e for e in c if e['type']=='pcb_solder_paste'];usb_paste=[e for e in paste if owners[e['pcb_component_id']]=='J1'];usb_contacts=[e for e in c if e['type']=='pcb_smtpad' and owners[e['pcb_component_id']]=='J1'];usb_slots=[e for e in c if e['type']=='pcb_plated_hole' and owners[e['pcb_component_id']]=='J1']
usb=[]
for aperture in usb_paste:
 geometry=m.pad(aperture);matches=[g for g in paste_shapes if g.hausdorff_distance(geometry)<.000002]
 if len(matches)!=1:raise ValueError('Missing/duplicate/incorrect J1 paste contour')
 usb.append({'source_id':aperture['pcb_solder_paste_id'],'source_bounds_mm':geometry.bounds,'gerber_bounds_mm':matches[0].bounds,'contour_difference_mm':geometry.hausdorff_distance(matches[0]),'area_mm2':matches[0].area,'inside_mask':mask.buffer(.00002).covers(geometry)})
readback=json.loads((REVIEW_PATHS.evidence/'cam-readback/readback.json').read_text());slots=[hit for hit in readback['drills']['drill-L1-L2.drl'] if hit['source_id'] in {e['pcb_plated_hole_id'] for e in usb_slots}]
contacts=[]
for pad in usb_contacts:
 flash=r5.matched_flash(layers['F_Cu.gbr'],(pad['x'],pad['y']));expected=m.pad(pad)
 if not cu.buffer(.00002).covers(expected):raise ValueError('Missing USB copper')
 if max(abs(flash['width_mm']-pad['width']),abs(flash['length_mm']-pad['height']))>.000002:raise ValueError('USB land changed during export')
 contacts.append({'pin':pad['port_hints'],'source':pad,'export':flash,'manufacturer_nominal_width_mm':.6 if pad['width']>.4 else .3,'manufacturer_length_mm':1.15,'manufacturer_length_tolerance_mm':.05})
if len(paste)!=161 or len(paste_shapes)!=161 or len(usb_paste)!=16 or len(usb_contacts)!=12 or len(slots)!=4 or problems or merged:raise ValueError('Exact paste/contact/slot coverage failure')
legend=review.copper_geometry(layers['F_SilkScreen.gbr']);summary={'circuit_sha256':hashlib.sha256((ROOT/'dist/index/circuit.json').read_bytes()).hexdigest(),'usb_contacts':contacts,'usb_paste':usb,'usb_shells':slots,'assembly':assembly,'paste':{'top_aperture_count':len(paste_shapes),'usb_aperture_count':len(usb),'maximum_usb_contour_difference_mm':max(e['contour_difference_mm'] for e in usb),'problems':problems,'merged_pairs':merged,'minimum_aperture_web_mm':min(g.distance(h) for i,g in enumerate(paste_shapes) for h in paste_shapes[:i])},'legend':{'outside_board_area_mm2':legend.difference(outline).area,'over_mask_opening_area_mm2':legend.intersection(mask).area},'qualification':'ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED; shell inspection/manual rework may be required'}
(REVIEW_PATHS.evidence/'manufacturing-review.json').write_text(json.dumps(summary,indent=2)+'\n');print('37 TOP references; 161 apertures; J1 16/16 contours, 12 contacts and 4 slots PASS')
