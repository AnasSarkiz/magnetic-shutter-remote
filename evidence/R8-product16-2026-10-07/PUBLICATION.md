# Actual publication status — R8 0.3.16 prototype

GitHub source/artifact push and anonymous public readback PASS:23 exact files.
Source/artifact commit: https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/bfbded04438fbbf2924cd2c5df4c4a898cbf877d
Frozen main is unchanged. Current source cleanup, native product assembly,
print-fit meshes and board checks are locally complete; PCB/routing unchanged.

Native tscircuit CLI ran via the serial memory guard from the bounded staged
package with `tsci push index.circuit.tsx --include-dist --version-tag prototype --compress`.
It exited1 after archive upload HTTP413 and file fallback transport failures.
Anonymous inventory on 2026-10-07T14:17:16.602415+00:00 contains272/275expected
files. Release `7245ae80-d5f5-4dd8-b660-e5f322443a95` is **incomplete**, version
0.3.16-prototype, ready_to_build=false, hosted display pending. Missing:

- `imports/SKRTLAE010/SKRTLAE010.step`
- `product/models/r8-controls.glb`
- `product/models/r8-pcb.glb`

All six native-reported failed file paths and actual inventory are retained in
registry-upload-observation.json. Some reported failures were stored, but the
three above are absent. Do not finalize this draft, claim native publication
passed, or present a successful hosted preview. Original raw upload log is
retained outside the repo; public log omits oversized/authentication diagnostics.
Issue099 service/transport failure remains open; previous0.3.15 failure is preserved.
No proxy bypass, alternate upload service or credential export was used.

The user then requested a realistic camera-grip styling concept FIRST, before
changing the current mechanical shape. The concept image is an illustration;
it is not this qualified CAD or phone-fit proof. No new mechanical/PCB design
has been substituted for the reviewed0.3.16 files. Exact magnet/DC shield,
hardware/harness/thermal, supplier preview and physical operation remain pending.
No ordering/payment/contact/assembler upload, PR/merge, frozen-main change or
environment Publish/share was performed.
