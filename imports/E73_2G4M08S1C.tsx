import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["AI4"],
  pin5: ["GND3"],
  pin6: ["pin6"],
  pin7: ["AI0"],
  pin8: ["AI5"],
  pin9: ["AI7"],
  pin10: ["AI6"],
  pin11: ["XL1"],
  pin12: ["pin12"],
  pin13: ["XL2"],
  pin14: ["pin14"],
  pin15: ["AI3"],
  pin16: ["pin16"],
  pin17: ["pin17"],
  pin18: ["AI2"],
  pin19: ["VCC"],
  pin20: ["P12"],
  pin21: ["GND2"],
  pin22: ["pin22"],
  pin23: ["VDH"],
  pin24: ["GND1"],
  pin25: ["DCH"],
  pin26: ["RST"],
  pin27: ["VBS"],
  pin28: ["P15"],
  pin29: ["D_NEG"],
  pin30: ["P17"],
  pin31: ["D_POS"],
  pin32: ["pin32"],
  pin33: ["pin33"],
  pin34: ["pin34"],
  pin35: ["pin35"],
  pin36: ["pin36"],
  pin37: ["SWD"],
  pin38: ["pin38"],
  pin39: ["SWC"],
  pin40: ["pin40"],
  pin41: ["NF1"],
  pin42: ["pin42"],
  pin43: ["NF2"]
} as const

const pinAttributes = {
  pin5: {requiresGround: true},
  pin19: {requiresPower: true},
  pin21: {requiresGround: true},
  pin24: {requiresGround: true}
} as const

export const E73_2G4M08S1C = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C356849"
  ]
}}
      manufacturerPartNumber="E73-2G4M08S1C"
      footprint={<footprint>
        <smtpad portHints={["pin43"]} pcbX="-6.50494mm" pcbY="-6.204458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin42"]} pcbX="-4.404868mm" pcbY="-5.569458mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin41"]} pcbX="-6.50494mm" pcbY="-4.934458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin40"]} pcbX="-4.405122mm" pcbY="-4.299458mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin39"]} pcbX="-6.50494mm" pcbY="-3.664458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin38"]} pcbX="-4.405122mm" pcbY="-3.029458mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin37"]} pcbX="-6.50494mm" pcbY="-2.394458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin36"]} pcbX="-4.405122mm" pcbY="-1.759458mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin35"]} pcbX="-6.50494mm" pcbY="-1.124458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin34"]} pcbX="-4.405122mm" pcbY="-0.489458mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin33"]} pcbX="-6.50494mm" pcbY="0.145542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin32"]} pcbX="-4.405122mm" pcbY="0.780542mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin31"]} pcbX="-6.50494mm" pcbY="1.415542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin30"]} pcbX="-4.405122mm" pcbY="2.050542mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin29"]} pcbX="-6.50494mm" pcbY="2.685542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin28"]} pcbX="-4.405122mm" pcbY="3.320542mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin27"]} pcbX="-6.50494mm" pcbY="3.955542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin26"]} pcbX="-6.50494mm" pcbY="5.225542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="-4.445mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="-3.81mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="-3.175mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-2.54mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-1.905mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-1.27mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-0.635mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="0mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="0.635mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="1.27mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="1.905mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="2.54mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="3.175mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="3.81mm" pcbY="5.725414mm" width="0.8999982mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="4.445mm" pcbY="7.825486mm" width="0.8999982mm" height="1.999996mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="6.50494mm" pcbY="5.225542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="6.50494mm" pcbY="3.955542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="6.50494mm" pcbY="2.685542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="6.50494mm" pcbY="1.415542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="6.50494mm" pcbY="0.145542mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="6.50494mm" pcbY="-1.124458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="6.50494mm" pcbY="-2.394458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="6.500114mm" pcbY="-3.68935mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="6.50494mm" pcbY="-4.934458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="6.50494mm" pcbY="-6.204458mm" width="1.999996mm" height="0.8999982mm" shape="rect" />
<silkscreenpath route={[{"x":5.07606300000009,"y":7.811515999999983},{"x":6.499631399999885,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-5.0803809999999885,"y":-7.428484000000026},{"x":5.07961899999998,"y":-7.428484000000026},{"x":5.07961899999998,"y":-9.587483999999904},{"x":-5.0803809999999885,"y":-9.587483999999904},{"x":-5.0803809999999885,"y":-7.428484000000026}]} />
<silkscreenpath route={[{"x":3.806062999999881,"y":7.811515999999983},{"x":3.813682999999969,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":2.536063000000013,"y":7.811515999999983},{"x":2.543683000000101,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":1.266063000000031,"y":7.811515999999983},{"x":1.2736830000000054,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-0.003937000000064472,"y":7.811515999999983},{"x":0.0036830000000236396,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-1.2739370000000463,"y":7.811515999999983},{"x":-1.2663169999999582,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-2.543937000000028,"y":7.811515999999983},{"x":-2.5363170000000537,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-3.81393700000001,"y":7.811515999999983},{"x":-3.806316999999922,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":7.811515999999983},{"x":-5.076316999999904,"y":7.811515999999983}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-6.835647999999992},{"x":6.499631399999885,"y":-10.18847340000002}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-5.565648000000124},{"x":6.499631399999885,"y":-5.573267999999871}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-4.295648000000028},{"x":6.499631399999885,"y":-4.303267999999889}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-3.0256480000000465},{"x":6.499631399999885,"y":-3.033268000000021}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-1.7556480000000647},{"x":6.499631399999885,"y":-1.7632679999999255}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-0.4856479999999692},{"x":6.499631399999885,"y":-0.49326799999994364}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":0.7843519999998989},{"x":6.499631399999885,"y":0.7767320000000382}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":2.0543519999998807},{"x":6.499631399999885,"y":2.0467320000001337}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":3.324326600000063},{"x":6.499631399999885,"y":3.316732000000002}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":4.594351999999958},{"x":6.499631399999885,"y":4.5867066000000705}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":7.811515999999983},{"x":6.499631399999885,"y":5.856732000000079}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-6.835647999999992},{"x":-6.500393400000007,"y":-10.18847340000002}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-5.565673399999923},{"x":-6.500393400000007,"y":-5.573267999999871}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-4.295648000000028},{"x":-6.500393400000007,"y":-4.30329340000003}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-3.0256480000000465},{"x":-6.500393400000007,"y":-3.033268000000021}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-1.7556480000000647},{"x":-6.500393400000007,"y":-1.7632679999999255}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":-0.4856479999999692},{"x":-6.500393400000007,"y":-0.49326799999994364}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":0.7843519999998989},{"x":-6.500393400000007,"y":0.7767320000000382}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":2.0543519999998807},{"x":-6.500393400000007,"y":2.0467320000001337}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":3.324351999999976},{"x":-6.500393400000007,"y":3.316732000000002}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":4.594351999999958},{"x":-6.500393400000007,"y":4.586731999999984}]} />
<silkscreenpath route={[{"x":-6.500393400000007,"y":7.811515999999983},{"x":-6.500393400000007,"y":5.856732000000079}]} />
<silkscreenpath route={[{"x":6.499631399999885,"y":-10.18847340000002},{"x":-6.50036799999998,"y":-10.18847340000002}]} />
<silkscreencircle pcbX="6.985mm" pcbY="-7.063486mm" radius="0.127mm" />
<silkscreenrect pcbX="-3.238881mm" pcbY="-8.571484mm" width="1.397mm" height="0.508mm" strokeWidth="0.254mm" />
<silkscreentext text="{NAME}" pcbX="0.012319mm" pcbY="9.827516mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-7.743381000000113,"y":9.07751600000006},{"x":7.768018999999981,"y":9.07751600000006},{"x":7.768018999999981,"y":-10.447084000000018},{"x":-7.743381000000113,"y":-10.447084000000018},{"x":-7.743381000000113,"y":9.07751600000006}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C356849.obj?uuid=b3edabdd105b4c4bb978bf18f45b7e60",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C356849.step?uuid=b3edabdd105b4c4bb978bf18f45b7e60",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 1.1784837999999809, z: 0 },
      }}
      {...props}
    />
  )
}