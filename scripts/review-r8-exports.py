"""Independent R8 Gerber readback. Does not edit source or fabrication geometry."""
import argparse
import importlib.util
import json
import hashlib
import sys
from pathlib import Path
from zipfile import ZipFile
from shapely.geometry import LineString
from shapely.ops import unary_union, polygonize
from gerbonara import GerberFile, graphic_primitives as gp
from r8_board_geometry import board_outline, rf_exclusion

ROOT=Path(__file__).resolve().parents[1]

def load_module(name, filename):
    spec=importlib.util.spec_from_file_location(name,ROOT/'scripts'/filename)
    module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module
    spec.loader.exec_module(module)
    return module

GEOMETRY=load_module('r8_geometry','manufacturing-audit.py')
READER=load_module('r8_readback_primitives','review-r3-exports.py')


def review(args):
    circuit=json.loads(args.circuit.read_text())
    if any(e['type'].endswith('_error') for e in circuit) or not any(e['type']=='pcb_trace' for e in circuit):
        raise ValueError('Fabrication release requires error-free routed source')
    copper,drills,widths=GEOMETRY.make_features(circuit,'gerber')
    audit=GEOMETRY.audit(copper,drills,widths)
    args.output.mkdir(parents=True,exist_ok=True)
    (args.output/'exact-source-manufacturing.json').write_text(json.dumps(audit,indent=2)+'\n')
    if audit['failures']:raise ValueError(f'{len(audit["failures"])} actual exported-geometry manufacturing failures')
    report={'layers':{},'drills':{},'source':str(args.circuit),'circuit_sha256':hashlib.sha256(args.circuit.read_bytes()).hexdigest(),'archive_sha256':hashlib.sha256(args.archive.read_bytes()).hexdigest()}
    layers={}
    with ZipFile(args.archive) as archive:
        if set(archive.namelist()) != READER.EXPECTED_FILES:raise ValueError('Gerber/Excellon file coverage differs')
        for name in sorted(archive.namelist()):
            source=archive.read(name).decode()
            if name.endswith('.gbr'):
                layer=GerberFile.from_string(source);layers[name]=layer
                report['layers'][name]={'objects':len(layer.objects),'bounds_mm':layer.bounding_box()}
                (args.output/(Path(name).stem+'.svg')).write_text(str(layer.to_svg(margin=1)))
            else:
                types=('pcb_hole',) if 'npth' in name else ('pcb_via','pcb_plated_hole')
                report['drills'][name]=READER.read_drills(READER.DrillReview(source,[e for e in circuit if e['type'] in types],name))
    for side,filename in [('top','F_Cu.gbr'),('bottom','B_Cu.gbr')]:
        expected=unary_union([e.geometry for e in copper if e.layer==side]);actual=READER.copper_geometry(layers[filename])
        report['layers'][filename]['copper_match']=READER.compare_geometry(READER.GeometryComparison(expected,actual,side))
        if actual.intersection(rf_exclusion(circuit)).area>GEOMETRY.EPS**2:raise ValueError('Exported copper enters RF exclusion')
    lines=[]
    for obj in layers['Edge_Cuts.gbr'].objects:
        for primitive in obj.to_primitives():
            if not isinstance(primitive,gp.Line):raise ValueError('Unsupported outline primitive')
            lines.append(LineString([(primitive.x1,primitive.y1),(primitive.x2,primitive.y2)]))
    outlines=list(polygonize(unary_union(lines)))
    if len(outlines)!=1:raise ValueError('Board outline mismatch')
    report['layers']['Edge_Cuts.gbr']['outline_match']=READER.compare_geometry(
        READER.GeometryComparison(board_outline(circuit),outlines[0],'board outline'))
    for side,filename in [('top','F_Paste.gbr'),('bottom','B_Paste.gbr')]:
        expected=unary_union([GEOMETRY.pad(e) for e in circuit if e['type']=='pcb_solder_paste' and e['layer']==side]);actual=READER.copper_geometry(layers[filename])
        report['layers'][filename]['paste_match']=READER.compare_geometry(READER.GeometryComparison(expected,actual,filename))
    for side,filename in [('top','F_Mask.gbr'),('bottom','B_Mask.gbr')]:
        pads=unary_union([e.geometry for e in copper if e.kind=='smt' and e.layer==side]);mask=READER.copper_geometry(layers[filename])
        if not pads.difference(mask.buffer(READER.COPPER_COMPARE_MM)).is_empty:raise ValueError('Covered SMT land')
        report['layers'][filename]['all_smt_lands_open']=True
    report['manufacturing_failures']=0
    (args.output/'readback.json').write_text(json.dumps(report,indent=2)+'\n')
    print('All 12 fabrication files independently parsed; exact copper, drills, mask, paste and outline PASS')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('archive',type=Path);parser.add_argument('circuit',type=Path);parser.add_argument('--output',type=Path,required=True)
    review(parser.parse_args())
