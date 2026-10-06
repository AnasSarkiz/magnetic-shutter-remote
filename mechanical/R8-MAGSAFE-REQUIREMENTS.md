# R8 MagSafe grip and multi-model iPhone fit

Status: requirements recorded; mechanical implementation and compatibility
qualification pending. The user requires MagSafe attachment and support for
multiple iPhone models, rather than a mount tailored to one phone.

Broader public-source discovery has produced pinned nominal array and CAD
references. See [research and screening](R8-MAGSAFE-RESEARCH.md); these permit
design investigation while official access is pending, but do not complete
exact-part qualification or the iPhone/case compatibility matrix.

## Primary guidance verified —2026-10-06

Official Apple **R31,2026-09-21** now downloads through the inherited proxy.
Exact PDF is retained in `references/Apple-Accessory-Design-Guidelines-R31-2026-09-21.pdf`;
source hash, extracted chapter and inspected drawings are in
[evidence](../evidence/R8-issue-resolution-2026-10-06/magsafe/official-interface-review.json).
The previous official-guidance network blocker is resolved. Accessory magnets
are N48H/1.10mm with the specified DC shield; the earlier0.55mm third-party
model is not a qualified accessory construction. Ring ID46mm/OD54.1mm,
1.55mm self-alignment,650–1510gf pull force and the detailed page284 enclosure
geometry apply. Attach surface stays within30mm towards the phone top;
parts beyond the30mm keep-in require6mm clearance. A44×56 PCB has35.609mm
corner radius and belongs in the detachable remote with a qualified transform,
not directly in the magnetic contact plane. Exact magnet MPN, complete grip,
phone/case/camera/RF clearances and physical retention are still unqualified.
The blocked-access record below is retained earlier history.

## Product contract

- Follow the JJC MSG-P1 reference's magnetic camera-grip and detachable shutter
  arrangement. PCB dimensions are independent of the grip, case and MagSafe
  array; the user explicitly accepts a smaller PCB. The compact electrical
  target is 44 × 56 mm, retaining the qualified electronics and protected pack.
  This is not a claim that the PCB drops into a measured JJC enclosure.
- The phone-facing grip attaches to the native MagSafe interface on supported
  iPhones and compatible MagSafe cases. Do not require the separate steel phone
  plate used by the historical design.
- Preserve the detachable BLE shutter remote and its right-edge, side-actuated
  TS24CA/C393942 switch. The phone-to-grip MagSafe mount and the remote-to-grip
  docking interface are separate mechanical interfaces.
- Preserve the single protected battery, USB-C charging port, DOIT ESP32-C3 and
  direct three-pin JST UART programming connection. No torch or additional
  charging port is requested.
- Use a common MagSafe datum rather than a fixed phone-width clamp. Treat phone
  camera protrusions, case lips and accessory clearance as model-specific
  envelopes around that datum. Keep the grip, dock and remote clear of cameras,
  flash, side buttons and required cable approaches in supported orientations.
- Support multiple sizes: MagSafe-capable mini, standard and Pro/Pro Max models,
  plus compatible cases. Actual supported models and case limits must be listed
  after qualification; the requirement is not a claim of universal iPhone/case
  compatibility. A phone without native MagSafe support is not automatically
  covered by this mount requirement.

## Qualification before mechanical dimensions are frozen

1. Retain current official Apple accessory/magnetic-interface guidance and
   official dimensions for the intended phone families. Record source URLs,
   retrieval dates and file hashes. Do not infer ring dimensions, polarity or
   camera offsets from photographs or existing disc-magnet locations.
2. Select an exact, documented phone-facing magnet assembly. Audit dimensions,
   pole arrangement, attraction orientation, locating/anti-rotation features,
   mounting and mechanical retention against the applicable guidance. This is
   an external mechanical part, not an invented JLCPCB electronic C-number.
3. Establish the MagSafe plane/centre/orientation, grip dock transform, PCB
   transform, phone/case volumes, battery and harness volumes, camera keepouts
   and the side-switch press/overtravel space in the new R8 model. A small PCB
   does not define the required diameter or area of the MagSafe mount.
4. Check the smallest intended phone, the largest camera envelope, and the
   largest intended phone separately. Retain a compatibility matrix with exact
   model, bare-phone or exact case, source dimensions, orientation, measured CAD
   minimum gaps, tolerance assumptions and unresolved checks. Include mini,
   standard and Pro/Pro Max representatives. Expand to current models only after
   their official dimensions and MagSafe support have been checked.
5. Check the complete docked and detached antenna environment. The existing
   all-layer PCB antenna exclusion is necessary but does not prove clearance
   from phone metal, magnets, backing plates, case hardware or battery/harness.
   Use the fitted DOIT guidance, not the old Nordic module's clearance figures.
   Record three-dimensional metal separation and the manufacturer basis; do not
   invent a guaranteed RF distance.
6. Retain the qualified protected pack, or qualify a smaller protected battery
   for the retained 1 A design requirement,
   charging current/voltage/temperature limits, protection and connector polarity
   before relying on a compact enclosure. Preserve insulation, swelling and
   harness/thermal-sensor provisions. PCB placement/routing changes remain gated
   by the existing schematic/BOM and unrouted-placement checks.

## Fit and function acceptance

Calculated geometry is a design gate. Physical iPhone/case attachment,
anti-rotation and retention under grip and shutter loads, docking/removal,
camera/flash clearance, side-switch access/travel, scratching/contact pressure,
and BLE shutter behavior in native iPhone Camera require prototype tests for
each claimed configuration. Verify docked and detached RF operation as well.
Do not mark compatibility passed using a rendered model or the existing zero-DRC
electrical result alone. No prototype hardware is attached to this workspace.

The remote is battery-powered and USB-C charged. Wireless charging of the phone
through the attached grip is not an established capability; specify removal
for charging until that attached configuration is qualified. MagSafe attachment
compatibility must not be described as Apple certification without evidence.

## Current evidence and blockers

The historical `remote-and-grip.scad` has four K&J D42 phone magnets centred at
(±14, ±14) mm and a separate 45 × 45 × 0.5 mm steel phone plate. Its generic
84 × 180 × 10 mm phone/case box is not model-specific MagSafe or camera-clearance
evidence. The old 40 mm remote body also does not accommodate the current 44 mm
R8 PCB. Preserve all historical CAD, meshes and frozen baselines unchanged.

The compact hardware/package 0.3.5 PCB is 44×56×1mm and passes its electrical,
local fabrication and visual review; see `evidence/R8-compact-pcb-2026-10-06/REVIEW.md`.
This follows the JJC MSG-P1 product arrangement without treating PCB dimensions
as the full enclosure or magnetic-array size. No R8 MagSafe enclosure, selected
magnet assembly, complete RF/metal envelope or multi-model fit pass is claimed.

Official guidance attempted:
<https://developer.apple.com/accessories/Accessory-Design-Guidelines.pdf>.
The normal inherited proxy returned CONNECT HTTP 403. The exact
`developer.apple.com` host was added to the saved restricted environment draft,
preserving existing destinations, repository access, Install/Start and secrets.
The draft tool returned `requires_publish=true`; Save/Publish and actual access
verification remain necessary. Smaller-battery official-source access is also
pending. Do not bypass the proxy or substitute guessed interface geometry.

Orders, payments, supplier contact, assembler uploads and Apple/program
applications are not authorized by this mechanical-requirement update.

Missing `3V3` metadata remains a separate importer issue.
