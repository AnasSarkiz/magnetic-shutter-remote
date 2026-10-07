# 103 — Bounded native product text uploads return HTTP 413

Status: open; blocks complete native product publication, not local fitted CAD
or PCB validation. Classification: observed registry request-size rejection;
exact enforced threshold and server root cause unconfirmed. No public issue.

The normal pinned CLI individual-file publisher for0.3.19-prototype returns
`FAIL [413]: POST /package_files/create` on registry-api.tscircuit.com for:

| Path | Raw file bytes |
| --- | ---: |
| dist/product.assembly/circuit.json | 4,870,478 |
| dist/product.exploded/circuit.json | 4,870,475 |
| product/print-plans.json | 4,667,954 |

All are below the local staging cap5,000,000bytes. This cap does not establish
the server limit, and encoded JSON requests are larger than the source files.
No threshold relaxation, dependency patch, output mutation or proxy bypass.
Actual anonymous readback confirms all three absent. Native draft remains
unready/pending; do not substitute screenshots for its missing editable CAD.

The source, verified eight print meshes, closed/exploded native builds and
actual CAD renders are public in GitHub107aba5. All112 changed GitHub files
match exact bytes. Registry296/302stored files also match; its other missing
files/HTTP502/timeouts are issue099. This is distinct from importer3V3metadata.

A supported transport/packaging solution must preserve the complete actual
source/build/mesh identity and then pass full inventory/byte readback. Current
CLI has no existing-release resume flag; blind repeating creates new drafts.
[Actual log and receipt](../evidence/R8-sculpted19-2026-10-07/PUBLICATION.md).
