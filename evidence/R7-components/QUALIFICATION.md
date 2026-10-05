> Historical investigation: the user cancelled all torch / fill-light work on 2026-10-04. Nothing below is part of the active shutter-only BOM or a blocker for that board. Earlier scope decisions are retained as history.

# R7 component qualification — 2026-10-04

**Candidates, not a completed R7 BOM.** Supplier imports preserved without manual edits. Stock is not electrical/mechanical qualification.

**Scope superseded 2026-10-04:** custom LED-ring development is stopped by user direction. The product will use a purchased external fill-light ring; no exact ring or interface has been selected. Entries below preserve earlier component research, not the selected R7 torch BOM. The PT4115 importer failure was subsequently fixed locally and independently checked; see `../R7-power/EXTERNAL-RING-INTEGRATION.md` and `../../VALIDATION.md`. Import fidelity is not electrical qualification.

| Exact MPN / C-number | Current supplier evidence | Outcome |
|---|---|---|
| ams OSRAM GW VJLPL1.CM-LTLV-XX58-1-350-R18 / C34478671 | [JLC](https://jlcpcb.com/partdetail/C34478671): stock 326, orderable 324, Extended SMT Economic/Standard | 2700 K CRI-90 emitter candidate, pin1 cathode/pin2 anode |
| ams OSRAM GW VJLPL1.CM-K3LX-XX51-1-350-R18 / C34312856 | [JLC](https://jlcpcb.com/partdetail/C34312856): stock 819, orderable 815, Extended SMT Economic/Standard | 6500 K CRI-90 emitter candidate, pin1 cathode/pin2 anode |
| Diodes AL1793AFE-13 / C67354 | [JLC](https://jlcpcb.com/partdetail/C67354): stock/orderable 902, Extended SMT MSL1 | BLOCKED land discrepancy; not fitted |
| Diodes AL1792AFE-13 / C2678881 | [JLC](https://jlcpcb.com/partdetail/C2678881): zero stock/preorder | Import comparison only |
| Diodes AL1791AFE-13 / C156300 | [JLC](https://jlcpcb.com/partdetail/DiodesIncorporated-AL1791AFE13/C156300): zero stock/preorder | Not selected |
| UMW PT4115 / C347356 | [JLC](https://jlcpcb.com/partdetail/C347356): stock100,518/orderable100,080, Extended SMT Economic/Standard MSL1 | BLOCKED supported import: curved paste gge1076 |
| Diodes AL8860WT-7 / C125330 | [JLC](https://jlcpcb.com/partdetail/DiodesIncorporated-AL8860WT7/C125330): stock12,845/orderable12,453, Extended SMT MSL1 | Alternative only; recommended PWM<500Hz, photography/dimming concerns |
| TI TPS61085DGKR / C113659 | [JLC](https://jlcpcb.com/partdetail/C113659): stock2,132/orderable2,063, Extended SMT Economic/Standard MSL1 | CV boost candidate; max18.5V; alternative land-pattern qualification pending |
| TI TPS2553DBVR-1 / C111738 | [JLC](https://jlcpcb.com/partdetail/C111738), CLI stock14,979 | Current-limiter candidate; official current stock and alternative land-pattern qualification pending |
| TI LM3410XSDX/NOPB / C2678969 | [JLC](https://jlcpcb.com/partdetail/C2678969): zero stock/preorder | Not selected |
| TI LM3410XMFE/NOPB / C2679292 | [JLC](https://jlcpcb.com/partdetail/C2679292): zero stock/preorder | Not selected |

## LED evidence

[Manufacturer source](https://ams-osram.com/products/leds/white-leds/osram-oslon-pure-1414-gw-vjlpl1-cm). Preserved v1.4 datasheet2025-01-16: `references/R7/OSRAM-GW-VJLPL1-CM-supplier.pdf`. Note9 states ±0.1mm unless otherwise specified; acceptance uses this documented tolerance.

- Copper nominal0.55×1.35mm, supplier0.50×1.35001mm: within stated tolerance, not exact nominal equality.
- Paste nominal0.45×1.25mm. Core default0.35×0.94501mm fails height tolerance. Original preserved.
- Board-native paste margin−0.025mm yields0.45×1.30001mm within tolerance. No generated definition changed.
- Proposed80µm stencil area ratio≈2.09. Calculation is not assembler process approval.
- Minimum specified LED current10mA. Mixed-channel DC dimming below10mA unsuitable; evaluate true pulses.
- CRI/CCT specified at manufacturer test conditions; actual lower-current performance/diffuser/mixing requires prototype.
- Datasheetp17 explicitly provides reflow profile: recommended peak245°C/max260°C; time above217°C recommended80s/max100s; within5°Cpeak recommended20s/max30s. This is distinct from prior GCT heat-resistance conditions.
- No supplier LED3D model; bounding boxes cannot verify exact optical/body fit.
- Stocked pair does not support9000K. Neutral5500K requires calibration.

## Battery candidates — no final selection

External items have no invented C-number.

- DTP603443 / SparkFun PRT-13854,850mAh: [document](https://cdn.sparkfun.com/datasheets/Prototyping/850mah-en-1.0ver.pdf). Pack max45×34.5×6.2mm; continuous850mA. Retail width differs; drawing wire colors/polarity conflict with ordinary convention and remain unresolved.
- PKCELL LP-503562 / Adafruit258,1200mAh: [supplier](https://www.adafruit.com/product/258), [approved drawing](https://cdn-shop.adafruit.com/product-files/258/C101-_Li-Polymer_503562_1200mAh_3.7V_with_PCM_APPROVED_8.18.pdf). Pack62±0.3×35±0.3×5±0.3mm; continuous1200mA. Use retailer's conservative charge≤500mA. S-8261AAJMD thresholds and connector-view polarity pending. Larger battery requires longer enclosure.

850mAh feasibility model assumes80% efficiency,3.3V loaded supply,65% usable nominal energy,20mA radio reserve:62.9/55.8/47.7min at1.5/1.7/2.0W. It omits any subsequently selected linear-driver loss. The3.3V floor is not implemented. Recalculate after final driver/battery selection; no runtime/fit acceptance passed.
