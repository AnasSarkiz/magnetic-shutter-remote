import type { FanoutTracePath } from "@tscircuit/core";
// Reset EN escape transitions clear of the switch and programmer solder lands.
export const r8ResetPaths: FanoutTracePath[] = [
	{
		connection: "SW5.pin1",
		route: [
			{ route_type: "wire", x: 12.315092, y: 11.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 12.315092, y: 13.3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 12.315092,
				y: 13.3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
