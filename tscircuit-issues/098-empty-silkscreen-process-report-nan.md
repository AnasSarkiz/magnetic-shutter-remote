# 098 — Empty silkscreen writes NaN into the process report

Classification: project CAM reporting defect, not an importer or PCB defect.
Status: fixed locally in the R8 0.3.12 review.

Removing the three user-selected bottom labels creates a valid empty bottom
silkscreen Gerber. `scripts/review-r8-process.py` measured the distance from
that empty geometry to solder mask. Shapely returns NaN for that distance.
The original report serialized `mask_gap_mm: NaN`, which is not strict JSON;
the old numeric comparison also did not explain that no silk exists.

Exact original input/report: [before-empty-silk-process.json](../evidence/R8-bottom-silk-2026-10-06/before-empty-silk-process.json).
Strict JSON rejection is retained in checks/empty-silk-before.log in that
dated evidence directory. Actual bottom Gerber has zero objects; copper,
mask, drill and electrical contracts are unchanged.

The generic metric now returns null when either silk or mask geometry is
empty. A gap comparison applies only when a gap exists. Nonempty strokes,
clearance and outline minima are unchanged. Final JSON serialization uses
allow_nan=False, so other non-finite results cannot silently pass through.

`tests/cam/test_process_metrics.py` exercises an actual retained empty native
Gerber and verifies strict JSON serialization. All 30 CAM regressions pass,
including the existing supplier-circle clearance and legend-overlap cases.
Complete output is retained in the dated checks/cam-regression.log.

No generated report, Circuit JSON or imported component was manually patched.
No upstream tscircuit fix, hardware operation or supplier approval is claimed.
