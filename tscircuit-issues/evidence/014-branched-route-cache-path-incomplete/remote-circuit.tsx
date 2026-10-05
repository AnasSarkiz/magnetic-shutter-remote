import { E73_2G4M08S1C } from "../imports/E73_2G4M08S1C";
import { BQ25185DLHR } from "../imports/BQ25185DLHR";
import { TMP390A2DRLR } from "../imports/TMP390A2DRLR";
import { TPS3839G33DBZR } from "../imports/TPS3839G33DBZR";
import { A_0603WAF1502T5E } from "../imports/A_0603WAF1502T5E";
import { A_0603WAF1303T5E } from "../imports/A_0603WAF1303T5E";
import { A_0603WAF1002T5E } from "../imports/A_0603WAF1002T5E";
import { A_0603WAF1621T5E } from "../imports/A_0603WAF1621T5E";
import { A_0603WAF1872T5E } from "../imports/A_0603WAF1872T5E";
import { CL21A106KAYNNNE } from "../imports/CL21A106KAYNNNE";
import { TCC0603COG470J500CT } from "../imports/TCC0603COG470J500CT";
import { TPS7A0230PDBVR } from "../imports/TPS7A0230PDBVR";
import { USB4105_GF_A_120 } from "../imports/USB4105_GF_A_120";
import { S2B_PH_SM4_TB_LF__SN_ } from "../imports/S2B_PH_SM4_TB_LF__SN_";
import { BM06B_SRSS_TB_LF__SN_ } from "../imports/BM06B_SRSS_TB_LF__SN_";
import { MSK12C02 } from "../imports/MSK12C02";
import { TS_1088_AR02016 } from "../imports/TS_1088_AR02016";
import { A_2N7002 } from "../imports/A_2N7002";
import { A_0603WAF5101T5E } from "../imports/A_0603WAF5101T5E";
import { A_0603WAF1001T5E } from "../imports/A_0603WAF1001T5E";
import { A_0603WAF1003T5E } from "../imports/A_0603WAF1003T5E";
import { CL10A475KO8NNNC } from "../imports/CL10A475KO8NNNC";
import { CC0603KRX7R9BB104 } from "../imports/CC0603KRX7R9BB104";
import { KT_0603R } from "../imports/KT_0603R";

// R2 routing follows the recorded pre-routing qualification gate.
export function RemoteCircuit() {
	return (
		<board
			title="Magnetic shutter remote R2 — prototype"
			width="32mm"
			height="56mm"
			thickness="1mm"
			layers={2}
			material="fr4"
			borderRadius="2mm"
			autorouter="default"
			minViaEdgeToPadEdgeClearance="0.10mm"
			minViaHoleDiameter="0.3mm"
			minViaPadDiameter="0.6mm"
			pcbStyle={{ viaHoleDiameter: "0.3mm", viaPadDiameter: "0.6mm" }}
			schAutoLayoutEnabled={false}
			schLayout={{ layoutMode: "relative" }}
			fabricatorPreset="jlcpcb_standard_20260912"
			defaultTraceWidth="0.25mm"
		>
			<net name="GND" isGroundNet />
			<net name="USB5V" isPowerNet />
			<net name="VBAT" isPowerNet />
			<net name="V3" isPowerNet />
			<schematicsheet
				name="Power"
				displayName="USB-C, charge and regulated power"
				sheetIndex={0}
				sheetSize="A4"
			>
				<USB4105_GF_A_120
					name="J1"
					noConnect={["pin10", "pin11", "pin12", "pin13", "pin14", "pin16"]}
					pcbX="0mm"
					pcbY="24mm"
					pcbRotation={180}
					schX={-8}
					schY={3}
					connections={{
						pin1: "net.GND",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
						pin5: "net.GND",
						pin6: "net.USB5V",
						pin7: "net.GND",
						pin8: "net.USB5V",
						pin9: "net.CC2",
						pin15: "net.CC1",
					}}
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
				<A_0603WAF5101T5E
					name="R2"
					schRotation={-90}
					pcbX="0mm"
					pcbY="19mm"
					schX={-4}
					schY={2}
					connections={{ pin1: "net.CC2", pin2: "net.GND" }}
				/>
				<BQ25185DLHR
					name="U2"
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
				<A_0603WAF1502T5E
					name="R3"
					schRotation={-90}
					pcbX="3mm"
					pcbY="8.6mm"
					schX={1}
					schY={1}
					connections={{ pin1: "net.PROG", pin2: "net.GND" }}
				/>
				<CL10A475KO8NNNC
					name="C1"
					schRotation={-90}
					pcbX="4mm"
					pcbY="20mm"
					schX={-2}
					schY={6}
					connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
				/>
				<CL10A475KO8NNNC
					name="C2"
					schRotation={-90}
					pcbX="4mm"
					pcbY="12mm"
					schX={4}
					schY={6}
					connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
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
				<S2B_PH_SM4_TB_LF__SN_
					name="J2"
					pcbX="-9mm"
					pcbY="12mm"
					schX={8}
					schY={4}
					connections={{
						pin1: "net.VBAT",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
					}}
				/>

				<A_0603WAF1303T5E
					name="R8"
					schRotation={-90}
					pcbRotation={180}
					pcbX="-3mm"
					pcbY="16mm"
					schX={5}
					schY={0}
					connections={{ pin1: "net.VSET", pin2: "net.GND" }}
				/>
				<A_0603WAF1002T5E
					name="R9"
					schRotation={-90}
					pcbX="1.8mm"
					pcbY="17mm"
					schX={5}
					schY={-3}
					connections={{ pin1: "net.TS_BIAS", pin2: "net.GND" }}
				/>
				<CL21A106KAYNNNE
					name="C8"
					schRotation={-90}
					layer="bottom"
					pcbX="3mm"
					pcbY="13mm"
					schX={-3}
					schY={-4}
					connections={{ pin1: "net.CHARGER_SYS", pin2: "net.GND" }}
				/>
				<TCC0603COG470J500CT
					name="C9"
					schRotation={-90}
					pcbX="0mm"
					pcbY="9mm"
					schX={1}
					schY={-3}
					connections={{ pin1: "net.PROG", pin2: "net.GND" }}
				/>
			</schematicsheet>
			<schematicsheet
				name="Radio"
				displayName="Bluetooth HID, user controls and SWD"
				sheetIndex={1}
				sheetSize="A4"
			>
				<E73_2G4M08S1C
					name="U1"
					pcbX="0mm"
					pcbY="-16mm"
					schX={0}
					schY={0}
					connections={{
						pin5: "net.GND",
						pin19: "net.V3",
						pin21: "net.GND",
						pin23: "net.V3",
						pin24: "net.GND",
						pin14: "net.SHUTTER",
						pin16: "net.PAIR",
						pin20: "net.STATUS_LED",
						pin26: "net.RESET_N",
						pin37: "net.SWDIO",
						pin39: "net.SWCLK",
					}}
				/>
				<CC0603KRX7R9BB104
					name="C5"
					schRotation={-90}
					pcbX="0mm"
					pcbY="-5mm"
					schX={-6}
					schY={5}
					connections={{ pin1: "net.V3", pin2: "net.GND" }}
				/>
				<TS_1088_AR02016
					name="SW2"
					schRotation={-90}
					pcbX="-11mm"
					pcbY="-7mm"
					schX={-7}
					schY={1}
					connections={{ pin1: "net.SHUTTER", pin2: "net.GND" }}
				/>
				<TS_1088_AR02016
					name="SW3"
					schRotation={-90}
					pcbX="11.5mm"
					pcbY="-4mm"
					schX={-7}
					schY={-2}
					connections={{ pin1: "net.PAIR", pin2: "net.GND" }}
				/>
				<A_0603WAF1001T5E
					name="R7"
					pcbX="6mm"
					pcbY="-1mm"
					schX={6}
					schY={2}
					connections={{ pin1: "net.STATUS_LED", pin2: "net.STATUS_LED_A" }}
				/>
				<KT_0603R
					name="LED2"
					schRotation={-90}
					pcbX="1mm"
					pcbY="0mm"
					schX={9}
					schY={2}
					connections={{ anode: "net.STATUS_LED_A", cathode: "net.GND" }}
				/>
				<BM06B_SRSS_TB_LF__SN_
					name="J3"
					pcbX="9mm"
					pcbY="16mm"
					schX={7}
					schY={-4}
					connections={{
						pin1: "net.V3",
						pin2: "net.SWDIO",
						pin3: "net.GND",
						pin4: "net.SWCLK",
						pin5: "net.RESET_N",
						pin6: "net.GND",
						pin7: "net.GND",
						pin8: "net.GND",
					}}
				/>
			</schematicsheet>

			<schematicsheet
				name="Protection"
				displayName="Battery cutoff and automatic charge temperature window"
				sheetIndex={2}
				sheetSize="A4"
			>
				<MSK12C02
					name="SW1"
					pcbX="10mm"
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
				<A_0603WAF1003T5E
					name="R5"
					pcbX="5mm"
					pcbY="7mm"
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
					pcbX="0mm"
					pcbY="4mm"
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
					schRotation={-90}
					pcbX="-4mm"
					pcbY="5mm"
					schX={-1}
					schY={-8}
					connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
				/>
				<TPS7A0230PDBVR
					name="U3"
					pinAttributes={{
						pin1: { requiresPower: true },
						IN: { requiresPower: true },
						pin2: { requiresGround: true },
						GND: { requiresGround: true },
						pin3: { isInput: true },
						EN: { isInput: true },
						pin4: { doNotConnect: true },
						NC: { doNotConnect: true },
						pin5: { providesPower: true },
						OUT: { providesPower: true },
					}}
					pcbX="-5mm"
					pcbY="0mm"
					schX={4}
					schY={-4}
					connections={{
						pin1: "net.VBAT",
						pin2: "net.GND",
						pin3: "net.REG_EN",
						pin5: "net.V3",
					}}
				/>
				<CL10A475KO8NNNC
					name="C3"
					schRotation={-90}
					pcbX="-9mm"
					pcbY="3mm"
					schX={4}
					schY={9}
					connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
				/>
				<CL10A475KO8NNNC
					name="C4"
					schRotation={-90}
					pcbX="-5mm"
					pcbY="-4mm"
					schX={6}
					schY={-8}
					connections={{ pin1: "net.V3", pin2: "net.GND" }}
				/>

				<TPS3839G33DBZR
					name="U4"
					pcbX="-9.5mm"
					pcbY="-1mm"
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
					pcbX="-13mm"
					pcbY="2mm"
					schX={2}
					schY={9}
					connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
				/>
				<TMP390A2DRLR
					name="U5"
					pcbX="0mm"
					pcbY="6mm"
					layer="bottom"
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
				<A_0603WAF1621T5E
					name="R10"
					schRotation={-90}
					pcbX="-3mm"
					pcbY="6mm"
					layer="bottom"
					schX={-4}
					schY={3}
					connections={{ pin1: "net.TEMP_SET_HOT", pin2: "net.GND" }}
				/>
				<A_0603WAF1872T5E
					name="R11"
					schRotation={-90}
					pcbX="3mm"
					pcbY="6mm"
					layer="bottom"
					schX={-4}
					schY={1}
					connections={{ pin1: "net.TEMP_SET_COLD", pin2: "net.GND" }}
				/>
				<CC0603KRX7R9BB104
					name="C7"
					schRotation={-90}
					pcbX="0mm"
					pcbY="9mm"
					layer="bottom"
					schX={0}
					schY={6}
					connections={{ pin1: "net.USB5V", pin2: "net.GND" }}
				/>
				<A_0603WAF1003T5E
					name="R12"
					schRotation={-90}
					layer="bottom"
					pcbX="4mm"
					pcbY="9mm"
					schX={4}
					schY={4}
					connections={{ pin1: "net.USB5V", pin2: "net.TEMP_OK" }}
				/>
				<A_0603WAF1003T5E
					name="R13"
					schRotation={-90}
					layer="bottom"
					pcbX="8mm"
					pcbY="11mm"
					schX={8}
					schY={4}
					connections={{ pin1: "net.USB5V", pin2: "net.CHARGE_DISABLE" }}
				/>
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
					layer="bottom"
					pcbX="7mm"
					pcbY="6mm"
					schX={8}
					schY={0}
					connections={{
						pin1: "net.TEMP_OK",
						pin2: "net.GND",
						pin3: "net.CHARGE_DISABLE",
					}}
				/>
			</schematicsheet>
			<hole name="W1" pcbX="-13mm" pcbY="-2mm" diameter="3mm" />
			<hole name="H1" pcbX="-13mm" pcbY="24mm" diameter="2.2mm" />
			<hole name="H2" pcbX="13mm" pcbY="24mm" diameter="2.2mm" />
			{/* The antenna's own body occupies this region; its copper pads do not.
          Every other placement and all board copper remain prohibited. */}
			<keepout
				shape="rect"
				pcbX="0mm"
				pcbY="-25.45mm"
				width="32mm"
				height="5.1mm"
				layers={["top", "bottom"]}
				excludeRefs={[".U1"]}
			/>
		</board>
	);
}
