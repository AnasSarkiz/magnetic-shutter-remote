import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"]
} as const

export const BM06B_SRSS_TB_LF__SN_ = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C160392"
  ]
}}
      manufacturerPartNumber="BM06B-SRSS-TB(LF)(SN)"
      footprint={<footprint insertionDirection="from_above">
        <smtpad portHints={["pin6"]} pcbX="-2.499868mm" pcbY="1.3247497mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="3.800094mm" pcbY="-1.2002643mm" width="1.1999976mm" height="1.7999964mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-3.800094mm" pcbY="-1.2002643mm" width="1.1999976mm" height="1.7999964mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-1.500378mm" pcbY="1.3252577mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-0.50038mm" pcbY="1.3252577mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.499618mm" pcbY="1.3252577mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.499616mm" pcbY="1.3252577mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="2.499614mm" pcbY="1.3252577mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<silkscreenpath route={[{"x":2.540000000000191,"y":0.18947130000003654},{"x":2.921000000000163,"y":-0.19152869999993527},{"x":2.2860000000002856,"y":-0.19152869999993527},{"x":2.1590000000001055,"y":-0.19152869999993527},{"x":2.2860000000002856,"y":-0.06452869999998256},{"x":2.540000000000191,"y":0.18947130000003654}]} />
<silkscreenpath route={[{"x":-3.0479999999997744,"y":1.0087737000001198},{"x":-4.063999999999851,"y":1.0087737000001198},{"x":-4.063999999999851,"y":-0.007226299999956609}]} />
<silkscreenpath route={[{"x":4.064000000000192,"y":-0.007226299999956609},{"x":4.064000000000192,"y":1.0087737000001198},{"x":3.048000000000229,"y":1.0087737000001198}]} />
<silkscreenpath route={[{"x":2.921000000000163,"y":-2.039226299999882},{"x":-2.9209999999998217,"y":-2.039226299999882}]} />
<silkscreencircle pcbX="3.302mm" pcbY="1.4593697mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="-0.0137414mm" pcbY="3.0928457mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.650092799999925,"y":2.3502624999999853},{"x":4.6500928000000386,"y":2.3502624999999853},{"x":4.6500928000000386,"y":-2.3502624999999853},{"x":-4.650092799999925,"y":-2.3502624999999853},{"x":-4.650092799999925,"y":2.3502624999999853}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160392.obj?uuid=ca572370021c4906bc80dd4f4dd240e1",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160392.step?uuid=ca572370021c4906bc80dd4f4dd240e1",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 2.499974600000087, y: -0.44549509999998915, z: -0.01 },
      }}
      {...props}
    />
  )
}