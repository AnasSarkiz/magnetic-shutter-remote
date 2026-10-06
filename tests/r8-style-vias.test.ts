import { expect, test } from "bun:test";
import { any_circuit_element } from "circuit-json";
import { z } from "zod";

const records = await Bun.file("dist/index/circuit.json").json();
const circuit = any_circuit_element.array().parse(records);
const rawRoutes = z
	.array(
		z.object({
			type: z.string(),
			route: z
				.array(
					z.object({
						route_type: z.string(),
						via_diameter: z.number().optional(),
						via_hole_diameter: z.number().optional(),
					}),
				)
				.optional(),
		}),
	)
	.parse(
		z
			.array(z.object({ type: z.string() }).passthrough())
			.parse(records)
			.filter((record) => record.type === "pcb_trace"),
	);

test("R8 has only outer copper and 0.30/0.45 mm through vias", () => {
	const board = circuit.find((element) => element.type === "pcb_board");
	if (!board || board.type !== "pcb_board") throw new Error("Missing board");
	expect(board.num_layers).toBe(2);
	const vias = circuit.filter((element) => element.type === "pcb_via");
	expect(vias.length).toBeGreaterThan(0);
	for (const via of vias) {
		expect(via.hole_diameter).toBeCloseTo(0.3, 8);
		expect(via.outer_diameter).toBeCloseTo(0.45, 8);
		expect([...via.layers].sort()).toEqual(["bottom", "top"]);
	}
	const traces = circuit.filter((element) => element.type === "pcb_trace");
	expect(traces.length).toBeGreaterThan(0);
	for (const trace of traces) {
		for (const point of trace.route) {
			if (point.route_type === "wire")
				expect(["top", "bottom"]).toContain(point.layer);
			if (point.route_type === "via") {
				expect(
					vias.some(
						(via) =>
							Math.abs(via.x - point.x) < 1e-8 &&
							Math.abs(via.y - point.y) < 1e-8,
					),
				).toBe(true);
				expect([point.from_layer, point.to_layer].sort()).toEqual([
					"bottom",
					"top",
				]);
			}
		}
	}
	for (const trace of rawRoutes.filter(
		(element) => element.type === "pcb_trace",
	)) {
		for (const point of trace.route ?? []) {
			if (point.route_type === "via") {
				if (point.via_hole_diameter !== undefined)
					expect(point.via_hole_diameter).toBeCloseTo(0.3, 8);
				if (point.via_diameter !== undefined)
					expect(point.via_diameter).toBeCloseTo(0.45, 8);
			}
		}
	}
});

test("native USB-C symbol preserves the qualified connector's physical ports", () => {
	const usb = circuit.find(
		(element) => element.type === "source_component" && element.name === "J1",
	);
	if (
		!usb ||
		usb.type !== "source_component" ||
		usb.ftype !== "simple_connector"
	)
		throw new Error("Missing J1");
	expect(usb.standard).toBe("usb_c");
	const ports = circuit
		.filter((element) => element.type === "source_port")
		.filter(
			(element) => element.source_component_id === usb.source_component_id,
		);
	expect(
		ports.map((port) => port.pin_number).sort((a, b) => (a ?? 0) - (b ?? 0)),
	).toEqual(Array.from({ length: 16 }, (_, index) => index + 13));
	for (const port of ports) {
		expect(
			circuit.some(
				(element) =>
					element.type === "pcb_port" &&
					element.source_port_id === port.source_port_id,
			),
		).toBe(true);
	}
	const symbol = circuit.find(
		(element) =>
			element.type === "schematic_component" &&
			element.source_component_id === usb.source_component_id,
	);
	if (!symbol || symbol.type !== "schematic_component")
		throw new Error("Missing USB schematic");
	expect(
		circuit.filter(
			(element) =>
				element.type === "schematic_path" &&
				element.schematic_component_id === symbol.schematic_component_id,
		).length,
	).toBeGreaterThan(0);
});
