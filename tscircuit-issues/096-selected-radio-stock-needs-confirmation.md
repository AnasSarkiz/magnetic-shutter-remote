# 096 — Fitted ESP32 module inventory needs confirmation

Scope: dated procurement observation, not an electrical/importer defect.
Status: unresolved for the planned five-board prototype batch.

Fresh anonymous official JLCPCB listing on2026-10-06 for fitted DOIT
ESPC3-12-N4/C19949072 matches the exact manufacturer identity and advertises
SMT assembly/Extended library. It returns `canPresaleNumber=3`,
`overseasStockCount=66`, `preMinPurchaseNum=4`. Five finished boards require
five modules before any assembler allowance. Direct inventory alone does
not cover that quantity; overseas allocation/PCBA eligibility is unconfirmed.
This is not a claim that the module is electrically defective or unavailable
everywhere, and overseas inventory is not silently counted as local stock.

All25 fitted identities were checked against their exact public JLCPCB
listings.24 direct inventory fields cover five boards before attrition;
C19949072 is the only flagged part. Prior cached stock is retained history.
Supporting UI asset host `assets.jlcpcb.com` returned session proxy403;
public HTML listings were accessible. No network-policy change/proxy bypass.

Exact dated fields, timestamps, source HTML hashes, quantities and assembly
metadata: `evidence/R8-six-point-review-2026-10-06/sourcing-review.json`.
Full board review: `evidence/R8-six-point-review-2026-10-06/REVIEW.md`.

Resolve through later authorized stock/allocation and supplier-processed
preview review, or separately qualify an exact compatible replacement before
changing the BOM. No reservation, supplier contact, order, payment, assembler
upload or unqualified substitution occurred. R8 wiring/clearance checks pass.
