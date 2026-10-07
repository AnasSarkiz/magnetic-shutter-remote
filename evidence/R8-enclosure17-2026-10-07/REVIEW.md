# R8 enclosure0.3.17 — camera-style engineering prototype

The user approved the realistic styling image, requiring actual PCB/battery fit
and true side-switch alignment. The new editable native CAD has a rounded palm
bulge, domed service lid and broad curved shoulders from the grip to the MagSafe
face. The remote sits alongside the contact face with an outer horizontal
bronze-coloured shutter cap. The detachable slide remains; the electrical board
and switch are not moved relative to the enclosure's mounting datum.

The shell is64×72×23mm at its widest palm section. Docked CAD envelope is
113.5×76×33mm; this excludes unqualified screw heads/leads. The image was
styling only. The actual PCB/battery make the CAD grip broader than the slender
illustration; PCB fit has priority. No phone-shaped placeholder is fit evidence.

Fresh native geometry checks pass no pairwise solid clashes, no component/PCB
bounding-envelope clashes for the actual board and44 fitted meshes, and no
outside30mm/6mm phone-plane clearance violations. All four actual2.2mm PCB
holes match XY(-19,25),(19,25),(-19,-14),(19,-14). Independent solid witnesses
verify lower seats and upper lid pillars at all four holes. The native switch
model tip and printed plunger give0.149974mm free gap (nominal0.15), common
Y=-8.5 and productZ14.86mm; actuation is horizontal+X. Actual stroke, return,
overtravel and print tolerance remain physical tests.

The protected ASR00012 maximum43×32×8.5mm envelope and support stay unchanged,
with2.1mm nominal clearance beneath the roof,0.54mm support-to-tallest-connector
clearance and4.79mm cell-to-U5 gap. Harness insertion/bend radius, swelling,
insulation/strain relief and cell thermal coupling require qualification.
USB and power openings extend through the wider curved walls. The recessed
power slider needs an insulated plastic tool for this first-fit prototype; an
external slider lever is not yet qualified. Exact cable
hood access must be tested. PAIR/BOOT/RESET/JST service remains lid/pack lifted.

Both native views build successfully. PNGs render the exact native GLB geometry
with part colour palettes via public glTF/Poppygl material APIs; this styling
changes neither GLB nor electronic geometry and is not a real material approval.
Native converter JSCAD colours otherwise use its gray default. All six STL
files from the identical CSG plans pass native bounds/volume agreement,
watertightness/winding and actual emitted-file readback. Independent STL edge
review is recorded separately. Three product regressions, types, formatting
and lightweight smoke pass; command receipts retain actual counts.

Previous two PCB GLBs were rejected by the registry with HTTP413, not just a
network timeout. Seven fragments below2.4MB binary each preserve one board
and44 supplier meshes. Vertex counts, bounds and anchors match the previous
qualified models to1e-5mm; no import/model substitution or proxy bypass. Largest
is2,116,240bytes (~2.82MB base64). Upload outcome is still recorded after actual
native publication; smaller payloads alone do not prove remote success.

First clearance drafts had RemoteBase/MagSafeGrip interference87.50/34.68mm³.
The native guard failed as intended. Rail spacing, grooves and low end-stop
were corrected; original diagnostic logs remain under rejected-clearances/.
No threshold was relaxed or collision ignored.

All electronics source/imports/firmware/locks and board Circuit JSON bytes
remain unchanged (SHA2567266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4).
472 original electrical/protected paths were verified. Prior0.3.16 board,
schematic, BOM, copper/net/width/process/CAM readback evidence is carried
forward exactly:0DRC/shorts/dangling,29 physical nets,174 widths. These are not
new electrical checks. No rerouting, root PCB build, SDK or schematic edit was
performed. Fabrication bytes are the same qualified prior files; no new stock
claim is made. Ring remains deferred. Immutable baselines/setup/start/guards
remain unchanged. Current heavy checks run serially through the guard, with
observed32GiB/4CPU and zeroOOMincrements; not a promised allocation.

This is a print-fit engineering prototype, not a finished tested product.
Exact MagSafe array/polarity/DC shield, cover material/bonding, anti-rotation,
dock retention, M2 nylon fasteners, phone/case/camera/RF/retention and assembled
programming/charging/thermal/BLE/Camera testing remain pending. Supplier
processed preview/assembly approval and order authorization remain distinct.
Original075/076/native004/084 and separate missing3V3 importer issue remain.
No order/payment/supplier contact/assembler upload, PR/merge, frozen-main change,
upstream issue/tooling publication or environment Publish/share is authorized.
