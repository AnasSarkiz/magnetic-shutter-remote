import { expect, test } from "bun:test"
import { any_circuit_element } from "circuit-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { A_2N7002 } from "../fixtures/imported-r3/A_2N7002"
import { MSK12C02 } from "../fixtures/imported-r3/MSK12C02"

test("transparent fanout groups inherit the board subcircuit in schema-valid schematic output", async () => {
  const { circuit } = getTestFixture()
  circuit.add(
    <board width={30} height={20} routingDisabled>
      <schematicsheet name="Radio" sheetSize="A4" sheetIndex={0}>
        <fanout name="ESCAPE" pcbX={0} pcbY={0} padding={0.8}>
          <A_2N7002 name="Q1" pcbX={-6} connections={{ pin1: "SW1.pin1" }} />
        </fanout>
      </schematicsheet>
      <schematicsheet name="Power" sheetSize="A4" sheetIndex={1}>
        <MSK12C02 name="SW1" pcbX={6} />
      </schematicsheet>
    </board>,
  )
  await circuit.renderUntilSettled()
  const boardGroup = circuit.db.source_group
    .list()
    .find((group) => group.is_subcircuit)!
  const escape = circuit.db.schematic_group
    .list()
    .find((group) => group.name === "ESCAPE")!
  expect(escape.subcircuit_id).toBe(boardGroup.subcircuit_id!)
  const pcbEscape = circuit.db.pcb_group
    .list()
    .find((group) => group.name === "ESCAPE")!
  expect(pcbEscape.anchor_alignment).not.toBeNull()
  expect(pcbEscape.autorouter_configuration).toBeUndefined()
  expect(
    any_circuit_element.array().safeParse(circuit.getCircuitJson()).success,
  ).toBe(true)
  await expect(circuit).toMatchSchematicSnapshot(import.meta.path)
}, 30000)
