import { any_circuit_element } from "circuit-json";
import {
	convertCircuitJsonToPickAndPlaceCsv,
	convertCircuitJsonToPickAndPlaceRows,
	registerSupplierTerminals,
} from "circuit-json-to-pnp-csv";
import {
	convertCircuitJsonToBomRows,
	convertBomRowsToCsv,
} from "circuit-json-to-bom-csv";
import { z } from "zod";
const [assemblyDirectory, evidenceDirectory] = z
	.tuple([z.string().min(1), z.string().min(1)])
	.parse(
		Bun.argv.length === 2 ? ["fabrication", "evidence/R3"] : Bun.argv.slice(2),
	);
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const bom = z
	.object({
		parts: z.array(
			z.object({
				reference_designators: z.array(z.string()),
				manufacturer: z.string(),
				manufacturer_part_number: z.string(),
				package: z.string(),
				lcsc: z.string(),
				value: z.string(),
			}),
		),
	})
	.parse(await Bun.file("bom.json").json());
const rows = await convertCircuitJsonToBomRows({
	circuitJson: circuit,
	resolvePart: async ({ source_component }) => {
		const part = bom.parts.find((part) =>
			part.reference_designators.includes(source_component.name),
		);
		if (!part)
			throw new Error(`No qualified BOM entry for ${source_component.name}`);
		if (
			source_component.manufacturer_part_number !==
				part.manufacturer_part_number ||
			!source_component.supplier_part_numbers?.jlcpcb?.includes(part.lcsc)
		)
			throw new Error(`BOM identity mismatch: ${source_component.name}`);
		return {
			footprint: part.package,
			comment: part.manufacturer_part_number,
			part_number: part.lcsc,
			supplier_part_number_columns: { "JLCPCB Part #": part.lcsc },
			manufacturer_mpn_pairs: [
				{ manufacturer: part.manufacturer, mpn: part.manufacturer_part_number },
			],
		};
	},
});
const supplierCircuit = any_circuit_element
	.array()
	.parse(
		await Bun.file("evidence/USB4215-import-audit/final/circuit.json").json(),
	);
const supplierFootprint = {
	supplier: "jlcpcb",
	circuitJson: supplierCircuit,
} as const;
const sideSwitchFootprint = {
	supplier: "jlcpcb",
	circuitJson: any_circuit_element
		.array()
		.parse(
			await Bun.file(
				"evidence/R8-side-shutter-2026-10-05/qualification/supplier-reference/circuit.json",
			).json(),
		),
} as const;
const options = {
	supplier: "jlcpcb",
	requireSupplierRotation: true,
	supplierFootprints: {
		C37616412: supplierFootprint,
		C393942: sideSwitchFootprint,
	},
} as const;
const j1Source = circuit.find(
	(element) => element.type === "source_component" && element.name === "J1",
);
if (!j1Source || j1Source.type !== "source_component")
	throw new Error("J1 source absent");
const j1 = circuit.find(
	(element) =>
		element.type === "pcb_component" &&
		element.source_component_id === j1Source?.source_component_id,
);
if (!j1 || j1.type !== "pcb_component") throw new Error("J1 placement absent");
const registration = registerSupplierTerminals({
	circuitJson: circuit,
	pcbComponent: j1,
	supplierFootprint,
});
await Bun.write(
	`${evidenceDirectory}/J1-supplier-terminal-registration.json`,
	JSON.stringify(registration, null, 2),
);
const switchSource = circuit.find(
	(element) => element.type === "source_component" && element.name === "SW2",
);
if (!switchSource || switchSource.type !== "source_component")
	throw new Error("SW2 source absent");
const switchPlacement = circuit.find(
	(element) =>
		element.type === "pcb_component" &&
		element.source_component_id === switchSource.source_component_id,
);
if (!switchPlacement || switchPlacement.type !== "pcb_component")
	throw new Error("SW2 placement absent");
const switchRegistration = registerSupplierTerminals({
	circuitJson: circuit,
	pcbComponent: switchPlacement,
	supplierFootprint: sideSwitchFootprint,
});
if (
	switchRegistration.rotationDegrees !== 270 ||
	switchRegistration.terminalCount !== 4
)
	throw new Error("Side-actuator supplier rotation/terminal coverage differs");
await Bun.write(
	`${evidenceDirectory}/SW2-supplier-terminal-registration.json`,
	JSON.stringify(switchRegistration, null, 2),
);
const placement = convertCircuitJsonToPickAndPlaceRows(circuit, options);
const expected = circuit
	.filter((element) => element.type === "source_component")
	.map((element) => element.name)
	.sort();
if (
	JSON.stringify(placement.map((row) => row.designator).sort()) !==
	JSON.stringify(expected)
)
	throw new Error("Placement coverage mismatch");
if (placement.some((row) => row.layer !== "top"))
	throw new Error(
		"Single-side assembly requires every fitted component on top",
	);
await Bun.write(
	`${assemblyDirectory}/JLCPCB-BOM.csv`,
	convertBomRowsToCsv(rows),
);
await Bun.write(
	`${assemblyDirectory}/JLCPCB-CPL.csv`,
	convertCircuitJsonToPickAndPlaceCsv(circuit, options),
);
await Bun.write(
	`${evidenceDirectory}/assembly-rotations.json`,
	JSON.stringify(placement, null, 2),
);
console.log(
	`${placement.length} fitted references; strict JLCPCB rotation metadata resolved for every part.`,
);
