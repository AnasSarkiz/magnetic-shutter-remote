# AL1793 supplier copper differs from manufacturer land pattern

**Status: confirmed.**

## Scope and exact producer

Supplier library data; easyeda converter0.0.364 reproduces the supplier model.

Diodes AL1793AFE-13 / C67354; [JLC listing](https://jlcpcb.com/partdetail/C67354).

## Reproduction and preserved inputs

Run `node_modules/.bin/tsci import C67354`; build the isolated component audit and compare the untouched import with the manufacturer land drawing. Preserved original import is linked below.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected manufacturer row spacing2.7 mm and lead width0.35 mm. Supplier/imported geometry uses row spacing3.0 mm and lead width0.30 mm. Import fidelity does not qualify this footprint.

## Root cause, impact and disposition

Confirmed drawing-to-supplier discrepancy; no evidence the converter introduced it. Not fitted. No substitute footprint or silent geometry correction created. Manufacturer/supplier correction would be required if this part were selected.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Original import](evidence/068-al1793-land-pattern/original-import.tsx), [drawing image](evidence/068-al1793-land-pattern/manufacturer-land-pattern.png), [manufacturer PDF](../references/R7/Diodes-AL1793-DS37957-3-2.pdf), [import log](../evidence/R7-components/AL1793-import.log).
