**ENGINEERING QUALIFICATION ONLY - NOT FOR FABRICATION**

# Source → actual TOP paste CAM geometry

All dimensions in mm. Source expectations come from unchanged supplier SOLIDREGION records, independently registered to the previously qualified GND1 copper land. They are not derived from the broken import. Actual contours are read with Gerbonara and compared with Shapely.

| Source ID | Expected X | Expected Y | Expected width | Expected height | CAM X | CAM Y | CAM width | CAM height |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| gge462 | 1.250073700 | 2.024957900 | 0.299999400 | 1.200023000 | 1.250073500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge465 | 1.750199700 | 2.024957900 | 0.299999400 | 1.200023000 | 1.750199500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge468 | -3.200019000 | 2.024957900 | 0.599998800 | 1.200023000 | -3.200019000 | 2.024957500 | 0.599998000 | 1.200023000 |
| gge471 | 0.750201700 | 2.024957900 | 0.299999400 | 1.200023000 | 0.750201500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge474 | 2.400173000 | 2.024957900 | 0.599998800 | 1.200023000 | 2.400173000 | 2.024957500 | 0.599998000 | 1.200023000 |
| gge477 | 0.250075700 | 2.024957900 | 0.299999400 | 1.200023000 | 0.250075500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge480 | -0.249796300 | 2.024957900 | 0.299999400 | 1.200023000 | -0.249796500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge483 | -2.399919000 | 2.024957900 | 0.599998800 | 1.200023000 | -2.399919000 | 2.024957500 | 0.599998000 | 1.200023000 |
| gge486 | -0.749922300 | 2.024957900 | 0.299999400 | 1.200023000 | -0.749922500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge489 | -1.249794300 | 2.024957900 | 0.299999400 | 1.200023000 | -1.249794500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge492 | -1.749920300 | 2.024957900 | 0.299999400 | 1.200023000 | -1.749920500 | 2.024957500 | 0.299999000 | 1.200023000 |
| gge495 | 3.200019000 | 2.024945200 | 0.599998800 | 1.199997600 | 3.200019000 | 2.024945000 | 0.599998000 | 1.199998000 |
| gge498 | -4.319905000 | 1.425022600 | 0.999998000 | 1.799691600 | -4.319905000 | 1.425022500 | 0.999998000 | 1.799691000 |
| gge501 | 4.319905000 | 1.425022600 | 0.999998000 | 1.799691600 | 4.319905000 | 1.425022500 | 0.999998000 | 1.799691000 |
| gge504 | -4.319905000 | -2.574969400 | 0.999998000 | 2.199690800 | -4.319905000 | -2.574969500 | 0.999998000 | 2.199691000 |
| gge507 | 4.319905000 | -2.574969400 | 0.999998000 | 2.199690800 | 4.319905000 | -2.574969500 | 0.999998000 | 2.199691000 |

Maximum full-contour error: **0.000000565686 mm**. Circuit JSON contours match source below 1e−9 mm. The 1e−6 mm CAM comparison bound accounts for the exporter’s six-decimal coordinate quantization; it is not a manufacturing clearance waiver.

Twelve contact polygons + four shell polygons; sixteen TOP regions, zero BOTTOM regions, no overlapping/merged apertures and no duplicate contours. Automatic contact paste is disabled by the source PAD expansion −99.9998 mm. Copper pads are not counted as paste.

Small source differences are retained: eleven contact paste heights are 1.200023 mm, one is 1.1999976 mm; copper contact height is 1.1999976 mm. Some source paste centres differ from copper by 0.0000127 mm. Shell source paste bounds are 1.7996916/2.1996908 mm high. No contour was replaced by an ideal pill or silently rounded to a manufacturer nominal dimension.


These facts establish supplier fidelity only. See [paste qualification](PASTE-QUALIFICATION.md) and [process findings](SOLDER-PROCESS.md).
