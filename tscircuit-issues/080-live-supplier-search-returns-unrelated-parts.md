# Live supplier search returns unrelated components for exact manufacturer queries

**Confirmed response mismatch; backend root cause not established.** Observed2026-10-05, live `jlcsearch.tscircuit.com`, not a pinned local converter defect.

`GET /api/search?limit=100&q=TPS63031` returned only NTC10D-9 / C6793810. `GET /api/search?limit=100&q=SM02B-SRSS-TB` returned crystal XC2EL89CKO-114YLC-25M / C19272777. Other precise queries also returned unrelated parts. [TPS response](../evidence/R8-routing-2026-10-05/TPS63031.json), [connector response](../evidence/R8-routing-2026-10-05/SM02B-SRSS-TB.json), [inductor response](../evidence/R8-routing-2026-10-05/LQH3NP.json). Responses were HTTP200, not proxy-denial bodies.

Expected: matching manufacturer/query tokens, or an empty result for unavailable parts. Actual: unrelated stocked results. The official current backend source joins `search_index_fts.rowid` to `search_index.rowid`; inconsistent index contents are a possible cause, not a verified diagnosis. No server/source/package change was made.

For this investigation, independently verify returned exact MPNs. The documented category-only API query (no full-text q) returned identifiable stocked power-inductor candidates, including TI-recommended-series LPS3015-152MRC. Exact C-number imports were checked against direct supplier identities; no unrelated search result was adopted. Price comparisons cover candidates actually found and independently checked, not an exhaustive guarantee about the catalogue.

This report is retained locally only. No public issue or supplier contact was created. It does not authorize guessing C-numbers, bypassing the importer, changing a component definition or routing unqualified parts.
