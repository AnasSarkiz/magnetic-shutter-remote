"""Inventory every exported track width against the R8 project minimum.

Power-load-path current and voltage budgets are checked separately by
review-r8-power.py; a nominal net width alone is not a current rating.
"""
import argparse
import hashlib
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('width_geometry', ROOT/'scripts/manufacturing-audit.py')
GEOMETRY = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GEOMETRY
SPEC.loader.exec_module(GEOMETRY)


def review(output):
    source = ROOT/'dist/index/circuit.json'
    circuit = json.loads(source.read_text())
    if any(e['type'].endswith('_error') for e in circuit):
        raise ValueError('Trace review requires an error-free routed circuit')
    copper, _, widths = GEOMETRY.make_features(circuit, 'gerber')
    tracks = {e.id: e for e in copper if e.kind == 'track'}
    nets = {e['subcircuit_connectivity_map_key']: e for e in circuit if e['type'] == 'source_net'}
    rows = []
    point_joins = []
    for trace in (e for e in circuit if e['type'] == 'pcb_trace'):
        trace_id = trace['pcb_trace_id']
        if trace_id not in tracks:
            if len(trace['route']) == 1 and trace['route'][0]['route_type'] == 'wire':
                point_joins.append(trace_id)
                continue
            raise ValueError(f'Unattributed nonzero track: {trace_id}')
        measured = sorted(set(width for track_id, width in widths if track_id == trace_id))
        if not measured:
            raise ValueError(f'No measured track widths: {trace_id}')
        net = nets[tracks[trace_id].net]
        rows.append({'trace_id': trace_id, 'net': net['name'], 'actual_widths_mm': measured,
                     'project_minimum_mm': 0.15, 'passed': min(measured) >= 0.15-1e-9})
    if not rows:
        raise ValueError('No routed tracks to review')
    report = {'circuit_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
              'tracks': rows, 'zero_length_joins': point_joins,
              'failures': [row for row in rows if not row['passed']],
              'power_review': 'power-path-measurements.json',
              'limitations': ['All routed track widths measured using qualified Gerber aperture semantics.',
                             'Power necks need the separate physical-load-path current and voltage checks.',
                             'Nominal 35um copper and IPC-2221 estimates do not replace loaded hardware tests.']}
    output.write_text(json.dumps(report, indent=2)+'\n')
    print(f'{len(rows)} physical tracks reviewed; {len(report["failures"])} undersized tracks')
    if report['failures']:
        raise ValueError('Actual track width is below the project requirement')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    review(parser.parse_args().output)
