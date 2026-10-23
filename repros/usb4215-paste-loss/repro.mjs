import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EasyEdaJsonSchema, convertEasyEdaJsonToCircuitJson } from "easyeda";

// Original public supplier data, not a manually authored substitute footprint.
const supplier = JSON.parse(
	readFileSync(new URL("./C37616412.raweasy.json", import.meta.url), "utf8"),
);
assert.equal(supplier.lcsc.number, "C37616412");
assert.equal(supplier.packageDetail.uuid, "3104977db58742e399663286e4a66eac");

const supplierPaste = supplier.packageDetail.dataStr.shape.filter((shape) => {
	const fields = shape.split("~");
	return (
		fields[0] === "SOLIDREGION" && fields[1] === "5" && fields[4] === "solid"
	);
});
assert.equal(
	supplierPaste.length,
	16,
	"The frozen source must contain all 16 paste regions",
);

// The public synchronous conversion API: no live model/network requests or board render.
const circuitJson = convertEasyEdaJsonToCircuitJson(
	EasyEdaJsonSchema.parse(supplier),
	{ useModelCdn: true },
);
const importedPaste = circuitJson.filter(
	(element) => element.type === "pcb_solder_paste",
);
const copperPads = circuitJson.filter(
	(element) => element.type === "pcb_smtpad",
);
const platedSlots = circuitJson.filter(
	(element) => element.type === "pcb_plated_hole",
);
console.log(
	JSON.stringify(
		{
			part: "GCT USB4215-03-A / C37616412",
			supplierPasteRegions: supplierPaste.length,
			importedPasteRegions: importedPaste.length,
			copperPads: copperPads.length,
			platedSlots: platedSlots.length,
		},
		null,
		2,
	),
);
assert.equal(copperPads.length, 12, "USB contact copper must remain present");
assert.equal(platedSlots.length, 4, "All shell slots must remain present");
assert.equal(
	importedPaste.length,
	supplierPaste.length,
	"BUG: exact supplier paste regions were dropped during conversion",
);
