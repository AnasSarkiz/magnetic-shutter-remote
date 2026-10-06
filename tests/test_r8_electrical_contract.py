"""Reject real schematic changes during a placement-only revision."""
import copy
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('electrical_contract', ROOT/'scripts/review-r8-electrical-contract.py')
REVIEW = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(REVIEW)


class ElectricalContractTest(unittest.TestCase):
    def setUp(self):
        self.circuit = json.loads(REVIEW.REFERENCE.read_text())
        self.reference = REVIEW.electrical_contract(self.circuit)

    def test_swapped_uart_signal_is_rejected(self):
        altered = copy.deepcopy(self.reference)
        j3 = altered['J3']['terminals']
        first = next(p for p in j3 if p['pin_number'] == 1)
        third = next(p for p in j3 if p['pin_number'] == 3)
        first['net'], third['net'] = third['net'], first['net']
        with self.assertRaisesRegex(ValueError, 'J3'):
            REVIEW.compare_contracts(self.reference, altered)

    def test_wrong_charge_setting_is_rejected(self):
        altered = copy.deepcopy(self.reference)
        altered['R3']['resistance'] = 500
        with self.assertRaisesRegex(ValueError, 'R3'):
            REVIEW.compare_contracts(self.reference, altered)

    def test_placement_changes_do_not_change_electrical_contract(self):
        for e in self.circuit:
            if e['type'] == 'pcb_component':
                e['center']['x'] += 2
        REVIEW.compare_contracts(self.reference, REVIEW.electrical_contract(self.circuit))
