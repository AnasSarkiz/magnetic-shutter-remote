# SilkscreenCircle ignores inherited PCB visibility styles

Classification: **confirmed @tscircuit/core styling integration defect**, version0.0.2035 in the pinned qualified runtime. Fixed locally by the narrowly scoped source patch; no upstream fix or tooling-package publication is claimed.

`SilkscreenPath` and `SilkscreenText` resolve pcbSx visibility. `SilkscreenCircle.doInitialPcbPrimitiveRender()` directly inserted its record without resolving visibility. As a result `pcbSx={{"& footprint silkscreencircle": {visibility:"hidden"}}}` left supplier circles in native JSON/Gerbers. The supported board styling was ineffective; editing an imported footprint or generated Gerber would not fix the tool.

Actual before-fix tests: **2 fail /1 pass /6 assertions**. Inherited board selector and component-only selector both incorrectly retained circles. The visible control kept its original transform/radius/stroke/layer. Logs: `evidence/R8-standard-programmer-2026-10-05/logs/circle-visibility-control.log`; original source: `qualification/SilkscreenCircle-before.ts.txt` in that directory.

The fix calls the existing `resolvePcbProperty` with the circle selector path, exactly as the path primitive does, and returns before insertion only when resolved visibility is hidden. No geometry, export, electrical check or clearance threshold changes. Regression covers inherited board selection, component-scoped selection, retained functional text and unchanged visible-circle geometry.

Canonical source/declaration build, focused regressions, source overlay/runtime checksums and native final export verification are recorded in `tooling/R8-patches/SILK-VISIBILITY.md`, its manifest and the current board review. Previously qualified archives are immutable; the new runtime has a distinct filename. Original route04 failing full silk and route05 ineffective-style outputs/logs remain separate. Root imports are untouched. The fitted circuit continues to expose real004/084 warnings. Full-layer process coverage089 is a separate project-checker correction.
