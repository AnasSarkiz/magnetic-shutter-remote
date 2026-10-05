# R6 validation

**ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED**

R6 is isolated from preserved R5 on branch `r6-usb4215-engineering-prototype`. The original R5 board commit is `f8ae7e3fce74b77731783d1ffc061562bb439e04`; its qualification commit is `cb671ff7dbe59016f121a290f0938dab0c07695b`. Exact source, tool and artifact hashes accompany the package. No upload, order, supplier contact or publication occurred.

| Stage | Status | Evidence |
|---|---|---|
| 1 Requirements | passed | Original design retained; user authorizes USB4215 and prototype shell rework risk; REQUIREMENTS.md / R6-QUALIFICATION.md |
| 2 Schematic/BOM | passed | Exact J1 manufacturer/supplier/import mapping; 37 TOP parts; BOM and original qualification records retained |
| 3 Placement | passed | Native netlist, pin, source, schematic-placement and placement checks; calculated USB fit; 36 unchanged placements |
| 4 Routing/copper | passed | Native routed build; zero shorts; classified clearance audit; complete ground-return and RF-keepout checks |
| 5 Automated/visual | passed | Format, TypeScript, snapshot and native checks; 65 board tests; native viewers, three A4 sheets, CAM, 3D and mechanical drawings inspected |
| 6 First engineering prototype files | passed | 12 CAM files; four plated slots; 161 TOP paste apertures; 16/16 J1 apertures; 37/37 assembly registrations; authorized production-only uncertainties documented |
| 7 Physical prototype | not started | POST-PROTOTYPE PHYSICAL VALIDATION; no hardware available |
| 8 Store release | not started | No publication permitted in this run; no hardware-tested claim |

All 15 final suite commands pass (`evidence/R6/suite-exits.json`); every output-suite command passes (`output-suite.json`). Export metrology uses the same final Circuit JSON SHA256. Source/schema output is unmodified. Checks use the locked, locally compatible CLI/exporter. No thresholds were relaxed, errors suppressed, imported geometry edited, generated JSON/CAM patched, or type escapes introduced.

Focused importer regression: **7,685 assertions PASS**. The 33 baseline full-suite failures remain. PNP regression: 55 tests / 347 assertions PASS. CLI polygon-paste and injected-short regression: two tests / three assertions PASS. No general importer or CLI full-suite pass is claimed. Historical issue 043 negative checks retain their preserved R4 input; R6 adds strict registration positive and negative coverage.

Accepted warnings: battery J2 faces its internal harness rather than the nearest board edge; its actual mating direction was reviewed. Imported Q1/Q2 discrete symbols lack power-pin metadata. Branch route-cache serialization remains unsupported (issue 014). The 59 via drills below 0.3 mm incur a documented fabrication surcharge. These are limitations or cost warnings, not hidden DRC errors. Ground-plane checks pass the actual TI requirement; thermal performance remains a physical test. Native preview asset-fetch/cache limits and the failed tight resvg crop are recorded. Complete-layer CAM renders and numerical CAM checks succeed.

The R5-to-R6 comparison shows only J1 identity/placement changed. All 36 other placements, non-USB nets and saved non-USB fanouts are identical. Native follow-up routing recomputed 79 of 139 trace geometries. Attempted native preservation failed graph validation; its evidence remains. Independent copper, return-path and RF checks pass after rerouting. The comparison report lists the affected route IDs.

All **972 protected original R4/R5 files remain unchanged** (`protected-baselines.json`). Firmware compiled successfully: 164,660 bytes FLASH / 26,796 bytes RAM; final HEX/BIN/ELF hashes are recorded. Battery polarity, button functions and SWD markings clear actual mask and outline. Minimum actual glyph height is 1.129158 mm; stroke width is 0.18 mm.

Production reflow, stencil and exact shell-process coverage remain pending. **PROTOTYPE MANUAL REWORK MAY BE REQUIRED FOR FOUR USB SHELL ANCHORS.** This is the user-authorized first-prototype disposition, not production approval.

The validated files support ordering a first engineering prototype. No order was placed. Battery, thermal, RF, runtime, enclosure fit and phone behavior remain **POST-PROTOTYPE PHYSICAL VALIDATION**.

Final release checks: 65 current board tests PASS (`release-tests.log`); GLB mesh coverage is 37/37; freshly regenerated BOTTOM and current-preview hashes PASS. Git's broad whitespace check flags preserved raw logs, supplier captures, CSV CRLF and generated SVG formatting. These evidence files were not rewritten merely to silence whitespace diagnostics. The configured formatter, TypeScript check and current authored-source whitespace check pass.
