# USB4215 external process review — 3 October 2026

**R5 DFM REVIEW — NOT FOR FABRICATION. USB4215 — BLOCKED.**

This is documentation and external-request preparation only. No PCB source, imports fitted to R5, board dependencies, placement/routing, firmware, mechanics or protected artifact changed. No R6, broad connector search, board build, broad DFM/regression rerun, supplier contact, order, upload or publication. The current explicit no-publication instruction governs this task; the standing board-step publication rule is not used to publish this isolated tooling archive or the board.

## Deliverable and integrity

[GCT-USB4215-JLCPCB-QUALIFICATION.zip](../../../deliverables/GCT-USB4215-JLCPCB-QUALIFICATION.zip), version `external-review-1`: 810,964 bytes, 19 members, including an internal manifest covering the other 18 members.

SHA256: `71abc2821e06eea53da3ba5900c5eb08db2272a7b49e33b53d7584f052c6c9f6`

**ENGINEERING QUALIFICATION ONLY — NOT FOR FABRICATION.** [Package record](PACKAGE-RECORD.json), [member index](package/README.md), [verification results](VERIFICATION.json). The package includes only exact manufacturer PDFs, source register, dimensioned comparison, paste/anchor views, aperture table, tooling summary, qualification findings and unsent requests. It excludes raw board CAM, the entire R5 project and unrelated/credential files.

The dimensioned comparison is preserved pre-fix evidence. Its old importer-loss caption is explained in the package; current source/import/CAM views show the fidelity fix. Earlier image-layout drafts and initial failed link-check report are retained locally as review history and are not included in the final ZIP.

## Separate tooling freeze

[Importer fix status](../IMPORTER-FIX-STATUS.md), [seven local source histories](../frozen-toolchain-history.json). Importer branch `qualification/usb4215-paste-fidelity`; control snapshot `7910eedb8f0635ed941ea634b64c1f9874c437fc`; fixed snapshot `2f52a09b4293b2802f837f6350c37fb55c2198a5`. These are local archival commits of already-tested source snapshots, not published upstream commits. Board Git history was not modified. Original source archives and changes remain intact.

The focused **7,685 assertions PASS** remains supported by unchanged original logs. No new importer fix or broad regression was attempted here. Full suite remains **278 pass / 33 fail**, with all 33 names in the unchanged-source control; no full-suite pass or general release readiness is claimed. [Exact unique 33-case register](BASELINE-33-FAILURES.json) removes repeated Bun summary rows only in this new index; the original 66-row register remains unchanged.

## Requests and responses

| Party | Request | Response | Remaining authority |
|---|---|---|---|
| GCT | [Finalized](GCT-REQUEST.md), NOT SENT | NO RESPONSE | Exact stencil/paste/mask, production reflow/cycles, four-anchor process and any secondary limits |
| JLCPCB | [Finalized](JLCPCB-REQUEST.md), NOT SENT | NO RESPONSE | Exact coverage of 12 contacts + four anchors, stencil treatment, secondary process/service and order notes |

**SUPPLIER CAD INTENDS PASTE ON FOUR SHELL FEATURES** does not prove manufacturer process approval, mechanically complete joints, absence of secondary soldering or assembler coverage. Section 7.0 thermal numbers remain heat-resistance test conditions; production limits are **UNCONFIRMED**. [Explicit thermal table](package/SOLDER-PROCESS.md), [decision matrix and all R6 gates](../../USB4215-EXTERNAL-DECISION.md).

No outbound requests are authorized by this preparation step. Once a package is sent in a later authorized action, preserve its exact bytes/hash. Later clarification packages need a new name/version. Preserve any replies verbatim before interpretation; no-response never passes a gate. USB4216 / C47635969 remains **HOLD — ZERO STOCK / UNSUPPORTED CAD MODEL**.

## Reproducible review checks

Run from the R5 project directory:

```sh
tooling/gerber-review-venv/bin/python \
  evidence/USB4215-import-audit/external-process-review/verify-review-package.py
```

This checks ZIP CRC, exact allowlisted contents, all hashes, original PDFs, image decoding, local document links, preserved source histories, original 300-file audit manifest, 82 prior-search files, the entire pre-existing board-file preservation superset and the 416-file protected R4 set. It never builds a board or changes manufacturing outputs.

The builder reads source polygons, rendered JSON and actual Gerber geometry to create annotated review PNGs; these are drawings, not new electronic CAD. `build-review-package.py` refuses to replace an existing package. `../freeze-source-history.py` refuses to replace the separate local histories. See [original fixture reproduction](../REPRODUCE.md) for supported import/render/export verification; no need to repeat that work for these documentation-only changes.

All **972 protected files (556 R5 + 416 R4)** remain unchanged. Battery, RF, thermal, runtime, enclosure-fit and phone tests remain **POST-PROTOTYPE PHYSICAL VALIDATION**, separate from the external pre-fabrication gates.
