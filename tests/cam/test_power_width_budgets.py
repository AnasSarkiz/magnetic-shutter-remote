"""Detect switching-ripple width failures missed by a DC-only check."""
import importlib.util
import math
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location('power_width_review',ROOT/'scripts/review-r8-power.py')
REVIEW = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = REVIEW
SPEC.loader.exec_module(REVIEW)


class PowerWidthBudgetTest(unittest.TestCase):
    def test_old_neck_passes_dc_but_fails_switching_rms(self):
        switching = REVIEW.switching_current_budget({'input_floor_v':2.971566710888736,
                                                      'input_amps':0.7430844449524722})
        old_capacity = 0.048*10**0.44*((0.2/0.0254)*(0.035/0.0254))**0.725
        self.assertGreater(old_capacity,0.7430844449524722)
        self.assertGreater(switching['rms_design_amps'],old_capacity)
        paths = {'L1':{'ipc2221_external_estimate_10c_amps':old_capacity}}
        self.assertEqual(len(REVIEW.width_budget_failures(paths,{'L1':switching['rms_design_amps']})),1)
        paths['L1']['ipc2221_external_estimate_10c_amps'] = 0.048*10**0.44*((0.3/0.0254)*(0.035/0.0254))**0.725
        self.assertEqual(REVIEW.width_budget_failures(paths,{'L1':switching['rms_design_amps']}),[])

    def test_ripple_uses_minimum_frequency_and_inductance(self):
        result = REVIEW.switching_current_budget({'input_floor_v':3,'input_amps':0.74})
        ripple = 3*(1-3/3.533)/(2_200_000*1.2e-6)
        self.assertAlmostEqual(result['boost_ripple_peak_to_peak_amps'],ripple)
        self.assertAlmostEqual(result['rms_design_amps'],math.hypot(0.74,ripple/math.sqrt(12)))
        self.assertAlmostEqual(result['peak_design_amps'],0.74+ripple/2)
