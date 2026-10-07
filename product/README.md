# R8 3D product assembly — engineering prototype

![Closed product](closed.png)
![Exploded product](exploded.png)

The actual44×56×1mm routed R8 PCB and all44 real supplier models sit inside
an original serviceable enclosure. The protected ASR00012 battery uses its
manufacturer maximum envelope, rather than an invented supplier model.
The right-side plunger presses the existing TS24CA horizontally. The remote
slides out of a separate MagSafe grip; no phone-width clamp or RGB light is added.

| Envelope | CAD dimensions, mm |
| --- | --- |
| PCB |44×56×1 |
| Detached printed shell |54×62×21.6 |
| Grip and cradle |60.5×123.5×13.4 |
| Docked assembly |60.5×134.5×31.6 |
| Battery maximum envelope |43×32×8.5 |
| MagSafe contact disk |Ø59 |

Docked dimensions include the battery envelope, printed parts and reference
magnetic annulus; fastener heads and final leads are not qualified dimensions.
Phone-facing datum is Z=0. Remote floor is Z=10mm. Parts outside the30mm
contact radius stay at least6mm above that plane. The PCB and side-button
positions are unchanged. The contact plane is a common MagSafe datum, not
proof of compatibility with every iPhone/case/camera arrangement.

## Files and reproduction

- `../product.assembly.tsx`: native closed assembly.
- `../product.exploded.tsx`: native exploded assembly.
- `assembly.tsx`, `geometry.ts`, `dimensions.ts`: supported
  `assembly.device/subassembly` APIs and editable JSCAD plans.
- `models/r8-pcb.glb` and `models/r8-controls.glb`: one actual native board and44 supplier models, partitioned into two bounded upload assets and normalized into
  PCB coordinates by a standard glTF scene rotation. Binary meshes/textures
  are preserved. All44 CAD anchors and nonempty geometries are checked.
- `geometry-review.json` and `pcb-model-review.json`: measured bounds/volumes,
  pairwise printed-part/battery intersections and board-model identity.
- `prints/`: six generated STL parts. These are fit-test files, not approved
  production tooling or proof of print tolerances.

Use the pinned setup and the existing Python3.14 CAM venv from the repository root, then serially. Printing is optional engineering work; lightweight setup/start never runs these jobs:

```sh
python3 cloud/run-heavy.py -- bun scripts/export-product-pcb.ts
python3 cloud/run-heavy.py -- bun scripts/review-product-model.ts
python3 cloud/run-heavy.py -- bun scripts/check-product-geometry.ts
python3 cloud/run-heavy.py -- tooling/gerber-review-venv/bin/python -m pip install --only-binary=:all: -r product/print-requirements.txt
python3 cloud/run-heavy.py -- tooling/gerber-review-venv/bin/python scripts/export-product-prints.py
python3 cloud/run-heavy.py -- tsci build product.assembly.tsx --glbs
python3 cloud/run-heavy.py -- tsci build product.exploded.tsx --glbs
python3 cloud/run-heavy.py -- bun scripts/render-product.ts product.assembly
python3 cloud/run-heavy.py -- bun scripts/render-product.ts product.exploded
```

The assembly creates no second PCB, routing or circuit. `bun run dev` exposes
both native assembly entrypoints as well as the original PCB. The PCB GLB must
be regenerated and reviewed whenever a user-authorized board change occurs.

## Service and fit

The MagSafe pocket opens from the phone-facing side; install the qualified array/DC shield before bonding the separate0.6mm contact cover. The array reference has0.25mm nominal radial pocket allowance. Cover material, adhesive and retention require qualification.

The base has four lower seats at the existing mounting holes. Lid pillars with2.2mm shaft clearance
capture the PCB from above; no fragile printed post runs through a PCB hole.
The removable battery support rests on enclosure ledges. The pack has2.1mm
nominal clearance below the roof and the support clears the tallest fitted
connector by0.54mm. These are nominal CAD gaps, not measured process capability.
The wider left bay reserves space for the side-entry SH battery plug/leads.
USB-C has a12×9.5mm opening around its manufacturer mating datum.

Remove the lid and lift the pack/support while keeping the correctly polarized
battery connected to reach PAIR, BOOT, RESET and J3. Use the standard JST
programmer J5→J3, battery power ON, remote USB-C unplugged. Verify no tension on
battery leads. Pairing access through the closed lid is not implemented.
The plunger is centred on the actual supplier-model actuator axis (PCB-centre Z+1.36mm) and has0.15mm nominal actuator free gap; its captive flange remains
inside the cavity. Stroke, return, overtravel and print tolerance need testing.

## Unqualified items

The magnetic annulus is **reference geometry only**, using Apple R31
46/54.1mm ID/OD and1.1mm thickness. An exact magnet array, pole arrangement,
DC shield, retention and anti-rotation still need selection/qualification.
It is not an LED ring, a purchased magnet model or a universal phone-fit claim.

Specify and test the battery harness/plug insertion/bend radius, swelling,
insulation, strain relief, exact M2 nylon fasteners/thread retention and
sensor-to-cell thermal bridge. The nominal cell-to-U5 gap is4.79mm; no
unspecified pad is treated as qualified. Temperature sensing must track the
cell, not merely board temperature. Phone/case/camera clearance, MagSafe pull
force, dock retention and docked/detached RF/Camera behavior require hardware.
Do not order a complete product from these geometry files alone.

Eight public tscircuit projects and official assembly docs were inspected before
this design; source hashes and screening are recorded in the dated review.
The old Nordic enclosure/STLs are archived and never used as R8 fit evidence.
