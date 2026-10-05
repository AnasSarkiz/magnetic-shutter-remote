# Connector import cannot specify verified mating direction

Status: **fixed locally**. Classification: **tscircuit importer metadata limitation**.

## Affected package and revision

`easyeda-converter` 0.0.364, upstream base `140046d000238f3d6c8611989682efb2872f25a9`. Local source and exact locks are included under `tooling/easyeda-converter`. When this report concerns external CAM/search/project logic, this is the tscircuit package boundary examined, not an assertion that it caused the problem. Gerbonara is 1.5.0; board tscircuit is 0.0.2702, CLI version is recorded by R3 tooling evidence.

## Component and primary sources

JST S2B-PH-SM4-TB(LF)(SN) C295747; BM06B-SRSS-TB(LF)(SN) C160392

- [https://www.jst-mfg.com/product/pdf/eng/ePH.pdf](https://www.jst-mfg.com/product/pdf/eng/ePH.pdf)
- [https://www.jst-mfg.com/product/pdf/eng/eSH.pdf](https://www.jst-mfg.com/product/pdf/eng/eSH.pdf)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
cd tooling/easyeda-converter
bun test tests/convert-to-ts/manufacturer-metadata.test.ts
bun cli/main.ts convert -i ../../evidence/R2/C160392.raweasy.json -o /tmp/sh.tsx --output-format tsx --insertion-direction from_above
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

PH mates from −Y, SH from +Z in the unrotated footprint. Metadata must agree with actual manufacturer drawings.

## Actual behavior

Automatic generic connector treatment did not establish actual insertion direction. Missing metadata made edge/access checks unreliable.

## Logs, geometry and visual evidence

- [importer-connector-symbol-review.log](evidence/004-connector-mating-direction-metadata/importer-connector-symbol-review.log) (unaltered copy of `evidence/R2/importer-connector-symbol-review.log`)
- [C160392.raweasy.json](evidence/004-connector-mating-direction-metadata/C160392.raweasy.json) (unaltered copy of `evidence/R2/C160392.raweasy.json`)
- [C295747.raweasy.json](evidence/004-connector-mating-direction-metadata/C295747.raweasy.json) (unaltered copy of `evidence/R2/C295747.raweasy.json`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed capability gap; physical direction must be established from manufacturer drawing, not guessed from an image.

## Impact

Incorrect enclosure opening, inaccessible mating or misleading placement warning.

## Fix, changed files and verification

Validated six-axis --insertion-direction supplied at source conversion. R3 retained actual PH/SH parts with all electronics top.

- `tooling/easyeda-converter/lib/websafe/convert-to-typescript-component/conversion-options.ts`
- `tooling/easyeda-converter/cli/main.ts`
- `tooling/easyeda-converter/tests/convert-to-ts/manufacturer-metadata.test.ts`

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
