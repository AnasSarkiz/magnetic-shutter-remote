# R8 native assembly 0.3.20 publication — 2026-10-08T00:05:15.556166+00:00

The validated enclosure integration is committed and publicly pushed to
[GitHub 3060c5d](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/3060c5da480f999690006d74cbaa41db42da8b6b)
on `board/r8-doit-c3-prototype-20261005`. All 74 changed files are independently
read back anonymously and match exact bytes. The frozen public main remains
5951f419c8314b83648d89e1cfb7e29e87e32eb8. Electrical source, qualified board JSON,
seven actual PCB fragments, geometry and eight print meshes remain unchanged;
see the preservation receipt. No root PCB/routing/SDK/CAM build occurred.

The normal guarded `tsci push product.assembly.tsx --include-dist --version-tag
prototype` creates 0.3.20-prototype in
[the public native package](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8).
It exits 1 with 308 acknowledged uploads and five HTTP 502 responses from
`POST https://registry-api.tscircuit.com/package_files/create`.

Actual anonymous inventory is **309/313 files**, with no extras/duplicates. All
309 stored text/binary files match the staged source bytes, including both
assembly circuit JSONs (15,516/15,513 bytes), compact print plans (780,037 bytes),
all ten new mechanical models and the unchanged board circuit JSON. No staged
file changes during upload. The old HTTP 413 assembly/plan failures do not recur
for these smaller canonical inputs; this does not establish a registry-wide fix.

Four files are actually missing:

| Exact path | Staged bytes |
| --- | ---: |
| `imports/SM02B_SRSS_TB_LF__SN_/SM02B_SRSS_TB_LF__SN_.step` | 1,645,245 |
| `product/closed.png` | 2,134,061 |
| `product/models/r8-parts-3.glb` | 2,035,712 |
| `tooling/vendor/easyeda-converter-r7-circular-paste-v2.tgz` | 1,408,848 |

`product/studio-back.png` also receives HTTP 502 but is stored and independently
matches; a failed acknowledgement does not prove file absence. The exact public
inventory and every readback are in registry-upload-observation.json.

Release remains `ready_to_build=false`, `display_status=pending`, with no hosted
worker error supplied. **Native publication and hosted 3D preview are incomplete.**
The 502 server/proxy root cause is unconfirmed; no hostname-policy denial or
memory allocation failure is established. Peak publisher child RSS is 747,900 KiB;
the observed cgroup 32 GiB limit and four CPU limit are not guaranteed plan allocations.
No OOM counter increases; the unchanged serial memory guard remains enforced.

The installed push help supports private/version-tag/include-dist/compress only.
Registry resources expose package create/update, not file repair. Publisher source
always creates a release and increments an occupied version; it has no supported
existing-release resume. A blind retry would create another draft. Proper recovery
requires the registry's supported existing-release repair/resume path for the four
exact missing files, followed by complete inventory/byte verification and actual
hosted build verification. No private auth extraction, copied uploader internals,
manual readiness override, proxy bypass or dependency/archive modification.

Local closed/exploded native geometry passes 34 independent checks, including 20
outward-face checks; four product tests pass 194 assertions. Fit, topology,
byte reproduction, typecheck/format and light smoke pass. Rejected reflected-frame
trials, omitted-output invocation and the serial overlap rejection remain explicit.
No rejected models are published. The uploaded mechanical models are the final
proper Z-up models and match the checked source.

CAD fit is nominal 90×78×34 mm around the unchanged 44×56×1 mm PCB and protected
32×43×8.5 mm battery envelope. Physical cable hood, shutter motion/return/guides,
fasteners/harness/swelling/thermal, exact magnets/shield/bonding, phone/case
retention and RF/BLE/iPhone Camera remain unqualified. Prior 075/076/004/084 and
separate missing 3V3 metadata remain explicit; old WROOM smoke warning is preserved.
No ordering/payment/contact or finished-product manufacturing approval.

Reusable setup/start, provider auth, environment privacy, selected/task branches,
frozen baselines/main and network configuration remain unchanged. GitHub source
success is separate from incomplete native upload; old incomplete 0.3.18/0.3.19 records
remain immutable history. This task creates no PR or public issue.
