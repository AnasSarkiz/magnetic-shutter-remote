# Reproduce offset-polygon component bounds correction

Follow the existing [R8 mask-style source reconstruction](README.md) first. Overlay `tooling/source-archives/core-R8-polygon-bounds-changes.tar.gz` into the reconstructed core source. This retains the mask correction and adds actual local polygon extents plus4 rotation regressions/snapshots. Verify [the manifest](polygon-bounds-manifest.json) SHA256 entries before execution.

Run serially from the board checkout, with its pinned Bun/Node on PATH:

```sh
python3 cloud/run-heavy.py -- bash -c 'cd .codex/runtime/r8-tooling/core && exec bun test ./tests/repros/r8/polygon-pad-local-bounds.test.tsx'
python3 cloud/run-heavy.py -- bun run --cwd "$PWD/.codex/runtime/r8-tooling/core" build
```

Also run the7 preserved mask, parent-paste, mixed-pad-bounds, separated-ground and overlapping-ground regressions identified in README.md. Pack using `bun pm pack --filename <board>/tooling/vendor/core-r8-polygon-bounds.tgz`. Normal board setup installs the root's locked new archive without rebuilding tooling. Do not edit node_modules or earlier archives.
