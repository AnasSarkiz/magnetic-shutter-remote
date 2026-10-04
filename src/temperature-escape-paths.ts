import type { FanoutTracePath } from "@tscircuit/core";
// Native board copper; no component geometry modified.
export const temperatureEscapePaths: FanoutTracePath[] = [
	{
		connection: "R10.pin2",
		route: [
			{
				route_type: "wire",
				x: -4.746636,
				y: 6,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -3.4,
				y: 8.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -3.4,
				y: 8.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R10.pin1",
		route: [
			{
				route_type: "wire",
				x: -6.253364,
				y: 6,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -8.5,
				y: 6,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -8.5,
				y: 6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
