# Standard JST programmer for R8

This directory retains the exact public standard-jst-programmer **0.8.0**
firmware inputs, release `3d6952c4-e6ee-4711-a7c7-dded0cdef4eb`, GitHub
revision `7eb11c2ed16fe67f8835908b683bdd0a41e9cc05`.
All15 files independently match that GitHub revision. Original sources and
licenses are retained without edits. This is a programmer firmware input set;
it is not the ESP32 firmware or a new programmer board publication.

The dated build/result record is
[the resolution review](../../../evidence/R8-issue-resolution-2026-10-06/REVIEW.md).
Use only its verified UF2 once the actual build is marked passed.

## Hardware procedure

1. Disconnect the programmer's target cables. Enter its RP2040 BOOTSEL USB
   mode and copy the verified `standard-jst-programmer.uf2` to `RPI-RP2`.
   Wait for re-enumeration. The older0.5.0 UF2 does not support J5 UART.
2. Confirm the programmer exposes **CDC0 "CDC-ACM UART Interface"** and the
   separate **CDC1 "Target power telemetry"**. Select CDC0 for R8.
3. Use a straight, contact-preserving3-pin JST SH1mm cable from programmer
   **J5** to R8 **J3**: contact1 programmer TX→R8 RX(GPIO20), contact2 GND,
   contact3 R8 TX(GPIO21)→programmer RX. Do not cross the wires again.
4. Power R8 from its reviewed protected battery with POWER on. R8 USB-C
   must be unplugged: charging inhibits the radio regulator. Leave the
   programmer's target-power and SWD connectors disconnected. J5 logic is
   fixed3.3V; it has no supply, EN or BOOT contact.
5. Hold R8 BOOT(SW4), press and release RESET(SW5), retain BOOT for at least
   3ms after RESET release, then release BOOT. Reset/supply settling must
   meet the retained ESP32-C3 timing requirements.
6. With reviewed esptool4.8.1 and pyserial3.5, first validate the R8 image:

   ```sh
   PYTHONPATH="$PWD/firmware/deps/modules/hal/espressif/tools/esptool_py" \
     firmware/.venv/bin/python scripts/flash-r8-standard-jst.py
   ```

   After confirming wiring and the actual CDC0 device, add `--write --port`
   with that device path. The helper retains DTR, identifies the C3 ROM,
   writes the reviewed simple-boot image at0x0 and verifies flash readback.
   It never automatically pulses absent EN/BOOT wires.
7. Release BOOT and press RESET to run. Record ROM identification, flash
   verification, normal startup and BLE/iPhone behavior from real hardware.

No programmer is attached in the cloud environment. UF2/ELF verification is
a build check; USB enumeration, UART signaling, target flashing and BLE
operation remain physical prototype tests.

## Reproduction

Use a supported Arm GNU embedded C/C++ toolchain with newlib, CMake and a
native host C/C++ compiler. The actual hosted toolchain/package versions and
signed-package hashes are retained with the build manifest. From repository
root, after component/placement qualification and explicit engineering scope:

```sh
python3 cloud/run-heavy.py -- bash \
  firmware/programmers/standard-jst-programmer-0.8.0/firmware/build.sh
```

Put the reviewed compiler and CMake on PATH first. The unchanged upstream
script fetches its pinned debugprobe/pico-sdk commits and pinned submodules,
applies the published board integration and runs the official USB descriptor
check. It emits its UF2 below this directory's ignored `dist/firmware/`.
Never run this SDK build during lightweight environment setup/start.

Missing `3V3` metadata remains a separate importer issue.
