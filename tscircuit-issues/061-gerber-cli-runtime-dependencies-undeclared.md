# Gerber CLI runtime imports declared only as development dependencies

**Status: fixed locally. Classification: package integration/runtime dependency boundary.**

Affected:circuit-json-to-gerber0.0.109qualified source archive. `dist/cli.js`imports `archiver`and `commander`, but package manifest lists these in devDependencies. A consuming board install lacks them. No component-specific geometry is involved; observed during GCTUSB4215-03-A/C37616412export.

Reproduce: install the archive in a consumer with no archiver dependency, then `bun node_modules/circuit-json-to-gerber/dist/cli.js dist/index/circuit.json -o fabrication/R6/R6-gerbers.zip`. Original failed with missing `archiver`; canonical CLIcould not start. Expected export from installed package without undeclared application-side prerequisites.

Confirmed root cause: external runtime imports survive package build, so dev-only dependencies are not installed for the consumer. Local integration declares and locks `archiver7.0.1`and `commander12.1.0`in R6package.json/bun.lock; no generated exporter or CAM edits. Package source manifest remains an upstream repair item. This does not qualify an arbitrary substitute exporter.

[Failure/integration evidence](../evidence/R6/root-cli-dependencies.log), [consumer install](../evidence/R6/cli-root-install.log), [export command](../evidence/R6/suite-gerber.log), [complete readback](../evidence/R6/cam-readback/readback.json). Regression: `scripts/validate-r6-outputs.py`runs the installed CLIin the consumer, verifies12CAMfiles and exact copper/paste/drill/slot geometry. Final command and readback PASS. No warnings suppressed.
