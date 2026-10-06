import type { FanoutTracePath } from "@tscircuit/core";
// Complete native phase path from SYS capacitor to the charger's off-pad escape.
export const r8SysPaths: FanoutTracePath[] = [
	{
		connection: ".C8 > port.pin1",
		route: [
			{ route_type: "wire", x: -4.500002, y: 13.4, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -4.500002, y: 14.6, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: -4.500002,
				y: 14.6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: -4.500002,
				y: 14.6,
				width: 0.3,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -1.9999325,
				y: 10.2,
				width: 0.3,
				layer: "bottom",
			},
		],
	},
];
