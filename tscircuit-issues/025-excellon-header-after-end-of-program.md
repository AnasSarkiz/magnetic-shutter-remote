# Excellon header marker appears after the end of the drill program

Status: **verified fixed upstream**. Classification: **tscircuit exporter defect fixed in upstream release**.

## 1. Affected package and exact revision

circuit-json-to-gerber 0.0.104 bundled in CLI 0.1.2212; corrected in 0.0.109 base 40dbb6c0ebae9c63ef5a52292e8521de6060c548. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

R2 original drill exports; affects every fitted connector/drilled feature, not one part.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
unzip -p fabrication/R2-gerbers-review.zip drill-L1-L2.drl
unzip -p evidence/R3/R2-regenerated-slot-fix.zip drill-L1-L2.drl
```

## 4. Expected behavior

M48 begins the Excellon header before tool definitions. M30 ends the program. The header must not follow M30.

## 5. Actual behavior

Original R2 native file ends M30M48 and has no initial M48. Independent readers warn about header ordering.

## 6. Evidence

- [R2-slot-export-independent.json](evidence/025-excellon-header-after-end-of-program/R2-slot-export-independent.json) — original `evidence/R3/R2-slot-export-independent.json`
- [R2-slot-export-independent.log](evidence/025-excellon-header-after-end-of-program/R2-slot-export-independent.log) — original `evidence/R3/R2-slot-export-independent.log`
- [gerber-drill-regression.log](evidence/025-excellon-header-after-end-of-program/gerber-drill-regression.log) — original `evidence/R3/gerber-drill-regression.log`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed original exported bytes. The 0.0.109 converter adds M48 at the beginning. This release is preferred as the base instead of locally recreating the upstream correction. Separate G85 correction is tracked in 024.

## 8. Impact

Ambiguous/invalid drill header ordering; independent CAM acceptance blocked.

## 9. Fix details, changed source and tests

No local M48 patch. Upstream src/excellon-drill/convert-soup-to-excellon-drill-commands.ts starts builder.add("M48",{}). The regenerated supported CLI export starts M48 and the independent reader parses it successfully.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.
