# Local USB4215 qualification issue index

These reports extend the preserved project index without modifying protected R4/R5 documentation. Previous reports remain available through the [R1–R5 index](../../../tscircuit-issues/README.md) and the [frozen replacement-search index](../../USB-replacement-search-2026-10-03/continued-search/tscircuit-issues/README.md). No external issues were filed.

| Issue | Affected packages | Status | Classification/report |
|---|---|---|---|
|018 | Gerbonara 1.5.0 / pcb-tools 0.1.6 | confirmed limitation; alternative reader verified | [USB4215 slot readback supplement](018-g85-reader-limitation-usb4215-supplement.md) |
|053 | easyeda; circuit-json; props; util; core; SVG; Gerber | fixed locally; general suite blocked | [Paste-region pipeline](053-explicit-paste-regions-local-fix.md) |
|054 | easyeda 0.0.364 | fixed locally | [PAD paste expansion loss](054-pad-paste-expansion-dropped.md) |
|055 | circuit-json-util 0.0.117 / circuit-json 0.0.509 | fixed locally | [Outline keepout transform integration](055-outline-keepout-transform-schema-integration.md) |
|056 | easyeda 0.0.364 | fixed locally | [PAD mask expansion loss](056-pad-mask-expansion-dropped.md) |
|057 | isolated fixture dependency graph | fixed locally | [Project router override mismatch; not confirmed upstream bug](057-blanket-router-override-incompatible-with-fanout.md) |
|058 | core 0.0.2035 R4/R5 local test | fixed locally | [Stale local plated-hole paste test](058-plated-hole-paste-test-stale-after-r4-policy.md) |
|059 | isolated full importer test graph | suspected residual compatibility/expectation failures; gate blocked | [Untriaged full-suite cases and evidence](059-full-importer-suite-residual-failures.md) |

Supplier stencil suitability and undocumented manufacturer/assembler process coverage are external qualification limitations, not tscircuit bugs. The remaining 33 importer-suite failure cases and exact logs are retained in [unresolved-suite-failures.json](../logs/unresolved-suite-failures.json); they are not all relabelled as newly discovered bugs merely because their names fail.
