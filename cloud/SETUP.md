# Configure Codex Cloud

Select public repository `AnasSarkiz/magnetic-shutter-remote`, branch **cloud/r8-cloud-setup**. Keep `main` and frozen baseline directories unchanged. This branch contains the full active reproduction/context handoff; `main` remains the earlier published Nordic board.

Current official guide: https://learn.chatgpt.com/docs/environments/cloud-environments (checked2026-10-05). On web/desktop: Settings → Codex Cloud → Environments → Create environment. Current setup uses an **Install script** and **Start skill**; older integrations label them Setup/Maintenance scripts. The files in this repository are commands to configure explicitly, not a claim that a repository filename is automatically executed by Codex.

Name: `magnetic-shutter-remote-r8`. Repository/branch as above. Start from the published environment after its setup report passes. If initial checkout is `main`, use this explicit public-branch checkout during environment setup:

```sh
git fetch origin cloud/r8-cloud-setup
git switch --track origin/cloud/r8-cloud-setup
bash cloud/setup.sh
bash cloud/smoke.sh
```

If already on the branch, only the last two commands are needed. Never use a reset/force-checkout on a task with work in progress.

Install script: `bash cloud/setup.sh`. It installs exact Node25.6.0/Bun1.3.9 in ignored task-local `.codex/runtime/`, then locked board dependencies. Requires Linux, npm and Python≥3.11. No board build, routing, viewer service, supplier upload or publishing is launched. Scripts add the task-local runtime to PATH themselves, so they do not rely on an `export` from an earlier setup shell.

Start instructions: read AGENTS.md/cloud/HANDOFF.md, run `bash cloud/smoke.sh`, retain the report, continue component qualification. No server is needed. Existing-task state is not automatically replaced by a republished environment; start a new Cloud task after setup changes.

For full existing CAM tooling, configure Python3.14 then `bash cloud/setup.sh --with-cam`. It installs the exact recorded requirements in `tooling/gerber-review-venv`; no macOS venv is uploaded/reused. PDF visual rendering additionally needs Poppler (`pdftoppm`/`pdftotext`). Install through the environment's distro packages before PDF review. Linux3D rendering and firmwareSDK rebuild are separate capabilities to check explicitly before claiming those passes.

Firmware source and compiled evidence are included. See `firmware/README.md` for exact Zephyr/HAL commits and optional SDK build. Download the **Linux host SDK0.17.2** and RISC-V archive from the official Zephyr SDK release, verify the recorded official SHA256 sums, then follow the task-local firmware commands. Do not reuse the excluded macOS SDK or quote the Mac compile as a fresh Linux build.

Network: dependency setup needs npm/Bun registries (`registry.npmjs.org`, `registry.npmjs.com`, `npm.tscircuit.com`, `jscdn.tscircuit.com`, GitHub release/assets). Package-manager domain preset may cover some, but exact tscircuit hosts need allowance. Live manufacturer/sourcing work needs explicit official domains, e.g. `espressif.com`, `www.espressif.com`, `docs.espressif.com`, `jlcpcb.com`, `www.jlcpcb.com`, `lcsc.com`, `www.lcsc.com`, `ti.com`, `www.ti.com`, `gct.co`, `raw.githubusercontent.com`, `github.com`, `pypi.org`, `files.pythonhosted.org`. Do not assume hosted search access proves terminal download permission. No project secrets are needed for the frozen imports or public branch. Use provider-managed authentication for GitHub; never put personal tokens in the repository.

Memory: official default VMs currently list8 GiB forPlus/EduPlus and16 GiB forPro/Business/Enterprise/Edu/EduPro. Availability belongs to the user's account; this repository cannot upgrade the plan or VM. Cloud still has finite RAM. Record actual limits, run only one heavy process, and preserve an OOM as failure rather than weakening routing/DRC.

After gates pass, example heavy command:

```sh
python3 cloud/run-heavy.py -- ./node_modules/.bin/tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs --3d-png
```

It refuses macOS, budgets V8 heap at60% of the measured host/cgroup limit (cap14 GiB), leaves room for native buffers/browser/agent, rejects concurrent heavy commands and records command, exit, peakchildRSS and cgroupOOM counters under `.codex/logs/`. The wrapper is a resource guard, not proof of low-memory routing. Move selected logs into a new versioned evidence folder before committing; do not publish caches.

Use `cloud/TASK-PROMPT.md` for continuation. The repository/context push and actual hosted-environment activation are separate steps. Only mark environment published/Cloud execution verified after the product shows that state and a hosted smoke report exists.
