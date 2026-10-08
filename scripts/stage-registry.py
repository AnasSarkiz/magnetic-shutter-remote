"""Stage the selected native circuit and pinned dependencies for tsci push.

The public Git repository retains full qualification/reproduction evidence.
Registry staging includes only the board source closure, models, build JSON,
review documentation and required file dependencies; never caches or SDKs.
"""
import argparse
from dataclasses import dataclass
import hashlib
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUALIFICATION = ROOT / 'evidence/R8-standard-programmer-2026-10-05'


@dataclass(frozen=True)
class StageOptions:
    evidence: Path
    supplemental_files: tuple[Path, ...] = ()
    include_product_assembly: bool = False


def supplemental_files(options, circuit_sha256):
    selected = set()
    for requested in options.supplemental_files:
        path = (ROOT / requested).resolve()
        relative = path.relative_to(ROOT)
        if relative.parts[0] not in {'evidence', 'firmware', 'mechanical', 'tscircuit-issues'}:
            raise ValueError(f'Supplemental input must be board evidence: {relative}')
        if any(part.startswith('.') for part in relative.parts) or not path.is_file():
            raise ValueError(f'Supplemental input must be a visible regular file: {relative}')
        if path.suffix == '.json':
            report = json.loads(path.read_text())
            if isinstance(report, dict):
                for key in ('circuit_sha256', 'circuitSha256'):
                    if key in report and report[key] != circuit_sha256:
                        raise ValueError(f'Supplemental report belongs to another circuit: {relative}')
        selected.add(path)
    return selected


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


def verify_native_product(options):
    reviews = []
    for requested in options.supplemental_files:
        path = (ROOT/requested).resolve()
        path.relative_to(ROOT)
        if path.suffix == '.json':
            report = json.loads(path.read_text())
            if isinstance(report, dict) and 'native_views_checked' in report:
                reviews.append(report)
    if len(reviews) != 1:
        raise ValueError('Product staging requires one independent native GLB review')
    report = reviews[0]
    if not report.get('passes') or set(report['native_views_checked']) != {'product.assembly','product.exploded','enclosure'}:
        raise ValueError('Native product views did not pass independent review')
    for view, sha256 in report['native_glb_sha256'].items():
        if hashlib.sha256((ROOT/'dist'/view/'3d.glb').read_bytes()).hexdigest() != sha256:
            raise ValueError(f'Native product GLB changed after review: {view}')
    mechanical_checks = [row for row in report['actual_glb_geometry_review'] if 'part' in row]
    if len(mechanical_checks) != 30 or any(not row.get('outward_face_winding_preserved') for row in mechanical_checks):
        raise ValueError('All ten mechanical face directions must pass in all three views')


def stage(destination, options):
    evidence = options.evidence.resolve()
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
    if options.include_product_assembly:
        verify_native_product(options)
        mechanical_review = json.loads((ROOT/'product/mechanical-model-review.json').read_text())
        if mechanical_review['source_plans_sha256'] != hashlib.sha256((ROOT/'product/print-plans.json').read_bytes()).hexdigest():
            raise ValueError('Imported mechanical models belong to stale plans')
        for model in mechanical_review['models']:
            if hashlib.sha256((ROOT/model['file']).read_bytes()).hexdigest() != model['sha256']:
                raise ValueError('Imported mechanical model differs from reviewed bytes')
        model_review = json.loads((ROOT/'product/pcb-model-review.json').read_text())
        if model_review['sourceCircuitSha256'] != circuit_sha256 or model_review['emptyModels']:
            raise ValueError('Product PCB models are stale or incomplete')
        for asset in model_review['nativeAssets']:
            model = ROOT/'product/models'/asset['filename']
            if hashlib.sha256(model.read_bytes()).hexdigest() != asset['sha256']:
                raise ValueError('Product model differs from reviewed bytes')
        mesh_review = json.loads((ROOT/'product/print-mesh-review.json').read_text())
        for part in mesh_review['printed_parts']:
            path = ROOT/part['file']
            if not part['watertight'] or not part['winding_consistent'] or hashlib.sha256(path.read_bytes()).hexdigest() != part['sha256']:
                raise ValueError('Product print mesh did not pass readback')
        selected.update(source_closure(ROOT/'enclosure.circuit.tsx'))
        selected.update(source_closure(ROOT/'product.assembly.tsx'))
        selected.update(source_closure(ROOT/'product.exploded.tsx'))
        selected.update(source_closure(ROOT/'product.geometry.tsx'))
        selected.add(ROOT/'product/mechanical-model-review.json')
        selected.update(ROOT/'product'/name for name in ['README.md','closed.png','exploded.png','phone-facing.png',
                        'print-requirements.txt','print-plans.json','print-mesh-review.json'])
        selected.update((ROOT/'product').glob('studio-*.png'))
        selected.update((ROOT/'product').glob('studio-*-review.json'))
        selected.update(ROOT/part['file'] for part in mesh_review['printed_parts'])
        selected.update(ROOT/'dist'/name/'circuit.json' for name in ['product.assembly','product.exploded'])
        selected.add(ROOT/'dist/enclosure/circuit.json')
        selected.add(ROOT/'dist/enclosure/3d.png')
        selected.add(ROOT/'cloud/run-heavy.py')
    selected.update(supplemental_files(options, circuit_sha256))
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
    parser.add_argument('--supplemental-file', type=Path, action='append', default=[],
                        help='Current review or programmer artifact to publish with the unchanged PCB')
    parser.add_argument("--include-product-assembly", action="store_true")
    args = parser.parse_args()
    stage(args.destination, StageOptions(args.evidence, tuple(args.supplemental_file), args.include_product_assembly))
