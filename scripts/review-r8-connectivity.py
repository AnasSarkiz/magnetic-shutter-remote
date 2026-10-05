"""Independent physical-copper connectivity and antenna/thermal checks for R8.

Uses measured copper intersections and plated barrels, not matching net names
alone. Unsupported features fail closed in the shared geometry reader.
"""
import importlib.util
import json
import argparse
import sys
from pathlib import Path
from shapely.geometry import box
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('manufacturing_geometry', ROOT/'scripts/manufacturing-audit.py')
GEOMETRY = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GEOMETRY
SPEC.loader.exec_module(GEOMETRY)


def review(output=ROOT/'evidence/R8-prototype-2026-10-05/physical-connectivity.json'):
    circuit = json.loads((ROOT/'dist/index/circuit.json').read_text())
    copper, drills, widths = GEOMETRY.make_features(circuit,'gerber')
    components = {e['source_component_id']:e['name'] for e in circuit if e['type']=='source_component'}
    owners = {e['pcb_component_id']:components[e['source_component_id']] for e in circuit if e['type']=='pcb_component'}
    net_names = {e['subcircuit_connectivity_map_key']:e['name'] for e in circuit if e['type']=='source_net'}
    nets = {e.net for e in copper if e.net is not None}
    connectivity = []
    for net in sorted(nets):
        features = [e for e in copper if e.net == net]
        parents = list(range(len(features)))
        def find(index):
            while parents[index] != index:
                index = parents[index]
            return index
        for i, first in enumerate(features):
            for k, second in enumerate(features[:i]):
                same_layer_contact = first.layer == second.layer and first.geometry.intersects(second.geometry)
                plated_barrel = first.id == second.id and first.kind == second.kind == 'annulus'
                if same_layer_contact or plated_barrel:
                    parents[find(i)] = find(k)
        terminals = [(i,e) for i,e in enumerate(features) if e.kind == 'smt' or (e.kind=='annulus' and e.owner)]
        groups = {}
        for i, terminal in terminals:
            groups.setdefault(find(i),[]).append({'pad':terminal.id,'reference':owners[terminal.owner]})
        connectivity.append({'net':net_names.get(net,net),'terminal_copper_groups':list(groups.values()),'connected':len(groups)<=1})
    keepout = box(-24,-28,24,-19.3)
    rf = [e.id+':'+e.layer for e in copper if e.geometry.intersection(keepout).area > GEOMETRY.EPS**2]
    # Fitted TS24CA has no manufacturer copper-exclusion region. Its holes,
    # lands and all copper still receive the independent manufacturing audit.
    shutter_intrusions=[]
    gnd = next(net for net,name in net_names.items() if name=='GND')
    thermal = []
    for ref, ground_pin in [('U2','pin5'),('U3','pin3')]:
        ep = next(e for e in circuit if e['type']=='pcb_smtpad' and owners[e['pcb_component_id']]==ref and 'pin11' in e['port_hints'])
        pin = next(e for e in circuit if e['type']=='pcb_smtpad' and owners[e['pcb_component_id']]==ref and ground_pin in e['port_hints'])
        ep_geometry = GEOMETRY.pad(ep)
        planes = [e for e in copper if e.kind=='pour' and e.layer=='top' and e.net==gnd and e.geometry.covers(ep_geometry) and e.geometry.intersects(GEOMETRY.pad(pin))]
        vias = [d.id for d in drills if d.net==gnd and d.geometry.distance(ep_geometry)<3]
        thermal.append({'reference':ref,'continuous_top_ground_plane_covers_ep_and_ground_pin':bool(planes),'nearby_ground_vias':vias})
    result = {'connectivity':connectivity,'rf_copper_intrusions':rf,'shutter_manufacturer_copper_intrusions':shutter_intrusions,'thermal':thermal,'minimum_trace_width_mm':min(w for _,w in widths),'source':'dist/index/circuit.json','limitations':['Thermal performance, RF, battery, enclosure and phone function require prototype measurements.']}
    output.write_text(json.dumps(result,indent=2)+'\n')
    failed = [n['net'] for n in connectivity if not n['connected']]
    print('Disconnected terminal nets:',failed,'RF intrusions:',rf,'Shutter copper intrusions:',shutter_intrusions,'Thermal:',thermal)
    return bool(failed or rf or shutter_intrusions or any(not p['continuous_top_ground_plane_covers_ep_and_ground_pin'] for p in thermal))

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--output',type=Path,default=ROOT/'evidence/R8-prototype-2026-10-05/physical-connectivity.json')
    raise SystemExit(review(parser.parse_args().output))
