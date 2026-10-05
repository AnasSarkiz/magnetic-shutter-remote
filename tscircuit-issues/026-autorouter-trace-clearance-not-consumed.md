# Declared autorouter traceClearance does not affect native routing input

Status: **confirmed**. Classification: **confirmed unused configuration; intended API semantics need upstream confirmation**.

## 1. Affected package and exact revision

@tscircuit/core 0.0.2035; base 3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0; @tscircuit/props 0.0.672; capacity-autorouter 0.0.941/0.0.951 evaluated. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

All fitted parts; independent of supplier component data.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
rg -n traceClearance node_modules/@tscircuit/props/lib/components/group.ts
rg -n trace_clearance tooling/core/lib
```

## 4. Expected behavior

A supported public clearance setting must either control routing or explicitly report that it is unsupported. Board manufacturing rules must ultimately be checked against actual copper.

## 5. Actual behavior

Changing autorouter.traceClearance from 0.25 to 0.15 mm leaves the native input/geometry unchanged. The typed property is stored as source_group.trace_clearance but no native SRJ reader consumes that field.

## 6. Evidence

- [routed-build-1.log](evidence/026-autorouter-trace-clearance-not-consumed/routed-build-1.log) — original `evidence/R3/routed-build-1.log`
- [routed-build-2.log](evidence/026-autorouter-trace-clearance-not-consumed/routed-build-2.log) — original `evidence/R3/routed-build-2.log`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed source declaration/storage and observed unchanged output. Not a cache-key defect: the SRJ did not change. Hypothesis: intended native clearance propagation was omitted. Supported board minTraceToPadEdgeClearance is consumed separately, but does not establish a blanket track-to-track rule.

## 8. Impact

Misleading configuration can prevent engineers from reasoning about actual routing clearances. Changing settings alone never establishes manufacturing compliance.

## 9. Fix details, changed source and tests

No source patch to silently redefine the setting. Actual output checks stay enabled; tests/MRE and a supported API decision remain to be completed.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.
