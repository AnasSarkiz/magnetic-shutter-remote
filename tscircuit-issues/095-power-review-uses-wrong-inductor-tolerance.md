# 095 — Power review used incorrect fitted-inductor tolerance

Scope: project `scripts/review-r8-power.py`, not a tscircuit/importer defect.
Status: locally corrected and tested; no PCB change required.

The checker used1.2µH minimum (1.5µH−20%). Retained manufacturer row for fitted
Sunlord SWPA3015S1R5NT/C56594 explicitly specifies1.5µH±30%, hence1.05µH minimum.
Original table is `evidence/R8-routing-2026-10-05/sunlord-page5.png` and original
qualification already records±30%. Prior checker and reports are preserved;
the functional-review successor supersedes their ripple calculation.

Correction uses1.05µH at TI's2.2MHz minimum and explicitly requires saturation
rating≥1.2×computed peak, per TI SLVS696D§9.2.2.2. Manufacturer-tolerance test
fails old checker and passes correction. Separate regressions reject a2.0A
peak against2.3A rating (insufficient20% margin) and RMS above1.7A.

Same route23 JSON yields0.744994A RMS,0.844627A peak,1.013552A required saturation
rating;0.30mm inductor paths estimate0.999067A. Fitted1.7A RMS/2.3A saturation
still pass. This calculation does not establish startup/fault/thermal behavior.
Full evidence/logs: `evidence/R8-functional-review-2026-10-06/`.
No public issue, supplier contact or tooling-package publication occurred.
