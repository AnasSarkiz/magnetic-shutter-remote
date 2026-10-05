# Shutter-only board cost comparison — 2026-10-05

Planning estimates only. No supplier upload, quote submission, order or payment.
No PCB, routing, BOM, CPL, Circuit JSON or frozen baseline changed.
Analysis starts from source/review commit `636d2b24eb4db775fceeb81206541f249db3b9a5`.

## Quantity comparison

| Finished assembled boards | Fitted component subtotal | Estimated delivered batch, San Francisco | Estimated per board |
|---|---:|---:|---:|
| 5 | $63.23 | $282.03–$382.68 | $56.41–$76.54 |
| 10 | $117.73 | $397.17–$505.15 | $39.72–$50.52 |
| 20 | $227.05 | $591.51–$719.16 | $29.58–$35.96 |

Battery, printed enclosure/grip, magnets, cables, programmer, assembly labor and physical testing are excluded. This is an assembled-PCB comparison, not a completed-device quotation.

## Reproducible basis

- Exact fitted quantities from `bom.json`: 37 refs, 24 identities, TOP only, no substitutions.
- Unit-price tiers from official public JLC pages archived in `../sourcing/` on 2026-10-04; source URLs and SHA256 values in `cost-model.json`. These are component-listing prices, not reserved PCBA prices. See `component-costs.csv` for all 72 quantity/part rows.
- The quantity-tier lookup is `startNumber <= fitted quantity × board count <= endNumber`; `endNumber = -1` is unbounded. No attrition/MOQ rounding in the component subtotal; those remain allowances.
- Standard single-side setup $25.56, stencil $8.21, feeders 24 × $1.53, placement review $0.45; packing $0.50 + $0.00003 × 20.16 cm² × quantity.
- U1 X-ray: $1.64 each through 10 units, $0.82 each for 11–50. No other current listed part has its X-ray flag set; actual order processing can add requirements.
- Assembly budget uses $0.48 per finished board as a minimum-charge allowance, not an exact joint quote. Actual panelized pricing may differ.
- PCB/ENIG/attrition allowances are $30–60 / $40–75 / $55–100 for 5/10/20. Optional fixture/storage/extra processing allowance is $0–25 per batch. These are unquoted engineering budget assumptions.
- Freight allowances are $25–45 / $30–50 / $35–60. No actual courier rate was obtained. Shipping depends on supplier-packed weight, destination and checkout availability.
- 35% import-duty assumption is provisional; exact product classification/rate must be confirmed at checkout. Do not add duty twice if included in DDP charges.
- 8.625% San Francisco sales/use-tax rate; model provisionally applies it to goods plus duty. Actual taxable basis and collection may differ.
- Formula: `(components + fixed fees + X-ray + assembly allowance + PCB/attrition + optional processing) × 1.35 × 1.08625 + freight`. No coupons assumed. This range is not a guarantee or an upper bound on actual supplier charges.

## Lowest-cost path without changing the board

Five boards minimize total prototype spending among these quantities; twenty reduce average unit cost but increase spend substantially. Keep five for first hardware testing. Choose the least expensive acceptable DDP shipping actually offered at checkout and apply valid account coupons. Print the enclosure locally where a real quote supports savings. Do not increase quantity solely to obtain a lower displayed unit price before hardware tests.

U1 is $38.17 of the $63.23 five-board fitted-component subtotal (about 60%). A later cheaper-radio design may reduce parts cost and remove the Standard-only constraint, but no replacement is selected, qualified or approved here. The module's 43-pad footprint includes hidden joints; manually installing it is not proposed as a beginner cost-saving step.

Economic assembly is not currently available for the full fitted BOM because U1 is Standard-only. Even a future eligible BOM would not automatically save all feeder fees: Economic charges Extended feeders while Standard charges all identities. With current 13 Extended identities, the published Economic feeder total would be $39.91 versus $36.72 Standard, so eligibility is not itself proof of lowest total cost.

Do not remove protection, charge-temperature control, USB-C CC resistors or mandatory inspection to meet a budget. No board material/finish/paste/process change is approved by this analysis.

## What still needs a real quote

Bare-PCB surcharges, attrition/MOQs, rails/fixtures, exact shell-anchor process coverage, freight, tariff classification, tax collection and discounts. No processed JLCPCB preview was provided or reviewed in this run. The board retains its existing order-preview gate and physical-validation status.

## Sources

- [JLCPCB assembly fees](https://jlcpcb.com/help/article/pcb-assembly-price), checked 2026-10-05.
- [JLCPCB shipping calculation](https://jlcpcb.com/help/article/how-much-does-shipping-cost), checked 2026-10-05: quote-page estimate and checkout final rate.
- [JLCPCB U.S. tariff policy](https://jlcpcb.com/help/article/us-tariff-policy-faq), checked 2026-10-05: rate depends on product/material; individual U.S. shipments use DDP.
- [CDTFA tax rates](https://cdtfa.ca.gov/taxes-and-fees/rates.aspx), effective 2026-10-01, checked 2026-10-05.
