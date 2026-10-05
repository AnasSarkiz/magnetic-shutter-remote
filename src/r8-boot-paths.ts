import type { FanoutTracePath } from "@tscircuit/core";
// Manual BOOT switch connects directly to module GPIO9; removed obsolete header branch.
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
];
