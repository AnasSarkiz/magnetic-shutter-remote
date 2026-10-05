# Filled circular-arc paste region rejected by supported importer

**Status: fixed locally.**

## Scope and exact producer

easyeda0.0.364, extends USB4215 fixed commit2f52a09 on qualification/usb4215-paste-fidelity; local R7 archive is separately hashed.

UMW PT4115 / C347356; [JLC listing](https://jlcpcb.com/partdetail/C347356).

## Reproduction and preserved inputs

Original: `node_modules/.bin/tsci import C347356`. Parser tests: from tooling/r7-easyeda-source run `bun test tests/explicit-paste-regions.test.ts tests/source-paste-mask-field-fidelity.test.ts tests/circular-paste-path.test.ts`. Build fixture with `tsci build fixtures/r7/pt4115-import.circuit.tsx --pcb-svgs`.

Commands are retained reproduction instructions; they were not all rerun during the shutter-only order review. Inputs and original/control logs are linked below.

## Expected and actual behavior

Expected all five closed supplier paste contours preserved. Actual original error: `Unsupported curved paste SOLIDREGION gge1076`. Source SVG circular arcs were rejected by the prior straight-only parser.

## Root cause, impact and disposition

lib/utils/closed-paste-path-to-points.ts plus lib/convert-easyeda-json-to-tscircuit-soup-json.ts now support bounded circular-arc flattening (0.0001 mm chord error), validated line/arc endpoint semantics, and explicit failure for unsupported/malformed paths. No geometry patched after conversion. Five contours preserved; source-to-JSON maximum0.000097674624 mm, JSON-to-CAM0.000000640071 mm. Eight focused tests/9,174 assertions pass, including retained7,685 USB assertions. Full importer suite NOT claimed passing;33 baseline failures remain.

Torch-only candidates are not fitted on the active board. No upstream fix/publication is claimed. Toolchain source/archives are recorded in [R7 toolchain](../tooling/R7-README.md); PCB source remains frozen R6 geometry.

## Evidence / source / regressions

[Original raw input](evidence/070-curved-paste-import/C347356.raweasy.json), [failure](evidence/070-curved-paste-import/PT4115-import.log), [focused tests](../evidence/R7-components/importer-focused-with-curves.log), [independent CAM measurement](../evidence/R7-components/PT4115-paste-readback.json), [source](../tooling/r7-easyeda-source/lib/utils/closed-paste-path-to-points.ts), [regression](../tooling/r7-easyeda-source/tests/circular-paste-path.test.ts).
