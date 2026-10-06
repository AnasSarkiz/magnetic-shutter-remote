import type { FanoutTracePath } from "@tscircuit/core";
// Supervisor decoupler return avoids drilling through its solder land.
export const r8SupervisorGroundPaths: FanoutTracePath[] = [
	{
		connection: "C6.pin2",
		route: [
			{ route_type: "wire", x: -17.299976, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -16.5, y: 4.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -16.5,
				y: 4.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
