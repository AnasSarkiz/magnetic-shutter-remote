# Plated holes generate unrequested stencil paste on both faces

Status: **fixed locally**. Classification: **confirmed core fabrication geometry bug**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

USB4105-GF-A-120 C5184243; shell plated slots

- [https://jlcpcb.com/help/article/smt-stencil-data-prepared-for-smt-orders](https://jlcpcb.com/help/article/smt-stencil-data-prepared-for-smt-orders)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/core
bun test tests/repros/repro-plated-hole-unrequested-paste.test.tsx
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

No paste for a plated hole unless explicitly supplied by a qualified process/source design.

## Actual behavior

Default plated-hole rendering emitted top and bottom paste apertures.

## Logs, geometry and visual evidence

- [plated-paste-before.log](evidence/013-plated-holes-create-unrequested-paste/plated-paste-before.log) (unaltered copy of `evidence/R2/plated-paste-before.log`)
- [plated-paste-after.log](evidence/013-plated-holes-create-unrequested-paste/plated-paste-after.log) (unaltered copy of `evidence/R2/plated-paste-after.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed automatic default paste generation.

## Impact

Bottom stencil falsely implied assembly and shell solder volume was unqualified.

## Fix, changed files and verification

Remove automatic paste; retain explicit native paste support. Regression passed. Hybrid shell solder process remains a manufacturing-process question.

- `tooling/core/lib/components/primitive-components/PlatedHole.ts`
- `tooling/core/tests/repros/repro-plated-hole-unrequested-paste.test.tsx`

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
