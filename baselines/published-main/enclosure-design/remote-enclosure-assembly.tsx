import { assembly } from "@tscircuit/core";
import { createParts, cutawayPart } from "./parts";
import boardAssets from "./board-assets.json";
import { modelUrls } from "./model-urls";
import modelMetadata from "./model-metadata.json";
const modelDimensions: Record<
	string,
	{ size: { x: number; y: number; z: number } }
> = modelMetadata;

export interface EnclosureAssemblyProps {
	view?: "closed" | "exploded" | "cutaway";
	showGrip?: boolean;
	geometryMode?: "assets" | "parametric";
}

/** Native assembly containers emit mechanical CAD only, never purchased PCB parts. */
export function RemoteEnclosureAssembly({
	view = "closed",
	showGrip = true,
	geometryMode = "assets",
}: EnclosureAssemblyProps) {
	return (
		<assembly.device name="GripShutterR6EnclosureE1">
			{/* Exact frozen full-board model, including all 37 supplier models.
			    This mechanical view never creates or re-routes a second PCB. */}
			<assembly.subassembly name="FrozenR6PCB37TopComponents">
				{boardAssets.map((asset) => (
					<assembly.subassembly
						key={asset.name}
						name={`FrozenR6_${asset.name}`}
						cadModel={{
							glbUrl: modelUrls[asset.file],
							size: modelDimensions[asset.file].size,
							modelUnitToMmScale: 1,
							modelBoardNormalDirection: "z+",
							modelOriginPosition: { x: 0, y: 0, z: 0 },
						}}
					/>
				))}
			</assembly.subassembly>
			<assembly.subassembly name="OriginalEnclosureE1">
				{createParts()
					.filter(
						(part) =>
							showGrip ||
							!(part.name.includes("Dock") || part.name.startsWith("Phone")),
					)
					.map((part) => (
						<assembly.subassembly
							key={part.name}
							name={part.name}
							displayName={`${part.name} — ${part.material}`}
							cadModel={{
								...(geometryMode === "parametric"
									? {
											jscad:
												view === "cutaway" &&
												["RemoteBase", "RemoteLid"].includes(part.name)
													? cutawayPart(part.plan)
													: part.plan,
										}
									: {
											glbUrl:
												modelUrls[
													`${part.name}${view === "cutaway" && ["RemoteBase", "RemoteLid"].includes(part.name) ? "-cutaway" : ""}.glb`
												],
											modelBoardNormalDirection: "z+",
										}),
								size: modelDimensions[
									`${part.name}${view === "cutaway" && ["RemoteBase", "RemoteLid"].includes(part.name) ? "-cutaway" : ""}.glb`
								].size,
								positionOffset: {
									x: 0,
									y: 0,
									z: view === "exploded" ? part.explodeZ : 0,
								},
								showAsTranslucentModel: part.translucent ?? false,
							}}
						/>
					))}
			</assembly.subassembly>
		</assembly.device>
	);
}
