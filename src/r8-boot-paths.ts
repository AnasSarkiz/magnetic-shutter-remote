import type { FanoutTracePath } from "@tscircuit/core";
// Native BOOT tree with its layer transition away from unconnected module lands.
export const r8BootPaths: FanoutTracePath[] = [
	{
		connection: ".SW4 > port.pin1",
		route: [
			{
				route_type: "wire",
				x: -21.184908,
				y: -9,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -19.80993625,
				y: -10.375063749999999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -7.750048,
				y: -10.375063749999999,
				width: 0.15,
				layer: "top",
			},
		],
	},
	{
		connection: ".U1 > port.pin18",
		route: [
			{
				route_type: "wire",
				x: -7.750048,
				y: -10.375063749999999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -6.7808268276802375,
				y: -10.375063749999999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.2599990000000009,
				y: -4.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.09899901000000093,
				y: -4.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.09899901000000093,
				y: -4.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: 0.09899901000000093,
				y: -4.5,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 1.8270203360795096,
				y: -4.5,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 11.576273945788808,
				y: 6.586406433667378,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 11.557033667591371,
				y: 18.142966332408626,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 10.700132,
				y: 19,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];
