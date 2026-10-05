# R6 engineering prototype qualification

**ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED**

## J1 geometry and electrical mapping

GCT USB4215-03-A / C37616412; official Rev A drawing/specification dated 2024-04-26. Supplier UUID 3104977db58742e399663286e4a66eac. Copper, slots and terminal centres match the manufacturer drawing; successful import alone was not used as qualification. Exact measured source/CAM values are in `evidence/R6/manufacturing-review.json`; original audit in `evidence/USB4215-import-audit/`.

| Feature | Actual geometry mm | GCT reference |
|---|---|---|
| Eight narrow contact lands | 0.2999994 × 1.1999976 | width 0.30, length 1.15 ±0.05 |
| Four wide power/GND lands | 0.5999988 × 1.1999976 | width 0.60, length 1.15 ±0.05 |
| Rear shell slots, local X ±4.319905 / Y +1.4250226 | hole 0.5999988 × 1.3999972, copper 0.999998 × 1.7999964 | hole 0.60 ×1.40, copper1.00 ×1.80 |
| Front shell slots, same X / Y −2.5749694 | hole0.5999988 ×1.7999964, copper0.999998 ×2.1999956 | hole0.60 ×1.80, copper1.00 ×2.20 |
| Contact pitch | nominal 0.50 | official recommended PCB layout |
| Mask | source expansion0.0508 on all 16 lands | supplier setting; independently exported/clearance checked |
| Paste | 16 separate TOP polygons | exact unmodified supplier CAD |

Local geometry rotates 180° at the authored anchor. All four plated slots are represented as G85 Excellon slots and read back by a slot-capable reader. No NPTH locating holes are added for J1.

| Imported terminal | Manufacturer contact | Circuit |
|---|---|---|
| 13,14,15,16 | EH2,EH1,EH3,EH4 shell anchors | GND |
| 17 /28 | A1B12 /B1A12 | GND |
| 18 /27 | A4B9 /B4A9 | USB5V |
| 20 /26 | A5 /B5 | CC1 /CC2, each independent5.1kΩ Rd |
| 19 /25 | B8 /A8 | SBU2 /SBU1, noConnect |
| 21 /23 | B7 /A7 | D−, noConnect |
| 22 /24 | A6 /B6 | D+, noConnect |

USB data are unused; charging and CC work in both plug orientations by documented paired VBUS/GND and separate Rd contacts. Physical insertion and source negotiation are unperformed prototype tests.

## Completed software/design evidence

- Native source/netlist/pin-specification/schematic-placement/placement, routed build and shorts checks: recorded commands/exits in `evidence/R6/suite-exits.json`.
- Classified manufacturing clearances (pads, plated slots, round/NPTH holes, vias, traces and pours): no failures in `copper-audit.json`. No lowered rule thresholds or same-footprint exemptions.
- 12 CAM files, full outline/drills/slots/layers read back; `cam-readback/readback.json`. BOTTOM paste is empty because all 37 fitted parts are TOP.
- 37/37 source → Circuit JSON → BOM/CPL → assembly PDF registrations. J1 unique180° supplier-terminal pose checks16/16 positions; others retain strict supplier pin1 checks. Independent Python recheck agrees.
- J1 paste16/16, no duplicate/merged shapes; max contour difference0.000000565686 mm. Total161 TOP apertures, no missing coverage, no mask/outline violations.
- 0.10 mm stencil retained. Worst area ratio0.6999986; aspect1.999996. These are calculated release metrics, not physical transfer measurements. EP coverage is explicitly recorded and not used alone as a pass/fail surrogate.
- Solid continuous TOP GND includes BQ25185 GND and full exposed pad; all GND SMT lands physically connected; lateral GND vias connect bottom plane; no via-in-pad. Correct TI SLUSF65B, August2026, §7.4.1/Fig7-9. No RF keepout intrusions. Thermal performance pending.
- Actual functional silkscreen clears mask/outline, minimum glyph height1.129158 mm/stroke0.18 mm. BAT +/−, shutter/pair/power and SWD orientation/pin functions retained.
- Firmware rebuilt against unchanged final GPIO assignments: FLASH164660 bytes, RAM26796 bytes; source HEX/BIN/debugELF hashes recorded. BLE HID Consumer Volume Increment, 60ms press/release, pairing/bond control. Compile success does not prove camera compatibility.
- Focused importer regression7,685 assertions PASS. 33 baseline full-suite failures remain; full importer suite is NOT claimed passing. PNP55 tests/347 assertions; CLI polygon-paste/injected-short regression2 tests/3 assertions; current board regression totals in final log.
- Native PCB TOP/BOTTOM, all3 A4schematic sheets, 3D, high-zoom J1, actual CAM copper/mask/paste and mechanical/PDF views reviewed. Native viewer limitations/warnings are recorded, never substituted for CAM metrology.

## Mechanical fit

PCB36×56×1 mm; body40×60×16.8 mm; USB opening12×9.5 mm; grip68×108 mm. GCT body8.94×6.50×3.16nominal, manufacturer general tolerance gives9.19×6.75×3.41max. Nominal mouth axisZ7.48; worst plug vertical opening clearance0.08 mm, horizontal connector clearance1.105 mm, plug shoulder engagement margin0.3601694 mm, battery-to-USB body worst clearance0.2101694 mm. Manufacturer maxima plus explicitly allocated PCB/print/location tolerances are in `usb-mechanical-fit.json`; these are calculations, not measured print tolerances. Tight margins require physical fit testing. Actual STL carrier side gap0.55 mm and dock stop0.299999996 mm. Original engineering dimensions, not JJC internal measurements.

## Sourcing and assembly

37 fitted refs/24 exact identities, all imported JLCPCBparts. J1 live official JLClisting2026-10-03:125stock,43orderable,Extended SMT,Economic/Standard,MSL1. No reservation or guarantee of future stock. Other unchanged identities retain dated R5 sourcing records; no invented substitutions. U1Standard/X-ray requirement remains recorded in BOM; choose Standard PCBA as required. 59native vias below0.3 mm trigger documented extra fabrication charge, not a DRC error.

**PROTOTYPE MANUAL REWORK MAY BE REQUIRED FOR FOUR USB SHELL ANCHORS.** The four source shell paste shapes prove supplier CAD intent, not exact GCT/JLC process approval. Inspect and document all four joints on arrival; production stencil/profile/cycle/secondary-solder constraints and exact assembler coverage remain **PRODUCTION PROCESS QUALIFICATION PENDING**.

Battery safety/thermal lag, RF, current/runtime, magnetic/enclosure/cable fit, and native iPhone/representative Android camera behavior remain **POST-PROTOTYPE PHYSICAL VALIDATION**. No physical passes are claimed. USB4216 remains HOLD—ZERO STOCK/UNSUPPORTED CAD MODEL; not used and no new search performed.
