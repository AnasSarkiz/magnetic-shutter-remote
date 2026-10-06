import type { FanoutTracePath } from "@tscircuit/core";
// SYS capacitor ground via stays clear of its full solder land.
export const r8SysReturnPaths: FanoutTracePath[] = [
	{
		connection: "C8.pin2",
		route: [
			{ route_type: "wire", x: -6.499998, y: 13.4, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -8.4, y: 13.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -8.4,
				y: 13.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
