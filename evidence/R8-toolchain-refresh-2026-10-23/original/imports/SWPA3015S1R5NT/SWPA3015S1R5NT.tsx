import objPath from "./SWPA3015S1R5NT.obj"
import stepPath from "./SWPA3015S1R5NT.step"
import type { InductorProps } from "@tscircuit/props"

export const SWPA3015S1R5NT = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="1.5uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C56594"
  ]
}}
      manufacturerPartNumber="SWPA3015S1R5NT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="1.35001mm" pcbY="0mm" width="1.2999974mm" height="2.7200098mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<smtpad portHints={["pin2"]} pcbX="-1.35001mm" pcbY="0mm" width="1.2999974mm" height="2.7200098mm" shape="rect" solderPasteMargin="0mm" solderMaskMargin="0.0508mm" />
<silkscreenpath route={[{"x":-1.5761970000000929,"y":1.512392200000022},{"x":-1.5761970000000929,"y":1.5761970000000929},{"x":1.5761969999998655,"y":1.5761970000000929},{"x":1.5761969999998655,"y":1.512392200000022}]} />
<silkscreenpath route={[{"x":-1.5761970000000929,"y":-1.512392200000022},{"x":-1.5761970000000929,"y":-1.5761969999999792},{"x":1.5761969999998655,"y":-1.5761969999999792},{"x":1.5761969999998655,"y":-1.512392200000022}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="2.5748mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.2500087000000804,"y":1.7499969999998939},{"x":2.2500086999999667,"y":1.7499969999998939},{"x":2.2500086999999667,"y":-1.7499970000000076},{"x":-2.2500087000000804,"y":-1.7499970000000076},{"x":-2.2500087000000804,"y":1.7499969999998939}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}