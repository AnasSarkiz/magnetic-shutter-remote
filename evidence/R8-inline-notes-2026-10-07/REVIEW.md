# R8 0.3.14 — component explanations on their circuit pages

The user requested explanations on the same schematic page as each component,
with no separate guide pages. Power/Radio/Protection now contain all44 labelled
component explanations as two-line native schematic text. PowerGuide/RadioGuide/
ProtectionGuide and links to them are removed. The programming procedure remains
on the Radio page. No circuitry, PCB placement, trace, part, value or pin is changed.

Actual native build passed; current Circuit JSON SHA256: `9aebbc4cf286fd19f6d507c0509f63f323d3558eaf12abdf3727706312549a19`.
All **1048 PCB/CAD elements** are exactly identical to0.3.12. All44 fitted poses
and159 identity/value/pin contracts are unchanged. All12 Gerber/drill geometries
match apart from explicitly retained generator timestamp records; BOM/CPL are
byte-identical. No generated JSON/import/export was hand-edited.

All19 checks in check-results.json pass, including fresh native0DRC/shorts/
dangling, independent0manufacturing/process errors,29 physical nets,174 physical
track widths and7current/voltage paths. Actual pinned CLI and actual native
browser Style Analysis report0issues; official latest analyzer fetched with TLS
verification enabled. There are zero outside-A4 drawing warnings. All3A4 pages
were actually inspected, with current image hashes in visual-review/inspection.json.
The2component-note tests pass142assertions and check complete BOM coverage,
exactly3nativeA4pages and that each explanation and its component share a page.
Native snapshots and final formatting/types are recorded separately after running.

Version0.3.13 remains the archived, unaccepted ring proposal;0.3.14 is this
schematic-only update. The ring remains deferred. Side shutter, direct JST UART,
0.30/0.45mm through vias, outer-layer-only power and removed bottom text remain.

The unchanged BOM retains the actual2026-10-07 official25identity/44reference
stock observation. One-board quantities are covered; radio AvailableOrderQty3
means five boards require pre-order. Original dates/raw values are retained;
no new observation, reservation or allocation is implied. Physical programming/
power/charging/BLE/iPhone/RF/thermal/runtime/MagSafe fit and supplier processed
preview/stackup/assembly approval remain pending. Native004/084 and original
075/076 stay explicit. Missing3V3metadata remains a separate importer issue.
This remains a CAD-validated, physically untested engineering prototype.

The original over-wide text layout is preserved under rejected-layout-1.
The accepted source reduces annotation width/spacing within nativeA4; no page-size
or checker threshold is changed to hide clipping. The dependency locks/qualified
archives/imports/baselines/previous evidence/fabrication/firmware are unchanged.
Heavy work is serial through cloud/run-heavy.py, with observed32GiB/4CPUlimits
and unchanged guards; noOOMincrement, SDK/3D build, order/payment/supplier contact,
assembler upload, environment Publish/share, PR/merge or frozen-main change.
Matching GitHub/native tsci publication is recorded separately after verification.

All4final format/type/native-snapshot commands pass. Actual snapshot update and
snapshot verification each execute2tests and pass; reviewed snapshot bytes are
retained in this new evidence directory. All previous snapshots remain immutable.
