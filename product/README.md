# R8 camera-grip enclosure — 90 × 78 × 34 mm reference prototype

![Actual native CAD](closed.png)
![Actual exploded CAD](exploded.png)
![Phone-facing CAD](phone-facing.png)

The supplied multi-view image is the design reference: a black sculpted camera
palm flowing into a thin circular back, a bronze pill shutter in the shoulder,
a fine textured lower grip and side USB-C access. The actual fitted CAD now
uses a curved crown, thinner circular body, domed button and continuous shoulder.
The images are studio renders of the native assembly, with material finish and
lighting added. They are not photographs of a manufactured enclosure.

The outer envelope is checked at 90 × 78 × 34 mm. A concept image does not
provide measured surfaces, seam tolerances or a production texture sample, so
exact photographic identity is not verified. Fine leather-like grain is a
specified surface finish shown in the render; fit-print STLs have a smooth
insert for that finish, rather than a drilled dot pattern. No certification
marks from the concept are reproduced.

![Straight native CAD view](studio-straight.png)
![Side native CAD view](studio-side.png)

| Envelope | Checked CAD dimensions, mm |
| --- | --- |
| Whole docked assembly, including shutter cap | 90 × 78 × 34 |
| Unchanged PCB | 44 × 56 × 1 |
| Protected battery maximum envelope | 32 × 43 × 8.5 |
| Phone-facing contact disk | Ø59 |
| Circular back total depth from phone datum | 17.05 |

The unchanged PCB is rotated 90° in plane, centred at product XY(−15.2,−9),
Z9.5, across the upper shoulder and circular body. All traces, four mounting
holes and 44 fitted supplier components retain their original board-relative
positions. The protected ASR00012 pack occupies the lower palm. Dimensions
exclude unqualified screw heads, harness leads and adhesive/material variation.

The angled bronze shoulder cap drives an internal L-shaped slider toward product−Y.
Its contact is aligned with the actual TS24CA side actuator at
XY(−6.7,13.474), Z10.86, with 0.15mm nominal free gap. The cap and contact are
at different positions because the existing switch must remain unchanged.
The manufacturer specifies 0.15 ± 0.05 mm switch travel. The channel's nominal
0.35 mm stop includes the 0.15 mm free gap and 0.20 mm maximum switch travel.
The black sleeve blends into the shoulder and covers the linkage.
Native CAD checks four positions from released to that stop against the case,
PCB and other 43 component envelopes, permitting the intended SW2 actuator
contact. A shoulder-wall witness verifies that the linkage opening stays inside
the case. Printed tolerances, friction, force, guides, return and stop strength
still need a physical fit test.

## Source and reproduction

`../product.assembly.tsx` and `../product.exploded.tsx` use native
`assembly.device/subassembly` APIs. Editable plans and dimensions are in
`assembly.tsx`, `geometry.ts` and `dimensions.ts`. Eight fit-print STLs are
produced from those same plans: base, lid, battery support, shutter linkage,
finger insert, rear face, phone dock and phone-facing cover.

Seven bounded PCB GLBs contain the actual board and all 44 supplier models.
Standard glTF scene records preserve binary mesh/material data, expand shared
mesh instances and bake the rigid 90° board rotation into the assembly loader
frame. Y-up prevents automatic rescaling. Independent readback verifies all
source triangles and fragment bounds in both built GLBs, alongside original
CAD-anchor checks. No supplier import or electronic circuit JSON is edited.

With pinned Node/Bun activated, run these optional mechanical jobs serially.
The existing Python3.14 print venv is used; setup/start remains lightweight.

```sh
python3 cloud/run-heavy.py -- bun scripts/export-product-pcb.ts
python3 cloud/run-heavy.py -- bun scripts/review-product-model.ts
python3 cloud/run-heavy.py -- bun scripts/check-product-geometry.ts
python3 cloud/run-heavy.py -- tooling/gerber-review-venv/bin/python scripts/export-product-prints.py
python3 scripts/review-product-stls.py --output evidence/R8-sculpted19-2026-10-07/independent-print-mesh-review.json
python3 cloud/run-heavy.py -- tsci build product.assembly.tsx --glbs
python3 cloud/run-heavy.py -- tsci build product.exploded.tsx --glbs
python3 cloud/run-heavy.py -- tooling/gerber-review-venv/bin/python scripts/review-native-product.py --output evidence/R8-sculpted19-2026-10-07/native-view-review.json
python3 cloud/run-heavy.py -- bun scripts/render-product.ts product.exploded
python3 cloud/run-heavy.py -- bun scripts/render-product.ts product.assembly phone-facing
# Optional studio presentation: installed Blender 4.3.2, four CPU threads.
python3 cloud/run-heavy.py -- blender --python-exit-code 1 --background --python scripts/render-product-studio.py -- --view front
python3 cloud/run-heavy.py -- blender --python-exit-code 1 --background --python scripts/render-product-studio.py -- --view straight
python3 cloud/run-heavy.py -- blender --python-exit-code 1 --background --python scripts/render-product-studio.py -- --view side
python3 cloud/run-heavy.py -- blender --python-exit-code 1 --background --python scripts/render-product-studio.py -- --view back
```

`print-requirements.txt` pins optional mesh tools. Native geometry/volume,
watertight mesh and readback receipts are retained. No second PCB or routing
is generated. Runtime guards remain unchanged; observed32GiB is not a promised
allocation. The rejected tall candidate's evidence applies only to that shape.

## Mounting and service

Lower seats and lid supports capture the original four2.2mm holes at PCB
XY(−19,25),(19,25),(−19,−14),(19,−14). M2 fasteners enter from the underside
through base/PCB clearances into blind1.7mm pilots, leaving the visible lid
smooth. The mount below the battery uses a short support and lateral beam to
a wall post, keeping a tall pillar out of the cell. Exact nylon hardware,
thread retention and assembly sequence remain unqualified.

The maximum pack envelope is checked against the shell and components. U5
is next to the pack rather than touching it; a qualified thermal bridge is
still needed. Battery insulation, swelling, wire bends, polarity, strain relief
and practical connector insertion are not proven by a rectangular envelope.

USB-C has a side tunnel to the unchanged recessed PCB connector. Actual plug
hood depth and insertion clearance require a cable fit test. Initial power
switch access is lid-off; no external slider lever is qualified. Remove the
lid and lift the pack/support to reach PAIR/BOOT/RESET/J3 without stressing
battery leads. Program through standard JST programmerJ5→remoteJ3, battery
powerON and remoteUSB-C unplugged.

A circular collar closes the dock seam while staying within the 30 mm contact
radius. The complete upper remote detaches from the separate phone-facing dock through
four printed slide keys. Retention, release and anti-rotation need testing.
The phone datum is Z0; the collar meets the dock at Z4.8. Geometry outside
the30mm contact radius is at least6mm
above it. This is not proof of fit with every iPhone, camera or MagSafe case.

Install the selected magnets/DC shield before bonding the0.6mm phone cover.
The finger insert is candidate TPU or a qualified textured covering, with0.3mm lateral and0.1mm adhesive
allocation. Rear-face/insert materials, bonding and durability remain pending.

## Remaining qualification

The annulus is AppleR31 reference46/54.1×1.1mm geometry, not a selected magnet
array. Exact poles, DC shield and adhesion are unqualified. The PCB reaches
into the circular body, so full module/metal RF clearance and docked/detached
RF need qualification; no enclosure RF pass is claimed.

Physical shutter/service/charging/programming/thermal/BLE/iPhone Camera,
phone/case clearance, pull force, retention and durability tests remain pending.
Supplier-processed board/assembly preview remains pending. These are prototype
fit files, not complete-product order approval. No RGB light is fitted.

[Current review](../evidence/R8-sculpted19-2026-10-07/REVIEW.md).
Publication outcome is recorded separately in that evidence directory.
