# R8 direct standard-JST programmer prototype — 2026-10-05

The user selected a direct3-pin JST programming connection. J3 is now the exact supported **JST BM03B-SRSS-TB(LF)(SN)/C160389**, top entry,1mm SH pitch, at(13.2,16)mm/0°. Its cable pins are **1 RX(GPIO20/module21),2 GND,3 TX(GPIO21/module22)**. Support terminals4/5 are explicitly grounded; they are not cable contacts. The right-edge TS24CA/C393942 shutter stays at(22,-8.5)mm/270°, pressed horizontally inward. DOIT ESPC3-12-N4/C19949072 and its reviewed BLE image are unchanged. This is an untested engineering prototype, hardware revision0.3.3; published package0.3.4, successful native route06.

Branch `board/r8-doit-c3-prototype-20261005`; predecessor HEAD `9c50f187416fee8cb6be4d6b615db5c073c51ef1`. Generated Circuit JSON SHA256 `8db03c1b6b7e1ffc73ad3a49100bc2191e75db50f8de6de8ab36e922676e98f5`. A separate successor integrity manifest binds source/toolchain/native exports without overwriting historical manifests or failure evidence.

| Gate | Actual result |
|---|---|
| Requirements and exact schematic/BOM | PASSED;44 TOP references/25 eligible C numbers; programmer/cable/boot/power contract reviewed |
| Exact new header import/land/model qualification | PASSED;5 untouched supplier lands, maximum conversion difference1.2634338020234281e-13mm; JST nominal guidance/tolerances checked |
| Unrouted source/netlist/pin/schematic and PCB placement | PASSED; all native commands run on final unrouted fixture; no copper emitted by disabled fanouts |
| Native routed build/full schema/checks | PASSED;0 generated/native errors,0 hole/trace errors,0 dangling traces,0 self-shorts |
| Independent exact copper/drill manufacturing audit | PASSED;0 failures, all original minima retained |
| Physical copper connectivity | PASSED;29/29 terminal nets,0 RF/side-switch exclusion intrusions, U2/U3 EP continuous top GND and local ground vias |
| Local fabrication readback | PASSED;12 original native Gerber/Excellon files, copper/paste/mask/outline/drills/slots matched to final JSON |
| Assembly registration | PASSED;44 TOP refs; J3 all5 terminals at0°, SW2 all4 at270°, strict USB registration retained |
| Complete native silkscreen/stencil/mask | PASSED;159 paste apertures;0 failures, minimum area ratio0.6999986 at assumed0.10mm stencil; minimum mask web0.118262mm; silk stroke0.162mm, TOP mask gap0.4233025mm, BOTTOM4.68522785mm, outside outline0 |
| Independent CAM regressions | PASSED;19 tests, including real failing supplier-circle Gerber regression |
| Generic core correction | PASSED;22 focused tests/286 assertions and canonical ESM/declaration build; installed archive bytes match retained new runtime |
| Lightweight smoke/type/format/native shorts | PASSED;33Python tests,2Bun tests/13assertions,129frozen hashes; pinned type/format and native shorts PASS |
| Current visual review | PASSED;top/bottom PCB and Gerber copper, all3native A4 sheets and details inspected; exact files bound in visual-review/inspection.json |
| Native snapshots | PASSED; explicit-root update followed by two successive native checks, both PCB/schematic match |
| Supplier processed-preview/prototype fabrication approval | PENDING; no assembler upload/contact/order authorized |
| Physical programming/power/BLE/RF/thermal/runtime/enclosure | PENDING; no assembled hardware/programmer is attached |

Board remains48×56×1mm,2-layer FR4,44 TOP parts,157 traces,88vias,155SMT pads,159paste features,4USB plated slots,8NPTH and3native A4 schematic sheets. The new connector retains its original TSX/OBJ/STEP and exact supplier JSON. Existing imports, frozen baselines and firmware application/artifact bytes are unchanged.

## Programming contract

Use published **tscircuit/standard-jst-programmer0.8.0**, release `3d6952c4-e6ee-4711-a7c7-dded0cdef4eb`, UART-enabled firmware and **J5 UART**, not SWD. Programmer J5 is1TX/2GND/3RX; a straight-through1→1/2→2/3→3 SH cable connects to R8's opposite signal directions. Do not also cross the cable. SH mates use SHR-03V-S housings. The programmed board runs on its battery with POWER on and **R8 USB-C unplugged**; charging disables radio supply. All programmer target-power/SWD cables stay unplugged. Its target-power selector has no OFF position and recommended50mA output cannot provide R8's500mA design supply.

Three pins carry no EN/BOOT/RTS/CTS or power. Hold BOOT/SW4(GPIO9), pulse RESET/SW5(EN), retain BOOT at least3ms after reset release, then release. DOIT's printed page15/PDF18 includes GPIO8/9 pullups; GPIO8 is unused externally. The programmer's CDC0 UART bridge requires **DTR true**; CDC1 is target-power telemetry. Ordinary esptool4.8.1 string-port opening forces DTR false on Windows even with no_reset. `scripts/flash-r8-standard-jst.py` uses the supported existing-Serial API, DTR asserted before open, positively identified C3 ROM,115200baud, no stub/manual reset, write0x0 and verify_flash. Default invocation only validates the reviewed image and opens no port.

[PROGRAMMING.md](PROGRAMMING.md) contains the full procedure. Published programmer0.8.0 includes firmware source but no UF2: its documented build is a separate later operation, not a completed build here. Its UART source and pinned debugprobe/SDK authority were retained. Actual esptool parser validation of the unchanged411576-byte C3 image passed; wrong-chip and corrupt-segment controls were rejected. Host-control regression tests are not hardware flash tests. Physical programming/readback is still required.

## Corrections and known issues

Native router drill violations were corrected in authored board copper: UART_RX endpoint updated to the new physical contact; obsolete6pin BOOT branch removed; U4 VBAT transitions away from its physical pad; TEMP_SET_HOT follows a complete native route to its existing U5 ground-free transition. C13 schematic moved closer to VBAT, resolving the actual maximum decoupler placement gap. No generated circuit/Gerber or imported footprint was hand-edited; no checker minimum was reduced.

New089 is a project-audit coverage defect: a text-only process review omitted supplier circles. The complete native Gerber layers are now checked. Actual route04 silk failed stroke0.1mm/mask gap0.08601778mm and is retained. New090 is the generic core defect: SilkscreenCircle ignored inherited pcbSx visibility although paths/text honored it. A narrow existing-API correction passes scope/visible-control regressions; new source overlay/runtime archive is preserved and pinned. Authored styling removes supplier decoration while all10 functional legends remain. It does not waive copper checks or edit supplier imports. Source-only route05 was ineffective and is retained as failed evidence.

Warnings stay visible:004 infers a wrong planar mating direction because J3 import lacks insertionDirection; official JST drawing proves top entry+Z, and access remains clear. No import patch or warning suppression.084 remains for discrete Q1/Q2 G/S/D imports modeled as chips (power/refdes warnings), whose exact contracts pass. Original075 concerns the abandoned WROOM. **Missing `3V3` metadata remains a separate importer issue.** The fitted DOIT module already has correct VCC/GND. OriginalC2 BLE failure082 and prior085/086/087/088 evidence remain unchanged.

Failed route01 stale UART termination, route02 independent drill failures, route03 unsafe HOT fanout, route04 full silk failure and route05 ineffective style remain separate from passing route06. Initial Bun archive installation was manually stopped (exit137, OOM0) after stale read-only home cache behavior; supported task-local Bun cache retry and exact `bash cloud/setup.sh` passed. The first smoke incorrectly nested the lightweight runner regression inside run-heavy; its inherited heap override was correctly rejected. The direct lightweight smoke retry preserves the memory guard and test assertions.

Nominal power-path assumptions/results are in power-path-measurements.json; they do not include measured cell/contact/via impedance or startup pulses. No firmware/SDK/3D rebuild or bench test was performed. Physical battery/charge/thermal/RF/runtime/phone/cable/enclosure/side-button acceptance remains POST-PROTOTYPE PHYSICAL VALIDATION. The old Nordic case does not fit this48mm board.

Reproduce lightweight setup/smoke directly. Run subsequent qualified heavy commands serially via `python3 cloud/run-heavy.py -- <command>`; use pinned PATH/XDG and task-local Bun cache from cloud/SETUP/setup.sh. Actual command outputs and exit/resource records are in logs/. Observed hosted34359738368bytes(32GiB),4 CPU equivalents, Node25.6.0/Bun1.3.9, Python3.12.14, optional CAM3.14.0; these are observations, not guaranteed plan allocations. Guard/V8 budget14336MiB/OOM counters0 remain unchanged. Saved environment Install/Start preserve explicit-ref checkout, active task branches and R8 context; no server is needed.

Prototype publication is user-authorized on the task branch; current public0.3.2 is historical side-switch output. New0.3.3 publication/public byte verification will be recorded in PUBLICATION.md only after actual success. Main remains frozen at5951f419c8314b83648d89e1cfb7e29e87e32eb8. No ordering/payment/supplier contact/assembler upload/public tooling issue or tooling package publication/merge/environment Publish is authorized by this engineering step.

Native CLI --schematic-svgs writes only one schematic.svg; older ignored per-sheet dist images were detected as stale. The current visual renderer now regenerates all3 complete native A4 views directly from the exact final JSON into this dated folder. Those current files were inspected and stale files are excluded from publication. Initial snapshot without an explicit entry scanned archived historical circuits and failed on an incomplete historical source closure; original failed log/output retained. Canonical package snapshot scripts now explicitly select index.circuit.tsx, matching workspace instructions; this does not disable any root-board check. Native cache-save diagnostics about ambiguous port anchors are retained; they concern optional saved-route artifacts, not a generated copper error. Route06 peakRSS7630644KiB, OOM0.

Publication completed: native0.3.4-prototype,218files, exit0, public/ready_to_build=true, exact anonymous critical text/inventory and GitHub Circuit JSON readback. Hosted registry preview and physical flashing remain pending; see PUBLICATION.md. This completion does not overwrite the pre-publication source-integrity record.
