# R8 0.3.12 — remove the three bottom silkscreen labels

The user requested removing the three labels shown on the PCB bottom:
- R8 ESP32-C3 PROTOTYPE
- UART / 1:RX 2:GND 3:TX
- BATTERY POWER / MANUAL BOOT + RESET

They are informational artwork, not electrical features. Native source
src/functional-markings.tsx removes these three elements. The seven top-side
functional/polarity labels remain unchanged. The programming procedure remains
in firmware/programmers/standard-jst-programmer-0.8.0/R8-USAGE.md: direct JST
RX/GND/TX, fixed 3.3V logic and no VCC, switched battery power, USB-C unplugged,
manual BOOT/RESET. Removing artwork does not remove those operating requirements.
Prototype status remains explicit in package metadata and documentation.

Actual rebuilt Circuit JSON SHA256: cf61cad4bd9972f10607977ab42f06dfe02318f9a42d073d1febe6a3b890f331.
All 2,072 non-silkscreen/non-metadata elements are identical to 0.3.11,
including every schematic element and physical/electrical feature. Generated
top-label ID numbering changes, while text and geometry remain identical.
No Circuit JSON/import was manually edited. PCB routing/placement, all 44
fitted identities and 159 pin/value contracts are unchanged.

Fresh native checks pass 0 DRC errors/shorts/dangling and independent geometry
checks pass 0 manufacturing/process failures. All 29 required physical nets,
174 physical track widths and seven current/voltage paths pass. All 91 vias
remain 0.30mm holes/0.45mm pads through top/bottom. The schematic is unchanged;
fresh pinned CLI style analysis passes, while the previous actual browser
zero-issue result remains applicable. No new browser analysis is claimed.
Current source formatting, TypeScript and lightweight smoke pass. Exact
commands and output are retained in checks and REPRODUCE-COMMANDS.json.

All 12 current Gerber/drill files independently parse and match source.
B_SilkScreen.gbr contains 0 objects. All other 11 manufacturing files match
the preceding release except exactly listed generator timestamps. BOM/CPL
are byte-identical. All exported files remain unmodified. Fresh process
checks retain the stencil/mask/silkscreen gates; actual views and native
snapshot validation are recorded separately after inspection.

The unchanged BOM retains the preceding fresh official 25-part stock review,
whose exact dates/raw HTML/client source are now retained here. 25/25 exact
MPNs are buyable and SMT-listed; 24/25 available-order quantities cover the
documented five-board batch. Radio C19949072 has headline In Stock 66 but
Available Order Qty 3; quantities above 3 switch to pre-order. Allocation and
lead time remain unconfirmed (096). assets.jlcpcb.com returned HTTP 200 for
that preceding official-client read; no policy expansion or proxy bypass.
STOCK.md and sourcing-official preserve the exact observation and semantics.

Supplier processed Gerber/BOM/CPL preview, stackup/assembly approval and USB-C
shell-anchor soldering coverage remain pending. Physical power/charging,
direct JST programming, BLE shutter/iPhone, RF/thermal/runtime and complete
MagSafe enclosure/phone/case fit are untested. Native 004/084 warnings and
original 075/076 records remain explicit. Missing 3V3 metadata remains a
separate importer issue. This remains an untested engineering prototype.

Frozen main/baselines/imports/prior evidence/fabrication/firmware/locks/toolchain
and cloud setup/start/guards are unchanged. Heavy jobs run serially through
python3 cloud/run-heavy.py; observed 32GiB is not a guaranteed allocation.
No SDK/3D build, order/payment/supplier contact/assembler upload, environment
sharing/Publish, PR or merge. Public publication is recorded separately only
after actual native upload and anonymous readback.

The empty bottom layer exposed project reporting issue098: Shapely returned
NaN for a nonexistent mask gap. Original report is retained in
before-empty-silk-process.json; strict JSON rejected it. The generic checker
now emits null for empty geometry and rejects all non-finite JSON. Thresholds
for nonempty silk are unchanged. All30 CAM regressions pass, including an
actual retained empty-native-Gerber case and existing supplier-circle/legend
failures. Current regenerated process report is strict JSON with0 failures.
Both PCB faces were inspected; all six new A4 SVGs are byte-identical to the
preceding reviewed pages. Native snapshot results are recorded separately.

Reviewed native snapshot update and snapshot check both pass. All four final
format/type/snapshot commands pass. Frozen baseline hashes remain129/129;
all recorded heavy runs have zero OOM counter increments.
