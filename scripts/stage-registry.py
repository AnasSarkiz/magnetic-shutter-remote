"""Stage the selected native circuit and pinned dependencies for tsci push.

The public Git repository retains full qualification/reproduction evidence.
Registry staging includes only the board source closure, models, build JSON,
review documentation and required file dependencies; never caches or SDKs.
"""
import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUALIFICATION = ROOT / 'evidence/R8-standard-programmer-2026-10-05'


def resolve_import(specifier, parent):
    target = (parent / specifier).resolve()
    candidates = [target, *(Path(str(target) + suffix) for suffix in ['.ts', '.tsx']),
                  target / 'index.ts', target / 'index.tsx']
    matches = [path for path in candidates if path.is_file()]
    if len(matches) != 1:
        raise ValueError(f'Local import must resolve uniquely: {specifier} in {parent}')
    selected = matches[0]
    selected.relative_to(ROOT)
    return selected


def source_closure(entry):
    pending, selected = [entry], set()
    while pending:
        path = pending.pop()
        if path in selected:
            continue
        selected.add(path)
        if path.suffix in ['.ts', '.tsx']:
            specifiers = re.findall(r'''(?:from\s*|import\s*)["'](\.[^"']+)["']''', path.read_text())
            pending.extend(resolve_import(specifier, path.parent) for specifier in specifiers)
    return selected


def stage(destination, evidence):
    evidence = evidence.resolve()
    evidence.relative_to(ROOT / 'evidence')
    destination = destination.resolve()
    destination.relative_to(ROOT / '.codex/runtime')
    if destination.exists():
        raise ValueError('Existing staging directory: inspect rather than replace it')
    circuit = json.loads((ROOT / 'dist/index/circuit.json').read_text())
    if any(element['type'].endswith('_error') for element in circuit):
        raise ValueError('Current generated circuit contains errors')
    native = json.loads((evidence / 'final-native-checks.json').read_text())
    if native.get('circuitSha256') != hashlib.sha256((ROOT / 'dist/index/circuit.json').read_bytes()).hexdigest():
        raise ValueError('Native checks belong to a different generated circuit')
    if (native['generatedErrors'] or native['holeTrace'] or native['dangling'] or
            native['selfShorts'] or any(e['type'].endswith('_error') for e in native['all'])):
        raise ValueError('Current native checks did not pass')
    manufacturing = json.loads((evidence / 'final-manufacturing.json').read_text())
    connectivity = json.loads((evidence / 'physical-connectivity.json').read_text())
    circuit_sha256 = hashlib.sha256((ROOT / 'dist/index/circuit.json').read_bytes()).hexdigest()
    for filename in ['final-manufacturing.json', 'physical-connectivity.json',
                     'power-path-measurements.json', 'trace-width-review.json',
                     'electrical-contract.json', 'final-process/process-review.json',
                     'final-readback/readback.json']:
        report = json.loads((evidence / filename).read_text())
        if report.get('circuit_sha256') != circuit_sha256:
            raise ValueError(f'Independent report belongs to a different circuit: {filename}')
        if report.get('failures') or report.get('manufacturing_failures'):
            raise ValueError(f'Independent report did not pass: {filename}')
    if manufacturing['failures'] or any(not net['connected'] for net in connectivity['connectivity']):
        raise ValueError('Independent manufacturing/connectivity checks did not pass')
    if connectivity['rf_copper_intrusions'] or connectivity['shutter_manufacturer_copper_intrusions']:
        raise ValueError('Current copper intrudes into an exclusion')
    if any(not t['continuous_top_ground_plane_covers_ep_and_ground_pin'] for t in connectivity['thermal']):
        raise ValueError('Thermal ground attachment did not pass')
    package = json.loads((ROOT / 'package.json').read_text())
    selected = source_closure(ROOT / 'index.circuit.tsx')
    selected.update(ROOT / name for name in ['package.json', 'bun.lock', 'tsconfig.json',
                    'tscircuit.config.json', 'README.md', 'VALIDATION.md', 'BOM.csv', 'BOM.md',
                    'bom.json', 'dist/index/circuit.json', 'firmware/README.md',
                    'mechanical/R8-MAGSAFE-REQUIREMENTS.md',
                    'mechanical/R8-MAGSAFE-RESEARCH.md',
                    'mechanical/R8-MAGSAFE-REFERENCE-REVIEW.json',
                    'firmware/artifacts/R8-DOIT-C3-hosted-2026-10-05/zephyr.bin',
                    'firmware/artifacts/R8-DOIT-C3-hosted-2026-10-05/BUILD-MANIFEST.json'])
    for section in ['dependencies', 'devDependencies', 'overrides']:
        for specifier in package.get(section, {}).values():
            if specifier.startswith('file:'):
                selected.add(resolve_import(specifier[5:], ROOT))
    for directory in ['scripts', 'tests']:
        for path in (ROOT / directory).rglob('*'):
            if path.is_file() and path.suffix in ['.py', '.ts', '.tsx']:
                selected.update(source_closure(path))
    selected.update(evidence / name for name in ['REVIEW.md', 'final-native-checks.json',
                    'physical-connectivity.json', 'power-path-measurements.json',
                    'SW2-supplier-terminal-registration.json', 'J3-supplier-terminal-registration.json',
                    'final-manufacturing.json', 'final-process/process-review.json',
                    'final-readback/readback.json', 'trace-width-review.json',
                    'electrical-contract.json'])
    selected.update(QUALIFICATION / name for name in [
                    'qualification/QUALIFICATION.md', 'qualification/land-audit.json',
                    'qualification/programmer-release.json', 'qualification/supplier-reference/circuit.json',
                    'qualification/C160389-supplier.json', 'qualification/programmer-0.8.0/circuit.json',
                    'PROGRAMMING.md', 'unrouted/circuit.json'])
    selected.update(ROOT / name for name in [
                    'evidence/USB4215-import-audit/final/circuit.json',
                    'evidence/R8-side-shutter-2026-10-05/qualification/supplier-reference/circuit.json',
                    'fabrication/R8-standard-programmer-2026-10-05/R8-standard-programmer-route04-Gerbers.zip',
                    'tscircuit-issues/091-tangent-pour-cutouts-produce-invalid-ring.md',
                    'tscircuit-issues/092-power-width-review-omits-switching-ripple.md',
                    'tscircuit-issues/093-process-audit-omits-overlapping-legends.md',
                    'tscircuit-issues/094-named-schematic-arrangement-produces-invalid-json.md'])
    selected.add(evidence / 'failed-route10/circuit.json')
    selected.add(evidence / 'failed-route20-visual/process-review.json')
    selected.add(evidence / 'sourcing-check.json')
    selected.update(evidence / name for name in ['REPRODUCE-COMMANDS.json',
                    'placement-preservation.json', 'preservation.json', 'visual-review/inspection.json'])
    fabrication = ROOT / 'fabrication' / evidence.name
    selected.update(path for path in fabrication.rglob('*') if path.is_file())
    for path in selected:
        if not path.is_file():
            raise ValueError(f'Required registry input absent: {path.relative_to(ROOT)}')
        if path.stat().st_size > 5_000_000:
            raise ValueError(f'Registry input exceeds bounded file size: {path.relative_to(ROOT)}')
    destination.mkdir(parents=True)
    hashes = {}
    for source in sorted(selected):
        relative = source.relative_to(ROOT)
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        hashes[str(relative)] = hashlib.sha256(target.read_bytes()).hexdigest()
    manifest = {'status': 'R8 side-actuated shutter with standard JST UART; physical tests pending',
                'package': package['name'], 'version': package['version'],
                'source_sha256': hashes, 'total_bytes': sum(path.stat().st_size for path in selected)}
    (destination / 'registry-source-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'{len(hashes)} exact source/build files; {manifest["total_bytes"]} bytes; {destination}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--destination', type=Path, required=True)
    parser.add_argument('--evidence', type=Path, required=True)
    args = parser.parse_args()
    stage(args.destination, args.evidence)
