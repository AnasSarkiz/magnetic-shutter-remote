import { expect, test } from "bun:test";
import { any_circuit_element } from "circuit-json";
import { z } from "zod";
import { dimensions, pcbPointInProduct } from "../product/dimensions";

test("native product views preserve the board transform and create no second PCB", async () => {
	for (const name of ["product.assembly", "product.exploded"]) {
		const circuit = any_circuit_element
			.array()
			.parse(await Bun.file(`dist/${name}/circuit.json`).json());
		expect(
			circuit.filter((element) => element.type === "pcb_board"),
		).toHaveLength(0);
		expect(
			circuit.filter((element) => element.type === "pcb_trace"),
		).toHaveLength(0);
		expect(
			circuit.filter((element) => element.type.includes("error")),
		).toHaveLength(0);
		const board = circuit.find(
			(element) =>
				element.type === "source_component" &&
				element.name === "R8QualifiedPCBAndFittedParts1",
		);
		if (board?.type !== "source_component")
			throw new Error("Missing actual PCB assembly");
		const cad = circuit.find(
			(element) =>
				element.type === "cad_component" &&
				element.source_component_id === board.source_component_id,
		);
		if (cad?.type !== "cad_component")
			throw new Error("Missing real PCB model");
		expect(cad.position).toEqual({
			x: dimensions.remote.centerXMm,
			y: dimensions.remote.centerYMm,
			z: dimensions.pcb.centerZMm + (name === "product.exploded" ? 26 : 0),
		});
		expect(cad.rotation).toEqual({ x: 0, y: 0, z: 0 });
		expect(cad.model_glb_url).toContain("r8-pcb.glb");
		expect(cad.model_unit_to_mm_scale_factor).toBe(1);
		expect(cad.model_board_normal_direction).toBe("y+");
	}
});

test("all real electronic envelopes fit, magnetic datum clearance and solid separation pass", async () => {
	const review = z
		.object({
			clashes: z.array(z.unknown()),
			electronicEnvelopeClashes: z.array(z.unknown()),
			phoneClearanceViolations: z.array(z.unknown()),
			fittedComponentEnvelopesChecked: z.number(),
			boardEnvelopeChecked: z.boolean(),
			containmentReview: z.object({
				boardOutsideVolumeMm3: z.number(),
				batteryOutsideVolumeMm3: z.number(),
			}),
			mountingReview: z.array(
				z.object({ lowerSeatAndUpperPillarVerified: z.boolean() }),
			),
			shutterAlignment: z.object({
				freeGapMm: z.number(),
				centerYMm: z.number(),
				centerZMm: z.number(),
			}),
			parts: z.array(
				z.object({ name: z.string(), boundsMm: z.array(z.array(z.number())) }),
			),
		})
		.parse(await Bun.file("product/geometry-review.json").json());
	expect(review.clashes).toEqual([]);
	expect(review.electronicEnvelopeClashes).toEqual([]);
	expect(review.phoneClearanceViolations).toEqual([]);
	expect(review.fittedComponentEnvelopesChecked).toBe(44);
	expect(review.boardEnvelopeChecked).toBe(true);
	expect(review.containmentReview.boardOutsideVolumeMm3).toBe(0);
	expect(review.containmentReview.batteryOutsideVolumeMm3).toBe(0);
	expect(review.mountingReview).toHaveLength(4);
	expect(
		review.mountingReview.every(
			(mount) => mount.lowerSeatAndUpperPillarVerified,
		),
	).toBe(true);
	expect(review.shutterAlignment.freeGapMm).toBeCloseTo(0.15, 3);
	expect(review.shutterAlignment.centerYMm).toBeCloseTo(
		pcbPointInProduct({
			x: dimensions.shutter.actuatorXMm,
			y: dimensions.shutter.centerYMm,
		}).y,
	);
	expect(review.shutterAlignment.centerZMm).toBe(dimensions.shutter.centerZMm);
	const cell = review.parts.find(
		(part) => part.name === "ASR00012_MaximumEnvelope",
	);
	if (!cell) throw new Error("Missing retained protected pack");
	expect(
		cell.boundsMm[1].map(
			(coordinate, index) => coordinate - cell.boundsMm[0][index],
		),
	).toEqual([32, 43, 8.5]);
	const pcb = z
		.object({
			fittedModels: z.number(),
			emptyModels: z.number(),
			all44CadAnchorsMatch: z.boolean(),
		})
		.parse(await Bun.file("product/pcb-model-review.json").json());
	expect(pcb.fittedModels).toBe(44);
	expect(pcb.emptyModels).toBe(0);
	expect(pcb.all44CadAnchorsMatch).toBe(true);
});

test("eight manufacturing STL files match the checked plans and pass actual readback", async () => {
	const receipt = z
		.object({
			source_plans_sha256: z.string(),
			native_geometry_sha256: z.string(),
			printed_parts: z.array(
				z.object({
					file: z.string(),
					sha256: z.string(),
					watertight: z.boolean(),
					winding_consistent: z.boolean(),
					native_volume_delta_mm3: z.number(),
				}),
			),
		})
		.parse(await Bun.file("product/print-mesh-review.json").json());
	const hash = async (path: string) =>
		new Bun.CryptoHasher("sha256")
			.update(await Bun.file(path).arrayBuffer())
			.digest("hex");
	expect(receipt.source_plans_sha256).toBe(
		await hash("product/print-plans.json"),
	);
	expect(receipt.native_geometry_sha256).toBe(
		await hash("product/geometry-review.json"),
	);
	expect(receipt.printed_parts).toHaveLength(8);
	for (const part of receipt.printed_parts) {
		expect(part.watertight).toBe(true);
		expect(part.winding_consistent).toBe(true);
		expect(part.native_volume_delta_mm3).toBeLessThan(0.00001);
		expect(part.sha256).toBe(await hash(part.file));
	}
});
