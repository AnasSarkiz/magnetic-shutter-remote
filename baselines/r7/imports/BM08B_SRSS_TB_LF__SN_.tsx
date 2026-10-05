import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"]
} as const

export const BM08B_SRSS_TB_LF__SN_ = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C160394"
  ]
}}
      manufacturerPartNumber="BM08B-SRSS-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="3.497834mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="2.497836mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin3"]} pcbX="1.497838mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin4"]} pcbX="0.49784mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin5"]} pcbX="-0.501904mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin6"]} pcbX="-1.501902mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin7"]} pcbX="-2.502154mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin8"]} pcbX="-3.502152mm" pcbY="1.3742416mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin9"]} pcbX="-4.800092mm" pcbY="-1.1492484mm" width="1.499997mm" height="1.999996mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin10"]} pcbX="4.800092mm" pcbY="-1.1492484mm" width="1.499997mm" height="1.999996mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":5.000015400000052,"y":0.8327897999997731},{"x":4.029100400000175,"y":0.8327897999997731}]} />
<silkscreenpath route={[{"x":-4.033164399999919,"y":0.8327897999997731},{"x":-5.000015399999938,"y":0.8327897999997731}]} />
<silkscreenpath route={[{"x":-5.000015399999938,"y":0.8327897999997731},{"x":-5.000015399999938,"y":0.08191499999986718}]} />
<silkscreenpath route={[{"x":5.000015400000052,"y":0.8327897999997731},{"x":5.000015400000052,"y":0.08191499999986718}]} />
<silkscreenpath route={[{"x":3.818839200000184,"y":-2.049195800000234},{"x":-3.7836601999999857,"y":-2.049195800000234}]} />
<silkscreencircle pcbX="4.499864mm" pcbY="1.6124936mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.0081534mm" pcbY="3.1377656mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.800090499999897,"y":2.3992463999999245},{"x":5.80009050000001,"y":2.3992463999999245},{"x":5.80009050000001,"y":-2.399246400000038},{"x":-5.800090499999897,"y":-2.399246400000038},{"x":-5.800090499999897,"y":2.3992463999999245}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160394.obj?uuid=e487431513304d7f87bd1cf19ba8fa52",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160394.step?uuid=e487431513304d7f87bd1cf19ba8fa52",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 3.5299466000001303, y: -0.6325153000002228, z: -0.01 },
      }}
      {...props}
    />
  )
}