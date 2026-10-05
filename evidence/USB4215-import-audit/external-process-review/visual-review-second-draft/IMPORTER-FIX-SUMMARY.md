# Importer fix summary

**ENGINEERING QUALIFICATION ONLY - NOT FOR FABRICATION**

Local easyeda 0.0.364 source fix; upstream/R5 lineage `140046d000238f3d6c8611989682efb2872f25a9`. Separate local repository/branch `frozen-toolchain/easyeda-converter` / `qualification/usb4215-paste-fidelity`. Archival control commit `7910eedb8f0635ed941ea634b64c1f9874c437fc`; fixed commit `2f52a09b4293b2802f837f6350c37fb55c2198a5`. These are local snapshots, not published upstream releases.

The converter discarded filled SOLIDREGION paste layers and PAD paste/mask settings. Additive schema/primitive/transform, TSX, SVG and Gerber support now preserve source polygons/settings through supported re-import. No supplier, generated component, Circuit JSON or Gerber was hand-edited. Seven source-only local repositories preserve the original and fixed snapshots separately from the board history.

Raw CAD 16 → parsed 16 → direct importer JSON 16 → generated component 16 → rendered JSON 16 → actual TOP paste CAM 16. Twelve contact and four shell regions; zero duplicates, merging or BOTTOM paste. Maximum contour discrepancy 0.000000565686 mm from export coordinate quantization.

**Focused USB4215/importer regression passes: 7,685 assertions. 33 unrelated/baseline full-suite failures remain.** Full run 278 pass/33 fail; unchanged-source control includes the same 33 failure names. No full-suite pass or general upstream release readiness is claimed. Fixture/core/transform/render/export/CAM tests and locked separate-directory reproduction passed in the preserved audit; no broad test run was repeated here.

These results qualify supplier fidelity only, not GCT stencil/process or JLCPCB shell coverage. **SUPPLIER CAD INTENDS PASTE ON FOUR SHELL FEATURES** is the supported process-related observation.
