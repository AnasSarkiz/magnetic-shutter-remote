"""Check original supplier conversion and JST SH catalogue nominal tolerances."""
import json
import re
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'evidence/R8-standard-programmer-2026-10-05/qualification'


def audit():
    raw = json.loads((EVIDENCE/'C160389-supplier.json').read_text())['easyeda_component_details']['easyeda_json']
    assert raw['lcsc']['number'] == 'C160389'
    text = (ROOT/'imports/BM03B_SRSS_TB_LF__SN_/BM03B_SRSS_TB_LF__SN_.tsx').read_text()
    assert 'manufacturerPartNumber="BM03B-SRSS-TB(LF)(SN)"' in text
    shapes = [s.split('~') for s in raw['packageDetail']['dataStr']['shape'] if s.startswith('PAD~')]
    assert len(shapes) == 5 and all(s[1] == 'RECT' for s in shapes)
    x = [float(s[2])+sign*float(s[4])/2 for s in shapes for sign in [-1,1]]
    y = [float(s[3])+sign*float(s[5])/2 for s in shapes for sign in [-1,1]]
    ox,oy = (max(x)+min(x))/2,(max(y)+min(y))/2
    pads, differences = {}, []
    for s in shapes:
        pin=s[8]
        match=re.search(r'<smtpad portHints=\{\["pin'+pin+r'"\]\} (.*?) />',text)
        assert match, pin
        actual=[float(re.search(key+r'="([-\d.]+)mm"',match[1])[1]) for key in ['pcbX','pcbY','width','height']]
        expected=[(float(s[2])-ox)*.254,(oy-float(s[3]))*.254,float(s[4])*.254,float(s[5])*.254]
        differences.extend(abs(a-b) for a,b in zip(actual,expected))
        pads[pin]=dict(zip(['x_mm','y_mm','width_mm','height_mm'],actual))
    assert set(pads) == {'1','2','3','4','5'} and max(differences) < 1e-7
    for pin,p in pads.items():
        signal=int(pin)<=3
        assert abs(p['width_mm']-(.6 if signal else 1.2)) <= (.05 if signal else .1)
        assert abs(p['height_mm']-(1.55 if signal else 1.8)) <= .1
        assert abs(p['x_mm']-({'1':1,'2':0,'3':-1,'4':2.3,'5':-2.3}[pin])) <= .05
    pitch=abs(pads['1']['x_mm']-pads['2']['x_mm'])
    span=max(p['y_mm']+p['height_mm']/2 for p in pads.values())-min(p['y_mm']-p['height_mm']/2 for p in pads.values())
    assert abs(pitch-1)<=.05 and abs(span-4.2)<=.1
    assert abs(pads['1']['y_mm']-pads['4']['y_mm']- (4.2-.775-.9))<=.05
    for ext in ['obj','step']:
        data=(ROOT/f'imports/BM03B_SRSS_TB_LF__SN_/BM03B_SRSS_TB_LF__SN_.{ext}').read_text()
        assert ('\nv ' in data and '\nf ' in data) if ext=='obj' else ('ISO-10303-21;' in data and 'END-ISO-10303-21;' in data)
    result={'status':'PASS','part':'C160389','mpn':'BM03B-SRSS-TB(LF)(SN)','supplier_uuid':raw['uuid'],
            'maximum_conversion_difference_mm':max(differences),'pitch_mm':pitch,'copper_span_y_mm':span,'pads':pads,
            'manufacturer_source':'references/JST-SH.pdf, page1 top-entry lands and page3 header table',
            'manufacturer_sha256':hashlib.sha256((ROOT/'references/JST-SH.pdf').read_bytes()).hexdigest(),
            'mating_direction':'+Z / top entry','contacts':{'1':'UART_RX','2':'GND','3':'UART_TX'},
            'anchors':'4/5 are insulated mechanical supports; explicitly tied to PCB GND, not UART contacts',
            'limitations':['Nominal manufacturer land guidance; physical mating and assembled enclosure clearance remain untested.']}
    (EVIDENCE/'land-audit.json').write_text(json.dumps(result,indent=2)+'\n')
    print('Exact supplier conversion and JST nominal land tolerances PASS:',max(differences),'mm')
    return result


if __name__=='__main__':
    audit()
