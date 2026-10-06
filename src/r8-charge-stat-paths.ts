import type { FanoutTracePath } from "@tscircuit/core";
// Complete STAT path on the bottom, with a via outside the LED's solder land.
export const r8ChargeStatPaths: FanoutTracePath[] = [
	{
		connection: ".LED1 > port.pin2",
		route: [
			{ route_type: "wire", x: 7.249938, y: 26, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 7.249938, y: 24, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 7.249938,
				y: 24,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 7.249938, y: 24, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 7, y: 22, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 7, y: 11.8, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: -0.0003175,
				y: 11.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -0.0003175,
				y: 10.2,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];
