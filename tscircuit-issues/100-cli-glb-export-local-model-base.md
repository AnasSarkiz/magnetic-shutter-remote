# CLI GLB export resolves local supplier models against the registry base

Observed2026-10-07 with the pinned R8 CLI/toolchain. Native build succeeds;
`tsci export dist/index/circuit.json -f glb -o <absolute-output>` exits0, but
U1/J2/J3/SW2 model meshes have zero bounds. Their qualified CAD records reference
`./imports/...obj`, and the CLI export conversion uses a registry projectBaseUrl
without the local-file URL normalization used by `tsci build --glbs`.
Remote modelcdn-backed parts are present; the four local imports are empty.
This is a model export/resolution issue, not an electrical/routing blocker.

The supported converter API accepts `projectBaseUrl`; the product generator uses
`pathToFileURL(repositoryRoot)` so the actual qualified local assets load.
All44 real fitted model meshes and anchors are then independently checked.
A standard glTF scene rotation expresses exported coordinates in PCB XYZ;
mesh/texture bytes are untouched. No imports, board geometry, generated Circuit
JSON, dependency or proxy policy is modified to conceal the problem.

The reproduction logs are retained outside the repo in the task review folder;
current generation and model-review source are in `scripts/export-product-pcb.ts`
and `scripts/review-product-model.ts`. Upstream fix should share the build's
model URL normalization with export and fail/report missing/empty models.
No public issue was submitted by this task.
