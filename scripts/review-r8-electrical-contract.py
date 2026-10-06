"""Verify all fitted identities, values and pins against qualified R8 schematic.

Placement-only revisions must retain the previously reviewed electrical circuit.
This complements explicit manufacturer contracts and real copper connectivity.
"""
import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REFERENCE = ROOT/'evidence/R8-standard-programmer-2026-10-05/unrouted/circuit.json'


def electrical_contract(circuit):
    nets = {e['subcircuit_connectivity_map_key']: e['name'] for e in circuit if e['type'] == 'source_net'}
    ports = [e for e in circuit if e['type'] == 'source_port']
    contracts = {}
    for component in (e for e in circuit if e['type'] == 'source_component'):
        identity = {key: component.get(key) for key in ['ftype', 'manufacturer_part_number',
                    'supplier_part_numbers', 'resistance', 'capacitance', 'inductance']}
        terminals = []
        for port in ports:
            if port['source_component_id'] != component['source_component_id']:
                continue
            terminal = {key: port.get(key) for key in ['pin_number', 'name', 'port_hints',
                        'requires_power', 'requires_ground', 'is_input', 'is_output']}
            membership = port.get('subcircuit_connectivity_map_key')
            if membership and membership not in nets:
                raise ValueError('Unexpected unnamed electrical net')
            terminal['net'] = nets.get(membership)
            terminals.append(terminal)
        identity['terminals'] = sorted(terminals, key=lambda p: json.dumps(p, sort_keys=True))
        if component['name'] in contracts:
            raise ValueError('Duplicate fitted reference')
        contracts[component['name']] = identity
    return contracts


def compare_contracts(reference, current):
    if reference != current:
        changed = sorted(ref for ref in set(reference)|set(current) if reference.get(ref) != current.get(ref))
        raise ValueError(f'Qualified electrical identities/values/pins changed: {changed}')


def review(output):
    source = ROOT/'dist/index/circuit.json'
    reference = electrical_contract(json.loads(REFERENCE.read_text()))
    current = electrical_contract(json.loads(source.read_text()))
    compare_contracts(reference, current)
    report = {'reference': str(REFERENCE.relative_to(ROOT)),
              'reference_sha256': hashlib.sha256(REFERENCE.read_bytes()).hexdigest(),
              'circuit_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
              'fitted_references': len(current),
              'terminals': sum(len(c['terminals']) for c in current.values()),
              'identities_values_and_pin_nets_unchanged': True, 'contracts': current,
              'limitations': ['Retained manufacturer qualification is documented separately.',
                             'This schematic comparison does not prove physical copper continuity.']}
    output.write_text(json.dumps(report, indent=2)+'\n')
    print(f'{report["fitted_references"]} exact identities/values and {report["terminals"]} pin contracts unchanged')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    review(parser.parse_args().output)
