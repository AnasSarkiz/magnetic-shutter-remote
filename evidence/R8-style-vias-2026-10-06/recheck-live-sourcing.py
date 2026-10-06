from pathlib import Path
import json,urllib.request,concurrent.futures,datetime,hashlib
from scripts.recheck_board_sourcing import listing_records
root=Path.cwd();e=root/'evidence/R8-style-vias-2026-10-06';out=e/'sourcing-official';out.mkdir(exist_ok=True);parts=json.loads((root/'bom.json').read_text())['parts']
def check(part):
 n=part['lcsc'];url='https://jlcpcb.com/partdetail/'+n;r=urllib.request.urlopen(url,timeout=45);raw=r.read();(out/(n+'.html')).write_bytes(raw);records=[v for v in listing_records(raw.decode()) if v.get('componentCode')==n];identities=[v for v in records if v.get('componentModelEn')];assert identities and all(v['componentModelEn']==part['manufacturer_part_number'] for v in identities),n
 assembly=next(v for v in records if 'assemblyMode' in v);buying=next(v for v in records if 'canPresaleNumber' in v)
 result={'lcsc':n,'mpn':part['manufacturer_part_number'],'references':part['reference_designators'],'quantity_per_board':part['quantity'],'listing_url':url,'response_url':r.url,'observed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'html_sha256':hashlib.sha256(raw).hexdigest(),'assembly_fields':{k:assembly.get(k) for k in ['assemblyMode','componentLibraryType','manufacturerBlackFlag','needAuditFlag','fixtureFlag','orderInstructionEnglish']},'inventory_fields':{k:buying.get(k) for k in ['canPresaleNumber','overseasStockCount','preMinPurchaseNum','encapsulationNumber','lossNumber','leastPatchNumber','noBuyReason']},'exact_identity_verified':True,'eligible_smt_listing':assembly.get('assemblyMode')=='smtWeld' and not assembly.get('manufacturerBlackFlag'),'stock_allocation_confirmed':False,'limitations':'Live public exact-part listing only; raw inventory fields do not reserve stock or confirm assembler allocation.'}
 (out/(n+'.json')).write_text(json.dumps(result,indent=2)+'\n');return result
def main():
 rows=[];failures=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  futures={pool.submit(check,p):p for p in parts}
  for future in concurrent.futures.as_completed(futures):
   p=futures[future]
   try:r=future.result();rows.append(r);print(r['lcsc'],r['mpn'],r['inventory_fields'],flush=True)
   except Exception as exc:failure={'lcsc':p['lcsc'],'error':str(exc)};failures.append(failure);print(failure,flush=True)
 record={'circuit_sha256':hashlib.sha256((root/'dist/index/circuit.json').read_bytes()).hexdigest(),'bom_sha256':hashlib.sha256((root/'bom.json').read_bytes()).hexdigest(),'expected_exact_identities':len(parts),'fitted_references':44,'parts':sorted(rows,key=lambda r:r['lcsc']),'failures':failures,'all_exact_eligible_listings_verified':len(rows)==len(parts) and not failures and all(r['eligible_smt_listing'] for r in rows),'procurement_allocation_confirmed':False}
 (e/'sourcing-official-review.json').write_text(json.dumps(record,indent=2)+'\n')
 raise SystemExit(bool(failures) or not record['all_exact_eligible_listings_verified'])

if __name__=='__main__':main()
