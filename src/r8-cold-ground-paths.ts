import type { FanoutTracePath } from "@tscircuit/core";

// Keep the ordinary ground barrel away from both temperature-set pads.
export const r8ColdGroundPaths: FanoutTracePath[] = [
	{
		connection: "R11.pin2",
		route: [
			{ route_type: "wire", x: 5.253364, y: 5.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 5.253364, y: 4.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 5.253364,
				y: 4.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
