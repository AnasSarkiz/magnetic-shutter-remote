import { BM06B_SRSS_TB_LF__SN_ } from "../imports/BM06B_SRSS_TB_LF__SN_";
import { GW_VJLPL1_CM_LTLV_XX58_1_350_R18 } from "../imports/GW_VJLPL1_CM_LTLV_XX58_1_350_R18/GW_VJLPL1_CM_LTLV_XX58_1_350_R18";
import { GW_VJLPL1_CM_K3LX_XX51_1_350_R18 } from "../imports/GW_VJLPL1_CM_K3LX_XX51_1_350_R18/GW_VJLPL1_CM_K3LX_XX51_1_350_R18";

// Engineering emitter-board candidate only. Its external driver is NOT yet
// qualified. Six series LEDs per colour; never connect directly to the battery.
// The 64 mm envelope and 44 mm opening are proposed, not verified enclosure fit.
const outerOutline = Array.from({ length: 256 }, (_, index) => {
	const angleRadians = (index * 2 * Math.PI) / 256;
	return { x: 32 * Math.cos(angleRadians), y: 32 * Math.sin(angleRadians) };
});

const ledLocations = Array.from({ length: 6 }, (_, index) => {
	// Keep the connector sector at -90 degrees free.
	const warmAngleDegrees = index * 60;
	const coolAngleDegrees = warmAngleDegrees + 25;
	return {
		index,
		warmAngleDegrees,
		coolAngleDegrees,
		warmX: 27 * Math.cos((warmAngleDegrees * Math.PI) / 180),
		warmY: 27 * Math.sin((warmAngleDegrees * Math.PI) / 180),
		coolX: 27 * Math.cos((coolAngleDegrees * Math.PI) / 180),
		coolY: 27 * Math.sin((coolAngleDegrees * Math.PI) / 180),
	};
});

export function FillLightRing() {
	return (
		<board
			title="R7 fill-light emitter candidate — UNROUTED / NOT FOR FABRICATION"
			width="64mm"
			height="64mm"
			outline={outerOutline}
			thickness="1mm"
			layers={2}
			routingDisabled
			minTraceWidth="0.15mm"
			minTraceToPadEdgeClearance="0.15mm"
			minPadEdgeToPadEdgeClearance="0.15mm"
			schAutoLayoutEnabled={false}
		>
			<cutout shape="circle" radius="22mm" pcbX={0} pcbY={0} />
			<net name="GND" isGroundNet />
			<schematicsheet name="Emitter" sheetIndex={0} sheetSize="A4">
				<BM06B_SRSS_TB_LF__SN_
					name="J1"
					pcbX={0}
					pcbY={-27}
					schX={-16}
					schY={0}
					connections={{
						pin5: "net.GND",
						pin6: "net.GND",
						pin7: "net.GND",
						pin8: "net.GND",
					}}
				/>
				{ledLocations.map((location) => (
					<GW_VJLPL1_CM_LTLV_XX58_1_350_R18
						key={`warm-${location.index}`}
						name={`D${location.index + 1}`}
						pcbX={location.warmX}
						pcbY={location.warmY}
						pcbRotation={location.warmAngleDegrees + 90}
						schX={-7 + location.index * 4}
						schY={5}
						pcbSx={{ "& smtpad": { solderPasteMargin: "-0.025mm" } }}
					/>
				))}
				{ledLocations.map((location) => (
					<GW_VJLPL1_CM_K3LX_XX51_1_350_R18
						key={`cool-${location.index}`}
						name={`D${location.index + 7}`}
						pcbX={location.coolX}
						pcbY={location.coolY}
						pcbRotation={location.coolAngleDegrees + 90}
						schX={-7 + location.index * 4}
						schY={-5}
						pcbSx={{ "& smtpad": { solderPasteMargin: "-0.025mm" } }}
					/>
				))}
				<trace from=".J1.pin1" to=".D1.pin2" />
				<trace from=".D6.pin1" to=".J1.pin2" />
				<trace from=".J1.pin3" to=".D7.pin2" />
				<trace from=".D12.pin1" to=".J1.pin4" />
				{Array.from({ length: 5 }, (_, index) => (
					<trace
						key={`warm-link-${index}`}
						from={`.D${index + 1}.pin1`}
						to={`.D${index + 2}.pin2`}
					/>
				))}
				{Array.from({ length: 5 }, (_, index) => (
					<trace
						key={`cool-link-${index}`}
						from={`.D${index + 7}.pin1`}
						to={`.D${index + 8}.pin2`}
					/>
				))}
			</schematicsheet>
		</board>
	);
}
