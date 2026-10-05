# Cloud setup status — 2026-10-05

Board: **R8 COMPONENT QUALIFICATION BLOCKED — NOT FOR FABRICATION**.

- Repository: `AnasSarkiz/magnetic-shutter-remote`, public.
- Branch: `cloud/r8-cloud-setup`; `main` remains unchanged.
- Project handoff/configuration: prepared, self-contained frozen references and toolchain included.
- Local checks:10 focused tests PASS, TypeScript/format/shell syntax/context hashes PASS. These are not board DFM checks.
- Linux hosted setup/fixture CI: PASS, GitHub Actions run [37291506181](https://github.com/AnasSarkiz/magnetic-shutter-remote/actions/runs/37291506181), source commit `56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad`. Ubuntu24.04.5, Python3.14.7, Node25.6.0, Bun1.3.9. Locked installation, context/archive hashes, formatting, TypeScript,10 tests and isolated unrouted module PCB/schematic exports passed. This is GitHub Actions execution, not a Codex Cloud task or routing pass.
- Actual Codex Cloud environment: **PUBLISHED — magnetic-shutter-remote-r8 — Only me**. The user enabled the official GitHub installation; the environment selects only this board repository. No other GitHub grants were changed. Cloud installation and smoke both exited0 on the exact prepared source commit `b25353c0a1d7adceeab9a966aaf68a6cb3594cc9` after the network draft was saved. Observed memory limit32 GiB and CPU quota4; these are measured instance limits, not an allocation guarantee. No token or password is stored in this project.
- PCB/source/import/firmware application changes: none during Cloud setup.
- Routing on Mac/Cloud: not performed during setup.
- tscircuit board publication: not performed; ESP32 migration gates remain open.

Public branch pushed at `56c6cb9f2fd5178ad56a0beae17ea3156b5ab2ad`; unauthenticated HTTPS reads of HANDOFF.md, setup.sh and the frozen published reference circuitJSON match local SHA256 hashes. Remote main still equals `5951f419c8314b83648d89e1cfb7e29e87e32eb8`. Logs/metadata are in `evidence/R8-components/cloud-linux-smoke-37291506181.{log,json}`; public file verification is in `cloud-public-verification.json` in that evidence directory.

Visible warnings remain recorded: module `U1 has no pin with requires_power=true` (existing issue076), Actions runtime Node20→24 migration notice and action dependency punycode/url.parse deprecations. The fixture export succeeding does not resolve issue076 or qualify the recommended-land discrepancy. No warnings were hidden, no routing/DRC thresholds changed, and no broad historical suites were rerun.

Actual hosted evidence and saved configuration: `ENVIRONMENT-RECORD.json`, `ENVIRONMENT-INSTALL.sh`, `ENVIRONMENT-START.md` and `evidence/R8-components/codex-cloud-onboarding-20261005.json`. The initial setup failed on the default npm cache and then two proxy-denied hosts; setting the cache under ignored task-local runtime and saving Package managers + exact additional hosts `jscdn.tscircuit.com`/`api.github.com` resolved those failures. The final identical frozen installation and smoke passed, with10 focused tests and129/129 preserved hashes. No proxy bypass or unrestricted-network setting was used. The initial branch tracking failures and successful explicit-ref checkout are documented in SETUP.md.

The product displayed **Environment published** and **Published** after setup review; a local UI proof is `cloud/codex-published-ui.jpg` (not included in the public source). Prepared snapshot remains identified by the tested b25353c commit; this follow-up records its publication without claiming those later documentation files existed in that snapshot. Startup preserves later task branches and checks the R8 context. Board qualification issues075/076 remain open.

To continue: choose Work in → Cloud → magnetic-shutter-remote-r8, use TASK-PROMPT.md and continue at the existing component qualification gates. This current local chat does not automatically move to Cloud. No routing has run during onboarding. Optional Linux3D/CAM/firmware SDK setup and actual routing are still separate checks; do not infer their success from smoke. No secrets were added.
