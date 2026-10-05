import objPath from "./TPS2553DBVR_1.obj"
import stepPath from "./TPS2553DBVR_1.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["IN"],
  pin2: ["GND"],
  pin3: ["EN"],
  pin4: ["N_FAULT"],
  pin5: ["ILIM"],
  pin6: ["OUT"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true}
} as const

export const TPS2553DBVR_1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C111738"
  ]
}}
      manufacturerPartNumber="TPS2553DBVR-1"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin3"]} pcbX="0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin4"]} pcbX="0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin5"]} pcbX="0mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin6"]} pcbX="-0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":1.5391891999998961,"y":-0.8892031999998835},{"x":1.5391891999998961,"y":0.8892031999999972}]} />
<silkscreenpath route={[{"x":-1.5391892000000098,"y":-0.8892031999998835},{"x":-1.5391892000000098,"y":0.8892031999999972}]} />
<silkscreencircle pcbX="-1.668272mm" pcbY="-1.301496mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.1524mm" pcbY="2.6764mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.6999843999999484,"y":1.9350994999999784},{"x":1.7000097999999753,"y":1.9350994999999784},{"x":1.7000097999999753,"y":-1.9350994999998647},{"x":-1.6999843999999484,"y":-1.9350994999998647},{"x":-1.6999843999999484,"y":1.9350994999999784}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0.000012700000070253736, z: -0.048939 },
      }}
      {...props}
    />
  )
}