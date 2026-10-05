# Strict CPL export requires numeric pin1 on a valid labelled connector

**Status: fixed locally. Classification: assembly-export API limitation, not a supplier footprint defect.**

Affected: circuit-json-to-pnp-csv0.0.16in R5; official0.0.19sourcecontrol712beb9c195c521af5f0112c56cda4dd716e693bhas the same pin1-only limitation. Local implementationcommit6cb24bc, documentationcommit0f2f881cde20804b365ccfa48b9e9a0396891eeb, branch qualification/supplier-terminal-registration.

Component:GCT USB4215-03-A /C37616412; [official drawing](https://gct.co/connector/usb4215), [assembly listing](https://jlcpcb.com/partdetail/39339856-USB4215_03A/C37616412). Manufacturer terminals are A1B12/etc/EH1–4, imported terminals13–28. No numeric pin1 is documented; the supplier geometry/pin map must not be fabricated to fit an exporter assumption.

## Reproduction / inputs

From the R6project: `bun scripts/export-assembly.ts fabrication/R6 evidence/R6`. Original strict call without `supplierFootprints` rejects the USBmodel with `missing_pin1_location`. Exact routed/supplier input fixtures: `../tooling/circuit-json-to-pnp-csv/tests/assets/usb4215-r6.circuit.json`, `usb4215-supplier.circuit.json`. The original importer output is `../evidence/USB4215-import-audit/final/USB4215_03_A.tsx` and is unchanged.

Minimal API reproduction/test: `cd tooling/circuit-json-to-pnp-csv && bun test tests/supplier-terminal-registration.test.ts`. The test explicitly proves the original strict API rejects the fixture.

## Expected / actual

Expected: verify an exact labelled supplier footprint's assembly orientation without invented terminal numbering. Actual: strict rotation requires pin1 metadata and cannot export J1, despite all16real terminal coordinates matching. No safe caller-only fix exists that preserves strict validation and immutable imports.

## Root cause / fix

Confirmed pin1-only resolver cannot express this exact terminal numbering. Add explicit exact-C-number `supplierFootprints` input and `registerSupplierTerminals`; require exact MPN/C-number, unique labelled terminal pairing, one unrotated TOPsupplier model and one unique orthogonal pose. All16positions must match within1µm numerical tolerance. BOTTOM/reflection/missing/moved/ambiguous/wrong-part inputs fail. Existing pin1 path unchanged; no fallback, synthetic pin1, schema mutation or imported geometry edit.

Changed source: `src/index.ts`, `src/supplier-terminal-registration.ts`; meaningful positive and negative tests plus actual fixtures. `bun test`55tests/347assertions PASS; TypeScript and build PASS. [Tests](../evidence/R6/pnp-tests.log), [typecheck](../evidence/R6/pnp-typecheck.log), [build](../evidence/R6/pnp-build.log), [terminal pose](../evidence/R6/J1-supplier-terminal-registration.json), [assembly image](../evidence/R6/visual/assembly-2.png). Final J1centroid(0,24.5101989), rotation180°,16/16positionsmatch, independent Python agrees. No PCBcomponent altered. Toolsource and patch/archive reproduced via `tooling/R6-README.md`.

Impact: blocks trustworthy CPLexport until tool capability is fixed. Local fix is prototype-qualified; no upstream publication or upstream-fix claim.
