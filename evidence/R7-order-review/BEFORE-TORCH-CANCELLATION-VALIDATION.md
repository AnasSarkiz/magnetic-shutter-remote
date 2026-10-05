# R7 validation

**WORK IN PROGRESS — NOT FOR FABRICATION.** Started 2026-10-04 from R6 `77965a8012d5544e962d987ce958c5c5614dbe3a`, branch `r7-shared-battery-fill-light`. No R7 source commit or publication yet. Original R6 README/validation snapshots retained in `evidence/R7-start/`.

| Stage | Status | Actual scope |
|---|---|---|
| Requirements | in progress | Shared battery/USB, 1.5–2 W, ≥30 min, 15/50/100% accepted. Battery, thermal path and final dimensions incomplete. |
| Schematic/BOM | blocked | LED pair checked. Main R7 power not integrated. AL1793 footprint mismatch; PT4115 curved paste import failure; battery/harness/protection incomplete. |
| Placement | in progress | Separate emitter candidate builds unrouted, 13 TOP parts. Four LED orientation suggestions remain; zero placement DRC errors. Main side controls incomplete. |
| Routing | not started | Emitter routing disabled. Inherited main R6 routing is not an R7 pass. |
| Automated/visual | in progress | Focused software/math checks pass. Emitter PCB/schematic inspected. Full R7 board/copper/3D audit not run. |
| Prototype fabrication | not started | No R7 Gerbers/BOM/CPL approved. Historical R6 outputs must not be ordered as R7. |
| Physical prototype | not started | POST-PROTOTYPE PHYSICAL VALIDATION. |
| Store prototype release | not started | No completed R7 implementation stage or remote publication yet. |

## Actual checks

**2026-10-04 scope update:** the user selected a purchased fill-light ring instead of a custom emitter PCB. Custom-ring work is stopped and its evidence retained. The table and investigation below describe prior custom-ring work, not approval of the new purchased-ring interface. Active blockers are exact external ring selection, its documented supply/load/control/mechanical interface, and the resulting shared-power and side-control integration. No supply voltage, connector pinout, brightness protocol or final battery capacity is inferred from a generic ring listing. See `evidence/R7-power/EXTERNAL-RING-INTEGRATION.md`.

Later focused tool work resolved the PT4115 curved-paste import failure and mixed-shape core pad-bounds defect. The curved-paste focused regression reports 9,174 assertions passing; the core focused regression reports 219 assertions passing. The independent five-aperture fixture comparison reports maximum source-to-Circuit JSON discrepancy 0.00009767462407179569 mm and Circuit JSON-to-Gerber discrepancy 0.0000006400707352877591 mm (`evidence/R7-components/PT4115-paste-readback.json`). This does not qualify PT4115 electrically or make it a selected component for a purchased ring. The historical 33 baseline full-suite failures remain; the full importer suite is not claimed passing.

The original custom-ring harness conflict was addressed in that investigation by a supported seven-position JST import, with unrouted placement and manufacturer-land comparison passing (`evidence/R7-components/JST7-land-audit.json`). It is not an approved connector for the purchased ring. Typecheck passed after explicit net definitions (`evidence/R7-start/typecheck-after-net-fix.log`). The following older check descriptions and blockers are retained as investigation history and superseded where these results apply.

- TypeScript/install passed before latest emitter change; final rerun required.
- Firmware strict C11 build: 9,009 mix/brightness/color cases plus startup/fault/invalid-input checks PASS. No final GPIO binding or full R7 firmware build.
- Power-budget unittest: six tests PASS; calculations are assumptions, not measured runtime.
- LED fixture builds and strict Circuit JSON schema/geometry audit PASS. Native paste margin −0.025 mm fits the manufacturer's stated land-pattern tolerance; original imports unchanged. Assembler stencil process remains pending.
- Emitter netlist PASS. Pin specification: zero errors, 36 warnings from imported generic-chip LED power/ground metadata. Source: zero errors/warnings. Schematic placement exits zero. Placement exits one: D1/D6/D7/D12 orientation suggestions; placement DRC zero errors/warnings. Logs under `evidence/R7-components/`. No zero-warning claim.
- Emitter build exits zero, routing disabled; schematic boundary finding being corrected. No completed pre-routing gate yet.
- Historical USB4215 importer results: 7,685 focused assertions PASS; 33 baseline full-suite failures remain. Not a new R7 suite pass.

## Blockers

1. AL1793AFE-13/C67354: supplier lead rows about 3.0 mm vs manufacturer suggested 2.7 mm; lead width 0.30 vs 0.35 mm. Do not fit or patch without qualification.
2. PT4115/C347356: supported importer fails `Unsupported curved paste SOLIDREGION gge1076`. Original CAD/log preserved. Generic source fix under investigation; no dependent driver circuit.
3. Battery selection: 500–600 mAh 1C is inadequate for modeled maximum current. 850 mAh conditional, 1200 mAh provides margin but lengthens enclosure. Exact harness polarity, PCM tolerances and automatic torch temperature protection pending.
4. Candidate emitter's six-position harness mates with inherited SWD format. High-voltage torch must not be interchangeable with SWD; different/keyed connector needed.
5. Final driver, switching layout, hardware fault protection, side actuators, thermal/mechanical integration and full electrical/routing audit incomplete.

## Preservation

Read-only original R6 manifest: `evidence/R7-start/R6-preservation-manifest.json`, 2,898 tracked files. Historical R4/R5 protected set: 972. Rehash before delivery, storing results only in R7. Never write into the original directories.
