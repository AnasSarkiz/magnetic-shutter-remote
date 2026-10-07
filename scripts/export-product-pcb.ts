import { dimensions } from "../product/dimensions";
import { pcbModelInAssemblyCoordinates } from "./normalize-pcb-model";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { any_circuit_element } from "circuit-json";
import { convertCircuitJsonToGltf } from "circuit-json-to-gltf";

// Presentation fragments from one qualified circuit; never rewrite circuit.json.
// Keep native-upload assets under2.4MB while preserving one board and all44 models.
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const models = circuit.filter((element) => element.type === "cad_component");
if (models.length !== 44) throw new Error("Expected44 fitted CAD models");
for (const [index, filename] of [
	"r8-pcb.glb",
	"r8-parts-2.glb",
	"r8-parts-3.glb",
	"r8-parts-4.glb",
	"r8-parts-5.glb",
	"r8-parts-6.glb",
	"r8-parts-7.glb",
].entries()) {
	const selected = new Set(
		models
			.slice(index * 7, (index + 1) * 7)
			.map((element) => element.cad_component_id),
	);
	const fragment = circuit.filter((element) =>
		element.type === "cad_component"
			? selected.has(element.cad_component_id)
			: index === 0 ||
				element.type === "source_component" ||
				element.type === "pcb_component",
	);
	const glb = await convertCircuitJsonToGltf(fragment, {
		format: "glb",
		boardTextureResolution: 512,
		projectBaseUrl: pathToFileURL(`${resolve(".")}/`).href,
	});
	if (!(glb instanceof ArrayBuffer))
		throw new Error("Expected native binary GLB");
	const normalized = pcbModelInAssemblyCoordinates(glb, {
		rotationDegrees: dimensions.remote.ccwRotationDegrees,
	});
	if (normalized.length > 2_400_000)
		throw new Error(`Native asset exceeds upload bound: ${filename}`);
	await Bun.write(`product/models/${filename}`, normalized);
	console.log(
		`Native ${filename}: ${normalized.length} bytes,${selected.size} real fitted models`,
	);
}
