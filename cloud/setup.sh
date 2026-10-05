#!/usr/bin/env bash
set -euo pipefail
# Node >=24.5 can honor the provider proxy in package postinstall requests.
export NODE_USE_ENV_PROXY=1
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"
if [[ "$(uname -s)" != Linux ]]; then
  echo "Cloud setup requires Linux. It does not install Linux tooling or route on your Mac." >&2
  exit 2
fi
if [[ $# -gt 1 || ( $# -eq 1 && "$1" != --with-cam ) ]]; then
  echo "Usage: bash cloud/setup.sh [--with-cam]" >&2
  exit 2
fi
command -v npm >/dev/null
command -v python3 >/dev/null
python3 -c 'import sys; assert sys.version_info >= (3, 11), "Python >=3.11 required"'
mkdir -p .codex/runtime .codex/logs
# The hosted home is read-only; keep Bun metadata/cache in this task workspace.
export BUN_INSTALL_CACHE_DIR="$project_root/.codex/runtime/bun-cache"
export npm_config_cache="$project_root/.codex/runtime/npm-cache"
npm install --prefix "$project_root/.codex/runtime" --no-save --package-lock=false node@25.6.0 bun@1.3.9
export PATH="$project_root/.codex/runtime/node_modules/.bin:$PATH"
test "$(node --version)" = v25.6.0
test "$(bun --version)" = 1.3.9
bun install --frozen-lockfile
python3 cloud/verify-context.py
node --version
bun --version
python3 --version
if [[ $# -eq 1 ]]; then
  python3 -c 'import sys; assert sys.version_info[:2] == (3, 14), "Recorded CAM lock requires Python 3.14; configure this runtime before --with-cam"'
  if [[ ! -x tooling/gerber-review-venv/bin/python ]]; then
    python3 -m venv tooling/gerber-review-venv
  fi
  tooling/gerber-review-venv/bin/python -m pip install -r tooling/gerber-review-requirements.txt
  tooling/gerber-review-venv/bin/python -c 'import gerbonara, shapely, reportlab, PIL; print("CAM/PDF imports PASS")'
fi
echo "Dependency setup complete. No routing, root board build, publishing or ordering was performed."
