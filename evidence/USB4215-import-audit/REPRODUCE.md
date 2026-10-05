# Reproduce the isolated USB4215 fixture

This does not build or modify the frozen board. Run from the R5 project directory. Use Bun 1.3.9, TypeScript 5.9.3 and the existing CAM environment (Gerbonara/Shapely versions are recorded in working-dependency-manifest.json).

```sh
python3 evidence/USB4215-import-audit/reproduce-fixture.py \
  --output /tmp/usb4215-new-reproduction \
  --cam-python tooling/gerber-review-venv/bin/python
```

The output path must be new. The script copies unchanged raw CAD, final package manifest/lock and seven local built archives; installs with `bun install --offline --frozen-lockfile --ignore-scripts`; imports through `easyeda/dist/main.cjs`; typechecks; renders through native Circuit; exports through circuit-json-to-gerber; and runs independent actual-CAM metrology. It never appends shapes to manufacturing output or patches generated components/JSON/Gerbers.

Bun may need ordinary temporary-cache access. A fresh machine needs the pinned registry dependencies cached before the offline install; they are identified by the lock. The supported CLI can retrieve public supplier model metadata. No credentials, registry publication or ordering is needed.

## Exact supported import commands

Run from the isolated fixture directory after installation:

```sh
bun node_modules/easyeda/dist/main.cjs convert \
  -i ../inputs/C37616412.raweasy.json -o USB4215_03_A.tsx \
  --insertion-direction from_bottom
bun node_modules/easyeda/dist/main.cjs convert \
  -i ../inputs/C37616412.raweasy.json -o ../final/source.bettereasy.json
bun node_modules/easyeda/dist/main.cjs convert \
  -i ../inputs/C37616412.raweasy.json -o ../final/importer.circuit.json
bun run typecheck
bun run render
```

The 20 × 18 mm unrouted board in render.tsx is a component inspection carrier, not the replacement-board proposal or an electrically connected camera remote. It has no fabrication-release claim. Importer output, rendered output and actual CAM are separately retained.

## Reproducibility result

[Clean-run results](reproduction-with-slots/reproduction-results.json) cover18 generated files. TSX, parsed source, direct/imported and rendered Circuit JSON, SVG and metrology are byte-identical. Eleven CAM files have identical commands and all non-timestamp content. Their exporter creation-date fields naturally differ. The comparison normalizes only these documented header timestamps in memory; both originals and their raw hashes are retained. No manufacturing output is edited to obtain a match. Independent geometry tests also pass in the new directory. See [log](logs/clean-fixture-reproduction-with-slots.log).

## Review/build the source fix

The seven original and fixed source archives under source-bases/ exclude dependency trees, build output, credentials and test-diff images. They include exact source, configuration, relevant test inputs and golden snapshots. Source-change-ledger.json and patches/ record every change; working-dependency-manifest.json hashes archives and built packages. Six baselines are preserved R4/R5 toolchain source; SVG is the official npm 0.0.433 gitHead archive. Do not describe these local patches as verified upstream releases.

In the existing isolated source copies, the canonical build command is `bun run build` for each of circuit-json, props, circuit-json-util, core, easyeda-converter, circuit-json-to-gerber and circuit-to-svg, in that dependency order. All seven declaration builds passed; their exact logs are stored in logs/*-qualified-source-build.log. The [integration map](integration-map.json) records the preserved dependency roots used for build tooling, with the seven local peers linked into the isolated copies. Never run these builds from the store root or frozen board tooling directories.

Focused regressions:

```sh
cd evidence/USB4215-import-audit/toolchain/easyeda-converter
bun test tests/explicit-paste-regions.test.ts tests/source-paste-mask-field-fidelity.test.ts
cd ../core
bun test tests/solderpaste-polygon-transform.test.tsx tests/solderpaste-routing-neutrality.test.tsx \
  tests/components/primitive-components/create-solderpaste-from-smtpad.test.tsx \
  tests/components/primitive-components/create-solderpaste-from-smtpad-and-plated-holes.test.tsx
cd ../circuit-json-util
bun test tests/transform-paste-polygon.test.ts
cd ../circuit-json-to-gerber
bun test tests/gerber/polygon-solder-paste.test.ts
cd ../circuit-to-svg
bun test tests/pcb/solder-paste-polygon.test.ts
```

Full importer suite command is `bun test` in toolchain/easyeda-converter. It requires public component/model access and retains 33 unresolved failures; it is not a passing upstream release gate. The unchanged-source paired control and all earlier failing logs are retained. The initial implement-fix.py records development history only; it predates subsequent mask/integration/test corrections and is not the final reproduction script.
