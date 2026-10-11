"""Render existing native model assets at eight cameras; no mesh edits or PCB build."""
import bpy, json, math, hashlib, sys, importlib.util
from pathlib import Path
from mathutils import Matrix, Vector
REPO = Path(__file__).resolve().parents[1]
import argparse
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
ROOT = args.output.resolve()
ROOT.mkdir(parents=True, exist_ok=True)
spec = importlib.util.spec_from_file_location('studio', REPO / 'scripts/render-product-studio.py')
studio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(studio)
bpy.ops.wm.read_factory_settings(use_empty=True)
rows = json.loads((REPO / 'dist/enclosure/circuit.json').read_text())
sources = {e['source_component_id']: e['name'] for e in rows if e['type'] == 'source_component'}
parts = {p['name']: p for p in json.loads((REPO / 'product/geometry-review.json').read_text())['parts']}
undo_import = Matrix.Rotation(-math.pi / 2, 4, 'X')
proof = []
for e in rows:
    if e['type'] != 'cad_component':
        continue
    path = REPO / e['model_glb_url'].removeprefix('./')
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    before = set(bpy.context.scene.objects)
    bpy.ops.import_scene.gltf(filepath=str(path))
    objects = set(bpy.context.scene.objects) - before
    position = Vector([e['position'][a] for a in 'xyz'])
    frame = bpy.data.objects.new(sources[e['source_component_id']], None)
    bpy.context.collection.objects.link(frame)
    frame.matrix_world = Matrix.Translation(position) @ undo_import
    for obj in objects:
        if obj.parent is None:
            obj.parent = frame
    bpy.context.view_layer.update()
    meshes = [o for o in objects if o.type == 'MESH']
    points = [o.matrix_world @ v.co for o in meshes for v in o.data.vertices]
    bounds = [[min((v[a] for v in points)) for a in range(3)], [max((v[a] for v in points)) for a in range(3)]]
    name = sources[e['source_component_id']]
    row = {'name': name, 'input_glb_sha256': digest, 'placed_bounds_mm': bounds, 'position_from_circuit_json': list(position)}
    if name in parts:
        expected = parts[name]['boundsMm']
        delta = max((abs(a - b) for r, s in zip(bounds, expected) for a, b in zip(r, s)))
        row['native_bounds_delta_mm'] = delta
        assert delta < 0.001, (name, delta, bounds, expected)
        settings = {'rgb': (0.03, 0.033, 0.036), 'roughness': 0.42}
        if name == 'SideShutterPlunger':
            settings = {'rgb': (0.48, 0.26, 0.14), 'roughness': 0.32, 'metallic': 0.8}
        elif name == 'FingerGripInsert':
            settings = {'rgb': (0.02, 0.022, 0.024), 'roughness': 0.6, 'grain': True}
        elif name in ['MagSafeRearCover', 'MagSafeFaceCover']:
            settings = {'rgb': (0.014, 0.017, 0.02), 'roughness': 0.7}
        mat = studio.material(name, settings)
        row['unchanged_mesh_sha256'] = []
        for obj in meshes:
            obj.data.materials.clear()
            obj.data.materials.append(mat)
            row['unchanged_mesh_sha256'].append(studio.smooth_presentation_normals(obj.data))
    proof.append(row)
scene = bpy.context.scene
scene.world = bpy.data.worlds.new('Comparison background')
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.38, 0.34, 0.29, 1)
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.55
center = Vector((-14, -13, 17))
for i, offset in enumerate([(110, 90, 160), (-100, 70, 120), (40, -100, 120), (100, 50, -140), (-100, -80, -100), (0, 150, 20)]):
    lamp = bpy.data.lights.new('Area' + str(i), 'AREA')
    lamp.energy = 120000
    lamp.shape = 'DISK'
    lamp.size = 130
    obj = bpy.data.objects.new(lamp.name, lamp)
    bpy.context.collection.objects.link(obj)
    obj.location = center + Vector(offset)
    studio.point_at(obj, center)
cam = bpy.data.objects.new('Eight-view camera', bpy.data.cameras.new('Eight-view camera'))
bpy.context.collection.objects.link(cam)
cam.data.type = 'ORTHO'
cam.data.ortho_scale = 112
scene.camera = cam
scene.render.engine = 'CYCLES'
scene.cycles.samples = 16
scene.cycles.use_denoising = False
scene.render.threads_mode = 'FIXED'
scene.render.threads = 4
scene.render.resolution_x = 1000
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = 'AgX'
scene.render.image_settings.file_format = 'PNG'
views = [('01-front', 'Front / outward face', (0, 0, 250), 'Y'), ('02-phone-facing', 'Back / phone-facing', (0, 0, -250), 'Y'), ('03-usb-side', 'USB-C side', (-250, 0, 0), 'Y'), ('04-opposite-side', 'Opposite side', (250, 0, 0), 'Y'), ('05-top', 'Top / shutter shoulder', (0, 250, 0), 'Z'), ('06-bottom', 'Bottom / grip base', (0, -250, 0), 'Z'), ('07-front-left', 'Front-left three-quarter', (-170, 80, 220), 'Y'), ('08-front-right', 'Front-right three-quarter', (170, 80, 220), 'Y')]
report = {'source_geometry_sha256': hashlib.sha256((REPO / 'product/geometry.ts').read_bytes()).hexdigest(), 'circuit_sha256': hashlib.sha256((REPO / 'dist/enclosure/circuit.json').read_bytes()).hexdigest(), 'assets': proof, 'geometry_changed': False, 'renders': [], 'reference_hidden_geometry_inferred': False, 'physical_fit_validation_run': False}
(ROOT / 'native-placement-review.json').write_text(json.dumps(report, indent=2))
for filename, label, offset, up in views:
    cam.location = center + Vector(offset)
    forward = (center - cam.location).normalized()
    world_up = Vector((0, 1, 0) if up == 'Y' else (0, 0, 1))
    right = forward.cross(world_up).normalized()
    camera_up = right.cross(forward).normalized()
    cam.rotation_euler = Matrix((right, camera_up, -forward)).transposed().to_euler()
    scene.render.filepath = str(ROOT / (filename + '.png'))
    bpy.ops.render.render(write_still=True)
    report['renders'].append({'file': filename + '.png', 'label': label, 'camera_offset_mm': offset, 'sha256': hashlib.sha256((ROOT / (filename + '.png')).read_bytes()).hexdigest()})
    (ROOT / 'native-placement-review.json').write_text(json.dumps(report, indent=2))
    print('VIEW_DONE', filename, flush=True)
for e in proof:
    path = next((REPO / r['model_glb_url'].removeprefix('./') for r in rows if r.get('type') == 'cad_component' and sources[r['source_component_id']] == e['name']))
    assert hashlib.sha256(path.read_bytes()).hexdigest() == e['input_glb_sha256']
print('EIGHT_VIEWS_COMPLETE: native geometry and input hashes preserved', flush=True)
