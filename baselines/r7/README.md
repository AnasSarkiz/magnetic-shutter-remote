# Magnetic shutter remote — R7 shutter-only order review

Torch / fill light work is cancelled. The active board remains the proven frozen R6
shutter electronics; no torch circuit is fitted. R6 is untouched.

**Local electrical and CAM checks pass. JLCPCB processed preview must be reviewed before payment.**

Use `index.circuit.tsx`, with generated `dist/index/circuit.json`. Reproduce with
`bun install --frozen-lockfile`, `bun run format:check`, `bun run typecheck` and the
native board build/check commands. See [tooling](tooling/R7-README.md),
[validation](VALIDATION.md), [order review](evidence/R7-order-review/ORDER-READINESS.md),
[current order files](fabrication/R7-order-review/README.md), and
[issue register](tscircuit-issues/README.md).

The complete suite is not claimed passing: one historical preservation failure and one
missing-input skip remain. All original R6 recorded files are unchanged. Physical tests
remain **POST-PROTOTYPE PHYSICAL VALIDATION**. This is an untested engineering prototype,
not production-qualified hardware or a completed shoulder-button enclosure.
