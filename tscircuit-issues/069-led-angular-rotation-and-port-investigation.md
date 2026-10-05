# Angular LED rotation and port association investigation

**Status: suspected.**

## Scope and exact producer

core0.0.2035 / importer0.0.364; project emitter placement.

OSRAM LEDs C34478671/C34312856 as in067.

## Reproduction and preserved inputs

Build preserved evidence/069-emitter-ports-and-rotation/failing-fill-light-ring.tsx (restore its original relative imports in an isolated fixture), or inspect its original build log. Compare against fixtures/r7/component-audit.circuit.tsx and the isolated orthogonal placement.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Original angular placement produced low footprint IoU (approximately0.53) and emitter port/placement failures. Expected supplier geometry and correct pin association under rotation. Exact angular transform root cause has not been isolated; an unexplained failure is not a confirmed tscircuit defect.

## Root cause, impact and disposition

Orthogonal isolated LED geometry checks pass. Project sector placement was adjusted during investigation, but the emitter board stayed unrouted/unqualified and is now cancelled. No general angular-rotation fix claimed.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Failing source](evidence/069-emitter-ports-and-rotation/failing-fill-light-ring.tsx), [original log](evidence/069-emitter-ports-and-rotation/before-build.log), [isolated audit](../evidence/R7-components/led-fixture-audit.json).
