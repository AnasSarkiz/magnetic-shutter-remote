# Thermostat category incorrectly inferred as mechanical switch

Status: **fixed locally**. Classification: **tscircuit importer classification**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

Texas Instruments TMP390A2DRLR C5219772

- [https://www.ti.com/lit/ds/symlink/tmp390.pdf](https://www.ti.com/lit/ds/symlink/tmp390.pdf)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun test tests/convert-to-ts/thermostat-category.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Six-pin powered TMP390 thermostat retains its actual IC symbol and terminals.

## Actual behavior

A category name containing SWITCH caused mechanical-switch inference.

## Logs, geometry and visual evidence

- [thermostat-before.log](evidence/006-thermostat-category-inferred-as-switch/thermostat-before.log) (unaltered copy of `evidence/R2/thermostat-before.log`)
- [thermostat-after.log](evidence/006-thermostat-category-inferred-as-switch/thermostat-after.log) (unaltered copy of `evidence/R2/thermostat-after.log`)
- [C5219772.raweasy.json](evidence/006-thermostat-category-inferred-as-switch/C5219772.raweasy.json) (unaltered copy of `evidence/R2/C5219772.raweasy.json`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed overly broad substring classification.

## Impact

Temperature interlock schematic could lose IC pins and semantics.

## Fix, changed files and verification

Exclude thermostat category from mechanical switch inference; regenerate C5219772 through supported converter.

- `tooling/easyeda-converter/lib/websafe/convert-to-typescript-component`
- `tooling/easyeda-converter/tests/convert-to-ts/thermostat-category.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
