# Cheaper R8 radio selection — 2026-10-05

**Selected: DOIT ESPC2-12E-N4 / JLCPCB C19949081.** This records component selection/qualification, not a finished ESP32 board or fabrication approval. It supersedes the original Espressif ESP32-C3-WROOM-02-N4 / C2934560 selection at the user's request to use a cheaper alternative.

## Price and availability

The supported in-stock search returned 103 entries for `ESP32`. This is the cheapest module candidate found and checked in that search, not a claim about every radio on the market. Bare IC prices are not complete radio costs: they need additional RF/clock/flash/layout work. ESP32-S2 candidates lack Bluetooth and cannot implement the BLE shutter.

Direct JLCPCB English listing data, queried 2026-10-05, gives the following small-prototype prices. The search index differed; the direct listing is used here.

| Module | Exact part | Unit price, USD, 1–9 | Observed listing stock | Assembly |
|---|---|---:|---:|---|
| DOIT ESPC2-12E-N4 | C19949081 | 1.5721 | 542 | Economic / Standard |
| DOIT ESPC2-12-N4 | C19949080 | 2.0386 | 560 | Economic / Standard |
| DOIT ESPC3-12-N4 | C19949072 | 2.2662 | 736 | Economic / Standard |
| Espressif ESP32-C3-MINI-1-H4X | C41349510 | 2.9474 | 1197 | Standard only; X-ray required |

All are Extended parts. These are observed prices/stock, not reservations or quotes for a complete assembly; assembly, setup, shipping and taxes are additional. No order or supplier contact occurred.

Sources: [selected module](https://jlcpcb.com/partdetail/ESPC2-12E-N4/C19949081), [other C2 variant](https://jlcpcb.com/partdetail/ESPC2-12-N4/C19949080), [C3 alternative](https://jlcpcb.com/partdetail/ESPC3-12-N4/C19949072), [MINI alternative](https://jlcpcb.com/partdetail/ESP32-C3-MINI-1-H4X/C41349510). Sanitized listing text and parsed price/stock records accompany this report. Raw HTML with expiring signed asset URLs stays in ignored runtime logs.

## Manufacturer and supported-import checks

The linked DOIT ESPC2-12E user manual identifies N4 as the 32-Mbit/4-MB option, BLE 5, onboard PCB antenna, 16×24×3 mm body, 3.0–3.6 V supply and recommended 3.3 V/500 mA supply capability. The manual's family headers sometimes say ESPC2-12; its cover, module-type table and shape identify ESPC2-12E. Preserve these original documents rather than inventing a corrected datasheet. Table2.2 also repeats a power description on its GND row; pin identity is explicitly GND and must never be wired as VCC.

Figure3.3, printed page6, recommends 1.5×1.0 mm contact lands at 2 mm pitch. The exact supported import uses 1.499997×0.999998 mm lands, with 16 physical contacts, matching the manufacturer nominal drawing. Maximum converted supplier/import difference is approximately 8.88e-15 mm. Maximum row-centre difference from the nominal drawing is 0.00046 mm, attributable to the recorded supplier coordinate rounding, not an invented fabrication tolerance. The audit correctly accounts for the raw pads' 270° rotation; no source pad was swapped or hand-edited.

All 16 labels match Table2.2. Pin8 VCC is already marked requiresPower by the importer; pin9 GND is marked requiresGround. Shutter/pair/status GPIO4/5/6 map to module pins6/7/10. UART RXD0/TXD0 map to GPIO19/20 on pins15/16, different from prior C3 GPIO20/21. UART download uses GPIO9 low; complete reset/strap/programming timing and pull networks still require engineering checks before fitting.

The supported CLI imported the original geometry and real OBJ/STEP assets without manual modification. An earlier import saved denied model responses; those failing outputs are retained separately under `first-import-with-denied-models/`, with issue077 documenting the CLI HTTP-status validation defect. After network access became usable, regeneration through the same supported command produced valid models. No HTTP-error body is used in the selected import. Original issue075 remains open for the abandoned C2934560 footprint; it does not describe this replacement's matching lands.

Supplier library attribution: **JLCEDA/EasyEDA Official Library**, [JLCEDA](https://lceda.cn/), [EasyEDA](https://easyeda.com/). Raw supplier input retains its original attribution and provenance. The selected import is under `imports/ESPC2_12E_N4/`.

## Validation and limits

Tests cover supplier conversion fidelity, nominal manufacturer pad dimensions/pitch/row positions, exact pin identity and real downloaded CAD formats. Native evaluator regressions verify the C3 manufacturer power override and the replacement C2's real power/ground ports, pad counts and unrouted state. Native evaluator operations measured roughly 7–10 seconds with live services, so these integration tests have a bounded 30-second timeout rather than Bun's five-second default; assertions remain unchanged.

The native qualification fixture is `tests/fixtures/espc2-import.circuit.tsx`: routing disabled, A4 schematic, output under `dist/tests/fixtures/espc2-import/`, separate from root board output. Its VCC is deliberately unpowered and untraced: the visible missing-VCC-trace warning must remain recorded, not misreported as a functional supply pass. Component renders and metadata are not electrical or RF validation.

Zephyr4.2 contains ESP32-C2 support and an ESP8684-DevKitM board; the official source excerpts are retained. This establishes an available development path, not a fresh C2 firmware compile or BLE HID hardware pass. The old 411568-byte C3 image must not be flashed to this module. Adapt the board configuration, flash/clock variant, UART and GPIO contract, then rebuild separately with the documented SDK and memory guard.

The selected module still needs the qualified 3.3 V power stage, battery/harness, charger thermal/current work, reset/strap/programming circuitry, antenna keepout and enclosure/side-button fit. Module startup current and RF calibration remain reasons to retain the 500 mA supply-capability requirement. Root source/BOM/circuit JSON are still Nordic. No whole-board routing, DRC, fabrication, firmware SDK build or 3D render is claimed. Frozen baselines remain immutable; physical/RF/runtime/phone validation remains pending.
