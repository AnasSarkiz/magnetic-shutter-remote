import objPath from "./TSA002A3512A02.obj"
import stepPath from "./TSA002A3512A02.step"
import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const TSA002A3512A02 = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2888932"
  ]
}}
      manufacturerPartNumber="TSA002A3512A02"
      footprint={<footprint>
        <hole pcbX="-0.849884mm" pcbY="0.499999mm" diameter="0.649986mm" />
<hole pcbX="0.850138mm" pcbY="0.499999mm" diameter="0.649986mm" />
<smtpad portHints={["pin1"]} pcbX="-1.700022mm" pcbY="-0.850011mm" width="0.5999988mm" height="1.0999978mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0500126mm" />
<smtpad portHints={["pin2"]} pcbX="1.700022mm" pcbY="-0.850011mm" width="0.5999988mm" height="1.0999978mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0500126mm" />
<smtpad portHints={["pin3"]} pcbX="2.29997mm" pcbY="0.850011mm" width="0.5999988mm" height="1.0999978mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0500126mm" />
<smtpad portHints={["pin4"]} pcbX="-2.29997mm" pcbY="0.850011mm" width="0.5999988mm" height="1.0999978mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0500126mm" />
<silkscreenpath route={[{"x":-0.9499599999999191,"y":2.600020200000131},{"x":-0.9499599999999191,"y":1.497075999999879},{"x":-1.0469880000000558,"y":1.4000479999999698}]} />
<silkscreenpath route={[{"x":0.9500615999999127,"y":2.600020200000131},{"x":0.9500615999999127,"y":1.4000479999999698}]} />
<silkscreenpath route={[{"x":-0.9499599999999191,"y":2.600020200000131},{"x":0.9500615999999127,"y":2.600020200000131}]} />
<silkscreenpath route={[{"x":-2.231085200000166,"y":-0.8999982000000273},{"x":-2.399944400000095,"y":-0.8999982000000273}]} />
<silkscreenpath route={[{"x":1.168907999999874,"y":-0.8999982000000273},{"x":-1.1688064000001077,"y":-0.8999982000000273}]} />
<silkscreenpath route={[{"x":2.400045999999861,"y":-0.8999982000000273},{"x":2.231186799999932,"y":-0.8999982000000273}]} />
<silkscreenpath route={[{"x":-2.399944400000095,"y":0.06885939999995117},{"x":-2.399944400000095,"y":-0.8999982000000273}]} />
<silkscreenpath route={[{"x":2.400045999999861,"y":0.06885939999995117},{"x":2.400045999999861,"y":-0.8999982000000273}]} />
<silkscreenpath route={[{"x":-1.768805200000088,"y":1.4000479999999698},{"x":1.7689067999998542,"y":1.4000479999999698}]} />
<silkscreentext text="{NAME}" pcbX="0.008128mm" pcbY="3.685415mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-0.9749536000000489,"y":1.424990800000046},{"x":-0.9749536000000489,"y":2.6250138000000334},{"x":-0.9249664000000166,"y":2.6750010000000657},{"x":0.9250171999998429,"y":2.6750010000000657},{"x":0.9750298000000157,"y":2.6249884000000065},{"x":0.9750298000000157,"y":1.424990800000046},{"x":0.8750300000000379,"y":1.424990800000046},{"x":0.8250427999998919,"y":1.424990800000046},{"x":0.8250427999998919,"y":2.524988600000029},{"x":-0.8249666000000389,"y":2.524988600000029},{"x":-0.8249666000000389,"y":1.424990800000046},{"x":-0.9749536000000489,"y":1.424990800000046}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-2.8499693999999636,"y":2.8499947999999904},{"x":2.84996939999985,"y":2.8499947999999904},{"x":2.84996939999985,"y":-1.6500098999999864},{"x":-2.8499693999999636,"y":-1.6500098999999864},{"x":-2.8499693999999636,"y":2.8499947999999904}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00016079999994000893, y: -0.12499840000004947, z: -1.050001 },
      }}
      {...restProps}
    />
  )
}