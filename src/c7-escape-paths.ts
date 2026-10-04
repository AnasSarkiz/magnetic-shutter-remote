import type { FanoutTracePath } from "@tscircuit/core";
// Native board copper connected to unchanged supplier pad centres.
export const sensorCapEscapePaths: FanoutTracePath[] = [
	{
		connection: "C7.pin1",
		route: [
			{
				route_type: "wire",
				x: 0.799976,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.8,
				y: 9.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.8,
				y: 9.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C7.pin2",
		route: [
			{
				route_type: "wire",
				x: 2.200024,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.2,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.2,
				y: 8.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
