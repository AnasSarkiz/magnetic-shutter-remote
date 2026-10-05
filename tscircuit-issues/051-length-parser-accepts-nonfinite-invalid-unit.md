# Length parser returns NaN for an invalid unit string

Status: **confirmed**. Classification: **Confirmed unit parser behavior; broad upstream fix remains open**.

## Affected package / exact revision

circuit-json 0.0.509; @tscircuit/props 0.0.672. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
cd tooling/props
bun test tests/pcb-sx-solder-paste-margin.test.ts
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

A physical stencil dimension must be finite or rejected. Native fanout source already uses positive/finite coordinate refinements; invalid physical input must not reach fabrication.

## Actual behavior

Before adding a finite-value refinement, pcbSxValue.parse({solderPasteMargin:"invalid"}) returned solderPasteMargin: NaN instead of throwing. Exact failing assertion is preserved. This behavior is in the shared length parser and is not proof that fitted part geometry is invalid.

## Evidence / logs / geometry

- [tooling/props/tests/pcb-sx-solder-paste-margin.test.ts](../tooling/props/tests/pcb-sx-solder-paste-margin.test.ts)
- [evidence/R5/props-test.log](../evidence/R5/props-test.log)
- [tooling/props/lib/common/pcbSx.ts](../tooling/props/lib/common/pcbSx.ts)

[Shared parser reproduction](../evidence/R5/invalid-length-parser.log).

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Confirmed unit parser behavior; broad upstream fix remains open. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

The new paste-style API explicitly refines Number.isFinite and its regression rejects invalid units. This closes R5 stencil-input risk, not the shared parser defect in every consumer. No type escape or NaN fallback is used.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
