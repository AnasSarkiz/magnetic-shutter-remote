# R8 sculpted enclosure 0.3.19 publication — 2026-10-07

GitHub source/artifacts: [107aba5](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/107aba54bd410dc503f2cdabbacba6322b2a1e6e)
on `board/r8-doit-c3-prototype-20261005`. All 112 changed paths were anonymously
read back at this exact commit and match byte-for-byte. `main` remains frozen at
5951f419c8314b83648d89e1cfb7e29e87e32eb8. No PR, merge or force push.

The actual CAD/renders and eight print meshes are available on GitHub. Their
geometry checks pass; physical operation and photograph-identical finish remain
unqualified. The USB opening is higher than the concept to follow the real PCB.

Native [0.3.19-prototype](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8)
is **incomplete**, not a successful hosted product preview. Release ID
`c2300b31-b0e6-4ad2-bb1e-6891db72dc0e`. Normal guarded CLI push exits 1:
293 reported successes and nine reported failures. Actual anonymous inventory
contains 296/302 expected paths, zero extras or duplicates. All 296 stored files
were independently downloaded/read back and match exact staged SHA256s. The
three additional stored files despite reported failures are retained in the
readback, never inferred from the CLI summary. Six files remain absent:

- `dist/product.assembly/circuit.json`
- `dist/product.exploded/circuit.json`
- `evidence/R8-reference18-2026-10-07/final-manufacturing.json`
- `imports/SM02B_SRSS_TB_LF__SN_/SM02B_SRSS_TB_LF__SN_.step`
- `product/print-plans.json`
- `product/studio-side.png`

Both assembly JSONs and print plans return HTTP 413 at POST
`https://registry-api.tscircuit.com/package_files/create`. Their raw sizes are
4,870,478, 4,870,475 and 4,667,954 bytes respectively, within the local 5,000,000
byte staging cap. That local cap does not establish the endpoint's request limit;
JSON transport encoding also differs from raw file bytes. No enforced threshold
or server root cause is inferred. Manufacturing report, JST STEP, PCB GLB and
side PNG uploads return HTTP 502; two additional STEP requests time out. Actual
inventory, rather than these responses alone, determines the missing files.

`ready_to_build=false`, hosted status `pending`, no user-code-job error. The
package's latest-version field naming 0.3.19 does not prove publication complete.
The CLI has no existing-release resume flag; repeating it creates another version.
No incomplete draft was finalized, no proxy bypass, no credentials exported,
no model omitted or checker relaxed. Prior incomplete 0.3.18 receipt is unchanged.

All staged source hashes remained unchanged during upload. Board JSON remains
7266c060cc5074a4e9bb5082ae77ded4b1be7988eb7b65fa94f139fb0ca471a4.
Native upload peak child RSS 911,948 KiB, no OOM-counter increase; observed VM
limit 32 GiB/4 CPUs is not a guaranteed plan allocation. Heavy jobs retain the
serial `cloud/run-heavy.py` guard. Actual native log, all-file readback, runtime/
scope, final checks and GitHub byte receipt are retained in this directory.
No root PCB/routing/SDK/CAM build, supplier action, order or environment Publish.

The remaining publication blockers are issue099 transport errors and issue103
bounded text payload HTTP413; they do not invalidate local CAD or copper checks.
