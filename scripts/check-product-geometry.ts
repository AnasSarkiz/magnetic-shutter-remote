import { executeJscadOperations } from "jscad-planner";
import { loadJscadPlan } from "circuit-json-to-gltf";
import type { JscadOperation } from "jscad-planner";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import modeling from "@jscad/modeling";
import { createProductParts, partInProduct } from "../product/geometry";
import { z } from "zod";
import { dimensions as d } from "../product/dimensions";
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
for (const component of meshReview.meshes.filter(
	(mesh) => mesh.name !== "Box0",
)) {
	const [min, max] = component.boundsMm;
	const envelope = modeling.primitives.cuboid({
		size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
		center: [
			(min[0] + max[0]) / 2,
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
	fittedComponentEnvelopesChecked: 44,
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
