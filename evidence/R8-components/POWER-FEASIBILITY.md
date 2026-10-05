# R8 power feasibility — proposed, not a released schematic

The exact selected ESP32-C3-WROOM-02-N4 requires 3.0–3.6 V and an external supply capable of at least 0.5 A (Espressif v1.7, Table 6-2, page 22). This is supply capability, **not** a claim that BLE operation continuously consumes 500 mA. Wi-Fi is disabled in the firmware adaptation. Connected BLE idle current still requires measurement.

## Components that cannot be retained unchanged

The original external DATA POWER DTP401525(PHR) 110 mAh pack is documented for 1C/110 mA discharge. It cannot supply the conservative 0.5 A regulated-output envelope. The original TPS7A0230 is a 3.0 V, 200 mA LDO: it is inadequate for the new supply-capability requirement and has no margin above the module's minimum supply voltage. Neither component is being silently reused as a qualified ESP32 power solution.

## Proposed regulator

TI TPS63031DSKR / JLCPCB C15516 was imported through the supported pipeline. It is a fixed 3.3 V buck-boost regulator, Extended SMT, Economic/Standard, MSL1. TI SLVS696D gives 500 mA output in boost for VIN >2.4 V, 800 mA in buck at VIN=3.6 V, a minimum 900 mA average switch-current limit and a 1.8–5.5 V operating input range. Source/import preservation is not a completed land/paste or layout qualification. Its imported contact pads are approximately 0.665 ×0.280 mm; the TI example uses 0.600 ×0.250 mm. Its 1.2 ×2.0 mm EP matches the example. Contact/paste variation, thermal attachment, effective capacitance, inductor qualification and switching-loop placement remain to be completed after the module gate closes.

In power-save mode, the published -3%/+6% output tolerance gives 3.201–3.498 V. Adding a conservative 0.5% line plus 0.5% load allowance yields approximately 3.169–3.533 V, inside 3.0–3.6 V for static regulation. That arithmetic does not verify transient overshoot/droop. Full-load input estimate at VOUT=3.533 V, IOUT=0.5 A, VIN=3.0 V and assumed 80% efficiency is 0.736 A, before other battery loads. Design the battery/harness for at least 1 A; efficiency assumptions are not guaranteed minimums.

TI recommends a 1.5 µH inductor and low-ESR input/output capacitance. The existing qualified Samsung CL21A106KAYNNNE / C15850 0805 10 µF 25 V capacitor can be evaluated for reuse, including its existing DC-bias evidence. It is not sufficient to count nominal capacitance. No inductor identity or C-number has been invented or fitted.

## Documented external battery candidate

TinyCircuits ASR00012, manufacturer Shenzhen Hondark 803040PL-1000mAh, is a commercially listed protected 1000 mAh single-cell pack. [Official product](https://tinycircuits.com/products/lithium-ion-polymer-battery-3-7v-1000mah), [official specification](https://files.tinycircuits.com/Datasheets/ASR00012_1000mAh.pdf), revision 1 July 2022, preserved locally. Product check 2026-10-05: $9.95, add-to-cart listing; no order placed and stock is not reserved.

| Parameter | Documented specification |
|---|---|
| Maximum discharge | 1 A |
| Standard / maximum charge | 0.5 A / 1 A |
| Maximum charging voltage | 4.20 V |
| Discharge cutoff | 3.0 V |
| Charge temperature | 0–50 °C |
| Maximum dimensional envelope | 43 ×32 ×8.5 mm |
| Harness length | 60 ±5 mm |
| Pack connector | JST SHR-02V-S-B |
| Intended PCB mate | JST SM02B-SRSS-TB(LF)(SN) |
| Overcharge protection | 4.28 ±0.05 V |
| Overdischarge protection | approximately 3.0 ±0.1 V |
| Protection on-resistance | ≤60 mΩ |
| Protection quiescent current | 1–7 µA |

This external pack has **no JLCPCB number** and is not part of PCB assembly. Its SH harness does not mate with the existing PH battery connector. A verified, imported SH PCB connector and exact polarity/assembly orientation audit are required before selecting it as the final installed battery. No adaptor, harness repinning, or invented connector C-number has been assumed.

Importantly, the retained BQ25185 R8=130 kΩ setting is **4.1 V**, not 4.2 V (current TI SLUSF65B, revised August 2026, Table 6-1). Published ±0.5% regulation gives a 4.1205 V upper bound, below the candidate's 4.20 V maximum. The original 15 kΩ ±1% ISET resistor gives 20 mA nominal and approximately 18.81–21.21 mA from KISET=285–315 AΩ. That is within the pack's maximum charge current but approximately a 50-hour nominal capacity/current quotient; it is not an acceptable fast-charge product specification. Changing ISET to a verified imported 3 kΩ ±1% resistor would give 100 mA nominal; taking the larger of the ±5% factor spread and the charger's published ±10% fast-charge accuracy, and including resistor tolerance, gives approximately 89.1–111.1 mA. This would remain below the pack's limits. The resistor has not been selected or changed. CV time and reduced 4.1 V usable capacity remain unmeasured.

The retained TPS3839G33 has a documented falling threshold range 3.003–3.126 V, providing conservative board shutdown above the pack's 3.0 V discharge cutoff; pack PCM remains fault protection. Load-transient sensitivity/hysteresis must be audited against the new regulator enable loop. Preserve the existing automatic charge-temperature circuit, but check sensor placement against the larger battery and ensure the previously qualified guarded window remains inside the candidate's 0–50 °C range. Do not infer cell temperature from an unrelated board hotspot.

## Runtime and fit estimates

Assuming the 1000 mAh pack, 3.7 V nominal energy, an **engineering allowance** of 80% usable capacity (charging at 4.1 V, cutoff and ageing) and 85% conversion efficiency: available regulated energy is 2.516 Wh. At total average 3.3 V loads of 10/50/100 mA, the arithmetic yields approximately 76.2/15.2/7.6 hours. These are usage assumptions, not measured BLE runtime or a manufacturer guarantee at 4.1 V. Measure connection interval, advertising, number of shutter events and LED duty cycle before quoting product runtime.

The pack's 43 ×32 ×8.5 mm worst-case envelope exceeds the original battery carrier. A possible orientation uses 43 mm across the grip and 32 mm along its length, so the remote enclosure must be wider and deeper; the original 40 mm body is insufficient. Allowance for swelling, insulation, harness bend, sensor contact and at least the manufacturer's antenna clearance remains to be designed. No final enclosure size or verified physical fit is claimed. Do not alter frozen R6/R7 mechanics.

**Disposition:** a practical 3.3 V buck-boost/1 A protected-pack architecture is feasible. It is not yet an electrically, mechanically or manufacturing-qualified R8 implementation. The module land-pattern gate remains blocking. Battery, thermal, RF, runtime and enclosure testing are **POST-PROTOTYPE PHYSICAL VALIDATION** once an actual R8 design can be released.
