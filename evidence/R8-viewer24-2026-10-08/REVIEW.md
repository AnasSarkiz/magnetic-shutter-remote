# R8 native viewer parity — 0.3.24 prototype, 2026-10-08

Actual Chromium/CadViewer testing exposed a PCB coordinate mismatch: the old
Y-up interchange mirrored product Y in the browser, while the CLI loader and
nominal fit checks passed. SW2 appeared on the opposite side of its actuator.
The source PCB exporter now converts native(-X,Z,Y) into productXYZ with a proper
rigid rotation and uses documented z+ in both consumers. Qualified electronic
source, PCB JSON, copper, physical placement, enclosure shape and prints are
unchanged. All seven PCB GLB binary geometry/material chunks remain byte-identical;
only scene transforms change. All44 original CAD anchors still match. The native
CLI assembly geometry remains unchanged under the corrected shared frame.

Mechanical exports now carry their black/bronze colors from the canonical JSCAD
plans as PBR materials. No face repair/simplification, invented geometry or
hand-edited generated files. The actual closed/exploded native viewer screenshots
are in screenshots/. Independent read-only viewer scene inspection verifies
110 model poses: the PCB,44 fitted components and ten mechanical/reference parts
in each view. The old mirrored capture is rejected by the same check.
51 native GLB geometry checks and7 product tests/315 assertions pass. Light
smoke passes38Python+2Bun tests/13assertions and129frozen R7 hashes. Typecheck and
format pass. Physical fit/RF/BLE/cable/shutter/thermal/harness/MagSafe tests remain
pending. Original075/076/004/084 and separate missing3V3metadata stay explicit.

bun run product:viewer generates dist/enclosure/viewer.html with both actual
CircuitJSON views, all17 model assets and the pinned0.0.610 native CadViewer.
The tested file opens directly in Chromium without a local server. Models are
served through short BlobURLs; all17 actual loaded bytes match source hashes.
Front/back/orbit controls work;110browser poses pass with0render errors. The
viewer loads its official Manifold engine from jsDelivr, requiring internet on
first open. The 27MB HTML and15MB combined GLBs remain local download artifacts;
the unchanged5MB registry cap is retained. Reproduction sources: product/viewer.tsx,
scripts/export-product-viewer.ts and scripts/review-product-browser.py.

The separate native Download GLTF command fails with a stack overflow in the
initial test. Its failure is retained; use the CLI-generated actual GLBs for
interchange. Standalone exporter trials found an HTML String.replace expansion
bug; literal callback embedding fixes it and a real HTML-parser regression test
passes. One failed trial caused a browser-container OOM; no guards were changed.
The corrected final test passes within the same6GiB container and has no new OOM
events. Observed parent32GiB/CPU400000:100000 are runtime observations, not promised
allocations. Serial guards and light setup/start remain unchanged.

No root PCB/routing/SDK/CAM build, new circuit revision, dependency upgrade,
ordering/payment/supplier contact, PR/public issue, environment Publish/share,
credential extraction or proxy/qualification bypass. Failed native22/23 and prior
successful21 records remain immutable history. Actual24publication results follow
in PUBLICATION.md; local browser success is not a hosted-worker success claim.

Registry staging now uses the pinned TypeScript AST to discover real imports.
The prior regex mistook the generated standalone entry string for a source import;
the regression test distinguishes real imports/re-exports from strings/comments.
No resolver guard is weakened and dependency declarations are unchanged.
