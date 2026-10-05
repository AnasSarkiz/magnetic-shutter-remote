# Numeric supply label 3V3 has no inferred power attribute

**Status: confirmed metadata omission; not fixed.** The generator uses conservative label inference. This is a qualification limitation, not a demonstrated pin-map or copper error.

Affected local source: easyeda `0.0.364` with the preserved R7 fixes, `lib/websafe/convert-to-typescript-component/infer-pin-attributes.ts`; CLI `0.1.2237` qualified integration. The current official upstream file inspected on 2026-10-05 uses the same power-label expression. [Preserved upstream source](../evidence/R8-components/upstream-infer-pin-attributes.ts).

Exact component: Espressif `ESP32-C3-WROOM-02-N4`, `C2934560`. [Manufacturer datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-c3-wroom-02_datasheet_en.pdf), Table 3-1 and Table 6-2, specifies pin 1 `3V3` as the 3.0–3.6 V supply; the exposed ground pad also needs a ground connection. [Supplier listing](https://jlcpcb.com/partdetail/ESP32-C3-WROOM-02-N4/C2934560).

Reproduce using the issue 075 import/fixture commands and inputs. The imported pin label is correct, but `pinAttributes` contains only `pin9: {requiresGround: true}`. Actual native build warning: `U1 has no pin with requires_power=true`. [Log](evidence/075/fixture-build.log), [schematic/PCB source](../tests/fixtures/esp32-import.circuit.tsx), [import](../imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4.tsx).

Confirmed root cause: `POWER_PIN_LABEL = /^(?:VCC|VDD|VIN|VDDA|VBUS)\d*$/` excludes numeric voltage labels such as `3V3`. Ground inference also intentionally does not guess that every `EP` belongs to ground. The exact manufacturer connection must be checked independently. A public registry datasheet lookup returned HTTP 404 during investigation; no datasheet attributes were fabricated to replace it.

Impact: automated power-pin checks cannot establish the module supply connection from the imported metadata alone. The unpowered inspection fixture is intentionally not a functional circuit. A successful render must not be called a complete electrical validation.

No generated import was edited, no warning was suppressed, and no generic regex broadening was made without proving that numeric labels distinguish supply inputs from outputs. Future resolution must use the supported manufacturer-metadata pipeline or documented board-level attributes grounded in the exact datasheet, with regression coverage for ambiguous labels and exposed-pad semantics. Supplier land qualification in issue 075 remains separately blocking.

## Project correction — 2026-10-05

At the user's explicit request, `tests/fixtures/esp32-import.circuit.tsx` now supplies the supported `pinAttributes` prop: pin 1 `requiresPower: true`, retaining pin 9 `requiresGround: true`. The generated supplier import remains byte-for-byte unchanged. This is manufacturer-specific board-level metadata, not a change to generic label inference.

`bun test tests/r8-power-metadata.test.ts` exercises the actual fixture through the native evaluator: pin 1 emits `requires_power=true`, pin 9 retains `requires_ground=true`, no other port is marked as requiring power, all 27 pads remain and there are no routed traces. Pin 19 is not automatically marked as requiring ground: Espressif v1.7 section 9 states that soldering EPAD to base-board ground is optional for thermal performance. The original warning log remains historical evidence. The raw importer omission remains open upstream; the project fixture now supplies the missing power metadata. This unpowered inspection fixture does not establish a working supply circuit.
