import { assembly } from "@tscircuit/core";
import { z } from "zod";
import pcbGlb from "./models/r8-pcb.glb";
import controlsGlb from "./models/r8-controls.glb";
import { dimensions as d } from "./dimensions";
import { createProductParts } from "./geometry";
import review from "./geometry-review.json";
import pcbReview from "./pcb-model-review.json";
const vector = z.tuple([z.number(), z.number(), z.number()]);
const measuredParts = z
	.array(
		z.object({ name: z.string(), localBoundsMm: z.tuple([vector, vector]) }),
	)
	.parse(review.parts);
export function R8ProductAssembly({
	exploded = false,
}: {
	exploded?: boolean;
}) {
	return (
		<assembly.device name="R8MagneticShutterProductPrototype">
			<assembly.subassembly
				name="R8QualifiedPCBAnd22FittedParts"
				displayName="Actual routed R8 PCB and22 supplier models"
				cadModel={{
					glbUrl: pcbGlb,
					modelBoardNormalDirection: "z+",
					modelUnitToMmScale: 1,
					size: pcbReview.nativeAssets[0].sizeMm,
					modelOriginPosition: { x: 0, y: 0, z: 0 },
					positionOffset: {
						x: 0,
						y: d.remote.centerYMm,
						z: d.pcb.centerZMm + (exploded ? 26 : 0),
					},
				}}
			/>
			<assembly.subassembly
				name="R8QualifiedControlsAndProtection"
				displayName="Remaining22 actual fitted models; same PCB transform"
				cadModel={{
					glbUrl: controlsGlb,
					modelBoardNormalDirection: "z+",
					modelUnitToMmScale: 1,
					size: pcbReview.nativeAssets[1].sizeMm,
					modelOriginPosition: { x: 0, y: 0, z: 0 },
					positionOffset: {
						x: 0,
						y: d.remote.centerYMm,
						z: d.pcb.centerZMm + (exploded ? 26 : 0),
					},
				}}
			/>

			{createProductParts().map((part) => {
				const measured = measuredParts.find((row) => row.name === part.name);
				if (!measured)
					throw new Error(`Missing mechanical measurements: ${part.name}`);
				const [min, max] = measured.localBoundsMm;
				const center = {
					x: (min[0] + max[0]) / 2,
					y: (min[1] + max[1]) / 2,
					z: (min[2] + max[2]) / 2,
				};
				const isGrip = part.name.startsWith("MagSafe");
				return (
					<assembly.subassembly
						key={part.name}
						name={part.name}
						displayName={part.description}
						cadModel={{
							jscad: {
								type: "translate",
								vector: [-center.x, -center.y, -center.z],
								shape: part.plan,
							},
							size: {
								x: max[0] - min[0],
								y: max[1] - min[1],
								z: max[2] - min[2],
							},
							modelOriginPosition: { x: 0, y: 0, z: 0 },
							positionOffset: {
								x: center.x,
								y: center.y + (isGrip ? 0 : d.remote.centerYMm),
								z:
									center.z +
									(isGrip ? 0 : 4) +
									(exploded ? part.explodeZMm : 0),
							},
							showAsTranslucentModel: part.referenceOnly ?? false,
						}}
					/>
				);
			})}
		</assembly.device>
	);
}
