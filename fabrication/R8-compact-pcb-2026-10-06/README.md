# R8 compact PCB fabrication review package

Untested hardware/package0.3.5, route23. 44×56×1mm rounded outline; two-layer
FR4, nominal1oz/35um external copper. These stackup assumptions need confirmation
in the supplier-processed preview. Minimum actual track0.15mm; VIN/inductor
necks0.30mm, native0.60/0.30mm vias. All copper/drill/process/readback checks
pass. Four plated USB G85 slots, eight NPTH, 44 TOP placements, 25 exact
JLCPCB identities and159 paste apertures. Assumed stencil0.10mm; native paste
has not been manually replaced or resized.

Circuit JSON SHA256: `e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`. [Detailed electrical/fabrication review](../../evidence/R8-compact-pcb-2026-10-06/REVIEW.md)
records current source/report hashes, exact orientations, current budgets,
process measurements and accepted warnings. The twelve original native files
are under `gerbers/`; `R8-compact-route23-Gerbers.zip` packages those exact files.
BOM/CPL derived from the same checked JSON are included. Old failed artwork
is retained separately under evidence, outside this final package.

**Not approved for ordering yet:** review supplier-processed copper/mask/paste,
USB slots and mouth orientation, part1 polarity, every BOM/CPL placement,
stackup/copper, stencil/assembly rails, stock and substitutions before approval.
No upload to an assembler, supplier contact, payment or order was performed.
Physical programming, power/BLE/RF, thermal/runtime and enclosure/MagSafe fit
remain post-prototype testing, not claimed measured passes.
