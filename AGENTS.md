# Magnetic shutter remote — Cloud continuation instructions

Read `cloud/HANDOFF.md`, `VALIDATION.md`, `cloud/WORKSPACE-INSTRUCTIONS.md`, and the repository-local tscircuit skill before changing code. These files carry the project context; the cloud task must not depend on this chat or a macOS directory existing.

## Scope and preservation

- This repository root is the isolated R8 workspace on `cloud/r8-cloud-setup`. Continue here for this task; do not rebuild the tscircuit store application.
- `baselines/` is immutable reference material. It contains the 129-file R7 snapshot and the published Nordic source/enclosure/build. Verify `cloud/R7-PORTABLE-MANIFEST.json` before and after work. Do not edit or regenerate archived files.
- R6 remains frozen at `77965a8012d5544e962d987ce958c5c5614dbe3a`. Original R7 starts at `636d2b24eb4db775fceeb81206541f249db3b9a5`. No history rewriting, force push, default-branch change or automatic merge.
- Active root PCB source is still the Nordic starting copy. **ESP32-C3-WROOM-02-N4 / C2934560 is NOT fitted yet.** The frozen JSON in `baselines/` is not an R8 ESP32 build.
- The current request is Cloud setup, not authorization to waive component qualification. Issues 075 and 076 remain unresolved. Do not route R8 until BOM, supply/boot/programming circuitry, connectivity and placement are qualified.
- No torch/fill light. One battery and one USB-C charging port; existing red LEDs are status indicators. Preserve verified USB4215-03-A / C37616412 functionality unless the migration requires a justified local change.

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
