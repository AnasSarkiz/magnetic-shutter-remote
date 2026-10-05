# E73 pin-3 supplier land shifted from manufacturer nominal

Status: **confirmed**. Classification: **supplier CAD discrepancy, not a converter bug**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

Ebyte E73-2G4M08S1C C356849

- [https://jlcpcb.com/partdetail/E73_2G4M08S1C/C356849](https://jlcpcb.com/partdetail/E73_2G4M08S1C/C356849)
- references/E73-2G4M08S1C-manufacturer.pdf

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
python3 scripts/audit-radio.py
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Manufacturer nominal pitch and supplier pad geometry must be compared, not assumed correct from import success.

## Actual behavior

Pin 3 supplier land displaced −0.02484mm from nominal pitch.

## Logs, geometry and visual evidence

- [43-pad numerical audit](evidence/016-radio-pin-three-supplier-pitch-discrepancy/radio-land-audit.json), preserved unchanged from R2.

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed discrepancy exists in raw supplier CAD; conversion retains it. Calculated pad/terminal overlap is documented in the radio audit.

## Impact

Landing margin differs from nominal. Does not establish RF or solder reliability on hardware.

## Fix, changed files and verification

Raw import preserved. No geometry patch. All 43 lands audited; physical assembly/RF tests pending.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
