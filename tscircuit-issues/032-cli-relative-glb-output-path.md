# Relative GLB output is resolved under the input directory

Status: **suspected**.

## Affected package and exact revision

@tscircuit/cli 0.1.2212 bundled by tscircuit 0.0.2702.

## Component and authoritative sources

No specific supplier component. [CLI](https://github.com/tscircuit/cli).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
node_modules/.bin/tsci export dist/index/circuit.json --format glb --output dist/index/board.glb
# Explicit absolute output is unambiguous:
node_modules/.bin/tsci export dist/index/circuit.json --format glb --output "$PWD/dist/index/board.glb"
```

## Expected behavior

An explicitly supplied relative output needs a clear documented base directory. The user should not receive apparent output success when no file exists.

## Actual behavior

Error writing file: Error: ENOENT: no such file or directory, open dist/index/dist/index/board.glb. Absolute output generated an actual current 5.4 MiB GLB.

## Logs, screenshots and measurements

[Observed failure](../evidence/R3/R3-export-glb.log), [supported help](../evidence/R3/export-help.txt), [absolute-output success](../evidence/R3/final-export-glb.log), [actual GLB](../dist/index/board.glb).

## Root cause: confirmed facts and hypotheses

Confirmed observed nested path. Whether input-relative output is intended CLI semantics remains unresolved; not classified as a confirmed exporter geometry bug.

## Impact

Missing/stale 3D output may be mistaken for the current revision.

## Fix details, changed source and regression tests

Use the supported absolute output argument. No package patch or geometry workaround. New GLB generated, file existence checked, and native 3D inspected.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
