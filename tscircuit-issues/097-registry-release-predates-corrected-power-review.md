# 097 — Registry release predates the corrected power review

Scope: project publication freshness, not PCB copper or a tscircuit checker defect.
Status: resolved; actual native0.3.6-prototype upload and anonymous corrected-checker/report readback pass.

Anonymous readback on2026-10-06 confirms public0.3.5-prototype contains the
previous `scripts/review-r8-power.py`:±20% inductance, minimum1.2µH.
The exact fitted Sunlord part is±30%, minimum1.05µH. Issue095 corrected the
GitHub audit and added meaningful regressions; the registry release preceded
that correction. The PCB still passes the corrected calculation.

Retained proof:
`evidence/R8-issue-resolution-2026-10-06/publication-audit-gap.json` and
`prior-published-power-review.py.txt`. No historical release was overwritten.

The registry staging helper now accepts explicit current supplemental review
files. It refuses reports for another Circuit JSON and refuses cache/outside
repository inputs; regression tests exercise these failures. Publish the
corrected checker, latest reviews and pinned programmer firmware with the
validated unchanged PCB as package0.3.6-prototype. Hardware remains0.3.5.

Closure requires actual native publication and anonymous readback proving the
corrected checker, current power report and exact Circuit JSON match local.
Hosted preview and physical hardware tests are separate outcomes.

Missing `3V3` metadata remains a separate importer issue.

Actual receipt: `evidence/R8-issue-resolution-2026-10-06/PUBLICATION.md`.
367 files,22 critical text/binary matches, public=true/ready_to_build=true.
Hosted preview is pending; no hardware pass is inferred.
