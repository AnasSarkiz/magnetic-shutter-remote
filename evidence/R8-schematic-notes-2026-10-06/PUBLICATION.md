# Actual R8 0.3.9-prototype public schematic publication

Native pinned `tsci push index.circuit.tsx --include-dist --version-tag prototype --compress`
ran through the unchanged serial heavy-job guard. Original 0.3.8 upload
failed with three request timeouts after 348 successes; its retained log is
`native-push038-failed.log`. Native CLI has no resume option, so the supported
compressed retry creates 0.3.9. Archive request received 413; native built-in
file-by-file upload finished with a client request timeout and nonzero exit.
The timed-out native POST had committed server-side: its public bytes
matched without any file replacement. All 374-file inventory and 29 critical
anonymous reads were verified before the same official release-finalization
endpoint used by the CLI set ready_to_build=true, then reverified afterward.
An initial preflight read the old 0.3.8 staging directory and refused
finalization on inventory mismatch; the corrected 0.3.9 staging reference
passes the exact unchanged checks. Both logs remain explicit.
The native CLI exit 1 is retained; successful public completion/readback does
not relabel that CLI attempt as a pass. Review log omits only the large public
archive payload; original raw log/hash is retained separately. Public native inventory
exactly matches all 374 staged files. All 29 critical
anonymous text/binary readbacks match local bytes: current Circuit JSON, author
source, component explanations/regressions, all six A4 SVG views, three guide
PNGs, electrical/copper/width/process reports, BOM/CPL/CAM ZIP and retained
programmer/ESP32 firmware. Staged files stayed unchanged throughout publication.

[Public tscircuit package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8),
**0.3.9-prototype**, release `09ba192e-10c6-4f9e-bf3a-7be24463f3c4`. Actual package
is_public=true, latest_version=0.3.9-prototype; release ready_to_build=true.

[Public source/artifact commit](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/c7e6737a78687db9bd04999cec900290dadf2636)
has seven exact anonymous GitHub readbacks, including guide SVGs/current JSON.
Circuit JSON SHA256: `235953a871b8285929d6363f58f8bad3e52072a25123574657b9f6645cdb87ac`.

All 44 fitted references are explained once on matching native A4 PowerGuide,
RadioGuide and ProtectionGuide pages, alongside the original three circuit
A4 sheets. Titles and two-line purposes are native schematic_text elements,
not PCB silk. Drawings include navigation to the corresponding guides. All
six page views were inspected for readability/separation. Coverage/current
render tests pass 2 Bun tests/188 assertions. Native schematic SVG defaults
to the first sheet; the supported explicit schematicSheetId renderer produces
all six individual A4 exports. Root native snapshots pass.

All 1432 non-schematic elements match previous 0.3.7 exactly. Native 0 DRC errors/
shorts, 29/29 physical nets, 164 widths/current budgets and independent full
manufacturing/process/native CAM readback pass. All 12 native fabrication
files match prior content except creation-date headers; BOM/CPL and all PCB/
Gerber PNG views match exact bytes. Light smoke 38 Python + 2 Bun / 13 assertions,
format/types and 129 frozen baseline hashes pass. No component/import, value,
PCB placement/routing/copper/silk, firmware, baseline or memory-guard changes.

Hosted worker observation at `2026-10-06T15:35:11.683563+00:00`: display status
`pending`; user-code error `None`.
Native upload/readback is verified; a pending hosted preview is not a passed
hosted build/rendering check.

Supplier processed-preview/stock/stackup/assembly approval, physical
programming/BLE/power/thermal/runtime and complete MagSafe grip/phone/case/RF
qualification remain pending. Warnings 004/084 and original failures remain
explicit. Missing `3V3` metadata remains a separate importer issue.
No SDK/3D build, default-main/baseline modification, supplier contact, assembler
upload, order/payment, PR/merge, access/network expansion or environment
Publish occurred. Current active engineering branch is preserved.
