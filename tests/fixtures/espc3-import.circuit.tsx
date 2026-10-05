import { ESPC3_12_N4 } from "../../imports/ESPC3_12_N4/ESPC3_12_N4";
export default function Espc3ImportInspection() {
	return (
		<board width={30} height={44} layers={2} routingDisabled>
			<schematicsheet
				name="C3_IMPORT_AUDIT"
				sheetSize="A4"
				displayName="DOIT ESPC3-12-N4 qualification"
				sheetIndex={0}
			>
				<ESPC3_12_N4
					name="U1"
					pcbX={0}
					pcbY={-4}
					schX={0}
					schY={0}
					connections={{ pin15: "net.GND" }}
				/>
			</schematicsheet>
		</board>
	);
}
