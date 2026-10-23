import { expect, test } from "bun:test";
import { z } from "zod";
import { inspectImport } from "../scripts/lib/import-geometry";

const reviewDirectory = "evidence/R8-toolchain-refresh-2026-10-23";
const comparisons = z
	.array(
		z.object({
			jlcpcb: z.string(),
			freshPath: z.string(),
			mpnMatches: z.boolean(),
			pinLabelsMatch: z.boolean(),
			copperDrillGeometryExactlyMatches: z.boolean(),
			copperDrillAndProcessAttributesExactlyMatch: z.boolean(),
		}),
	)
	.parse(await Bun.file(`${reviewDirectory}/geometry-comparison.json`).json());

function exactPart(partNumber: string) {
	const part = comparisons.find((candidate) => candidate.jlcpcb === partNumber);
	if (!part) throw new Error(`Missing exact part: ${partNumber}`);
	return part;
}

test("all 25 fresh imports retain exact identities, pins and copper/drills", () => {
	expect(comparisons).toHaveLength(25);
	for (const part of comparisons) {
		expect(part.mpnMatches).toBe(true);
		expect(part.pinLabelsMatch).toBe(true);
		expect(part.copperDrillGeometryExactlyMatches).toBe(true);
	}
});

test("USB4215 exact import must preserve all 16 explicit paste apertures", async () => {
	const imported = inspectImport(
		await Bun.file(exactPart("C37616412").freshPath).text(),
	);
	expect(
		imported.features.filter((f) => f.element === "solderpaste"),
	).toHaveLength(16);
});

for (const partNumber of [
	"C56594",
	"C19949072",
	"C15516",
	"C37616412",
	"C160402",
	"C160389",
	"C393942",
]) {
	test(`${partNumber} must preserve supplier paste/mask settings`, () => {
		expect(
			exactPart(partNumber).copperDrillAndProcessAttributesExactlyMatch,
		).toBe(true);
	});
}

for (const partNumber of ["C37616412", "C160402", "C160389"]) {
	test(`${partNumber} must remain a native connector`, async () => {
		const imported = inspectImport(
			await Bun.file(exactPart(partNumber).freshPath).text(),
		);
		expect(imported.counts.connector ?? 0).toBe(1);
	});
}

test("USB4215 must retain its verified mating direction", async () => {
	const imported = inspectImport(
		await Bun.file(exactPart("C37616412").freshPath).text(),
	);
	expect(imported.insertionDirection).toBe("from_bottom");
});

test("MSK12C02 must preserve its explicit SPDT switching semantics", async () => {
	const imported = inspectImport(
		await Bun.file(exactPart("C431540").freshPath).text(),
	);
	expect(imported.switchType).toBe("spdt");
});
