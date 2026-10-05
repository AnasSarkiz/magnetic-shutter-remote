# Faithful imported legend exceeds selected manufacturing print rules

Current R5 status: **fixed locally**. Historical R4 failure and evidence below are retained; the R5 disposition at the end closes this project gate.
## R4 useful-function follow-up — 2026-10-02

Gate: **BLOCKED — SUPPLIER CONFIRMATION REQUIRED**. [Updated functional review](../fabrication/LEGEND-REVIEW.md) now distinguishes useful BAT polarity, SHOT/PAIR/POWER, SWD/pin1 and LED polarity from ornamental body outlines. The actual PCB does not print these function words; an external table is not falsely claimed as printed legend. Existing 0.09 mm reference strokes, <1 mm local glyph heights and six pad conflicts are preserved. The revised exact question requests a concrete printable functional-artwork disposition, not an exemption from JLC's limits or silent trimming. No component, trace, supplier artwork or CAM geometry changed.

Status: **fixed locally** (R5; historical R4 failure retained below). Classification: manufacturing/project qualification limitation, not a proven tscircuit geometry-conversion bug.

## Affected package and exact version

Supported easyeda-converter 0.0.364 base 140046d000238f3d6c8611989682efb2872f25a9 preserves supplier outline strokes; core 0.0.2035 and circuit-json-to-gerber 0.0.109 preserve actual geometry. Final source/import/ZIP hashes recorded. No supplier data is blamed without evidence.

## Components / manufacturer sources

HCTL HC-TYPE-C-6P-01A C2894893 and SHOUHAN MSK12C02 C431540 intentionally overhang the edge. Other imported outlines also use 0.1 mm strokes. [HCTL drawing](../references/C2894893-manufacturer.pdf), [JLC capabilities](https://jlcpcb.com/capabilities/pcb-capabilities), [BOM with exact identities](../BOM.md). JLC print rules: minimum 0.15 mm strokes, 1 mm text height and 0.15 mm pad clearance.

## Minimal reproduction / commands / input files

Use original final Gerber ZIP and validated Circuit JSON:

```sh
tooling/gerber-review-venv/bin/python scripts/render-final-cam.py
tooling/gerber-review-venv/bin/python scripts/draw-assembly-review.py
```

The first reads actual silk/mask/outline; the second records all source outline strokes and text sizes. Neither changes manufacturing geometry.

## Expected behavior

Qualified production legend must stay on the board, clear solderable openings and satisfy the selected stroke/text process. Correct export alone does not guarantee these conditions.

## Actual behavior

TOP silk area outside board = 1.173637032 mm²; actual overlap with mask openings = 0.466565723 mm². All 211 outline paths have 0.1 mm source stroke, below 0.15 mm print rule. Reference source font size is 1 mm, but that alone does not measure actual printed glyph height. No false small-font claim is made.

## Evidence / drawings / logs

[Actual export measurements](../evidence/R3/final-cam-readback/readback.json), [source legend dimensions](../evidence/R3/legend-source-measurements.json), [original silk readback SVG](../evidence/R3/final-cam-readback/F_SilkScreen.svg), [assembly review drawing](../fabrication/assembly-process-review.png), [native PCB](../dist/index/pcb.png).

## Root cause: facts vs hypotheses

Confirmed supplier outlines include off-board connector/actuator portions and process-inadequate strokes; converter faithfully exports them. Whether the assembler normally trims/widens/simplifies these marks is not evidence of acceptance for this design. No automatic clipping or same-footprint exception is assumed.

## Impact

Blocks complete manufacturing visual approval; copper, connectivity and complete drill/slot readback remain passed. Unreadable polarity/reference marks or silk on pads would affect assembly/rework.

## Fix / source / tests or precise remaining blocker

No imported definition, generated Circuit JSON or Gerber manually patched. Exact unsent CAM-disposition question asks for ≥0.15 mm pad clearance/strokes and readable ≥1 mm text with retained polarity/reference marks. A manufacturer-specific supported legend configuration or reviewed assembler CAM disposition is required. Generic clipping would hide this failure and has not been applied.

## Verification and remaining blocker

Complete copper/drill CAM is verified, while legend disposition remains explicitly open. [Unsent question 3](../fabrication/ASSEMBLY-REVIEW.md). Final evidence is indexed in [VALIDATION](../VALIDATION.md). No hardware, assembler approval, supplier contact, order or publication is implied.

## R4 functional-text audit — blocker narrowed to useful markings

[Actual per-label glyph measurements](../evidence/R4/functional-legend-review.json), [reproducible canonical-CLI attribution](../scripts/render-legend-review.py), [original selected-record fixtures](../evidence/R4/isolated-legend-review/), [functional review](../fabrication/LEGEND-REVIEW.md). Every attributed glyph is verified to exist in the final complete export; inputs are never used for fabrication. No source font-size or perspective-image assumption.

Six references have mask gap below 0.15 mm: R2, Q1, U3, U5, R10, R13. Actual local printed glyph heights span 0.564581859–0.658987964 mm; actual stroke is 0.09 mm. No reference text clips the outline. These are functional debugging/assembly identification issues. Cosmetic body-outline overhang/thin strokes are recorded but are not alone grounds for unnecessary redesign. Status remains confirmed/open manufacturing blocker; no corrected legend export exists or is claimed.

## R5 disposition (R4 report/evidence preserved)

Status: **fixed locally** for the project geometry/process strategy. Actual exported 46 text records measure 1.129158-1.317976 mm glyph height / 0.18 mm stroke; all clear mask by >=0.15 mm, with zero outline overhang. Three battery polarity strokes also pass. The six old collisions are absent. [Measurements](../evidence/R5/functional-legend-review.json), [signs](../evidence/R5/functional-symbol-review.json), [native source](../src/functional-markings.tsx). Imported copper/holes/courtyards are unchanged. Rendering/style fixes are separately tracked in 047/048.
