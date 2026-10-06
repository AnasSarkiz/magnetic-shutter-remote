import type { FanoutTracePath } from "@tscircuit/core";

// Native switching-loop copper at measured, unchanged supplier pad centres.
// Narrow pin necks widen after clearing adjacent 0.5 mm-pitch terminals.
export const r8PowerPaths: FanoutTracePath[] = [
	{
		connection: "C13.pin2",
		route: [
			{ route_type: "wire", x: -7, y: 3.700024, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 5, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -7.5, y: 6, width: 0.15, layer: "top" },
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
			{
				route_type: "via",
				x: -13,
				y: 3,
				from_layer: "top",
				to_layer: "bottom",
				via_diameter: 0.6,
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
				via_diameter: 0.6,
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
				via_diameter: 0.6,
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
				via_diameter: 0.6,
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
				via_diameter: 0.6,
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
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
	{
		connection: "U3.pin11",
		route: [
			{ route_type: "wire", x: -10, y: 3, width: 0.15, layer: "top" },
			{ route_type: "wire", x: -11.157478, y: 3, width: 0.15, layer: "top" },
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
				via_diameter: 0.6,
				via_hole_diameter: 0.3,
			},
		],
	},
];
