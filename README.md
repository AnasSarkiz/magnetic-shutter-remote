# Current R8 0.3.12 — bottom silkscreen cleanup, 2026-10-06

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

# Magnetic shutter remote R8 — ESP32-C3 engineering prototype

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

Latest [six-point board review](evidence/R8-six-point-review-2026-10-06/REVIEW.md)
passes fresh placement/netlist/DRC/shorts/29-net connectivity/164-width/current
and12-file fabrication readback. All25 exact parts are listed for SMT on JLCPCB;
ESP32C19949072 reports3 direct/66 overseas, so stock for five boards needs
confirmation. Standard JST programmer0.8.0 UART matches J3, with UART firmware,
battery power and manual BOOT/RESET required. Physical operation/fit remains untested.

Latest [functional net review](evidence/R8-functional-review-2026-10-06/REVIEW.md)
passes power/charge/switch/boot/UART/button design checks and fresh29/29 physical
nets,0 DRC errors/shorts. Corrected the checker to the fitted inductor's±30%
tolerance and TI20% saturation margin; existing copper still passes. PCB and
firmware remain0.3.5 and physically untested; prototype bring-up is documented.

The compact redesign must use a MagSafe phone-facing grip and support multiple
iPhone sizes and compatible cases. [Mechanical requirements](mechanical/R8-MAGSAFE-REQUIREMENTS.md)
define the model/camera/case and antenna-clearance gates. MagSafe attachment and
multi-model fit are pending; the historical disc-magnet/steel-plate enclosure is
not a validated MagSafe mount.

The active source implements the selected DOIT ESPC3-12-N4 / C19949072 BLE shutter remote, with one protected battery, USB-C charging, TPS63031 3.3 V buck-boost supply and UART programming. Two-layer FR4 board: 44 × 56 × 1 mm, 44 fitted TOP references. No torch. The shutter uses a side-actuated TS24CA/C393942 switch on the right edge, pressed horizontally inward; GPIO4 is unchanged. Hardware revision0.3.5; package0.3.6 evidence/programmer refresh; compact direct3-pin JST UART prototype.

**Routed prototype: 0 native DRC errors, 0 shorts and 0 independent manufacturing failures.** All 29 required nets are physically connected; all 164 track widths and seven power-current paths pass. VIN/inductor necks are 0.30mm. Exact components, local fabrication readback and process/visual checks pass. The BOM, placement and Gerbers are ready for review; supplier-processed preview and physical tests remain pending. See [routed review](evidence/R8-compact-pcb-2026-10-06/REVIEW.md), [validation](VALIDATION.md) and [qualification](evidence/R8-standard-programmer-2026-10-05/qualification/QUALIFICATION.md).

The original issue075 applies to the abandoned C3 module. Its separate missing `3V3` power metadata is issue076; the selected DOIT C3 import already has correct VCC/GND attributes. Issues078/079 describe example-land variations accepted for engineering prototype use after measured geometry and paste review. They are not demonstrated electrical blockers. Original investigations and all frozen Nordic references remain preserved under `baselines/`.

Preserve the active engineering branch `board/r8-doit-c3-prototype-20261005`; initial environment installation starts from `cloud/r8-cloud-setup` and read [AGENTS.md](AGENTS.md), [handoff](cloud/HANDOFF.md) and [setup](cloud/SETUP.md). Setup/smoke remain lightweight:

```sh
bash cloud/setup.sh
bash cloud/smoke.sh
```

After qualification and placement pass, run heavy jobs sequentially through `python3 cloud/run-heavy.py -- <command>`. Use the locked toolchain. The observed hosted limit is 32 GiB, not a guaranteed allocation. [Firmware](firmware/README.md) targets ESP32-C3 at40 MHz. Actual C2 BLE build failure and original outputs remain preserved.

Battery/RF/thermal/runtime, phone operation and enclosure/shoulder-control fit require POST-PROTOTYPE PHYSICAL VALIDATION. No order, payment, supplier contact or assembler upload is authorized by this task.

Programming via [standard-jst-programmer0.8.0](https://tscircuit.com/tscircuit/standard-jst-programmer): R8 J3 **1 RX /2 GND /3 TX**, straight-through SH cable to programmer J5. Battery power, manual BOOT/RESET, UART-enabled firmware and DTR-enabled host helper are required. See [programming procedure](evidence/R8-standard-programmer-2026-10-05/PROGRAMMING.md). Physical flashing remains untested. Published **0.3.5-prototype**: all270 native files and matching anonymous Circuit JSON/key-report readback pass; hosted preview remains pending at observation. See [actual publication](evidence/R8-compact-pcb-2026-10-06/PUBLICATION.md). The prior [0.3.4-prototype publication](evidence/R8-standard-programmer-2026-10-05/PUBLICATION.md) remains historical.

Missing `3V3` metadata remains a separate importer issue.
