import { expect, test } from "bun:test"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { A_2N7002 } from "../fixtures/imported-r3/A_2N7002"
import { MSK12C02 } from "../fixtures/imported-r3/MSK12C02"

test("fanout resolves a later custom-symbol switch after symbol ports initialize", async () => {
  const { circuit } = getTestFixture()
  circuit.add(
    <board width={30} height={20} routingDisabled>
      <schematicsheet name="Radio" sheetSize="A4" sheetIndex={0}>
      <fanout name="ESCAPE" padding={0.8}>
        <A_2N7002 name="Q1" pcbX={-6} connections={{ pin1: "SW1.pin1" }} />
      </fanout>
      </schematicsheet>
      <schematicsheet name="Power" sheetSize="A4" sheetIndex={1}>
      <MSK12C02 name="SW1" pcbX={6} />
      </schematicsheet>
    </board>,
  )
  await circuit.renderUntilSettled()
  const switchComponent = circuit.db.source_component.getWhere({ name: "SW1" })!
  const switchPorts = circuit.db.source_port
    .list()
    .filter(
      (port) =>
        port.source_component_id === switchComponent.source_component_id,
    )
  expect(
    switchPorts
      .flatMap((port) =>
        port.pin_number === undefined ? [] : [port.pin_number],
      )
      .sort(),
  ).toEqual([1, 2, 3, 4])
  expect(circuit.db.source_trace.list()).toHaveLength(1)
  expect(circuit.db.pcb_breakout_point.list()).toHaveLength(1)
  await expect(circuit).toMatchSchematicSnapshot(import.meta.path)
})
