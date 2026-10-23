# USB4215 explicit paste disappears during EasyEDA conversion

Confirmed minimal reproduction for **GCT USB4215-03-A / C37616412**.
Affected published importer: **easyeda0.0.381**. Tested with **Bun1.3.9**.
The full board, core/CLI, local patches, 3D assets and a live supplier query are
not needed. Installation needs access to the public npm registry; reproduction
uses only the frozen source file and synchronous public converter API.

## Run

Extract the ZIP, open its usb4215-paste-loss directory, then:

```sh
bun install --frozen-lockfile
bun run repro
```

The command is expected to exit **1** with an assertion failure:

```text
supplierPasteRegions: 16
importedPasteRegions: 0
copperPads: 12
platedSlots: 4
AssertionError: BUG: exact supplier paste regions were dropped during conversion
0 !== 16
```

A correct importer must preserve16explicit paste features. The source contains
12contact and4shell paste regions: filled `SOLIDREGION` records on EasyEDA layer5.
The same conversion retains12SMT copper pads and4plated shell slots. This isolates
a paste-layer conversion omission, not a copper-pad/slot loss or a proven defective
connector. A renderer might synthesize default contact paste later; that does not
prove preservation of the supplier's exact16-aperture stencil.

`repro.mjs` validates the exact C-number/package UUID/source count, calls the
supported `EasyEdaJsonSchema.parse` and `convertEasyEdaJsonToCircuitJson` APIs,
then asserts that explicit paste count is preserved. No generated footprint or
CircuitJSON is manually authored or patched. No board rendering/routing/CAM occurs.
The three dependency versions are pinned and bun.lock is included.

## Frozen input and evidence

- Input: C37616412.raweasy.json, public supplier data captured2026-10-23.
- Supplier package UUID:3104977db58742e399663286e4a66eac.
- Input SHA256: `e9542b03e760cfbf3bf74d1ce814ee83b3314d71111d1b1e0674103cdad2cdae`.
- Exact observed error/stdout: observed-output.txt.
- Machine-readable result: verification.json. Reproduced failure is not a fixed test.
- Integrity of supplied files: SHA256SUMS.
- [Official connector](https://gct.co/connector/usb4215).
- [Published importer](https://www.npmjs.com/package/easyeda/v/0.0.381).
- [Broader project report](https://github.com/AnasSarkiz/magnetic-shutter-remote/blob/822477e0a8ed9a39dc57927bbb374afc11b5c4ac/tscircuit-issues/105-current-releases-lack-qualified-r8-capabilities.md).

The supported native CLI independently reproduces this on tscircuit0.0.3008 /
CLI0.1.2402 using `tsci import --jlcpcb --use-exact-footprint --download C37616412`.
The standalone repro intentionally isolates paste loss; connector classification,
mask controls and mating-direction metadata have separate recorded findings.
No upstream issue, supplier outreach, PCB change or board release is performed here.
