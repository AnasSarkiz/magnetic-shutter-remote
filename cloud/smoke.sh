#!/usr/bin/env bash
set -euo pipefail
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"
export PATH="$project_root/.codex/runtime/node_modules/.bin:$PATH"
python3 cloud/verify-context.py
bun run format:check
bun run typecheck
python3 -m unittest discover -s tests -v
bun test tests/r8-power-metadata.test.ts
python3 scripts/audit-r8-module.py
echo "Lightweight smoke checks PASS. This is not R8 electrical, routing or fabrication validation."
