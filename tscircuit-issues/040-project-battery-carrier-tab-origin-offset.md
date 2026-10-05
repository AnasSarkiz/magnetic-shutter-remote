# Project carrier tab origin makes battery clearance asymmetric

Status: **fixed locally**. Classification: mechanical project design mistake, not a tscircuit defect.

## Affected package / exact revision

R3 mechanical/remote-and-grip.scad and dimensions.json, 2026-10-02. Final source hashes in revision-manifest. OpenSCAD geometry is external enclosure design; no footprint patch.

## Battery and sources

Externally installed DTP401525(PHR), supplier EEHD-53KN; documented maximum pack width 15.5 mm. [External part record](../EXTERNAL-PARTS.md), [manufacturer/pack specs](../references/DTP401525-PHR-v2.pdf). No JLC number applies to this battery.

## Reproducer / inputs / commands

[Original isolated expression](evidence/040-battery-tab-offset/before.scad) preserves the wrong cube origin. Full pre-fix carrier file was not retained byte-for-byte; this limitation is explicit. Current source and mesh are supplied. From board root:

```sh
/opt/homebrew/bin/openscad -D 'part="carrier"' -o mechanical/stl/carrier.stl mechanical/remote-and-grip.scad
tooling/gerber-review-venv/bin/python scripts/check-mechanical-meshes.py
```

## Expected behavior

Both tab inside faces must leave 0.55 mm nominal per side around the documented maximum 15.5 mm pack; print allowance 0.2 mm per side leaves 0.35 mm calculated gap.

## Actual behavior

Uncentred 1 mm cubes translated to ±8.8 mm produce inside faces -7.8 and +8.8: side gaps only 0.05 and 1.05 mm. The earlier 16.5 mm nest statement did not represent the actual faces.

## Logs / screenshots / measurements

[Before/after schedule](evidence/040-battery-tab-offset/measurements.json), [actual STL vertex readback](../evidence/R3/final-mechanical-mesh-measurements.json), [carrier manifold log](../evidence/R3/final-carrier-mesh.log), [dimensioned sheets](../mechanical/R3-dimensioned-drawings.pdf), [cutaway](../mechanical/remote-cutaway-r3.png).

## Root cause

Confirmed cube placement used the tab minimum coordinate as its intended centre, producing an asymmetric cage. Not a supplier battery-dimension or CAD-kernel error.

## Impact

Pouch compression/abrasion risk from an almost-zero calculated side gap; verbal nest dimensions did not verify actual exported geometry.

## Fix / changed files / regression verification

Translate tab cubes by x-0.5, preserving centre ±8.8; dimensioned nest is 16.6 mm. Updated SCAD, dimensions.json and drawing generator; regenerated actual STL. Mesh checker directly measures inside faces and enforces nominal 0.55 mm per side; actual faces ±8.3, gaps 0.5500000000. Numerical STL tolerance is not a fabricated physical fit tolerance.

## Remaining blocker

Physical pack width/edge seam variation, thermal compression, print tolerance, lead strain and retention tests pending. Final evidence is indexed in [VALIDATION](../VALIDATION.md). No hardware, assembler approval, supplier contact, order or publication is implied.
