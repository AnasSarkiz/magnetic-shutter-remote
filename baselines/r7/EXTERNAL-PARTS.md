# External parts — not JLCPCB assembly

These have no invented C-numbers. PCB sockets remain in the electronic BOM. This list supersedes the R1 PKCELL battery choice.

| Item | Quantity | Identity / source | Installation and status |
|---|---:|---|---|
| Protected battery and attached harness | 1 | DATA POWER **DTP401525(PHR)**, 3.7 V 110 mAh; [Sengoku EEHD-53KN](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-53KN), [Marutsu 836348](https://www.marutsu.co.jp/GoodsDetail.jsp?salesGoodsCode=836348); [manufacturer specification v2](https://www.sengoku.co.jp/item/pdf/SPE-DTP401525(PHR)-3.7V-110mAh-en-2.0ver.pdf) | Max 15.5×27×4.2 mm, 100±3 mm leads with PH plug. Revised drawing: red positive, black negative. Verify delivered polarity by meter before mating J2. Externally installed, not PCB assembly. |
| Retention magnets | 8 | [K&J **D42**](https://www.kjmagnetics.com/d42-neodymium-disc-magnet), N42, Ø6.35×3.175 mm | Two remote, two dock, four phone interface. Retain under insulating caps/adhesive. Force, polarity, bond and drop testing pending. |
| Battery temperature interface | One cut 2×2 mm piece | BERGQUIST **GP1500-0.080-02-0404**, DigiKey **BER164-ND**, 2.032 mm nominal sheet; manufacturer TGP1500 datasheet in references | Bridge nominal 1.7 mm sensor-to-cell gap, ~16.3% compression. Actual pressure/contact and cell-to-sensor thermal lag pending. No hard pouch clamping. |
| Remote base/lid, grip, magnet caps | 1 set | Original `mechanical/remote-and-grip.scad`; seven part types in `mechanical/stl/` | Unfilled nonconductive polymer. Dimensions/tolerances in PDF; not tested prints. |
| Shutter/pair plungers | 2 | Original TPU part in CAD | Nominal 0.2 mm free gap plus 0.2±0.1 switch travel; measure force and overtravel. |
| Power slider | 1 | Original CAD part | Captures 1.3 mm actuator with 1.7 mm fork; 1.6 mm travel. |
| Lid screws | 2 | M2×14, blunt end, appropriate head for CAD counterbore | Mechanical specification, vendor SKU not locked. Verify actual engagement and pouch exclusion before assembly. |
| Phone receiver plate | 1 | Original 45×45×0.5 mm mild-steel plate, rounded/deburred, adhesive-backed | Fabricated mechanical item, not a certified MagSafe accessory. Position per drawing; verify retention, phone/case suitability and RF. |
| Cell bed shims, insulation, strain relief and magnet adhesive | As required | Nonconductive materials compatible with the battery pouch | Establish cell bottom Z=8.3±0.1 after measuring thickness. Qualify adhesive/materials with delivered parts; no unverified solvent exposure. |
| SWD mating cable and probe | 1 setup | JST SH six-position mating harness; compatible J-Link SWD probe | External test equipment; cavity mapping must match firmware/README.md. Vendor cable SKU not locked. Lid removed for access; Vref is sense-only. |
| USB-C source/cable | 1 test setup | Regulated 5 V USB-C source and compliant cable | Test both orientations; charging only. Copper/drill/export checks pass; production stencil/shell process qualification pending; engineering prototype inspection and possible manual shell rework authorized. |

The battery, thermal interface, magnets and printed parts are not physically fitted yet. Battery swelling, wire bends/abrasion, actuator tolerances, magnetic retention and thermal gradients remain acceptance tests. Separate fill-light hardware is excluded.
