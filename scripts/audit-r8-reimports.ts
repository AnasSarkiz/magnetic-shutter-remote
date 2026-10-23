import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import { z } from "zod";
import {
	featureSignatures,
	copperDrillFeatures,
	inspectImport,
	literalSignature,
} from "./lib/import-geometry";

const reviewDirectory = "evidence/R8-toolchain-refresh-2026-10-23";
const components = z
	.array(z.object({ path: z.string(), jlcpcb: z.string(), mpn: z.string() }))
	.parse(await Bun.file(`${reviewDirectory}/components.json`).json());
const freshFiles = await readdir(`${reviewDirectory}/fresh/imports`, {
	recursive: true,
});
const results = [];
for (const component of components) {
	const originalSource = await Bun.file(
		`${reviewDirectory}/original/${component.path}`,
	).text();
	const candidates = [];
	for (const filename of freshFiles.filter((filename) =>
		filename.endsWith(".tsx"),
	)) {
		const path = `${reviewDirectory}/fresh/imports/${filename}`;
		const source = await Bun.file(path).text();
		if (source.includes(`"${component.jlcpcb}"`))
			candidates.push({ path, source });
	}
	if (candidates.length !== 1)
		throw new Error(`${component.jlcpcb}: expected one exact import`);
	const fresh = candidates[0];
	const original = inspectImport(originalSource);
	const imported = inspectImport(fresh.source);
	const originalCopper = original.features.filter(
		(feature) => feature.element !== "solderpaste",
	);
	const importedCopper = imported.features.filter(
		(feature) => feature.element !== "solderpaste",
	);
	const result = {
		...component,
		freshPath: fresh.path,
		copperDrillGeometryExactlyMatches:
			JSON.stringify(
				featureSignatures(copperDrillFeatures(original.features)),
			) ===
			JSON.stringify(featureSignatures(copperDrillFeatures(imported.features))),
		freshSha256: createHash("sha256").update(fresh.source).digest("hex"),
		mpnMatches: fresh.source.includes(
			`manufacturerPartNumber="${component.mpn}"`,
		),
		copperDrillAndProcessAttributesExactlyMatch:
			JSON.stringify(featureSignatures(originalCopper)) ===
			JSON.stringify(featureSignatures(importedCopper)),
		pinLabelsMatch:
			literalSignature(original.declarations.pinLabels) ===
			literalSignature(imported.declarations.pinLabels),
		original,
		imported,
	};
	results.push(result);
	console.log(
		`${component.jlcpcb}: copper/drill/process exact=${result.copperDrillAndProcessAttributesExactlyMatch}; pins=${result.pinLabelsMatch}; paste=${original.counts.solderpaste ?? 0} -> ${imported.counts.solderpaste ?? 0}`,
	);
}
await Bun.write(
	`${reviewDirectory}/geometry-comparison.json`,
	`${JSON.stringify(results, null, 2)}\n`,
);
