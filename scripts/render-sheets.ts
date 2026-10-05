import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg";
import { any_circuit_element } from "circuit-json";
import { Resvg } from "@resvg/resvg-js";
import { z } from "zod";

// Validate the complete unmodified build before rendering any sheet.
const records = z
	.array(z.object({ type: z.string() }).passthrough())
	.parse(await Bun.file("dist/index/circuit.json").json());
const failures = records.flatMap((record, index) => {
	const result = any_circuit_element.safeParse(record);
	return result.success
		? []
		: [{ index, type: record.type, issues: result.error.issues }];
});
await Bun.write(
	"evidence/circuit-schema-issues.json",
	JSON.stringify(failures, null, 2),
);
console.log(
	`Full circuit schema: ${failures.length} rejected records; preserved in evidence/circuit-schema-issues.json`,
);
const schematicJson = any_circuit_element.array().parse(records);
for (const sheet of schematicJson.filter(
	(element) => element.type === "schematic_sheet",
)) {
	const svg = convertCircuitJsonToSchematicSvg(schematicJson, {
		schematicSheetId: sheet.schematic_sheet_id,
	});
	const path = `dist/index/${sheet.schematic_sheet_id}`;
	await Bun.write(`${path}.svg`, svg);
	await Bun.write(
		`${path}.png`,
		new Resvg(svg, { fitTo: { mode: "width", value: 2200 } }).render().asPng(),
	);
}
