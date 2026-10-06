# Actual R8 0.3.11-prototype public publication

C10 now sits beside C5; C3 and C4 move closer to their matching capacitor
groups in the native schematic. The latest actual browser and pinned CLI
analyses pass zero issues. All 1,451 physical/electrical elements remain
identical to qualified 0.3.10; the PCB, BOM, pin contracts and copper are
unchanged. See pcb-preservation.json and fabrication-preservation.json.

`python3 cloud/run-heavy.py --` ran the pinned native
`tsci push index.circuit.tsx --include-dist --version-tag prototype` from a
new bounded staging directory. No compressed archive, dependency upgrade,
custom upload API, file replacement or proxy bypass was used.
Native pinned CLI exited1 after request timeouts. Its reported failed uploads had committed server-side; exact public bytes and complete inventory were verified before the same official release-finalization endpoint used by the CLI set ready_to_build=true. No file was replaced and no CLI pass is claimed. Actual failure and supported completion proof are retained.

Actual public registry inventory matches all 456 staged
files with no missing/extra/duplicate paths. All 39 critical
anonymous text/binary reads match exact staged bytes, including current
Circuit JSON, native source/fanouts/regression, actual UI proof, six A4 SVG
pages, electrical/manufacturing/width/power/process/export reports, exact
BOM/CPL/Gerbers and retained standard-programmer UF2/ESP32 BLE firmware.
Staged files remained unchanged during publishing.

[Public tscircuit package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8),
**0.3.11-prototype**, release `7c27e666-2fce-483f-994a-be6c0eb8c827`.
Actual is_public=true/latest_version=0.3.11-prototype and ready_to_build=true.
[Public checked source/artifact commit](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/ab0f1af53ddd2307fbe269fca3903b5e20a16cd2)
has six exact anonymous source/build/UI/review readbacks. Frozen main is
unchanged. Circuit JSON SHA256: `7a4c1f7c658e30988676f8ed3d7f9346cf04856a6079d1ae7395ac6fcb9c38bf`.

Current prototype passes native0 DRC errors/shorts/dangling, independent0
manufacturing/process failures,29/29 physical terminal nets,174 actual track
widths and seven power/current paths. All91 through vias are0.30mm hole/
0.45mm pad; all copper routes use only top/bottom. Native standard USB-C,
CLI and actual browser style analysis pass0 issues. All44 component identities/
poses and159 pin contracts remain unchanged; all25 exact JLCPCB MPN/SMT
listings were verified with dated raw evidence, without reserving stock.
All25 release pipeline commands,38 Python smoke tests,
2 Bun/13 smoke assertions,2 Bun/1947 via/USB assertions and2 Bun/188 native
guide/render assertions pass. Actual six A4/PCB/Gerber visual review,
format/types, native snapshots and129 frozen baseline hashes pass.

Hosted worker at `2026-10-06T18:56:12.774584+00:00`: display status
`pending`; user-code error `None`.
Native upload/readback success is distinct from hosted compile/preview and
physical validation; a pending hosted preview is not a passed rendering test.

Supplier processed-preview/stackup/stock allocation/assembly approval and
physical power/programming/BLE/RF/thermal/runtime/full MagSafe enclosure,
phone/case fit remain pending. Native004/084 warnings and original075/076
investigations remain explicit. Missing `3V3` metadata remains a separate
importer issue. No order, payment, supplier contact, assembler upload,
default-main/baseline/old-evidence/import/firmware/lock/toolchain/guard change,
SDK/3D build, environment Publish/share, policy expansion, PR or merge.

Publication receipts are a follow-up Git documentation commit. Registry
source and Circuit JSON correspond to the checked source/artifact commit
above; post-publication receipt text does not change the board.
