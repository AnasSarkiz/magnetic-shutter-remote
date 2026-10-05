import type { FanoutTracePath } from "@tscircuit/core";
// Native board copper connected to unchanged supplier pad centres.
export const batteryCapEscapePaths: FanoutTracePath[] = [
	{
		connection: "C2.pin1",
		route: [
			{
				route_type: "wire",
				x: 3.799976,
				y: 11.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.8,
				y: 9.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.8,
				y: 9.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C2.pin2",
		route: [
			{
				route_type: "wire",
				x: 5.200024,
				y: 11.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 5.2,
				y: 13.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 5.2,
				y: 13.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
