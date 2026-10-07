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
}: {
	radiusMm: number;
	heightMm: number;
	center: [number, number, number];
}): JscadOperation {
	return {
		type: "cylinder",
		radius: radiusMm,
		height: heightMm,
		center,
		resolution: 32,
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
export function createRemoteOuterPlan(): JscadOperation {
	return subtract([
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
			],
		},
		waistCut({ zMm: 18, heightMm: 30 }),
	]);
}
export function createProductParts(): ProductPart[] {
	const mountPoints = mountingHolesMm.map(([x, y]) =>
		pcbPointInProduct({ x, y }),
	);
	const cavity: JscadOperation = subtract([
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
		capY = 17.5;
	const plunger = union([
		box({
			size: [3, barY - contactY + 0.8, 1.8],
			center: [tip.x, (contactY + barY + 0.8) / 2, d.shutter.centerZMm],
		}),
		box({
			size: [Math.abs(capX - tip.x) + 1.5, 1.8, 1.8],
			center: [(capX + tip.x) / 2, barY, d.shutter.centerZMm],
		}),
		box({ size: [3, 1.8, 10.94], center: [capX, barY, 15.43] }),
		box({
			size: [3, Math.abs(capY - barY) + 0.8, 1.8],
			center: [capX, (barY + capY) / 2, 20],
		}),
		{
			type: "translate",
			vector: [capX, capY, 20],
			shape: {
				type: "rotate",
				angles: [Math.PI / 2, 0, 0],
				shape: roundBox({
					widthMm: 13,
					lengthMm: 7,
					heightMm: 1.6,
					center: [0, 0, 0],
					radiusMm: 3.3,
				}),
			},
		},
	]);
	const apertures = [
		box({ size: [3.5, 5, 2.3], center: [capX, 16.5, 20] }),
		{
			type: "translate",
			vector: [capX, capY, 20],
			shape: {
				type: "rotate",
				angles: [Math.PI / 2, 0, 0],
				shape: roundBox({
					widthMm: 13.6,
					lengthMm: 7.6,
					heightMm: 3,
					center: [0, 0, 0],
					radiusMm: 3.5,
				}),
			},
		} satisfies JscadOperation,
		box({ size: [22, 10.2, 5.2], center: [-52, -9, 11.48] }),
		box({ size: [3.5, 2.3, 13], center: [capX, barY, 15.4] }),
		box({ size: [8, 2.3, 2.3], center: [tip.x, 14.8, d.shutter.centerZMm] }),
		box({ size: [49, 2.3, 2.3], center: [-29.2, barY, d.shutter.centerZMm] }),
	];
	const dockPoints = [
		[-20, -5],
		[20, -5],
		[15, -22],
		[0, 15],
	];
	const dockingSlots = dockPoints.flatMap(([x, y]) => [
		cylinder({ radiusMm: 2.9, heightMm: 4, center: [x + 4, y, 7.2] }),
		{
			type: "hull",
			shapes: [0, 4].map((dx) =>
				cylinder({ radiusMm: 2.3, heightMm: 4, center: [x + dx, y, 7.2] }),
			),
		} satisfies JscadOperation,
		box({ size: [9.8, 5.8, 1.4], center: [x + 2, y, 7.7] }),
	]);
	const base = subtract([
		union([
			subtract([
				createRemoteOuterPlan(),
				cavity,
				...apertures,
				...dockingSlots,
			]),
			...lowerSeats,
			{
				type: "intersect",
				shapes: [union(batterySeats), createRemoteOuterPlan()],
			},
		]),
		box({ size: [3.2, 4.6, 25], center: [-56.3, -28, 20] }),
		...baseShafts,
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
	const pad = roundBox({
		widthMm: 32,
		lengthMm: 52,
		heightMm: 1.4,
		center: [-38, -20, 33.3],
		radiusMm: 14,
	});
	const padPocket = roundBox({
		widthMm: 32.6,
		lengthMm: 52.6,
		heightMm: 2.1,
		center: [-38, -20, 33.55],
		radiusMm: 14.3,
	});
	const gripFaceKeepout = roundBox({
		widthMm: 40.6,
		lengthMm: 65.6,
		heightMm: 7,
		center: [-38, -18.5, 33],
		radiusMm: 16.3,
	});
	const rearCover = subtract([
		cylinder({ radiusMm: 29.2, heightMm: 1.4, center: [0, -5, 32.8] }),
		gripFaceKeepout,
	]);
	const rearPocket = subtract([
		cylinder({ radiusMm: 29.4, heightMm: 4, center: [0, -5, 33.3] }),
		gripFaceKeepout,
	]);
	const lid = subtract([
		union([
			{
				type: "hull",
				shapes: [
					outline({
						zMm: 30.5,
						heightMm: 1,
						handleWidthMm: 40,
						handleLengthMm: 65,
					}),
					outline({
						zMm: 32,
						heightMm: 1,
						handleWidthMm: 39,
						handleLengthMm: 64,
						circleRadiusMm: 30.2,
					}),
					outline({
						zMm: 33.2,
						heightMm: 0.6,
						handleWidthMm: 37,
						handleLengthMm: 62,
						circleRadiusMm: 29.2,
					}),
				],
			},
			...upperPillars,
		]),
		waistCut({ zMm: 20, heightMm: 32 }),
		...lidPilots,
		padPocket,
		rearPocket,
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
				"Recessed candidateTPU finger insert; adhesive/material qualification pending",
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
