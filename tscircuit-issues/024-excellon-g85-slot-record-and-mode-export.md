# USB plated slots export as ambiguous separate G85 records

Status: **fixed locally**. Classification: **tscircuit manufacturing exporter defect**.

## 1. Affected package and exact revision

circuit-json-to-gerber 0.0.104 bundled in CLI 0.1.2212; 0.0.109 base 40dbb6c0ebae9c63ef5a52292e8521de6060c548 also has the slot-record defect. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

GCT USB4105-GF-A-120 / C5184243 (R2); XUNPU TYPEC-250Y-BRP6L68 / C5252714 (R3).

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
bun test tests/excellon-drill/independent-g85-slot-records.test.ts
# Board root, after supported converter build:
bun tooling/circuit-json-to-gerber/dist/cli.js evidence/R3/R2-inputs/dist/index/circuit.json -o evidence/R3/R2-regenerated-slot-fix.zip
tooling/gerber-review-venv/bin/python scripts/inspect-exported-slots.py evidence/R3/R2-regenerated-slot-fix.zip evidence/R3/R2-inputs/dist/index/circuit.json --output evidence/R3/R2-slot-export-independent.json
```

## 4. Expected behavior

Excellon G85 start and end coordinates belong on one record. Restore G05 drill mode after the slot. Original Excellon programming manual and KiCad parser support this form. Supplier slot dimensions must be preserved.

## 5. Actual behavior

Separate XstartYstart and G85XendYend records, with no G05 return. KiCad Gerber Viewer renders long zigzag cuts between USB slots and later via locations. Numeric endpoint-only review missed this interpretation failure.

## 6. Evidence

- [R2-g85-reader-before.png](evidence/024-excellon-g85-slot-record-and-mode-export/R2-g85-reader-before.png) — original `evidence/R3/R2-g85-reader-before.png`
- [gerber-slot-before.log](evidence/024-excellon-g85-slot-record-and-mode-export/gerber-slot-before.log) — original `evidence/R3/gerber-slot-before.log`
- [gerber-slot-after.log](evidence/024-excellon-g85-slot-record-and-mode-export/gerber-slot-after.log) — original `evidence/R3/gerber-slot-after.log`
- [gerber-drill-regression.log](evidence/024-excellon-g85-slot-record-and-mode-export/gerber-drill-regression.log) — original `evidence/R3/gerber-drill-regression.log`
- [gerber-full-regression.log](evidence/024-excellon-g85-slot-record-and-mode-export/gerber-full-regression.log) — original `evidence/R3/gerber-full-regression.log`
- [gerber-snapshot-baseline.log](evidence/024-excellon-g85-slot-record-and-mode-export/gerber-snapshot-baseline.log) — original `evidence/R3/gerber-snapshot-baseline.log`
- [R2-slot-export-independent.json](evidence/024-excellon-g85-slot-record-and-mode-export/R2-slot-export-independent.json) — original `evidence/R3/R2-slot-export-independent.json`
- [R2-slot-export-independent.log](evidence/024-excellon-g85-slot-record-and-mode-export/R2-slot-export-independent.log) — original `evidence/R3/R2-slot-export-independent.log`
- [independent-g85-slot-records.test.ts](evidence/024-excellon-g85-slot-record-and-mode-export/independent-g85-slot-records.test.ts) — original `tooling/circuit-json-to-gerber/tests/excellon-drill/independent-g85-slot-records.test.ts`
- [inspect-exported-slots.py](evidence/024-excellon-g85-slot-record-and-mode-export/inspect-exported-slots.py) — original `scripts/inspect-exported-slots.py`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed: KiCad source DRILL_G_SLOT sets slot mode for standalone G85; its coordinate handler handles inline G85. The converter emitted the standalone form. Local correction emits XstartYstartG85XendYend followed by G05, preserving start/end geometry. It uses four decimal places for both endpoints.

## 8. Impact

Unsafe drill-file interpretation; manufacturing approval was blocked. Not a supplier footprint error.

## 9. Fix details, changed source and tests

src/excellon-drill/commands/G85.ts and convert-soup-to-excellon-drill-commands.ts. tests/excellon-drill/independent-g85-slot-records.test.ts uses the unmodified failing real-board Circuit JSON. Drill suite: 35 passes/127 assertions. Independent pcb-tools 0.1.6 reads all four regenerated R2 slots and matches source within exporter quantization. Full suite: 170 passes and two changed visual snapshots under investigation; no snapshots accepted merely to pass. Mac lock prevents post-fix KiCad screenshot for now.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.

## Final R3 disposition (2026-10-02)

Canonical full Gerber suite: 172 pass, 0 fail, 1640 assertions; reviewed changed snapshots. [Full log](../evidence/R3/gerber-full-regression-reviewed.log). Final source/export readback verifies all slots and round drills.
