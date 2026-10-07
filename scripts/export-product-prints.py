"""Manufacturing CSG from the same native JSCAD plans; never repair/display meshes."""
from pathlib import Path
import json
import hashlib
import importlib.metadata
import numpy as np
import trimesh
from manifold3d import Manifold, CrossSection, OpType, Error

ROOT = Path(__file__).resolve().parents[1]

def solid_from_plan(plan):
    kind = plan['type']
    if kind == 'colorize':
        return solid_from_plan(plan['shape'])
    if kind == 'cuboid':
        return Manifold.cube(plan['size'], center=True)
    if kind == 'cylinder':
        # Pinned JSCAD's cylinder default is32 segments; match actual native CAD.
        return Manifold.cylinder(plan['height'], plan['radius'],
                                 circular_segments=32, center=True).translate(plan['center'])
    if kind == 'translate':
        return solid_from_plan(plan['shape']).translate(plan['vector'])
    if kind in {'union', 'subtract', 'hull'}:
        shapes = [solid_from_plan(shape) for shape in plan['shapes']]
        if kind == 'hull':
            return Manifold.batch_hull(shapes)
        return Manifold.batch_boolean(shapes, OpType.Add if kind == 'union' else OpType.Subtract)
    if kind == 'extrudeLinear' and plan['shape']['type'] == 'polygon':
        return CrossSection([plan['shape']['points']]).extrude(plan['options']['height'])
    raise ValueError(f'Unsupported manufacturing operation: {kind}')


def export_prints():
    plans = json.loads((ROOT/'product/print-plans.json').read_text())
    native = json.loads((ROOT/'product/geometry-review.json').read_text())
    native_parts = {part['name']: part for part in native['parts']}
    reports = []
    for part in plans:
        solid = solid_from_plan(part['plan'])
        if solid.status() != Error.NoError or solid.is_empty():
            raise ValueError(f'Invalid manufacturing solid: {part["name"]}')
        mesh = solid.to_mesh()
        result = trimesh.Trimesh(vertices=np.asarray(mesh.vert_properties)[:, :3],
                                 faces=np.asarray(mesh.tri_verts), process=False)
        source = native_parts[part['name']]
        volume_delta = abs(solid.volume()-source['volumeMm3'])
        # Kernel must reproduce the actual native32-facet geometry, not substitute a shape.
        if volume_delta > max(1e-5, source['volumeMm3']*1e-7):
            raise ValueError(f'Native/manufacturing volume mismatch: {part["name"]} {volume_delta}')
        if not np.allclose(result.bounds, source['localBoundsMm'], atol=1e-5, rtol=0):
            raise ValueError(f'Native/manufacturing bounds mismatch: {part["name"]}')
        if not result.is_watertight or not result.is_winding_consistent:
            raise ValueError(f'Nonmanifold manufacturing mesh: {part["name"]}')
        output = ROOT/'product/prints'/f'{part["name"]}.stl'
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(result.export(file_type='stl'))
        # Re-read the actual emitted file, not only its in-memory solid.
        readback = trimesh.load_mesh(output, process=True)
        if not readback.is_watertight or not readback.is_winding_consistent:
            raise ValueError(f'STL readback failed: {part["name"]}')
        reports.append({'file':str(output.relative_to(ROOT)),
                        'sha256':hashlib.sha256(output.read_bytes()).hexdigest(),
                        'triangles':len(result.faces), 'watertight':True,
                        'winding_consistent':True, 'native_volume_delta_mm3':volume_delta,
                        'bounds_mm':result.bounds.tolist(), 'manufacturing_status':str(solid.status())})
    report = {'tool_versions': {name:importlib.metadata.version(name) for name in ['manifold3d','trimesh','numpy']},
              'source_plans_sha256':hashlib.sha256((ROOT/'product/print-plans.json').read_bytes()).hexdigest(),
              'native_geometry_sha256':hashlib.sha256((ROOT/'product/geometry-review.json').read_bytes()).hexdigest(),
              'printed_parts':reports}
    (ROOT/'product/print-mesh-review.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))

if __name__ == '__main__':
    export_prints()
