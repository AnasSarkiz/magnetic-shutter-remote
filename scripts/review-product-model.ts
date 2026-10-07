import { mat4, vec3 } from "gl-matrix";
import { any_circuit_element } from "circuit-json";
import { z } from "zod";
const triple = z.tuple([z.number(), z.number(), z.number()]);
const documentSchema = z.object({
	scene: z.number().optional(),
	scenes: z.array(z.object({ nodes: z.array(z.number()) })),
	nodes: z.array(
		z.object({
			name: z.string().optional(),
			mesh: z.number().optional(),
			children: z.array(z.number()).optional(),
			translation: triple.optional(),
			rotation: z
				.tuple([z.number(), z.number(), z.number(), z.number()])
				.optional(),
			scale: triple.optional(),
			matrix: z.array(z.number()).length(16).optional(),
		}),
	),
	meshes: z.array(
		z.object({
			primitives: z.array(
				z.object({ attributes: z.object({ POSITION: z.number() }) }),
			),
		}),
	),
	accessors: z.array(
		z.object({
			count: z.number(),
			min: triple.optional(),
			max: triple.optional(),
		}),
	),
});
const nativeAssets: {
	filename: string;
	sha256: string;
	sizeMm: { x: number; y: number; z: number };
}[] = [];
const meshRows: {
	name: string;
	vertices: number;
	boundsMm: number[][];
	anchorMm: number[];
}[] = [];
const overallMin = [Infinity, Infinity, Infinity],
	overallMax = [-Infinity, -Infinity, -Infinity];
function visit(
	nodeIndex: number,
	context: { parent: mat4; doc: z.infer<typeof documentSchema> },
) {
	const { parent, doc } = context;
	const node = doc.nodes[nodeIndex];
	const local = node.matrix
		? mat4.clone(node.matrix)
		: mat4.fromRotationTranslationScale(
				mat4.create(),
				node.rotation ?? [0, 0, 0, 1],
				node.translation ?? [0, 0, 0],
				node.scale ?? [1, 1, 1],
			);
	const world = mat4.multiply(mat4.create(), parent, local);
	if (node.mesh !== undefined) {
		const min = [Infinity, Infinity, Infinity],
			max = [-Infinity, -Infinity, -Infinity];
		let vertices = 0;
		for (const primitive of doc.meshes[node.mesh].primitives) {
			const accessor = doc.accessors[primitive.attributes.POSITION];
			if (!accessor.min || !accessor.max || accessor.count <= 0)
				throw new Error(`Empty model ${node.name}`);
			if (
				accessor.min.every(
					(coordinate, index) => coordinate === accessor.max?.[index],
				)
			)
				throw new Error(`Zero geometry: ${node.name}`);
			for (const x of [accessor.min[0], accessor.max[0]])
				for (const y of [accessor.min[1], accessor.max[1]])
					for (const z of [accessor.min[2], accessor.max[2]]) {
						const point = vec3.transformMat4(vec3.create(), [x, y, z], world);
						for (let axis = 0; axis < 3; axis++) {
							min[axis] = Math.min(min[axis], point[axis]);
							max[axis] = Math.max(max[axis], point[axis]);
						}
					}
			vertices += accessor.count;
		}
		for (let axis = 0; axis < 3; axis++) {
			overallMin[axis] = Math.min(overallMin[axis], min[axis]);
			overallMax[axis] = Math.max(overallMax[axis], max[axis]);
		}
		meshRows.push({
			name: node.name ?? `Node${nodeIndex}`,
			vertices,
			boundsMm: [min, max],
			anchorMm: Array.from(vec3.transformMat4(vec3.create(), [0, 0, 0], world)),
		});
	}
	for (const child of node.children ?? []) visit(child, { parent: world, doc });
}
for (const filename of ["r8-pcb.glb", "r8-controls.glb"]) {
	const bytes = await Bun.file(`product/models/${filename}`).arrayBuffer(),
		view = new DataView(bytes);
	const doc = documentSchema.parse(
		JSON.parse(
			new TextDecoder().decode(
				new Uint8Array(bytes, 20, view.getUint32(12, true)),
			),
		),
	);
	const start = meshRows.length;
	for (const root of doc.scenes[doc.scene ?? 0].nodes)
		visit(root, { parent: mat4.create(), doc });
	const fragment = meshRows.slice(start);
	const min = [0, 1, 2].map((axis) =>
		Math.min(...fragment.map((row) => row.boundsMm[0][axis])),
	);
	const max = [0, 1, 2].map((axis) =>
		Math.max(...fragment.map((row) => row.boundsMm[1][axis])),
	);
	nativeAssets.push({
		filename,
		sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex"),
		sizeMm: { x: max[0] - min[0], y: max[1] - min[1], z: max[2] - min[2] },
	});
}
const source = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const fitted = source.filter((row) => row.type === "source_component");
for (const component of fitted) {
	const cad = source.find(
		(row) =>
			row.type === "cad_component" &&
			row.source_component_id === component.source_component_id,
	);
	const model = meshRows.find((row) => row.name === component.name);
	if (cad?.type !== "cad_component" || !model)
		throw new Error(`Missing fitted model: ${component.name}`);
	if (
		vec3.distance(model.anchorMm, [
			cad.position.x,
			cad.position.y,
			cad.position.z,
		]) > 0.00001
	)
		throw new Error(`Wrong model pose: ${component.name}`);
}
if (fitted.length !== 44 || meshRows.length !== 45)
	throw new Error("Expected board and all44 supplier models");
const size = overallMax.map(
	(coordinate, axis) => coordinate - overallMin[axis],
);
const report = {
	sourceCircuitSha256: new Bun.CryptoHasher("sha256")
		.update(await Bun.file("dist/index/circuit.json").arrayBuffer())
		.digest("hex"),
	nativeAssets,
	fittedModels: 44,
	emptyModels: 0,
	all44CadAnchorsMatch: true,
	boundsMm: [overallMin, overallMax],
	sizeMm: { x: size[0], y: size[1], z: size[2] },
	meshes: meshRows,
};
await Bun.write(
	"product/pcb-model-review.json",
	JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ ...report, meshes: undefined }, null, 2));
