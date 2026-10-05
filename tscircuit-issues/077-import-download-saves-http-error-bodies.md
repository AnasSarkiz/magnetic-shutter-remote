# Import download saves HTTP error bodies as CAD assets

**Confirmed tooling defect; no upstream fix claimed.** The pinned local CLI reports a successful component import despite failed model downloads.

Reproduction: `tsci import C19949080 --jlcpcb --use-exact-footprint --download` on the hosted Linux task with `modelcdn.tscircuit.com` denied by the egress proxy. The command exits 0 and writes both `ESPC2_12_N4.obj` and `ESPC2_12_N4.step` as the 16-byte text `Domain forbidden`. These are HTTP error bodies, not CAD files. This is separate from supplier footprint fidelity and manufacturer land qualification.

Root cause: `lib/import/download-cad-model-assets.ts` awaits the STEP/OBJ responses and writes their bodies without checking `Response.ok`. A successful TSX generation must not be reported as successful model retrieval.

The original failed outputs are preserved in `evidence/R8-components/alternative-radio-2026-10-05/first-import-with-denied-models/`. They must not be used as geometry or passed off as verified models. No model was fabricated or hand-edited. The exact official importer model host was added to the restricted environment network draft; runtime access must succeed before repeating the supported download and inspecting the new output. Draft persistence alone does not establish connectivity.

The importer separately warns that its datasheet metadata request received HTTP 403. The C2 import nevertheless infers pin 8 VCC as requiring power and pin 9 GND as requiring ground. Preserve that warning; it is not proof of successful manufacturer-metadata retrieval.

After the model and registry hosts became reachable, the supported import was repeated. It downloaded real OBJ/STEP assets and completed without the metadata-request warning. Both formats now pass content guards; the denied originals remain in the evidence folder. No archive or CLI code was patched. The CLI's missing HTTP-status validation remains an upstream tooling defect, even though the project download failure is resolved.
