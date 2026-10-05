import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const evidenceDirectory = Bun.argv[2] ?? "evidence/R6";
await mkdir(`${evidenceDirectory}/visual`, { recursive: true });
for (const name of [
	"CAM-top-all-drills",
	"CAM-bottom-all-drills",
	"F_Mask",
	"F_Paste",
	"B_Mask",
	"B_Paste",
	"Edge_Cuts",
]) {
	const svg = await readFile(
		`${evidenceDirectory}/cam-readback/${name}.svg`,
		"utf8",
	);
	await writeFile(
		`${evidenceDirectory}/visual/${name}.png`,
		new Resvg(svg, {
			background: "#ffffff",
			fitTo: { mode: "width", value: 1800 },
		})
			.render()
			.asPng(),
	);
}
