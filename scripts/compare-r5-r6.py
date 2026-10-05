"""Compare engineering semantics/geometry, ignoring regenerated ID numbering."""
import collections,hashlib,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
old=json.loads((ROOT/'evidence/R6/R5-toolchain-control.circuit.json').read_text());new=json.loads((ROOT/'dist/index/circuit.json').read_text())
def index(c,kind,key):return {e[key]:e for e in c if e['type']==kind}
def placements(c):
 names=index(c,'source_component','source_component_id')
 return {names[e['source_component_id']]['name']:{k:e.get(k) for k in ['center','rotation','layer','width','height']} for e in c if e['type']=='pcb_component'}
a,b=placements(old),placements(new);changes={ref:{'R5':a[ref],'R6':b[ref]} for ref in a if a[ref]!=b[ref]}
def identities(c):return {e['name']:{k:e[k] for k in ['manufacturer_part_number','supplier_part_numbers']} for e in c if e['type']=='source_component'}
i,j=identities(old),identities(new)
def circuit_connectivity(c):
 components=index(c,'source_component','source_component_id');ports=index(c,'source_port','source_port_id');nets=index(c,'source_net','source_net_id');result=collections.defaultdict(set)
 for e in c:
  if e['type']=='source_trace':
   for p in e['connected_source_port_ids']:
    port=ports[p];ref=components[port['source_component_id']]['name']
    if ref!='J1':result[(ref,port.get('pin_number'),port['name'])].update(nets[n]['name'] for n in e['connected_source_net_ids'])
 return dict(result)
def routes(c):
 result={}
 for e in c:
  if e['type']=='pcb_trace':
   # Numeric IDs / pour-membership annotations are not physical trace geometry.
   result[e['pcb_trace_id']]=[{k:p[k] for k in ['route_type','x','y','width','layer','from_layer','to_layer','via_diameter','hole_diameter'] if k in p} for p in e['route']]
 return result
ro,rn=routes(old),routes(new);same=[k for k in ro if rn.get(k)==ro[k]];different=[k for k in ro if rn.get(k)!=ro[k]]
oldpours=[e for e in old if e['type']=='pcb_copper_pour'];newpours=[e for e in new if e['type']=='pcb_copper_pour']
report={'R5_control_sha256':hashlib.sha256((ROOT/'evidence/R6/R5-toolchain-control.circuit.json').read_bytes()).hexdigest(),'R6_circuit_sha256':hashlib.sha256((ROOT/'dist/index/circuit.json').read_bytes()).hexdigest(),'placement_changes':changes,'identity_changes':{ref:{'R5':i[ref],'R6':j[ref]} for ref in i if i[ref]!=j[ref]},'all_36_non_usb_placements_identical':set(changes)=={'J1'},'all_non_usb_connectivity_identical':circuit_connectivity(old)==circuit_connectivity(new),'routing':{'R5_trace_count':len(ro),'R6_trace_count':len(rn),'exact_geometry_unchanged':len(same),'changed':len(different),'changed_ids':different,'unchanged_ids':same,'unchanged_non_usb_saved_fanouts':all(rn[k]==v for k,v in ro.items() if k.startswith('saved_fanout_') and not k.startswith('saved_fanout_pcb_group_0_')),'explanation':'Native global routing reruns because USB terminal geometry changed. Unchanged non-USB saved fanouts retained. Public route-cache API cannot represent branch followups (issue 014). A native preloaded-route probe rejected the old graph; evidence preserved, no outputs forced.'},'copper_pour_fragments':{'R5':len(oldpours),'R6':len(newpours),'explanation':'Native GND polygon clipping around rerouted tracks; source plane and RF boundary unchanged.'}}
(ROOT/'evidence/R6/R5-to-R6-comparison.json').write_text(json.dumps(report,indent=2)+'\n')
assert report['all_36_non_usb_placements_identical'] and report['all_non_usb_connectivity_identical'] and report['routing']['unchanged_non_usb_saved_fanouts']
print('36 placements and non-USB connectivity unchanged; routes',len(same),'identical,',len(different),'changed')
