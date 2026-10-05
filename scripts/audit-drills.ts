import { any_circuit_element, type AnyCircuitElement } from "circuit-json";
import { computeClearanceBetweenElements } from "@tscircuit/circuit-json-util";
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const pads = circuit.filter((element) => element.type === "pcb_smtpad");
const measurements: { drill: string; pad: string; gap: number }[] = [];
for (const element of circuit) {
	if (
		element.type !== "pcb_via" &&
		element.type !== "pcb_hole" &&
		element.type !== "pcb_plated_hole"
	)
		continue;
	let drill: AnyCircuitElement;
	let id: string;
	if (element.type === "pcb_hole") {
		drill = element;
		id = element.pcb_hole_id;
	} else if (element.type === "pcb_via") {
		id = element.pcb_via_id;
		drill = {
			type: "pcb_hole",
			pcb_hole_id: id,
			x: element.x,
			y: element.y,
			hole_shape: "circle",
			hole_diameter: element.hole_diameter,
		};
	} else {
		id = element.pcb_plated_hole_id;
		if (element.shape !== "pill")
			throw new Error(`Unsupported plated drill shape ${element.shape}`);
		drill = {
			type: "pcb_smtpad",
			pcb_smtpad_id: id,
			shape: "rotated_pill",
			x: element.x,
			y: element.y,
			width: element.hole_width,
			height: element.hole_height,
			radius: Math.min(element.hole_width, element.hole_height) / 2,
			ccw_rotation: element.ccw_rotation ?? 0,
			layer: "top",
		};
	}
	for (const pad of pads)
		measurements.push({
			drill: id,
			pad: pad.pcb_smtpad_id,
			gap: computeClearanceBetweenElements(drill, pad),
		});
}
measurements.sort((a, b) => a.gap - b.gap);
await Bun.write(
	"evidence/R2/drill-pad-clearances.json",
	JSON.stringify(measurements.slice(0, 50), null, 2),
);
console.log(
	"Minimum physical drill-to-SMT-pad gap (all nets and both layers):",
	measurements[0],
);
if (measurements.some((m) => m.gap < 0.2 - 1e-6))
	throw new Error("Drill/pad gap below 0.2 mm");
