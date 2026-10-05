# Additional USB-C supplier libraries differ from manufacturer land drawings

Status: **confirmed**. Classification: **Supplier data discrepancies; not confirmed tscircuit converter bugs**.

## Affected package / exact revision

easyeda-converter 0.0.364 local R3 supported pipeline; raw supplier libraries C456012/C668623/C3151650. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
bun tooling/easyeda-converter/dist/main.cjs download -i C3151650 -o evidence/R5/C3151650.raweasy.json
pdftoppm -png -singlefile references/GCT-USB4125-current.pdf references/R5/GCT-USB4125-current
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

Exact manufacturer recommended land patterns and explicit tolerances: references/R5/C456012.pdf, references/R5/C668623.pdf, references/GCT-USB4125-current.pdf (A6, 20/11/25). Manufacturer source: https://gct.co/connector/usb4125. Exact JLC listings: https://jlcpcb.com/partdetail/C456012 , https://jlcpcb.com/partdetail/C668623 , https://jlcpcb.com/partdetail/C3151650 .

## Actual behavior

C456012 SHOU HAN TYPE-C 6P shell land is ~1.10×1.90 versus drawing 1.00×1.80. C668623 SHOU HAN TYPE-C 6P(073) CC land is ~0.70 versus drawing 0.90. C3151650 GCT USB4125-GF-A has 1.00 contact length versus A6 drawing 1.20, plus shell/drill differences. Exact raw dimensions are reproduced in R5 qualification.

## Evidence / logs / geometry

- [evidence/R5/C456012.raweasy.json](../evidence/R5/C456012.raweasy.json)
- [evidence/R5/C668623.raweasy.json](../evidence/R5/C668623.raweasy.json)
- [evidence/R5/C3151650.raweasy.json](../evidence/R5/C3151650.raweasy.json)
- [references/R5/C456012.png](../references/R5/C456012.png)
- [references/R5/C668623.png](../references/R5/C668623.png)
- [references/R5/GCT-USB4125-current.png](../references/R5/GCT-USB4125-current.png)
- [R5-QUALIFICATION.md](../R5-QUALIFICATION.md)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Supplier data discrepancies; not confirmed tscircuit converter bugs. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

No supplier definition was altered and no candidate accepted. Import raw PAD dimensions reproduce the differing geometry before conversion, establishing supplier-model involvement. HCTL C2894893 remains blocked under issue 042. Exact supplier clarification is prepared, not sent.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
