"""Read-only board-XY mm curve approximation. Maximum chord sagitta 0.000002 mm.
No manufacturing geometry is generated or repaired. Invalid rings fail closed.
"""
import math
from shapely.geometry import Polygon
SAGITTA_MM = .000002

def arc_points(start, end, parameters):
    center, sweep = parameters
    radius = math.dist(start, center)
    if radius <= 0 or abs(math.dist(end, center)-radius) > .00001:
        raise ValueError('Invalid circular arc radius')
    angle = math.atan2(start[1]-center[1],start[0]-center[0])
    step = 2*math.acos(max(-1,1-SAGITTA_MM/radius))
    count = max(1, math.ceil(abs(sweep)/step))
    return [start]+[(center[0]+radius*math.cos(angle+sweep*i/count),center[1]+radius*math.sin(angle+sweep*i/count)) for i in range(1,count)]+[end]

def bulge_ring(ring):
    vertices = ring['vertices']
    if len(vertices)<3:raise ValueError('Ring has fewer than three vertices')
    points=[]
    for index,vertex in enumerate(vertices):
        nxt=vertices[(index+1)%len(vertices)]
        a=(vertex['x'],vertex['y']);b=(nxt['x'],nxt['y']);bulge=vertex.get('bulge',0)
        if not bulge:points.append(a);continue
        chord=math.dist(a,b)
        if chord==0:raise ValueError('Bulge on zero-length chord')
        offset=chord*(1-bulge*bulge)/(4*bulge)
        center=((a[0]+b[0])/2-(b[1]-a[1])*offset/chord,(a[1]+b[1])/2+(b[0]-a[0])*offset/chord)
        points.extend(arc_points(a,b,(center,4*math.atan(bulge)))[:-1])
    return points

def brep_polygon(brep):
    polygon=Polygon(bulge_ring(brep['outer_ring']),[bulge_ring(ring) for ring in brep.get('inner_rings',[])])
    if not polygon.is_valid or polygon.is_empty:raise ValueError('Invalid BREP polygon')
    return polygon

def arc_polygon(primitive):
    points=[]
    for a,b,(clockwise,center) in primitive.segments:
        if clockwise is None:points.append(a);continue
        angle_a=math.atan2(a[1]-center[1],a[0]-center[0]);angle_b=math.atan2(b[1]-center[1],b[0]-center[0])
        sweep=(angle_b-angle_a)%(2*math.pi)
        if clockwise:sweep=sweep-2*math.pi
        elif sweep==0:sweep=2*math.pi
        points.extend(arc_points(a,b,(center,sweep))[:-1])
    polygon=Polygon(points)
    if not polygon.is_valid or polygon.is_empty:raise ValueError('Invalid Gerber region')
    return polygon
