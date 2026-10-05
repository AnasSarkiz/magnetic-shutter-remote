# Generic USB symbol loses supplier pin arrangement

Status: **fixed locally**. Classification: **tscircuit importer symbol classification**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

GCT USB4105-GF-A-120 C5184243 (R2)

- [https://jlcpcb.com/partdetail/USB4105_GF_A_120/C5184243](https://jlcpcb.com/partdetail/USB4105_GF_A_120/C5184243)
- references/GCT-USB4105-120.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun test tests/convert-to-ts/usb-type-c-category.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

USB connector preserves real custom symbol, repeated shell lands and actual CC/power aliases.

## Actual behavior

Connector classification used a generic connector symbol instead of the supplier custom symbol.

## Logs, geometry and visual evidence

- [connector-symbol-before.log](evidence/005-usb-import-generic-symbol-discards-pin-arrangement/connector-symbol-before.log) (unaltered copy of `evidence/R2/connector-symbol-before.log`)
- [connector-symbol-after.log](evidence/005-usb-import-generic-symbol-discards-pin-arrangement/connector-symbol-after.log) (unaltered copy of `evidence/R2/connector-symbol-after.log`)
- [C5184243.raweasy.json](evidence/005-usb-import-generic-symbol-discards-pin-arrangement/C5184243.raweasy.json) (unaltered copy of `evidence/R2/C5184243.raweasy.json`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed classification path replaced the richer input symbol. Geometry/pin identity must be preserved independently of component category.

## Impact

Incorrect or ambiguous schematic correspondence to physical contacts.

## Fix, changed files and verification

USB classification retains source custom symbol and pin aliases. Before/after connector logs and fixture preserved.

- `tooling/easyeda-converter/lib/websafe/convert-to-typescript-component`
- `tooling/easyeda-converter/tests/convert-to-ts/usb-type-c-category.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
