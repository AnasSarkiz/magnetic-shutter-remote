import type { FanoutTracePath } from "@tscircuit/core";
export const r8RadioCapPaths: FanoutTracePath[] = [
	{
		connection: "C5.pin1",
		route: [
			{ route_type: "wire", x: 10.299976, y: -8, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 9.2, y: -8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 9.2,
				y: -8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C5.pin2",
		route: [
			{ route_type: "wire", x: 11.700024, y: -8, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 13, y: -8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 13,
				y: -8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
