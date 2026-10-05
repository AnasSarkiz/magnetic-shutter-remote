"""Derive fitted R8 references from generated source identities and dated sourcing.

Does not infer sourcing success for missing or mismatched supplier identities.
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'evidence/R8-prototype-2026-10-05'

def write_bom():
    circuit = json.loads((ROOT / 'dist/index/circuit.json').read_text())
    sourcing = json.loads((EVIDENCE / 'sourcing-check.json').read_text())
    verified = {p['lcsc']: p for p in sourcing['parts']}
    old = {p['lcsc']: p for p in json.loads((ROOT / 'baselines/r7/bom.json').read_text())['parts']}
    groups = {}
    for component in circuit:
        if component['type'] != 'source_component':
            continue
        number, = component['supplier_part_numbers']['jlcpcb']
        group = groups.setdefault(number, [])
        group.append(component)
    parts = []
    for number, components in groups.items():
        supplier = verified[number]
        if supplier.get('error') or supplier['stock'] < len(components) * 5:
            raise ValueError(f'{number}: exact identity and stock verification required')
        mpns = {c['manufacturer_part_number'] for c in components}
        if mpns != {supplier['mfr']}:
            raise ValueError(f'{number}: supplier identity mismatch')
        sample = components[0]
        part = dict(old.get(number, {}))
        part.update(manufacturer=supplier.get('manufacturer',part.get('manufacturer')), reference_designators=[c['name'] for c in components],
                    quantity=len(components),
                    value=sample.get('display_capacitance') or sample.get('display_resistance') or sample.get('display_inductance') or supplier['mfr'],
                    manufacturer_part_number=supplier['mfr'], package=supplier['package'], lcsc=number,
                    assembly_category='Basic' if supplier.get('is_basic') else 'Extended',
                    observed_stock=supplier['stock'], observed_available=supplier['stock'],
                    availability_check_date=sourcing['checked_date'],
                    source_link=supplier['source_url'],
                    lcsc_link=f'https://www.lcsc.com/product-detail/{number}.html',
                    qualification='Engineering prototype; see R8-prototype qualification and current validation; physical tests pending')
        parts.append(part)
    bom = {'revision':'R8-ESP32-C3-2026-10-05',
           'status':f'{sum(p["quantity"] for p in parts)} fitted references / {len(parts)} exact supplier identities; engineering prototype; hardware unvalidated',
           'parts':parts}
    (ROOT / 'bom.json').write_text(json.dumps(bom, indent=2)+'\n')
    fields=['reference_designators','quantity','value','manufacturer_part_number','package','lcsc','assembly_category','observed_stock','availability_check_date','source_link','qualification']
    with (ROOT / 'BOM.csv').open('w',newline='') as output:
        writer=csv.DictWriter(output,fieldnames=fields,extrasaction='ignore',lineterminator='\n')
        writer.writeheader()
        for part in parts:
            writer.writerow({**part,'reference_designators':','.join(part['reference_designators'])})
    (ROOT / 'BOM.md').write_text('# R8 ESP32-C3 fitted BOM\n\n'+bom['status']+'\n\nDerived from generated Circuit JSON and dated exact-C-number sourcing; stock is not reserved. Supplier search prices are quantity-dependent and are not an assembly quote. External ASR00012 protected battery is outside the PCBA BOM.\n\n| References | MPN | JLCPCB | Quantity | Observed stock |\n|---|---|---|---:|---:|\n'+''.join(f'| {", ".join(p["reference_designators"])} | {p["manufacturer_part_number"]} | {p["lcsc"]} | {p["quantity"]} | {p["observed_stock"]} |\n' for p in parts))
    print(bom['status'])

if __name__ == '__main__':
    write_bom()
