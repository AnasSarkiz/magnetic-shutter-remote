import objPath from "./TS_1088_AR02016.obj"
import stepPath from "./TS_1088_AR02016.step"
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const TS_1088_AR02016 = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C720477"
  ]
}}
      manufacturerPartNumber="TS-1088-AR02016"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.184908mm" pcbY="0mm" width="1.229995mm" height="1.8599912mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="2.184908mm" pcbY="0mm" width="1.229995mm" height="1.8599912mm" shape="rect" />
<silkscreenpath route={[{"x":-2.026208800000063,"y":1.5411958000000823},{"x":-2.026208800000063,"y":1.1101323999999977}]} />
<silkscreenpath route={[{"x":-2.026208800000063,"y":-1.5411957999999686},{"x":-2.026208800000063,"y":-1.1101324000001114}]} />
<silkscreenpath route={[{"x":2.0262087999999494,"y":-1.1101324000001114},{"x":2.0262087999999494,"y":-1.5411957999999686}]} />
<silkscreenpath route={[{"x":2.0262087999999494,"y":1.5411958000000823},{"x":2.0262087999999494,"y":1.1101323999999977}]} />
<silkscreenpath route={[{"x":2.0262087999999494,"y":1.5411958000000823},{"x":-2.026208800000063,"y":1.5411958000000823}]} />
<silkscreenpath route={[{"x":2.0262087999999494,"y":-1.5411957999999686},{"x":-2.026208800000063,"y":-1.5411957999999686}]} />
<silkscreencircle pcbX="0mm" pcbY="0mm" radius="0.899922mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="2.5494mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.049905499999909,"y":1.700009800000089},{"x":3.049905499999795,"y":1.700009800000089},{"x":3.049905499999795,"y":-1.6999843999999484},{"x":-3.049905499999909,"y":-1.6999843999999484},{"x":-3.049905499999909,"y":1.700009800000089}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.000012700000070253736, z: 0 },
      }}
      {...restProps}
    />
  )
}