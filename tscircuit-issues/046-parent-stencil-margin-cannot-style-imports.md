# Parent stencil styling unavailable for immutable supplier footprints

Status: **fixed locally**. Classification: **Missing API capability, not supplier footprint corruption**.

## Affected package / exact revision

@tscircuit/props 0.0.672 base f136fe4178b5b5ca80efb314b4fc3679ed068c61; @tscircuit/core 0.0.2035 base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
cd tooling/core
bun test tests/components/primitive-components/smtpad-parent-paste-style.test.tsx
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

The existing native solderPasteMargin means an absolute expansion per side; zero yields 1:1. Parent pcbSx styling must retain supplier copper unchanged. Declaration, defaults, accepted units and specificity are documented in tooling/props/lib/common/pcbSx.ts.

## Actual behavior

SmtPad supports a primitive solderPasteMargin but immutable imported JSX has no way for the parent to select individual aperture margins. pcbSx schema strips that unrecognised field. U2 lead default is 0.7 scaling: ~0.14×0.35 mm, area ratio ~0.40 at 0.125 mm.

## Evidence / logs / geometry

- [evidence/R5/core-before-regressions.log](../evidence/R5/core-before-regressions.log)
- [evidence/R5/core-after-regressions.log](../evidence/R5/core-after-regressions.log)
- [tscircuit-issues/evidence/046-parent-stencil-style/SmtPad-before.ts](../tscircuit-issues/evidence/046-parent-stencil-style/SmtPad-before.ts)
- [tscircuit-issues/evidence/046-parent-stencil-style/SmtPad-after.ts](../tscircuit-issues/evidence/046-parent-stencil-style/SmtPad-after.ts)
- [tooling/patches/props-r5.patch](../tooling/patches/props-r5.patch)
- [tooling/core/tests/components/primitive-components/__snapshots__/smtpad-parent-paste-style-pcb.snap.svg](../tooling/core/tests/components/primitive-components/__snapshots__/smtpad-parent-paste-style-pcb.snap.svg)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Missing API capability, not supplier footprint corruption. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

Added typed unit-aware pcbSx solderPasteMargin with finite-value validation, plus SmtPad resolution. Explicit primitive props retain priority. EP-specific selector overrides the general lead margin. Source copper dimensions and 151 aperture count are tested; before implementation the test fails, after it passes. Native render snapshot is retained.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
