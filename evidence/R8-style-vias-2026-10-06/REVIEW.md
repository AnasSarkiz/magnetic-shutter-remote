# R8 0.3.10 — USB-C schematic style and outer-layer through vias

The user requested the native standard USB-C symbol, real UI and CLI
schematic Style Analysis, exact JLCPCB availability, no blind/buried vias,
0.30mm holes/0.45mm via pads, and power copper on top/bottom only.
This is an untested 44×56×1mm, two-layer engineering prototype. All44 exact
fitted parts,159 pin-net/value contracts and component poses remain unchanged.
The right-edge side-actuated TS24CA shutter and direct3-pin JST SH programming
connection remain qualified at the design level.

Current generated Circuit JSON SHA256: `eb69ddb005aea75aefe12e98c1e4f9f97bee3134a76d356261bf571662143f5b`.
Native current-source build, shorts, hole/trace and dangling checks pass0
errors. Independent exported-geometry manufacturing, all29 physical terminal
nets, RF/shutter exclusions, solid thermal returns, all174 physical track
widths and seven power/current paths pass. There are 175 trace records
and 91 actual vias; every via has0.30mm hole/0.45mm pad and spans both
top/bottom. Every physical trace uses top or bottom. No inner copper,
blind/buried vias or hidden multilayer power route exists. Gerber/drill
readback,12 native fabrication files,159 paste apertures, exact USB/shutter/JST
supplier terminal registration and full mask/paste/stencil/silkscreen checks
pass. No generated JSON or fabrication output was hand-patched.

The standard `usb_c` prop is passed to the existing supported JLCPCB USB4215
import; its16 physical contacts and qualified source contracts are preserved.
Native symbol widths and short local GND/VBAT labels resolve actual style
issues. The pinned CLI and the browser use different analyzer versions:
previous0.3.9 CLI reported0 while the actual browser found4 issues. Real
right-click Run Style Analysis now reports0 on this exact routed JSON.
The browser retains actual screenshots/dialog and official CDN analyzer bytes
and SHA; no mocked, filtered or substituted analyzer output. Six native A4
circuit/component-guide pages, both PCB layers, both Gerber copper layers
and critical detailed regions are visually inspected and hashed separately.

All25 exact JLCPCB MPN/C-number public listings were checked on2026-10-06,
including SMT eligibility. Original observation times/HTML/raw inventory are
retained. The BOM is byte-identical; sourcing-check.json binds those dated
observations to this circuit without inventing a fresh stock observation.
Radio C19949072 direct3/overseas66 fields do not prove a batch shortage or
guarantee allocation; procurement096 remains an allocation question.
Original jlcsearch.tscircuit.com HTTP403 and one official BQ25185 HTTP429 are
retained; official canonical exact-part listings succeeded, with a successful
single-part429 retry. No proxy bypass, access expansion or supplier contact.
The official JLCPCB capability page supports a via pad0.15mm larger than its
hole (preferred), giving the requested0.075mm annulus. Existing independent
0.05mm via-annulus and0.20mm drill-to-SMT rules remain unchanged.

Smaller vias required new source-led off-pad transitions and local routing
adjustments. Actual failed builds remain retained. Native error-free candidates
11,14 and17 failed the stricter independent drill checks and were never
published. Same-net SMT drill clearance is still required; a matching net is
not a filled/capped via-in-pad qualification. Issue081 retains the upstream
routing/integration failure classification. Final source fixes clear the
current board; they do not claim an upstream router fix. Trace/clearance/drill
rules and audit assertions were not reduced; only requested via pad size was
changed from0.60 to0.45mm after official capability review.
The optional saved-autorouting-path serializer still reports non-port-anchored
junctions. This does not invalidate the completed route: actual Circuit JSON,
native DRC, independent physical geometry and export checks are retained.

All five unrouted native source/pin/netlist/schematic/PCB placement gates
pass on the current source before release, with44 identical routed/unrouted/
previous component poses. New via/layer/USB tests and existing44-component
annotation/render coverage pass; lightweight smoke38 Python+2 Bun/13 assertions
passes, with129 frozen baseline hashes, format and TypeScript checks. All25
release pipeline commands pass; actual outputs and reproduction commands
are retained. Reviewed native root snapshots pass separately.

Warnings004 (imported connector orientation inference) and084 (imported
MOSFET represented as chip/power classification) remain explicit, with exact
supplier geometry/terminal registration unchanged. Abandoned WROOM issue075
is not a defect of the fitted DOIT C3. Original075/076 investigations stay open
and frozen. **Missing `3V3` metadata remains a separate importer issue.**

Standard JST programmer0.8.0 UART remains J3 pin1 RX(GPIO20),2 GND,3 TX(GPIO21),
3.3V logic with no VCC pin; power R8 from its switched battery, disconnect its
USB-C, and use manual BOOT/RESET. Existing verified programmer UF2/ESP32 BLE
artifacts are unchanged. Physical flashing and operation remain unrun.

Requirements/schematic/BOM/unrouted placement/routing/local automated+visual
checks are passed. Prototype order approval stays pending supplier-processed
Gerber/drill/BOM/CPL preview, stackup, allocation/substitution and assembly
review. Physical power/programming/BLE/RF/thermal/runtime and complete MagSafe
magnet/grip/phone/case fit remain POST-PROTOTYPE PHYSICAL VALIDATION. No order,
payment, assembler upload, supplier contact or physical hardware guarantee.

Frozen main/baselines/imports/prior evidence/fabrication/firmware/lock/toolchain
and setup/start/memory guards are unchanged. Heavy commands run serially using
`python3 cloud/run-heavy.py --`. The actual32GiB cgroup limit/four CPU equivalents
and14GiB Node heap cap are observations, not guaranteed plan allocations;
recorded routing runs show no OOM. No SDK/3D build, environment Publish/share,
network-policy expansion, PR or automatic merge occurred. The current
engineering branch is preserved. Public0.3.10-prototype matching-source
publication is recorded separately after actual remote readback.
