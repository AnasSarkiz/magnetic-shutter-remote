# Known Gerbonara G85 limitation reproduced; USB4215 slots read by pcb-tools

Status: **confirmed** third-party reader limitation; fixture readback **verified** using an already available compatible independent reader. This supplements [original018](../../../tscircuit-issues/018-g85-plated-slot-reader-unsupported.md), which remains unchanged. Not a new tscircuit bug.

## Versions and component

Gerbonara 1.5.0; alternative pcb-tools 0.1.6; exporter circuit-json-to-gerber0.0.109 with preserved R4/R5 slot fixes. GCT USB4215-03-A/C37616412, drawing A, 2024-04-26. [GCT drawing](https://gct.co/files/drawings/usb4215.pdf), [exact JLCPCB part](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412).

## Exact reproduction and input

Run from the R5 project directory, reading only the new isolated fixture:

```sh
tooling/gerber-review-venv/bin/python -c \
  'from gerbonara import ExcellonFile; ExcellonFile.open("evidence/USB4215-import-audit/final/drill-L1-L2.drl")'
tooling/gerber-review-venv/bin/python evidence/USB4215-import-audit/test_slot_cam.py
```

Input is the unmodified [actual Excellon file](../final/drill-L1-L2.drl); its source [Circuit JSON](../final/circuit.json) and authoritative original copper/drill measurements are retained. The second command uses pcb-tools loads directly on original bytes, not a reserialized drill file.

## Expected versus actual

The independent reader should support all four exported inline G85 plated-slot records. Gerbonara warns `G90 header statement found after end of header` and rejects `X4.3199Y1.0250G85X4.3199Y1.8250` as an unknown statement. [Full failure/warning log](../logs/gerbonara-known-g85-limitation.log). This is the same unsupported-reader case documented in 018; a partial Gerbonara preview cannot be called full drill validation.

## Root cause and impact

Confirmed existing reader lacks this inline G85 handling. The native exporter’s distinct historical slot/header defects were resolved before the preserved R5 baseline (reports 024/025); no new exporter defect is inferred from this reader's failure. R5 was neither rebuilt nor modified here. A screenshot of a paste/copper-only preview would not resolve the missing slots, so exact parsed geometry is used instead.

## Resolution and verification

No reader monkey patch, rewritten manufacturing file, warning suppression or relaxed dimensional manufacturing rule. Existing pcb-tools 0.1.6 supports the exported grammar. [test_slot_cam.py](../test_slot_cam.py) checks the M48 header, Plated, 1–2, PTH file function, metric units, exactly 4 slots / 0 round hits, cutter diameters and all endpoints against qualified imported source holes. Its 0.0001 mm bound accounts for four-decimal Excellon coordinate quantization, not physical fabrication tolerance. Four distinct matches, no missing/duplicate slot.

[Passing log](../logs/slots-native-reader-final.log), [measurements](../final/slot-readback.json). The qualification helper was extended to repeat this readback during a clean installed fixture reproduction. This closes the fixture reader gap only; it is not a full R5 CAM/DFM rerun or shell-solder process approval. No tscircuit source file changed for this resolution.
