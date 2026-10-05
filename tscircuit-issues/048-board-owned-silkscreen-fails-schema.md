# Native board-level silkscreen has no valid schema owner

Status: **fixed locally**. Classification: **Confirmed core/schema integration defect**.

## Affected package / exact revision

@tscircuit/core 0.0.2035; circuit-json 0.0.509 local sheet schema; exact local source/archives in tooling/revisions-r5.json. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
cd tooling/core
bun test tests/components/primitive-components/board-owned-silkscreen-schema.test.tsx
cd ../circuit-json
bun test tests/board-owned-silkscreen.test.ts
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

Native board artwork is not an electronic component. It must reference the real board, while supplier artwork retains its component owner. Ownership must survive parsing; ownerless artwork must still be rejected.

## Actual behavior

A native board containing silkscreentext emits no pcb_component_id, while Circuit JSON requires a component owner. The native viewer displays it, but strict assembly/routed-schema consumers reject every board label. Representative exact schema error: pcb_silkscreen_text.pcb_component_id expected string, received undefined.

## Evidence / logs / geometry

- [evidence/R5/simplified-native-checks.log](../evidence/R5/simplified-native-checks.log)
- [evidence/R5/schema-silk-test.log](../evidence/R5/schema-silk-test.log)
- [evidence/R5/schema-full-tests.log](../evidence/R5/schema-full-tests.log)
- [evidence/R5/core-final-regressions.log](../evidence/R5/core-final-regressions.log)
- [tooling/circuit-json/tests/board-owned-silkscreen.test.ts](../tooling/circuit-json/tests/board-owned-silkscreen.test.ts)
- [tooling/core/tests/components/primitive-components/__snapshots__/board-owned-silkscreen-schema-pcb.snap.svg](../tooling/core/tests/components/primitive-components/__snapshots__/board-owned-silkscreen-schema-pcb.snap.svg)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Confirmed core/schema integration defect. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

Schema accepts real pcb_board_id or pcb_component_id and requires at least one. Core emits board ownership for board artwork. No fake component IDs or electronic substitutes are introduced. Round-trip, ownerless rejection, component compatibility, emitted board IDs and visual regression are tested.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
