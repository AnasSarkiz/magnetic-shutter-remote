import "jscad-planner";
import type modeling from "@jscad/modeling";
import type { JscadOperation } from "jscad-planner";
declare module "jscad-planner" {
	/** Public evaluator accepts the real JSCAD implementation. Its published
	 * generic signature cannot express JSCAD's separate 2D/3D overloads.
	 * Validate the heterogeneous result before treating it as a solid.
	 */
	export function executeJscadOperations(
		implementation: typeof modeling,
		operation: JscadOperation,
	): unknown;
}
