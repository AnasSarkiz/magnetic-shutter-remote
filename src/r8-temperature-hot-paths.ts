import type { FanoutTracePath } from "@tscircuit/core";
// Complete HOT setting connection, with a safe off-pad transition. Ends at
// the existing U5 SETA bottom breakout; no automatic near-trace return via.
export const r8TemperatureHotPaths: FanoutTracePath[] = [
	{
		connection: ".R10 > port.pin1",
		route: [
			{ route_type: "wire", x: -3.746636, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.2, y: 6.546636, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.2, y: 7.2, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -3.2,
				y: 7.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -3.2, y: 7.2, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: -2.613404773034895,
				y: 6.613404773034895,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.186595226965105,
				y: 6.613404773034895,
				width: 0.15,
				layer: "bottom",
			},
			{ route_type: "wire", x: 2, y: 4.8, width: 0.15, layer: "bottom" },
		],
	},
];
