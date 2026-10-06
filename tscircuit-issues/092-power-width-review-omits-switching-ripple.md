# 092 — Power-width review omitted switching-ripple current

Classification: project audit coverage defect. This is not an importer or DRC
engine defect, and no physical failure is claimed.

The retained compact route12 passed the DC load-path width check: its 0.20mm
battery neck's nominal IPC-2221 external/35um/10C estimate was 0.744609A,
slightly above the 0.743084A design input estimate. The two inductor pin necks
were also 0.20mm. That audit did not compare their capacity with switching RMS
current. TI SLVS696D equations2/3 with 1.2uH (-20% inductance), minimum2.2MHz,
80% assumed efficiency and actual trace-only loaded input floor give switching
RMS above that old capacity. Native DRC alone cannot detect this requirement.

Original generated JSON, authored copper and DC-only review are retained under
`evidence/R8-compact-pcb-2026-10-06/route12-dc-only-review/`. Fix: widen authored
U3 VIN/L1/L2 pin necks to 0.30mm without moving or modifying supplier lands;
add both physical switching paths and RMS/peak budgets to the power review.
`tests/cam/test_power_width_budgets.py` proves the old neck passes DC but fails
RMS, verifies the frequency/inductance calculation, and checks a wider control.
Final routing, fabrication readback and all unchanged clearances must pass
before the new design is published. Startup/fault behavior, contact/via/cell
impedance, core losses and temperature remain prototype measurements.

Source: retained `evidence/R8-components/TPS63031-current.pdf` and exact fitted
Sunlord ratings in the existing component qualification. No weaker criteria,
new footprint, manual Gerber/Circuit JSON change or upstream publication.

Missing `3V3` metadata remains a separate importer issue.

Final compact route23: full native-schema/DRC/shorts and independent copper,
physical connectivity, width/current, export/readback/process/visual checks pass.
Retained failures are historical controls; no generic upstream fix is claimed.
