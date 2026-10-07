"""Lossless imported mechanical models from the canonical native JSCAD assembly."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]


def export_models(options):
    source = ROOT/'dist'/options.source_view/'3d.glb'
    scene = trimesh.load(source, force='scene')
    review = json.loads((ROOT/'product/geometry-review.json').read_text())
    circuit = json.loads((source.parent/'circuit.json').read_text())
    reports = []
    for part in review['parts']:
        name = part['name']
        component = next(row for row in circuit if row['type']=='source_component' and row['name']==name)
        cad = next(row for row in circuit if row['type']=='cad_component' and row['source_component_id']==component['source_component_id'])
        if 'model_jscad' not in cad:
            raise ValueError('Mechanical export must originate from canonical native plans')
        lower, upper = np.asarray(part['boundsMm'])
        center = (lower+upper)/2
        if any(abs(cad['position'][axis]-center[index]) > 1e-5 for index,axis in enumerate(['x','y','z'])):
            raise ValueError(f'Canonical mechanical center changed: {name}')
        product_to_model = np.eye(4)
        # Canonical native GLB is (-X, Z, Y); documented z+ models are
        # product (X, Y, Z). This proper rotation has determinant +1 and
        # preserves triangle orientation without face edits or negative scale.
        product_to_model[:3,:3] = [[-1,0,0],[0,0,1],[0,1,0]]
        product_to_model[:3,3] = -center
        selected = trimesh.Scene()
        triangles = 0
        for node in scene.graph.nodes_geometry:
            if node != name and not node.startswith(name+'_'):
                continue
            transform, geometry = scene.graph[node]
            mesh = scene.geometry[geometry].copy()
            model_transform = product_to_model @ transform
            if abs(np.linalg.det(model_transform[:3,:3])-1) > 1e-6:
                raise ValueError(f'Mechanical export requires a proper rigid transform: {name}')
            mesh.apply_transform(model_transform)
            selected.add_geometry(mesh, node_name=node, geom_name=node)
            triangles += len(mesh.faces)
        if not triangles:
            raise ValueError(f'Missing canonical mechanical triangles: {name}')
        target = ROOT/'product/models/mechanical'/f'{name}.glb'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(selected.export(file_type='glb'))
        actual = trimesh.load(target, force='scene')
        actual_triangles = sum(len(actual.geometry[actual.graph[node][1]].faces) for node in actual.graph.nodes_geometry)
        bounds_delta = float(np.abs(selected.bounds-actual.bounds).max())
        if actual_triangles != triangles or bounds_delta > 1e-4:
            raise ValueError(f'Lossy mechanical model export: {name}')
        reports.append({'part':name,'file':str(target.relative_to(ROOT)),
                        'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
                        'bytes':target.stat().st_size,'triangles':triangles,
                        'exported_triangles':actual_triangles,'bounds_delta_mm':bounds_delta,
                        'no_mesh_repair_or_simplification':True})
    report = {'source_view':options.source_view,
              'canonical_native_glb_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
              'source_plans_sha256':hashlib.sha256((ROOT/'product/print-plans.json').read_bytes()).hexdigest(),
              'geometry_review_sha256':hashlib.sha256((ROOT/'product/geometry-review.json').read_bytes()).hexdigest(),
              'model_coordinate_frame':'product XYZ, board normal z+, millimeters',
              'proper_rigid_transforms_only':True,
              'models':reports,'passes':True}
    (ROOT/'product/mechanical-model-review.json').write_text(json.dumps(report,indent=2)+'\n')
    print(f'{len(reports)} lossless native mechanical GLBs exported; {sum(p["bytes"] for p in reports)} bytes')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source-view', required=True, choices=['product.geometry'])
    export_models(parser.parse_args())
