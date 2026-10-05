import { Resvg } from "@resvg/resvg-js";
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg";
import { any_circuit_element } from "circuit-json";
import { createHash } from "node:crypto";
const circuitPath = "dist/index/circuit.json";
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file(circuitPath).json());
const bottom = convertCircuitJsonToPcbSvg(circuit, {
	layer: "bottom",
	width: 1100,
	height: 1700,
});
await Bun.write("dist/index/pcb-bottom.svg", bottom);
await Bun.write(
	"dist/index/pcb-bottom.png",
	new Resvg(bottom).render().asPng(),
);
const outputs = [
	"circuit.json",
	"pcb.svg",
	"pcb.png",
	"pcb-bottom.svg",
	"pcb-bottom.png",
	"schematic.svg",
	"schematic_sheet_0.svg",
	"schematic_sheet_0.png",
	"schematic_sheet_1.svg",
	"schematic_sheet_1.png",
	"schematic_sheet_2.svg",
	"schematic_sheet_2.png",
	"3d.png",
	"3d.glb",
];
const hashes: Record<string, string> = {};
for (const filename of outputs)
	hashes[filename] = createHash("sha256")
		.update(Buffer.from(await Bun.file(`dist/index/${filename}`).arrayBuffer()))
		.digest("hex");
await Bun.write(
	Bun.argv[2] ?? "evidence/R6/current-preview-outputs.json",
	JSON.stringify(
		{
			circuit_sha256: hashes["circuit.json"],
			outputs: hashes,
			excluded_legacy_files: [
				"board.glb",
				"final-pcb-bottom.png",
				"final-schematic-sheet-0.png",
				"final-schematic-sheet-1.png",
				"final-schematic-sheet-2.png",
			],
		},
		null,
		2,
	),
);
