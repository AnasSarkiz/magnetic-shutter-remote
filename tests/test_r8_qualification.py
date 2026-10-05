"""Focused R8 qualification tests; not the historical board/DFM test suite."""
import hashlib
import importlib.util
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("module_audit", ROOT / "scripts/audit-r8-module.py")
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class QualificationTest(unittest.TestCase):
    def test_supplier_import_preserves_all_terminal_geometry(self):
        report = audit.audit()
        self.assertEqual(report["supplier_pad_count"], 27)
        self.assertEqual(report["imported_pad_count"], 27)
        self.assertEqual(report["conversion_fidelity"], "PASS")
        self.assertLess(report["maximum_conversion_difference_mm"], 1e-9)
        self.assertEqual([pad["pin"] for pad in report["pads"]].count(19), 9)

    def test_manufacturer_discrepancy_remains_visible_and_blocking(self):
        report = audit.audit()
        for pad in report["pads"]:
            if pad["pin"] != 19:
                self.assertGreater(pad["width_mm"], report["recommended_contact_width_mm"])
                self.assertGreater(pad["height_mm"], report["recommended_contact_height_mm"])
        self.assertEqual(report["manufacturer_land_pattern_qualification"],
                         "BLOCKED — UNQUALIFIED SUPPLIER VARIATION")

    def test_exact_pin_contract_matches_manufacturer_table(self):
        expected = {1: "3V3", 2: "EN", 3: "IO4", 4: "IO5", 5: "IO6", 6: "IO7",
                    7: "IO8", 8: "IO9", 9: "GND", 10: "IO10", 11: "RXD", 12: "TXD",
                    13: "IO18", 14: "IO19", 15: "IO3", 16: "IO2", 17: "IO1", 18: "IO0", 19: "EP"}
        actual = {int(pin): label for pin, label in re.findall(
            r'pin(\d+): \["([\w]+)"\]', audit.IMPORT.read_text())}
        self.assertEqual(actual, expected)

    def test_previous_revision_manifest_remains_unchanged(self):
        # Explicit Cloud portability change: verify the same 129 hashes against
        # the archived snapshot, not an unavailable sibling macOS directory.
        manifest = json.loads((ROOT / "cloud/R7-PORTABLE-MANIFEST.json").read_text())
        original_root = ROOT / manifest["source_directory"]
        for entry in manifest["files"]:
            with self.subTest(path=entry["path"]):
                self.assertEqual(hashlib.sha256((original_root / entry["path"]).read_bytes()).hexdigest(), entry["sha256"])

    def test_firmware_controls_do_not_use_boot_strap_terminals(self):
        overlay = (ROOT / "firmware/boards/esp32c3_devkitc.overlay").read_text()
        assigned_gpio_numbers = [int(pin) for pin in re.findall(r'gpios = <&gpio0 (\d+)', overlay)]
        self.assertCountEqual(assigned_gpio_numbers, [4, 5, 6])
        self.assertFalse({2, 8, 9} & set(assigned_gpio_numbers))
        config = (ROOT / "firmware/prj.conf").read_text()
        self.assertNotIn("CONFIG_CLOCK_CONTROL_NRF_", config)
        self.assertIn("CONFIG_WIFI=n", config)


if __name__ == "__main__":
    unittest.main()
