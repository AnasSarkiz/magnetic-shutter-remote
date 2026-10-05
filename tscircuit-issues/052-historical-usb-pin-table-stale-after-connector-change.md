# Historical electrical report contains the previous USB connector pin table

Status: **fixed locally**. Classification: **project documentation mistake, not a tscircuit bug**.

## Affected project/version

R2 electrical qualification retained through R4 baseline `f8ae7e3fce74b77731783d1ffc061562bb439e04`; current supported import easyeda-converter 0.0.364, core 0.0.2035. Exact R5 libraries/source hashes: [manifest](../tooling/revisions-r5.json).

## Component and sources

Current J1: HCTL HC-TYPE-C-6P-01A, C2894893, six SMT contacts/four plated shell tabs. [JLC part](https://jlcpcb.com/partdetail/HC_TYPE_C_6P_01A/C2894893), [manufacturer drawing](../references/C2894893-manufacturer.pdf), [unchanged supported import](../imports/HC_TYPE_C_6P_01A.tsx), [raw supplier input](../evidence/R3/C2894893.raweasy.json). Drawing/library approval remains separately OPEN in issue 042.

## Minimal reproduction and inputs

From the R5 root:

```sh
python3 scripts/review-r5-usb-pins.py
```

Required input is the complete unmodified `dist/index/circuit.json`. Compare the emitted table to the USB paragraph of [preserved R2 report](../evidence/R2/ELECTRICAL-QUALIFICATION.md). The current circuit and old report are retained; no old report is silently rewritten.

## Expected behavior

Current documentation must match the exact fitted connector and its manufacturer contact names: shell 1-4 GND; 5/A12 GND; 6/A9 VBUS; 7/B5 CC2; 8/A5 CC1; 9/B9 VBUS; 10/B12 GND. Independent 5.1 kohm CC pull-downs permit either plug orientation electrically.

## Actual behavior and before/after evidence

The old R2 paragraph describes VBUS 6/8 and data/SBU 10-14/16, corresponding to the earlier connector. For current HCTL pin8 is CC1, pin9 is the second VBUS contact, and those data/SBU terminals do not exist. The actual R4/R5 source wiring is correct; the mismatch is documentary.

[Exact 10/10 current table](../evidence/R5/usb-pin-registration.json), [executed output](../evidence/R5/usb-pin-registration.log), [native schematic](../dist/index/schematic_sheet_0.svg) and [old paragraph](../evidence/R2/ELECTRICAL-QUALIFICATION.md) are local evidence. No physical result is claimed.

## Root cause

Confirmed: the historical electrical report was retained after J1 changed in R3. The source/import and measured port names already agree. No converter corruption or electrical miswire is inferred.

## Impact

Using the old paragraph for probing or programming a manufacturing checklist could confuse CC1 and VBUS. Current source connectivity and fabrication copper are unaffected.

## Fix, files and regression verification

Added `scripts/review-r5-usb-pins.py` as an exact current-source audit and a superseding table in `R5-QUALIFICATION.md`. All 10 current terminals/rails are checked; the earlier R2 report remains historical evidence. Both independent CC circuits and source netlist checks pass. No component definition, footprint, pin mapping, source wire or generated Circuit JSON was edited.

## Remaining blocker

Exact HCTL expanded lands and shell solder process remain pre-fabrication blockers. Physical plug fit and charging in both orientations are POST-PROTOTYPE PHYSICAL VALIDATION.
