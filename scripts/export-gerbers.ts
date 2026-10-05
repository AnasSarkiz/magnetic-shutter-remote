import { any_circuit_element } from "circuit-json";
import { convertCircuitJsonToGerberFiles } from "circuit-json-to-gerber";
import { z } from "zod";

const [inputPath, outputDirectory] = z
	.tuple([z.string().min(1), z.string().min(1)])
	.parse(Bun.argv.slice(2));
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file(inputPath).json());
const files = convertCircuitJsonToGerberFiles(circuit);
for (const [filename, contents] of Object.entries(files)) {
	await Bun.write(`${outputDirectory}/${filename}`, contents);
}
console.log(
	`${Object.keys(files).length} original Gerber/Excellon outputs from ${inputPath}`,
);
