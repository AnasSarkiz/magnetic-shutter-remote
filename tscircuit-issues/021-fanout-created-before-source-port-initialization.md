# Fanout points are created before custom-symbol ports and trace identities initialize

Status: **fixed locally**. Classification: **tscircuit render-phase ordering defect**.

## 1. Affected package and exact revision

@tscircuit/core 0.0.2035; base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

SHOU HAN MSK12C02 / C431540; Jiangsu Changjing Electronics Technology 2N7002 / C8545. Unaltered fitted supplier imports are the regression fixtures.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
bun test tests/repros/repro-fanout-later-custom-symbol.test.tsx
```

## 4. Expected behavior

Ports and source-trace identities must exist before fanout boundary points resolve them. See core docs/saved-fanout-trace-paths.md and SourceRender/SourceTraceRender phase implementations.

## 5. Actual behavior

Before fix, fanout creation throws a source_trace_not_connected_error for a later custom-symbol port. Moving the phase only before SourceTraceRender instead produces "point without a source trace identity".

## 6. Evidence

- [fanout-symbol-before.log](evidence/021-fanout-created-before-source-port-initialization/fanout-symbol-before.log) — original `evidence/R3/fanout-symbol-before.log`
- [fanout-symbol-after-1.log](evidence/021-fanout-created-before-source-port-initialization/fanout-symbol-after-1.log) — original `evidence/R3/fanout-symbol-after-1.log`
- [fanout-symbol-after.log](evidence/021-fanout-created-before-source-port-initialization/fanout-symbol-after.log) — original `evidence/R3/fanout-symbol-after.log`
- [fanout-sheets-regression.log](evidence/021-fanout-created-before-source-port-initialization/fanout-sheets-regression.log) — original `evidence/R3/fanout-sheets-regression.log`
- [repro-fanout-later-custom-symbol.test.tsx](evidence/021-fanout-created-before-source-port-initialization/repro-fanout-later-custom-symbol.test.tsx) — original `tooling/core/tests/repros/repro-fanout-later-custom-symbol.test.tsx`
- [A_2N7002.tsx](evidence/021-fanout-created-before-source-port-initialization/A_2N7002.tsx) — original `tooling/core/tests/fixtures/imported-r3/A_2N7002.tsx`
- [MSK12C02.tsx](evidence/021-fanout-created-before-source-port-initialization/MSK12C02.tsx) — original `tooling/core/tests/fixtures/imported-r3/MSK12C02.tsx`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed: CreateAutoplacedBreakoutPoints originally precedes source rendering, port matching and alias initialization. It reads those outputs. Its new position is after SourceAddConnectivityMapKey. No hypothesis is needed for the reproduced ordering failure.

## 8. Impact

Blocks circuit generation when a fanout scans traces belonging to supplier custom symbols.

## 9. Fix details, changed source and tests

tooling/core/lib/components/base-components/Renderable.ts; regression tests/repros/repro-fanout-later-custom-symbol.test.tsx. Test passes after the phase move. Cross-sheet and cache invalidation failures are separate reports 022/023.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.
