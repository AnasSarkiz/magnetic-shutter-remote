"""Reject stale copper evidence and cache/credential inputs during publication."""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('registry_staging', ROOT / 'scripts/stage-registry.py')
STAGING = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = STAGING
SPEC.loader.exec_module(STAGING)


class RegistryStaging(unittest.TestCase):
    def test_rejects_report_for_another_circuit(self):
        with tempfile.TemporaryDirectory(dir=ROOT / 'evidence') as directory:
            report = Path(directory) / 'review.json'
            options = STAGING.StageOptions(ROOT / 'evidence', (report,))
            for key in ('circuit_sha256', 'circuitSha256'):
                for incorrect in ('stale', None):
                    report.write_text(json.dumps({key: incorrect}))
                    with self.assertRaisesRegex(ValueError, 'another circuit'):
                        STAGING.supplemental_files(options, 'current')
                report.write_text(json.dumps({key: 'current'}))
                self.assertEqual(STAGING.supplemental_files(options, 'current'), {report})

    def test_rejects_cache_and_outside_repository_inputs(self):
        for path in [ROOT / '.codex/runtime/config/credentials.json', Path('/tmp/credentials.json')]:
            with self.assertRaises(ValueError):
                STAGING.supplemental_files(STAGING.StageOptions(ROOT / 'evidence', (path,)), 'current')


if __name__ == '__main__':
    unittest.main()
