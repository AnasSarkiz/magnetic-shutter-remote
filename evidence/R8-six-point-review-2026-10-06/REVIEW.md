# R8 six-point board review — 2026-10-06

Reviewed hardware/package **0.3.5**, native compact route23, **44×56×1mm**,
two-layer PCB,44 TOP placements/25 exact JLCPCB identities. Starting HEAD
`621291c066b68187ee96ac0ee13bd51dcab884d1`; active branch
`board/r8-doit-c3-prototype-20261005`. Current Circuit JSON SHA256
`e750ee12dd488465e17805e454f4176144a3afb322ebe66c77003d254dd82b3c`.

**PCB design/connection/fabrication checks pass. Stock for a five-board batch
and physical operation are not fully confirmed; no issue-free or production
approval is claimed.** No PCB/source/import/BOM/CPL/firmware/fabrication file,
frozen baseline or runtime/memory guard changed. No root rebuild, routing,
SDK/3D build, order, supplier contact or assembler upload was performed.

| Requested review | Actual finding |
|---|---|
|1. Placement |All five fresh native unrouted gates pass: netlist, pin specification, source, schematic placement, PCB placement. All44 current poses exactly match the qualified unrouted fixture. Both PCB layers and all three schematic detail views visually rechecked. Geometric PCB placement passes; housing/cable/MagSafe fit remains physical/mechanical qualification. |
|2. Components |All44 manufacturer identities, C-numbers, quantities and159 terminal contracts match the qualified circuit. Radio/firmware, fixed3.3V buck-boost/inductor, charger/current/voltage, protected battery polarity, supervisor, temperature gate, side shutter and UART reviewed against retained manufacturer evidence. Component selection passes for an engineering prototype; actual transient/thermal/RF behavior remains untested. |
|3. JLCPCB availability |All25 exact public listings loaded and matched fitted MPNs; all advertise SMT assembly, with no manufacturer blacklist.24 direct inventory fields cover five finished boards before attrition. **U1 C19949072 reports3 direct and66 overseas**, against5 modules for five boards; allocation needs confirmation. No substitute was silently fitted. |
|4. Nets and operation |Fresh29/29 physical terminal nets connected;0 native errors/shorts/dangling traces,0 independent manufacturing failures.164 actual track widths and corrected switching-current budgets pass. Power/charge/boot/reset/GPIO/UART logic reviewed; compiled C3 image validates. This predicts prototype behavior; it does not prove assembled-board operation. |
|5. Standard JST programmer |Latest public package remains0.8.0. Its J5 host UART1TX/2GND/3RX matches R8J3 target1RX/2GND/3TX using straight-through SH1mm. Fixed3.3V logic, manual BOOT/RESET, battery ON/R8USB unplugged, programmer target-power/SWD unplugged, CDC0/DTR true. UART-enabled programmer UF2 build/install and physical flash/readback remain pending. |
|6. Remaining issues |No new demonstrated R8 wiring/clearance failure. Direct ESP32 stock is a procurement constraint, not an electrical fault. Supplier-processed Gerber/BOM/CPL/stackup/assembly preview, hardware tests and complete MagSafe/enclosure/phone/RF qualification remain pending. Known metadata warnings remain explicit. |

## Placement and parts

- J1 USB4215-03-A remains180° with mouth toward+Y and all four plated USB slots.
- J2 battery SH remains270°,1GND/2positive; physical harness polarity must be metered.
- J3 C160389 remains0°,top entry+Z,1RX/2GND/3TX; supports4/5 tied to GND.
- SW2 TS24CA is at(20,−8.5)mm/270°,right-edge inward horizontal press; its
  nominal contact copper has0.400041mm board-edge clearance. Assembly/mechanical
  press travel still needs inspection in the actual housing.
- U1 remains180°,antenna toward−Y. The all-layer exclusion Y[−28,−19.3] contains
  no copper intrusion. The protected pack's planned below-PCB envelope avoids
  this band; actual harness, magnets, phone metal and fasteners require3D/physical
  clearance and RF verification. Old Nordic enclosure evidence is not reused.
- U3 has nearby L1/input/output/VINA bypass parts and continuous grounded EP;
  U2 has continuous EP ground and measured charge paths. TI decoupling and
  transient recommendations remain subject to actual loaded testing, including
  capacitor DC-bias effects and charge heating. Placement clearance alone does
  not certify transient response or cell temperature sensing.
- TPS63031/1.5µH±30% inductor retain500mA design supply budget. Corrected minimum
  inductance1.05µH/2.2MHz gives0.744994A RMS,0.844627A peak,1.013552A required
  saturation with TI20% headroom, below fitted1.7A RMS/2.3A saturation.
- BQ25185 remains300mA nominal (267.3–333.3mA tolerance),4.1V setpoint/4.1205V
  upper,6h timer. USB disables the radio regulator. TMP390 guard is nominal5°C
  cold/36°C hot with5°C hysteresis; safe cell temperature requires actual thermal
  coupling. Protected ASR00012 battery is an externally sourced pack, not one of
  the25 SMT JLCPCB identities; no battery purchase/stock guarantee is claimed.

Full44-pose/visual file hashes: [placement review](placement-visual-review.json).
All44 identities and159 pin memberships: [electrical contract](electrical-contract.json).
Detailed manufacturer/functional states and physical test criteria remain in
[functional review](../R8-functional-review-2026-10-06/REVIEW.md).

## Fresh exact public JLCPCB observations

These are official listing field observations, not a stock reservation,
quote or confirmed assembler allocation. Quantities below are the returned
`canPresaleNumber` and `overseasStockCount` fields; the supporting client UI
asset at **assets.jlcpcb.com** was blocked by the session proxy403, so final UI/
PCBA allocation was not corroborated. All25 HTML listing pages on jlcpcb.com
were accessible. Network policy unchanged; no proxy bypass.
Raw pages, timestamps, response URLs, exact identities, assembly flags and SHA256
are retained under `sourcing/` and [sourcing report](sourcing-review.json).

| C-number | Exact MPN | Fitted references | Direct field | Overseas field | Library | Review |
|---|---|---|---:|---:|---|---|
|C14663|CC0603KRX7R9BB104|C5,C13,C6,C7|42915866|57220244|base|PASS_PUBLIC_LISTING|
|C15516|TPS63031DSKR|U3|13099|13230|expand|PASS_PUBLIC_LISTING|
|C15850|CL21A106KAYNNNE|C8,C10,C11,C12,C3,C4|3454309|4831018|base|PASS_PUBLIC_LISTING|
|C160389|BM03B-SRSS-TB(LF)(SN)|J3|31699|32152|expand|PASS_PUBLIC_LISTING|
|C160402|SM02B-SRSS-TB(LF)(SN)|J2|32131|33629|expand|PASS_PUBLIC_LISTING|
|C19666|CL10A475KO8NNNC|C2,C1|1850931|2461457|base|PASS_PUBLIC_LISTING|
|C19725033|BQ25185DLHR|U2|3533|3636|expand|PASS_PUBLIC_LISTING|
|C19949072|ESPC3-12-N4|U1|3|66|expand|NEEDS_SUPPLY_CONFIRMATION|
|C21190|0603WAF1001T5E|R3,R4,R7|15816547|21274410|base|PASS_PUBLIC_LISTING|
|C22795|0603WAF1303T5E|R8|534545|584557|expand|PASS_PUBLIC_LISTING|
|C22844|0603WAF1621T5E|R10|27589|27688|expand|PASS_PUBLIC_LISTING|
|C2286|KT-0603R|LED1,LED2|4180371|4732306|base|PASS_PUBLIC_LISTING|
|C22893|0603WAF1872T5E|R11|121574|127543|expand|PASS_PUBLIC_LISTING|
|C23186|0603WAF5101T5E|R2,R1|24108474|25186290|base|PASS_PUBLIC_LISTING|
|C25803|0603WAF1003T5E|R5,R6,R12,R13|20070593|22010609|base|PASS_PUBLIC_LISTING|
|C25804|0603WAF1002T5E|R9|21640825|29568930|base|PASS_PUBLIC_LISTING|
|C282505|TCC0603COG470J500CT|C9|7987|8003|expand|PASS_PUBLIC_LISTING|
|C37616412|USB4215-03-A|J1|22|114|expand|PASS_PUBLIC_LISTING|
|C393942|TS24CA|SW2|400566|406482|expand|PASS_PUBLIC_LISTING|
|C431540|MSK12C02|SW1|186001|192348|expand|PASS_PUBLIC_LISTING|
|C485802|TPS3839G33DBZR|U4|3355|3390|expand|PASS_PUBLIC_LISTING|
|C5219772|TMP390A2DRLR|U5|37523|37575|expand|PASS_PUBLIC_LISTING|
|C56594|SWPA3015S1R5NT|L1|4041|4197|expand|PASS_PUBLIC_LISTING|
|C720477|TS-1088-AR02016|SW3,SW4,SW5|716001|766539|base|PASS_PUBLIC_LISTING|
|C8545|2N7002|Q1,Q2|1452920|1593414|base|PASS_PUBLIC_LISTING|

The5-board threshold is the project's prototype planning quantity, not an
order instruction. It excludes feeder attrition and minimum assembly purchase
constraints. Raw minimum/loss/least-patch fields are retained for later assembler
review. The original sourcing report remains dated history; its cached module
stock and former switch quantity are not current availability evidence.
Local issue096 records the ESP32 supply constraint. Overseas66 is not silently
added to local3, and no unqualified radio substitution was made.

Reproduce this read-only stock snapshot using
`python3 evidence/R8-six-point-review-2026-10-06/recheck-public-listings.py` in a
new copy/evidence directory; do not overwrite this retained dated snapshot.

## Programmer compatibility

Anonymous fresh registry readback confirms latest/public0.8.0 release
`3d6952c4-e6ee-4711-a7c7-dded0cdef4eb`. README,build script and UART firmware
config bytes exactly match retained authoritative inputs. Fresh Circuit JSON
contains41 changed warning elements/IDs/order; all2610 non-warning source,
geometry and connectivity elements exactly match the retained circuit. These
upstream warnings are preserved in the full difference report; this is not a
claim that the programmer's own fabrication is warning-free. J5 UART contracts
and100Ω host-side series resistors remain unchanged.

| SH contact | Programmer J5 | R8 J3 |
|---|---|---|
|1|TX,3.3V|RX,GPIO20/module21|
|2|GND|GND|
|3|RX,3.3V|TX,GPIO21/module22|

Pin-preserving cable connects TX→RX at both ends. No power/EN/BOOT contacts on
this port: manual BOOT(SW4/GPIO9)+RESET(SW5/EN) are required. Keep BOOT held≥3ms
through reset release; module GPIO8 stays high via its reviewed internal pull-up.
The programmer's50mA target-power budget cannot power this500mA design supply.
Use R8 battery power, switch ON and unplug R8's charging USB-C; connect/disconnect
UART with the target powered. Meter the actual cable before connecting.

Public programmer inventory contains firmware build source, **no compiled UF2**.
Build/install its UART-enabled firmware as documented before using CDC0 UART
with DTR enabled. Fresh read-only R8 image helper checks411576-byte C3 simple-
boot binary hash/checksum/chipID5. No serial port was opened, no board flashed.
[Full existing programming procedure](../R8-standard-programmer-2026-10-05/PROGRAMMING.md)
and [fresh compatibility/readback](programmer/compatibility-review.json).

## Actual checks and outstanding gates

All12 fresh guarded commands pass; [commands](commands.json),[results](check-results.json)
and logs include the native five placement/netlist checks, electrical contract,
current native DRC, native shorts, physical connectivity, all164 trace widths,
corrected power paths and independent readback of all12 Gerber/Excellon files.
Independent geometry confirms0 failures,159 paste features,4 plated USB slots,
8NPTH and identical rounded outline/copper/mask/paste/drills. The prior local
stencil/mask/silk process review remains bound to the identical JSON/artwork;
its original reports are retained.

Fresh portable context verification passes129 frozen hashes/source archives;
actual observed cgroup limit remains34359738368B/32GiB,4 CPU equivalents,
serial guard14336MiB Node heap,no OOM events. Observed allocation is not a plan
allocation guarantee. Setup/start/memory controls are unchanged.

Remaining before prototype ordering: confirm fitted ESP32 inventory and exact
assembler stock/attrition, supplier-processed copper/mask/paste/USB slots and
BOM/CPL/stackup/assembly preview. No assembler upload/order/contact authorized.
Remaining after assembly: power/load-step/USB-charge/cutoff/temperature/thermal
measurements, actual standard-JST flash/readback, boot/BLE pairing/reconnect/
camera press-release on intended phones, RF with magnets/phone/battery, runtime
and complete housing/MagSafe fit. All physical tests are **NOT RUN**.

Native warnings004 (J3 top-entry inference) and084 (MOSFET IC classification)
remain explicit; their retained manufacturer/pin review dispositions apply.
Original075 concerns the abandoned WROOM candidate, not the fitted DOIT radio.
**Missing `3V3` metadata remains a separate importer issue.**
