import importlib.util
import sys
import unittest
from pathlib import Path
from shapely.geometry import box, Polygon

SPEC = importlib.util.spec_from_file_location('process_metrics', Path(__file__).resolve().parents[2]/'scripts/review-r8-process.py')
METRICS = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = METRICS
SPEC.loader.exec_module(METRICS)


class StencilReleaseTest(unittest.TestCase):
    def test_native_polygon_pad_requires_vertices_without_xy_fields(self):
        pad = {'shape':'polygon','points':[{'x':0,'y':0},{'x':2,'y':0},{'x':2,'y':1},{'x':1,'y':1},{'x':1,'y':2},{'x':0,'y':2}]}
        geometry = METRICS.GEOMETRY.pad(pad)
        self.assertAlmostEqual(geometry.area,3)
        self.assertEqual(geometry.bounds,(0,0,2,2))

    def test_narrow_aperture_fails_release_despite_long_dimension(self):
        result = METRICS.release_metrics(box(0,0,.1,2),.1)
        self.assertLess(result['area_ratio'],.66)
        self.assertLess(result['aspect_ratio'],1.5)

    def test_polygon_uses_true_area_not_bounding_box(self):
        triangle = Polygon([(0,0),(1,0),(0,1)])
        result = METRICS.release_metrics(triangle,.1)
        self.assertAlmostEqual(result['area_ratio'],.5/((2+2**.5)*.1))
        self.assertAlmostEqual(result['aspect_ratio'],(2**-.5)/.1)

    def test_invalid_thickness_is_rejected(self):
        with self.assertRaisesRegex(ValueError,'Invalid stencil'):
            METRICS.release_metrics(box(0,0,1,1),0)


class CompleteSilkscreenTest(unittest.TestCase):
    def test_supplier_circles_are_measured_beyond_text_only_attribution(self):
        # Original failing native export is retained; no synthetic text mirror.
        from zipfile import ZipFile
        from gerbonara import GerberFile
        from shapely.geometry import LineString
        from shapely.ops import polygonize, unary_union
        archive=Path(__file__).resolve().parents[2]/'fabrication/R8-standard-programmer-2026-10-05/R8-standard-programmer-route04-Gerbers.zip'
        with ZipFile(archive) as z:
            silk=GerberFile.from_string(z.read('F_SilkScreen.gbr').decode())
            mask=GerberFile.from_string(z.read('F_Mask.gbr').decode())
            edge=GerberFile.from_string(z.read('Edge_Cuts.gbr').decode())
        outline,=polygonize(unary_union([LineString([(p.x1,p.y1),(p.x2,p.y2)]) for obj in edge.objects for p in obj.to_primitives()]))
        result=METRICS.silkscreen_metrics(silk,METRICS.READER.copper_geometry(silk),METRICS.READER.copper_geometry(mask),outline)
        self.assertAlmostEqual(result['minimum_stroke_mm'],.1)
        self.assertLess(result['mask_gap_mm'],.15)
        self.assertEqual(result['outside_outline_mm2'],0)


class FunctionalLegendOverlapTest(unittest.TestCase):
    def test_original_native_pair_power_collision_is_rejected(self):
        import json
        root=Path(__file__).resolve().parents[2]
        review=json.loads((root/'evidence/R8-compact-pcb-2026-10-06/failed-route20-visual/process-review.json').read_text())
        self.assertFalse(review['failures'])  # Original mask/stroke-only audit missed it.
        overlaps=METRICS.label_overlap_failures(review['labels'])
        self.assertEqual(len(overlaps),1)
        self.assertEqual(set(overlaps[0]['texts']),{'PAIR','POWER'})

    def test_separate_positions_and_opposite_layers_are_controls(self):
        first={'text':'PAIR','layer':'top','bounds_mm':[0,0,4,1]}
        other={'text':'POWER','layer':'bottom','bounds_mm':[0,0,4,1]}
        self.assertEqual(METRICS.label_overlap_failures([first,other]),[])
        other.update(layer='top',bounds_mm=[0,2,4,3])
        self.assertEqual(METRICS.label_overlap_failures([first,other]),[])


if __name__=='__main__':
    unittest.main()
