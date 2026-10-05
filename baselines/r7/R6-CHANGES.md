# R5 → R6 engineering changes

R5 directory and its 556 protected files are preserved. R4's 416 files are also preserved: 972/972 hashes unchanged. R6 is isolated in `magnetic-shutter-remote-r6--01a0f81f`, branch `r6-usb4215-engineering-prototype`; baseline provenance is `evidence/R6/START-FROM-R5.json`.

- J1: HCTL HC-TYPE-C-6P-01A / C2894893 → GCT USB4215-03-A / C37616412. Generated through the corrected supported importer, never hand-edited. Manufacturer Rev A land/slot drawing is authoritative.
- J1 authored anchor (0,23.9852), TOP rotation 180°. Actual component/CPL centroid (0,24.5101989); mating face Y=28.6601694. The face moved 0.60 mm outward from the R5 mouth alignment. All 36 other placements and non-USB connections remain identical.
- USB opening: 12 × 7 → 12 × 9.5 mm; same front wall, same centre Y=29/Z=8. Remote body, PCB outline, charger, battery, radio, buttons, firmware and dock geometry unchanged.
- Explicit CC1/CC2 nets terminate on pins 20/26; VBUS on 18/27; GND/shield on 13–17/28. Data/SBU contacts explicitly unconnected. Charging remains reversible.
- Native USB escape path starts follow the new lands; prior escape exits/via sizes remain. Shell escape crossings corrected to nearest-side exits.
- 161 TOP paste apertures total (151 − 6 old USB + 16 new USB); J1 has 12 contact and four shell polygons, mask expansion 0.0508 mm.
- Strict assembly export extended generically for footprints without numeric pin1. The exact supplier model verifies all 16 terminal positions and the unique rotation; no synthetic pin1 or edited component metadata.
- Compatible CLI source build integrates the qualified polygon-paste exporter. Required shorts check now passes, with an injected-short regression that fails correctly.

## Routing scope and unavoidable changes

The semantic geometry comparison in `evidence/R6/R5-to-R6-comparison.json` identifies each path. 60/139 traces retain exact geometry; 79 paths changed. All non-USB saved fanouts remain exact. Native global followup routing reran after USB terminal geometry changed; it did not change the other component placements or circuit functions. The current public route-cache API cannot serialize branched followups (issue 014). A native preloaded-route probe rejected the old routing graph; both its input and failure log are preserved. No generated routing/JSON/CAM was patched to force preservation. Independently checked regenerated copper, ground continuity and RF keepouts pass.

## Prototype disposition

**ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED.** Production profile/stencil/shell-joint coverage remain pending, with user-authorized inspection and possible manual shell rework for the first boards. Published heat-resistance numbers are not relabelled as a production profile. R5 is not retroactively promoted. Nothing was ordered or published.
