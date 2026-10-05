# Project dock stop overlaps the docked remote envelope

Status: **fixed locally**. Classification: enclosure design mistake, not a tscircuit defect.

## Affected package and revision

Project mechanical/remote-and-grip.scad R2/R3, exact source hashes in revision manifests. OpenSCAD 2026.08.30 runtime used; final source/mesh logs retained. No electronic supplier geometry is involved.

## Component / authoritative dimensions

Original design: remote 60 mm long, dock centre Y=-42 mm, stop length 1.6 mm. These are engineering dimensions, not JJC internal measurements. [Schedule](../mechanical/dimensions.json). No JLC number applies to an externally printed enclosure.

## Minimal reproduction and commands

[Original isolated expression](evidence/039-dock-stop-overlap/before.scad); original full [R2 source](../evidence/R3/R2-inputs/mechanical/remote-and-grip.scad). From board root:

```sh
/opt/homebrew/bin/openscad -D 'part="grip"' -o mechanical/stl/grip.stl mechanical/remote-and-grip.scad
tooling/gerber-review-venv/bin/python scripts/check-mechanical-meshes.py
```

On this Mac OpenSCAD required normal host execution; sandbox abort evidence is retained. This is local CAD generation, not an external action.

## Expected behavior

Dock stop must leave the allocated 0.30 mm end gap at the intended retained remote position.

## Actual behavior

Original stop centre Y=-12 and 1.6 mm length gave near face -12.8; remote end is -12.0. An overlap of 0.8 mm existed. Manifold validity does not test this assembled interference.

## Evidence and before/after measurements

[Original/final dimensions](evidence/039-dock-stop-overlap/measurements.json), [actual final STL measurement](../evidence/R3/final-mechanical-mesh-measurements.json), [final mesh log](../evidence/R3/final-grip-mesh.log), [dock preview](../mechanical/docked-fit-r3.png), [dimensioned sheets](../mechanical/R3-dimensioned-drawings.pdf).

## Root cause

Confirmed placement at the remote end instead of beyond the end by half stop thickness plus the allocated gap. No CAD-kernel or tscircuit bug is inferred.

## Impact

Remote could not reach the calculated docking position without interference; earlier nominal dock dimensions were insufficient evidence.

## Fix / source / regression verification

Stop centre moved to -10.9 mm in SCAD and dimension schedule/drawing generator; regenerated actual grip STL. check-mechanical-meshes.py reads actual triangle vertices and fails if measured end gap differs from 0.30 mm by more than the documented decimal numerical bound. Actual measured gap 0.2999999955 mm, manifold NoError. No copper or imported electronic geometry changed.

## Remaining blocker

Physical printed fit, rail friction, retention, tolerance and drop tests pending. Final evidence is indexed in [VALIDATION](../VALIDATION.md). No hardware, assembler approval, supplier contact, order or publication is implied.
