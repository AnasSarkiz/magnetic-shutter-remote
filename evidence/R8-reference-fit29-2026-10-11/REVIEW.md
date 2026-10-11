# Reference-matched enclosure update — R8 prototype 0.3.29

The requested change is to the actual editable enclosure, not to a concept
image. The palm now uses rounded crown sections with a fuller middle and a
narrower rounded base; the grip insert follows a curved contour instead of a
rounded rectangle. The shoulder cap is reduced from 13×7.3 to 11.8×5.5mm, with
its own aperture in the continuous case. The raised external bezel is removed.
The circular-face pocket retains a sealing land at the upper shoulder. The cavity follows the new rounded outline with a nominal1.6mm inset instead of cutting through its sides; the lower contour preserves the original battery clearance.

The overall envelope remains 90×78×34mm. The actual 44×56×1mm PCB, all44 fitted
supplier component poses, four mounts, protected32×43×8.5mm battery envelope
and switch contact are preserved. The L-slider retains the actual side-switch
contact at XY(−6.7,13.474), Z10.86, a0.15mm free gap and0.35mm nominal stop.
No PCB source, connectivity, copper, BOM, firmware, locks or baseline changes
are part of this revision. The validated electrical JSON is carried forward
byte-identical, not presented as a newly routed or rebuilt board.

The old gap is reproduced against b88784fa4c667b8c729668355b1c7c78a5b4af82:
21 interior wall samples were completely empty. The new coverage regression
checks native CSG material at radii26/27.6/29.3mm, angles125–165° and Z17.4–26mm,
clipped to the actual exterior. All151 applicable samples are covered. The first render exposed a remaining lower corner opening and an overhanging grip insert; the land was extended, the insert and pocket were kept within an inset outline, and a native overhang guard was added. The cap was recessed further into the shoulder.
The closure wall belongs to the lid; a planar joint prevents an isolated base
sliver. A nominal0.05mm planar seam clearance still requires a fit print. The old wall-post clearance also crossed the curved exterior; both the clearance and internal post are now clipped to inset outlines, retaining a nominal0.8mm outer wall there and at least0.2mm nominal post clearance. A native exterior-skin witness guards against reopening this side.

Initial arbitrary outline curves produced a cross-kernel volume discrepancy;
the final rounded sections use the project's existing64-facet cylinder plans.
Duplicate interior cut boundaries also produced STL degeneracies. The internal
cutters are united before retaining the land. The strict kernel-volume,
single-solid, watertightness, winding and zero-area checks remain unchanged.
Rejected trial logs are retained separately from the accepted result.

## Reproduction

Activate the pinned Node25.6.0/Bun1.3.9 from cloud/setup.sh. Run all mechanical
jobs serially through python3 cloud/run-heavy.py; do not run the root PCB build.
See product/README.md for the canonical geometry, bounded model, print,
closed/exploded assembly and eight-view rendering commands. Python3.14.7 with
product/print-requirements.txt was used for the optional print/model jobs.
The observed parent limit was34359738368bytes (32GiB), not a guaranteed allocation.

## Limitations

This is a closer interpretation of the supplied multi-view reference, not a
verified copy of measured production surfaces. Rendered leather-like grain is
material shading; fit-print meshes remain smooth. The exact latest chat image
is not retained as a local asset; any comparison labels the earlier saved
styling concept explicitly. No hidden reference surfaces are invented as proof.

Physical shutter stroke/return, fasteners, harness bends, USB plug insertion,
battery swelling/insulation/thermal contact, BLE/iPhone Camera, magnet pole/DC
shield selection, retention, RF and phone/case clearance still require tests.
Original075/076/004/084 remain documented; missing3V3 power metadata is a
separate importer issue. No order/payment/supplier contact or shared-viewer
feature was made. Publication status is PUBLICATION.md; build/test results
and exact source preservation are recorded alongside this report.

## Actual checks

The light setup completed with Node25.6.0/Bun1.3.9 and Python3.12.14; optional
mechanical tools used managed Python3.14.7. Final smoke passed38Python tests and
2Bun tests/13assertions, with129/129 frozen hashes and recorded archives exact.
The product suite passed8tests/627assertions. Formatting, TypeScript, native
canonical and allthree assembly builds passed. Independent readback checked
all51native component/part poses and30mechanical face-winding matches.
All8print parts are single solids with watertight/winding/zero-area actual STL
readback; strict native/manufacturing volume agreement passed. The native guard
reports0mm³ grip-insert overhang,0mm³ missing wall-post skin and151closed land
samples. These CAD tests do not qualify physical tolerances or hardware.

The eight camera renders use the actual17bounded models from the enclosure
Circuit JSON. Their placement, input hashes and unchanged mesh-shading geometry
are recorded in eight-views/native-placement-review.json. Product images and
associated render receipts now show this revision. Before/after comparison
uses the previous b88784f actual renders, with the earlier saved concept clearly
labeled. The latest supplied collage remains a visual design reference.

The first browser attempt used an opaque document origin and was rejected by
localStorage. Local HTTP attempts timed out, and response events did not expose
embedded model loads. These are retained as harness trials, not reported as
new tscircuit defects. The final harness uses an exact locally built HTML
response on a local test origin and observes clones of actual model fetch
responses without changing the original response or intercepting any external
request. Fresh browser results are recorded separately when complete.

Fresh native browser verification PASS: the actual closed and exploded viewer
rendered, orbiting worked, all17loaded model bytes matched source and the
independent review passed110PCB/component/mechanical pose checks with0browser
errors. Current screenshots and helper are in browser/; browser-geometry-review.json
records the exact assets and both current Circuit JSONs. Run the helper from the
repository root through python3 cloud/run-heavy.py, then scripts/review-product-browser.py.
The local test route serves only the exact standalone HTML; external requests
are untouched and use the managed network policy. No product viewer feature,
localStorage shim, TLS change or fake model response was introduced.
