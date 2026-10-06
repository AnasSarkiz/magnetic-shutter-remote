# R8 compact PCB electrical and fabrication review — 2026-10-06

Hardware/package **0.3.5**, native route23; **44 × 56 × 1mm**, two-layer FR4,
44 TOP fitted references /25 exact JLCPCB identities. Nominal PCB area is8.33%
smaller than the prior48×56mm board. Follow the JJC MSG-P1 magnetic grip and
detachable shutter arrangement; PCB, enclosure and MagSafe array dimensions
are independent. The qualified protected1000mAh pack is retained. No claim of a
drop-in JJC enclosure, qualified magnet assembly or universal iPhone/case fit.

Branch `board/r8-doit-c3-prototype-20261005`; predecessor HEAD
`c15d88cda14f86c7d6c26f40a12f2783c72a663e`.
Generated Circuit JSON SHA256: `e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`.

**PCB electrical/copper/local fabrication review PASSED. Prototype fabrication
approval is PENDING** the supplier-processed Gerber/drill/BOM/CPL preview,
current stock/substitution/assembly review. No assembler upload, supplier
contact, payment or order was performed. Physical programming, power/BLE/RF,
thermal/runtime and phone/enclosure/MagSafe fit remain untested prototype work.
Those bench tests do not represent a pre-existing electrical error or replace
the supplier fabrication review. This is not a production-ready consumer grip.

| Gate | Actual result |
|---|---|
| Exact components, values and pin/net contracts |44 fitted identities/values and159 source terminals unchanged from qualified direct-JST reference |
| Final unrouted netlist/pin/source/schematic/PCB placement |All5 native gates pass; final native fixture has0 traces and0 errors |
| Routed native schema/DRC/shorts |0 generated/native errors,0 hole-trace errors,0 dangling traces,0 self-shorts; native shorts CLI PASS |
| Independent physical copper and drilling |0 manufacturing failures; unchanged rules, curves parsed strictly |
| Missing connections |29/29 terminal nets physically connected through copper intersections/plated barrels |
| RF and thermal copper |0 RF intrusions; U2/U3 EP and ground pin covered by continuous TOP GND, local ground vias retained |
| Every track width |164 physical tracks inventoried,0 undersized tracks; minimum0.15mm; point joins separately identified |
| Power paths |Both USB orientations, battery feed/charge, radio3.3V and both inductor paths pass current/trace-only voltage budgets |
| Native exports/readback |12 original Gerber/Excellon files; exact full rounded outline, copper, mask, paste, drills and4 plated USB slots match current JSON |
| Exact assembly mapping |44 TOP references; USB registration,4 SW2 lands at270°,5 J3 lands at0° pass strict supplier-terminal registration |
| Full silk/stencil/mask |0 process failures;159 native paste apertures; assumed0.10mm stencil; min area ratio0.6999986, min mask web0.118262mm, min full-silk stroke0.162mm |
| CAM regressions |27 tests PASS, including original tangent pour, rounded outline, complete silk, overlapping legends, discrete aperture semantics and switching RMS controls |
| Lightweight setup/smoke |36 Python tests +2 Bun tests/13 assertions; pinned type/format and129 frozen hashes PASS |
| Visual review and native snapshots |TOP/BOTTOM PCB and independent Gerber views, all3 A4 sheets/details inspected; explicit-root gold reviewed, then native snapshot PASS |
| Supplier fabrication approval |PENDING; no upload/contact/order authorized |
| Assembled-board and complete MagSafe product tests |PENDING; no physical hardware attached |

Native output contains165 trace elements,97
vias,155 SMT lands,159 paste features,
4 USB plated slots and8 NPTH. No imported component, firmware, frozen baseline,
qualified dependency archive or heavy-memory guard was changed.

## Real pin and component checks

DOIT ESPC3-12-N4/C19949072 is the cheapest checked module compatible with the
pinned Zephyr BLE image; the cheaper C2's actual Bluetooth build failure082
remains retained. U1 VCC8/GND15, EN3, shutter GPIO4/pin6, pair GPIO5/pin7,
LED GPIO6/pin12, BOOT GPIO9/pin18, RX GPIO20/pin21 and TX GPIO21/pin22 retain
the reviewed manufacturer contracts. Power uses TPS63031/C15516, qualified
1.5uH C56594 inductor, BQ25185 charger and the protected ASR00012 pack.
Battery J2 is1GND/2positive;300mA nominal charging,267.3–333.3mA tolerance,
4.1V setpoint (4.1205V upper),6h timer and0–50C temperature guard remain.
Firmware bytes are unchanged; no SDK/firmware/3D build was run.

SW2 TS24CA/C393942 is at(20,-8.5)mm/270° on the right edge, pressed inward;
its exact supplier lands have nominal0.400041mm board-edge clearance. Reset
moves to(14.5,11.5)mm with its legend; battery/power/pair/mount locations move
inward for the44mm outline. Values and pin nets do not change.

J3 BM03B-SRSS-TB(LF)(SN)/C160389 remains at(13.2,16)mm/0°, top entry+Z:
**1RX/2GND/3TX**, supports4/5GND. Use straight-through SH to published
standard-jst-programmer0.8.0 J5 **1TX/2GND/3RX**. Battery on, R8 USB unplugged,
programmer target-power/SWD unplugged, manual BOOT/RESET and UART-enabled
programmer firmware/CDC0 DTR true. [Retained programming procedure](../R8-standard-programmer-2026-10-05/PROGRAMMING.md).
No actual board flash or programmer UF2 build is claimed.

## Every trace and power neck

[Per-track inventory](trace-width-review.json) records every actual aperture
width, net and pass. Lower-current control/signal branches may use0.15mm;
USB/radio load paths are checked separately. Authored VIN and both inductor
pin necks widen from0.20 to0.30mm; the EP ground return is also0.30mm and radio
local GND escape0.50mm, joining native planes. PCB trace widths are not all
identical, and a net's nominal routing width is not treated as a current rating.

| Physical load path | Minimum track mm | Design current A | Nominal IPC estimate A | Result |
|---|---:|---:|---:|---|
| V3 | 0.15 | 0.5000 | 0.6044 | PASS |
| VBAT | 0.30 | 0.7427 | 0.9991 | PASS |
| USB_VBUS1 | 0.15 | 0.4000 | 0.6044 | PASS |
| USB_VBUS2 | 0.15 | 0.4000 | 0.6044 | PASS |
| BATTERY_CHARGE | 0.15 | 0.3333 | 0.6044 | PASS |
| INDUCTOR_L1 | 0.30 | 0.7444 | 0.9991 | PASS |
| INDUCTOR_L2 | 0.30 | 0.7444 | 0.9991 | PASS |

Nominal35um external copper/10C rise IPC-2221 estimate; copper resistance at50C,
3.169–3.533V static regulator envelope and80% assumed efficiency. Module
trace-only floor **3.1143V** exceeds3.0V;
regulator input floor **2.9732V**
exceeds the2.4V/500mA boost condition. Switching uses TI equations2/3,
minimum2.2MHz and1.2uH (-20%): RMS
**0.7444A**, peak
**0.8319A**, below qualified
inductor1.7A RMS/2.3A saturation. These are design calculations, not measurements.
Via/contact/cell impedance, plane bottlenecks, startup/fault pulses, thermal
spreading, EMI and actual loaded voltage require prototype validation.

Trace/pad minimum0.15mm, via edge/pad0.35mm, ordinary hole/trace0.30mm,
via drill separation0.50mm, PTH separation0.55mm and0.60/0.30mm vias remain.
Independent ordinary drill-to-SMT clearance0.20mm includes same-net/own-pad
cases; only previously documented thermal exceptions apply. No thresholds
were lowered and no generated copper/Gerber/import was patched.

## Corrections and known issues

Failed placements/routes remain separate. Actual router shorts and drilled-pad
violations were fixed with authored native fanouts/phase paths: charger
3-terminal disable, reset/control/ground escapes, CC1 and USB VBUS pairing,
complete thermal set route and power necks. The final native routing and exact
export audits prove the current outcome; earlier passes are not reused.

Issue091 records strict-reader/native-pour topology incompatibility at exactly
tangent via cutouts. HOT via separation leaves a0.20mm nominal web; final
geometry/readback and original-input regression pass. No generic upstream
pour-engine fix or silent geometry repair is claimed. Issue092 records the
DC-only switching-width audit omission; the original0.20mm neck passes DC but
fails the new RMS control, and source widening passes full revalidation.

Warnings004 (J3 inferred planar insertion direction) and084 (the two Q reference
style warnings and two no-power warnings on discrete MOSFETs
represented by exact chip imports) remain visible; official JST top entry and
exact G/S/D contracts establish their disposition. Abandoned WROOM075 does not
apply to fitted DOIT. **Missing `3V3` metadata remains a separate importer issue.**
The fitted DOIT import already has correct power metadata. Nominal land
variations078/079 retain the measured engineering-prototype qualification;
no new supplier approval or upstream fix is implied.

Issue093 records the PAIR/POWER overlap missed by the earlier process audit.
PAIR now sits at(17,-5)mm; same-layer legend separation is checked with a real
failing-control regression. J2 now uses supported numeric schPinArrangement
to put VBAT alone left and GND right: the previous drawing crossing was
marked is_crossing with no junction, not an actual PCB short. Issue094 retains
the named-pin/core-schema failure; numeric pins pass full schema parsing.
No imported symbol or pin assignment was modified.

## Reproduction and limits

Run lightweight `bash cloud/setup.sh` and `bash cloud/smoke.sh` directly. Run
heavy commands serially through `python3 cloud/run-heavy.py -- <command>`.
[Command list](REPRODUCE-COMMANDS.json), current JSON reports, visual inspection
hashes and complete logs identify this build. Node25.6.0/Bun1.3.9,
Python3.12.14/CAM3.14.0; core0.0.2035, CLI0.1.2237, router0.0.951,
Gerber0.0.109, checks0.0.231, SVG0.0.433, CPL0.0.19, locked qualified archives.
Observed32GiB/4 CPU equivalents,14336MiB heap and OOM counters0 are not a
plan allocation guarantee. Setup/start remain lightweight and preserve the
active task branch/R8 context. No env Publish, default-branch update or merge.

[Fitted BOM](../../BOM.md) retains exact2026-10-05 sourcing observations;
stock/prices are not reservations or an assembler quote. [Fabrication package](../../fabrication/R8-compact-pcb-2026-10-06/)
needs the supplier-processed preview and current stock/assembly review before
order approval. Current public publication/readback is recorded separately
after actual success. Frozen main and prior manifests/evidence stay immutable.

Fresh lightweight setup and full smoke PASS after the explicit Bun file-path
correction; the original failed invocation and both successful diagnostic logs
remain in this evidence directory. Existing issue075 output is the abandoned
WROOM audit, not the fitted DOIT qualification. The heavy memory guard is unchanged.
1752 protected archived files plus129 portable R7 baseline hashes pass; all
tracked baselines/imports/firmware/toolchain files remain unchanged.
