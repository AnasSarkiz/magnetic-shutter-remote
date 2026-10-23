import { expect, test } from "bun:test";
import {
	featureSignatures,
	inspectImport,
} from "../scripts/lib/import-geometry";

test("changing a plated slot is detected independently of attribute order", () => {
	const before = inspectImport(
		'<platedhole portHints={["pin14"]} holeWidth="0.6mm" holeHeight="1.4mm" />',
	);
	const same = inspectImport(
		'<platedhole holeHeight="1.4mm" holeWidth="0.6mm" portHints={["pin14"]} />',
	);
	const changed = inspectImport(
		'<platedhole holeHeight="1.6mm" holeWidth="0.6mm" portHints={["pin14"]} />',
	);
	expect(featureSignatures(before.features)).toEqual(
		featureSignatures(same.features),
	);
	expect(featureSignatures(before.features)).not.toEqual(
		featureSignatures(changed.features),
	);
});

test("paste loss is visible even when copper remains unchanged", () => {
	const before = inspectImport(
		'<footprint><smtpad portHints={["pin1"]} width="0.3mm" /><solderpaste shape="polygon" points={[{x:-1,y:0},{x:1,y:0},{x:1,y:1}]} /></footprint>',
	);
	const after = inspectImport(
		'<footprint><smtpad portHints={["pin1"]} width="0.3mm" /></footprint>',
	);
	expect(before.counts.solderpaste).toBe(1);
	expect(after.counts.solderpaste).toBeUndefined();
	expect(featureSignatures(before.features)).not.toEqual(
		featureSignatures(after.features),
	);
});

test("repeated physical contacts and SPDT semantics remain explicit", () => {
	const imported = inspectImport(
		'const pinLabels={pin1:["GND"],pin2:["VBUS"]} as const; const component=<switch type="spdt"><footprint insertionDirection="from_bottom"><smtpad portHints={["pin1"]}/><smtpad portHints={["pin1"]}/></footprint></switch>',
	);
	expect(imported.features).toHaveLength(2);
	expect(imported.switchType).toBe("spdt");
	expect(imported.insertionDirection).toBe("from_bottom");
	expect(imported.declarations.pinLabels).toEqual({
		pin1: ["GND"],
		pin2: ["VBUS"],
	});
});

test("nonliteral generated geometry cannot silently pass inspection", () => {
	expect(() => inspectImport("<smtpad width={calculateWidth()} />")).toThrow(
		"Unsupported literal",
	);
});
