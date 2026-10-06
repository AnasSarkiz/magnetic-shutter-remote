import type { FanoutTracePath } from "@tscircuit/core";
// R8 native board copper at the rotated, unchanged supplier pads.
export const temperatureEscapePaths: FanoutTracePath[] = [
	{
		connection: "R10.pin2",
		route: [
			{ route_type: "wire", x: -5.253364, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -5.253364, y: 4.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -5.253364,
				y: 4.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
