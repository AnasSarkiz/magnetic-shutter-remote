# R8 issue resolution and package refresh —2026-10-06

Hardware remains **0.3.5**, native route23,44×56×1mm; public package revision
**0.3.6-prototype** carries current audit/programmer evidence. Starting HEAD
`a87ed50b86905bc087808e83b39f7a59990d71ae`, active branch
`board/r8-doit-c3-prototype-20261005`. PCB/source/import/BOM/CPL/fabrication and
ESP32 application/image are unchanged. Circuit JSON SHA256:
`e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`.

## Resolved in software and review

- Built the exact published standard-jst-programmer0.8.0 firmware with pinned
  debugprobe/pico-sdk/submodules and verified signed Debian Arm GNU toolchain
  packages. All15 original source/license files match its published GitHub
  revision. The first build failed on missing Arm C++ headers; installing
  matching headers/libraries resolved it without firmware/source/checker edits.
- Official actual ELF USB check passes: six interfaces, UART CDC0 and telemetry
  CDC1 independent, no endpoint collisions. Actual disassembly confirms GPIO8/9
  UART function and UART1 at115200. The125440-byte RP2040 UF2 has245 valid
  blocks and exactly reproduces the62472-byte binary. Wrong family/address,
  corrupt payload and bad trailer are rejected by the retained verifier.
- Verified UF2/ELF/BIN, original source, licenses, exact dependency/package
  hashes and usage procedure are retained under `firmware/programmers/` and
  `firmware/artifacts/standard-jst-programmer-0.8.0-2026-10-06/`.
- Anonymous0.3.5 registry readback reproduced its older±20%/minimum1.2µH
  power checker. The corrected exact-MPN±30%/minimum1.05µH checker and current
  reports are included in this package refresh (project publication097).
  Staging now accepts explicit current supplemental files and rejects stale
  Circuit JSON reports or cache/outside-repository inputs; regressions pass.
- Official Apple **R31,2026-09-21** guidance is now accessible through the normal
  proxy. Retained exact source hash/text/drawing evidence resolves the former
  official-guidance network blocker. Accessory construction is **N48H**,1.10mm
  magnets with specified DC shield; the prior simplified0.55mm reference does
  not qualify an accessory magnet assembly. See the primary interface review.

## Fresh PCB and tool checks

Canonical lightweight smoke passes **38 Python tests**, **2 Bun tests/13
assertions**, formatting/types and129 frozen baseline hashes. **29 CAM
regressions** pass. All checks in `check-results.json` exit0. Native/current
contracts, physical copper continuity, widths and corrected power were rerun:

| Check | Actual result |
|---|---|
| Required physical terminal nets |29/29 connected |
| Native DRC/generated/hole-trace/dangling/short errors |0 |
| Actual routed track widths |164 pass, minimum0.15mm |
| Switching/current budgets |pass with exact1.05µH minimum and TI20% saturation margin |
| RF exclusion / U2-U3 thermal ground |no copper intrusion; continuous EP ground |
| C3 application image |read-only validation passes; no serial port opened |

Unchanged placement and12-file original fabrication readback remain linked to
identical source/copper; their fresh six-point review is retained. No gratuitous
reroute/root board/3D rebuild occurred. Setup/start and the serial memory guard
are unchanged. Observed32GiB and4 CPU equivalents are measurements, not a plan
allocation; recorded guarded runs show no OOM events.

An initial attempt put lightweight smoke inside the heavy wrapper; its guard
regression correctly refused a nested Node heap override. The canonical direct
`bash cloud/smoke.sh` passes. Original failure logs remain retained; no memory
checks or tests were weakened.

## Findings that are not demonstrated PCB blockers

Original075 concerns the abandoned WROOM footprint; fitted DOIT C3 has exact
qualified22-pin lands and supported BLE firmware. It remains the cheapest
checked module compatible with the pinned BLE toolchain; the cheaper C2 actual
build lacks BLE support and is not silently substituted.

Fresh C19949072 inventory raw fields remain `canPresaleNumber=3` and
`overseasStockCount=66`. The earlier "direct" label is not corroborated by the
client semantics. This does not prove a five-board stock shortage or an
unavailable/electrically defective part. All25 fitted exact parts are listed
for SMT assembly. Allocation, attrition and approved BOM/CPL mapping still need
procurement/supplier-processed review; no stock is reserved. Supporting client
host **assets.jlcpcb.com** still returns proxy403. Only this exact host was
added to the saved restricted draft, preserving existing destinations/auth.
Saving did not apply or publish it. Review/Save/Publish through environment
settings is the supported next step, followed by retrying the same request.

Known004/084 native warnings remain explicit with their prior dispositions.
**Missing `3V3` metadata remains a separate importer issue.** Original076 and
its original failing inputs are retained, not falsely closed by replacing U1.

## Remaining external/physical gates

The cloud has no attached programmer or board. Install the verified UF2 on an
actual RP2040 programmer, then use J5→J3 straight SH UART with R8 battery ON,
R8 USB-C unplugged, programmer power/SWD disconnected, manual BOOT/RESET and
CDC0 DTR. Actual USB enumeration, C3 flash/readback/boot and BLE/iPhone Camera,
power/load/charge/thermal/runtime tests are **NOT RUN**.

The official MagSafe interface is established; exact magnet assembly selection,
complete grip/dock/PCB/battery transforms, camera/case/metal/RF clearance and
physical retention across claimed iPhones remain **unqualified**. The44×56 PCB
corner radius35.609mm exceeds a30mm magnetic attach-surface radius, so do not
place this rectangle directly in that contact plane. The detachable PCB and
phone-facing magnet array are separate interfaces; full enclosure must satisfy
Apple page284, including6mm clearance beyond the30mm keep-in boundary.
PCB electrical checks do not prove enclosure fit or MagSafe certification.

Supplier-processed fabrication/assembly preview, confirmed copper/stackup and
stock approval remain required before calling a prototype ready to order.
No supplier contact, assembler upload, reservation, payment, order, substitution
approval, main change, environment Publish or tooling-package publication.

Actual GitHub/native tscircuit publication/readback is recorded separately in
`PUBLICATION.md` after it executes; this review describes the checked contents.
