import { BM07B_SRSS_TB_LF__SN_ } from "../imports/BM07B_SRSS_TB_LF__SN_";
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
	// Twelve emitters span 300 degrees, leaving 60 degrees for the harness.
	const warmAngleDegrees = -60 + (index * 2 * 300) / 11;
	const coolAngleDegrees = -60 + ((index * 2 + 1) * 300) / 11;
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
			schLayout={{ layoutMode: "relative" }}
		>
			<cutout shape="circle" radius="22mm" pcbX={0} pcbY={0} />
			<net name="GND" isGroundNet />
			<net name="WARM_A" />
			<net name="WARM_K" />
			<net name="COOL_A" />
			<net name="COOL_K" />
			<net name="WARM_1" />
			<net name="WARM_2" />
			<net name="WARM_3" />
			<net name="WARM_4" />
			<net name="WARM_5" />
			<net name="COOL_1" />
			<net name="COOL_2" />
			<net name="COOL_3" />
			<net name="COOL_4" />
			<net name="COOL_5" />
			<schematicsheet name="Emitter" sheetIndex={0} sheetSize="A4">
				<BM07B_SRSS_TB_LF__SN_
					name="J1"
					pcbX={0}
					pcbY={-27}
					schX={-12}
					schY={0}
					connections={{
						pin1: "net.WARM_A",
						pin2: "net.WARM_K",
						pin3: "net.COOL_A",
						pin4: "net.COOL_K",
						// Reserved thermal-sensor contacts; not connected until the
						// sensor circuit is qualified. Seven ways cannot mate with SWD.
						pin5: "net.NC",
						pin6: "net.NC",
						pin7: "net.GND",
						pin8: "net.GND",
						pin9: "net.GND",
					}}
				/>
				{ledLocations.map((location) => (
					<GW_VJLPL1_CM_LTLV_XX58_1_350_R18
						key={`warm-${location.index}`}
						name={`D${location.index + 1}`}
						pcbX={location.warmX}
						pcbY={location.warmY}
						pcbRotation={location.index === 0 || location.index === 5 ? 180 : 0}
						schX={-6 + location.index * 3}
						schY={5}
						connections={{
							pin2:
								location.index === 0
									? "net.WARM_A"
									: `net.WARM_${location.index}`,
							pin1:
								location.index === 5
									? "net.WARM_K"
									: `net.WARM_${location.index + 1}`,
						}}
						pcbSx={{ "& smtpad": { solderPasteMargin: "-0.025mm" } }}
					/>
				))}
				{ledLocations.map((location) => (
					<GW_VJLPL1_CM_K3LX_XX51_1_350_R18
						key={`cool-${location.index}`}
						name={`D${location.index + 7}`}
						pcbX={location.coolX}
						pcbY={location.coolY}
						pcbRotation={location.index === 0 || location.index === 5 ? 180 : 0}
						schX={-6 + location.index * 3}
						schY={-5}
						connections={{
							pin2:
								location.index === 0
									? "net.COOL_A"
									: `net.COOL_${location.index}`,
							pin1:
								location.index === 5
									? "net.COOL_K"
									: `net.COOL_${location.index + 1}`,
						}}
						pcbSx={{ "& smtpad": { solderPasteMargin: "-0.025mm" } }}
					/>
				))}
			</schematicsheet>
		</board>
	);
}
