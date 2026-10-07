# Current R8 0.3.16 — compact source and native product assembly

Read `evidence/R8-product16-2026-10-07/REVIEW.md` and `product/README.md`.
Active source is four electronics files;36 route exports and all1049 PCB/CAD
and576 schematic elements are unchanged. Obsolete route modules/mechanics/views
are byte-preserved in verified archives. Native closed/exploded product assemblies
use the actual44-model R8 PCB, retained protected battery envelope, service lid,
horizontal shutter and separate MagSafe grip/contact cover. Six current print
meshes pass native-dimension/volume agreement and closed/winding/readback checks.
Exact magnet/DC shield, bonding, hardware/harness/thermal and phone/RF/retention
qualification remain pending. Do not claim universal fit or physical testing.
Current publication receipt follows actual upload/readback; prior incomplete
0.3.15 is preserved history. Ring remains deferred; immutable baselines, light
setup/start, memory guards, active branches and ordering/contact restrictions
remain unchanged. Later authorized engineering is permitted under existing gates.

# Magnetic shutter remote — Cloud continuation instructions

Read `cloud/HANDOFF.md`, `VALIDATION.md`, `cloud/WORKSPACE-INSTRUCTIONS.md`, and the repository-local tscircuit skill before changing code. These files carry the project context; the cloud task must not depend on this chat or a macOS directory existing.

## Scope and preservation

- This repository root is the isolated R8 workspace originally checked out on `cloud/r8-cloud-setup`. Engineering continuation uses `board/r8-doit-c3-prototype-20261005`; preserve active task branches. Continue here for this task; do not rebuild the tscircuit store application.
- `baselines/` is immutable reference material. It contains the 129-file R7 snapshot and the published Nordic source/enclosure/build. Verify `cloud/R7-PORTABLE-MANIFEST.json` before and after work. Do not edit or regenerate archived files.
- R6 remains frozen at `77965a8012d5544e962d987ce958c5c5614dbe3a`. Original R7 starts at `636d2b24eb4db775fceeb81206541f249db3b9a5`. No history rewriting, force push, default-branch change or automatic merge.
- Active root is the compact 44×56×1mm R8 ESP32-C3 engineering prototype (0.3.15 same-page schematic explanations; physical PCB unchanged from 0.3.12), with right-edge TS24CA/C393942 shutter and direct3-pin JST UART. Native/independent copper, 29/29 physical terminal nets, all174 physical track widths and current budgets, local fabrication/process/visual checks pass. Supplier processed-preview/order approval and physical programming/power/BLE/MagSafe tests remain pending. DOIT ESPC3-12-N4/C19949072 is fitted. Read evidence/R8-inline-notes15-2026-10-07/REVIEW.md; current publication status is recorded there: GitHub readback passes, native0.3.15 draft is unbuilt/incomplete because of issue099 HTTP502/two missing model files. Prior public 0.3.9-prototype is preserved history; hosted preview and hardware qualification are distinct gates. Frozen Nordic JSON is never R8 evidence.
- After onboarding the user authorized engineering continuation and requested routing with zero DRC errors and zero shorts. This does not waive qualification. Original issue075 remains open for the abandoned C3 module; issue076 has a tested fixture override but its upstream omission remains open. Issues078/079 record supplier example-land variations, reassessed for engineering prototype use in `evidence/R8-prototype-2026-10-05/QUALIFICATION.md`; nominal differences alone are not demonstrated electrical blockers. Do not route until new R8 BOM, supply/boot/programming circuitry, connectivity and placement checks pass. Original investigation evidence remains preserved.
- No torch/fill light. One battery and one USB-C charging port; existing red LEDs are status indicators. Preserve verified USB4215-03-A / C37616412 functionality unless the migration requires a justified local change.
- Latest user decision (2026-10-07): defer the entire RGB photo/torch ring for the first prototype. Active circuitry remains shutter-only;0.3.15 moves annotations onto the same3schematic pages while preserving all0.3.12PCB/CAD elements. Original18restoration checks and current19annotation checks/actualUI/CLI style0pass. Read evidence/R8-ring-deferred-2026-10-07/REVIEW.md before any ring work. Complete rejected0.3.13 preserved outside active source with portable archives; never execute it as the current board or treat its failed routing as a current0.3.12 blocker. Public0.3.12 native inventory matches; hosted preview timeout remains explicit. Supplier/physical gates and separate ordering/payment/contact authorization remain unchanged. Later user-authorized engineering is permitted under existing qualification gates.
- User requires a MagSafe phone-facing grip supporting multiple iPhone sizes and compatible cases. Read `mechanical/R8-MAGSAFE-REQUIREMENTS.md` before compact placement or enclosure work. Preserve the detached right-edge side shutter and direct three-pin JST UART. Historical four-disc magnets/steel phone plate and generic phone box are not MagSafe fit evidence; official interface, model/camera/case envelopes and complete RF/metal clearance require qualification. Do not claim all iPhones/cases fit or reuse old Nordic enclosure passes.

### Current radio decision after hosted firmware verification

Use **DOIT ESPC3-12-N4 / C19949072**: exact22-pin import and nominal lands qualified; UART GPIO20/21, LED GPIO6/pin12 and BOOT GPIO9/pin18. It is the cheapest checked module compatible with pinned Zephyr4.2 BLE. The earlier C2 selection below is preserved history, superseded by actual missing Bluetooth sources/libraries. See `evidence/R8-components/alternative-radio-2026-10-05/c3-supported-ble/`. No frozen inputs or failed evidence may be discarded.

### Earlier radio decision after onboarding (superseded)

The user's later request supersedes the original ESP32-C3-WROOM-02-N4 selection: use the cheaper **DOIT ESPC2-12E-N4 / C19949081** (ESP32-C2/ESP8684, 4 MB flash, onboard antenna). See the dated selection evidence in `evidence/R8-components/alternative-radio-2026-10-05/SELECTION.md`. Original C3 supplier/import/firmware evidence stays unchanged; do not reuse its GPIO20/21 UART contract for C2 (module UART is GPIO19/20). At that earlier stage the root implemented C2; this historical decision is superseded by the fitted C3 above. Qualification gates, frozen-baseline protection, sequential heavy-job guard and separate ordering/supplier authorization still apply.

## Current same-page schematic explanations

Read evidence/R8-inline-notes15-2026-10-07/REVIEW.md. Active0.3.15 puts all44
explanations on their matching3nativeA4circuit pages and removes the3guide pages.
All1048PCB/CADelements and electrical contracts match0.3.12 exactly. Native and
independent copper/net/width/current/process checks and actualUI/CLI style0pass.
The ring remains deferred; archived0.3.13 is not active. Supplier/physical gates,
baseline immutability, setup/start/guards and separate ordering authorization
remain unchanged. Publication receipt follows actual native upload/readback.

## Current bottom silkscreen cleanup

Read evidence/R8-bottom-silk-2026-10-06/REVIEW.md. Version 0.3.12 removes the
three requested bottom labels only; circuitry/placement/routing/schematic
are identical. Programming requirements stay documented. Fresh native and
independent manufacturing/process checks pass; current bottom silk is empty.
Latest stock review confirms radio 66 headline In Stock/3 Available Order Qty;
five modules switch to pre-order. Supplier/physical gates remain pending.
Original stock-field ambiguity and blocked-assets records are preserved
history; the dated official client is now retained in the current evidence.
Setup/start/memory guards, baseline immutability and ordering restrictions
remain unchanged. Publication receipt is recorded after actual readback.

## Current schematic capacitor-group follow-up

Read evidence/R8-capacitor-groups-2026-10-06/REVIEW.md. Current 0.3.11 moves
only C10/C3/C4 schematic coordinates to resolve the latest UI's three
capacitor-group issues. Actual browser/CLI analysis passes zero; all 1,451
physical/electrical elements are identical to 0.3.10. Fresh native and
independent PCB/net/width/current/process/export checks pass. All prior
baselines/evidence, supplier/hardware/MagSafe gates and setup/start/guards
remain unchanged. Publication receipt is separate after actual readback.

## Current USB-C schematic style / 0.30–0.45mm via follow-up

Read `evidence/R8-style-vias-2026-10-06/REVIEW.md`. Current0.3.10 replaces
0.60mm via pads with requested0.45mm pads, retaining0.30mm through holes and
top/bottom-only copper. Native standard USB-C and actual UI/CLI style analyses
pass0 issues. Fresh0 native errors/shorts,29 physical nets,174 measured
track widths/current budgets and full independent manufacturing/process/CAM
readback pass. All44 fitted identities/poses and159 pin contracts are unchanged.
All six A4 pages/both copper layers inspected. Prior failed candidates and
unperformed supplier/hardware/MagSafe gates stay explicit. Setup/start and
serial memory guards are unchanged; observed32GiB is not guaranteed.
Current public receipt is recorded separately; never reuse failed JSON.

## Current schematic component-guide follow-up

Read `evidence/R8-schematic-notes-2026-10-06/REVIEW.md`. Version0.3.9 explains
all44 fitted references on three additional native A4 guide pages, linked from
the original three circuit sheets. All1432 non-schematic elements remain
exactly unchanged; native0 errors/shorts,29 physical nets,164 widths/current
budgets and full manufacturing/process/export checks pass. Both new coverage/
actual-render tests pass188 assertions. All six A4 views inspected. Native
root snapshots use the new dated evidence directory; previous evidence and
hardware/supplier/MagSafe gates remain preserved. Actual public receipt is
recorded separately.

## Prior silkscreen follow-up

Read `evidence/R8-uart-silkscreen-2026-10-06/REVIEW.md`. Version0.3.7 removes
3V3 from the UART silk legend and retains its pin labels. Exact current-source
electrical/copper/placement elements are unchanged; only that silk text and
source metadata change. Native0 errors/shorts,29 nets,164 widths, current and
full fabrication/process readback pass. Prior hardware/supplier/MagSafe gates
remain pending; original evidence stays frozen. Current snapshot directory
is the new dated silkscreen evidence. Public receipt recorded separately.

## Electronic parts and validation

Latest resolution: `evidence/R8-issue-resolution-2026-10-06/REVIEW.md`.
Public0.3.6-prototype native upload/readback passes (367 files,22 critical
text/binary matches); receipt is in the resolution PUBLICATION.md. It refreshes
current audits/programmer artifacts; unchanged
PCB hardware0.3.5/route23 passes fresh native0 errors/shorts,29 physical nets,
164 widths/current budgets. Smoke38 Python+2 Bun/13 assertions and29 CAM pass.
Pinned standard JST programmer0.8.0 actual UF2/ELF build, USB descriptor and
UF2/bin/corruption checks pass; see firmware/programmers/.../R8-USAGE.md.
Install/enumeration/target programming and other physical tests remain unrun.
Inventory096 raw3/66 fields do not prove shortage; client semantics/allocation
are unconfirmed. No unqualified substitution. Official Apple R31 PDF/input
is now retained; exact magnet assembly and complete MagSafe grip/phone/case/RF
fit are unqualified. assets.jlcpcb.com is still blocked; exact host added to
restricted saved draft only, without applying/publishing or proxy bypass.
Original six-point review and failures remain immutable history.

Latest functional/power audit successor is `evidence/R8-functional-review-2026-10-06/REVIEW.md`.
Exact fitted C56594 is1.5µH±30%, minimum1.05µH; older±20% ripple calculations
are superseded, original evidence immutable. TI20% saturation headroom now
explicitly checked; unchanged0.3.5 route23 passes. Physical operation is untested.

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
