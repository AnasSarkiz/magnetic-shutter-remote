# Native development viewer recursively loads task tooling and its own output log

Status: **confirmed**.

## Affected package and exact revision

Project tscircuit.config.json; CLI 0.1.2212 / runframe 0.0.2883. Classification: project file-watch configuration error, not a confirmed tscircuit defect.

## Component and authoritative sources

No purchased component. [CLI configuration](https://docs.tscircuit.com/).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
# Original task included many tooling source directories in the default file tree.
node_modules/.bin/tsci dev --port 3026 > evidence/R3/tscircuit-viewer.log 2>&1
# Current supported config restricts only viewer file-watch scope.
RUNFRAME_STANDALONE_FILE_PATH="$PWD/tooling/runframe/dist/standalone.min.js" node_modules/.bin/tsci dev --port 3026 > /private/tmp/magnetic-shutter-r3-viewer-locked.log 2>&1
```

## Expected behavior

A board viewer needs the board entry, imports and source; supporting dependency checkouts, archived failures and its own changing log should not trigger repeated board evaluation.

## Actual behavior

Nested tooling/evidence files inflated the file list; project-local log writes retriggered file changes. The first viewer log grew to approximately 16 MiB.

## Logs, screenshots and measurements

Original logs retained in evidence/R3/tscircuit-viewer.log and tscircuit-viewer-3024.log. [Corrected config](../tscircuit.config.json). These logs contain no credentials; raw supplier listing HTML is excluded from the deliverable.

## Root cause: confirmed facts and hypotheses

Confirmed task-local recursion. A general CLI watcher bug is not established.

## Impact

Viewer responsiveness and reliable source evaluation.

## Fix details, changed source and regression tests

Use the documented ignoredFiles configuration for non-design folders and keep running log in /private/tmp. Source/imports are not ignored. This does not disable validation or checks; all required checks were separately run from the board root.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
