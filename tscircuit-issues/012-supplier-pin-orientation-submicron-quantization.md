# Rotation inference rejects submicron supplier row rounding

Status: **fixed locally**. Classification: **confirmed orientation classification sensitivity**.

## Affected package and revision

`circuit-json-util` 0.0.117, upstream base `387e3a0f103a5c4a5665925d01617e12f5194ae2`. Local source and exact locks are included under `tooling/circuit-json-util`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

JST S2B-PH-SM4-TB(LF)(SN) C295747; supplier orientation fixtures

- [https://github.com/tscircuit/circuit-json-util](https://github.com/tscircuit/circuit-json-util)
- references/JST-PH.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/circuit-json-util
bun test tests/analyze-pcb-pin1-location.test.ts
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Infer orientation of a nominal row despite submicron quantization; continue rejecting true 0.01mm staggering.

## Actual behavior

Expected bottomside_left; received null for 0.000127mm row rounding.

## Logs, geometry and visual evidence

- [orientation-before.log](evidence/012-supplier-pin-orientation-submicron-quantization/orientation-before.log) (unaltered copy of `evidence/R2/orientation-before.log`)
- [util-tests.log](evidence/012-supplier-pin-orientation-submicron-quantization/util-tests.log) (unaltered copy of `evidence/R2/util-tests.log`)

Visual regressions remain alongside their source tests under `tooling/circuit-json-util/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed exact-coordinate grouping treated quantized row as non-collinear.

## Impact

Strict JLCPCB CPL rotation resolution failed.

## Fix, changed files and verification

Quantize orientation classification to 1µm, without changing actual pad coordinates. Four rotations and true staggering covered; 141 tests passed.

- `tooling/circuit-json-util/lib/analyze-pcb-pin1-location.ts`
- `tooling/circuit-json-util/tests/analyze-pcb-pin1-location.test.ts`

Exact local patches: [package patch](../tooling/patches/circuit-json-util.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
