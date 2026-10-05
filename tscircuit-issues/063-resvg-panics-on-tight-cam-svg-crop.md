# Resvg panics when rasterizing a tightly cropped dense CAM SVG

**Status: suspected. Classification: renderer/library failure, not a confirmed tscircuit geometry bug.**

Affected:@resvg/resvg-js2.6.2in R6tooling. Input is independent CAMreader SVGderived from the unchanged final Gerbers; no component import or fabrication geometry is changed. USBarea shows GCTUSB4215-03-A/C37616412.

Reproduce from R6: `bun tscircuit-issues/evidence/063/repro.ts`. Required input is `evidence/R6/cam-readback/CAM-top-all-drills.svg`; viewBox changed for a presentation-only crop to(-8,-29,16,11). Original whole-board PNG renders successfully. Expected a cropped PNG; actual native Rustpanic `geom.rs:27:61`, `Option::unwrap()`on None, fatal runtime error.

Root cause NOTconfirmed. Hypothesis:numerical clipping edge case in resvg on dense paths outside a small viewport. No evidence of invalid exported copper. The whole-board SVG/PNG, numerical copper/slot/mask/paste checks and native high-zoom viewer remain usable. No errors suppressed and no manufacturing file edited. Full-layer renders are retained rather than calling the failed crop complete.

[Reproducer](evidence/063/repro.ts), [panic log](evidence/063/panic.log), [successful whole view](../evidence/R6/visual/CAM-top-all-drills.png), [source CAM](../evidence/R6/cam-readback/CAM-top-all-drills.svg). Remaining blocker: responsible renderer cause untriaged; not a prototype fabrication blocker. No upstream issue created.
