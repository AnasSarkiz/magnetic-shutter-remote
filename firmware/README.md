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
