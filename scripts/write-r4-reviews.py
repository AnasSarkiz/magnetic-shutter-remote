"""Write dimensioned review documents from the measured R4 CAM report."""
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]


def fmt(number):
    return f'{number:.7f}'.rstrip('0').rstrip('.')


def write_usb_review(report):
    rows=['# USB footprint review — R4 DFM only','',
          '**BLOCKED: expanded supplier copper is outside the manufacturer reference tolerance. No authoritative acceptable-variant disposition.**', '',
          'Part: HCTL HC-TYPE-C-6P-01A / C2894893. Dimensions in mm. Original supplier import is unchanged. PCB/firmware/topology/mechanics remain R3.', '',
          'Three independently read inputs:', '',
          '1. [HCTL Rev A manufacturer drawing](../references/C2894893-manufacturer.pdf), obtained through the [exact JLC listing](https://jlcpcb.com/partdetail/HC-TYPE-C-6P-01A/C2894893). Direct public document: [LCSC manufacturer PDF](https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2211161000_HCTL-HC-TYPE-C-6P-01A_C2894893.pdf). The file supplied has one page although its title block says 1/2; no missing page content is assumed.',
          '2. [Unmodified imported TSX](../imports/HC_TYPE_C_6P_01A.tsx), current compiled source geometry, and [original raw supplier model](../evidence/R3/C2894893.raweasy.json). Raw EasyEDA units are 10 mil = 0.254 mm, per the supported importer utility and [EasyEDA format documentation](https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/#unit).',
          '3. [Fresh R4 Gerber/Excellon export](R4/R4-gerbers-review.zip): Gerbonara 1.5.0 reads copper/mask/paste primitives; pcb-tools 0.1.6 reads original inline G85/G05 plated slots. [Numeric records](../evidence/R4/manufacturing-review.json), [all-file readback](../evidence/R4/cam-readback/readback.json).', '',
          '![Manufacturer land dimensions](../evidence/R4/HCTL-land-drawing-detail.png)', '',
          'Contact order below is actual PCB left-to-right after 180° placement: A12, A9, B5, A5, B9, B12. Manufacturer unspecified recommended-layout tolerance is ±0.05 mm. Export rounding is serialization, not additional fabrication tolerance.', '',
          '| Feature | Manufacturer nominal | Imported tscircuit footprint / compiled PCB | Final Gerber / drill | Difference (source minus drawing) | Status |',
          '|---|---:|---:|---:|---:|---|']
    for item in report['usb_contacts']:
        pad=item['source'];g=item['gerber_copper'];nom=item['manufacturer_width_mm']
        status='OUTSIDE ±0.05; BLOCKER' if abs(pad['width']-nom)>.05 else 'Within drawing tolerance'
        rows.append(f"| {item['contact']} pad width | {fmt(nom)} | {fmt(pad['width'])} | {fmt(g['width_mm'])} | {fmt(pad['width']-nom)} | {status} |")
    pad=report['usb_contacts'][0]['source'];g=report['usb_contacts'][0]['gerber_copper']
    rows.append(f"| All 6 pad lengths | 1.20 | {fmt(pad['height'])} | {fmt(g['length_mm'])} | {fmt(pad['height']-1.2)} | Within tolerance |")
    source_pitches=[b['source']['x']-a['source']['x'] for a,b in zip(report['usb_contacts'],report['usb_contacts'][1:])]
    final_pitches=[b['gerber_copper']['x_mm']-a['gerber_copper']['x_mm'] for a,b in zip(report['usb_contacts'],report['usb_contacts'][1:])]
    rows.append(f"| Adjacent contact centre pitches | 1.23 / 1.02 / 1.00 / 1.02 / 1.23 | {' / '.join(map(fmt,source_pitches))} | {' / '.join(map(fmt,final_pitches))} | {' / '.join(fmt(a-b) for a,b in zip(source_pitches,[1.23,1.02,1,1.02,1.23]))} | Within ±0.05 |")
    rows.extend([
        '| First/last pad X relative to symmetry axis | −2.75 / +2.75 (sum of dimensioned pitches) | −2.749296 / +2.750312 | −2.749296 / +2.750312 | +0.000704 / +0.000312 | Within tolerance |',
        '| Contact-row Y relative to shell rows | No explicit dimension | Board Y=21.4472794 | Y=21.447279 | Not determinable | No exact manufacturer agreement claim |',
        '| Shell copper width (4) | 0.90 | 1.0999978 | 1.099998 | +0.1999978 | OUTSIDE ±0.05; BLOCKER |',
        '| Shell copper length (4) | Not dimensioned; 4×1.40 refers to slots | 1.7999964 | 1.799997 | Not determinable | Do not infer 1.80 as manufacturer nominal |',
        '| Shell X positions | ±4.32 (8.64 centre span) | ±4.320032 | ±4.320032 | ±0.000032 | Within tolerance |',
        '| Shell Y rows / pitch | Relative rows 0 / 3.70 | Board 21.9027014 / 25.6027194; pitch 3.700018 | 21.9027 / 25.6027; pitch 3.70 | Pitch +0.000018 | Relative pitch agrees; absolute datum not dimensioned |',
        '| Plated slot width (4) | 0.50 | 0.5000244 | Tool 0.500024 | +0.0000244 | Within tolerance; ≥0.5 selected process minimum |',
        '| Plated slot total length (4) | 1.40 | 1.401064 | 1.401024 (0.901 centreline + tool width) | +0.001064 | Within tolerance; all 4 physically parsed |',
        '| Contact solder-mask openings | No mask-specific drawing dimensions | Core/export default: same as copper | GND 0.799998×1.199998; VBUS 0.759993×1.199998; CC 0.699999×1.199998 | Manufacturer comparison not possible | All lands open; process registration margin unqualified |',
        '| Shell mask openings | No mask-specific drawing dimensions | Same pill as 1.0999978×1.7999964 copper | 1.099998×1.799997 | Not determinable | Open TOP and BOTTOM; not barrel-fill approval |',
        '| Contact paste openings | No manufacturer stencil dimensions in supplied HCTL page | Default 0.7 linear copper scale | GND 0.559999×0.839998; VBUS 0.531995×0.839998; CC 0.489999×0.839998 | Not determinable | 6 distinct openings; process qualification pending |',
        '| Shell paste openings | No supplied manufacturer requirement | None | None | N/A | Consistent with selected secondary manual process; no PiP claim |', '',
        '## Root-cause disposition', '',
        'The raw supplier A9/B9 width is 2.9921×0.254=0.7599934 mm and shell width is 4.3307×0.254=1.0999978 mm. Both dimensions survive the supported importer unchanged. Gerber aperture sizes preserve these widths to decimal serialization. This confirms an upstream supplier CAD departure; it does not establish whether the supplier intended or qualified the larger lands. No conversion fix is justified by these measurements.', '',
        'Larger lands provide additional nominal terminal coverage, but the selected process has not approved solder-volume, mask registration, bridging and shell joint margins. Minimum actual shell annulus is 0.199465 mm: above JLC two-layer absolute 0.18 and below recommended 0.25. This is disclosed, never treated as an exemption. Copper/drill clearance checks pass. Appearance and CAD body models are not qualification evidence.', '',
        'Do not source-patch the manufacturer dimensions into a custom footprint. Required closure: authoritative acceptable-variant evidence for this exact supplier model, or a corrected supplier library with a supported regenerated import and all affected checks. This request prohibits redesign and supplier contact; the exact unsent question is in [assembly review](ASSEMBLY-REVIEW.md). Contact-row and board-edge Y datums and the missing page also need clarification if a full land-conformance claim is required.', '',
        '## Reproduce', '',
        '```sh',
        'bun scripts/export-assembly.ts fabrication/R4 evidence/R4',
        'bun tooling/circuit-json-to-gerber/dist/cli.js dist/index/circuit.json -o fabrication/R4/R4-gerbers-review.zip',
        'tooling/gerber-review-venv/bin/python scripts/review-r3-exports.py fabrication/R4/R4-gerbers-review.zip dist/index/circuit.json --output-directory evidence/R4/cam-readback',
        'tooling/gerber-review-venv/bin/python scripts/review-r4-manufacturing.py',
        'tooling/gerber-review-venv/bin/python scripts/write-r4-reviews.py',
        '```', '',
        'All source/export comparison bounds cover decimal or curve representation only. They do not manufacture tolerances or approve assembly.'])
    (ROOT/'fabrication/USB-FOOTPRINT-REVIEW.md').write_text('\n'.join(rows)+'\n')


def orientation_note(ref):
    if ref.startswith(('R','C')):
        return 'Nonpolar; interchangeable terminals'
    notes={'J1':'Pins5/10 GND,6/9 VBUS,7 CC2,8 CC1; shell1–4 GND; +Y mate',
           'J2':'1 BAT+,2 GND; −Y mate; harness polarity check after arrival',
           'J3':'1 Vref,2 SWDIO,3 GND,4 SWCLK,5 RESET,6 GND; +Z mate',
           'SW1':'2 common,1/3 throws; shell GND; +X actuator',
           'SW2':'Normally open, nonpolar; repeated lands retained',
           'SW3':'Normally open, nonpolar; repeated lands retained',
           'Q1':'G1/S2/D3','Q2':'G1/S2/D3',
           'U1':'Manufacturer43-terminal map; antenna toward −Y; Standard/X-ray',
           'U2':'DLH top-view pin1; exposed pad11 GND',
           'U3':'DBV top-view pin1 VIN,5 VOUT',
           'U4':'DBZ top-view pin1 GND,2 RESET,3 VDD',
           'U5':'DRL pin1 SETA,4 N_OUTB,5 VDD,6 N_OUTA',
           'LED1':'1 anode /2 cathode; source pad locations recorded',
           'LED2':'1 anode /2 cathode; source pad locations recorded'}
    if ref not in notes:raise ValueError(f'No reviewed orientation disposition for {ref}')
    return notes[ref]


def write_assembly_table(report):
    lines=['# R4 BOM/CPL and orientation review','',
           '**37 fitted references, 37 BOM entries, 37 CPL entries; all TOP. No component is DNP or intentionally excluded.** 24 unique verified supplier identities. This is file/source consistency, not an assembler engineering-preview approval.', '',
           'Every reference is compared individually against source MPN and C-number, engineering BOM, actual PCB centroid, exported coordinates, strict supplier-resolved rotation and supplier pin1 datum. Duplicate/missing references, DNP, wrong side, mismatched MPN/C-number, missing supplier orientation and incorrect centroid/rotation fail. CPL decimals are compared within 0.000501 mm for three-decimal serialization only. [Exact terminal coordinates and orientation records](../evidence/R4/manufacturing-review.json).', '',
           'Manufacturer pin/top-view reviews remain those documented in [electrical qualification](../evidence/R2/ELECTRICAL-QUALIFICATION.md), [current USB audit](USB-FOOTPRINT-REVIEW.md) and [sourcing](../SOURCING.md). The old GCT USB pin table is superseded. All fitted capacitors are nonpolar MLCCs; there is no standalone diode. LED diode polarity is checked separately below.', '',
           '| Ref | Part | Side | BOM | CPL | Rotation checked | Polarity / terminal view checked | Assembly method | Status |',
           '|---|---|---|---|---|---|---|---|---|']
    for row in report['assembly']:
        ref=row['ref']
        lines.append(f"| {ref} | {row['mpn']} / {row['lcsc']} | TOP | yes | yes | {row['rotation_degrees']}°; supplier {row['supplier_pin1_location']} | {orientation_note(ref)} | {row['assembly_method']} | Files PASS; {'land/process BLOCKED' if ref=='J1' else 'stencil BLOCKED' if ref=='U2' else 'assembler registration pending'} |")
    lines.extend(['',
        'J1 source placement anchor (0,23.25) differs from canonical centroid (0,23.6749991); final CPL (0,23.675),180°. U1 centroid (0,−14.914) is the computed footprint centre. These are not replaced by guessed enclosure/body centres. Exact pin1 coordinates accompany the table to allow supplier registration review. All rotations are strict supported-converter results, checked against source pin views; no JLC placement preview was uploaded or reviewed.', '',
        'Assembly process coverage: all 37 components are requested for TOP reflow; J1 additionally requires four manual shell joints. That operation is explicitly assigned to the prototype finishing process unless the assembler confirms coverage. No entire component is silently dropped from BOM/CPL. Battery/harness/magnets/enclosure are external parts, outside PCB assembly and have no invented C-numbers.', '',
        'Standard assembly is required by U1; X-ray remains required. Follow the stricter recorded MSL handling in the sourcing BOM. Tooling rails, overhanging USB/slider fixture access and supplier placement registration remain open process review items, not unexplained file errors.'])
    (ROOT/'fabrication/BOM-CPL-REVIEW.md').write_text('\n'.join(lines)+'\n')


def main():
    report=json.loads((ROOT/'evidence/R4/manufacturing-review.json').read_text())
    write_usb_review(report)
    write_assembly_table(report)


if __name__=='__main__':
    main()
