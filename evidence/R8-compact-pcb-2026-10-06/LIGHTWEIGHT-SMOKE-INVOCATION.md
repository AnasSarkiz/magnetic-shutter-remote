# Explicit test-path selection for the saved lightweight smoke

After successful pinned setup, the previous `bun test tests/r8-power-metadata.test.ts` invocation failed before executing assertions: `Cannot find module .../tests/r8-power-metadata.test.ts from ''`. The file exists and direct importing resolves it. The supported explicit file invocation `bun test ./tests/r8-power-metadata.test.ts` selects the file directly. Diagnostic logs retain both runs; no dependency upgrade, test suppression or alternate evaluator is used. Save this exact path in cloud/smoke.sh; setup/start continue to call the same lightweight scripts. The memory guard and frozen test/import inputs are unchanged.

This is a hosted test-command resolution failure, not a PCB connection defect. Final complete smoke output must pass after this correction.
