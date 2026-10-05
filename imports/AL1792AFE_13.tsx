import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["EN"],
  pin2: ["PWM4","GND1"],
  pin3: ["PWM3","GND2"],
  pin4: ["PWM2","GND3"],
  pin5: ["PWM1"],
  pin6: ["LED1"],
  pin7: ["LED2","GND4"],
  pin8: ["GND5"],
  pin9: ["LED3","GND6"],
  pin10: ["LED4","GND7"],
  pin11: ["LEDPG"],
  pin12: ["FAULTB"],
  pin13: ["REF"],
  pin14: ["VIN"],
  pin15: ["EP"]
} as const

const pinAttributes = {
  pin8: {requiresGround: true},
  pin14: {requiresPower: true}
} as const

const footprinterPinLabels = {
  ...pinLabels,
  "pin15": [...pinLabels["pin15"], "thermalpad"],
} as const

export const AL1792AFE_13 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={footprinterPinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2678881"
  ]
}}
      manufacturerPartNumber="AL1792AFE-13"
      footprint="dfn14_thermalpad1.8mmx3.35mm_p0.5mm_w3.6mm_pw0.3mm_pl0.6mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2678881.obj?uuid=9f6cfa79ee03486793fdda859ff4c80b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2678881.step?uuid=9f6cfa79ee03486793fdda859ff4c80b",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000070253736, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}