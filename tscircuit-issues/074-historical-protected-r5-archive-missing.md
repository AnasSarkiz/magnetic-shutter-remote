# Protected historical R5 DFM-review archive missing

**Status: confirmed.**

## Scope and exact producer

Project evidence preservation; no tscircuit package blamed.

No component issue; current shutter PCB unaffected.

## Reproduction and preserved inputs

Read evidence/R6/START-FROM-R5.json, SHA-check each R4/R5 path read-only, and run `bun run test`. See protected-baselines.json.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected all972 historical protected files present and matching. Actual971 match; original R5 deliverables/magnetic-shutter-remote-R5-DFM-REVIEW.zip is absent. Expected200029545 bytes/SHA256 a969feb5a1760ed802f26e5e76807687a73552a394f2e25d6acf46a022b2ea3f.

## Root cause, impact and disposition

Absence confirmed; deletion time and cause unknown. No claim of pre-existing cause without evidence. Original directories were not modified during this order review. Preservation assertion remains failing. Restore exact archive from backup under separately authorized original-project recovery; do not rebuild a different ZIP and call it identical.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Current preservation measurement](../evidence/R7-order-review/protected-baselines.json), [unaltered failing test](../evidence/R7-order-review/board-tests.log), [R6 original preservation pass](../evidence/R6/protected-baselines.json), [R6 current files unchanged](../evidence/R7-order-review/R6-preservation.json).

Related missing historical fixture: `evidence/R3/R2-inputs/dist/index/circuit.json` is absent, so existing `test_real_r2_j1_detected` reports SKIPPED. No input was invented or substituted. Current board audit still executes; this negative historical regression is NOT RUN.
