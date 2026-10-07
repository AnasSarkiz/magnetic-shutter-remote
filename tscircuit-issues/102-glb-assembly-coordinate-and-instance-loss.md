# GLB assembly re-import: coordinates and shared instances

Observed2026-10-07 with the pinned circuit-json-to-gltf. The electronics source,
routing and actual supplier models are unaffected; this is an assembly display
problem caught by independent native GLB readback.

A PCB-XYZ GLB imported with defaultz+ normal and size is fitted as Y-up geometry,
shrinking the board44mm to about6.63mm. Native Y-up export avoids that scale
error, but export (-PCB X,PCB Z,PCB Y) must be expressed in the loader frame
(PCB X,PCB Z,PCB Y) before the converter's final X orientation conversion.

The pinned GLB parser also records only the last transform for a mesh referenced
by multiple nodes: buildMeshTransforms sets one Map entry per mesh. Repeated
switch/passive geometry can disappear or move on re-import. Parent transforms
are collected in root-to-leaf order and then applied in that order, rather than
composed as parent×child. Merely checking the original GLB is insufficient.

The assembly asset generator now emits lossless flat glTF scene instances with
independent mesh records and composed TRS transforms in the loader coordinate
frame. Accessors/materials and the binary geometry chunk remain untouched.
Source45 mesh bounds, vertex counts and44 anchors match the previously qualified
models. Independent readback requires all original triangles and per-fragment
bounds in both actual built GLBs, plus every mechanical part's native position.
No supplier import/footprint, dependency archive or electronic Circuit JSON was
patched. Old publication/display evidence is retained and superseded; it does
not prove a correct previous assembled PCB display. No public upstream issue
or tooling package was published. Current evidence lives in evidence/R8-reference18-2026-10-07; superseded tall candidate evidence is byte-preserved in archives/r8-enclosure18-rejected-candidates-20261007.tar.gz.
