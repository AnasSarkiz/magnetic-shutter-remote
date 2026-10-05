"""Render the qualified R3 sourcing record without rewriting supplier identities."""
import csv,json
from pathlib import Path
bom=json.loads(Path('bom.json').read_text())
bom['revision']='R3-review-2026-10-02'
bom['status']='37 fitted references / 24 verified supplier identities; all TOP. Copper/export software checks passed; expanded USB land, stencil/shell and assembly acceptance remain unapproved.'
Path('bom.json').write_text(json.dumps(bom,indent=2)+'\n')
fields=['reference_designators','quantity','value','manufacturer','manufacturer_part_number','package','lcsc','assembly_category','observed_stock','observed_available','availability_check_date','assembly_requirements','source_link','lcsc_link','datasheet_file','qualification']
with Path('BOM.csv').open('w',newline='') as output:
 writer=csv.DictWriter(output,fieldnames=fields,extrasaction='ignore');writer.writeheader()
 for part in bom['parts']:writer.writerow({**part,'reference_designators':', '.join(part['reference_designators'])})
lines=['# R3 verified electronic identities and qualification record','',bom['status'],'','Stock observations: 2026-10-01, except HCTL C2894893 rechecked 2026-10-02. These are observations, not reservations. U1 requires Standard assembly and X-ray. All electronic parts have exact MPNs and C-numbers. Battery and external parts are separate.','', '[Complete sourcing CSV](BOM.csv) · [Structured evidence](bom.json) · [Assembly review questions](fabrication/ASSEMBLY-REVIEW.md)','', '| References | Qty | Value / function | Exact manufacturer part | Package | C-number | Category | Observed available |','|---|---:|---|---|---|---|---|---:|']
for part in bom['parts']:
 lines.append('| '+' | '.join([', '.join(part['reference_designators']),str(part['quantity']),part['value'],part['manufacturer_part_number'],part['package'],f"[{part['lcsc']}]({part['source_link']})",part['assembly_category'],str(part['observed_available'])])+' |')
Path('BOM.md').write_text('\n'.join(lines)+'\n')
print(len(bom['parts']),sum(part['quantity'] for part in bom['parts']))
