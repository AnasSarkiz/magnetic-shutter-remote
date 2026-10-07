import { executeJscadOperations } from "jscad-planner";
import { loadJscadPlan } from "circuit-json-to-gltf";
import type { JscadOperation } from "jscad-planner";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import modeling from "@jscad/modeling";
import { createProductParts, partInProduct } from "../product/geometry";
import { z } from "zod";
import { dimensions as d, mountingHolesMm } from "../product/dimensions";
import { any_circuit_element } from "circuit-json";
// Native plan loader evaluates the identical plans used by the assembly.
function solidFromPlan(plan: JscadOperation): Geom3 {
	const geometry = executeJscadOperations(modeling, plan);
	if (!modeling.geometries.geom3.isA(geometry))
		throw new Error("Product plan did not evaluate to a3D solid");
	return geometry;
}
const parts = createProductParts();
const shapes = parts.map((part) => solidFromPlan(partInProduct(part)));
const rows = parts.map((part, index) => ({
	name: part.name,
	localBoundsMm: modeling.measurements.measureBoundingBox(
		solidFromPlan(part.plan),
	),
	boundsMm: modeling.measurements.measureBoundingBox(shapes[index]),
	volumeMm3: modeling.measurements.measureVolume(shapes[index]),
	referenceOnly: part.referenceOnly ?? false,
}));
const clashes = [];
for (let a = 0; a < parts.length; a++)
	for (let b = a + 1; b < parts.length; b++) {
		const volumeMm3 = modeling.measurements.measureVolume(
			modeling.booleans.intersect(shapes[a], shapes[b]),
		);
		if (volumeMm3 > 0.001)
			clashes.push({ a: parts[a].name, b: parts[b].name, volumeMm3 });
	}
const meshReview = z
	.object({
		meshes: z.array(
			z.object({
				name: z.string(),
				boundsMm: z.tuple([
					z.tuple([z.number(), z.number(), z.number()]),
					z.tuple([z.number(), z.number(), z.number()]),
				]),
			}),
		),
	})
	.parse(await Bun.file("product/pcb-model-review.json").json());
const electronicEnvelopeClashes = [];
for (const component of meshReview.meshes) {
	const [min, max] = component.boundsMm;
	const envelope = modeling.primitives.cuboid({
		size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
		center: [
			(min[0] + max[0]) / 2 + d.remote.centerXMm,
			(min[1] + max[1]) / 2 + d.remote.centerYMm,
			(min[2] + max[2]) / 2 + d.pcb.centerZMm,
		],
	});
	for (let index = 0; index < parts.length; index++) {
		if (parts[index].referenceOnly) continue;
		const volumeMm3 = Math.abs(
			modeling.measurements.measureVolume(
				modeling.booleans.intersect(envelope, shapes[index]),
			),
		);
		if (volumeMm3 > 0.001)
			electronicEnvelopeClashes.push({
				component: component.name,
				part: parts[index].name,
				volumeMm3,
			});
	}
}
const phoneClearanceViolations = [];
for (let index = 0; index < parts.length; index++) {
	const mesh = loadJscadPlan(partInProduct(parts[index]));
	for (const triangle of mesh.triangles)
		for (const vertex of triangle.vertices) {
			// Native loader frame is X, Z, Y; convert back to PCB XYZ.
			if (Math.hypot(vertex.x, vertex.z) > 30.00001 && vertex.y < 5.99999)
				phoneClearanceViolations.push(parts[index].name);
		}
}
if (electronicEnvelopeClashes.length || phoneClearanceViolations.length)
	throw new Error(
		JSON.stringify({ electronicEnvelopeClashes, phoneClearanceViolations }),
	);
const source = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const board = source.find((element) => element.type === "pcb_board");
if (
	board?.type !== "pcb_board" ||
	board.width !== d.pcb.widthMm ||
	board.height !== d.pcb.lengthMm ||
	board.thickness !== d.pcb.thicknessMm
)
	throw new Error("Enclosure PCB envelope differs from actual board");
const actualMounts = source.filter(
	(element) => element.type === "pcb_hole" && !element.pcb_component_id,
);
if (actualMounts.length !== mountingHolesMm.length)
	throw new Error("PCB mount count changed");
const mountingReview = mountingHolesMm.map(([x, y]) => {
	const hole = actualMounts.find(
		(element) =>
			element.type === "pcb_hole" &&
			element.x === x &&
			element.y === y &&
			element.hole_shape === "circle" &&
			element.hole_diameter === 2.2,
	);
	if (!hole) throw new Error("Enclosure mount does not match actual PCB hole");
	for (const [name, zMm] of [
		["RemoteBase", 12.5],
		["RemoteLid", 14.5],
	] as const) {
		const index = parts.findIndex((part) => part.name === name);
		const witness = modeling.primitives.cuboid({
			size: [0.2, 0.2, 0.2],
			center: [x + d.remote.centerXMm + 1.5, y + d.remote.centerYMm, zMm],
		});
		const volumeMm3 = modeling.measurements.measureVolume(
			modeling.booleans.intersect(witness, shapes[index]),
		);
		if (Math.abs(volumeMm3 - 0.008) > 0.00001)
			throw new Error(`Missing physical mount support: ${name} ${x},${y}`);
	}
	return {
		pcbXmm: x,
		pcbYmm: y,
		holeDiameterMm: 2.2,
		lowerSeatAndUpperPillarVerified: true,
	};
});
const plungerBounds = rows.find(
	(row) => row.name === "SideShutterPlunger",
)?.boundsMm;
if (!plungerBounds) throw new Error("Missing side actuator");
const actualSwitch = meshReview.meshes.find((mesh) => mesh.name === "SW2");
if (!actualSwitch) throw new Error("Missing actual switch model");
const shutterFreeGapMm =
	plungerBounds[0][0] - (actualSwitch.boundsMm[1][0] + d.remote.centerXMm);
const shutterCenterYMm = (plungerBounds[0][1] + plungerBounds[1][1]) / 2;
const shutterCenterZMm = (plungerBounds[0][2] + plungerBounds[1][2]) / 2;
if (
	Math.abs(shutterFreeGapMm - d.shutter.freeGapMm) > 0.0001 ||
	Math.abs(shutterCenterYMm - d.shutter.centerYMm - d.remote.centerYMm) >
		0.0001 ||
	Math.abs(shutterCenterZMm - d.shutter.centerZMm) > 0.0001
)
	throw new Error("Shutter plunger lost actual side-switch alignment");
const shutterAlignment = {
	axis: "horizontal +X",
	freeGapMm: shutterFreeGapMm,
	centerYMm: shutterCenterYMm,
	centerZMm: shutterCenterZMm,
	boardRelativeActuatorZMm: d.shutter.centerZMm - d.pcb.centerZMm,
	physicalStrokeAndOvertravelQualified: false,
};
await Bun.write(
	"product/print-plans.json",
	JSON.stringify(
		parts
			.filter(
				(part) =>
					!part.referenceOnly && part.name !== "ASR00012_MaximumEnvelope",
			)
			.map((part) => ({ name: part.name, plan: part.plan })),
		null,
		2,
	),
);
const report = {
	parts: rows,
	electronicEnvelopeClashes,
	phoneClearanceViolations,
	fittedComponentEnvelopesChecked: meshReview.meshes.filter(
		(mesh) => mesh.name !== "Box0",
	).length,
	boardEnvelopeChecked: true,
	mountingReview,
	shutterAlignment,
	clashes,
	phoneDatumZMm: 0,
	remoteBottomZMm: 10,
	fullProductBoundingBoxMm: modeling.measurements.measureBoundingBox(
		modeling.booleans.union(...shapes),
	),
};
await Bun.write(
	"product/geometry-review.json",
	JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (clashes.length) throw new Error("Product geometry has solid intersections");
