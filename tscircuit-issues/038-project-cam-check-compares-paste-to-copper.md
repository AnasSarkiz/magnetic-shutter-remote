# Project CAM review incorrectly assumes solder paste equals SMT copper

Status: **fixed locally**. Classification: project checker mistake, not a tscircuit converter bug.

## Affected package and exact revision

Project `scripts/review-r3-exports.py`, R3 2026-10-02, exact final SHA in revision-manifest. Converter circuit-json-to-gerber 0.0.109 base `40dbb6c0ebae9c63ef5a52292e8521de6060c548` correctly exports explicit paste.

## Component and sources

TI BQ25185DLHR / C19725033 is a clear example, but the bad assumption affects all reduced apertures. [TI manufacturer stencil drawing](https://www.ti.com/lit/ds/symlink/bq25185.pdf), [saved datasheet](../references/BQ25185.pdf), [explicit final Circuit JSON](../dist/index/circuit.json). Actual stencil qualification discrepancy is separately tracked in 037.

## Minimal reproduction, exact commands and required inputs

From the board root:

```sh
tooling/gerber-review-venv/bin/python tscircuit-issues/evidence/038-paste-baseline/reproduce.py
bun run test
```

[Reproducer](evidence/038-paste-baseline/reproduce.py) uses unchanged current ZIP and circuit; it intentionally fails under the historical incorrect comparison. This is a preserved minimal failing assumption, not a claim to have retained a byte-identical early whole script.

## Expected behavior

Compare actual exported paste to explicit `pcb_solder_paste` geometry; check manufacturer/process suitability separately. Copper-to-paste equivalence is not a valid invariant.

## Actual behavior

Early full review raised `F_Paste.gbr does not match source copper: missing=81.18947314695694, extra=0.0 mm2`. The source has supported reduced apertures. Current reproducer records the same bad assumption against actual preserved inputs; no Gerber or JSON modification.

## Logs, screenshots and before/after measurements

[Replayed failing assumption](evidence/038-paste-baseline/reproduction.log), [actual aperture overlay](../fabrication/assembly-process-review.png), [passing source/export readback](../evidence/R3/final-cam-readback/readback.json). Actual TOP paste area 78.01379256 mm² matches explicit source 78.01378152 within the retained numerical comparison bound.

## Root-cause findings

Confirmed wrong expected baseline in project code. No converter failure is inferred. A reduced stencil may still be inappropriate for a particular manufacturer; that is a separate assembly qualification, not a reason to compare it to copper.

## Impact

False export-fidelity failure obscured the real manufacturer-specific stencil question. Corrected comparison does not grant stencil/process approval.

## Fix details, source files and regressions

`review-r3-exports.py` now uses explicit source paste records. `tests/test_export_readback.py` verifies reduced aperture matching, missing/extra stencil rejection, original G85 plus following round drilling and missing/incorrect drill data. Six focused cases pass; all 31 board tests pass. No numerical threshold or manufacturing rule changed.

## Verification and remaining blocker

All twelve final CAM files parse/match. Issue 037 still blocks charger stencil acceptance. Final evidence is indexed in [VALIDATION](../VALIDATION.md). No hardware, assembler approval, supplier contact, order or publication is implied.
