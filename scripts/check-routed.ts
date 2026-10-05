import { any_circuit_element } from "circuit-json";
import { z } from "zod";
import {
	runAllChecks,
	checkHoleTraceClearance,
	checkDanglingTraces,
	checkPcbTraceSelfShorts,
} from "@tscircuit/checks";
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const checks = {
	all: await runAllChecks(circuit),
	holeTrace: checkHoleTraceClearance(circuit),
	dangling: checkDanglingTraces(circuit),
	selfShorts: checkPcbTraceSelfShorts(circuit),
};
const evidencePath = z
	.string()
	.min(1)
	.parse(Bun.argv[2] ?? "evidence/R3/routed-checks.json");
await Bun.write(evidencePath, JSON.stringify(checks, null, 2));
for (const [name, issues] of Object.entries(checks)) {
	console.log(name, issues.length);
	for (const issue of issues) console.log(issue.type, issue.message);
}
if (
	Object.values(checks)
		.flat()
		.some((issue) => issue.type.endsWith("_error"))
) {
	throw new Error("Routed circuit checks contain unresolved errors");
}
