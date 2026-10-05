"""Geometry reader must retain layer-transition copper and reject unknown routes."""
import importlib.util
import sys
import unittest
from pathlib import Path
from shapely.geometry import Point

SPEC=importlib.util.spec_from_file_location('audit_test_geometry',Path(__file__).resolve().parents[2]/'scripts/manufacturing-audit.py')
GEOMETRY=importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name]=GEOMETRY
SPEC.loader.exec_module(GEOMETRY)

class ThroughPadGeometryTest(unittest.TestCase):
    def test_layer_transition_retains_both_adjacent_segments(self):
        route=[{'route_type':'wire','x':0,'y':0,'layer':'top','width':.2},
               {'route_type':'through_pad','start':{'x':1,'y':0},'end':{'x':2,'y':0},'start_layer':'top','end_layer':'bottom','width':.2},
               {'route_type':'wire','x':3,'y':0,'layer':'bottom','width':.2}]
        copper,drills,widths=GEOMETRY.make_features([{'type':'pcb_trace','pcb_trace_id':'trace','subcircuit_connectivity_map_key':'net','route':route}])
        layers={c.layer:c.geometry for c in copper}
        self.assertTrue(layers['top'].covers(Point(.5,0)))
        self.assertFalse(layers['bottom'].covers(Point(.5,0)))
        self.assertTrue(layers['bottom'].covers(Point(2.5,0)))
        self.assertFalse(layers['top'].covers(Point(2.5,0)))
        for layer in layers:self.assertTrue(layers[layer].covers(Point(1.5,0)))
        # Copper on two layers cannot invent a plated barrel.
        self.assertEqual(drills,[])
        self.assertTrue(widths)

    def test_unknown_route_element_fails_closed(self):
        with self.assertRaisesRegex(ValueError,'Unsupported route element'):
            GEOMETRY.make_features([{'type':'pcb_trace','pcb_trace_id':'trace','subcircuit_connectivity_map_key':'net','route':[{'route_type':'unrecognized'}]}])

class SharedPourSpacingTest(unittest.TestCase):
    def tracks(self):
        from shapely.geometry import box
        return [GEOMETRY.Copper('first','track','top','ground',box(0,0,3,.15)),
                GEOMETRY.Copper('second','track','top','ground',box(0,.25,3,.4))]

    def test_separate_parallel_tracks_still_fail(self):
        result=GEOMETRY.audit(self.tracks(),[],[])
        self.assertEqual([f['rule'] for f in result['failures']],['same_net_separate_tracks'])

    def test_plane_covered_tracks_are_one_etched_shape(self):
        from shapely.geometry import box
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,4,1))
        result=GEOMETRY.audit(self.tracks()+[plane],[],[])
        self.assertEqual(result['failures'],[])
        self.assertTrue(any('plane' in j.get('pads',[]) for j in result['classified_joins']))

    def test_uncovered_parallel_tails_still_fail(self):
        from shapely.geometry import box
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,1,1))
        result=GEOMETRY.audit(self.tracks()+[plane],[],[])
        self.assertEqual([f['rule'] for f in result['failures']],['same_net_separate_tracks'])

if __name__=='__main__':unittest.main()

class SharedPlaneDrillSpacingTest(unittest.TestCase):
    def geometry(self,kind='track',net='ground'):
        from shapely.geometry import box
        drill=GEOMETRY.Drill('via','via',('top','bottom'),'ground',GEOMETRY.circle(0,0,.3),GEOMETRY.circle(0,0,.6))
        target=GEOMETRY.Copper('nearby',kind,'top',net,box(.34,-.1,.55,.1))
        return drill,target

    def test_separate_same_net_trace_still_fails(self):
        drill,target=self.geometry()
        report=GEOMETRY.audit([target],[drill],[])
        self.assertIn('outer_drill_track',[f['rule']for f in report['failures']])

    def test_local_plane_covers_actual_gap_and_barrel(self):
        from shapely.geometry import box
        drill,target=self.geometry()
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,1,1))
        report=GEOMETRY.audit([target,plane],[drill],[])
        self.assertFalse(report['failures'])
        self.assertIn('physical_shared_plane_barrel_feed',[j['classification']for j in report['classified_joins']])

    def test_gap_in_plane_still_fails(self):
        from shapely.geometry import box
        drill,target=self.geometry()
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,1,1).difference(box(.31,-.5,.33,.5)))
        report=GEOMETRY.audit([target,plane],[drill],[])
        self.assertIn('outer_drill_track',[f['rule']for f in report['failures']])

    def test_smt_land_stays_protected_even_with_plane(self):
        from shapely.geometry import box
        drill,target=self.geometry(kind='smt')
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,1,1))
        report=GEOMETRY.audit([target,plane],[drill],[])
        self.assertIn('project_unrelated_drill_copper',[f['rule']for f in report['failures']])

    def test_other_net_trace_stays_protected(self):
        from shapely.geometry import box
        drill,target=self.geometry(net='signal')
        plane=GEOMETRY.Copper('plane','pour','top','ground',box(-1,-1,1,1))
        report=GEOMETRY.audit([target,plane],[drill],[])
        self.assertIn('outer_drill_track',[f['rule']for f in report['failures']])
