"""Compare unmodified supplier source/import against the manufacturer reference.

This produces qualification evidence, never component definitions or PCB geometry.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "evidence/R8-components/C2934560-supplier-raw.json"
IMPORT = ROOT / "imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4.tsx"


def supplier_pads(supplier_path=RAW):
    supplier = json.loads(supplier_path.read_text())
    package = supplier["packageDetail"]["dataStr"]
    if isinstance(package, str):
        package = json.loads(package)
    origin = package["head"]
    pads = []
    for shape in package["shape"]:
        if not shape.startswith("PAD~"):
            continue
        fields = shape.split("~")
        rotation_degrees = float(fields[11]) % 360
        width_mm = float(fields[4]) * 0.254
        height_mm = float(fields[5]) * 0.254
        if rotation_degrees in (90, 270):
            width_mm, height_mm = height_mm, width_mm
        elif rotation_degrees not in (0, 180):
            raise ValueError("Pad audit supports only axis-aligned supplier rectangles")
        pads.append({
            "pin": int(fields[8]),
            "x_mm": (float(fields[2]) - origin["x"]) * 0.254,
            "y_mm": (origin["y"] - float(fields[3])) * 0.254,
            "width_mm": width_mm,
            "height_mm": height_mm,
        })
    return pads


def imported_pads(import_path=IMPORT):
    pads = []
    pattern = re.compile(
        r'<smtpad portHints=\{\["pin(\d+)"\]\} pcbX="([\d.\-]+)mm" '
        r'pcbY="([\d.\-]+)mm" width="([\d.]+)mm" height="([\d.]+)mm"'
    )
    for pin, x, y, width, height in pattern.findall(import_path.read_text()):
        pads.append({"pin": int(pin), "x_mm": float(x), "y_mm": float(y),
                     "width_mm": float(width), "height_mm": float(height)})
    return pads


def audit():
    supplier = supplier_pads()
    imported = imported_pads()
    if len(supplier) != len(imported):
        raise ValueError("Supplier/import pad count differs")
    maximum_conversion_difference_mm = max(
        abs(original[axis] - converted[axis])
        for original, converted in zip(supplier, imported, strict=True)
        for axis in ("x_mm", "y_mm", "width_mm", "height_mm")
    )
    if any(original["pin"] != converted["pin"]
           for original, converted in zip(supplier, imported, strict=True)):
        raise ValueError("Supplier/import physical terminal association differs")
    contacts = [pad for pad in imported if pad["pin"] != 19]
    return {
        "part": "ESP32-C3-WROOM-02-N4", "jlcpcb": "C2934560",
        "supplier_package_uuid": json.loads(RAW.read_text())["packageDetail"]["uuid"],
        "supplier_pad_count": len(supplier), "imported_pad_count": len(imported),
        "conversion_fidelity": "PASS" if maximum_conversion_difference_mm < 1e-9 else "FAIL",
        "maximum_conversion_difference_mm": maximum_conversion_difference_mm,
        "manufacturer_reference": "Espressif datasheet v1.7, Figure 11-1, p38",
        "recommended_contact_width_mm": 1.5, "recommended_contact_height_mm": 0.9,
        "actual_contact_width_mm": sorted(set(pad["width_mm"] for pad in contacts)),
        "actual_contact_height_mm": sorted(set(pad["height_mm"] for pad in contacts)),
        "manufacturer_land_pattern_qualification": "BLOCKED — UNQUALIFIED SUPPLIER VARIATION",
        "recommendation_is_not_a_published_tolerance": True,
        "pads": imported,
    }


if __name__ == "__main__":
    report = audit()
    target = ROOT / "evidence/R8-components/ESP32-footprint-audit.json"
    target.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({key: report[key] for key in (
        "conversion_fidelity", "maximum_conversion_difference_mm",
        "manufacturer_land_pattern_qualification")}, indent=2))
