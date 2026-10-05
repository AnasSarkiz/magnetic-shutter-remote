# USB4215 paste qualification

**ENGINEERING QUALIFICATION ONLY - NOT FOR FABRICATION**

**SUPPLIER FOOTPRINT VERIFIED** for paste/mask import fidelity. **MANUFACTURER PASTE QUALIFIED: BLOCKED.**

| Feature | GCT guidance | Supplier CAD / imported / actual Gerber | Status |
|---|---|---|---|
| Copper/drills | Rev A dimensioned land drawing | Independently compared; exact comparison image included | Component geometry PASS |
| Contact paste | Exact stencil apertures/reductions not specified | 12 explicit TOP polygons preserved; dimensions in aperture table | Supplier fidelity PASS; GCT approval BLOCKED |
| Shell paste | Four through-hole shell stakes; exact stencil volume/process not specified | 4 segmented capsule polygons preserved, rear approx. 1 x 1.8 and front 1 x 2.2 mm | Supplier intent verified; GCT method/volume BLOCKED |
| Mask | Exact treatment not specified | 0.0508 mm source margins preserved on all 16 lands; 16 composited CAM openings verified | Supplier fidelity PASS; manufacturer direction unconfirmed |
| Stencil thickness | Not found for exact part | No thickness or overprint assumed | BLOCKED |

The 16 supplier apertures do not certify reflow/PIP approval, complete mechanically adequate shell joints, absence of a secondary operation or assembler coverage. Exact pattern and stencil thickness/volume must be confirmed for the proposed **1.0 mm PCB**. No R5 stencil changed.

[Full aperture table](APERTURE-GEOMETRY.md), [source image](source-paste.png), [imported image](imported-paste.png), [native viewer](native-imported-paste-view.png), [actual Gerber crop](final-gerber-paste-crop.png), [four-anchor details](four-shell-anchor-close-up.png), [GCT questions](GCT-REQUEST.md).
