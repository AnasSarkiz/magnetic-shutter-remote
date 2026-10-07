import {
	loadGLTFWithResourcesFromURL,
	createSceneFromGLTF,
	renderSceneFromGLTF,
	encodePNG,
} from "poppygl";
import { createProductParts } from "../product/geometry";
import { z } from "zod";
const name = z
	.enum(["product.assembly", "product.exploded"])
	.parse(Bun.argv[2]);
const view = z
	.enum(["normal", "phone-facing"])
	.default("normal")
	.parse(Bun.argv[3]);
if (view === "phone-facing" && name !== "product.assembly")
	throw new Error("Phone-facing view uses the closed assembly");
const glb = await Bun.file(`dist/${name}/3d.glb`).arrayBuffer();
// Presentation materials on exact native geometry; never write an edited GLB.
const { gltf, resources } = await loadGLTFWithResourcesFromURL(
	`data:model/gltf-binary;base64,${Buffer.from(glb).toString("base64")}`,
);
const document = z
	.object({
		nodes: z.array(
			z
				.object({ name: z.string().optional(), mesh: z.number().optional() })
				.passthrough(),
		),
		meshes: z.array(
			z
				.object({
					primitives: z.array(
						z.object({ material: z.number().optional() }).passthrough(),
					),
				})
				.passthrough(),
		),
		materials: z.array(z.unknown()),
	})
	.passthrough()
	.parse(gltf);
const parts = createProductParts();
for (const node of document.nodes) {
	const part = parts.find((part) => part.name === node.name);
	if (!part || node.mesh === undefined) continue;
	if (part.plan.type !== "colorize")
		throw new Error("Product part is missing its presentation material");
	const rgb = z
		.tuple([z.number(), z.number(), z.number()])
		.parse(part.plan.color);
	const materialIndex = document.materials.length;
	document.materials.push({
		name: `${part.name} presentation`,
		pbrMetallicRoughness: {
			baseColorFactor: [...rgb, part.referenceOnly ? 0.45 : 1],
			roughnessFactor: 0.85,
			metallicFactor: 0,
		},
		alphaMode: part.referenceOnly ? "BLEND" : "OPAQUE",
	});
	for (const primitive of document.meshes[node.mesh].primitives)
		primitive.material = materialIndex;
}
const scene = createSceneFromGLTF(document, resources);
const result = renderSceneFromGLTF(scene, {
	width: 1400,
	height: 1100,
	backgroundColor: "#f0f2f5",
	ambient: 0.5,
	camPos:
		view === "phone-facing"
			? [130, -110, 100]
			: name === "product.exploded"
				? [-175, 200, 160]
				: [-150, 140, 120],
	lookAt: [-24, name === "product.exploded" ? 50 : 17, 0],
	up: "y+",
	fov: name === "product.exploded" ? 40 : 34,
});
const png = await encodePNG(result.bitmap);
await Bun.write(
	`product/${view === "phone-facing" ? "phone-facing" : name === "product.assembly" ? "closed" : "exploded"}.png`,
	png,
);
if (view === "normal") await Bun.write(`dist/${name}/3d.png`, png);
console.log(`Rendered ${name} with an explicit whole-product camera`);
