# R6 applicability

R6 is an ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED. The retained engineering requirements below continue to apply except J1 is now GCT USB4215-03-A/C37616412 at the qualified R6 position with a12×9.5mm enclosure opening. R6-QUALIFICATION.md is authoritative for current J1geometry/process disposition and exports. Production-only shell/stencil/profile uncertainty does not block the user-authorized first prototype.

# R3 requirements and intended limits

Original detachable rechargeable BLE camera remote and magnetic grip. Target native iPhone Camera and Samsung Camera as the representative Android app, using BLE HID Consumer Control Volume Increment. App/version behavior must be measured on a prototype; no universal camera compatibility is asserted. Fill light excluded.

PCB: 36×56×1 mm, 2-layer FR4, R2 corners; two Ø2.2 mounts (±13,24); original wire-through hole removed. Remote body 40×60×16.8 mm, overall width 42.4 with slider and height 17.5 with button caps. Grip 68×108 mm; base thickness 6.5, rail maximum Z=9.8 mm. Docked button top Z=24.3, external steel plate bottom Z=−0.5; total plate-to-button stack 24.8 mm. These are original design allocations in millimetres, not JJC measurements. See dimensioned PDF and dimensions.json for sources, locations, tolerance budgets and final reviewed USB geometry.

USB-C: 4.75–5.5 V input, normal charge system ≤30 mA, independent 5.1 kΩ CC pulldowns, no PD/data. Battery: externally installed protected DATA POWER DTP401525(PHR), 110 mAh, maximum 15.5×27×4.2 mm. BQ25185 set to 4.1 V / nominal 20 mA; 18.812–21.212 mA tolerance range. Independent TMP390/Q2 charge-temperature inhibition; cold/hot nominal 5/36°C. Cell-to-sensor thermal error limits and startup behavior remain POST-PROTOTYPE PHYSICAL VALIDATION. TPS3839 disables radio near 3.08 V; TPS7A02 regulates 3 V. USB presence disables the radio. See [full electrical calculations](evidence/R2/ELECTRICAL-QUALIFICATION.md).

SW1 is SPDT power control, SW2 shutter, SW3 pairing; LEDs report charging and BLE state. J3 exposes target Vref, SWDIO, GND, SWCLK, reset, GND. Pin assignments and firmware GPIOs are checked together. No USB bootloader or programming interface is promised.

Design load: 15 mA radio peak, battery rated continuous discharge ≤110 mA. Assumed 60 mAh usable yields approximately 82 days at 30 min connected + 120 s advertising + 100 shots/day, or 120 hours continuously connected at assumed 0.5 mA. These are estimates, not measured runtime.

Manufacturing target: JLCPCB Standard assembly with X-ray for E73; 1 oz copper, 1 mm FR4, 2 layers. Actual minimum traces 0.15 mm; automatic vias 0.25 mm drills / 0.6 mm copper, explicit saved escapes 0.3 / 0.6. Published capability checks include ≥0.1 mm track/space, ≥0.15 mm SMT pad separation, ≥0.2 mm NPTH-to-copper and routed-edge clearance, and ≥0.18 mm 2-layer PTH annular ring. Actual generated geometry must meet these limits; configuration alone is insufficient. Native DRC does not cover every capability. Original J1 C5184243 violated NPTH clearance; R5 used HCTL C2894893; R6 uses GCT USB4215-03-A/C37616412 with four plated shell slots and no USB locating NPTH. Complete source/export copper, stencil release calculations, legends and assembly registration pass. Production stencil/profile/shell-process approval remains pending; prototype shell inspection and possible manual rework are explicitly accepted.

All-layer antenna exclusion Y≤−22.9 across the board. Only the E73's own antenna body is exempt. Ebyte's qualitative metal/layout guidance is followed using an original 15 mm metal-separation target; cell edge separation 17.2 mm, docked phone-metal projection ≥24.9 mm with the specified alignment. These calculations are not RF performance tests.

Release gates remain those in VALIDATION.md. No R3 order, external publication, push, supplier contact or assembler upload is authorized or performed. Historical authorized R2 review upload remains a separate record.
