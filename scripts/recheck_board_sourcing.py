"""Read public JLCPCB listings without authentication, ordering or substitution."""
import concurrent.futures
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'evidence/R7-order-review/sourcing'


def walk_records(node):
    if isinstance(node, dict):
        yield node
        for child in node.values():
            yield from walk_records(child)
    elif isinstance(node, list):
        for child in node:
            yield from walk_records(child)


def listing_records(page):
    frames = []
    for match in re.finditer(r'self\.__next_f\.push\((.*?)\)</script>', page, re.S):
        frame = json.loads(match.group(1))
        if len(frame) > 1 and isinstance(frame[1], str):
            frames.append(frame[1])
    for line in ''.join(frames).splitlines():
        _, separator, body = line.partition(':')
        if separator and body[:1] in ('{', '['):
            try:
                record = json.loads(body)
            except json.JSONDecodeError:
                # RSC text/stream records are not JSON component records.
                continue
            yield from walk_records(record)


def inspect_part(part):
    number = part['lcsc']
    url = part['source_link']
    with urllib.request.urlopen(url, timeout=45) as response:
        raw = response.read()
    (OUTPUT / f'{number}.html').write_bytes(raw)
    records = [record for record in listing_records(raw.decode())
               if record.get('componentCode') == number]
    identities = [r for r in records if r.get('componentModelEn')]
    if not identities or any(r['componentModelEn'] != part['manufacturer_part_number']
                             for r in identities):
        raise ValueError(f'{number}: exact manufacturer part number mismatch')
    assembly = next(r for r in records if 'assemblyMode' in r)
    buying = next(r for r in records if 'canPresaleNumber' in r)
    required = part['quantity'] * 5
    result = {
        'lcsc': number, 'mpn': part['manufacturer_part_number'],
        'references': part['reference_designators'], 'url': url,
        'listing_sha256': hashlib.sha256(raw).hexdigest(),
        'checked_at_utc': datetime.now(timezone.utc).isoformat(),
        'quantity_for_five_finished_boards': required,
        'stock_fields': {key: buying[key] for key in
                         ['canPresaleNumber', 'overseasStockCount', 'preMinPurchaseNum']},
        'assembly_fields': {key: assembly.get(key) for key in
                            ['assemblyMode', 'componentLibraryType', 'xrayFlag',
                             'moistureSensitivityLevelEn', 'fixtureFlag',
                             'needAuditFlag', 'manufacturerBlackFlag',
                             'orderInstructionEnglish']},
        'status': 'PASS' if buying['canPresaleNumber'] >= required and
                  assembly['assemblyMode'] == 'smtWeld' and
                  not assembly.get('manufacturerBlackFlag') else 'BLOCKED',
        'scope': 'Public inventory/listing only; attrition, stock reservation and '
                 'supplier-processed PCBA mapping still require order-preview review.'
    }
    (OUTPUT / f'{number}.json').write_text(json.dumps(result, indent=2) + '\n')
    return result


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    parts = json.loads((ROOT / 'bom.json').read_text())['parts']
    rows = []
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        future_parts = {executor.submit(inspect_part, part): part for part in parts}
        for future in concurrent.futures.as_completed(future_parts):
            part = future_parts[future]
            try:
                result = future.result()
                rows.append(result)
                print(part['lcsc'], result['status'], result['stock_fields'], flush=True)
            except Exception as error:
                failure = {'lcsc': part['lcsc'], 'error': str(error)}
                failures.append(failure)
                print('BLOCKED', failure, flush=True)
    report = {'parts': sorted(rows, key=lambda row: row['lcsc']),
              'failures': failures, 'expected_exact_identities': len(parts),
              'all_pass': len(rows) == len(parts) and not failures and
                          all(row['status'] == 'PASS' for row in rows)}
    (OUTPUT.parent / 'sourcing-recheck.json').write_text(json.dumps(report, indent=2) + '\n')
    raise SystemExit(not report['all_pass'])


if __name__ == '__main__':
    main()
