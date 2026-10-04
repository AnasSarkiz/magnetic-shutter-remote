/** Public jscad-planner operation format consumed by tscircuit CAD renderers.
 * Geometry here is mechanical only; no electronic models or footprints change.
 * https://github.com/tscircuit/jscad-planner
 */
export type Point3 = [number, number, number];
export type Point2 = [number, number];
export type Rgb = [number, number, number];
export type MechanicalPlan =
	| { type: "cuboid"; size: Point3 }
	| { type: "cylinder"; radius: number; height: number; center: Point3 }
	| { type: "sphere"; radius: number }
	| { type: "polygon"; points: Point2[] }
	| {
			type: "extrudeLinear";
			options: { height: number };
			shape: MechanicalPlan;
	  }
	| { type: "translate"; vector: Point3; shape: MechanicalPlan }
	| { type: "rotate"; angles: Point3; shape: MechanicalPlan }
	| { type: "colorize"; color: Rgb; shape: MechanicalPlan }
	| {
			type: "union" | "subtract" | "intersect" | "hull";
			shapes: MechanicalPlan[];
	  };

export function move(vector: Point3, shape: MechanicalPlan): MechanicalPlan {
	return { type: "translate", vector, shape };
}

export function box(size: Point3, center: Point3): MechanicalPlan {
	return move(center, { type: "cuboid", size });
}

export function cylinder(options: {
	x: number;
	y: number;
	z: number;
	radius: number;
	height: number;
}): MechanicalPlan {
	return {
		type: "cylinder",
		radius: options.radius,
		height: options.height,
		center: [options.x, options.y, options.z + options.height / 2],
	};
}

export function union(...shapes: MechanicalPlan[]): MechanicalPlan {
	return { type: "union", shapes };
}

export function subtract(...shapes: MechanicalPlan[]): MechanicalPlan {
	return { type: "subtract", shapes };
}

export function hull(...shapes: MechanicalPlan[]): MechanicalPlan {
	return { type: "hull", shapes };
}

export function colored(color: Rgb, shape: MechanicalPlan): MechanicalPlan {
	return { type: "colorize", color, shape };
}

export function roundedBox(options: {
	width: number;
	length: number;
	radius: number;
	z: number;
	height: number;
	x?: number;
	y?: number;
}): MechanicalPlan {
	const { width, length, radius, z, height, x = 0, y = 0 } = options;
	if (height <= 0 || radius <= 0 || radius * 2 >= Math.min(width, length)) {
		throw new Error("Invalid rounded enclosure dimensions");
	}
	const points: Point2[] = [];
	for (let corner = 0; corner < 4; corner++) {
		const cx =
			corner === 0 || corner === 3 ? width / 2 - radius : -width / 2 + radius;
		const cy = corner < 2 ? length / 2 - radius : -length / 2 + radius;
		for (let segment = 0; segment <= 12; segment++) {
			const angle = (corner * Math.PI) / 2 + (segment * Math.PI) / 24;
			points.push([
				cx + radius * Math.cos(angle),
				cy + radius * Math.sin(angle),
			]);
		}
	}
	return move([x, y, z], {
		type: "extrudeLinear",
		options: { height },
		shape: { type: "polygon", points },
	});
}

export function ring(options: {
	x: number;
	y: number;
	z: number;
	outerRadius: number;
	innerRadius: number;
	height: number;
}): MechanicalPlan {
	return subtract(
		cylinder({ ...options, radius: options.outerRadius }),
		cylinder({
			...options,
			radius: options.innerRadius,
			z: options.z - 0.01,
			height: options.height + 0.02,
		}),
	);
}

export function bar(options: {
	start: Point3;
	end: Point3;
	radius: number;
	height: number;
}): MechanicalPlan {
	return hull(
		cylinder({
			x: options.start[0],
			y: options.start[1],
			z: options.start[2],
			radius: options.radius,
			height: options.height,
		}),
		cylinder({
			x: options.end[0],
			y: options.end[1],
			z: options.end[2],
			radius: options.radius,
			height: options.height,
		}),
	);
}
