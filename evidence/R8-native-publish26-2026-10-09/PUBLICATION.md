# R8 0.3.26 prototype — source public, native upload awaits sign-in

The added shared-viewer feature is removed: revert
b1ed3d0e3fc5c316fa6793255d52cd8e26c477db is pushed and the tracked tree exactly
matches original c321c7ea0063eb72d4f0bf04ba7637ce3ee6b991. PR1024 remains closed,
unmerged; no new PR or force push.

R8 source59dcb03 is public on board/r8-doit-c3-prototype-20261005. Anonymous
exact readback verifies all13preparation files and all4qualified CircuitJSONs.
Main remains5951f419c8314b83648d89e1cfb7e29e87e32eb8. The staged324native files
retain every prior input and all17model assets. Only publication metadata/review
records differ; PCB/source/copper/geometry/prints/toolchain/guards are unchanged.
Light smoke38Python+2Bun/13assertions and7product tests/315assertions pass.

Official guarded tsci push --include-dist --version-tag prototype exited1before
upload because the current instance has no active tscircuit login. Official
whoami confirms missing authentication. No release0.3.26-prototype upload or
hosted render is claimed. Supported tsci auth login is running; its browser link
was provided to the user. Authentication URLs/tokens/passwords are not retained
in repository files. Resume the unchanged staged push after browser sign-in;
retain the first failure log and verify actual public inventory/readback.

The previous0.3.25-prototype remains public/ready_to_build=true, with hosted
preview still pending in the fresh observation. Physical qualification and
original075/076/004/084 plus separate3V3metadata issue remain explicit. No order,
payment, supplier contact, proxy/readiness bypass, dependency upgrade or rebuild.
Observed parent limit32GiB is not a guaranteed allocation; OOM/kill counters
remain1/1without increase. Detailed current checkpoint lives outside the repo in
/workspace/r8-publish26-20261009/.
