# R8 BOM — live JLCPCB stock review, 2026-10-06

Reviewed HEAD `914c12e0068e540b235d12c1e2d407a9242346b6`; exact BOM SHA256 `ec103084408e0d2f3b5c176c4420536e36ededeb83156768fce66c253f2d9e0f`. All 44 fitted references map to 25 exact, buyable, SMT-listed manufacturer parts.

**All 25 parts have positive advertised stock. All 25 available-order quantities cover the fitted quantity for one board. For the documented five-board prototype batch, 24 of 25 cover fitted quantities without pre-order; U1 is the exception.**

U1 DOIT ESPC3-12-N4 / C19949072: headline **In Stock = 66**, **Available Order Qty = 3**, reported pre-order minimum **4**. Five boards require five modules before any assembly allowance. The current official client switches quantities above 3 to pre-order mode. Do not describe the whole batch as immediately available from orderable stock. This is a procurement-mode constraint, not an electrical defect or evidence that the module is unavailable everywhere.

The previously blocked `assets.jlcpcb.com` is reachable for this read: the exact official part-detail client returned HTTP 200. Source inspection now confirms `overseasStockCount` supplies the headline In Stock and `canPresaleNumber` supplies Available Order Qty. Original older blocked-host/ambiguous-field evidence remains historical and unchanged. This task did not change the network policy or bypass the managed proxy/TLS. No blocked host occurred in the requests made for this review.

## Exact-part stock table

Counts below are the live public fields, not reserved PCBA inventory. Needed quantities exclude attrition. Full exact observation times, raw HTML and SHA256s are retained in sourcing/, sourcing-review.json and BOM-STOCK.csv.

| References | Exact part | Per board | Five boards need | In Stock | Available Order Qty | Five-board quantity |
|---|---|---:|---:|---:|---:|---|
| C5,C13,C6,C7 | [C14663](https://jlcpcb.com/partdetail/C14663) — CC0603KRX7R9BB104 | 4 | 20 | 62,722,439 | 48,420,668 | Covered |
| U3 | [C15516](https://jlcpcb.com/partdetail/C15516) — TPS63031DSKR | 1 | 5 | 13,225 | 13,094 | Covered |
| C8,C10,C11,C12,C3,C4 | [C15850](https://jlcpcb.com/partdetail/C15850) — CL21A106KAYNNNE | 6 | 30 | 4,822,451 | 3,445,802 | Covered |
| J3 | [C160389](https://jlcpcb.com/partdetail/C160389) — BM03B-SRSS-TB(LF)(SN) | 1 | 5 | 32,054 | 31,601 | Covered |
| J2 | [C160402](https://jlcpcb.com/partdetail/C160402) — SM02B-SRSS-TB(LF)(SN) | 1 | 5 | 33,473 | 31,975 | Covered |
| C2,C1 | [C19666](https://jlcpcb.com/partdetail/C19666) — CL10A475KO8NNNC | 2 | 10 | 2,433,448 | 1,823,042 | Covered |
| U2 | [C19725033](https://jlcpcb.com/partdetail/C19725033) — BQ25185DLHR | 1 | 5 | 3,621 | 3,518 | Covered |
| U1 | [C19949072](https://jlcpcb.com/partdetail/C19949072) — ESPC3-12-N4 | 1 | 5 | 66 | 3 | Pre-order above 3 |
| R3,R4,R7 | [C21190](https://jlcpcb.com/partdetail/C21190) — 0603WAF1001T5E | 3 | 15 | 21,257,255 | 15,799,362 | Covered |
| R8 | [C22795](https://jlcpcb.com/partdetail/C22795) — 0603WAF1303T5E | 1 | 5 | 584,387 | 534,375 | Covered |
| R10 | [C22844](https://jlcpcb.com/partdetail/C22844) — 0603WAF1621T5E | 1 | 5 | 26,968 | 26,869 | Covered |
| LED1,LED2 | [C2286](https://jlcpcb.com/partdetail/C2286) — KT-0603R | 2 | 10 | 4,725,758 | 4,173,823 | Covered |
| R11 | [C22893](https://jlcpcb.com/partdetail/C22893) — 0603WAF1872T5E | 1 | 5 | 127,543 | 121,574 | Covered |
| R2,R1 | [C23186](https://jlcpcb.com/partdetail/C23186) — 0603WAF5101T5E | 2 | 10 | 25,182,354 | 24,104,538 | Covered |
| R5,R6,R12,R13 | [C25803](https://jlcpcb.com/partdetail/C25803) — 0603WAF1003T5E | 4 | 20 | 22,002,706 | 20,060,760 | Covered |
| R9 | [C25804](https://jlcpcb.com/partdetail/C25804) — 0603WAF1002T5E | 1 | 5 | 29,501,378 | 21,573,549 | Covered |
| C9 | [C282505](https://jlcpcb.com/partdetail/C282505) — TCC0603COG470J500CT | 1 | 5 | 8,003 | 7,987 | Covered |
| J1 | [C37616412](https://jlcpcb.com/partdetail/C37616412) — USB4215-03-A | 1 | 5 | 114 | 22 | Covered |
| SW2 | [C393942](https://jlcpcb.com/partdetail/C393942) — TS24CA | 1 | 5 | 407,271 | 401,355 | Covered |
| SW1 | [C431540](https://jlcpcb.com/partdetail/C431540) — MSK12C02 | 1 | 5 | 192,061 | 185,714 | Covered |
| U4 | [C485802](https://jlcpcb.com/partdetail/C485802) — TPS3839G33DBZR | 1 | 5 | 3,395 | 3,360 | Covered |
| U5 | [C5219772](https://jlcpcb.com/partdetail/C5219772) — TMP390A2DRLR | 1 | 5 | 37,575 | 37,523 | Covered |
| L1 | [C56594](https://jlcpcb.com/partdetail/C56594) — SWPA3015S1R5NT | 1 | 5 | 4,197 | 4,041 | Covered |
| SW3,SW4,SW5 | [C720477](https://jlcpcb.com/partdetail/C720477) — TS-1088-AR02016 | 3 | 15 | 767,525 | 716,987 | Covered |
| Q1,Q2 | [C8545](https://jlcpcb.com/partdetail/C8545) — 2N7002 | 2 | 10 | 1,566,349 | 1,425,885 | Covered |

## Limits and next step

For a five-board batch, confirm the module pre-order lead time and assembly allocation through a later authorized procurement step, or qualify an exact compatible replacement if immediate stock is required. No substitution was made. Supplier processed preview, stackup and assembly approval remain separate. No ordering, payment, supplier contact, cart/private-library mutation, assembler upload, commits or publications occurred.

All 4,145 tracked files retain their prior hashes; HEAD is unchanged and final-status.txt/final.diff are empty. Evidence resides outside the board repository. No build, routing, SDK, 3D or CAM job was needed for inventory review.
