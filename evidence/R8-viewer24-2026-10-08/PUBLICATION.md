# R8 actual viewer0.3.24 — local viewer passed, registry incomplete

Observed 2026-10-08T21:51:05.229145+02:00 (Europe/Tirane).

The actual native Chromium/CadViewer closed and exploded assembly renders,
public camera controls, orbit and all17 loaded model bytes pass. Independent
browser readback verifies110poses; native CLI readback verifies51geometry checks
and30mechanical face-winding checks. Seven product tests/315assertions, light
smoke38Python+2Bun/13assertions,129frozen hashes, typecheck and format pass.
Physical prototype qualification remains pending.

## Usable viewer and actual screenshots

Download artifacts are in /workspace/artifacts/r8-viewer24/:
R8-interactive-assembly.html, R8-enclosure.glb, R8-exploded.glb,
closed-angled.png, closed-orbited.png and exploded-angled.png.
The27MB interactive file was actually tested from file:// in Chromium, with no
local server. Open it in Chrome/Chromium; drag to orbit, scroll to zoom, and use
Closed/Exploded/Angled/Front/Back controls. It needs internet for the official
jsDelivr Manifold engine bootstrap. All17 source models are embedded and their
actual viewer-loaded Blob bytes match sourceSHA256. Exact fileSHA256:
0065ee7f1a183e5758f32af7717f335ab10fde2ade463272e224b7540f8c9167.
Reproduce with bun run product:viewer after the guarded enclosure/exploded builds.
The unchanged5MB staging cap keeps this HTML and whole15MB GLBs local.
The screenshots are actual native CAD captures, not generated concept images.

The separately tested native Download GLTF menu fails with a stack overflow;
use the validated CLI-generated GLBs supplied above for interchange. The failure
and first standalone embedding/OOM trials are retained. A literal HTML embedding
fix and short BlobURLs produce the final successful bounded test. No memory or
qualification guard was weakened, and no physical-operation success is claimed.

## Public GitHub source

[Source35990a9](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/35990a903171e9bac2ea942f26f82bf540e6a032)
is public on board/r8-doit-c3-prototype-20261005. All83changed source/evidence
files match exact anonymous public byte readback. The final publication receipt
is committed separately. Frozen main remains5951f419c8314b83648d89e1cfb7e29e87e32eb8.
Qualified PCB JSON remains7266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4.

## Native registry — blocking publication issue

[Package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8),
release0.3.24-prototype, IDcb244292-c55c-46d3-95e2-595c5847dd8c.
The supported guarded normal CLI exits1, acknowledging310files and reporting
10HTTP502 responses from POST/package_files/create on registry-api.tscircuit.com.
Anonymous inventory/readback finds313/320files, all313exact and no extra or
duplicate paths. Three failed-response files were stored correctly. Seven are absent:

- evidence/R8-standard-programmer-2026-10-05/qualification/programmer-0.8.0/circuit.json
- imports/ESPC2_12E_N4/ESPC2_12E_N4.step
- imports/ESPC3_12_N4/ESPC3_12_N4.step
- imports/TS24CA/TS24CA.step
- product/models/r8-parts-5.glb
- product/models/r8-parts-7.glb
- product/studio-side.png

Two original PCB model fragments are absent: the native hosted assembly is
incomplete. ready_to_build=false; hosted worker/preview is pending. No complete
publication or rendered hosted preview success is claimed. Earlier21success and
22/23failures remain immutable history.

The registry host is reachable; a policy denial is not established. The exact
upstream cause of the502responses remains unconfirmed. Current official CLI
has no existing-release resume; occupied versions are incremented. One normal
attempt was made for this new validated24implementation. Proper continuation
requires reliable official uploads or a supported release-resume capability,
followed by complete exact readback and readiness/render verification. No further
drafts, token/API upload workaround, copied publisher internals, proxy/readiness
bypass, dropped files or weakened staging guards are used.

## Preservation and observed limits

The source fix corrects the imported PCB browser frame and retains canonical
mechanical black/bronze colors. All seven PCB binary geometry/material chunks
remain byte-identical; only scene transforms change. Qualified electronic source,
PCB JSON/copper/placement, imports, firmware, fabrication, source/toolchain archives,
frozen baselines/main, enclosure geometry/dimensions and eight print STL bytes are
unchanged. Setup/start, serial memory guards and environment config are unchanged.
All changed source paths are listed in source-change-review.json; no protected
path changes are present. No root PCB/routing/SDK/CAM build or dependency upgrade.
Original075/076/004/084 and separate missing3V3metadata stay explicit.
No physical fit/RF/BLE/shutter/cable/harness/thermal/MagSafe pass is claimed.

Observed parent limit34359738368bytes (32GiB), CPU400000/100000;
final browser container6GiB/2CPU. Publisher peak childRSS764272KiB; its OOM/kill
counters stay1/1before and after. That one earlier failed browser trial remains
explicit; final browser and upload introduce no additional OOM event. Limits are
observations, not guaranteed plan allocations. No order/payment/supplier contact,
PR/public issue, environment Publish/share, credential extraction or network
policy modification.

Exact remote inventory/hashes: registry-upload-observation.json.
GitHub source hashes: github-upload-observation.json.
Actual browser/native checks: browser-geometry-review.json, native-model-readback.json,
standalone-embedding-proof.json, browser/review.json and final-checks.json.
Raw setup/smoke/build/browser/upload/readback output is retained in checks/;
failed whitespace-containing trial log is retained byte-exact as deterministic gzip.
Final receipt public readback and clean status are saved outside the board repo
under /workspace/r8-viewer-check24-20261008/ after the receipt push.
