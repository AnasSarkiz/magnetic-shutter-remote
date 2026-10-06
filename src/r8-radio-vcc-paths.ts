import type { FanoutTracePath } from "@tscircuit/core";
// Off-pad supply transition retains the project drill-to-SMT clearance.
export const r8RadioVccPaths: FanoutTracePath[] = [
	{
		connection: "U1.pin8",
		route: [
			{
				route_type: "wire",
				x: 7.750048,
				y: -4.37507575,
				width: 0.3,
				layer: "top",
			},
			{ route_type: "wire", x: 8.8, y: -5.1, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: 8.8,
				y: -5.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 8.8, y: -5.1, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 8.8, y: -5.9, width: 0.3, layer: "bottom" },
		],
	},
];
