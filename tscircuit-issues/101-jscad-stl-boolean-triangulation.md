# JSCAD STL serialization emits open/duplicate edges at boolean surfaces

Observed2026-10-07 in the pinned native JSCAD stack. Boolean plans evaluate to
finite solids and pass dimensions, volume and placement checks. STL serialization
snaps polygons before triangulation; curved pocket/boss intersections can produce
open edges and duplicated triangles. Exact triangulation before serialization
resolves most edges but fails several round-boss/pocket examples. Rejected source,
meshes and readback are retained in the product16 rejected-print-meshes evidence.

This is a mechanical serialization issue, not a PCB electrical/routing blocker.
No failed STL is accepted. The current manufacturing generator evaluates the
same native plastic CAD plans with pinned Manifold3D3.5.4, then requires matching
native32-facet dimensions/volume, NoError, closed mesh/consistent winding and actual
STL readback. It does not repair a rejected mesh or substitute geometry.
Current accepted six-part evidence is `product/print-mesh-review.json`.
The native assembly continues using the supported tscircuit/JSCAD source API.

Python3.14 requires the available3.5.4 wheel. An initial3.3.2 attempt had no
matching wheel and failed CMake configuration because TBB was absent; no compile
success is claimed. The accepted guarded install uses official prebuilt wheels.
No root Node/Bun dependencies, frozen archives, guards or board imports changed.
No upstream public issue or tooling release was submitted.
