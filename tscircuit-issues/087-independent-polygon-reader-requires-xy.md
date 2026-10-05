#087 — Independent geometry reader requests nonexistent polygon x/y fields

**Confirmed project checker defect; fixed without changing thresholds.** Native polygon SMT pads have global `points`, while rectangular/circular pads have `x`/`y`. The reader in `scripts/manufacturing-audit.py` attempted `e['x'],e['y']` before dispatching on shape. It raised `KeyError: 'x'` on the retained TS24CA support lands. This is neither a PCB DRC violation nor evidence of a short.

Correction: construct the polygon from its original global vertices before reading center fields for other shapes. No feature is discarded, approximated as its bounding box or assigned a fabricated center. A concave polygon regression verifies exact area3mm²/bounds without x/y fields. Existing clearance/drill/process limits remain unchanged. The fitted ALPS alternative avoids the separate core paste omission086; that omission is not repaired by this reader correction.

The process mask-reader had the same coordinate assumption. It now matches each original mask object to the true pad centroid, including concave native polygons, rather than requiring nonexistent x/y fields. All18 retained CAM regressions pass; current full-board mask/paste/export qualification is recorded separately. No pad vertices or process minima were changed.
