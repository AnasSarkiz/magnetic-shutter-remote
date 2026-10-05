# Requested pour clearance is smaller in actual NPTH copper geometry

Status: **suspected**. Classification: **Confirmed geometry discrepancy; responsible package/root cause not yet confirmed**.

## Affected package / exact revision

@tscircuit/core 0.0.2035; @tscircuit/copper-pour-solver 0.0.62; circuit-json 0.0.509. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --input evidence/R5/grounding-first-routed/circuit.json --output evidence/R5/npth-reproduction.json
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

Selected JLC NPTH all-copper clearance is 0.20 mm: https://jlcpcb.com/capabilities/pcb-capabilities and https://jlcpcb.com/blog/npth-design-guide. The source request should not be represented as an actual measured clearance.

## Actual behavior

First R5 native pour configured 0.20 mm clearance. Independent actual BREP-to-circular-NPTH distances are 0.1968697634 and 0.1937395727 mm, below the 0.20 mm manufacturing requirement. No same-net or footprint exemption applies to NPTH.

## Evidence / logs / geometry

- [evidence/R5/grounding-first-routed/circuit.json](../evidence/R5/grounding-first-routed/circuit.json)
- [evidence/R5/grounding-manufacturing-audit.json](../evidence/R5/grounding-manufacturing-audit.json)
- [evidence/R5/grounding-manufacturing-audit.log](../evidence/R5/grounding-manufacturing-audit.log)
- [evidence/R5/copper-audit.json](../evidence/R5/copper-audit.json)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Confirmed geometry discrepancy; responsible package/root cause not yet confirmed. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

Final native pour clearance is deliberately 0.30 mm and is independently rechecked. Manufacturing threshold remains 0.20. Whether polygonised NPTH obstacles/chord offsets in the pour solver produce the discrepancy is a hypothesis; no upstream fix is claimed. The project mitigation is not a package fix.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
