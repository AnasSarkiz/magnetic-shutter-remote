# Current R8 0.3.10 — schematic style and through vias, 2026-10-06

Native standard USB-C schematic and real browser/CLI Style Analysis pass0
issues. Current-source native0 errors/shorts/dangling and independent0
manufacturing/process failures pass;29/29 physical nets, all174 physical
track widths and seven current paths pass. The two-layer44×56×1mm PCB has
91 through vias, each0.30mm hole/0.45mm pad, with all power/trace copper
on top/bottom only. All44 fitted parts/poses and159 pin/value contracts remain
unchanged. Six native A4 circuit/component-guide pages and both PCB/Gerber
layers are inspected. [Current review](../evidence/R8-style-vias-2026-10-06/REVIEW.md).
Circuit JSON SHA256: `eb69ddb005aea75aefe12e98c1e4f9f97bee3134a76d356261bf571662143f5b`.

All25 exact JLCPCB MPN/SMT listings verified with dated observations; actual
stock allocation/supplier processed-preview/stackup/assembly approval remain
pending. Physical programming/power/BLE/RF/thermal/runtime and full MagSafe
grip/phone/case qualification remain pending. Native warnings004/084 and
upstream075/076 stay explicit. Missing `3V3` metadata remains a separate
importer issue. Setup/start and serial memory guards remain unchanged;
observed32GiB/four CPU is not a guaranteed allocation. Publication receipt
is recorded separately after actual remote verification.

## Prior review/publication records — preserved history

# Current R8 0.3.9 schematic component guides — 2026-10-06

Native schematic text explains all44 fitted components on three matching
A4 guide pages, alongside the three original A4 circuit drawings. Each
drawing points to its component guide. [Current review](../evidence/R8-schematic-notes-2026-10-06/REVIEW.md).
Current Circuit JSON SHA256: `235953a871b8285929d6363f58f8bad3e52072a25123574657b9f6645cdb87ac`.
All1432 non-schematic elements/PCB artwork are unchanged; fresh0 native
DRC errors/shorts,29/29 physical nets,164 widths/current budgets and full
fabrication/process readback pass. All six A4 pages visually inspected.
Light smoke38 Python+2 Bun/13 assertions and new2 Bun/188 annotation
assertions pass. Public publication receipt is recorded separately.
Supplier approval, physical operation and full MagSafe fit remain pending.
Missing `3V3` metadata remains a separate importer issue.

## Prior review/publication records — preserved history

# Current R8 0.3.7 silkscreen update — 2026-10-06

The UART legend now reads **UART / 1:RX 2:GND 3:TX**; the requested
3V3 wording is removed. Programming still uses the correct 3.3 V signal
levels, direct three-pin JST and manual BOOT/RESET; no power pin is added.
Electrical components, placements, nets and copper remain exactly unchanged.
Fresh native0 DRC errors/shorts,29/29 physical nets,164 widths/current budgets
and native fabrication/silkscreen readback pass; light smoke38 Python+2 Bun
tests/13 assertions passes. Only bottom silkscreen artwork changes.
Current Circuit JSON SHA256: `8be85af4b798a3b3d5973784e23afb54c721f1377e06ee1d7aad77ca7c2fb6fd`.
[Current review](../evidence/R8-uart-silkscreen-2026-10-06/REVIEW.md).
Public publication receipt is recorded separately after remote verification.
Supplier approval, physical operation and full MagSafe fit remain pending.
Missing `3V3` metadata remains a separate importer issue.

## Prior review/publication records — preserved history

# Actual hosted continuation — 2026-10-05

Published public **0.3.6-prototype**: native367-file upload and22 critical
anonymous text/binary matches pass, including exact Circuit JSON and UART UF2.
[Actual publication receipt](../evidence/R8-issue-resolution-2026-10-06/PUBLICATION.md).
Hosted preview remains pending; supplier approval/physical/MagSafe fit stay open.

Latest [issue resolution](../evidence/R8-issue-resolution-2026-10-06/REVIEW.md):
pinned standard JST programmer0.8.0 UF2/ELF build and USB/UF2 validation pass.
Fresh native0 DRC errors/shorts,29/29 physical nets,164 widths and corrected
±30% current budgets pass; smoke38 Python+2 Bun/13 assertions and29 CAM pass.
Package0.3.6-prototype updates audit/programmer evidence; PCB stays hardware0.3.5.
Inventory096 is an unconfirmed allocation question, not a proven shortage.
Official Apple R31 guidance is retained; exact magnet/enclosure/phone fit,
supplier-processed preview and physical operation remain unqualified.
See the dated review for evidence and the subsequent publication record.

Canonical `bash cloud/setup.sh` and `bash cloud/smoke.sh` passed in this hosted instance after enabling Node’s supported `NODE_USE_ENV_PROXY=1` and keeping npm cache inside the workspace. Managed proxy/auth and existing network scope are retained. Node25.6.0, Bun1.3.9, Python3.12.14; observed cgroup memory34359738368 bytes (32GiB), CPU quota4 equivalents. This is an observation, not a guaranteed allocation. Setup verifies129 frozen hashes/archive integrity; smoke passes20 Python tests,2 Bun tests/13 assertions, format and typecheck. Original module075 qualification and its separate076 importer omission remain explicit. Logs: `evidence/R8-prototype-2026-10-05/environment/` after final evidence collection.

Reusable draft Install/Start instructions are saved with explicit-ref fetch, refusal to discard tracked changes, R8 context guard and preservation of later task branches. Saving draft does not restart or publish an environment. No server, user secret, broadened repository access or network permission was added.

The user subsequently authorized board engineering. Root source now implements the qualified DOIT ESPC3-12-N4; firmware compile/image pass, native/independent routing and shorts now pass0, physical connectivity and all12 local fabrication exports pass; supplier-processed preview and physical validation remain pending. Onboarding restrictions do not permanently prohibit later authorized source edits. Frozen baselines and ordering/contact restrictions remain unchanged.

## Earlier pre-hosted record — preserved history

# Cloud setup status — 2026-10-05

Board: **R8 COMPONENT QUALIFICATION BLOCKED — NOT FOR FABRICATION**.

- Repository: `AnasSarkiz/magnetic-shutter-remote`, public.
- Branch: `cloud/r8-cloud-setup`; `main` remains unchanged.
- Project handoff/configuration: prepared, self-contained frozen references and toolchain included.
- Local checks:10 focused tests PASS, TypeScript/format/shell syntax/context hashes PASS. These are not board DFM checks.
- Linux hosted setup/fixture CI: PASS, GitHub Actions run [37291506181](https://github.com/AnasSarkiz/magnetic-shutter-remote/actions/runs/37291506181), source commit `56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad`. Ubuntu24.04.5, Python3.14.7, Node25.6.0, Bun1.3.9. Locked installation, context/archive hashes, formatting, TypeScript,10 tests and isolated unrouted module PCB/schematic exports passed. This is GitHub Actions execution, not a Codex Cloud task or routing pass.
- Actual Codex Cloud environment: BLOCKED by repository installation/access. The official repository picker connects as AnasSarkiz but does not list the board; only tscircuit/Abse2001 installation filters appeared. Official GitHub ChatGPT Codex Connector installation is prepared for **only AnasSarkiz/magnetic-shutter-remote**; Install & Authorize has not been clicked. Browser security policy requires action-time confirmation for this new code/workflow/issue/PR access plus account email read permission. No token or password is stored in this project.
- PCB/source/import/firmware application changes: none during Cloud setup.
- Routing on Mac/Cloud: not performed during setup.
- tscircuit board publication: not performed; ESP32 migration gates remain open.

Public branch pushed at `56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad`; unauthenticated HTTPS reads of HANDOFF.md, setup.sh and the frozen published reference circuitJSON match local SHA256 hashes. Remote main still equals `5951f419c8314b83648d89e1cfb7e29e87e32eb8`. Logs/metadata are in `evidence/R8-components/cloud-linux-smoke-37291506181.{log,json}`; public file verification is in `cloud-public-verification.json` in that evidence directory.

Visible warnings remain recorded: module `U1 has no pin with requires_power=true` (existing issue076), Actions runtime Node20→24 migration notice and action dependency punycode/url.parse deprecations. The fixture export succeeding does not resolve issue076 or qualify the recommended-land discrepancy. No warnings were hidden, no routing/DRC thresholds changed, and no broad historical suites were rerun.

Current setup commands and continuation prompt are in SETUP.md/TASK-PROMPT.md. After repository access is authorized, refresh the picker, select this repo and configure/publish the environment for the Cloud branch using those instructions. Only then claim actual Codex Cloud activation. No secrets need to be added for this public/frozen source workflow.
