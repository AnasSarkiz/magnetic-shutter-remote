#!/bin/sh
# Design/export checks only: these do not grant assembly-process approval.
set -eu
cd "$(dirname "$0")/.."
mkdir -p evidence/R4 fabrication/R4
bun run format:check > evidence/R4/format-final.log 2>&1
bun run typecheck > evidence/R4/typecheck-final.log 2>&1
for check in netlist pin_specification source schematic-placement placement; do
  node_modules/.bin/tsci check "$check" index.circuit.tsx > "evidence/R4/check-$check.log" 2>&1
done
bun run build > evidence/R4/build-final.log 2>&1
node_modules/.bin/tsci check shorts dist/index/circuit.json > evidence/R4/shorts-final.log 2>&1
bun scripts/check-routed.ts evidence/R4/routed-checks.json > evidence/R4/native-checks-final.log 2>&1
node_modules/.bin/tsci snapshot index.circuit.tsx > evidence/R4/snapshot-final.log 2>&1
bun scripts/export-assembly.ts fabrication/R4 evidence/R4 > evidence/R4/export-assembly-final.log 2>&1
bun tooling/circuit-json-to-gerber/dist/cli.js dist/index/circuit.json -o fabrication/R4/R4-gerbers-review.zip > evidence/R4/export-gerbers-final.log 2>&1
tooling/gerber-review-venv/bin/python scripts/manufacturing-audit.py --input dist/index/circuit.json --output evidence/R4/copper-audit.json > evidence/R4/copper-audit-final.log 2>&1
tooling/gerber-review-venv/bin/python scripts/review-r3-exports.py fabrication/R4/R4-gerbers-review.zip dist/index/circuit.json --output-directory evidence/R4/cam-readback > evidence/R4/cam-readback-final.log 2>&1
tooling/gerber-review-venv/bin/python scripts/render-final-cam.py --archive fabrication/R4/R4-gerbers-review.zip --output-directory evidence/R4/cam-readback > evidence/R4/cam-render.log 2>&1
tooling/gerber-review-venv/bin/python scripts/render-legend-review.py > evidence/R4/legend-final.log 2>&1
tooling/gerber-review-venv/bin/python scripts/review-r4-manufacturing.py > evidence/R4/manufacturing-review-final.log 2>&1
tooling/gerber-review-venv/bin/python scripts/write-r4-reviews.py
bun run test > evidence/R4/tests-final.log 2>&1
printf '%s\n' 'Software/export checks pass; see VALIDATION.md for unresolved manufacturing gates.'
