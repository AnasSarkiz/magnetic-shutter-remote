# Magnetic shutter remote R7

**WORK IN PROGRESS — NOT FOR FABRICATION.** Original product design: one rechargeable battery, one USB-C charger, Bluetooth shutter and a real photography fill-light ring. The ring is not a status indicator.

Started from frozen R6 `77965a8012d5544e962d987ce958c5c5614dbe3a` in `../magnetic-shutter-remote-r6--01a0f81f`. Branch: `r7-shared-battery-fill-light`. R6 is never edited by this project.

`index.circuit.tsx` currently builds the inherited R6 electronics. It does **not** yet implement the R7 torch power system. Inherited CAM/build/qualification files are historical R6 evidence, not R7 approval.

**Scope change, 2026-10-04:** use a purchased, ready-made fill-light ring. R7 will provide the compatible power/interface connection from the shared battery. The exact external ring has not been selected. Its voltage, maximum current, control interface and dimensions must be established before selecting the power circuit or connector. See [external ring integration](evidence/R7-power/EXTERNAL-RING-INTEGRATION.md).

`fill-light-ring.circuit.tsx` and its imports, previews and tests are preserved **superseded engineering investigation**, not the selected product design. Custom LED-ring PCB development is stopped. Do not fabricate that emitter candidate or use its seven-pin connector as an approved external-ring pinout.

Accepted targets: approximately 1.5–2 W LED power, ≥30 minutes at full brightness (45 minutes preferred); 15/50/100%; warm/neutral/cool; camera-style shoulder shutter and side torch controls. The purchased ring's actual modes and control interface are not yet verified. One battery and one USB-C charging port serve the whole product. A purchased external assembly is listed separately from the JLCPCB-assembled board BOM.

```sh
bun install --frozen-lockfile
bun run typecheck
node_modules/.bin/tsci build fill-light-ring.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs
```

See [VALIDATION.md](VALIDATION.md), [component qualification](evidence/R7-components/QUALIFICATION.md), and [issue index](tscircuit-issues/README.md). Torch-state tests and feasibility calculations do not prove hardware integration.

Battery, RF, thermal, runtime, enclosure and phone tests remain **POST-PROTOTYPE PHYSICAL VALIDATION**. No R7 fabrication package or order.
