# First prototype: RGB ring deferred — 2026-10-07

The user explicitly deferred the complete RGB photo/torch ring for the first
prototype. The active board is restored byte-for-byte to the already native-built
and publicly uploaded **0.3.12-prototype**, source/context commit
`27086a726b6d5f93df350efc5f1575cbdffbeba4`. No new board revision is created.
Circuit JSON SHA256: `cf61cad4bd9972f10607977ab42f06dfe02318f9a42d073d1febe6a3b890f331`.
Restoration is an exact artifact/source rollback after preservation, not a new
router run or a manually repaired Circuit JSON. The original native build receipt
is in `evidence/R8-bottom-silk-2026-10-06/REPRODUCE-COMMANDS.json`.

The 44×56×1mm two-layer shutter-only board retains the right-edge TS24CA shutter,
DOIT ESP32-C3 BLE module, standard USB-C schematic, direct three-pin JST UART,
original battery port, all component explanations and the requested bottom-text
removal. There is no ring connector, ring power stage or ring firmware in the
active design. The entire 21-part ring addition is deferred.

All **18 fresh checks** in check-results.json pass: formatting, types, lightweight
smoke, exact circuit contracts, native DRC/dangling/self-shorts, shorts CLI,
schematic style CLI, electrical contract, independent manufacturing geometry,
physical connectivity, widths/current budgets, Gerber export, assembly export,
archive generation, independent export readback, stencil/mask/silk process and
current visual generation. Actual native browser Style Analysis separately passes
**0 issues**, using the official latest analyzer with TLS verification enabled.
Both PCB faces, both parsed copper layers and all six A4 pages were actually
inspected; image hashes are in visual-review/inspection.json.

Results: **0 native DRC errors, 0 shorts, 0 dangling**, zero independent
manufacturing/process failures; **29/29 physical nets**, all **174 tracks** and
seven current/voltage paths pass. All 91 vias are ordinary top/bottom through vias
with **0.30mm hole/0.45mm pad**. No blind/buried vias or inner copper/power layers.
All 44 identities and 159 pin/value contracts match the qualified original.
All 12 Gerber/drill outputs independently parse and match this same Circuit JSON.
Bottom silkscreen remains empty. Fresh exports are under
`fabrication/R8-ring-deferred-2026-10-07/`.

Fresh official JLCPCB listings on 2026-10-07 confirm all **25 exact identities**
are eligible SMT listings and available-order quantities cover **one board**.
Radio C19949072 remains **3 Available Order Qty** (66 headline In Stock): a
five-board batch requires pre-order. No inventory is reserved or allocated.
Public listing initial-price fitted-parts sum is **USD8.0876**; 10 Basic and 15
Extended identities. This excludes PCB, assembly/loading/stencil/inspection,
MOQ/attrition, battery/harness, shipping and tax; it is not a finished-board quote.
See sourcing-current/sourcing-check.json and budget-listing-inputs.json.

Anonymous public readback confirms the existing 0.3.12-prototype release:
**356 files** and **42 critical byte-for-byte reads** match its staged inventory,
including source, Circuit JSON, BOM/CPL, Gerbers and firmware. No new tsci upload
is required for this unchanged board. The current hosted worker still reports
`pending` with `user_code_job_timeout` / “Build timed out after 30 minutes”.
An uploaded matching native artifact is not a successful hosted compile/preview.
This platform preview failure does not invalidate the independently checked local
board. See registry-public-verification.json for the actual observation.

Native 004/084 warnings and original 075/076 remain explicit: abandoned-module
qualification/import metadata failures are not newly fitted-part failures.
Missing `3V3` power metadata remains a separate importer issue.
Supplier-processed preview/stackup/assembly approval and USB-C shell-anchor
solder coverage remain pending. Physical battery/charging/programming/BLE/iPhone,
RF/thermal/runtime and complete MagSafe enclosure/case fit remain untested.
This is a CAD-validated engineering prototype, not a production or tested-product
approval. No order/payment/assembler upload/supplier contact was performed.

Preservation: all 38 tracked ring-proposal changes were copied and hashed before
restoring their exact base bytes; all 34 new proposal paths were moved without
deletion to `/workspace/r8-led-connector-review/deferred-0.3.13-20261007/checkout/`.
The complete local proposal/failed experiments remain there. Portable source,
firmware and last native-run archives are retained here with hashes in
scope-restoration.json. Archived 0.3.13 and issues099–109 are historical proposals,
not active components or passing evidence. Native45 actually failed125 errors
(123 unconnected,1 dangling,1 autorouting); all outside grid experiments also
failed and were never selected into the board. No passing ring-board claim.

Frozen R7 manifest is 129/129 unchanged; all previously tracked board/source,
imports/baselines/firmware/fabrication/locks/toolchain/setup/smoke/guards match the
base before adding this review. The observed runtime limit is **32GiB/4CPUs**,
not a guaranteed plan allocation. Heavy checks remain serial through
`python3 cloud/run-heavy.py`. No SDK/3D build, environment Publish/share, reset,
force checkout, history rewrite, main change, PR or merge.
