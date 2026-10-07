# R8 0.3.16 — compact source and native product assembly

The active electronics source is four files instead of42.35 trace modules are
consolidated into one, with all36 runtime exports identical.39 original source
files and40 obsolete mechanical/doc/guide-preview files are preserved in two
verified recovery archives. Frozen baselines, original failing inputs and
qualification/firmware/toolchain evidence remain. Current mechanical history
is separated from R8; it is never used as R8 fit proof.

The current native board build passes. Its Circuit JSON SHA256 is
`7266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4`.
All1049PCB/CADelements and576 schematic elements are byte-structure identical
to the previously accepted0.3.15artifact.36 route arrays,25 supplier identities/44
poses and159 pin contracts are unchanged.19 refreshed checks pass zero native
DRC/shorts/dangling and independent manufacturing/process failures;29 physical
nets,174 track widths/current budgets are checked. Ten board/schematic PNGs
match previously actually inspected views byte-for-byte. Actual prior UI style0
remains applicable to the unchanged576 schematic elements; current CLI style0
and snapshots pass. The3same-page A4 explanations remain; no guide pages return.

Native closed/exploded assembly entrypoints use one actual board and44 supplier
meshes, partitioned into two under5MBassets. All44 anchors match qualified CAD
and every fitted mesh has nonzero geometry. The guarded native builds succeed;
whole-product renders are inspected. Plastic case/lid/support, horizontal
shutter, protected battery maximum envelope and MagSafe grip/contact cover are
modelled. All44 conservative electronics envelopes clear the printed parts/
cell; pairwise solids and the Apple outside30mm/6mm clearance test pass zero.
This is not a claim of universal phone/case/camera fit or certified MagSafe.

Six STL print-fit parts are generated from the exact same native32-facet plans
using pinned Manifold3D3.5.4/Trimesh4.8.3/NumPy2.5.3. NoError, matching bounds/
volume, watertight/winding consistency and actual STL readback pass. Independent
binary STL edge checks pass zero nonmanifold edges/degenerate triangles. Native
assembly remains tscircuit/JSCAD; rejected STL serialization inputs/meshes remain
in `rejected-print-meshes.tar.gz` (issue101). Current export evaluates source
CSG directly; it never repairs a failed display mesh or substitutes geometry.
The initial Python3.14/Manifold3.3.2 install lacked a wheel and failed CMake/TBB
configuration; the actual accepted guarded install uses official3.5.4 wheels.
Optional print tooling is separate from unchanged lightweight setup/start.

PCB44×56×1mm; printed remote shell54×62×21.6mm; docked CAD60.5×134.5×31.6mm.
The latter excludes unqualified fastener heads/leads. Existing PCB mounts are
unchanged. Battery support clears tallest fitted connector0.54mm nominally;
cell-to-roof gap2.1mm and cell-to-U5 gap4.79mm remain allocations, not measured
physical capability. Lid/service access, M2 hardware, pack harness/bend radius,
insulation/swelling, exact thermal coupling and side-switch travel need testing.
Exact magnet/DC shield, contact-cover material/bonding, retention/anti-rotation,
phone/case/camera fit and docked/detached RF/BLE operation remain unqualified.
No ring/torch circuitry or connector is added. Battery/programmer remain the
retained selections; UART is still direct3-pin SH/manualBOOTRESET/battery power.

Eight public projects and current official docs were read before modelling;
actual17file hashes and screening are under `research/`. Four local
model exports were first empty because the CLI uses a registry base;
all four affected local imports are resolved through the supported converter
base URL (issue100), without import edits, invented meshes or circuit JSON edits.
Standard glTF scene rotations preserve binary meshes/textures and match CAD.

Current sourcing uses the unchanged actual2026-10-07 observation: one board is
covered; radio AvailableOrderQty3 means five require pre-order. No reservation
or new stock observation is claimed. Supplier processed-preview/stackup/assembly
approval and physical programming/power/charging/BLE/iPhone/RF/thermal/runtime
remain pending. Native004/084 and original075/076 remain explicit. Missing3V3
metadata remains a separate importer issue. This is a physically untested
engineering prototype, not permission to order or a complete tested product.

Heavy builds/geometry/CAM run serially through the unchanged guard. Actual
observed limit32GiB/4CPU is not a promised plan allocation; Node heap14336MiB.
Current guarded jobs increment noOOMcounter; largest native3Dbuild is roughly
6GiB RSS. Core Node/Bun locks/archives/imports/firmware/frozen baselines and
setup/smoke/start guards remain unchanged.504 original protected files match;
cloud/HANDOFF is an intentional context update. Actual GitHub/native publish
and final file status/diff are recorded separately. No order/payment/supplier
contact/assembler upload, upstream issue/tooling publication, PR/merge,
frozen-main change or environment Publish/share is performed.
