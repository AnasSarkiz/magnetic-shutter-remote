import type { FanoutTracePath } from "@tscircuit/core";
// Native returns for the existing 5.1k USB-C CC2 pulldown; supplier copper stays unchanged.
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
];
