import { SKRTLAE010 } from "../../imports/SKRTLAE010/SKRTLAE010";

// ALPS pages2/3:1/3 common,2 normally-open contact,4/5 metal frame.
export default function AlpsSideShutterInspection() {
	return (
		<board width={48} height={20} layers={2} routingDisabled>
			<net name="GND" isGroundNet />
			<net name="SHUTTER" />
			<schematicsheet name="ALPS_AUDIT" sheetSize="A4" sheetIndex={0}>
				<SKRTLAE010
					name="SW2"
					pcbX={22}
					pcbY={0}
					pcbRotation={90}
					allowOffBoard
					schX={0}
					schY={0}
					internallyConnectedPins={[[1,3],[4,5]]}
					connections={{pin1:"net.SHUTTER",pin2:"net.GND",pin3:"net.SHUTTER",pin4:"net.GND",pin5:"net.GND"}}
				/>
			</schematicsheet>
			<keepout  pcbX={23.05} pcbY={0} width={1.2} height={2} shape="rect" layers={["top","bottom"]} excludeRefs={[".SW2"]} />
		</board>
	);
}
