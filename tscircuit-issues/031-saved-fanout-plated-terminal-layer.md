# Saved fanout rejects a valid bottom-layer escape from a through-plated terminal

Status: **fixed locally**.

## Affected package and exact revision

@tscircuit/core 0.0.2035; upstream base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0; working archive tscircuit-core-0.0.2035-r3-attribution.tgz.

## Component and authoritative sources

HCTL HC-TYPE-C-6P-01A / C2894893. [Listing](https://jlcpcb.com/partdetail/HC-TYPE-C-6P-01A/C2894893), [Rev A drawing](../references/C2894893-manufacturer.pdf), [unchanged imported test fixture](../tooling/core/tests/fixtures/imported-r3/HC_TYPE_C_6P_01A.tsx).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
cd tooling/core
bun test tests/repros/repro-saved-fanout-plated-terminal-bottom.test.tsx tests/repros/repro-saved-fanout-smt-terminal-wrong-layer.test.tsx
node_modules/.bin/tsc --noEmit
bun run build
```

## Expected behavior

An actual top/bottom plated terminal can anchor copper on either declared physical layer at its same physical coordinate. A top-only SMT terminal must still reject a bottom start without a via.

## Actual behavior

The original saved-path endpoint matcher only accepted the SRJ terminal preferred layer (top), although the physical port/slot spans top and bottom. The valid shell bottom escape failed endpoint selection.

## Logs, screenshots and measurements

[Original source](evidence/031/original-get-saved-fanout-traces.ts), [fixed source](evidence/031/fixed-get-saved-fanout-traces.ts), [observed before failure](evidence/031/before.log), [10-pass focused regression](../evidence/R3/core-pth-fanout-broad.log), [typecheck](../evidence/R3/core-pth-typecheck-2.log), [reviewed PCB snapshot](../evidence/R3/repro-saved-fanout-plated-terminal-bottom-pcb.png).

## Root cause: confirmed facts and hypotheses

Confirmed preferred SRJ layer was mistaken for the physical barrel layer span. The imported slot/layer data is correct.

## Impact

Prevents real grounded USB shell routing on bottom without an unnecessary extra via.

## Fix details, changed source and regression tests

Changed lib/components/primitive-components/Breakout/get-saved-fanout-traces.ts. Accept the alternate layer only for the same endpoint/port that has an actual pcb_plated_hole with both declared layers. Added positive PTH and negative SMT regression fixtures, snapshots, typecheck/build. No same-footprint DRC exemption and no new fabricated via.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
