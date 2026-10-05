# Reference outside symbol bounds loses its owner

Status: **fixed locally**. Classification: **tscircuit core rendering**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

2N7002 C8545

- [https://docs.tscircuit.com/](https://docs.tscircuit.com/)
- references/C8545-manufacturer.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/core
bun install --frozen-lockfile
bun test tests/repros/repro-symbol-reference-owner.test.tsx
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Custom text belongs to its enclosing component, including when outside body bounds.

## Actual behavior

R2 reference ownership reproduction failed before source fix; schematic text was not associated correctly.

## Logs, geometry and visual evidence

- [core-refdes-before.log](evidence/003-custom-symbol-reference-owner-outside-bounds/core-refdes-before.log) (unaltered copy of `evidence/R2/core-refdes-before.log`)
- [core-regression-final.log](evidence/003-custom-symbol-reference-owner-outside-bounds/core-regression-final.log) (unaltered copy of `evidence/R2/core-regression-final.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed: ownership inferred from spatial bounds rather than explicit symbol ancestry.

## Impact

Reference placement and display could be wrong even after importer supplied refdes.

## Fix, changed files and verification

CustomSchematicText associates the true owner. Focused regression and visual snapshot passed.

- `tooling/core/lib/components/primitive-components`
- `tooling/core/tests/repros/repro-symbol-reference-owner.test.tsx`

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
