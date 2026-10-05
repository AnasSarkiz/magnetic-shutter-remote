# Adding saved fanout points removes custom-symbol owner-aware port aliases

Status: **fixed locally**. Classification: **tscircuit selector-cache invalidation defect**.

## 1. Affected package and exact revision

@tscircuit/core 0.0.2035; base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

SHOU HAN MSK12C02 / C431540; Jiangsu Changjing Electronics Technology 2N7002 / C8545. Imported component definitions remain unchanged.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
bun test tests/repros/repro-saved-fanout-invalidates-custom-symbol-selectors.test.tsx
```

## 4. Expected behavior

Existing component-port selectors must keep the same meaning when a later render phase adds children. Source traces already resolved with those selectors must remain resolvable.

## 5. Actual behavior

A saved fanout exit is added successfully, then scanning an unrelated SW1 trace throws: Could not find port for selector ".SW1 > .pin1" ... It has no ports. Its ports actually exist under its Symbol container.

## 6. Evidence

- [saved-fanout-selectors-before.log](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/saved-fanout-selectors-before.log) — original `evidence/R3/saved-fanout-selectors-before.log`
- [saved-fanout-selectors-after.log](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/saved-fanout-selectors-after.log) — original `evidence/R3/saved-fanout-selectors-after.log`
- [primitive-component-before-cache-fix.ts](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/primitive-component-before-cache-fix.ts) — original `evidence/R3/fanout-original/primitive-component-before-cache-fix.ts`
- [routed-build-10-radio-escape.log](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/routed-build-10-radio-escape.log) — original `evidence/R3/routed-build-10-radio-escape.log`
- [repro-saved-fanout-invalidates-custom-symbol-selectors.test.tsx](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/repro-saved-fanout-invalidates-custom-symbol-selectors.test.tsx) — original `tooling/core/tests/repros/repro-saved-fanout-invalidates-custom-symbol-selectors.test.tsx`
- [A_2N7002.tsx](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/A_2N7002.tsx) — original `tooling/core/tests/fixtures/imported-r3/A_2N7002.tsx`
- [MSK12C02.tsx](evidence/022-saved-fanout-invalidates-custom-symbol-port-selectors/MSK12C02.tsx) — original `tooling/core/tests/fixtures/imported-r3/MSK12C02.tsx`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed: add() clears ancestor query caches. Owner-aware port aliases were supplied only by the OptimizeSelectorCache warm-up. Clearing them after that phase removes required selector semantics. Rewarming initialized subcircuit aliases after tree mutation resolves the reproduced error.

## 8. Impact

Blocks full-board circuit generation despite existing source ports. No supplier pinout or pad geometry is defective in this reproduction.

## 9. Fix details, changed source and tests

tooling/core/lib/components/base-components/PrimitiveComponent/PrimitiveComponent.ts::_clearSelectorCachesUpTree. Regression tests/repros/repro-saved-fanout-invalidates-custom-symbol-selectors.test.tsx: observed pre-fix exit 1, post-fix pass. Build 10 reaches routing. Bun did not replace a cached archive reused under the same path; integration uses a unique archive name and verifies identical installed/built SHA-256 hashes.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.
