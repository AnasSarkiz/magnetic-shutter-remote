# R6 qualified local tools

Versions/archive hashes/source branches and commits are in `../evidence/R6/toolchain-manifest.json`. The board uses Bun1.3.9 and pinned local archives in `vendor/`; `bun.lock` is authoritative. No package was published.

Generic USB4215 paste fixes are separately frozen in `../evidence/USB4215-import-audit/`: seven control/fixed source archives, patches, exact commits, regressions and raw CAD. The original imports remain evidence. `IMPORTER-FIX-STATUS.md` explicitly retains the33 baseline full-suite failures. Focused7,685 assertions passed again during R6; general full-suite success is not claimed.

Additional R6source archives are in `source-archives/`: PNPstrict terminal registration, source-built CLI integration, eval and runframe dependency integration. They contain source, manifests, locks and tests, without `.git`/credentials/node_modules. Recorded working patches accompany them. For each tool, extract its archive into a new project-local directory, run `bun install --frozen-lockfile`, then its canonical `bun run build`. Local dependencies referring to `../vendor` must resolve to this `vendor/` folder. Focused PNPtests: `bun test`; CLIregression: `bun test tests/cli/check/usb4215-polygon-paste.test.ts`. Full CLI/upstream suites are not claimed passing.

The CLIpack was made by canonical `bun pm pack --destination ../vendor`, because npm's override validation rejects an upstream directpoppygl declaration. R6uses the packed CLI0.1.2237 plus qualified exporter integration; the required native `tsci check shorts` remains the same command and Gerber mode. No test-mode flags, generated-code patch or shape filtering. The negative bridge regression confirms real shorts remain detected.

Gerber installed CLIrequires explicit consumer `archiver7.0.1`and `commander12.1.0`; these runtime dependencies are pinned in the root package. CAMreview Python versions are locked in `gerber-review-requirements.txt`. Create the virtual environment and install that file before the output suite.

Native preview uses pinned `runframe/package.json`and native viewer components on finalCircuitJSON. Evalwas canonically rebuilt with qualified schemas. The full runframe standalone rebuild exceeded available local disk/memory and is not claimed complete; the stale R5standalone bundle is excluded from the release. CLIbuild/PNG/GLBare complete and reviewed. Browserasset-cache/CORSdiagnostics are documented in the visual review; numerical dimension/geometry checks remain authoritative.

A source checkout's disposable `node_modules` may be absent after qualified build/pack due to disk limits; sources, locks, archives, tests and logs remain. Reinstall dependencies for tool-development reproduction. The board's configured root dependencies reproduce the validated package without requiring those developer checkouts at runtime.

The eval/runframe repositories explicitly disable lockfile creation in their canonical bunfig.toml. Their direct registry dependency versions are pinned to the installed verified versions; actual pin manifests are in evidence/R6. File/source-qualified dependencies retain their original supported paths. No non-existent tool lockfile is claimed. The board runtime uses its root frozen bun.lock and qualified built archives.
