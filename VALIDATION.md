# R8 validation record — 2026-10-05

**R8 — COMPONENT QUALIFICATION BLOCKED — NOT FOR FABRICATION.**

## Revision and scope

Source directory: `../magnetic-shutter-remote-r7--01a0f81f`, branch `r7-shutter-only-order-review`, commit `636d2b24eb4db775fceeb81206541f249db3b9a5`. R6 frozen commit: `77965a8012d5544e962d987ce958c5c5614dbe3a`. R8 source/dependency checksums are in `evidence/R8-components/R8-INTEGRITY-MANIFEST.json`; firmware has its own `firmware/artifacts/R8-candidate/BUILD-MANIFEST.json`. No completed board implementation step or public R8 revision is claimed.

One rechargeable battery, one USB-C charging port, native-phone BLE HID shutter, shoulder controls and existing red status indicator; no torch. Selected module is ESP32-C3-WROOM-02-N4 / C2934560. Proposed module supply is 3.3 V, with at least 0.5 A output capability. Two-layer TOP assembly remains the intended architecture; final board dimensions, thickness, mount arrangement, stackup and manufacturing limits are not yet frozen for R8. Prior design's dimensions and DFM evidence must not be reused as an R8 pass.

| Stage | Status | Evidence / limitation |
|---|---|---|
| 1. Requirements | in progress | Supply/pin requirements checked; final battery/harness and mechanical envelope unfinished. |
| 2. Schematic and BOM | blocked | C2934560 supplier land variation unqualified; root circuit/BOM still Nordic baseline. |
| 3. Placement before routing | not started | Only isolated unrouted import fixture built. No whole-board netlist/pin/source/placement pass. |
| 4. Copper routing | not started | No ESP32-C3 board routing. Copied old routing is not R8. |
| 5. Automated and visual board checks | in progress | Focused tests/typecheck/format and module fixture reviewed; full R8 DRC/snapshots not run. |
| 6. Prototype fabrication | blocked | No R8 Gerbers, drills, BOM/CPL or supplier preview. |
| 7. Physical prototype | not started | POST-PROTOTYPE PHYSICAL VALIDATION. |
| 8. Store release/publication | blocked | No validated R8 root circuit JSON; no GitHub/tscircuit R8 update attempted or claimed. |

## Component qualification

- C2934560 listing checked 2026-10-05: ESP32-C3-WROOM-02-N4, Extended SMT, Economic/Standard, MSL3; observed stock 11,602 and orderable 7,755, 1–9 unit price $3.2887. Stock is not reserved. Exact source: https://jlcpcb.com/partdetail/ESP32-C3-WROOM-02-N4/C2934560 . Native import/model paths and original raw supplier input preserved.
- Espressif datasheet v1.7, Figure 11-1 page 38: recommended lands 1.5 ×0.9 mm. Import/raw supplier: 1.999996 ×0.999998 mm on 18 contacts. All 27 supplier/import features match with maximum conversion difference 5.084821452783217e-14 mm. All 19 pin identities match Table 3-1. Nine EP tiles match 0.7 mm recommendation.
- **BLOCKER 075:** qualified land pattern not established. The recommendation is not an explicit tolerance; wider lands are not automatically a manufacturing failure. No evidence approves the actual variation. This is supplier data, not a demonstrated converter bug. Original import is unchanged.
- **BLOCKER 076:** numeric supply label `3V3` lacks `requiresPower` metadata; fixture warning `U1 has no pin with requires_power=true` remains explicit. EP ground must also be verified from manufacturer data. No generated import edits or warning suppression.
- TPS63031DSKR / C15516 proposed only: stock 13,364/orderable 13,232 on 2026-10-05, Extended SMT Economic/Standard MSL1, 1–9 price $1.0291. TI SLVS696D provides the supply feasibility basis. Supported import preserved; contact/paste variation still unqualified. This is not the final BOM.
- Old 200 mA TPS7A0230 regulator and 110 mA-rated battery cannot satisfy the selected module's 0.5 A supply-capability requirement. Larger protected pack, new harness mate and power components still need selection/qualification. Detailed charge/current/voltage calculations and explicit runtime assumptions: `POWER-FEASIBILITY.md`.

Controlling workspace rule in `../../AGENTS.md`: “If a required part cannot be imported, or an imported component has any issue ... stop dependent work; do not work around it by creating or modifying a component.” Dependent board wiring, placement, routing and exports were therefore not advanced. Independent firmware and source audits continued.

## Reproducible results

| Check | Result | Scope |
|---|---|---|
| `python3 scripts/audit-r8-module.py` | PASS conversion fidelity; BLOCKED land qualification | Original supplier JSON vs unchanged TSX; manufacturer geometry comparison visible. |
| `python3 -m unittest discover -s tests -v` | 5 PASS | Conversion fidelity, blocking discrepancy, pin identity, 129 prior-file hashes, firmware GPIO/config contract. |
| `./node_modules/.bin/tsc --noEmit` | PASS | Local TS/TSX including import fixture; not electrical validation. |
| `bun run format:check` and fixture formatter check | PASS | Project-configured Biome checks; generated imports not rewritten. |
| Native fixture build | PASS render; power warning unresolved | `tests/fixtures/esp32-import.circuit.tsx`, routingDisabled; 27 pads, zero traces, zero circuit error records, native A4 297 ×210 mm. |
| Fixture PCB/3D and annotated land drawing visual review | PASS inspection | Module evidence only, not final enclosure fit or whole-board copper review. |
| Zephyr ESP32-C3 firmware build | PASS compile/image | 411,568-byte image, checksum e8 valid; proposed pin contract, hardware untested. |
| Firmware low-power behavior | NOT VERIFIED | Wi-Fi off/tickless idle; CPU/controller sleep not established. |
| Whole-board R8 DFM/connectivity/routing/CAM | NOT RUN | Module qualification gate blocks them; old counts are not R8 results. |
| Historical full importer suite | NOT RUN this revision | Prior 33 baseline failures remain recorded; no full-suite pass claimed. |
| R7 preserved baseline | 129/129 hashes unchanged | `evidence/baseline/R7-preservation-manifest.json`; all files covered by that manifest verified. |

Native fixture command: `./node_modules/.bin/tsci build tests/fixtures/esp32-import.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png`. Output is `dist/tests/fixtures/esp32-import/`, not `dist/index/`. Logs, annotated geometry and original inputs are linked from issues 075/076. A4 schematic review is an isolated import-symbol check only.

Firmware reproduction and exact dependency commits are in `firmware/README.md` and its build manifest: Zephyr 4.2.0, SDK 0.17.2, RISC-V GCC12.2.0. Optional external DTC absence and esptool Python3.14 SyntaxWarning remain recorded, not suppressed. BLE report/phone behavior and runtime require actual hardware.

## Tooling and preservation

Locked board toolchain: tscircuit 0.0.2702; CLI0.1.2237, core0.0.2035 and easyeda0.0.364 use preserved R7 local-qualified archives; PCB viewer1.11.415, 3D viewer0.0.610, TypeScript5.9.3, Biome2.2.4. No new generic importer patch was made. Supported imports and supplier model assets were not hand-edited. Source/lock/archive hashes are in the component integrity manifest.

R6/R7 original directories remain untouched. Preservation testing covers exactly 129 files, not a new verification of the historical 972-file R4/R5 archive. No ordering, supplier outreach, public issues, R8 fabrication package or changes to unrelated projects occurred.

GitHub and tscircuit remote updates: **neither performed**. Publication is blocked by component qualification and the lack of a validated ESP32-C3 board/`dist/index/circuit.json`; copied Nordic output must not be published as an R8 result. Ignore rules now permit that required root artifact when a future qualified source generates it. The module fixture JSON is evidence only.

## Cloud setup continuation — 2026-10-05

The preceding sections record the pre-cloud qualification stage; their results are not reinterpreted as a completed ESP32 board. The current request is to move heavy execution off the Mac and provide a self-contained GitHub checkout.

New branch: `cloud/r8-cloud-setup`, based on existing public repository `AnasSarkiz/magnetic-shutter-remote` main commit `5951f419c8314b83648d89e1cfb7e29e87e32eb8`. `main` is not overwritten. The published source/enclosure/JSON is archived byte-for-byte in `baselines/published-main/`; its generated JSON is explicitly Nordic reference output. `baselines/r7/` includes the 129-file preservation snapshot and key qualification documents. Original R6/R7 directories remain unchanged.

Portable instructions, decision history, precise blockers, source/raw manufacturer evidence, local-qualified runtime/base archives, firmware and the complete relevant tscircuit skill are included. Credentials, node_modules, installed SDKs/venvs and caches are excluded. Historical missing R5 archive remains missing; no old failure is converted to a pass. See `cloud/HANDOFF.md` for the context map and exclusions.

Changed files for portability: `tests/test_r8_qualification.py` now verifies the same129 hashes against the explicit in-repository snapshot; original absolute-path manifest stays unchanged. Configs exclude immutable baselines from active TS/tsci entry discovery. Added Linux-only setup/smoke, resource-budget launcher, meaningful launcher regression tests and a Linux CI smoke workflow. No root PCB/source/import/firmware application change or routing/export rebuild was performed.

Local Cloud preparation checks:10 focused tests PASS (5 original qualification +5 launcher), context snapshot129/129 and recorded vendor/base archive hashes PASS; TypeScript/format/shell syntax PASS. A pipe ResourceWarning found during launcher regression was fixed by closing the subprocess stream through its context manager; warning-as-error rerun passes. Tests deliberately run only a tiny failing Python child, never a PCB/routing command.

Linux install/fixture CI and actual Codex Cloud environment activation are separate results; see `cloud/STATUS.md`. No Cloud memory guarantee or hosted routing result is claimed from local smoke checks. Frozen Nordic JSON is included in the handoff; no new R8 root circuitJSON is fabricated. This is a source/environment setup publication, not a tscircuit board release or fabrication approval.

Hosted Linux preparation subsequently passed on GitHub Actions run37291506181 at source commit56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad: exact locked runtime/dependencies,129 context hashes and source/archive hashes, formatting, TypeScript,10 focused tests and isolated **unrouted** fixture PCB/schematic exports. The existing requires_power warning remains visible; Actions runtime/dependency deprecation warnings are preserved in the complete log. This is not whole-board or Codex Cloud routing evidence. Anonymous public reads of setup/handoff/frozen circuitJSON match local hashes; remote main remains5951f419c8314b83648d89e1cfb7e29e87e32eb8. Actual Codex Cloud activation is pending specific-repository GitHub connector access, prepared but not granted; see STATUS.md. No active PCB/source/import/firmware application changes were introduced by this follow-up.
