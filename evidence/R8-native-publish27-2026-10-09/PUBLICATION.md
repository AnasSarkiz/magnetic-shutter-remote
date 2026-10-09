# R8 0.3.27 — all326files exact, finalization blocked after gateway errors

Observed 2026-10-09T22:11:22.168851+02:00 (Europe/Bratislava).

Native package: https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8#3d
Release0.3.27-prototype, IDb67f9a8a-0250-4b84-a9ec-ddd26e415911.

The controlled official guarded tsci push exits1after324acknowledged uploads and
2HTTP502responses from registry-api.tscircuit.com, POST/package_files/create:
- evidence/R8-reference18-2026-10-07/failed-route10/circuit.json
- imports/ESPC2_12E_N4/ESPC2_12E_N4.step

Anonymous public inventory and actual byte downloads prove BOTHreported failures
persisted. All326native files exactly match their staged hashes; missing/extra/
duplicate paths are zero and staged files did not change. All17model assets,
fourCircuitJSONs, validatedPCB, enclosure entry/config, firmware, source and
qualified archives are present/exact. Storage upload is complete.

Publication finalization is BLOCKED. The official CLI returns before its final
package_releases/update operation whenever an upload response fails, even when
actual stored bytes match. Thus ready_to_build=false and display_status=pending;
no hosted render completion is observed. The installed CLI has no supported
existing-release resume/finalize command. Its public library exports no registry
client/finalization helper. No copied publisher internals, credential extraction,
readiness patch, fake render success or further unchanged draft is used.
Required recovery: a supported CLI/registry finalization path for this exact
verified release, or reliable official uploads. This is a publishing-service
blocker; it is not evidence of changed circuit connectivity or geometry.

Source63df487fcf0c25f5e93b3b2b4091b223e738b9cb is public. Exact anonymous readback verifies13preparation/receipt
files and allfourCircuitJSONs. Native source/artifacts, PCB/electronics/copper/
placement/imports/BOM/Gerbers, enclosure geometry/models/prints, dependencies/
lockfile, firmware/toolchain, light setup/start and serial guards are unchanged.
Previous26failure and prior25complete-upload records remain preserved. Shared
viewer addition is fully reverted and PR1024remains closed/unmerged.

Fresh26light smoke38Python+2Bun/13assertions and7product/315assertions remain
valid for unchanged code/toolchain. Native51checks/30windingchecks/110browser
poses are carried forward with exact models/builds, not freshly rerun here.
Actual parent limit34359738368bytes (32GiB), not guaranteed plan allocation;
OOM/kill counters remain1/1with no increase. Official browser sign-in completed;
no credentials/URLs/tokens/passwords are copied into project files. No network/
proxy/TLS/guard changes, rootPCB/routing/SDK/CAM/3Dbuild, order/payment/supplier
contact, tooling publication, PR merge or environment sharing.

Original075/076/004/084 and missing3V3power metadata as a separate importer issue
remain explicit. Physical RF/BLE/shutter/phone/case/MagSafe/harness/battery/thermal
qualification is pending; this is an untested engineering prototype.

Raw command: checks/registry-push.log. Actual public full byte checks:
registry-upload-observation.json and checks/registry-readback.log.
Staging/preservation: stage-comparison.json and preservation.json.
Final source/receipt/status readback follows outside the repository under
/workspace/r8-publish27-20261009/.
