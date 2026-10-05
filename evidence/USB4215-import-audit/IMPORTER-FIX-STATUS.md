# USB4215 importer/toolchain fix status

**FIXED LOCALLY for the focused supplier-fidelity path. NOT an upstream release or full-suite pass.**

## Separate history

The importer changes belong to `tscircuit/easyeda-converter` (`easyeda` 0.0.364; upstream/R5 lineage commit `140046d000238f3d6c8611989682efb2872f25a9`). Original control source includes earlier preserved R4/R5 local fixes; it is not claimed to be a clean upstream tree.

Independent local importer repository: `frozen-toolchain/easyeda-converter`. Branch: `qualification/usb4215-paste-fidelity`. Control snapshot commit: `7910eedb8f0635ed941ea634b64c1f9874c437fc`. Fixed snapshot commit: `2f52a09b4293b2802f837f6350c37fb55c2198a5`. These are new archival commits from the already-tested original/fixed source archives, not retroactive upstream commits. No board history was committed or changed. No remotes are configured and no pushes/publications occurred; the current request explicitly prohibits board publication.

All seven packages have separate source-only local histories, clean working trees and changed-file/hash sets verified against the preserved ledger:

| Package / version | Local control snapshot commit | Local fixed snapshot commit |
|---|---|---|
| circuit-json 0.0.509 | `cbe856dbea5b3f8ff87d029b549a9ab1799d647e` | `3d53adfff06cd1b293b44a328c9b82563691a3e3` |
| props 0.0.672 | `d63db2cfd7cd5106266780541290c89970dfa2bf` | `0a745834f9fb983d9f839db7a04048e63ecf290b` |
| circuit-json-util 0.0.117 | `1f092e3076de5a1e3bec36f2eddf1f62209b78e5` | `4a7df655b270014cc218b0ab573a8e34828867d9` |
| core 0.0.2035 | `12f8e94e36a81f4e68fccecc06b6fce891303dd0` | `8c7d5a5db505dcb8552fb963313ed24225598a53` |
| easyeda-converter 0.0.364 | `7910eedb8f0635ed941ea634b64c1f9874c437fc` | `2f52a09b4293b2802f837f6350c37fb55c2198a5` |
| circuit-json-to-gerber 0.0.109 | `ba50bcb8b6c175bdabe6e1ce13df27f2914c1a5e` | `e855f6a42f36b59059d8dc0a62627250dbbb8d12` |
| circuit-to-svg 0.0.433 | `735bf0f75c003ce38ca98683856bfc0b3fa2a282` | `9d243f1c667145e446e8c231c424e64e4b6dabfc` |

[Machine-readable branch/commit/files register](frozen-toolchain-history.json), [original/fixed source ledger](source-change-ledger.json), [original archives and patches](REPRODUCE.md). Original archives, failing inputs, logs and previous evidence are unchanged. The locked working runtime remains that in [working-dependency-manifest.json](working-dependency-manifest.json); no frozen R5 dependencies changed.

## FIXED

- Filled TOP/BOTTOM paste polygons preserved through native schemas/props/primitives.
- PAD paste settings preserved, including negative expansion suppressing automatic paste.
- PAD mask settings preserved, including source 0.0508 mm margins.
- Schema/transform propagation, rendering and native Gerber export corrected.
- USB4215 focused geometry regression: **2 tests, 7,685 assertions PASS** (1,255 minimal + 6,430 checks over 48 existing source fixtures).
- All 16 source apertures remain exact through final TOP CAM: 12 contact + four shell; no duplicates/merging. Maximum contour discrepancy 0.000000565686 mm.

Tests added: `tests/explicit-paste-regions.test.ts`, `tests/source-paste-mask-field-fidelity.test.ts`, plus native core transform/routing, util transform, Gerber and SVG polygon tests recorded below. Existing expectations were updated only for independently source-verified paste/mask content; unrelated failures were not waived. [Focused importer log](logs/focused-importer-final.log), [render/export evidence](README.md), [source patch verification](logs/source-patch-verification-final.json).

## NOT CLAIMED

**Full importer test suite passing is NOT claimed.** Focused USB4215/importer regression passes; **33 unrelated/baseline full-suite failures remain**. They are unrelated to this focused gate by case coverage, not all root-cause-triaged. Corrected full run: 278 pass / 33 fail, 311 tests. Paired unchanged-source run: 237 pass / 72 fail, 309 tests. All 33 remaining failing names also occur in the control; name parity does not prove identical root causes or waive failures. The general toolchain release gate remains blocked.

No broad suite was rerun in this external-process documentation run. [Full fixed log](logs/importer-final-qualified-suite.log), [control log](logs/baseline-final-qualified-suite.log), [comparison](logs/suite-comparison-final-qualified.json), [original case register](logs/unresolved-suite-failures.json), [exact 33-case index](external-process-review/BASELINE-33-FAILURES.json), [untriaged report](tscircuit-issues/059-full-importer-suite-residual-failures.md). The original case register has 66 rows because it includes both execution failures and Bun's repeated summary; this new table lists each exact failing test once. Original evidence is unchanged.

| # | Exact test input/file | Exact failing test name |
|---|---|---|
| 1 | `tests/convert-to-ts/C5378731-to-ts.test.ts` | imports C5378731 supplier fabrication notes into its footprint string |
| 2 | `tests/convert-to-ts/package-rect-field-order-and-stroke-units.test.ts` | preserves package RECT layer and line-width fields with correct stroke units |
| 3 | `tests/convert-to-ts/C2941005-to-ts.test.ts` | renders the C2941005 schematic and PCB |
| 4 | `tests/convert-to-ts/C136720-to-ts.test.ts` | should convert C136720 slide switch into a switch component with pin labels |
| 5 | `tests/convert-to-ts/C49234237-to-ts.test.ts` | converts C49234237 into a pushbutton component |
| 6 | `tests/convert-to-ts/C9900017879-to-ts.test.ts` | should convert C9900017879 into typescript file |
| 7 | `tests/convert-to-ts/C2828420-to-ts.test.ts` | should convert C2828420 diode with metadata-derived pin labels |
| 8 | `tests/convert-to-ts/C19943592-pin1-footprint-repro.test.ts` | renders the C19943592 pin 1 rectangular footprint pad |
| 9 | `tests/convert-to-ts/C2998002-to-ts.test.ts` | should convert C2998002 into typescript file |
| 10 | `tests/convert-to-ts/C51950748-to-ts.test.ts` | should convert C51950748 into typescript file |
| 11 | `tests/convert-to-ts/c165948-multiple-pin-aliases.test.ts` | preserves all C165948 pin aliases in generated TSX |
| 12 | `tests/convert-to-ts/C488251-pcb-view-repro.test.ts` | renders the C488251 PCB view |
| 13 | `tests/convert-to-ts/C2055640-to-ts.test.ts` | C2055640 should preserve courtyard outlines when round-tripping through TSX |
| 14 | `tests/convert-to-ts/C22446580.test.ts` | should convert C22446580 into typescript file |
| 15 | `tests/convert-to-ts/C139797-to-ts.test.ts` | should convert C139797 tactile switch into a pushbutton component |
| 16 | `tests/convert-to-ts/C8545-to-ts.test.ts` | repro: imports C8545 with its custom schematic symbol |
| 17 | `tests/convert-to-ts/C490691-active-low-labels.test.ts` | preserves C490691 trailing-hash active-low pin names |
| 18 | `tests/convert-to-ts/c472489-slash-separated-pin-label.test.ts` | preserves C472489 slash-separated pin 20 label |
| 19 | `tests/convert-to-ts/C8598-to-ts.test.ts` | should normalize decorated C8598 diode polarity labels |
| 20 | `tests/convert-to-ts/c2943786-to-ts.test.ts` | should import C2943786 into a snapshotted typescript component |
| 21 | `tests/convert-to-ts/additional-payload-variants.test.ts` | renders a payload with issue #464 variants |
| 22 | `tests/convert-to-ts/C55266-power-distribution-switch.test.ts` | renders the C55266 schematic and PCB |
| 23 | `tests/convert-to-ts/C5248081-to-ts.test.ts` | should convert C5248081 into typescript file |
| 24 | `tests/convert-to-ts/C2879827-to-ts.test.ts` | C2879827 preserves the board cutout in generated component TSX |
| 25 | `tests/convert-to-ts/C2886621-to-ts.test.ts` | should convert C2886621 into typescript file |
| 26 | `tests/convert-to-ts/C113367-to-ts.test.ts` | should convert C113367 into typescript file |
| 27 | `tests/convert-to-ts/C60708-to-ts.test.ts` | should convert C60708 into typescript file |
| 28 | `tests/convert-to-ts/C472489-to-ts.test.ts` | should convert C472489 into typescript file |
| 29 | `tests/convert-to-ts/C2652953-to-ts.test.ts` | should convert C2652953 into typescript file |
| 30 | `tests/convert-to-ts/l0805-inductors-detected-as-chips.test.ts` | reproduces C1046 L0805 inductor being generated as a generic chip |
| 31 | `tests/convert-to-ts/l0805-inductors-detected-as-chips.test.ts` | reproduces C281113 L0805 inductor being generated as a generic chip |
| 32 | `tests/convert-to-soup-tests/silkscreen-text-rotation.test.ts` | preserves rotated silkscreen text in the PCB snapshot |
| 33 | `tests/fetch-tests/c41430893.test.ts` | C41430893 should generate Circuit Json without errors |

## Changed source and test files

- `circuit-json/src/pcb/pcb_solder_paste.ts`
- `props/generated/COMPONENT_TYPES.md`
- `props/generated/PROPS_OVERVIEW.md`
- `props/lib/components/solderpaste.ts`
- `circuit-json-util/lib/transform-soup-elements.ts`
- `circuit-json-util/tests/transform-paste-polygon.test.ts`
- `core/lib/components/index.ts`
- `core/lib/components/primitive-components/SolderPaste.ts`
- `core/lib/fiber/intrinsic-jsx.ts`
- `core/lib/utils/autorouting/getSimpleRouteJsonFromCircuitJson.ts`
- `core/tests/__snapshots__/solderpaste-polygon-transform-pcb.snap.png`
- `core/tests/__snapshots__/solderpaste-polygon-transform-pcb.snap.svg`
- `core/tests/components/primitive-components/create-solderpaste-from-smtpad-and-plated-holes.test.tsx`
- `core/tests/solderpaste-polygon-transform.test.tsx`
- `core/tests/solderpaste-routing-neutrality.test.tsx`
- `easyeda-converter/lib/convert-easyeda-json-to-tscircuit-soup-json.ts`
- `easyeda-converter/lib/schemas/package-detail-shape-schema.ts`
- `easyeda-converter/lib/websafe/generate-footprint-tsx.ts`
- `easyeda-converter/tests/convert-to-ts/C1046-to-ts-with-stepModel.test.ts`
- `easyeda-converter/tests/convert-to-ts/C1046-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C105419-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C12084-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C128415-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C131337-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C14877-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C1525-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C15464-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C157929-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C157947-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C158012-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C160354-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C165948-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C18185602-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C19076967-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C19795120-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2040-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C20526-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C22446580-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C23689428-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C265111-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C281113-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2838502-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2848306-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2913206-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2961147-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C2979182-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C309274-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C3178291-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C3273487-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C393941-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C410353-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C46497-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C46749-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C490691-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C561765-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C57759-to-led.test.ts`
- `easyeda-converter/tests/convert-to-ts/C57759-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C5830143-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C6186-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C7203002-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C75749-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C8465-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/C88224-to-ts.test.ts`
- `easyeda-converter/tests/convert-to-ts/c2848306-hidden-pin-visibility.test.ts`
- `easyeda-converter/tests/convert-to-ts/smd-resistors-to-ts.test.ts`
- `easyeda-converter/tests/explicit-paste-regions.test.ts`
- `easyeda-converter/tests/source-paste-mask-field-fidelity.test.ts`
- `circuit-json-to-gerber/src/gerber/convert-soup-to-gerber-commands/defineAperturesForLayer.ts`
- `circuit-json-to-gerber/src/gerber/convert-soup-to-gerber-commands/index.ts`
- `circuit-json-to-gerber/tests/gerber/polygon-solder-paste.test.ts`
- `circuit-to-svg/lib/pcb/svg-object-fns/convert-circuit-json-to-solder-paste-mask.ts`
- `circuit-to-svg/tests/pcb/__snapshots__/solder-paste-polygon.snap.png`
- `circuit-to-svg/tests/pcb/__snapshots__/solder-paste-polygon.snap.svg`
- `circuit-to-svg/tests/pcb/solder-paste-polygon.test.ts`

## Process boundary

**SUPPLIER CAD INTENDS PASTE ON FOUR SHELL FEATURES** is the supported conclusion. GCT reflow/PIP approval, adequate mechanical solder joints, absence of secondary soldering and JLCPCB shell coverage remain unconfirmed. Correct import fidelity is not manufacturer stencil/process qualification.

R5 remains **R5 DFM REVIEW — NOT FOR FABRICATION**. No PCB source edits, R6 or manufacturing candidate. Physical tests remain **POST-PROTOTYPE PHYSICAL VALIDATION**.
