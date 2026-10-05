import objPath from "./ESPC2_12_N4.obj"
import stepPath from "./ESPC2_12_N4.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["EN"],
  pin2: ["IO0"],
  pin3: ["IO1"],
  pin4: ["IO2"],
  pin5: ["IO3"],
  pin6: ["IO4"],
  pin7: ["IO5"],
  pin8: ["VCC"],
  pin9: ["GND"],
  pin10: ["IO6"],
  pin11: ["IO7"],
  pin12: ["IO9"],
  pin13: ["IO10"],
  pin14: ["IO18"],
  pin15: ["RXD0"],
  pin16: ["TXD0"]
} as const

const pinAttributes = {
  pin8: {requiresPower: true},
  pin9: {requiresGround: true}
} as const

export const ESPC2_12_N4 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C19949080"
  ]
}}
      manufacturerPartNumber="ESPC2-12-N4"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-7.750048mm" pcbY="6.999986mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin2"]} pcbX="-7.750048mm" pcbY="4.99999mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin3"]} pcbX="-7.750048mm" pcbY="2.999994mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin4"]} pcbX="-7.750048mm" pcbY="0.999998mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin5"]} pcbX="-7.750048mm" pcbY="-0.999998mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin6"]} pcbX="-7.750048mm" pcbY="-2.999994mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin7"]} pcbX="-7.750048mm" pcbY="-4.99999mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin8"]} pcbX="-7.750048mm" pcbY="-6.999986mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin9"]} pcbX="7.750048mm" pcbY="-6.999986mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin10"]} pcbX="7.74954mm" pcbY="-4.99999mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin11"]} pcbX="7.74954mm" pcbY="-2.999994mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin12"]} pcbX="7.74954mm" pcbY="-0.999998mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin13"]} pcbX="7.74954mm" pcbY="0.999998mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin14"]} pcbX="7.74954mm" pcbY="2.999994mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin15"]} pcbX="7.74954mm" pcbY="4.99999mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin16"]} pcbX="7.74954mm" pcbY="6.999986mm" width="1.499997mm" height="0.999998mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0499999mm" />
<silkscreenpath route={[{"x":-8.012353799999971,"y":15.500070599999994},{"x":7.987614199999996,"y":15.500070599999994}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":7.731124999999992},{"x":7.987614199999996,"y":15.500070599999994}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":5.731128999999996},{"x":7.987614199999996,"y":6.268846999999994}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":3.7311329999999856},{"x":7.987614199999996,"y":4.268850999999998}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":1.7311369999999897},{"x":7.987614199999996,"y":2.268854999999988}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":-0.2688590000000062},{"x":7.987614199999996,"y":0.2688590000000062}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":-2.268855000000002},{"x":7.987614199999996,"y":-1.731137000000004}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":-4.268850999999998},{"x":7.987614199999996,"y":-3.731133000000014}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":-6.268847000000008},{"x":7.987614199999996,"y":-5.731128999999996}]} />
<silkscreenpath route={[{"x":7.987614199999996,"y":-8.499881400000007},{"x":7.987614199999996,"y":-7.731125000000006}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":7.731124999999992},{"x":-8.012353799999971,"y":15.500070599999994}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":5.731128999999996},{"x":-8.012353799999971,"y":6.268846999999994}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":3.7311329999999856},{"x":-8.012353799999971,"y":4.268850999999998}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":1.7311369999999897},{"x":-8.012353799999971,"y":2.268854999999988}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-0.2688590000000062},{"x":-8.012353799999971,"y":0.2688590000000062}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-2.268855000000002},{"x":-8.012353799999971,"y":-1.731137000000004}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-4.268850999999998},{"x":-8.012353799999971,"y":-3.731133000000014}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-6.268847000000008},{"x":-8.012353799999971,"y":-5.731128999999996}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-8.499881400000007},{"x":-8.012353799999971,"y":-7.731125000000006}]} />
<silkscreenpath route={[{"x":-8.012353799999971,"y":-8.499881400000007},{"x":7.987614199999996,"y":-8.499881400000007}]} />
<silkscreencircle pcbX="-9.0000328mm" pcbY="6.999986mm" radius="0.1999996mm" />
<silkscreentext text="{NAME}" pcbX="-0.357632mm" pcbY="16.531592mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-8.750046499999996,"y":15.749968999999993},{"x":8.75004650000001,"y":15.749968999999993},{"x":8.75004650000001,"y":-8.749983000000014},{"x":-8.750046499999996,"y":-8.749983000000014},{"x":-8.750046499999996,"y":15.749968999999993}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000050799999982586996, y: -3.4999930000000035, z: -0.21 },
      }}
      {...props}
    />
  )
}