# R8 reference enclosure0.3.18 — actual 90×78×34mm CAD candidate

The user's latest multi-view image supersedes the broad0.3.17 and unpublished
tall0.3.18 candidates. Native CAD matches the specified90×78×34mm total envelope
and implements a rounded lower camera palm, integrated circular back, curved
waist, bronze shoulder shutter, side USB-C tunnel and hidden underside lid
fasteners. Exact photographic texture/moulded finish and physical qualification
are not claimed. See ../../product/README.md for reproduction and limitations.

## Actual current checks

- Product geometry: zero mechanical/electronic solid intersections,44 fitted
  component envelopes, original board and maximum protected pack contained,
  all four actual2.2mm PCB mounting points supported.
- Whole product measured bounds XY/Z: (−59,−52,0) to (31,26,34)mm.
- Real side-switch contact: horizontal product−Y, measured0.149972mm free gap,
  contact centreX−6.7/Z10.86. A rigid L-slider links the shoulder cap to the
  unchanged switch. Stroke, return/guides and overtravel are unqualified.
- All eight actual emitted STL files pass closed/winding and native CSG
  volume/bounds agreement, readback, and independent edge checks with zero
  nonmanifold edges/degenerate triangles. No mesh repair or threshold relaxation.
- Native closed/exploded builds pass. Independent actual GLB readback passes
  34 fragment/part checks, preserving all source triangles and placement.
  All45 board/fitted-model records retain original counts/bounds within1e−5mm.
- Typecheck, formatter and three focused product tests pass67 assertions.
  Lightweight smoke passes38Python+2Bun tests/13assertions. Its original075
  qualification warning remains explicit and applies to the abandoned import;
  it does not certify current hardware or erase separate076 metadata history.
- Closed, exploded and phone-facing native views inspected. No certification
  graphics are copied. The internal button linkage is covered by the shoulder.

Logs/commands and machine observations are retained in this folder. All heavy
jobs run serially through cloud/run-heavy.py. Observed cgroup32GiB/4CPU is an
observation, not a guaranteed plan allocation; no OOM counters increased.

## Preserved electronics and failed candidates

The PCB is rotated90° as a complete rigid body, centredXY(−15.2,−9), Z9.5.
Its1049 PCB/CAD records, original44 supplier identities/poses, routing/widths/
nets, firmware, BOM and fabrication geometry are unchanged. Board CircuitJSON
SHA256:7266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4.
All472 electronic inputs and504 immutable reproduction inputs are byte-verified.
The dated native0DRC/shorts/dangling,29physical nets,174width/current checks,
manufacturing/process/readback and sourcing reports are carried byte-identically
from17 (ultimately the unchanged qualified board); they are not new electrical
runs. No root board/routing/SDK/CAM build occurred for this mechanical revision.

The glTF display-coordinate/shared-instance root causes and lossless scene
normalization are recorded locally in issue102. Supplier imports, binary mesh
buffers, dependencies and locks are unchanged. No tooling package/public
upstream issue was published. Rejected tall/fitting candidates and their failed
checks are retained in the byte-verified portable archive named by
rejected-candidate-archive.json; they are not accepted geometry or passes.

## Remaining gates

This is a printable fit prototype, not complete-product ordering approval.
Fit the actual USB-C plug hood/tunnel and test side-button travel/return/guides,
underside nylon fasteners/thread retention, battery/harness/swelling/insulation,
U5 thermal coupling, lid-off service and assembled programming/charging/BLE/
iPhone Camera operation. Power switch access is lid-off in this candidate.

The separate dock's printed slide keys and release/retention are unqualified.
Exact MagSafe magnet/pole array, DC shield, bonding and anti-rotation remain
unselected. Complete module/metal RF clearance and docked/detached RF require
qualification because the PCB extends into the circular body. No universal
phone/case/camera fit is claimed. Supplier processed board/assembly preview,
physical pull force, runtime, charging/thermal and durability remain pending.

Original075/076/native004/084 and the separate missing3V3metadata importer issue
remain explicit. Stock observation is dated2026-10-07 and covers one board;
three radio units available-to-order means five boards need pre-order. Stock
is not reserved. RGB ring remains deferred. Ordering/payment/supplier contact
remain separately restricted. Public prototype upload/readback status is in
PUBLICATION.md, independently of these local fit checks.
