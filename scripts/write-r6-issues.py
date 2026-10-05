"""Preserve focused R6 toolchain findings and reproductions; local reports only."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
reports={
'060-strict-cpl-export-requires-numeric-pin1.md':'''# Strict CPL export requires numeric pin1 on a valid labelled connector

**Status: fixed locally. Classification: assembly-export API limitation, not a supplier footprint defect.**

Affected: circuit-json-to-pnp-csv0.0.16in R5; official0.0.19sourcecontrol712beb9c195c521af5f0112c56cda4dd716e693bhas the same pin1-only limitation. Local implementationcommit6cb24bc, documentationcommit0f2f881cde20804b365ccfa48b9e9a0396891eeb, branch qualification/supplier-terminal-registration.

Component:GCT USB4215-03-A /C37616412; [official drawing](https://gct.co/connector/usb4215), [assembly listing](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412). Manufacturer terminals are A1B12/etc/EH1–4, imported terminals13–28. No numeric pin1 is documented; the supplier geometry/pin map must not be fabricated to fit an exporter assumption.

## Reproduction / inputs

From the R6project: `bun scripts/export-assembly.ts fabrication/R6 evidence/R6`. Original strict call without `supplierFootprints` rejects the USBmodel with `missing_pin1_location`. Exact routed/supplier input fixtures: `../tooling/circuit-json-to-pnp-csv/tests/assets/usb4215-r6.circuit.json`, `usb4215-supplier.circuit.json`. The original importer output is `../evidence/USB4215-import-audit/final/USB4215_03_A.tsx` and is unchanged.

Minimal API reproduction/test: `cd tooling/circuit-json-to-pnp-csv && bun test tests/supplier-terminal-registration.test.ts`. The test explicitly proves the original strict API rejects the fixture.

## Expected / actual

Expected: verify an exact labelled supplier footprint's assembly orientation without invented terminal numbering. Actual: strict rotation requires pin1 metadata and cannot export J1, despite all16real terminal coordinates matching. No safe caller-only fix exists that preserves strict validation and immutable imports.

## Root cause / fix

Confirmed pin1-only resolver cannot express this exact terminal numbering. Add explicit exact-C-number `supplierFootprints` input and `registerSupplierTerminals`; require exact MPN/C-number, unique labelled terminal pairing, one unrotated TOPsupplier model and one unique orthogonal pose. All16positions must match within1µm numerical tolerance. BOTTOM/reflection/missing/moved/ambiguous/wrong-part inputs fail. Existing pin1 path unchanged; no fallback, synthetic pin1, schema mutation or imported geometry edit.

Changed source: `src/index.ts`, `src/supplier-terminal-registration.ts`; meaningful positive and negative tests plus actual fixtures. `bun test`55tests/347assertions PASS; TypeScript and build PASS. [Tests](../evidence/R6/pnp-tests.log), [typecheck](../evidence/R6/pnp-typecheck.log), [build](../evidence/R6/pnp-build.log), [terminal pose](../evidence/R6/J1-supplier-terminal-registration.json), [assembly image](../evidence/R6/visual/assembly-2.png). Final J1centroid(0,24.5101989), rotation180°,16/16positionsmatch, independent Python agrees. No PCBcomponent altered. Toolsource and patch/archive reproduced via `tooling/R6-README.md`.

Impact: blocks trustworthy CPLexport until tool capability is fixed. Local fix is prototype-qualified; no upstream publication or upstream-fix claim.
''',
'061-gerber-cli-runtime-dependencies-undeclared.md':'''# Gerber CLI runtime imports declared only as development dependencies

**Status: fixed locally. Classification: package integration/runtime dependency boundary.**

Affected:circuit-json-to-gerber0.0.109qualified source archive. `dist/cli.js`imports `archiver`and `commander`, but package manifest lists these in devDependencies. A consuming board install lacks them. No component-specific geometry is involved; observed during GCTUSB4215-03-A/C37616412export.

Reproduce: install the archive in a consumer with no archiver dependency, then `bun node_modules/circuit-json-to-gerber/dist/cli.js dist/index/circuit.json -o fabrication/R6/R6-gerbers.zip`. Original failed with missing `archiver`; canonical CLIcould not start. Expected export from installed package without undeclared application-side prerequisites.

Confirmed root cause: external runtime imports survive package build, so dev-only dependencies are not installed for the consumer. Local integration declares and locks `archiver7.0.1`and `commander12.1.0`in R6package.json/bun.lock; no generated exporter or CAM edits. Package source manifest remains an upstream repair item. This does not qualify an arbitrary substitute exporter.

[Failure/integration evidence](../evidence/R6/), [consumer install](../evidence/R6/cli-root-install.log), [export command](../evidence/R6/suite-gerber.log), [complete readback](../evidence/R6/cam-readback/readback.json). Regression: `scripts/validate-r6-outputs.py`runs the installed CLIin the consumer, verifies12CAMfiles and exact copper/paste/drill/slot geometry. Final command and readback PASS. No warnings suppressed.
''',
'062-shorts-cli-bundles-incompatible-polygon-paste-exporter.md':'''# CLI Gerber shorts check uses an exporter without polygon paste support

**Status: fixed locally. Classification: stale/incompatible bundled dependency integration; no unexplained PCB failure labelled as a shorts bug.**

Affected: installed @tscircuit/cli0.1.2212 (tscircuit0.0.2702), bundled @tscircuit/check-shorts0.0.26/Gerber implementation. GCTUSB4215-03-A /C37616412. The full board's16supplier paste polygons are valid and preserved through the qualified native exporter.

## Reproduce

Unmodified failing input: current16-polygon fixture under `tooling/cli/tests/cli/check/usb4215-polygon-paste.circuit.json`. From R6with the originalCLI: `tsci check shorts dist/index/circuit.json`. [Original failure](../evidence/R6/suite-shorts.log) records `Unsupported shape polygon`. The default Gerber path generates a complete layer set, and its bundled paste-aperture function lacks polygon support. This fails before shorts can be assessed; zero shorts must not be inferred from that failure.

Expected: faithful native paste regions and a functioning copper check; [manufacturer geometry](../references/GCT-USB4215-drawing-Rev-A.pdf), [16-contour evidence](../evidence/R6/manufacturing-review.json).

## Fix / regression

OfficialCLIcontrol9526d14407120525a08367391d65106513c09db4,0.1.2237. Focused local dependency overrides integrate the qualified source Gerber/schema/props/core/eval archives; canonical `bun run build`rebuilds bundled tooling. No generated bundle edits, PCBJSONpatch, shape deletion, bypass flag, alternate weaker check or test-mode setting. CLIload behavior remains unchanged.

Local branch qualification/usb4215-polygon-export-integration, fixedcommitb07c78a2b1d36900a6e514f9e5c7ec504f6781e9. Changed `package.json`,`bun.lock`; new `tests/cli/check/usb4215-polygon-paste.test.ts`and full fixture. 2tests/3assertions PASS: actual board has no shorts, deliberately bridged VBUS/CC1 MUSTdetect a short. [Regression](../evidence/R6/cli-polygon-shorts-regression.log), [canonical build](../evidence/R6/cli-qualified-build.log), [corrected command](../evidence/R6/qualified-cli-shorts.log). `bun pm pack`creates the supported local CLIarchive and R6locks it. Npm pack encountered upstream poppygl override conflict; canonical Bunpack passes. This is local integration, not a claim the published upstream package fixes polygon paste.

Root cause confirmed by bundled unsupported-shape function and successful controlled rebuild/negative test. Final required check passes; fullCLIsuite is not claimed passing. [Actual CAM TOP/BOTTOM](../evidence/R6/visual/CAM-top-all-drills.png).
''',
'063-resvg-panics-on-tight-cam-svg-crop.md':'''# Resvg panics when rasterizing a tightly cropped dense CAM SVG

**Status: suspected. Classification: renderer/library failure, not a confirmed tscircuit geometry bug.**

Affected:@resvg/resvg-js2.6.2in R6tooling. Input is independent CAMreader SVGderived from the unchanged final Gerbers; no component import or fabrication geometry is changed. USBarea shows GCTUSB4215-03-A/C37616412.

Reproduce from R6: `bun tscircuit-issues/evidence/063/repro.ts`. Required input is `evidence/R6/cam-readback/CAM-top-all-drills.svg`; viewBox changed for a presentation-only crop to(-8,-29,16,11). Original whole-board PNG renders successfully. Expected a cropped PNG; actual native Rustpanic `geom.rs:27:61`, `Option::unwrap()`on None, fatal runtime error.

Root cause NOTconfirmed. Hypothesis:numerical clipping edge case in resvg on dense paths outside a small viewport. No evidence of invalid exported copper. The whole-board SVG/PNG, numerical copper/slot/mask/paste checks and native high-zoom viewer remain usable. No errors suppressed and no manufacturing file edited. Full-layer renders are retained rather than calling the failed crop complete.

[Reproducer](evidence/063/repro.ts), [panic log](evidence/063/panic.log), [successful whole view](../evidence/R6/visual/CAM-top-all-drills.png), [source CAM](../evidence/R6/cam-readback/CAM-top-all-drills.svg). Remaining blocker: responsible renderer cause untriaged; not a prototype fabrication blocker. No upstream issue created.
'''}
for filename,body in reports.items():(ROOT/'tscircuit-issues'/filename).write_text(body.strip()+'\n')
p=ROOT/'tscircuit-issues/README.md';s=p.read_text();s+='\n\n## R6 additions and qualification history\n\nR5/R4 reports remain historical; R6 prototype-only process disposition is in `../R6-QUALIFICATION.md`. Production approval is not implied.\n\n| Issue | Affected package | Status | Report |\n|---|---|---|---|\n'
for filename,body in reports.items():
 status='suspected' if filename.startswith('063') else 'fixed locally';package={'060':'circuit-json-to-pnp-csv 0.0.19','061':'circuit-json-to-gerber 0.0.109','062':'@tscircuit/cli 0.1.2212 → local0.1.2237','063':'@resvg/resvg-js 2.6.2'}[filename[:3]];s+=f'|{filename[:3]}|{package}|{status}|[{body.splitlines()[0][2:]}]({filename})|\n'
s+='\n[USB4215 issues053–059](../evidence/USB4215-import-audit/tscircuit-issues/README.md) preserve the paste/mask/schema/renderer/CAM fixes and33baseline importer failures. These local reports and original inputs are included in the R6editable package. No report was deleted or published.\n';p.write_text(s)
