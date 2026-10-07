import { renderGLTFToPNGFromGLB } from "poppygl";
import { z } from "zod";
const name = z
	.enum(["product.assembly", "product.exploded"])
	.parse(Bun.argv[2]);
const glb = await Bun.file(`dist/${name}/3d.glb`).arrayBuffer();
const png = await renderGLTFToPNGFromGLB(glb, {
	width: 1400,
	height: 1100,
	backgroundColor: "#f0f2f5",
	ambient: 0.5,
	camPos: name === "product.exploded" ? [-180, 230, 160] : [-135, 145, 105],
	lookAt: [0, name === "product.exploded" ? 50 : 25, -35],
	up: "y+",
	fov: name === "product.exploded" ? 38 : 32,
});
await Bun.write(
	`product/${name === "product.assembly" ? "closed" : "exploded"}.png`,
	png,
);
await Bun.write(`dist/${name}/3d.png`, png);
console.log(`Rendered ${name} with an explicit whole-product camera`);
