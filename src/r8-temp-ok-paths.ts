import type { FanoutTracePath } from "@tscircuit/core";
// Keep the temperature-enable transition clear of R12's solder land.
export const r8TempOkPaths: FanoutTracePath[] = [
	{
		connection: "R12.pin2",
		route: [
			{ route_type: "wire", x: 10.253364, y: 10, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 10.253364, y: 11.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 10.253364,
				y: 11.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
