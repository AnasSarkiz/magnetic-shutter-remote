# Charger solid-ground-plane requirement lacks project qualification

Current R5 status: **fixed locally**. Historical R4 failure and evidence below are retained; the R5 disposition at the end closes this project gate.
Status: **fixed locally** (R5; historical R4 failure retained below). Classification: **project electrical/layout qualification gap**, not a confirmed tscircuit bug or physical thermal failure. Current disposition: **BLOCKED — SUPPLIER CONFIRMATION REQUIRED**.

## 1. Affected package / exact revision

Preserved board source at reviewed commit `b01c1d567a7145d739c253a4efbd977b8ef04771`; @tscircuit/core 0.0.2035 local R3-attribution / schema 0.0.509-sheet / Gerber 0.0.109 local slot fix. No library malfunction is identified. Current compiled source SHA is in [qualification preservation](../evidence/R4-qualification/preservation-before.json).

## 2. Component and source

U2 **Texas Instruments BQ25185DLHR / C19725033**, DLH0010A WSON10 + EP. [Latest official datasheet SLUSF65B](https://www.ti.com/lit/ds/symlink/bq25185.pdf), [saved exact copy](../references/R4-qualification/BQ25185-current.pdf), section 7.4.1, page 23. [Board source](../src/remote-circuit.tsx), [unchanged supplier import](../imports/BQ25185DLHR.tsx).

## 3. Minimal reproduction and required inputs

From board root, read the actual saved source and manufacturer text:

```sh
rg -n -C 2 'solid ground plane' references/R4-qualification/BQ25185-current.txt
tooling/gerber-review-venv/bin/python scripts/audit-r4-qualification.py
```

Required exact `dist/index/circuit.json`, source, complete R4 CAM and TI text are preserved. Audit records `charger_layout` without modifying them. No account, upload, GUI edit or circuit regeneration required. View the native board and both original copper layers as part of review; a type-count alone is not a complete copper inspection.

## 4. Expected behavior

TI's layout guidelines explicitly call for a **solid ground plane tied to the GND pin and thermal pad**. Datasheet/source qualification should identify an implemented plane or an authoritative application-specific deviation, separately from successful electrical GND connectivity.

## 5. Actual behavior

Current PCB has 151 SMT pads, 139 PCB traces, 102 vias, **zero copper pours/regions**; all ordinary wire-route widths are 0.15 mm. Its actual source/native/CAM copper is pad-and-trace geometry. EP/GND electrical connectivity passes, but no solid ground plane is demonstrated. Prior physical thermal status was pending; that does not resolve this layout requirement.

## 6. Evidence and before/after measurements

[New numeric qualification record](../evidence/R4-qualification/qualification-audit.json) `charger_layout`, [exact TI section text](../references/R4-qualification/BQ25185-current.txt), [actual native PCB screenshot](../evidence/R4-qualification/native-pcb-viewer.jpg), [original TOP full copper](../evidence/R4/cam-readback/CAM-top-all-drills.png), [original BOTTOM full copper](../evidence/R4/cam-readback/CAM-bottom-all-drills.png), [complete independently re-read CAM](../evidence/R4-qualification/cam-readback/readback.json). No geometry changed; no before/after fix screenshot is claimed.

## 7. Root cause: facts and hypotheses

Confirmed absence of an implemented plane and absent deviation record in the preserved design, while exact current TI guidance specifies one. The project designed low charge current, but calculated low dissipation is not manufacturer permission to omit that feature. Thermal behavior of this layout is unknown, not a measured failure. No unsupported inference that tscircuit cannot generate pours is made.

## 8. Impact

Reopens the manufacturer's charger-layout qualification within electrical/placement/routing review. Original software connectivity, independent clearance and CAM fidelity checks still pass to their actual scope. Adds a pre-fabrication qualification requirement; does not convert pending physical thermal tests into failed tests.

## 9. Fix details / precise remaining blocker

No source/import/JSON/CAM patch made. Exact USB supplier qualification already blocks dependent copper redesign under the workspace import gate. Obtain an authoritative application-specific TI disposition, or implement the stated ground plane through supported project source after component qualification, then rerun full connectivity/placement/routing/antenna/clearance/snapshot/CAM checks. Do not merely label a narrow ground trace as a plane or assume 20 mA is an exemption. [Exact unsent question 7](../fabrication/SUPPLIER-QUESTIONS.md).

## 10. Verification results

43 existing/new audit regressions pass; native viewer 0 errors; all 12 CAM files independently parsed. These do not test this TI layout requirement and are not cited as resolving it. **BLOCKED — SUPPLIER CONFIRMATION REQUIRED**; no supplier contacted. Physical battery/thermal/RF/fit/runtime/phone tests remain **NOT RUN / PHYSICAL TEST PENDING**.

## R5 disposition (R4 report/evidence preserved)

Status: **fixed locally** for the project geometry/process strategy. Current TI SLUSF65B August 2026 section 7.4.1/p23 is applied. Actual continuous TOP plane area 1182.117477 mm2 covers the entire EP11 and directly contacts GND5. USB/battery/SYS GND lands physically join it; two nearby plated GND vias feed BOTTOM. Zero RF keepout intrusion; no via-in-pad. Bottom EP projection is not fully solid and is explicitly reported, not silently treated as passed. [Actual geometry/connectivity](../evidence/R5/ground-plane-review.json), [complete CAM readback](../evidence/R5/cam-readback/readback.json). Thermal performance remains POST-PROTOTYPE PHYSICAL VALIDATION. This closes a project qualification gap, not a tscircuit defect.
