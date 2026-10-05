# R8 qualification continuation — 2026-10-05

Starting HEAD: `b25353c0a1d7adceeab9a966aaf68a6cb3594cc9`, branch `cloud/r8-cloud-setup`. This is a qualification investigation, not a completed board implementation or fabrication release.

## Checks performed

- Portable context verification: 129/129 frozen R7 hashes and recorded source/runtime archives PASS.
- Original module audit: conversion fidelity PASS; supplier land-pattern qualification remains BLOCKED. No supplier geometry or generated import was edited.
- Read the current official tscircuit handbook `guides/code.md` and current upstream easyeda-converter `lib/websafe/convert-to-typescript-component/infer-pin-attributes.ts` over HTTPS. The upstream power-label expression still excludes `3V3`; issue 076 remains open. Broadening label inference would not prove that every voltage-labelled pin is a supply input.
- Live Espressif datasheet download at `https://www.espressif.com/sites/default/files/documentation/esp32-c3-wroom-02_datasheet_en.pdf` returned HTTP 403. Saved an additive restricted-network draft requirement for the exact host `www.espressif.com`, retaining the two existing custom dependency hosts. Saving does not establish runtime connectivity.

## Exposed-pad clarification

The preserved official Espressif v1.7 datasheet, section 9 Peripheral Schematics, states: “Soldering the EPAD to the ground of the base board is not a must, however, it can optimize thermal performance.” It also warns that excessive solder paste can raise the module and impair adhesion of the other pins.

Thus the earlier handoff phrase that the exposed pad “needs” grounding must not be interpreted as a manufacturer requirement to solder it. Ground connection is appropriate if it is soldered; package-specific evidence must guide the assembly decision. Do not infer `requiresGround` solely from the label `EP`, and do not silently rewrite the preserved input or original issue evidence.

## Remaining gates

Issue 075 still requires a supported import of the exact eligible stocked module with qualified lands, or authoritative acceptance of the actual supplier variation. The recommended dimensions alone neither establish approval of the larger lands nor prove assembly failure. Dependent whole-board wiring, placement, routing and exports remain blocked by the controlling project instructions.

After official-source connectivity is available, inspect current manufacturer layout resources and qualification evidence. Issue 076 requires the supported manufacturer-metadata pipeline or documented board-level attributes with regression coverage; changing a regex or suppressing the warning is insufficient.

No PCB/source/import/baseline/firmware changes, routing, root board build, supplier contact, order, commit, push or publication were performed in this investigation. Frozen baselines remain immutable. Physical validation remains pending.
