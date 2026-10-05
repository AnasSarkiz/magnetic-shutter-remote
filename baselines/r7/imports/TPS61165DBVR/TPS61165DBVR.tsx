import objPath from "./TPS61165DBVR.obj"
import stepPath from "./TPS61165DBVR.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VIN"],
  pin2: ["CTRL"],
  pin3: ["SW"],
  pin4: ["GND"],
  pin5: ["COMP"],
  pin6: ["FB"]
} as const

const pinAttributes = {
  pin1: {requiresPower: true},
  pin4: {requiresGround: true}
} as const

export const TPS61165DBVR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C58756"
  ]
}}
      manufacturerPartNumber="TPS61165DBVR"
      footprint={<footprint>
        <smtpad portHints={["pin3"]} pcbX="1.35001mm" pcbY="0.94996mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin2"]} pcbX="1.35001mm" pcbY="-0mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin1"]} pcbX="1.35001mm" pcbY="-0.94996mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin6"]} pcbX="-1.35001mm" pcbY="-0.94996mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin5"]} pcbX="-1.35001mm" pcbY="-0mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin4"]} pcbX="-1.35001mm" pcbY="0.94996mm" width="1.0999978mm" height="0.5999988mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<silkscreenpath route={[{"x":-0.899998200000141,"y":1.5499080000000731},{"x":0.9000236000000541,"y":1.5499080000000731}]} />
<silkscreenpath route={[{"x":-0.899998200000141,"y":-1.5501111999999466},{"x":0.9000236000000541,"y":-1.5501111999999466}]} />
<silkscreencircle pcbX="1.397mm" pcbY="-1.651mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0.012446mm" pcbY="2.562354mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.150008899999989,"y":1.6999081999999817},{"x":2.150008899999989,"y":1.6999081999999817},{"x":2.150008899999989,"y":-1.700085999999942},{"x":-2.150008899999989,"y":-1.700085999999942},{"x":-2.150008899999989,"y":1.6999081999999817}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000025399999913133797, y: -0.0000889000000370288, z: -0.048939 },
      }}
      {...props}
    />
  )
}