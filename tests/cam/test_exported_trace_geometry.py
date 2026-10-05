"""Compare exact trace reader with native Gerber output, using independent parsing."""
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import unittest
from gerbonara import GerberFile
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[2]

def module(name,filename):
    spec=importlib.util.spec_from_file_location(name,ROOT/'scripts'/filename)
    loaded=importlib.util.module_from_spec(spec);sys.modules[name]=loaded;spec.loader.exec_module(loaded)
    return loaded
GEOMETRY=module('exact_trace_geometry','manufacturing-audit.py')
READER=module('exact_trace_readback','review-r3-exports.py')

class ExportedTraceGeometryTest(unittest.TestCase):
    def compare(self,route):
        circuit=[{'type':'pcb_board','pcb_board_id':'board','center':{'x':0,'y':0},'width':10,'height':10,'thickness':1,'num_layers':2},
                 {'type':'pcb_trace','pcb_trace_id':'trace','subcircuit_connectivity_map_key':'net','route':route}]
        code="import {convertCircuitJsonToGerberFiles} from 'circuit-json-to-gerber';const circuit=JSON.parse(await Bun.stdin.text());console.log(JSON.stringify(convertCircuitJsonToGerberFiles(circuit)));"
        result=subprocess.run([str(ROOT/'.codex/runtime/node_modules/.bin/bun'),'-e',code],cwd=ROOT,input=json.dumps(circuit),text=True,capture_output=True,check=True)
        films=json.loads(result.stdout)
        copper,_,_=GEOMETRY.make_features(circuit,'gerber')
        for side,name in [('top','F_Cu.gbr'),('bottom','B_Cu.gbr')]:
            actual=READER.copper_geometry(GerberFile.from_string(films[name]))
            expected=unary_union([e.geometry for e in copper if e.layer==side])
            comparison=READER.compare_geometry(READER.GeometryComparison(expected,actual,name))
            self.assertTrue(comparison['source_and_export_cover_each_other'])

    def test_changed_width_uses_start_aperture(self):
        self.compare([{'route_type':'wire','x':0,'y':0,'layer':'top','width':.15},
                      {'route_type':'wire','x':3,'y':0,'layer':'top','width':.5},
                      {'route_type':'wire','x':3,'y':2,'layer':'top','width':.5}])

    def test_nonzero_via_adjacent_segments(self):
        self.compare([{'route_type':'wire','x':0,'y':0,'layer':'top','width':.2},
                      {'route_type':'via','x':1,'y':0,'from_layer':'top','to_layer':'bottom'},
                      {'route_type':'wire','x':2,'y':0,'layer':'bottom','width':.3}])

    def test_through_pad_draws_only_adjacent_segments(self):
        self.compare([{'route_type':'wire','x':0,'y':0,'layer':'top','width':.2},
                      {'route_type':'through_pad','start':{'x':1,'y':0},'end':{'x':2,'y':0},'start_layer':'top','end_layer':'bottom','width':.4},
                      {'route_type':'wire','x':3,'y':0,'layer':'bottom','width':.3}])

    def test_unsupported_taper_fails_closed(self):
        with self.assertRaisesRegex(ValueError,'interpolated trace widths'):
            GEOMETRY.make_features([{'type':'pcb_trace','pcb_trace_id':'trace','subcircuit_connectivity_map_key':'net','route':[{'route_type':'wire','x':0,'y':0,'layer':'top','width':.2,'width_interpolation_mode':'linear'}]}],'gerber')

if __name__=='__main__':unittest.main()
