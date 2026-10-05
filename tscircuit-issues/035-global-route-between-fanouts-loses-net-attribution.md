# Global route between saved fanout exits loses source-trace attribution

Status: **fixed locally**.

## Affected package and exact revision

@tscircuit/core 0.0.2035; base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0; capacity-autorouter 0.0.951.

## Component and authoritative sources

Reduced regression uses unchanged Samsung CL10A475KO8NNNC / C19666 imports. [Listing](https://jlcpcb.com/partdetail/C19666), [fixture](../tooling/core/tests/fixtures/imported-r3/CL10A475KO8NNNC.tsx). Original board TEMP_OK net includes TI TMP390A2DRLR / C5219772, [TI datasheet](https://www.ti.com/lit/ds/symlink/tmp390.pdf).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
cd tooling/core
bun test tests/repros/repro-routed-trace-between-saved-fanouts.test.tsx
node_modules/.bin/tsc --noEmit
bun run build
```

## Expected behavior

Actual solver connectsTo identifiers must resolve physical PCB ports or recorded breakout points to their real source terminal/net, including a route that has no physical pad at either global endpoint.

## Actual behavior

The route between two saved exits had no source_trace_id. Native DRC reported false accidental contacts and dangling endpoints; the independent checker also failed because the net was unknown.

## Logs, screenshots and measurements

[Original source](evidence/035/original-attribution.ts), [fixed source](evidence/035/fixed-attribution.ts), [before regression failure](evidence/035/before.log), [9-pass focused regressions](../evidence/R3/core-attribution-broad.log), [typecheck](../evidence/R3/core-attribution-typecheck.log), [reviewed snapshot](../evidence/R3/repro-routed-trace-between-saved-fanouts-pcb.png).

## Root cause: confirmed facts and hypotheses

Confirmed function only used geometric/start/end pad inference, ignoring solver connectsTo breakout IDs. Endpoint geometry already matched actual saved fanout exits.

## Impact

False connectivity errors and unsafe unknown-net interpretation downstream.

## Fix details, changed source and regression tests

Changed lib/components/primitive-components/Group/get-source-trace-id-for-routed-trace.ts. Model optional readonly connectsTo identifiers and resolve their actual db.pcb_port/db.pcb_breakout_point source-port records before geometric inference. Added a two-real-capacitor/four-saved-exit regression with zero native errors and a PCB snapshot. Nine relevant tests / 43 assertions, typecheck and build pass. Regenerated board through the canonical pipeline; no circuit JSON patch.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
