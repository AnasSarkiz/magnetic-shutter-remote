# Grip Shutter R6 firmware

**Built successfully, not run on a physical board or phone.** Zephyr 4.2.0 application for the E73-2G4M08S1C nRF52840. This folder includes the application and an original Zephyr board definition, not a substituted electronic component or footprint. Exact source/module revisions are in `toolchain.json`; Python dependencies are in `requirements-lock.txt`. Local SDK and virtual environment are not part of the deliverable source.

## Behavior

Bluetooth LE HID Consumer Control, usage page 0x0C, Volume Increment usage 0xE9, report ID 1. One-byte input payload: 0x01 press, 0x00 release. Report ID is carried by the Report Reference descriptor, not prepended to the GATT value. Press is followed by release after 60 ms; 30 ms debounce and edge detection prevent repeat while held. Failed release is retried; a stalled link is disconnected after one second to avoid a latched volume key. No stored shutter event is replayed after reconnect.

Power on: advertise for 120 s if unbonded; otherwise 30 s to the stored peer through an accept list. One bond is saved in NVS. Secure Connections Just Works with encrypted input/CCC is requested; no numeric-comparison or MITM authentication is claimed. Long-hold PAIR for 3 s to disconnect, erase the old bond and open a 120 s pairing window. A tap of SHUTTER after advertising times out starts reconnection; press again once connected to take a photo. A currently connected link stays connected; there is no inactivity disconnect. No keyboard text report, companion phone app or USB bootloader is supplied.

LED2 pulses during pairing/reconnect and on transmitted shots; repeated 100 ms on/off indicates a firmware fault. LED1 is driven by charger STAT and lights while charging; its going dark alone cannot distinguish full charge from absent USB or some faults. The design does not reproduce JJC's blue completion LED. SW1 is the hardware power control. USB insertion is intended to disable the radio through hardware. Calibrated 32 kHz RC, tickless idle, short advertising windows, disabled console/logging and no continuously lit status LED reduce idle load. No measured current or battery gauge is claimed.

## Reproduce the build

Prerequisites used locally: Python 3.14.7, west 1.5.0, CMake 3.31.10, Ninja 1.13.0, GNU Arm Embedded gcc 16.1.0. The GCC installation was already present at `/opt/homebrew`; no system SDK was installed by this project. Install an equivalent supported toolchain and set its path on another machine.

From the **board project directory**:

```sh
python3 -m venv firmware/.venv
firmware/.venv/bin/pip install -r firmware/requirements-lock.txt
git clone --branch v4.2.0 --depth 1 https://github.com/zephyrproject-rtos/zephyr firmware/deps/zephyr
firmware/.venv/bin/west init -l firmware/deps/zephyr
```

Run the module update from `firmware/deps` (the west workspace):

```sh
../.venv/bin/west update cmsis cmsis_6 hal_nordic mbedtls --narrow -o=--depth=1
```

Then from the board directory, set `GNUARMEMB_TOOLCHAIN_PATH` to your installed Arm toolchain and run:

```sh
GNUARMEMB_TOOLCHAIN_PATH=/opt/homebrew sh firmware/build.sh
```

The app uses the complete open Zephyr controller/host; there is no proprietary SoftDevice or bootloader image to combine. `firmware/artifacts/zephyr.hex` and `.bin` are copied from the successful build; `.elf` is retained for debug. Current build usage: **164660 bytes flash, 26796 bytes RAM**. The vector table starts at 0; settings occupy 0xF8000–0xFFFFF. Confirm against `evidence/R6/firmware-build.log` and the source/artifact hashes before programming. Full HID-over-GATT qualification, Device Information/PnP interoperability requirements, RF regulatory compliance and Bluetooth qualification remain open; compile success is not certification.

## Programming and debug — after hardware gates pass

Use SWD and a probe that supports nRF52840. J3 is a custom six-pin JST SH interface; it is **not** the standard ARM 10-pin cable pinout.

| J3 pin | Function | E73 pad / SoC |
|---|---|---|
| 1 | Vref 3.0 V, sense only | VDD pad 19 / VDDH 23 |
| 2 | SWDIO | 37 |
| 3 | GND | 5/21/24 |
| 4 | SWCLK | 39 |
| 5 | RESET_N | 26 / P0.18 |
| 6 | GND | 5/21/24 |

Verify connector cavity numbering and cable polarity from JST drawings before mating. Power the target from its regulated battery rail with USB disconnected and SW1 on; do not feed 3.3 V from the debug probe into Vref. First measure V3 and check shorts with a current-limited supply. Hardware is not yet cleared for this step.

Once a verified J-Link installation and target exist, the supported runner command from the board directory is:

```sh
PATH="$PWD/firmware/.venv/bin:$PATH" firmware/.venv/bin/west flash -d firmware/build --runner jlink
```

No flash operation has been attempted. Program/verify/read back the image and UICR reset configuration, reset and inspect advertising. A factory module may require an explicit recover operation if access protection is enabled; recovery erases firmware and bonds. Do not blindly recover another device. For debugging use the Zephyr `west debug` runner with the same build directory. USB-C carries charging power only.

Run the acceptance procedure in `../PHONE-TEST-PROCEDURE.md`, and record board revision, binary hash, phone/OS/app versions, actual pairing, current, reconnect and camera results. Never label untested versions compatible.

The unchanged, pinned SDK checkouts were cleared after the successful build to recover workspace disk space. Recreate them with the instructions above before rebuilding. Application source, locked module revisions, compiled HEX/BIN/ELF and generated configuration are retained.

R3 final pin-contract checks passed; rebuilt with the locked toolchain on 2026-10-02 (`evidence/R3/firmware-final-build.log`). No GPIO assignment changed from R2. HEX/BIN/ELF/config are in artifacts/. No hardware or phone test is claimed.


R6 rebuilt against the final board assignments with USBdataunused; unchanged GPIO/HIDlogic. Fresh deliverable HEX/BIN/ELFare in `artifacts/`; hashes in `evidence/R6/firmware-artifact-manifest.json`. This is build validation only; phone compatibility, programming, RFand current consumption remain POST-PROTOTYPE PHYSICAL VALIDATION.
