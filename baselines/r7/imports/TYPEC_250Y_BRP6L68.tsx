import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin7: ["EH"],
  pin8: ["GND1","B12"],
  pin9: ["VBUS1","B9"],
  pin10: ["CC1","A5"],
  pin11: ["CC2","B5"],
  pin12: ["VBUS2","A9"],
  pin13: ["GND2","A12"]
} as const

export const TYPEC_250Y_BRP6L68 = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5252714"
  ]
}}
      manufacturerPartNumber="TYPEC-250Y-BRP6L68"
      footprint={<footprint insertionDirection="from_bottom">
        <platedhole  portHints={["pin7"]} pcbX="4.319905mm" pcbY="-2.1499512mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin7"]} pcbX="-4.319905mm" pcbY="-2.1500274mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin7"]} pcbX="4.319905mm" pcbY="1.6500412mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin7"]} pcbX="-4.319905mm" pcbY="1.6500666mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="-2.699893mm" pcbY="1.7000284mm" width="0.7999984mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-1.499997mm" pcbY="1.7000284mm" width="0.7999984mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-0.499999mm" pcbY="1.7000284mm" width="0.6999986mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0.499999mm" pcbY="1.7000284mm" width="0.6999986mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="1.499997mm" pcbY="1.7000284mm" width="0.7999984mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="2.699893mm" pcbY="1.7000284mm" width="0.7999984mm" height="0.999998mm" shape="rect" />
<silkscreenpath route={[{"x":-4.500702200000092,"y":-3.3011300000000574},{"x":-4.500702200000092,"y":-3.2783207999999604},{"x":-4.500702200000092,"y":-4.749920599999996},{"x":4.5010323999999855,"y":-4.749920599999996},{"x":4.5010323999999855,"y":-3.3011300000000574}]} />
<silkscreenpath route={[{"x":3.3290763999999626,"y":2.1000784000000294},{"x":3.5407854000000043,"y":2.1000784000000294}]} />
<silkscreenpath route={[{"x":-3.5407092000000375,"y":2.1000784000000294},{"x":-3.3291272000000163,"y":2.1000784000000294}]} />
<silkscreenpath route={[{"x":-4.499965599999882,"y":0.5000562000000173},{"x":-4.499965599999882,"y":0.542169400000148}]} />
<silkscreenpath route={[{"x":-4.499965599999882,"y":0.5000562000000173},{"x":-4.499965599999882,"y":-0.9422065999999631}]} />
<silkscreenpath route={[{"x":4.500041799999849,"y":-0.8999156000000994},{"x":4.500041799999849,"y":0.5500941999999895}]} />
<silkscreentext text="{NAME}" pcbX="0.017907mm" pcbY="3.5383046mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.1368683772161603e-13,"y":-1.9850035999999136},{"x":-1.170000200000004,"y":-3.1550038000000313},{"x":-1.1800077999999985,"y":-3.1550038000000313},{"x":-1.170000200000004,"y":-3.165011400000026},{"x":-0.19999959999995554,"y":-3.165011400000026},{"x":-0.19999959999995554,"y":-4.065009599999939},{"x":0.1700021999998853,"y":-4.065009599999939},{"x":0.18000979999987976,"y":-4.075017199999934},{"x":0.18000979999987976,"y":-3.1950087999999823},{"x":0.2100071999998363,"y":-3.165011400000026},{"x":1.1800077999999985,"y":-3.165011400000026},{"x":-1.1368683772161603e-13,"y":-1.9850035999999136}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-5.069904000000065,"y":2.800064799999973},{"x":5.069904000000065,"y":2.800064799999973},{"x":5.069904000000065,"y":-4.97495240000012},{"x":-5.069904000000065,"y":-4.97495240000012},{"x":-5.069904000000065,"y":2.800064799999973}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5252714.obj?uuid=b927f6658f0f4d068763ea1871194c90",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5252714.step?uuid=b927f6658f0f4d068763ea1871194c90",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.004987300000043771, y: 1.3249591999999666, z: -0.10000180000000003 },
      }}
      {...props}
    />
  )
}