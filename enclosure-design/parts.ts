import {
	bar,
	box,
	colored,
	cylinder,
	hull,
	move,
	ring,
	roundedBox,
	subtract,
	union,
	type MechanicalPlan,
	type Point3,
	type Rgb,
} from "./geometry";
import { dimensions as d } from "./dimensions";

export type PartRole = "printed" | "optic" | "external_envelope" | "reference";
export interface MechanicalPart {
	name: string;
	plan: MechanicalPlan;
	role: PartRole;
	material: string;
	explodeZ: number;
	translucent?: boolean;
}

const graphite: Rgb = [0.075, 0.09, 0.105];
const face: Rgb = [0.14, 0.16, 0.18];
const coral: Rgb = [0.76, 0.17, 0.16];
const clearWhite: Rgb = [0.91, 0.95, 0.98];
const steel: Rgb = [0.56, 0.61, 0.65];

function shellProfile(options: { z: number; height: number }): MechanicalPlan {
	return roundedBox({
		width: d.body.width,
		length: d.body.length,
		radius: d.body.cornerRadius,
		...options,
	});
}

function magnetPocket(options: {
	x: number;
	y: number;
	z: number;
	height?: number;
}): MechanicalPlan {
	return cylinder({ ...options, radius: 3.325, height: options.height ?? 3.5 });
}

export function createBase(): MechanicalPlan {
	const outer = shellProfile({
		z: d.body.bottomZ,
		height: d.body.seamZ - d.body.bottomZ,
	});
	const cavity = roundedBox({
		width: d.body.insideWidth,
		length: d.body.insideLength,
		radius: 4.6,
		z: -4.1,
		height: 17,
	});
	const posts = [-13, 13].map((x) =>
		cylinder({ x, y: 24, radius: 2.85, z: -4.1, height: 3.6 }),
	);
	const magnetBosses = [-13, 13].map((x) =>
		cylinder({ x, y: 16, radius: 4.5, z: -4.1, height: 3.5 }),
	);
	const screwBores = [-13, 13].map((x) =>
		cylinder({ x, y: 24, radius: 1.6, z: -4.25, height: 3.76 }),
	);
	const ledgeSupports = [-17.6, 17.6].map((x) =>
		box([1.2, 5, 3.6], [x, -8, -2.3]),
	);
	const cradleShelves = [
		[-20.5, -4.8],
		[20.5, -6.9],
		[-20.5, 21],
		[20.5, 21],
	].map(([x, y]) => box([4.5, 2.3, 0.8], [x, y, 2.0]));
	const usbTunnel = box(
		[d.usb.openingWidth, 12, d.usb.openingHeight],
		[0, 31, d.usb.openingCentreZ],
	);
	const usbShoulder = roundedBox({
		width: d.usb.shoulderReliefWidth,
		length: 8,
		radius: 1,
		y: 32.2,
		z: -3.4,
		height: 10.8,
	});
	const sliderOpening = box(
		[8, d.power.slotLength, d.power.slotHeight],
		[21, d.power.y, 1.5],
	);
	const pockets = [-13, 13].map((x) => magnetPocket({ x, y: 16, z: -4.1 }));
	const grooves = [-16, -13, -10, -7, -4, -1, 2].map((y) =>
		box([0.55, 0.65, 9], [-22.9, y, 5.0]),
	);
	return colored(
		graphite,
		subtract(
			union(
				subtract(outer, cavity),
				...posts,
				...magnetBosses,
				...ledgeSupports,
				...cradleShelves,
			),
			...screwBores,
			...pockets,
			usbTunnel,
			usbShoulder,
			sliderOpening,
			...grooves,
		),
	);
}

export function createLid(): MechanicalPlan {
	const roof = shellProfile({ z: d.body.seamZ, height: d.body.lid });
	const lip = subtract(
		roundedBox({
			width: 42.6,
			length: 60.6,
			radius: 4.3,
			z: 10.1,
			height: 1.6,
		}),
		roundedBox({
			width: 40.8,
			length: 58.8,
			radius: 3.4,
			z: 10.0,
			height: 1.9,
		}),
	);
	const columns = [-13, 13].map((x) =>
		cylinder({ x, y: 24, radius: 2.3, z: 0.6, height: 11.1 }),
	);
	const guides = [d.shutter, d.pair].flatMap((p) => {
		const radius = p === d.shutter ? 7.2 : 4.8;
		return [
			ring({
				x: p.x,
				y: p.y,
				z: 8.5,
				outerRadius: radius,
				innerRadius: radius - 0.5,
				height: 3.2,
			}),
			ring({
				x: p.x,
				y: p.y,
				z: 8.5,
				outerRadius: 2.4,
				innerRadius: 1.45,
				height: 0.8,
			}),
			box([radius - 2.2, 0.8, 0.8], [p.x + (radius + 2.2) / 2, p.y, 8.9]),
			box([radius - 2.2, 0.8, 0.8], [p.x - (radius + 2.2) / 2, p.y, 8.9]),
		];
	});
	const opticShroud = hull(
		cylinder({ x: 10, y: 0, z: 8.9, radius: 1.9, height: 3 }),
		cylinder({ x: -8.1, y: -5.4, z: 10.3, radius: 1.9, height: 2.1 }),
	);
	const shroudChannel = hull(
		cylinder({ x: 10, y: 0, z: 9.2, radius: 1.5, height: 1.7 }),
		cylinder({ x: -8.1, y: -5.4, z: 10.5, radius: 1.5, height: 1.7 }),
	);
	const ringHole = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 11.25,
		radius: 6.15,
		height: 3,
	});
	const flangeSeat = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 11.25,
		radius: 6.7,
		height: 0.75,
	});
	const pairHole = cylinder({
		x: d.pair.x,
		y: d.pair.y,
		z: 10.5,
		radius: 3.1,
		height: 4,
	});
	const chargeHole = cylinder({
		x: d.chargeLed.x,
		y: d.chargeLed.y,
		z: 10.4,
		radius: 1.4,
		height: 4,
	});
	const chargeSeat = cylinder({
		x: d.chargeLed.x,
		y: d.chargeLed.y,
		z: 11.3,
		radius: 1.9,
		height: 0.7,
	});
	const collectorHole = cylinder({
		x: 10,
		y: 0,
		z: 8.2,
		radius: 1.55,
		height: 3.5,
	});
	const screwHoles = [-13, 13].flatMap((x) => [
		cylinder({ x, y: 24, z: 0.5, radius: 1.2, height: 13 }),
		cylinder({ x, y: 24, z: 11.0, radius: 2.2, height: 3 }),
	]);
	const usbRelief = box([16.5, 8, 10], [0, 32.2, 7.0]);
	const flangeClearances = [
		cylinder({
			x: d.shutter.x,
			y: d.shutter.y,
			z: 10.4,
			radius: 5.4,
			height: 0.9,
		}),
		cylinder({ x: d.pair.x, y: d.pair.y, z: 10.7, radius: 4.3, height: 0.8 }),
	];
	return colored(
		face,
		subtract(
			union(roof, lip, ...columns, ...guides, opticShroud),
			ringHole,
			flangeSeat,
			pairHole,
			chargeHole,
			chargeSeat,
			collectorHole,
			shroudChannel,
			...screwHoles,
			...flangeClearances,
			usbRelief,
		),
	);
}

export function createStatusOptic(): MechanicalPlan {
	const visibleRing = ring({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 11.9,
		outerRadius: 5.9,
		innerRadius: 5.15,
		height: 1.4,
	});
	const retainingFlange = ring({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 11.4,
		outerRadius: 6.5,
		innerRadius: 5.1,
		height: 0.6,
	});
	const collector = cylinder({
		x: 10,
		y: 0,
		z: d.statusLed.collectorBottomZ,
		radius: 1.25,
		height: 8.4,
	});
	const feed = bar({
		start: [10, 0, 9.4],
		end: [-8.1, -5.4, 10.7],
		radius: 1.2,
		height: 1.2,
	});
	return colored(
		clearWhite,
		subtract(
			union(visibleRing, retainingFlange, collector, feed),
			cylinder({
				x: d.shutter.x,
				y: d.shutter.y,
				z: 8,
				radius: 5.1,
				height: 8,
			}),
			cylinder({
				x: d.shutter.x,
				y: d.shutter.y,
				z: 8,
				radius: 5.4,
				height: 3.3,
			}),
		),
	);
}

export function createChargeOptic(): MechanicalPlan {
	return colored(
		clearWhite,
		union(
			cylinder({
				x: 8,
				y: 26,
				z: d.chargeLed.collectorBottomZ,
				radius: 1.1,
				height: 11.4,
			}),
			cylinder({ x: 8, y: 26, z: 11.4, radius: 1.6, height: 0.6 }),
		),
	);
}

function cameraEngraving(): MechanicalPlan {
	const body = ring({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 13.95,
		outerRadius: 1.25,
		innerRadius: 0.8,
		height: 0.4,
	});
	const frame = subtract(
		roundedBox({
			width: 4.4,
			length: 2.8,
			radius: 0.4,
			x: d.shutter.x,
			y: d.shutter.y,
			z: 13.95,
			height: 0.4,
		}),
		roundedBox({
			width: 3.6,
			length: 2,
			radius: 0.3,
			x: d.shutter.x,
			y: d.shutter.y,
			z: 13.9,
			height: 0.6,
		}),
	);
	return union(
		body,
		frame,
		box([1.4, 0.4, 0.4], [d.shutter.x - 0.8, d.shutter.y + 1.6, 14.15]),
	);
}

export function createShutterPlunger(): MechanicalPlan {
	const shaft = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: d.shutter.stemTipZ,
		radius: 1.2,
		height: 10.0,
	});
	const flange = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 10.7,
		radius: 5.15,
		height: 0.5,
	});
	const cap = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 12.4,
		radius: 4.45,
		height: 1.8,
	});
	return colored(coral, subtract(union(shaft, flange, cap), cameraEngraving()));
}

export function createShutterSkin(): MechanicalPlan {
	const cap = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 13.65,
		radius: 4.8,
		height: 0.95,
	});
	const cavity = cylinder({
		x: d.shutter.x,
		y: d.shutter.y,
		z: 13.5,
		radius: 4.55,
		height: 0.75,
	});
	return colored(
		coral,
		subtract(cap, cavity, move([0, 0, 0.45], cameraEngraving())),
	);
}

export function createPairPlunger(): MechanicalPlan {
	const shaft = cylinder({
		x: d.pair.x,
		y: d.pair.y,
		z: d.pair.stemTipZ,
		radius: 1.1,
		height: 10.0,
	});
	const flange = cylinder({
		x: d.pair.x,
		y: d.pair.y,
		z: 11.0,
		radius: 4,
		height: 0.4,
	});
	const cap = cylinder({
		x: d.pair.x,
		y: d.pair.y,
		z: 12.4,
		radius: 2.8,
		height: 1.3,
	});
	const symbolPoints: Point3[] = [
		[13.1, -5.3, 13.45],
		[14.5, -3.2, 13.45],
		[13.1, -2.6, 13.45],
		[13.1, -5.3, 13.45],
		[14.5, -4.7, 13.45],
		[12.4, -3.0, 13.45],
	];
	const engraving = symbolPoints
		.slice(1)
		.map((end, i) =>
			bar({ start: symbolPoints[i], end, radius: 0.17, height: 0.4 }),
		);
	return colored(graphite, subtract(union(shaft, flange, cap), ...engraving));
}

export function createSlider(): MechanicalPlan {
	// Fork retains the 1.3 mm switch actuator with 0.2 mm radial-side allowances.
	const fork = box([2.0, 2.3, 1.8], [18.55, 5, 1.5]);
	const shaft = box([6.4, 2.3, 1.8], [21, 5, 1.5]);
	const cap = roundedBox({
		width: 2.4,
		length: 4.8,
		radius: 0.7,
		x: 24.0,
		y: 5,
		z: 0.45,
		height: 2.1,
	});
	const pocket = box([2.2, 1.7, 2.2], [17.7, 5, 1.4]);
	const gripCuts = [-1.25, 0, 1.25].map((y) =>
		box([0.45, 0.45, 2.4], [25.1, 5 + y, 1.5]),
	);
	// Supplier model shows one stable end position at Y=5.85, not neutral Y=5.
	return colored(
		coral,
		move([0, 0.85, 0], subtract(union(fork, shaft, cap), pocket, ...gripCuts)),
	);
}

export function createBatteryCarrier(): MechanicalPlan {
	const floor = roundedBox({
		width: 18.5,
		length: 28.8,
		radius: 1.4,
		y: 7.2,
		z: 2.4,
		height: 0.4,
	});
	const tabs = [-8.6, 8.6].flatMap((x) =>
		[-0.5, 16.1].map((y) => box([0.6, 3, 4.6], [x, y, 5.1])),
	);
	const reliefs = [
		box([2.4, 2.4, 1], [0, 6, 2.6]),
		box([5, 3, 1], [5, 17.5, 2.6]),
		box([2, 7, 1], [9.9, 15.7, 2.6]),
		cylinder({ x: 10, y: 0, z: 2, radius: 1.6, height: 6 }),
	];
	const beams = [
		[-14.55, -4.8],
		[14.55, -6.9],
		[-14.55, 21],
		[14.55, 21],
	].map(([x, y]) => box([11.6, 1, 0.8], [x, y, 2.8]));
	return colored(
		[0.32, 0.36, 0.4],
		subtract(
			union(subtract(floor, ...reliefs), ...tabs, ...beams),
			cylinder({ x: 10, y: 0, z: 2, radius: 1.6, height: 6 }),
		),
	);
}

export function createGrip(): MechanicalPlan {
	const body = roundedBox({
		width: d.dock.width,
		length: d.dock.length,
		radius: d.dock.cornerRadius,
		y: d.dock.centreY,
		z: d.dock.bottomZ,
		height: d.dock.surfaceZ - d.dock.bottomZ,
	});
	const handWell = roundedBox({
		width: 41,
		length: 44,
		radius: 12,
		y: 67,
		z: -11.0,
		height: 2.6,
	});
	const rails = [-24.3, 24.3].map((x) =>
		roundedBox({
			width: 1.8,
			length: 39,
			radius: 0.8,
			x,
			y: 11.5,
			z: -5.8,
			height: 2.7,
		}),
	);
	const stop = roundedBox({
		width: 46.8,
		length: 1.8,
		radius: 0.8,
		y: 33.3,
		z: -5.8,
		height: 1.8,
	});
	const dockPockets = [-13, 13].map((x) =>
		magnetPocket({ x, y: 16, z: -9.65, height: 3.86 }),
	);
	const phonePockets = [-14, 14].flatMap((x) =>
		[28, 56].map((y) => magnetPocket({ x, y, z: -12.05, height: 3.86 })),
	);
	const fingerGrooves = [55, 59, 63, 67, 71, 75, 79].map((y) =>
		box([46, 0.9, 0.65], [0, y, -11.85]),
	);
	return colored(
		graphite,
		subtract(
			union(body, ...rails, stop),
			handWell,
			...dockPockets,
			...phonePockets,
			...fingerGrooves,
		),
	);
}

export function harnessPoints(offset: number): Point3[] {
	const points: Point3[] = [
		[-13.5, 4.5, 4.3],
		[-20, 4.5, 4.3],
		[-20, 17.5, 4.3],
		[-20, 17.5, 7.8],
		[-19, 17.5, 7.8],
		[-19, 1, 7.8],
		[-15.8, 1, 7.8],
		[-15.8, 16.25, 7.8],
		[-12.6, 16.25, 7.8],
		[-12.6, 1, 7.8],
		[-10.5, 1, 7.8],
		[-10.5, -1, 5.5],
		[-10.5, -6.7, 5.5],
		[0, -6.7, 5.5],
		[0, -6.5, 5.0],
	];
	return points.map(([x, y, z], i) => [
		x + offset,
		y + (i >= 12 ? 0 : offset),
		z + offset,
	]);
}

function harnessEnvelope(offset: number): MechanicalPlan {
	const points = harnessPoints(offset);
	return union(
		...points
			.slice(1)
			.map((end, i) =>
				hull(
					move(points[i], { type: "sphere", radius: 0.6 }),
					move(end, { type: "sphere", radius: 0.6 }),
				),
			),
	);
}

export function createParts(): MechanicalPart[] {
	const printed = (
		name: string,
		plan: MechanicalPlan,
		explodeZ: number,
	): MechanicalPart => ({
		name,
		plan,
		role: "printed",
		material: "Unfilled PETG or PA12; dimensions require prototype fit",
		explodeZ,
	});
	const parts: MechanicalPart[] = [
		printed("RemoteBase", createBase(), -14),
		printed("RemoteLid", createLid(), 33),
		{
			name: "StatusRingLightGuide",
			plan: createStatusOptic(),
			role: "optic",
			material: "Optical PMMA / clear resin; polish feed, diffuse ring",
			explodeZ: 23,
			translucent: true,
		},
		{
			name: "ChargeWindowLightGuide",
			plan: createChargeOptic(),
			role: "optic",
			material: "Optical PMMA / clear resin",
			explodeZ: 23,
			translucent: true,
		},
		printed("ShutterPlunger", createShutterPlunger(), 40),
		printed("PairPlunger", createPairPlunger(), 40),
		{
			name: "ShutterSoftSkin",
			plan: createShutterSkin(),
			role: "printed",
			material: "Unfilled TPU; press fit subject to prototype test",
			explodeZ: 45,
		},
		printed("PowerSlider", createSlider(), 14),
		printed("BatteryCarrier", createBatteryCarrier(), 9),
		{
			name: "BatteryDTP401525MaximumEnvelope",
			plan: colored(
				[0.73, 0.76, 0.79],
				roundedBox({
					width: 15.5,
					length: 27,
					radius: 0.7,
					y: 7.8,
					z: 2.8,
					height: 4.2,
				}),
			),
			role: "external_envelope",
			material:
				"DATA POWER DTP401525(PHR): documented maximum envelope, not a supplier CAD model",
			explodeZ: 15,
		},
		printed("MagneticGripDock", createGrip(), -25),
		{
			name: "BatteryThermalPadCompressedEnvelope",
			plan: colored([0.57, 0.46, 0.67], box([2, 2, 1.7], [0, 6, 1.95])),
			role: "external_envelope",
			material:
				"BERGQUIST GP1500-0.080-02-0404; 2x2 cut piece, nominal compressed envelope",
			explodeZ: 6,
		},
		{
			name: "BatteryHarnessPositiveReservation",
			plan: colored(coral, harnessEnvelope(0.65)),
			role: "reference",
			material:
				"1.2 mm insulated-wire reservation; ~100 mm route, actual bends/slack untested",
			explodeZ: 16,
		},
		{
			name: "BatteryHarnessNegativeReservation",
			plan: colored([0.1, 0.1, 0.1], harnessEnvelope(-0.65)),
			role: "reference",
			material:
				"1.2 mm insulated-wire reservation; ~100 mm route, actual bends/slack untested",
			explodeZ: 16,
		},
		{
			name: "PhoneReceiverPlateEnvelope",
			plan: colored(
				steel,
				roundedBox({
					width: 45,
					length: 45,
					radius: 3,
					y: 42,
					z: -12.55,
					height: 0.5,
				}),
			),
			role: "external_envelope",
			material:
				"Original 45x45x0.5 steel receiver plate, externally installed; no MagSafe claim",
			explodeZ: -31,
		},
	];
	for (const x of [-13, 13]) {
		const suffix = x < 0 ? "Left" : "Right";
		parts.push({
			name: `LidScrewM2x14${suffix}`,
			plan: colored(
				steel,
				union(
					cylinder({ x, y: 24, z: -3, radius: 1, height: 14 }),
					cylinder({ x, y: 24, z: 11, radius: 2, height: 1.6 }),
				),
			),
			role: "external_envelope",
			material:
				"M2x14 low-profile screw nominal envelope; exact hardware vendor not locked",
			explodeZ: 50,
		});
		parts.push({
			name: `M2InsertEnvelope${suffix}`,
			plan: colored(
				[0.76, 0.57, 0.22],
				ring({
					x,
					y: 24,
					z: -3.7,
					outerRadius: 1.6,
					innerRadius: 1.01,
					height: 3,
				}),
			),
			role: "external_envelope",
			material:
				"M2 insert target envelope OD3.2x3; supplier-specific pilot/thermal insertion to qualify",
			explodeZ: -8,
		});
	}
	for (const x of [-13, 13]) {
		parts.push({
			name: `RemoteMagnet${x < 0 ? "Left" : "Right"}`,
			plan: colored(
				steel,
				cylinder({ x, y: 16, z: -4.0, radius: 3.175, height: 3.175 }),
			),
			role: "external_envelope",
			material: "K&J D42 dimensional envelope; externally installed",
			explodeZ: -8,
		});
		parts.push({
			name: `DockMagnet${x < 0 ? "Left" : "Right"}`,
			plan: colored(
				steel,
				cylinder({ x, y: 16, z: -9.6, radius: 3.175, height: 3.175 }),
			),
			role: "external_envelope",
			material: "K&J D42 dimensional envelope; externally installed",
			explodeZ: -25,
		});
		parts.push(
			printed(
				`RemoteMagnetInsulatingCap${x < 0 ? "Left" : "Right"}`,
				colored(
					face,
					cylinder({ x, y: 16, z: -0.75, radius: 3.3, height: 0.25 }),
				),
				-8,
			),
		);
		parts.push(
			printed(
				`DockMagnetInsulatingCap${x < 0 ? "Left" : "Right"}`,
				colored(
					face,
					cylinder({ x, y: 16, z: -6.3, radius: 3.3, height: 0.5 }),
				),
				-25,
			),
		);
	}
	for (const x of [-14, 14])
		for (const y of [28, 56]) {
			parts.push({
				name: `PhoneMagnet${x < 0 ? "Left" : "Right"}${y}`,
				plan: colored(
					steel,
					cylinder({ x, y, z: -11.6, radius: 3.175, height: 3.175 }),
				),
				role: "external_envelope",
				material:
					"K&J D42 dimensional envelope; original magnet design, not MagSafe certification",
				explodeZ: -25,
			});
			parts.push(
				printed(
					`PhoneMagnetInsulatingCap${x < 0 ? "Left" : "Right"}${y}`,
					colored(
						face,
						cylinder({ x, y, z: -12.0, radius: 3.3, height: 0.35 }),
					),
					-25,
				),
			);
		}
	return parts;
}

export function cutawayPart(plan: MechanicalPlan): MechanicalPlan {
	return subtract(plan, box([45, 90, 35], [22.5, 0, 10]));
}
