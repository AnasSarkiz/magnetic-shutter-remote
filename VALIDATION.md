# Current qualified R8-C3 prototype — hosted2026-10-05

**0 native errors,0 shorts,0 independent manufacturing/process failures.** Source-generated DOIT ESPC3-12-N4/C19949072 prototype,44 fitted TOP references,48×56×1mm2-layer FR4. Full results, assumptions, warnings and reproduction are in [routed review](evidence/R8-prototype-2026-10-05/REVIEW.md). Final build is `c3-route-20`; the successor integrity manifest identifies the actual changed source from base HEADb25353c. Previous failure records below are historical evidence.

| Stage | Current status | Scope |
|---|---|---|
|1 Requirements|passed for engineering prototype|One protected battery, USB charge,3.3V/500mA design supply, native RF/mechanical exclusion and manufacturing rules; physical performance pending|
|2 Schematic/BOM|passed|Exact44 refs/24 C numbers, manufacturer contracts and dated stock; DOIT C3 replaces WROOM/C2 choices|
|3 Unrouted placement|passed|Native source/netlist/pin/schematic/PCB placement checks; all3 A4 sheets and geometry reviewed|
|4 Copper routing|passed|Native and independent checks0; shorts0; full terminal continuity/RF/EP ground pass; measured nominal power paths|
|5 Automated/visual|passed|Focused20 Python+2 Bun tests,17 CAM regressions,7 tooling tests; format/typecheck, native snapshots and visual review pass|
|6 Prototype fabrication|in progress|All12 Gerber/drill readback,44-ref BOM/CPL,160-aperture stencil/mask/silk checks pass; supplier-processed assembly preview unperformed; no ordering/upload authorization|
|7 Physical prototype|not started|POST-PROTOTYPE PHYSICAL VALIDATION:power/startup, programming/BLE phone, RF, charge/cell thermal, battery/runtime, enclosure/shoulder fit|
|8 Publication/release|prototype prepared; registry blocked|Hardware untested; `tsci push index.circuit.tsx --include-dist --version-tag prototype` exited1 before upload because this hosted instance has no tscircuit login; GitHub disposition is recorded with the final report|

Accepted source warnings are exact discrete MOSFETs modeled as generic chips (issue084), not radio supply omissions. Original075/076 remain explicit and separate; fitted DOIT VCC/GND metadata are correct. Frozen Nordic baselines and original manifests remain unchanged. No ordering, payment, supplier contact or assembler upload occurred.

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
