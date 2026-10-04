# Magnetic shutter remote — frozen R6 / E1 enclosure

Untested engineering prototype: rechargeable Bluetooth camera shutter remote, 36 × 56 × 1 mm, two copper layers, 37 fitted TOP components. J1 is GCT USB4215-03-A / C37616412. E1 is an original magnetic enclosure with a passive status-light ring illuminated by the existing red PCB LED.

`index.circuit.tsx` is the board entry. `dist/index/circuit.json` is included deliberately. `enclosure.assembly.tsx`, `enclosure.remote.tsx`, `enclosure.cutaway.tsx` and `enclosure.exploded.tsx` are the native assembly views.

Install the locked toolchain with `bun install --frozen-lockfile`; build the board with `bun run build`; view with `bun run dev`. View the enclosure with `bun run dev enclosure.assembly.tsx`. Exact qualified dependency archives are included under `dependencies/`; CLI/eval are also pinned to immutable public GitHub archive URLs, because unpublished tooling fixes are needed to reproduce R6. They preserve supplier imports and are not substitute component definitions.

Physical battery, thermal, RF, runtime, phone and enclosure-fit validation remains pending. Production stencil/reflow and four USB shell-anchor process qualification remains pending; first-prototype manual shell rework may be required. Public availability is not fabrication approval. No board has been ordered.

Tscircuit: https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote--01a0f81f

Frozen electrical source commit: `77965a8012d5544e962d987ce958c5c5614dbe3a`; E1 source: `4f75af5`. This compact repository contains runnable sources, CAD assets and generated Circuit JSON, without historical investigation files or unrelated scripts.
