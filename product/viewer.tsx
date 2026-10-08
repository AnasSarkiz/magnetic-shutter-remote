import { useCallback, useRef, useState } from "react";
import { CadViewer, type CadViewerProps } from "@tscircuit/3d-viewer";
import type { AnyCircuitElement } from "circuit-json";

type CameraController = NonNullable<
	Parameters<NonNullable<CadViewerProps["onCameraControllerReady"]>>[0]
>;
const cameras = {
	Angled: {
		position: [80, -105, 135],
		target: [0, 0, 17],
		up: [0, 0, 1],
		durationMs: 0,
	},
	Front: {
		position: [0, 0, 170],
		target: [0, 0, 17],
		up: [0, 1, 0],
		durationMs: 0,
	},
	Back: {
		position: [0, 0, -150],
		target: [0, 0, 17],
		up: [0, 1, 0],
		durationMs: 0,
	},
} satisfies Record<string, Parameters<CameraController["animateTo"]>[0]>;
export function ProductViewer({
	closed,
	exploded,
	modelUrls,
}: {
	closed: AnyCircuitElement[];
	exploded: AnyCircuitElement[];
	modelUrls: Record<string, string>;
}) {
	const resolveStaticAsset = useCallback(
		(modelUrl: string) => {
			const url = modelUrls[modelUrl];
			if (!url) throw new Error(`Missing embedded model: ${modelUrl}`);
			return url;
		},
		[modelUrls],
	);
	const [view, setView] = useState<"Closed" | "Exploded">("Closed");
	const [ready, setReady] = useState(false);
	const camera = useRef<CameraController | null>(null);
	const onCameraControllerReady = useCallback(
		(controller: CameraController | null) => {
			camera.current = controller;
			setReady(Boolean(controller));
			controller?.animateTo(cameras.Angled);
		},
		[],
	);
	return (
		<main>
			<header>
				<div>
					<h1>R8 magnetic shutter grip</h1>
					<p>Interactive 3D product assembly</p>
				</div>
				<nav>
					{(["Closed", "Exploded"] as const).map((label) => (
						<button
							key={label}
							aria-pressed={view === label}
							onClick={() => {
								setReady(false);
								setView(label);
							}}
						>
							{label}
						</button>
					))}
					{Object.entries(cameras).map(([label, config]) => (
						<button
							key={label}
							disabled={!ready}
							onClick={() => camera.current?.animateTo(config)}
						>
							{label}
						</button>
					))}
				</nav>
			</header>
			<section id="viewer" data-ready={ready} data-view={view}>
				<CadViewer
					key={view}
					circuitJson={view === "Closed" ? closed : exploded}
					resolveStaticAsset={resolveStaticAsset}
					autoRotateDisabled
					onCameraControllerReady={onCameraControllerReady}
				/>
			</section>
			<footer>
				90 × 78 × 34 mm design envelope · Physical prototype testing pending ·
				Drag to orbit; scroll to zoom
			</footer>
		</main>
	);
}
