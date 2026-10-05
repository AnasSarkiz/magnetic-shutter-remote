# EasyEDA PAD paste expansion was discarded and automatic paste substituted

Status: **fixed locally**. Classification: confirmed parser/importer fidelity defect. Not supplier data corruption.

## Affected package/version

`easyeda` 0.0.364, R5 local source based on 140046d000238f3d6c8611989682efb2872f25a9. Downstream core 0.0.2035 already supports per-pad solderPasteMargin.

Component context: Global Connector Technology **USB4215-03-A**, **C37616412**, drawing/specification A, 2024-04-26. [Product](https://gct.co/connector/usb4215), [drawing](https://gct.co/files/drawings/usb4215.pdf), [specification](https://gct.co/files/specs/usb4215-spec.pdf), [JLCPCB exact part](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412). Supplier component UUID 907b9bea7a60481d8a3d3aef3cba8ef1; package UUID 3104977db58742e399663286e4a66eac, title USB-C-SMD_GT-USB-7010B. That borrowed title does not certify manufacturer approval. Raw source SHA256 63d81d039f7d6041035b6c2361e88db3785859e3d79792ad0cb9513d315df746.

All fixes are isolated under this audit. No PCB source, protected R4/R5 artifact, original supplier input, or previously imported component was edited. No verified upstream fix or publication is claimed.


## Minimal reproduction

Input: [minimal original PAD/paste fixture](../inputs/minimal-paste.raweasy.json). From `toolchain/easyeda-converter`:

```sh
bun test tests/explicit-paste-regions.test.ts tests/source-paste-mask-field-fidelity.test.ts
```

Use [REPRODUCE.md](../REPRODUCE.md) to test the installed component/export chain. Preserve [original generated import](../inputs/original-import.tsx) as the failing input.

## Expected behavior

[Official modern PAD fields](https://docs.easyeda.com/en/DocumentFormat/EasyEDA-Format-Standard/) identify paste expansion as field 18 including the command (zero-based raw split index 17; parser params index 15). Its units are 10 mil =0.254 mm. The twelve source SMT pads carry −393.7, hence −99.9998 mm, disabling the default aperture so the separate explicit polygons provide paste. Empty/absent fields must remain absent; explicit zero must remain zero.

## Actual behavior and evidence

The parser drops the field. TSX has no per-pad setting. Core substitutes twelve generic rectangles (70% linear dimensions), even though the raw source suppresses them. Simply adding sixteen regions would therefore duplicate paste unless this field also survives.

Before/after: [baseline rendered JSON](../baseline/circuit.json), [original TSX](../inputs/original-import.tsx), [fixed generated TSX](../final/USB4215_03_A.tsx), [fixed JSON](../final/circuit.json), [geometry table](../APERTURE-GEOMETRY.md), [CAM preview](../final/cam-paste.png), [regression log](../logs/focused-importer-final.log). Baseline12 → corrected16, with twelve negative margins and no duplicate apertures.

## Root cause and impact

Confirmed: PadSchema omitted pasteExpansion; PAD extraction omitted the corresponding raw field; converter/TSX generator had no preservation path. The earlier report's field-semantics hypothesis is resolved by official documentation and raw fixtures. No negative value was invented to make this connector pass; it is unchanged supplier data. Default stencil substitution can change assembly volume for other imports too.

## Fix, tests and limitation

Add optional pasteExpansion extraction, preserve it in solderpaste_margin, emit solderPasteMargin in generated TSX. Preserve absence before numeric coercion; no broad type escape or chip-specific rule. Changed source files: schemas/package-detail-shape-schema.ts, convert-easyeda-json-to-tscircuit-soup-json.ts, websafe/generate-footprint-tsx.ts. [Importer patch](../patches/easyeda-converter.patch).

Both focused tests pass (7,685 assertions). The cross-component test independently checks raw fields and all source polygon vertices. Reviewed exact-string/inline expectations retain all previous copper/symbol fields and add only source-backed paste/mask content; original inputs and baseline tests remain archived. Full-suite gate remains blocked as described in 053; manufacturer paste/process qualification is not inferred from fidelity.
