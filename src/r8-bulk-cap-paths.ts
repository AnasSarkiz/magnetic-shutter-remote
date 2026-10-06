import type { FanoutTracePath } from "@tscircuit/core";
// Off-pad return for the rotated exact supplier bulk capacitor.
export const r8BulkCapPaths: FanoutTracePath[] = [
	{
		connection: "C10.pin1",
		route: [
			{ route_type: "wire", x: 12, y: -5.499998, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 10.5, y: -5.499998, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 10.5,
				y: -5.499998,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C10.pin2",
		route: [
			{ route_type: "wire", x: 12, y: -3.500002, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 14, y: -3.500002, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 14,
				y: -3.500002,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 14, y: -3.500002, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 14, y: -6.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 13, y: -6.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 13, y: -8, width: 0.15, layer: "bottom" },
		],
	},
];
