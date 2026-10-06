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
