# JST eight-position connector shell lands disagree with catalogue

**Status: confirmed.**

## Scope and exact producer

Supplier CAD data; easyeda0.0.364 import preserves supplied geometry.

JST BM08B-SRSS-TB(LF)(SN) / C160394; [JLC listing](https://jlcpcb.com/partdetail/C160394).

## Reproduction and preserved inputs

Run `node_modules/.bin/tsci import C160394` and compare untouched imports/BM08B_SRSS_TB_LF__SN_.tsx against JST SH catalogue. Seven-position comparison: `tooling/gerber-review-venv/bin/python scripts/audit_r7_jst7.py`.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Supplier eight-position shell lands1.5 x2.0 mm versus JST1.2 +/-0.1 x1.8 +/-0.1 mm. Expected land dimensions within published drawing tolerances. Not a proven converter error.

## Root cause, impact and disposition

Eight-position part not fitted; no manual patch. Seven-position C160393 matches its published copper geometry but belongs only to cancelled emitter investigation. Neither changes main R6/R7 BOM.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[JST catalogue](../references/R7/JST-eSH.pdf), [supplier import](../imports/BM08B_SRSS_TB_LF__SN_.tsx), [import log](../evidence/R7-components/JST8-import.log), [seven-position measurement](../evidence/R7-components/JST7-land-audit.json).
