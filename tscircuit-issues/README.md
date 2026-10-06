# Local issue register — magnetic shutter remote R5

All **52** issue reports are retained. [R4 disposition](STATUS-R4.md) remains historical. R5 resolves project grounding (044), printable legend (041), and numeric stencil strategy (037); new local tooling fixes and open investigations are 045-052. Exact USB land qualification (042) and shell process remain open. See [R5 qualification](../R5-QUALIFICATION.md).

These are local reports only. Nothing was submitted to GitHub, suppliers, or an assembler. Confirmed supplier-data discrepancies, manufacturing limits and project audit errors are explicitly distinct from tscircuit defects. “Fixed locally” does not mean fixed upstream.

| Issue | Affected package | Status | Classification |
|---|---|---|---|
| [001 — Three-terminal slide switch inferred as SPST](001-spdt-switch-inferred-as-spst.md) | easyeda-converter 0.0.364 | fixed locally | tscircuit importer classification / missing topology input |
| [002 — Custom transistor symbol omits dynamic reference label](002-transistor-import-missing-reference-label.md) | easyeda-converter 0.0.364 | fixed locally | tscircuit importer rendering |
| [003 — Reference outside symbol bounds loses its owner](003-custom-symbol-reference-owner-outside-bounds.md) | core 0.0.2035 | fixed locally | tscircuit core rendering |
| [004 — Connector import cannot specify verified mating direction](004-connector-mating-direction-metadata.md) | easyeda-converter 0.0.364 | fixed locally | tscircuit importer metadata limitation |
| [005 — Generic USB symbol loses supplier pin arrangement](005-usb-import-generic-symbol-discards-pin-arrangement.md) | easyeda-converter 0.0.364 | fixed locally | tscircuit importer symbol classification |
| [006 — Thermostat category incorrectly inferred as mechanical switch](006-thermostat-category-inferred-as-switch.md) | easyeda-converter 0.0.364 | fixed locally | tscircuit importer classification |
| [007 — Declared oval drill length replaced by inferred equal annulus](007-declared-oval-drill-length-ignored.md) | easyeda-converter 0.0.364 | fixed locally | confirmed tscircuit geometry conversion bug |
| [008 — Core emits PCB fields incompatible with Circuit JSON schema](008-pcb-render-schema-offset-and-optional-hole-fields.md) | core 0.0.2035 | fixed locally | confirmed cross-package schema incompatibility |
| [009 — Schema parsing strips native schematic sheet metadata](009-schematic-sheet-schema-strips-metadata.md) | circuit-json 0.0.509 | fixed locally | confirmed schema metadata omission |
| [010 — Custom symbol ports do not correctly merge repeated physical pads](010-custom-symbol-repeated-pad-port-merging.md) | core 0.0.2035 | fixed locally | confirmed core port association bug |
| [011 — Saved custom-symbol port selector cannot resolve actual port](011-custom-symbol-selector-round-trip.md) | core 0.0.2035 | fixed locally | confirmed core selector bug |
| [012 — Rotation inference rejects submicron supplier row rounding](012-supplier-pin-orientation-submicron-quantization.md) | circuit-json-util 0.0.117 | fixed locally | confirmed orientation classification sensitivity |
| [013 — Plated holes generate unrequested stencil paste on both faces](013-plated-holes-create-unrequested-paste.md) | core 0.0.2035 | fixed locally | confirmed core fabrication geometry bug |
| [014 — Branched route cannot be saved as a simple endpoint path](014-branched-route-cache-path-incomplete.md) | core 0.0.2035 | suspected | observed warning; root cause not confirmed |
| [015 — Manufacturer USB land pattern fails JLC NPTH clearance](015-usb-land-pattern-conflicts-with-npth-process.md) | easyeda-converter 0.0.364 | confirmed | manufacturing limitation, not a tscircuit defect |
| [016 — E73 pin-3 supplier land shifted from manufacturer nominal](016-radio-pin-three-supplier-pitch-discrepancy.md) | easyeda-converter 0.0.364 | confirmed | supplier CAD discrepancy, not a converter bug |
| [017 — Project drill audit uses one threshold and omits tracks and pours](017-blanket-drill-pad-check-misclassification.md) | project manufacturing-audit.py R2 | fixed locally | project checker mistake, not a tscircuit defect |
| [018 — Gerbonara cannot parse native exported G85 plated slots](018-g85-plated-slot-reader-unsupported.md) | Gerbonara 1.5.0 | confirmed | external reader limitation; exporter defects tracked separately in 024/025 |
| [019 — Supplier download CLI exits zero after a failed lookup](019-download-cli-reports-success-on-failure.md) | easyeda-converter 0.0.364 | fixed locally | confirmed tscircuit CLI error propagation bug |
| [020 — Part search returns unrelated results for exact-looking MPN query](020-search-query-returns-unrelated-parts.md) | CLI 0.1.2212 / search service | suspected | retrieval/service behavior; not a confirmed importer bug |
| [021 — Fanout points are created before custom-symbol ports and trace identities initialize](021-fanout-created-before-source-port-initialization.md) | @tscircuit/core 0.0.2035 | fixed locally | tscircuit render-phase ordering defect |
| [022 — Adding saved fanout points removes custom-symbol owner-aware port aliases](022-saved-fanout-invalidates-custom-symbol-port-selectors.md) | @tscircuit/core 0.0.2035 | fixed locally | tscircuit selector-cache invalidation defect |
| [023 — Fanout solver treats a schematic sheet as its PCB routing group](023-fanout-treats-schematic-sheet-as-routing-group.md) | @tscircuit/core 0.0.2035 | fixed locally | tscircuit PCB/schematic container integration defect |
| [024 — USB plated slots export as ambiguous separate G85 records](024-excellon-g85-slot-record-and-mode-export.md) | circuit-json-to-gerber 0.0.104 bundled in CLI 0.1.2212 | fixed locally | tscircuit manufacturing exporter defect |
| [025 — Excellon header marker appears after the end of the drill program](025-excellon-header-after-end-of-program.md) | circuit-json-to-gerber 0.0.104 bundled in CLI 0.1.2212 | verified fixed upstream | tscircuit exporter defect fixed in upstream release |
| [026 — Declared autorouter traceClearance does not affect native routing input](026-autorouter-trace-clearance-not-consumed.md) | @tscircuit/core 0.0.2035 | confirmed | confirmed unused configuration; intended API semantics need upstream confirmation |
| [027 — Native routing returns copper with real shorts and manufacturing clearance failures](027-native-routing-output-has-shorts-and-clearance-failures.md) | @tscircuit/core 0.0.2035 local R3 patches | suspected | observed failed output; algorithm root cause not established |
| 028 | @tscircuit/core 0.0.2035 | fixed locally | [Transparent group schema](028-transparent-group-invalid-circuit-json.md) |
| [029 — Strict placement export cannot orient a supplier connector with no terminal named pin1](029-supplier-rotation-requires-pin-one.md) | pnp-csv 0.0.16 / util 0.0.117 | confirmed | See report for classification |
| [030 — Native browser evaluation did not include the locally corrected core](030-native-viewer-and-local-engine-diverge.md) | runframe 0.0.2883 / eval 0.0.1506 | fixed locally | See report for classification |
| [031 — Saved fanout rejects a valid bottom-layer escape from a through-plated terminal](031-saved-fanout-plated-terminal-layer.md) | core 0.0.2035 | fixed locally | See report for classification |
| [032 — Relative GLB output is resolved under the input directory](032-cli-relative-glb-output-path.md) | CLI 0.1.2212 | suspected | See report for classification |
| [033 — Native development viewer recursively loads task tooling and its own output log](033-viewer-watches-task-archives-and-own-log.md) | Project viewer configuration | confirmed | See report for classification |
| [034 — Local package archive reuse and missing installed core binary](034-local-archive-dependency-binary-stale.md) | Bun 1.3.9 / local archive integration | suspected | See report for classification |
| [035 — Global route between saved fanout exits loses source-trace attribution](035-global-route-between-fanouts-loses-net-attribution.md) | core 0.0.2035 | fixed locally | See report for classification |
| [036 — Independent manufacturing checker missed internal port connections and physical pad junctions](036-independent-checker-internal-pads-and-net-recursion.md) | Project manufacturing checker | fixed locally | See report for classification |
| [037 — Default generated charger stencil differs from TI example](037-default-charger-stencil-discrepancy.md) | core 0.0.2035 / stencil process | fixed locally (R5) | See report for classification |
| [038 — Project CAM paste baseline](038-project-cam-check-compares-paste-to-copper.md) | Project R3 / affected tools in report | fixed locally | Project checker mistake |
| [039 — Dock stop interference](039-project-dock-stop-overlaps-remote.md) | Project R3 / affected tools in report | fixed locally | Mechanical design mistake |
| [040 — Asymmetric carrier tabs](040-project-battery-carrier-tab-origin-offset.md) | Project R3 / affected tools in report | fixed locally | Mechanical design mistake |
| [041 — Legend manufacturing limits](041-imported-legend-exceeds-fabrication-print-rules.md) | Project R3 / affected tools in report | fixed locally (R5) | Manufacturing limitation |
| [042 — HCTL copper lands exceed manufacturer reference tolerance](042-hctl-expanded-copper-land-qualification.md) | Supplier library / importer 0.0.364 boundary | confirmed | Supplier land-pattern qualification, not importer conversion bug |
| [043 — Registration checker assumes direct board-relative components](043-project-registration-assumes-direct-board-frame.md) | Project audit added after b01c1d5; input core 0.0.2035 / schema 0.0.509 | fixed locally | Project checker mistake, not a tscircuit defect; group-anchor regression added |
| [044 — Charger solid-ground-plane requirement unqualified](044-charger-solid-ground-plane-qualification-gap.md) | Project b01c1d5 / TI SLUSF65B / core 0.0.2035 | fixed locally (R5) | Project layout qualification gap; connected GND traces are not a solid plane; not a tscircuit bug |

## R5 additions

| Issue | Affected package | Status | Classification |
|---|---|---|---|
| [045-independent-copper-reader-lacks-brep-regions — Independent checker cannot read native BREP copper pours](045-independent-copper-reader-lacks-brep-regions.md) | Project manufacturing audit / review reader; Gerbonara 1.5.0; Shapely 2.1.2 | fixed locally | Project checker limitation, not a tscircuit defect |
| [046-parent-stencil-margin-cannot-style-imports — Parent stencil styling unavailable for immutable supplier footprints](046-parent-stencil-margin-cannot-style-imports.md) | @tscircuit/props 0.0.672 base f136fe4178b5b5ca80efb314b4fc3679ed068c61; @tscircuit/core 0.0.2035 base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0 | fixed locally | Missing API capability, not supplier footprint corruption |
| [047-silkscreen-path-ignores-parent-visibility — Native silkscreen paths ignore inherited pcbSx visibility](047-silkscreen-path-ignores-parent-visibility.md) | @tscircuit/core 0.0.2035 local R3 attribution base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0; props 0.0.672 | fixed locally | Confirmed core style integration inconsistency |
| [048-board-owned-silkscreen-fails-schema — Native board-level silkscreen has no valid schema owner](048-board-owned-silkscreen-fails-schema.md) | @tscircuit/core 0.0.2035; circuit-json 0.0.509 local sheet schema; exact local source/archives in tooling/revisions-r5.json | fixed locally | Confirmed core/schema integration defect |
| [049-pour-npth-clearance-smaller-than-request — Requested pour clearance is smaller in actual NPTH copper geometry](049-pour-npth-clearance-smaller-than-request.md) | @tscircuit/core 0.0.2035; @tscircuit/copper-pour-solver 0.0.62; circuit-json 0.0.509 | suspected | Confirmed geometry discrepancy; responsible package/root cause not yet confirmed |
| [050-usb-alternative-supplier-land-mismatches — Additional USB-C supplier libraries differ from manufacturer land drawings](050-usb-alternative-supplier-land-mismatches.md) | easyeda-converter 0.0.364 local R3 supported pipeline; raw supplier libraries C456012/C668623/C3151650 | confirmed | Supplier data discrepancies; not confirmed tscircuit converter bugs |
| [051-length-parser-accepts-nonfinite-invalid-unit — Length parser returns NaN for an invalid unit string](051-length-parser-accepts-nonfinite-invalid-unit.md) | circuit-json 0.0.509; @tscircuit/props 0.0.672 | confirmed | Confirmed unit parser behavior; broad upstream fix remains open |

R4 remains immutable in the source directory. Issue 043 regressions are retained. R5 closes the project grounding/legend gaps only after final actual-copper and export checks; issue 042 USB supplier qualification remains open. Physical validation is POST-PROTOTYPE PHYSICAL VALIDATION.

| [052 — Historical USB pin table stale after connector change](052-historical-usb-pin-table-stale-after-connector-change.md) | Project R2 report / R4 baseline | fixed locally | Project documentation mistake; actual wiring correct |

R5 HCTL-only follow-up (2026-10-02): issue 042 reused; no new issue numbers. Exact drawings reconfirm recommended copper widths, fresh LCSC PDF equals saved Rev A, and no exact thermal/profile/manual limits or four-shell-joint coverage were found. Historical shell-height question transcription corrected in new qualification text; old evidence preserved. [Current source register](../fabrication/HCTL-SOURCE-REGISTER.md), [unsent attachment](../fabrication/HCTL-QUALIFICATION-PACKAGE.pdf). Supplier acceptance remains blocked; no tscircuit copper defect newly confirmed.


## R6 additions and qualification history

R5/R4 reports remain historical; R6 prototype-only process disposition is in `../R6-QUALIFICATION.md`. Production approval is not implied.

| Issue | Affected package | Status | Report |
|---|---|---|---|
|060|circuit-json-to-pnp-csv 0.0.19|fixed locally|[Strict CPL export requires numeric pin1 on a valid labelled connector](060-strict-cpl-export-requires-numeric-pin1.md)|
|061|circuit-json-to-gerber 0.0.109|fixed locally|[Gerber CLI runtime imports declared only as development dependencies](061-gerber-cli-runtime-dependencies-undeclared.md)|
|062|@tscircuit/cli 0.1.2212 → local0.1.2237|fixed locally|[CLI Gerber shorts check uses an exporter without polygon paste support](062-shorts-cli-bundles-incompatible-polygon-paste-exporter.md)|
|063|@resvg/resvg-js 2.6.2|suspected|[Resvg panics when rasterizing a tightly cropped dense CAM SVG](063-resvg-panics-on-tight-cam-svg-crop.md)|

[USB4215 issues053–059](../evidence/USB4215-import-audit/tscircuit-issues/README.md) preserve the paste/mask/schema/renderer/CAM fixes and33baseline importer failures. These local reports and original inputs are included in the R6editable package. No report was deleted or published.

|[064 — Native viewer version labels stale](064-viewer-version-labels-stale-after-release.md)|@tscircuit/pcb-viewer1.11.415 /3d-viewer0.0.610|confirmed|Published build metadata mismatch; no geometry impact established|

|[065 — Copied secondary previews stale](065-r6-clone-retains-stale-secondary-previews.md)|Project release inventory /CLI0.1.2237|fixed locally|Current native BOTTOM regenerated; stale copied previews excluded|


## R7 investigation and shutter-only order review — 2026-10-04

All earlier reports remain retained, including053–059 under the USB import-audit issue directory. Torch work is cancelled;067–072 include historical investigation, not newly fitted hardware. A confirmed supplier discrepancy is not called a tscircuit bug.

|Issue|Affected package / scope|Status|
|---|---|---|
|[066 — Preview imports incompatible with locked native viewers](066-preview-imports-incompatible-with-locked-viewers.md)|Project preview integration; @tscircuit/pcb-viewer 1.11.415, schematic-viewer 2.0.99, 3d-viewer 0.0.610|fixed locally|
|[067 — Default LED paste scaling differs from manufacturer stencil recommendation](067-led-default-paste-does-not-match-manufacturer-recommendation.md)|Project stencil selection / core 0.0.2035 default paste scaling|confirmed|
|[068 — AL1793 supplier copper differs from manufacturer land pattern](068-al1793-supplier-land-pattern-discrepancy.md)|Supplier library data; easyeda converter0.0.364 reproduces the supplier model|confirmed|
|[069 — Angular LED rotation and port association investigation](069-led-angular-rotation-and-port-investigation.md)|core0.0.2035 / importer0.0.364; project emitter placement|suspected|
|[070 — Filled circular-arc paste region rejected by supported importer](070-curved-filled-paste-import-rejected.md)|easyeda0.0.364, extends USB4215 fixed commit2f52a09 on qualification/usb4215-paste-fidelity; local R7 archive is separately hashed|fixed locally|
|[071 — Mixed pad shapes use inconsistent Y bounds and port grouping](071-mixed-smtpad-bounds-y-convention.md)|@tscircuit/core0.0.2035; extends qualified USB toolchain8c7d5a5; local archive hashed separately|fixed locally|
|[072 — JST eight-position connector shell lands disagree with catalogue](072-jst8-shell-pad-dimensions-disagree-with-catalogue.md)|Supplier CAD data; easyeda0.0.364 import preserves supplied geometry|confirmed|
|[073 — CLI bundle retains older importer despite dependency override](073-cli-bundled-importer-ignores-external-override.md)|@tscircuit/cli0.1.2237 plus easyeda0.0.364 local parser extension|fixed locally|
|[074 — Protected historical R5 DFM-review archive missing](074-historical-protected-r5-archive-missing.md)|Project evidence preservation; no tscircuit package blamed|confirmed|

## R8 ESP32-C3 qualification — 2026-10-05

Earlier reports are retained unchanged from the R7 source directory. Historical evidence not copied into R8 remains in the preserved R7 project; this R8 working directory is not a complete historical release archive. The two reports below include their active local inputs and evidence.

|Issue|Affected package / scope|Status|
|---|---|---|
|[075 — ESP32-C3 outer lands differ from recommendation](075-esp32-c3-supplier-lands-differ-from-espressif-recommendation.md)|Supplier CAD C2934560; easyeda 0.0.364 faithfully preserves it|confirmed discrepancy on abandoned WROOM candidate; does not block qualified DOIT C3 alternative; not a confirmed tscircuit bug|
|[076 — Numeric supply label lacks power metadata](076-numeric-supply-pin-not-inferred-as-power.md)|easyeda 0.0.364 power-label inference; CLI 0.1.2237 local integration|project fixture corrected using verified pinAttributes; upstream omission remains open|
|[077 — Import download saves HTTP error bodies as CAD assets](077-import-download-saves-http-error-bodies.md)|CLI 0.1.2237 download-cad-model-assets.ts|confirmed download-validation defect; blocked assets preserved, not usable|
|[078 — TPS63031 supplier lands differ from TI example](078-tps63031-supplier-lands-differ-from-ti-example.md)|Supplier CAD C15516; faithful supported conversion|confirmed example-land variation; engineering prototype accepted with geometry/paste evidence|
|[079 — SWPA3015 supplier lands differ from Sunlord recommendation](079-swpa3015-supplier-lands-differ-from-sunlord-recommendation.md)|Supplier CAD C56594; faithful supported conversion|confirmed example-land variation; fitted for engineering prototype after geometry/electrical qualification|
|[080 — Live supplier search returns unrelated parts](080-live-supplier-search-returns-unrelated-parts.md)|Live jlcsearch search service,2026-10-05|confirmed response mismatch; backend cause unverified|
|[081 — Routed output can violate requested clearances](081-routed-output-violates-clearances.md)|capacity-autorouter0.0.951 / native core integration|confirmed on retained R8 routes; final C3 native/independent checks0 via safe source-level routing|
|[082 — Pinned Zephyr C2 board support does not include BLE](082-zephyr-c2-board-support-lacks-ble.md)|Zephyr4.2.0 / pinned hal_espressif|confirmed hosted build failure; qualified compatible DOIT C3 alternative selected|
|[083 — Mask margin cannot be selected through pcbSx](083-mask-margin-cannot-be-selected-through-pcb-sx.md)|props0.0.672/core0.0.2035 styling API|locally fixed and tested in separately hashed R8 runtime archives; supplier copper preserved|
| [084](084-discrete-mosfet-import-triggers-ic-warnings.md) | Discrete MOSFET import triggers generic IC warnings | Model/checker classification; nonblocking for reviewed C8545 connections |

- [085 — Offset polygon pad component/CAD/CPL bounds](085-offset-polygon-pad-component-bounds.md): confirmed generic core bug; project-local correction and4-rotation regression,11focused tests pass; no supplier import edits.

- [086 — Missing polygon support-land paste](086-polygon-support-lands-missing-solder-paste.md): confirmed core emitter omission; locally corrected with19 focused regressions; retained original TS24CA failure, current export qualification tracked separately.
- [087 — Independent polygon reader x/y failure](087-independent-polygon-reader-requires-xy.md): project checker defect fixed from original vertices, unchanged thresholds.

- [088 — ALPS locating-hole/copper clearance](088-alps-side-switch-npth-copper-clearance.md): exact supplier/manufacturer lands fail unchanged NPTH minima; candidate rejected, not patched.

- [089 — Full native silk omitted by text-only process audit](089-project-process-audit-omits-nontext-silk.md): project audit coverage fixed; full exported layers now checked, original supplier-circle print failure retained.
- [090 — Silkscreen circle ignores inherited visibility](090-silkscreen-circle-ignores-pcb-sx-visibility.md): generic core primitive fix;2 failing controls,22 focused tests/286 assertions pass; separate source overlay/runtime archive.
- [091 — Tangent pour cutouts produce invalid ring](091-tangent-pour-cutouts-produce-invalid-ring.md): confirmed native-pour/independent-reader topology incompatibility; original input retained, meaningful source clearance separation under revalidation; no upstream engine fix claimed.
- [092 — Power-width review omitted switching ripple](092-power-width-review-omits-switching-ripple.md): project audit coverage defect; old DC-only neck retained, physical switching paths and RMS budgets added, authored VIN/L1/L2 necks widened for revalidation.
- [093 — Process audit omitted overlapping legends](093-process-audit-omits-overlapping-legends.md): real PAIR/POWER collision caught visually; source label moved, same-layer readability check and original-native regression added.

- [094 — Named schematic pin arrangement produces invalid Circuit JSON](094-named-schematic-arrangement-produces-invalid-json.md): pinned core/schema mismatch; supported numeric board-level arrangement used, original failed input retained.
