import {
	applyToPoint,
	compose,
	rotateDEG,
	translate,
} from "transformation-matrix";
/** Millimetres; original PCB XY and +Z away from the phone. */
export const dimensions = {
	pcb: { widthMm: 44, lengthMm: 56, thicknessMm: 1, centerZMm: 9.5 },
	product: { widthMm: 90, heightMm: 78, depthMm: 34 },
	remote: {
		widthMm: 90,
		lengthMm: 78,
		heightMm: 28,
		bottomZMm: 6,
		wallMm: 1.6,
		centerXMm: -15.2,
		centerYMm: -9,
		ccwRotationDegrees: 90,
	},
	battery: {
		widthMm: 32,
		lengthMm: 43,
		heightMm: 8.5,
		centerXMm: -38,
		centerYMm: -21.5,
		bottomZMm: 15.4,
	},
	magsafe: {
		centerXMm: 0,
		centerYMm: -5,
		contactDiameterMm: 59,
		ringOuterDiameterMm: 54.1,
		ringInnerDiameterMm: 46,
		magnetThicknessMm: 1.1,
	},
	shutter: {
		actuatorXMm: 22.474,
		centerYMm: -8.5,
		centerZMm: 10.86,
		freeGapMm: 0.15,
	},
} as const;
export const pcbToProductTransform = compose(
	translate(dimensions.remote.centerXMm, dimensions.remote.centerYMm),
	rotateDEG(dimensions.remote.ccwRotationDegrees),
);
export function pcbPointInProduct(point: { x: number; y: number }) {
	return applyToPoint(pcbToProductTransform, point);
}
export const mountingHolesMm = [
	[-19, 25],
	[19, 25],
	[-19, -14],
	[19, -14],
] as const;
