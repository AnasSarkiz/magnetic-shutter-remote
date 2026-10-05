# Default generated charger stencil differs from TI example

Status: **fixed locally** (R5; historical R4 failure retained below).

## R4 qualification correction — 2026-10-02

Current gate: **BLOCKED — SUPPLIER CONFIRMATION REQUIRED**. [Deeper official-TI qualification](../fabrication/CHARGER-STENCIL-QUALIFICATION.md) supersedes any implication below that exact equality to the DLH stencil example is mandatory. The dimensional difference is confirmed; an intrinsic tscircuit bug or physical solder failure is **not** established.

Latest SLUSF65B explicitly labels drawing 4226298/A as an example and references SLUA271C. That note adds process guidance for aperture release. Actual current leads calculate area ratio 0.39999967/aspect 1.12 at 0.125 mm, so approval of material, thickness, transfer and volume is the concrete unresolved concern. No universal default was modified.

The previous assertion that the example's reported 88% necessarily uses physical EP area was too definite and is withdrawn. Current rectangular paste area 0.661497690002 mm² is 49.00003578% of actual exported copper, 48.99982889% of the nominal physical bounding rectangle. The package chamfer is not dimensioned sufficiently to state exact metal area; the 88% caption does not define its denominator uniquely. Example bounding dimensions yield 86.88888889% against the nominal bounding pad, which is not silently rounded into a new physical nominal. [All per-aperture measurements and sensitivity calculations](../evidence/R4-qualification/qualification-audit.json). Existing original measurements/files below remain preserved as history.

## Affected package and exact revision

@tscircuit/core 0.0.2035 SmtPad default aperture scale 0.7; circuit-json-to-gerber 0.0.109 faithfully exports source apertures. Classification: confirmed design/process discrepancy; a universal core bug is not established.

## Component and authoritative sources

Texas Instruments BQ25185DLHR / C19725033. [TI datasheet and DLH stencil example](https://www.ti.com/lit/ds/symlink/bq25185.pdf), [saved PDF](../references/BQ25185.pdf). HCTL shell process is separate, [drawing](../references/C2894893-manufacturer.pdf).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
node_modules/.bin/tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png
bun tooling/circuit-json-to-gerber/dist/cli.js dist/index/circuit.json -o fabrication/R3-gerbers-review.zip
tooling/gerber-review-venv/bin/python scripts/review-r3-exports.py fabrication/R3-gerbers-review.zip dist/index/circuit.json --output-directory evidence/R3/final-cam-readback
```

## Expected behavior

Stencil geometry needs manufacturer/process qualification independent of correct copper geometry and faithful export. TI DLH example uses ten .2 × .5 mm lead apertures and exposed-pad .85 × 1.38 mm (88% physical-pad printed area), based on a .125 mm stencil. Board orientation rotates that EP rectangle by 90 degrees.

## Actual behavior

Actual ten lead apertures are .13999972 × .3499993 mm; EP is 1.0499979 × .62999874 mm. Automatic .7 linear scale gives 49% of copper-land area. Export exactly matches these source features. For .125 mm thickness, rectangular lead area/perimeter/thickness is .4, not evidence of adequate paste release.

## Logs, screenshots and measurements

[All source/export aperture measurements](../evidence/R3/final-cam-readback/readback.json), [actual source](../dist/index/circuit.json), [annotated review drawing](../fabrication/assembly-process-review.svg), [exact unsent questions](../fabrication/ASSEMBLY-REVIEW.md).

## Root cause: confirmed facts and hypotheses

Confirmed core hard-coded default reduction and manufacturer example differ. The supplier import has no qualified manufacturer-specific paste override. Whether a thinner/stepped/electropolished stencil could accept the default is unverified; do not assume assembler adjustment.

## Impact

Blocks stage 6 assembly-process approval; source copper/routing and CAM fidelity checks still pass. Physical reflow quality cannot be asserted.

## Fix details, changed source and regression tests

No supplier footprint, aperture, generated JSON or fabrication file manually patched. Manufacturer-specific supported stencil configuration or documented assembler stencil disposition is required. Exact discrepancy and questions prepared locally; no supplier/assembler contact. The generic default is recorded as a limitation rather than changed globally without evidence.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.

## R5 disposition (R4 report/evidence preserved)

Status: **fixed locally** for the project geometry/process strategy. 0.10 mm foil and 1:1 0.20 x 0.50 mm charger lead apertures give AR 0.714284 / aspect 1.999996. All 151 apertures pass the retained AR >=0.66 / aspect >=1.5 rules. EP coverage 67.407% is separately reported; R4's ~0.40 lead AR at 0.125 mm is not waived. [Per-aperture calculation](../evidence/R5/stencil-release.json). Actual paste transfer remains post-prototype; exact USB shell process remains open. Parent-style capability is tracked in 046; imported definitions are unmodified.
