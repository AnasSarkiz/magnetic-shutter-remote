# Verified standard JST programmer firmware —2026-10-06

The exact public0.8.0 programmer firmware now builds in the guarded cloud.
[Verified125440-byte UART UF2](artifacts/standard-jst-programmer-0.8.0-2026-10-06/standard-jst-programmer.uf2),
ELF/BIN/licenses and BUILD-MANIFEST are retained. Actual USB descriptor and
UF2/bin readback checks pass. [Current usage/reproduction](programmers/standard-jst-programmer-0.8.0/R8-USAGE.md)
identifies J5→J3, CDC0, battery power and manual BOOT/RESET. This programmer
image is for RP2040, **never for the R8 ESP32-C3**. The reviewed C3 image/source
are unchanged. No hardware is attached; install/enumeration/target flashing
and BLE/iPhone Camera tests remain unrun. Older build/connector descriptions
below are retained history; current3-pin contract and newest usage take priority.

# Current R8 direct JST UART programming —2026-10-05

R8 now uses **J3 BM03B-SRSS-TB(LF)(SN)/C160389**,3-pin JST SH1mm: **1RX(GPIO20),2GND,3TX(GPIO21)**. Connect directly to the standard-jst-programmer0.8.0 **J5 UART** with a straight-through cable; programmer contact1TX/3RX. R8 battery POWER on, R8 USB-C unplugged; programmer target-power/SWD cables disconnected. BOOT(SW4)/RESET(SW5) remain manual. Read [the programming procedure](../evidence/R8-standard-programmer-2026-10-05/PROGRAMMING.md) before using hardware. The host helper preserves DTR on Windows/Linux/macOS and requires an explicit write flag/CDC0 port. No physical flash test is claimed.

The existing reviewed DOIT C3 binary and its BUILD-MANIFEST are unchanged; no firmware/SDK rebuild was needed for this header-only change. The older six-pin header descriptions below are retained history and superseded by this pinout.

# Current R8 DOIT ESP32-C3 firmware — hosted rebuild in progress

The fitted DOIT ESPC3-12-N4 / C19949072 uses UART GPIO20/21 and user GPIO4/5/6. Build target is pinned Zephyr4.2.0 `esp32c3_devkitc/esp32c3`, the original C3 overlay, and the same locked Python/SDK/HAL dependencies. Explicit40 MHz silicon/board clock applies; the earlier26 MHz C2 overlay remains an unused investigation artifact. Application source is unchanged. Hosted rebuild results will be recorded separately from the historical macOS build below.

The actual C2 build failed because pinned hal_espressif lacks `zephyr/esp32c2/src/bt/esp_bt_adapter.c` and C2 controller blobs. CPU/board support did not establish BLE support. No fabricated stub, SDK downgrade or Wi-Fi-only success replaces BLE validation.

Programming: battery and POWER enabled, USB-C disconnected (USB charging disables the regulator). J3 pin1 VREF only,2 RX,3 GND,4 TX,5 EN,6 BOOT. 3.3V UART logic; do not inject supply. Use the module's internal reset/strap networks and manual boot procedure. Physical BLE/HID/phone, clock and low-power behavior remain POST-PROTOTYPE PHYSICAL VALIDATION.

# R8 ESP32-C2 firmware migration — build pending

The active build target is Zephyr v4.2.0 `esp8684_devkitm/esp32c2`, using `boards/esp8684_devkitm.overlay`. The selected DOIT ESPC2-12E-N4 has 26 MHz crystal and 4 MB flash. Official target/devicetree sources are preserved under `../evidence/R8-prototype-2026-10-05/zephyr-esp8684/`; the new overlay explicitly sets 26 MHz. Main application retains GPIO4 shutter, GPIO5 pair and GPIO6 LED, internal button pull-ups, bonded BLE HID Volume Increment press/release, debounce and bounded advertising.

J3 pin1 VREF only,2 module RX(GPIO19),3 GND,4 module TX(GPIO20),5 EN,6 BOOT(GPIO9). Use 3.3 V UART logic and autobaud; never inject power. Hold BOOT low, pulse RESET/EN low for at least50 µs, release RESET, hold strap at least3 ms then release BOOT. The module internally pulls GPIO8 and GPIO9 high and includes EN 10 kΩ/1 µF. USB-C is charging only and disables the radio regulator: UART programming requires the battery and POWER enabled, USB-C disconnected.

**Do not flash the old C3 or frozen Nordic images onto this board.** The retained C3 candidate record below is historical. A C2 image/build manifest will be created only after an actual successful guarded build. Physical phone, bonding/reconnect, sleep, runtime, RF and power measurements remain pending.

## Retained C3 build record (superseded platform)

# R8 ESP32-C3 firmware preparation — compiled, hardware untested

This is a platform adaptation of the R6/R7 Zephyr shutter application for the exact ESP32-C3-WROOM-02-N4. It is **not** an image for the frozen Nordic board. The generated image and ELF are preserved in `artifacts/R8-candidate/`. Hardware footprint qualification is blocked; the pin contract below is proposed, not final routed-board registration. A compiled image is not permission to order or a verified image for an assembled R8 PCB.

The retained BLE HID Consumer Control report sends Volume Increment (`0xE9`), one press followed by release after 60 ms. It retains encrypted notifications, one stored bond, a three-second pairing-button hold, bounded advertising windows, debounce, and disconnect on a stalled release. No queued shot is replayed on reconnect. Wi-Fi and unused development-board interfaces are disabled. No measured connected-sleep current, runtime, or phone compatibility is claimed.

| Function | GPIO | Module physical terminal |
|---|---:|---:|
| Shutter, active low | 4 | 3 |
| Pair, active low | 5 | 4 |
| Red status LED, active high | 6 | 5 |
| UART programming RX | 20 | 11 |
| UART programming TX | 21 | 12 |
| Download strap | 9 | 8 |
| Enable/reset | EN | 2 |

GPIO2 and GPIO8 must be held high for documented download-mode entry; GPIO9 must normally be high and low for download. These are electrical requirements for the future schematic, not connections already implemented here. The planned UART header carries VREF, TX, RX, GND, EN and BOOT; its actual pin order must be frozen with the PCB before programming instructions are approved. A UART adapter must use 3.3 V logic and must not drive battery power. The single USB-C remains the charging port; no second USB port or fill light is added.

The official Zephyr v4.2.0 `esp32c3_devkitc` target includes `esp32c3_wroom_n4.dtsi`. Its preserved definitions are in `../evidence/R8-components/zephyr-v4.2.0/`. The local overlay replaces the development-board GPIO9 button with GPIO4 and adds GPIO5/GPIO6 controls. The exact framework/module commits, source hashes and artifact hashes are in `artifacts/R8-candidate/BUILD-MANIFEST.json`. The build uses Zephyr SDK 0.17.2, RISC-V GCC 12.2.0, CMake 3.31.10, Ninja 1.13.0, west 1.5.0 and Python 3.14.7. Python dependencies are locked in `requirements-lock.txt`. SDK archive hashes are preserved in `sdk-download/sha256.sum` and the component integrity manifest.

Reproduce from the project root:

```sh
python3 -m venv firmware/.venv
firmware/.venv/bin/python -m pip install -r firmware/requirements-lock.txt
git clone --depth 1 --branch v4.2.0 https://github.com/zephyrproject-rtos/zephyr.git firmware/deps/zephyr
firmware/.venv/bin/west init -l firmware/deps/zephyr
cd firmware/deps
../.venv/bin/west update --narrow hal_espressif mbedtls
../.venv/bin/west blobs fetch hal_espressif
cd ../..
PATH="$PWD/firmware/.venv/bin:$PATH" ZEPHYR_SDK_INSTALL_DIR="$PWD/firmware/zephyr-sdk-0.17.2" sh firmware/build.sh --cmake
```

Install the official SDK minimal macOS-arm64 archive plus `riscv64-zephyr-elf` archive into the recorded task-local directory before the build; check both against the SDK release's published SHA256 sums. Do not run SDK registration that changes unrelated user configuration. On another host, select the corresponding official host archive and record its hash.

**Build status: PASS, 2026-10-05.** The final build exits 0 and Espressif esptool v4.8.1 identifies a valid ESP32-C3 image checksum. Image size is 411,568 bytes; linked flash usage is 411,568 bytes, DRAM 129,776 bytes, IRAM 64,016 bytes. Original failed SDK/dependency download/build attempts and the final successful log are preserved under `../evidence/R8-components/`.

The build reports optional external DTC absent; Zephyr's Python devicetree generation succeeds. The bundled esptool emits a Python 3.14 SyntaxWarning for a `return` in `finally`; its image generation and independent image checksum verification succeed. Neither warning was suppressed or patched. Tickless idle is enabled and Wi-Fi is disabled, but CPU power-management and controller sleep are not established for this C3 build. Low-power performance remains an explicit unfinished software/measurement item; do not quote connected-idle or deep-sleep currents from the silicon datasheet as this firmware's measured result.

Acceptance remains native iPhone Camera and representative Android camera testing on identified phone/OS/app versions, including press/release, reconnect, bonding reset and locked-screen behavior. This is **POST-PROTOTYPE PHYSICAL VALIDATION**.
