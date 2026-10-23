# R8 tscircuit refresh and exact-part re-import — 2026-10-23

**BLOCKED — UPGRADE AUDIT ONLY. NOT A BOARD RELEASE OR FABRICATION PACKAGE.**

Recovered public source: `AnasSarkiz/magnetic-shutter-remote`, branch
`board/r8-enclosure-reference-20261011`, commit
`208aa007ee98d432b6ba510776af323822f832db`.
Local continuation: `boards/magnetic-shutter-remote-r8--01a0f81f`.
Update branch: `maintenance/r8-tscircuit-reimport-20261023`.
The former local folder was absent. No other board directory was changed.

The user authorized updating tscircuit and re-importing components, reporting issues.
Exact public npm releases were retrieved on2026-10-23 and pinned in package.json/
bun.lock: tscircuit0.0.3008, CLI0.1.2402, core0.0.2199, eval0.0.1657,
props0.0.709, easyeda0.0.381, CircuitJSON0.0.534, SVG0.0.453,
Gerber0.0.114, PnP0.0.20, util0.0.128, PCBviewer1.11.433,
3Dviewer0.0.631, schematicviewer2.0.105 and router0.0.1003.
See npm-releases.json for package sources/integrity, and before-package.json/
before-bun.lock for the previous locally qualified toolchain. Runtime is
Node25.6.0/Bun1.3.9 on macOS arm64. No routing or board/render build ran here.

## Actual outcome

- 25/25 fitted supplier identities (44 fitted references) re-imported with the
  supported CLI: `--jlcpcb --use-exact-footprint --download`.
- Exact MPNs, pin-label tables and copper/drill geometry:25/25 identical to
  the preserved imports. Four USB plated slots remain geometrically identical.
- 50/50 downloaded assets have valid OBJ/STEP format signatures and contents.
  This is format checking, not physical pose/fit validation.
- USB4215 C37616412 loses all16 **explicit** paste regions. Current supplier
  package3104977db58742e399663286e4a66eac still contains16 filled layer5 regions.
  This does NOT mean an eventual renderer would emit no default contact paste;
  it means the exact intended12 contact+4 shell stencil is not preserved.
- Seven identities lose explicit pad paste/mask settings: C56594, C19949072,
  C15516, C37616412, C160402, C160389 and C393942.
- USB4215 and both JST parts become generic chips instead of connectors.
  USB4215's explicit `from_bottom` direction is also absent. The two JST imports
  already lacked explicit direction in the preserved baseline (known004);
  do not misreport that pre-existing omission as a new loss.
- MSK12C02 C431540 becomes a generic chip, losing explicit `type="spdt"`.
  Terminals1,2,3 and shell4 remain present; missing behavior is not missing copper.
- Current published props rejects polygon solderpaste and parent mask/paste
  process styles; published PnP lacks the qualified registerSupplierTerminals API.
  These are integration gaps against the project's local fixes. No footprint
  substitution, generated TSX edit, JSON patch, suppression or type escape used.
- Existing modelprinter0.0.2 was hoisted despite the new core requiring a newer
  API. Explicit compatible published0.0.18 fixes CLI startup (local issue104).

Fresh outputs remain in `fresh/imports/`; current active `imports/` is unchanged.
Both original25TSX files and current25supplier payloads are retained here. The
standalone easyeda0.0.381 conversion of USB and switch reproduces the omissions
(`standalone-network-*.tsx`), so this is not established merely from a CLI exit.
The first standalone attempt's sandbox network warnings are preserved separately;
the normal-network rerun has an empty error log.

## Checks and limits

| Check | Actual result |
|---|---|
| Exact CLI re-import | PASS25/25 |
| Identity/pin/copper/drill comparison | PASS25/25; no numeric rounding/tolerance used |
| Asset format | PASS50/50 |
| Static geometry auditor regressions | PASS4tests/10assertions |
| Compatible modelprinter startup regression | PASS1test/1assertion |
| Exact import-release contracts | FAIL:1PASS,13FAIL,89assertion calls |
| Existing Python suite | PASS38tests |
| TypeScript | FAIL28errors; no suppressions |
| Configured format | PASS; final result in format-final.log |
| Frozen R7 portable context | PASS129/129; original vendor archives unchanged |
| Original5383tracked-file hash comparison | Current deltas listed in preservation-final.json |
| Whole-board netlist/pin/placement/routing/shorts/snapshot/CAM/3D | NOT RUN; blocked by import/type qualification |
| Native importer7685 and full-suite33failures | Historical only; not rerun, no full-suite pass claimed |
| Firmware rebuild/phone/thermal/RF/battery/enclosure tests | NOT RUN; hardware tests remain POST-PROTOTYPE PHYSICAL VALIDATION |
| Fresh CircuitJSON or native registry release | NOT CREATED; failed checks block board publication |

The tracked dist JSONs remain byte-identical reference artifacts from the preserved
0.3.29 source/toolchain. They are **not** outputs of this update and must not be
published as refreshed output. package.version stays0.3.29 because no new qualified
board release is made. No R9 is created. No stock/assembly requalification is claimed
from import success. No order, supplier contact, PR, merge or package publication.

## Reproduce

From the board root, install `bun install --frozen-lockfile`. Install/import requires
normal access to official package/supplier/model endpoints; no credentials are needed.
The saved imports/JSONs allow offline comparison without querying suppliers again.

```sh
./node_modules/.bin/tsci --version
./node_modules/.bin/tsci import --help
# Example exact live reproduction, safely outside active imports:
cd evidence/R8-toolchain-refresh-2026-10-23/fresh
../../../node_modules/.bin/tsci import --jlcpcb --use-exact-footprint --download C37616412
cd ../../..
bun scripts/audit-r8-reimports.ts
bun test tests/r8-reimport-audit.test.ts
bun test tests/r8-importer-release.test.ts
bun run typecheck
bun run format:check
python3 -m unittest discover -s tests -v
python3 cloud/verify-context.py
```

import-results.json records all25exact commands, durations, exit codes and cwd;
individual C-number logs preserve actual output. No transient retry success was
substituted for a failed qualification result. Library-source excerpts are copied
unaltered from easyeda's published source map under upstream-source/.

`j1-import-comparison.png/svg` is a visual rendering of original/fresh literal TSX
geometry, inspected locally. It is not a native PCB/3D/CAM export. Reproduce via
`python3 evidence/R8-toolchain-refresh-2026-10-23/draw-import-comparison.py`, then
use the pinned @resvg/resvg-js Resvg API to rasterize its SVG. The source remains
editable; no electronic footprint is authored by this review drawing.

## Blocker disposition

Preserve the proven board and generated imports. Port/verify the existing generic
paste, process-style, connector/topology and PnP registration fixes against current
upstream source, or use a demonstrated fixed upstream release; regenerate through
that supported pipeline. Then re-run qualification in Linux with the unchanged
serial memory guard before adopting refreshed imports, regenerating board JSON,
or publishing a board. Do not edit generated components to disguise regressions.
See the retained issue register and current105 integration report.

Raw supplier STEP/TSX/source-map/log evidence retains its original line endings and
whitespace. Whole-index git diff --check reports those byte-preserved data warnings;
no generated supplier artifact or actual failure log was reformatted to hide them.
Canonical maintained-code formatting passes separately.
