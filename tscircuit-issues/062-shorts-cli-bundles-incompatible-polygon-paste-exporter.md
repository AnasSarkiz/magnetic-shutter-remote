# CLI Gerber shorts check uses an exporter without polygon paste support

**Status: fixed locally. Classification: stale/incompatible bundled dependency integration; no unexplained PCB failure labelled as a shorts bug.**

Affected: installed @tscircuit/cli0.1.2212 (tscircuit0.0.2702), bundled @tscircuit/check-shorts0.0.26/Gerber implementation. GCTUSB4215-03-A /C37616412. The full board's16supplier paste polygons are valid and preserved through the qualified native exporter.

## Reproduce

Unmodified failing input: current16-polygon fixture under `tooling/cli/tests/cli/check/usb4215-polygon-paste.circuit.json`. From R6with the originalCLI: `tsci check shorts dist/index/circuit.json`. [Original failure](../evidence/R6/cli-original-polygon-failure.log) records `Unsupported shape polygon`. The default Gerber path generates a complete layer set, and its bundled paste-aperture function lacks polygon support. This fails before shorts can be assessed; zero shorts must not be inferred from that failure.

Expected: faithful native paste regions and a functioning copper check; [manufacturer geometry](../references/GCT-USB4215-drawing-Rev-A.pdf), [16-contour evidence](../evidence/R6/manufacturing-review.json).

## Fix / regression

OfficialCLIcontrol9526d14407120525a08367391d65106513c09db4,0.1.2237. Focused local dependency overrides integrate the qualified source Gerber/schema/props/core/eval archives; canonical `bun run build`rebuilds bundled tooling. No generated bundle edits, PCBJSONpatch, shape deletion, bypass flag, alternate weaker check or test-mode setting. CLIload behavior remains unchanged.

Local branch qualification/usb4215-polygon-export-integration, fixedcommitb07c78a2b1d36900a6e514f9e5c7ec504f6781e9. Changed `package.json`,`bun.lock`; new `tests/cli/check/usb4215-polygon-paste.test.ts`and full fixture. 2tests/3assertions PASS: actual board has no shorts, deliberately bridged VBUS/CC1 MUSTdetect a short. [Regression](../evidence/R6/cli-polygon-shorts-regression.log), [canonical build](../evidence/R6/cli-qualified-build.log), [corrected command](../evidence/R6/qualified-cli-shorts.log). `bun pm pack`creates the supported local CLIarchive and R6locks it. Npm pack encountered upstream poppygl override conflict; canonical Bunpack passes. This is local integration, not a claim the published upstream package fixes polygon paste.

Root cause confirmed by bundled unsupported-shape function and successful controlled rebuild/negative test. Final required check passes; fullCLIsuite is not claimed passing. [Actual CAM TOP/BOTTOM](../evidence/R6/visual/CAM-top-all-drills.png).
