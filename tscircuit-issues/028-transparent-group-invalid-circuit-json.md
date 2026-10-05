# Transparent groups emit schema-invalid Circuit JSON

Status: **fixed locally**. Full routed board validation remains separate.

## Affected package
`@tscircuit/core` 0.0.2035, upstream base `3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0`, with the retained project fixes. `circuit-json` 0.0.509. Local source: `../tooling/core/`.

## Components and sources
The regression uses unchanged supplier imports: Jiangsu Changjing Electronics Technology 2N7002, C8545, and SHOU HAN MSK12C02, C431540. [C8545](https://jlcpcb.com/partdetail/C8545), [C431540](https://jlcpcb.com/partdetail/C431540). This failure is group metadata, independent of electronic land geometry.

## Reproduction
From `tooling/core`, run `bun test tests/repros/repro-fanout-schematic-group-schema.test.tsx` and `bun test tests/repros/repro-group-autorouter-configuration-schema.test.tsx`. Required fixtures are retained in `tests/fixtures/imported-r3/`. [Minimal source](evidence/028/repro-fanout-schematic-group-schema.test.tsx). The board has two native A4 schematic sheets, an explicit-position transparent fanout, and an unchanged imported transistor and switch.

## Expected behavior
All emitted records must pass `any_circuit_element.array().safeParse(...)`. Transparent groups inherit the owning subcircuit. Circuit JSON declares string optional subcircuit IDs, non-null anchor alignment, optional autorouter configuration containing required numeric trace clearance, and string display offsets. [Schema source](https://github.com/tscircuit/circuit-json/blob/main/src/pcb/pcb_group.ts).

## Actual behavior and evidence
The first failure emits a null schematic subcircuit ID. PCB records also emit null anchor alignment and empty `{}` autorouter configuration. Explicit numeric `pcbX/pcbY` produce numeric display offsets although the schema requires strings. [Original failure](evidence/028/group-schema-before.log), [additional failure](evidence/028/group-schema-after-3.log), [numeric offset record](evidence/028/schema-rejected-routed-records.log).

## Root cause
Confirmed: Group reads its own unset subcircuit ID; unset alignment is explicitly replaced with null; presence of the autorouter object is mistaken for presence of its trace-clearance field; raw numeric coordinate inputs are stored in string-only presentation fields. These facts follow directly from canonical Group source and the rejected generated records. Supplier data is not implicated.

## Impact
Strict schema validation blocks trusting fabrication converters; ownership metadata may also affect schematic grouping. Board copper and component imports are not modified by the fix.

## Local fix and verification
Changed `lib/components/primitive-components/Group/Group.ts`: use the actual owning subcircuit; omit unset alignment; emit autorouter configuration only when trace clearance is supplied; stringify present display offsets. Defaults remain the schema's documented defaults. Explicit trace clearance is preserved in its own regression. [Two schema regressions](evidence/028/group-schema-numeric-offset-after.log), [five related regressions](evidence/028/group-schema-regression-final.log). Core TypeScript and build completed successfully; current integration uses a uniquely named local archive to avoid Bun archive-cache reuse. No generated imports or JSON were patched. No upstream issue or package was published.

## Final R3 disposition (2026-10-02)

Final complete source Circuit JSON schema accepts every record; tested canonical/installed core builds match. Working local archive is r3-attribution.tgz, preserving the transparent-group source fix.
