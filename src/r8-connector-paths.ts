import type { FanoutTracePath } from "@tscircuit/core";
// Measured J3 signal pad centres; exits have sufficient drill-to-land clearance.
export const r8ConnectorPaths: FanoutTracePath[] = [
	{
		connection: "J3.pin1",
		route: [
			{
				route_type: "wire",
				x: 15.699614,
				y: 17.3252577,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 15.699614, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 15.699614,
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
				x: 14.699616,
				y: 17.3252577,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 14.699616, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 14.699616,
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
				x: 13.699618,
				y: 17.3252577,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 13.699618, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 13.699618,
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
				x: 12.69962,
				y: 17.3252577,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 12.69962, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 12.69962,
				y: 19,
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
				x: 11.699622,
				y: 17.3252577,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 11.699622, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 11.699622,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J3.pin6",
		route: [
			{
				route_type: "wire",
				x: 10.700132,
				y: 17.3247497,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 10.700132, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 10.700132,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
