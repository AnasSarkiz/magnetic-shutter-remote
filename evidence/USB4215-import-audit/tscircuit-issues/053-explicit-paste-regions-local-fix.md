# Explicit supplier paste regions survive the supported pipeline after a local fix

Status: **fixed locally** for the isolated fixture. Classification: confirmed importer loss, plus additive downstream representation support. General importer-suite gate remains blocked.

## Affected packages and exact baselines

`easyeda` 0.0.364 (R5 local source based on 140046d000238f3d6c8611989682efb2872f25a9); circuit-json 0.0.509; @tscircuit/props 0.0.672; @tscircuit/core 0.0.2035; @tscircuit/circuit-json-util 0.0.117; circuit-json-to-gerber 0.0.109; circuit-to-svg 0.0.433, official source commit 791ae4f1734209fcc7a9db3af4e5829340190b9f. Source archives, patches and SHA256 ledgers identify the exact locally patched baselines, including earlier R4/R5 changes.

Component context: Global Connector Technology **USB4215-03-A**, **C37616412**, drawing/specification A, 2024-04-26. [Product](https://gct.co/connector/usb4215), [drawing](https://gct.co/files/drawings/usb4215.pdf), [specification](https://gct.co/files/specs/usb4215-spec.pdf), [JLCPCB exact part](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412). Supplier component UUID 907b9bea7a60481d8a3d3aef3cba8ef1; package UUID 3104977db58742e399663286e4a66eac, title USB-C-SMD_GT-USB-7010B. That borrowed title does not certify manufacturer approval. Raw source SHA256 63d81d039f7d6041035b6c2361e88db3785859e3d79792ad0cb9513d315df746.

All fixes are isolated under this audit. No PCB source, protected R4/R5 artifact, original supplier input, or previously imported component was edited. No verified upstream fix or publication is claimed.


## Reproduction and inputs

The [original confirmed report](../../USB-replacement-search-2026-10-03/continued-search/tscircuit-issues/053-explicit-supplier-paste-regions-dropped.md) remains immutable. This report supplements its status rather than deleting it. Original inputs: [full raw CAD](../inputs/C37616412.raweasy.json), [original import](../inputs/original-import.tsx). Minimal raw input contains only original PAD and paste SOLIDREGION primitives, with the original schematic metadata required by the converter: [minimal fixture](../inputs/minimal-paste.raweasy.json).

From the audit directory:

```sh
cd toolchain/easyeda-converter
bun test tests/explicit-paste-regions.test.ts tests/source-paste-mask-field-fidelity.test.ts
cd ../core
bun test tests/solderpaste-polygon-transform.test.tsx tests/solderpaste-routing-neutrality.test.tsx
```

For the complete installed import → render → CAM reproduction use the exact command in [REPRODUCE.md](../REPRODUCE.md). It imports from raw CAD using the built supported CLI, not a hand-authored footprint.

## Expected versus actual

[EasyEDA format documentation](https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/index.html) assigns paste to layer 5/6. Preserve all sixteen filled regions and their contours, or reject unsupported geometry explicitly. Manufacturer copper/drill approval does not imply stencil approval.

Baseline: raw 16, parsed 16, direct importer Circuit JSON 0, TSX 0, rendered JSON 12 automatic contact rectangles, TOP Gerber 12. Those defaults are 70% in each linear copper dimension; shell apertures are absent. Fixed: every stage has sixteen source polygons; BOTTOM paste is empty; no merging or duplicates. Maximum CAM contour error 0.000000565686 mm, within six-decimal Gerber quantization. See [exact dimensions](../APERTURE-GEOMETRY.md).

Evidence: [failing regression](../logs/importer-before.log), [baseline CAM](../baseline/F_Paste.gbr), [fixed importer tests](../logs/focused-importer-final.log), [fixed CAM test](../logs/cam-final-locked.log), [native viewer](../final/paste.png), [actual CAM preview](../final/cam-paste.png), [actual CAM](../final/F_Paste.gbr). Both previews were visually inspected; counting screenshots alone was not the test.

## Confirmed root cause; limits of inference

The parser retains SOLIDREGION records, but the converter dispatch ignores filled paste layers. Circuit JSON has no polygon paste representation; TSX generation, native primitive registration, SVG and Gerber export also lack its round trip. PAD paste expansion is a distinct loss (054). This is not a plated-slot or layer-name ambiguity. The source is entirely closed M/L polygon paths. Curves, compound paths and open paths are explicitly rejected by this fix; no approximation is silently inserted.

## Impact and fix

Loss/substitution changes stencil volume and omits all four shell apertures. New additive polygon schema and props, native SolderPaste primitive, canonical coordinate transforms, importer dispatch/TSX generation, SVG conversion and Gerber region export preserve supplier contours. Explicit non-electrical paste is omitted only from the external electrical connectivity-map input, not Circuit JSON or CAM; routing invariance is tested.

Changed files are enumerated in [source-change-ledger.json](../source-change-ledger.json); all seven [source patches](../patches/) and base/fixed archives are retained. No generated footprint, JSON or Gerber was patched.

## Regression and remaining blockers

Minimal geometry test: 1,255 assertions; expanded raw-field/contour test: 6,430 assertions across 48 existing components. Core transform test covers translation, four rotations, both sides, and an independent copper witness. Gerber test covers both layers and both exporter Y conventions. SVG snapshot and actual CAM checks pass. All seven library and declaration builds pass; locked fixture typecheck and clean reproduction pass.

Full importer run: 278 pass / 33 fail, 311 tests. All 33 failing names also fail the paired unchanged-source control (237 pass / 72 fail). This does not waive failures or establish general release readiness; [logs and comparison](../logs/suite-comparison-final-qualified.json) retain the blocked gate. Missing GCT paste/process guidance and JLCPCB shell coverage remain separate external requirements. USB4215 is BLOCKED; no R6.
