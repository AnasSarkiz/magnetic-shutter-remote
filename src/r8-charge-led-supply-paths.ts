import type { TraceProps } from "@tscircuit/props";
// Native pcbPath coordinates are relative to R4's PCB transform at (8,23).
// Explicit contact vertices preserve continuous wire-to-via connections.
export const r8ChargeLedSupplyPath: TraceProps["pcbPath"] = [
	{ x: -2, y: -1.8 },
	{ x: -2, y: -1.8, via: true, fromLayer: "top", toLayer: "bottom" },
	{ x: -2, y: -1.8 },
	{ x: -2, y: -7.5 },
	{ x: -3.9, y: -9.7 },
	{ x: -3.9, y: -9.7, via: true, fromLayer: "bottom", toLayer: "top" },
	{ x: -3.9, y: -9.7 },
	{ x: -3.9, y: -10.6 },
	"C2.pin1",
];
