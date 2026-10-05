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


if __name__=='__main__':
    unittest.main()
