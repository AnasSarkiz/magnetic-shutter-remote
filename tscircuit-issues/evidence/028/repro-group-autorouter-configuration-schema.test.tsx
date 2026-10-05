import { expect, test } from "bun:test"
import { any_circuit_element } from "circuit-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { A_2N7002 } from "../fixtures/imported-r3/A_2N7002"
import { MSK12C02 } from "../fixtures/imported-r3/MSK12C02"

test("PCB groups retain explicitly configured trace clearance", async () => {
  const { circuit } = getTestFixture()
  circuit.add(
    <board width={30} height={20} routingDisabled>
      <group subcircuit name="EXPLICIT" autorouter={{ traceClearance: 0.2 }}>
        <A_2N7002 name="Q1" />
      </group>
    </board>,
  )
  await circuit.renderUntilSettled()
  const pcbGroup = circuit.db.pcb_group
    .list()
    .find((group) => group.name === "EXPLICIT")!
  expect(pcbGroup.autorouter_configuration?.trace_clearance).toBe(0.2)
  expect(
    any_circuit_element.array().safeParse(circuit.getCircuitJson()).success,
  ).toBe(true)
}, 30000)
