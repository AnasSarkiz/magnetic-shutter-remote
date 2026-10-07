# Native R8 product assembly 0.3.20 — 2026-10-08

The enclosure is integrated into the tscircuit assembly code using the current
official assembly.device/subassembly imported-model API. Root product.assembly.tsx
and product.exploded.tsx import the unchanged actual 44-model PCB and ten native
mechanical/reference models. Dev commands select the closed/exploded file.
The independent electrical entry remains index.circuit.tsx; no root PCB build,
routing, firmware SDK or CAM run occurs in this mechanical integration.

Editable geometry.ts remains canonical. product.geometry.tsx builds those native
JSCAD plans; export-product-mechanics.py exports each part without repairs,
simplification or triangle loss. review-native-product.py compares every mechanical
triangle corner and outward face direction in both final views against the canonical plans, as well as all
original PCB fragment triangles/poses and bounds. All 34 checks pass, maximum
mechanical vertex difference 1.9073486328125e-6mm. Wrong/missing triangles and reversed face winding fail.

The first imported-model trials used a reflected Y-up frame and failed the
strengthened face-direction check. The final exporter uses the supported product
Z-up frame through a proper rotation with determinant +1, no face edits, negative
node scales, repairs or dependency patches. Rejected trial logs are retained.
An initial final-check invocation omitted its required output path (exit 2); the
corrected invocation passes. Neither failed trial was published.

The actual closed/exploded Circuit JSON is 15,516/15,513 bytes instead of the earlier
4,870,478/4,870,475 bytes. Print plans are 780,037 bytes of compact JSON with parsed
content exactly unchanged. All eight STL bytes, existing seven PCB GLBs, actual
board JSON, geometry/dimensions/review and supplier models remain identical.
The source canonical full JSON is generated locally, not needed as an oversized
registry build input; editable source remains included. No manufacturing mesh is
substituted for native CAD, and no generated illustrative image is a fit model.

Four product tests pass 194 assertions; native build/readback, independent exact
STL topology and original fit geometry pass. Typecheck/format and lightweight
smoke pass. Bare Bun test-path invocation initially fails module resolution;
explicit ./tests/r8-product.test.ts succeeds with all four tests. Both outputs
are retained; no failed command is represented as a pass.

Nominal fit remains 90×78×34 mm around the 44×56×1 mm PCB and 32×43×8.5 mm protected
battery envelope, all 44 component envelopes, four original mounts and four shutter
positions through 0.35 mm. Actual cable hood, guides/return/friction/stop strength,
fasteners/harness/swelling/thermal, exact magnets/DC shield/bonding, dock/phone/
case retention and RF/BLE/iPhone Camera require physical qualification. Missing
3V3 metadata remains a separate importer issue; original075/076/004/084 evidence
and smoke's abandoned WROOM land warning stay explicit. No order approval.

Official docs now also describe printedpart/mating features absent from this
pinned toolchain; supported imported subassemblies do not require a vendor update.
The native wire/circuit model is preserved. Frozen baselines/main, dependencies,
setup/start scripts and serial guards (32 GiB observed) memory guards remain unchanged.

Actual publication is recorded separately after upload/inventory/byte readback.
Prior incomplete 0.3.19 and issues 099/103 remain unchanged as historical evidence.
