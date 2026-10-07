# R8 0.3.15 — component explanations on their circuit pages

The user requested explanations on the same schematic page as each component,
with no separate guide pages. Power/Radio/Protection now contain all44 labelled
component explanations as two-line native schematic text. PowerGuide/RadioGuide/
ProtectionGuide and links to them are removed. The programming procedure remains
on the Radio page. No circuitry, PCB placement, trace, part, value or pin is changed.

Actual native build passed; current Circuit JSON SHA256: `2c8c90108799e5f4dcce810db129c47bc26d87b1c2ee854664bc0ce8acc07e4f`.
All **1048 PCB/CAD elements** are exactly identical to0.3.12. All44 fitted poses
and159 identity/value/pin contracts are unchanged. All12 Gerber/drill geometries
match apart from explicitly retained generator timestamp records; BOM/CPL are
byte-identical. No generated JSON/import/export was hand-edited.

All19 checks in check-results.json pass, including fresh native0DRC/shorts/
dangling, independent0manufacturing/process errors,29 physical nets,174 physical
track widths and7current/voltage paths. Actual pinned CLI and actual native
browser Style Analysis report0issues; official latest analyzer fetched with TLS
verification enabled. There are zero outside-A4 drawing warnings. All three A4 pages match the byte hashes of the actually inspected 0.3.14
images; current-image equality is recorded in visual-review/inspection.json.
The2component-note tests pass142assertions and check complete BOM coverage,
exactly3nativeA4pages and that each explanation and its component share a page.
Native snapshots and final formatting/types are recorded separately after running.

Version0.3.13 remains the archived, unaccepted ring proposal;0.3.15 is this
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
retained in evidence/R8-inline-notes-2026-10-07/snapshots; verification logs
are in this successor directory. All previous snapshots remain immutable.

The first guarded upload started from the parent directory; it was interrupted.
The incomplete0.3.14draft remains ready_to_build=false and is not accepted
publication evidence. Current19checks are refreshed against the0.3.15artifact.
Its only generated difference from the accepted0.3.14local circuit is source
filesystem metadata; every other native element and all inspected A4 PNGs match
exactly. Corrected publication explicitly enters the verified package inside
the unchanged guard. Failure receipts remain under ../R8-inline-notes-2026-10-07/publication-attempts/stopped-0314.

Actual native publication remains incomplete; see [PUBLICATION.md](PUBLICATION.md).
HTTP502 leaves two model files missing. GitHub source/build readback passes.
Product README follow-up changes documentation only; its prior complete
contents are preserved in README-HISTORY.md.
