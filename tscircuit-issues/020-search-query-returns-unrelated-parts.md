# Part search returns unrelated results for exact-looking MPN query

Status: **suspected**. Classification: **retrieval/service behavior; not a confirmed importer bug**.

## Affected package and revision

tscircuit CLI 0.1.2212 / JLC search service as observed on 2026-10-02. Board tscircuit 0.0.2702. A search-server commit was not available; no exact server version is invented. easyeda-converter 0.0.364 was investigated but is not established as the cause.

## Component and primary sources

Query U262-061N and USB4130; returned resistors and other non-USB parts

- [https://jlcsearch.tscircuit.com/](https://jlcsearch.tscircuit.com/)

## Minimal reproduction and required inputs

Run from the board root unless the first command changes directory. Inputs and regression source files are included in this editable package; the artifact list preserves original failures. `bun install --frozen-lockfile` is required in a package whose dependencies have been cleared. No publishing, ordering or account credentials are needed.

```sh
bunx tsci search --jlcpcb --json U262-061N
bunx tsci search --jlcpcb --json USB4130
```

For fixed reports, current regression is the post-fix MRE. To reproduce pre-fix behavior, use a disposable local checkout at the base commit, copy the identified regression tests and input fixtures, and apply the retained exact lock/dependency integration. Before logs below document the actually observed failure; do not assume an unperformed fresh upstream test passed.

## Expected behavior

Search relevance should not encourage selecting unrelated parts; component qualification must use exact identity.

## Actual behavior

U262-061N result includes MMA02040C3001FB300 and a DPDT switch; USB4130 similarly returned unrelated products.

## Logs, geometry and visual evidence

- [xkb-exact-search.json](evidence/020-search-query-returns-unrelated-parts/xkb-exact-search.json) (unaltered copy of `evidence/R3/xkb-exact-search.json`)
- [usb4130-search.json](evidence/020-search-query-returns-unrelated-parts/usb4130-search.json) (unaltered copy of `evidence/R3/usb4130-search.json`)

Visual regressions remain alongside their source tests under `tooling/easyeda-converter/tests`; report-linked logs identify the actual runs. No missing screenshot is claimed inspected. R3 annotated metrology drawing is inspected separately from physical hardware.

## Root cause: facts and hypotheses

Confirmed response content. Hypothesis: fuzzy search token ranking. No documented exact-match guarantee established, so not labelled a confirmed tscircuit bug.

## Impact

Search result is not evidence of MPN match or eligible replacement.

## Fix, changed files and verification

Do not accept returned parts without exact C-number/MPN verification. Public response inputs preserved; no library geometry workaround.

No component geometry or package source changed for this finding.

Exact local patches: [package patch](../tooling/patches/easyeda-converter.patch). Source fixture paths above and the package lock are required; patches alone do not include untracked tests. No generated component/Circuit JSON edit is a fix. Hardware verification remains pending.
