/** Millimetres; PCB XY and +Z away from the phone. Phone contact datum Z=0. */
export const dimensions = {
	pcb: { widthMm: 44, lengthMm: 56, thicknessMm: 1, centerZMm: 13.5 },
	remote: {
		widthMm: 64,
		lengthMm: 72,
		heightMm: 23,
		bottomZMm: 10,
		wallMm: 1.6,
		centerXMm: 52,
		centerYMm: 0,
	},
	battery: {
		widthMm: 43,
		lengthMm: 32,
		heightMm: 8.5,
		centerYMm: 6,
		bottomZMm: 19.4,
	},
	magsafe: {
		contactDiameterMm: 59,
		ringOuterDiameterMm: 54.1,
		ringInnerDiameterMm: 46,
		magnetThicknessMm: 1.1,
	},
	shutter: {
		actuatorXMm: 22.474,
		centerYMm: -8.5,
		centerZMm: 14.86,
		freeGapMm: 0.15,
	},
} as const;
export const mountingHolesMm = [
	[-19, 25],
	[19, 25],
	[-19, -14],
	[19, -14],
] as const;
