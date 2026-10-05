# EasyEDA PAD solder-mask expansion was discarded

Status: **fixed locally**. Classification: confirmed parser/importer fidelity defect. Manufacturer mask approval remains separate.

## Affected version

`easyeda` 0.0.364, R5 local source based on 140046d000238f3d6c8611989682efb2872f25a9. The existing native SMT/PTH margin APIs and Gerber exporter support the value; imported source omitted it.

Component context: Global Connector Technology **USB4215-03-A**, **C37616412**, drawing/specification A, 2024-04-26. [Product](https://gct.co/connector/usb4215), [drawing](https://gct.co/files/drawings/usb4215.pdf), [specification](https://gct.co/files/specs/usb4215-spec.pdf), [JLCPCB exact part](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412). Supplier component UUID 907b9bea7a60481d8a3d3aef3cba8ef1; package UUID 3104977db58742e399663286e4a66eac, title USB-C-SMD_GT-USB-7010B. That borrowed title does not certify manufacturer approval. Raw source SHA256 63d81d039f7d6041035b6c2361e88db3785859e3d79792ad0cb9513d315df746.

All fixes are isolated under this audit. No PCB source, protected R4/R5 artifact, original supplier input, or previously imported component was edited. No verified upstream fix or publication is claimed.


## Minimal reproduction and expected behavior

Input: [raw source](../inputs/C37616412.raweasy.json), [minimal fixture](../inputs/minimal-paste.raweasy.json). From `toolchain/easyeda-converter`:

```sh
bun test tests/explicit-paste-regions.test.ts tests/source-paste-mask-field-fidelity.test.ts
```

[Official PAD format](https://docs.easyeda.com/en/DocumentFormat/EasyEDA-Format-Standard/) gives solder expansion as field 19 including command (raw zero-based split18; parser params16). Preserve source 0.2 units as 0.0508 mm on all sixteen lands, including four plated shell holes. Absent/empty remains absent; explicit zero is not dropped.

## Actual behavior and measurements

The original parser/TSX generator discards the field, relying on native defaults. Import success did not prove mask fidelity. The corrected generated component has sixteen solderMaskMargin=0.0508mm values. Actual TOP mask has 24 Gerber drawing objects compositing to 16 physical openings: each shell capsule is a line plus two end flashes. Treating drawing count as opening count would be incorrect.

Evidence: [original import](../inputs/original-import.tsx), [fixed import](../final/USB4215_03_A.tsx), [TOP mask Gerber](../final/F_Mask.gbr), [CAM metrology code](../test_cam_geometry.py), [passing CAM log](../logs/cam-final-locked.log), [source/mask qualification table](../../USB4215-PASTE-QUALIFICATION.md). A separate mask screenshot is not claimed; this check reads and composites the actual CAM.

## Confirmed root cause, impact, fix

PadSchema and raw extraction omitted solderExpansion; converted SMT/PTH records and TSX therefore lacked it. Preserving source values changes native mask openings. Added optional field parsing and preservation through soldermask_margin → solderMaskMargin without replacing copper/drill geometry. [Importer source patch](../patches/easyeda-converter.patch) identifies all changed files.

## Regression and blocker

Focused raw tests pass (7,685 assertions); independent CAM compares all sixteen physical opening bounds with per-land copper plus source margin, within the exporter quantization. This does not establish that GCT recommends these openings or that the resulting mask webs meet an eventual replacement-board process. Manufacturer mask/stencil direction and full importer-suite failures remain explicit. No R5 solder mask or supplier component was hand-edited.
