import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { runTscircuitCode } from "@tscircuit/eval";

const importPath = "imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4";
const fixturePath = "tests/fixtures/esp32-import.circuit.tsx";

test("manufacturer power override reaches source ports without changing the supplier footprint", async () => {
	const circuitJson = await runTscircuitCode(
		{
			[fixturePath]: readFileSync(fixturePath, "utf8"),
			[`${importPath}.tsx`]: readFileSync(`${importPath}.tsx`, "utf8"),
			[`${importPath}.obj`]: readFileSync(`${importPath}.obj`, "utf8"),
			[`${importPath}.step`]: readFileSync(`${importPath}.step`, "utf8"),
		},
		{ mainComponentPath: fixturePath },
	);
	const ports = circuitJson.filter((element) => element.type === "source_port");
	expect(ports.find((port) => port.pin_number === 1)?.requires_power).toBe(
		true,
	);
	expect(ports.find((port) => port.pin_number === 9)?.requires_ground).toBe(
		true,
	);
	expect(
		ports.find((port) => port.pin_number === 19)?.requires_ground,
	).not.toBe(true);
	expect(ports.filter((port) => port.requires_power)).toHaveLength(1);
	const pads = circuitJson.filter((element) => element.type === "pcb_smtpad");
	expect(pads).toHaveLength(27);
	expect(
		circuitJson.filter((element) => element.type === "pcb_trace"),
	).toHaveLength(0);
	expect(
		circuitJson.filter((element) => element.type === "source_runtime_error"),
	).toHaveLength(0);
}, 30_000);

test("cheaper C2 import exposes its real power pins and stays unrouted", async () => {
	const candidatePath = "imports/ESPC2_12E_N4/ESPC2_12E_N4";
	const candidateFixturePath = "tests/fixtures/espc2-import.circuit.tsx";
	const circuitJson = await runTscircuitCode(
		{
			[candidateFixturePath]: readFileSync(candidateFixturePath, "utf8"),
			[`${candidatePath}.tsx`]: readFileSync(`${candidatePath}.tsx`, "utf8"),
			[`${candidatePath}.obj`]: readFileSync(`${candidatePath}.obj`, "utf8"),
			[`${candidatePath}.step`]: readFileSync(`${candidatePath}.step`, "utf8"),
		},
		{ mainComponentPath: candidateFixturePath },
	);
	const ports = circuitJson.filter((element) => element.type === "source_port");
	expect(ports.find((port) => port.pin_number === 8)?.requires_power).toBe(
		true,
	);
	expect(ports.find((port) => port.pin_number === 9)?.requires_ground).toBe(
		true,
	);
	expect(ports.filter((port) => port.requires_power)).toHaveLength(1);
	expect(
		circuitJson.filter((element) => element.type === "pcb_smtpad"),
	).toHaveLength(16);
	expect(
		circuitJson.filter((element) => element.type === "pcb_trace"),
	).toHaveLength(0);
	expect(
		circuitJson.filter((element) => element.type === "source_runtime_error"),
	).toHaveLength(0);
}, 30_000);
