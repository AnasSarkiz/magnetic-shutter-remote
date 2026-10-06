"""Reject stale outlines and incomplete RF exclusions after PCB resizing."""
import copy
import importlib.util
import json
from pathlib import Path
import sys
import unittest
from shapely.geometry import box

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT/'scripts'))
from r8_board_geometry import board_outline, rf_exclusion
from curved_geometry import brep_polygon

SPEC = importlib.util.spec_from_file_location('boundary_readback',ROOT/'scripts/review-r3-exports.py')
READER = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = READER
SPEC.loader.exec_module(READER)


class BoardBoundariesTest(unittest.TestCase):
    def setUp(self):
        self.circuit = json.loads((ROOT/'dist/index/circuit.json').read_text())

    def test_full_outline_rejects_removed_corner_rounding_with_identical_bounds(self):
        outline = board_outline(self.circuit)
        with self.assertRaises(ValueError):
            READER.compare_geometry(READER.GeometryComparison(outline,box(*outline.bounds),'outline'))
        READER.compare_geometry(READER.GeometryComparison(outline,outline,'outline'))

    def test_dimension_change_cannot_reuse_stale_native_outline(self):
        board = next(e for e in self.circuit if e['type']=='pcb_board')
        board['width'] -= 4
        with self.assertRaises(ValueError):
            board_outline(self.circuit)

    def test_reduced_or_single_layer_antenna_band_is_rejected(self):
        rf_exclusion(self.circuit)
        source = next(e for e in self.circuit if e['type']=='source_component' and e['name']=='U1')
        radio = next(e for e in self.circuit if e['type']=='pcb_component'
                     and e['source_component_id']==source['source_component_id'])
        band = next(e for e in self.circuit if e['type']=='pcb_keepout'
                    and e.get('excluded_pcb_component_ids')==[radio['pcb_component_id']])
        for broken in ['width','layers']:
            circuit = copy.deepcopy(self.circuit)
            changed = next(e for e in circuit if e.get('pcb_keepout_id')==band['pcb_keepout_id'])
            if broken=='width':changed['width'] -= 2
            else:changed['layers']=['top']
            with self.assertRaises(ValueError):
                rf_exclusion(circuit)

    def test_original_tangent_cutout_ring_must_not_be_silently_repaired(self):
        circuit = json.loads((ROOT/'evidence/R8-compact-pcb-2026-10-06/failed-route10/circuit.json').read_text())
        pour = next(e for e in circuit if e.get('pcb_copper_pour_id')=='pcb_copper_pour_24')
        with self.assertRaisesRegex(ValueError, 'Invalid BREP polygon'):
            brep_polygon(pour['brep_shape'])
