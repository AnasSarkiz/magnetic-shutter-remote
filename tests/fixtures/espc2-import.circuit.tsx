import { ESPC2_12E_N4 } from "../../imports/ESPC2_12E_N4/ESPC2_12E_N4";

// Qualification fixture for the selected cheaper radio, not the remote board.
export default function Espc2ImportInspection() {
	return (
		<board width={30} height={40} layers={2} routingDisabled>
			<schematicsheet
				name="C2_IMPORT_AUDIT"
				sheetSize="A4"
				displayName="DOIT ESPC2-12E-N4 — component qualification"
				sheetIndex={0}
			>
				<ESPC2_12E_N4
					name="U1"
					pcbX={0}
					pcbY={0}
					schX={0}
					schY={0}
					connections={{ pin9: "net.GND" }}
				/>
			</schematicsheet>
		</board>
	);
}
