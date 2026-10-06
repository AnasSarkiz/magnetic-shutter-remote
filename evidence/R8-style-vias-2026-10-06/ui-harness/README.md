# Native browser Style Analysis reproduction

Use the repository's pinned Bun and SchematicViewer2.0.99. Copy index.tsx,
index.html and build-ui.ts from this directory to `.codex/runtime/style-ui/`.
From the repository directory, build with:

```
python3 cloud/run-heavy.py -- bun run .codex/runtime/style-ui/build-ui.ts
python3 cloud/run-heavy.py -- python3 evidence/R8-style-vias-2026-10-06/ui-harness/review-ui.py --label reproduction
```

The review opens the actual native viewer, right-clicks Run Style Analysis,
and retains the real dialog, screenshots, issue SVGs and CDN analyzer bytes.
The label must be new to preserve earlier observations. This helper's exit0
means the UI ran; independently require review.json issue_count0, no analysis
failure, current circuit SHA and HTTP200 before accepting a clean schematic.
No circuit objects or analyzer results are mocked or filtered.

Chromium151 and Python Playwright were already installed. The managed proxy
CA at `/usr/local/share/ca-certificates/environment-proxy-ca.crt` must be trusted
in Chromium's NSS database; this run used the supported trust configuration
with an explicit filesystem permission for `/home/agent/.pki/nssdb`.
TLS verification remained enabled. Only loopback reaches the private local
viewer directly; external CDN traffic uses the inherited environment proxy.
The ordinary production React deduplication plugin avoids conflicting nested
React peer versions without changing project dependencies or native viewers.
No persistent viewer server is required.
