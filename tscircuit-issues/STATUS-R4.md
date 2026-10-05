# Issue disposition summary — R4

Qualification follow-up, 2026-10-02: all 42 original reports below remain. New **043** is a resolved project-registration checker mistake. New **044** is a confirmed project layout qualification gap: TI requires a solid ground plane, while the current layout has pads/traces only. No new confirmed tscircuit bug or measured thermal failure is claimed. Reports **037, 041, 042** now link deeper manufacturer/process review. The [qualification record](../R4-QUALIFICATION.md) supersedes broad statements about an unexplained placement-origin error or mandatory equality to TI's stencil example. **44 reports** are now indexed. Original grouped R4 evidence below is preserved as the historical baseline.

| Follow-up issue | Current disposition | Release status |
|---|---|---|
| [043 — Direct-board-frame checker assumption](043-project-registration-assumes-direct-board-frame.md) | Explicit zero group anchors and correct source-anchor/centroid distinction; regression verified | **FIXED — REGRESSION VERIFIED** |
| [044 — Charger solid-ground-plane qualification](044-charger-solid-ground-plane-qualification-gap.md) | Obtain an authoritative TI application deviation, or implement the required plane through supported source after component qualification and fully revalidate | **BLOCKED — SUPPLIER CONFIRMATION REQUIRED** |

**Preserved original baseline: 42 reports.** Source-bug status in the index is distinguished from the current-board disposition below. A resolved current-board problem does not claim a generic upstream fix; follow-up additions and current dispositions are above.

| Issue / report | R4 group | Current disposition |
|---|---|---|
| [001 — Three-terminal slide switch inferred as SPST](001-spdt-switch-inferred-as-spst.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [002 — Custom transistor symbol omits dynamic reference label](002-transistor-import-missing-reference-label.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [003 — Reference outside symbol bounds loses its owner](003-custom-symbol-reference-owner-outside-bounds.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [004 — Connector import cannot specify verified mating direction](004-connector-mating-direction-metadata.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [005 — Generic USB symbol loses supplier pin arrangement](005-usb-import-generic-symbol-discards-pin-arrangement.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [006 — Thermostat category incorrectly inferred as mechanical switch](006-thermostat-category-inferred-as-switch.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [007 — Declared oval drill length replaced by inferred equal annulus](007-declared-oval-drill-length-ignored.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [008 — Core emits PCB fields incompatible with Circuit JSON schema](008-pcb-render-schema-offset-and-optional-hole-fields.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [009 — Schema parsing strips native schematic sheet metadata](009-schematic-sheet-schema-strips-metadata.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [010 — Custom symbol ports do not correctly merge repeated physical pads](010-custom-symbol-repeated-pad-port-merging.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [011 — Saved custom-symbol port selector cannot resolve actual port](011-custom-symbol-selector-round-trip.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [012 — Rotation inference rejects submicron supplier row rounding](012-supplier-pin-orientation-submicron-quantization.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [013 — Plated holes generate unrequested stencil paste on both faces](013-plated-holes-create-unrequested-paste.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [014 — Branched route cannot be saved as a simple endpoint path](014-branched-route-cache-path-incomplete.md) | OPEN — NON-BLOCKING | Global endpoint-cache warning; cache not consumed; actual copper checked |
| [015 — Manufacturer USB land pattern fails JLC NPTH clearance](015-usb-land-pattern-conflicts-with-npth-process.md) | RESOLVED | Rejected GCT connector replaced in current board; historical geometry remains failing |
| [016 — E73 pin-3 supplier land shifted from manufacturer nominal](016-radio-pin-three-supplier-pitch-discrepancy.md) | OPEN — NON-BLOCKING | Retained supplier pin3 offset reviewed; current landing audit accepted to stated assumptions; RF pending |
| [017 — Project drill audit uses one threshold and omits tracks and pours](017-blanket-drill-pad-check-misclassification.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [018 — Gerbonara cannot parse native exported G85 plated slots](018-g85-plated-slot-reader-unsupported.md) | TOOLCHAIN WORKAROUND | Use pcb-tools original G85/G05 readback; Gerbonara limitation remains |
| [019 — Supplier download CLI exits zero after a failed lookup](019-download-cli-reports-success-on-failure.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [020 — Part search returns unrelated results for exact-looking MPN query](020-search-query-returns-unrelated-parts.md) | OPEN — NON-BLOCKING | Discovery service suspected; every current part sourced by exact verified identity |
| [021 — Fanout points are created before custom-symbol ports and trace identities initialize](021-fanout-created-before-source-port-initialization.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [022 — Adding saved fanout points removes custom-symbol owner-aware port aliases](022-saved-fanout-invalidates-custom-symbol-port-selectors.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [023 — Fanout solver treats a schematic sheet as its PCB routing group](023-fanout-treats-schematic-sheet-as-routing-group.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [024 — USB plated slots export as ambiguous separate G85 records](024-excellon-g85-slot-record-and-mode-export.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [025 — Excellon header marker appears after the end of the drill program](025-excellon-header-after-end-of-program.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [026 — Declared autorouter traceClearance does not affect native routing input](026-autorouter-trace-clearance-not-consumed.md) | OPEN — NON-BLOCKING | Unused setting disclosed; actual solver limits/geometry checked |
| [027 — Native routing returns copper with real shorts and manufacturing clearance failures](027-native-routing-output-has-shorts-and-clearance-failures.md) | OPEN — NON-BLOCKING | Earlier failed routes retained; final current copper passes; generic root cause unknown |
| [028 — Transparent groups emit schema-invalid Circuit JSON](028-transparent-group-invalid-circuit-json.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [029 — Strict placement export cannot orient a supplier connector with no terminal named pin1](029-supplier-rotation-requires-pin-one.md) | OPEN — NON-BLOCKING | Rejected alternate no-pin1 connector; current exact J1 strict orientation passes |
| [030 — Native browser evaluation did not include the locally corrected core](030-native-viewer-and-local-engine-diverge.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [031 — Saved fanout rejects a valid bottom-layer escape from a through-plated terminal](031-saved-fanout-plated-terminal-layer.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [032 — Relative GLB output is resolved under the input directory](032-cli-relative-glb-output-path.md) | TOOLCHAIN WORKAROUND | Supported GLB command uses absolute output path |
| [033 — Native development viewer recursively loads task tooling and its own output log](033-viewer-watches-task-archives-and-own-log.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [034 — Local package archive reuse and missing installed core binary](034-local-archive-dependency-binary-stale.md) | TOOLCHAIN WORKAROUND | Unique locked local archives and canonical installation; no stale-package assumption |
| [035 — Global route between saved fanout exits loses source-trace attribution](035-global-route-between-fanouts-loses-net-attribution.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [036 — Independent manufacturing checker missed internal port connections and physical pad junctions](036-independent-checker-internal-pads-and-net-recursion.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [037 — Default generated charger stencil differs from TI example](037-default-charger-stencil-discrepancy.md) | OPEN — FABRICATION BLOCKER | Exact R4 gate and required action in blocker table below |
| [038 — Project CAM review incorrectly assumes solder paste equals SMT copper](038-project-cam-check-compares-paste-to-copper.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [039 — Project dock stop overlaps the docked remote envelope](039-project-dock-stop-overlaps-remote.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [040 — Project carrier tab origin makes battery clearance asymmetric](040-project-battery-carrier-tab-origin-offset.md) | RESOLVED | See exact existing report; fix and regression evidence preserved |
| [041 — Faithful imported legend exceeds selected manufacturing print rules](041-imported-legend-exceeds-fabrication-print-rules.md) | OPEN — FABRICATION BLOCKER | Exact R4 gate and required action in blocker table below |
| [042 — HCTL supplier copper lands exceed manufacturer reference tolerance](042-hctl-expanded-copper-land-qualification.md) | OPEN — FABRICATION BLOCKER | Exact R4 gate and required action in blocker table below |

| Open fabrication blocker | Exact evidence / affected artifact | Required action | Responsible process | Blocks prototype ordering? |
|---|---|---|---|---|
| USB lands (042) | [USB table](../fabrication/USB-FOOTPRINT-REVIEW.md): VBUS .7599934 vs .70±.05; shell 1.0999978 vs .90±.05; current F_Cu, mask and J1 import | Qualified deviation or corrected upstream supplier import; clarify missing/undimensioned manufacturer details | Supplier land-pattern authority / project qualification engineer | YES |
| USB shell process | [Assembly review](../fabrication/ASSEMBLY-REVIEW.md): four plated slots, zero paste; operating rating is not solder profile | Qualify selected secondary manual process, temperature/dwell/materials and four shell-joint coverage | Connector process authority / prototype finishing operator | YES |
| Stencil (037) | [Stencil review](../fabrication/STENCIL-REVIEW.md): current .14×.35 leads and 1.05×.63 EP differ from TI DLH; actual F_Paste | Supported source-level qualified apertures/thickness or approved engineered stencil disposition for all packages | Project stencil integration / stencil engineer | YES |
| Functional legend (041) | [Glyph audit](../evidence/R4/functional-legend-review.json): .09 strokes, <1 local glyph height, six refs below .15 mask gap; F_SilkScreen | Correct functional legend using supported source settings or reviewed CAM output | Project source / legend CAM engineer | YES |
| Setup / registration | [37-row audit](../fabrication/BOM-CPL-REVIEW.md); J1 centroid differs from anchor; overhanging connector/slider; Standard+radio X-ray | Confirm fixture/panel/mating clearance and actual supplier placement registration | Assembler engineering / fixture process | YES |

## PHYSICAL TEST PENDING / NOT RUN

Battery/charge/protection, temperature gradients and thermal faults, harness polarity, physical assembly/joints, RF docked/detached, enclosure/magnet/button fit, runtime, programming and exact iPhone/Android Camera behavior remain pending until a prototype exists. These are not failed checks and do not alone block first prototype fabrication after the pre-fabrication gates close.

No supplier/assembler/GitHub issue was contacted or published. Hardware tests are acceptance requirements, not fabricated evidence.
