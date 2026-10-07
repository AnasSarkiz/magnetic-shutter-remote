import { mat3, mat4, quat, vec3 } from "gl-matrix";
import { z } from "zod";

/** Lossless assembly interchange: export (-PCB X,PCB Z,PCB Y) to loader
 * (PCB X,PCB Z,PCB Y). Flatten scene transforms and give each mesh instance
 * its own record; all accessors, triangles, materials and binary bytes survive.
 */
export function pcbModelInAssemblyCoordinates(
	glb: ArrayBuffer,
	{ rotationDegrees }: { rotationDegrees: number },
): Uint8Array {
	const source = new Uint8Array(glb),
		view = new DataView(glb);
	if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2)
		throw new Error("Expected glTF 2 GLB");
	const jsonLength = view.getUint32(12, true);
	const triple = z.tuple([z.number(), z.number(), z.number()]);
	const document = z
		.object({
			nodes: z.array(
				z
					.object({
						name: z.string().optional(),
						mesh: z.number().optional(),
						children: z.array(z.number()).optional(),
						translation: triple.optional(),
						rotation: z
							.tuple([z.number(), z.number(), z.number(), z.number()])
							.optional(),
						scale: triple.optional(),
						matrix: z.array(z.number()).length(16).optional(),
					})
					.passthrough(),
			),
			meshes: z.array(z.record(z.unknown())),
			scenes: z.array(z.object({ nodes: z.array(z.number()) }).passthrough()),
		})
		.passthrough()
		.parse(
			JSON.parse(new TextDecoder().decode(source.slice(20, 20 + jsonLength))),
		);
	const nodes: typeof document.nodes = [],
		meshes: typeof document.meshes = [];
	const loaderFromExport = mat4.multiply(
		mat4.create(),
		mat4.fromYRotation(mat4.create(), (-rotationDegrees * Math.PI) / 180),
		mat4.fromScaling(mat4.create(), [-1, 1, 1]),
	);
	function visit(index: number, parent: mat4) {
		const node = document.nodes[index];
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
			const translation = vec3.create(),
				scale = vec3.create();
			mat4.getTranslation(translation, world);
			mat4.getScaling(scale, world);
			if (mat4.determinant(world) < 0) scale[0] *= -1;
			if (Array.from(scale).some((n) => Math.abs(n) < 1e-10))
				throw new Error("Degenerate model transform");
			const basis = mat3.fromMat4(mat3.create(), world);
			for (let axis = 0; axis < 3; axis++)
				for (let row = 0; row < 3; row++) basis[axis * 3 + row] /= scale[axis];
			const rotation = quat.normalize(
				quat.create(),
				quat.fromMat3(quat.create(), basis),
			);
			const rebuilt = mat4.fromRotationTranslationScale(
				mat4.create(),
				rotation,
				translation,
				scale,
			);
			if (Array.from(world).some((n, i) => Math.abs(n - rebuilt[i]) > 1e-5))
				throw new Error("Unsupported sheared model transform");
			const mesh = meshes.length;
			meshes.push({ ...document.meshes[node.mesh] });
			nodes.push({
				name: node.name,
				mesh,
				translation: triple.parse(Array.from(translation)),
				rotation: z
					.tuple([z.number(), z.number(), z.number(), z.number()])
					.parse(Array.from(rotation)),
				scale: triple.parse(Array.from(scale)),
			});
		}
		for (const child of node.children ?? []) visit(child, world);
	}
	const scenes = document.scenes.map((scene) => {
		const start = nodes.length;
		for (const root of scene.nodes) visit(root, loaderFromExport);
		return {
			...scene,
			nodes: Array.from({ length: nodes.length - start }, (_, i) => start + i),
		};
	});
	const encoded = new TextEncoder().encode(
		JSON.stringify({ ...document, nodes, meshes, scenes }),
	);
	const paddedLength = Math.ceil(encoded.length / 4) * 4;
	const tail = source.slice(20 + jsonLength),
		output = new Uint8Array(20 + paddedLength + tail.length),
		header = new DataView(output.buffer);
	header.setUint32(0, 0x46546c67, true);
	header.setUint32(4, 2, true);
	header.setUint32(8, output.length, true);
	header.setUint32(12, paddedLength, true);
	header.setUint32(16, 0x4e4f534a, true);
	output.fill(32, 20, 20 + paddedLength);
	output.set(encoded, 20);
	output.set(tail, 20 + paddedLength);
	if (
		!output
			.slice(20 + paddedLength)
			.every((byte, index) => byte === tail[index])
	)
		throw new Error("Binary geometry changed");
	return output;
}
