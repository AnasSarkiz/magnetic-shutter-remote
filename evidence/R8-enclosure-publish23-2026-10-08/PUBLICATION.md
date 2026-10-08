# R8 enclosure publication 0.3.23 — incomplete, 2026-10-08

[Native package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8)
release: 0.3.23-prototype, ID 149a0683-9977-442d-86da-be824dad25e0.
**Complete native publication is blocked.** The normal guarded CLI exits1,
acknowledges312 files and reports oneHTTP503/fourHTTP502 create failures on
registry-api.tscircuit.com. Anonymous readback finds313/317 exact files and no
extra/duplicate paths. All313 stored files match staged bytes. One failed-response
file, product/closed.png, was actually stored correctly. Four paths are absent:

- evidence/R8-reference18-2026-10-07/preservation.json
- evidence/R8-standard-programmer-2026-10-05/qualification/programmer-0.8.0/circuit.json
- imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4.step
- product/models/r8-parts-4.glb

The new enclosure.circuit.tsx, its generated dist/enclosure/circuit.json and
3d.png, the explicit includeBoardFiles/preview config and all ten mechanical
models are stored exactly. One original PCB model fragment is missing, so the
assembled native package is incomplete. ready_to_build=false; worker status is
pending. No hosted rendered preview success is claimed and readiness is not
patched. Original0.3.22failed receipt and successful0.3.21 remain immutable history.

[GitHub source5e6bd8d](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/5e6bd8d)
is public. The implementation commit5e975da has32exact public file readbacks;
retry preparation5e6bd8d has11exact public file readbacks. Final receipt commit
follows separately. Qualified PCB JSON remains
7266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4.
All42protected source/PCB/model/print/setup files remain unchanged. The retry
changes only version/publication metadata;312of314prior staged inputs match
and the other two are package.json and VALIDATION.md. No root PCB/routing/SDK/
CAM build or dependency/geometry change was run.

The documented enclosure entry builds and produces local circuitJSON/GLB/PNG;
51native geometry checks,253product assertions,38Python+2Bun smoke tests and
129frozen hashes pass. No physical fit/RF/BLE/shutter/cable/harness/thermal/
MagSafe tests are claimed. Original075/076/004/084, separate3V3metadata and the
old WROOM qualification warning remain explicit. No order approval is claimed.

The registry host is reachable; a network-policy denial is not established.
The precise upstream cause of these intermittentHTTP502/503 responses is
unconfirmed. Current official CLI has no existing-release resume, and occupied
versions are incremented. One controlled normal retry was attempted; another
unqualified repetition would create more incomplete drafts. Proper continuation
requires reliable official upload service or a supported official resume
capability, followed by exact complete inventory/readback and readiness check.
No credentials are read/exported, no publisher internals copied, no proxy or
readiness bypass, no files dropped and no staging/qualification guard weakened.

Observed memory limit: 34359738368bytes (32GiB), CPU400000/100000;
publisher peak child RSS758812KiB, no OOM-counter increases.
These observations are not guaranteed plan allocations. Setup/start, environment
privacy, auth/network config, frozen baselines/main and serial guards remain
unchanged. No ordering/payment/supplier contact, environment Publish or PR.

Exact remote inventory/hashes: registry-upload-observation.json.
GitHub source evidence: github-upload-observation.json and prior22receipt.
Exact upload/readback output: checks/. Final preservation: final-preservation.json.
