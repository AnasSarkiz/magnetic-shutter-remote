# R5 sourcing inheritance

No fitted MPN/C-number or supplier definition changed in R5. The dated observations and Standard/X-ray/MSL requirements below remain applicable as observations, not stock reservations. New USB candidate libraries were rejected against manufacturer drawings and are not accepted assembly selections. J1 remains an unqualified review-only selection. See [current qualification](R5-QUALIFICATION.md) and issues 042/050.

# R3 component qualification — 2026-10-02

All 37 fitted references / 24 exact supplier identities appear in [BOM.csv](BOM.csv), [BOM.md](BOM.md) and [bom.json](bom.json). All are TOP. Oct 1 observations remain dated; HCTL USB was rechecked Oct 2. No stock reservation is implied. Standard assembly and radio X-ray requirements remain; charger MSL3, thermal sensor MSL2 and LED MSL3 handling retained. Original raw inputs/imports and local supported source fixes remain preserved.

**Current USB: HCTL HC-TYPE-C-6P-01A / C2894893**, Extended SMT, Economic/Standard eligible, high difficulty, MSL1, stock observed 15005; current component flags show no X-ray/fixture/manual-audit flag. [Official JLC listing](https://jlcpcb.com/partdetail/HC-TYPE-C-6P-01A/C2894893) specifies 20 V / 3.5 A and -25..85°C, above design input 5.5 V / normal load 30 mA. These are supplier published ratings; the saved manufacturer Rev A drawing supplies geometry. [Dated safe sourcing record](evidence/R3/HCTL-sourcing-oct2.json), [manufacturer PDF](references/C2894893-manufacturer.pdf), [unchanged supported raw input](evidence/R3/C2894893.raweasy.json), [actual supported import](imports/HC_TYPE_C_6P_01A.tsx).

Manufacturer recommended copper and actual supplier land variations are disclosed separately from terminal/drill registration; neither is manually normalized. VBUS .7599934 versus reference .70 ±.05, and shell width 1.0999978 versus .90 ±.05, exceed reference tolerance. Correct pins/drills and passing copper checks do not close expanded-land process qualification. [Exact final audit](evidence/R3/HCTL-LAND-QUALIFICATION.md). Four shell slots 0.5000244 × 1.401064 agree with nominal 0.5 × 1.4 at actual correct pitch; minimum annulus 0.199465 exceeds absolute JLC 0.18, below recommended 0.25. No locating NPTH at USB. Original GCT C5184243 genuinely fails 0.2 NPTH clearance independently from actual exports; source errors cannot repair its manufacturer nominal 0.1751 gap. C5252714 was also investigated and rejected at strict pin1-based placement orientation, preserved as issue 029. HCTL meets strict supported rotation and classified source/export clearance checks. Shell soldering and fine-pitch stencil acceptance are distinct open process requirements, not established by the SMT listing alone.

| Supplier pin | USB terminal | Final connection |
|---|---|---|
| 1–4 | Four shell stakes | GND |
| 5 | A12 | GND |
| 6 | A9 | USB5V |
| 7 | B5 / CC2 | Independent R2 5.1 kΩ to GND |
| 8 | A5 / CC1 | Independent R1 5.1 kΩ to GND |
| 9 | B9 | USB5V |
| 10 | B12 | GND |

No USB data pins or bootloader are invented; both plug orientations use separate CC pull-downs. Native supplier insertion is local -Y, rotated 180° to board +Y. Manufacturer mouth and envelope are accounted for in the original enclosure; intended cable clearance is a design allocation pending physical cable/fit checks.

All other component pin/rating/polarity/capacitor derating and electrical limit calculations remain applicable from [R2 electrical qualification](evidence/R2/ELECTRICAL-QUALIFICATION.md), **except its historical J1 pin list and old underside mechanical arrangement**, superseded above and in mechanical/dimensions.json. U1 E73 43-land audit retains disclosed pin-3 -0.02484 mm supplier displacement; no guess/remap/footprint patch. Supported canonical importer fixes regenerate SPDT, MOS reference symbols, verified connector direction and declared slots. Current source netlist, source/pin checks, A4 rendering, placement, routing, strict BOM/CPL and actual CAM pass to their stated scope.

Remaining manufacturer/process qualification is explicit: TI charger default stencil differs from DLH example; shell stakes require solder-process review; imported legend strokes/overlap/overhang need compliant disposition; panel/fixture and assembler registration have not been approved. [Exact unsent questions/drawing](fabrication/ASSEMBLY-REVIEW.md). Physical battery, thermal, stability/effective capacitance, RF, fit and phone tests remain pending.

---

## Historical R2 sourcing record (superseded USB/mechanical status)

# R2 component qualification

All 37 fitted references have exact manufacturer identities and JLCPCB C-numbers in [BOM.csv](BOM.csv). Official availability was checked on 2026-10-01. Use Standard assembly and X-ray because E73 C356849 requires them; J1 is high difficulty. Stock observations are not reservations. U2's more restrictive JLC MSL3 handling takes precedence over TI's newer MSL1 package listing; U5 MSL2 and LEDs MSL3 remain recorded.

[Electrical, pin, footprint, polarity, rating and capacitor-bias review](evidence/R2/ELECTRICAL-QUALIFICATION.md) gives the acceptance basis and remaining assumptions. Exact original imports are preserved in `evidence/R1-original-imports/`; affected components were regenerated using `scripts/regenerate-qualified-imports.sh` and corrected local importer source. No imported symbol, footprint or pin map was hand-edited.

I1–I3 were addressed at their source: explicit SPDT metadata preserves common terminal 2 and throws 1/3; custom-symbol references use their real parent component; connector metadata preserves manufacturer mating direction and custom pin symbols. C431540 MSK12C02 replaces scarce C221660. C5184243 replaced the Pre-order C3020560 identity, but subsequently failed the independent manufacturing clearance audit and is not accepted for fabrication.

E73 C356849: Standard/X-ray, stock 1,689 / available 1,246. Ebyte's 13×18×3 mm body and all 43 terminations were audited in `radio-land-audit.json`. Pin 3's approximately 0.025 mm displacement is retained and explicitly assessed for terminal overlap; it is not silently normalized. The manufacturer gives termination dimensions rather than a separate host land drawing. Minimum overlap under the stated ±0.1 mm placement assumption is approximately 0.725 mm; soldering and RF remain prototype tests.

JST PH and SH manufacturer land drawings were retrieved and compared. PH is side-entry toward local −Y; SH is top-entry. The PH battery plug mates internally with the lid removed, so the remaining generic edge-facing warning is accepted only on the documented mechanical corridor. GPIO, SWD, battery connector polarity, LED/MOSFET/IC pin mapping and passive ratings are documented in the electrical review. Supplier land extensions/reduced toe areas on the switches are disclosed engineering assumptions for an untested prototype, not custom replacement footprints.

**B1: J1 USB4105-GF-A-120 / C5184243 is rejected for fabrication.** Its locating-hole-to-SMT-copper clearance is 0.175281 mm < 0.2 mm. The raw drawing agrees with the supplier import; an importer fix cannot repair this conflict. [Nine alternative investigations](evidence/R2/USB-ALTERNATIVE-AUDIT.md) did not produce an accepted replacement. A corrected eligible supplier entry or another fully qualified connector is required. Do not alter these pads/holes locally or imply the alternatives are approved.

Samsung capacitor bias curves are typical, not guaranteed minimum-capacitance specifications. The calculations include tolerance, temperature, small-signal and aging allowances, but actual stability/effective capacitance remains a prototype check. The selected C19666 suffix is NRND yet currently stocked Basic; no silent substitution is permitted.
