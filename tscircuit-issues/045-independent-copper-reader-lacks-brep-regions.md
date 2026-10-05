# Independent checker cannot read native BREP copper pours

Status: **fixed locally**. Classification: **Project checker limitation, not a tscircuit defect**.

## Affected package / exact revision

Project manufacturing audit / review reader; Gerbonara 1.5.0; Shapely 2.1.2. Final archive hashes and source base revisions are in [R5 tooling manifest](../tooling/revisions-r5.json); original R4 imports and outputs remain protected.

## Components and sources

Where applicable: TI BQ25185DLHR / C19725033, DLH0010A, [TI SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), §7.4.1 and package/stencil examples. [Exact fitted identities](../bom.json). Additional USB identities/drawings are explicitly listed below. No fabricated electronic identity or footprint is introduced.

## Minimal reproduction / commands / inputs

Run from the R5 board directory unless the command explicitly changes directory:

```sh
tooling/gerber-review-venv/bin/python tscircuit-issues/evidence/045-brep-reader/manufacturing-audit.py --input dist/index/circuit.json --output /tmp/r5-old-reader.json
# Corrected reader:
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --input dist/index/circuit.json --output evidence/R5/brep-reproduction.json
tooling/gerber-review-venv/bin/python -m unittest discover -s tests -p test_curved_geometry.py -v
```

Use the preserved inputs linked below, the locked dependencies and supplied source. Network access is only needed to retrieve public supplier libraries; no account or upload is required.

## Expected behavior

Native circuit-json BREP schema: tooling/circuit-json/src/pcb/properties/brep.ts. Gerbonara ArcPoly.segments documents line/arc boundaries. Preserve holes and layer polarity; invalid rings must fail.

## Actual behavior

scripts/manufacturing-audit.py and scripts/review-r3-exports.py accepted polygon/flash geometry only. R5 native copper pours emit BREP outer/inner rings and Gerber regions. The old reader raises Unsupported pour shape / Unsupported Gerber primitive rather than validating planes.

## Evidence / logs / geometry

- [Original failing readers](evidence/045-brep-reader/README.md) and [exact rejection](evidence/045-brep-reader/before.log)
- [evidence/R5/grounding-manufacturing-audit.log](../evidence/R5/grounding-manufacturing-audit.log)
- [tests/test_curved_geometry.py](../tests/test_curved_geometry.py)
- [scripts/curved_geometry.py](../scripts/curved_geometry.py)

Before/after source, failing inputs and regression geometry are retained where applicable. No physical screenshot or physical test result is fabricated. Native/CAM views are generated evidence.

## Root-cause findings

Project checker limitation, not a tscircuit defect. The actual behavior above is confirmed by the saved input/output. Any unconfirmed responsible-package or geometric approximation explanation is a hypothesis, explicitly identified. Import success is not manufacturer acceptance.

## Impact

Can affect strict schematic/PCB schema consumption, artwork, stencil generation or manufacturing geometry qualification. Scope is limited to the behavior reproduced above; it does not imply physical hardware failure or camera/RF compatibility.

## Fix / changed files / regression / remaining blocker

Added scripts/curved_geometry.py with 0.000002 mm maximum chord sagitta; BREP bulges and Gerber arc centres are sampled independently. Polygon holes and clear polarity are retained. tests/test_curved_geometry.py covers empty holes, arc direction, independent circle agreement and invalid rings.

Verification results are in [R5 qualification summary](../evidence/R5/qualification-summary.json) and the exact linked regression logs. Do not interpret a local mitigation as verified upstream fixed. All reports are local; none was published.
