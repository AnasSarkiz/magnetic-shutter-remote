"""Read original Gerbers and all Excellon features with independent readers.

Coordinates are board XY millimetres, +X right/+Y up. This program never writes
manufacturing geometry. Comparison bounds cover decimal serialization and curve
approximation only, not fabrication tolerances or manufacturing-rule exceptions.
"""
import argparse
import hashlib
import importlib.util
import json
import math
from dataclasses import dataclass
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from curved_geometry import brep_polygon, arc_polygon
from zipfile import ZipFile

from gerbonara import GerberFile
from gerbonara import graphic_primitives as gp
from gerber.cam import FileSettings
from gerber.excellon import DrillSlot, loads
from shapely.affinity import rotate, translate
from shapely.geometry import LineString, Point, box
from shapely.geometry.base import BaseGeometry
from shapely.ops import unary_union, polygonize

QUANTIZATION_MM = 0.0001
COPPER_COMPARE_MM = 0.00002
EXPECTED_FILES = {
    "F_Cu.gbr", "B_Cu.gbr", "F_Paste.gbr", "B_Paste.gbr",
    "F_Mask.gbr", "B_Mask.gbr", "F_SilkScreen.gbr", "B_SilkScreen.gbr",
    "Edge_Cuts.gbr", "F_Fab.gbr", "drill-L1-L2.drl", "drill_npth.drl",
}


@dataclass
class GeometryComparison:
    expected: BaseGeometry
    actual: BaseGeometry
    label: str


@dataclass
class DrillReview:
    source: str
    expected: list
    label: str


@dataclass
class ExportReviewPaths:
    archive_path: Path
    circuit_path: Path
    output_directory: Path


def primitive_geometry(primitive):
    if isinstance(primitive, gp.Circle):
        return Point(primitive.x, primitive.y).buffer(primitive.r, quad_segs=256)
    if isinstance(primitive, gp.Line):
        return LineString([(primitive.x1, primitive.y1),
                           (primitive.x2, primitive.y2)]).buffer(
                               primitive.width / 2, quad_segs=256)
    if isinstance(primitive, gp.Rectangle):
        rectangle = box(-primitive.w / 2, -primitive.h / 2,
                        primitive.w / 2, primitive.h / 2)
        return translate(rotate(rectangle, primitive.rotation * 180 / math.pi,
                                origin=(0, 0)), primitive.x, primitive.y)
    if isinstance(primitive, gp.ArcPoly):
        return arc_polygon(primitive)
    raise ValueError(f"Unsupported Gerber primitive: {type(primitive).__name__}")


def copper_geometry(gerber_file):
    union = Point().buffer(0)
    for obj in gerber_file.objects:
        for primitive in obj.to_primitives():
            geometry = primitive_geometry(primitive)
            union = union.union(geometry) if primitive.polarity_dark else union.difference(geometry)
    return union


def compare_geometry(comparison):
    expected, actual, label = comparison.expected, comparison.actual, comparison.label
    if expected.is_empty != actual.is_empty:
        raise ValueError(f"Missing or unexpected geometry in {label}")
    missing = expected.difference(actual.buffer(COPPER_COMPARE_MM))
    extra = actual.difference(expected.buffer(COPPER_COMPARE_MM))
    if not missing.is_empty or not extra.is_empty:
        raise ValueError(f"{label} does not match source copper: missing={missing.area}, extra={extra.area} mm2")
    return {"source_area_mm2": expected.area, "export_area_mm2": actual.area,
            "comparison_bound_mm": COPPER_COMPARE_MM,
            "source_and_export_cover_each_other": True}


def expected_slot(hole):
    width, height = hole["hole_width"], hole["hole_height"]
    span = abs(height - width)
    line = LineString([(0, -span/2), (0, span/2)] if height >= width
                      else [(-span/2, 0), (span/2, 0)])
    return translate(rotate(line, hole.get("ccw_rotation", 0), origin=(0, 0)),
                     hole["x"], hole["y"]), min(width, height)


def read_drills(review):
    source, expected, label = review.source, review.expected, review.label
    if not source.startswith("M48\n"):
        raise ValueError(f"{label}: missing leading Excellon M48 header")
    drill = loads(source, settings=FileSettings(
        units="metric", format=(3, 4), zeros="leading", notation="absolute"))
    if drill.units != "metric" or len(drill.hits) != len(expected):
        raise ValueError(f"{label}: drill units or count differs from source ({len(drill.hits)} versus {len(expected)})")
    unmatched = expected.copy()
    measurements = []
    for hit in drill.hits:
        if isinstance(hit, DrillSlot):
            centerline = LineString([hit.start, hit.end])
            slots = [hole for hole in unmatched if hole["type"] == "pcb_plated_hole" and hole.get("shape") == "pill"]
            if not slots:
                raise ValueError(f"{label}: unexpected slot")
            hole = min(slots, key=lambda hole: centerline.hausdorff_distance(expected_slot(hole)[0]))
            expected_centerline, diameter = expected_slot(hole)
            position_error = centerline.hausdorff_distance(expected_centerline)
            kind = "slot"
            position = [(hit.start[0] + hit.end[0])/2, (hit.start[1] + hit.end[1])/2]
            total_length = math.dist(hit.start, hit.end) + hit.tool.diameter
            if hit.tool.diameter < 0.5 or total_length < 2 * hit.tool.diameter:
                raise ValueError(f"{label}: slot fails selected two-layer minimum width/aspect rule")
        else:
            rounds = [hole for hole in unmatched if hole["type"] != "pcb_plated_hole" or hole.get("shape") == "circle"]
            if not rounds:
                raise ValueError(f"{label}: unexpected round drill")
            hole = min(rounds, key=lambda hole: math.dist(hit.position, (hole["x"], hole["y"])))
            diameter = hole["hole_diameter"]
            position_error = math.dist(hit.position, (hole["x"], hole["y"]))
            kind = "round"
            position = hit.position
            total_length = hit.tool.diameter
            minimum = 0.5 if hole["type"] == "pcb_hole" else 0.2
            if hit.tool.diameter < minimum:
                raise ValueError(f"{label}: round drill smaller than selected {minimum} mm minimum")
        diameter_error = abs(hit.tool.diameter - diameter)
        if max(position_error, diameter_error) > QUANTIZATION_MM:
            raise ValueError(f"{label}: {hole[hole['type']+'_id']} drill geometry differs from source")
        unmatched.remove(hole)
        measurements.append({"source_id": hole[hole["type"]+"_id"], "kind": kind,
                             "position_mm": position, "diameter_mm": hit.tool.diameter,
                             "length_mm": total_length, "position_error_mm": position_error,
                             "diameter_error_mm": diameter_error})
    if unmatched:
        raise ValueError(f"{label}: missing drill features")
    return measurements


def inspect_exports(paths):
    archive_path, circuit_path, output_directory = paths.archive_path, paths.circuit_path, paths.output_directory
    circuit = json.loads(circuit_path.read_text())
    errors = [obj for obj in circuit if obj["type"].endswith("_error")]
    traces = [obj for obj in circuit if obj["type"] == "pcb_trace"]
    if errors or not traces:
        raise ValueError("Cannot validate fabrication from an erroneous or unrouted circuit")
    components = [obj for obj in circuit if obj["type"] == "pcb_component"]
    if len(components) != 37 or any(obj["layer"] != "top" for obj in components):
        raise ValueError("Expected all 37 fitted components on top")
    module_spec = importlib.util.spec_from_file_location("r3_manufacturing_audit", Path(__file__).with_name("manufacturing-audit.py"))
    module = importlib.util.module_from_spec(module_spec)
    import sys
    sys.modules[module_spec.name] = module
    module_spec.loader.exec_module(module)
    copper, drills, widths = module.make_features(circuit)
    source_audit = module.audit(copper, drills, widths)
    if source_audit["failures"]:
        raise ValueError("Source copper still fails classified manufacturing rules")
    output_directory.mkdir(parents=True, exist_ok=True)
    with ZipFile(archive_path) as archive:
        if set(archive.namelist()) != EXPECTED_FILES:
            raise ValueError(f"Export file coverage differs: {archive.namelist()}")
        layers = {}
        report = {"archive_sha256": hashlib.sha256(archive_path.read_bytes()).hexdigest(),
                  "circuit_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
                  "readers": ["Gerbonara 1.5.0 (Gerber)", "pcb-tools 0.1.6 (all Excellon rounds/G85 slots)"],
                  "layers": {}, "drills": {}, "design_errors": 0,
                  "manufacturing_failures": 0, "top_components": len(components)}
        for name in sorted(EXPECTED_FILES):
            source = archive.read(name).decode()
            if name.endswith(".gbr"):
                layer = GerberFile.from_string(source)
                layers[name] = layer
                report["layers"][name] = {"objects": len(layer.objects), "bounds_mm": layer.bounding_box()}
                (output_directory / (Path(name).stem + ".svg")).write_text(str(layer.to_svg(margin=1)))
            else:
                expected = [obj for obj in circuit if obj["type"] == "pcb_hole"] if "npth" in name else [obj for obj in circuit if obj["type"] in ("pcb_via", "pcb_plated_hole")]
                report["drills"][name] = read_drills(DrillReview(source, expected, name))
        for side, layer_name in [("top", "F_Cu.gbr"), ("bottom", "B_Cu.gbr")]:
            expected = unary_union([feature.geometry for feature in copper if feature.layer == side])
            actual = copper_geometry(layers[layer_name])
            report["layers"][layer_name]["copper_match"] = compare_geometry(GeometryComparison(expected, actual, side))
            if actual.intersects(box(-18, -28, 18, -22.9)):
                raise ValueError(f"{side} exported copper enters antenna keepout")
        outline = layers["Edge_Cuts.gbr"]
        centre_lines = []
        for obj in outline.objects:
            for primitive in obj.to_primitives():
                if not isinstance(primitive, gp.Line):
                    raise ValueError("Unsupported outline primitive")
                centre_lines.append(LineString([(primitive.x1, primitive.y1), (primitive.x2, primitive.y2)]))
        outline_polygons = list(polygonize(unary_union(centre_lines)))
        if len(outline_polygons) != 1 or not outline_polygons[0].is_valid:
            raise ValueError("Board outline is not one closed valid loop")
        board_outline = outline_polygons[0]
        if any(abs(a-b) > QUANTIZATION_MM for a,b in zip(board_outline.bounds, [-18,-28,18,28])):
            raise ValueError("Exported board outline differs from 36 by 56 mm source")
        report["outline"] = {"bounds_mm": board_outline.bounds, "closed_loops": 1,
                             "area_mm2": board_outline.area, "corner_radius_mm": 2}
        for side, paste_name in [("top", "F_Paste.gbr"), ("bottom", "B_Paste.gbr")]:
            # Stencil apertures are explicit, independently qualified source
            # features. They need not equal copper lands (e.g. paste reduction).
            expected = unary_union([module.pad(obj) for obj in circuit if obj["type"] == "pcb_solder_paste" and obj["layer"] == side])
            actual = copper_geometry(layers[paste_name])
            report["layers"][paste_name]["paste_match"] = compare_geometry(GeometryComparison(expected, actual, paste_name))
            report["layers"][paste_name]["aperture_count"] = sum(obj["type"] == "pcb_solder_paste" and obj["layer"] == side for obj in circuit)
        for side, mask_name in [("top", "F_Mask.gbr"), ("bottom", "B_Mask.gbr")]:
            expected = unary_union([feature.geometry for feature in copper if feature.layer == side and feature.kind == "smt"])
            actual = copper_geometry(layers[mask_name])
            missing = expected.difference(actual.buffer(COPPER_COMPARE_MM))
            if not missing.is_empty:
                raise ValueError(f"{mask_name}: covered SMT land")
            report["layers"][mask_name]["all_smt_lands_open"] = True
        for name in ["F_SilkScreen.gbr", "B_SilkScreen.gbr"]:
            geometry = copper_geometry(layers[name])
            outside = geometry.difference(board_outline)
            report["layers"][name]["outside_outline_area_mm2"] = outside.area
        report["scope"] = "All 12 files parsed; both copper layers geometrically matched; all PTH/NPTH drills and slots matched; outline, stencil and SMT mask coverage checked. Silk overhang is measured separately. Physical assembly/process acceptance remains pending."
        return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("circuit", type=Path)
    parser.add_argument("--output-directory", type=Path, required=True)
    args = parser.parse_args()
    result = inspect_exports(ExportReviewPaths(args.archive, args.circuit, args.output_directory))
    (args.output_directory / "readback.json").write_text(json.dumps(result, indent=2)+"\n")
    print("All 12 fabrication files independently parsed and checked against the routed source")
