# R8 shared electrical preview correction — 0.3.28

The user's hosted screenshot reproduces an empty PCB tab for0.3.27. Anonymous
get_preview_circuit_json returns enclosure.circuit.tsx with35 records including
17 CAD models but no pcb_board, pcb_smtpad, pcb_trace or schematic records. The
website uses that same payload for every electrical view. This is a preview
selection bug in our package configuration, not missing routes or damaged PCB.

Set previewComponentPath to index.circuit.tsx. Its unchanged qualified JSON has
one44×56×1mm PCB,44 fitted components,155 SMT pads,175 trace records,91 through
vias,44 schematic components and44 electrical source components. Keep both
index.circuit.tsx and enclosure.circuit.tsx in includeBoardFiles. Explain the
supported online-editor entry selection; the default 3D tab now shows the PCB.
Do not imply that the package page has a two-entry dropdown or still defaults
to the fitted enclosure. Add a regression test against the selected entry's
actual generated records, including PCB, schematic and BOM content.

No electrical or assembly source/build/model/geometry/print/firmware/dependency
changes, root PCB build or rerouting. All qualified physical artifacts are
retained byte-for-byte. Existing native51/mechanical30/browser110 geometry
checks remain carried forward for those identical artifacts, not newly run.
Run canonical light smoke and focused product tests. After publication verify
all files against staged bytes and the actual preview API against the qualified
PCB JSON; preserve errors and distinguish live browser, API and file checks.

Native27complete file storage was not a completed publication: transientHTTP502
responses made the CLI skip finalization. For this real configuration change,
use the installed official tsci push --include-dist --compress --version-tag
prototype option: one supported archive upload avoids hundreds of per-file
round trips, preserving the complete inventory. If the documented archive path
fails, the standard CLI's own fallback remains visible in its log; do not patch
publisher internals/readiness, remove inputs or create further blind drafts.

The running cloud proxy denies tscircuit.com (HTTP403). Its precise hostname
addition is saved in the environment draft; saving a draft does not apply it.
Live website verification remains blocked until supported configuration review,
save and publication. Registry readbacks remain available independently.

Original075/076/004/084, separate missing3V3 importer metadata and all physical
RF/BLE/shutter/battery/thermal/MagSafe/phone/print gates remain explicit. Stock
is not reserved or freshly rechecked by this display fix. Hardware is untested.
Frozen main/baselines, ordering/payment/contact restrictions and serial memory
guards remain unchanged; observed32GiB is not a guaranteed plan allocation.

Fresh validation: canonical light smoke passes38Python+2Bun/13assertions and
format/typecheck; focused product suite passes8tests/324assertions. The new
preview-content regression fails for the reported CAD-only configuration and
passes for the fixed selected PCB. Raw logs retain both outcomes.
