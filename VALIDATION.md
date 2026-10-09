# R8 electrical package preview correction 0.3.28 — 2026-10-09

The user reported an empty PCB tab on tscircuit.com. The shared package preview
was incorrectly set to the CAD-only enclosure entry (35 records, no PCB pads,
traces, schematic or electrical BOM). Select index.circuit.tsx for all shared
package tabs. The fitted enclosure remains a separate included entry accessible
through the online editor; the package page has no circuit-entry selector.
Read evidence/R8-preview28-2026-10-09/REVIEW.md and PUBLICATION.md.
The qualified electrical source, routing, four Circuit JSONs, geometry/models,
prints, firmware, dependencies, frozen main/baselines, lightweight setup/start
and serial memory guards are unchanged. Publication must verify the actual
public preview payload has a board, 44 component records, pads and traces,
schematic and BOM, rather than treating a complete file inventory as UI proof.
Prior HTTP502/finalization failures remain historical. Original075/076/004/084,
separate3V3metadata and physical qualification remain explicit. No ordering,
payment, supplier contact, new shared-viewer feature or PR merge.
Actual publication status follows the dated PUBLICATION.md. Website browser
access is currently denied for tscircuit.com; a scoped environment draft adding
that exact host is saved but not applied. Do not claim a live browser pass.

## Earlier records — preserved history

# R8 native publication retry0.3.27 — 2026-10-09

The user-authorized R8 board/assembly push uses standard viewer controls.
Native26hit3HTTP502gateway responses; exact public readback verifies323/324files,
including two reported failures that actually persisted. One historical STEPfile
is missing;26remains unready. One controlled supported retry27tests that transient
server failure without dropping inputs. Read evidence/R8-native-publish27-2026-10-09/REVIEW.md and PUBLICATION.md.
Engineering source/PCB/geometry/17models/fourCircuitJSONs/prints/firmware/archives,
locks, light setup/start and serial memory guards remain unchanged. Existing
qualifications and physical gates, original075/076/004/084, separate3V3metadata,
frozen main/baselines and ordering/payment/contact restrictions remain explicit.
Shared-viewer addition is fully reverted; PR1024 remains closed/unmerged.

Actual27storage upload is complete: all326files match public byte readback,
including both uploads reported as HTTP502failures. CLI finalization remains
blocked: ready_to_build=false, hosted preview pending. No supported existing-
release finalize command; no readiness bypass or further unchanged drafts.
See the dated PUBLICATION.md for the exact recovery requirement and evidence.

## Earlier records — preserved history

# R8 unchanged native assembly publication 0.3.26 — 2026-10-09

The user requests the R8 board/assembly on tscircuit.com using existing viewer
controls. The unnecessary shared-viewer feature was fully reverted and its PR
remains closed. R8 PCB/source, enclosure/17models/fourCircuitJSONs, dependencies,
geometry and prints are unchanged; only publication version/context/receipts
change. Read evidence/R8-native-publish26-2026-10-09/REVIEW.md and PUBLICATION.md.
Actual hosted status must follow official upload/readback. Previous publications,
frozen main/baselines, original075/076/004/084, separate3V3metadata, physical
qualification, lightweight setup/start, serial memory guards and ordering/payment/
contact restrictions remain unchanged. This is an untested hardware prototype.

Actual source59dcb03 is public; all13preparation files and four CircuitJSONs
match anonymous readback. Native26upload stopped before any file upload because
this instance lacks tscircuit login. Supported browser sign-in is pending;
PUBLICATION.md records the exact blocker. Previous25remains public/ready with
hosted preview pending. Do not claim26uploaded or hosted success before readback.

## Earlier records — preserved history

# R8 native publication retry0.3.25 — 2026-10-08

The user explicitly requests another native tscircuit push. The validated24board,
enclosure,17model assets,110browser poses and51native checks are unchanged;
only package version and publication context change. Native24failed313/320with
HTTP502and remains immutable history. Read
evidence/R8-native-publish25-2026-10-08/REVIEW.md and PUBLICATION.md (from cloud, ../).
Actual hosted readiness follows exact official upload/readback; do not infer it
from local viewer success. Physical qualification, original075/076/004/084,
separate3V3metadata, frozen baselines/main, light setup/start, serial memory
guards and ordering/payment/contact gates remain unchanged.

Actual publication25succeeds: all322native files are present and match public
byte readback; ready_to_build=true, hosted job started and preview pending.
GitHub3b72f8dis public/exact13preparation files. No model/board/geometry changes.
See the dated PUBLICATION.md; complete upload does not establish hosted render
completion or physical qualification. Prior24failure remains immutable history.

## Earlier records — preserved history

# R8 actual 3D viewer parity 0.3.24 — 2026-10-08

Read evidence/R8-viewer24-2026-10-08/REVIEW.md (from cloud, ../). Actual browser
checks exposed and fixed a PCB Y reflection using proper productXYZ/z+ exports.
Physical circuitry/placement/shape/prints remain unchanged;17models are present.
Mechanical exports preserve source colors. Native51checks and actual browser110
poses pass;7product tests/315assertions and light smoke pass. product:viewer creates
one tested interactive HTML with both views/allassets, requiring official CDN
engine access but no local server. Separate native GLTF download stack overflow
and failed standalone OOM trial remain explicit; final bounded test passes.
Actual publication status is the dated PUBLICATION.md. Physical gates, original
075/076/004/084, separate3V3metadata, frozen baselines/main, light setup/start,
serial guards and ordering/payment/contact restrictions remain unchanged.

Actual publication24: GitHub35990a9is public/exact83files. Native upload is
incomplete313/320after10HTTP502responses; two PCB model fragments are missing,
ready_to_build=false and hosted preview pending. Tested interactive HTML and
actual closed/exploded screenshots are available locally. See the dated
PUBLICATION.md for exact gaps and supported continuation; do not claim hosted success.

## Earlier records — preserved history

# R8 enclosure circuit 0.3.23 — GitHub complete, native upload blocked

Standard enclosure.circuit.tsx is included in the serial guarded build and selected
for preview by documented config. Local51geometry checks/253product assertions
and light smoke pass. All42protected files remain unchanged. GitHub5e975da/5e6bd8d
and source/build files are public/exact. Native23is incomplete313/317afterHTTP502/
503; ready_to_build=false and preview pending. Missing originalPCBmodel fragment
prevents a complete native assembly publication. Read
 evidence/R8-enclosure-publish23-2026-10-08/PUBLICATION.md (from cloud, ../).
One controlled normal retry was attempted; official CLI has no release resume.
Restore reliable official uploads/supported resume before further publication.
Prior successful21and incomplete22receipts remain historical. Physical gates,
075/076/004/084, separate3V3metadata, frozen baselines/main, light setup/start,
serial guards and order/payment/contact restrictions remain unchanged.

## Earlier records — preserved history

# R8 enclosure publication retry 0.3.23 — 2026-10-08

The enclosure.circuit.tsx/build/preview implementation and validated geometry are
unchanged from0.3.22; only package version/publication context change. Native22is
incomplete312/315afterHTTP502; that receipt remains preserved. Local51geometry
checks,253product assertions and light smoke remain valid. Read
 evidence/R8-enclosure-publish23-2026-10-08/REVIEW.md (from cloud, ../).
Actual remote status follows in its PUBLICATION.md. Original075/076/004/084,
separate3V3metadata, physical qualification, frozen baselines/main, light
setup/start, serial guards and order/payment/contact gates remain unchanged.

## Earlier records — preserved history

# R8 enclosure circuit entry 0.3.22 — 2026-10-08

Read product/README.md and evidence/R8-enclosure-entry22-2026-10-08/REVIEW.md
(from cloud, use ../ paths). enclosure.circuit.tsx is the standard discovered
entry; product.assembly.tsx remains an alias. includeBoardFiles explicitly lists
the PCB and enclosure; previewComponentPath selects the enclosure. Default build
runs both serially under the existing guard; only enclosure/compatibility views
were built in this task. All 51 native geometry checks and 253 product assertions
pass; the 42 protected source/PCB/model/print/setup inputs are unchanged.
Actual publication status is the dated PUBLICATION.md. Physical qualification,
075/076/004/084, separate missing 3V3 metadata, frozen baselines/main, light
setup/start, memory guards and ordering/payment/contact gates remain unchanged.

## Earlier records — preserved history

# Native publication retry 0.3.21 — 2026-10-08

User requested another tscircuit push of the validated assembly. Only package
version/publication records change; all 312 prior staged source/artifact hashes
match before the metadata update. No PCB/geometry/routing/dependency change or
root build. Prior geometry, fit, orientation and light smoke checks remain valid.
Current actual upload status is evidence/R8-native-publish21-2026-10-08/PUBLICATION.md.
Incomplete 0.3.20 and physical qualification gates remain explicit history.

# Current R8 native assembly 0.3.20 — 2026-10-08

Read product/README.md and evidence/R8-native-assembly20-2026-10-08/REVIEW.md.
Documented assembly.device/subassembly code now imports lossless native models;
closed/exploded JSON is about 15 KB. product.geometry.tsx and geometry.ts preserve
editable canonical plans. All mechanical triangle corners/poses and original
PCB assets are independently read back; actual shape, board, parts and eight
print meshes are unchanged from 0.3.19. No root PCB/routing/SDK/CAM build or dependency
upgrade. Product tests (194 assertions), light smoke and native geometry checks pass.
Physical harness/cable/shutter/magnets/phone/RF/thermal qualification is pending;
075/076/004/084 and separate 3V3 metadata remain explicit. Publication status is the
new dated PUBLICATION.md; prior incomplete19 is immutable history. Setup/start,
active branches, frozen baselines/main, memory guards and ordering/contact gates
remain unchanged.

## Earlier records — preserved history

# Current R8 sculpted enclosure0.3.19 — reference camera grip,2026-10-07

Read product/README.md and evidence/R8-sculpted19-2026-10-07/REVIEW.md (from
cloud, use ../ paths). The user's multi-view image remains the90×78×34mm
reference. New curved palm crown,17.05mm circular back, domed bronze pill,
rounded USB-C tunnel and continuous shoulder supersede the thicker18 shape.
The unchanged44×56×1mm PCB and32×43×8.5mm protected pack retain their18 poses.
All44 component envelopes, original four mounts, containment and side-contact
checks pass. Four shutter positions through the nominal0.35mm stop are checked
against the case and other43 components; actual travel/friction/return/stop
strength remains unqualified. Eight single-solid print meshes and native GLB
readback are checked independently. Studio views use the actual native GLB;
lighting, shading normals and fine-grain material do not change vertices/faces.
Photograph-identical surfaces/finish or physical operation are not verified.
Electronics, firmware, routing, imports, locks and frozen baselines are unchanged.
No root board/routing/SDK/CAM build. Prior075/076/004/084, separate3V3metadata,
physical/supplier/MagSafe/RF/service/thermal/harness gates remain explicit.
Current publication status is the dated PUBLICATION.md; earlier incomplete18
is preserved.
GitHub 107aba5 has all112 changed files verified. Native19 is incomplete296/302:
HTTP413/502/timeouts; both product assembly JSONs are missing and hosted preview
is pending/unready. Actual receipt is evidence/R8-sculpted19-2026-10-07/PUBLICATION.md.
 Setup/start, branch preservation, serial memory guards and
ordering/payment/contact restrictions remain unchanged.

## Earlier records — preserved history

# Current R8 reference enclosure0.3.18 — 90×78×34mm,2026-10-07

Read product/README.md and evidence/R8-reference18-2026-10-07/REVIEW.md (from
cloud, use ../ paths). The latest user multi-view image sets the90×78×34mm
target. The broad0.3.17 and unpublished tall18 candidates are superseded.
The unchanged44×56×1mm PCB is rigidly rotated90° across the shoulder/circular
body; the protected32×43×8.5mm pack is in the lower palm. Native enclosure
checks verify the target envelope,44component envelopes, four original mounts,
board/pack containment and the horizontal−Y side-switch contact. Eight prints
and actual native GLB readback are checked separately. No physical operation,
photograph-identical texture, universal phone fit or finished-product order
approval is claimed. Side USB-C cable fit, lid-off power/service access, shutter
stroke/guides/return, harness/thermal, exact MagSafe array/DCshield/bonding,
retention/RF/phone/case/hardware tests remain pending. Electronics/copper/BOM/
firmware and frozen baselines are unchanged; electrical checks are explicitly
carried forward byte-identically. No root board/routing/SDK/CAM build, no RGB
ring. Original075/076/native004/084 and separate missing3V3metadata stay explicit.
GitHub28exact readbacks pass. Native18is incomplete290/291files: missing
product/models/r8-parts-6.glb afterHTTP502; draft remains unready/pending.
Publication status is the actual dated receipt. Setup/start, branch preservation,
serial memory guards and ordering/payment/contact restrictions remain unchanged.

## Earlier records — preserved history

# Current R8 enclosure0.3.17 — camera grip,2026-10-07

Read product/README.md and evidence/R8-enclosure17-2026-10-07/REVIEW.md (from cloud,
use ../ paths). New rounded palm shell, domed service lid and broad MagSafe
shoulders follow the approved concept around unchanged actual PCB/battery.
Shell64×72×23mm; docked113.5×76×33mm. Native fit/mount/horizontal-shutter/print
checks pass; actual mechanical tests are pending. All electronic source,
board artifact, routing, BOM, firmware and immutable inputs are unchanged.
Seven bounded GLBs preserve all44 actual meshes; previous0.3.16 HTTP413 failure
remains explicit. Actual publication receipt follows upload/readback, not a
hosted preview assumption. Exact magnets/DC shield/bonding, hardware/harness/
thermal/phone/case/RF/retention remain unqualified. No ring. Lightweight setup/
start/guards, branch preservation and ordering/contact restrictions remain.

## Earlier records — preserved history

# Current R8 0.3.16 — compact source and native product assembly, 2026-10-07

GitHub public source/artifact readback passes23 files. Native0.3.16 draft is
**incomplete**:272/275 files, two PCB GLBs and one STEP absent, ready_to_build=false.
Local checks pass; hosted publication is blocked by upload transport failure.
[Actual receipt](evidence/R8-product16-2026-10-07/PUBLICATION.md).

Active electronics source is four files instead of42; original source and old
mechanical assets are recoverable from verified archives. Native closed and
exploded product assemblies use the actual44-model PCB, protected battery
envelope, service enclosure, horizontal shutter and separate MagSafe grip.
Six print-fit STLs pass watertight/winding/readback and native dimension/volume
agreement. Both whole-product views were inspected without clipping.

The current board builds from consolidated source. All1049 PCB/CAD and576
schematic elements match0.3.15 exactly. Fresh native/independent checks pass
zero DRC/shorts/dangling/process failures;29 physical nets and174 trace widths
are checked. Same-page schematic explanations remain. No RGB ring is added.
[Current review](evidence/R8-product16-2026-10-07/REVIEW.md).
[Actual publication status](evidence/R8-product16-2026-10-07/PUBLICATION.md).

Exact magnet/DC shield, bonding, fasteners/harness/thermal coupling, switch
travel and phone/case/RF/retention require physical qualification. Supplier
processed preview and physical programming/power/BLE/Camera tests remain
pending. This is an engineering prototype, not approval to order. Original
075/076/native004/084 and the separate missing3V3 importer issue remain explicit.
Setup/start/guards, frozen baselines and ordering/contact restrictions remain.

## Earlier records — preserved history

# Current R8 0.3.15 — explanations on the component pages, 2026-10-07

GitHub source/build readback passes; native tscircuit **0.3.15-prototype is incomplete** (HTTP502, two STEP model files missing, ready_to_build=false). The same-page schematic implementation and local checks are complete. [Actual publication status](evidence/R8-inline-notes15-2026-10-07/PUBLICATION.md). README now provides the product overview,44×56×1mm PCB dimensions, controls/power/programming and unqualified MagSafe/physical gates.

All44 component explanations now share their Power/Radio/Protection schematic
page with the actual components. The3separate guide pages and guide links are
removed. The3nativeA4pages are inspected; actualUI/CLI Style Analysis passes0.
Fresh19checks pass0DRC/shorts/dangling and independent manufacturing/process,
29physical nets,174widths/current paths. All1048PCB/CADelements,44poses and159
pin/value contracts are identical to0.3.12; all12Gerber/drill geometry and BOM/CPL
are unchanged. The ring stays deferred. Supplier/physical/MagSafe gates and
original075/076/native004/084/separate missing3V3metadata records remain explicit.
[Current review](evidence/R8-inline-notes15-2026-10-07/REVIEW.md). Actual publication receipt is recorded separately.

## Earlier records — preserved history

# First prototype scope — RGB ring deferred, 2026-10-07

The user deferred the RGB photo/torch ring entirely. Active board/source is the
exact previously validated and uploaded **0.3.12-prototype** shutter-only design;
no ring port, power stage or ring firmware is fitted. Side shutter, direct3-pin
JST UART programmer and bottom-label removal remain. All18 fresh checks pass:
0DRC/shorts/dangling,29 physical nets,174 widths/current budgets, independent
Gerber/process/readback. Actual UI and CLI schematic style both report0 issues.
All25 exact JLC identities cover one board; radio Available Order Qty3 means
five boards require pre-order. Matching public native files are verified; the
hosted preview worker reports a30-minute timeout, not a preview pass.
Supplier processed preview and physical programming/power/BLE/iPhone/MagSafe
validation remain pending. Original075/076/native004/084 and the separate missing
3V3 importer metadata issue remain explicit. No ordering/contact/payment.
[Scope restoration and current review](evidence/R8-ring-deferred-2026-10-07/REVIEW.md).

# Current R8 0.3.12 — bottom silkscreen cleanup, 2026-10-06

Public **0.3.12-prototype** inventory/visibility/readback PASS:
all 356 files and 42 critical anonymous byte reads match.
[Actual publication receipt](evidence/R8-bottom-silk-2026-10-06/PUBLICATION.md).
Hosted preview is `pending` at the recorded observation.

The three requested bottom-side labels are removed from native source and
the current B_SilkScreen Gerber has zero objects. All 2,072 non-artwork/
non-metadata elements, PCB copper/placement/connections and all schematic
elements match 0.3.11 exactly. Fresh native zero DRC errors/shorts/dangling,
29 physical nets, 174 measured widths/current paths and complete independent
manufacturing/process/readback checks pass. All other 11 Gerber/drill files
match except listed timestamps; BOM/CPL are byte-identical.
[Current review](evidence/R8-bottom-silk-2026-10-06/REVIEW.md). Circuit JSON SHA256: cf61cad4bd9972f10607977ab42f06dfe02318f9a42d073d1febe6a3b890f331.

Programming still uses JST RX/GND/TX, battery power, USB-C disconnected and
manual BOOT/RESET; instructions remain in the programmer R8-USAGE.md.
25 exact parts have public SMT listings; radio 66 headline In Stock/3
Available Order Qty requires pre-order above 3. Five-board stock allocation,
supplier approval, USB-C shell soldering, physical operation and complete
MagSafe fit remain pending. Prototype status and native 004/084/original
075/076 warnings remain explicit. Missing 3V3 metadata is a separate importer
issue. Actual publication is recorded separately after public readback.

## Prior review/publication records — preserved history

# Current R8 0.3.11 — schematic capacitor groups, 2026-10-06

Public **0.3.11-prototype** inventory/visibility/readback PASS: all
456 files and 39 critical anonymous reads match.
[Actual publication receipt](evidence/R8-capacitor-groups-2026-10-06/PUBLICATION.md).
Hosted preview is `pending` at the recorded observation.

C10/C3/C4 native schematic coordinates bring all three reported capacitor
groups within the latest browser analyzer's recommended spacing. Actual
browser and pinned CLI style analyses pass zero issues. All 1,451 physical/
electrical elements are identical to 0.3.10; PCB placement, routing, values
and 159 pin contracts are unchanged. Fresh native/independent clearance,
29 physical nets, 174 track widths/current paths and export/process checks
pass. Six native A4 pages and reviewed snapshots retain all 44 explanations.
[Current review](evidence/R8-capacitor-groups-2026-10-06/REVIEW.md). Circuit JSON SHA256: 7a4c1f7c658e30988676f8ed3d7f9346cf04856a6079d1ae7395ac6fcb9c38bf.

All 91 through vias remain 0.30mm hole/0.45mm pad; power is top/bottom only.
Exact BOM and dated JLCPCB listing evidence remain unchanged; allocation,
supplier approval, physical operation and complete MagSafe fit are pending.
Native 004/084 and original 075/076 stay explicit. Missing 3V3 metadata
remains a separate importer issue. Setup/start and serial memory guards are
unchanged; observed 32GiB is not guaranteed. Current publication receipt is
recorded separately after actual public readback.

## Prior review/publication records — preserved history

# Current R8 0.3.10 — schematic style and through vias, 2026-10-06

Public **0.3.10-prototype** inventory/visibility/readback PASS: all
418 files and 36 critical anonymous reads match.
[Actual publication receipt](evidence/R8-style-vias-2026-10-06/PUBLICATION.md).
Hosted preview is `pending` at the recorded observation.

Native standard USB-C schematic and real browser/CLI Style Analysis pass0
issues. Current-source native0 errors/shorts/dangling and independent0
manufacturing/process failures pass;29/29 physical nets, all174 physical
track widths and seven current paths pass. The two-layer44×56×1mm PCB has
91 through vias, each0.30mm hole/0.45mm pad, with all power/trace copper
on top/bottom only. All44 fitted parts/poses and159 pin/value contracts remain
unchanged. Six native A4 circuit/component-guide pages and both PCB/Gerber
layers are inspected. [Current review](evidence/R8-style-vias-2026-10-06/REVIEW.md).
Circuit JSON SHA256: `eb69ddb005aea75aefe12e98c1e4f9f97bee3134a76d356261bf571662143f5b`.

All25 exact JLCPCB MPN/SMT listings verified with dated observations; actual
stock allocation/supplier processed-preview/stackup/assembly approval remain
pending. Physical programming/power/BLE/RF/thermal/runtime and full MagSafe
grip/phone/case qualification remain pending. Native warnings004/084 and
upstream075/076 stay explicit. Missing `3V3` metadata remains a separate
importer issue. Setup/start and serial memory guards remain unchanged;
observed32GiB/four CPU is not a guaranteed allocation. Publication receipt
is recorded separately after actual remote verification.

## Prior review/publication records — preserved history

# Current R8 0.3.9 schematic component guides — 2026-10-06

Public **0.3.9-prototype** visibility/inventory/readback PASS:
package public=true/latest 0.3.9-prototype; all 374 files and 29 critical
text/binary reads match. [Actual receipt](evidence/R8-schematic-notes-2026-10-06/PUBLICATION.md).
Hosted preview is `pending` at the recorded observation.

Native schematic text explains all44 fitted components on three matching
A4 guide pages, alongside the three original A4 circuit drawings. Each
drawing points to its component guide. [Current review](evidence/R8-schematic-notes-2026-10-06/REVIEW.md).
Current Circuit JSON SHA256: `235953a871b8285929d6363f58f8bad3e52072a25123574657b9f6645cdb87ac`.
All1432 non-schematic elements/PCB artwork are unchanged; fresh0 native
DRC errors/shorts,29/29 physical nets,164 widths/current budgets and full
fabrication/process readback pass. All six A4 pages visually inspected.
Light smoke38 Python+2 Bun/13 assertions and new2 Bun/188 annotation
assertions pass. Public publication receipt is recorded separately.
Supplier approval, physical operation and full MagSafe fit remain pending.
Missing `3V3` metadata remains a separate importer issue.

## Prior review/publication records — preserved history

# Current R8 0.3.7 silkscreen update — 2026-10-06

Public **0.3.7-prototype** native publication and anonymous readback pass:
package public=true, all329 files match,18 critical text/binary reads match.
[Actual publication/visibility receipt](evidence/R8-uart-silkscreen-2026-10-06/PUBLICATION.md).
Hosted worker preview remains pending at the recorded observation.

The UART legend now reads **UART / 1:RX 2:GND 3:TX**; the requested
3V3 wording is removed. Programming still uses the correct 3.3 V signal
levels, direct three-pin JST and manual BOOT/RESET; no power pin is added.
Electrical components, placements, nets and copper remain exactly unchanged.
Fresh native0 DRC errors/shorts,29/29 physical nets,164 widths/current budgets
and native fabrication/silkscreen readback pass; light smoke38 Python+2 Bun
tests/13 assertions passes. Only bottom silkscreen artwork changes.
Current Circuit JSON SHA256: `8be85af4b798a3b3d5973784e23afb54c721f1377e06ee1d7aad77ca7c2fb6fd`.
[Current review](evidence/R8-uart-silkscreen-2026-10-06/REVIEW.md).
Public publication receipt is recorded separately after remote verification.
Supplier approval, physical operation and full MagSafe fit remain pending.
Missing `3V3` metadata remains a separate importer issue.

## Prior review/publication records — preserved history

# Current R8 compact PCB review — 2026-10-06

Published public **0.3.6-prototype**: native367-file upload and22 critical
anonymous text/binary matches pass, including exact Circuit JSON and UART UF2.
[Actual publication receipt](evidence/R8-issue-resolution-2026-10-06/PUBLICATION.md).
Hosted preview remains pending; supplier approval/physical/MagSafe fit stay open.

Latest [issue resolution](evidence/R8-issue-resolution-2026-10-06/REVIEW.md):
pinned standard JST programmer0.8.0 UF2/ELF build and USB/UF2 validation pass.
Fresh native0 DRC errors/shorts,29/29 physical nets,164 widths and corrected
±30% current budgets pass; smoke38 Python+2 Bun/13 assertions and29 CAM pass.
Package0.3.6-prototype updates audit/programmer evidence; PCB stays hardware0.3.5.
Inventory096 is an unconfirmed allocation question, not a proven shortage.
Official Apple R31 guidance is retained; exact magnet/enclosure/phone fit,
supplier-processed preview and physical operation remain unqualified.
See the dated review for evidence and the subsequent publication record.

Latest [six-point review](evidence/R8-six-point-review-2026-10-06/REVIEW.md):12 fresh
guarded checks pass, including all five native placement/netlist gates, native
shorts/DRC,29 physical nets,164 widths, corrected power and12 fabrication files.
All44 poses/159 electrical terminals remain qualified/unchanged. Fresh official
JLCPCB exact25-MPN/SMT listings pass identity;24 direct inventory fields cover
five boards before attrition. C19949072 direct3/overseas66 needs allocation
confirmation (procurement096). Latest programmer0.8.0 source/UART contract
review passes; UART firmware build/install and actual flashing remain pending.
No board revision; supplier preview, hardware and complete MagSafe fit untested.

Functional follow-up: [manufacturer/net/firmware review](evidence/R8-functional-review-2026-10-06/REVIEW.md).
Fresh native0 errors/shorts,29/29 physical nets and44 identities/159 terminals
pass. Project audit095 corrected fitted1.5µH±30% (min1.05µH) and enforced TI20%
saturation headroom:0.7450A RMS/0.8446A peak/1.0136A required saturation, all
passing on unchanged route23.29 CAM regressions and lightweight36 Python+2 Bun
tests pass. Earlier±20% ripple figures are superseded, original reports retained.
Power/switch/charge/boot/UART/compiled-GPIO/HID design reviewed; physical operation
and supplier approval remain pending. No PCB/source/firmware revision was made.

Hardware/package **0.3.5**, native route23: **44 × 56 × 1 mm**, two-layer FR4,
44 TOP references / 25 exact JLCPCB identities. Follow the JJC MSG-P1 grip and
detachable side shutter arrangement; the PCB is smaller than the complete
housing/MagSafe array. Protected 1000mAh pack, right-edge TS24CA switch and
straight-through three-pin JST UART connection are retained.

**Electrical/copper and local fabrication checks pass:** 0 native DRC errors,
0 shorts, 0 dangling traces, 0 independent manufacturing/process failures;
29/29 required terminal nets physically connected. All 164 physical track
widths reviewed, minimum 0.15mm; VIN and inductor necks widened to 0.30mm and
switching RMS/peak current budgets pass. All 44 exact fitted identities/values
and 159 pin contracts match the qualified electrical reference. Native
unrouted placement and all five required checks pass, with identical final
component poses. Current Circuit JSON SHA256: `e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`.

Twelve native fabrication files, rounded outline, copper/paste/mask/drill
readback, four plated USB slots, exact USB/shutter/JST terminal registration,
159 paste apertures, full silk and button-label separation pass. All three
native A4 schematic sheets and both PCB/Gerber layers are inspected; reviewed
explicit-root native snapshot passes. Lightweight setup/smoke, formatting and
types pass: 36 Python tests, 2 Bun tests / 13 assertions. CAM: 27 regressions
pass. Full measurements, logs and assumptions: [compact review](evidence/R8-compact-pcb-2026-10-06/REVIEW.md).

**Prototype order approval is pending** supplier-processed Gerber/drill/BOM/CPL
preview, stackup, current stock/substitution and assembly review. No assembler
upload, supplier contact, payment or order occurred. Physical programming,
power/BLE/RF, thermal/runtime and phone/enclosure/MagSafe tests remain
POST-PROTOTYPE PHYSICAL VALIDATION. Multi-model fit and the complete magnet/
metal/antenna envelope are unfinished; this is an untested engineering
prototype, not a production-ready grip.

Known warnings004 and084 remain explicit. Local issues091–094 retain real
failed inputs and their precise dispositions; no checker limits were lowered,
no generated copper or imports patched. Abandoned WROOM075 does not apply to
fitted DOIT. **Missing `3V3` metadata remains a separate importer issue.**
Frozen main/baselines/imports/prior evidence/toolchain and firmware are unchanged;
1752 protected archived files verified; 129 portable baseline hashes pass. Observed32GiB/4CPU is not a guaranteed
allocation. Setup/start stay lightweight; all heavy work uses the unchanged
serial memory guard. Preserve `board/r8-doit-c3-prototype-20261005`.

Public **0.3.5-prototype** native publication/readback PASSED: all270 files,
public=true, ready_to_build=true,20 critical text matches and matching anonymous
GitHub Circuit JSON. Hosted worker preview remains pending at observation.
[Actual publication](evidence/R8-compact-pcb-2026-10-06/PUBLICATION.md). The prior
0.3.4-prototype remains historical output.

| Stage | Current status |
|---|---|
| Electrical requirements and compact PCB envelope | passed for this PCB; complete MagSafe enclosure requirements in progress |
| Schematic / exact BOM | passed; sourcing observations dated2026-10-05, current assembler stock pending |
| Unrouted placement | passed |
| Routing / physical connectivity / current widths | passed |
| Automated / visual / snapshot review | passed |
| Prototype fabrication approval | in progress; local exports pass, supplier processed-preview/assembly review pending |
| Physical prototype tests | not started |
| Public prototype publication | passed native upload/anonymous readback; hosted preview pending |

## Earlier investigation records — retained history

# R8 validation record — 2026-10-05

## Current radio and firmware disposition — 2026-10-05

The fitted module is now **DOIT ESPC3-12-N4 / C19949072**, the cheapest checked candidate compatible with the pinned BLE firmware. Its observed direct small-prototype price is $2.2662 versus the abandoned WROOM module's $3.2887 (about31% lower); stock/price are observations, not reservations or assembly quotes. The cheaper C2 candidate was electrically qualified but the actual hosted firmware build proved pinned Zephyr4.2/hal_espressif lacks its Bluetooth adapter/controller libraries. Board support alone was insufficient. Both investigations remain preserved.

The supported exact import has22 contacts matching the DOIT nominal1.0×1.5 mm drawing and all22 datasheet labels. Original supplier data and a measured conversion audit are in `evidence/R8-components/alternative-radio-2026-10-05/c3-supported-ble/`. This replacement has correct VCC/GND metadata; original WROOM issues075 and076 remain distinct and open upstream. Root pin contract: EN3,GPIO4/shutter6,GPIO5/pair7,VCC8,GND15,GPIO6/LED12,GPIO9/BOOT18,GPIO20/RX21,GPIO21/TX22. Firmware targets `esp32c3_devkitc/esp32c3`, with40 MHz per silicon requirement, not the26 MHz C2 overlay. Its main application remains unchanged. C3 root electrical identity, unrouted placement, routed native/independent clearance, shorts, physical continuity and local fabrication readback pass. Supplier-processed preview and physical validation remain pending.


## Earlier C2 engineering continuation — superseded by C3 firmware verification

The active root now implements ESP32-C2 / DOIT ESPC2-12E-N4, 44 fitted references, a TPS63031 buck-boost supply, the exact SH battery mate and 300 mA nominal charging. The new schematic/BOM and unrouted placement passed their gates. Routing is in progress; no final zero-DRC/zero-short or fabrication-release pass is claimed yet. The older sections below describe earlier investigation states and frozen baselines, not the current root.

Issues075/076 concern the abandoned C3 selection and its separate power-metadata omission; they do not block the fitted C2 module. Issues078/079 are supplier example-land variations accepted for engineering prototype use with explicit geometry/process calculations in [qualification](evidence/R8-prototype-2026-10-05/QUALIFICATION.md). Actual copper, drilling, continuity and export checks remain required. Frozen baselines stay immutable; ordering, payment and supplier contact remain unauthorized. Hardware tests remain POST-PROTOTYPE PHYSICAL VALIDATION.


**Historical qualification status below; current C3 disposition is above.**

## Earlier routing request — retained investigation

The user requested a routed C2 board with0 DRC errors and0 shorts. **Not achieved: routing remains blocked before the root migration.** The TPS63031 supply candidate has an unqualified supplier contact-land variation (issue078); the imported Sunlord inductor candidate also differs from its manufacturer recommendation (issue079). The converter faithfully preserves both suppliers' geometry. A TI-recommended-series Coilcraft alternative imported but is not yet manufacturer/process qualified. The correct JST SH battery mate imported; its documented polarity is pin2 positive/pin1 ground, different from the old PH connector. Slow-charge proposals also require review against BQ25185's360-minute safety timer. Exact measurements, inputs, import successes/failure and remaining gates: [routing status](evidence/R8-routing-2026-10-05/ROUTING-STATUS.md).

No root source/BOM/firmware/baseline change, root build, routing, routed DRC, shorts, snapshot acceptance, CAM, commit, push or publication occurred in this investigation. **DRC/short counts are unknown, not zero.** The installed mandatory check commands are available. Actual observed limit remains32GiB,4 CPU equivalents, Python3.12.14; the memory guard remains unchanged. Component audits and lightweight smoke must not be presented as whole-board validation.

## Latest radio selection and hosted checks — 2026-10-05

The user authorized a cheaper replacement for C2934560: selected **DOIT ESPC2-12E-N4 / C19949081**, dated direct JLCPCB price $1.5721 at 1–9 units. Supported exact import, all16 pin identities, 1.5×1.0 mm manufacturer lands, supplier conversion fidelity and valid OBJ/STEP formats pass their focused checks. Full evidence and limitations: [selection report](evidence/R8-components/alternative-radio-2026-10-05/SELECTION.md). This supersedes the original C3 module selection recorded below; it does not erase its failed qualification evidence.

The original C3 fixture now uses manufacturer-confirmed board-level pinAttributes for pin1 power and pin9 ground; the generated import is unchanged. Its native regression passes. The importer still lacks generic 3V3 inference upstream. Original issue075 remains unqualified for C2934560, but the replacement's matching recommended lands avoid that specific discrepancy. Issue077 records an importer HTTP-error-body download defect; failed artifacts were preserved and the selected module was regenerated with valid assets after host access became usable.

Final hosted smoke: formatting, TypeScript,18 Python tests,2 native evaluator tests and129/129 frozen context hashes PASS. Selected isolated native A4 schematic/PCB SVG export passes,16 pads,0 PCB traces,0 circuit error records. `Port VCC on U1 is missing a trace` remains explicit: the fixture is deliberately unpowered, not a functional supply circuit. PCB and schematic images were visually reviewed for the isolated module. No C2 firmware/SDK/3D/CAM or root-board build was run.

Selected fixture build ran sequentially through `python3 cloud/run-heavy.py`, with observed memory limit34359738368 bytes, V8 heap cap14336 MiB, peak child RSS1285128 KiB and no cgroup OOM events. These are measured results for this isolated build, not a routing-memory guarantee.

The active root board/BOM remain Nordic. Complete 3.3 V supply, charger/battery/harness, reset/strap/programming, antenna/mechanical placement, C2 firmware adaptation and whole-board validation remain unfinished. Do not flash the C3 image onto C2 or publish stale Nordic JSON as an R8 result. No board publication, commit, push or supplier/order action occurred in this qualification step. Subsequent sections retain the prior C3/handoff record.

## Revision and scope

Source directory: `../magnetic-shutter-remote-r7--01a0f81f`, branch `r7-shutter-only-order-review`, commit `636d2b24eb4db775fceeb81206541f249db3b9a5`. R6 frozen commit: `77965a8012d5544e962d987ce958c5c5614dbe3a`. R8 source/dependency checksums are in `evidence/R8-components/R8-INTEGRITY-MANIFEST.json`; firmware has its own `firmware/artifacts/R8-candidate/BUILD-MANIFEST.json`. No completed board implementation step or public R8 revision is claimed.

One rechargeable battery, one USB-C charging port, native-phone BLE HID shutter, shoulder controls and existing red status indicator; no torch. Selected module is ESP32-C3-WROOM-02-N4 / C2934560. Proposed module supply is 3.3 V, with at least 0.5 A output capability. Two-layer TOP assembly remains the intended architecture; final board dimensions, thickness, mount arrangement, stackup and manufacturing limits are not yet frozen for R8. Prior design's dimensions and DFM evidence must not be reused as an R8 pass.

| Stage | Status | Evidence / limitation |
|---|---|---|
| 1. Requirements | in progress | Supply/pin requirements checked; final battery/harness and mechanical envelope unfinished. |
| 2. Schematic and BOM | blocked | C2934560 supplier land variation unqualified; root circuit/BOM still Nordic baseline. |
| 3. Placement before routing | not started | Only isolated unrouted import fixture built. No whole-board netlist/pin/source/placement pass. |
| 4. Copper routing | not started | No ESP32-C3 board routing. Copied old routing is not R8. |
| 5. Automated and visual board checks | in progress | Focused tests/typecheck/format and module fixture reviewed; full R8 DRC/snapshots not run. |
| 6. Prototype fabrication | blocked | No R8 Gerbers, drills, BOM/CPL or supplier preview. |
| 7. Physical prototype | not started | POST-PROTOTYPE PHYSICAL VALIDATION. |
| 8. Store release/publication | blocked | No validated R8 root circuit JSON; no GitHub/tscircuit R8 update attempted or claimed. |

## Component qualification

- C2934560 listing checked 2026-10-05: ESP32-C3-WROOM-02-N4, Extended SMT, Economic/Standard, MSL3; observed stock 11,602 and orderable 7,755, 1–9 unit price $3.2887. Stock is not reserved. Exact source: https://jlcpcb.com/partdetail/ESP32-C3-WROOM-02-N4/C2934560 . Native import/model paths and original raw supplier input preserved.
- Espressif datasheet v1.7, Figure 11-1 page 38: recommended lands 1.5 ×0.9 mm. Import/raw supplier: 1.999996 ×0.999998 mm on 18 contacts. All 27 supplier/import features match with maximum conversion difference 5.084821452783217e-14 mm. All 19 pin identities match Table 3-1. Nine EP tiles match 0.7 mm recommendation.
- **BLOCKER 075:** qualified land pattern not established. The recommendation is not an explicit tolerance; wider lands are not automatically a manufacturing failure. No evidence approves the actual variation. This is supplier data, not a demonstrated converter bug. Original import is unchanged.
- **BLOCKER 076:** numeric supply label `3V3` lacks `requiresPower` metadata; fixture warning `U1 has no pin with requires_power=true` remains explicit. EP ground must also be verified from manufacturer data. No generated import edits or warning suppression.
- TPS63031DSKR / C15516 proposed only: stock 13,364/orderable 13,232 on 2026-10-05, Extended SMT Economic/Standard MSL1, 1–9 price $1.0291. TI SLVS696D provides the supply feasibility basis. Supported import preserved; contact/paste variation still unqualified. This is not the final BOM.
- Old 200 mA TPS7A0230 regulator and 110 mA-rated battery cannot satisfy the selected module's 0.5 A supply-capability requirement. Larger protected pack, new harness mate and power components still need selection/qualification. Detailed charge/current/voltage calculations and explicit runtime assumptions: `POWER-FEASIBILITY.md`.

Controlling workspace rule in `../../AGENTS.md`: “If a required part cannot be imported, or an imported component has any issue ... stop dependent work; do not work around it by creating or modifying a component.” Dependent board wiring, placement, routing and exports were therefore not advanced. Independent firmware and source audits continued.

## Reproducible results

| Check | Result | Scope |
|---|---|---|
| `python3 scripts/audit-r8-module.py` | PASS conversion fidelity; BLOCKED land qualification | Original supplier JSON vs unchanged TSX; manufacturer geometry comparison visible. |
| `python3 -m unittest discover -s tests -v` | 5 PASS | Conversion fidelity, blocking discrepancy, pin identity, 129 prior-file hashes, firmware GPIO/config contract. |
| `./node_modules/.bin/tsc --noEmit` | PASS | Local TS/TSX including import fixture; not electrical validation. |
| `bun run format:check` and fixture formatter check | PASS | Project-configured Biome checks; generated imports not rewritten. |
| Native fixture build | PASS render; power warning unresolved | `tests/fixtures/esp32-import.circuit.tsx`, routingDisabled; 27 pads, zero traces, zero circuit error records, native A4 297 ×210 mm. |
| Fixture PCB/3D and annotated land drawing visual review | PASS inspection | Module evidence only, not final enclosure fit or whole-board copper review. |
| Zephyr ESP32-C3 firmware build | PASS compile/image | 411,568-byte image, checksum e8 valid; proposed pin contract, hardware untested. |
| Firmware low-power behavior | NOT VERIFIED | Wi-Fi off/tickless idle; CPU/controller sleep not established. |
| Whole-board R8 DFM/connectivity/routing/CAM | NOT RUN | Module qualification gate blocks them; old counts are not R8 results. |
| Historical full importer suite | NOT RUN this revision | Prior 33 baseline failures remain recorded; no full-suite pass claimed. |
| R7 preserved baseline | 129/129 hashes unchanged | `evidence/baseline/R7-preservation-manifest.json`; all files covered by that manifest verified. |

Native fixture command: `./node_modules/.bin/tsci build tests/fixtures/esp32-import.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png`. Output is `dist/tests/fixtures/esp32-import/`, not `dist/index/`. Logs, annotated geometry and original inputs are linked from issues 075/076. A4 schematic review is an isolated import-symbol check only.

Firmware reproduction and exact dependency commits are in `firmware/README.md` and its build manifest: Zephyr 4.2.0, SDK 0.17.2, RISC-V GCC12.2.0. Optional external DTC absence and esptool Python3.14 SyntaxWarning remain recorded, not suppressed. BLE report/phone behavior and runtime require actual hardware.

## Tooling and preservation

Locked board toolchain: tscircuit 0.0.2702; CLI0.1.2237, core0.0.2035 and easyeda0.0.364 use preserved R7 local-qualified archives; PCB viewer1.11.415, 3D viewer0.0.610, TypeScript5.9.3, Biome2.2.4. No new generic importer patch was made. Supported imports and supplier model assets were not hand-edited. Source/lock/archive hashes are in the component integrity manifest.

R6/R7 original directories remain untouched. Preservation testing covers exactly 129 files, not a new verification of the historical 972-file R4/R5 archive. No ordering, supplier outreach, public issues, R8 fabrication package or changes to unrelated projects occurred.

GitHub and tscircuit remote updates: **neither performed**. Publication is blocked by component qualification and the lack of a validated ESP32-C3 board/`dist/index/circuit.json`; copied Nordic output must not be published as an R8 result. Ignore rules now permit that required root artifact when a future qualified source generates it. The module fixture JSON is evidence only.

## Cloud setup continuation — 2026-10-05

The preceding sections record the pre-cloud qualification stage; their results are not reinterpreted as a completed ESP32 board. The current request is to move heavy execution off the Mac and provide a self-contained GitHub checkout.

New branch: `cloud/r8-cloud-setup`, based on existing public repository `AnasSarkiz/magnetic-shutter-remote` main commit `5951f419c8314b83648d89e1cfb7e29e87e32eb8`. `main` is not overwritten. The published source/enclosure/JSON is archived byte-for-byte in `baselines/published-main/`; its generated JSON is explicitly Nordic reference output. `baselines/r7/` includes the 129-file preservation snapshot and key qualification documents. Original R6/R7 directories remain unchanged.

Portable instructions, decision history, precise blockers, source/raw manufacturer evidence, local-qualified runtime/base archives, firmware and the complete relevant tscircuit skill are included. Credentials, node_modules, installed SDKs/venvs and caches are excluded. Historical missing R5 archive remains missing; no old failure is converted to a pass. See `cloud/HANDOFF.md` for the context map and exclusions.

Changed files for portability: `tests/test_r8_qualification.py` now verifies the same129 hashes against the explicit in-repository snapshot; original absolute-path manifest stays unchanged. Configs exclude immutable baselines from active TS/tsci entry discovery. Added Linux-only setup/smoke, resource-budget launcher, meaningful launcher regression tests and a Linux CI smoke workflow. No root PCB/source/import/firmware application change or routing/export rebuild was performed.

Local Cloud preparation checks:10 focused tests PASS (5 original qualification +5 launcher), context snapshot129/129 and recorded vendor/base archive hashes PASS; TypeScript/format/shell syntax PASS. A pipe ResourceWarning found during launcher regression was fixed by closing the subprocess stream through its context manager; warning-as-error rerun passes. Tests deliberately run only a tiny failing Python child, never a PCB/routing command.

Linux install/fixture CI and actual Codex Cloud environment activation are separate results; see `cloud/STATUS.md`. No Cloud memory guarantee or hosted routing result is claimed from local smoke checks. Frozen Nordic JSON is included in the handoff; no new R8 root circuitJSON is fabricated. This is a source/environment setup publication, not a tscircuit board release or fabrication approval.

Hosted Linux preparation subsequently passed on GitHub Actions run37291506181 at source commit56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad: exact locked runtime/dependencies,129 context hashes and source/archive hashes, formatting, TypeScript,10 focused tests and isolated **unrouted** fixture PCB/schematic exports. The existing requires_power warning remains visible; Actions runtime/dependency deprecation warnings are preserved in the complete log. This is not whole-board or Codex Cloud routing evidence. Anonymous public reads of setup/handoff/frozen circuitJSON match local hashes; remote main remains5951f419c8314b83648d89e1cfb7e29e87e32eb8. Actual Codex Cloud activation is pending specific-repository GitHub connector access, prepared but not granted; see STATUS.md. No active PCB/source/import/firmware application changes were introduced by this follow-up.
