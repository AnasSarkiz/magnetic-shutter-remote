# Native routing returns copper with real shorts and manufacturing clearance failures

Status: **suspected**. Classification: **observed failed output; algorithm root cause not established**.

## 1. Affected package and exact revision

@tscircuit/core 0.0.2035 local R3 patches; capacity-autorouter 0.0.951; beta_pipeline9. Working dependency archives/locks are kept in `tooling/vendor/` and the board manifest. Fixed locally never means published upstream.

## 2. Components and sources

37 fitted references / 24 verified C-numbers; see project BOM.csv and unchanged imports.

- [Core source](https://github.com/tscircuit/core/tree/3fcbb3842b8ab1c0af324078f6eb55c3dbcba1a0)
- [Gerber converter source](https://github.com/tscircuit/circuit-json-to-gerber/tree/40dbb6c0ebae9c63ef5a52292e8521de6060c548)
- [JLCPCB C431540](https://jlcpcb.com/partdetail/C431540), [C8545](https://jlcpcb.com/partdetail/C8545), [C5184243](https://jlcpcb.com/partdetail/C5184243), [C5252714](https://jlcpcb.com/partdetail/C5252714)
- [Excellon programming manual](https://static1.squarespace.com/static/54982a02e4b02e9f5e5d9ca7/t/577e77209f74568b965f785e/1467905825798/Excellon%2BAutomation%2BCo.pdf)
- [KiCad Excellon reader source](https://docs.kicad.org/doxygen/excellon__read__drill__file_8cpp_source.html)

## 3. Minimal reproduction and required inputs

Run test commands from the identified tooling package directory; project build/converter commands from the board root. Install the retained package lock with Bun 1.3.9. Imported fixture files retain their supplier source geometry. Before logs identify actually reproduced failures, not guessed upstream outcomes.

```sh
bun run build
bun scripts/check-routed.ts
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --output evidence/R3/routed-manufacturing.json
```

## 4. Expected behavior

Every required connection must be routed without shorts or clearance violations. The project cannot be a prototype fabrication candidate until native and independent checks pass.

## 5. Actual behavior

Route attempt 10: 83 native error records (27 trace, 17 via-to-trace, 15 pad-to-trace, 14 pad-to-pad, 8 placement, 2 via clearance). Classified independent audit reports 90 failures, including zero-distance copper intersections and vias under unrelated pads.

## 6. Evidence

- [remote-circuit.tsx](evidence/027-native-routing-output-has-shorts-and-clearance-failures/remote-circuit.tsx) — original `evidence/R3/route-attempt-10/remote-circuit.tsx`
- [circuit.json](evidence/027-native-routing-output-has-shorts-and-clearance-failures/circuit.json) — original `evidence/R3/route-attempt-10/circuit.json`
- [routed-build-10-radio-escape.log](evidence/027-native-routing-output-has-shorts-and-clearance-failures/routed-build-10-radio-escape.log) — original `evidence/R3/routed-build-10-radio-escape.log`
- [routed-manufacturing-10.log](evidence/027-native-routing-output-has-shorts-and-clearance-failures/routed-manufacturing-10.log) — original `evidence/R3/routed-manufacturing-10.log`
- [routed-manufacturing-10.json](evidence/027-native-routing-output-has-shorts-and-clearance-failures/routed-manufacturing-10.json) — original `evidence/R3/routed-manufacturing-10.json`

Original files remain in their listed paths. No unavailable screenshot or physical test is claimed reviewed. The board/schema inputs are unmodified; only canonical generator/source fixes are made.

## 7. Root cause: confirmed facts and hypotheses

Confirmed generated failures; not all are merely a strict-threshold disagreement. Scope includes routing configuration, placement, preloaded escape handling and solver output. Hypotheses must not be labeled confirmed tscircuit bugs. Supplier imports and generated output were not patched.

## 8. Impact

Blocks copper validation and fabrication-candidate status. All electronics still on top; two copper layers do not imply two-sided assembly.

## 9. Fix details, changed source and tests

No claimed fix. Original attempt 10 source/JSON and logs retained. Other documented native pipelines are being evaluated. Independent checks are neither weakened nor bypassed.

## 10. Verification and remaining blocker

Keep local source patches, untracked regression fixtures, dependency locks and the linked evidence together. Whole-board fabrication remains blocked independently of the individual fixed reports. Battery, thermal, RF, physical fit and phone tests remain pending. No packages, GitHub reports, supplier questions or assembly orders were published.

## Final R3 disposition (2026-10-02)

Earlier failing copper remains preserved. Actual source integration fixes (028, 031, 035) plus native board escape/placement choices and 0.25 mm automatic via drills yield zero native errors and zero classified manufacturing failures in attempt 33. This does not establish a generic autorouter algorithm fix. No physical component or supplier footprint changed to hide clearance violations.

## R5 reproduced trials and final disposition

Ground-plane trials reserving an unbroken BOTTOM patch rerouted signals and emitted actual via/pad/ordinary-hole violations. [Trial evidence](../evidence/R5/solid-ep-first-routed/), [later reservation failure](../evidence/R5/routed-final-build.log), [current source](../src/remote-circuit.tsx). Responsible routing algorithm/root cause remains unconfirmed. R5 keeps solid TOP and BOTTOM GND pours with a native TOP charger region; it does not force an unnecessary unbroken BOTTOM projection. Original router minimums are retained, and the final routed/native and independent source/CAM checks have zero failures. [Full final suite](../evidence/R5/suite-exits.json), [copper audit](../evidence/R5/copper-audit.json), [ground proof](../evidence/R5/ground-plane-review.json). No error records, geometry or thresholds were patched to pass.
