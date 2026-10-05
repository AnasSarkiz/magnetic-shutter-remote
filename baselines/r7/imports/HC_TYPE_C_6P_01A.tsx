import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["A12"],
  pin6: ["A9"],
  pin7: ["B5"],
  pin8: ["A5"],
  pin9: ["B9"],
  pin10: ["B12"]
} as const

export const HC_TYPE_C_6P_01A = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2894893"
  ]
}}
      manufacturerPartNumber="HC-TYPE-C-6P-01A"
      footprint={<footprint insertionDirection="from_bottom">
        <platedhole  portHints={["pin3"]} pcbX="4.320032mm" pcbY="1.3472986mm" holeWidth="0.5000244mm" holeHeight="1.401064mm" outerWidth="1.0999978mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin1"]} pcbX="-4.320032mm" pcbY="1.3472986mm" holeWidth="0.5000244mm" holeHeight="1.401064mm" outerWidth="1.0999978mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin4"]} pcbX="4.320032mm" pcbY="-2.3527194mm" holeWidth="0.5000244mm" holeHeight="1.401064mm" outerWidth="1.0999978mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="-4.320032mm" pcbY="-2.3527194mm" holeWidth="0.5000244mm" holeHeight="1.401064mm" outerWidth="1.0999978mm" outerHeight="1.7999964mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="2.749296mm" pcbY="1.8027206mm" width="0.7999984mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.519428mm" pcbY="1.8027206mm" width="0.7599934mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="0.499364mm" pcbY="1.8027206mm" width="0.6999986mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.500634mm" pcbY="1.8027206mm" width="0.6999986mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-1.520444mm" pcbY="1.8027206mm" width="0.7599934mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-2.750312mm" pcbY="1.8027206mm" width="0.7999984mm" height="1.1999976mm" shape="rect" />
<silkscreenpath route={[{"x":4.44500000000005,"y":-3.4737738000001173},{"x":4.44500000000005,"y":-4.81016939999995},{"x":0,"y":-4.81016939999995}]} />
<silkscreenpath route={[{"x":4.44500000000005,"y":0.22621880000008332},{"x":4.44500000000005,"y":-1.2316904000000477}]} />
<silkscreenpath route={[{"x":3.3805368000000726,"y":2.0478305999999975},{"x":3.6222686000000976,"y":2.0478305999999975}]} />
<silkscreenpath route={[{"x":-3.5559999999999263,"y":2.0478305999999975},{"x":-3.3814765999998144,"y":2.0478305999999975}]} />
<silkscreenpath route={[{"x":-4.444999999999936,"y":-1.2316904000000477},{"x":-4.444999999999936,"y":0.22621880000008332}]} />
<silkscreenpath route={[{"x":0,"y":-4.81016939999995},{"x":-4.444999999999936,"y":-4.81016939999995},{"x":-4.444999999999936,"y":-3.4737738000001173}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="3.4034306mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-2.5399999999999636,"y":-4.683169399999997},{"x":-2.5399999999999636,"y":-2.905169399999977},{"x":2.5400000000000773,"y":-2.905169399999977},{"x":2.5400000000000773,"y":-4.683169399999997},{"x":2.286000000000058,"y":-4.683169399999997},{"x":2.286000000000058,"y":-3.159169399999996},{"x":-2.2859999999999445,"y":-3.159169399999996},{"x":-2.2859999999999445,"y":-4.683169399999997},{"x":-2.5399999999999636,"y":-4.683169399999997}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-5.120030899999961,"y":2.6527194000000236},{"x":5.120030900000074,"y":2.6527194000000236},{"x":5.120030900000074,"y":-5.238985400000047},{"x":-5.120030899999961,"y":-5.238985400000047},{"x":-5.120030899999961,"y":2.6527194000000236}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2894893.obj?uuid=87c2742b44f74a208e6a2183ba894829",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2894893.step?uuid=87c2742b44f74a208e6a2183ba894829",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: -1.4639987999998993, z: -0.0000022000000001742848 },
      }}
      {...props}
    />
  )
}