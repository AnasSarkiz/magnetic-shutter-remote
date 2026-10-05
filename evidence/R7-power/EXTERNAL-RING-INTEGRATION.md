> Historical investigation: the user cancelled all torch / fill-light work on 2026-10-04. Nothing below is part of the active shutter-only BOM or a blocker for that board. Earlier scope decisions are retained as history.

# Purchased fill-light ring integration — 2026-10-04

User direction: “we will order it from any website and then just connect it.” Use a commercially purchased ring assembly, not a custom LED emitter PCB. No order is authorized or placed by this project.

## Product architecture retained

One rechargeable battery and one USB-C charging port power the Bluetooth remote and fill light. The board supplies the purchased ring through a verified compatible interface. Target maximum electrical LED power remains approximately 1.5–2 W, with at least 30 minutes at full brightness and 45 minutes preferred where practical. Targets remain 15/50/100% brightness, Warm/Neutral/Cool, and preferably CRI ≥90. Actual selected hardware capabilities must be recorded; no unsupported 9000 K or exact dimming claim.

The external ring, its controller/diffuser and harness are separately purchased items. They do not need invented JLCPCB C-numbers. Every fitted electronic part on the R7 board still requires its own verified exact MPN/C-number and supported supplier import.

## Selection and connection gate

The exact product is currently **NOT SELECTED**. A product link has been requested; selection work may proceed independently if no preferred product is provided.

Before board integration, establish the exact manufacturer/model or traceable seller SKU, purchase source, operating input voltage, maximum steady current and startup demand, polarity/pinout, connector, outer/inner dimensions and height, mounting, thermal limits and supported brightness/color controls. A charging USB input is not evidence of a battery-free operating-power interface. A ring with its own battery cannot silently become the second battery in the product.

Select the appropriate supply only after those facts are known: for example a documented 5 V operating input requires a compatible regulated supply rather than a direct single-cell connection. A bare emitter requires its specified current driver. No voltage or driver is selected here. A power-only connection does not establish that remote side buttons can set the ring's brightness or color. Retaining an inline ring controller, wiring its documented control inputs or another supported control arrangement must be evaluated with the actual product.

Recalculate battery current/runtime with the selected complete ring/controller load. The previous Jauch 850 mAh candidate and modeled LED budget remain provisional, not final battery sizing or measured runtime for a purchased ring. Final mechanical dimensions and mating geometry remain pending.

## Bounded preliminary market check

Sources checked 2026-10-04; these are examples reviewed, **not a qualified shortlist**:

| Product | Official evidence | Disposition |
|---|---|---|
| Godox LR30Bi / LR15Bi | [Manufacturer product page](https://www.godox.com/product-e/LITEMONS/LR15Bi-LR30Bi.html), [manual](https://www.godox.com/Downloads/LITEMONS_LR15Bi_LR30Bi.pdf): self-contained rechargeable lights, USB-C 5 V/2 A input, 20/40/60/80/100% steps, 2800–6500 K presets, CRI ≈97 | No documented battery-free shared-battery/control integration established. Not selected; do not assume the USB port bypasses its internal battery. |
| JJC ZB-7 | [Manufacturer specifications](https://www.jjc.cc/index.php/index/goods/detail.html?id=1173): 260 mm outer diameter, 10 W, 5 V/2 A, CRI >85 | Unsuitable for the current compact 1.5–2 W target; not selected. |

Do not infer nominal operating draw from an adapter rating. Do not modify or remove a commercial ring's internal battery based only on marketing specifications.

## Preserved investigation

The custom emitter TSX, supplier imports, fixtures, preview images, importer fixes and failure logs are preserved. They are superseded research, not active product hardware. Generic importer/core fixes retain their actual test evidence; changing product scope does not erase or waive their historical failures.

No PCB source was changed for this scope update; no routing, fabrication export, publication or order was performed. R6 remains frozen. Status: **R7 WORK IN PROGRESS — NOT FOR FABRICATION**. Physical battery, thermal, RF, runtime, enclosure-fit and phone checks remain **POST-PROTOTYPE PHYSICAL VALIDATION**.
