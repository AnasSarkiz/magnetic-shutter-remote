# R8 enclosure entry 0.3.22 — incomplete publication, 2026-10-08

GitHub source 5e975da is public; all 32 changed files match anonymous byte readback.
The guarded per-file native CLI exits 1: 310 acknowledgments and five HTTP502
responses from registry-api.tscircuit.com POST /package_files/create. Two of those
responses follow stored files; independent public readback finds 312/315 exact
files. The three missing files are:
- evidence/R8-reference18-2026-10-07/final-manufacturing.json
- imports/SKRTLAE010/SKRTLAE010.step
- product/studio-straight.png

The enclosure circuit entry, generated JSON/PNG, all 17 models and eight prints
are publicly present and match. The release remains ready_to_build=false and its
worker is pending. Publication is incomplete. No hosted preview success is claimed.
The official CLI has no existing-release resume: a normal retry requires a new
patch version. A controlled unchanged-geometry retry is prepared as 0.3.23.
This failure receipt and incomplete release remain preserved history.

All local checks remain passed; no PCB/geometry/baseline/dependency change or root
PCB/routing/SDK/CAM build. Original issues 075/076/004/084, separate missing3V3
metadata and physical qualification remain explicit. Runtime memory limit is the
observed 32GiB, not a guaranteed allocation. No OOM counter increase occurred.
Provider auth/proxy policy, setup/start and guards remain unchanged. No secrets
extracted, no bypass, no order/payment/contact or PR/public issue.
See registry-upload-observation.json, github-upload-observation.json and
checks/registry-push.log for exact independent evidence.
