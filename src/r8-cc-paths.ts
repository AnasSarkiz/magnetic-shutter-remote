import type { FanoutTracePath } from "@tscircuit/core";
// Native USB-C pulldown returns; supplier copper stays unchanged.
export const r8CcPaths: FanoutTracePath[] = [
	{
		connection: "R1.pin1",
		route: [
			{ route_type: "wire", x: -4.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -6, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -6,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R2.pin1",
		route: [
			{ route_type: "wire", x: -0.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.753364, y: 19.9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.8, y: 19.9, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "R2.pin2",
		route: [
			{ route_type: "wire", x: 0.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 1.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 1.753364, y: 18.2, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "R1.pin2",
		route: [
			{ route_type: "wire", x: -3.246636, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.246636, y: 19.9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.6, y: 20.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -3.6,
				y: 20.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -3.6, y: 20.1, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: -4.6, y: 20.1, width: 0.15, layer: "bottom" },
		],
	},
];
