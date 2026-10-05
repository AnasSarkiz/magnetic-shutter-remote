# Strict placement export cannot orient a supplier connector with no terminal named pin1

Status: **confirmed**.

## Affected package and exact revision

circuit-json-to-pnp-csv 0.0.16; @tscircuit/circuit-json-util 0.0.117 plus preserved R2 local orientation patch.

## Component and authoritative sources

XUNPU TYPEC-250Y-BRP6L68 / C5252714. [Listing](https://jlcpcb.com/partdetail/Xunpu-TYPEC_250Y_BRP6L68/C5252714), [supplier import](../evidence/R3/C5252714.tsx), [raw input](../evidence/R3/C5252714.raweasy.json), [manufacturer drawing](../references/C5252714-manufacturer.pdf). Replacement: HCTL HC-TYPE-C-6P-01A / C2894893, [drawing](../references/C2894893-manufacturer.pdf).

## Minimal reproduction, commands and required inputs

Run from the board root with the supplied locks, unless the command explicitly changes directory. Original failing artifacts are preserved; imported fixtures are unchanged supplier imports. No credentials or publishing are needed.

```sh
bun -e 'import {convertCircuitJsonToPickAndPlaceRows} from "circuit-json-to-pnp-csv"; console.log(convertCircuitJsonToPickAndPlaceRows(await Bun.file("evidence/R3/route-attempt-16/circuit.json").json(),{supplier:"jlcpcb",requireSupplierRotation:true}));'
```

## Expected behavior

An exact supplier terminal naming scheme should allow verified orientation without guessed rotation or fabricated pin aliases. Failing closed is appropriate when orientation is unresolved.

## Actual behavior

J1: cannot verify jlcpcb pick-and-place rotation (missing_pin1_location); PCB rotation 180 is unverified. Supplier terminals are 7–13; there is no terminal 1. Import success did not establish CPL suitability.

## Logs, screenshots and measurements

[Failure log](../evidence/R3/R3-export-assembly.log), [HCTL strict probe](../evidence/R3/HCTL-strict-rotation-probe.log), [final 37-reference rotation evidence](../evidence/R3/assembly-rotations.json).

## Root cause: confirmed facts and hypotheses

Confirmed: orientation inference requires a logical pin1 anchor. This is an API limitation, not proof that the XUNPU supplier land pattern is wrong. No alternate anchor mapping was guessed.

## Impact

Blocks trusted CPL export for C5252714 despite otherwise usable geometry.

## Fix details, changed source and regression tests

No orientation exemption, fallback or imported pin-map patch. Qualify C2894893 through the corrected supported importer; it has a genuine supplier pin1 anchor. Final strict conversion passes for all 37 references. The generic non-pin1 orientation limitation remains unresolved in the package.

## Verification and remaining blocker

Final board evidence is in [R3 validation](../VALIDATION.md), [native checks](../evidence/R3/final-check-exits.json), [clearance audit](../evidence/R3/routed-manufacturing-33.json), and [complete fabrication readback](../evidence/R3/final-cam-readback/readback.json). These are software results. Assembly stencil/shell process approval and physical battery, thermal, RF, fit and phone tests remain open. No issue, package or design was published.
