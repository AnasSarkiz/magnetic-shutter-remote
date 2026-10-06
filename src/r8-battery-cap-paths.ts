import type { FanoutTracePath } from "@tscircuit/core";
// Native board copper connected to unchanged supplier pad centres.
export const r8BatteryCapEscapePaths: FanoutTracePath[] = [
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
				y: 10.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.8,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 3.8, y: 10.2, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 3.8, y: 7.9, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: -0.9998075,
				y: 7.9,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -0.9998075,
				y: 10.2,
				width: 0.15,
				layer: "bottom",
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
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
