# Branched route cannot be saved as a simple endpoint path

Status: **suspected**. Classification: **observed warning; root cause not confirmed**.

## Affected package and revision

`core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`. Local source and exact locks are included under `tooling/core`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

USB connector J1; previously C5184243

- [https://github.com/tscircuit/core](https://github.com/tscircuit/core)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
bunx tsci build index.circuit.tsx --pcb-png
# See preserved R2 source/circuit under evidence/R3/R2-inputs for original warning.
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Complete branched routing geometry should serialize without a false endpoint-path failure.

## Actual behavior

Could not save autorouting paths for subcircuit_source_group_0: Saved phase path ".J1 > port.EH1" must end at another connection endpoint; use autorouter="fanout" for saved escapes.

## Logs, geometry and visual evidence

- [R2-final-build.log](evidence/014-branched-route-cache-path-incomplete/R2-final-build.log) (unaltered copy of `evidence/R2/R2-final-build.log`)
- [remote-circuit.tsx](evidence/014-branched-route-cache-path-incomplete/remote-circuit.tsx) (unaltered copy of `evidence/R3/R2-inputs/src/remote-circuit.tsx`)

Visual regressions remain alongside their source tests under `tooling/core/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed warning, generated copper exists. Hypothesis: branched physical port cluster is reduced to a simple path. Root cause not yet demonstrated with a reduced fixture.

## Impact

Fresh builds may reroute; cache stability is unverified. Native connectivity success does not prove cache serialization correct.

## Fix, changed files and verification

Open. No cache warning is suppressed or claimed fixed. R2 failing source and actual output preserved.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/core.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.

## Final R3 disposition (2026-10-02)

Warning remains explicit: port-only replay API cannot serialize global junction/breakout-exit routes. It does not suppress routing errors. No saved global cache path is used by this design; repeat native source builds, checks and snapshot generation passed. Fresh recomputation is accepted for R3.
