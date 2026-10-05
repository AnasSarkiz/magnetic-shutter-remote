# Cloud handoff — magnetic shutter remote, 2026-10-05

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
