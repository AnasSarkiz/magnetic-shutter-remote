# Saved custom-symbol port selector cannot resolve actual port

Status: **fixed locally**. Classification: **confirmed core selector bug**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

2N7002 C8545

- [https://github.com/tscircuit/core](https://github.com/tscircuit/core)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/core
bun test tests/repros/repro-symbol-port-selector.test.tsx
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

getPortSelector resolves to the same actual port, including symbol ancestry.

## Actual behavior

Expected port .pin1; circuit.selectOne returned null in regression.

## Logs, geometry and visual evidence

- [selector-before.log](evidence/011-custom-symbol-selector-round-trip/selector-before.log) (unaltered copy of `evidence/R2/selector-before.log`)
- [selector-after.log](evidence/011-custom-symbol-selector-round-trip/selector-after.log) (unaltered copy of `evidence/R2/selector-after.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed selector omitted the symbol hierarchy; cached paths used stale selector information.

## Impact

Saved routes could fail to reconnect to actual physical endpoints.

## Fix, changed files and verification

Include > symbol in selectors, use live selectors and increment cache orientation version. Round-trip regression passed. Branch cache issue remains separate.

- `tooling/core/lib/components/primitive-components/Port.ts`
- `tooling/core/lib/components/normal-components/Group`
- `tooling/core/tests/repros/repro-symbol-port-selector.test.tsx`

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
