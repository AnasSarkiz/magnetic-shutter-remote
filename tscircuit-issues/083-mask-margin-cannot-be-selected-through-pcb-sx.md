# 083 — PCB process style cannot select a solder-mask margin

Classification: missing generic styling API, separate from supplier geometry or importer conversion.

The retained `@tscircuit/props` 0.0.672 PcbSxValue accepts solder-paste margin but not solder-mask margin. `@tscircuit/core` 0.0.2035 SmtPad reads only its primitive's mask property. Applying `pcbSx={{ "& smtpad": { solderMaskMargin: "0.04mm" } }}` therefore fails TypeScript and does not change the emitted mask margin. No type suppression or generated-import modification is acceptable.

Actual trigger: the unchanged USB4215-03-A/C37616412 import declares 0.0508 mm expansion. Independent readback of the R8 route7 CAM measured 0.098247 mm minimum mask web versus the retained 0.10 mm criterion. This is a nominal mask-process concern, not a demonstrated copper short or incorrectly converted pad. Other legends and drill problems are separate design findings.

Local resolution: add a finite-distance optional solderMaskMargin to PcbSx, and have SmtPad resolve a matching selector as a process override. The original raw primitive remains immutable. An unmatched selector preserves the explicit primitive value and existing default. Selector specificity and ancestor inheritance follow the existing resolver. Copper and paste are unaffected.

Paired control: 1 pass/2 fail; the old emitter returned 0.0508 rather than the selected 0.04/0.02. Fixed focused core suite: 7 pass/0 fail, 222 assertions, including retained pad-bounds/repeated-port/paste regressions and three mask regressions. ESM/declaration builds pass. This is not a full core-suite result. Root runtime lock changes only the two local core/props archive identities; old source/runtime archives and frozen board baselines remain unchanged.

Reproduction inputs, exact developer lock, changed sources and runtime SHA256 identities: `tooling/R8-patches/manifest.json`. Logs: `evidence/R8-prototype-2026-10-05/tooling/`. The route9 generated USB pads contain 0.04 mm; independent exported mask readback now has 0.118262 mm board-wide minimum (the regulator), with USB webs above 0.10 mm. Route9 still had a separate capacitor drill clearance and POWER legend overlap, so it was not fabrication-approved.

Status: fixed in the qualified task-local runtime; no upstream issue/package publication performed. Supplier process approval and measured assembly remain pending physical validation.
