# Default LED paste scaling differs from manufacturer stencil recommendation

**Status: confirmed.**

## Scope and exact producer

Project stencil selection / core 0.0.2035 default paste scaling.

ams OSRAM GW VJLPL1.CM-LTLV-XX58-1-350-R18 / C34478671 and GW VJLPL1.CM-K3LX-XX51-1-350-R18 / C34312856; [JLC warm](https://jlcpcb.com/partdetail/C34478671), [JLC cool](https://jlcpcb.com/partdetail/C34312856).

## Reproduction and preserved inputs

Build fixtures/r7/component-audit.circuit.tsx and fixtures/r7/led-stencil-audit.circuit.tsx with `node_modules/.bin/tsci build <file> --pcb-svgs`; then `bun scripts/audit-r7-led-fixtures.ts`.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Manufacturer nominal paste 0.45 x1.25 mm with documented tolerance. Default 0.7 linear scaling produced about0.35 x0.94501 mm and did not meet the recommendation. This is a default versus part-specific recommendation discrepancy, not proof of an importer bug.

## Root cause, impact and disposition

Native parent paste treatment -0.025 mm in the isolated fixture yields0.449999 x1.30001 mm within the documented tolerance. No supplier import modified. Torch abandoned; fixture not fabrication-qualified.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Manufacturer PDF](../references/R7/OSRAM-GW-VJLPL1-CM-supplier.pdf), [measured fixture](../evidence/R7-components/led-fixture-audit.json), [fixture source](../fixtures/r7/led-stencil-audit.circuit.tsx).
