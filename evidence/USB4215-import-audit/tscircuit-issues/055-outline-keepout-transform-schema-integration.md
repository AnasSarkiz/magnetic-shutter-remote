# Outline keepout transform assumed a nonexistent centre

Status: **fixed locally**. Classification: confirmed schema/utility integration defect in the preserved local versions; no supplier footprint error.

## Affected versions and component context

@tscircuit/circuit-json-util 0.0.117, circuit-json 0.0.509. Found rebuilding the local polygon-paste support. An outline keepout is a native PCB feature, not an electronic component; manufacturer/C-number are N/A for the primitive. USB4215-03-A / C37616412 is the qualification context, not the cause.

## Minimal reproduction, input and command

[Regression input/test](../toolchain/circuit-json-util/tests/transform-paste-polygon.test.ts) uses a schema-valid three-point outline and a polygon aperture. From `toolchain/circuit-json-util`:

```sh
bun run build
bun test tests/transform-paste-polygon.test.ts
```

No board or custom electronic footprint is required.

## Expected and actual

The canonical circuit-json schema defines outline keepouts by outline points, without a center. Transform every point using the existing transformation-matrix operation. Original declaration build fails with TS2339: `Property 'center' does not exist` on the outline member of the keepout union, at transform-soup-elements.ts:176. [Exact failing build log](../logs/circuit-json-util-build.log).

## Evidence and root cause

Confirmed: the existing pcb_keepout branch unconditionally reads/writes center. The schema's outline variant has no center. This pre-existing incompatibility became visible during the new build; adding paste did not create the missing field. Polygon paste also needs its world points transformed together with its bounding centre, rather than moving only a centre. [Source patch](../patches/circuit-json-util.patch) and [source hashes](../source-change-ledger.json) retain before/after code. No screenshot is applicable to this typed/data transform; exact point comparisons replace a visual inference.

## Impact, fix and verification

Can block declaration builds and mis-handle recentered outline keepouts; a misplaced keepout can affect physical geometry and RF intent. The fix branches on shape===outline and transforms outline points; other keepout centres retain their existing path. Polygon paste points use the same canonical transform.

Regression checks translation plus Y inversion, expecting points (−1,1),(1,1),(0,−1), with paste centre (0,0). Two assertions pass; declaration build passes. [Final regression](../logs/focused-util-final.log), [build](../logs/circuit-json-util-qualified-source-build.log). No R5 keepout or board was rebuilt/changed, and no upstream release is claimed.
