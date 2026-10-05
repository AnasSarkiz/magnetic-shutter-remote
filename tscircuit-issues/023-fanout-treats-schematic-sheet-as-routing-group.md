# Fanout solver treats a schematic sheet as its PCB routing group

Status: **fixed locally**. Classification: **tscircuit PCB/schematic container integration defect**.

## 1. Affected package and exact revision

@tscircuit/core 0.0.2035; base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

Unchanged C431540 and C8545 supplier imports provide the reproduction.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
bun test tests/repros/repro-fanout-in-schematic-sheet.test.tsx
```

## 4. Expected behavior

A schematic sheet sets schematic presentation. It does not replace the enclosing board/group PCB layer and routing scope.

## 5. Actual behavior

TypeError: routingScope._getSubcircuitLayerCount is not a function, in getCoordinatedFanoutLayers. A direct fanout under board works; nesting it inside schematicsheet fails.

## 6. Evidence

- [fanout-sheet-before.log](evidence/023-fanout-treats-schematic-sheet-as-routing-group/fanout-sheet-before.log) — original `evidence/R3/fanout-sheet-before.log`
- [fanout-sheets-regression.log](evidence/023-fanout-treats-schematic-sheet-as-routing-group/fanout-sheets-regression.log) — original `evidence/R3/fanout-sheets-regression.log`
- [cross-sheet.test.tsx](evidence/023-fanout-treats-schematic-sheet-as-routing-group/cross-sheet.test.tsx) — original `evidence/R3/fanout-original/cross-sheet.test.tsx`
- [repro-fanout-in-schematic-sheet.test.tsx](evidence/023-fanout-treats-schematic-sheet-as-routing-group/repro-fanout-in-schematic-sheet.test.tsx) — original `tooling/core/tests/repros/repro-fanout-in-schematic-sheet.test.tsx`
- [repro-fanout-in-schematic-sheet.png](evidence/023-fanout-treats-schematic-sheet-as-routing-group/repro-fanout-in-schematic-sheet.png) — original `evidence/R3/repro-fanout-in-schematic-sheet.png`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed: two fanout functions cast breakout.parent to Group without checking its class. In the reproduction that parent is SchematicSheet. The source fix resolves the nearest actual Group and uses the same definition to find coordinated fanouts.

## 8. Impact

Prevents the required native A4 sheets from coexisting with automatic fanout.

## 9. Fix details, changed source and tests

New tooling/core/lib/components/primitive-components/Breakout/get-routing-scope-or-throw.ts; callers create-implicit-breakout-point-solver-input.ts and solve-implicit-breakout-points.ts. tests/repros/repro-fanout-in-schematic-sheet.test.tsx passes; typecheck passes. Original failing source and log retained.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.
