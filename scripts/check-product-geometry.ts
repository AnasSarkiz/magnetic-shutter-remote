import { executeJscadOperations } from "jscad-planner";
import type { JscadOperation } from "jscad-planner";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import modeling from "@jscad/modeling";
import {
	createProductParts,
	partInProduct,
	createRemoteOuterPlan,
} from "../product/geometry";
import { z } from "zod";
import {
	dimensions as d,
	mountingHolesMm,
	pcbPointInProduct,
} from "../product/dimensions";
import { any_circuit_element } from "circuit-json";
// Native plan loader evaluates the identical plans used by the assembly.
function solidFromPlan(plan: JscadOperation): Geom3 {
	const geometry = executeJscadOperations(modeling, plan);
	if (!modeling.geometries.geom3.isA(geometry))
		throw new Error("Product plan did not evaluate to a3D solid");
	return geometry;
}
const parts = createProductParts();
const shapes = parts.map((part) => {
	const started = performance.now();
	const solid = solidFromPlan(partInProduct(part));
	console.error(
		`Evaluated ${part.name}: ${((performance.now() - started) / 1000).toFixed(2)}s`,
	);
	return solid;
});
const rows = parts.map((part, index) => ({
	name: part.name,
	localBoundsMm: modeling.measurements.measureBoundingBox(shapes[index]),
	boundsMm: modeling.measurements.measureBoundingBox(shapes[index]),
	volumeMm3: modeling.measurements.measureVolume(shapes[index]),
	referenceOnly: part.referenceOnly ?? false,
}));
function disjointBounds(a: number[][], b: number[][]): boolean {
	return a[0].some(
		(minimum, axis) => minimum >= b[1][axis] || a[1][axis] <= b[0][axis],
	);
}
const clashes = [];
for (let a = 0; a < parts.length; a++)
	for (let b = a + 1; b < parts.length; b++) {
		if (disjointBounds(rows[a].boundsMm, rows[b].boundsMm)) continue;
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
	const envelope = modeling.transforms.translate(
		[d.remote.centerXMm, d.remote.centerYMm, d.pcb.centerZMm],
		modeling.transforms.rotateZ(
			(d.remote.ccwRotationDegrees * Math.PI) / 180,
			modeling.primitives.cuboid({
				size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
				center: [
					(min[0] + max[0]) / 2,
					(min[1] + max[1]) / 2,
					(min[2] + max[2]) / 2,
				],
			}),
		),
	);
	for (let index = 0; index < parts.length; index++) {
		if (
			parts[index].referenceOnly ||
			disjointBounds(
				modeling.measurements.measureBoundingBox(envelope),
				rows[index].boundsMm,
			)
		)
			continue;
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
	for (const polygon of modeling.geometries.geom3.toPolygons(shapes[index]))
		for (const vertex of polygon.vertices) {
			if (
				Math.hypot(
					vertex[0] - d.magsafe.centerXMm,
					vertex[1] - d.magsafe.centerYMm,
				) > 30.00001 &&
				vertex[2] < 5.99999
			)
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
const outerShell = solidFromPlan(
	partInProduct({
		name: "RemoteOuterEnvelope",
		description: "Actual case boundary before hollowing",
		plan: createRemoteOuterPlan(),
		explodeZMm: 0,
	}),
);
const boardCenter = pcbPointInProduct({ x: 0, y: 0 });
const boardEnvelope = modeling.transforms.translate(
	[boardCenter.x, boardCenter.y, d.pcb.centerZMm],
	modeling.transforms.rotateZ(
		(d.remote.ccwRotationDegrees * Math.PI) / 180,
		modeling.primitives.cuboid({
			size: [board.width, board.height, board.thickness],
		}),
	),
);
const batteryIndex = parts.findIndex(
	(part) => part.name === "ASR00012_MaximumEnvelope",
);
const containmentReview = {
	boardOutsideVolumeMm3: modeling.measurements.measureVolume(
		modeling.booleans.subtract(boardEnvelope, outerShell),
	),
	batteryOutsideVolumeMm3: modeling.measurements.measureVolume(
		modeling.booleans.subtract(shapes[batteryIndex], outerShell),
	),
};
if (
	Math.abs(containmentReview.boardOutsideVolumeMm3) > 0.001 ||
	Math.abs(containmentReview.batteryOutsideVolumeMm3) > 0.001
)
	throw new Error(
		`Board or battery escapes case: ${JSON.stringify(containmentReview)}`,
	);
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
		["RemoteBase", d.pcb.centerZMm - 1],
		["RemoteLid", d.pcb.centerZMm + 1],
	] as const) {
		const index = parts.findIndex((part) => part.name === name);
		const mountCenter = pcbPointInProduct({ x: x + 1.5, y });
		const witness = modeling.primitives.cuboid({
			size: [0.2, 0.2, 0.2],
			center: [mountCenter.x, mountCenter.y, zMm],
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
const actualTip = pcbPointInProduct({
	x: actualSwitch.boundsMm[1][0],
	y: d.shutter.centerYMm,
});
const expectedShutterCenter = pcbPointInProduct({
	x: d.shutter.actuatorXMm,
	y: d.shutter.centerYMm,
});
const shutterFreeGapMm = plungerBounds[0][1] - actualTip.y;
const plungerIndex = parts.findIndex(
	(part) => part.name === "SideShutterPlunger",
);
const contactSlice = modeling.booleans.intersect(
	shapes[plungerIndex],
	modeling.primitives.cuboid({
		size: [10, 0.1, 5],
		center: [actualTip.x, plungerBounds[0][1] + 0.1, d.shutter.centerZMm],
	}),
);
const contactBounds = modeling.measurements.measureBoundingBox(contactSlice);
const shutterCenterXMm = (contactBounds[0][0] + contactBounds[1][0]) / 2;
const shutterCenterZMm = (contactBounds[0][2] + contactBounds[1][2]) / 2;
if (
	Math.abs(shutterFreeGapMm - d.shutter.freeGapMm) > 0.0001 ||
	Math.abs(shutterCenterXMm - expectedShutterCenter.x) > 0.0001 ||
	Math.abs(shutterCenterZMm - d.shutter.centerZMm) > 0.0001 ||
	Math.abs(contactBounds[1][0] - contactBounds[0][0] - 3) > 0.0001 ||
	Math.abs(contactBounds[1][2] - contactBounds[0][2] - 1.8) > 0.0001
)
	throw new Error("Shutter linkage lost actual side-switch contact alignment");
const shutterAlignment = {
	axis: "horizontal -Y",
	freeGapMm: shutterFreeGapMm,
	centerXMm: shutterCenterXMm,
	centerYMm: actualTip.y,
	centerZMm: shutterCenterZMm,
	contactBoundsMm: contactBounds,
	boardRelativeActuatorZMm: d.shutter.centerZMm - d.pcb.centerZMm,
	physicalStrokeAndOvertravelQualified: false,
};
// The manufacturer gives 0.15±0.05mm contact travel. Add the checked 0.15mm
// free gap: the lower bar's channel wall is the nominal 0.35mm travel stop.
const shutterTravelReview = [];
for (const travelMm of [0, 0.15, 0.25, 0.35]) {
	const movingPlunger = modeling.transforms.translate(
		[0, -travelMm, 0],
		shapes[plungerIndex],
	);
	const movingBounds = modeling.measurements.measureBoundingBox(movingPlunger);
	for (let index = 0; index < parts.length; index++) {
		if (
			index === plungerIndex ||
			parts[index].referenceOnly ||
			disjointBounds(movingBounds, rows[index].boundsMm)
		)
			continue;
		const overlapMm3 = Math.abs(
			modeling.measurements.measureVolume(
				modeling.booleans.intersect(movingPlunger, shapes[index]),
			),
		);
		if (overlapMm3 > 0.001)
			throw new Error(
				`Shutter travel hits ${parts[index].name} at ${travelMm}mm: ${overlapMm3}`,
			);
	}
	for (const component of meshReview.meshes) {
		const [min, max] = component.boundsMm;
		const envelope = modeling.transforms.translate(
			[d.remote.centerXMm, d.remote.centerYMm, d.pcb.centerZMm],
			modeling.transforms.rotateZ(
				(d.remote.ccwRotationDegrees * Math.PI) / 180,
				modeling.primitives.cuboid({
					size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
					center: [
						(min[0] + max[0]) / 2,
						(min[1] + max[1]) / 2,
						(min[2] + max[2]) / 2,
					],
				}),
			),
		);
		if (
			disjointBounds(
				movingBounds,
				modeling.measurements.measureBoundingBox(envelope),
			)
		)
			continue;
		if (component.name === "SW2") {
			const allowedContact = modeling.primitives.cuboid({
				size: [3, 0.2, 1.8],
				center: [actualTip.x, actualTip.y - 0.1, d.shutter.centerZMm],
			});
			const outsideContactMm3 = Math.abs(
				modeling.measurements.measureVolume(
					modeling.booleans.subtract(
						modeling.booleans.intersect(movingPlunger, envelope),
						allowedContact,
					),
				),
			);
			if (outsideContactMm3 > 0.001)
				throw new Error(
					`Shutter travel reaches beyond the SW2 actuator's 0.20mm travel region: ${outsideContactMm3}`,
				);
			continue;
		}
		const overlapMm3 = Math.abs(
			modeling.measurements.measureVolume(
				modeling.booleans.intersect(movingPlunger, envelope),
			),
		);
		if (overlapMm3 > 0.001)
			throw new Error(
				`Shutter travel hits ${component.name} at ${travelMm}mm: ${overlapMm3}`,
			);
	}
	shutterTravelReview.push({
		travelMm,
		caseAndOther43ComponentEnvelopesClear: true,
		intendedSw2ActuatorContactOnly: true,
	});
}
const shoulderWallWitness = modeling.primitives.cuboid({
	size: [0.2, 0.2, 0.2],
	center: [-49.4, 14.8, 11],
});
const baseIndex = parts.findIndex((part) => part.name === "RemoteBase");
const shoulderWallVolumeMm3 = modeling.measurements.measureVolume(
	modeling.booleans.intersect(shapes[baseIndex], shoulderWallWitness),
);
if (Math.abs(shoulderWallVolumeMm3 - 0.008) > 0.00001)
	throw new Error("Shutter linkage clearance opens the exterior shoulder wall");
const productBounds = modeling.measurements.measureBoundingBox(
	modeling.booleans.union(...shapes),
);
const targetSize = [d.product.widthMm, d.product.heightMm, d.product.depthMm];
if (
	productBounds[1].some(
		(coordinate, index) =>
			Math.abs(coordinate - productBounds[0][index] - targetSize[index]) >
			0.00001,
	)
)
	throw new Error(
		`Product differs from 90×78×34 reference: ${JSON.stringify(productBounds)}`,
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
	containmentReview,
	mountingReview,
	shutterAlignment,
	shutterTravelReview,
	shoulderWallVolumeMm3,
	clashes,
	phoneDatumZMm: 0,
	remoteBottomZMm: rows[baseIndex].boundsMm[0][2],
	designHandleBottomZMm: d.remote.bottomZMm,
	fullProductBoundingBoxMm: productBounds,
};
await Bun.write(
	"product/geometry-review.json",
	JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (clashes.length) throw new Error("Product geometry has solid intersections");
