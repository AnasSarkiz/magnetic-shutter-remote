import json,re
from pathlib import Path
old=json.loads(Path('bom.json').read_text())
Path('evidence/R2/R1-bom.json').write_text(json.dumps(old,indent=2)) if not Path('evidence/R2/R1-bom.json').exists() else None
source=Path('src/remote-circuit.tsx').read_text()
oldparts={p['lcsc']:p for p in old['parts']}
observed={
'C19725033':('Texas Instruments','WSON-10, 2.2 x 2 mm, exposed pad','Extended',3834,3739,'Economic/Standard; MSL 3','BQ25185DLHR'),
'C5219772':('Texas Instruments','SOT-563 / DRL-6','Extended',37610,37585,'Economic/Standard; manufacturer MSL 2','TMP390A2DRLR'),
'C485802':('Texas Instruments','SOT-23-3 / DBZ','Extended',3405,3375,'Economic/Standard; MSL 1','TPS3839G33DBZR'),
'C5184243':('Global Connector Technology','USB-C SMD with plated shell slots','Extended',3971,2835,'Economic/Standard; high assembly difficulty; MSL 1','USB4105-GF-A-120'),
'C431540':('SHOU HAN','SMD 8 x 2.8 mm, 3 contacts + shell','Extended',193532,188023,'Economic/Standard','MSK12C02'),
'C22844':('UNI-ROYAL','0603','Extended',27688,27604,'Economic/Standard','0603WAF1621T5E'),
'C22893':('UNI-ROYAL','0603','Extended',133033,131350,'Economic/Standard','0603WAF1872T5E'),
'C22809':('UNI-ROYAL','0603','Basic',4587959,4275297,'Economic/Standard','0603WAF1502T5E'),
'C22795':('UNI-ROYAL','0603','Extended',588652,546495,'Economic/Standard','0603WAF1303T5E'),
'C25804':('UNI-ROYAL','0603','Basic',23109251,16156915,'Economic/Standard','0603WAF1002T5E'),
'C15850':('Samsung Electro-Mechanics','0805','Basic',4997153,3794120,'Economic/Standard; MSL 1','CL21A106KAYNNNE'),
'C282505':('CCTC','0603','Extended',8123,8111,'Economic/Standard; MSL 1','TCC0603COG470J500CT'),
}
parts={}
for symbol,filename in re.findall(r'import \{ (\w+) \} from "../imports/(\w+)";',source):
 imported=Path('imports',filename+'.tsx').read_text()
 refs=re.findall(r'<'+symbol+r'\s+name="([^"]+)"',source)
 if not refs:continue
 number=re.search(r'"jlcpcb":\s*\[\s*"(C\d+)"',imported).group(1)
 mpn=re.search(r'manufacturerPartNumber="([^"]+)"',imported).group(1)
 if number in observed:
  m,pkg,category,stock,available,requirements,expected=observed[number]
  assert expected==mpn,(number,mpn,expected)
  part={'manufacturer':m,'package':pkg,'assembly_category':category,'observed_stock':stock,'observed_available':available,'assembly_requirements':requirements,'source_link':f'https://jlcpcb.com/partdetail/{mpn}/{number}','availability_check_date':'2026-10-01'}
 else:part=oldparts[number].copy()
 part.update(reference_designators=refs,quantity=len(refs),lcsc=number,manufacturer_part_number=mpn,qualification='R2 design qualification in progress; see VALIDATION.md',value=mpn)
 parts[number]=part
Path('bom.json').write_text(json.dumps({'revision':'R2-in-progress','status':'Qualified identities and observed availability; not yet fabrication approved','parts':list(parts.values())},indent=2)+'\n')
