# Three-terminal slide switch inferred as SPST

Status: **fixed locally**. Classification: **tscircuit importer classification / missing topology input**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

SHOU HAN JS102011SAQN C221660 (R1); MSK12C02 C431540 (selected)

- [https://jlcpcb.com/partdetail/MSK12C02/C431540](https://jlcpcb.com/partdetail/MSK12C02/C431540)
- references/SHOUHAN-MSK12C02.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun install --frozen-lockfile
bun test tests/convert-to-ts/manufacturer-metadata.test.ts
bun cli/main.ts convert -i ../../evidence/R2/C431540.raweasy.json -o /tmp/msk12c02.tsx --output-format tsx --switch-type spdt
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Common terminal 2 selects terminal 1 or 3; shell terminal 4 is a separate mechanical land. Manufacturer drawing specifies SPDT and 1.6mm actuator travel.

## Actual behavior

R1 automatic category inference selected a two-terminal SPST symbol for a three-terminal device. Original generated import is retained.

## Logs, geometry and visual evidence

- [importer-final-full.log](evidence/001-spdt-switch-inferred-as-spst/importer-final-full.log) (unaltered copy of `evidence/R2/importer-final-full.log`)
- [C221660.raweasy.json](evidence/001-spdt-switch-inferred-as-spst/C221660.raweasy.json) (unaltered copy of `evidence/R2/C221660.raweasy.json`)
- [C431540.raweasy.json](evidence/001-spdt-switch-inferred-as-spst/C431540.raweasy.json) (unaltered copy of `evidence/R2/C431540.raweasy.json`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed: automatic category did not encode SPDT topology. A validated manufacturer topology option now reaches symbol generation.

## Impact

Lost terminal / incorrect switching semantics could invalidate the power and undervoltage interlock.

## Fix, changed files and verification

Supported --switch-type spdt; three real terminals retained. R2 full importer suite passed; board connectivity verifies pin1 BATTERY_OK, pin2 POWER_SWITCH, pin3 GND.

- `tooling/easyeda-converter/lib/websafe/convert-to-typescript-component/conversion-options.ts`
- `tooling/easyeda-converter/cli/main.ts`
- `tooling/easyeda-converter/tests/convert-to-ts/manufacturer-metadata.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
