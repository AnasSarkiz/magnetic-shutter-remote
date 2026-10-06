import { r8ColdGroundPaths } from "./r8-cold-ground-paths";
import { r8RadioGroundPaths } from "./r8-radio-ground-paths";
import { r8SysReturnPaths } from "./r8-sys-return-paths";
import { r8SupervisorGroundPaths } from "./r8-supervisor-ground-paths";
import { r8ResetPaths } from "./r8-reset-paths";
import { r8RegEnablePaths } from "./r8-reg-enable-paths";
import { r8ChargeDisablePaths } from "./r8-charge-disable-paths";
import { r8TemperatureHotPaths } from "./r8-temperature-hot-paths";
import { r8SupervisorVbatPaths } from "./r8-supervisor-vbat-paths";
import { r8RadioCapPaths } from "./r8-radio-cap-paths";
import { r8ChargeStatPaths } from "./r8-charge-stat-paths";
import { r8ConnectorPaths } from "./r8-connector-paths";
import { r8BootPaths } from "./r8-boot-paths";
import { r8VsetPaths, r8VsetGroundPaths } from "./r8-vset-paths";
import { r8UartRxPaths } from "./r8-uart-rx-paths";
import { r8UsbDisablePaths } from "./r8-usb-disable-paths";
import { r8BatteryOkPaths } from "./r8-battery-ok-paths";
import { r8CcPaths } from "./r8-cc-paths";
import { r8BulkCapPaths } from "./r8-bulk-cap-paths";
import { r8MosfetPaths } from "./r8-mosfet-paths";
import { r8ProgRoutingPaths } from "./r8-prog-routing-paths";
import { r8ProgPaths } from "./r8-prog-paths";
import { r8SysPaths } from "./r8-sys-paths";
import { r8TsBiasPaths } from "./r8-ts-bias-paths";
import { r8PowerPaths } from "./r8-power-paths";
import { SWPA3015S1R5NT } from "../imports/SWPA3015S1R5NT/SWPA3015S1R5NT";
import { FunctionalMarkings } from "./functional-markings";
import { sensorEscapePaths } from "./sensor-escape-paths";
import { r8BatteryCapEscapePaths } from "./r8-battery-cap-paths";
import { sensorCapEscapePaths } from "./c7-escape-paths";
import { usbEscapePaths } from "./usb-escape-paths";
import { temperatureEscapePaths } from "./temperature-escape-paths";
import { chargerEscapePaths } from "./charger-escape-paths";
import { ESPC3_12_N4 } from "../imports/ESPC3_12_N4/ESPC3_12_N4";
import { BQ25185DLHR } from "../imports/BQ25185DLHR";
import { TMP390A2DRLR } from "../imports/TMP390A2DRLR";
import { TPS3839G33DBZR } from "../imports/TPS3839G33DBZR";
import { A_0603WAF1303T5E } from "../imports/A_0603WAF1303T5E";
import { A_0603WAF1002T5E } from "../imports/A_0603WAF1002T5E";
import { A_0603WAF1621T5E } from "../imports/A_0603WAF1621T5E";
import { A_0603WAF1872T5E } from "../imports/A_0603WAF1872T5E";
import { CL21A106KAYNNNE } from "../imports/CL21A106KAYNNNE";
import { TCC0603COG470J500CT } from "../imports/TCC0603COG470J500CT";
import { TPS63031DSKR } from "../imports/TPS63031DSKR/TPS63031DSKR";
import { USB4215_03_A } from "../imports/USB4215_03_A";
import { SM02B_SRSS_TB_LF__SN_ } from "../imports/SM02B_SRSS_TB_LF__SN_/SM02B_SRSS_TB_LF__SN_";
import { BM03B_SRSS_TB_LF__SN_ } from "../imports/BM03B_SRSS_TB_LF__SN_/BM03B_SRSS_TB_LF__SN_";
import { MSK12C02 } from "../imports/MSK12C02";
import { TS_1088_AR02016 } from "../imports/TS_1088_AR02016";
import { TS24CA } from "../imports/TS24CA/TS24CA";
import { A_2N7002 } from "../imports/A_2N7002";
import { A_0603WAF5101T5E } from "../imports/A_0603WAF5101T5E";
import { A_0603WAF1001T5E } from "../imports/A_0603WAF1001T5E";
import { A_0603WAF1003T5E } from "../imports/A_0603WAF1003T5E";
import { CL10A475KO8NNNC } from "../imports/CL10A475KO8NNNC";
import { CC0603KRX7R9BB104 } from "../imports/CC0603KRX7R9BB104";
import { KT_0603R } from "../imports/KT_0603R";

// R8 ESP32-C3 engineering prototype; frozen Nordic revisions are in baselines/.
export function RemoteCircuit({ routingEnabled }: { routingEnabled: boolean }) {
	return (
		<board
			title="Magnetic shutter remote R8 ESP32-C3 — engineering prototype"
			width="44mm"
			height="56mm"
			thickness="1mm"
			layers={2}
			material="fr4"
			borderRadius="2mm"
			autorouter={{
				local: true,
				traceClearance: "0.30mm",
				allowViaInPad: false,
			}}
			routingDisabled={!routingEnabled}
			autorouterVersion="beta_pipeline9"
			autorouterEffortLevel="5x"
			minTraceWidth="0.15mm"
			minTraceToPadEdgeClearance="0.15mm"
			minViaEdgeToPadEdgeClearance="0.35mm"
			minPadEdgeToPadEdgeClearance="0.15mm"
			minTraceToHoleEdgeClearance="0.30mm"
			minViaHoleEdgeToViaHoleEdgeClearance="0.50mm"
			minPlatedHoleDrillEdgeToDrillEdgeClearance="0.55mm"
			minViaHoleDiameter="0.3mm"
			minViaPadDiameter="0.6mm"
			pcbStyle={{ viaHoleDiameter: "0.3mm", viaPadDiameter: "0.6mm" }}
			schAutoLayoutEnabled={false}
			schLayout={{ layoutMode: "relative" }}
			fabricatorPreset="jlcpcb_standard_20260912"
			pcbSx={{
				"& footprint silkscreentext": { visibility: "hidden" },
				"& footprint silkscreenpath": { visibility: "hidden" },
				"& footprint silkscreencircle": { visibility: "hidden" },
			}}
			defaultTraceWidth="0.15mm"
		>
			<FunctionalMarkings />
			<net name="GND" isGroundNet />
			<net name="USB5V" isPowerNet nominalTraceWidth="0.3mm" />
			<net name="VBAT" isPowerNet nominalTraceWidth="0.3mm" />
			<net name="V3" isPowerNet nominalTraceWidth="0.25mm" />
			<net name="INDUCTOR_L1" nominalTraceWidth="0.5mm" />
			<net name="INDUCTOR_L2" nominalTraceWidth="0.5mm" />
			<net name="CC2" />
			<net name="CC1" />
			<net name="CHARGER_SYS" routingPhaseIndex={0} />
			<net name="CHARGE_STAT" routingPhaseIndex={1} />
			<net name="BATTERY_OK" routingPhaseIndex={2} />
			<net name="UART_RX" routingPhaseIndex={2} />
			<net name="VSET" routingPhaseIndex={2} />
			<net name="BOOT" routingPhaseIndex={2} />
			<net name="TEMP_SET_HOT" routingPhaseIndex={2} />
			<net name="CHARGE_DISABLE" routingPhaseIndex={2} />
			{routingEnabled && (
				<autoroutingphase
					phaseIndex={2}
					connections={[
						".U4 > port.pin2",
						".U1 > port.pin21",
						".R8 > port.pin1",
						".SW4 > port.pin1",
						".U1 > port.pin18",
						".R10 > port.pin1",
						".R13 > port.pin2",
						".Q2 port.pin3",
					]}
					pcbTracePaths={[
						...r8BatteryOkPaths,
						...r8UartRxPaths,
						...r8VsetPaths,
						...r8BootPaths,
						...r8TemperatureHotPaths,
						...r8ChargeDisablePaths,
					]}
				/>
			)}
			{routingEnabled && (
				<autoroutingphase
					phaseIndex={0}
					connections={[".C8 > port.pin1"]}
					pcbTracePaths={r8SysPaths}
				/>
			)}
			{routingEnabled && (
				<autoroutingphase
					phaseIndex={1}
					connections={[".LED1 > port.pin2"]}
					pcbTracePaths={r8ChargeStatPaths}
				/>
			)}
			{/* Solid connections, not thermal spokes. All outlines stop north of
			    the documented all-layer antenna exclusion at Y=-19.3 mm. */}
			<copperpour
				name="GND_TOP"
				connectsTo="net.GND"
				layer="top"
				clearance="0.3mm"
				boardEdgeMargin="0.3mm"
				outline={[
					{ x: -21, y: -19.0 },
					{ x: 21, y: -19.0 },
					{ x: 21, y: 27 },
					{ x: -21, y: 27 },
				]}
			/>
			<copperpour
				name="GND_BOTTOM"
				connectsTo="net.GND"
				layer="bottom"
				clearance="0.3mm"
				boardEdgeMargin="0.3mm"
				outline={[
					{ x: -21, y: -19.0 },
					{ x: 21, y: -19.0 },
					{ x: 21, y: 27 },
					{ x: -21, y: 27 },
				]}
			/>
			{/* Intentional same-net overlap reserves solid TOP copper at the exposed
			    thermal land; all three native GND planes remain fitted. */}
			<copperpour
				name="CHARGER_GND_PLANE"
				unbroken={false}
				boardEdgeMargin="0mm"
				connectsTo="net.GND"
				layer="top"
				clearance="0.3mm"
				outline={[
					{ x: -0.77, y: 12.53 },
					{ x: 0.77, y: 12.53 },
					{ x: 0.77, y: 13.47 },
					{ x: -0.77, y: 13.47 },
				]}
			/>
			<copperpour
				name="REGULATOR_GND_PLANE"
				connectsTo="net.GND"
				layer="top"
				clearance="0.2mm"
				boardEdgeMargin="0mm"
				unbroken={false}
				outline={[
					{ x: -11.49, y: 2.86 },
					{ x: -10.6, y: 2.86 },
					{ x: -10.6, y: 2 },
					{ x: -9.4, y: 2 },
					{ x: -9.4, y: 3.36 },
					{ x: -8.51, y: 3.36 },
					{ x: -8.51, y: 3.64 },
					{ x: -9.4, y: 3.64 },
					{ x: -9.4, y: 4 },
					{ x: -10.6, y: 4 },
					{ x: -10.6, y: 3.14 },
					{ x: -11.49, y: 3.14 },
				]}
			/>
			<schematicsheet
				name="Power"
				displayName="USB-C, charge and regulated power"
				sheetIndex={0}
				sheetSize="A4"
			>
				<fanout
					name="USB_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled ? [...usbEscapePaths, ...r8CcPaths] : []
					}
				>
					<USB4215_03_A
						name="J1"
						pcbSx={{ "& smtpad": { solderMaskMargin: "0.04mm" } }}
						noConnect={["pin19", "pin21", "pin22", "pin23", "pin24", "pin25"]}
						pcbX="0mm"
						pcbY="23.9852mm"
						pcbRotation={180}
						schX={-8}
						schY={3}
						connections={{
							pin13: "net.GND",
							pin14: "net.GND",
							pin15: "net.GND",
							pin16: "net.GND",
							pin17: "net.GND",
							pin18: "net.USB5V",
							pin20: "net.CC1",
							pin26: "net.CC2",
							pin27: "net.USB5V",
							pin28: "net.GND",
						}}
					/>
					<A_0603WAF5101T5E
						name="R2"
						schRotation={-90}
						pcbX="0mm"
						pcbY="19mm"
						schX={-4}
						schY={2}
						connections={{ pin1: "net.CC2", pin2: "net.GND" }}
					/>
					<A_0603WAF5101T5E
						name="R1"
						schRotation={-90}
						pcbX="-4mm"
						pcbY="19mm"
						schX={-4}
						schY={4}
						connections={{ pin1: "net.CC1", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="CHARGER_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled
							? [
									...chargerEscapePaths,
									...r8ProgPaths,
									...r8ProgRoutingPaths,
									...r8BatteryCapEscapePaths,
								]
							: []
					}
				>
					<BQ25185DLHR
						name="U2"
						pcbSx={{
							"& smtpad": { solderPasteMargin: 0 },
							"& footprint smtpad[portHints='pin11']": {
								solderPasteMargin: "-0.1mm",
							},
						}}
						pinAttributes={{
							pin1: { isOutput: true },
							SYS: { isOutput: true },
							pin2: { isBidirectional: true },
							BAT: { isBidirectional: true },
							pin3: { isOutput: true },
							STAT2: { isOutput: true },
							pin4: { isInput: true },
							N_CE: { isInput: true },
							pin5: { requiresGround: true },
							GND: { requiresGround: true },
							pin6: { isInput: true },
							TS: { isInput: true },
							MR: { isInput: true },
							pin7: { isInput: true },
							ILIM: { isInput: true },
							VSET: { isInput: true },
							pin8: { isInput: true },
							ISET: { isInput: true },
							pin9: { isOutput: true },
							STAT1: { isOutput: true },
							pin10: { requiresPower: true },
							IN: { requiresPower: true },
							pin11: { requiresGround: true },
							EP: { requiresGround: true },
						}}
						pcbX="0mm"
						pcbY="13mm"
						schX={1}
						schY={4}
						connections={{
							pin1: "net.CHARGER_SYS",
							pin2: "net.VBAT",
							pin3: "net.CHARGE_STAT",
							pin4: "net.CHARGE_DISABLE",
							pin5: "net.GND",
							pin6: "net.TS_BIAS",
							pin7: "net.VSET",
							pin8: "net.PROG",
							pin10: "net.USB5V",
							pin11: "net.GND",
						}}
					/>

					<A_0603WAF1001T5E
						name="R3"
						schRotation={-90}
						pcbX="5.5mm"
						pcbY="9mm"
						schX={1}
						schY={1}
						connections={{ pin1: "net.PROG", pin2: "net.GND" }}
					/>

					<CL10A475KO8NNNC
						name="C2"
						schRotation={-90}
						pcbX="4.5mm"
						pcbY="11.5mm"
						schX={4}
						schY={6}
						connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
					/>
				</fanout>
				<CL10A475KO8NNNC
					name="C1"
					schRotation={-90}
					pcbX="8mm"
					pcbY="20mm"
					schX={-2}
					schY={6}
					connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
				/>
				<A_0603WAF1001T5E
					name="R4"
					schRotation={-90}
					pcbX="8mm"
					pcbY="23mm"
					schX={-2}
					schY={-1}
					connections={{ pin1: "net.VBAT", pin2: "net.CHARGE_LED_A" }}
				/>
				<KT_0603R
					name="LED1"
					pcbX="8mm"
					pcbY="26mm"
					schX={1}
					schY={-1}
					connections={{
						anode: "net.CHARGE_LED_A",
						cathode: "net.CHARGE_STAT",
					}}
				/>
				<SM02B_SRSS_TB_LF__SN_
					name="J2"
					schPinArrangement={{ leftSide: ["pin2"], rightSide: ["pin1", "pin4", "pin3"] }}
					pcbRotation={270}
					pcbX="-18mm"
					pcbY="13mm"
					schX={8}
					schY={4}
					connections={{
						pin1: "net.GND",
						pin2: "net.VBAT",
						pin3: "net.GND",
						pin4: "net.GND",
					}}
				/>

				<fanout
					name="VSET_GROUND_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8VsetGroundPaths : []}
				>
					<A_0603WAF1303T5E
						name="R8"
						schRotation={-90}
						pcbRotation={180}
						pcbX="-5mm"
						pcbY="16mm"
						schX={5}
						schY={0}
						connections={{ pin1: "net.VSET", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="TS_BIAS_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8TsBiasPaths : []}
				>
					<A_0603WAF1002T5E
						name="R9"
						schRotation={-90}
						pcbX="1mm"
						pcbY="17mm"
						schX={5}
						schY={-3}
						connections={{ pin1: "net.TS_BIAS", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="SYS_RETURN_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8SysReturnPaths : []}
				>
					<CL21A106KAYNNNE
						name="C8"
						pcbRotation={180}
						schRotation={-90}
						layer="top"
						pcbX="-5.5mm"
						pcbY="13.4mm"
						schX={-3}
						schY={-4}
						connections={{ pin1: "net.CHARGER_SYS", pin2: "net.GND" }}
					/>
				</fanout>
				<TCC0603COG470J500CT
					name="C9"
					schRotation={-90}
					pcbRotation={180}
					pcbX="-5mm"
					pcbY="11mm"
					schX={1}
					schY={-3}
					connections={{ pin1: "net.PROG", pin2: "net.GND" }}
				/>
			</schematicsheet>
			<schematicsheet
				name="Radio"
				displayName="Bluetooth HID, controls and 3.3 V UART programming"
				sheetIndex={1}
				sheetSize="A4"
			>
				<fanout
					name="RADIO_GROUND_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8RadioGroundPaths : []}
				>
					<ESPC3_12_N4
						name="U1"
						pcbX="0mm"
						pcbY="-10.5mm"
						pcbRotation={180}
						schX={0}
						schY={0}
						noConnect={[
							"pin1",
							"pin2",
							"pin4",
							"pin5",
							"pin9",
							"pin10",
							"pin11",
							"pin13",
							"pin14",
							"pin16",
							"pin17",
							"pin19",
							"pin20",
						]}
						connections={{
							pin3: "net.EN",
							pin6: "net.SHUTTER",
							pin7: "net.PAIR",
							pin8: "net.V3",
							pin15: "net.GND",
							pin12: "net.STATUS_LED",
							pin18: "net.BOOT",
							pin21: "net.UART_RX",
							pin22: "net.UART_TX",
						}}
					/>
				</fanout>
				<fanout
					name="RADIO_CAP_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled ? [...r8RadioCapPaths, ...r8BulkCapPaths] : []
					}
				>
					<CC0603KRX7R9BB104
						name="C5"
						schRotation={-90}
						pcbX="11mm"
						pcbY="-8mm"
						schX={-6}
						schY={5}
						connections={{ pin1: "net.V3", pin2: "net.GND" }}
					/>

					<CL21A106KAYNNNE
						name="C10"
						pcbX="12mm"
						pcbY="-4.5mm"
						pcbRotation={90}
						schX={-6}
						schY={7}
						schRotation={-90}
						connections={{ pin1: "net.V3", pin2: "net.GND" }}
					/>
				</fanout>
				{/* Side-push shutter at the right edge(+X).
				    Contacts1/2 switch;3/4 are the separate internally connected frame. */}
				<TS24CA
					name="SW2"
					schRotation={-90}
					pcbX="20mm"
					pcbY="-8.5mm"
					pcbRotation={270}
					// Plastic actuator overhangs+X; every copper land stays on board.
					allowOffBoard
					schX={-7}
					schY={1}
					internallyConnectedPins={[[3, 4]]}
					connections={{
						pin1: "net.SHUTTER",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
					}}
				/>
				<TS_1088_AR02016
					name="SW3"
					schRotation={-90}
					pcbX="18mm"
					pcbY="-3mm"
					schX={-7}
					schY={-2}
					connections={{ pin1: "net.PAIR", pin2: "net.GND" }}
				/>
				<A_0603WAF1001T5E
					name="R7"
					pcbRotation={180}
					pcbX="-15mm"
					pcbY="-5mm"
					schX={6}
					schY={2}
					connections={{ pin1: "net.STATUS_LED", pin2: "net.STATUS_LED_A" }}
				/>
				<KT_0603R
					name="LED2"
					schRotation={-90}
					pcbX="-19mm"
					pcbY="-5mm"
					schX={9}
					schY={2}
					connections={{ anode: "net.STATUS_LED_A", cathode: "net.GND" }}
				/>
				<fanout
					name="UART_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8ConnectorPaths : []}
				>
					<BM03B_SRSS_TB_LF__SN_
						name="J3"
						pcbX="13.2mm"
						pcbY="16mm"
						schX={7}
						schY={-4}
						connections={{
							pin1: "net.UART_RX",
							pin2: "net.GND",
							pin3: "net.UART_TX",
							pin4: "net.GND",
							pin5: "net.GND",
						}}
					/>
				</fanout>
				<TS_1088_AR02016
					name="SW4"
					pcbX="-19mm"
					pcbY="-9mm"
					schX={-7}
					schY={-5}
					schRotation={-90}
					connections={{ pin1: "net.BOOT", pin2: "net.GND" }}
				/>
				<fanout
					name="RESET_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8ResetPaths : []}
				>
					<TS_1088_AR02016
						name="SW5"
						pcbX="14.5mm"
						pcbY="11.5mm"
						schX={-7}
						schY={-8}
						schRotation={-90}
						connections={{ pin1: "net.EN", pin2: "net.GND" }}
					/>
				</fanout>
			</schematicsheet>

			<schematicsheet
				name="Protection"
				displayName="Battery cutoff and automatic charge temperature window"
				sheetIndex={2}
				sheetSize="A4"
			>
				<MSK12C02
					name="SW1"
					pcbX="19mm"
					pcbY="5mm"
					pcbRotation={90}
					schX={-7}
					schY={-5}
					connections={{
						pin1: "net.BATTERY_OK",
						pin2: "net.POWER_SWITCH",
						pin3: "net.GND",
						pin4: "net.GND",
					}}
				/>
				<fanout
					name="USB_DISABLE_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled ? [...r8UsbDisablePaths, ...r8RegEnablePaths] : []
					}
				>
					<A_0603WAF1003T5E
						name="R5"
						pcbX="4mm"
						pcbY="3mm"
						pcbRotation={180}
						schX={-4}
						schY={-5}
						connections={{ pin1: "net.POWER_SWITCH", pin2: "net.REG_EN" }}
					/>
					<A_2N7002
						name="Q1"
						pinAttributes={{
							pin1: { isInput: true },
							G: { isInput: true },
							pin2: { requiresGround: true },
							S: { requiresGround: true },
							pin3: { isOutput: true },
							D: { isOutput: true },
						}}
						pcbX="-4mm"
						pcbY="1mm"
						schX={-1}
						schY={-5}
						connections={{
							pin1: "net.USB5V",
							pin2: "net.GND",
							pin3: "net.REG_EN",
						}}
					/>
					<A_0603WAF1003T5E
						name="R6"
						pcbRotation={180}
						schRotation={-90}
						pcbX="0mm"
						pcbY="1.5mm"
						schX={-1}
						schY={-8}
						connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="R8_POWER_LOOPS"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8PowerPaths : []}
				>
					<TPS63031DSKR
						name="U3"
						pcbX="-10mm"
						pcbY="3mm"
						schX={4}
						schY={-4}
						pcbSx={{
							"& footprint smtpad[portHints='pin11']": {
								solderPasteMargin: "-0.0625mm",
							},
						}}
						connections={{
							pin1: "net.V3",
							pin2: "net.INDUCTOR_L2",
							pin3: "net.GND",
							pin4: "net.INDUCTOR_L1",
							pin5: "net.VBAT",
							pin6: "net.REG_EN",
							pin7: "net.GND",
							pin8: "net.VBAT",
							pin9: "net.GND",
							pin10: "net.V3",
							pin11: "net.GND",
						}}
					/>
					<SWPA3015S1R5NT
						name="L1"
						pcbX="-14mm"
						pcbY="3mm"
						pcbRotation={90}
						schX={8}
						schY={-4}
						connections={{ pin1: "net.INDUCTOR_L2", pin2: "net.INDUCTOR_L1" }}
					/>
					<CL21A106KAYNNNE
						name="C11"
						pcbRotation={180}
						pcbX="-14mm"
						pcbY="-1mm"
						schX={7}
						schY={9}
						schRotation={-90}
						connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
					/>
					<CL21A106KAYNNNE
						name="C12"
						pcbX="-10mm"
						pcbY="8.5mm"
						schX={9}
						schY={-8}
						schRotation={-90}
						connections={{ pin1: "net.V3", pin2: "net.GND" }}
					/>
					<CC0603KRX7R9BB104
						name="C13"
						pcbX="-7mm"
						pcbY="3mm"
						pcbRotation={90}
						schX={8.8}
						schY={9}
						schRotation={-90}
						connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
					/>
					<CL21A106KAYNNNE
						name="C3"
						schRotation={-90}
						pcbX="-10mm"
						pcbY="0mm"
						schX={4}
						schY={9}
						connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
					/>
					<CL21A106KAYNNNE
						name="C4"
						schRotation={-90}
						pcbX="-10mm"
						pcbY="6mm"
						schX={6}
						schY={-8}
						connections={{ pin1: "net.V3", pin2: "net.GND" }}
					/>
				</fanout>

				<fanout
					name="SUPERVISOR_VBAT_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled
							? [...r8SupervisorVbatPaths, ...r8SupervisorGroundPaths]
							: []
					}
				>
					<TPS3839G33DBZR
						name="U4"
						pcbX="-18mm"
						pcbY="0mm"
						schX={-7}
						schY={7}
						connections={{
							pin1: "net.GND",
							pin2: "net.BATTERY_OK",
							pin3: "net.VBAT",
						}}
					/>
					<CC0603KRX7R9BB104
						name="C6"
						schRotation={-90}
						pcbX="-18mm"
						pcbY="3mm"
						schX={2}
						schY={9}
						connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
					/>
				</fanout>

				<fanout
					name="SENSOR_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={
						routingEnabled
							? [...sensorEscapePaths, ...sensorCapEscapePaths]
							: []
					}
				>
					<TMP390A2DRLR
						name="U5"
						pcbX="0mm"
						pcbY="6mm"
						layer="top"
						schX={0}
						schY={2}
						connections={{
							pin1: "net.TEMP_SET_HOT",
							pin2: "net.TEMP_SET_COLD",
							pin3: "net.GND",
							pin4: "net.TEMP_OK",
							pin5: "net.USB5V",
							pin6: "net.TEMP_OK",
						}}
					/>
					<CC0603KRX7R9BB104
						name="C7"
						schRotation={-90}
						pcbX="1.5mm"
						pcbY="8.5mm"
						layer="top"
						schX={0}
						schY={6}
						connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="HOT_SET_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? temperatureEscapePaths : []}
				>
					<A_0603WAF1621T5E
						name="R10"
						pcbRotation={180}
						schRotation={-90}
						pcbX="-4.5mm"
						pcbY="6mm"
						layer="top"
						schX={-4}
						schY={3}
						connections={{ pin1: "net.TEMP_SET_HOT", pin2: "net.GND" }}
					/>
				</fanout>
				<fanout
					name="COLD_GROUND_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8ColdGroundPaths : []}
				>
					<A_0603WAF1872T5E
						name="R11"
						schRotation={-90}
						pcbX="4.5mm"
						pcbY="5.5mm"
						layer="top"
						schX={-4}
						schY={1}
						connections={{ pin1: "net.TEMP_SET_COLD", pin2: "net.GND" }}
					/>
				</fanout>
				<A_0603WAF1003T5E
					name="R12"
					schRotation={-90}
					layer="top"
					pcbX="9.5mm"
					pcbY="10mm"
					schX={4}
					schY={4}
					connections={{ pin1: "net.USB5V", pin2: "net.TEMP_OK" }}
				/>
				<A_0603WAF1003T5E
					name="R13"
					schRotation={-90}
					layer="top"
					pcbRotation={180}
					pcbX="8mm"
					pcbY="12mm"
					schX={8}
					schY={4}
					connections={{ pin1: "net.USB5V", pin2: "net.CHARGE_DISABLE" }}
				/>
				<fanout
					name="TEMP_MOSFET_ESCAPE"
					pcbX={0}
					pcbY={0}
					pcbTracePaths={routingEnabled ? r8MosfetPaths : []}
				>
					<A_2N7002
						name="Q2"
						pinAttributes={{
							pin1: { isInput: true },
							G: { isInput: true },
							pin2: { requiresGround: true },
							S: { requiresGround: true },
							pin3: { isOutput: true },
							D: { isOutput: true },
						}}
						layer="top"
						pcbX="8mm"
						pcbY="6mm"
						schX={8}
						schY={0}
						connections={{
							pin1: "net.TEMP_OK",
							pin2: "net.GND",
							pin3: "net.CHARGE_DISABLE",
						}}
					/>
				</fanout>
			</schematicsheet>
			<hole name="H1" pcbX="-19mm" pcbY="25mm" diameter="2.2mm" />
			<hole name="H2" pcbX="19mm" pcbY="25mm" diameter="2.2mm" />
			<hole name="H3" pcbX="-19mm" pcbY="-14mm" diameter="2.2mm" />
			<hole name="H4" pcbX="19mm" pcbY="-14mm" diameter="2.2mm" />
			<keepout
				shape="rect"
				pcbX="19.75616435mm"
				pcbY="3.50013mm"
				width="2mm"
				height="2mm"
				layers={["top", "bottom"]}
				excludeRefs={[".SW1"]}
			/>
			<keepout
				shape="rect"
				pcbX="19.75616435mm"
				pcbY="6.500124mm"
				width="2mm"
				height="2mm"
				layers={["top", "bottom"]}
				excludeRefs={[".SW1"]}
			/>
			{/* Conservative mounting copper exclusions supplement the NPTH clearance rule. */}
			<keepout
				shape="rect"
				pcbX="-19mm"
				pcbY="25mm"
				width="3.6mm"
				height="3.6mm"
				layers={["top", "bottom"]}
			/>
			<keepout
				shape="rect"
				pcbX="19mm"
				pcbY="25mm"
				width="3.6mm"
				height="3.6mm"
				layers={["top", "bottom"]}
			/>
			<keepout
				shape="rect"
				pcbX="-19mm"
				pcbY="-14mm"
				width="3.6mm"
				height="3.6mm"
				layers={["top", "bottom"]}
			/>
			<keepout
				shape="rect"
				pcbX="19mm"
				pcbY="-14mm"
				width="3.6mm"
				height="3.6mm"
				layers={["top", "bottom"]}
			/>
			{/* The antenna's own body occupies this region; its copper pads do not.
          Every other placement and all board copper remain prohibited. */}
			<keepout
				shape="rect"
				pcbX="0mm"
				pcbY="-23.65mm"
				width="44mm"
				height="8.7mm"
				layers={["top", "bottom"]}
				excludeRefs={[".U1"]}
			/>
		</board>
	);
}
