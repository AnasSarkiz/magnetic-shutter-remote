"""Measure actual ASCII STL features, in exported part-local mm coordinates.

Grip is exported in dock-world coordinates. Carrier is exported with Z offset
-7.9 mm; X/Y remain board XY. This checks generated geometry, not SCAD text.
"""
import json,re
from pathlib import Path

def vertices(path):
 triples=re.findall(r'^\s*vertex\s+([-+.\deE]+)\s+([-+.\deE]+)\s+([-+.\deE]+)',path.read_text(),re.M)
 if not triples:raise ValueError('Expected actual ASCII triangle mesh')
 return [tuple(map(float,triple)) for triple in triples]
carrier=vertices(Path('mechanical/stl/carrier.stl'))
tabs=[p for p in carrier if p[2]>.5]
left=max(p[0] for p in tabs if p[0]<0);right=min(p[0] for p in tabs if p[0]>0)
gaps=[-7.75-left,right-7.75]
if min(gaps)<.5499:raise ValueError('Battery side clearance is below nominal 0.55 mm')
grip=vertices(Path('mechanical/stl/grip.stl'))
stop=[p for p in grip if p[2]>6.6 and abs(p[0])<20]
stop_near=min(p[1] for p in stop);remote_end=-42+60/2
gap=stop_near-remote_end
if abs(gap-.3)>.0001:raise ValueError('Dock stop overlaps or does not match intended 0.3 mm clearance')
record={'units':'mm','carrier_inside_faces_x':[left,right],'maximum_pack_side_clearance_mm':gaps,'dock_stop_near_y':stop_near,'remote_end_y':remote_end,'dock_stop_clearance_mm':gap,'scope':'Actual mesh dimensions only; manufacturer maxima and print tolerance allocations are calculations. No physical fit claim.'}
Path('evidence/R6/mechanical-mesh-measurements.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record,indent=2))
