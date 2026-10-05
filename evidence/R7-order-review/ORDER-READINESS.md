# R7 shutter-only prototype order review

**LOCAL DESIGN / CAM CHECKS PASS — JLCPCB PROCESSED PREVIEW REQUIRED BEFORE PAYMENT.**

User cancelled all torch / fill-light work on2026-10-04. Active entry is index.circuit.tsx;
no torch hardware, larger battery, driver, ring or extra connector is fitted. Historical
emitter research is preserved and excluded from the order files. This is an R7 review
of the unchanged frozen R6 PCB, not a claim of a new electrical design.

- Frozen PCB source: R6 commit77965a8012d5544e962d987ce958c5c5614dbe3a.
- Current branch: r7-shutter-only-order-review.
- PCB36 x56 x1 mm, two layers,37 TOP /0 BOTTOM fitted parts,24 exact JLC identities.
- J1 GCT USB4215-03-A /C37616412 faces+Y board edge, rotation180deg. Battery J2 is an
  internal harness connector; SWD J3 is top entry. All imports remain untouched.
- Original110mAh DATA POWER DTP401525(PHR) battery,20mA nominal charging, automatic
  cold/hot charging disable and3V BLE rail retained. No torch load or second battery.
- Routing, shorts, classified copper/drill/pour clearance, grounding/RF keepout,
  source/netlist/pin/placement checks pass. Twelve CAM files, four plated USB slots,
  16/16 USB paste contours,161 TOP paste apertures and37/37 registration pass.
- 0.10mm stencil: worst calculated area ratio0.6999986, aspect1.999996; no release failures.
- TOP/BOTTOM PCB, three native A4 schematics,3D37/37 mesh coverage, actual CAM and
  dimension/assembly drawings inspected. Physical performance remains untested.
- Retained firmware build and final GPIO/source hashes match. No new build claimed.

## What remains before payment

Review actual JLCPCB-processed CAM/assembly preview, not local renders. Verify J1 exact
part/orientation,4 plated slots,16 paste features, all37 TOP placements, no substitutions,
current stock/attrition, clear USB mouth/carrier rails, and FIVE FINISHED ASSEMBLED BOARDS
rather than five panels. Capture every warning. Use Standard PCBA for U1 and required
X-ray. Do not automatically accept supplier changes, pay or place an order.

Actual exported minimum J1 mask web0.098247mm; JLC publishes nominal0.10mm soldermask
bridge capability with pad-spacing/color/copper context. This borderline web requires
specific processed-preview disposition. Select1oz copper and green mask; do not claim
black/white/heavy-copper compatibility. No threshold lowered or dam acceptance fabricated.
See usb-mask-review.json and J1-actual-cam-overlay.png. The previously frozen source is
not silently altered to hide this condition.

## Evidence limitations / preservation

Canonical board suite:79 tests,77PASS,1FAIL,1SKIPPED. Failure is the preservation assertion:
971/972 protected R4/R5 files match; original R5 DFM-review ZIP is missing. Expected
SHA256 a969feb5a1760ed802f26e5e76807687a73552a394f2e25d6acf46a022b2ea3f. Cause/time unknown.
The skip is the existing R2 regression whose historical input
`evidence/R3/R2-inputs/dist/index/circuit.json` is absent. Neither is hidden or waived.
All2,898 recorded original R6 files match;53 active PCB source/import files match frozen
R6. Current Circuit JSON differs only in filesystem-provenance metadata; every other
record, including copper/placement/pin/route/paste/mask, is identical.

Importer evidence retained: focused USB7,685 assertionsPASS; later circular-paste
extension9,174 assertionsPASS.33 baseline full-suite failures remain; full suite NOT
claimed passing. They are not new board DRC failures.

Neither R7 GitHub origin nor a confirmed R7 registry destination is configured. Public
publication is incomplete and is not claimed. dist/index/circuit.json is included locally.

## Prototype versus production

User-authorized first engineering prototype accepts possible shell-joint inspection/rework.
Exact production reflow/cycle/paste/manual process qualification remains pending; not
reopened as another connector search. Local CAD paste is not assembler coverage approval.
Do not assume a manual process is permitted merely because it is feasible.

Battery,RF,thermal,runtime,enclosure/cable fit and iPhone/Android camera behavior are
**POST-PROTOTYPE PHYSICAL VALIDATION**. Existing PCB shutter/pair switches are top-actuated.
A shoulder-access mechanism is not complete; the first board is an electronics prototype,
not a finished side-button consumer product.

## Files

Current fabrication/R7-order-review contains the matching CAM ZIP,BOM,CPL and drawings.
The review archive contains only those order-review files, current evidence summary and
previews. It excludes oldR4/R5 packages, emitter candidate, tool sources and caches.
No ordering, supplier contact, upload or publication occurred.
