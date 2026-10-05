# R8 routing investigation — 2026-10-05

**BLOCKED BEFORE ROUTING. No R8 claim of zero DRC errors or zero shorts.** The requested acceptance criteria remain zero unresolved DRC errors, zero shorts and every required connection physically routed on the same current R8 source. An unrouted component fixture's zero traces/errors cannot satisfy those criteria.

Repository branch `cloud/r8-cloud-setup`, HEAD `b25353c0a1d7adceeab9a966aaf68a6cb3594cc9`. The active `index.circuit.tsx`/`src/remote-circuit.tsx` still implement the frozen Nordic starting design. No root build, routing, snapshot acceptance, firmware build, 3D/CAM build, board publication, commit or push occurred in this investigation. Frozen references, application source, existing imports, dependencies and memory guard remain unchanged; new supported candidate imports and evidence are separate.

## Qualification results

| Item | Actual result | Consequence |
|---|---|---|
| Selected DOIT ESPC2-12E-N4 / C19949081 | Earlier focused module land/pin/import checks passed | Original C3 issue075 avoided; whole-board supply/programming/layout still pending |
| TI TPS63031DSKR / C15516 | Faithful11-pad conversion; valid CAD files; contacts differ from TI example | Qualification blocked, [issue078](../../tscircuit-issues/078-tps63031-supplier-lands-differ-from-ti-example.md) |
| Sunlord SWPA3015S1R5NT / C56594 | Supported import succeeded;2 pads faithful; manufacturer land variation | Candidate not selected/fitted, [issue079](../../tscircuit-issues/079-swpa3015-supplier-lands-differ-from-sunlord-recommendation.md) |
| CMPI0420-1R5M / C7588898 | Stocked supplier candidate; supported CLI import failed: no EasyEDA entry | Rejected; exact failed log retained; no generic substitute |
| Coilcraft LPS3015-152MRC / C17382749 | Stocked TI-recommended series; supported import succeeded;2 pads faithful | Alternative candidate only; manufacturer/process qualification pending |
| JST SM02B-SRSS-TB(LF)(SN) / C160402 | Supported import succeeded;4 pads faithful after normal footprint recentering; nominal dimensions agree with JST side-entry drawing | Candidate matches the documented battery mate; root connector/polarity not migrated |
| Samsung CL10A105KB8NNNC / C15849 | Supported1µF import succeeded,2 pads faithful | EN RC capacitor candidate; DC-bias/rail/timing validation pending |
| Uniroyal0603WAF3301T5E / C22978 | Supported import succeeded, actual3.3kΩ verified | Not the proposed3kΩ resistor; not selected/fitted |
| Live exact-MPN supplier search | Several HTTP200 responses contained unrelated identities | [Issue080](../../tscircuit-issues/080-live-supplier-search-returns-unrelated-parts.md); exact identities independently checked |

The six preserved imports have real STEP/OBJ signatures. Supplier/raw comparisons and per-file CAD hashes are in `power-part-audit.json`; rerun `python3 evidence/R8-routing-2026-10-05/audit-power-parts.py`. Its PASS labels concern **relative pad conversion**, not manufacturer qualification or board DRC. C160402's uniform Y translation is approximately+0.0624967mm: the canonical converter recenters footprint bounds (`convertBetterEasyToTsx`, `shouldRecenter:true`). Pad identities, dimensions and spacing are preserved; final body/CAD/connector registration still needs placement inspection. Raw supplier cache timestamps/UUIDs are retained in `supplier-cache-provenance.json`.

Source attribution: **JLCEDA/EasyEDA Official Library**, [JLCEDA](https://lceda.cn/), [EasyEDA](https://easyeda.com/). No component definitions or generated circuit JSON were hand-edited.

## Electrical facts for the pending migration

The C2 module requires3.0–3.6V and a supply capable of at least500mA. The retained3.0V/200mA LDO and110mAh/110mA-discharge pack are unsuitable for that envelope. TPS63031 remains a proposed3.3V buck-boost, not a fitted/qualified supply. Complete inductor, effective-capacitance, enable/undervoltage/transient, switching-loop, current-path and thermal qualification before placement/routing.

The preserved ASR00012 1000mAh protected pack specification explicitly names C160402's exact JST mate. **Its reference schematic Figure5, page9, connects pin2 to battery positive and pin1 to ground.** This is opposite to the old PH connector's root pin1-positive contract; do not transplant that mapping. JST signal pads0.6×1.55mm, mounting pads1.2×1.8mm and1mm signal pitch agree with the supported SH import to numerical quantization. JST's1A contact rating is specified with AWG28; harness wire gauge and assembly registration remain to be qualified, not assumed from the connector name.

The proposed slow-charge setting needs revision: the current BQ25185 SLUSF65B Electrical Characteristics gives `tMAXCHG=360min`, and section6.3.7.7 disables charging if termination does not occur in time. The old15kΩ/20mA setting cannot be retained for a1000mAh pack. A100mA proposal also has a10-hour nominal capacity/current quotient; C22978's3.3kΩ gives approximately90.9mA, not100mA, and is not selected. These quotients are not measurements of usable capacity at4.1V or CV timing, but prevent treating slow charging as qualified. Existing exact1kΩ C21190 is an independently retained candidate for300mA nominal, approximately267.3–333.3mA including ±10% charge accuracy and ±1% resistor tolerance. That is below the pack's500mA standard charge rating and500mA input-limit setting at130kΩ VSET, but **thermal, input-budget and actual termination-time verification remain required**. No resistor, charger or battery circuit was changed.

The larger43×32×8.5mm battery envelope cannot use the old40mm enclosure unchanged. C2 EN/bootstrap/UART circuitry, UART GPIO19/20, GPIO9 download control, antenna clearance, side/shoulder shutter access and sensor coupling must be frozen and verified. C3 firmware images remain historical and must not be flashed to C2.

## Gate and required completion checks

`cloud/WORKSPACE-INSTRUCTIONS.md`, “Mandatory JLCPCB component imports,” explicitly requires: **“If a required part cannot be imported, or an imported component has any issue, report it to the user explicitly as a blocking issue … stop dependent work.”** AGENTS.md also prohibits routing before BOM, supply/boot/programming, connectivity and placement qualification. These instructions prevent routing through issues078/079 or presenting the old Nordic source as the selected C2 board. Land recommendations are not fabricated tolerance envelopes; none of these discrepancies proves assembly failure.

Resolve regulator land/process qualification and select a fully qualified inductor, complete the electrical/mechanical migration, then build unrouted R8 output and pass `tsci check netlist`, `pin_specification`, `source`, `schematic-placement`, and `placement`. Local `tsci check --help` confirms all commands exist; retained in `cli-check-help.txt`. Once those gates pass, run the native routed build **only through `python3 cloud/run-heavy.py -- <command>`**, sequentially. Require all nets routed, no keepout copper, measured trace/via/hole/pad clearances and current-path dimensions, then run CLI shorts, the existing `scripts/check-routed.ts`, snapshots and visual reviews on the same generated `dist/index/circuit.json`. Resolve every actionable error; no threshold or checker change is authorized just to obtain zero.

| Validation stage | Current status |
|---|---|
| Requirements / full power-and-mechanical contract | In progress |
| Schematic/BOM qualification | Blocked |
| Current R8 unrouted placement and mandatory checks | Not started |
| Current R8 routed root build | Not started |
| Current R8 routed DRC / shorts / connectivity | Not run; counts unknown |
| Fabrication exports / release | Not started |
| Physical prototype | Pending |

## Hosted execution and preservation

Observed cgroup limit34359738368bytes=32GiB; CPU quota400000/100000=4 CPU equivalents. This is the observed running instance, not a guaranteed plan allocation. Node25.6.0, Bun1.3.9, Python3.12.14. `execution-status.json` records these, OOM counters and **null/unrun** DRC/short counts. No heavy root job ran, so there is no routed-board peak-memory result. `cloud/run-heavy.py`, its memory guards and setup/start smoke scope remain unchanged.

Canonical smoke output and final Git status/diff are retained with this report. Smoke tests concern environment/context/import metadata, not whole-board DRC. The original radio manifest and frozen manifests remain intact; a separate successor manifest identifies this investigation's files. No network-policy expansion, proxy bypass, tokens, ordering/payment, supplier contact, assembler upload or external publication occurred.

Actual final verification: `bash cloud/smoke.sh` passed formatting, TypeScript,18 Python tests,2 native evaluator tests and129/129 preserved context hashes. `audit-power-parts.py` passed all six relative-pad/CAD-format checks while explicitly retaining manufacturer qualification as blocked/not established. `git diff --check` passed. Logs are `smoke.log` and `power-part-audit.log`; final `git-status.txt`, `tracked-diff.patch`, `tracked-diff-stat.txt` and `preservation-status.json` record exact review paths and the root-source guard. These20 lightweight tests are **not20 DRC checks** and do not establish zero routed shorts.
