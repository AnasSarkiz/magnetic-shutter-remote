import { expect, test } from "bun:test";
import { getJstMotorConnector } from "@tscircuit/modelprinter";

test("installed modelprinter provides the API imported by current core", () => {
	expect(typeof getJstMotorConnector).toBe("function");
});
