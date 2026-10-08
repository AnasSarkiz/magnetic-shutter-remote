"""Check read-only native browser mesh bounds against qualified source poses."""
import argparse
import hashlib
import itertools
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def collect_groups(meshes, names):
    groups = {name: [] for name in names}
    for mesh in meshes:
        key = mesh['name'] if mesh['name'] in groups else mesh['parent']
        if key in groups:
            groups[key].append(mesh)
    if any(not rows for rows in groups.values()):
        raise ValueError('Native browser omitted a required physical model')
    return groups


def verify_view(options, context):
    view, path = options
    pcb, geometry, models = context
    circuit_path = ROOT/'dist'/('enclosure' if view == 'closed' else 'product.exploded')/'circuit.json'
    circuit = json.loads(circuit_path.read_text())
    source_names = {row['source_component_id']: row['name'] for row in circuit if row['type']=='source_component'}
    cad_by_name = {source_names[row['source_component_id']]:row for row in circuit if row['type']=='cad_component'}
    meshes = json.loads(path.read_text())
    groups = collect_groups(meshes, [row['name'] for row in pcb['meshes']]+[row['name'] for row in geometry['parts']])
    board = cad_by_name['R8QualifiedPCBAndFittedParts1']['position']
    if pcb['assetRotationDegrees'] != 90:
        raise ValueError('Browser review currently requires the qualified 90 degree pose')
    checks = []
    for name, rows in groups.items():
        original = next((row for row in pcb['meshes'] if row['name']==name), None)
        if original:
            lower, upper = original['boundsMm']
            # Independent qualified PCB XY -> product XY: (-Y,+X), preserving +Z.
            points = [[board['x']-y, board['y']+x, board['z']+z]
                      for x,y,z in itertools.product(*zip(lower,upper))]
            expected = [[min(point[axis] for point in points) for axis in range(3)],
                        [max(point[axis] for point in points) for axis in range(3)]]
            if sum(row['vertices'] for row in rows) != original['vertices']:
                raise ValueError(f'Browser changed original PCB vertices: {view}/{name}')
        else:
            part = next(row for row in geometry['parts'] if row['name']==name)
            model = next(row for row in models['models'] if row['part']==name)
            if sum(row['triangles'] for row in rows) != model['triangles']:
                raise ValueError(f'Browser changed mechanical triangles: {view}/{name}')
            expected = part['boundsMm']
            lower, upper = part['localBoundsMm']
            shift = [cad_by_name[name]['position'][axis]-(lower[i]+upper[i])/2
                     for i,axis in enumerate(['x','y','z'])]
            expected = [[point[i]+shift[i] for i in range(3)] for point in expected]
        actual = [[min(row['bounds'][0][axis] for row in rows) for axis in range(3)],
                  [max(row['bounds'][1][axis] for row in rows) for axis in range(3)]]
        delta = max(abs(expected[i][axis]-actual[i][axis]) for i in range(2) for axis in range(3))
        if delta > 1e-4:
            raise ValueError(f'Browser model pose differs from qualified source: {view}/{name}: {delta} mm')
        checks.append({'view':view,'model':name,'maximum_bounds_delta_mm':delta,'vertices':sum(row['vertices'] for row in rows),'triangles':sum(row['triangles'] for row in rows),'passes':True})
    return checks


def review(options):
    pcb = json.loads((ROOT/'product/pcb-model-review.json').read_text())
    geometry = json.loads((ROOT/'product/geometry-review.json').read_text())
    models = json.loads((ROOT/'product/mechanical-model-review.json').read_text())
    browser = json.loads((options.browser_output/'review.json').read_text())
    if browser['browser_errors'] or not browser['passes']:
        raise ValueError('Native browser rendering did not pass')
    checks = []
    for view in ['closed','exploded']:
        checks.extend(verify_view((view, options.browser_output/(view+'-browser-meshes.json')), (pcb,geometry,models)))
    source_hashes = {str(path.relative_to(ROOT)):hashlib.sha256(path.read_bytes()).hexdigest()
                     for path in (ROOT/'product/models').rglob('*.glb')}
    for model in browser['models_requested']:
        if not model['matches'] or source_hashes[model['path']] != model['sha256']:
            raise ValueError('Browser loaded a stale or changed asset')
    if set(row['path'] for row in browser['models_requested']) != set(source_hashes):
        raise ValueError('Browser did not load all 17 actual native assets')
    report = {'browser_render_review':True,'viewer_version':browser['viewer_version'],'browser_version':browser['browser_version'],
              'models_checked':checks,'geometry_checks':len(checks),'all_17_assets_match':True,'model_sha256':source_hashes,
              'circuit_sha256':hashlib.sha256((ROOT/'dist/index/circuit.json').read_bytes()).hexdigest(),
              'view_circuit_sha256':{view:hashlib.sha256((ROOT/'dist'/view/'circuit.json').read_bytes()).hexdigest() for view in ['enclosure','product.exploded']},
              'browser_errors':browser['browser_errors'],'orbit_gesture_executed':browser['orbit_gesture_executed'],
              'physical_fit_testing_claimed':False,'separate_native_gltf_export':'failed in initial test; Maximum call stack size exceeded',
              'passes':True}
    options.output.parent.mkdir(parents=True,exist_ok=True)
    options.output.write_text(json.dumps(report,indent=2)+'\n')
    print(f'Actual native browser PCB and mechanical poses: {len(checks)} checks PASS; 17 exact asset loads')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser-output',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    review(parser.parse_args())
