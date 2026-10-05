import type { FanoutTracePath } from "@tscircuit/core";
// Native USB-C pulldown returns; supplier copper stays unchanged.
export const r8CcPaths: FanoutTracePath[] = [
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
		],
	},
];
