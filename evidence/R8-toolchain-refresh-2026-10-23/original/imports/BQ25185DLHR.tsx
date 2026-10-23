import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["SYS"],
  pin2: ["BAT"],
  pin3: ["STAT2"],
  pin4: ["N_CE"],
  pin5: ["GND"],
  pin6: ["TS","MR"],
  pin7: ["ILIM","VSET"],
  pin8: ["ISET"],
  pin9: ["STAT1"],
  pin10: ["IN"],
  pin11: ["EP"]
} as const

const pinAttributes = {
  pin5: {requiresGround: true}
} as const

export const BQ25185DLHR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C19725033"
  ]
}}
      manufacturerPartNumber="BQ25185DLHR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.799973mm" pcbY="-1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.399923mm" pcbY="-1.049782mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.000127mm" pcbY="-1.049782mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.399923mm" pcbY="-1.049782mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.799973mm" pcbY="-1.049782mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.799973mm" pcbY="1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="0.399923mm" pcbY="1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.000127mm" pcbY="1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-0.399923mm" pcbY="1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-0.799973mm" pcbY="1.050036mm" width="0.1999996mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-0.000127mm" pcbY="0mm" width="1.499997mm" height="0.8999982mm" shape="rect" />
<silkscreenpath route={[{"x":-1.1311890000001767,"y":1.143101599999909},{"x":-1.1430254000001696,"y":1.143101599999909},{"x":-1.1430254000001696,"y":0.0001015999999935957}]} />
<silkscreenpath route={[{"x":1.131061999999929,"y":-1.1428984000000355},{"x":1.1429745999998886,"y":-1.1428984000000355},{"x":1.1429745999998886,"y":1.143101599999909},{"x":1.131061999999929,"y":1.143101599999909}]} />
<silkscreenpath route={[{"x":-1.1430254000001696,"y":0.0001015999999935957},{"x":-1.1430254000001696,"y":-1.1428984000000355},{"x":-1.1311890000001767,"y":-1.1428984000000355}]} />
<silkscreentext text="{NAME}" pcbX="-0.157861mm" pcbY="2.295908mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.255027200000086,"y":1.5500354999999217},{"x":1.2549509999998918,"y":1.5500354999999217},{"x":1.2549509999998918,"y":-1.5500354999999217},{"x":-1.255027200000086,"y":-1.5500354999999217},{"x":-1.255027200000086,"y":1.5500354999999217}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19725033.obj?uuid=84b6971711e948be84ed2f33439ec745",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19725033.step?uuid=84b6971711e948be84ed2f33439ec745",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.00007619999996677507, y: -0.005038100000210766, z: -0.02 },
      }}
      {...props}
    />
  )
}