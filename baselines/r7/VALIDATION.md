# R7 active validation — 2026-10-04

Revision: shutter-only order review, branch r7-shutter-only-order-review. Source PCB
baseline77965a8012d5544e962d987ce958c5c5614dbe3a. No PCB source/import/firmware change.
Prior torch research and earlier validation documents are preserved in
`evidence/R7-order-review/BEFORE-TORCH-CANCELLATION-*`. They are superseded scope.

|Stage|Status|Actual evidence / limitation|
|---|---|---|
|1 Requirements|passed for electronics prototype|36x56x1mm,2layers,37TOP,one110mAh battery/USB-C,no torch. Side actuator remains mechanical work.|
|2 Schematic/BOM|passed|Five native checks, all3A4 sheets reviewed;24exact identities live-listed sufficient for5boards before attrition.|
|3 Placement|passed|No placement errors; internalJ2 direction warning explicitly accepted; 3D/CPL/37refs reviewed.|
|4 Routing|passed|139native traces, copper/NPTH/PTH/via/pour classified audit zero failures; all GND SMT returns reach chargerEP; RFkeepout clear.|
|5 Automated/visual|blocked overall|Electrical/CAM checks, format/typecheck/snapshot pass; canonical79tests77pass/1fail/1skip. Protected R5ZIP missing; R2fixture absent. No skips/failures concealed.|
|6 Prototype fabrication approval|blocked before payment|Supplier processed preview absent; inspect USBmaskweb0.098247mm, shell process/coverage, carrier/rails, substitutions/stock,37TOPmapping and5finishedboards. Local order files prepared.|
|7 Physical prototype|not started|POST-PROTOTYPE PHYSICAL VALIDATION.|
|8 Public prototype release|blocked|R7 origin/confirmed public registry destination unconfigured; no remote update claimed.|

See [detailed order review](evidence/R7-order-review/ORDER-READINESS.md).
Current evidence lives only in `evidence/R7-order-review` and CAM/assembly files in
`fabrication/R7-order-review`; original R6 is not overwritten. Path helper regression
covers defaults, isolated outputs, directory escape and archive escape. Audit criteria
are unchanged. Tool/archive hashes and source patches are in `tooling/R7-patches/manifest.json`.

Accepted native warnings: internal J2 mating direction intentionally faces into the
housing, not outside; Q1/Q2 lack generic requires_power metadata despite verified
MOSFET pin mapping;59small native vias incur an extra fabrication charge. Snapshot
matches despite optional routing-cache serialization warning about a junction without
unique PCB port; validated physical traces are present and no generated JSON is edited.

Current Circuit JSON SHA256:68b46821c2155c58745ac16b71f3bb7ae120b80cce0a51de811fe6677944b07d.
Only source_project_metadata differs from frozenR6; current geometry/records otherwise
identical. Fresh supported build, native shorts check, supported Gerber/BOM/CPL exports
and independent slot-capable CAM readback were completed this run. Firmware artifacts
retain the successful R6 build with unchanged final GPIO and source; hashes rechecked.

Historical importer7,685 assertionsPASS; current generic extension9,174 assertionsPASS;
33baseline full-suite failures remain. No full-importer-suite passing claim. No PCB
routing, copper, component substitutions or larger-battery charging edits made.

Preservation: originalR6 2,898/2,898 match; R4/R5 971/972 match with exact missing ZIP
recorded in issue074. Missing historical R2 negative-test input is separately reported
as NOT RUN. No original project writes during this run. Local Git changes do not imply
public publication or fabrication approval. No supplier upload, order or payment.
