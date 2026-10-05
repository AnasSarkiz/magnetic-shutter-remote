import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["EH4"],
  pin2: ["EH2"],
  pin3: ["EH1"],
  pin4: ["EH3"],
  pin5: ["GND1","B1_A12"],
  pin6: ["VBUS1","B4_A9"],
  pin7: ["GND2","A1_B12"],
  pin8: ["VBUS2","A4_B9"],
  pin9: ["CC2","B5"],
  pin10: ["SBU1","A8"],
  pin11: ["Dp2","B6"],
  pin12: ["Dn1","A7"],
  pin13: ["Dp1","A6"],
  pin14: ["Dn2","B7"],
  pin15: ["CC1","A5"],
  pin16: ["SBU2","B8"]
} as const

export const USB4105_GF_A_120 = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5184243"
  ]
}}
      manufacturerPartNumber="USB4105-GF-A-120"
      footprint={<footprint insertionDirection="from_bottom">
        <hole pcbX="2.890012mm" pcbY="1.0398824mm" diameter="0.649986mm" />
<hole pcbX="-2.890012mm" pcbY="1.0398824mm" diameter="0.649986mm" />
<platedhole  portHints={["pin3"]} pcbX="4.320032mm" pcbY="-2.6400696mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="-4.320032mm" pcbY="-2.6400696mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin4"]} pcbX="4.320032mm" pcbY="1.5400084mm" holeWidth="0.5999988mm" holeHeight="1.6999966mm" outerWidth="0.999998mm" outerHeight="2.0999958mm" shape="pill" />
<platedhole  portHints={["pin1"]} pcbX="-4.320032mm" pcbY="1.5400084mm" holeWidth="0.5999988mm" holeHeight="1.700022mm" outerWidth="0.999998mm" outerHeight="2.0999958mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="3.200146mm" pcbY="2.1150644mm" width="0.5999988mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="2.400046mm" pcbY="2.1150644mm" width="0.5999988mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-3.199892mm" pcbY="2.1150644mm" width="0.5999988mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-2.400046mm" pcbY="2.1150644mm" width="0.5999988mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.75006mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="1.249934mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0.750062mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="0.249936mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-0.249936mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-0.750062mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-1.249934mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-1.75006mm" pcbY="2.1150644mm" width="0.2999994mm" height="1.1500104mm" shape="rect" />
<silkscreenpath route={[{"x":-4.571923799999922,"y":-3.8135242000000744},{"x":-4.571923799999922,"y":-5.337524199999962},{"x":4.572076200000083,"y":-5.337524199999962},{"x":4.572076200000083,"y":-3.8135242000000744}]} />
<silkscreenpath route={[{"x":-4.571872999999982,"y":0.1869249999999738},{"x":-4.571872999999982,"y":-1.4640750000000935}]} />
<silkscreenpath route={[{"x":4.572127000000023,"y":0.1869249999999738},{"x":4.572127000000023,"y":-1.4640750000000935}]} />
<silkscreenrect pcbX="-2.44094mm" pcbY="-0.8061896mm" width="1.778mm" height="0.762mm" strokeWidth="0.254mm" />
<silkscreenrect pcbX="2.38506mm" pcbY="-0.8061896mm" width="1.778mm" height="0.762mm" strokeWidth="0.254mm" />
<silkscreentext text="{NAME}" pcbX="0.002032mm" pcbY="3.6888504mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.070030999999972,"y":2.9400695999999016},{"x":5.070031000000085,"y":2.9400695999999016},{"x":5.070031000000085,"y":-5.5855684000000565},{"x":-5.070030999999972,"y":-5.5855684000000565},{"x":-5.070030999999972,"y":2.9400695999999016}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5184243.obj?uuid=c50ce21ae3b941ce8eeb9bccc6cdef41",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5184243.step?uuid=c50ce21ae3b941ce8eeb9bccc6cdef41",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000063500000123895, y: -2.7355763000001385, z: 0.14999799999999996 },
      }}
      {...props}
    />
  )
}