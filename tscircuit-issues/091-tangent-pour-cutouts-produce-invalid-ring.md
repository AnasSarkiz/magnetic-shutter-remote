# Tangent clearance cutouts produce a self-intersecting pour ring

Classification: confirmed native-pour/independent-reader topology incompatibility
at a tangent clearance boundary. Whether the generic correction belongs in the
pour engine or the reader is not established.
It is not a component-import or `3V3` metadata defect.

Compact PCB route10 contains native `pcb_copper_pour_24`, bottom GND. The strict
independent reader rejects its BREP geometry with
`Ring Self-intersection[-2.6 7.2]`. Original full native input and failing command
are retained in `evidence/R8-compact-pcb-2026-10-06/failed-route10/circuit.json`
and `logs/route10-diagnostic-manufacturing.log`. The native checker found one
unrelated C6 via-in-pad error, zero shorts and zero dangling traces; its pass on
this pour does not establish independent export validity.

Two source transitions at(-3.2,7.2) and(-2,7.2) have0.6mm via pads and0.3mm
pour clearance. Their0.6mm-radius cutouts are exactly tangent at(-2.6,7.2).
The board revision separates the HOT transition to(-3.4,7.2), preserving the
same electrical endpoints and leaving a nominal0.2mm copper web. New routing
and independent readback must validate the resulting native geometry.

No generated JSON/Gerber repair, buffer(0), ignored ring, checker suppression,
threshold reduction or upstream/tooling publication is used. A regression keeps
the original native self-intersection rejected. This is a local source-layout
correction, not a claim that the generic pour engine has been fixed upstream.

Missing `3V3` metadata remains a separate importer issue.

Final compact route23: full native-schema/DRC/shorts and independent copper,
physical connectivity, width/current, export/readback/process/visual checks pass.
Retained failures are historical controls; no generic upstream fix is claimed.
