# Gerbonara cannot parse native exported G85 plated slots

Status: **confirmed**. Classification: **external CAM reader limitation; distinct converter defects subsequently confirmed in 024/025**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

USB plated shell slots; C5184243 R2, C5252714 R3

- [https://github.com/jaseg/gerbonara](https://github.com/jaseg/gerbonara)
- [https://docs.kicad.org/](https://docs.kicad.org/)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
tooling/gerber-review-venv/bin/python -c 'from gerbonara import ExcellonFile; ExcellonFile.open("fabrication/review-gerbers/drill-L1-L2.drl")'
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Independent CAM reader must load every drill and slot. A partial copper preview is insufficient.

## Actual behavior

Gerbonara 1.5.0 rejects G85. Original failure log retained. NPTH reads but warns: G90 header statement found after end of header.

## Logs, geometry and visual evidence

- [gerber-parse.log](evidence/018-g85-plated-slot-reader-unsupported/gerber-parse.log) (unaltered copy of `evidence/R2/gerber-parse.log`)
- [j1-export-metrology.log](evidence/018-g85-plated-slot-reader-unsupported/j1-export-metrology.log) (unaltered copy of `evidence/R3/j1-export-metrology.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed reader lacks G85 handling. Whether particular assembler accepts native output remains unverified; numeric endpoint comparison alone is not full CAM review.

## Impact

Plated slots omitted from Gerbonara preview.

## Fix, changed files and verification

R3 independent complete-reader review is tracked in VALIDATION.md. No file rewrite or fabricated replacement exports.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.

## R3 follow-up

Gerbonara still lacks G85 support. Report [024](024-excellon-g85-slot-record-and-mode-export.md) now confirms a separate native-export interpretation defect observed in KiCad. An unmodified independent reader, pcb-tools 0.1.6, parses the corrected supported export and measures all four slots against source. This does not complete copper, mask, paste or full-board validation.

## Final R3 disposition (2026-10-02)

Affected reader is Gerbonara 1.5.0, not core. Alternative independent pcb-tools 0.1.6 now reads all 106 plated drills (102 vias, four slots) and four NPTH features in the current unmodified export. Both copper layers, all 12 files and every slot/round feature match source: [readback](../evidence/R3/final-cam-readback/readback.json). Gerbonara’s G85 limitation remains; no partial preview is called complete.
