"""Independent binary STL readback: exact edges, winding, areas and components."""
import argparse
import collections
import hashlib
import json
import math
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parents[1]


def review(output):
    reports = []
    for path in sorted((ROOT/'product/prints').glob('*.stl')):
        blob = path.read_bytes()
        count = struct.unpack_from('<I', blob, 80)[0]
        if len(blob) != 84+50*count:
            raise ValueError(f'Invalid binary STL length: {path.name}')
        edges, directed = collections.Counter(), collections.Counter()
        vertices, areas = [], []
        neighbours = collections.defaultdict(set)
        for index in range(count):
            coordinates = struct.unpack_from('<12fH', blob, 84+50*index)[3:12]
            if not all(math.isfinite(c) for c in coordinates):
                raise ValueError(f'Nonfinite STL coordinate: {path.name}')
            triangle = [tuple(coordinates[start:start+3]) for start in (0, 3, 6)]
            a, b, c = triangle
            u, v = [b[i]-a[i] for i in range(3)], [c[i]-a[i] for i in range(3)]
            cross = (u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0])
            areas.append(math.sqrt(sum(component**2 for component in cross))/2)
            vertices.extend(triangle)
            for start, end in zip(triangle, triangle[1:]+triangle[:1]):
                edges[tuple(sorted((start, end)))] += 1
                directed[(start, end)] += 1
                neighbours[start].add(end)
                neighbours[end].add(start)
        remaining, components = set(vertices), 0
        while remaining:
            components += 1
            queue = [remaining.pop()]
            while queue:
                for vertex in neighbours[queue.pop()]:
                    if vertex in remaining:
                        remaining.remove(vertex)
                        queue.append(vertex)
        report = {
            'file': str(path.relative_to(ROOT)),
            'sha256': hashlib.sha256(blob).hexdigest(),
            'triangles': count,
            'zero_area_triangles': sum(area == 0 for area in areas),
            'nonmanifold_edges': sum(count != 2 for count in edges.values()),
            'winding_errors': sum(count != directed[(end, start)] for (start, end), count in directed.items()),
            'connected_components': components,
            'minimum_triangle_area_mm2': min(areas),
            'bounds_mm': [[min(v[a] for v in vertices) for a in range(3)],
                          [max(v[a] for v in vertices) for a in range(3)]],
        }
        reports.append(report)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(reports, indent=2)+'\n')
    if len(reports) != 8 or any(r['zero_area_triangles'] or r['nonmanifold_edges'] or
                              r['winding_errors'] or r['connected_components'] != 1 for r in reports):
        raise ValueError('Independent actual STL readback failed; inspect the retained report')
    print('Eight exact binary STL edge/winding/area/component checks pass')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    review(parser.parse_args().output)
