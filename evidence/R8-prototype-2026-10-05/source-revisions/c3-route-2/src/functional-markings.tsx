// Native functional legends; supplier artwork remains unchanged.
export function FunctionalMarkings() {
	return (
		<>
			<silkscreentext
				text="R8 ESP32-C2 PROTOTYPE"
				pcbX={0}
				pcbY={-15}
				layer="bottom"
				fontSize={1.2}
			/>
			<silkscreentext
				text="SHUTTER"
				pcbX={17}
				pcbY={-11.5}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="PAIR"
				pcbX={21}
				pcbY={-5.5}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="BOOT"
				pcbX={-19}
				pcbY={-11.5}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="RESET"
				pcbX={15}
				pcbY={10}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="POWER"
				pcbX={19}
				pcbY={5}
				pcbRotation={90}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="BAT 1:- 2:+"
				pcbX={-18}
				pcbY={17}
				layer="top"
				fontSize={1}
			/>
			<silkscreentext
				text="UART 3V3 ONLY / 1:VREF 2:RX 3:GND"
				pcbX={0}
				pcbY={1}
				layer="bottom"
				fontSize={1}
			/>
			<silkscreentext
				text="4:TX 5:EN 6:BOOT / NO POWER INJECTION"
				pcbX={0}
				pcbY={-2}
				layer="bottom"
				fontSize={1}
			/>
			<silkscreentext text="1" pcbX={17} pcbY={19.5} layer="top" fontSize={1} />
		</>
	);
}
