import type { FanoutTracePath } from "@tscircuit/core";
// Full charger-disable connection; transitions clear the USB and battery lands.
export const r8ChargeDisablePaths: FanoutTracePath[] = [
	{
		connection: ".R13 > port.pin2",
		route: [
			{ route_type: "wire", x: 7.246636, y: 12, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 6.1, y: 13, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 6.1,
				y: 13,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 6.1, y: 13, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 2.8, y: 11.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 1, y: 10.9, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: 0.9998075,
				y: 10.2,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
	{
		connection: ".Q2 > port.pin3",
		route: [
			{ route_type: "wire", x: 7.000002, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.7, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.7, y: 8.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.2, y: 9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.2, y: 13, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 8, y: 13, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 7.246636, y: 12, width: 0.15, layer: "top" },
		],
	},
];
