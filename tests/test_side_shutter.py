"""Manufacturer land/pin regression; does not treat generic4pin buttons alike."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('side_switch',ROOT/'scripts/audit-side-shutter.py')
AUDIT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(AUDIT)


class SideShutterQualification(unittest.TestCase):
    def test_rejected_alps_exact_manufacturer_lands(self):
        report=AUDIT.audit_alps()
        self.assertLess(report['supplier_import_conversion_max_difference_mm'],1e-7)
        self.assertEqual(report['internal_connections'],[['pin1','pin3'],['pin4','pin5']])
        self.assertEqual(report['pads']['4']['width_mm'],1.2999974)

    def test_rejected_alps_five_contacts_have_paste_and_correct_internals(self):
        fixture=json.loads((ROOT/'evidence/R8-side-shutter-2026-10-05/qualification/alps/fixture/circuit.json').read_text())
        ports={p['source_port_id']:p['pin_number'] for p in fixture if p['type']=='source_port'}
        connections=[e for e in fixture if e['type']=='source_component_internal_connection']
        self.assertEqual([{ports[p] for p in e['source_port_ids']} for e in connections],[{1,3},{4,5}])
        self.assertEqual(len([e for e in fixture if e['type']=='pcb_solder_paste']),5)
        self.assertFalse([e for e in fixture if e['type'].endswith('_error')])

    def test_alps_rejection_preserves_all_npth_violations(self):
        rejection=json.loads((ROOT/'evidence/R8-side-shutter-2026-10-05/qualification/alps/manufacturing-rejection.json').read_text())
        self.assertEqual(len(rejection['failures']),4)
        self.assertEqual({e['rule'] for e in rejection['failures']},{'npth_all_copper'})
        self.assertLess(min(e['gap_mm'] for e in rejection['failures']),.08)

    def test_manufacturer_lands_and_frame_contract(self):
        report = AUDIT.audit_switch()
        self.assertLess(report['supplier_import_conversion_max_difference_mm'],1e-7)
        self.assertEqual(report['internal_support_connection'],['pin3','pin4'])
        self.assertTrue(report['normally_open'])
        self.assertEqual(report['contact_land_recommendation_mm']['pitch'],3.4)

    def test_modified_generated_contact_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            original = ROOT/'imports/TS24CA/TS24CA.tsx'
            altered = Path(directory)/original.name
            altered.write_text(original.read_text().replace('width="0.5999988mm"','width="0.9mm"',1))
            with self.assertRaisesRegex(ValueError,'conversion differs'):
                AUDIT.audit_switch(import_path=altered)

    def test_exact_supplier_identity_required(self):
        with tempfile.TemporaryDirectory() as directory:
            original = ROOT/'imports/TS24CA/TS24CA.tsx'
            altered = Path(directory)/original.name
            altered.write_text(original.read_text().replace('"C393942"','"C000000"'))
            with self.assertRaisesRegex(ValueError,'identity required'):
                AUDIT.audit_switch(import_path=altered)

    def test_requalified_switch_has_paste_for_every_unchanged_land(self):
        fixture=json.loads((ROOT/'evidence/R8-side-shutter-2026-10-05/qualification/fixture-paste-qualified/circuit.json').read_text())
        pads={p['pcb_smtpad_id']:p for p in fixture if p['type']=='pcb_smtpad'}
        pastes={p['pcb_smtpad_id']:p for p in fixture if p['type']=='pcb_solder_paste'}
        self.assertEqual(set(pads),set(pastes))
        self.assertEqual(len(pastes),4)
        for pad_id,pad in pads.items():
            if pad['shape']=='polygon':
                self.assertEqual(pad['points'],pastes[pad_id]['points'])

    def test_frame_is_not_a_switch_contact(self):
        fixture = json.loads((ROOT/'evidence/R8-side-shutter-2026-10-05/qualification/fixture/circuit.json').read_text())
        ports = {p['source_port_id']:p['pin_number'] for p in fixture if p['type']=='source_port'}
        connections = [e for e in fixture if e['type']=='source_component_internal_connection']
        self.assertEqual([{ports[p] for p in e['source_port_ids']} for e in connections],[{3,4}])
        self.assertFalse([e for e in fixture if e['type'].endswith('_error')])

    def test_side_actuator_overhang_keeps_every_copper_land_on_board(self):
        fixture = json.loads((ROOT/'evidence/R8-side-shutter-2026-10-05/qualification/fixture/circuit.json').read_text())
        component, = [e for e in fixture if e['type']=='pcb_component']
        self.assertEqual(component['rotation'],270)
        self.assertEqual(component['display_offset_x'],'22mm')
        self.assertTrue(component['is_allowed_to_be_off_board'])
        self.assertAlmostEqual(component['center']['x'],22,places=6)
        for pad in [e for e in fixture if e['type']=='pcb_smtpad']:
            right_edge = max(p['x'] for p in pad['points']) if pad['shape']=='polygon' else pad['x']+pad['width']/2
            self.assertLessEqual(right_edge,23.7)  #24mm edge,0.30mm copper clearance.


if __name__ == '__main__':
    unittest.main()
