# 094 — Named schematic pin arrangement produces invalid Circuit JSON

Classification: pinned core/schema interoperability defect, not a component import, physical short or missing net.

Supported props accept `schPinArrangement={{leftSide:["pin2"],rightSide:["pin1","pin4","pin3"]}}`. The route22 build succeeds but emits string pins in `schematic_component_9.port_arrangement`; the installed Circuit JSON schema requires numeric pins. Full native-schema parsing correctly rejects element408. Original source, generated JSON and actual failure log remain in `evidence/R8-compact-pcb-2026-10-06/failed-route22-schema/`.

Use the supported numeric pin form `[2]` / `[1,4,3]` at the board call site. This makes J2 VBAT alone left and GND terminals right while preserving exact imported component, terminal/net mapping and PCB geometry. No schema relaxation, generated artifact edit, warning suppression or generic upstream fix is claimed. Final full-schema/placement/electrical/copper/export checks must pass before publication.

Missing `3V3` metadata remains a separate importer issue.

Final compact route23: full native-schema/DRC/shorts and independent copper,
physical connectivity, width/current, export/readback/process/visual checks pass.
Retained failures are historical controls; no generic upstream fix is claimed.
