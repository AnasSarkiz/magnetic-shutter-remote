# R8 0.3.9 — native schematic component explanations

Every fitted component now has a role/title and two short explanatory lines
in the native schematic. Three A4 component guides accompany the original
Power, Radio and Protection A4 circuit sheets, with navigation captions on
each drawing. The guides cover all44 unique fitted BOM references:14 Power,
10 Radio,20 Protection. They explain charging, capacitor/resistor purposes,
BLE/side buttons/status LEDs, exact JST RX/GND/TX, manual programming, voltage
regulation, battery cutoff and temperature gating. Statements describe
reviewed design intent; actual prototype operation remains unverified.

Current-source native build passes. Circuit JSON SHA256:
`235953a871b8285929d6363f58f8bad3e52072a25123574657b9f6645cdb87ac`. All1432 non-schematic elements match prior commit
`bb29d8e3c12947e9cc870039281b1ce138427350` exactly: electrical components, nets,
source connections, PCB placement, traces, vias, pours, keepouts and silk.
No purchase/import definition, part value, routing, firmware or PCB changes.
All12 newly generated native fabrication files match previous content except
creation-date header lines; BOM/CPL match exact bytes. Exports are never
hand-edited. Fresh native0 DRC errors,0 shorts/dangling/hole-trace failures;
29/29 physical nets connected;164 widths and corrected±30% inductor/current
budgets, independent manufacturing, terminal registration, full CAM readback
and process/mask/paste/stencil/silkscreen checks pass.

Light smoke passes38 Python tests,2 Bun tests/13 assertions, types/format and
129 frozen baseline hashes. New schematic checks pass2 Bun tests/188 assertions:
exact44-reference BOM coverage with no duplicates, and every title/purpose
actually rendered on its matching A4 guide and linked to the original circuit
sheet. Current native root snapshots are checked separately. The native
schematic converter defaults to the first sheet; the existing supported
`schematicSheetId` renderer exports all six individual A4 views. All six were
visually inspected for readability, clipping and separation. PCB and Gerber
PNG views remain byte-identical. Reproduction commands/logs and inspected
view hashes are retained alongside this review.

Initial annotation-test type errors (ES2020 sorting/type narrowing/typed
matcher inference) were fixed in the new test without changing compiler
settings or assertions. Bare-path Bun test discovery failed; the canonical
explicit `./tests/...` invocation passes. All original failed logs are kept
as failure history, not current outcomes. No board defect is inferred from
those test-runner/type issues.

Prior frozen baselines/imports/evidence/fabrication/firmware/toolchain/lockfile
and memory guard are retained. Heavy commands remain serial through
`python3 cloud/run-heavy.py --`; observed32GiB/four CPU equivalents are
measurements, not guaranteed allocations. No SDK or3D build, baseline/default
main modification, supplier contact, assembler upload, order/payment, PR/
merge, environment Publish, repository-access or network-policy changes.

Existing004/084 warnings remain explicit; abandoned WROOM075 is not a fitted
DOIT defect. Missing `3V3` metadata remains a separate importer issue.
Procurement096 allocation, supplier processed-preview/stackup/assembly
approval, physical programming/BLE/power/thermal/runtime and complete MagSafe
grip/phone/case/RF qualification stay pending as in the earlier review.
Public0.3.9-prototype is prepared under standing board-publication authority;
actual public inventory/byte/visibility verification is recorded separately.

Native0.3.8 upload failed after348 successes/3 request timeouts; retained
`native-push038-failed.log`. The native CLI cannot resume releases and
increments to0.3.9 on retry. Supported `--compress` publication is used
for the same unchanged schematic/PCB artifacts. The incomplete0.3.8
release is not a successful publication.
