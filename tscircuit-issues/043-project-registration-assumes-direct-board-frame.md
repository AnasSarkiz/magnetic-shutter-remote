# Project registration audit incorrectly assumes direct-to-board placement

Status: **fixed locally**. Classification: **project audit mistake**, not a confirmed tscircuit bug. Discovered during the R4 qualification follow-up on 2026-10-02.

## 1. Affected package and exact revision

Project script `scripts/audit-r4-qualification.py`, initial local version introduced after reviewed commit `b01c1d567a7145d739c253a4efbd977b8ef04771`; fixed in the qualification follow-up commit. Input is unchanged @tscircuit/core 0.0.2035 local R3-attribution / circuit-json 0.0.509-sheet output. Final source/evidence hashes identify the checked revision. No tscircuit package code changes.

## 2. Component and sources

First trigger: J1 **HCTL HC-TYPE-C-6P-01A / C2894893**, imported using the supported supplier pipeline. [Listing](https://jlcpcb.com/partdetail/HC-TYPE-C-6P-01A/C2894893), [manufacturer and supplier identities](../fabrication/USB-LAND-QUALIFICATION.md), [unchanged source](../src/remote-circuit.tsx). Other saved-fanout components also use valid group-relative records.

## 3. Minimal reproduction and exact inputs

From board root with preserved `dist/index/circuit.json`:

```sh
tooling/gerber-review-venv/bin/python tscircuit-issues/evidence/043/repro-direct-board-frame.py
tooling/gerber-review-venv/bin/python scripts/audit-r4-qualification.py
tooling/gerber-review-venv/bin/python -m unittest discover -s tests -p test_r4_registration.py -v
```

First command intentionally reproduces the old failure, not the fixed audit. [Minimal original assumption](evidence/043/repro-direct-board-frame.py). Required Circuit JSON is the exact preserved board input; no import, account or remote service is needed.

## 4. Expected behavior

Audit should respect `positioned_relative_to_pcb_group_id` and the group's **anchor_position**, then resolve to the board coordinate frame. A group's bounding-box centre is different from its placement anchor. The installed schema permits group-relative placement: [schema source](../tooling/circuit-json/src/pcb/pcb_component.ts), actual saved groups in [Circuit JSON](../dist/index/circuit.json). All eight source fanout anchors are `(0,0)`.

## 5. Actual behavior

Initial audit directly indexed `placed['positioned_relative_to_pcb_board_id']`. Valid J1 instead has `positioned_relative_to_pcb_group_id='pcb_group_0'`, causing **KeyError: 'positioned_relative_to_pcb_board_id'**. The underlying board placement is valid; it was the new checker that misunderstood the frame.

## 6. Logs and before/after measurements

[Reproduced before failure](evidence/043/before.log), [fixed audit](../evidence/R4-qualification/qualification-audit.log), [43-test run](../evidence/R4-qualification/tests.log), [all 37 registration measurements](../evidence/R4-qualification/qualification-audit.json). J1 source `(0,23.25)` is retained; centroid `(0,23.6749991)` and CPL/PDF `(0,23.675)` agree. No geometry changed, so no fictitious changed-footprint screenshot exists. [Actual reviewed assembly pages](../evidence/R4-qualification/assembly-1.png), [page 2](../evidence/R4-qualification/assembly-2.png).

## 7. Root cause: facts versus hypotheses

Confirmed project-checker assumption of a flattened frame. Circuit JSON explicitly preserves native group relationships. No missing schema field, core-placement defect or origin inversion is established. Using the group's `center` as its anchor would create another project error; fixed code uses `anchor_position`.

## 8. Impact

Interrupted the new read-only registration audit. Did not affect schematic, copper, BOM, fabrication exports, assembly centroids or original R4 validation. Initial failure remains reproduced rather than ignored.

## 9. Fix, changed files and regressions

`scripts/audit-r4-qualification.py` now verifies a group-relative component's actual group anchor and board reference. Direct board-relative components retain their separate check. Unknown/nonzero frames fail explicitly; no fallback, type escape or record patch. `tests/test_r4_registration.py::test_nonzero_group_anchor_rejected` prevents blindly accepting an arbitrary group transform. Separate tests reject origin shifts, mirrors, global quarter turns, wrong centroid substitution and PDF rotation mistakes.

## 10. Verification and remaining blocker

Fixed audit passes all 37 refs against source AST, Circuit JSON, actual CPL and saved PDF; original CAM independently matches. All **43 tests pass**, including the previous 35. No remaining blocker for this project-audit defect. Actual factory rail/fixture/library handoff remains a separate supplier confirmation in [assembly registration](../fabrication/ASSEMBLY-REGISTRATION.md). No report or package published.
