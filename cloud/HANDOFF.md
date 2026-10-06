# Current R8 0.3.11 — schematic capacitor groups, 2026-10-06

C10/C3/C4 native schematic coordinates bring all three reported capacitor
groups within the latest browser analyzer's recommended spacing. Actual
browser and pinned CLI style analyses pass zero issues. All 1,451 physical/
electrical elements are identical to 0.3.10; PCB placement, routing, values
and 159 pin contracts are unchanged. Fresh native/independent clearance,
29 physical nets, 174 track widths/current paths and export/process checks
pass. Six native A4 pages and reviewed snapshots retain all 44 explanations.
[Current review](../evidence/R8-capacitor-groups-2026-10-06/REVIEW.md). Circuit JSON SHA256: 7a4c1f7c658e30988676f8ed3d7f9346cf04856a6079d1ae7395ac6fcb9c38bf.

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
layers are inspected. [Current review](../evidence/R8-style-vias-2026-10-06/REVIEW.md).
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
drawing points to its component guide. [Current review](../evidence/R8-schematic-notes-2026-10-06/REVIEW.md).
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
[Current review](../evidence/R8-uart-silkscreen-2026-10-06/REVIEW.md).
Public publication receipt is recorded separately after remote verification.
Supplier approval, physical operation and full MagSafe fit remain pending.
Missing `3V3` metadata remains a separate importer issue.

## Prior review/publication records — preserved history

# Current R8 compact PCB review — 2026-10-06

Published public **0.3.6-prototype**: native367-file upload and22 critical
anonymous text/binary matches pass, including exact Circuit JSON and UART UF2.
[Actual publication receipt](../evidence/R8-issue-resolution-2026-10-06/PUBLICATION.md).
Hosted preview remains pending; supplier approval/physical/MagSafe fit stay open.

Latest [issue resolution](../evidence/R8-issue-resolution-2026-10-06/REVIEW.md):
pinned standard JST programmer0.8.0 UF2/ELF build and USB/UF2 validation pass.
Fresh native0 DRC errors/shorts,29/29 physical nets,164 widths and corrected
±30% current budgets pass; smoke38 Python+2 Bun/13 assertions and29 CAM pass.
Package0.3.6-prototype updates audit/programmer evidence; PCB stays hardware0.3.5.
Inventory096 is an unconfirmed allocation question, not a proven shortage.
Official Apple R31 guidance is retained; exact magnet/enclosure/phone fit,
supplier-processed preview and physical operation remain unqualified.
See the dated review for evidence and the subsequent publication record.

Latest [six-point review](../evidence/R8-six-point-review-2026-10-06/REVIEW.md)
passes12 fresh placement/netlist/copper/current/fabrication checks on unchanged
0.3.5 route23. Official25 exact JLCPCB MPN/SMT listings reviewed;24 direct fields
cover five boards, but fitted radioC19949072 returns3 direct/66 overseas and
needs allocation confirmation (procurement096). Supporting UI host
assets.jlcpcb.com was proxy-blocked403; no policy change/bypass. Programmer
latest0.8.0 UART is compatible with J3, but UART UF2 build/install, physical
flash/readback and other hardware/MagSafe tests remain pending. No substitution/order.

Latest functional follow-up: [review](../evidence/R8-functional-review-2026-10-06/REVIEW.md).
Fresh29/29 physical nets and0 native DRC errors/shorts pass, with manufacturer
power/charge/switch/boot/UART and compiled firmware GPIO/HID review. Audit095
corrects the inductor tolerance to±30% (min1.05µH) and enforces TI20% saturation
margin; unchanged route23 still passes0.7450A RMS/0.8446A peak.29 CAM tests,
36 Python+2 Bun smoke tests and actual pinned image parsing pass. Earlier±20%
ripple figures are superseded without editing archived reports. Physical
power/flashing/BLE/RF/thermal/product tests and supplier approval remain pending.

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
pass. Full measurements, logs and assumptions: [compact review](../evidence/R8-compact-pcb-2026-10-06/REVIEW.md).

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
[Actual publication](../evidence/R8-compact-pcb-2026-10-06/PUBLICATION.md). The prior
0.3.4-prototype remains historical output.

# Prior continuation result —2026-10-05

Current R8 hardware0.3.3/package0.3.4 has direct3-pin JST SH programming: J3 C160389 1RX(GPIO20)/2GND/3TX(GPIO21), supports4/5GND. Match standard-jst-programmer0.8.0 J5 with a straight-through SH cable; battery on, R8 USB-C unplugged, programmer target-power/SWD unplugged, manual BOOT/RESET, CDC0/DTR true using the supported host helper. Read [programming](../evidence/R8-standard-programmer-2026-10-05/PROGRAMMING.md). No physical flash is claimed; programmer UF2 build remains a separate later operation.

Route06 passes0native errors/shorts/independent manufacturing/process failures,29terminal nets,0RF intrusion,44TOP refs/25Cs,159paste features and12native fabrication files. Right-edge TS24CA side switch and DOIT C3/unchanged BLE image retained. Read [review](../evidence/R8-standard-programmer-2026-10-05/REVIEW.md) and current VALIDATION. New089/090 full-silk audit/core visibility correction passes meaningful regressions and canonical build with reproducible archives.004+084 warnings stay explicit; Missing `3V3` metadata remains a separate importer issue. Physical tests and supplier processed-preview remain pending. New0.3.4-prototype native publication passes:218files, public/ready_to_build=true, exact anonymous JSON/GitHub bytes. Hosted preview remains pending at observation; read current PUBLICATION.md.0.3.2 is the previous side-switch release.

Saved environment setup/start remains lightweight, preserves explicit-ref checkout/active task branches/R8 context, and uses task-local cache. Onboarding prohibitions do not prohibit later user-authorized engineering/public prototypes. Frozen baselines, guarded serial heavy work and separate order/payment/contact authorization remain unchanged. Observed32GiB/4CPU is not guaranteed. Historical sections below are retained history, not current identities/blockers.

# Cloud handoff — magnetic shutter remote, 2026-10-05

## Current radio and firmware disposition — 2026-10-05

The fitted module is now **DOIT ESPC3-12-N4 / C19949072**, the cheapest checked candidate compatible with the pinned BLE firmware. Its observed direct small-prototype price is $2.2662 versus the abandoned WROOM module's $3.2887 (about31% lower); stock/price are observations, not reservations or assembly quotes. The cheaper C2 candidate was electrically qualified but the actual hosted firmware build proved pinned Zephyr4.2/hal_espressif lacks its Bluetooth adapter/controller libraries. Board support alone was insufficient. Both investigations remain preserved.

The supported exact import has22 contacts matching the DOIT nominal1.0×1.5 mm drawing and all22 datasheet labels. Original supplier data and a measured conversion audit are in `evidence/R8-components/alternative-radio-2026-10-05/c3-supported-ble/`. This replacement has correct VCC/GND metadata; original WROOM issues075 and076 remain distinct and open upstream. Root pin contract: EN3,GPIO4/shutter6,GPIO5/pair7,VCC8,GND15,GPIO6/LED12,GPIO9/BOOT18,GPIO20/RX21,GPIO21/TX22. Firmware targets `esp32c3_devkitc/esp32c3`, with40 MHz per silicon requirement, not the26 MHz C2 overlay. Its main application remains unchanged. C3 root electrical identity, unrouted placement, routed native/independent clearance, shorts, physical continuity and local fabrication readback pass. Supplier-processed preview and physical validation remain pending.


## Earlier C2 engineering continuation — superseded by C3 firmware verification

The active root now implements ESP32-C2 / DOIT ESPC2-12E-N4, 44 fitted references, a TPS63031 buck-boost supply, the exact SH battery mate and 300 mA nominal charging. The new schematic/BOM and unrouted placement passed their gates. Routing is in progress; no final zero-DRC/zero-short or fabrication-release pass is claimed yet. The older sections below describe earlier investigation states and frozen baselines, not the current root.

Issues075/076 concern the abandoned C3 selection and its separate power-metadata omission; they do not block the fitted C2 module. Issues078/079 are supplier example-land variations accepted for engineering prototype use with explicit geometry/process calculations in [qualification](../evidence/R8-prototype-2026-10-05/QUALIFICATION.md). Actual copper, drilling, continuity and export checks remain required. Frozen baselines stay immutable; ordering, payment and supplier contact remain unauthorized. Hardware tests remain POST-PROTOTYPE PHYSICAL VALIDATION.


## Earlier routing investigation — retained history

The later user request authorizes engineering continuation and requires a routed C2 board with0 DRC errors and0 shorts after qualification gates pass. It is **blocked before routing**, not a successful routed build: TPS63031 supplier contact lands remain unqualified (issue078), and a Sunlord inductor candidate differs from its recommendation (issue079). Supported alternatives and the exact SH battery mate have been imported separately; none is fitted in the Nordic root. The battery's SH mapping is pin2 positive/pin1 ground. Charge-current selection must also account for BQ25185's360-minute safety timer. See `evidence/R8-routing-2026-10-05/ROUTING-STATUS.md`, retained inputs/logs and successor manifest. DRC/short counts remain unrun/unknown. Frozen baselines and sequential heavy-job memory guards remain immutable.

## Earlier C2 radio decision — superseded

The user subsequently authorized a cheaper alternative to bypass the unqualified C2934560 land pattern. The selected R8 radio is now **DOIT ESPC2-12E-N4 / C19949081**, an ESP32-C2/ESP8684-based BLE 5 module with onboard PCB antenna and 4 MB flash. Supported exact-footprint import and native unrouted qualification fixture are retained. See `evidence/R8-components/alternative-radio-2026-10-05/SELECTION.md` for dated direct prices, manufacturer land/pin comparison, remaining migration work and validation evidence.

The original C3 module/import, issue 075 and C3 firmware artifacts remain historical evidence; they are not altered or silently requalified. Issue 076 has a tested manufacturer-specific pinAttributes correction in the original C3 fixture; its upstream omission remains open. The root board is still Nordic and must not be presented as an ESP32-C2 implementation. C2 firmware adaptation, complete power/BOM qualification, placement, routing and physical testing remain pending. No change to the one-battery/one-USB/no-torch decisions or supplier/order restrictions.

## Read this first

Repository: https://github.com/AnasSarkiz/magnetic-shutter-remote . Cloud branch: `cloud/r8-cloud-setup`. Local continuation directory was `boards/magnetic-shutter-remote-r8--01a0f81f`; on Cloud the checkout root is the task workspace. Do not rely on any `/Users/...` path in preserved historical logs.

The user reports that routing repeatedly exhausts the Mac's memory. Move heavy execution to Cloud, preserve context and continue the same project. **This setup does not perform the ESP32 board migration or waive its blockers.** Do not run routing locally. No order, payment or assembler upload is authorized.

## Product decisions, including superseded requests

Original magnetic phone grip and detachable Bluetooth shutter remote inspired by JJC MSG-P1; not a drop-in JJC replacement. Never claim estimated perspective-image dimensions as original JJC measurements. Reference links:

- https://www.amazon.com/dp/B0CG8XK5KC?th=1
- https://youtube.com/shorts/QEAleYOqQgk
- https://jjc.cc/index/goods/detail.html?id=1701
- https://docs.tscircuit.com/
- https://github.com/tscircuit/handbook

One rechargeable battery and one USB-C charging port. Native iPhone Camera and a representative Android camera app are intended; BLE HID Consumer Volume Increment (`0xE9`) is implemented, not an assumption that all camera apps behave identically. Pairing/power and printable battery/programming orientation markings are required. All electronics assemble on TOP. Shutter control should eventually be camera-style on the side/shoulder. Frozen front-button mechanics are only a baseline; shoulder implementation remains unfinished.

**Torch/fill-light work was cancelled.** Do not revive the proposed 1.5–2 W, warm/neutral/cool ring, ring JST, driver, 500–600 mAh torch battery or second charging port. Red PCB LEDs remain status indicators. Historical torch imports/issues are retained as evidence, not fitted parts.

The latest electronics decision is **use Espressif ESP32-C3-WROOM-02-N4** to reduce cost. Do not substitute a different radio without an explicit user change. Update power supply, boot straps, programming, firmware, placement/mechanics and final routing/exports once component qualification permits it. Keep previously proven USB/charger functionality when suitable; justify necessary changes.

## Frozen R6/R7 facts

R6 source commit: `77965a8012d5544e962d987ce958c5c5614dbe3a`. R7 branch `r7-shutter-only-order-review`, commit `636d2b24eb4db775fceeb81206541f249db3b9a5`; active electronics still frozen R6. Copied source/imports/root BOM and current mechanics in this branch are **Nordic baseline**, not an ESP32-C3 PCB. R8 has no qualified placement, routing, BOM/CPL or CAM release.

Baseline: 36 ×56 ×1 mm PCB, two layers, 37 TOP/0 BOTTOM fitted components, 24 exact JLC identities. J1 GCT USB4215-03-A / C37616412, supplier UUID `3104977db58742e399663286e4a66eac`, rotation180°, USB mouth toward +Y edge. Both charging plug orientations have separate CC Rd and paired VBUS/GND. Four shell anchors map to GND, four plated G85 slots; 16 USB TOP paste features (12 contacts +4 shell). Total frozen TOP paste count161; 12 CAM files; 37/37 component registration. Actual mask dam approximately0.098247 mm requires JLC-processed-preview disposition; do not quietly widen/waive it.

Baseline BQ25185 solid GND/EP plane and RF keepout were qualified. Stencil0.10 mm, worst calculated area ratio0.6999986. Original110 mAh battery and3.0 V/200 mA LDO are suitable only to the recorded Nordic envelope, not the new ESP32 supply requirement. Old SWD header/firmware cannot be reused as ESP32 UART/download access without migration.

R7 historical full board suite:79 tests,77 PASS,1 FAIL,1 SKIPPED. Failure: missing original R5 DFM-review ZIP,971/972 historical R4/R5 files matched; issue074. Skip: missing R2 fixture. Do not claim all972 reverified/passing. All2,898 recorded original R6 files were verified in the historical run; this Cloud handoff does not rerun that whole archive check. Portable current preservation check covers exactly129 R7 source/import/firmware/mechanical/build files.

Importer: USB4215 focused7,685 assertions PASS; 33 unchanged-control baseline full-suite failures remain. Later generic curved-paste extension9,174 assertions PASS, core focused219 assertions PASS. Do not claim the full importer suite passes. Full context and dated evidence are in issue reports/toolchain manifests; these are prior results, not a fresh Cloud rerun.

Before paying for any Nordic baseline prototype, inspect actual JLCPCB processing: exact J1 part/orientation/mouth, four plated shell slots,16 paste features, mask dam,37 TOP mappings, carrier/rails, every warning, stock/substitutions, and **five finished assembled boards rather than five panels**. Production-specific USB stencil/reflow/cycle/shell process qualification remains pending separately; do not restart a broad connector search. No supplier response was invented.

## R8 engineering completed so far

- Selected module ESP32-C3-WROOM-02-N4 / C2934560 imported via supported JLC pipeline, preserving TSX/STEP/OBJ and supplier JSON. Dated listing2026-10-05: Extended SMT, Economic/Standard, MSL3, stock11602/orderable7755; not reserved or a current future quote.
- All19 logical pins checked against official Espressif v1.7. All27 copper features faithfully imported; maximum conversion difference5.084821452783217e-14 mm;9 exposed-ground tiles. Native unrouted module fixture and A4 schematic/3D inspected. No full-board pass is implied.
- **Issue075:** outer supplier lands approximately2.0 ×1.0 mm versus recommended1.5 ×0.9 mm. Recommendation is not a tolerance; wider lands are not automatically defective. Manufacturer acceptance of this variation is unestablished. It is supplier geometry, not a scaling bug. Do not handpatch imports or edit generated JSON. Workspace instructions block dependent board work until qualified import/authoritative variation evidence.
- **Issue076:** correct numeric `3V3` label lacks inferred power metadata; `U1 has no pin with requires_power=true`. Generic power-label inference misses this label; EP grounding cannot be guessed. Warning preserved. No upstream fix or fabricated metadata claimed.
- TI TPS63031DSKR / C15516 buck-boost imported as proposed3.3 V supply, not final qualification. Its supplier pads also vary from TI example, still need land/paste/thermal/inductor/capacitance qualification. Espressif requests3.0–3.6 V and supply capability≥0.5 A, not continuous500 mA BLE load. Old regulator/battery cannot satisfy that envelope.
- External protected battery candidate TinyCircuits ASR00012/Hondark803040PL-1000mAh:1 A maxdischarge, maximum43 ×32 ×8.5 mm, JST SH harness. Not final fitted battery; existing PH mate incompatible. Charging limits, polarity, exact eligible mate and enclosure fit still need audit. External battery receives no fabricated C-number.
- Charger VSET130 kΩ means4.1 V, not4.2 V; TI currentSLUSF65B August2026. Max4.1205 V calculated. Original20 mA charge would be too slow for1000 mAh; new charge current/thermal/temperature/harness work unfinished. See POWER-FEASIBILITY.md for transparent estimates, not measured runtime.
- ESP32 Zephyr firmware built successfully:411568-byte image, valid checksum. Zephyr4.2.0/SDK0.17.2; exact revisions/source/artifact hashes retained. ProposedGPIO4 shutter,5 pair,6 status; UART20RX/21TX, EN and GPIO9download; GPIO2/8straps require manufacturer-correct circuitry. Pins are not registered to a routed PCB. BLE bonding and60 ms press/release retained. Wi-Fi disabled, CPU/controller sleep not established; no hardware/phone/low-power pass.

## Reproduction and context map

`AGENTS.md`: working rules. `cloud/WORKSPACE-INSTRUCTIONS.md`: original controlling workspace instructions, copied verbatim. `.agents/skills/tscircuit/`: bundled complete relevant skill. `VALIDATION.md`: R8 gates. `tscircuit-issues/`: retained historical reports plus075/076; original inputs/logs remain unchanged where included.

`baselines/r7/`: 129 exact frozen files plus key qualification documents; verify `cloud/R7-PORTABLE-MANIFEST.json`. Original absolute-path manifest is retained for provenance, not portable execution. `baselines/published-main/`: exact public source, enclosure models and generated circuit JSON at `cloud/PUBLISHED-BASELINE.json` commit. None is an ESP32 build.

`tooling/vendor/`: locked runtime archives. `tooling/R7-patches/manifest.json`: exact base sources/patches/archive hashes; base archives copied at recorded paths. `tooling/source-archives/`: qualified generic source reconstruction inputs. `evidence/USB4215-import-audit/`: retained importer status/control/fixed records. Manufacturer module/battery/regulator PDFs, source raw JSON, firmware logs and geometry drawings are under `evidence/R8-components/`.

`cloud/R8-PRE-CLOUD-MANIFEST.json` and the existing R8 integrity manifest retain the pre-cloud hash record. Cloud portability edits to test/config/docs do not silently replace it. No PCB source, imported component definition or firmware application source changes are part of setup.

Read `cloud/SETUP.md` and run setup/smoke. Repository-local skills are included because personal Mac skills do not sync automatically. Full installed SDKs, node_modules, caches, credentials and unrelated app content are excluded. Historical reports may cite archived local runs whose complete upstream test/image collections are not copied; never convert a missing historical artifact into a pass. The missing R5 archive remains an explicit unresolved historical issue.

## Next work in order

1. Verify Cloud install/smoke and memory report; do not reroute the old root just to test RAM.
2. Resolve exact-module land qualification and power metadata through supported source/import workflow. Preserve failed inputs and logs. No supplier outreach unless separately authorized.
3. Select/qualify complete buck-boost circuit and battery/harness; audit charger limits/temperature, straps/reset/programming, current path widths and automatic shutdown. One battery/one USB/no torch.
4. Freeze original enclosure/side controls and antenna clearances for actual components. Do not claim old40 mm body fits the larger candidate pack.
5. Complete source/BOM/unrouted placement checks, then Cloud routing; run all applicable connectivity/shorts/schema/clearance/visual checks without weakening criteria.
6. Generate same-revision circuitJSON/CAM/drills/BOM/CPL and inspect outputs/rotations. Publish public GitHub +tscircuit board only with matching validated buildJSON and accurate prototype status. No order/payment.

Physical battery, RF, thermal, runtime, enclosure fit and phone acceptance remain **POST-PROTOTYPE PHYSICAL VALIDATION**. Cloud memory and compile checks do not replace these tests.
