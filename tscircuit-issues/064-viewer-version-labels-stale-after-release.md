# Native viewer version labels retain the preceding release number

**Status: confirmed. Classification: published build metadata/version-label mismatch; no geometry failure established.**

Affected: @tscircuit/pcb-viewer1.11.415 and @tscircuit/3d-viewer0.0.610. Their installed package.json versions differ from package metadata embedded in dist/index.js:1.11.414 and0.0.609 respectively. Source commits of these published packages were not established; no local viewer source fix is claimed. Schematic viewer2.0.99 unaffected in this observation.

Reproduce: install the exact packages, display native PCBViewer/CadViewer at localhost:3028 using `preview/main.tsx`, compare the visible footer with installed package.json. Required inputs: final `dist/index/circuit.json`, pinned runframe package manifest, preview files. Source/measurement snippets: [version evidence](../evidence/R6/viewer-version-labels.json). Same mismatch is visible without any particular component; discovered while reviewing GCTUSB4215-03-A/C37616412, [manufacturer](https://gct.co/connector/usb4215).

Expected: installed package version and displayed version agree. Actual: native labels display the preceding version. Confirmed root-cause fact: stale literal package_default.version in the published JavaScript bundle. Hypothesis: release bumps package.json after building; release pipeline not audited, so this explanation is unconfirmed.

Impact: may misidentify viewer evidence/tool versions; no PCB/CAM/assembly impact proven. R6records actual installed versions separately from visible labels. No generated bundle was edited, version label hidden or warning suppressed. [Review record](../evidence/R6/VISUAL-REVIEW.md), [full PCB image](../dist/index/pcb.png), [3D](../dist/index/3d.png). Fix/tests: none; upstream release-metadata repair remains open. No GitHub issue/publication created.
