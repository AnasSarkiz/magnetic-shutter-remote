import type { FanoutTracePath } from "@tscircuit/core";
// Keep the VBAT barrel away from U4's SMT land; no via in/against the pad.
export const r8SupervisorVbatPaths: FanoutTracePath[] = [
	{
		connection: "U4.pin3",
		route: [
			{ route_type: "wire", x: -18.999998, y: 0, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -20.1, y: 0, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: -20.1,
				y: 0,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
