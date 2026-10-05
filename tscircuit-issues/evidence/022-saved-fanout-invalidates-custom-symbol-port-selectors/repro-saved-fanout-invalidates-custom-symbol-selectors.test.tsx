import { expect, test } from "bun:test"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { A_2N7002 } from "../fixtures/imported-r3/A_2N7002"
import { MSK12C02 } from "../fixtures/imported-r3/MSK12C02"

test("adding a saved fanout exit preserves custom-symbol port aliases on other sheets", async () => {
  const { circuit } = getTestFixture()
  circuit.add(
    <board width={30} height={20} routingDisabled>
      <net name="V3" />
      <schematicsheet name="Radio" sheetSize="A4" sheetIndex={0}>
        <fanout name="ESCAPE" pcbTracePaths={[
          {
            connection: "Q1.pin1",
            route: [
              // Supplier pad center (0.999998, -0.94996), translated by Q1.
              { route_type: "wire", x: -5.000002, y: -0.94996, width: 0.15, layer: "top" },
              { route_type: "wire", x: -3, y: -0.94996, width: 0.15, layer: "top" },
            ],
          },
        ]}>
          <A_2N7002 name="Q1" pcbX={-6} connections={{ pin1: "SW1.pin1" }} />
        </fanout>
      </schematicsheet>
      <schematicsheet name="Power" sheetSize="A4" sheetIndex={1}>
        <MSK12C02 name="SW1" pcbX={6} connections={{ pin2: "net.V3" }} />
      </schematicsheet>
    </board>,
  )
  await circuit.renderUntilSettled()
  expect(circuit.db.source_trace.list()).toHaveLength(2)
  expect(circuit.db.pcb_breakout_point.list()).toHaveLength(1)
  expect(circuit.selectOne("SW1.pin1", { type: "port" })).not.toBeNull()
  expect(circuit.selectOne("SW1.pin2", { type: "port" })).not.toBeNull()
  await expect(circuit).toMatchSchematicSnapshot(import.meta.path)
}, 30000)
