# Current R8 0.3.8 schematic component guides — 2026-10-06

Native schematic text explains all44 fitted components on three matching
A4 guide pages, alongside the three original A4 circuit drawings. Each
drawing points to its component guide. [Current review](evidence/R8-schematic-notes-2026-10-06/REVIEW.md).
Current Circuit JSON SHA256: `a832847cf74311f56e4c2ab3c4256f34cdda2a66a7d2f4b8b49617762fc411c6`.
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
