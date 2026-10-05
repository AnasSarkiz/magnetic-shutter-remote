# USB4215 replacement qualification — isolated toolchain audit

**USB4215 — BLOCKED. R5 DFM REVIEW — NOT FOR FABRICATION.**

No R6, migration implementation or fabrication-candidate ZIP. All972 protected files remain unchanged (556 R5 +416 R4); previous replacement-search evidence remains unchanged. Physical battery, RF, thermal, runtime, enclosure-fit and phone tests remain **POST-PROTOTYPE PHYSICAL VALIDATION**; those are separate from the open pre-fabrication process requirements.

## Source identity and preserved evidence

GCT / Global Connector Technology USB4215-03-A, JLCPCB/LCSC C37616412. Official drawing/spec revision A, 2024-04-26. Supplier componentUUID 907b9bea7a60481d8a3d3aef3cba8ef1; packageUUID 3104977db58742e399663286e4a66eac, library title USB-C-SMD_GT-USB-7010B. The borrowed title/link is disclosed; supplier import success is not GCT approval. See [identity and hashes](source-identity.json), [unchanged raw source](inputs/C37616412.raweasy.json), [original generated import](inputs/original-import.tsx), [current import](final/USB4215_03_A.tsx) and [frozen-search ledger](frozen-search-ledger.json).

The official drawing's copper/drill qualification is preserved in the [previous search](../USB-replacement-search-2026-10-03/continued-search/README.md); this run does not overwrite it or infer new tolerances. [JLC stock record](stock-2026-10-03.json) checked 2026-10-03:145 stock,63 available,Extended, SMT Assembly, Economic/Standard, MSL1. Availability can change. The exact page does not confirm soldering coverage/process for the four plated shell anchors.

## Exact paste loss and corrected chain

| Stage | Expected source paste shapes | Baseline observed | Corrected observed | Result |
|---|---:|---:|---:|---|
|Raw EasyEDA/LCSC source |16 |16 |16 | source retained |
|Parsed representation |16 |16 |16 | parser retains SOLIDREGIONs |
|Direct importer Circuit JSON |16 |0 |16 | local generic fix |
|Generated tscircuit component |16 |0 |16 | explicit native polygons |
|Rendered Circuit JSON |16 |12 automatic defaults |16 source polygons | no duplicates |
|TOP paste Gerber |16 |12 default rectangles |16 source regions | independent CAM pass |

The first exact discard is the converter's SOLIDREGION dispatch: filled layers5/6 are not emitted. Layer mapping itself is not the cause. PAD paste/mask expansion is also discarded. Downstream polygon schema/props/native primitive/viewer/export support was missing. The focused additive fix preserves all original M/L polygon vertices; unsupported curves, compound/open paths fail explicitly rather than being silently approximated.

Twelve contact apertures  + four shell apertures survive. Raw negative contact paste expansion suppresses the former automatic rectangles. Supplier mask expansion 0.0508 mm is retained on all16 lands; actual TOP mask's24 drawing commands composite to 16 physical openings. Source geometry is preserved exactly, including small source offsets and segmented capsule contours. [Per-aperture table](APERTURE-GEOMETRY.md) and [actual Gerber](final/F_Paste.gbr) show maximum contour error 0.000000565686 mm from six-decimal quantization. Native and actual-CAM [previews](final/) were visually inspected; geometry was independently measured.

## Validation and working versions

| Check | Result | Evidence |
|---|---|---|
|Minimal importer geometry regression |pass ; 1,255 assertions |[focused tests](logs/focused-importer-final.log) |
|48 existing source fixture margin/contour checks |pass ; 6,430 assertions |same log |
|Core placement/reflection/routing/default-paste tests |4 pass,0 fail ; 107 assertions |[core log](logs/focused-core-policy-aligned-final.log) |
|Util polygon/outline transform |pass |[util log](logs/focused-util-final.log) |
|Gerber polygons, both layers/Y conventions |pass |[Gerber log](logs/focused-gerber-final.log) |
|SVG polygon/viewer snapshot |pass |[SVG log](logs/focused-svg-final.log) |
|Actual source→JSON→CAM contours and mask |2pass |[CAM log](logs/cam-final-locked.log) |
|Actual four plated slots |pass with pcb-tools; no drill rewrite |[slot log](logs/slots-native-reader-final.log),[measurements](final/slot-readback.json) |
|Seven library/declaration builds |all pass |[build results](logs/qualified-build-results.json) |
|Locked fixture typecheck/render |pass;16paste,0Circuit errors |[typecheck](logs/fixture-nested-routing-typecheck.log),[render](logs/fixture-nested-routing-render.log) |
|Clean separate-directory reproduction |18 files match except CAM creation times |[results](reproduction-with-slots/reproduction-results.json) |
|Full importer suite |**blocked:278 pass/33 fail**,311 tests |[full log](logs/importer-final-qualified-suite.log) |
|Unchanged-source paired control |237 pass/72 fail,309 tests;33 common failing names |[control log](logs/baseline-final-qualified-suite.log),[comparison](logs/suite-comparison-final-qualified.json) |
|ProtectedR4/R5 files and previous search |972 + 82 files unchanged |[preservation](preservation-after.json),[search](frozen-search-verification.json) |

Name parity does not waive the full-suite failures or prove every general import is release-ready. Exact remaining cases/logs are [retained](logs/unresolved-suite-failures.json). Source-backed inline/strict expectations were reviewed before update; stripping only new paste/mask content leaves all previous symbol/copper content unchanged. A 48-component raw-source test independently checks the additions. Original tests/inputs and failing logs remain preserved. No snapshot-difference threshold, manufacturing check, compiler strictness or source validation was weakened.

Local package baselines: easyeda 0.0.364, circuit-json 0.0.509, props 0.0.672, util 0.0.117, core 0.0.2035, Gerber 0.0.109, SVG 0.0.433. Runtime pins: tscircuit 0.0.2702, eval 0.0.1506, checks 0.0.232, footprinter 0.0.426, React 19.2.1, TypeScript 5.9.3, zod 3.25.76, Bun 1.3.9. Root router 0.0.951 is a direct dependency; fanout 0.0.78 retains its own router 0.0.718. A blanket override was removed after compiler evidence demonstrated incompatibility. [Manifest/lock](fixture/), [source ledger](source-change-ledger.json), [built-package/source hashes](working-dependency-manifest.json), [reproduction commands](REPRODUCE.md).

All working imports/JSON/CAM were regenerated through corrected supported tooling; no generated component, Circuit JSON or Gerber was manually patched. The 20 × 18 mm unrouted fixture is an inspection carrier, not a proposed new remote PCB. Its 11 CAM files do not replace the protected R5 board's 12 CAM files.

## External qualification remains blocked

[Paste qualification](../USB4215-PASTE-QUALIFICATION.md): supplier footprint fidelity verified; **manufacturer paste/mask/stencil qualification missing**. Contact/shell source apertures are not automatically approved paste volume for a 1 mm board. No official exact-series stencil thickness, reductions, shell overprint volume or mask strategy was found.

[Process qualification](../USB4215-SOLDER-PROCESS.md): GCT specification A section 7.0, p6 publishes a reflow heat-resistance evaluation: ramp 2.5 °C/s, soak 2–3 min, above 217 °C for 60 s, above 230 °C for 50 s, above 250 °C for 5 s, peak 255–260 °C, cooling maximum slope −5 °C/s. Allowed heating-cycle count and exact shell method/secondary solder permission, iron time/temperature and repeats remain undocumented. General GCT PIP guidance and the 245 ±5 °C / 3–5 s solder-pot test do not qualify this exact process.

Four plated shell slots are geometry-verified, with source paste present, but intended solder method and JLCPCBA coverage/special services remain unconfirmed. The exact-part SMT-eligible listing is insufficient to certify all shell anchors are soldered. [Concise GCT/JLC questions and supporting drawings](UNSENT-QUALIFICATION-QUESTIONS.md) are prepared only; **nothing sent, uploaded, ordered or published**.

USB4215 is **BLOCKED**, not rejected and not a QUALIFIED R6 CANDIDATE. All required conditions are not met; no migration plan or R6 is created. USB4216/C47635969 remains **HOLD — ZERO STOCK / UNSUPPORTED CAD MODEL**, without custom CAD.

## Local issue record

[Issue index](tscircuit-issues/README.md) retains the original053 and adds its local-fix status, PAD paste loss054, outline transform055, PAD mask loss056, project dependency integration057 and stale local test058. Supplier approval gaps are not labelled tscircuit bugs. No GitHub issues or packages were published.
