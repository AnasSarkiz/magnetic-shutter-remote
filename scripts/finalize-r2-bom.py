"""Write the qualified engineering BOM; supplier definitions are read-only."""
import csv,json
from pathlib import Path
p=Path('bom.json'); bom=json.loads(p.read_text())
values={'C23186':'5.1 kΩ ±1%, 0.1 W, 75 V','C22809':'15 kΩ ±1%, 0.1 W, 75 V','C21190':'1 kΩ ±1%, 0.1 W, 75 V','C25803':'100 kΩ ±1%, 0.1 W, 75 V','C22795':'130 kΩ ±1%, 0.1 W, 75 V','C25804':'10 kΩ ±1%, 0.1 W, 75 V','C22844':'1.62 kΩ ±1%, 0.1 W, 75 V','C22893':'18.7 kΩ ±1%, 0.1 W, 75 V','C19666':'4.7 µF ±10%, 16 V, X5R','C14663':'100 nF ±10%, 50 V, X7R','C15850':'10 µF ±10%, 25 V, X5R','C282505':'47 pF ±5%, 50 V, C0G','C2286':'Red LED','C431540':'SPDT slide switch','C720477':'Normally-open tactile switch, 2 mm height','C8545':'N-channel MOSFET, 60 V'}
refs={'C356849':'E73-2G4M08S1C-manufacturer.pdf','C19725033':'BQ25185.pdf','C5219772':'TMP390.pdf','C485802':'TPS3839.pdf','C3747031':'TPS7A02.pdf','C5184243':'GCT-USB4105-120.pdf','C295747':'JST-PH.pdf','C160392':'JST-SH.pdf','C431540':'SHOUHAN-MSK12C02.pdf','C720477':'C720477-manufacturer.pdf','C8545':'C8545-manufacturer.pdf','C2286':'C2286-manufacturer.pdf','C14663':'C14663-manufacturer.pdf','C282505':'C282505-manufacturer.pdf'}
for part in bom['parts']:
 part['value']=values.get(part['lcsc'],part['manufacturer_part_number'])
 part['qualification']='Reviewed with disclosed land/derating assumptions; physical tests pending'
 if part['lcsc']=='C5184243':part['qualification']='BLOCKED: locating-hole-to-pad gap 0.175281 mm < 0.2 mm'
 if part['lcsc'] in refs:part['datasheet_file']='references/'+refs[part['lcsc']]
 elif part['reference_designators'][0].startswith('R'):part['datasheet_file']='references/C22844-manufacturer.pdf'
 else:part['datasheet_file']='Samsung manufacturer product-family bias curves; see ELECTRICAL-QUALIFICATION.md'
 part['lcsc_link']='https://www.lcsc.com/product-detail/'+part['lcsc']+'.html'
bom['revision']='R2-review-2026-10-01'
bom['status']='37 fitted references / 24 supplier identities. Review-only; USB footprint blocks fabrication.'
p.write_text(json.dumps(bom,indent=2)+'\n')
fields=['reference_designators','quantity','value','manufacturer','manufacturer_part_number','package','lcsc','assembly_category','observed_stock','observed_available','availability_check_date','assembly_requirements','source_link','lcsc_link','datasheet_file','qualification']
with open('BOM.csv','w',newline='') as f:
 writer=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');writer.writeheader()
 for part in bom['parts']:writer.writerow({**part,'reference_designators':', '.join(part['reference_designators'])})
lines=['# R2 engineering BOM','',bom['status'],'','Every electronic reference has an exact manufacturer part number and C-number. Observations are dated 2026-10-01, not stock reservations. Standard assembly and X-ray are required by U1. Review-only assembler files are under fabrication/.','', '[Complete CSV with values, ratings, stock, assembly requirements and source links](BOM.csv) · [Structured record](bom.json) · [Qualification](evidence/R2/ELECTRICAL-QUALIFICATION.md)','', '| References | Qty | Value / function | Exact manufacturer part | Package | C-number | Category | Available |','|---|---:|---|---|---|---|---|---:|']
for part in bom['parts']:lines.append('| '+ ' | '.join([', '.join(part['reference_designators']),str(part['quantity']),part['value'],part['manufacturer_part_number'],part['package'],f"[{part['lcsc']}]({part['source_link']})",part['assembly_category'],str(part['observed_available'])])+' |')
Path('BOM.md').write_text('\n'.join(lines)+'\n')
print(len(bom['parts']),sum(p['quantity'] for p in bom['parts']))
