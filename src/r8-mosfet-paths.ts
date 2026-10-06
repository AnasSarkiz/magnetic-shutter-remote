import type { FanoutTracePath } from "@tscircuit/core";
// Off-pad ground return, preserving the exact supplier source pad.
export const r8MosfetPaths: FanoutTracePath[] = [
	{
		connection: "Q2.pin1",
		route: [
			{
				route_type: "wire",
				x: 8.999998,
				y: 5.05004,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 8.999998, y: 3.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 8.999998,
				y: 3.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "Q2.pin2",
		route: [
			{
				route_type: "wire",
				x: 8.999998,
				y: 6.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 11, y: 6.94996, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 11,
				y: 6.94996,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 11, y: 6.94996, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 11, y: 8.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 6.253364, y: 8.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 6.253364, y: 7.5, width: 0.15, layer: "bottom" },
		],
	},
];
