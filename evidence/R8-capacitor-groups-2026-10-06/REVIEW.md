# R8 0.3.11 — capacitor groups in the schematic

The latest official browser analyzer found three real schematic grouping
issues on unchanged 0.3.10: C5/C10 on Radio and C3/C11/C13 and C4/C12 on
Protection. The pinned CLI passed that older layout. The CDN analyzer changed
from SHA256 62428d06ace175a8474161908505eb4e1a1e8ece649c93a3d423a643bcc242bc
to 598a25590702cbce18554dcd23a7516411975d8e2e0de9c0e3a0918574fd2729.
The dated earlier zero-issue analysis remains preserved; before-ui retains
the actual new three-issue dialog, screenshots, issue SVGs and module.

Native source now places C10 beside C5, moves C3 closer to C11/C13, and moves
C4 closer to C12. The schematic body gaps are 0.9, below the analyzer's
recommended maximum of 1. Capacitor values, pins, rails, physical placements,
copper and PCB manufacturing rules are unchanged. No generated JSON or
imported component was manually patched. All 1,451 physical/electrical
elements match the previous qualified revision exactly; the source
fingerprint changes with the authored schematic. See pcb-preservation.json.

Current Circuit JSON SHA256: 7a4c1f7c658e30988676f8ed3d7f9346cf04856a6079d1ae7395ac6fcb9c38bf.
Actual native browser Run Style Analysis: zero issues across all sheets.
Pinned CLI schematic-placement checks on source and JSON: exit 0.
Actual final browser analyzer SHA256: 598a25590702cbce18554dcd23a7516411975d8e2e0de9c0e3a0918574fd2729.
Screenshots, dialog, official module and TLS-enabled HTTP 200 response are
retained under final-ui. No mocked or filtered analysis was used.

All 25 release pipeline commands pass on current source: five unrouted
placement/netlist/pin/source/style gates, native build, zero DRC/shorts/dangling,
29/29 physical nets, 174 measured track widths, seven power/current paths,
independent manufacturing, assembly, mask/paste/silk and exported-CAM readback.
All 44 fitted poses and 159 pin/value contracts are unchanged. All 91 vias
remain 0.30mm hole/0.45mm pad and through top/bottom; power remains on those
two outer layers. Six native A4 pages retain all 44 component explanations.
The reviewed snapshots, source formatting/types, lightweight smoke (38 Python
and 2 Bun tests/13 assertions), via/USB regressions (2 Bun/1947 assertions),
and component-guide coverage (2 Bun/188 assertions) pass. Baseline hashes
remain 129/129. Actual commands/output are retained in checks and
REPRODUCE-COMMANDS.json; visual review is recorded separately.

The BOM and supplier geometry are unchanged. The dated exact 25 JLCPCB
MPN/SMT listing observations from 0.3.10 are bound to this unchanged BOM;
no new stock observation, allocation or reservation is claimed. Radio raw
3-direct/66-overseas fields need allocation confirmation (096). Supplier
processed-preview/stackup/assembly approval and physical power/programming/
BLE/RF/thermal/runtime/full MagSafe grip/phone/case qualification remain open.
This remains an untested engineering prototype, not an approved fabrication
order. Native 004/084 warnings and original 075/076 investigations remain
explicit. Missing 3V3 metadata remains a separate importer issue.

Direct JST programmer compatibility is unchanged: J3 RX/GND/TX, 3.3V logic,
no VCC pin, switched battery power with USB-C unplugged and manual BOOT/RESET.
Programmer UF2 and ESP32 BLE firmware remain unchanged; no SDK/3D builds.
Frozen main, baselines, imports, prior evidence/fabrication, firmware, locks,
toolchain and cloud setup/start/memory guards stay unchanged. Heavy checks
run serially through python3 cloud/run-heavy.py. Observed 32GiB is not a plan
guarantee. Browser NSS database access is turn-scoped; managed CA/proxy/TLS
verification stay in use. No proxy bypass, policy expansion, ordering,
payment, supplier contact, assembler upload, environment Publish/share,
public issue, PR or merge. Publication is recorded after actual remote checks.
