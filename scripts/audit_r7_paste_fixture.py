"""Independent source/Circuit JSON/Gerber paste fidelity; NOT a board DFM pass.

Reads original supplier SVG contours with svgpathtools. Coordinates are mapped
using source pin 1, not by fitting paste shapes. It never changes geometry.
"""
from dataclasses import dataclass
import hashlib
import json
import math
from pathlib import Path
from zipfile import ZipFile
from gerbonara import GerberFile
from gerbonara import graphic_primitives as gp
from shapely.geometry import Polygon
from svgpathtools import Arc, Line, parse_path
from curved_geometry import arc_polygon

SOURCE_READER_SAGITTA_MM = 0.000001
IMPORTER_CHORD_LIMIT_MM = 0.0001
CAM_SERIALIZATION_LIMIT_MM = 0.000002


@dataclass(frozen=True)
class PastePaths:
    raw: Path
    circuit: Path
    gerbers: Path
    report: Path


def require_contours(contours, label):
    if len(contours) != 5:
        raise ValueError(f"{label}: expected five separate apertures, got {len(contours)}")
    for index, polygon in enumerate(contours):
        if polygon.is_empty or not polygon.is_valid or polygon.area <= 0:
            raise ValueError(f"{label}: invalid aperture {index}")
        for previous in contours[:index]:
            if polygon.equals(previous) or polygon.intersection(previous).area > 1e-12:
                raise ValueError(f"{label}: duplicate/overlapping apertures")


def match_contours(expected, actual):
    require_contours(expected, "expected")
    require_contours(actual, "actual")
    remaining = list(enumerate(actual))
    matches = []
    for polygon in expected:
        match = min(remaining, key=lambda item: polygon.hausdorff_distance(item[1]))
        remaining.remove(match)
        matches.append((match[0], polygon.hausdorff_distance(match[1])))
    return matches


def source_contours(raw_part, pin_one):
    package = raw_part["packageDetail"]["dataStr"]
    shapes = package["shape"]
    source_pin = next(shape.split("~") for shape in shapes
                      if shape.startswith("PAD~") and shape.split("~")[8] == "1")
    offset_x = pin_one["x"] - float(source_pin[2]) * .254
    offset_y = pin_one["y"] + float(source_pin[3]) * .254
    contours = []
    for shape in shapes:
        fields = shape.split("~")
        if fields[:2] != ["SOLIDREGION", "5"] or fields[4] != "solid":
            continue
        path = parse_path(fields[3])
        if not path.isclosed():
            raise ValueError("Supplier paste contour is not closed")
        vertices = []
        for segment in path:
            if isinstance(segment, Line):
                count = 1
            elif isinstance(segment, Arc):
                radius_mm = abs(segment.radius.real) * .254
                if abs(segment.radius.real - segment.radius.imag) > 1e-9:
                    raise ValueError("Independent audit supports circular arcs only")
                maximum_angle = 2 * math.acos(1 - SOURCE_READER_SAGITTA_MM / radius_mm)
                count = math.ceil(abs(math.radians(segment.delta)) / maximum_angle)
            else:
                raise ValueError(f"Unsupported supplier segment {type(segment).__name__}")
            for index in range(count):
                point = segment.point(index / count)
                vertices.append((point.real * .254 + offset_x,
                                 -point.imag * .254 + offset_y))
        contours.append(Polygon(vertices))
    return contours


def audit_paste(paths):
    circuit = json.loads(paths.circuit.read_text())
    errors = [element for element in circuit if "error" in element["type"]]
    if errors:
        raise ValueError("Fixture has unresolved Circuit JSON errors")
    # This fixture deliberately has no routing: do NOT call its Gerbers a
    # manufacturing package or weaken the full-board fabrication checker.
    if any(element["type"] == "pcb_trace" for element in circuit):
        raise ValueError("Expected the isolated, unrouted import fixture")
    pin_one = next(element for element in circuit
                   if element["type"] == "pcb_smtpad" and "pin1" in element["port_hints"])
    expected = source_contours(json.loads(paths.raw.read_text()), pin_one)
    imported = [Polygon([(point["x"], point["y"]) for point in element["points"]])
                for element in circuit if element["type"] == "pcb_solder_paste"
                and element["shape"] == "polygon"]
    with ZipFile(paths.gerbers) as archive:
        layer = GerberFile.from_string(archive.read("F_Paste.gbr").decode())
    actual = []
    for obj in layer.objects:
        primitives = list(obj.to_primitives())
        if len(primitives) != 1 or not isinstance(primitives[0], gp.ArcPoly):
            raise ValueError("Unexpected Gerber aperture/primitive")
        if not primitives[0].polarity_dark:
            raise ValueError("Unexpected negative paste geometry")
        actual.append(arc_polygon(primitives[0]))
    source_matches = match_contours(expected, imported)
    cam_matches = match_contours(imported, actual)
    source_error = max(error for _, error in source_matches)
    cam_error = max(error for _, error in cam_matches)
    if source_error > IMPORTER_CHORD_LIMIT_MM + SOURCE_READER_SAGITTA_MM:
        raise ValueError(f"Source/import paste discrepancy {source_error} mm")
    if cam_error > CAM_SERIALIZATION_LIMIT_MM:
        raise ValueError(f"Circuit JSON/Gerber paste discrepancy {cam_error} mm")
    report = {
        "status": "PASS — FIVE-APERTURE IMPORT/CAM FIXTURE ONLY",
        "scope": "Paste fidelity, not driver qualification, routing or fabrication approval",
        "apertures": len(actual), "duplicates_or_overlaps": 0,
        "source_to_circuit_max_contour_mm": source_error,
        "circuit_to_gerber_max_contour_mm": cam_error,
        "source_reader_sagitta_mm": SOURCE_READER_SAGITTA_MM,
        "importer_chord_limit_mm": IMPORTER_CHORD_LIMIT_MM,
        "cam_serialization_limit_mm": CAM_SERIALIZATION_LIMIT_MM,
        "hashes": {str(path): hashlib.sha256(path.read_bytes()).hexdigest()
                   for path in (paths.raw, paths.circuit, paths.gerbers)},
        "rows": [{"source_aperture": index, "source_area_mm2": polygon.area,
                  "imported_area_mm2": imported[index].area,
                  "source_to_circuit_mm": source_matches[index][1]}
                 for index, polygon in enumerate(expected)],
    }
    paths.report.write_text(json.dumps(report, indent=2) + "\n")
    return report


if __name__ == "__main__":
    print(json.dumps(audit_paste(PastePaths(
        Path("evidence/R7-components/C347356.raweasy.json"),
        Path("dist/fixtures/r7/pt4115-import/circuit.json"),
        Path("evidence/R7-components/PT4115-fixture-CAM.zip"),
        Path("evidence/R7-components/PT4115-paste-readback.json"),
    )), indent=2))
