# Sunlord SWPA3015 supplier lands differ from the manufacturer recommendation

**Confirmed supplier variation; qualification blocked.** This is not proof of assembly failure or an importer conversion defect.

Candidate: Sunlord SWPA3015S1R5NT / C56594, 1.5µH±30%, imported with the supported exact-footprint command. Manufacturer [catalogue](../evidence/R8-routing-2026-10-05/C56594-datasheet.pdf), revised2025/5/8, page2 specifies the SWPA3015S land pattern:

| Feature | Manufacturer recommended | Raw supplier / supported import |
|---|---:|---:|
| Each land width, b | 0.8 mm | 1.2999974 mm |
| Each land height, c | 2.7 mm | 2.7200098 mm |
| Inner gap, a | 1.5 mm | 1.4000226 mm |

The page's ±0.2 mm body/terminal dimensions do not define tolerances on the separate a/b/c land recommendations. The recommendations are nominal, not evidence that this particular larger-pad variation is qualified.

All two pad dimensions, relative positions and identities faithfully reproduce supplier geometry to approximately2.80e-14 mm after one uniform origin translation. [Raw supplier input](../evidence/R8-routing-2026-10-05/C56594-supplier-raw.json), [comparison](../evidence/R8-routing-2026-10-05/power-part-audit.json), [inspected land drawing](../evidence/R8-routing-2026-10-05/sunlord-page2.png), [electrical table](../evidence/R8-routing-2026-10-05/sunlord-page5.png). No generated import was edited.

Reproduction: supported `tsci import C56594 --jlcpcb --use-exact-footprint --download`; then `python3 evidence/R8-routing-2026-10-05/audit-power-parts.py`. Source attribution: **JLCEDA/EasyEDA Official Library**, [JLCEDA](https://lceda.cn/), [EasyEDA](https://easyeda.com/).

Do not fit this candidate or route through the blocked qualification gate. TI-recommended-series alternative Coilcraft LPS3015-152MRC / C17382749 also imported successfully, but its own manufacturer land/electrical/process qualification has not been completed; import success does not resolve the gate. No replacement inductor is fitted in the root source.

## Successor prototype assessment

The user requested a distinction between real blockers and nominal differences. The measured land coverage, copper gaps, mask webs and stencil area ratios support engineering prototype acceptance, documented in [R8 qualification](../evidence/R8-prototype-2026-10-05/QUALIFICATION.md). This is a disclosed supplier/process variation, not a demonstrated importer defect. Original measurements and prior stop decision above are retained. Generated imports remain unchanged. Production process and physical assembly are unverified; routing and board manufacturing checks are still required.
