# Assembly research —2026-10-07

Read the current official tscircuit handbook `guides/code.md` and assembly/CAD
model documentation before implementation. The installed pinned namespace
supports `assembly.device`, `subassembly`, `cadassembly` and `screen`; newer
`printedpart`/`motor`/`cable` docs require APIs not present here. This product
uses supported subassemblies and JSCAD/localGLB models; no pinned-core upgrade.

Official sources:
- https://github.com/tscircuit/handbook/blob/main/guides/code.md
- https://docs.tscircuit.com/ (assembly and CAD/localGLB reference)
- https://github.com/tscircuit/docs
- https://github.com/tscircuit/core

Actual source/README from eight public projects was read through the public
registry before modelling.17 downloaded files have byte hashes in
`public-source-readback.json`. Complete research downloads are retained outside
this minimal project at `/workspace/r8-product-assembly-review-20261007`.

| Public project/version | Finding used or excluded |
| --- | --- |
|abse/museair-usb-assembly0.2.1 | Useful full device: actualPCB, separate enclosure/carrier/service parts; newer printedpart API excluded here |
|AnasSarkiz/magnetic-shutter-remote--01a0f81f0.1.9 | Native assembly/view patterns; frozen Nordic dimensions/parts never reused as R8 |
|ShiboSoftwareDev/magsafe-spin-counter1.0.2 | Separates PCB/RF from housing magnets; not MagSafe qualification evidence |
|abse/magsafe-twist-counter-prototype0.0.4 | Concept mockup, not dimensioned enclosure evidence |
|tscircuit/standard-jst-programmer0.8.0 | Actual target programmer and3-pin UART contract |
|AnasSarkiz/tscircuit-ai-agent-remote0.0.8-wip-speaker-routing | Service/battery/interface separation; unfinished electrical design not copied |
|erol/Monitor-lift-assembly0.0.1 | Name describes a wiring circuit, not usable full mechanical CAD |
|0hmX/ov7670-camera-module1.2.0 | Board/module/source qualification patterns, not a full product assembly |

The intended commercial product remains JJC MSG-P1. Existing retained reference
review and official Apple R31 interface inputs apply. No dimensions were inferred
from product photographs; no new commercial page inspection is claimed.
