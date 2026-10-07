import type { JscadOperation } from "jscad-planner";
import { dimensions as d, mountingHolesMm } from "./dimensions";
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
export function createProductParts(): ProductPart[] {
	// Three rounded sections form a palm bulge while keeping the qualified cavity.
	const caseBody: JscadOperation = {
		type: "hull",
		shapes: [
			roundBox({
				widthMm: 60,
				lengthMm: 68,
				heightMm: 1,
				center: [-2, 0, 6.5],
				radiusMm: 12,
			}),
			roundBox({
				widthMm: 64,
				lengthMm: 72,
				heightMm: 1,
				center: [-2, 0, 14.5],
				radiusMm: 15,
			}),
			roundBox({
				widthMm: 62,
				lengthMm: 70,
				heightMm: 1,
				center: [-2, 0, 25.5],
				radiusMm: 12,
			}),
		],
	};
	const cavity = roundBox({
		widthMm: 50.8,
		lengthMm: 58.8,
		heightMm: 21,
		center: [-2, 0, 18.1],
		radiusMm: 1.8,
	});
	const screwHoles = mountingHolesMm.map(([x, y]) =>
		cylinder({ radiusMm: 0.85, heightMm: 24, center: [x, y, 17] }),
	);
	const posts = mountingHolesMm.map(([x, y]) =>
		box({ size: [4.2, 4.2, 1.8], center: [x, y, 8.1] }),
	);
	const traySeats = [
		box({ size: [6, 26, 0.8], center: [-24.55, 6, 14.4] }),
		box({ size: [2, 26, 0.8], center: [22.7, 6, 14.4] }),
	];
	const apertures = [
		box({ size: [12, 12, 9.5], center: [0, 33.8, 11.48] }), // USB-C + strain-relief approach
		box({
			size: [10, 3.4, 2.2],
			center: [26, d.shutter.centerYMm, d.shutter.centerZMm - 4],
		}), // horizontal shutter
		box({ size: [10, 8, 4], center: [26, 5, 10.8] }), // side power slider access
		box({ size: [14, 2.5, 2], center: [-29, -5, 10.2] }), // battery/status LED view
		box({ size: [2.5, 12, 2], center: [8, 34, 10.2] }), // charge LED view
	];
	const railGrooves = [-1, 1].map((side) =>
		box({ size: [5.2, 37, 4], center: [side === 1 ? 27 : -31, 0, 7.8] }),
	);
	const base = subtract([
		union([
			subtract([caseBody, cavity, ...apertures, ...railGrooves]),
			...posts,
			...traySeats,
		]),
		...screwHoles,
	]);
	const lid = subtract([
		union([
			{
				type: "hull",
				shapes: [
					roundBox({
						widthMm: 62,
						lengthMm: 70,
						heightMm: 0.4,
						center: [-2, 0, 26.2],
						radiusMm: 12,
					}),
					roundBox({
						widthMm: 62,
						lengthMm: 70,
						heightMm: 0.4,
						center: [-2, 0, 27],
						radiusMm: 12,
					}),
					roundBox({
						widthMm: 58,
						lengthMm: 66,
						heightMm: 0.4,
						center: [-2, 0, 28],
						radiusMm: 14,
					}),
					roundBox({
						widthMm: 54,
						lengthMm: 62,
						heightMm: 0.4,
						center: [-2, 0, 28.8],
						radiusMm: 16,
					}),
				],
			},
			...mountingHolesMm.map(([x, y]) =>
				box({ size: [4.2, 4.2, 16.4], center: [x, y, 18.2] }),
			),
		]),
		...mountingHolesMm.map(([x, y]) =>
			cylinder({ radiusMm: 1.1, heightMm: 20, center: [x, y, 19] }),
		),
	]);
	const tray = subtract([
		box({ size: [44, 33, 0.6], center: [0, 6, 15.1] }),
		box({ size: [40, 29, 2], center: [0, 6, 15.1] }),
	]);
	// Retained protected pack's manufacturer maximum envelope, not an invented CAD model.
	const cell = box({ size: [43, 32, 8.5], center: [0, 6, 19.65] });
	// Captive flange retains the horizontal plunger; no top-operated shutter lever.
	const stemStartXMm = d.shutter.actuatorXMm + d.shutter.freeGapMm;
	const stemEndXMm = 30.2;
	const plunger = union([
		box({
			size: [stemEndXMm - stemStartXMm, 3, 1.8],
			center: [
				(stemStartXMm + stemEndXMm) / 2,
				d.shutter.centerYMm,
				d.shutter.centerZMm - 4,
			],
		}),
		box({
			size: [0.6, 4.4, 3.2],
			center: [23.05, d.shutter.centerYMm, d.shutter.centerZMm - 4],
		}),
		roundBox({
			widthMm: 1.6,
			lengthMm: 7,
			heightMm: 3,
			center: [30.6, d.shutter.centerYMm, d.shutter.centerZMm - 4],
			radiusMm: 0.7,
		}),
	]);
	// Positive, overlapping features keep the array pocket open for assembly.
	const contact = union([
		cylinder({ radiusMm: 29.5, heightMm: 2.6, center: [0, 0, 3.5] }),
		subtract([
			cylinder({ radiusMm: 29.5, heightMm: 1.8, center: [0, 0, 1.5] }),
			cylinder({ radiusMm: 27.3, heightMm: 2.2, center: [0, 0, 1.5] }),
		]),
		cylinder({ radiusMm: 22.75, heightMm: 1.8, center: [0, 0, 1.5] }),
	]);
	const ring = subtract([
		cylinder({ radiusMm: 27.05, heightMm: 1.1, center: [0, 0, 1.15] }),
		cylinder({ radiusMm: 23, heightMm: 2, center: [0, 0, 1.15] }),
	]);
	// Wide curved shoulders blend the phone contact and camera palm grip.
	// Outside the30mm contact radius every shoulder is at least6mm above the phone.
	const riser = cylinder({ radiusMm: 27.5, heightMm: 4, center: [0, 0, 6.8] });
	const arm: JscadOperation = {
		type: "hull",
		shapes: [
			cylinder({ radiusMm: 27.5, heightMm: 2.4, center: [0, 0, 7.6] }),
			roundBox({
				widthMm: 68,
				lengthMm: 76,
				heightMm: 2.4,
				center: [d.remote.centerXMm - 2, d.remote.centerYMm, 8.8],
				radiusMm: 16,
			}),
		],
	};
	const dock = union([
		...[-1, 1].map((side) =>
			box({
				size: [2, 36, 4],
				center: [
					d.remote.centerXMm + (side === 1 ? 28 : -32),
					d.remote.centerYMm,
					10.8,
				],
			}),
		),
		...[-1, 1].map((side) =>
			box({
				size: [3, 36, 1.2],
				center: [
					d.remote.centerXMm + (side === 1 ? 26.5 : -30.5),
					d.remote.centerYMm,
					12.8,
				],
			}),
		),
		roundBox({
			widthMm: 56,
			lengthMm: 2,
			heightMm: 1.2,
			center: [d.remote.centerXMm - 2, d.remote.centerYMm + 36.4, 10.6],
			radiusMm: 0.8,
		}),
	]);
	return [
		{
			name: "RemoteBase",
			description:
				"Printed service enclosure; four existing PCB mounts; USB, power and horizontal-shutter openings",
			plan: color(base, [0.12, 0.14, 0.17]),
			explodeZMm: 4,
		},
		{
			name: "BatterySupport",
			description:
				"Printed perimeter support; no metal in the radio antenna band",
			plan: color(tray, [0.2, 0.22, 0.25]),
			explodeZMm: 34,
		},
		{
			name: "ASR00012_MaximumEnvelope",
			description:
				"TinyCircuits protected 1000 mAh battery maximum 43×32×8.5 mm envelope; harness and thermal coupling require qualification",
			plan: color(cell, [0.7, 0.72, 0.75]),
			explodeZMm: 44,
		},
		{
			name: "SideShutterPlunger",
			description:
				"Horizontal actuator with 0.15 mm nominal free gap; switch stroke/printing tolerances require measurement",
			plan: color(plunger, [0.48, 0.29, 0.14]),
			explodeZMm: 4,
		},
		{
			name: "RemoteLid",
			description:
				"Removable lid; M2 nylon hardware specification and retention tests pending",
			plan: color(lid, [0.18, 0.2, 0.23]),
			explodeZMm: 74,
		},
		{
			name: "MagSafeGrip",
			description:
				"Integrated curved MagSafe shoulders and concealed sliding cradle; camera palm grip; no phone-size clamp",
			plan: color(union([contact, riser, arm, dock]), [0.17, 0.19, 0.22]),
			explodeZMm: 0,
		},
		{
			name: "MagSafeFaceCover",
			description:
				"Separate0.6mm printed contact cover; open array pocket can be assembled before cover bonding; material/adhesive/retention require qualification",
			plan: color(
				cylinder({ radiusMm: 29.5, heightMm: 0.6, center: [0, 0, 0.3] }),
				[0.18, 0.2, 0.23],
			),
			explodeZMm: -10,
		},

		{
			name: "MagSafeArrayReference",
			description:
				"Apple R31 46/54.1×1.1 mm array envelope ONLY; exact magnet, polarity and DC shield remain unselected",
			plan: color(ring, [0.8, 0.55, 0.15]),
			explodeZMm: -6,
			referenceOnly: true,
		},
	];
}
export function partInProduct(part: ProductPart): JscadOperation {
	return {
		type: "translate",
		vector: [
			part.name.startsWith("MagSafe") ? 0 : d.remote.centerXMm,
			part.name.startsWith("MagSafe") ? 0 : d.remote.centerYMm,
			part.name.startsWith("MagSafe") ? 0 : 4,
		],
		shape: part.plan,
	};
}
