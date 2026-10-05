import { any_circuit_element } from "circuit-json";
import {
	runAllChecks,
	checkHoleTraceClearance,
	checkDanglingTraces,
	checkPcbTraceSelfShorts,
} from "@tscircuit/checks";
import { z } from "zod";

const outputPath = z.string().min(1).parse(Bun.argv[2]);
const circuit = any_circuit_element
	.array()
	.parse(await Bun.file("dist/index/circuit.json").json());
const result = {
	circuitSha256: new Bun.CryptoHasher("sha256")
		.update(await Bun.file("dist/index/circuit.json").arrayBuffer())
		.digest("hex"),
	all: await runAllChecks(circuit),
	holeTrace: checkHoleTraceClearance(circuit),
	dangling: checkDanglingTraces(circuit),
	selfShorts: checkPcbTraceSelfShorts(circuit),
	generatedErrors: circuit.filter((e) => e.type.endsWith("_error")),
	generatedWarnings: circuit.filter((e) => e.type.endsWith("_warning")),
};
await Bun.write(outputPath, JSON.stringify(result, null, 2));
const errors = result.all.filter((e) => e.type.endsWith("_error"));
console.log(
	`All native checks: ${errors.length} errors, ${result.all.length - errors.length} warnings; hole/trace ${result.holeTrace.length}, dangling ${result.dangling.length}, self shorts ${result.selfShorts.length}`,
);
if (
	errors.length ||
	result.generatedErrors.length ||
	result.holeTrace.length ||
	result.dangling.length ||
	result.selfShorts.length
)
	process.exitCode = 1;
