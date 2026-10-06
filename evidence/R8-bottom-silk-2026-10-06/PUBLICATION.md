# R8 0.3.12 — actual publication receipt

The three requested bottom-side informational labels are removed. No
programming requirement is removed: the procedure remains in the programmer
R8-USAGE.md. All 2,072 non-artwork/non-metadata elements are identical to
0.3.11, including schematic, physical/electrical features and routing.
Current native bottom silkscreen Gerber has zero objects. All other 11 CAM
files match except listed timestamps; BOM/CPL are byte-identical.

Native source and artifact commit:
https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/6ccfece3f7c60031c6a773aec2181fcaf94433c4
Seven exact anonymous GitHub source/JSON/empty-Gerber reads match and the
repository is public; frozen main is unchanged.

Supported native publication command ran serially via cloud/run-heavy.py:
`tsci push index.circuit.tsx --include-dist --version-tag prototype` from the
new bounded staging directory. Native CLI exited 1, reporting 17 failed files. Every reported file was already present with exact staged bytes. Full inventory and anonymous critical-byte preflight passed before the same official package_releases/update ready_to_build step used by the CLI. No file replacement, alternative upload service or proxy bypass was used. Actual CLI failure remains explicit in the retained log and supported-finalization proof.

Public native package:
https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8
Version **0.3.12-prototype**, release `e3e28d1e-036b-496c-8edf-f6a530bb44d5`.
Actual is_public=true/latest_version=0.3.12-prototype/ready_to_build=true.
All **356 files** match exact inventory, without missing,
extra or duplicate entries. All **42 critical anonymous text/binary
reads** match staged bytes, including actual changed functional-markings
source, reporting fix/regression, Circuit JSON, empty bottom Gerber, PCB
views, six unchanged A4 SVGs, qualified programmer UF2/ESP32 firmware,
electrical/width/current/manufacturing/process proofs and BOM/CPL/ZIP.
Staged source hashes remained unchanged throughout upload.
Circuit JSON SHA256: `cf61cad4bd9972f10607977ab42f06dfe02318f9a42d073d1febe6a3b890f331`.

Fresh validation passes zero native DRC errors/shorts/dangling and zero
independent manufacturing/process failures, 29 physical nets, 174 physical
widths and seven current/voltage paths. All 44 fitted identities/poses and
159 pin/value contracts are unchanged. All 91 vias remain 0.30/0.45mm through
top/bottom. Format/types/light smoke/native snapshots pass. All 30 CAM
regressions pass, including strict JSON for empty silk (local issue098).
Schematic geometry is unchanged; fresh CLI style passes. Prior actual browser
style result remains applicable; no new browser analysis is claimed.

Hosted worker observation `2026-10-06T20:26:15.685211+00:00`:
display_status `pending`, user_code_job_error
`None`. Native publication/readback is distinct
from hosted compile/render and physical validation. Pending is not a passed
hosted preview.

Stock observations retain exact original dates from the preceding 25-part
review: all 25 buyable SMT listings/positive headline stock; 24 available-order
quantities cover five boards. Radio66 headline/3 Available Order Qty switches
to pre-order above3; lead time/allocation remain unconfirmed. Supplier
processed preview/stackup/assembly approval, USB-C shell solder coverage and
physical programming/power/charging/BLE/iPhone/RF/thermal/runtime/MagSafe
fit remain pending. Native004/084 and original075/076 records remain explicit.
Missing3V3 metadata remains a separate importer issue.

Frozen baselines/old evidence/imports/firmware/locks/toolchain/setup/start/
memory guards remain unchanged. Observed32GiB is not a guaranteed allocation.
No SDK/3D build, order/payment/supplier contact/assembler upload, policy
expansion, environment Publish/share, PR, merge or default-main change.

This receipt is a follow-up documentation commit. The public native source
and Circuit JSON correspond to the checked source/artifact commit above.
