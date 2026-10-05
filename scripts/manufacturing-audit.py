"""Classified, fail-closed FR4/1oz/2-layer audit in board XY mm (+Z top).
Input is schema-validated Circuit JSON, not edited converter output. Curves use
256 segments/quadrant, curved radius <=1.8mm. Distances within
0.00002 mm of a limit fail as indeterminate; exact dimensional checks are separate.
No component or same-footprint exemption. Own plated annulus and electrical
trace-to-barrel joins are classified features, rather than clearance violations.
"""
import argparse,json,math
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from curved_geometry import brep_polygon, arc_polygon
from dataclasses import dataclass
from shapely.geometry import Point,LineString,Polygon,box
from shapely.affinity import rotate,translate
from shapely.ops import unary_union

EPS=0.00002
RULE_SOURCE='https://jlcpcb.com/capabilities/pcb-capabilities'
NPTH_SOURCE='https://jlcpcb.com/blog/npth-design-guide'
@dataclass
class Copper:
    id: str
    kind: str
    layer: str
    net: str | None
    geometry: object
    owner: str | None = None
@dataclass
class Drill:
    id: str
    kind: str
    layers: tuple
    net: str | None
    geometry: object
    outer: object | None = None

def circle(x,y,d):
    if d/2>1.8:raise ValueError("Curved radius exceeds audited 1.8mm approximation bound")
    return Point(x,y).buffer(d/2,quad_segs=256)
def pill(x,y,w,h,angle=0):
    r=min(w,h)/2
    if r>1.8:raise ValueError("Curved radius exceeds audited 1.8mm approximation bound")
    g=LineString([(-(w/2-r),0),(w/2-r,0)]).buffer(r,quad_segs=256) if w>h else LineString([(0,-(h/2-r)),(0,h/2-r)]).buffer(r,quad_segs=256)
    if abs(w-h)<1e-12:g=Point(0,0).buffer(r,quad_segs=256)
    return translate(rotate(g,angle,origin=(0,0)),x,y)
def pad(e):
    x,y=e['x'],e['y'];shape=e['shape']
    if shape=='circle':return circle(x,y,e.get('radius',0)*2 or e['diameter'])
    if shape in ('pill','rotated_pill'):return pill(x,y,e['width'],e['height'],e.get('ccw_rotation',0))
    if shape in ('rect','rotated_rect'):
        return translate(rotate(box(-e['width']/2,-e['height']/2,e['width']/2,e['height']/2),e.get('ccw_rotation',0),origin=(0,0)),x,y)
    if shape=='polygon':return Polygon([(p['x'],p['y']) for p in e['points']])
    raise ValueError(f'Unsupported SMT shape {shape}')

def make_features(circuit, trace_geometry="conservative"):
    if trace_geometry not in ("conservative","gerber"):
        raise ValueError("Unknown trace geometry mode")
    byid={}
    for e in circuit:
        if (i:=e.get(e['type']+'_id')):byid[i]=e
    portnets={}
    for e in circuit:
        if e['type']=='source_trace':
            n=e.get('subcircuit_connectivity_map_key')
            for p in e.get('connected_source_port_ids',[]):
                if p in portnets and portnets[p]!=n:raise ValueError('Conflicting source net membership')
                portnets[p]=n
    # Supplier-imported repeated lands are distinct physical ports. Resolve
    # only the canonical model's explicit internal connections, transitively;
    # matching names or a shared component alone do not imply connectivity.
    internal_groups=[e['source_port_ids'] for e in circuit
                     if e['type']=='source_component_internal_connection']
    changed=True
    while changed:
        changed=False
        for source_port_ids in internal_groups:
            memberships={portnets[p] for p in source_port_ids
                         if portnets.get(p) is not None}
            if len(memberships)>1:raise ValueError('Conflicting internally connected source nets')
            if memberships:
                membership=next(iter(memberships))
                for source_port_id in source_port_ids:
                    if portnets.get(source_port_id)!=membership:
                        portnets[source_port_id]=membership
                        changed=True
    def net(e):
        if n:=e.get('subcircuit_connectivity_map_key'):return n
        if e.get('pcb_port_id'):
            return portnets.get(byid[e['pcb_port_id']]['source_port_id'])
        if e.get('source_trace_id'):return byid[e['source_trace_id']].get('subcircuit_connectivity_map_key')
        if e['type']=='pcb_trace':raise ValueError(f"Routed trace {e['pcb_trace_id']} has no verified source-net attribution")
        if e.get('pcb_trace_id'):return net(byid[e['pcb_trace_id']])
        if e.get('source_net_id'):return byid[e['source_net_id']].get('subcircuit_connectivity_map_key')
        return None
    copper=[];drills=[];widths=[]
    for e in circuit:
        t=e['type'];n=net(e)
        if t=='pcb_smtpad':copper.append(Copper(e[t+'_id'],'smt',e['layer'],n,pad(e),e.get('pcb_component_id')))
        elif t=='pcb_via':
            g=circle(e['x'],e['y'],e['hole_diameter']);o=circle(e['x'],e['y'],e['outer_diameter']);layers=tuple(e['layers'])
            drills.append(Drill(e[t+'_id'],'via',layers,n,g,o))
            for l in layers:copper.append(Copper(e[t+'_id'],'annulus',l,n,o))
        elif t=='pcb_hole':
            if e['hole_shape']!='circle':raise ValueError('Unsupported NPTH shape')
            drills.append(Drill(e[t+'_id'],'npth',('top','bottom'),None,circle(e['x'],e['y'],e['hole_diameter'])))
        elif t=='pcb_plated_hole':
            if e['shape']=='circle':g=circle(e['x'],e['y'],e['hole_diameter']);o=circle(e['x'],e['y'],e['outer_diameter'])
            elif e['shape'] in ('pill','oval'):
                g=pill(e['x'],e['y'],e['hole_width'],e['hole_height'],e.get('ccw_rotation',0));o=pill(e['x'],e['y'],e['outer_width'],e['outer_height'],e.get('ccw_rotation',0))
            else:raise ValueError(f'Unsupported PTH {e["shape"]}')
            layers=tuple(e['layers']);drills.append(Drill(e[t+'_id'],'pth',layers,n,g,o))
            for l in layers:copper.append(Copper(e[t+'_id'],'annulus',l,n,o,e.get('pcb_component_id')))
        elif t=='pcb_trace':
            parts={}
            for item in e['route']:
                if trace_geometry=='gerber' and item.get('width_interpolation_mode') is not None:
                    raise ValueError('Gerber exporter does not support interpolated trace widths')
                if item['route_type']=='through_pad':
                    # This transition adds copper on its declared endpoint layers;
                    # only real plated geometry joins layers in connectivity review.
                    widths.append((e[t+'_id'],item['width']))
                    if trace_geometry=='conservative':
                        geometry=LineString([(item['start']['x'],item['start']['y']),(item['end']['x'],item['end']['y'])]).buffer(item['width']/2,quad_segs=256)
                        for layer in {item['start_layer'],item['end_layer']}:
                            parts.setdefault(layer,[]).append(geometry)
                elif item['route_type'] not in ('wire','via'):
                    raise ValueError('Unsupported route element')
            for a,b in zip(e['route'],e['route'][1:]):
                if trace_geometry=='gerber':
                    # Match the qualified exporter: the start wire sets aperture
                    # width; via/through-pad starts use the following wire.
                    if a['route_type']=='wire':
                        layer=a['layer'];start=a;segment_width=a['width']
                        if b['route_type'] in ('wire','via'):end=b
                        elif b['start_layer']==layer:end=b['start']
                        elif b['end_layer']==layer:end=b['end']
                        else:continue
                    elif b['route_type']=='wire':
                        layer=b['layer'];end=b;segment_width=b['width']
                        if a['route_type']=='via':start=a
                        elif a['end_layer']==layer:start=a['end']
                        elif a['start_layer']==layer:start=a['start']
                        else:continue
                    else:continue
                    widths.append((e[t+'_id'],segment_width))
                    if (start['x'],start['y'])!=(end['x'],end['y']):
                        parts.setdefault(layer,[]).append(LineString([(start['x'],start['y']),(end['x'],end['y'])]).buffer(segment_width/2,quad_segs=256))
                else:
                    start=a['end'] if a['route_type']=='through_pad' else a
                    end=b['start'] if b['route_type']=='through_pad' else b
                    start_layer=a['end_layer'] if a['route_type']=='through_pad' else a.get('layer')
                    end_layer=b['start_layer'] if b['route_type']=='through_pad' else b.get('layer')
                    if a['route_type'] in ('wire','through_pad') and b['route_type'] in ('wire','through_pad') and start_layer==end_layer:
                        widths.extend([(e[t+'_id'],a['width']),(e[t+'_id'],b['width'])])
                        parts.setdefault(start_layer,[]).append(LineString([(start['x'],start['y']),(end['x'],end['y'])]).buffer(max(a['width'],b['width'])/2,quad_segs=256))
            for l,segments in parts.items():copper.append(Copper(e[t+'_id'],'track',l,n,unary_union(segments)))
        elif t=='pcb_copper_pour':
            if e.get('shape')=='brep':g=brep_polygon(e['brep_shape'])
            elif e.get('shape')=='polygon':
                g=Polygon([(p['x'],p['y']) for p in e['points']])
                if e.get('cutouts'):raise ValueError('Polygon cutouts require explicit geometry support')
            else:raise ValueError('Unsupported pour shape')
            copper.append(Copper(e[t+'_id'],'pour',e['layer'],n,g))
    return copper,drills,widths

def drill_copper_rule(d,c):
    """Return (minimum mm, classification); None only for an actual barrel feed.
    SMT pads are never exempted for matching net/component. Vias in SMT pads
    need an explicit filled/capped process and are not enabled in this project.
    """
    if c.layer not in d.layers:return None,'layer_outside_drill_span'
    if d.id==c.id and c.kind=='annulus':return None,'own_plated_annulus'
    if d.kind=='npth':return .2,'npth_all_copper'
    if c.kind in ('track','pour') and d.net is not None and d.net==c.net and d.outer.intersects(c.geometry):
        return None,'electrical_barrel_feed'
    if c.layer not in ('top','bottom'):return (.2 if d.kind=='via' else .3),'inner_drill_copper'
    if c.kind=='track':return (.2 if d.kind=='via' else .28),'outer_drill_track'
    # JLC does not give an outer PTH-to-SMT special row. Preserve .2 drill
    # clearance as the project constraint, plus the separate copper spacing
    # and annulus tests. Do not present this project constraint as a JLC row.
    return .2,'project_unrelated_drill_copper'

def lower_bound_distance(a,b):
    ax,ay,bx,by=a.bounds;cx,cy,dx,dy=b.bounds
    return math.hypot(max(cx-bx,ax-dx,0),max(cy-by,ay-dy,0))

def audit(copper,drills,widths):
    failures=[];measurements=[];joins=[]
    def record(rule,a,b,gap,minimum):
        m={'rule':rule,'a':a,'b':b,'gap_mm':gap,'minimum_mm':minimum}
        measurements.append(m)
        if gap<minimum-EPS:failures.append(m)
        elif abs(gap-minimum)<=EPS and rule!="track_width":
            m["status"]="indeterminate_at_geometric_precision"
            failures.append(m)
    for d in drills:
        w=d.geometry.bounds[2]-d.geometry.bounds[0]
        # Diameter/slot width taken from minimum rotated bounding dimension is
        # unsuitable at arbitrary angles; use area-derived annulus only here.
        if d.outer is not None:
            gap=d.geometry.boundary.distance(d.outer.boundary) if d.outer.covers(d.geometry) else -1
            record('via_annulus' if d.kind=='via' else 'pth_annulus',d.id,d.id,gap,.05 if d.kind=='via' else .18)
        for c in copper:
            minimum,rule=drill_copper_rule(d,c)
            if (minimum is not None and d.outer is not None and
                    c.kind=='track' and d.net is not None and d.net==c.net):
                # A trace and via wholly joined by real local plane copper
                # have no separate etched gap. Require the entire local hull;
                # matching names or a remote conductive path are insufficient.
                local_track=c.geometry.intersection(d.outer.buffer(minimum))
                if not local_track.is_empty:
                    local_hull=d.outer.union(local_track).convex_hull
                    if any(plane.kind=='pour' and plane.layer==c.layer and
                           plane.net==c.net and plane.geometry.covers(local_hull)
                           for plane in copper):
                        minimum,rule=None,'physical_shared_plane_barrel_feed'
            if minimum is None:joins.append({'drill':d.id,'copper':c.id,'layer':c.layer,'classification':rule});continue
            if lower_bound_distance(d.geometry,c.geometry)<=minimum+.25:
                record(rule,d.id,c.id+':'+c.layer,d.geometry.distance(c.geometry),minimum)
    for i,d in enumerate(drills):
        for other in drills[i+1:]:
            if set(d.layers).intersection(other.layers):record('hole_hole',d.id,other.id,d.geometry.distance(other.geometry),.2 if d.kind==other.kind=='via' else .45)
    for i,a in enumerate(copper):
        for b in copper[i+1:]:
            if a.layer!=b.layer:continue
            same=a.net is not None and a.net==b.net
            if same and a.geometry.intersects(b.geometry):continue # copper union/intentional join
            if same:
                if a.kind==b.kind=='track':
                    # Audit etched gaps outside actual common conductive copper.
                    # Pads and pours merge covered track sections into a single
                    # conductive shape; uncovered close parallel tails still fail.
                    shared=[c for c in copper if c.kind in ('annulus','smt','pour') and
                            c.layer==a.layer and c.net==a.net and
                            c.geometry.intersects(a.geometry) and
                            c.geometry.intersects(b.geometry)]
                    outside_a,outside_b=a.geometry,b.geometry
                    if shared:
                        junction=unary_union([c.geometry for c in shared])
                        outside_a=a.geometry.difference(junction)
                        outside_b=b.geometry.difference(junction)
                        joins.append({'copper_a':a.id,'copper_b':b.id,
                                      'layer':a.layer,'pads':[c.id for c in shared],
                                      'classification':'physical_shared_copper_junction'})
                    if not outside_a.is_empty and not outside_b.is_empty:
                        record('same_net_separate_tracks',a.id,b.id,outside_a.distance(outside_b),.25)
                continue
            minimum=.15 if a.kind==b.kind=='smt' else .1
            if lower_bound_distance(a.geometry,b.geometry)<=minimum+.25:
                record('different_net_copper',a.id+':'+a.layer,b.id+':'+b.layer,a.geometry.distance(b.geometry),minimum)
    for i,w in widths:
        m={'rule':'track_width','a':i,'b':i,'gap_mm':w,'minimum_mm':.1}
        measurements.append(m)
        if w<.1-1e-9:failures.append(m)
    return {'failures':failures,'measurements':sorted(measurements,key=lambda m:m['gap_mm']-m['minimum_mm']),'classified_joins':joins,'curve_error_bound_mm':EPS,'sources':[RULE_SOURCE,NPTH_SOURCE],'limitations':['No fabrication tolerance stack is subtracted from nominal capability minima.','Minimum drill sizes/slot aspect ratios, solder mask and silk require separate export review.','PTH/NPTH mixed drill spacing uses conservative project 0.45mm; JLC row labels do not explicitly classify mixed pairs.','Outer drill-to-SMT/pour .2mm is a retained project constraint; JLC has specific track rows.','Unsupported geometry raises an error; no ignored copper features.']}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--input',default='dist/index/circuit.json');p.add_argument('--trace-geometry',choices=['conservative','gerber'],default='conservative');p.add_argument('--output',default='evidence/R3/manufacturing-audit.json');a=p.parse_args()
    result=audit(*make_features(json.loads(Path(a.input).read_text()),a.trace_geometry));result['trace_geometry']=a.trace_geometry
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n')
    print('Classified manufacturing failures:',len(result['failures']))
    for f in result['failures'][:25]:print(f)
    raise SystemExit(bool(result['failures']))
