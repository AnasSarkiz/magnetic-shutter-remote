import { createHash } from "node:crypto";
import {
	checkDanglingTraces,
	checkHoleTraceClearance,
	checkPcbTraceSelfShorts,
	runAllChecks,
} from "@tscircuit/checks";
import { any_circuit_element } from "circuit-json";
import { z } from "zod";

const outputPath = z.string().min(1).parse(Bun.argv[2]);
const source = await Bun.file("dist/index/circuit.json").text();
const circuit = any_circuit_element.array().parse(JSON.parse(source));
const all = await runAllChecks(circuit);
const generated = circuit.filter((e) => e.type.endsWith("_error"));
const holeTrace = checkHoleTraceClearance(circuit, { minClearance: 0.3 });
const dangling = checkDanglingTraces(circuit);
const selfShorts = checkPcbTraceSelfShorts(circuit);
const report = {
	circuitSha256: createHash("sha256").update(source).digest("hex"),
	generatedErrors: generated.length,
	holeTrace: holeTrace.length,
	dangling: dangling.length,
	selfShorts: selfShorts.length,
	all,
	generated,
	holeTraceDetails: holeTrace,
	danglingDetails: dangling,
	selfShortDetails: selfShorts,
};
await Bun.write(outputPath, `${JSON.stringify(report, null, 2)}\n`);
const errors = all.filter((e) => e.type.endsWith("_error"));
console.log(
	`Native: ${errors.length} errors; generated ${generated.length}; hole/trace ${holeTrace.length}; dangling ${dangling.length}; shorts ${selfShorts.length}`,
);
if (
	errors.length ||
	generated.length ||
	holeTrace.length ||
	dangling.length ||
	selfShorts.length
) {
	process.exitCode = 1;
}
