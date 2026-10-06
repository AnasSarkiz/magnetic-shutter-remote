# 081 — Native routed output can violate supplied clearances

Confirmed routing/integration defect; this is not an importer or supplier-footprint discrepancy. Pinned capacity-autorouter0.0.951 / beta_pipeline9 native core build can complete routing while final checks reject the result. User requires zero DRC and zero shorts; solver completion alone cannot satisfy that gate.

Retained reproduction: `evidence/R8-prototype-2026-10-05/route-9-circuit.json` and `routed-checks-9.json`. Via79 to GND trace `source_net_0_mst34_0`: actual0.00486298 mm versus supplied0.15 mm. Different-net vias57/66: hole-edge gap0.47471072 mm versus supplied0.50 mm. Source minimums were verified in generated routing input; no minimum was waived. Route6 also retains via-in-pad placement failures despite allowViaInPad=false. Fresh source-led fanouts and route phases are being checked; immutable failing Circuit JSON remains untouched.

Reproduction uses Linux `python3 cloud/run-heavy.py -- tsci build index.circuit.tsx --pcb-svgs --schematic-svgs`, then `bun scripts/check-routed.ts <report>` and actual `tsci check shorts index.circuit.tsx` with the qualified package lock. Recorded source/hash manifests are needed for historical reruns, since the active source is evolving. No upstream GitHub issue was created and no package upgrade/DRC suppression is claimed.

## Hosted C3 continuation

`c3-route-16-circuit.json` preserves another real failure: UART_RX via63 at(14.6756933,16.9626238) overlaps J3.pin2. J3 already has a native saved off-pad via at(14.699616,19), yet the router adds a bottom→top transition beside the contact before walking to that via and returning to bottom. `allowViaInPad=false` remains supplied. This is routing/goal-layer integration, not importer pin or footprint corruption. The source retains the generated route and makes its final approach on bottom directly to the existing breakout; no Circuit JSON is repaired or check disabled. Final pass still requires a new native build and independent exports.

The independent manufacturing audit also rejects ordinary ground drills close to their own SMT pads; same-net names do not make drill clearance disappear. Source-level off-pad fanouts are used instead of granting via-in-pad exceptions. Original failed14/15/16 outputs remain available.

Final hosted `c3-route-20` passes0 native errors/shorts and0 independent exported-geometry manufacturing failures. Safe native fanouts/phases resolve the current board’s integration failures without changing limits or editing outputs. This is not an upstream solver-fix claim.

## 2026-10-06 requested0.30/0.45mm via follow-up

The dated `evidence/R8-style-vias-2026-10-06/` preserves real failed candidates:
native error-free11,14 and17 still fail independent drill-to-SMT/track rules.
Candidate11 ordinary VCC drill clearance is0.1581mm to its own module SMT land
(required0.20mm); same-net SMT pads are deliberately not exempt. Candidate14
R12/Q1/C3 failures are0.1750/0.1580/0.1200mm. Candidate17 USB barrel-to-track
gap0.1320mm and U4 ground drill-to-SMT0.1320mm also fail. Candidate13 retains
redundant GND via-hole gap0.2214mm vs0.50mm. Other failed native/canonical
integration/path trials stay archived with actual logs, not claimed as passes.
Supported source fanouts/local paths resolve the current board without editing
generated JSON/imports or reducing trace/clearance/drill/audit rules. Only
the user-required via pad size changed, with official capability evidence.
Final Circuit JSON `eb69ddb005aea75aefe12e98c1e4f9f97bee3134a76d356261bf571662143f5b` passes native0 errors/shorts and independent
0 manufacturing failures. This qualifies the current prototype's geometry;
it does not claim an upstream router fix or physical operation.
