# 082 — Pinned Zephyr C2 board/CPU support does not establish BLE support

Confirmed platform integration limitation, not a tscircuit import bug or a statement that ESP32-C2 hardware lacks Bluetooth. Zephyr4.2.0 supports `esp8684_devkitm/esp32c2`, but pinned hal_espressif `f3453bdeced28642424692aae32cce4eec3f2d7f` references absent `zephyr/esp32c2/src/bt/esp_bt_adapter.c` when CONFIG_BT=y. Its pinned blob manifest also lacks the C2 controller libraries needed by that configuration.

Actual Linux build: `python3 cloud/run-heavy.py -- bash firmware/build.sh -o=-j4` while target was C2. CMake fails with the missing source; log `firmware-build-c2-2.log` retained in successor evidence. A CPU-only build would not validate the BLE HID shutter. No stub, copied C3 adapter, ignored error, arbitrary HAL upgrade or weaker application configuration was used.

The selected development path is the cheaper qualified DOIT ESPC3-12-N4 / C19949072 compatible with the existing pinned BLE stack. C2 imports/26MHz overlay and failed evidence remain preserved. A separately pinned official C2 SDK application remains a future option; it has not been built or claimed here. No public issue or supplier contact occurred.
