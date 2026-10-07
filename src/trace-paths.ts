import type { FanoutTracePath } from "@tscircuit/core";
import type { TraceProps } from "@tscircuit/props";

// Unchanged qualified authored routes, consolidated for the active R8 design.

// r8-radio-vcc-paths.ts
// Off-pad supply transition retains the project drill-to-SMT clearance.
export const r8RadioVccPaths: FanoutTracePath[] = [
	{
		connection: "U1.pin8",
		route: [
			{
				route_type: "wire",
				x: 7.750048,
				y: -4.37507575,
				width: 0.3,
				layer: "top",
			},
			{ route_type: "wire", x: 8.8, y: -5.1, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: 8.8,
				y: -5.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 8.8, y: -5.1, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 8.8, y: -5.9, width: 0.3, layer: "bottom" },
		],
	},
];

// r8-temp-ok-paths.ts
// Keep the temperature-enable transition clear of R12's solder land.
export const r8TempOkPaths: FanoutTracePath[] = [
	{
		connection: "R12.pin2",
		route: [
			{ route_type: "wire", x: 10.253364, y: 10, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 10.253364, y: 11.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 10.253364,
				y: 11.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-shutter-ground-paths.ts
// Keep frame returns left of both non-plated locating holes.
export const r8ShutterGroundPaths: FanoutTracePath[] = [
	{
		connection: "SW2.pin3",
		route: [
			{
				route_type: "wire",
				x: 20.9499473,
				y: -10.6248878,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 20, y: -10.6248878, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "SW2.pin4",
		route: [
			{
				route_type: "wire",
				x: 20.9499473,
				y: -6.3751122,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 20, y: -6.3751122, width: 0.15, layer: "top" },
		],
	},
];

// r8-charge-led-supply-paths.ts
// Native pcbPath coordinates are relative to R4's PCB transform at (8,23).
// Explicit contact vertices preserve continuous wire-to-via connections.
export const r8ChargeLedSupplyPath: TraceProps["pcbPath"] = [
	{ x: -2, y: -1.8 },
	{ x: -2, y: -1.8, via: true, fromLayer: "top", toLayer: "bottom" },
	{ x: -2, y: -1.8 },
	{ x: -2, y: -7.5 },
	{ x: -3.9, y: -9.7 },
	{ x: -3.9, y: -9.7, via: true, fromLayer: "bottom", toLayer: "top" },
	{ x: -3.9, y: -9.7 },
	{ x: -3.9, y: -10.6 },
	"C2.pin1",
];

// r8-cold-ground-paths.ts
// Keep the ordinary ground barrel away from both temperature-set pads.
export const r8ColdGroundPaths: FanoutTracePath[] = [
	{
		connection: "R11.pin2",
		route: [
			{ route_type: "wire", x: 5.253364, y: 5.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 5.253364, y: 4.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 5.253364,
				y: 4.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-radio-ground-paths.ts
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
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-sys-return-paths.ts
// SYS capacitor ground via stays clear of its full solder land.
export const r8SysReturnPaths: FanoutTracePath[] = [
	{
		connection: "C8.pin2",
		route: [
			{ route_type: "wire", x: -6.499998, y: 13.4, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -8.4, y: 13.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -8.4,
				y: 13.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-supervisor-ground-paths.ts
// Supervisor decoupler return avoids drilling through its solder land.
export const r8SupervisorGroundPaths: FanoutTracePath[] = [
	{
		connection: "U4.pin1",
		route: [
			{
				route_type: "wire",
				x: -17.000002,
				y: -0.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -17.000002, y: -2, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -17.000002,
				y: -2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C6.pin2",
		route: [
			{ route_type: "wire", x: -17.299976, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -16.5, y: 4.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -16.5,
				y: 4.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-reset-paths.ts
// Reset EN escape transitions clear of the switch and programmer solder lands.
export const r8ResetPaths: FanoutTracePath[] = [
	{
		connection: "SW5.pin1",
		route: [
			{ route_type: "wire", x: 12.315092, y: 11.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 12.315092, y: 13.3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 12.315092,
				y: 13.3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-reg-enable-paths.ts
// Safe regulator-enable transition outside the resistor solder land.
export const r8RegEnablePaths: FanoutTracePath[] = [
	{
		connection: "R5.pin2",
		route: [
			{ route_type: "wire", x: 3.246636, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 2, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 2, y: 3.6, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 2,
				y: 3.6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-charge-disable-paths.ts
// Full charger-disable connection; transitions clear the USB and battery lands.
export const r8ChargeDisablePaths: FanoutTracePath[] = [
	{
		connection: ".Q2 port.pin3",
		route: [
			{ route_type: "wire", x: 7.000002, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.7, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.7, y: 8.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.2, y: 9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 11.2, y: 13, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 8, y: 13, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 7.246636, y: 12, width: 0.15, layer: "top" },
		],
	},
	{
		connection: ".R13 > port.pin2",
		route: [
			{ route_type: "wire", x: 7.246636, y: 12, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 6.1, y: 10.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 6.1,
				y: 10.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 6.1, y: 10.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 6.1, y: 11.1, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 1, y: 11.1, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: 0.9998075,
				y: 10.2,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];

// r8-temperature-hot-paths.ts
// Complete HOT setting connection, with a safe off-pad transition. Ends at
// the existing U5 SETA bottom breakout; no automatic near-trace return via.
export const r8TemperatureHotPaths: FanoutTracePath[] = [
	{
		connection: ".R10 > port.pin1",
		route: [
			{ route_type: "wire", x: -3.746636, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.4, y: 6.546636, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.4, y: 7.2, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -3.4,
				y: 7.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -3.4, y: 7.2, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: -2.613404773034895,
				y: 6.613404773034895,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.186595226965105,
				y: 6.613404773034895,
				width: 0.15,
				layer: "bottom",
			},
			{ route_type: "wire", x: 2, y: 4.8, width: 0.15, layer: "bottom" },
		],
	},
];

// r8-supervisor-vbat-paths.ts
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

// r8-radio-cap-paths.ts
export const r8RadioCapPaths: FanoutTracePath[] = [
	{
		connection: "C5.pin1",
		route: [
			{ route_type: "wire", x: 10.299976, y: -8, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 9.2, y: -8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 9.2,
				y: -8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C5.pin2",
		route: [
			{ route_type: "wire", x: 11.700024, y: -8, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 13, y: -8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 13,
				y: -8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-charge-stat-paths.ts
// Complete STAT path on the bottom, with a via outside the LED's solder land.
export const r8ChargeStatPaths: FanoutTracePath[] = [
	{
		connection: ".LED1 > port.pin2",
		route: [
			{ route_type: "wire", x: 7.249938, y: 26, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 7.249938, y: 24, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 7.249938,
				y: 24,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 7.249938, y: 24, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 7.35, y: 22, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 7.35, y: 11.8, width: 0.15, layer: "bottom" },
			{
				route_type: "wire",
				x: -0.0003175,
				y: 11.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -0.0003175,
				y: 10.2,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];

// r8-connector-paths.ts
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
				via_diameter: 0.45,
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
				via_diameter: 0.45,
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
				via_diameter: 0.45,
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
				via_diameter: 0.45,
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
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-boot-paths.ts
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

// r8-vset-paths.ts
// Low-current VSET path uses a deliberate off-pad transition and charger breakout.
export const r8VsetPaths: FanoutTracePath[] = [
	{
		connection: ".R8 > port.pin1",
		route: [
			{ route_type: "wire", x: -4.246636, y: 16, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -4.246636, y: 17.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -4.246636,
				y: 17.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: -4.246636,
				y: 17.4,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -4.246636,
				y: 16.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 16.8,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 15.8,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];
export const r8VsetGroundPaths: FanoutTracePath[] = [
	{
		connection: "R8.pin2",
		route: [
			{ route_type: "wire", x: -5.753364, y: 16, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.4, y: 16, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.4,
				y: 16,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-uart-rx-paths.ts
// Retained native route; reach the existing J3 breakout on its bottom layer.
// Avoid the automatic return via beside the SMT contact.
export const r8UartRxPaths: FanoutTracePath[] = [
	{
		connection: ".U1 > port.pin21",
		route: [
			{
				route_type: "wire",
				x: -7.7500480000000005,
				y: -16.375051749999997,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.066806372795548,
				y: -5.558197377204449,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 4.769370944286397,
				y: -5.558197377204449,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 4.941802622795551,
				y: -5.558197377204449,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 4.958,
				y: -5.542,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 4.958,
				y: -5.542,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: 4.958,
				y: -5.542,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 6.7739044613976045,
				y: -5.542,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.917139474015814,
				y: 3.60123501261821,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.917139474015814,
				y: 13.165155472129875,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.266421294914682,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.367687117699495,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.468952940484305,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.570218763269114,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.671484586053925,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.772750408838734,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.941516048765004,
				y: 13.874016231623544,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 14.127180788585571,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 14.53224407972481,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 14.937307370864053,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 15.342370662003292,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 15.747433953142535,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 16.152497244281772,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.8908831373726,
				y: 16.55756053542101,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.485819846233362,
				y: 16.55756053542101,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.080756555094117,
				y: 16.55756053542101,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 15.080756555094117,
				y: 16.962623826560254,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 14.200125,
				y: 16.962623826560254,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 14.200125,
				y: 19,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];

// r8-usb-disable-paths.ts
// Q1 and its gate pull-down share one off-pad ground via.
export const r8UsbDisablePaths: FanoutTracePath[] = [
	{
		connection: "Q1.pin3",
		route: [
			{ route_type: "wire", x: -4.999998, y: 1, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -5, y: 0, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -5,
				y: 0,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "Q1.pin2",
		route: [
			{
				route_type: "wire",
				x: -3.000002,
				y: 1.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -1.5, y: 1.94996, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -1.5, y: 3.3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -1.5,
				y: 3.3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R6.pin2",
		route: [
			{ route_type: "wire", x: -0.753364, y: 1.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.753364, y: 3.3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -1.5, y: 3.3, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "R6.pin1",
		route: [
			{ route_type: "wire", x: 0.753364, y: 1.5, width: 0.3, layer: "top" },
			{ route_type: "wire", x: 3, y: 1.5, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: 3,
				y: 1.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-battery-ok-paths.ts
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
				via_diameter: 0.45,
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
				via_diameter: 0.45,
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

// r8-cc-paths.ts
// Native USB-C pulldown returns; supplier copper stays unchanged.
export const r8CcPaths: FanoutTracePath[] = [
	{
		connection: "R1.pin1",
		route: [
			{ route_type: "wire", x: -4.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -6, y: 19, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -6,
				y: 19,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R2.pin1",
		route: [
			{ route_type: "wire", x: -0.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.753364, y: 19.9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -0.8, y: 19.9, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "R2.pin2",
		route: [
			{ route_type: "wire", x: 0.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 1.753364, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 1.753364, y: 18.2, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "R1.pin2",
		route: [
			{ route_type: "wire", x: -3.246636, y: 19, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.246636, y: 19.9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -3.6, y: 20.1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -3.6,
				y: 20.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -3.6, y: 20.1, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: -4.6, y: 20.1, width: 0.15, layer: "bottom" },
		],
	},
];

// r8-bulk-cap-paths.ts
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

// r8-mosfet-paths.ts
// Off-pad ground return, preserving the exact supplier source pad.
export const r8MosfetPaths: FanoutTracePath[] = [
	{
		connection: "Q2.pin1",
		route: [
			{
				route_type: "wire",
				x: 8.999998,
				y: 5.05004,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 8.999998, y: 3.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 8.999998,
				y: 3.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "Q2.pin2",
		route: [
			{
				route_type: "wire",
				x: 8.999998,
				y: 6.94996,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: 11, y: 6.94996, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 11,
				y: 6.94996,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 11, y: 6.94996, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 11, y: 8.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 6.253364, y: 8.5, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: 6.253364, y: 7.5, width: 0.15, layer: "bottom" },
		],
	},
];

// r8-prog-routing-paths.ts
// Complete ISET resistor fanout joins the charger breakout off-pad.
// All geometry is revalidated by native and independent checks.
export const r8ProgRoutingPaths: FanoutTracePath[] = [
	{
		connection: "R3.pin1",
		route: [
			{
				route_type: "wire",
				x: 4.746636,
				y: 9,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 4.746636,
				y: 7.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 4.746636,
				y: 7.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: 4.746636,
				y: 7.5,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 4.612587055843752,
				y: 7.634048944156247,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 4.612587055843752,
				y: 7.941722022618542,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 4.988982440361503,
				y: 8.400549642074893,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 8.371,
				y: 11.70013496677479,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 8.1349072,
				y: 14.783,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "via",
				x: 8.1349072,
				y: 14.783,
				from_layer: "bottom",
				to_layer: "top",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: 8.1349072,
				y: 14.783,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 8.324231787616126,
				y: 14.829768212383874,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 8.306704585729939,
				y: 14.829768212383874,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 8.243326760829126,
				y: 14.893146037284687,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.932819450459727,
				y: 14.794151087918571,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.932819450459727,
				y: 14.794151087918571,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: 3.932819450459727,
				y: 14.794151087918571,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 3.6852678425748246,
				y: 15.05532236414698,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 0.7579855657123596,
				y: 15.046771679154215,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -0.00031749999999999997,
				y: 15.8,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
];

// r8-prog-paths.ts
export const r8ProgPaths: FanoutTracePath[] = [
	{
		connection: "R3.pin2",
		route: [
			{ route_type: "wire", x: 6.253364, y: 9, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 6.253364, y: 7.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 6.253364,
				y: 7.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-sys-paths.ts
// Complete native phase path from SYS capacitor to the charger's off-pad escape.
export const r8SysPaths: FanoutTracePath[] = [
	{
		connection: ".C8 > port.pin1",
		route: [
			{ route_type: "wire", x: -4.500002, y: 13.4, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -4.500002, y: 14.6, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: -4.500002,
				y: 14.6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{
				route_type: "wire",
				x: -4.500002,
				y: 14.6,
				width: 0.3,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -1.9999325,
				y: 10.2,
				width: 0.3,
				layer: "bottom",
			},
		],
	},
];

// r8-ts-bias-paths.ts
// Explicit off-pad vias preserve the no via-in-pad assembly requirement.
export const r8TsBiasPaths: FanoutTracePath[] = [
	{
		connection: "R9.pin1",
		route: [
			{ route_type: "wire", x: 0.246636, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 0.246636, y: 17.8, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 0.246636,
				y: 17.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "R9.pin2",
		route: [
			{ route_type: "wire", x: 1.753364, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3, y: 17, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3, y: 16.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: 3,
				y: 16.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-power-paths.ts
// Native switching-loop copper at measured, unchanged supplier pad centres.
// Narrow pin necks widen after clearing adjacent 0.5 mm-pitch terminals.
export const r8PowerPaths: FanoutTracePath[] = [
	{
		connection: "C3.pin1",
		route: [
			{ route_type: "wire", x: -10.999998, y: 0, width: 0.5, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: -1.5, width: 0.5, layer: "top" },
			{
				route_type: "via",
				x: -10.999998,
				y: -1.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C13.pin2",
		route: [
			{ route_type: "wire", x: -7, y: 3.700024, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 6, width: 0.15, layer: "top" },
			// Same physical GND barrel as the EP/decoupler path; core merges holes.
			{
				route_type: "via",
				x: -7.5,
				y: 6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin5",
		route: [
			{
				route_type: "wire",
				x: -11.157478,
				y: 2.000002,
				width: 0.3,
				layer: "top",
			},
			{ route_type: "wire", x: -11.157478, y: 1.5, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 0, width: 0.6, layer: "top" },
		],
	},
	{
		connection: "U3.pin1",
		route: [
			{
				route_type: "wire",
				x: -11.157478,
				y: 3.999998,
				width: 0.2,
				layer: "top",
			},
			{ route_type: "wire", x: -11.157478, y: 4.5, width: 0.2, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 6, width: 0.6, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 8.5, width: 0.6, layer: "top" },
		],
	},
	{
		connection: "U3.pin2",
		route: [
			{
				route_type: "wire",
				x: -11.157478,
				y: 3.499872,
				width: 0.3,
				layer: "top",
			},
			{ route_type: "wire", x: -12, y: 3.499872, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -12.8, y: 4.35001, width: 0.4, layer: "top" },
			{ route_type: "wire", x: -14, y: 4.35001, width: 0.6, layer: "top" },
		],
	},
	{
		connection: "U3.pin4",
		route: [
			{
				route_type: "wire",
				x: -11.157478,
				y: 2.499874,
				width: 0.3,
				layer: "top",
			},
			{ route_type: "wire", x: -12, y: 2.499874, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -12.8, y: 1.64999, width: 0.4, layer: "top" },
			{ route_type: "wire", x: -14, y: 1.64999, width: 0.6, layer: "top" },
		],
	},
	{
		connection: "U3.pin8",
		route: [
			{ route_type: "wire", x: -8.842522, y: 3, width: 0.2, layer: "top" },
			{ route_type: "wire", x: -8, y: 3, width: 0.2, layer: "top" },
			{ route_type: "wire", x: -7, y: 2.299976, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -7, y: -1.5, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: -1.5, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 0, width: 0.3, layer: "top" },
		],
	},
	{
		connection: "C11.pin1",
		route: [
			{ route_type: "wire", x: -13.000002, y: -1, width: 0.5, layer: "top" },
			{ route_type: "wire", x: -12, y: -1, width: 0.5, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 0, width: 0.5, layer: "top" },
		],
	},
	{
		connection: "U3.pin10",
		route: [
			{
				route_type: "wire",
				x: -8.842522,
				y: 3.999998,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -8.842522, y: 4.7, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -9, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -10.999998, y: 6, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "U3.pin3",
		route: [
			{ route_type: "wire", x: -11.157478, y: 3, width: 0.2, layer: "top" },
			{ route_type: "wire", x: -13, y: 3, width: 0.2, layer: "top" },
			// Same physical GND barrel as the EP/decoupler path; core merges holes.
			{
				route_type: "via",
				x: -13,
				y: 3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin9",
		route: [
			{
				route_type: "wire",
				x: -8.842522,
				y: 3.499872,
				width: 0.2,
				layer: "top",
			},
			{ route_type: "wire", x: -8, y: 3.499872, width: 0.2, layer: "top" },
			{ route_type: "wire", x: -8, y: 4.8, width: 0.2, layer: "top" },
			{
				route_type: "via",
				x: -8,
				y: 4.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin7",
		route: [
			{
				route_type: "wire",
				x: -8.842522,
				y: 2.499874,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -10, y: 2.499874, width: 0.15, layer: "top" },
			// Join the existing off-pad ground barrel through the solid EP copper.
			{ route_type: "wire", x: -10, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -11.157478, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -13, y: 3, width: 0.15, layer: "top" },
			// Same physical GND barrel as the EP/decoupler path; core merges holes.
			{
				route_type: "via",
				x: -13,
				y: 3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C3.pin2",
		route: [
			{ route_type: "wire", x: -9.000002, y: 0, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.8, y: 0, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.8,
				y: 0,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C4.pin2",
		route: [
			{ route_type: "wire", x: -9.000002, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 6, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.5,
				y: 6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C12.pin2",
		route: [
			{ route_type: "wire", x: -9.000002, y: 8.5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 8.5, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.5,
				y: 8.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C11.pin2",
		route: [
			{ route_type: "wire", x: -14.999998, y: -1, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -14.999998, y: -3, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -14.999998,
				y: -3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin11",
		route: [
			{ route_type: "wire", x: -10, y: 3, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -11.157478, y: 3, width: 0.3, layer: "top" },
			{ route_type: "wire", x: -13, y: 3, width: 0.3, layer: "top" },
			{
				route_type: "via",
				x: -13,
				y: 3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin6",
		route: [
			{
				route_type: "wire",
				x: -8.842522,
				y: 2.000002,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -7.9, y: 1, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -7.9,
				y: 1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// sensor-escape-paths.ts
// Native board copper; supplier footprint and pin mapping are unchanged.
export const sensorEscapePaths: FanoutTracePath[] = [
	{
		connection: "U5.pin1",
		route: [
			{
				route_type: "wire",
				x: 0.7499858,
				y: 5.500001,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.3,
				y: 5.500001,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 2,
				y: 4.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 2,
				y: 4.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U5.pin2",
		route: [
			{
				route_type: "wire",
				x: 0.7499858,
				y: 5.999873,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.3,
				y: 5.999873,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 2.3,
				y: 6,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 2.3,
				y: 6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U5.pin3",
		route: [
			{
				route_type: "wire",
				x: 0.7499858,
				y: 6.499999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.3,
				y: 6.499999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 2,
				y: 7.2,
				width: 0.15,
				layer: "top",
			},
			// Keep the sensor return on top to its decoupling-capacitor return.
			{ route_type: "wire", x: 2, y: 7.2, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3.2, y: 8.4, width: 0.15, layer: "top" },
			{ route_type: "wire", x: 3.2, y: 8.5, width: 0.15, layer: "top" },
		],
	},
	{
		connection: "U5.pin4",
		route: [
			{
				route_type: "wire",
				x: -0.7499858,
				y: 6.499999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -1.3,
				y: 6.499999,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2,
				y: 7.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2,
				y: 7.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U5.pin5",
		route: [
			{
				route_type: "wire",
				x: -0.7499858,
				y: 5.999873,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -1.3,
				y: 5.999873,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.3,
				y: 6,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2.3,
				y: 6,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U5.pin6",
		route: [
			{
				route_type: "wire",
				x: -0.7499858,
				y: 5.500001,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -1.3,
				y: 5.500001,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2,
				y: 4.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2,
				y: 4.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// r8-battery-cap-paths.ts
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

// c7-escape-paths.ts
// Native board copper connected to unchanged supplier pad centres.
export const sensorCapEscapePaths: FanoutTracePath[] = [
	{
		connection: "C7.pin1",
		route: [
			{
				route_type: "wire",
				x: 0.799976,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.8,
				y: 9.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.8,
				y: 9.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "C7.pin2",
		route: [
			{
				route_type: "wire",
				x: 2.200024,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.2,
				y: 8.5,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.2,
				y: 8.5,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// usb-escape-paths.ts
// Native USB routing retains supplier lands and uses 0.30/0.45 mm through vias.
export const usbEscapePaths: FanoutTracePath[] = [
	{
		connection: "J1.pin14",
		route: [
			{
				route_type: "wire",
				x: -4.319905,
				y: 22.5601774,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -6,
				y: 21.9027014,
				width: 0.15,
				layer: "bottom",
			},
			// Join the existing USB ground via, without adding a drill near shell slots.
			{ route_type: "wire", x: -6, y: 20.1, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: -4.6, y: 20.1, width: 0.15, layer: "bottom" },
		],
	},
	{
		connection: "J1.pin13",
		route: [
			{
				route_type: "wire",
				x: 4.319905,
				y: 22.5601774,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 6,
				y: 21.902701399999998,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
	{
		connection: "J1.pin15",
		route: [
			{
				route_type: "wire",
				x: 4.319905,
				y: 26.5601694,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: 6,
				y: 25.6027194,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
	{
		connection: "J1.pin16",
		route: [
			{
				route_type: "wire",
				x: -4.319905,
				y: 26.5601694,
				width: 0.15,
				layer: "bottom",
			},
			{
				route_type: "wire",
				x: -6,
				y: 25.602719399999998,
				width: 0.15,
				layer: "bottom",
			},
		],
	},
	{
		connection: "J1.pin28",
		route: [
			{
				route_type: "wire",
				x: -3.200019,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -3.200019,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -3.6,
				y: 20.1,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -3.6,
				y: 20.1,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: -3.6, y: 20.1, width: 0.15, layer: "bottom" },
			{ route_type: "wire", x: -4.6, y: 20.1, width: 0.15, layer: "bottom" },
		],
	},
	{
		connection: "J1.pin27",
		route: [
			{
				route_type: "wire",
				x: -2.400173,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.400173,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2,
				y: 19.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2,
				y: 19.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			// Pair VBUS on bottom north of CC and TS-bias transitions.
			{ route_type: "wire", x: -2, y: 19.8, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: -2, y: 20.8, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 2, y: 20.8, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 2, y: 19.8, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 2, y: 18.8, width: 0.3, layer: "bottom" },
		],
	},
	{
		connection: "J1.pin26",
		route: [
			{
				route_type: "wire",
				x: -1.750187,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -1.750187,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.8,
				y: 19.9,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -0.8,
				y: 19.9,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J1.pin20",
		route: [
			{
				route_type: "wire",
				x: 1.249807,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.249807,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.8,
				y: 19.9,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.8,
				y: 19.9,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "J1.pin18",
		route: [
			{
				route_type: "wire",
				x: 2.399919,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 2.399919,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 2,
				y: 19.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 2,
				y: 19.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
			{ route_type: "wire", x: 2, y: 19.8, width: 0.3, layer: "bottom" },
			{ route_type: "wire", x: 2, y: 18.8, width: 0.3, layer: "bottom" },
		],
	},
	{
		connection: "J1.pin17",
		route: [
			{
				route_type: "wire",
				x: 3.200019,
				y: 21.9602294,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.200019,
				y: 20.4,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 3.6,
				y: 19.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 3.6,
				y: 19.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// temperature-escape-paths.ts
// R8 native board copper at the rotated, unchanged supplier pads.
export const temperatureEscapePaths: FanoutTracePath[] = [
	{
		connection: "R10.pin2",
		route: [
			{ route_type: "wire", x: -5.253364, y: 6, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -5.253364, y: 4.4, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -5.253364,
				y: 4.4,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];

// charger-escape-paths.ts
// Native board copper from audited supplier pad centres.
export const chargerEscapePaths: FanoutTracePath[] = [
	{
		connection: "U2.pin1",
		route: [
			{
				route_type: "wire",
				x: -0.799973,
				y: 11.949964,
				width: 0.15,
				layer: "top",
			},
			{ route_type: "wire", x: -0.799973, y: 11.2, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -1.9999325, y: 10.2, width: 0.15, layer: "top" },
			{
				route_type: "via",
				x: -1.9999325,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin2",
		route: [
			{
				route_type: "wire",
				x: -0.399923,
				y: 11.950218,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.399923,
				y: 11.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.9998075,
				y: 10.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -0.9998075,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin3",
		route: [
			{
				route_type: "wire",
				x: -0.000127,
				y: 11.950218,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.000127,
				y: 11.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.00031749999999999997,
				y: 10.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -0.00031749999999999997,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin4",
		route: [
			{
				route_type: "wire",
				x: 0.399923,
				y: 11.950218,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.399923,
				y: 11.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 10.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.9998075,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin5",
		route: [
			{
				route_type: "wire",
				x: 0.799973,
				y: 11.950218,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.799973,
				y: 11.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.9999325000000001,
				y: 10.2,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 1.9999325000000001,
				y: 10.2,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin6",
		route: [
			{
				route_type: "wire",
				x: 0.799973,
				y: 14.050036,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.799973,
				y: 14.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 1.9999325000000001,
				y: 15.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 1.9999325000000001,
				y: 15.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin7",
		route: [
			{
				route_type: "wire",
				x: 0.399923,
				y: 14.050036,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.399923,
				y: 14.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: 0.9998075,
				y: 15.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: 0.9998075,
				y: 15.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin8",
		route: [
			{
				route_type: "wire",
				x: -0.000127,
				y: 14.050036,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.000127,
				y: 14.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.00031749999999999997,
				y: 15.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -0.00031749999999999997,
				y: 15.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin10",
		route: [
			{
				route_type: "wire",
				x: -0.799973,
				y: 14.050036,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -0.799973,
				y: 14.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -1.9999325000000001,
				y: 15.8,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -1.9999325000000001,
				y: 15.8,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U2.pin11",
		route: [
			{
				route_type: "wire",
				x: -0.000127,
				y: 13,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "wire",
				x: -2.5,
				y: 13,
				width: 0.15,
				layer: "top",
			},
			{
				route_type: "via",
				x: -2.5,
				y: 13,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.45,
				via_hole_diameter: 0.3,
			},
		],
	},
];
