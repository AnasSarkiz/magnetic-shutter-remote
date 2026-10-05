# Legacy plated-hole paste test still expected inferred stencil apertures

Status: **fixed locally** in the qualification source copy. Classification: stale test after an earlier R4/R5 local policy change, **not a new upstream primitive defect**.

## Affected version and component context

@tscircuit/core 0.0.2035, preserved R4/R5 local PlatedHole implementation. Native plated holes are PCB features; manufacturer/C-number is N/A for this unit fixture. USB4215-03-A/C37616412 motivates testing explicit shell paste, but supplier geometry is not modified by this test update.

## Minimal reproduction

Unchanged original source/test is archived in [core-base.tar.gz](../source-bases/core-base.tar.gz) and copied under toolchain/core-baseline. From that source copy:

```sh
bun test tests/components/primitive-components/create-solderpaste-from-smtpad-and-plated-holes.test.tsx
```

## Expected versus actual

The preserved PlatedHole.ts policy explicitly states that a plated drill does not imply pin-in-paste assembly and requires explicitly requested stencil apertures. Four SMT apertures are expected; no PTH paste is inferred. The stale test still expected six, including two automatic PTH apertures. Both the original control and the new source return 4, failing expected 6. [Control log](../logs/core-base-plated-paste-test.log), [first run](../logs/focused-core-final.log). This proves the failure predated the new native paste support.

## Root cause, impact and fix

Confirmed mismatch between unchanged local policy and legacy expected result. Updating the fixture expectation is justified by that earlier intentional policy, not by accepting an arbitrary lower aperture count. The corrected test retains SMT geometry/orientation checks, asserts exactly 4 apertures, requires every aperture to reference an SMT pad, and requires one aperture per copper pad. The old failing test is preserved in the base archive. No manufacturing rule or supplier contour was changed.

Changed file: tests/components/primitive-components/create-solderpaste-from-smtpad-and-plated-holes.test.tsx. [Core patch](../patches/core.patch), [source ledger](../source-change-ledger.json). No screenshot applies to this database assertion; the new explicit-paste rotation snapshot is separately retained in 053.

## Regression and remaining gate

Final focused core tests:4 pass /0 fail,107 assertions, covering automatic SMT behavior, no PTH inference, explicit polygons at four rotations on both sides and copper-routing neutrality. [Log](../logs/focused-core-policy-aligned-final.log). Full importer-suite failures remain separately blocked; this does not waive those failures or constitute fabrication approval.
