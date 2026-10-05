# Declared oval drill length replaced by inferred equal annulus

Status: **fixed locally**. Classification: **confirmed tscircuit geometry conversion bug**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

USB connector fixtures including HRO TYPE-C-31-M-17 C283540; GCT C5184243

- references/GCT-USB4105-120.pdf
- [https://docs.tscircuit.com/](https://docs.tscircuit.com/)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun test tests/convert-to-soup-tests/declared-slot-length.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Use declared EasyEDA holeLength; maintain independent outer copper and drill dimensions at 0/90/180/270 degrees.

## Actual behavior

Regression: declared 1.2mm drill became 1.2999974mm; before run failed at four rotations.

## Logs, geometry and visual evidence

- [slot-length-before.log](evidence/007-declared-oval-drill-length-ignored/slot-length-before.log) (unaltered copy of `evidence/R2/slot-length-before.log`)
- [slot-length-after.log](evidence/007-declared-oval-drill-length-ignored/slot-length-after.log) (unaltered copy of `evidence/R2/slot-length-after.log`)
- [importer-slot-full.log](evidence/007-declared-oval-drill-length-ignored/importer-slot-full.log) (unaltered copy of `evidence/R2/importer-slot-full.log`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed parser/converter ignored the declared holeLength field and inferred from outer copper dimensions.

## Impact

Wrong drill lengths, annular rings and connector fit; affected exports.

## Fix, changed files and verification

Parse and convert declared length. Five tests / 26 assertions pass; supplier payloads are unmodified. RECT-hole inference is not claimed fixed and not used by fitted parts.

- `tooling/easyeda-converter/lib`
- `tooling/easyeda-converter/tests/convert-to-soup-tests/declared-slot-length.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
