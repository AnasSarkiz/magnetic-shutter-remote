# Preview imports incompatible with locked native viewers

**Status: fixed locally.**

## Scope and exact producer

Project preview integration; @tscircuit/pcb-viewer 1.11.415, schematic-viewer 2.0.99, 3d-viewer 0.0.610.

No electronic part involved.

## Reproduction and preserved inputs

Run `bun build preview/main.tsx --target browser` from the board root, using the package-lock versions. Compare frozen `77965a8:preview/main.tsx` with current preview/main.tsx.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected: a schema-validated circuit opens using the installed named viewer exports and accepted props. Actual: inherited integration did not match installed export/prop API. This is project integration, not a confirmed upstream geometry defect.

## Root cause, impact and disposition

Current preview/main.tsx uses PCBViewer, SchematicViewer and CadViewer with circuitJson and schema validation. The current native CLI build independently generated PCB/schematic/3D output. Browser interaction is not claimed tested during this order review.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Current preview source](../preview/main.tsx), [locked versions](../package.json), [current build log](../evidence/R7-order-review/build.log).
