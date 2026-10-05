import type { FanoutTracePath } from "@tscircuit/core";
export const r8ProgPaths: FanoutTracePath[] = [
	{
		connection: "R3.pin2",
		route: [
			{ route_type: "wire", x: 6.253364, y: 9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 6.253364, y: 7.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 6.253364,
				y: 7.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R3.pin1",
		route: [
			{ route_type: "wire", x: 4.746636, y: 9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 4.746636, y: 7.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 4.746636,
				y: 7.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
