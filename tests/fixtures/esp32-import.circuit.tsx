import { ESP32_C3_WROOM_02_N4 } from "../../imports/ESP32_C3_WROOM_02_N4/ESP32_C3_WROOM_02_N4";
import type { PinAttributeMap } from "@tscircuit/props";

// Espressif v1.7, Table 3-1: pin 1 is the 3.0–3.6 V input.
// Retain the import's pin 9 ground attribute. EP soldering is optional (section 9).
const manufacturerPinAttributes: Record<string, PinAttributeMap> = {
	pin1: { requiresPower: true },
	pin9: { requiresGround: true },
};

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
					pinAttributes={manufacturerPinAttributes}
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
