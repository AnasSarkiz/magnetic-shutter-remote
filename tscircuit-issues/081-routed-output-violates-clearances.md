# 081 — Native routed output can violate supplied clearances

Confirmed routing/integration defect; this is not an importer or supplier-footprint discrepancy. Pinned capacity-autorouter0.0.951 / beta_pipeline9 native core build can complete routing while final checks reject the result. User requires zero DRC and zero shorts; solver completion alone cannot satisfy that gate.

Retained reproduction: `evidence/R8-prototype-2026-10-05/route-9-circuit.json` and `routed-checks-9.json`. Via79 to GND trace `source_net_0_mst34_0`: actual0.00486298 mm versus supplied0.15 mm. Different-net vias57/66: hole-edge gap0.47471072 mm versus supplied0.50 mm. Source minimums were verified in generated routing input; no minimum was waived. Route6 also retains via-in-pad placement failures despite allowViaInPad=false. Fresh source-led fanouts and route phases are being checked; immutable failing Circuit JSON remains untouched.

Reproduction uses Linux `python3 cloud/run-heavy.py -- tsci build index.circuit.tsx --pcb-svgs --schematic-svgs`, then `bun scripts/check-routed.ts <report>` and actual `tsci check shorts index.circuit.tsx` with the qualified package lock. Recorded source/hash manifests are needed for historical reruns, since the active source is evolving. No upstream GitHub issue was created and no package upgrade/DRC suppression is claimed.

## Hosted C3 continuation

`c3-route-16-circuit.json` preserves another real failure: UART_RX via63 at(14.6756933,16.9626238) overlaps J3.pin2. J3 already has a native saved off-pad via at(14.699616,19), yet the router adds a bottom→top transition beside the contact before walking to that via and returning to bottom. `allowViaInPad=false` remains supplied. This is routing/goal-layer integration, not importer pin or footprint corruption. The source retains the generated route and makes its final approach on bottom directly to the existing breakout; no Circuit JSON is repaired or check disabled. Final pass still requires a new native build and independent exports.

The independent manufacturing audit also rejects ordinary ground drills close to their own SMT pads; same-net names do not make drill clearance disappear. Source-level off-pad fanouts are used instead of granting via-in-pad exceptions. Original failed14/15/16 outputs remain available.

Final hosted `c3-route-20` passes0 native errors/shorts and0 independent exported-geometry manufacturing failures. Safe native fanouts/phases resolve the current board’s integration failures without changing limits or editing outputs. This is not an upstream solver-fix claim.
