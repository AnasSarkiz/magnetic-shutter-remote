# Actual R8 0.3.10-prototype public publication

`python3 cloud/run-heavy.py --` ran the pinned native
`tsci push index.circuit.tsx --include-dist --version-tag prototype` from a
new bounded staging directory. No compressed archive, dependency upgrade,
custom upload API, file replacement or proxy bypass was used.
Native pinned CLI exited1 after request timeouts. Its reported failed uploads had committed server-side; exact public bytes and complete inventory were verified before the same official release-finalization endpoint used by the CLI set ready_to_build=true. No file was replaced and no CLI pass is claimed. Actual failure and supported completion proof are retained.

Actual public registry inventory matches all 418 staged
files with no missing/extra/duplicate paths. All 36 critical
anonymous text/binary reads match exact staged bytes, including current
Circuit JSON, native source/fanouts/regression, actual UI proof, six A4 SVG
pages, electrical/manufacturing/width/power/process/export reports, exact
BOM/CPL/Gerbers and retained standard-programmer UF2/ESP32 BLE firmware.
Staged files remained unchanged during publishing.

[Public tscircuit package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8),
**0.3.10-prototype**, release `e8754268-2794-4f0d-94fc-f471cf987136`.
Actual is_public=true/latest_version=0.3.10-prototype and ready_to_build=true.
[Public checked source/artifact commit](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/5509a41218a15ba45ddcbdaf6a58f86848de693c)
has six exact anonymous source/build/UI/review readbacks. Frozen main is
unchanged. Circuit JSON SHA256: `eb69ddb005aea75aefe12e98c1e4f9f97bee3134a76d356261bf571662143f5b`.

Current prototype passes native0 DRC errors/shorts/dangling, independent0
manufacturing/process failures,29/29 physical terminal nets,174 actual track
widths and seven power/current paths. All91 through vias are0.30mm hole/
0.45mm pad; all copper routes use only top/bottom. Native standard USB-C,
CLI and actual browser style analysis pass0 issues. All44 component identities/
poses and159 pin contracts remain unchanged; all25 exact JLCPCB MPN/SMT
listings were verified with dated raw evidence, without reserving stock.
All25 release pipeline commands,29 CAM regressions,38 Python smoke tests,
2 Bun/13 smoke assertions,2 Bun/1947 via/USB assertions and2 Bun/188 native
guide/render assertions pass. Actual six A4/PCB/Gerber visual review,
format/types, native snapshots and129 frozen baseline hashes pass.

Hosted worker at `2026-10-06T17:32:39.831052+00:00`: display status
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
