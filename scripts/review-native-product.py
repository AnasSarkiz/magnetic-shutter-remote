"""Read actual built GLBs; reject scaled, mirrored, lost or moved PCB geometry."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]


def meshes_with_prefix(scene, prefix):
    selected = []
    for node in scene.graph.nodes_geometry:
        if node == prefix or node.startswith(prefix + '_'):
            transform, geometry = scene.graph[node]
            mesh = scene.geometry[geometry].copy()
            mesh.apply_transform(transform)
            selected.append(mesh)
    if not selected:
        raise ValueError(f'Missing native geometry: {prefix}')
    return selected


def bounds(meshes):
    return np.stack([np.min([m.bounds[0] for m in meshes], axis=0),
                     np.max([m.bounds[1] for m in meshes], axis=0)])


def review(output):
    models = json.loads((ROOT/'product/pcb-model-review.json').read_text())
    geometry = json.loads((ROOT/'product/geometry-review.json').read_text())
    rows = []
    for view in ['product.assembly', 'product.exploded']:
        path = ROOT/'dist'/view/'3d.glb'
        scene = trimesh.load(path, force='scene')
        circuit = json.loads((path.parent/'circuit.json').read_text())
        for index, asset in enumerate(models['nativeAssets']):
            prefix = ('R8QualifiedPCBAndFittedParts1' if index == 0
                      else f'R8QualifiedFittedParts{index+1}')
            component = next(e for e in circuit if e['type']=='source_component' and e['name']==prefix)
            cad = next(e for e in circuit if e['type']=='cad_component' and e['source_component_id']==component['source_component_id'])
            if cad['rotation'] != {'x':0,'y':0,'z':0} or cad['model_unit_to_mm_scale_factor'] != 1 or cad['model_board_normal_direction'] != 'y+':
                raise ValueError('Unexpected native PCB transform')
            center = cad['position']
            actual_meshes = meshes_with_prefix(scene, prefix)
            original = trimesh.load(ROOT/'product/models'/asset['filename'], force='scene')
            minimum, maximum = original.bounds
            expected = np.array([[-center["x"]-maximum[0], center["z"]+minimum[1], center["y"]+minimum[2]],
                                 [-center["x"]-minimum[0], center["z"]+maximum[1], center["y"]+maximum[2]]])
            delta = float(np.abs(bounds(actual_meshes)-expected).max())
            original_triangles = sum(len(original.geometry[g].faces)
                                     for g in [original.graph[n][1] for n in original.graph.nodes_geometry])
            actual_triangles = sum(len(mesh.faces) for mesh in actual_meshes)
            if delta > 1e-4 or actual_triangles != original_triangles:
                raise ValueError(f'Native PCB geometry mismatch: {view}/{prefix}: '
                                 f'{delta}mm, {actual_triangles}/{original_triangles} triangles')
            rows.append({'view':view,'fragment':asset['filename'],
                         'bounds_delta_mm':delta, 'triangles':actual_triangles,
                         'all_source_triangles_present':True})
        for part in geometry['parts']:
            source = next(e for e in circuit if e['type']=='source_component'
                          and e['name']==part['name'])
            cad = next(e for e in circuit if e['type']=='cad_component'
                       and e['source_component_id']==source['source_component_id'])
            lower, upper = np.array(part['localBoundsMm'])
            size = upper-lower
            center = cad['position']
            expected_center = np.array([-center['x'],center['z'],center['y']])
            expected_size = size[[0,2,1]]
            expected = np.stack([expected_center-expected_size/2,
                                 expected_center+expected_size/2])
            delta = float(np.abs(bounds(meshes_with_prefix(scene,part['name']))-expected).max())
            if delta > 1e-4:
                raise ValueError(f'Native mechanical placement mismatch: {view}/{part["name"]}: {delta}')
            rows.append({'view':view,'part':part['name'],'bounds_delta_mm':delta})
    report = {'native_views_checked':['product.assembly','product.exploded'],
              'actual_glb_geometry_review':rows, 'passes':True,
              'physical_fit_or_material_testing_claimed':False,
              'native_glb_sha256':{v:hashlib.sha256((ROOT/'dist'/v/'3d.glb').read_bytes()).hexdigest()
                                   for v in ['product.assembly','product.exploded']}}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report,indent=2)+'\n')
    print(f'Native GLB PCB triangle/bounds and mechanical placement checks: {len(rows)} pass')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output',type=Path,required=True)
    review(parser.parse_args().output)
