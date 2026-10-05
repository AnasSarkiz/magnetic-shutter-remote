# Project drill audit uses one threshold and omits tracks and pours

Status: **fixed locally**. Classification: **project checker mistake, not a tscircuit defect**.

## Affected package and revision

Project `scripts/audit-drills.ts` in R2 and `scripts/manufacturing-audit.py` in R3; exact source revisions are captured in the package manifests. This is project checker logic, not @tscircuit/core code.

## Component and primary sources

R2 board; USB J1 and all drills

- [https://jlcpcb.com/capabilities/pcb-capabilities](https://jlcpcb.com/capabilities/pcb-capabilities)
- [https://jlcpcb.com/blog/npth-design-guide](https://jlcpcb.com/blog/npth-design-guide)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
tooling/gerber-review-venv/bin/python -m unittest discover -s tests -p test_manufacturing_audit.py -v
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --input evidence/R3/R2-inputs/dist/index/circuit.json --output evidence/R3/r2-classified-audit.json
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Classify NPTH/PTH/vias, layer spans, own annuli, actual electrical feeds, unrelated SMT/trace/pour copper; no same-footprint exemption.

## Actual behavior

Old scripts/audit-drills.ts applies blanket 0.2mm hole-to-SMT pad clearance, excluding trace/pour and hole-hole relationships.

## Logs, geometry and visual evidence

- [audit-drills.ts](evidence/017-blanket-drill-pad-check-misclassification/audit-drills.ts) (unaltered copy of `evidence/R3/R2-inputs/scripts/audit-drills.ts`)
- [manufacturing-audit-current.log](evidence/017-blanket-drill-pad-check-misclassification/manufacturing-audit-current.log) (unaltered copy of `evidence/R3/manufacturing-audit-current.log`)
- [manufacturing-regression-final.log](evidence/017-blanket-drill-pad-check-misclassification/manufacturing-regression-final.log) (unaltered copy of `evidence/R3/manufacturing-regression-final.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed project script coverage error. Official minima differ by drill type/layer/feature. Additional project constraints are explicitly identified as such.

## Impact

Incomplete manufacturing evidence despite native connectivity passes.

## Fix, changed files and verification

New Shapely audit and regression tests; NPTH still 0.2mm. Via ring .05mm; 2-layer PTH absolute ring .18mm; PTH-track .28mm; via-track .2mm. Unsupported geometry fails closed. Nine initial tests pass.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.

## Final R3 disposition (2026-10-02)

Project checker now includes traces/pours and explicit internally connected ports/actual shared conductive pads. No threshold was lowered. See issue [036](036-independent-checker-internal-pads-and-net-recursion.md). Current independent audit: zero failures; 25 board/checker regression tests pass.
