# Custom transistor symbol omits dynamic reference label

Status: **fixed locally**. Classification: **tscircuit importer rendering**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

Jiangsu Changjing 2N7002 C8545

- [https://jlcpcb.com/partdetail/2N7002/C8545](https://jlcpcb.com/partdetail/2N7002/C8545)
- references/C8545-manufacturer.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun install --frozen-lockfile
bun test tests/convert-to-ts/custom-symbol-refdes.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Imported symbol displays the assigned Q1/Q2 reference without replacing gate/source/drain geometry.

## Actual behavior

The original custom symbol lacked dynamically generated refdes text.

## Logs, geometry and visual evidence

- [mosfet-render.log](evidence/002-transistor-import-missing-reference-label/mosfet-render.log) (unaltered copy of `evidence/R2/mosfet-render.log`)
- [importer-final-full.log](evidence/002-transistor-import-missing-reference-label/importer-final-full.log) (unaltered copy of `evidence/R2/importer-final-full.log`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed in generated symbol conversion; source generator lacked a reference-text element.

## Impact

Schematic visual identification was missing; pin geometry itself was not corrected by a fabricated symbol.

## Fix, changed files and verification

Generator adds the dynamic reference. Snapshot changes reviewed in R2; full suite 308 passed.

- `tooling/easyeda-converter/lib/websafe/convert-to-typescript-component`
- `tooling/easyeda-converter/tests/convert-to-ts/custom-symbol-refdes.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
