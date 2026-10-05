import { readAuthoredPlacements } from "./lib/qualification-source-placements";

const placements = readAuthoredPlacements(
	await Bun.file("src/remote-circuit.tsx").text(),
);
await Bun.write(
	Bun.argv[2] ?? "evidence/R4-qualification/authored-placements.json",
	`${JSON.stringify(placements, null, 2)}\n`,
);
console.log(
	`${placements.length} placements read independently from TypeScript AST`,
);
