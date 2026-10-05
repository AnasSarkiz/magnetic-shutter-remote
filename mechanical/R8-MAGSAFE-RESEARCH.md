# Public MagSafe references screened for R8

Broader search found useful public reference geometry through the managed
GitHub HTTPS proxy. These are research inputs, not a qualified R8 magnet part,
completed enclosure or a universal iPhone fit claim. Current Apple guidance is
still inaccessible in this instance; no proxy bypass or external fetch relay
was used. No third-party CAD or simulation code was executed or incorporated
into the board.

## Useful sources

| Reference | Pinned source | Finding and limits |
| --- | --- | --- |
| Magnetic array model | [kavinaidoo/magneticallymodellingmagsafe](https://github.com/kavinaidoo/magneticallymodellingmagsafe/tree/1e0d236cb76afa6e7517c982264b6d4ca4bd0677) | Script cites Apple R20; notebook cites R21. Nominal inner band radii 23–24.15 mm, outer band 25.9–27.05 mm, thickness 0.55 mm, opposite magnetization directions. Overall nominal ID 46 mm/OD 54.1 mm. The alignment/clocking magnet is explicitly omitted. This is a simplified model, not a selected assembly drawing or retention measurement. |
| Parametric passive attach plate | [vaaski/magsafe.scad](https://github.com/vaaski/magsafe.scad/tree/5b1f44ff5e61b922857db2b0584e7690ce6c0b71) | Default authored baseplate diameter is 62 mm using pairs of 4 × 2 mm disc magnets. Clocking is disabled by default with a comment that three magnets were too weak. Useful layout reference; no exact qualified magnet MPN, polarity/force acceptance or R8 fit evidence. Its plate dimension is not an alternative Apple array specification. |
| Phone dimensions | [Hampus-Enlund/Phone-Case-OpenSCAD-Generator](https://github.com/Hampus-Enlund/Phone-Case-OpenSCAD-Generator/tree/74be50092182eeebd0ddf58de31b9af7a357cc80) | CSV has iPhone 15/15 Pro, 16/16 Pro and 17/17 Pro rows. README attributes inputs to Apple guidance accessed 2026-05-17. No MagSafe centre coordinates, mini/Max rows or exact cases. Primary drawings/transcription have not been independently verified; do not adopt it as the completed compatibility matrix. |
| Published holder referencing Apple guidance | [ream88/magsafe-holder](https://github.com/ream88/magsafe-holder/tree/50a0a411c1c4c455d2e8ddab3ef43669a6fa4a21) | Public STL and photos; README links Apple accessory guidance and generic purchased magnets. Reference use does not establish our exact magnet selection or grip retention. |
| Published commercial-charger mount | [Gooshy/continuity-camera-mount](https://github.com/Gooshy/continuity-camera-mount/tree/ffac8f884178c88f2c1f77ad508b96128d7f8acd) | Public STEP/Shapr3D/3MF and photos. Uses an existing MagSafe charger; it is not qualification of a passive R8 grip. |

Pinning identifies the files inspected; it does not make third-party values
current official Apple specifications. Source URLs, hashes, read dimensions and
screening limits are retained in
[`R8-MAGSAFE-REFERENCE-REVIEW.json`](R8-MAGSAFE-REFERENCE-REVIEW.json).

## Consequences for the compact design

The phone-facing MagSafe ring mount and the smaller detachable shutter remote
must remain separate mechanical interfaces. A 40 mm remote-width target cannot
also contain the cited 54.1 mm magnetic array. A 40 × 44 mm rectangular PCB has
a 59.4643 mm diagonal, exceeding that nominal array diameter and its 46 mm
opening. Magnet, insulation, moulding/print and retention allowances still need
to be added for the selected actual assembly. Do not treat a ring diameter as
the entire grip envelope or force electronics into the ring opening.

Use the nominal reference to plan the phone-facing mount. Freeze its dimensions
only against the actual selected magnetic assembly and qualified interface.
Include an effective anti-rotation mechanism for shutter/grip loads; a circular
ring by itself does not establish torque retention. Keep phone/magnet/backing
metal out of the complete DOIT antenna environment.

Phone-size families remain the user requirement, not a reason to use one generic
phone box. Check the smallest intended phone, widest/deepest camera assembly,
largest intended phone, orientations and case lips relative to each actual
MagSafe datum. The screened CSV lacks those datums and some families, so it
cannot produce valid camera-to-mount clearances yet.

The existing protected battery and PCB remain unchanged. The additional smaller
cell leads found in public maker projects did not include sufficient exact
manufacturer current/protection/harness evidence. Official SparkFun GitHub
charger repositories were checked: their available PDFs describe charger and
gauge ICs, not a smaller protected pack. No cell below the retained 1 A design
requirement was silently fitted.

## Current stage

Broader public-source discovery and screening completed. Mechanical part,
MagSafe/case/camera and compact-battery qualification remain pending under
[`R8-MAGSAFE-REQUIREMENTS.md`](R8-MAGSAFE-REQUIREMENTS.md). No board source/import,
baseline, firmware, dependency, Circuit JSON or routing change was made for this
research. No new DRC/CAM/SDK/magnetic simulation or physical test was run. The
existing public electrical prototype remains hardware 0.3.3/package 0.3.4.
