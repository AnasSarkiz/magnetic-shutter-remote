import type { FanoutTracePath } from "@tscircuit/core";
// Supervisor decoupler return avoids drilling through its solder land.
export const r8SupervisorGroundPaths: FanoutTracePath[] = [
	{
		connection: "U4.pin1",
		route: [
			{
				route_type: "wire",
				x: -17.000002,
				y: -0.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -17.000002, y: -2, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -17.000002,
				y: -2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
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
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
