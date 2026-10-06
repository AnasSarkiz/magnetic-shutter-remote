import type { FanoutTracePath } from "@tscircuit/core";
// Safe regulator-enable transition outside the resistor solder land.
export const r8RegEnablePaths: FanoutTracePath[] = [
	{
		connection: "R5.pin2",
		route: [
			{ route_type: "wire", x: 3.246636, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 2, y: 3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 2,
				y: 3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
