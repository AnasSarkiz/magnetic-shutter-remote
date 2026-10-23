# Update retains a modelprinter peer missing the current core's named export

Status: **fixed locally**. Classification: project dependency-resolution/integration
failure; not established as a newly introduced tscircuit source bug.

## Affected packages

Bun1.3.9, core0.0.2199, tscircuit0.0.3008, CLI0.1.2402,
modelprinter0.0.2. The compatible published modelprinter0.0.18 resolves startup.
Exact releases, integrity and before/after locks are in the
[update evidence](../evidence/R8-toolchain-refresh-2026-10-23/REVIEW.md).
No component manufacturer/C-number applies: the CLI failed before part loading.

## Minimal reproduction and inputs

From the board root with Bun1.3.9:

```sh
bun install --cwd evidence/R8-toolchain-refresh-2026-10-23/modelprinter-control
bun evidence/R8-toolchain-refresh-2026-10-23/modelprinter-control/probe.ts
bun test tests/r8-modelprinter-startup.test.ts
./node_modules/.bin/tsci --version
```

The control package pins0.0.2; its package, lock and probe are retained. It is
deliberately isolated from the working root. The original board lock also records
the previously hoisted0.0.2. No generated source or installed dependency is patched.

## Expected and actual behavior

Current [core](https://github.com/tscircuit/core) imports
`getJstMotorConnector` from modelprinter. Its published bundle must resolve that
export before a CLI command can load. After the first upgrade install, the root
retained0.0.2 and `tsci --version`/`import --help` failed with:

```text
SyntaxError: Export named 'getJstMotorConnector' not found in module '.../@tscircuit/modelprinter/dist/index.js'.
```

The isolated control reproduces the same exact error. This is not evidence of a
bad electronic footprint or bad JST part. No PCB rendering could start then.

## Evidence and root cause

- [Control failure](../evidence/R8-toolchain-refresh-2026-10-23/modelprinter-control.log).
- [Control inputs](../evidence/R8-toolchain-refresh-2026-10-23/modelprinter-control/package.json).
- [Compatible-export result](../evidence/R8-toolchain-refresh-2026-10-23/modelprinter-fixed.log).
- [CLI help after fix](../evidence/R8-toolchain-refresh-2026-10-23/import-help.txt).
- [Installation log](../evidence/R8-toolchain-refresh-2026-10-23/modelprinter-install.log).

Confirmed: the old root resolved0.0.2, while a nested tscircuit dependency
requested0.0.18; core's peer constraint permits `*`. The old export is absent and
0.0.18 provides it. The generic reason Bun retained/hoisted that version has not
been independently reproduced across package managers, so no Bun defect is claimed.
This failure has textual API evidence; no visual geometry screenshot applies.

## Fix and verification

Added exact direct devDependency `@tscircuit/modelprinter:0.0.18` and regenerated
`bun.lock` through Bun. Added
[startup regression](../tests/r8-modelprinter-startup.test.ts).
Compatible-export probe, CLI startup/help and all25supported import commands pass.
No full-board validation follows from that result. Remaining update blockers are
recorded in [105](105-current-releases-lack-qualified-r8-capabilities.md).
