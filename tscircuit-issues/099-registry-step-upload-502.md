# 099 — Native registry STEP uploads return HTTP 502

Status: open; blocks complete tscircuit publication, not the local schematic or
PCB electrical validation. Classification: observed registry transport/service
failure; server root cause is unconfirmed. No public issue was created.

## Actual reproduction — 2026-10-07

Pinned @tscircuit/cli 0.1.2237 ran `tsci push <absolute-entrypoint> --include-dist
--version-tag prototype --compress` inside a verified, isolated 0.3.15 package,
serially through the unchanged cloud/run-heavy.py guard. It used existing native
browser authentication; no new token, proxy bypass or verification override.

The bounded archive upload returned HTTP 413. Native CLI then uploaded files
individually: 281 reported successes, three HTTP 502 failures, exit 1.

| Native failed file | Anonymous readback after upload |
| --- | --- |
| imports/BM03B_SRSS_TB_LF__SN_/BM03B_SRSS_TB_LF__SN_.step | Missing |
| imports/SM02B_SRSS_TB_LF__SN_/SM02B_SRSS_TB_LF__SN_.step | Stored; exact staged bytes |
| imports/TPS63031DSKR/TPS63031DSKR.step | Missing |

The public 0.3.15-prototype draft has 282 of 284 expected files, zero extras or
duplicates, ready_to_build=false and display_status=pending. Forty critical
anonymous text/binary reads, including schematic sources, Circuit JSON, three
A4 pages, BOM/CPL/Gerbers and firmware, match exactly. This is incomplete
publication, not a successful hosted preview. All staged source hashes stayed
unchanged. Native peak child RSS was 945092 KiB; observed VM limit32 GiB and
no OOM-counter increase. A memory allocation failure is not established here.

[Actual receipt and retained logs](../evidence/R8-inline-notes15-2026-10-07/PUBLICATION.md)
record exact release IDs, SHA256s, missing paths and HTTP errors.

## Safe continuation

Restore reliable uploads through the official registry/normal authenticated
publisher, then verify every missing file and the exact complete inventory
before marking this draft ready. Current CLI push has no existing-release
resume flag and increments an occupied version; blindly repeating it would
create another draft. A retry creating a new version must preserve correct
source/build/version identity. Do not drop models, weaken the manifest, read
or export credentials, or finalize this incomplete release.

This is separate from importer power metadata (076) and current schematic
style/PCB checks. The earlier unbuilt0.3.14 draft resulted from our own guarded
working-directory error, retained separately; it is not this service failure.

## Reference enclosure0.3.18 reproduction,2026-10-07

Normal guarded tsci push reports fourHTTP502 upload failures (twoSTEPs, one
bounded2,117,500bytePCB GLB fragment, one tooling archive). Actual anonymous
inventory is290/291 expected files, no extras/duplicates. Only
product/models/r8-parts-6.glb is absent; bothSTEPs/archive are stored and their
bytes match. Sixty-two available critical file readbacks pass. Draft stays
ready_to_build=false/pending. No OOM increase; peak childRSS850916KiB. This
reproduces the same registry failure for a boundedGLB, rather than establishing
an enclosure, importer or copper defect. CLI still has no existing-release
resume flag. [Actual receipt](../evidence/R8-reference18-2026-10-07/PUBLICATION.md).

## Sculpted enclosure 0.3.19 reproduction — 2026-10-07

Normal guarded publisher returns HTTP502 for the manufacturing report, JST
STEP, one bounded PCB GLB and side PNG; two other STEP requests time out.
CLI exits1 with nine reported failures including three HTTP413 text payloads
tracked separately in issue103. Actual public inventory is296/302; all296
stored files independently match staged bytes. Only six files are missing,
including both assembly JSONs. Release remains unready/pending. Peak child RSS
911948KiB, no OOM increase; no evidence this is a memory allocation failure.
[Exact paths, responses and readback](../evidence/R8-sculpted19-2026-10-07/PUBLICATION.md).
