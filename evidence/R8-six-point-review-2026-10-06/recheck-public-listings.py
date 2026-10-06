"""Read exact public JLCPCB listings; no order, reservation or authentication."""
import concurrent.futures
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import urllib.request

ROOT=Path(__file__).resolve().parents[2]
OUTPUT=Path(__file__).resolve().parent/'sourcing'
SPEC=importlib.util.spec_from_file_location('jlc_public_listing',ROOT/'scripts/recheck_board_sourcing.py')
LISTING=importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(LISTING)


def inspect(part):
    number=part['lcsc']
    url='https://jlcpcb.com/partdetail/'+number
    with urllib.request.urlopen(url,timeout=40) as response:
        raw=response.read()
        final_url=response.url
    (OUTPUT/(number+'.html')).write_bytes(raw)
    records=[r for r in LISTING.listing_records(raw.decode()) if r.get('componentCode')==number]
    identities=[r for r in records if r.get('componentModelEn')]
    if not identities or any(r['componentModelEn']!=part['manufacturer_part_number'] for r in identities):
        raise ValueError(number+': exact manufacturer identity mismatch')
    assembly=next(r for r in records if 'assemblyMode' in r)
    inventory=next(r for r in records if 'canPresaleNumber' in r)
    required=5*part['quantity']
    row={'lcsc':number,'mpn':part['manufacturer_part_number'],'references':part['reference_designators'],
         'quantity_per_board':part['quantity'],'quantity_for_five_finished_boards_without_attrition':required,
         'checked_at_utc':datetime.now(timezone.utc).isoformat(),'url':url,'response_url':final_url,
         'html_sha256':hashlib.sha256(raw).hexdigest(),
         'assembly_fields':{k:assembly.get(k) for k in ['assemblyMode','componentLibraryType','componentProductType','moistureSensitivityLevelEn','xrayFlag','fixtureFlag','needAuditFlag','manufacturerBlackFlag','assemblyComponentFlag','orderInstructionEnglish']},
         'inventory_fields':{k:inventory.get(k) for k in ['canPresaleNumber','overseasStockCount','preMinPurchaseNum','encapsulationNumber','lossNumber','leastPatchNumber','noBuyReason']}}
    quantity=inventory['canPresaleNumber']
    if not isinstance(quantity,(int,float)):
        raise ValueError(number+': no numeric direct inventory')
    row['direct_inventory_covers_five_boards_without_attrition']=quantity>=required
    row['listing_has_smt_assembly_mode']=assembly['assemblyMode']=='smtWeld' and not assembly.get('manufacturerBlackFlag')
    row['status']='PASS_PUBLIC_LISTING' if row['direct_inventory_covers_five_boards_without_attrition'] and row['listing_has_smt_assembly_mode'] else 'NEEDS_SUPPLY_CONFIRMATION'
    row['limitations']=['Public listing fields only; no stock reservation, attrition allowance, quote or supplier-processed assembly preview.', 'Overseas inventory is recorded separately and not treated as locally orderable PCBA inventory.']
    (OUTPUT/(number+'.json')).write_text(json.dumps(row,indent=2)+'\n')
    print(number,row['mpn'],row['status'],row['inventory_fields'],flush=True)
    return row


def main():
    OUTPUT.mkdir(parents=True,exist_ok=True)
    parts=json.loads((ROOT/'bom.json').read_text())['parts']
    circuit=json.loads((ROOT/'dist/index/circuit.json').read_text())
    components={e['name']:e for e in circuit if e['type']=='source_component'}
    references=[ref for p in parts for ref in p['reference_designators']]
    if len(references)!=len(set(references)) or set(references)!=set(components):
        raise ValueError('BOM does not cover all fitted references exactly once')
    for p in parts:
        if p['quantity']!=len(p['reference_designators']):
            raise ValueError('BOM reference quantity mismatch')
        for ref in p['reference_designators']:
            c=components[ref]
            if c['manufacturer_part_number']!=p['manufacturer_part_number'] or p['lcsc'] not in c['supplier_part_numbers']['jlcpcb']:
                raise ValueError('Fitted exact manufacturer/C-number mismatch')
    rows=[];failures=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        jobs={executor.submit(inspect,p):p for p in parts}
        for job in concurrent.futures.as_completed(jobs):
            part=jobs[job]
            try:rows.append(job.result())
            except Exception as error:
                failure={'lcsc':part['lcsc'],'error':str(error)}
                failures.append(failure);print('FAILED_CHECK',failure,flush=True)
    report={'observed_utc':datetime.now(timezone.utc).isoformat(),'circuit_sha256':hashlib.sha256((ROOT/'dist/index/circuit.json').read_bytes()).hexdigest(),
            'bom_sha256':hashlib.sha256((ROOT/'bom.json').read_bytes()).hexdigest(),'fitted_references':len(components),
            'exact_parts_expected':len(parts),'parts':sorted(rows,key=lambda r:r['lcsc']),'failures':failures,
            'public_listing_checks_completed':len(rows)==len(parts) and not failures,
            'all_direct_inventory_covers_five_boards_without_attrition':len(rows)==len(parts) and not failures and all(r['direct_inventory_covers_five_boards_without_attrition'] for r in rows)}
    (OUTPUT.parent/'sourcing-review.json').write_text(json.dumps(report,indent=2)+'\n')
    raise SystemExit(0 if report['public_listing_checks_completed'] else 1)


if __name__=='__main__':main()
