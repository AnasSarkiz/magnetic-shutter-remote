import type { FanoutTracePath } from "@tscircuit/core";
// Low-current VSET path uses a deliberate off-pad transition and charger breakout.
export const r8VsetPaths: FanoutTracePath[] = [
	{
		connection: ".R8 > port.pin1",
		route: [
			{ route_type: "wire", x: -4.246636, y: 16, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -4.246636, y: 17.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -4.246636,
				y: 17.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: -4.246636,
				y: 17.4,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -4.246636,
				y: 16.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 16.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 15.8,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];
export const r8VsetGroundPaths: FanoutTracePath[] = [
	{
		connection: "R8.pin2",
		route: [
			{ route_type: "wire", x: -5.753364, y: 16, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.4, y: 16, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.4,
				y: 16,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
