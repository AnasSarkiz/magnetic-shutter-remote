"""Attribute actual exported functional text using isolated canonical CLI inputs.
Records are selected unchanged for read-only review, never patched or used as
fabrication inputs. The full board and fabrication exports remain untouched.
"""
import importlib.util
import json
import subprocess
import sys
from pathlib import Path
from zipfile import ZipFile
from gerbonara import GerberFile
from shapely.affinity import rotate
from shapely.geometry import LineString
from shapely.ops import polygonize,unary_union

ROOT=Path(__file__).resolve().parents[1]


def main():
    spec=importlib.util.spec_from_file_location('legend_export_review',ROOT/'scripts/review-r3-exports.py')
    review=importlib.util.module_from_spec(spec)
    sys.modules[spec.name]=review
    spec.loader.exec_module(review)
    circuit=json.loads((ROOT/'dist/index/circuit.json').read_text())
    board=next(e for e in circuit if e['type']=='pcb_board')
    output=ROOT/'evidence/R4/isolated-legend-review'
    output.mkdir(exist_ok=True)
    with ZipFile(ROOT/'fabrication/R4/R4-gerbers-review.zip') as archive:
        mask=review.copper_geometry(GerberFile.from_string(archive.read('F_Mask.gbr').decode()))
        silk=review.copper_geometry(GerberFile.from_string(archive.read('F_SilkScreen.gbr').decode()))
        edge=GerberFile.from_string(archive.read('Edge_Cuts.gbr').decode())
        lines=[LineString([(p.x1,p.y1),(p.x2,p.y2)]) for obj in edge.objects for p in obj.to_primitives()]
        outline=list(polygonize(unary_union(lines)))[0]
    rows=[]
    for text in [e for e in circuit if e['type']=='pcb_silkscreen_text']:
        input_path=output/(text['pcb_silkscreen_text_id']+'.json')
        input_path.write_text(json.dumps([board,text],indent=2)+'\n')
        archive_path=input_path.with_suffix('.zip')
        subprocess.run(['bun','tooling/circuit-json-to-gerber/dist/cli.js',str(input_path),'-o',str(archive_path)],cwd=ROOT,check=True,capture_output=True)
        with ZipFile(archive_path) as archive:
            layer=GerberFile.from_string(archive.read('F_SilkScreen.gbr').decode())
        geometry=review.copper_geometry(layer)
        if not silk.buffer(.00002).covers(geometry):
            raise ValueError('Attributed original text geometry absent from full final export')
        strokes=[p.width for obj in layer.objects for p in obj.to_primitives() if hasattr(p,'width')]
        local=rotate(geometry,-text['ccw_rotation'],origin=(text['anchor_position']['x'],text['anchor_position']['y']))
        rows.append({'source_id':text['pcb_silkscreen_text_id'],'text':text['text'],
                     'bounds_mm':geometry.bounds,'printed_glyph_height_mm':local.bounds[3]-local.bounds[1],
                     'minimum_stroke_mm':min(strokes),'mask_overlap_mm2':geometry.intersection(mask).area,
                     'mask_gap_mm':geometry.distance(mask),'outside_outline_mm2':geometry.difference(outline).area})
    (ROOT/'evidence/R4/functional-legend-review.json').write_text(json.dumps(rows,indent=2)+'\n')
    print('Functional labels below 0.15mm mask gap:',[r['text'] for r in rows if r['mask_gap_mm']<.15])
    print('Functional labels clipped:',[r['text'] for r in rows if r['outside_outline_mm2']>0])
    print('Actual local glyph heights:',min(r['printed_glyph_height_mm'] for r in rows),max(r['printed_glyph_height_mm'] for r in rows))
    print('Actual stroke diameters:',sorted(set(r['minimum_stroke_mm'] for r in rows)))


if __name__=='__main__':
    main()
