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
  pin9: ["pin9"]
} as const

export const BM07B_SRSS_TB_LF__SN_ = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C160393"
  ]
}}
      manufacturerPartNumber="BM07B-SRSS-TB(LF)(SN)"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="2.999994mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="1.999996mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin3"]} pcbX="0.999998mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin4"]} pcbX="0mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin5"]} pcbX="-0.999998mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin6"]} pcbX="-1.999996mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin7"]} pcbX="-2.999994mm" pcbY="1.3250037mm" width="0.5999988mm" height="1.5500096mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin8"]} pcbX="-4.299966mm" pcbY="-1.2000103mm" width="1.1999976mm" height="1.7999964mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin9"]} pcbX="4.299966mm" pcbY="-1.2000103mm" width="1.1999976mm" height="1.7999964mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":4.5000164000000495,"y":1.0249789000000646},{"x":4.5000164000000495,"y":-0.06882129999996778}]} />
<silkscreenpath route={[{"x":3.531133399999817,"y":1.0249789000000646},{"x":4.5000164000000495,"y":1.0249789000000646}]} />
<silkscreenpath route={[{"x":-4.5000164000000495,"y":1.0249789000000646},{"x":-3.5311334000000443,"y":1.0249789000000646}]} />
<silkscreenpath route={[{"x":3.4999930000000177,"y":-1.874989899999946},{"x":-3.4999930000001314,"y":-1.874989899999946}]} />
<silkscreenpath route={[{"x":-4.5000164000000495,"y":1.0249789000000646},{"x":-4.5000164000000495,"y":-0.06882129999996778}]} />
<silkscreencircle pcbX="3.7100002mm" pcbY="1.6224885mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.0920837mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.149964800000021,"y":2.350008500000172},{"x":5.149964799999907,"y":2.350008500000172},{"x":5.149964799999907,"y":-2.350008500000058},{"x":-5.149964800000021,"y":-2.350008500000058},{"x":-5.149964800000021,"y":2.350008500000172}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160393.obj?uuid=57f411570dd7482b9205d313fa2d2714",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C160393.step?uuid=57f411570dd7482b9205d313fa2d2714",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 3, y: -0.34546990000009825, z: -0.01 },
      }}
      {...props}
    />
  )
}