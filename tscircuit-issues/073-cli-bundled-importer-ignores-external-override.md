# CLI bundle retains older importer despite dependency override

**Status: fixed locally.**

## Scope and exact producer

@tscircuit/cli0.1.2237 plus easyeda0.0.364 local parser extension.

UMW PT4115 / C347356; relates to070.

## Reproduction and preserved inputs

Install the extended importer while retaining the original bundled CLI; run `tsci import C347356`. Then rebuild canonical CLI with the fixed importer and install tooling/vendor/tscircuit-cli-r7-importer-integration.tgz; repeat the supported command.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected CLI import to execute the installed fixed conversion. Actual `PT4115-final-supported-import.log` still failed with curved SOLIDREGION gge1076 because the CLI already contained the previous importer bundle. This is local package integration behavior; no confirmed upstream runtime defect.

## Root cause, impact and disposition

Rebuilt CLI through its canonical bundler with the corrected dependency. No runtime monkey patch or generated-import edit. Supported import then succeeds, retains exact supplier footprint (49.75% footprinter IoU), and fixture/CAM check passes. Locked archive records exact runtime. Earlier failing log remains unchanged; its filename is not evidence of final success.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Failure despite override](../evidence/R7-components/PT4115-final-supported-import.log), [successful supported import](../evidence/R7-components/PT4115-supported-import-rebuilt-cli.log), [CLI build](../evidence/R7-components/cli-integration/build.log), [fixture build](../evidence/R7-components/PT4115-supported-final-build.log), [CLI source](../tooling/r7-cli-source/cli/import/import-jlcpcb-part.ts).
