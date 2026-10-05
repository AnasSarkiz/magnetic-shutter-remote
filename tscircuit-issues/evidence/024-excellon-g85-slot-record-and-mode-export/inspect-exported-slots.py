"""Compare independently parsed Excellon G85 slots with source drill envelopes.

Both are board coordinates in mm, +X right and +Y up. The 0.0001 mm
comparison bound covers the exporter's four decimal coordinate quantization;
it is not an assumed fabrication tolerance. No manufacturing files are edited.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
from zipfile import ZipFile

from gerber.cam import FileSettings
from gerber.excellon import DrillSlot, loads
from shapely.affinity import rotate, translate
from shapely.geometry import LineString


def source_slot(hole):
    width, height = hole["hole_width"], hole["hole_height"]
    span = abs(height - width)
    line = LineString([(0, -span / 2), (0, span / 2)] if height >= width
                      else [(-span / 2, 0), (span / 2, 0)])
    line = rotate(line, hole.get("ccw_rotation", 0), origin=(0, 0))
    return translate(line, xoff=hole["x"], yoff=hole["y"]), min(width, height)


def inspect_slots(archive_path, circuit_path):
    circuit = json.loads(circuit_path.read_text())
    expected = [hole for hole in circuit if hole["type"] == "pcb_plated_hole"
                and hole.get("shape") == "pill"]
    with ZipFile(archive_path) as archive:
        drill_names = [name for name in archive.namelist()
                       if name.endswith(".drl") and "npth" not in name]
        if len(drill_names) != 1:
            raise ValueError(f"Expected one through-PTH drill file, got {drill_names}")
        drill_source = archive.read(drill_names[0]).decode()
        if not drill_source.startswith("M48\n"):
            raise ValueError("Missing Excellon header at the start of the file")
        drill = loads(drill_source, settings=FileSettings(
            units="metric", format=(3, 4), zeros="leading", notation="absolute"))
    if drill.units != "metric":
        raise ValueError(f"Unexpected parsed drill units: {drill.units}")
    slots = [hit for hit in drill.hits if isinstance(hit, DrillSlot)]
    if len(slots) != len(expected):
        raise ValueError(f"Parsed {len(slots)} slots, source contains {len(expected)}")
    unmatched = expected.copy()
    measurements = []
    for slot in slots:
        centerline = LineString([slot.start, slot.end])
        nearest = min(unmatched, key=lambda hole:
                      centerline.hausdorff_distance(source_slot(hole)[0]))
        expected_centerline, expected_diameter = source_slot(nearest)
        endpoint_error = centerline.hausdorff_distance(expected_centerline)
        diameter_error = abs(slot.tool.diameter - expected_diameter)
        if max(endpoint_error, diameter_error) > 0.0001:
            raise ValueError(f"Slot {nearest['pcb_plated_hole_id']} differs from source: "
                             f"endpoint {endpoint_error}, cutter {diameter_error} mm")
        unmatched.remove(nearest)
        measurements.append({
            "source_hole_id": nearest["pcb_plated_hole_id"],
            "start_mm": slot.start, "end_mm": slot.end,
            "cutter_diameter_mm": slot.tool.diameter,
            "total_length_mm": math.dist(slot.start, slot.end) + slot.tool.diameter,
            "endpoint_error_mm": endpoint_error, "diameter_error_mm": diameter_error,
        })
    return {"reader": "pcb-tools 0.1.6", "archive": str(archive_path),
            "archive_sha256": hashlib.sha256(archive_path.read_bytes()).hexdigest(),
            "circuit_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
            "drill_file": drill_names[0], "slots": measurements,
            "round_drill_hits": len(drill.hits) - len(slots),
            "scope": "PTH slots only; round drills, copper, mask, paste and outline require separate checks"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("circuit", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    result = inspect_slots(args.archive, args.circuit)
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    print(f"Verified {len(result['slots'])} exported slots against source geometry")
