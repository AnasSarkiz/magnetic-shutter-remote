# Local package archive reuse and missing installed core binary

Status: **suspected**.

## Affected package and exact revision

Bun 1.3.9 local-file dependency integration; @tscircuit/core 0.0.2035. Classification: observed local tooling/cache behavior, not a confirmed tscircuit bug.

## Component and authoritative sources

No purchased component. All working source and locks are retained.

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
# Canonical packages have unique archive filenames; never overwrite an identified archive.
bun install --offline --force
node_modules/.bin/tsci check source index.circuit.tsx
```

## Expected behavior

Installing a local archive should expose its actual built JavaScript. Subsequent command wrappers should not leave the locked dependency unusable.

## Actual behavior

A reused same-version archive retained an old installed binary; a later bunx tsci execution was followed by Cannot find module @tscircuit/core and a missing dist/index.js. Cause of that disappearance was not proven.

## Logs, screenshots and measurements

[Install evidence](../evidence/R3/root-pth-install.log), [offline restoration](../evidence/R3/root-pth-install-force.log), [unique attribution install](../evidence/R3/root-attribution-install.log), [exact current package](../package.json).

## Root cause: confirmed facts and hypotheses

Observed binary mismatch/missing file; Bun cache or wrapper behavior is a hypothesis. No reliable standalone reproduction of the disappearance was obtained. Exact observed sequence is preserved, not claimed deterministic.

## Impact

Could silently run older fixes or prevent any validated build.

## Fix details, changed source and regression tests

Pack canonical source builds under unique filenames, lock the exact graph, compare installed/build hashes, and invoke the project-local tsci binary. No installed-module patch or copied implementation shortcut. Final source/build checks pass; unresolved generic cache behavior remains suspected.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
