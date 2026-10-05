# Native silkscreen paths ignore inherited pcbSx visibility

Status: **fixed locally**. Classification: **Confirmed core style integration inconsistency**.

## Affected package / exact revision

@tscircuit/core 0.0.2035 local R3 attribution base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0; props 0.0.672. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
cd tooling/core
bun test tests/components/primitive-components/silkscreen-path-parent-visibility.test.tsx
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

Existing pcbSx visibility contract uses hidden/visible/inherit. Removing ornamental silk must leave electronic copper, courtyards, connectivity and models unchanged.

## Actual behavior

pcbSx visibility is parsed and inherited, and text respects hidden visibility; SilkscreenPath never resolves it and emits ornamental paths even when the parent selects hidden. This prevents source-controlled replacement of unprintable decorative artwork without touching imports.

## Evidence / logs / geometry

- [evidence/R5/core-before-regressions.log](../evidence/R5/core-before-regressions.log)
- [evidence/R5/core-after-regressions.log](../evidence/R5/core-after-regressions.log)
- [tscircuit-issues/evidence/047-silk-path-visibility/SilkscreenPath-before.ts](../tscircuit-issues/evidence/047-silk-path-visibility/SilkscreenPath-before.ts)
- [tscircuit-issues/evidence/047-silk-path-visibility/SilkscreenPath-after.ts](../tscircuit-issues/evidence/047-silk-path-visibility/SilkscreenPath-after.ts)
- [tooling/core/tests/components/primitive-components/__snapshots__/silkscreen-path-parent-visibility-pcb.snap.svg](../tooling/core/tests/components/primitive-components/__snapshots__/silkscreen-path-parent-visibility-pcb.snap.svg)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Confirmed core style integration inconsistency. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

SilkscreenPath resolves existing typed visibility before emitting. Before: two paths; after: one intended board path at 0.15 mm. Copper and courtyard counts are unchanged. Regression asserts emitted geometry and a native PCB snapshot.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
