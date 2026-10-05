# Magnetic shutter remote — Cloud continuation instructions

Read `cloud/HANDOFF.md`, `VALIDATION.md`, `cloud/WORKSPACE-INSTRUCTIONS.md`, and the repository-local tscircuit skill before changing code. These files carry the project context; the cloud task must not depend on this chat or a macOS directory existing.

## Scope and preservation

- This repository root is the isolated R8 workspace originally checked out on `cloud/r8-cloud-setup`. Engineering continuation uses `board/r8-doit-c3-prototype-20261005`; preserve active task branches. Continue here for this task; do not rebuild the tscircuit store application.
- `baselines/` is immutable reference material. It contains the 129-file R7 snapshot and the published Nordic source/enclosure/build. Verify `cloud/R7-PORTABLE-MANIFEST.json` before and after work. Do not edit or regenerate archived files.
- R6 remains frozen at `77965a8012d5544e962d987ce958c5c5614dbe3a`. Original R7 starts at `636d2b24eb4db775fceeb81206541f249db3b9a5`. No history rewriting, force push, default-branch change or automatic merge.
- Active root is the routed R8 ESP32-C3 engineering prototype with0 native/independent errors and0 shorts; local exports pass, physical validation and supplier processed-preview remain pending. DOIT ESPC3-12-N4 / C19949072 is now fitted after the hosted build proved pinned C2 Bluetooth support incomplete. Frozen JSON in `baselines/` remains Nordic and is never R8 validation evidence.
- After onboarding the user authorized engineering continuation and requested routing with zero DRC errors and zero shorts. This does not waive qualification. Original issue075 remains open for the abandoned C3 module; issue076 has a tested fixture override but its upstream omission remains open. Issues078/079 record supplier example-land variations, reassessed for engineering prototype use in `evidence/R8-prototype-2026-10-05/QUALIFICATION.md`; nominal differences alone are not demonstrated electrical blockers. Do not route until new R8 BOM, supply/boot/programming circuitry, connectivity and placement checks pass. Original investigation evidence remains preserved.
- No torch/fill light. One battery and one USB-C charging port; existing red LEDs are status indicators. Preserve verified USB4215-03-A / C37616412 functionality unless the migration requires a justified local change.

### Current radio decision after hosted firmware verification

Use **DOIT ESPC3-12-N4 / C19949072**: exact22-pin import and nominal lands qualified; UART GPIO20/21, LED GPIO6/pin12 and BOOT GPIO9/pin18. It is the cheapest checked module compatible with pinned Zephyr4.2 BLE. The earlier C2 selection below is preserved history, superseded by actual missing Bluetooth sources/libraries. See `evidence/R8-components/alternative-radio-2026-10-05/c3-supported-ble/`. No frozen inputs or failed evidence may be discarded.

### Earlier radio decision after onboarding (superseded)

The user's later request supersedes the original ESP32-C3-WROOM-02-N4 selection: use the cheaper **DOIT ESPC2-12E-N4 / C19949081** (ESP32-C2/ESP8684, 4 MB flash, onboard antenna). See the dated selection evidence in `evidence/R8-components/alternative-radio-2026-10-05/SELECTION.md`. Original C3 supplier/import/firmware evidence stays unchanged; do not reuse its GPIO20/21 UART contract for C2 (module UART is GPIO19/20). At that earlier stage the root implemented C2; this historical decision is superseded by the fitted C3 above. Qualification gates, frozen-baseline protection, sequential heavy-job guard and separate ordering/supplier authorization still apply.

## Electronic parts and validation

Every fitted part requires exact manufacturer MPN and eligible stocked JLCPCB/LCSC C-number. Use supported JLCPCB imports. No custom substitute footprints, generated-import edits, guessed pins, fabricated numbers, generic placeholder parts or manually edited circuit JSON. Preserve original failing inputs and report discrepancies. Focused generic tooling fixes with meaningful tests are authorized; do not suppress warnings or weaken tests/checkers.

Follow the workspace validation stages: requirements → schematic/BOM → unrouted placement → routing → automated/visual checks → fabrication exports/supplier preview. Use native A4 schematic sheets. Record actual measurements and inspection evidence; do not reuse R6/R7 pass counts as R8 results. Physical battery, RF, thermal, runtime, enclosure fit and phone tests remain **POST-PROTOTYPE PHYSICAL VALIDATION**.

## Cloud execution

- Run `bash cloud/setup.sh` to install pinned task-local Node/Bun and project dependencies. `bash cloud/smoke.sh` runs lightweight checks only. Linux CAM tools are optional: `bash cloud/setup.sh --with-cam` with Python 3.14.
- Heavy build/routing must run in the Linux Cloud VM using `python3 cloud/run-heavy.py -- <command>`. This wrapper refuses macOS, serializes jobs, sets a measured memory budget and preserves exit status/resources. It does not fix the autorouter or waive qualification gates.
- Never start multiple routing/viewer/firmware builds concurrently. Record the VM/cgroup limit and OOM evidence. A Cloud move is not a guarantee of sufficient RAM.
- Setup/smoke must not route the copied Nordic root or start a live viewer. No local Mac routing is authorized for this setup request.
- Use the locked `bun.lock`, local-qualified `tooling/vendor` archives and existing commands. No floating dependency upgrades or switch to a different board toolchain. Do not handpatch artifacts when fixing source/generators.
- Read the current tscircuit handbook before implementation. The bundled skill is under `.agents/skills/tscircuit/`; personal macOS skills are not assumed available.

## Outputs and external actions

Keep new evidence separate from frozen manifests. Do not overwrite the old R8 integrity manifest; record a versioned successor after source/dependency changes. Document every distinct tscircuit issue in the retained `tscircuit-issues/` index with accurate bug/supplier/project classification.

Public board GitHub/tscircuit publication is standing-authorized only after applicable checks, with a generated `dist/index/circuit.json` matching the same source and clear prototype status. This Cloud setup branch is a source/context handoff, not a validated ESP32 board publication. No stale JSON may be presented as an R8 build.

Do not order, pay, approve PCBA substitutions, upload files to an assembler, contact suppliers, create public issues, publish tooling packages or merge a PR automatically. Any supplier-processed JLCPCB preview still requires review before payment. Report exact remaining blockers and what actually ran.
