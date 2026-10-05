# R3 working tooling and reproducible integration

All changes are local and unpublished. The project stays tscircuit source; no KiCad authoring or viewer is required for R3. Exact seven upstream base commits, source versions, changed files, untracked regression fixtures and patches are in [revisions.json](revisions.json). The complete edited sources/locks are included; patches alone omit untracked fixtures, so use supplied source directories as the complete record.

## Working dependency identities

Board Bun 1.3.9; tscircuit 0.0.2702 / CLI 0.1.2212; TS 5.9.3; Biome 2.2.4. Exact dependency graph is in the board lock. Active core is **vendor/tscircuit-core-0.0.2035-r3-attribution.tgz**, together with schema 0.0.509-r2-sheet, util 0.0.117-r2-orientation and capacity autorouter 0.0.951. Installed core bytes match the canonical tested build. Historical archive filenames remain evidence, not active dependencies.

Supported Gerber source converter is 0.0.109 base 40dbb6c0ebae9c63ef5a52292e8521de6060c548 plus the local inline G85/G05 correction. Upstream already fixes M48 header placement. The older CLI-bundled 0.0.104 is not treated as fixed by root overrides; use the explicitly built canonical converter. Its full suite passes 172 tests/1640 assertions after actual TOP/BOTTOM snapshot review, with original snapshots retained. No exported Gerber/drill edits are used.

Native browser evaluation uses eval 0.0.1506-r3-attribution with the same locked source engine, and runframe 0.0.2883 with a matching packaged-worker resolver plus compatible props 0.0.672. The canonical eval build and runframe CSS/standalone targets pass; focused packaged-worker test passes. Other runframe targets/full browser suites are not claimed passed. Corrected standalone min.js is included so the native project viewer does not silently use the old CDN evaluation engine.

## Restore and build

Use `bun install --frozen-lockfile` in each source directory before its canonical build. Local archives in `../vendor/` are already supplied; dependencies may require network. Core's schematic solver archive 0.0.217 is supplied and locked. Run source commands within their own package directory, not workspace root.

```sh
# Board root
bun install --frozen-lockfile
bun run format:check
bun run typecheck
bun run test

# Supported converter (run here to regenerate its dist before exports)
cd tooling/circuit-json-to-gerber
bun install --frozen-lockfile
bun run build
bun test
```

Focused core regression commands from tooling/core (exact tests, before/final logs and fixtures are linked in issues 021–023, 028, 031 and 035):

```sh
bun install --frozen-lockfile
bun test tests/repros/repro-saved-fanout-plated-terminal-bottom.test.tsx tests/repros/repro-saved-fanout-smt-terminal-wrong-layer.test.tsx tests/repros/repro-routed-trace-between-saved-fanouts.test.tsx
node_modules/.bin/tsc --noEmit
bun run build
```

Use actual package scripts in the saved package.json; earlier full-core suite timeouts remain evidence and are not a passed full suite. Meaningful focused tests and builds are passed. No regression was removed or weakened.

To rebuild the native viewer, run eval's full canonical `bun run build` from tooling/eval, then run `bun run build:css` and `bun run build:standalone` from tooling/runframe with its frozen lock. The eval prebuilt archive is already matched to the locked core; a changed build requires a new archive identity and updated lock, never overwriting evidence. From the board root:

```sh
RUNFRAME_STANDALONE_FILE_PATH="$PWD/tooling/runframe/dist/standalone.min.js" node_modules/.bin/tsci dev --port 3026
```

Reload the existing tab after changing the packaged evaluation worker. Watch exclusions omit tools/research/output files, not validation checks. Keep a captured server log outside the watched project to avoid recursive recompilation. Final source viewer PCB and 3D were inspected; PCB shows zero errors.

Importer is supported easyeda-converter 0.0.364 base 140046d000238f3d6c8611989682efb2872f25a9, with validated topology/mating/ref-label/declared-slot fixes. `scripts/regenerate-qualified-imports.sh` preserves original raw payloads and regenerates via its CLI. HCTL import was separately regenerated through that corrected CLI and not edited. Manufacturer geometry, pin mappings and imports remain unchanged.

Independent CAM uses Python 3.14.7 with the pinned `gerber-review-requirements.txt`, including Gerbonara 1.5.0, pcb-tools 0.1.6 and Shapely 2.1.2. Create task-local gerber-review-venv; no virtual environment is archived. Gerbonara's G85 limitation remains, while pcb-tools reads the original exported slots/rounds directly; no syntax normalization is used. OpenSCAD/ReportLab generate mechanical outputs, not electronic symbols or footprints. OpenSCAD needed host execution on this Mac because its sandbox launch aborted; the actual successful native mesh/render logs are saved.

[Current hashes](../evidence/R3/current-source-tooling-hashes.json), [validation scope](../VALIDATION.md), [all local issue reports](../tscircuit-issues/README.md) distinguish project mistakes, supplier deviations, external readers, manufacturing limits and confirmed tscircuit bugs. Archive manifests exclude dependency folders, Git/account metadata and raw signed supplier listing HTML; safe qualified sourcing JSON and original public raw library/footprint inputs remain.

---

# R2 local tooling fixes and reproduction

All changes are local; no packages, commits, issues or PRs were published. `revisions.json` gives upstream commit IDs and changed/new files. Complete editable source directories and binary patches are included; patches alone omit untracked new test files, which are present in those directories. Original R1 supplier imports are under `evidence/R1-original-imports/`.

## Locked packages

Board: Bun 1.3.9, tscircuit 0.0.2702, TypeScript 5.9.3, Biome 2.2.4; exact transitive graph in the board `bun.lock`. Local archives:

- core 0.0.2035 + R2 fixes: `vendor/tscircuit-core-0.0.2035-r2-paste.tgz`.
- circuit-json 0.0.509 + sheet metadata schema: `vendor/circuit-json-0.0.509-r2-sheet.tgz`.
- circuit-json-util 0.0.117 + orientation classification: `vendor/tscircuit-circuit-json-util-0.0.117-r2-orientation.tgz`.
- easyeda-converter 0.0.364 source + R2 supported conversion options and slot fix, with its own lockfile.

Official converters: circuit-json-to-bom-csv 0.0.19, circuit-json-to-pnp-csv 0.0.16 and CLI-bundled circuit-json-to-gerber 0.0.104. These are used directly, with no hand-created fabrication substitutes. Root overrides apply corrected packages consistently. Installed core binary hash was compared with the tested build; see installed-package-hashes.json. Earlier install failures are historical, not accepted install evidence.

## Fixes and regression evidence

- Importer `conversion-options.ts` / CLI: validated SPDT and insertion-direction options. Switch classification excludes thermostats; USB connectors retain original symbols and pin arrangements. No supplier data is rewritten.
- Custom symbol generation includes dynamic reference labels. Core associates reference text outside the symbol's nominal bounds with its true owning component. Repeated physical pads merge correctly with logical custom-symbol ports; port selectors round-trip through the routing cache.
- EasyEDA OVAL drills consume the declared `holeLength` field. Five focused tests cover unequal annular margins, four rotations and circular holes inside oval copper. RECT plated-hole inference is unchanged and is not exercised by fitted parts here.
- Core optional hole fields and display offsets conform to the schema. Sheet display_name/centre metadata survives schema parsing.
- Orientation utility quantizes inferred orientation coordinates at 1 µm for classification only; raw geometry is unchanged. Rotation tests preserve rejection of real 0.01 mm staggering.
- Core no longer creates unrequested stencil apertures on either side of plated holes. Explicit paste primitives remain supported; board shell solder process is not invented.

Importer full suite: 308 pass / 77 snapshots. Schema: 400 pass. Orientation utility: 141 pass. Final core focused regressions: four pass, plus earlier repeated-pad test. Core full suite was not run. Before/after logs and visually reviewed snapshots are in evidence/R2 and the source test directories.

## Build from editable source

Each source directory has its own lockfile. Restore dependencies with `bun install --frozen-lockfile` from that directory, then use its canonical scripts (`bun run build`, `bun test`, `bunx tsc --noEmit`; core uses selected repro tests). Core depends on the task-local `../vendor/schematic-trace-solver-0.0.217.tgz` recorded in its package configuration. Task-local dependency folders were cleared after tests to recover disk space; this does not remove source or locks.

The board uses the supplied prebuilt local archives. To reproduce a modified local build, use `bun pm pack --destination ../vendor` from the package source directory, give the archive a new task-local filename, update the board's dependency/override to that archive, and run `bun install`. Do not overwrite an archive already identified by the evidence manifest or hand-edit installed package files.

From the board root, regenerate affected supplier components with:

```sh
sh scripts/regenerate-qualified-imports.sh
```

This invokes the actual corrected importer CLI against preserved raw supplier payloads. It is not a generated-import patcher. The unchanged passive/module imports remain their original supported imports. Network may be needed for supplier model metadata.

Board build/check/export commands are in the root README, validate-r2.py, export-assembly.ts and fabrication/README.md. The independent Gerber review environment uses `gerber-review-requirements.txt`. Its G85 limitation is explicitly recorded; it never rewrites manufacturing files. OpenSCAD and ReportLab generate mechanical deliverables, not electronic footprints.
