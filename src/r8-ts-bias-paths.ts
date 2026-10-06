import type { FanoutTracePath } from "@tscircuit/core";
// Explicit off-pad vias preserve the no via-in-pad assembly requirement.
export const r8TsBiasPaths: FanoutTracePath[] = [
	{
		connection: "R9.pin1",
		route: [
			{ route_type: "wire", x: 0.246636, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 0.246636, y: 17.8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 0.246636,
				y: 17.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R9.pin2",
		route: [
			{ route_type: "wire", x: 1.753364, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3, y: 16.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 3,
				y: 16.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
