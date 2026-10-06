# R8 functional net and power review — 2026-10-06

Review of hardware/package0.3.5, compact native route23, branch
`board/r8-doit-c3-prototype-20261005`, starting HEAD
`50935d2277501f7b7ba78cd8d2dcae48f1040260`.
Circuit JSON SHA256:
`e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`.
PCB/source/imports/BOM/CPL/fabrication files and firmware are unchanged.
No rerouting, root build, SDK/3D build, assembler upload, order or supplier contact.

**Design review passes; assembled-board operation is untested.** Fresh native
checks report0 errors/shorts/dangling traces. Independent physical copper
checks pass29/29 terminal nets,0 RF intrusions and continuous regulator/charger
EP ground planes. All44 fitted identities/values and159 terminal contracts
still match the qualified direct-JST electrical reference. This review also
checks what the circuit is intended to do, rather than relying on continuity
alone. The earlier164-track/12-file fabrication review remains bound to the
identical Circuit JSON; its original artifacts are preserved.

## Corrected power calculation

The previous power checker mistakenly used±20% inductance despite the retained
Sunlord exact-MPN table specifying **SWPA3015S1R5NT/C56594,1.5µH±30%**.
This is a project audit defect, recorded as local issue095, not an importer
or PCB wiring defect. Original checker and reports remain retained.
The corrected check uses **minimum1.05µH**, minimum2.2MHz switching frequency,
and explicitly enforces TI's recommended20% saturation-current headroom.
Its manufacturer-tolerance regression fails the original checker and passes
the correction; separate regressions reject insufficient saturation margin
and insufficient RMS rating.

| Actual load path | Minimum track mm | Design current A | Nominal IPC estimate A |
|---|---:|---:|---:|
| Radio3.3V |0.15|0.5000|0.6044|
| Battery feed |0.30|0.7427|0.9991|
| USB VBUS, each orientation |0.15|0.4000|0.6044|
| Battery charge |0.15|0.3333|0.6044|
| Each inductor terminal |0.30|0.7450 RMS|0.9991|

Calculated inductor peak **0.8446A**; required saturation rating with20% margin
**1.0136A**, below fitted2.3A. RMS0.7450A is below fitted1.7A. Trace-only radio
voltage floor3.1143V and regulator input floor2.9732V still pass. No board
change is required by this correction. [Corrected measurements](power-path-measurements.json)
supersede the earlier±20% ripple numbers only.

Assumptions remain35µm external copper,50°C copper,3.169–3.533V static
regulator envelope,500mA design supply budget and80% assumed efficiency.
The500mA budget is not a measured continuous MCU load. Ideal triangular
steady-state ripple excludes startup/fault and power-save pulse transients.
Via/contact/cell impedance, capacitor DC-bias derating, actual load response,
thermal spreading and RF/EMI need bench validation. Supplier stackup/copper
must match the assumptions before fabrication approval.

## Manufacturer and firmware connection review

| Function | Connections checked | Assessment |
|---|---|---|
| USB-C charging |J1 paired VBUS/GND, both CC pins separately5.1kΩ to GND; data/SBU unused |Both plug orientations support a5V charging sink; USB-C is not the ESP flashing port |
| Battery polarity |J2 pin1GND/pin2VBAT; shell3/4GND |Matches retained protected ASR00012 SH harness; verify actual cable polarity before use |
| Charger |U2 IN10USB5V/BAT2VBAT/SYS1local10µF/GND5+EP11; ISET8R3=1kΩ, VSET7R8=130kΩ, TS6R9=10kΩ |Nominal300mA charge,267.3–333.3mA tolerance,4.1V setpoint/4.1205V upper;6h safety timer. TI permits fixed10k TS when a separate temperature guard is used |
| Charge indication |VBAT→R4=1kΩ→LED1→U2 STAT2pin3 |Active-low charging indication; off is also possible when disabled/faulted, so off alone does not prove a full battery |
| Temperature guard |U5 VDD5USB5V/GND3; SETA1R10=1.62kΩ, SETB2R11=18.7kΩ; wired open-drain OUTA6/OUTB4→R12USB pull-up→Q2 gate; Q2 sourceGND/drainCE |Hot trip nominal36°C, cold trip5°C,5°C hysteresis. Either trip pulls TEMP_OK low, Q2 turns off, R13 pulls active-low CE high to disable charging. Both inactive permit charging |
| Temperature limits |TMP390A2 accuracy and pack0–50°C charge range reviewed |Sensor thresholds provide nominal margin; correct thermal coupling to the actual cell is required. PCB/ambient sensing alone cannot certify cell temperature |
| Power switch/cutoff |U4 TPS3839G33 VDD3VBAT/GND1/push-pull RESET2BATTERY_OK→SW1pin1; SPDT common2→R5→U3EN6; SW1pin3+shell4GND |OFF grounds EN; ON uses supervisor output. No floating steady-state OFF enable. Actual G33 falling cutoff limits3.003–3.126V, typical3.08V,31mV typical hysteresis and120–350ms release delay |
| USB radio inhibit |Q1 gateUSB5V/sourceGND/drainREG_EN; R6USB pull-down |USB insertion overrides switch ON and disables U3. Charging and radio use are deliberately separate modes |
| Buck-boost supply |U3 VIN5/VINA8VBAT, output1/FB10V3, PS7GND, GND9/PGND3/EP11GND; L1between U3pins4/2; local bypass/input/output capacitors |Fixed3.3V, power-save enabled, proper switch-node/feedback/ground wiring; corrected current check passes |
| Radio/reset/boot |DOIT U1 VCC8/GND15, EN3RESET switch, GPIO9pin18BOOT switch; GPIO2/8 externally unloaded |Retained actual module schematic includes EN10kΩ/1µF and GPIO8/9 pull-ups; GPIO2 internal pull-up. Manual BOOT holds GPIO9 low while GPIO8 stays high through EN rising; ≥3ms strap hold and ≥50µs reset/supply settle |
| UART programmer |R8J3 pins1RX(GPIO20)/2GND/3TX(GPIO21), support4/5GND; programmer0.8.0J5 pins1TX/2GND/3RX |Straight-through SH connects TX→RX in both directions.3.3V logic only; battery ON, R8USB unplugged, programmer power/SWD unplugged, manual BOOT/RESET, UART-enabled programmer firmware and CDC0/DTR true |
| Shutter/pair/status |U1 GPIO4pin6→sideSW2→GND; GPIO5pin7→SW3→GND; GPIO6pin12→R7LED2→GND |Matches compiled firmware DTS:4/5 active-low with pull-ups,6 active-high. No user button loads a boot strap |
| Firmware behavior |C3/4MB/40MHz/simple-boot binary;30ms debounce,3s pair hold, BLE HID Volume Increment0xE9 with60ms release |Source/compiled DTS/config/image checks pass. WiFi and runtime UART/USB console disabled; ROM UART flashing remains available. Actual iPhone camera behavior, bonding/reconnect and low-power current are untested |

The supervisor row uses the exact G33 datasheet table, not a generic3.0V
supervisor assumption. R12=100kΩ was also reviewed: TMP390 table6.3 lists1kΩ
minimum and10kΩ nominal with **no maximum listed**; it does not establish a
10kΩ maximum violation. Low-frequency MOSFET-gate control still requires
prototype leakage/transient verification. No unsupported defect is invented.

## Evidence and fresh execution

- [Native checks](native-checks.json), [physical connectivity](physical-connectivity.json),
  [all electrical contracts](electrical-contract.json) identify the exact JSON hash.
- 29 CAM tests pass, including the strengthened power regressions.
- Lightweight smoke passes36 Python tests,2 Bun tests/13 assertions, format/types
  and129 frozen baseline hashes. No setup or memory-guard changes.
- Read-only flashing helper verifies411576-byte C3 binary SHA256
  `bef862d532945b309b30fa0f7bf2313db459de81f5261c3f8e4816d43de7e132`.
  All6 recorded build inputs and6 firmware artifact hashes pass. No serial port
  opened, no hardware flashed. The first helper invocation lacked esptool in
  the firmware venv; the successful invocation uses the retained official pinned
  esptool4.8.1 source via PYTHONPATH. Both outputs are retained in logs.
- Actual observed cgroup memory34359738368 bytes (32GiB), CPU quota4 equivalents;
  serial heavy guard14336MiB Node heap, no OOM events. Allocation is not guaranteed.
- Remote main remains5951f419c8314b83648d89e1cfb7e29e87e32eb8.
  Existing public0.3.5-prototype PCB and prior publication evidence remain
  unchanged; this follow-up corrects review tooling/documentation only.

Retained sources: TI SLVS696D §§8.3.1/9.2.2.2/9.2.2.3
(`evidence/R8-components/TPS63031-current.txt`), Sunlord exact row
(`evidence/R8-routing-2026-10-05/sunlord-page5.png`), SHOUHAN MSK12C02 PDF
page1 circuit/common2 (`references/SHOUHAN-MSK12C02.pdf`), TPS3839 table7.5/7.6,
TMP390 tables6.3/7.1/7.2, current BQ25185 table6.1/§6.3.9/6.3.10, DOIT actual
pin table/module schematic and qualified direct-JST programmer0.8.0 inputs.

## Required prototype bring-up

1. Inspect assembly and meter cable polarity, GND continuity, rail isolation and
   UART pin mapping before attaching a cell/programmer. Compare to current BOM/CPL.
2. Use a current-limited battery emulator across4.1205V down through cutoff;
   verify OFF/ON, cutoff/recovery and USB inhibit. Scope U1 supply/EN through
   startup/BLE activity and load steps; U1 must stay within3.0–3.6V without
   unintended resets. Verify actual copper/connector/inductor temperatures.
3. Test USB-C charging in both plug orientations, actual current/termination
   voltage/timer, hot/cold guard and cell thermal coupling. Radio must disable
   during charging and resume correctly after USB removal when switched ON.
4. Follow the retained PROGRAMMING.md with an actual UART-enabled standard JST
   programmer; detect ESP32-C3 ROM, flash/readback verify, normal boot/reset.
5. Test initial pairing, shutter single-press/release,3s rebond, power-cycle
   reconnect and repeated camera captures on multiple intended iPhones/cases.
   Repeat RF tests with the complete battery/enclosure/magnet/metal assembly;
   record range, thermal performance and measured runtime.

All five are **NOT RUN — POST-PROTOTYPE PHYSICAL VALIDATION**. Supplier-processed
preview/stackup/stock/assembly approval remains pending before ordering.
Native warnings004 (connector orientation inference) and084 (discrete MOSFET
IC classification) stay explicit. Original075 concerns the abandoned WROOM
candidate. **Missing `3V3` metadata remains a separate importer issue.**
