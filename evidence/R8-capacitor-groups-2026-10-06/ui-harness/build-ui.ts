import { resolve } from "node:path";
const projectRoot = process.cwd();
const result = await Bun.build({
  entrypoints: [".codex/runtime/style-ui/index.tsx"],
  outdir: ".codex/runtime/style-ui",
  target: "browser",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [{
    name: "deduplicate-react-runtime",
    setup(build) {
      build.onResolve({ filter: /^react(?:-dom)?(?:\/|$)/ }, (args) => ({
        path: Bun.resolveSync(args.path, projectRoot),
      }));
    },
  }],
});
if (!result.success) throw new Error(result.logs.map(String).join("\n"));
console.log(result.outputs.map((output) => output.path));
