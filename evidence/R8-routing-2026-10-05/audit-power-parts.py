"""Reproduce supplier/import pad comparisons without modifying component data."""
import hashlib
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = Path(__file__).resolve().parent
PARTS = {
    "C15516": "TPS63031DSKR",
    "C160402": "SM02B_SRSS_TB_LF__SN_",
    "C56594": "SWPA3015S1R5NT",
    "C17382749": "LPS3015_152MRC",
    "C15849": "CL10A105KB8NNNC",
    "C22978": "A_0603WAF3301T5E",
}


def audit_part(component_code, import_name):
    spec = importlib.util.spec_from_file_location(
        "pad_audit", ROOT / "scripts/audit-r8-module.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    import_path = ROOT / "imports" / import_name / f"{import_name}.tsx"
    supplier = {
        pad["pin"]: pad
        for pad in module.supplier_pads(EVIDENCE / f"{component_code}-supplier-raw.json")
    }
    imported = {pad["pin"]: pad for pad in module.imported_pads(import_path)}
    if supplier.keys() != imported.keys():
        raise ValueError(f"{component_code}: pad identity/count changed")
    anchor_pin = min(supplier)
    translation = {
        axis: imported[anchor_pin][axis] - supplier[anchor_pin][axis]
        for axis in ("x_mm", "y_mm")
    }
    # The supported converter recenters the footprint. Compare every pad after
    # one uniform translation, preserving spacing, dimensions and pin identity.
    # This does not qualify body/CAD registration or a manufacturer land pattern.
    max_difference = max(
        abs(imported[pin][axis] - supplier[pin][axis] - translation.get(axis, 0))
        for pin in supplier
        for axis in ("x_mm", "y_mm", "width_mm", "height_mm")
    )
    if max_difference >= 1e-9:
        raise ValueError(f"{component_code}: supplier pad geometry changed")
    assets = {}
    for extension in ("obj", "step"):
        blob = import_path.with_suffix(f".{extension}").read_bytes()
        valid = (
            b"ISO-10303-21;" in blob[:100]
            if extension == "step"
            else b"\nv " in blob and b"\nf " in blob
        )
        if not valid:
            raise ValueError(f"{component_code}: invalid {extension} response body")
        assets[extension] = {
            "bytes": len(blob),
            "sha256": hashlib.sha256(blob).hexdigest(),
            "format_signature_valid": valid,
        }
    return {
        "jlcpcb": component_code,
        "import_path": str(import_path.relative_to(ROOT)),
        "supplier_pad_count": len(supplier),
        "imported_pad_count": len(imported),
        "raw_to_import_origin_translation_mm": translation,
        "maximum_relative_conversion_difference_mm": max_difference,
        "relative_pad_conversion_fidelity": "PASS",
        "assets": assets,
        "pads": list(imported.values()),
        "manufacturer_qualification": "NOT ESTABLISHED",
    }


def main():
    reports = [audit_part(code, name) for code, name in PARTS.items()]
    for report in reports:
        if report["jlcpcb"] == "C15516":
            contacts = [pad for pad in report["pads"] if pad["pin"] != 11]
            report.update({
                "manufacturer_qualification": "BLOCKED: unqualified supplier contact-land variation",
                "manufacturer_reference": "TI DSK0010A 4218903/C 09/2025 in SLVS696D",
                "manufacturer_contact_length_mm": 0.6,
                "manufacturer_contact_width_mm": 0.25,
                "actual_contact_length_mm": contacts[0]["width_mm"],
                "actual_contact_width_mm": contacts[0]["height_mm"],
                "manufacturer_ep_mm": [1.2, 2.0],
                "minimum_adjacent_contact_gap_mm": min(
                    abs(a["y_mm"] - b["y_mm"])
                    - (a["height_mm"] + b["height_mm"]) / 2
                    for a in contacts for b in contacts
                    if a["pin"] < b["pin"] and a["x_mm"] == b["x_mm"]
                ),
            })
        if report["jlcpcb"] == "C56594":
            left, right = sorted(report["pads"], key=lambda pad: pad["x_mm"])
            report.update({
                "manufacturer_qualification": "BLOCKED: unqualified supplier contact-land variation",
                "manufacturer_reference": "Sunlord SWPA catalog revised 2025/5/8 page2, SWPA3015S",
                "manufacturer_pad_width_mm": 0.8,
                "manufacturer_pad_height_mm": 2.7,
                "manufacturer_inner_gap_mm": 1.5,
                "actual_inner_gap_mm": right["x_mm"] - right["width_mm"] / 2
                - left["x_mm"] - left["width_mm"] / 2,
                "body_tolerances_do_not_qualify_recommended_lands": True,
            })
        if report["jlcpcb"] == "C160402":
            report.update({
                "manufacturer_geometry_review": "Nominal pads/pitch match JST side-entry drawing to supplier quantization; final body/CAD placement remains pending",
                "battery_polarity_reference": "ASR00012 revision1 p9 Figure5: SM02B pin2 positive, pin1 ground; not implemented in root",
            })
    (EVIDENCE / "power-part-audit.json").write_text(json.dumps({
        "purpose": "component qualification investigation, not routed board DRC",
        "numerical_comparison_tolerance_mm": 1e-9,
        "comparison_tolerance_is_not_manufacturer_or_fabrication_tolerance": True,
        "parts": reports,
    }, indent=2) + "\n")
    for report in reports:
        print(report["jlcpcb"], report["relative_pad_conversion_fidelity"],
              report["manufacturer_qualification"])


if __name__ == "__main__":
    main()
