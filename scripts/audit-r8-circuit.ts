import { any_circuit_element } from "circuit-json";
import { z } from "zod";

// Electrical safety contracts from the selected module, TI and battery data.
const circuit = any_circuit_element.array().parse(
	await Bun.file(
		z
			.string()
			.min(1)
			.parse(Bun.argv[2] ?? "dist/index/circuit.json"),
	).json(),
);
const components = circuit.filter((e) => e.type === "source_component");
const ports = circuit.filter((e) => e.type === "source_port");
const nets = circuit.filter((e) => e.type === "source_net");
// Repeated supplier lands use canonical explicit internal connections. Never
// infer a shared net from a component name or matching terminal label alone.
const memberships = ports.map((port) => ({
	sourcePortId: port.source_port_id,
	connectivityKey: port.subcircuit_connectivity_map_key,
}));
const internalConnections = circuit.filter(
	(e) => e.type === "source_component_internal_connection",
);
let changed = true;
while (changed) {
	changed = false;
	for (const connection of internalConnections) {
		const group = memberships.filter((m) =>
			connection.source_port_ids.includes(m.sourcePortId),
		);
		const keys = new Set(
			group.flatMap((m) => (m.connectivityKey ? [m.connectivityKey] : [])),
		);
		if (keys.size > 1)
			throw new Error("Conflicting internally connected terminal nets");
		const key = [...keys][0];
		if (!key) continue;
		for (const membership of group) {
			if (!membership.connectivityKey) {
				membership.connectivityKey = key;
				changed = true;
			}
		}
	}
}
const contracts = [
	{
		ref: "SW2",
		mpn: "TS24CA",
		part: "C393942",
		pins: { 1: "SHUTTER", 2: "GND", 3: "GND", 4: "GND" },
	},
	{
		ref: "Q1",
		mpn: "2N7002",
		part: "C8545",
		pins: { 1: "USB5V", 2: "GND", 3: "REG_EN" },
	},
	{
		ref: "Q2",
		mpn: "2N7002",
		part: "C8545",
		pins: { 1: "TEMP_OK", 2: "GND", 3: "CHARGE_DISABLE" },
	},
	{
		ref: "SW1",
		mpn: "MSK12C02",
		part: "C431540",
		pins: { 1: "BATTERY_OK", 2: "POWER_SWITCH", 3: "GND", 4: "GND" },
	},
	{
		ref: "U4",
		mpn: "TPS3839G33DBZR",
		part: "C485802",
		pins: { 1: "GND", 2: "BATTERY_OK", 3: "VBAT" },
	},
	{
		ref: "U1",
		mpn: "ESPC3-12-N4",
		part: "C19949072",
		pins: {
			3: "EN",
			6: "SHUTTER",
			7: "PAIR",
			8: "V3",
			15: "GND",
			12: "STATUS_LED",
			18: "BOOT",
			21: "UART_RX",
			22: "UART_TX",
		},
	},
	{
		ref: "U3",
		mpn: "TPS63031DSKR",
		part: "C15516",
		pins: {
			1: "V3",
			2: "INDUCTOR_L2",
			3: "GND",
			4: "INDUCTOR_L1",
			5: "VBAT",
			6: "REG_EN",
			7: "GND",
			8: "VBAT",
			9: "GND",
			10: "V3",
			11: "GND",
		},
	},
	{
		ref: "J2",
		mpn: "SM02B-SRSS-TB(LF)(SN)",
		part: "C160402",
		pins: { 1: "GND", 2: "VBAT", 3: "GND", 4: "GND" },
	},
	{
		ref: "J3",
		mpn: "BM06B-SRSS-TB(LF)(SN)",
		part: "C160392",
		pins: {
			1: "V3",
			2: "UART_RX",
			3: "GND",
			4: "UART_TX",
			5: "EN",
			6: "BOOT",
			7: "GND",
			8: "GND",
		},
	},
	{
		ref: "L1",
		mpn: "SWPA3015S1R5NT",
		part: "C56594",
		pins: { 1: "INDUCTOR_L2", 2: "INDUCTOR_L1" },
	},
];
for (const contract of contracts) {
	const component = components.find((e) => e.name === contract.ref);
	if (
		!component ||
		component.manufacturer_part_number !== contract.mpn ||
		!component.supplier_part_numbers?.jlcpcb?.includes(contract.part)
	) {
		throw new Error(`${contract.ref}: exact manufacturer identity mismatch`);
	}
	for (const [pin, netName] of Object.entries(contract.pins)) {
		const port = ports.find(
			(e) =>
				e.source_component_id === component.source_component_id &&
				e.pin_number === Number(pin),
		);
		const net = nets.find((e) => e.name === netName);
		if (
			!port ||
			!net?.subcircuit_connectivity_map_key ||
			memberships.find((m) => m.sourcePortId === port.source_port_id)
				?.connectivityKey !== net.subcircuit_connectivity_map_key
		) {
			throw new Error(`${contract.ref}.pin${pin}: expected ${netName}`);
		}
	}
}
const r3 = components.find((e) => e.name === "R3");
if (
	r3?.ftype !== "simple_resistor" ||
	r3.resistance !== 1000 ||
	r3.supplier_part_numbers?.jlcpcb?.[0] !== "C21190"
) {
	throw new Error("Charge setting must be the qualified exact 1k resistor");
}
const radio = components.find((e) => e.name === "U1");
if (
	!ports.find(
		(p) =>
			p.source_component_id === radio?.source_component_id &&
			p.pin_number === 8,
	)?.requires_power
) {
	throw new Error("C3 supply metadata is missing");
}
const board = circuit.find((e) => e.type === "pcb_board");
if (board?.width !== 48 || board.height !== 56 || board.num_layers !== 2) {
	throw new Error("Board envelope differs from battery/antenna qualification");
}
console.log(
	`R8 electrical contracts PASS; ${components.length} fitted references`,
);
