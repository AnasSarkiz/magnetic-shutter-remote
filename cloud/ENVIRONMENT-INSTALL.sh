#!/usr/bin/env bash
set -euo pipefail
cd /workspace/magnetic-shutter-remote
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Refusing setup: tracked changes must be preserved." >&2
  exit 2
fi
# Provider-managed Git authentication only; never reset or force checkout.
git fetch origin refs/heads/cloud/r8-cloud-setup:refs/remotes/origin/cloud/r8-cloud-setup
if git show-ref --verify --quiet refs/heads/cloud/r8-cloud-setup; then
  git switch cloud/r8-cloud-setup
else
  git switch -c cloud/r8-cloud-setup refs/remotes/origin/cloud/r8-cloud-setup
fi
test -f AGENTS.md
test -f cloud/HANDOFF.md
test -f cloud/SETUP.md
test -f cloud/STATUS.md
test -f cloud/R7-PORTABLE-MANIFEST.json
git merge-base --is-ancestor b25353c0a1d7adceeab9a966aaf68a6cb3594cc9 HEAD
mkdir -p .codex/logs
export npm_config_cache="$PWD/.codex/runtime/npm-cache"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
git rev-parse HEAD | tee ".codex/logs/install-$stamp-head.txt"
python3 -c 'import platform,runpy,json; m=runpy.run_path("cloud/run-heavy.py"); print(json.dumps({"platform":platform.platform(),"python":platform.python_version(),**m["read_memory_budget"](),"oom_counters":m["oom_counters"]()},indent=2))' | tee ".codex/logs/install-$stamp-resources.json"
bash cloud/setup.sh 2>&1 | tee ".codex/logs/install-$stamp-setup.log"
bash cloud/smoke.sh 2>&1 | tee ".codex/logs/install-$stamp-smoke.log"
git status --porcelain=v1 | tee ".codex/logs/install-$stamp-status.txt"
git diff --exit-code
git diff --cached --exit-code
