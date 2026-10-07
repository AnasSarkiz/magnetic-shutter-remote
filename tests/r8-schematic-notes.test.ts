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

test("every explanation is rendered on the same native A4 page as its component", () => {
	const sheets = circuit.filter(
		(element) => element.type === "schematic_sheet",
	);
	expect(sheets).toHaveLength(3);
	expect(sheets.map((sheet) => sheet.name).sort()).toEqual(["Power", "Protection", "Radio"]);
	for (const [sheetName, componentNotes] of Object.entries(
		componentNotesBySheet,
	)) {
		const diagram = sheets.find((sheet) => sheet.name === sheetName);
		expect(diagram).toBeDefined();
		if (!diagram)
			throw new Error(`Missing ${sheetName} diagram`);
		expect(diagram.sheet_size).toBe("a4");
		const diagramTexts = circuit
			.filter((element) => element.type === "schematic_text")
			.filter(
				(element) => element.schematic_sheet_id === diagram.schematic_sheet_id,
			);
		for (const [reference, , firstLine, secondLine] of componentNotes) {
			for (const text of [`${reference}: ${firstLine}`, secondLine]) {
				expect(diagramTexts.some((element) => element.text === text)).toBe(true);
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
