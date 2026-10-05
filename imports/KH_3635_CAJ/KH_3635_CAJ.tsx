import objPath from "./KH_3635_CAJ.obj"
import stepPath from "./KH_3635_CAJ.step"
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["C"],
  pin2: ["D"],
  pin3: ["A"],
  pin4: ["B"]
} as const

export const KH_3635_CAJ = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C530670"
  ]
}}
      manufacturerPartNumber="KH-3635-CAJ"
      footprint={<footprint>
        <hole pcbX="-1.150112mm" pcbY="-0.1499489mm" diameter="0.9000236mm" />
<hole pcbX="1.149858mm" pcbY="-0.1499489mm" diameter="0.9000236mm" />
<smtpad portHints={["pin1"]} pcbX="-2.100072mm" pcbY="1.0499471mm" width="0.8999982mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin2"]} pcbX="2.100072mm" pcbY="1.0499471mm" width="0.8999982mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin4"]} pcbX="3.374898mm" pcbY="-1.1499469mm" width="1.4500098mm" height="0.7999984mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin3"]} pcbX="-3.374898mm" pcbY="-1.1499469mm" width="1.4500098mm" height="0.7999984mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<silkscreenpath route={[{"x":-2.3999952000001485,"y":-1.0999596999998857},{"x":2.4377903999998125,"y":-1.0999596999998857}]} />
<silkscreenpath route={[{"x":3.5299395999999206,"y":1.3920089000000644},{"x":3.5299395999999206,"y":-0.5186807000000044}]} />
<silkscreenpath route={[{"x":2.78114759999994,"y":1.4001369000000068},{"x":3.5299395999999206,"y":1.4001369000000068}]} />
<silkscreenpath route={[{"x":-1.418920200000116,"y":1.4001369000000068},{"x":1.4188693999999487,"y":1.4001369000000068}]} />
<silkscreenpath route={[{"x":-3.540023400000109,"y":1.4001369000000068},{"x":-2.7811730000001944,"y":1.4001369000000068}]} />
<silkscreenpath route={[{"x":-3.5539680000000544,"y":1.4023721000000933},{"x":-3.5539680000000544,"y":-0.5186807000000044}]} />
<silkscreenpath route={[{"x":1.5288767999998072,"y":-2.2499447000000146},{"x":1.5288767999998072,"y":-1.0999596999998857}]} />
<silkscreenpath route={[{"x":-1.4711172000000943,"y":-2.2499447000000146},{"x":-1.4711172000000943,"y":-1.0999596999998857}]} />
<silkscreenpath route={[{"x":-1.4711172000000943,"y":-2.2499447000000146},{"x":1.5288767999998072,"y":-2.2499447000000146}]} />
<silkscreenpath route={[{"x":-3.540023400000109,"y":1.4001369000000068},{"x":-2.711221400000113,"y":1.4001369000000068}]} />
<silkscreentext text="{NAME}" pcbX="-0.007366mm" pcbY="2.5523591mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.4999970000001213,"y":-2.199957500000096},{"x":-1.4999970000001213,"y":-1.1999594999999772},{"x":1.4999969999998939,"y":-1.1999594999999772},{"x":1.4999969999998939,"y":-2.199957500000096},{"x":-1.4999970000001213,"y":-2.199957500000096}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.349902900000188,"y":1.7999461000000565},{"x":4.349902900000075,"y":1.7999461000000565},{"x":4.349902900000075,"y":-2.4128481000000193},{"x":-4.349902900000188,"y":-2.4128481000000193},{"x":-4.349902900000188,"y":1.7999461000000565}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000025400000140507473, y: 0.5813494999998985, z: 5.8996474 },
      }}
      {...restProps}
    />
  )
}