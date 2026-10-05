# Supplier download CLI exits zero after a failed lookup

Status: **fixed locally**. Classification: **confirmed tscircuit CLI error propagation bug**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

GCT USB4135-GF-A C5438410 unavailable in supplier CAD search

- [https://jlcpcb.com/partdetail/USB4135_GFA/C5438410](https://jlcpcb.com/partdetail/USB4135_GFA/C5438410)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun test tests/cli-tests/download-error-exit.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Missing exact supplier library component produces nonzero exit and no import file. No substitute component is fetched.

## Actual behavior

C5438410 lookup printed Component not found in EasyEDA library search but exited 0.

## Logs, geometry and visual evidence

- [C5438410-retry.log](evidence/019-download-cli-reports-success-on-failure/C5438410-retry.log) (unaltered copy of `evidence/R3/C5438410-retry.log`)
- [importer-cli-regression.log](evidence/019-download-cli-reports-success-on-failure/importer-cli-regression.log) (unaltered copy of `evidence/R3/importer-cli-regression.log`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed CLI catch logged the error without setting process.exitCode. Library itself correctly rejects absent CAD.

## Impact

Automation can continue as if an import succeeded. Missing CAD is a separate sourcing/input blocker.

## Fix, changed files and verification

Set exitCode=1 and narrow unknown error correctly; deterministic mocked subprocess regression passes 1 test / 4 assertions, no network.

- `tooling/easyeda-converter/cli/main.ts`
- `tooling/easyeda-converter/tests/cli-tests/download-error-exit.test.ts`
- `tooling/easyeda-converter/tests/cli-tests/missing-component-preload.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
