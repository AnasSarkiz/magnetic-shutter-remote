# USB4215 solder-process findings

**ENGINEERING QUALIFICATION ONLY - NOT FOR FABRICATION**

**BLOCKED — MANUFACTURER PROCESS QUALIFICATION MISSING**

The [included exact-series specification](GCT-USB4215-specification-Rev-A.pdf), Rev A 2024-04-26, section 7.0 page 6 describes resistance to infrared reflow heat using hot-air convection. Its profile is a **heat-resistance evaluation**, not a confirmed production reflow profile.

| Parameter | Published value | Document context | Production-process limit? |
|---|---:|---|---|
| Peak | 255–260 °C | heat-resistance test | UNCONFIRMED |
| >217 °C | 60 s | heat-resistance test | UNCONFIRMED |
| >230 °C | 50 s | heat-resistance test | UNCONFIRMED |
| >250 °C | 5 s | heat-resistance test | UNCONFIRMED |
| Reflow cycles | not found | — | BLOCKED |
| Ramp | 2.5 °C/s | heat-resistance test | UNCONFIRMED |
| Soak | 2–3 min | heat-resistance test | UNCONFIRMED |
| Cooling slope | −5 °C/s maximum, as printed | heat-resistance test | UNCONFIRMED |

Allowed production peak/dwell/TAL/cycles and exact shell completion remain unanswered. Section 6.3.4 uses a 245 ±5 °C, 3–5 s solder-pot solderability test; it does not authorize a manual secondary operation. General GCT PIP guidance uses a different USB4105 example, and does not approve this exact pattern on this board thickness.

| Feature | Copper (mm) | Plated slot (mm) | Source paste (mm bounds) | Intended process |
|---|---|---|---|---|
| EH2 / pad 13, left rear | 0.999998 x 1.7999964 | 0.5999988 x 1.3999972 | 0.999998 x 1.7996916 | UNCONFIRMED |
| EH1 / pad 14, right rear | same | same | same | UNCONFIRMED |
| EH3 / pad 15, left front | 0.999998 x 2.1999956 | 0.5999988 x 1.7999964 | 0.999998 x 2.1996908 | UNCONFIRMED |
| EH4 / pad 16, right front | same | same | same | UNCONFIRMED |

All four features have TOP/BOTTOM plated geometry and TOP source paste. Plating and paste presence do not prove normal reflow, PIP volume sufficiency or required secondary processing. No GCT exact-part manual permission/iron temperature/contact-time/repeat limits were found. Housing PA9T and operating-temperature ratings do not establish secondary-solder permission.

JLCPCB listing eligibility/stock does not confirm shell coverage. [GCT request](GCT-REQUEST.md) and [JLCPCB request](JLCPCB-REQUEST.md) remain **PREPARED — NOT SENT; NO RESPONSE**. Neither party is asked to certify the other's responsibility.
