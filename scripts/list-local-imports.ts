import { z } from "zod";
import { localModuleSpecifiers } from "./lib/local-module-specifiers";

const paths = z.array(z.string()).parse(JSON.parse(await Bun.stdin.text()));
const imports: Record<string, string[]> = {};
for (const path of paths)
	imports[path] = localModuleSpecifiers({
		path,
		source: await Bun.file(path).text(),
	});
console.log(JSON.stringify(imports));
