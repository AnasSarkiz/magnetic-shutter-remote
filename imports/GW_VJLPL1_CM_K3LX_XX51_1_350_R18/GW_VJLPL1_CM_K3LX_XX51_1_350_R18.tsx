import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["C"],
  pin2: ["A"]
} as const

export const GW_VJLPL1_CM_K3LX_XX51_1_350_R18 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath svgPath="M -0.32 0.26 L -0.24 0.22 L -0.28 0.18 Z" strokeColor="#880000" />
          <schematicpath svgPath="M -0.24 0.34 L -0.16 0.3 L -0.2 0.26 Z" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.18,"y":0.12},{"x":-0.26,"y":0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0.2},{"x":-0.18,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0},{"x":-0.2,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.1,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0.14},{"x":-0.1,"y":-0.14}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0.1 0.14 L -0.1 0 L 0.1 -0.14 Z" strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["C"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["A"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <schematictext text="{NAME}" schX={0} schY={0.54} fontSize={0.2} anchor="center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C34312856"
  ]
}}
      manufacturerPartNumber="GW VJLPL1.CM-K3LX-XX51-1-350-R18"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="0.3999992mm" pcbY="0.0000254mm" width="0.499999mm" height="1.35001mm" shape="rect" solderMaskMargin="0.0499999mm" />
<smtpad portHints={["pin1"]} pcbX="-0.3999992mm" pcbY="0.0000254mm" width="0.499999mm" height="1.35001mm" shape="rect" solderMaskMargin="0.0499999mm" />
<silkscreenrect pcbX="0mm" pcbY="0mm" width="1.5999968mm" height="1.5999968mm" strokeWidth="0.151999696mm" />
<silkscreentext text="{NAME}" pcbX="0.1080008mm" pcbY="1.7874254mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-0.14998700000001008,"y":-0.1499869999998964},{"x":-0.14998700000001008,"y":0.1500124000000369},{"x":-0.3499866000000793,"y":0.000025400000026820635},{"x":-0.14998700000001008,"y":-0.1499869999998964}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.27500579999980346,"y":0.025018999999929292},{"x":0.27500579999980346,"y":-0.02496819999987565},{"x":0.5249926000000187,"y":-0.02496819999987565},{"x":0.5249926000000187,"y":0.025018999999929292},{"x":0.27500579999980346,"y":0.025018999999929292}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.37503099999992173,"y":-0.12496799999985342},{"x":0.42501819999995405,"y":-0.12496799999985342},{"x":0.42501819999995405,"y":0.12501880000002075},{"x":0.37503099999992173,"y":0.12501880000002075},{"x":0.37503099999992173,"y":-0.12496799999985342}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-0.6240017999999736,"y":0.025018999999929292},{"x":-0.6240017999999736,"y":-0.02496819999987565},{"x":-0.3740149999999858,"y":-0.02496819999987565},{"x":-0.3740149999999858,"y":0.025018999999929292},{"x":-0.6240017999999736,"y":0.025018999999929292}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-1.0563992000001008,"y":1.0374254000000747},{"x":1.2724007999999003,"y":1.0374254000000747},{"x":1.2724007999999003,"y":-1.0627746000001252},{"x":-1.0563992000001008,"y":-1.0627746000001252},{"x":-1.0563992000001008,"y":1.0374254000000747}]} />
      </footprint>}
      
      {...props}
    />
  )
}