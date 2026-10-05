# Program R8 with standard-jst-programmer

Use **standard-jst-programmer0.8.0 UART-enabled hardware/firmware**, **J5 UART** and R8 **J3**, joined by a straight-through3-pin JST SH1mm cable (SHR-03V-S housings; verify1→1,2→2,3→3 with a meter). The SWD ports cannot program ESP32-C3. R8 connector is top entry; its physical pin1 marking and bottom UART legend distinguish it from the battery port.

| Cable contact | Programmer J5 | R8 J3 |
|---|---|---|
|1|TX,3.3V output|RX,GPIO20/module21|
|2|GND|GND|
|3|RX,3.3V input|TX,GPIO21/module22|

Install the programmer's UART firmware using its documented `bash firmware/build.sh`; output `dist/firmware/standard-jst-programmer.uf2`. Hold its BOOTSEL when connecting USB and copy that UF2 to the mounted drive. Published0.8.0 includes source but no compiled UF2; build it separately. Do not assume an older SWD-only UF2 operates UART.

1. Charge R8 battery, then unplug **R8 USB-C** (charging disables radio power). Turn R8 POWER on. Connect programmer USB-C to computer; leave all its target power and SWD cables unplugged. Its target power output is limited to50mA recommended and has no OFF position; it cannot supply R8.
2. Verify cable pin continuity, then connect **J5→J3 UART**. Select **CDC-ACM UART Interface (CDC0)**, not **Target power telemetry (CDC1)**. USB serial device numbers vary; do not assume COM/tty suffixes.
3. Hold R8 **BOOT** (SW4,GPIO9), press/release **RESET** (SW5,EN), keep BOOT held at least3ms after RESET release, then release BOOT. GPIO8 remains unconnected externally; DOIT’s module schematic (printed page15/PDF18) includes GPIO8/9 pull-ups.
4. Install host tools `python -m pip install esptool==4.8.1 pyserial==3.5`. First run `python scripts/flash-r8-standard-jst.py` for read-only image validation. Then run `python scripts/flash-r8-standard-jst.py --write --port YOUR_CDC0_PORT`. The helper keeps DTR enabled, runs115200baud, manual reset, no stub, writes the C3 simple-boot image at0x0 and verifies flash readback. Ordinary esptool serial opening forces DTR false on Windows and stops this programmer's UART bridge; use this helper.
5. After successful write/readback, press R8 RESET without BOOT to run. Disconnect UART before switching off R8. Check BLE pairing/shutter with real phones afterward.

Current reviewed C3 image is `firmware/artifacts/R8-DOIT-C3-hosted-2026-10-05/zephyr.bin`,411576bytes, SHA256 `bef862d532945b309b30fa0f7bf2313db459de81f5261c3f8e4816d43de7e132`, chipID5,4MB flash/DIO/80MHz, ESP_SIMPLE_BOOT, no MCUboot. Never flash the retained C2 image. For a future authorized image use `--image` and its reviewed `--sha256`; do not override a mismatch for an unreviewed image.

Actual hosted validation checks source/pin/ROM API and firmware image. No physical programmer, cable or assembled R8 is attached here: flash/readback, boot timing, signal quality and phone operation remain **POST-PROTOTYPE PHYSICAL VALIDATION**. This procedure is not a claim of tested hardware programming.
