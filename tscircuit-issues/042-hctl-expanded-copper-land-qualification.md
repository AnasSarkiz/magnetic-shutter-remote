# HCTL supplier copper lands exceed manufacturer reference tolerance

Status: **confirmed**. Classification: supplier land-pattern variation with incomplete process qualification, not a confirmed tscircuit importer bug.

## R4 qualification follow-up — 2026-10-02

Current gate: **BLOCKED — SUPPLIER CONFIRMATION REQUIRED**. The exact raw footprint's own linked manufacturer document was fetched and visually inspected: **A0 / T16-000X / 2017-02-24 / 1 of 1**, in addition to saved Rev A. Both use a separate recommended PCB land layout and specify the same 0.70±0.05 VBUS and 0.90±0.05 shell copper widths. Physical terminals instead are VBUS 0.56±0.05, GND 0.60±0.05, CC 0.50±0.05. The earlier comparison therefore used equivalent copper dimensions, not terminal widths. No wider official land range or qualified variant was found.

Footprint UUID `d499e17a85ba4053b0248d18b7094b66`, data revision `ff50527eec1b490290182e35e1d9c584`, 2022-03-01T10:30:53Z are now preserved with the symbol identity and original SHA. [Supplier identity](../evidence/R4-qualification/usb-supplier-identity.json), [complete qualification including separate mask/paste/mechanical features](../fabrication/USB-LAND-QUALIFICATION.md), [actual-copper supporting drawing](../evidence/R4-qualification/usb-width-qualification.svg), [original linked manufacturer drawing](../references/R4-qualification/HCTL-supplier-linked-20210915.pdf).

Source-level decision: faithful converter/import stays unchanged; obtain approved exact-part deviation or corrected official library rather than hand-modify supplier geometry. Undimensioned shell copper length and row/PC-edge datum remain **BLOCKED — MANUFACTURER INFORMATION MISSING**. Shell solder profile is separately narrowed in [process qualification](../fabrication/USB-ASSEMBLY-PROCESS.md). All old inputs/results below remain preserved. No factory/supplier contact.

## Affected package and exact version

Supported easyeda-converter 0.0.364 base 140046d000238f3d6c8611989682efb2872f25a9; raw supplier widths are faithfully preserved. Final import/raw/build SHA-256 in revision manifests; no converter modification is proposed for supplier differences.

## Component and sources

HCTL HC-TYPE-C-6P-01A / C2894893, Extended SMT; [manufacturer Rev A](../references/C2894893-manufacturer.pdf), [JLC listing](https://jlcpcb.com/partdetail/HC-TYPE-C-6P-01A/C2894893), [actual raw library](../evidence/R3/C2894893.raweasy.json), [supported unchanged import](../imports/HC_TYPE_C_6P_01A.tsx).

## Minimal reproduction, commands and input files

From board root:

```sh
bun tooling/easyeda-converter/cli/main.ts convert --input evidence/R3/C2894893.raweasy.json --output /private/tmp/HCTL-unmodified-import.tsx --output-format tsx --insertion-direction from_bottom
rg 'width=|outerWidth=|holeWidth=|holeHeight=' /private/tmp/HCTL-unmodified-import.tsx
```

Compare the actual manufacturer drawing with the unchanged raw/generated footprint. [Exact final source audit](../evidence/R3/HCTL-land-pattern-audit.json) contains every contact and both slot pitches. No account or external write is required.

## Expected behavior

Importer must preserve source geometry accurately; component qualification must distinguish manufacturer reference land tolerance, physical contact/drill registration and process-acceptable land variations. A manufacturing-rule pass does not prove recommended-land conformity.

## Actual behavior

VBUS copper width .7599934 versus manufacturer reference .70 ±.05: deviation .0599934, outside by .0099934. Shell copper width 1.0999978 versus .90 ±.05: deviation .1999978. GND/CC/contact height, contacts and slot pitches/width/length match to supplier coordinate rounding. No pin swap or actual drill-fit error is identified.

## Screenshots, logs and measurements

[Authoritative drawing](../evidence/R3/HCTL-manufacturer-drawing-final.png), [all source measurements](../evidence/R3/HCTL-land-pattern-audit.json), [qualification rationale/limits](../evidence/R3/HCTL-LAND-QUALIFICATION.md), [supported import log](../evidence/R3/C2894893-supported-import.log), [actual exported copper/drill readback](../evidence/R3/final-cam-readback/readback.json). Original inputs preserved; no adjusted geometry after-image exists.

## Root-cause findings: facts vs hypotheses

Confirmed supplier copper expansion; importer faithfully preserves it. VBUS has nominal extra copper .0299967 per side and shell .0999989; this is not a fabricated manufacturer tolerance. Nominal terminal coverage and correct slots explain why it is not a pin/drill-fit error, but no authoritative process acceptance of the variant was obtained. An assembler might accept it; that hypothesis is not approval.

## Impact

Reopens footprint/process qualification and dependent fabrication gates while final electrical/native/copper checks and complete export fidelity remain passed. Earlier vague 'larger lands disclosed' did not alone close this requirement.

## Fix details, regression results or exact blocker

No supplier import, footprint, pin map, Circuit JSON or Gerber patched. Exact unsent question 1 now includes both departures, dimensions, drawing and process/annulus concerns. Required next evidence is a documented acceptable land-pattern variant or another exact eligible accurate supported import; existing routing/outputs remain review only. Current 31 board/CAM regressions and all final native checks pass to their actual software scope.

## Verification and remaining blocker

[Validation](../VALIDATION.md) records reopened gates; [prepared unsent review](../fabrication/ASSEMBLY-REVIEW.md). No manufacturing candidate claim, supplier contact, assembler upload, order or publication. Physical tests remain pending.

## R4 three-source comparison — qualification still open

[Complete USB footprint table](../fabrication/USB-FOOTPRINT-REVIEW.md), [numeric raw/source/final-CAM measurements](../evidence/R4/manufacturing-review.json), [supported final all-file readback](../evidence/R4/cam-readback/readback.json), [manufacturer detail](../evidence/R4/HCTL-land-drawing-detail.png).

Raw supplier VBUS width 2.9921×0.254 = 0.7599934; shell width 4.3307×0.254 = 1.0999978 mm. Final Gerbers preserve these to 6 decimal serialization. This establishes supplier CAD origin, not intentional/safe process approval. All four original plated slots are independently parsed, exported 0.500024×1.401024. Contact X/pitch, row pitch and explicit slot dimensions agree within drawing tolerances. Shell copper length, contact-row Y/edge datum, mask and stencil dimensions are not explicitly provided; no nominal was invented. Supplied Rev A file contains one page despite title-block 1/2; missing page content is not assumed.

Chosen R4 baseline shell method is secondary manual solder after six-contact TOP reflow, with no shell paste. HCTL allowable solder profile/materials and expanded-land acceptance are still unqualified. No supplier contact was authorized/performed. Existing source/import/routing/mechanics remain untouched. R4 is DFM review, not a fabrication candidate.

## R5 exact-part qualification follow-up - 2026-10-02

Status remains **confirmed** supplier reference-land discrepancy, **BLOCKED - SUPPLIER CONFIRMATION REQUIRED**; not a confirmed tscircuit copper conversion bug. No new issue number, package/source fix or geometry revision was made. [Original report copy](../evidence/R5-HCTL-qualification-2026-10-02/original-documents/tscircuit-issues/042-hctl-expanded-copper-land-qualification.md).

The current LCSC-linked PDF is SHA-identical to saved Rev A. An exact official HCTL page was located, but its PDF links/file list are empty. Both accessible exact HCTL drawings were visually reread: **0.70 +/-0.05 and 0.90 +/-0.05 are recommended PCB copper widths**, not metal-terminal dimensions. Both current copper widths remain outside those recommended ranges; this does not prove that the expanded variant is unsafe, nor does supplier provenance approve it. No manufacturer-approved variation or corrected official model was obtained. Any geometry correction belongs to R6 after obtaining an accurate permitted supplier input; R5 remains unchanged and no invented R6 footprint is created.

[Read-only focused reproduction](../evidence/R5-HCTL-qualification-2026-10-02/inspect-and-attach.py) and [successful results](../evidence/R5-HCTL-qualification-2026-10-02/J1-source-chain.log): `tooling/gerber-review-venv/bin/python evidence/R5-HCTL-qualification-2026-10-02/inspect-and-attach.py` from board root. Uses original raw input, unchanged imported TSX, final Circuit JSON and original R5 CAM ZIP. [Complete raw PAD records, dimensions and mapping](../evidence/R5-HCTL-qualification-2026-10-02/J1-source-chain.json). Six contact dimensions and four shell/import dimensions agree; original four G85 slots read correctly. Copper discrepancies originate in supplier data, not importer rounding. Mask/paste source semantics must not be overstated: raw trailing fields are preserved, parser does not map explicit mask/paste props; actual R5 mask expansion is zero and six contact stencil openings use tscircuit's .7 linear dimensions. No claim of HCTL paste approval or identical EasyEDA mask/paste export is made.

A historical project-document transcription in `SUPPLIER-QUESTIONS-R5.md` used shell height 1.8999962 mm. The actual unchanged raw/import/JSON height is **1.7999964 mm**, Gerber **1.799997 mm**. [New questions](../fabrication/SUPPLIER-QUESTIONS.md) and [compact attachment](../fabrication/HCTL-QUALIFICATION-PACKAGE.pdf) correct that text; old draft/ZIP remain preserved. This is documentation clarification within the existing qualification issue, not an electronic-part or converter defect.

Exact HCTL thermal/process limits remain absent. A 260 C secondary attribute has no reviewed HCTL exposure curve behind it and is not accepted as an exact-part thermal qualification. [Separate manufacturer/assembler gates](../fabrication/HCTL-SOLDER-PROCESS-QUALIFICATION.md), [source register](../fabrication/HCTL-SOURCE-REGISTER.md), [dimensioned view](../fabrication/HCTL-qualification-assets/J1-dimensioned-footprint.svg), [original Gerber crop](../fabrication/HCTL-qualification-assets/J1-original-gerber-view.svg). No supplier/assembler was contacted. No full suite repeated because board source/export artifacts are unchanged; final preservation evidence is beside the focused reproduction.
