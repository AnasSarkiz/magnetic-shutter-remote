import { any_circuit_element } from "circuit-json";
import { strict as assert } from "node:assert";

const base = "dist/fixtures/r7";
const original = any_circuit_element
	.array()
	.parse(await Bun.file(`${base}/component-audit/circuit.json`).json());
const styled = any_circuit_element
	.array()
	.parse(await Bun.file(`${base}/led-stencil-audit/circuit.json`).json());
const quantizationMm = 0.00005; // Numerical import rounding, not a fabrication tolerance.
const withinDrawing = (actual: number, nominal: number) =>
	Math.abs(actual - nominal) <= 0.1 + quantizationMm;
const rows = [];
for (const name of ["D1", "D2"]) {
	const a = original.find(
		(e) => e.type === "source_component" && e.name === name,
	);
	const b = styled.find(
		(e) => e.type === "source_component" && e.name === name,
	);
	assert(a?.type === "source_component" && b?.type === "source_component");
	assert.deepEqual(a.supplier_part_numbers, b.supplier_part_numbers);
	assert.equal(a.manufacturer_part_number, b.manufacturer_part_number);
	const component = styled.find(
		(e) =>
			e.type === "pcb_component" &&
			e.source_component_id === b.source_component_id,
	);
	assert(component?.type === "pcb_component");
	const pads = styled.filter(
		(e) =>
			e.type === "pcb_smtpad" &&
			e.pcb_component_id === component.pcb_component_id,
	);
	assert.equal(pads.length, 2);
	for (const pad of pads) {
		assert(pad.type === "pcb_smtpad" && pad.shape === "rect");
		assert(withinDrawing(pad.width, 0.55) && withinDrawing(pad.height, 1.35));
		const paste = styled.find(
			(e) =>
				e.type === "pcb_solder_paste" && e.pcb_smtpad_id === pad.pcb_smtpad_id,
		);
		assert(paste?.type === "pcb_solder_paste" && paste.shape === "rect");
		assert(
			withinDrawing(paste.width, 0.45) && withinDrawing(paste.height, 1.25),
		);
		const areaRatio80um =
			(paste.width * paste.height) / (2 * (paste.width + paste.height) * 0.08);
		assert(areaRatio80um > 0.66);
		const pcbPort = styled.find(
			(e) => e.type === "pcb_port" && e.pcb_port_id === pad.pcb_port_id,
		);
		assert(pcbPort?.type === "pcb_port");
		const port = styled.find(
			(e) =>
				e.type === "source_port" && e.source_port_id === pcbPort.source_port_id,
		);
		assert(port?.type === "source_port");
		assert.equal(
			port.pin_number === 1 ? "C" : "A",
			port.port_hints?.find((hint) => ["A", "C"].includes(hint)),
		);
		rows.push({
			name,
			pin: port.pin_number,
			copper: { width: pad.width, height: pad.height },
			paste: { width: paste.width, height: paste.height },
			areaRatio80um,
		});
	}
}
const defaultPaste = original
	.filter((e) => e.type === "pcb_solder_paste")
	.slice(0, 4);
assert(
	defaultPaste.every(
		(e) =>
			e.type === "pcb_solder_paste" &&
			e.shape === "rect" &&
			!withinDrawing(e.height, 1.25),
	),
);
assert(!styled.some((e) => e.type === "pcb_trace"));
assert(!styled.some((e) => e.type.includes("error")));
const report = {
	status: "PASS — ISOLATED LED GEOMETRY FIXTURE ONLY",
	manufacturerReference:
		"OSRAM GW VJLPL1.CM v1.4, 2025-01-16, p16 and p23 note9",
	quantizationMm,
	rows,
	defaultPaste: defaultPaste.map((e) =>
		e.type === "pcb_solder_paste" && e.shape === "rect"
			? { width: e.width, height: e.height }
			: null,
	),
	limitations: [
		"No loaded circuit or product layout audited",
		"No supplier LED 3D model available",
		"Driver selection, thermal design and low-brightness current remain unresolved",
		"Stencil thickness is an 80 um candidate, not an assembler approval",
	],
};
await Bun.write(
	"evidence/R7-components/led-fixture-audit.json",
	JSON.stringify(report, null, 2),
);
console.log(report.status);
