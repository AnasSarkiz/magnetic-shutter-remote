#085 — Offset polygon lands shift component/CAD/assembly bounds

**Confirmed core geometry bug; generic project-local correction tested.** The supported TS24CA/C393942 import emits all4 lands faithfully. Its offset polygon support lands were counted as width/height rectangles centered at primitive0 when computing component bounds. The generated copper was correct; the reported component center was wrong (fixture authored anchor22mm, reported21.5250327mm).

`SmtPad.getPcbSize()` returns polygon size, but the inherited `_getPcbLocalBoundsBeforeLayout()` discards the polygon's local position. The shared component bounds helper transforms that misplaced rectangle into board coordinates. This affects component obstruction, CAD origin and exported assembly position; it is not a supplier footprint error or a reason to patch an import.

Correction: polygon SMT primitives override local bounds with min/max of their actual local vertices; all other shapes retain existing behavior. The common transformation helper still handles translation/rotation. No component-specific coordinate correction, JSON edit or DRC waiver was added.

Control regression: all4 orthogonal rotations fail. Corrected regression:4pass/0fail; preserved paste, mask and mixed-pad regressions: total11pass/0fail/242assertions. Canonical ESM/declaration build passed. Evidence is in `evidence/R8-side-shutter-2026-10-05/tooling/`; reproduction inputs/runtime are bound by [manifest](../tooling/R8-patches/polygon-bounds-manifest.json). Original archives and failed evidence remain unchanged. This local qualification is not an upstream release or full-suite pass.
