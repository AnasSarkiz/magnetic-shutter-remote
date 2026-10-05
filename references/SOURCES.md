# Reference inspection log

Access date: 2026-10-01. Primary functional references were inspected before circuit design. R0 intake findings below are historical; R1 source and previews now exist.

| Reference | Access and finding | Limitation |
| --- | --- | --- |
| [Amazon B0CG8XK5KC](https://www.amazon.com/dp/B0CG8XK5KC?th=1) | Web reader failed; browser successfully opened the Pink Standard Grip listing. It describes detachable wireless control, rechargeable Type-C remote and separate accessories. | Retail/exterior size fields are not internal PCB geometry. No pinout, battery specification or internal dimensioned drawing established. |
| [JJC demonstration](https://youtube.com/shorts/QEAleYOqQgk) | Web reader failed; browser opened the 27-second JJC Photography Global clip. Inspected opening/unboxing and grip-on-phone frames around 10 and 15 seconds, title and description. | Selected frames reviewed, not a frame-by-frame teardown. No dimensional measurements, internal PCB view or electrical verification obtained. |
| [JJC MSG-P1](https://jjc.cc/index/goods/detail.html?id=1701) | Manufacturer confirms magnetically retained detachable remote, iOS/Android marketing compatibility, Type-C recharge, red charging/blue completion indication, and separate optional light. | Claims describe the reference product, not this new design. No internal mechanical drawing or cell datasheet established. |
| [tscircuit docs](https://docs.tscircuit.com/) | Read introduction and [JLCPCB import workflow](https://docs.tscircuit.com/guides/importing-modules-and-chips/importing-from-jlcpcb); inspected installed CLI help. | Examples are not verified components for this board. |
| [tscircuit handbook](https://github.com/tscircuit/handbook) | Read current `guides/code.md` and `guides/bootstrapping-repos.md` from official raw files. | Workspace validation/isolation instructions take precedence over generic scaffolding conventions. |
| [Schematic sheet API](https://docs.tscircuit.com/elements/schematicsheet) | Confirmed installed props type supports `sheetSize: "A4"` and sheet children; excerpt saved. | Two A4 schematic sheets now exist; see VALIDATION.md for current inspection status. |
| [Ebyte E73-2G4M08S1C](https://www.ebyte.com/product/444.html) | Saved manufacturer product HTML and linked [manual](https://www.ebyte.com/downpdf/444.html). Visually inspected PDF page 6 / printed page 5. | Module dimensions do not define remote PCB dimensions. Full electrical/footprint/3D validation pending. |
| [Ebyte English manual mirror](https://devzone.nordicsemi.com/cfs-file/__key/support-attachments/beef5d1b77644c448dabff31668f3a47-501ceb3d34d541b591f720b20ce1b1ba/E73_2D00_2G4M08S1C_5F00_Usermanual_5F00_v1.9.pdf) | Web text accessible; direct PDF download returned HTTP 403. Used manufacturer's own Chinese PDF for actual local visual inspection. | Do not imply the English mirror was downloaded or its screenshot successfully inspected. |

The manufacturer drawing gives module body 13.0 ± 0.1 mm × 18.0 ± 0.1 mm, height 3.00 ± 0.10 mm, pad count 43 and nominal 1.27 mm edge pitch. The same page states the 32.768 kHz crystal is external. Those facts concern the candidate module only. Antenna geometry, every land and the CAD model still need full validation against the accepted component revision.

## R1 additional sources

Battery, power and component references are linked in REQUIREMENTS.md, SOURCING.md and BOM.md. Local Ebyte, TI, PKCELL and rejected SparkFun PDFs are preserved. Official JLCPCB pages were inspected in the browser on 2026-10-01; BOM.json records observations rather than treating cached search stock as live allocation.

Phone behavior references: [Apple Camera basics](https://support.apple.com/guide/iphone/camera-basics-iph263472f78/ios) and [Samsung camera modes/settings](https://www.samsung.com/us/support/answer/ANS10001353/), checked 2026-10-01. These document volume-button camera controls, not successful operation of this BLE implementation.

## R2 superseding review

R2 now includes three A4 sheets, a numerical 43-pad Ebyte audit and original enclosure CAD. Battery selection is the revised DATA POWER DTP401525(PHR) specification, not the older contradictory harness drawing. TI BQ25185, TMP390 and TPS3839 datasheets, JST PH/SH drawings, GCT USB4105/USB4125 drawings and alternative connector PDFs are preserved alongside the original sources. Electrical review and the USB alternative audit explicitly distinguish accepted pin/rating evidence, landing assumptions and rejected supplier geometry.

Tooling source review additionally used current handbook code/API/yalc guides and [EasyEDA standard format](https://docs.easyeda.com/en/DocumentFormat/EasyEDA-Format-Standard/), whose PAD holeLength field supplies the declared slot length. Gerber transform syntax was checked against [Ucamco documentation](https://www.ucamco.com/en/gerber/downloads). The independent Gerbonara 1.5.0 reader does not support G85 slots; this limitation and the separate numeric drill audit are retained rather than silently rewriting exports.
