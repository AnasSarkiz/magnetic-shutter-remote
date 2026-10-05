import { TS24CA } from "../../imports/TS24CA/TS24CA";

// Manufacturer TS24CA: contacts 1/2 are normally open; 3/4 are
// the one-piece metal support, independent of the switch contacts.
export default function SideShutterInspection() {
	return (
		<board width={48} height={20} layers={2} routingDisabled>
			<net name="GND" isGroundNet />
			<net name="SHUTTER" />
			<schematicsheet name="SWITCH_AUDIT" sheetSize="A4" sheetIndex={0}>
				<TS24CA
					name="SW2"
					pcbX={22}
					pcbY={0}
					pcbRotation={-90}
					allowOffBoard
					schX={0}
					schY={0}
					internallyConnectedPins={[[3, 4]]}
					connections={{
						pin1: "net.SHUTTER",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
					}}
				/>
			</schematicsheet>
		</board>
	);
}
