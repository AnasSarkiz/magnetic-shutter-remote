import objPath from "./LPS3015_152MRC.obj"
import stepPath from "./LPS3015_152MRC.step"
import type { InductorProps } from "@tscircuit/props"

export const LPS3015_152MRC = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="1.5uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C17382749"
  ]
}}
      manufacturerPartNumber="LPS3015-152MRC"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.19253mm" pcbY="0mm" width="1.499997mm" height="3.2399986mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="1.19253mm" pcbY="0mm" width="1.499997mm" height="3.2399986mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":-0.7499858000000046,"y":-1.8400013999999913},{"x":-2.031187200000005,"y":-1.8485611999999918},{"x":-2.183587199999991,"y":-1.6961866000000043},{"x":-2.183587199999991,"y":1.6962120000000027},{"x":-2.031187200000005,"y":1.8485866000000044},{"x":-0.9395968000000039,"y":1.8485866000000044}]} />
<silkscreenpath route={[{"x":0.7499857999999904,"y":1.8400014000000056},{"x":2.031187200000005,"y":1.8485866000000044},{"x":2.183587200000005,"y":1.6961866000000185},{"x":2.183587200000005,"y":-1.6961866000000043},{"x":2.031187200000005,"y":-1.8485865999999902},{"x":0.9395968000000039,"y":-1.8485865999999902}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="2.8542mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.1925284999999946,"y":1.8699993000000035},{"x":2.1925284999999946,"y":1.8699993000000035},{"x":2.1925284999999946,"y":-1.8699993000000035},{"x":-2.1925284999999946,"y":-1.8699993000000035},{"x":-2.1925284999999946,"y":1.8699993000000035}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.1 },
      }}
      {...props}
    />
  )
}