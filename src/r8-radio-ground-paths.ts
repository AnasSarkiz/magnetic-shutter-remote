import type { FanoutTracePath } from "@tscircuit/core";

// Off-pad ground return into the native two-layer GND planes.
export const r8RadioGroundPaths: FanoutTracePath[] = [
	{
		connection: "U1.pin15",
		route: [
			{
				route_type: "wire",
				x: -7.750047999999999,
				y: -4.375075749999999,
				width: 0.5,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -9.5,
				y: -4.375075749999999,
				width: 0.5,
				layer: "top",
			},
			{
				route_type: "via",
				x: -9.5,
				y: -4.375075749999999,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
