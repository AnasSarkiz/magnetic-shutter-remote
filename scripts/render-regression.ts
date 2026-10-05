import { Resvg } from "@resvg/resvg-js";
for (const filename of [
	"repro-pcb-schema-export-pcb",
	"repro-symbol-reference-owner-schematic",
]) {
	const path = `tooling/core/tests/repros/__snapshots__/${filename}.snap.svg`;
	await Bun.write(
		`evidence/R2/${filename}.png`,
		new Resvg(await Bun.file(path).text(), {
			fitTo: { mode: "width", value: 1200 },
		})
			.render()
			.asPng(),
	);
}
