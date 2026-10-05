import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const MSK12C02 = (props: SwitchProps) => {
  const { name = "SW1", ...restProps } = props

  return (
    <switch
      type="spdt"
      name={name}
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":0.18,"y":-0.36},{"x":0.22,"y":-0.36}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.16,"y":-0.34},{"x":0.24,"y":-0.34}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.14,"y":-0.32},{"x":0.26,"y":-0.32}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.6,"y":-0.2},{"x":0.52,"y":-0.2},{"x":0.52,"y":-0.28},{"x":0.2,"y":-0.28},{"x":0.2,"y":-0.32}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.18,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.22,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":0},{"x":0.38,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":0.2},{"x":0.4,"y":0},{"x":0.42,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.14,"y":0},{"x":-0.04,"y":0},{"x":-0.04,"y":-0.1},{"x":0.34,"y":-0.1},{"x":0.34,"y":0},{"x":0.46,"y":0},{"x":0.46,"y":-0.2},{"x":-0.16,"y":-0.2},{"x":-0.16,"y":0},{"x":-0.14,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0},{"x":-0.12,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.14},{"x":-0.1,"y":0.14},{"x":-0.1,"y":0},{"x":-0.08,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.06},{"x":0.2,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.2},{"x":0.2,"y":0.06}]} strokeColor="#880000" />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={1} schY={0} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="up" schX={0.4} schY={0.6} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0.2} schY={0.6} schStemLength={0.4} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="up" schX={-0.4} schY={0.6} schStemLength={0.4} />
          <schematicrect schX={0} schY={-0.1} width={1.2} height={0.6} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0.2},{"x":-0.4,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0.06},{"x":-0.4,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0},{"x":-0.38,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0},{"x":-0.42,"y":0.06}]} strokeColor="#880000" />
          <schematictext text="{NAME}" schX={0.206} schY={0.82} fontSize={0.2} anchor="center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C431540"
  ]
}}
      manufacturerPartNumber="MSK12C02"
      footprint={<footprint>
        <hole pcbX="-1.49987mm" pcbY="-0.75616435mm" diameter="0.9000236mm" />
<hole pcbX="1.500124mm" pcbY="-0.75616435mm" diameter="0.9000236mm" />
<smtpad portHints={["pin4"]} pcbX="3.599942mm" pcbY="0.39394765mm" width="1.1999976mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="3.599942mm" pcbY="-1.90602235mm" width="1.1999976mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.599942mm" pcbY="-1.90602235mm" width="1.1999976mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.599942mm" pcbY="0.39394765mm" width="1.1999976mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="2.249932mm" pcbY="1.49402165mm" width="0.5999988mm" height="1.524mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.750062mm" pcbY="1.49402165mm" width="0.5999988mm" height="1.524mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-2.249932mm" pcbY="1.49402165mm" width="0.5999988mm" height="1.524mm" shape="rect" />
<silkscreenpath route={[{"x":0.1500124000000369,"y":-3.736016149999841},{"x":1.4254734000001008,"y":-3.736016149999841},{"x":1.4254734000001008,"y":-2.1359939499999427}]} />
<silkscreenpath route={[{"x":0.1500124000000369,"y":-2.1359939499999427},{"x":0.1500124000000369,"y":-3.736016149999841}]} />
<silkscreenpath route={[{"x":3.399993199999926,"y":-0.1500695499998983},{"x":3.399993199999926,"y":-1.3500671499998589}]} />
<silkscreenpath route={[{"x":-3.399993199999926,"y":-0.1500695499998983},{"x":-3.399993199999926,"y":-1.3500671499998589}]} />
<silkscreenpath route={[{"x":-2.749981799999887,"y":-2.1560345499999585},{"x":2.7500325999999404,"y":-2.1560345499999585}]} />
<silkscreenpath route={[{"x":2.768879399999946,"y":0.7439342500000521},{"x":2.7588971999999785,"y":0.7439342500000521}]} />
<silkscreenpath route={[{"x":-1.4999970000001213,"y":0.7439342500000521},{"x":0,"y":0.7439342500000521}]} />
<silkscreentext text="{NAME}" pcbX="-0.005842mm" pcbY="3.25017965mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":0.09997439999995095,"y":-2.1560345499999585},{"x":0.09997439999995095,"y":-3.60599354999988},{"x":1.4999715999999808,"y":-3.60599354999988},{"x":1.4999715999999808,"y":-2.0059967499998947},{"x":1.299972000000139,"y":-2.0059967499998947},{"x":1.299972000000139,"y":-3.4059939499999246},{"x":0.29997400000002017,"y":-3.4059939499999246},{"x":0.29997400000002017,"y":-2.0059967499998947},{"x":0.09997439999995095,"y":-2.0059967499998947},{"x":0.09997439999995095,"y":-2.1560345499999585}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-0.21501100000000406,"y":-2.610999349999929},{"x":-0.21501100000000406,"y":-2.9810011499998836},{"x":-1.4349984000000404,"y":-2.9810011499998836},{"x":-1.4349984000000404,"y":-3.2509777499998336},{"x":-1.4350237999999536,"y":-3.2509777499998336},{"x":-1.9050000000000864,"y":-2.781001549999928},{"x":-1.4349984000000404,"y":-2.3810023499999033},{"x":-1.4349984000000404,"y":-2.6209815499998967},{"x":-0.21501100000000406,"y":-2.610999349999929}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.449940799999922,"y":2.5060216499999797},{"x":4.449940799999922,"y":2.5060216499999797},{"x":4.449940799999922,"y":-3.8060825499998145},{"x":-4.449940799999922,"y":-3.8060825499998145},{"x":-4.449940799999922,"y":2.5060216499999797}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C431540.obj?uuid=fc12522ae2f04394b021187ce17b23bb",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C431540.step?uuid=fc12522ae2f04394b021187ce17b23bb",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000025400000026820635, y: -0.7060877499999378, z: -0.0000010000000000287557 },
      }}
      {...restProps}
    />
  )
}