"""Qualify unchanged supplier switch geometry and manufacturer contact contract."""
import json
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'evidence/R8-side-shutter-2026-10-05/qualification'


def audit_switch(import_path=ROOT/'imports/TS24CA/TS24CA.tsx', supplier_path=EVIDENCE/'C393942-supplier.json'):
    component = json.loads(supplier_path.read_text())['easyeda_component_details']['easyeda_json']
    package = component['packageDetail']['dataStr']
    # Converter recentering uses the complete contact envelope. Independent
    # calculation from original geometry preserves every measured dimension.
    envelope_x, envelope_y = [], []
    for shape in package['shape']:
        fields = shape.split('~')
        if fields[0] != 'PAD':
            continue
        if fields[1] == 'POLYGON':
            vertices = [float(n) for n in fields[10].split()]
            envelope_x.extend(vertices[::2])
            envelope_y.extend(vertices[1::2])
        elif fields[1] == 'RECT':
            envelope_x.extend([float(fields[2])-float(fields[4])/2,float(fields[2])+float(fields[4])/2])
            envelope_y.extend([float(fields[3])-float(fields[5])/2,float(fields[3])+float(fields[5])/2])
    origin = {'x':(min(envelope_x)+max(envelope_x))/2,'y':(min(envelope_y)+max(envelope_y))/2}
    imported = import_path.read_text()
    if 'manufacturerPartNumber="TS24CA"' not in imported or '"C393942"' not in imported:
        raise ValueError('Exact manufacturer/supplier identity required')
    maximum_difference_mm = 0.0
    pads = {}
    for shape in package['shape']:
        fields = shape.split('~')
        if fields[0] != 'PAD':
            continue
        pin = fields[8]
        match = re.search(r'<smtpad portHints=\{\["pin'+pin+r'"\]\} (.*?) />', imported)
        if not match:
            raise ValueError(f'Missing supplier terminal {pin}')
        if fields[1] == 'RECT':
            expected = [(float(fields[2])-origin['x'])*0.254,
                        (origin['y']-float(fields[3]))*0.254,
                        float(fields[4])*0.254, float(fields[5])*0.254]
            observed = [float(re.search(key+r'="([-\d.]+)mm"',match[1])[1])
                        for key in ['pcbX','pcbY','width','height']]
            pads[pin] = dict(zip(['x_mm','y_mm','width_mm','height_mm'], observed))
        elif fields[1] == 'POLYGON':
            supplier_points = [float(n) for n in fields[10].split()]
            expected = [(n-origin['x'])*0.254 if i%2 == 0 else (origin['y']-n)*0.254
                        for i,n in enumerate(supplier_points)]
            observed = [float(n) for n in re.findall(r'[xy]: "([-\d.]+)mm"',match[1])]
            pads[pin] = {'polygon_vertex_count':len(observed)//2}
        else:
            raise ValueError('Unsupported supplier pad')
        if len(expected) != len(observed):
            raise ValueError('Supplier/import feature count differs')
        maximum_difference_mm = max(maximum_difference_mm,max(abs(a-b) for a,b in zip(expected,observed)))
    if set(pads) != {'1','2','3','4'} or maximum_difference_mm > 1e-7:
        raise ValueError('Supplier/import conversion differs')
    # Page1 welding drawing: switch contacts0.6x1.2mm on3.4mm centers.
    for pin in ['1','2']:
        if abs(pads[pin]['width_mm']-0.6)>0.00001 or abs(pads[pin]['height_mm']-1.2)>0.00001:
            raise ValueError('Contact lands differ from manufacturer drawing')
    if abs(pads['2']['x_mm']-pads['1']['x_mm']-3.4)>0.001:
        raise ValueError('Contact pitch differs from manufacturer drawing')
    for suffix, signature in [('.step',b'ISO-10303-21;'),('.obj',b'v ')]:
        content = import_path.with_suffix(suffix).read_bytes()
        if (not content.startswith(signature) if suffix=='.step' else not re.search(rb'^v [-\d]',content,re.M)):
            raise ValueError('Invalid supplier model format')
    return {'part':'C393942','manufacturer':'SHOUHAN','mpn':'TS24CA',
            'supplier_asset_sha256':{suffix:hashlib.sha256(import_path.with_suffix(suffix).read_bytes()).hexdigest()
                                     for suffix in ['.tsx','.step','.obj']},
            'supplier_import_conversion_max_difference_mm':maximum_difference_mm,
            'pads':pads,'contact_land_recommendation_mm':{'width':0.6,'height':1.2,'pitch':3.4},
            'contact_contract':{'pin1':'SHUTTER','pin2':'GND','pin3':'GND metal support','pin4':'GND metal support'},
            'normally_open':True,'internal_support_connection':['pin3','pin4'],
            'rating':'50mA at12VDC','contact_resistance_max_ohm':0.1,
            'insulation_contacts_to_frame_min_ohm':100000000,
            'mechanical_life_cycles':20000,
            'actuation':'supplier+Y rotated-90deg gives board+X; press inward toward-X',
            'qualification':'Engineering prototype: exact contact lands, faithful supplier anchors and valid models; physical actuation/reflow/fit untested'}


def audit_alps(import_path=ROOT/'imports/SKRTLAE010/SKRTLAE010.tsx'):
    component = json.loads((EVIDENCE/'alps/C110293-supplier.json').read_text())['easyeda_component_details']['easyeda_json']
    package = component['packageDetail']['dataStr']
    imported = import_path.read_text()
    if 'manufacturerPartNumber="SKRTLAE010"' not in imported or '"C110293"' not in imported:
        raise ValueError('Exact ALPS manufacturer/supplier identity required')
    rectangles = []
    for shape in package['shape']:
        fields = shape.split('~')
        if fields[0] != 'PAD':continue
        if fields[1] != 'RECT':raise ValueError('Selected ALPS import requires rectangular lands')
        width,height = float(fields[4])*0.254,float(fields[5])*0.254
        angle=float(fields[11])%360
        if angle in [90,270]:width,height=height,width
        elif angle not in [0,180]:raise ValueError('Unsupported supplier rectangle rotation')
        rectangles.append({'pin':fields[8],'x':float(fields[2])*0.254,'y':-float(fields[3])*0.254,'width':width,'height':height})
    origin_x=(min(p['x']-p['width']/2 for p in rectangles)+max(p['x']+p['width']/2 for p in rectangles))/2
    origin_y=(min(p['y']-p['height']/2 for p in rectangles)+max(p['y']+p['height']/2 for p in rectangles))/2
    maximum_difference=0.0
    pads={}
    for pad in rectangles:
        match=re.search(r'<smtpad portHints=\{\["pin'+pad['pin']+r'"\]\} (.*?) />',imported)
        if not match:raise ValueError('Missing ALPS supplier terminal')
        observed=[float(re.search(key+r'="([-\d.]+)mm"',match[1])[1]) for key in ['pcbX','pcbY','width','height']]
        expected=[pad['x']-origin_x,pad['y']-origin_y,pad['width'],pad['height']]
        maximum_difference=max(maximum_difference,max(abs(a-b) for a,b in zip(observed,expected)))
        pads[pad['pin']]=dict(zip(['x_mm','y_mm','width_mm','height_mm'],observed))
    if set(pads)!={'1','2','3','4','5'} or maximum_difference>1e-7:raise ValueError('ALPS supplier/import conversion differs')
    for pin,dimensions in {'1':(.75,1.8),'2':(.6,1.8),'3':(.75,1.8),'4':(1.3,.9),'5':(1.3,.9)}.items():
        if max(abs(pads[pin][key]-dimension) for key,dimension in zip(['width_mm','height_mm'],dimensions))>.0001:
            raise ValueError('ALPS lands differ from manufacturer recommendation')
    if abs(pads['3']['x_mm']-pads['1']['x_mm']-2.45)>.0001 or abs(pads['5']['x_mm']-pads['4']['x_mm']-3.7)>.0001:
        raise ValueError('ALPS terminal pitch differs from manufacturer recommendation')
    if abs(pads['2']['x_mm'])>.015:raise ValueError('ALPS center contact position differs')
    for suffix in ['.step','.obj']:
        content=import_path.with_suffix(suffix).read_bytes()
        if (not content.startswith(b'ISO-10303-21;') if suffix=='.step' else not re.search(rb'^v [-\d]',content,re.M)):
            raise ValueError('Invalid ALPS model format')
    return {'part':'C110293','mpn':'SKRTLAE010','manufacturer':'ALPSALPINE','pads':pads,
            'supplier_import_conversion_max_difference_mm':maximum_difference,
            'internal_connections':[['pin1','pin3'],['pin4','pin5']],
            'normally_open_between':['pin1/3','pin2'],'pin_contract':{'1':'SHUTTER','2':'GND','3':'SHUTTER','4':'GND frame','5':'GND frame'},
            'copper_prohibited_local_mm':{'x_min':-1,'x_max':1,'y_min':-1.65,'y_max':-.45},
            'actuation':'original-Y rotated90deg gives board+X; press inward toward-X',
            'manufacturer_actuation_force_n':1.6,'travel_mm':.2,'rated_life_cycles':100000,
            'rating_max':'50mA/12VDC','rating_min':'10uA/1VDC','max_contact_resistance_ohm':.5,
            'supplier_asset_sha256':{suffix:hashlib.sha256(import_path.with_suffix(suffix).read_bytes()).hexdigest() for suffix in ['.tsx','.step','.obj']},
            'qualification':'Nominal manufacturer lands/pitches and exact supplier conversion pass; physical actuation/reflow/fit pending'}


if __name__ == '__main__':
    report = audit_switch()
    (EVIDENCE/'geometry-audit.json').write_text(json.dumps(report,indent=2)+'\n')
    print('Side switch qualification PASS:',report['part'],report['supplier_import_conversion_max_difference_mm'])
    alps=audit_alps()
    (EVIDENCE/'alps/geometry-audit.json').write_text(json.dumps(alps,indent=2)+'\n')
    print('ALPS switch qualification PASS:',alps['part'],alps['supplier_import_conversion_max_difference_mm'])
