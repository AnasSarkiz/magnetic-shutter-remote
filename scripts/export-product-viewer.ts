import { resolve } from "node:path";
import { any_circuit_element } from "circuit-json";

const projectRoot = process.cwd();
const buildDirectory = resolve(".codex/runtime/product-viewer-build");
const modelUrls: Record<string, string> = {};
for await (const filename of new Bun.Glob("product/models/**/*.glb").scan(
	".",
)) {
	modelUrls[`./${filename}`] =
		`data:model/gltf-binary;base64,${Buffer.from(await Bun.file(filename).arrayBuffer()).toString("base64")}`;
}
if (Object.keys(modelUrls).length !== 17)
	throw new Error("Expected all17 product models");
const closed = any_circuit_element
	.array()
	.parse(await Bun.file("dist/enclosure/circuit.json").json());
const exploded = any_circuit_element
	.array()
	.parse(await Bun.file("dist/product.exploded/circuit.json").json());
await Bun.write(
	`${buildDirectory}/inputs.json`,
	JSON.stringify({ closed, exploded, modelUrls }),
);
await Bun.write(
	`${buildDirectory}/entry.tsx`,
	`import { createRoot } from "react-dom/client";
import { ProductViewer } from "${resolve("product/viewer.tsx")}";
import inputs from "./inputs.json";
import { any_circuit_element } from "circuit-json";
const modelUrls: Record<string, string> = {};
for (const [path, encodedUrl] of Object.entries(inputs.modelUrls)) {
  const binary = atob(encodedUrl.slice(encodedUrl.indexOf(",") + 1));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  modelUrls[path] = URL.createObjectURL(new Blob([bytes], { type: "model/gltf-binary" }));
}
createRoot(document.getElementById("root")!).render(<ProductViewer closed={any_circuit_element.array().parse(inputs.closed)} exploded={any_circuit_element.array().parse(inputs.exploded)} modelUrls={modelUrls} />);
`,
);
const result = await Bun.build({
	entrypoints: [`${buildDirectory}/entry.tsx`],
	outdir: buildDirectory,
	target: "browser",
	minify: true,
	define: { "process.env.NODE_ENV": '"production"' },
	plugins: [
		{
			name: "deduplicate-react-runtime",
			setup(build) {
				build.onResolve({ filter: /^react(?:-dom)?(?:\/|$)/ }, (args) => ({
					path: Bun.resolveSync(args.path, projectRoot),
				}));
			},
		},
	],
});
if (!result.success) throw new Error(result.logs.map(String).join("\n"));
// Escape the HTML raw-text terminator without changing JavaScript string values.
const javascript = (await result.outputs[0].text()).replace(
	/<\/script/g,
	"<\\/script",
);
const template =
	'<!doctype html><html><head><meta charset="utf-8"><title>R8 native viewer check</title><style>*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4f5f6;color:#19212c}main{height:100vh;display:flex;flex-direction:column}header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #ccd1d8;background:white}h1{font-size:21px;margin:0 0 6px}p{font-size:13px;margin:0;color:#637080}nav{display:flex;gap:8px}button{padding:9px 14px;border:1px solid #bac3cc;border-radius:6px;background:white;color:#19212c;cursor:pointer}button[aria-pressed=true]{background:#243b53;color:white}#viewer{flex:1;min-height:0;position:relative}footer{padding:12px 24px;background:white;font-size:13px;border-top:1px solid #ccd1d8}</style></head><body><div id="root"></div><script type="module" src="/index.js"></script></body></html>\n';
await Bun.write(
	"dist/enclosure/viewer.html",
	template.replace(
		'<script type="module" src="/index.js"></script>',
		() => `<script type="module">${javascript}</script>`,
	),
);
console.log(
	"dist/enclosure/viewer.html embeds both native views and all17 actual model assets; no local server required.",
);
