import objPath from "./TS24CA.obj"
import stepPath from "./TS24CA.step"
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const TS24CA = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C393942"
  ]
}}
      manufacturerPartNumber="TS24CA"
      footprint={<footprint>
        <hole pcbX="0.8498332mm" pcbY="0.3000121mm" diameter="0.700024mm" />
<hole pcbX="-0.8501888mm" pcbY="0.3000121mm" diameter="0.700024mm" />
<smtpad portHints={["pin4"]} points={[{x: "-1.5998952mm", y: "0.9499727mm"}, {x: "-1.5998952mm", y: "1.5999587mm"}, {x: "-1.5998952mm", y: "1.5999587mm"}, {x: "-2.6498804mm", y: "1.5999587mm"}, {x: "-2.6498804mm", y: "1.5999587mm"}, {x: "-2.6498804mm", y: "0.2999359mm"}, {x: "-2.6498804mm", y: "0.2999359mm"}, {x: "-1.9999198mm", y: "0.2999359mm"}, {x: "-1.9999198mm", y: "0.2999359mm"}, {x: "-1.9999198mm", y: "0.9499473mm"}, {x: "-1.9999198mm", y: "0.9499473mm"}, {x: "-1.5999206mm", y: "0.9499473mm"}, {x: "-1.5999206mm", y: "0.9499473mm"}, {x: "-1.5998952mm", y: "0.9499727mm"}]} shape="polygon" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin3"]} points={[{x: "2.6498804mm", y: "0.2999359mm"}, {x: "2.6498804mm", y: "1.5999587mm"}, {x: "2.6498804mm", y: "1.5999587mm"}, {x: "1.5998952mm", y: "1.5999587mm"}, {x: "1.5998952mm", y: "1.5999587mm"}, {x: "1.5998952mm", y: "0.9499727mm"}, {x: "1.5998952mm", y: "0.9499727mm"}, {x: "1.5999206mm", y: "0.9499473mm"}, {x: "1.5999206mm", y: "0.9499473mm"}, {x: "1.9999198mm", y: "0.9499473mm"}, {x: "1.9999198mm", y: "0.9499473mm"}, {x: "1.9999198mm", y: "0.2999359mm"}, {x: "1.9999198mm", y: "0.2999359mm"}, {x: "2.6498804mm", y: "0.2999359mm"}]} shape="polygon" solderPasteMargin="0mm" solderMaskMargin="0.0510032mm" />
<smtpad portHints={["pin2"]} pcbX="1.6999712mm" pcbY="-0.9999599mm" width="0.5999988mm" height="1.1999976mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin1"]} pcbX="-1.7000728mm" pcbY="-0.9999599mm" width="0.5999988mm" height="1.1999976mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":-2.276982999999859,"y":0.06879590000005464},{"x":-2.276982999999859,"y":-1.0999089000000595}]} />
<silkscreenpath route={[{"x":2.275001800000041,"y":0.06879590000005464},{"x":2.275001800000041,"y":-1.0999089000000595}]} />
<silkscreenpath route={[{"x":-0.8890761999998631,"y":-1.0999089000000595},{"x":-1.1690095999999812,"y":-1.0999089000000595}]} />
<silkscreenpath route={[{"x":0.8889238000000432,"y":-1.0999089000000595},{"x":1.1687048000000004,"y":-1.0999089000000595}]} />
<silkscreenpath route={[{"x":0.999921800000152,"y":2.4000333000000182},{"x":0.999921800000152,"y":1.2000611000000845}]} />
<silkscreenpath route={[{"x":-1.0000741999998581,"y":2.4000333000000182},{"x":-1.0000741999998581,"y":1.2000611000000845}]} />
<silkscreenpath route={[{"x":-1.0000741999998581,"y":2.4000333000000182},{"x":0.999921800000152,"y":2.4000333000000182}]} />
<silkscreenpath route={[{"x":-0.8890761999998631,"y":-1.0999089000000595},{"x":0.8889238000000432,"y":-1.0999089000000595}]} />
<silkscreentext text="{NAME}" pcbX="0.0073152mm" pcbY="3.5316561mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.8998803999999154,"y":2.724023500000044},{"x":2.899880400000029,"y":2.724023500000044},{"x":2.899880400000029,"y":-1.849958700000002},{"x":-2.8998803999999154,"y":-1.849958700000002},{"x":-2.8998803999999154,"y":2.724023500000044}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.00006349999989652133, y: -1.0240284000000113, z: -0.8600008000000001 },
      }}
      {...restProps}
    />
  )
}