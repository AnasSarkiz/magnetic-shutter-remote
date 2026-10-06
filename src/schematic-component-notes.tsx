import { Fragment } from "react";

// Native annotations only; electronic parts remain qualified JLCPCB imports.
// Each row: reference, role, and two short lines explaining its purpose.
export const componentNotesBySheet = {
	Power: [
		[
			"J1",
			"USB-C charge input",
			"Accepts 5 V for charging only.",
			"USB present holds the radio power off.",
		],
		[
			"R1",
			"5.1k CC1 pull-down",
			"Identifies a USB-C power sink on CC1.",
			"Allows either cable orientation with R2.",
		],
		[
			"R2",
			"5.1k CC2 pull-down",
			"Identifies a USB-C power sink on CC2.",
			"Allows either cable orientation with R1.",
		],
		[
			"U2",
			"BQ25185 Li-ion charger",
			"Charges the cell at nominal 300 mA.",
			"Manages USB input and the SYS power path.",
		],
		[
			"R3",
			"1k charge-current setting",
			"Programs U2 ISET for nominal 300 mA.",
			"Actual current has component tolerance.",
		],
		[
			"C1",
			"4.7uF USB input bypass",
			"Filters USB5V at the charger input.",
			"Supplies brief input-current changes.",
		],
		[
			"C2",
			"4.7uF battery bypass",
			"Filters VBAT at the charger BAT pin.",
			"Supports stable battery charging.",
		],
		[
			"J2",
			"Protected battery connection",
			"Pin 1 is GND; pin 2 is battery positive.",
			"Use the qualified protected-cell pack.",
		],
		[
			"R4",
			"1k charge-LED resistor",
			"Limits current through red LED1.",
			"Connects VBAT to the LED anode path.",
		],
		[
			"LED1",
			"Charge-status indicator",
			"Lights when U2 pulls CHARGE_STAT low.",
			"Indicates charger status, not BLE status.",
		],
		[
			"R8",
			"130k charger VSET setting",
			"Selects the nominal 4.1 V charge target.",
			"Sets U2's combined VSET / ILIM mode.",
		],
		[
			"R9",
			"10k charger TS bias",
			"Provides the fixed bias on U2 TS input.",
			"U5 supplies the separate temperature gate.",
		],
		[
			"C8",
			"10uF SYS output bypass",
			"Decouples the charger's SYS output.",
			"The radio regulator uses VBAT, not SYS.",
		],
		[
			"C9",
			"47pF ISET-node filter",
			"Filters noise at the PROG / ISET node.",
			"Works with charge-setting resistor R3.",
		],
	],
	Radio: [
		[
			"U1",
			"DOIT ESP32-C3 BLE module",
			"Runs the Bluetooth HID shutter firmware.",
			"Includes flash, crystal and RF antenna.",
		],
		[
			"C5",
			"100nF radio bypass",
			"Shunts fast 3.3 V supply noise to GND.",
			"Local bypass for the radio module.",
		],
		[
			"C10",
			"10uF radio bulk bypass",
			"Supports radio supply-current bursts.",
			"Complements high-frequency capacitor C5.",
		],
		[
			"SW2",
			"Side-actuated shutter button",
			"Press grounds SHUTTER on GPIO4.",
			"Firmware sends a BLE Volume-Up keypress.",
		],
		[
			"SW3",
			"Pairing button",
			"Press grounds PAIR on GPIO5.",
			"Hold for 3 seconds to request pairing.",
		],
		[
			"R7",
			"1k status-LED resistor",
			"Limits current from GPIO6 into LED2.",
			"Protects the LED and GPIO output.",
		],
		[
			"LED2",
			"BLE status indicator",
			"Firmware controls this red LED via GPIO6.",
			"Shows pairing / connection activity.",
		],
		[
			"J3",
			"Three-pin JST UART",
			"1: RX GPIO20; 2: GND; 3: TX GPIO21.",
			"3.3 V signals; no target-power pin.",
		],
		[
			"SW4",
			"Manual BOOT button",
			"Grounds GPIO9 for ROM download mode.",
			"Hold BOOT while pressing / releasing RESET.",
		],
		[
			"SW5",
			"Manual RESET button",
			"Grounds module EN to reset the ESP32-C3.",
			"Release after selecting normal / BOOT mode.",
		],
	],
	Protection: [
		[
			"SW1",
			"Radio ON / OFF slide switch",
			"ON feeds BATTERY_OK through R5 to enable.",
			"OFF grounds that path; charging still works.",
		],
		[
			"R5",
			"100k enable-feed resistor",
			"Feeds REG_EN from the power-switch output.",
			"Lets Q1 override enable when USB is present.",
		],
		[
			"Q1",
			"USB-present radio disable",
			"USB5V turns this 2N7002 MOSFET on.",
			"Pulls REG_EN low, disabling radio power.",
		],
		[
			"R6",
			"100k USB / gate pull-down",
			"Bleeds USB5V when the cable is removed.",
			"Keeps Q1 gate low without USB input.",
		],
		[
			"U3",
			"TPS63031 buck-boost regulator",
			"Regulates the battery to fixed 3.3 V.",
			"Runs only when REG_EN permits radio power.",
		],
		[
			"L1",
			"1.5uH switching inductor",
			"Transfers energy between U3 switch nodes.",
			"Rating includes +/-30% inductance tolerance.",
		],
		[
			"C3",
			"10uF regulator input bypass",
			"Supplies switching current on VBAT.",
			"Works with input bulk capacitor C11.",
		],
		[
			"C11",
			"10uF regulator input bulk",
			"Adds battery-side energy storage for U3.",
			"Complements C3 at the power input.",
		],
		[
			"C13",
			"100nF regulator input bypass",
			"Filters fast noise at U3's VBAT input.",
			"Complements the larger input capacitors.",
		],
		[
			"C4",
			"10uF regulator output bypass",
			"Smooths the regulated 3.3 V supply.",
			"Works with output capacitor C12.",
		],
		[
			"C12",
			"10uF regulator output bulk",
			"Adds output storage for load transients.",
			"Complements C4 on the 3.3 V rail.",
		],
		[
			"U4",
			"TPS3839 low-battery supervisor",
			"Monitors VBAT; nominal threshold 3.08 V.",
			"Drives BATTERY_OK low below that threshold.",
		],
		[
			"C6",
			"100nF supervisor bypass",
			"Decouples U4's battery supply locally.",
			"Reduces fast noise at the supervisor.",
		],
		[
			"U5",
			"TMP390 temperature gate",
			"Allows charging inside the set window.",
			"Must be thermally coupled to the cell.",
		],
		[
			"C7",
			"100nF temperature-IC bypass",
			"Decouples USB5V at U5 supply pin.",
			"Filters supply noise for the comparators.",
		],
		[
			"R10",
			"1.62k hot-limit setting",
			"Sets U5's nominal hot limit near 36 C.",
			"Charging is disabled above this limit.",
		],
		[
			"R11",
			"18.7k cold-limit setting",
			"Sets U5's nominal cold limit near 5 C.",
			"Charging is disabled below this limit.",
		],
		[
			"R12",
			"100k TEMP_OK pull-up",
			"Pulls U5's open-drain outputs high.",
			"TEMP_OK falls low outside the safe window.",
		],
		[
			"R13",
			"100k charge-disable pull-up",
			"Pulls U2's active-low charge enable high.",
			"Defaults charging off when Q2 is off.",
		],
		[
			"Q2",
			"Temperature-to-charge gate",
			"TEMP_OK high turns this 2N7002 on.",
			"Pulls CHARGE_DISABLE low to allow charging.",
		],
	],
} as const;

export type CircuitSheetName = keyof typeof componentNotesBySheet;

export function SchematicComponentNotes({
	sheet,
}: {
	sheet: CircuitSheetName;
}) {
	const componentNotes = componentNotesBySheet[sheet];
	const rowsPerColumn = Math.ceil(componentNotes.length / 2);
	return (
		<>
			<schematictext
				text={`${sheet}: component guide`}
				schX={-13.5}
				schY={10.1}
				anchor="left"
				fontSize={0.4}
			/>
			{componentNotes.map(
				([reference, title, firstLine, secondLine], index) => {
					const schX = index < rowsPerColumn ? -13.5 : 0.5;
					const schY = 8.5 - (index % rowsPerColumn) * 1.8;
					return (
						<Fragment key={reference}>
							<schematictext
								text={`${reference}: ${title}`}
								schX={schX}
								schY={schY}
								anchor="left"
								fontSize={0.28}
							/>
							<schematictext
								text={firstLine}
								schX={schX}
								schY={schY - 0.5}
								anchor="left"
								fontSize={0.25}
							/>
							<schematictext
								text={secondLine}
								schX={schX}
								schY={schY - 0.88}
								anchor="left"
								fontSize={0.25}
							/>
						</Fragment>
					);
				},
			)}
			<schematictext
				text="Design intent; prototype operation remains unverified."
				schX={-13.5}
				schY={-10}
				anchor="left"
				fontSize={0.24}
			/>
			{sheet === "Radio" && (
				<schematictext
					text="JST programmer J5: straight-through cable; battery ON, R8 USB unplugged; manual BOOT / RESET."
					schX={-13.5}
					schY={-8.8}
					anchor="left"
					fontSize={0.25}
				/>
			)}
		</>
	);
}
