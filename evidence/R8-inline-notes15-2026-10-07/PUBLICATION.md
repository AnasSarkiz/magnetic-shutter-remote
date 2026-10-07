# R8 0.3.15 — publication incomplete; local schematic update verified

All44 component explanations are on the same three native A4 circuit pages
as their components; the separate guide pages are removed. PCB/CAD geometry
and electrical contracts match the shutter-only0.3.12 exactly. Current native
and independent DRC/short/connectivity/width/current/process checks and actual
UI/CLI schematic analysis pass. Hardware and supplier qualification remain pending.

Verified public source/artifact commit:
https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/99cf0c77f8f4ba603e9fff53bc25fc90785defb5
All four anonymous GitHub source/build reads match. Frozen main remains
5951f419c8314b83648d89e1cfb7e29e87e32eb8.
Circuit JSON SHA256: `2c8c90108799e5f4dcce810db129c47bc26d87b1c2ee854664bc0ce8acc07e4f`.

Native guarded command explicitly selected the isolated package directory.
The archive returned HTTP413; the CLI's own individual upload mode reported
281 successes and three HTTP502 failures, exit1. One reported failed file
is publicly present with exact staged bytes; two remain missing. Actual public
inventory is **282 of284 files**, zero extras/duplicates. All **40critical
anonymous text/binary reads** match, including schematic sources, JSON,
UI review, three A4 SVGs, BOM/CPL/Gerber archive and both firmware images.
Staged source hashes remained unchanged. Native exit1 is retained; publication
is incomplete. No ready-to-build update was called.

Package: https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8
Draft version: **0.3.15-prototype**, release `db49407d-ab73-4367-8599-a66a36e82981`.
At `2026-10-07T12:09:55.295975+00:00`, is_public=true, latest_version=0.3.15-prototype,
ready_to_build=false, display_status=pending and
user_code_job_error=None. Creation moved the
latest pointer to this unbuilt draft; that pointer is not acceptance evidence.
Hosted compilation/rendering has not passed.

Missing files:

- `imports/BM03B_SRSS_TB_LF__SN_/BM03B_SRSS_TB_LF__SN_.step`
- `imports/TPS63031DSKR/TPS63031DSKR.step`

See [local issue099](../../tscircuit-issues/099-registry-step-upload-502.md).
The first interrupted0.3.14 draft was our own working-directory error; its
separate receipt remains under ../R8-inline-notes-2026-10-07/publication-attempts/stopped-0314.
The corrected0.3.15 upload used the verified package, without changing the guard.

Actual public-readback evidence: registry-partial-readback.json and
 github-public-verification.json. Sanitized native-push.log retains meaningful
output; raw log and digest retention are documented in native-push-log-retention.json.
Oversized archive request serialization is omitted from public evidence;
no secret value is copied. Native-command.json preserves actual timing:
the source/artifact commit was pushed during upload, before CLI completion.

README now explains the product,44×56×1mm PCB, side shutter, battery/USB-C,
JST programmer and multi-model MagSafe requirements. Its former contents
are preserved byte-for-byte in README-HISTORY.md. This follow-up documentation
is on GitHub; the incomplete registry draft retains its exact earlier staged
README. No new PCB or firmware change/build is made for documentation.

Original075/076 and native004/084 remain explicit. Missing3V3power metadata
remains a separate importer issue. The ring stays deferred; stock remains
the dated observation, not a reservation. Physical programming/power/charging/
Bluetooth/iPhone/RF/thermal/runtime/MagSafe tests and supplier-processed preview/
stackup/assembly approval remain pending. No order/payment/supplier contact,
assembler upload, environment Publish/share, PR/merge or frozen-main change.
Observed32GiB is not a guaranteed allocation; memory guards remain unchanged.
