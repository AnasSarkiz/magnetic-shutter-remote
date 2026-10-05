# Mixed pad shapes use inconsistent Y bounds and port grouping

**Status: fixed locally.**

## Scope and exact producer

@tscircuit/core0.0.2035; extends qualified USB toolchain8c7d5a5; local archive hashed separately.

UMW PT4115 / C347356. Rectangular and pill ground pads in supplier import.

## Reproduction and preserved inputs

From tooling/r7-core-source: `bun test tests/repros/r7/mixed-pad-bounds-convention.test.tsx tests/repros/r7/separated-mixed-ground-pads.test.tsx tests/repros/r7/pt4115-overlapping-ground-pads.test.tsx`. Original SmtPad-control.ts and raw import preserved below.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected intersecting pads to share the same PCB port and separated pads not to intersect. Actual circle/pill/rotated branches inverted Y bounds relative to rect/polygon; overlapping PT4115 grounds (physical overlap0.1645412 mm) were treated as separate ports.

## Root cause, impact and disposition

Four bounds branches in lib/components/primitive-components/SmtPad.ts corrected to common PCB Y convention. No same-component DRC exemption. Control:2 fail/1 pass; fix:3 pass/204 assertions; broader focused7 tests/219 assertions pass. Canonical core typecheck/build pass. Generic core fix, not supplier geometry correction.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Original source](evidence/071-smtpad-bounds/SmtPad-control.ts), [before build](evidence/071-smtpad-bounds/before-build.log), [before image](evidence/071-smtpad-bounds/pt4115-overlapping-ground-pads.png), [separated-pad image](evidence/071-smtpad-bounds/separated-mixed-ground-pads.png), [control tests](../evidence/R7-components/core-bounds-control-tests.log), [fixed tests](../evidence/R7-components/core-bounds-fixed-tests.log), [focused tests](../evidence/R7-components/core-bounds-focused-regression-idle.log), [fixed source](../tooling/r7-core-source/lib/components/primitive-components/SmtPad.ts).
