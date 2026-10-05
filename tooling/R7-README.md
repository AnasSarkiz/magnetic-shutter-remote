# R7 retained toolchain / shutter-only order review

The current PCB source, imports and firmware are unchanged from frozen R6
77965a8012d5544e962d987ce958c5c5614dbe3a. Torch research is cancelled. Its generic
tool fixes remain independently useful; none adds torch components to the board.

Runtime is locked in ../bun.lock: easyeda0.0.364 with circular-paste parser,
core0.0.2035 with consistent SMT pad bounds, CLI0.1.2237 rebuilt with those local
dependencies. All other qualified R6 package versions remain pinned. No general
upstream tool release or full importer-suite pass is claimed.

R7-patches/manifest.json records exact original source archives, patch files,
changed-file hashes and runtime archive hashes. To reproduce developer sources,
extract each recorded base archive into its own project-local directory, apply
its corresponding patch with `patch -p1`, then run the canonical Bun install,
typecheck, focused tests and build. The package manifests retain the documented
local dependency paths; preserve the tooling/vendor relative directory layout.
The source working directories and original failing inputs are preserved locally.
The core repro SVG snapshots remain under tooling/r7-core-source/tests/repros/r7.
No generated supplier import or Circuit JSON is patched.

Retained results: USB4215 focused7,685 assertions PASS; extended importer8 tests /
9,174 assertions PASS; core focused7 tests /219 assertions PASS. The33 full-importer
failures also occur in the paired control. They remain known failures, not waived
or reclassified as full-suite success. See ../tscircuit-issues/070* and071* and
../evidence/USB4215-import-audit/IMPORTER-FIX-STATUS.md.

For board reproduction: `bun install --frozen-lockfile`, `bun run format:check`,
`bun run typecheck`, the native checks in ../evidence/R7-order-review/pre-route-checks.json,
then the current native routed build. Manufacturing review uses the existing
Python environment locked by gerber-review-requirements.txt. Set:

```
MAGNETIC_REVIEW_EVIDENCE=evidence/R7-order-review
MAGNETIC_REVIEW_FABRICATION=fabrication/R7-order-review
MAGNETIC_REVIEW_CAM=R7-gerbers.zip
```

Run export-assembly.ts with those two directories, the supported Gerber CLI,
review-r3-exports.py and the review-r6-* scripts. These path changes isolate R7
outputs and preserve validation criteria. Never run the old R6 wrapper unchanged
against another revision: it writes into historical evidence/R6.

The canonical board test command deliberately remains failing if historical
preservation or required inputs are missing. Current missing original R5 archive
and skipped missing R2 fixture are reported in issue074 and VALIDATION.md.
