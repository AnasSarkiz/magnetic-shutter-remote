# Magnetic shutter remote — R6

**ENGINEERING PROTOTYPE — NOT PRODUCTION QUALIFIED**

Original detachable Bluetooth camera shutter remote and magnetic phone grip. USB-C charges an externally fitted protected single-cell battery; the separate fill light is outside scope. This is an original enclosure, not a JJC replacement board.

R6 uses **GCT USB4215-03-A / C37616412**. All 37 fitted components are imported JLCPCB parts on TOP. The PCB is **36 × 56 × 1 mm**, two layers. Editable entry point: `index.circuit.tsx`; circuit: `src/remote-circuit.tsx`. Supported imports are in `imports/`, exact identities/dates/links in `BOM.csv`, `BOM.md`, `bom.json`.

**PROTOTYPE MANUAL REWORK MAY BE REQUIRED FOR FOUR USB SHELL ANCHORS.** Exact production stencil/profile/shell-process qualification is pending. This user-authorized prototype disposition replaces the earlier supplier-response fabrication hold. It does not certify a production process.

See [qualification](R6-QUALIFICATION.md), [R5-to-R6 changes](R6-CHANGES.md), [validation](VALIDATION.md), [fabrication files](fabrication/R6/README.md), [mechanical design](mechanical/README.md), [external items](EXTERNAL-PARTS.md), [firmware](firmware/README.md) and [issue index](tscircuit-issues/README.md).

## Reproduce locally

Use Bun 1.3.9, TypeScript 5.9.3, the local locked archives and Python 3.14.7. From this directory:

```sh
bun install --frozen-lockfile
python3 -m venv tooling/gerber-review-venv
tooling/gerber-review-venv/bin/pip install -r tooling/gerber-review-requirements.txt
python3 scripts/validate-r6.py
bun scripts/render-r6-review.ts
```

The checks retain native routing and errors; the output suite regenerates the complete CAM/BOM/CPL/drawings from that build. `scripts/check-r6-preservation.py` needs the original R4/R5 directories for its read-only historical comparison; the frozen manifest and result are included for other machines. No commands above order or publish anything. The complete tool versions, source archives and patches are in `tooling/R6-README.md` and `evidence/R6/toolchain-manifest.json`.

For native interactive views, extract `tooling/source-archives/runframe-R6-source.tar.gz` into `tooling/runframe/` (the archive contains repository files without an enclosing directory), install its pinned dependencies with `bun install` from that directory, return to the board root, then run `tooling/runframe/node_modules/.bin/vite --config preview/vite.config.mjs --port 3028`. The preview displays the exact built Circuit JSON using native tscircuit PCB/Schematic/3D viewers; it is not a second board editor/compiler.

Battery, RF, thermal, runtime, enclosure fit and native-camera phone checks remain **POST-PROTOTYPE PHYSICAL VALIDATION**. No hardware has been tested, ordered, uploaded or published in this run.

The eval/runframe repositories explicitly disable lockfile creation in their canonical bunfig.toml. Their direct registry dependency versions are pinned to the installed verified versions; actual pin manifests are in evidence/R6. File/source-qualified dependencies retain their original supported paths. No non-existent tool lockfile is claimed. The board runtime uses its root frozen bun.lock and qualified built archives.
