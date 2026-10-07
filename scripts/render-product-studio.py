"""Studio views of the actual native GLB; materials/lighting only, no mesh edits."""
import argparse
import hashlib
import json
import math
import sys
from pathlib import Path
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]


def material(name, options):
    result = bpy.data.materials.new(name)
    result.use_nodes = True
    principled = result.node_tree.nodes.get('Principled BSDF')
    principled.inputs['Base Color'].default_value = (*options['rgb'], 1)
    principled.inputs['Roughness'].default_value = options['roughness']
    principled.inputs['Metallic'].default_value = options.get('metallic', 0)
    if options.get('grain'):
        grain = result.node_tree.nodes.new('ShaderNodeTexVoronoi')
        grain.feature = 'DISTANCE_TO_EDGE'
        grain.inputs['Scale'].default_value = 65
        bump = result.node_tree.nodes.new('ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.65
        bump.inputs['Distance'].default_value = 0.25
        result.node_tree.links.new(grain.outputs['Distance'], bump.inputs['Height'])
        result.node_tree.links.new(bump.outputs['Normal'], principled.inputs['Normal'])
    return result


def point_at(obj, target):
    obj.rotation_euler = (Vector(target)-obj.location).to_track_quat('-Z', 'Y').to_euler()


def area_light(name, options):
    lamp = bpy.data.lights.new(name, 'AREA')
    lamp.energy = options['energy']
    lamp.shape = 'DISK'
    lamp.size = options['size']
    obj = bpy.data.objects.new(name, lamp)
    bpy.context.collection.objects.link(obj)
    obj.location = options['position']
    point_at(obj, (0, 15, 45))


def smooth_presentation_normals(mesh):
    # Native GLB triangles duplicate vertices. Share only shading normals at
    # identical coordinates; do not weld, repair, move or decimate any geometry.
    geometry_before = hashlib.sha256(json.dumps({
        'vertices':[list(vertex.co) for vertex in mesh.vertices],
        'faces':[list(polygon.vertices) for polygon in mesh.polygons]},separators=(',',':')).encode()).hexdigest()
    normals_by_position = {}
    for polygon in mesh.polygons:
        normal = tuple(round(c, 6) for c in polygon.normal)
        for vertex_index in polygon.vertices:
            position = tuple(round(c, 6) for c in mesh.vertices[vertex_index].co)
            normals_by_position.setdefault(position, set()).add(normal)
    normals = []
    minimum_dot = math.cos(math.radians(35))
    for polygon in mesh.polygons:
        polygon.use_smooth = True
        for loop_index in polygon.loop_indices:
            vertex = mesh.vertices[mesh.loops[loop_index].vertex_index]
            position = tuple(round(c, 6) for c in vertex.co)
            total = Vector((0, 0, 0))
            for candidate in normals_by_position[position]:
                normal = Vector(candidate)
                if normal.dot(polygon.normal) > minimum_dot:
                    total += normal
            normals.append(tuple(total.normalized()))
    mesh.normals_split_custom_set(normals)
    geometry_after = hashlib.sha256(json.dumps({
        'vertices':[list(vertex.co) for vertex in mesh.vertices],
        'faces':[list(polygon.vertices) for polygon in mesh.polygons]},separators=(',',':')).encode()).hexdigest()
    if geometry_before != geometry_after:
        raise ValueError('Studio shading changed the native geometry')
    return geometry_after


def render(options):
    path = ROOT/'dist/product.assembly/3d.glb'
    input_sha = hashlib.sha256(path.read_bytes()).hexdigest()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(path))
    imported = list(bpy.context.scene.objects)
    frame = bpy.data.objects.new('Native GLB to upright studio frame', None)
    bpy.context.collection.objects.link(frame)
    # Blender imports glTF Y-up as Z-up; undo that once to make native Z height.
    frame.rotation_euler.x = -math.pi/2
    frame.location = (-14, 0, 52)
    for obj in imported:
        if obj.parent is None:
            obj.parent = frame
    bpy.context.view_layer.update()
    review = json.loads((ROOT/'product/geometry-review.json').read_text())
    parts = {p['name']: p for p in review['parts']}
    materials = {}
    proof = []
    for name, part in parts.items():
        objects = [obj for obj in imported if obj.type == 'MESH' and
                   (obj.name == name or obj.name.startswith(name+'_') or obj.name.startswith(name+'.'))]
        if not objects:
            raise ValueError(f'Missing actual native geometry: {name}')
        vertices = [obj.matrix_world @ vertex.co for obj in objects for vertex in obj.data.vertices]
        measured = [[min(v[a] for v in vertices) for a in range(3)],
                    [max(v[a] for v in vertices) for a in range(3)]]
        lower, upper = part['boundsMm']
        expected = [[-upper[0]-14, lower[2], lower[1]+52],
                    [-lower[0]-14, upper[2], upper[1]+52]]
        delta = max(abs(a-b) for v,w in zip(measured,expected) for a,b in zip(v,w))
        if delta > 1e-3:
            raise ValueError(f'Studio frame differs from actual CAD: {name}: {delta}')
        proof.append({'part':name,'geometry_bounds_delta_mm':delta})
        settings = {'rgb':(0.03,0.033,0.036),'roughness':0.42}
        if name == 'SideShutterPlunger':
            settings = {'rgb':(0.48,0.26,0.14),'roughness':0.32,'metallic':0.8}
        elif name == 'FingerGripInsert':
            settings = {'rgb':(0.02,0.022,0.024),'roughness':0.6,'grain':True}
        elif name in ['MagSafeRearCover','MagSafeFaceCover']:
            settings = {'rgb':(0.014,0.017,0.02),'roughness':0.7}
        materials[name] = material(name, settings)
        for obj in objects:
            obj.data.materials.clear()
            obj.data.materials.append(materials[name])
            proof[-1].setdefault('unchanged_mesh_sha256',[]).append(smooth_presentation_normals(obj.data))
    bpy.ops.mesh.primitive_plane_add(size=2000, location=(0, 0, -0.05))
    bpy.context.object.data.materials.append(material('Studio ground',{'rgb':(0.36,0.31,0.25),'roughness':0.8}))
    area_light('Key',{'energy':180000,'size':120,'position':(-100,130,175)})
    area_light('Fill',{'energy':80000,'size':100,'position':(130,90,100)})
    area_light('Rim',{'energy':160000,'size':90,'position':(30,-90,160)})
    scene = bpy.context.scene
    scene.world = bpy.data.worlds.new('Studio world')
    scene.world.use_nodes = True
    scene.world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.25,0.22,0.19,1)
    scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.5
    camera = bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera'))
    bpy.context.collection.objects.link(camera)
    camera.location = {'front':(105,210,110),'straight':(0,250,45),'side':(250,12,48),
                       'back':(-95,-210,108)}[options.view]
    point_at(camera,(0,16,40))
    camera.data.type = 'ORTHO'
    camera.data.ortho_scale = 108 if options.view != 'side' else 98
    scene.camera = camera
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = options.samples
    scene.cycles.use_denoising = False  # Installed Blender4.3.2 lacks OpenImageDenoise.
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 4
    scene.render.resolution_x = 1400
    scene.render.resolution_y = 1200
    scene.render.resolution_percentage = options.resolution_percent
    scene.view_settings.view_transform = 'AgX'
    output = ROOT/'product'/('closed.png' if options.view == 'front' else f'studio-{options.view}.png')
    scene.render.filepath = str(output)
    bpy.ops.render.render(write_still=True)
    assert hashlib.sha256(path.read_bytes()).hexdigest() == input_sha
    (ROOT/'product'/f'studio-{options.view}-review.json').write_text(json.dumps({
        'input_native_glb_sha256':input_sha,'actual_native_geometry_verified':proof,
        'output':str(output.relative_to(ROOT)),'output_sha256':hashlib.sha256(output.read_bytes()).hexdigest(),
        'blender_version':bpy.app.version_string,'material_and_lighting_presentation_only':True,'smooth_shading_angle_degrees':35,
        'physical_finish_or_fit_claimed':False,'samples':options.samples},indent=2)+'\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--view',choices=['front','straight','side','back'],default='front')
    parser.add_argument('--samples',type=int,default=64)
    parser.add_argument('--resolution-percent',type=int,default=100)
    args = sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    render(parser.parse_args(args))
