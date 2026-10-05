import objPath from "./AL1793AFE_13.obj"
import stepPath from "./AL1793AFE_13.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["EN"],
  pin2: ["PWM4","GND1"],
  pin3: ["PWM3","GND2"],
  pin4: ["PWM2","GND3"],
  pin5: ["PWM1"],
  pin6: ["LED1"],
  pin7: ["LED2","GND4"],
  pin8: ["GND5"],
  pin9: ["LED3","GND6"],
  pin10: ["LED4","GND7"],
  pin11: ["LEDPG"],
  pin12: ["FAULTB"],
  pin13: ["REF"],
  pin14: ["VIN"],
  pin15: ["EP"]
} as const

const pinAttributes = {
  pin8: {requiresGround: true},
  pin14: {requiresPower: true}
} as const

export const AL1793AFE_13 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C67354"
  ]
}}
      manufacturerPartNumber="AL1793AFE-13"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.502156mm" pcbY="-1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="-1.00203mm" pcbY="-1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin3"]} pcbX="-0.50419mm" pcbY="-1.499235mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin4"]} pcbX="-0.004064mm" pcbY="-1.499235mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin5"]} pcbX="0.495808mm" pcbY="-1.499235mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin6"]} pcbX="0.995934mm" pcbY="-1.499235mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin7"]} pcbX="1.495806mm" pcbY="-1.499235mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin8"]} pcbX="1.501902mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin9"]} pcbX="0.997966mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin10"]} pcbX="0.49784mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin11"]} pcbX="-0.002032mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin12"]} pcbX="-0.502158mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin13"]} pcbX="-1.00203mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin14"]} pcbX="-1.502156mm" pcbY="1.500759mm" width="0.2999994mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin15"]} pcbX="0mm" pcbY="0.000889mm" width="3.350006mm" height="1.7999964mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":-2.004186999999888,"y":1.5007590000000164},{"x":-2.004186999999888,"y":-1.4992349999999988}]} />
<silkscreenpath route={[{"x":1.9958050000000185,"y":1.5007590000000164},{"x":1.9958050000000185,"y":-1.4992349999999988}]} />
<silkscreencircle pcbX="-2.00406mm" pcbY="-1.999361mm" radius="0.124968mm" />
<silkscreentext text="{NAME}" pcbX="-0.064262mm" pcbY="2.807845mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.24999600000001,"y":2.0507584000000634},{"x":2.24999600000001,"y":2.0507584000000634},{"x":2.24999600000001,"y":-2.0507584000000634},{"x":-2.24999600000001,"y":-2.0507584000000634},{"x":-2.24999600000001,"y":2.0507584000000634}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000070253736, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}