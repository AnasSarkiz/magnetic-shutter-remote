# Native browser evaluation did not include the locally corrected core

Status: **fixed locally**.

## Affected package and exact revision

@tscircuit/runframe 0.0.2883, base 48a7cdbf6092aa7fce9e5bc8008a547a2d9b6c92; @tscircuit/eval 0.0.1506, base 1dbe9496d23b915ba3d7576f4e4608fefae57871; local core 0.0.2035 base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0.

## Component and authoritative sources

All parts; engine integration rather than supplier geometry. [Official runframe source](https://github.com/tscircuit/runframe), [eval](https://github.com/tscircuit/eval).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
cd tooling/eval
bun install --frozen-lockfile
bun run build
cd ../runframe
bun install --frozen-lockfile
bun test tests/standalone-matching-worker.test.ts
bun run build:css
bun run build:standalone
cd ../..
RUNFRAME_STANDALONE_FILE_PATH="$PWD/tooling/runframe/dist/standalone.min.js" node_modules/.bin/tsci dev --port 3026
```

## Expected behavior

The supported local standalone build should use its matching eval worker and corrected core, preserving an explicitly injected worker URL when provided.

## Actual behavior

Initially the source viewer emitted Duplicate fanout exit U1.pin5. An already loaded older worker later emitted eight false TEMP_OK attribution errors while the corrected CLI build had zero. Reloading the rebuilt matching bundle cleared these errors. A server-file hash alone did not prove which engine was already loaded in the tab.

## Logs, screenshots and measurements

[Worker regression](../evidence/R3/runframe-matching-worker-test.log), [canonical eval build](../evidence/R3/eval-attribution-build.log), [standalone build](../evidence/R3/runframe-attribution-build.log), [final native 3D PNG](../dist/index/3d.png). Source tab reloaded and inspected with zero errors on 2026-10-02; then actual 3D was inspected.

## Root cause: confirmed facts and hypotheses

Confirmed: standalone with no explicit injection used a CDN worker independently of task-local core/eval. Confirmed: the old worker persisted in an open tab until reload. Hypothesis about old package caches is kept separate from this browser-lifetime observation.

## Impact

Editing source in the viewer could show incorrect errors or geometry compared with the CLI.

## Fix details, changed source and regression tests

Changed runframe lib/utils/resolve-standalone-worker-blob-url.ts and lib/components/RunFrameWithApi/standalone.tsx. Added tests/standalone-matching-worker.test.ts covering packaged matching worker and explicit injection. Locked compatible core/eval/schema/props/capacity packages. Build and regression pass; supported CLI RUNFRAME_STANDALONE_FILE_PATH serves the actual bundle. No DOM/browser-data patch or generated circuit patch.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.

## R5 matching-engine verification

R5 eval 0.0.1506 and runframe 0.0.2883 are rebuilt with the explicit R5 core/schema/props archives. [Exact locks/archive identities](../tooling/revisions-r5.json), [eval build](../evidence/R5/eval-build.log), [runframe build](../evidence/R5/runframe-build.log), [matching-worker regression](../evidence/R5/runframe-regression.log). Local source URL port 3028 was opened in a fresh tab: native PCB shows 0 errors and native 3D displays the correct functional labels and TOP-only assembly. No old CDN worker is used as R5 evidence.
