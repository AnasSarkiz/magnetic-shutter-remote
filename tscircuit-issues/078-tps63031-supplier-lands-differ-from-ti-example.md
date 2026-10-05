# TPS63031 supplier contacts differ from TI's example land pattern

**Confirmed supplier variation; manufacturer/process qualification blocked.** This is not a demonstrated converter scaling defect, assembly failure or PCB short.

Exact candidate: TI TPS63031DSKR / C15516, supported import under `imports/TPS63031DSKR/`. Pinned CLI0.1.2237/easyeda0.0.364 remain unchanged. The original power feasibility report already disclosed this variation; this investigation records reproducible measurements before routing.

| Feature | TI DSK0010A example | Supported supplier import |
|---|---:|---:|
| Ten contact lengths | 0.600 mm | 0.6649974 mm |
| Ten contact widths | 0.250 mm | 0.2800096 mm |
| Contact row centres | ±1.150 mm | ±1.157478 mm |
| Exposed pad | 1.200 ×2.000 mm | 1.1999976 ×1.999996 mm |

Manufacturer source: [TI datasheet](https://www.ti.com/lit/ds/symlink/tps63031.pdf), preserved [SLVS696D](../evidence/R8-components/TPS63031-current.pdf), package drawing4218903/C09/2025. The drawing calls these example lands; it does not supply a tolerance qualifying this larger contact pattern. Package-body/terminal tolerances do not automatically qualify PCB lands. TI's stencil example also specifies84% EP paste coverage; the supplier import's explicit zero paste margin is not a qualified whole-board stencil process.

All11 converted pad identities, dimensions and relative positions reproduce supplier data to approximately1.08e-13 mm after one uniform origin translation. The minimum adjacent contact copper gap is0.2198624 mm; that isolated measurement is not a routed-board DRC pass. [Raw supplier data](../evidence/R8-routing-2026-10-05/C15516-supplier-raw.json), [generated comparison](../evidence/R8-routing-2026-10-05/power-part-audit.json).

Reproduce: `python3 evidence/R8-routing-2026-10-05/audit-power-parts.py`. It checks import fidelity and CAD response formats, and explicitly reports manufacturer qualification **BLOCKED**. It does not route or modify imports. Source attribution: **JLCEDA/EasyEDA Official Library**, [JLCEDA](https://lceda.cn/), [EasyEDA](https://easyeda.com/).

Disposition: retain the original import. Resolve with an independently qualified supported footprint/component or authoritative process/land-pattern evidence. Do not manually alter generated lands or infer approval from import success. Dependent R8 power placement/routing remains blocked under `cloud/WORKSPACE-INSTRUCTIONS.md`.

## Successor prototype assessment

The user requested a distinction between real blockers and nominal differences. The measured land coverage, copper gaps, mask webs and stencil area ratios support engineering prototype acceptance, documented in [R8 qualification](../evidence/R8-prototype-2026-10-05/QUALIFICATION.md). This is a disclosed supplier/process variation, not a demonstrated importer defect. Original measurements and prior stop decision above are retained. Generated imports remain unchanged. Production process and physical assembly are unverified; routing and board manufacturing checks are still required.
