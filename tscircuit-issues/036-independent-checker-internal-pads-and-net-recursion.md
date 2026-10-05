# Independent manufacturing checker missed internal port connections and physical pad junctions

Status: **fixed locally**.

## Affected package and exact revision

Project scripts/manufacturing-audit.py, R3 2026-10-02. This is a project checker defect, not a tscircuit defect.

## Component and authoritative sources

SHOUHAN MSK12C02 / C431540: four repeated shell lands are explicitly internally connected in the canonical model. UNI-ROYAL 0603WAF1621T5E / C22844 R10: two ground tracks share an actual SMT pad. [MSK drawing](../references/SHOUHAN-MSK12C02.pdf), [supported unchanged import](../imports/MSK12C02.tsx).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
tooling/gerber-review-venv/bin/python -m unittest discover -s tests -v
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --input evidence/R3/route-attempt-29/circuit.json --output evidence/R3/repro-checker-route29.json
```

## Expected behavior

Resolve canonical explicit internal connections transitively and fail conflicting memberships. Separate same-net track spacing applies outside actual shared conductive pad geometry; remote parallel tracks remain checked. Unknown trace attribution must fail closed without recursion.

## Actual behavior

SW1 shell pad104 was falsely unconnected despite source_component_internal_connection recording its net. R10 tracks nominal gap .103366 mm share SMT pad138; outside actual pad, gap is .302911 mm (> .25). A source trace with no attribution recursed into itself. Two real via-to-pad failures were retained after classification repair.

## Logs, screenshots and measurements

[Original checker](../evidence/R3/manufacturing-audit-before-internal-pads.py), [original four findings](../evidence/R3/routed-manufacturing-29.json), [25-pass project/board regression log](../evidence/R3/checker-internal-pad-tests.log), [current zero-failure audit](../evidence/R3/routed-manufacturing-33.json).

## Root cause: confirmed facts and hypotheses

Confirmed project checker ignored explicit internal connectivity, classified only annuli as shared junctions, and followed an unattributed pcb_trace_id recursively. This does not imply an arbitrary same-footprint or same-net clearance exemption.

## Impact

False short/spacing findings, plus an unhelpful recursion failure hiding a separate core attribution defect (035).

## Fix details, changed source and regression tests

Changed only checker source and tests/test_manufacturing_audit.py. Internal connections are explicit model records, not matched by name/component; conflicting nets raise. Junction subtraction uses actual shared SMT/annular copper only, not a clearance envelope. Regression verifies remote parallel track violation still fails, same-footprint NPTH still fails, and unknown attribution fails precisely. All original manufacturing thresholds remain unchanged.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
