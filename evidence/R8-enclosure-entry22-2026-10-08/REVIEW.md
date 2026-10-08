# R8 enclosure circuit entry — 0.3.22 prototype, 2026-10-08

The prior product.assembly.tsx name did not match the documented *.circuit.tsx
entry discovery convention. enclosure.circuit.tsx now exposes the same validated
R8ProductAssembly; the previous file stays as a compatibility alias. The config
lists index.circuit.tsx and enclosure.circuit.tsx in includeBoardFiles, retains
the electrical mainEntrypoint, and selects enclosure.circuit.tsx for previews.
Default bun run build runs PCB then enclosure, serially through run-heavy.py.
Only bun run build:enclosure and the two compatibility views were built here;
no root PCB/routing/SDK/CAM build was run.

Official docs/source reviewed:
- https://docs.tscircuit.com/command-line/tsci-build
- https://docs.tscircuit.com/elements/assembly-subassembly
- https://docs.tscircuit.com/guides/advanced-assembly

Pinned supported assembly.device/subassembly and imported cadModel APIs are
retained. No dependency upgrade. The build creates dist/enclosure/circuit.json,
3d.glb and 3d.png. The 15 MB combined GLB stays local under the unchanged 5 MB
staging cap; compact JSON, preview PNG and all 17 bounded native source GLBs are
published. The old views are rebuilt; their only JSON change is the generated
source_project_metadata filesystem hash. All actual geometry entries match.

Actual results: 51 native geometry checks including 30 face-winding checks across
three views; 4 product tests/253 assertions; 38 Python smoke tests and 2 Bun
smoke tests/13 assertions; frozen R7 129/129 hashes; formatting and typecheck pass.
Detailed output is in checks/, final-checks.json and native-model-readback.json.
All 42 protected files match the pre-task HEAD: qualified PCB JSON/electronic
source, geometry, 17 native model assets, eight prints, lock and setup/smoke/guard.
The actual 44×56×1 mm PCB and 32×43×8.5 mm protected-battery envelope keep their
verified poses inside the existing 90×78×34 mm reference enclosure.

This is an untested physical prototype. Actual cable, battery harness, shutter
travel/return, magnets/bonding, phone/case retention, RF/BLE and thermal tests are
pending. Original issues 075/076/004/084 and separate missing 3V3 importer metadata
remain explicit; the abandoned WROOM smoke qualification warning is preserved.
No photograph-identical finish, universal fit, physical testing or order approval
is claimed. Frozen main/baselines, auth/proxy policy, environment configuration,
light setup/start, memory guards and ordering/payment/contact gates are unchanged.
Observed 32 GiB cgroup memory and 400000/100000 CPU limits are runtime observations,
not guaranteed plan allocations. PUBLICATION.md records actual remote results.
