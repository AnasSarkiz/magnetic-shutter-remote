# Blanket router override broke the isolated fixture type graph

Status: **fixed locally**. Classification: qualification-project dependency integration mistake, **not a confirmed upstream tscircuit bug**.

## Affected exact versions

@tscircuit/core 0.0.2035, tscircuit 0.0.2702, @tscircuit/eval 0.0.1506, @tscircuit/fanout-solver 0.0.78, capacity-autorouter 0.0.951. Fanout declares a separate exact dependency on capacity-autorouter 0.0.718. These are software packages, so manufacturer/C-number is N/A; the component context is GCT USB4215-03-A / C37616412.

## Reproduction and input

The earlier graph globally overrode capacity-autorouter to 0.0.951. [Failing package configuration reproducer](../inputs/057-failing-package.json) restores that recorded configuration from the final manifest; it is labelled a reconstructed reproducer, not an untouched original manifest. The actual original compiler-error log is preserved. Copy the reproducer as package.json in a separate fixture with the same vendor archives and run:

```sh
bun install --offline --ignore-scripts
bun run typecheck
```

Do not run in frozen R5. Before/after graph is documented in [README](../README.md), [integration map](../integration-map.json), final [package manifest](../fixture/package.json) and [lock](../fixture/bun.lock).

## Expected and actual

Root core/eval must resolve their compatible 0.0.951 while fanout retains its declared 0.0.718. The blanket override replaced both, causing published fanout TypeScript source errors: TS2322 string|undefined endpoints, TS2339 missing busId, TS2430 readonly allowedLayers incompatible with mutable arrays, and incompatible Obstacle shape types. [Exact failing log](../logs/final-source-locked-typecheck.log). No screenshot applies to compiler errors.

## Root cause and impact

Confirmed package manifests and lock resolution explain the mismatch. No claim is made that either library independently violates its own declared compatible graph. It blocked qualification fixture type checking, despite successful individual declaration builds. It did not change copper or manufacture an apparent component pass.

## Fix and verification

Remove only the global router override; declare 0.0.951 directly at the fixture root so core/eval deduplicate to it. Allow fanout's exact 0.0.718 nested installation. Keep the seven corrected local package archives and exact checks/footprinter/eval versions locked. No compiler setting, type escape or validation suppression changed.

[Install evidence](../logs/fixture-nested-routing-install.log), [passing typecheck](../logs/fixture-nested-routing-typecheck.log), [passing native render](../logs/fixture-nested-routing-render.log), [clean reproduction](../reproduction/typecheck.log) confirm resolution. No fanout source was patched; no R5 dependency manifest changed. This report records a development finding, not an electronic component blocker or a new upstream issue.
