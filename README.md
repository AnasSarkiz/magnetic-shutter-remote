# Magnetic shutter remote R8 — ESP32-C3 migration qualification

**Codex Cloud continuation:** use branch `cloud/r8-cloud-setup`; read [cloud setup](cloud/SETUP.md) and the complete [project handoff](cloud/HANDOFF.md). Source, imported models, relevant manufacturer evidence, exact qualified archives and frozen generated Nordic JSON are included. Heavy builds are Linux-only and never started by setup.

Private Cloud environment **magnetic-shutter-remote-r8** is published: choose Work in → Cloud → that environment. Actual hosted setup/smoke passed with10 focused tests; observed32 GiB/4 CPUs. See the [environment record](cloud/ENVIRONMENT-RECORD.json), [current setup status](cloud/STATUS.md) and [continuation prompt](cloud/TASK-PROMPT.md). This local chat does not automatically move to Cloud, and environment readiness does not close board qualification gates.

**COMPONENT QUALIFICATION BLOCKED — NOT FOR FABRICATION.**

User-selected module: Espressif ESP32-C3-WROOM-02-N4 / JLCPCB C2934560. This isolated revision starts from `../magnetic-shutter-remote-r7--01a0f81f`, branch `r7-shutter-only-order-review`, commit `636d2b24eb4db775fceeb81206541f249db3b9a5`. Frozen R6 commit is `77965a8012d5544e962d987ce958c5c5614dbe3a`. Neither previous directory was modified.

The root `index.circuit.tsx`, `src/remote-circuit.tsx`, BOM and mechanical files remain the starting Nordic design. **They are not an implemented ESP32-C3 board.** Building that entry point does not validate R8. No R8 placement, routing, fabrication export or ordering approval exists. No torch is included.

Completed independent work:

- Supported, unchanged JLCPCB imports of the selected module and proposed TPS63031DSKR / C15516 regulator.
- All 19 module pin identities checked against Espressif; all 27 imported pad features match original supplier geometry.
- Isolated native A4 schematic, PCB and 3D import fixture rendered with routing disabled.
- ESP32-C3 Zephyr BLE HID firmware port compiled; valid image checksum verified. GPIO assignment remains proposed until a qualified board exists.
- Five focused qualification tests and TypeScript/format checks; these are not whole-board DFM tests.
- Documented power/battery feasibility and original-revision preservation manifest.

The blocking discrepancy is documented in [issue 075](tscircuit-issues/075-esp32-c3-supplier-lands-differ-from-espressif-recommendation.md): supplier outer lands are approximately 2.0 × 1.0 mm, versus Espressif's recommended 1.5 × 0.9 mm. The importer faithfully preserves them. This is an unqualified supplier variation, not a proven importer scaling bug or a proven assembly failure. Workspace instructions prohibit silently altering the import and require dependent work to stop. [Issue 076](tscircuit-issues/076-numeric-supply-pin-not-inferred-as-power.md) records missing inferred supply metadata separately.

Reproduce independent checks from this directory:

```sh
bun install --frozen-lockfile
python3 scripts/audit-r8-module.py
python3 -m unittest discover -s tests -v
./node_modules/.bin/tsc --noEmit
bun run format:check
./node_modules/.bin/biome format tests/fixtures/esp32-import.circuit.tsx
./node_modules/.bin/tsci build tests/fixtures/esp32-import.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png
```

Fixture output: `dist/tests/fixtures/esp32-import/`; this is not a remote-board build. See [VALIDATION.md](VALIDATION.md), [power feasibility](evidence/R8-components/POWER-FEASIBILITY.md) and [firmware instructions](firmware/README.md). Versioned SHA256 manifests identify the independent source/tooling/firmware evidence. Frozen original generated circuit JSON is under `baselines/r7/dist/index/circuit.json` and `baselines/published-main/dist/index/circuit.json`. No validated ESP32 R8 root circuit JSON exists; public board publication remains blocked rather than presenting copied Nordic output as ESP32-C3.

Next gate: independently qualified supported import of the exact selected module, or authoritative qualification of the larger supplier lands. Then complete regulator/passives/harness qualification, power/boot/programming circuitry, enclosure fit, pre-routing checks, routing and manufacturing exports. Physical battery, RF, thermal, runtime, enclosure fit and phone testing remain **POST-PROTOTYPE PHYSICAL VALIDATION**.
