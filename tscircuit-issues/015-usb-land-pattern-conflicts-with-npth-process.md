# Manufacturer USB land pattern fails JLC NPTH clearance

Status: **confirmed**. Classification: **manufacturing limitation, not a tscircuit defect**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

GCT USB4105-GF-A-120 C5184243

- [https://jlcpcb.com/blog/npth-design-guide](https://jlcpcb.com/blog/npth-design-guide)
- references/GCT-USB4105-120.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
tooling/gerber-review-venv/bin/python scripts/measure-j1-export.py
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

NPTH to all copper >=0.2mm for the selected fabrication process, including same-footprint SMT lands.

## Actual behavior

Exported right locator pcb_hole_1 to J1 pin7/GND2: 0.175263821mm. Left locator: 0.175268908mm. Manufacturer nominal 0.175099990mm.

## Logs, geometry and visual evidence

- [j1-export-metrology.json](evidence/015-usb-land-pattern-conflicts-with-npth-process/j1-export-metrology.json) (unaltered copy of `evidence/R3/j1-export-metrology.json`)
- [j1-export-metrology.log](evidence/015-usb-land-pattern-conflicts-with-npth-process/j1-export-metrology.log) (unaltered copy of `evidence/R3/j1-export-metrology.log`)
- [j1-clearance-annotated.png](evidence/015-usb-land-pattern-conflicts-with-npth-process/j1-clearance-annotated.png) (unaltered copy of `evidence/R3/j1-clearance-annotated.png`)
- [USB4105_GF_A_120.tsx](evidence/015-usb-land-pattern-conflicts-with-npth-process/USB4105_GF_A_120.tsx) (unaltered copy of `evidence/R3/R2-inputs/imports/USB4105_GF_A_120.tsx`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed exported source agrees with manufacturer nominal pattern within CAD quantization. Therefore the process conflict is real; it is not fixed by changing a check or pad.

## Impact

R2 fabrication was blocked.

## Fix, changed files and verification

R3 selects supported import C5252714 with no locating holes and manufacturer-matching pads/slots. Original R2 source/export evidence preserved.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
