# Magnetic shutter remote R8 — ESP32-C3 engineering prototype

The active source implements the selected DOIT ESPC3-12-N4 / C19949072 BLE shutter remote, with one protected battery, USB-C charging, TPS63031 3.3 V buck-boost supply and UART programming. Two-layer FR4 board: 48 × 56 × 1 mm, 44 fitted TOP references. No torch. The shutter uses a side-actuated TS24CA/C393942 switch on the right edge, pressed horizontally inward; GPIO4 is unchanged. Hardware revision0.3.1; registry release0.3.2-prototype.

**Routed prototype:0 native DRC errors,0 shorts and0 independent manufacturing failures.** Physical connectivity, local fabrication readback and process checks pass. The BOM, placement and Gerbers are ready for review; supplier-processed preview and physical tests remain pending. See [routed review](evidence/R8-side-shutter-2026-10-05/REVIEW.md), [validation](VALIDATION.md) and [qualification](evidence/R8-side-shutter-2026-10-05/qualification/QUALIFICATION.md).

The original issue075 applies to the abandoned C3 module. Its separate missing `3V3` power metadata is issue076; the selected DOIT C3 import already has correct VCC/GND attributes. Issues078/079 describe example-land variations accepted for engineering prototype use after measured geometry and paste review. They are not demonstrated electrical blockers. Original investigations and all frozen Nordic references remain preserved under `baselines/`.

Preserve the active engineering branch `board/r8-doit-c3-prototype-20261005`; initial environment installation starts from `cloud/r8-cloud-setup` and read [AGENTS.md](AGENTS.md), [handoff](cloud/HANDOFF.md) and [setup](cloud/SETUP.md). Setup/smoke remain lightweight:

```sh
bash cloud/setup.sh
bash cloud/smoke.sh
```

After qualification and placement pass, run heavy jobs sequentially through `python3 cloud/run-heavy.py -- <command>`. Use the locked toolchain. The observed hosted limit is 32 GiB, not a guaranteed allocation. [Firmware](firmware/README.md) targets ESP32-C3 at40 MHz. Actual C2 BLE build failure and original outputs remain preserved.

Battery/RF/thermal/runtime, phone operation and enclosure/shoulder-control fit require POST-PROTOTYPE PHYSICAL VALIDATION. No order, payment, supplier contact or assembler upload is authorized by this task.

Published with the native CLI: [R8 side-actuated prototype](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8), `0.3.2-prototype`. All196 files uploaded, public Circuit JSON matches the validated route10 exactly, and `ready_to_build=true`; hosted registry preview/build status remains pending. See [publication evidence](evidence/R8-side-shutter-2026-10-05/PUBLICATION.md).
