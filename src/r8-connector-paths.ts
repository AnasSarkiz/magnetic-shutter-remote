import type { FanoutTracePath } from "@tscircuit/core";
// Exact C160389 contact centres. Three-wire UART; no target power or reset lines.
export const r8ConnectorPaths: FanoutTracePath[] = [
	{
		connection: "J3.pin1",
		route: [
			{
				route_type: "wire",
				x: 14.200125,
				y: 17.3250037,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 14.200125, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 14.200125,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J3.pin2",
		route: [
			{
				route_type: "wire",
				x: 13.200127,
				y: 17.3250037,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 13.200127, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 13.200127,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J3.pin3",
		route: [
			{
				route_type: "wire",
				x: 12.200129,
				y: 17.3250037,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 12.200129, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 12.200129,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J3.pin4",
		route: [
			{
				route_type: "wire",
				x: 15.499842999999998,
				y: 14.8002437,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 17.3, y: 14.8002437, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 17.3,
				y: 14.8002437,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J3.pin5",
		route: [
			{
				route_type: "wire",
				x: 10.900157,
				y: 14.7999897,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 9.3, y: 16, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 9.3,
				y: 16,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
