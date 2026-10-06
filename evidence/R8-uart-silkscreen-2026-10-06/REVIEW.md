# R8 0.3.7 — remove UART voltage wording

User requested removal of the voltage wording from PCB silkscreen. The source
legend changes from `UART 3V3 / 1:RX 2:GND 3:TX` to
`UART / 1:RX 2:GND 3:TX`; pin-identification information is preserved. The
interface still uses the correct 3.3 V logic levels and the same direct
three-pin JST, with no added power pin. No confirmed UART defect was found.

Native current-source build passes with PCB/SVG/A4 exports. Circuit JSON
SHA256: `8be85af4b798a3b3d5973784e23afb54c721f1377e06ee1d7aad77ca7c2fb6fd`. Compared with commit
`62ce3a9b304e68141f8d0154354459ba367e38e6`, precisely one silkscreen-text
element and the expected source metadata hash change; all other circuit
elements match exactly. Component identities, 44 poses, 159 terminal
contracts, traces, vias, copper planes, nets and widths remain unchanged.

Fresh checks pass: 0 native DRC errors, 0 generated errors, 0 shorts, 0
dangling traces, 0 hole/trace violations; 29/29 physical nets connected;
164 trace widths and the corrected ±30% inductor/current budgets pass;
independent manufacturing, native twelve-file CAM readback, full-silk,
mask/paste/stencil and supplier-terminal registration pass. Light smoke
passes 38 Python tests and 2 Bun tests/13 assertions, formatting/types
and 129 frozen baseline hashes. The reviewed bottom-layer native snapshot
is checked separately. See check-results.json and reproduction commands.

Fresh fabrication exports are in
`fabrication/R8-uart-silkscreen-2026-10-06/`. Only B_SilkScreen artwork
changes; all other eleven native files match prior content except their
generated creation-date header lines. BOM/CPL match exact prior bytes.
No export is edited to make this comparison or its checks pass. Updated
bottom PCB view inspected; all nine other previously inspected PNG views
match exact bytes. Prior evidence and fabrication archives stay immutable.

Warnings004 (connector inference) and084 (Q1/Q2 classification) remain
explicit, with their prior dispositions. Abandoned WROOM075 is not a fitted
DOIT defect. Missing `3V3` metadata remains a separate importer issue.
Existing procurement096, hosted worker preview, supplier processed-preview/
stock/stackup/assembly approval, physical programming/BLE/power/thermal/runtime
and complete MagSafe grip/phone/case qualification remain unverified or
pending as documented in the prior resolution review. This silk edit does
not close those gates or imply that hardware has been tested.

The compiled ESP32 application and standard JST programmer0.8.0 UF2/BIN/ELF
are unchanged. No SDK, firmware or 3D build was needed. Every heavy command
uses the unchanged serial `python3 cloud/run-heavy.py --` guard. Observed
32 GiB cgroup and four CPU-equivalent quota are measurements, not guaranteed
plan allocations; retained logs include OOM observations. Saved setup/start
remain lightweight and preserve the active engineering branch. No frozen
baseline/default main change, supplier contact, assembler upload, order,
payment, environment Publish, repository-access or network-policy change.

Public board push/publication follows applicable gates under the standing
workspace authorization; the actual publication receipt is recorded separately.
