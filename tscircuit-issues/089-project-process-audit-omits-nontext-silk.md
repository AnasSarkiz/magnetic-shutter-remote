# R8 project process audit omitted supplier circles from complete silkscreen checks

Classification: **confirmed project audit coverage defect**, not supplier copper/import scaling or a tscircuit routing defect. Correction implemented; final export validation recorded in the current R8 review.

The previous `scripts/review-r8-process.py` attributed and measured only `pcb_silkscreen_text`. Actual full native Gerbers also contained six supplier-generated circles. Checking readable functional text alone did not establish all-layer stroke or mask clearance. This was discovered while qualifying the direct3-pin standard-JST UART header; earlier success reports remain preserved and are not silently rewritten.

Original failing export: `fabrication/R8-standard-programmer-2026-10-05/R8-standard-programmer-route04-Gerbers.zip`; original native source: `evidence/R8-standard-programmer-2026-10-05/route-04/circuit.json`. Complete TOP silk has minimum stroke**0.100000mm** and mask gap**0.08601778023829763mm**, versus the unchanged project print limits**0.15mm stroke /0.15mm mask clearance**. Outside-outline area0. The actual failed independent report is `evidence/R8-standard-programmer-2026-10-05/route04-process/process-review.json` and its log. Copper/routing/native shorts passed on that revision; these thin marks were a separate process issue, not a short.

The checker now measures the **entire actual native silkscreen layers**, in addition to attributable labels. The meaningful CAM regression reads the preserved failing full Gerber and detects its thin supplier circles even though functional text alone passes.

Authored board `pcbSx` hides supplier `silkscreencircle`, alongside its existing hidden supplier paths/text. Exact generated imports/copper/paste/models are untouched. Functional native legends including UART RX/GND/TX, pin1, battery polarity, BOOT/RESET and side shutter remain. This is a producer correction; no output clipping, Gerber/JSON editing, mask change, checker exemption or reduced threshold. Final native/export/process and frozen-preservation results are in `evidence/R8-standard-programmer-2026-10-05/REVIEW.md`.

Reproduce via guarded native build/export and `review-r8-process.py` using the retained route04 ZIP/source for the original failure. Run `tooling/gerber-review-venv/bin/python -m unittest discover -s tests/cam -v` for focused regressions. Both must run in Linux through `python3 cloud/run-heavy.py --` when used as heavy jobs. No supplier acceptance, ordering, physical print/assembly validation or upstream fix is claimed.
