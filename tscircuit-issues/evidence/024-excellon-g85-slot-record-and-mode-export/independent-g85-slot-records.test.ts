import { expect, test } from "bun:test"
import { any_circuit_element } from "circuit-json"
import {
  convertSoupToExcellonDrillCommands,
  stringifyExcellonDrill,
} from "src/excellon-drill"

test("four supplier USB shell slots have self-contained start/end records and return to drill mode", async () => {
  const circuitJson = any_circuit_element
    .array()
    .parse(await Bun.file("tests/fixtures/r3-slot-export/circuit.json").json())
  const commands = convertSoupToExcellonDrillCommands({
    circuitJson,
    is_plated: true,
  })
  const lines = stringifyExcellonDrill(commands).split("\n")
  const slots = lines.flatMap((line, index) =>
    line.includes("G85") ? [{ line, index }] : [],
  )
  expect(slots).toHaveLength(4)
  for (const { line, index } of slots) {
    const match = /^X(-?[\d.]+)Y(-?[\d.]+)G85X(-?[\d.]+)Y(-?[\d.]+)$/.exec(line)
    expect(match).not.toBeNull()
    if (!match)
      throw new Error("Slot must contain both coordinates on one record")
    const [, sx, sy, ex, ey] = match.map(Number)
    expect(Math.hypot(ex - sx, ey - sy)).toBeCloseTo(0.8, 3)
    expect(lines[index + 1]).toBe("G05")
  }
  expect(lines[0]).toBe("M48")
})
