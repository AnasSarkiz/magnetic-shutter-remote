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
	const caseBody = roundBox({
		widthMm: 54,
		lengthMm: 62,
		heightMm: 20,
		center: [-2, 0, 16],
	});
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
		box({ size: [12, 6, 9.5], center: [0, 30, 11.48] }), // USB-C + strain-relief approach
		box({ size: [6, 3.4, 2.2], center: [24, -8.5, 10.86] }), // horizontal shutter
		box({ size: [6, 8, 4], center: [24, 5, 10.8] }), // side power slider access
		box({ size: [6, 2.5, 2], center: [-28, -5, 10.2] }), // battery/status LED view
		box({ size: [2.5, 6, 2], center: [8, 30, 10.2] }), // charge LED view
	];
	const railGrooves = [-1, 1].map((side) =>
		box({ size: [3.8, 37, 1.6], center: [side === 1 ? 25.5 : -29.5, 9, 8.8] }),
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
			roundBox({
				widthMm: 54,
				lengthMm: 62,
				heightMm: 1.6,
				center: [-2, 0, 26.8],
			}),
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
	const plunger = union([
		box({ size: [3.375, 3, 1.8], center: [24.3115, -8.5, 10.86] }),
		box({ size: [0.6, 4.4, 3.2], center: [23.05, -8.5, 10.86] }),
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
	const riser = box({ size: [20, 6, 7], center: [0, -24, 6.3] });
	const arm = roundBox({
		widthMm: 30,
		lengthMm: 72,
		heightMm: 2.4,
		center: [0, -58, 8.8],
	});
	// Side-open sliding cradle supports the remote's floor; exposed antenna end stays plastic.
	const dock = union([
		box({ size: [54, 36, 1.6], center: [-2, -65, 9.2] }),
		...[-1, 1].map((side) =>
			box({ size: [2, 36, 4], center: [side === 1 ? 26 : -30, -65, 10.8] }),
		),
		...[-1, 1].map((side) =>
			box({
				size: [3, 36, 1.2],
				center: [side === 1 ? 25.5 : -29.5, -65, 12.8],
			}),
		),
		box({ size: [56, 2, 4], center: [-2, -41.8, 10.8] }),
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
			plan: color(plunger, [0.9, 0.35, 0.05]),
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
				"Printed 59 mm contact disk, raised handle and detachable sliding cradle; no phone-size clamp",
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
			0,
			part.name.startsWith("MagSafe") ? 0 : d.remote.centerYMm,
			part.name.startsWith("MagSafe") ? 0 : 4,
		],
		shape: part.plan,
	};
}
