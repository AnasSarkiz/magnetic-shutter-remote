import { mat3, quat } from "gl-matrix";
import { z } from "zod";

/** Lossless glTF scene transform: native export (-PCB X, PCB Z, PCB Y) → PCB XYZ.
 * Meshes, textures and the binary chunk remain byte-for-byte untouched.
 * A standard glTF parent node records the proper rotation; no scale or fit.
 */
export function pcbModelInBoardCoordinates(glb: ArrayBuffer): Uint8Array {
	const source = new Uint8Array(glb),
		view = new DataView(glb);
	if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2)
		throw new Error("Expected glTF 2 GLB");
	const jsonLength = view.getUint32(12, true);
	const document = z
		.object({
			nodes: z.array(z.record(z.unknown())),
			scenes: z.array(z.object({ nodes: z.array(z.number()) }).passthrough()),
		})
		.passthrough()
		.parse(
			JSON.parse(new TextDecoder().decode(source.slice(20, 20 + jsonLength))),
		);
	const boardFromNative = mat3.fromValues(-1, 0, 0, 0, 0, 1, 0, 1, 0);
	const rotation = Array.from(quat.fromMat3(quat.create(), boardFromNative));
	for (const scene of document.scenes) {
		const root = document.nodes.length;
		document.nodes.push({
			name: "NativeExportToPcbCoordinates",
			rotation,
			children: scene.nodes,
		});
		scene.nodes = [root];
	}
	const encoded = new TextEncoder().encode(JSON.stringify(document));
	const paddedLength = Math.ceil(encoded.length / 4) * 4;
	const tail = source.slice(20 + jsonLength),
		output = new Uint8Array(20 + paddedLength + tail.length),
		header = new DataView(output.buffer);
	header.setUint32(0, 0x46546c67, true);
	header.setUint32(4, 2, true);
	header.setUint32(8, output.length, true);
	header.setUint32(12, paddedLength, true);
	header.setUint32(16, 0x4e4f534a, true);
	output.fill(32, 20, 20 + paddedLength);
	output.set(encoded, 20);
	output.set(tail, 20 + paddedLength);
	if (
		!output
			.slice(20 + paddedLength)
			.every((byte, index) => byte === tail[index])
	)
		throw new Error("Binary geometry changed");
	return output;
}
