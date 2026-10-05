import objPath from "./TSB001A3512A.obj"
import stepPath from "./TSB001A3512A.step"
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const TSB001A3512A = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2888948"
  ]
}}
      manufacturerPartNumber="TSB001A3512A"
      footprint={<footprint>
        <hole pcbX="-1.1500739mm" pcbY="0.4000754mm" diameter="0.9000236mm" />
<hole pcbX="1.1501501mm" pcbY="0.4000754mm" diameter="0.9000236mm" />
<smtpad portHints={["pin1"]} pcbX="-2.1000339mm" pcbY="-1.0500106mm" width="1.1999976mm" height="1.1999976mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="2.1001101mm" pcbY="-1.0500106mm" width="1.1999976mm" height="1.1999976mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin4"]} points={[{x: "2.7000073mm", y: "1.6500094mm"}, {x: "4.2000043mm", y: "1.6500094mm"}, {x: "4.2000043mm", y: "0.149987mm"}, {x: "3.4500185mm", y: "0.149987mm"}, {x: "3.4500185mm", y: "0.8999982mm"}, {x: "2.7000073mm", y: "0.8999982mm"}]} shape="polygon" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin3"]} points={[{x: "-2.6999819mm", y: "1.6500094mm"}, {x: "-4.2000043mm", y: "1.6500094mm"}, {x: "-4.2000043mm", y: "0.149987mm"}, {x: "-3.4499931mm", y: "0.149987mm"}, {x: "-3.4499931mm", y: "0.8999982mm"}, {x: "-2.6999819mm", y: "0.8999982mm"}]} shape="polygon" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":-1.501914700000043,"y":1.4990318000000116},{"x":-1.501914700000043,"y":2.4800814000000173},{"x":1.4801469000000225,"y":2.4800814000000173},{"x":1.4801469000000225,"y":1.4990318000000116}]} />
<silkscreenpath route={[{"x":-3.8099873000001026,"y":-0.024968199999989338},{"x":-3.8099873000001026,"y":-1.1679681999999048},{"x":-2.9311219000001074,"y":-1.1679681999999048}]} />
<silkscreenpath route={[{"x":2.931198100000074,"y":-1.1679681999999048},{"x":3.810012699999902,"y":-1.1679681999999048},{"x":3.810012699999902,"y":-0.08115299999985837}]} />
<silkscreenpath route={[{"x":-1.2688443000000689,"y":-1.1679681999999048},{"x":1.2689205000000356,"y":-1.1679681999999048}]} />
<silkscreenpath route={[{"x":2.540012700000034,"y":1.4990318000000116},{"x":-2.5399873000001207,"y":1.4990318000000116}]} />
<silkscreentext text="{NAME}" pcbX="0.0127381mm" pcbY="3.4790654mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":1.4701392999999143,"y":1.540078200000039},{"x":1.4701392999999143,"y":2.4400764000000663},{"x":-1.4298549000000094,"y":2.4400764000000663},{"x":-1.4398371000000907,"y":2.450058600000034},{"x":-1.4398371000000907,"y":1.540078200000039},{"x":1.4701392999999143,"y":1.540078200000039}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.450004300000046,"y":2.7830149999999776},{"x":4.450004299999932,"y":2.7830149999999776},{"x":4.450004299999932,"y":-1.9000093999999308},{"x":-4.450004300000046,"y":-1.9000093999999308},{"x":-4.450004300000046,"y":2.7830149999999776}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000025400000026820635, y: 0.21955059999999937, z: -0.02867260000000016 },
      }}
      {...restProps}
    />
  )
}