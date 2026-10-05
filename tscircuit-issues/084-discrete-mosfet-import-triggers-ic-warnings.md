# 084 — Discrete MOSFET import triggers generic IC warnings

Nonblocking model/classification issue, separate from076’s missing radio supply metadata. Exact 2N7002 / C8545 import `imports/A_2N7002.tsx` emits a `<chip>` with G/pin1, S/pin2 and D/pin3, preserving the supplier MOSFET symbol and lands. Native output consequently reports Q1/Q2 lacking `requires_power=true` and using Q with a chip rather than transistor. A discrete MOSFET has no dedicated IC supply pin; Q is its correct reference prefix. Do not invent a power pin or rename it U merely to silence these warnings.

Evidence: `evidence/R8-prototype-2026-10-05/final-native-checks.json`. Two power warnings from runAllChecks; four generated warnings including two reference-prefix warnings. `scripts/audit-r8-circuit.ts` checks exact part identity and Q1 G=USB5V/S=GND/D=REG_EN, Q2 G=TEMP_OK/S=GND/D=CHARGE_DISABLE. Native DRC/shorts, independent actual copper/drill checks and physical connectivity pass with0 errors. Imported source is unchanged and warnings remain visible. This does not qualify untested hardware behavior.

A generic importer classification/checker distinction is the appropriate upstream fix. No public issue or package publication is performed by this report.
