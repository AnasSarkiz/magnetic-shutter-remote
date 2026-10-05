#!/bin/sh
set -eu
# Run from the board root. Raw supplier payloads are preserved as evidence.
convert() { bun tooling/easyeda-converter/cli/main.ts convert --input "evidence/R2/$1.raweasy.json" --output "imports/$2.tsx" --output-format tsx ${3+"$3"} ${4+"$4"}; }
convert C431540 MSK12C02 --switch-type spdt
convert C5184243 USB4105_GF_A_120 --insertion-direction from_bottom
convert C295747 S2B_PH_SM4_TB_LF__SN_ --insertion-direction from_bottom
convert C160392 BM06B_SRSS_TB_LF__SN_ --insertion-direction from_above
convert C8545 A_2N7002
convert C19725033 BQ25185DLHR
convert C5219772 TMP390A2DRLR
convert C485802 TPS3839G33DBZR
convert C282505 TCC0603COG470J500CT

# Current R3 qualified USB, unchanged manufacturer geometry and verified mating direction.
bun tooling/easyeda-converter/cli/main.ts convert --input evidence/R3/C2894893.raweasy.json --output imports/HC_TYPE_C_6P_01A.tsx --output-format tsx --insertion-direction from_bottom
