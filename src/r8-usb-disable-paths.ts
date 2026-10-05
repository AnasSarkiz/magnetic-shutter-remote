import type { FanoutTracePath } from "@tscircuit/core";
// Q1 and its gate pull-down share one off-pad ground via.
export const r8UsbDisablePaths: FanoutTracePath[] = [
	{
		connection: "Q1.pin2",
		route: [
			{
				route_type: "wire",
				x: -3.000002,
				y: 1.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -1.5, y: 1.94996, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -1.5, y: 3.3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -1.5,
				y: 3.3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R6.pin2",
		route: [
			{ route_type: "wire", x: -0.753364, y: 1.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.753364, y: 3.3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -1.5, y: 3.3, width: 0.15, layer: "top" },
		],
	},
];
