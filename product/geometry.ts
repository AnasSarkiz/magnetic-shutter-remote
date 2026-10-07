import type { JscadOperation } from "jscad-planner";
import {
	dimensions as d,
	mountingHolesMm,
	pcbPointInProduct,
} from "./dimensions";
export type ProductPart = {
	name: string;
	description: string;
	plan: JscadOperation;
	explodeZMm: number;
	referenceOnly?: boolean;
};
export function box({
	size,
	center,
}: {
	size: [number, number, number];
	center: [number, number, number];
}): JscadOperation {
	return { type: "translate", vector: center, shape: { type: "cuboid", size } };
}
function cylinder({
	radiusMm,
	heightMm,
	center,
	segments = 64,
}: {
	radiusMm: number;
	heightMm: number;
	center: [number, number, number];
	segments?: number;
}): JscadOperation {
	const radius = Number(radiusMm.toFixed(6)),
		height = Number(heightMm.toFixed(6));
	return {
		type: "translate",
		vector: center.map((coordinate) => Number(coordinate.toFixed(6))),
		shape: {
			type: "translate",
			vector: [0, 0, -height / 2],
			shape: {
				type: "extrudeLinear",
				options: { height },
				shape: {
					type: "polygon",
					points: Array.from({ length: segments }, (_, index) => [
						radius * Math.cos((index * 2 * Math.PI) / segments),
						radius * Math.sin((index * 2 * Math.PI) / segments),
					]),
				},
			},
		},
	};
}
function subtract(shapes: JscadOperation[]): JscadOperation {
	return { type: "subtract", shapes };
}
function union(shapes: JscadOperation[]): JscadOperation {
	return { type: "union", shapes };
}
function color(
	plan: JscadOperation,
	rgb: [number, number, number],
): JscadOperation {
	return { type: "colorize", color: rgb, shape: plan };
}
function roundBox({
	widthMm,
	lengthMm,
	heightMm,
	center,
	radiusMm = 3,
}: {
	widthMm: number;
	lengthMm: number;
	heightMm: number;
	center: [number, number, number];
	radiusMm?: number;
}): JscadOperation {
	return {
		type: "hull",
		shapes: [-1, 1].flatMap((x) =>
			[-1, 1].map((y) =>
				cylinder({
					radiusMm,
					heightMm,
					center: [
						center[0] + x * (widthMm / 2 - radiusMm),
						center[1] + y * (lengthMm / 2 - radiusMm),
						center[2],
					],
				}),
			),
		),
	};
}
function waistCut({
	zMm,
	heightMm,
	insetMm = 0,
}: {
	zMm: number;
	heightMm: number;
	insetMm?: number;
}): JscadOperation {
	return subtract([
		cylinder({ radiusMm: 25 + insetMm, heightMm, center: [3, -54, zMm] }),
		cylinder({
			radiusMm: 31.8 - insetMm,
			heightMm: heightMm + 2,
			center: [0, -5, zMm],
		}),
	]);
}
function outline({
	zMm,
	heightMm,
	handleWidthMm = 42,
	handleLengthMm = 67,
	circleRadiusMm = 31,
}: {
	zMm: number;
	heightMm: number;
	handleWidthMm?: number;
	handleLengthMm?: number;
	circleRadiusMm?: number;
}): JscadOperation {
	return subtract([
		{
			type: "hull",
			shapes: [
				cylinder({ radiusMm: circleRadiusMm, heightMm, center: [0, -5, zMm] }),
				cylinder({ radiusMm: 12, heightMm, center: [-43, 5, zMm] }),
				roundBox({
					widthMm: handleWidthMm,
					lengthMm: handleLengthMm,
					heightMm,
					center: [-38, -18.5, zMm],
					radiusMm: 17,
				}),
			],
		},
		waistCut({ zMm, heightMm: heightMm + 2 }),
	]);
}
// Product X/Z crown sampled from tangent-continuous cubic curves, in micrometres.
function bezierCoordinate({
	points,
	t,
	axis,
}: {
	points: [number, number][];
	t: number;
	axis: number;
}): number {
	const u = 1 - t;
	return Number(
		(
			u * u * u * points[0][axis] +
			3 * u * u * t * points[1][axis] +
			3 * u * t * t * points[2][axis] +
			t * t * t * points[3][axis]
		).toFixed(6),
	);
}
function bezierRoof({
	points,
	steps,
}: {
	points: [number, number][];
	steps: number;
}): [number, number][] {
	return Array.from({ length: steps + 1 }, (_, index) => [
		bezierCoordinate({ points, t: index / steps, axis: 0 }),
		bezierCoordinate({ points, t: index / steps, axis: 1 }),
	]);
}
const crownRoofMm: [number, number][] = [
	...bezierRoof({
		points: [
			[-65, 18],
			[-58, 34],
			[-47, 34],
			[-38, 34],
		],
		steps: 12,
	}),
	...bezierRoof({
		points: [
			[-38, 34],
			[-28, 34],
			[-23, 33],
			[-19, 22],
		],
		steps: 12,
	}).slice(1),
	...bezierRoof({
		points: [
			[-19, 22],
			[-17.2, 17.05],
			[-16, 17],
			[-14, 17],
		],
		steps: 6,
	}).slice(1),
	[35, 17],
];
const crownProfileMm: [number, number][] = [[-65, 6], ...crownRoofMm, [35, 6]];
function crownMask({
	zOffsetMm = 0,
}: {
	zOffsetMm?: number;
} = {}): JscadOperation {
	return {
		type: "translate",
		vector: [0, 40, zOffsetMm],
		shape: {
			type: "rotate",
			angles: [Math.PI / 2, 0, 0],
			shape: {
				type: "extrudeLinear",
				options: { height: 110 },
				shape: { type: "polygon", points: [...crownProfileMm].reverse() },
			},
		},
	};
}
function intersect(shapes: JscadOperation[]): JscadOperation {
	return { type: "intersect", shapes };
}
export function createRemoteOuterPlan(): JscadOperation {
	return union([
		cylinder({ radiusMm: 29.4, heightMm: 1.2, center: [0, -5, 5.4] }),
		intersect([
			subtract([
				{
					type: "hull",
					shapes: [
						outline({
							zMm: 6.5,
							heightMm: 1,
							handleWidthMm: 40,
							handleLengthMm: 65,
						}),
						outline({ zMm: 18, heightMm: 1 }),
						outline({
							zMm: 29.5,
							heightMm: 1,
							handleWidthMm: 40,
							handleLengthMm: 65,
						}),
						outline({
							zMm: 33.5,
							heightMm: 0.2,
							handleWidthMm: 37,
							handleLengthMm: 62,
							circleRadiusMm: 29.2,
						}),
					],
				},
				waistCut({ zMm: 20, heightMm: 40 }),
			]),
			crownMask({ zOffsetMm: -0.4 }),
		]),
	]);
}
export function createProductParts(): ProductPart[] {
	const mountPoints = mountingHolesMm.map(([x, y]) =>
		pcbPointInProduct({ x, y }),
	);
	const cavity: JscadOperation = intersect([
		subtract([
			{
				type: "hull",
				shapes: [
					cylinder({ radiusMm: 29.4, heightMm: 23, center: [0, -5, 19.5] }),
					cylinder({ radiusMm: 10.4, heightMm: 23, center: [-43, 5, 19.5] }),
					roundBox({
						widthMm: 38.8,
						lengthMm: 63.8,
						heightMm: 23,
						center: [-38, -18.5, 19.5],
						radiusMm: 15.4,
					}),
				],
			},
			waistCut({ zMm: 19.5, heightMm: 25, insetMm: 1.6 }),
		]),
		crownMask({ zOffsetMm: -2 }),
	]);
	const lowerSeats = mountPoints.map(({ x, y }) =>
		box({ size: [4.2, 4.2, 1.2], center: [x, y, 8.4] }),
	);
	const baseShafts = mountPoints.map(({ x, y }) =>
		cylinder({ radiusMm: 1.1, heightMm: 6, center: [x, y, 8] }),
	);
	const batterySeats = [-1, 1].map((side) =>
		box({
			size: [3.6, 43, 0.8],
			center: [d.battery.centerXMm + side * 17.85, d.battery.centerYMm, 14.4],
		}),
	);
	const tip = pcbPointInProduct({
		x: d.shutter.actuatorXMm,
		y: d.shutter.centerYMm,
	});
	const contactY = tip.y + d.shutter.freeGapMm;
	const barY = 15,
		capX = -45.5,
		riserX = -43,
		capY = 17.5,
		capZ = 30;
	const plunger = union([
		box({
			size: [3, barY - contactY + 0.8, 1.8],
			center: [tip.x, (contactY + barY + 0.8) / 2, d.shutter.centerZMm],
		}),
		box({
			size: [Math.abs(riserX - tip.x) + 1.5, 1.8, 1.8],
			center: [(riserX + tip.x) / 2, barY, d.shutter.centerZMm],
		}),
		box({
			size: [3, 1.8, capZ - d.shutter.centerZMm + 1.8],
			center: [riserX, barY, (capZ + d.shutter.centerZMm) / 2],
		}),
		box({
			size: [Math.abs(capX - riserX) + 3, 1.8, 1.8],
			center: [(capX + riserX) / 2, barY - 0.05, capZ],
		}),
		box({
			size: [3, Math.abs(capY - barY) + 0.8, 1.8],
			center: [capX, (barY + capY) / 2, capZ],
		}),
		{
			type: "translate",
			vector: [capX, capY, capZ],
			shape: {
				type: "rotate",
				angles: [(2 * Math.PI) / 3, 0, 0],
				shape: {
					type: "hull",
					shapes: [
						roundBox({
							widthMm: 13,
							lengthMm: 7.3,
							heightMm: 0.2,
							center: [0, 0, 0.7],
							radiusMm: 3.3,
						}),
						roundBox({
							widthMm: 12.8,
							lengthMm: 7.1,
							heightMm: 0.3,
							center: [0, 0, 0],
							radiusMm: 3.2,
						}),
						roundBox({
							widthMm: 12.2,
							lengthMm: 6.5,
							heightMm: 0.2,
							center: [0, 0, -0.7],
							radiusMm: 3,
						}),
					],
				},
			},
		},
	]);
	const apertures = [
		box({ size: [3.5, 4.3, 2.3], center: [capX, 16.25, capZ] }),
		{
			type: "translate",
			vector: [capX, capY, capZ],
			shape: {
				type: "rotate",
				angles: [(2 * Math.PI) / 3, 0, 0],
				shape: roundBox({
					widthMm: 13.7,
					lengthMm: 8,
					heightMm: 8,
					center: [0, 0, 0],
					radiusMm: 3.6,
				}),
			},
		} satisfies JscadOperation,
		{
			type: "translate",
			vector: [-52, -9, 11.48],
			shape: {
				type: "rotate",
				angles: [Math.PI / 2, 0, Math.PI / 2],
				shape: roundBox({
					widthMm: 10.2,
					lengthMm: 5.2,
					heightMm: 22,
					center: [0, 0, 0],
					radiusMm: 2.4,
				}),
			},
		} satisfies JscadOperation,
		box({ size: [3.5, 2.4, 24], center: [riserX, barY - 0.05, 20] }),
		box({
			size: [Math.abs(capX - riserX) + 3.5, 2.4, 2.3],
			center: [(capX + riserX) / 2, barY - 0.05, capZ],
		}),
		box({ size: [8, 2.3, 2.3], center: [tip.x, 14.8, d.shutter.centerZMm] }),
		box({
			size: [Math.abs(riserX - tip.x) + 2, 2.4, 2.3],
			center: [(riserX + tip.x) / 2, barY - 0.05, d.shutter.centerZMm],
		}),
	];
	const dockPoints = [
		[-20, -5],
		[20, -5],
		[15, -22],
		[0, 15],
	];
	const dockingSlots = dockPoints.flatMap(([x, y]) => [
		cylinder({ radiusMm: 2.9, heightMm: 5.2, center: [x + 4, y, 7.2] }),
		{
			type: "hull",
			shapes: [0, 4].map((dx) =>
				cylinder({ radiusMm: 2.3, heightMm: 5.2, center: [x + dx, y, 7.2] }),
			),
		} satisfies JscadOperation,
		box({ size: [10, 6, 1.4], center: [x + 2, y, 7.7] }),
	]);
	const upperPillars = mountPoints.flatMap(({ x, y }) =>
		x < -30 && y < 0
			? [
					box({ size: [4.2, 4.2, 3.8], center: [x, y, 11.9] }),
					box({ size: [18.1, 4.2, 3.8], center: [-48.25, y, 11.9] }),
					box({ size: [2.8, 4.2, 21.5], center: [-56.3, y, 20.75] }),
				]
			: [box({ size: [4.2, 4.2, 21.5], center: [x, y, 20.75] })],
	);
	const lidPilots = mountPoints.map(({ x, y }) =>
		cylinder({
			radiusMm: 0.85,
			heightMm: x < -30 && y < 0 ? 3.8 : 21.2,
			center: [x, y, x < -30 && y < 0 ? 11.8 : 20.5],
		}),
	);
	const padFootprint = roundBox({
		widthMm: 36,
		lengthMm: 56,
		heightMm: 20,
		center: [-38, -20, 26],
		radiusMm: 16,
	});
	const padSkin = intersect([
		padFootprint,
		subtract([crownMask(), crownMask({ zOffsetMm: -1.4 })]),
	]);
	const pad = padSkin;
	const padPocket = intersect([
		roundBox({
			widthMm: 36.6,
			lengthMm: 56.6,
			heightMm: 22,
			center: [-38, -20, 26],
			radiusMm: 16.3,
		}),
		subtract([crownMask({ zOffsetMm: 1 }), crownMask({ zOffsetMm: -1.5 })]),
	]);
	const gripFaceKeepout = roundBox({
		widthMm: 40.6,
		lengthMm: 65.6,
		heightMm: 40,
		center: [-38, -18.5, 25],
		radiusMm: 16.3,
	});
	const rearCover = subtract([
		cylinder({ radiusMm: 29.2, heightMm: 0.6, center: [0, -5, 16.75] }),
		box({
			size: [
				d.battery.widthMm + 0.6,
				d.battery.lengthMm + 0.6,
				d.battery.heightMm + 0.6,
			],
			center: [
				d.battery.centerXMm,
				d.battery.centerYMm,
				d.battery.bottomZMm + d.battery.heightMm / 2,
			],
		}),
	]);
	const rearPocket = union([
		subtract([
			cylinder({ radiusMm: 29.4, heightMm: 16, center: [0, -5, 24.3] }),
			gripFaceKeepout,
		]),
		cylinder({ radiusMm: 29.4, heightMm: 1.2, center: [0, -5, 16.9] }),
	]);
	const bezel: JscadOperation = {
		type: "translate",
		vector: [capX, capY - 0.2 * Math.sin(Math.PI / 3), capZ - 0.1],
		shape: {
			type: "rotate",
			angles: [(2 * Math.PI) / 3, 0, 0],
			shape: roundBox({
				widthMm: 15.2,
				lengthMm: 8.8,
				heightMm: 6,
				center: [0, 0, 2.6],
				radiusMm: 3.9,
			}),
		},
	};
	const jointMask = crownMask({ zOffsetMm: -3.5 });
	const shell = subtract([
		union([
			createRemoteOuterPlan(),
			{
				type: "hull",
				shapes: [
					bezel,
					cylinder({
						radiusMm: 10,
						heightMm: 8,
						center: [-44, 6, 27.5],
						segments: 32,
					}),
				],
			},
		]),
		cavity,
		...apertures,
		...dockingSlots,
		padPocket,
		rearPocket,
	]);
	const base = subtract([
		union([
			intersect([shell, jointMask]),
			...lowerSeats,
			intersect([union(batterySeats), createRemoteOuterPlan()]),
		]),
		box({ size: [3.2, 4.6, 25], center: [-56.3, -28, 20] }),
		...baseShafts,
	]);
	const lid = subtract([
		union([
			subtract([shell, jointMask]),
			intersect([union(upperPillars), createRemoteOuterPlan()]),
		]),
		...lidPilots,
		padPocket,
		rearPocket,
		...apertures,
	]);
	const tray = subtract([
		box({
			size: [33, 44, 0.6],
			center: [d.battery.centerXMm, d.battery.centerYMm, 15.1],
		}),
		box({
			size: [29, 40, 2],
			center: [d.battery.centerXMm, d.battery.centerYMm, 15.1],
		}),
	]);
	const cell = box({
		size: [32, 43, 8.5],
		center: [
			d.battery.centerXMm,
			d.battery.centerYMm,
			d.battery.bottomZMm + 4.25,
		],
	});
	const dock = union([
		cylinder({ radiusMm: 29.5, heightMm: 2.6, center: [0, -5, 3.5] }),
		subtract([
			cylinder({ radiusMm: 29.5, heightMm: 1.8, center: [0, -5, 1.5] }),
			cylinder({ radiusMm: 27.3, heightMm: 2.2, center: [0, -5, 1.5] }),
		]),
		cylinder({ radiusMm: 22.75, heightMm: 1.8, center: [0, -5, 1.5] }),
		...dockPoints.flatMap(([x, y]) => [
			cylinder({ radiusMm: 2, heightMm: 2.5, center: [x, y, 6.05] }),
			cylinder({ radiusMm: 2.6, heightMm: 1, center: [x, y, 7.8] }),
		]),
	]);
	const ring = subtract([
		cylinder({ radiusMm: 27.05, heightMm: 1.1, center: [0, -5, 1.15] }),
		cylinder({ radiusMm: 23, heightMm: 2, center: [0, -5, 1.15] }),
	]);
	return [
		{
			name: "RemoteBase",
			description:
				"90×78 reference body; PCB spans shoulder/circular back; original four mounting points",
			plan: color(base, [0.06, 0.065, 0.07]),
			explodeZMm: 4,
		},
		{
			name: "BatterySupport",
			description:
				"Protected battery support in the lower palm; harness/thermal qualification pending",
			plan: color(tray, [0.1, 0.11, 0.12]),
			explodeZMm: 34,
		},
		{
			name: "ASR00012_MaximumEnvelope",
			description: "Actual retained protected pack maximum32×43×8.5mm",
			plan: color(cell, [0.7, 0.72, 0.75]),
			explodeZMm: 44,
		},
		{
			name: "SideShutterPlunger",
			description:
				"Rigid L-slider from shoulder cap to actual horizontal PCB side switch; stroke/return qualification pending",
			plan: color(plunger, [0.48, 0.29, 0.14]),
			explodeZMm: 4,
		},
		{
			name: "RemoteLid",
			description:
				"Sculpted palm lid with blind underside fasteners; native camera-grip reference silhouette",
			plan: color(lid, [0.065, 0.07, 0.075]),
			explodeZMm: 74,
		},
		{
			name: "FingerGripInsert",
			description:
				"Curved palm insert; fine leather-like surface finish and bonding qualification pending",
			plan: color(pad, [0.025, 0.028, 0.03]),
			explodeZMm: 82,
		},
		{
			name: "MagSafeRearCover",
			description:
				"Circular rear face integrated in the shoulder; cover bonding pending",
			plan: color(rearCover, [0.025, 0.028, 0.03]),
			explodeZMm: 45,
		},
		{
			name: "MagSafeGrip",
			description:
				"Separate phone-facing dock with four printed slide keys; retention/removal not physically qualified",
			plan: color(dock, [0.06, 0.065, 0.07]),
			explodeZMm: 0,
		},
		{
			name: "MagSafeFaceCover",
			description:
				"Phone-facing cover over reference annulus; exact array/DCshield/bonding pending",
			plan: color(
				cylinder({ radiusMm: 29.5, heightMm: 0.6, center: [0, -5, 0.3] }),
				[0.055, 0.06, 0.065],
			),
			explodeZMm: -10,
		},
		{
			name: "MagSafeArrayReference",
			description:
				"AppleR31 reference46/54.1×1.1 only; not a selected array or RF pass",
			plan: color(ring, [0.8, 0.55, 0.15]),
			explodeZMm: -6,
			referenceOnly: true,
		},
	];
}
export function partInProduct(part: ProductPart): JscadOperation {
	return part.plan;
}
