import { expect, test } from "bun:test";
import { any_circuit_element } from "circuit-json";
import { z } from "zod";
import { componentNotesBySheet } from "../src/schematic-component-notes";

const bom = z
	.object({
		parts: z.array(z.object({ reference_designators: z.array(z.string()) })),
	})
	.parse(await Bun.file("bom.json").json());
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());

test("component explanations cover every fitted BOM reference exactly once", () => {
	const fittedReferences = bom.parts.flatMap(
		(part) => part.reference_designators,
	);
	const explainedReferences = Object.values(componentNotesBySheet).flatMap(
		(componentNotes) => componentNotes.map(([reference]) => reference),
	);
	expect(new Set(explainedReferences).size).toBe(explainedReferences.length);
	expect([...fittedReferences].sort()).toEqual([...explainedReferences].sort());
});

test("every explanation is actually rendered on its matching native A4 guide", () => {
	const sheets = circuit.filter(
		(element) => element.type === "schematic_sheet",
	);
	expect(sheets).toHaveLength(6);
	for (const [sheetName, componentNotes] of Object.entries(
		componentNotesBySheet,
	)) {
		const diagram = sheets.find((sheet) => sheet.name === sheetName);
		const guide = sheets.find((sheet) => sheet.name === `${sheetName}Guide`);
		expect(diagram).toBeDefined();
		expect(guide).toBeDefined();
		if (!diagram || !guide)
			throw new Error(`Missing ${sheetName} diagram/guide`);
		expect(guide.sheet_size).toBe("a4");
		const guideTexts = circuit
			.filter((element) => element.type === "schematic_text")
			.filter(
				(element) => element.schematic_sheet_id === guide.schematic_sheet_id,
			);
		for (const [reference, title, firstLine, secondLine] of componentNotes) {
			for (const text of [`${reference}: ${title}`, firstLine, secondLine]) {
				expect(guideTexts.some((element) => element.text === text)).toBe(true);
			}
			const component = circuit.find(
				(element) =>
					element.type === "source_component" && element.name === reference,
			);
			if (!component || component.type !== "source_component")
				throw new Error(`Missing ${reference}`);
			expect(
				circuit.some(
					(element) =>
						element.type === "schematic_component" &&
						element.source_component_id === component.source_component_id &&
						element.schematic_sheet_id === diagram.schematic_sheet_id,
				),
			).toBe(true);
		}
	}
});
