import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"]
} as const

export const JS102011SAQN = (props: SwitchProps) => {
  const { name = "SW1", ...restProps } = props

  return (
    <switch
      type="spdt"
      name={name}
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":-0.24,"y":0.3},{"x":0.3,"y":0.3},{"x":0.18,"y":0.32}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="down" schX={-0.2} schY={-0.3} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="down" schX={0} schY={-0.3} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="down" schX={0.2} schY={-0.3} schStemLength={0.2} />
          <schematicrect schX={-0.1} schY={0.17} width={0.28} height={0.06} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.2,"y":-0.1},{"x":-0.2,"y":0.14},{"x":-0.18,"y":0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0.14},{"x":-0.22,"y":0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.1},{"x":0,"y":0.14},{"x":0.02,"y":0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.14},{"x":-0.02,"y":0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.1},{"x":0.2,"y":0.14},{"x":0.22,"y":0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.14},{"x":0.18,"y":0.08}]} strokeColor="#880000" />
          <schematictext text="{NAME}" schX={-0.054} schY={0.52} fontSize={0.2} anchor="center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C221660"
  ]
}}
      manufacturerPartNumber="JS102011SAQN"
      footprint={<footprint>
        <hole pcbX="-3.400044mm" pcbY="-1.75002825mm" diameter="0.999998mm" />
<hole pcbX="3.400044mm" pcbY="-1.75002825mm" diameter="0.999998mm" />
<smtpad portHints={["pin1"]} pcbX="-2.499995mm" pcbY="1.00002975mm" width="1.1999976mm" height="2.499995mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="1.00002975mm" width="1.1999976mm" height="2.499995mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="2.499995mm" pcbY="1.00002975mm" width="1.1999976mm" height="2.499995mm" shape="rect" />
<silkscreenpath route={[{"x":-0.20398740000007365,"y":-5.56396524999991},{"x":-0.20398740000007365,"y":-3.5319652499999847}]} />
<silkscreenpath route={[{"x":-1.7279874000000746,"y":-5.56396524999991},{"x":-0.20398740000007365,"y":-5.56396524999991}]} />
<silkscreenpath route={[{"x":-1.7279874000000746,"y":-3.5319652499999847},{"x":-1.7279874000000746,"y":-5.56396524999991}]} />
<silkscreenpath route={[{"x":4.5000164000000495,"y":-3.5500500499999816},{"x":-4.5000164000000495,"y":-3.550024649999955}]} />
<silkscreenpath route={[{"x":-4.5000164000000495,"y":-3.5500500499999816},{"x":-4.5000164000000495,"y":0.04996815000004062}]} />
<silkscreenpath route={[{"x":4.5000164000000495,"y":0.04999354999995376},{"x":4.5000164000000495,"y":-3.550024649999955}]} />
<silkscreenpath route={[{"x":-4.5000164000000495,"y":0.04996815000004062},{"x":-3.371138799999926,"y":0.04996815000004062}]} />
<silkscreenpath route={[{"x":-1.7088612000001149,"y":0.04996815000004062},{"x":-0.8311388000000761,"y":0.04996815000004062}]} />
<silkscreenpath route={[{"x":0.8311387999999624,"y":0.04996815000004062},{"x":1.7088612000000012,"y":0.04996815000004062}]} />
<silkscreenpath route={[{"x":3.371138799999926,"y":0.04996815000004062},{"x":4.5000164000000495,"y":0.04996815000004062}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.23777175mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-0.21600160000002688,"y":-5.527948049999964},{"x":-0.21600160000002688,"y":-3.5719448500000226},{"x":-0.2279903999999533,"y":-3.5599560499999825},{"x":-1.6799813999999742,"y":-3.5599560499999825},{"x":-1.6919956000000411,"y":-3.5719702499999357},{"x":-1.6919956000000411,"y":-5.49195624999993},{"x":-1.667992599999934,"y":-5.5159592499999235},{"x":-0.21600160000002688,"y":-5.527948049999964}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.749991000000023,"y":2.5000272500000165},{"x":4.749990999999909,"y":2.5000272500000165},{"x":4.749990999999909,"y":-5.775966849999918},{"x":-4.749991000000023,"y":-5.775966849999918},{"x":-4.749991000000023,"y":2.5000272500000165}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C221660.obj?uuid=d337b619ac8046ecb63111370d25527b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C221660.step?uuid=d337b619ac8046ecb63111370d25527b",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 1.7459756499999777, z: -0.8000016000000002 },
      }}
      {...restProps}
    />
  )
}