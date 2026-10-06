import type { FanoutTracePath } from "@tscircuit/core";
// Complete native reset-supervisor path kept outside the switching-power loop.
export const r8BatteryOkPaths: FanoutTracePath[] = [
	{
		connection: ".U4 > port.pin2",
		route: [
			{
				route_type: "wire",
				x: -17.000002,
				y: 0.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -16, y: 0.94996, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -16, y: -3.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -16,
				y: -3.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -16, y: -3.4, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: -16, y: -16, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 16, y: -16, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: 16,
				y: 2.750068,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "via",
				x: 16,
				y: 2.750068,
				from_layer: "bottom",
				to_layer: "top",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 16, y: 2.750068, width: 0.15, layer: "top" },
			{
				route_type: "wire",
				x: 17.50597835,
				y: 2.750068,
				width: 0.15,
				layer: "top",
			},
		],
	},
];
