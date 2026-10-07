import { assembly } from "@tscircuit/core";
import { z } from "zod";
import pcbGlb from "./models/r8-pcb.glb";
import parts2Glb from "./models/r8-parts-2.glb";
import parts3Glb from "./models/r8-parts-3.glb";
import parts4Glb from "./models/r8-parts-4.glb";
import parts5Glb from "./models/r8-parts-5.glb";
import parts6Glb from "./models/r8-parts-6.glb";
import parts7Glb from "./models/r8-parts-7.glb";
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
			{[
				pcbGlb,
				parts2Glb,
				parts3Glb,
				parts4Glb,
				parts5Glb,
				parts6Glb,
				parts7Glb,
			].map((glbUrl, index) => (
				<assembly.subassembly
					key={pcbReview.nativeAssets[index].filename}
					name={
						index === 0
							? "R8QualifiedPCBAndFittedParts1"
							: `R8QualifiedFittedParts${index + 1}`
					}
					displayName={`Actual unchanged PCB geometry fragment${index + 1} of7`}
					cadModel={{
						glbUrl,
						modelBoardNormalDirection: "z+",
						modelUnitToMmScale: 1,
						size: pcbReview.nativeAssets[index].sizeMm,
						modelOriginPosition: { x: 0, y: 0, z: 0 },
						positionOffset: {
							x: d.remote.centerXMm,
							y: d.remote.centerYMm,
							z: d.pcb.centerZMm + (exploded ? 26 : 0),
						},
					}}
				/>
			))}

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
								x: center.x + (isGrip ? 0 : d.remote.centerXMm),
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
