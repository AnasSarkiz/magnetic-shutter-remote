"""Retain the actual qualified alternative's supplier fidelity and pin contract."""
import importlib.util
import json
from pathlib import Path
import re
import unittest

ROOT=Path(__file__).resolve().parents[1]
EVIDENCE=ROOT/'evidence/R8-components/alternative-radio-2026-10-05/c3-supported-ble'
IMPORTED=ROOT/'imports/ESPC3_12_N4/ESPC3_12_N4.tsx'
SPEC=importlib.util.spec_from_file_location('c3_supplier_audit',ROOT/'scripts/audit-r8-module.py')
AUDIT=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(AUDIT)

class C3RadioQualificationTest(unittest.TestCase):
    def test_supplier_pad_conversion_and_manufacturer_nominal_lands(self):
        raw={e['pin']:e for e in AUDIT.supplier_pads(EVIDENCE/'C19949072-supplier-raw.json')}
        imported={e['pin']:e for e in AUDIT.imported_pads(IMPORTED)}
        self.assertEqual(set(raw),set(range(1,23)))
        self.assertEqual(raw.keys(),imported.keys())
        offset={axis:imported[1][axis]-raw[1][axis] for axis in ['x_mm','y_mm']}
        for pin in raw:
            for axis in ['x_mm','y_mm']:
                self.assertAlmostEqual(imported[pin][axis]-raw[pin][axis],offset[axis],places=10)
            for axis in ['width_mm','height_mm']:
                self.assertAlmostEqual(imported[pin][axis],raw[pin][axis],places=10)
            self.assertAlmostEqual(imported[pin]['width_mm'],1 if 9<=pin<=14 else 1.5,places=5)
            self.assertAlmostEqual(imported[pin]['height_mm'],1.5 if 9<=pin<=14 else 1,places=5)

    def test_all_manufacturer_pin_labels_and_power_metadata(self):
        text=IMPORTED.read_text();head=text.split('const pinLabels = {')[1].split('} as const')[0]
        labels={int(pin):label for pin,label in re.findall(r'pin(\d+): \["([^"]+)"\]',head)}
        expected=['IO0','IO1','EN','IO2','IO3','IO4','IO5','VCC','NC1','NC2','NC3','IO6','IO7','NC4','GND','IO8','IO10','IO9','IO18','IO19','RX0','TX0']
        self.assertEqual(labels,dict(enumerate(expected,1)))
        self.assertRegex(text,r'pin8: \{requiresPower: true\}')
        self.assertRegex(text,r'pin15: \{requiresGround: true\}')
        self.assertIn('"C19949072"',text)

if __name__=='__main__':unittest.main()
