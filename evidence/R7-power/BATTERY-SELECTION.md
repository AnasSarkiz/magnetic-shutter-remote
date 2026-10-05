# R7 shared battery selection — engineering, not runtime/fit acceptance

Selected external pack candidate: **Jauch LP603443JU+PCM+2 WIRES 70MM**, Jauch number **246512**; DigiKey **1908-LP603443JU+PCM+2WIRES70MM-ND**. [Exact stocked SKU](https://www.digikey.com/en/products/detail/jauch-quartz/LP603443JU-PCM-2-WIRES-70MM/9560987): 521 observed 2026-10-04. No order/reservation. No JLCPCB number: this is externally assembled.

- Current manufacturer electrical sheet: **12/2024, Rev 1.2**, `references/R7/Jauch-LP603443JU-246512.pdf`. Nominal 3.7 V, minimum 850 mAh / typical 900 mAh, continuous discharge 900 mA, cutoff 3.0 V, discharge −20…60°C.
- Manufacturer mechanical/polarity drawing: **10/2022, Rev 1.1**, `references/R7/Jauch-LP603443JU-246512-rev1.1-drawing.pdf`. Maximum **45.0 × 34.5 × 6.2 mm on delivery**, **6.6 mm after cycling**; not the retailer's nominal 6.5 mm. Cable 70±5 mm AWG26 UL3302. Explicit red positive / black negative. Both sheets identify 246512; newer sheet supplies electrical limits, older sheet supplies published maximum dimensions. They are preserved separately.
- PCM: overcharge detection 4.28±0.02 V, release 4.18±0.05 V; undervoltage detection 3.00±0.05 V, release 3.00±0.10 V; overcurrent 3…6 A. **PCM does not enforce the 900 mA continuous cell limit.** A separate current-limited torch branch remains required.
- Charge: 450 mA standard / 900 mA maximum **only at 15…45°C**. At 0…15°C limit 180 mA. At 45…50°C maximum 450 mA with 4.1 V regulation. Proposed simpler product window remains narrower than these limits.

## Charging choice pending exact resistor import and circuit integration

Retain BQ25185, 4.1 V setting. Proposed **150 mA** using 2.00 kΩ ±1% ISET: TI's 150 mA table is 135…165 mA, conservative resistor-adjusted bound **133.663…166.667 mA**, below 180 mA cold-region allowance. Charge setting factor 285…315 AΩ is not a replacement for the broader ±10% current-accuracy bound. Typical charge time from depleted cell is ~5.7 hours minimum-capacity/150 mA before CV taper; not measured.

Existing 4.1 V regulation upper bound 4.1205 V remains below PCM's lowest 4.26 V overcharge threshold. Charge temperature must be sensed through a designed battery thermal interface. Existing R6 TMP390 source alone does not prove that it senses this larger pack. Do not increase ISET on the main board until all affected checks pass.

## Current and runtime

Use minimum 850 mAh energy, not 900 mAh typical, and conservatively cap combined steady current below 850 mA. Proposed TPS2553 35.7 kΩ ±1% gives min660.718 / nom728.364 / max805.276 mA; add20 mA radio/control reserve => max825.276 mA. This is a provisional envelope: final boost inrush/driver load and independent hardware faults remain to be checked.

At assumed80% battery-to-LED efficiency,3.3 V loaded full-brightness floor,65% usable nominal energy and20 mA reserve: estimates **62.9 /55.8 /47.7 minutes at1.5/1.7/2.0 W**. The limiter's *minimum* guaranteed threshold cannot supply2 W at that floor. The final driver/current setting must therefore stay in the approximately1.5–1.7 W region or be re-evaluated. The3.3 V floor and65% energy fraction are assumptions; no runtime acceptance passed.

The evaluated Adafruit1578 500 mAh pack is limited to500 mA continuous; Jauch600 mAh LP503040JH is limited to600 mA continuous. Neither meets the modeled2 W envelope. This does **not** mean every500–600 mAh cell is inadequate. A higher-discharge530 mAh bare cell was not selected because adding a new pack-protection assembly and validating its manufacturer limits was not justified while an existing protected850 mAh pack fits the current design envelope.

## Mechanical implementation requirements

Reserve **46.0 ×35.5 ×7.6 mm** minimum free cavity for the published45.0 ×34.5 ×6.6 mm maximum pack, giving0.5 mm designed allowance per side; this is an engineering allowance, not an invented battery tolerance. Keep all screws, sharp edges and conductor hardware outside it. Add a removable carrier/insulation; never compress or encapsulate the pouch. Route and strain-relieve70±5 mm leads; no soldering directly on the cell.

External harness: terminate documented **red(+) at J2 pin1/VBAT, black(−) at J2 pin2/GND**, with exact existing JST-PH-compatible crimp/housing parts qualified before final enclosure release. No color inference is used. Continuity/polarity verification of the assembled harness remains POST-PROTOTYPE PHYSICAL VALIDATION.

Antenna placement, battery carrier, main-board/component clearance and closed-enclosure interference have **not** passed for this larger pack. Original R6 carrier was for a different battery. Final R7 body dimensions are not frozen.

Battery / temperature / charge / runtime / RF / enclosure-fit tests: **POST-PROTOTYPE PHYSICAL VALIDATION**.
