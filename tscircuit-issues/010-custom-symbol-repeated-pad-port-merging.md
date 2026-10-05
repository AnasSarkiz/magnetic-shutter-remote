# Custom symbol ports do not correctly merge repeated physical pads

Status: **fixed locally**. Classification: **confirmed core port association bug**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

USB4105-GF-A-120 C5184243; repeated shell/GND contacts

- references/GCT-USB4105-120.pdf
- [https://github.com/tscircuit/core](https://github.com/tscircuit/core)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/core
bun test tests/repros/repro-custom-symbol-repeated-pads.test.tsx
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Logical symbols and every physical land share the correct port; explicit portMap takes priority.

## Actual behavior

Repeated pad/custom-symbol fixture failed before corrected association.

## Logs, geometry and visual evidence

- [custom-repeat-before.log](evidence/010-custom-symbol-repeated-pad-port-merging/custom-repeat-before.log) (unaltered copy of `evidence/R2/custom-repeat-before.log`)
- [custom-repeat-after.log](evidence/010-custom-symbol-repeated-pad-port-merging/custom-repeat-after.log) (unaltered copy of `evidence/R2/custom-repeat-after.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed merge of logical and footprint port clusters did not preserve repeated-pad correspondence.

## Impact

Missing physical routing endpoints and misleading connectivity.

## Fix, changed files and verification

Merge port clusters and prioritize mapping. Regression passed; supplier pin aliases preserved.

- `tooling/core/lib/components`
- `tooling/core/tests/repros/repro-custom-symbol-repeated-pads.test.tsx`

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
