import { ESP32_C3_WROOM_02_N4 } from "../../imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4";

// Isolated, unrouted supplier-import inspection fixture. This is not the remote PCB.
export default function Esp32ImportInspection() {
	return (
		<board width={30} height={40} layers={2} routingDisabled>
			<schematicsheet
				name="IMPORT_AUDIT"
				sheetSize="A4"
				displayName="ESP32-C3 supplier import — qualification blocked"
				sheetIndex={0}
			>
				<ESP32_C3_WROOM_02_N4
					name="U1"
					pcbX={0}
					pcbY={0}
					schX={0}
					schY={0}
					connections={{ pin9: "net.GND", pin19: "net.GND" }}
				/>
			</schematicsheet>
		</board>
	);
}
