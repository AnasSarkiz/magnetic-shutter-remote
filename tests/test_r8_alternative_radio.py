"""Manufacturer/supplier checks for the cheaper C2 candidate, not a board release."""
import importlib.util
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("module_audit", ROOT / "scripts/audit-r8-module.py")
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)
EVIDENCE = ROOT / "evidence/R8-components/alternative-radio-2026-10-05"


class RadioImportChecks:
    def test_supported_import_preserves_all_supplier_pads(self):
        supplier = audit.supplier_pads(EVIDENCE / f"{self.part}-supplier-raw.json")
        imported = audit.imported_pads(self.import_path)
        self.assertEqual(len(imported), 16)
        self.assertEqual(len(supplier), 16)
        for original, converted in zip(supplier, imported, strict=True):
            self.assertEqual(original["pin"], converted["pin"])
            for axis in ("x_mm", "y_mm", "width_mm", "height_mm"):
                self.assertLess(abs(original[axis] - converted[axis]), 1e-9)

    def test_lands_match_manufacturer_nominal_drawing(self):
        # DOIT ESPC2-12 v1.0, Fig.3.3 p6: 1.5x1 mm, 2 mm pitch,
        # 15.5 mm between row centres. 0.001 mm only covers observed supplier
        # coordinate rounding; it is not an invented manufacturing tolerance.
        pads = audit.imported_pads(self.import_path)
        for pad in pads:
            self.assertLess(abs(pad["width_mm"] - 1.5), 0.001)
            self.assertLess(abs(pad["height_mm"] - 1.0), 0.001)
            self.assertLess(abs(abs(pad["x_mm"]) - 7.75), 0.001)
        for row in (pads[:8], pads[8:]):
            positions = sorted(pad["y_mm"] for pad in row)
            self.assertLess(abs(positions[0] + 7), 0.001)
            self.assertLess(abs(positions[-1] - 7), 0.001)
            for lower, upper in zip(positions, positions[1:]):
                self.assertLess(abs(upper - lower - 2), 0.001)

    def test_exact_manufacturer_pin_map(self):
        # DOIT Table2.2, p3-4; UART GPIO19/20 differs from prior C3 GPIO20/21.
        expected = {1: "EN", 2: "IO0", 3: "IO1", 4: "IO2", 5: "IO3",
                    6: "IO4", 7: "IO5", 8: "VCC", 9: "GND", 10: "IO6",
                    11: "IO7", 12: "IO9", 13: "IO10", 14: "IO18",
                    15: "RXD0", 16: "TXD0"}
        actual = {int(pin): label for pin, label in re.findall(
            r'pin(\d+): \["([\w]+)"\]', self.import_path.read_text())}
        self.assertEqual(actual, expected)

    def test_downloaded_cad_files_are_models_not_http_errors(self):
        self.assertIn("ISO-10303-21;", self.import_path.with_suffix(".step").read_text())
        self.assertRegex(self.import_path.with_suffix(".obj").read_text(), r"(?m)^v\s+-?[\d.]+\s+")


class AlternativeRadioTest(RadioImportChecks, unittest.TestCase):
    part = "C19949080"
    import_path = ROOT / "imports/ESPC2_12_N4/ESPC2_12_N4.tsx"


class SelectedRadioTest(RadioImportChecks, unittest.TestCase):
    part = "C19949081"
    import_path = ROOT / "imports/ESPC2_12E_N4/ESPC2_12E_N4.tsx"


if __name__ == "__main__":
    unittest.main()
