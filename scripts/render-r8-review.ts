import {
	convertCircuitJsonToPcbSvg,
	convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg";
import { any_circuit_element } from "circuit-json";
import { Resvg } from "@resvg/resvg-js";
import { z } from "zod";

const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const evidenceDirectory = z
	.string()
	.min(1)
	.parse(Bun.argv[2] ?? "evidence/R8-prototype-2026-10-05");
const directory = `${evidenceDirectory}/visual-review`;
for (const layer of ["top", "bottom"] as const) {
	const svg = convertCircuitJsonToPcbSvg(circuit, {
		layer,
		width: 1600,
		height: 1800,
		showCourtyards: true,
		matchBoardAspectRatio: true,
	});
	await Bun.write(`${directory}/pcb-${layer}.svg`, svg);
	await Bun.write(
		`${directory}/pcb-${layer}.png`,
		new Resvg(svg).render().asPng(),
	);
	const gerberSvg = await Bun.file(
		`${evidenceDirectory}/final-readback/${layer === "top" ? "F" : "B"}_Cu.svg`,
	).text();
	await Bun.write(
		`${directory}/gerber-${layer}.png`,
		new Resvg(gerberSvg, {
			background: "white",
			fitTo: { mode: "width", value: 1600 },
		})
			.render()
			.asPng(),
	);
}
for (const sheet of circuit.filter((e) => e.type === "schematic_sheet")) {
	// Read-only detail view omits page furniture; complete native A4 files stay in dist.
	const detail = circuit.filter(
		(e) =>
			!e.type.startsWith("schematic_") ||
			(e.type !== "schematic_sheet" &&
				"schematic_sheet_id" in e &&
				e.schematic_sheet_id === sheet.schematic_sheet_id),
	);
	const svg = convertCircuitJsonToSchematicSvg(detail, {
		width: 1800,
		height: 1200,
	});
	await Bun.write(`${directory}/${sheet.name}-detail.svg`, svg);
	await Bun.write(
		`${directory}/${sheet.name}-detail.png`,
		new Resvg(svg).render().asPng(),
	);
}
