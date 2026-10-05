# Core emits PCB fields incompatible with Circuit JSON schema

Status: **fixed locally**. Classification: **confirmed cross-package schema incompatibility**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

Not component-specific; board hole and imported component fixture

- [https://github.com/tscircuit/circuit-json](https://github.com/tscircuit/circuit-json)
- [https://github.com/tscircuit/core](https://github.com/tscircuit/core)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/core
bun test tests/repros/repro-pcb-schema-export.test.tsx
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

The entire emitted Circuit JSON parses with any_circuit_element.array(); distance offsets use accepted unit strings and absent optional holes use undefined.

## Actual behavior

Expected display_offset_x "-2mm", received numeric -2. Optional holes included null in incompatible fields.

## Logs, geometry and visual evidence

- [core-schema-before.log](evidence/008-pcb-render-schema-offset-and-optional-hole-fields/core-schema-before.log) (unaltered copy of `evidence/R2/core-schema-before.log`)
- [core-schema-after.log](evidence/008-pcb-render-schema-offset-and-optional-hole-fields/core-schema-after.log) (unaltered copy of `evidence/R2/core-schema-after.log`)
- [core-regression-final.log](evidence/008-pcb-render-schema-offset-and-optional-hole-fields/core-regression-final.log) (unaltered copy of `evidence/R2/core-regression-final.log`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed emitted core representations disagreed with installed schema.

## Impact

Fabrication converters could reject or drop geometry; schema validation blocked.

## Fix, changed files and verification

Correct producer representation; no circuit JSON patching. Schema regression and focused core tests passed.

- `tooling/core/lib/components/base-components`
- `tooling/core/lib/components/primitive-components`
- `tooling/core/tests/repros/repro-pcb-schema-export.test.tsx`

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.

## R4 audit-consumer integration note — resolved project invocation

A read-only legend attribution helper initially imported the canonical Gerber converter's TypeScript source into the board typecheck. This is a project integration mistake, not a new confirmed converter defect: the converter's own installed Circuit JSON is 0.0.487 whereas the board is locked to corrected 0.0.509; the broader board material union includes `flex`, and direct cross-repository compilation also lacks the converter's `src/*` alias. Exact errors: TS2322 (`"flex"` not assignable to `"fr4" | "fr1"`) and TS2307 (`src/gerber/any_gerber_command`). No type escape, weakened typecheck or dependency substitution was used.

Original [helper input](../evidence/R4/legend-source-import-failure.ts) and [actual failure log](../evidence/R4/legend-direct-source-typecheck-failure.log) preserved. Reproduce from the board root by copying that exact helper to `scripts/render-legend-review.repro.ts` and running `node_modules/.bin/tsc --noEmit`; remove only that newly created reproduction file afterwards. Corrected workflow: `tooling/gerber-review-venv/bin/python scripts/render-legend-review.py` invokes the supported built converter CLI on selected original board/text review fixtures. Original full Circuit JSON is not changed; all isolated glyph geometry is verified against the complete original TOP legend. Final board format/typecheck pass. This records a resolved invocation error, not a claim that arbitrary cross-source package versions became interchangeable.
