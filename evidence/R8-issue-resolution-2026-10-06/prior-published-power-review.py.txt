"""Nominal routed power-path measurements, not a hardware current test."""
import importlib.util
import json
import argparse
import heapq
import math
import hashlib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('power_geometry', ROOT/'scripts/manufacturing-audit.py')
GEOMETRY = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GEOMETRY
SPEC.loader.exec_module(GEOMETRY)


def switching_current_budget(params):
    # TI SLVS696D equations 2/3, with retained +/-20% inductance and
    # the specified 2.2MHz oscillator minimum. Triangular ripple RMS.
    boost_duty = 1 - params['input_floor_v']/3.533
    boost_ripple = params['input_floor_v']*boost_duty/(2_200_000*1.2e-6)
    buck_duty = 3.169/4.1205
    buck_ripple = (4.1205-3.169)*buck_duty/(2_200_000*1.2e-6)
    return {'minimum_inductance_h': 1.2e-6, 'minimum_frequency_hz': 2_200_000,
            'boost_ripple_peak_to_peak_amps': boost_ripple,
            'buck_ripple_peak_to_peak_amps': buck_ripple,
            'rms_design_amps': max(math.hypot(params['input_amps'],boost_ripple/math.sqrt(12)),
                                   math.hypot(0.5,buck_ripple/math.sqrt(12))),
            'peak_design_amps': max(params['input_amps']+boost_ripple/2,0.5+buck_ripple/2)}


def width_budget_failures(paths, budgets):
    return [f'{name}: nominal power neck is insufficient for its current budget'
            for name,current in budgets.items()
            if paths[name]['ipc2221_external_estimate_10c_amps'] < current]


def load_path(params):
    features = [f for f in params['copper'] if f.net == params['net']]
    circuit = params['circuit']
    owners = {e['pcb_component_id']: e['source_component_id'] for e in circuit if e['type'] == 'pcb_component'}
    components = {e['source_component_id']: e['name'] for e in circuit if e['type'] == 'source_component'}
    pads = {e['pcb_smtpad_id']: e for e in circuit if e['type'] == 'pcb_smtpad'}
    endpoints = []
    for reference, pin in params['terminals']:
        matches = [i for i,f in enumerate(features) if f.kind == 'smt' and components[owners[f.owner]] == reference and pin in pads[f.id]['port_hints']]
        if len(matches) != 1:
            raise ValueError(f'Power terminal is not unique: {reference}.{pin}')
        endpoints.append(matches[0])
    adjacent = [[] for _ in features]
    for i, first in enumerate(features):
        for k, second in enumerate(features[:i]):
            if (first.layer == second.layer and first.geometry.intersects(second.geometry)) or (first.id == second.id and first.kind == second.kind == 'annulus'):
                adjacent[i].append(k)
                adjacent[k].append(i)
    queue = [(0, endpoints[0], [endpoints[0]])]
    visited = set()
    while queue:
        resistance, i, route = heapq.heappop(queue)
        if i in visited:
            continue
        visited.add(i)
        if i == endpoints[1]:
            tracks = [features[k] for k in route if features[k].kind == 'track']
            minimum = min(params['track_widths'][t.id] for t in tracks)
            return {'terminals': params['terminals'], 'features': [{'id':features[k].id,'layer':features[k].layer} for k in route], 'trace_only_resistance_upper_bound_20c_ohm': resistance, 'minimum_trace_width_mm': minimum, 'ipc2221_external_estimate_10c_amps': 0.048*10**0.44*((minimum/0.0254)*(0.035/0.0254))**0.725}
        for k in adjacent[i]:
            weight = params['track_resistances'][features[k].id] if features[k].kind == 'track' else 0
            heapq.heappush(queue, (resistance+weight, k, route+[k]))
    raise ValueError('No physically connected power path')


def review(output=ROOT/'evidence/R8-prototype-2026-10-05/power-path-measurements.json'):
    source = ROOT/'dist/index/circuit.json'
    circuit = json.loads(source.read_text())
    if any(e['type'].endswith('_error') for e in circuit):
        raise ValueError('Power review requires an error-free routed circuit')
    copper, _, _ = GEOMETRY.make_features(circuit, 'gerber')
    membership = {e.id: e.net for e in copper if e.kind == 'track'}
    names = {e['subcircuit_connectivity_map_key']: e['name'] for e in circuit if e['type'] == 'source_net'}
    segments = []
    for trace in (e for e in circuit if e['type'] == 'pcb_trace'):
        if trace['pcb_trace_id'] not in membership:
            if len(trace['route']) == 1 and trace['route'][0]['route_type'] == 'wire':
                continue  # Two existing breakouts may already be the same point.
            raise ValueError('Unattributed nonzero routed trace')
        name = names[membership[trace['pcb_trace_id']]]
        if name not in ['USB5V', 'VBAT', 'V3', 'INDUCTOR_L1', 'INDUCTOR_L2']:
            continue
        for a, b in zip(trace['route'], trace['route'][1:]):
            # Match the qualified converter's discrete start-aperture semantics.
            if a['route_type'] == 'wire':
                start, width = a, a['width']
                end = b['start'] if b['route_type'] == 'through_pad' else b
            elif b['route_type'] == 'wire':
                start = a['end'] if a['route_type'] == 'through_pad' else a
                end, width = b, b['width']
            else:
                continue
            length = math.hypot(end['x']-start['x'], end['y']-start['y'])
            if length:
                segments.append({'net': name, 'trace': trace['pcb_trace_id'],
                                 'length_mm': length, 'width_mm': width,
                                 'resistance_20c_ohm': 0.00001724*length/(width*0.035)})
    summaries = {}
    for name in ['USB5V', 'VBAT', 'V3', 'INDUCTOR_L1', 'INDUCTOR_L2']:
        subset = [s for s in segments if s['net'] == name]
        if not subset:
            raise ValueError(f'No measured segments for {name}')
        width = min(s['width_mm'] for s in subset)
        summaries[name] = {'minimum_width_mm': width,
                          'summed_branch_length_mm': sum(s['length_mm'] for s in subset),
                          'all_segments_series_resistance_20c_ohm': sum(s['resistance_20c_ohm'] for s in subset),
                          'ipc2221_external_estimate_10c_amps': 0.048*10**0.44*((width/0.0254)*(0.035/0.0254))**0.725}
    # Every branch in series overestimates the actual route resistance. Assume
    # 50C copper and a conservative -3% regulator budget; do not imply testing.
    resistance_factor = 1 + 0.00393*30
    track_resistances = {s['trace']: sum(row['resistance_20c_ohm'] for row in segments if row['trace'] == s['trace']) for s in segments}
    track_widths = {s['trace']: min(row['width_mm'] for row in segments if row['trace'] == s['trace']) for s in segments}
    paths = {}
    for path_name, name, terminals in [
            ('V3', 'V3', [('U3','pin1'),('U1','pin8')]),
            ('VBAT', 'VBAT', [('J2','pin2'),('U3','pin5')]),
            ('USB_VBUS1', 'USB5V', [('J1','pin18'),('U2','pin10')]),
            ('USB_VBUS2', 'USB5V', [('J1','pin27'),('U2','pin10')]),
            ('BATTERY_CHARGE', 'VBAT', [('U2','pin2'),('J2','pin2')]),
            ('INDUCTOR_L1', 'INDUCTOR_L1', [('U3','pin4'),('L1','pin2')]),
            ('INDUCTOR_L2', 'INDUCTOR_L2', [('U3','pin2'),('L1','pin1')])]:
        net = next(key for key,n in names.items() if n == name)
        paths[path_name] = load_path({'copper':copper,'circuit':circuit,'net':net,'terminals':terminals,'track_resistances':track_resistances,'track_widths':track_widths})
    module_floor = 3.169 - 0.5*resistance_factor*paths['V3']['trace_only_resistance_upper_bound_20c_ohm']
    # Retain the earlier static tolerance envelope and use 80% efficiency.
    # Solve I*(Vbattery-I*R)=P/efficiency, including the actual copper drop.
    input_resistance = resistance_factor*paths['VBAT']['trace_only_resistance_upper_bound_20c_ohm']
    input_power = 3.533*0.5/0.8
    discriminant = 3.003**2-4*input_resistance*input_power
    if discriminant <= 0:
        raise ValueError('No valid trace-only battery operating point')
    battery_input_current = 2*input_power/(3.003+math.sqrt(discriminant))
    regulator_input_floor = 3.003 - battery_input_current*resistance_factor*paths['VBAT']['trace_only_resistance_upper_bound_20c_ohm']
    switching = switching_current_budget({'input_floor_v':regulator_input_floor,
                                          'input_amps':battery_input_current})
    budgets = {'V3':0.5, 'VBAT':battery_input_current, 'USB_VBUS1':0.4,
               'USB_VBUS2':0.4, 'BATTERY_CHARGE':0.3333,
               'INDUCTOR_L1':switching['rms_design_amps'],
               'INDUCTOR_L2':switching['rms_design_amps']}
    report = {'circuit_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
              'nominal_copper_thickness_mm': 0.035, 'segments': segments, 'nets': summaries, 'physical_load_paths': paths,
              'module_design_supply_amps': 0.5, 'module_voltage_floor_budget_v': module_floor,
              'battery_input_design_amps_at_assumed_80pct_efficiency': battery_input_current,
              'regulator_input_voltage_floor_budget_v': regulator_input_floor,
              'switching_current_budget': switching, 'load_path_current_budgets_amps': budgets,
              'references': ['DOIT ESPC3-12 manual page7: startup exceeds400mA; supply>=500mA', 'TI SLVS696D: up to500mA boost at VIN>2.4V', 'IPC-2221 external empirical estimate'],
              'limitations': ['Nominal trace-only resistance; excludes connector, via, battery and regulator transient drops.', 'Whole-track series resistance overestimates the selected path, but does not establish actual loaded voltage.', '35um copper, 50C copper, 3.169-3.533V static tolerance envelope and80% efficiency are design assumptions.', 'USB current budget400mA includes333.3mA worst charge current and control overhead; USB disables radio supply.', 'Switching estimate uses ideal steady-state triangular ripple; startup, faults, core losses and thermal spreading require hardware verification.', 'Ground return uses independently verified continuous EP planes; IPC trace estimates do not model plane bottlenecks or via/contact losses.', 'No current, temperature, transient, battery runtime or RF measurement is claimed.']}
    failures = []
    if module_floor <= 3.0 or regulator_input_floor <= 2.4:
        failures.append('Trace-only voltage budget does not retain module/regulator operating margin')
    failures.extend(width_budget_failures(paths,budgets))
    if switching['rms_design_amps'] >= 1.7 or switching['peak_design_amps'] >= 2.3:
        failures.append('Normal switching-current estimate exceeds qualified inductor ratings')
    report['failures'] = failures
    output.write_text(json.dumps(report, indent=2)+'\n')
    print('Nominal module voltage budget:', module_floor, 'regulator input budget:', regulator_input_floor)
    print('Measured power net minima:', {name: row['minimum_width_mm'] for name,row in summaries.items()})
    if failures:
        raise ValueError('; '.join(failures))


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--output',type=Path,default=ROOT/'evidence/R8-prototype-2026-10-05/power-path-measurements.json')
    review(parser.parse_args().output)
