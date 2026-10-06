import type { FanoutTracePath } from "@tscircuit/core";
// Keep frame returns left of both non-plated locating holes.
export const r8ShutterGroundPaths: FanoutTracePath[] = [
	{
		connection: "SW2.pin3",
		route: [
			{
				route_type: "wire",
				x: 20.9499473,
				y: -10.6248878,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 20, y: -10.6248878, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "SW2.pin4",
		route: [
			{
				route_type: "wire",
				x: 20.9499473,
				y: -6.3751122,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 20, y: -6.3751122, width: 0.15, layer: "top" },
		],
	},
];
