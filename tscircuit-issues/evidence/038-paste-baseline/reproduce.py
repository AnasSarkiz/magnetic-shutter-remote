"""Reproduce the incorrect copper-equals-paste project assumption, not an exporter bug."""
import importlib.util,json,sys
from pathlib import Path
from zipfile import ZipFile
from gerbonara import GerberFile
from shapely.ops import unary_union
s=importlib.util.spec_from_file_location('export_review',Path('scripts/review-r3-exports.py'));r=importlib.util.module_from_spec(s);sys.modules[s.name]=r;s.loader.exec_module(r)
s=importlib.util.spec_from_file_location('audit_review',Path('scripts/manufacturing-audit.py'));a=importlib.util.module_from_spec(s);sys.modules[s.name]=a;s.loader.exec_module(a)
c=json.loads(Path('dist/index/circuit.json').read_text());copper,_,_=a.make_features(c)
with ZipFile('fabrication/R3-gerbers-review.zip') as z:
 actual=r.copper_geometry(GerberFile.from_string(z.read('F_Paste.gbr').decode()))
expected=unary_union([f.geometry for f in copper if f.layer=='top' and f.kind=='smt'])
r.compare_geometry(r.GeometryComparison(expected,actual,'incorrect copper-equals-paste baseline'))
