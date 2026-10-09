# R8 0.3.26 — incomplete after HTTP502 gateway responses

Official browser sign-in completed. Authenticated normal guarded tsci push exits1:
321successes and3HTTP502responses from registry-api.tscircuit.com,
POST/package_files/create. Anonymous readback proves323/324stored files match
exactly; two failed responses correspond to actual persisted STEPfiles. Missing:
imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4.step (2197838bytes).
Release7bfc2a94-e06c-48b0-8667-48e770cf7337 stays ready_to_build=false and hosted
preview pending. Publication is incomplete; no success or readiness is patched.
All17models/fourCircuitJSONs and unchanged qualifiedPCB are present/exact.
The CLI has no existing-release resume. One controlled supported retry27tests
transient gateway failure; no input is removed or publisher/guards modified.

The earlier login-blocked attempt and all logs remain preserved. R8source59dcb03
and pending-login receipte224952 are public; frozen main stays5951f419c8314b83648d89e1cfb7e29e87e32eb8.
The shared-viewer addition is fully reverted to its original tree and PR1024
remains closed/unmerged. PCB/electronics/geometry/prints/toolchain/memory guards
and all physical-qualification restrictions remain unchanged. Actual32GiB is an
observation, not a plan guarantee. No new OOM/kill event, ordering/contact,
readiness bypass, source/artifact edits or compressed payload workaround.
