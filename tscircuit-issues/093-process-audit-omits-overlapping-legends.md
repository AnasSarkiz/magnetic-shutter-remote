# 093 — Process audit omitted overlapping functional legends

Classification: project audit coverage defect; also a board legend-placement
error. Original route20 passes copper/DRC/shorts/manufacturing and the earlier
mask/stroke process checks, but visual inspection shows PAIR and POWER at the
same(18,0)mm position. Both are unreadable together. This is a fabrication
artwork/review failure, not an electrical short or importer failure.

The original native JSON, top PCB view, process report and Gerbers remain under
`evidence/R8-compact-pcb-2026-10-06/failed-route20-visual/`. Moving PAIR below its
switch fixes the authored placement. `review-r8-process.py` now rejects
intersecting same-layer functional legend bounds as a readability requirement,
in addition to full actual Gerber/stroke/mask/outline checks. Bounds are a
conservative text-separation test, not a new copper or stencil threshold.

The retained original report is the regression: it has no previous process
failures but contains the actual PAIR/POWER collision. A separate-position and
opposite-layer control ensures the new rule distinguishes valid legends.
Final artwork/native/independent audits must pass after regeneration. No
manufacturing files are hand-edited or checker limits weakened.

Missing `3V3` metadata remains a separate importer issue.

Final compact route23: full native-schema/DRC/shorts and independent copper,
physical connectivity, width/current, export/readback/process/visual checks pass.
Retained failures are historical controls; no generic upstream fix is claimed.
