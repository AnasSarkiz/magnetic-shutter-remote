# Schema parsing strips native schematic sheet metadata

Status: **fixed locally**. Classification: **confirmed schema metadata omission**.

## Affected package and revision

`circuit-json` 0.0.509, upstream base `f77697ec477bf173b13f6da2f92e82fc45969cf4`. Local source and exact locks are included under `tooling/circuit-json`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

Not component-specific

- [https://github.com/tscircuit/circuit-json](https://github.com/tscircuit/circuit-json)
- [https://docs.tscircuit.com/](https://docs.tscircuit.com/)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/circuit-json
bun install --frozen-lockfile
bun test tests/schematic-sheet-render-metadata.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Native A4 sheet display_name and centre metadata survive schema parse.

## Actual behavior

The metadata fields were absent from the union schema and were stripped by parsing.

## Logs, geometry and visual evidence

- [sheet-schema-before.log](evidence/009-schematic-sheet-schema-strips-metadata/sheet-schema-before.log) (unaltered copy of `evidence/R2/sheet-schema-before.log`)
- [schema-build-final.log](evidence/009-schematic-sheet-schema-strips-metadata/schema-build-final.log) (unaltered copy of `evidence/R2/schema-build-final.log`)

Visual regressions remain alongside their source tests under `tooling/circuit-json/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed schema did not model renderer-provided sheet fields.

## Impact

A4 sheet previews/export labels lost information.

## Fix, changed files and verification

Model actual sheet fields; schema suite 400 tests / 1892 assertions passed.

- `tooling/circuit-json/lib`
- `tooling/circuit-json/tests/schematic-sheet-render-metadata.test.ts`

Exact local patches: [package patch](../tooling/patches/circuit-json.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
