# R8 native assembly publication 0.3.26 prototype — 2026-10-09

User explicitly selected publication of the R8 board/assembly to tscircuit.com.
The added upstream individual-restore feature was reverted completely in
b1ed3d0e3fc5c316fa6793255d52cd8e26c477db; the shared viewer tree matches its
original c321c7ea0063eb72d4f0bf04ba7637ce3ee6b991 and PR1024 remains closed.
No shared-viewer fork or custom added controls enter this board publication.

The assembly retains native assembly.device/subassembly code and the 17 actual
PCB/mechanical GLB assets. Existing context-menu behavior is provided by the
standard viewer. A new package version allows an explicit supported native push;
PCB source/electronics/copper/placement/imports, four CircuitJSONs, allmodels,
geometry/dimensions/prints, dependencies/lockfile, firmware/toolchain, and
setup/start/serial memory guards are unchanged. No rootPCB/routing/SDK/CAM/3D
rebuild is required for unchanged qualified bytes.

Current 51 native checks, 30 mechanical winding checks and 110 browser poses
remain tied to the retained exact artifacts; they are carried forward, not
claimed freshly rerun. Lightweight smoke and product tests are rerun and their
actual logs retained. Official tsci push --include-dist --version-tag prototype
uses configured authentication and unchanged network/TLS settings. The existing
staging script verifies source closure, reviewed models/builds and original5MB
file cap; no publishing internals or readiness bypass.

Actual upload/readback and hosted rendering status follow in PUBLICATION.md.
Original075/076/004/084, missing3V3power metadata as a separate importer issue,
and battery/RF/BLE/shutter/cable/harness/thermal/MagSafe physical qualification
remain explicit. This is a hardware-untested engineering prototype. No order,
payment, supplier contact, tooling publication, PR merge or environment sharing.

Actual light checks pass:38Python+2Bun smoke tests/13assertions, configured
format/typecheck, and7product tests/315assertions. The first smoke attempt nested
its guard tests under an outer heavy launcher and rejected that inherited Node
heap override; the canonical lightweight smoke passed when run directly.
The first staging request redundantly classified historical failed-route20 as a
current-circuit supplement and correctly failed. Canonical default staging keeps
that historical file without reclassifying it as current evidence; full inventory
comparison must verify it and every previous input remain present. Both initial
failures and corrected command logs are retained; no scripts/tests/guards changed.
