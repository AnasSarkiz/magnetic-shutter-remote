# ESP32-C3 supplier lands differ from the manufacturer recommendation

**Status: confirmed discrepancy; supplier variation remains unqualified.** This is supplier-library data, not a confirmed tscircuit bug. It is not a claim that the larger lands necessarily fail assembly.

## Scope and versions

Espressif `ESP32-C3-WROOM-02-N4`, JLCPCB/LCSC `C2934560`, supplier package UUID `ab901810668e4ba2b431728512d738d6`. Supported importer: CLI `0.1.2237` with the preserved R7 integration archive, easyeda `0.0.364` plus preserved local paste fixes, core `0.0.2035` plus qualified local pad-bounds fix. Archive hashes are recorded in the R8 component integrity manifest. No new importer code was changed in this investigation.

Sources: [official Espressif datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-c3-wroom-02_datasheet_en.pdf), v1.7, Figure 11-1, page 38; [official reference-board documentation](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c3/esp32-c3-devkitc-02/user_guide.html); [JLCPCB exact part](https://jlcpcb.com/partdetail/ESP32-C3-WROOM-02-N4/C2934560). Source attribution: **JLCEDA/EasyEDA Official Library**, [JLCEDA](https://lceda.cn/), [EasyEDA](https://easyeda.com/).

## Reproduction

Run from the isolated R8 project using the locked local dependencies:

```sh
./node_modules/.bin/tsci import C2934560 --jlcpcb --use-exact-footprint --download
python3 scripts/audit-r8-module.py
python3 -m unittest discover -s tests -v
./node_modules/.bin/tsci build tests/fixtures/esp32-import.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png
```

Original input: [supplier JSON](../evidence/R8-components/C2934560-supplier-raw.json). Original unedited import: [TSX](../imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4.tsx). Isolated inspection fixture: [source](../tests/fixtures/esp32-import.circuit.tsx). Manufacturer input: [PDF](../evidence/R8-components/esp32-c3-wroom-02-datasheet-v1.7.pdf). Do not regenerate over preserved imports without first retaining their hashes.

## Expected and actual geometry

| Feature | Espressif recommended land | Raw supplier / supported import |
|---|---:|---:|
| 18 outer contact lengths | 1.5 mm | 1.999996 mm |
| 18 outer contact widths | 0.9 mm | 0.999998 mm |
| Nine EP ground tiles | 0.7 × 0.7 mm | 0.6999986 × 0.6999986 mm |

The raw PAD fields are `7.874 × 3.937` EasyEDA units, which correctly convert at `0.254 mm/unit` to `1.999996 × 0.999998 mm`. All 27 converted pad positions and dimensions match the raw supplier model to a maximum difference of `5.084821452783217e-14 mm`. All 19 logical pin names agree with the manufacturer's table. No pad was dropped or renumbered.

The manufacturer drawing is a **recommendation**, not an explicit tolerance envelope. This audit does not invent a tolerance or call every deviation mechanically invalid. No authoritative documented approval of this particular larger-land variation was established. The official reference layout and recommended footprint do not independently qualify the larger supplied lands. Therefore the project qualification gate remains blocked under the workspace instructions.

## Evidence

- [Dimension-by-dimension comparison](../evidence/R8-components/ESP32-GEOMETRY.md) and [machine-readable audit](../evidence/R8-components/ESP32-footprint-audit.json)
- [Manufacturer drawing screenshot](evidence/075/manufacturer-land-pattern.png)
- [Annotated dimensional comparison](evidence/075/land-comparison.png), [PDF](evidence/075/land-comparison.pdf), and [reproducible illustration source](../scripts/render-r8-land-comparison.py)
- [Imported PCB screenshot](evidence/075/imported-pcb.png) and [imported 3D screenshot](evidence/075/imported-3d.png)
- [Native fixture build log](evidence/075/fixture-build.log): exit 0, zero circuit error records, 27 pads, zero routed traces, native A4 sheet. Fixture rendering PASS does not qualify the part for the remote board.

Build warning: `U1 has no pin with requires_power=true`. This separate metadata limitation is recorded in issue 076, not concealed by the zero-error record count.

Alternate exact-MPN JLCPCB assembly-service entry `C9900000362` was inspected, not adopted. Its outer lands are approximately `1.8 × 1.0 mm`; its supplier listing names "JLCPCB Assembly" rather than Espressif and does not establish stocked physical part availability. It does not resolve this gate. [Preserved alternate raw input](../evidence/R8-components/C9900000362-supplier-raw.json).

## Root cause, impact and disposition

Confirmed: the larger lands originate in the supplier library and are faithfully imported. Not established: manufacturer approval, a manufacturing failure, or an importer scaling bug. The tscircuit converter must not silently "correct" accurately imported supplier geometry based on this project.

Impact: schematic pin identity is audited, but placement, paste/process qualification, final routing, fabrication exports and a completed module migration cannot be approved yet. R6/R7 remain unchanged. The R8 board source remains the starting copy; it is not a completed ESP32-C3 board.

Remaining blocker: obtain a supported JLCPCB import of this exact stocked component with a independently qualified land pattern, or authoritative evidence that the existing larger lands are acceptable. No handwritten substitute footprint or generated-import edits were made. Tests validate conversion fidelity and ensure the discrepancy remains visible; they do not declare manufacturer qualification PASS.
