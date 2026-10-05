import type { FanoutTracePath } from "@tscircuit/core";
// Native board copper; qualified supplier pad geometry is unchanged.
export const regulatorEscapePaths: FanoutTracePath[] = [
	{
		connection: "U3.pin1",
		route: [
			{
				route_type: "wire",
				x: -3.899926,
				y: -0.949833,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.4,
				y: -0.95,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2.4,
				y: -0.95,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin2",
		route: [
			{
				route_type: "wire",
				x: -3.899926,
				y: -0.000127,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.4,
				y: 0,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2.4,
				y: 0,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin3",
		route: [
			{
				route_type: "wire",
				x: -3.899926,
				y: 0.949833,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.4,
				y: 0.95,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2.4,
				y: 0.95,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin5",
		route: [
			{
				route_type: "wire",
				x: -6.100074,
				y: -0.950087,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -7.7,
				y: -0.95,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -7.7,
				y: -0.95,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
