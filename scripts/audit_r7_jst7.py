"""Check actual imported JST7 lands against JST SH catalogue p1/p3.
Reference pad dimensions/tolerances are published; no geometry is changed.
"""
import json
from pathlib import Path

root = Path(__file__).parents[1]
circuit = json.loads((root / 'dist/fill-light-ring/circuit.json').read_text())
source = next(item for item in circuit if item['type'] == 'source_component' and item.get('name') == 'J1')
assert source['manufacturer_part_number'] == 'BM07B-SRSS-TB(LF)(SN)'
assert source['supplier_part_numbers']['jlcpcb'] == ['C160393']
component = next(item for item in circuit if item['type'] == 'pcb_component' and item['source_component_id'] == source['source_component_id'])
pads = [item for item in circuit if item['type'] == 'pcb_smtpad' and item['pcb_component_id'] == component['pcb_component_id']]
assert len(pads) == 9
rows = []
for pad in pads:
    pin = int(next(hint[3:] for hint in pad['port_hints'] if hint.startswith('pin')))
    expected_width_mm = .6 if pin <= 7 else 1.2
    expected_length_mm = 1.55 if pin <= 7 else 1.8
    width_tolerance_mm = .05 if pin <= 7 else .1
    assert abs(pad['width'] - expected_width_mm) <= width_tolerance_mm
    assert abs(pad['height'] - expected_length_mm) <= .1
    expected_x_mm = 4 - pin if pin <= 7 else (-4.3 if pin == 8 else 4.3)
    assert abs(pad['x'] - component['center']['x'] - expected_x_mm) < .00005
    rows.append({'pin': pin, 'x_mm': pad['x'], 'y_mm': pad['y'], 'width_mm': pad['width'], 'length_mm': pad['height'],
                 'purpose': 'signal contact' if pin <= 7 else 'mechanical solder anchor / board GND'})
span_y_mm = max(pad['y'] + pad['height']/2 for pad in pads) - min(pad['y'] - pad['height']/2 for pad in pads)
assert abs(span_y_mm - 4.2) <= .1
text = (root / 'imports/BM07B_SRSS_TB_LF__SN_.tsx').read_text()
assert 'insertionDirection="from_above"' in text
assert not any(item['type'] == 'pcb_trace' for item in circuit)
report = {'status': 'PASS — JST7 CATALOGUE LAND GEOMETRY / UNROUTED EMITTER FIXTURE',
          'manufacturer_source': 'https://www.jst-mfg.com/product/pdf/eng/eSH.pdf',
          'copper_span_y_mm': span_y_mm, 'rows': rows,
          'mating_direction': '+Z / TOP / from_above', 'mated_height_reference_mm': 6.3,
          'stock_check_date': '2026-10-04', 'stock_observed': 32550, 'orderable_observed': 31715,
          'assembly': 'Extended SMT — Economic / Standard; MSL1',
          'stock_source': 'https://jlcpcb.com/partdetail/C160393',
          'stock_evidence': 'Live official product page inspected; not a stock reservation',
          'limitations': ['No mating housing installed or physical fit test', 'Reserved sensor contacts remain NC', 'Not a complete R7 power harness qualification']}
(root / 'evidence/R7-components/JST7-land-audit.json').write_text(json.dumps(report, indent=2) + '\n')
print(report['status'])
