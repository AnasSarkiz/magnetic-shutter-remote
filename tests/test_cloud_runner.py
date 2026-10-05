"""Meaningful Cloud regression checks; no PCB build or routing is performed."""
import contextlib
import fcntl
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("cloud_runner", ROOT / "cloud/run-heavy.py")
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class CloudRunnerTest(unittest.TestCase):
    def test_cgroup_limit_is_respected_instead_of_large_host(self):
        budget = runner.memory_budget(64 * 1024**3, 8 * 1024**3)
        self.assertEqual(budget["memory_limit_bytes"], 8 * 1024**3)
        self.assertEqual(budget["node_heap_mib"], 4915)

    def test_unlimited_cgroup_uses_host_and_reserves_native_memory(self):
        self.assertIsNone(runner.parse_limit("max\n"))
        self.assertIsNone(runner.parse_limit(str(1 << 62)))
        budget = runner.memory_budget(16 * 1024**3, None)
        self.assertEqual(budget["node_heap_mib"], 9830)
        self.assertLess(budget["node_heap_mib"] * 1048576, 16 * 1024**3)

    def test_mac_does_not_execute_heavy_commands(self):
        with patch.object(runner.platform, "system", return_value="Darwin"), \
             patch.object(runner.subprocess, "Popen") as launch:
            with self.assertRaisesRegex(RuntimeError, "not your Mac"):
                runner.run_command([sys.executable, "-c", "pass"])
            launch.assert_not_called()

    def test_child_failure_is_recorded_and_propagated(self):
        with tempfile.TemporaryDirectory() as directory, \
             patch.object(runner, "ROOT", Path(directory)), \
             patch.object(runner.platform, "system", return_value="Linux"), \
             patch.object(runner, "read_memory_budget", return_value={"memory_limit_bytes": 1024**3, "node_heap_mib": 614}), \
             patch.object(runner, "oom_counters", return_value=None), \
             contextlib.redirect_stdout(io.StringIO()):
            result = runner.run_command([sys.executable, "-c", "import sys; print('failed'); sys.exit(7)"])
            self.assertEqual(result, 7)
            reports = list((Path(directory) / ".codex/logs").glob("*.json"))
            self.assertEqual(len(reports), 1)
            self.assertEqual(json.loads(reports[0].read_text())["return_code"], 7)

    def test_concurrent_heavy_job_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory, \
             patch.object(runner, "ROOT", Path(directory)), \
             patch.object(runner.platform, "system", return_value="Linux"), \
             patch.object(runner.subprocess, "Popen") as launch:
            runtime = Path(directory) / ".codex"
            runtime.mkdir()
            with (runtime / "heavy.lock").open("w") as locked:
                fcntl.flock(locked, fcntl.LOCK_EX | fcntl.LOCK_NB)
                with self.assertRaisesRegex(RuntimeError, "Another heavy job"):
                    runner.run_command([sys.executable, "-c", "pass"])
                launch.assert_not_called()


if __name__ == "__main__":
    unittest.main()
