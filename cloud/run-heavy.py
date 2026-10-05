"""Run one heavy command in Linux with bounded Node heap and recorded resources.

This does not change routing options or validation criteria, nor approve an
unqualified design. Use only after the placement/component gates pass.
"""
import fcntl
import json
import os
from pathlib import Path
import platform
import resource
import subprocess
import sys
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]


def parse_limit(limit_text):
    if limit_text.strip() == "max":
        return None
    limit_bytes = int(limit_text.strip())
    return limit_bytes if 0 < limit_bytes < 1 << 60 else None


def memory_budget(host_bytes, cgroup_bytes):
    limit_bytes = min(host_bytes, cgroup_bytes) if cgroup_bytes else host_bytes
    # Leave 40% for native buffers, Chromium and the agent/OS. V8 heap is not RSS.
    heap_mib = min(14336, int(limit_bytes * 0.60 / 1048576))
    if heap_mib < 256:
        raise ValueError("VM memory is insufficient even for a 256 MiB V8 heap")
    return {"memory_limit_bytes": limit_bytes, "node_heap_mib": heap_mib}


def read_memory_budget():
    host_bytes = os.sysconf("SC_PAGE_SIZE") * os.sysconf("SC_PHYS_PAGES")
    limits = []
    # cgroup v2 and v1 accounting used by the cloud/Linux runners.
    for path in (Path("/sys/fs/cgroup/memory.max"),
                 Path("/sys/fs/cgroup/memory/memory.limit_in_bytes")):
        if path.exists():
            limit_bytes = parse_limit(path.read_text())
            if limit_bytes:
                limits.append(limit_bytes)
    return memory_budget(host_bytes, min(limits) if limits else None)


def oom_counters():
    path = Path("/sys/fs/cgroup/memory.events")
    if not path.exists():
        return None
    return {key: int(count) for key, count in
            (line.split() for line in path.read_text().splitlines())}


def run_command(command):
    if platform.system() != "Linux":
        raise RuntimeError("Heavy build refused: use the Linux Cloud VM, not your Mac")
    if not command:
        raise ValueError("Supply a command after --")
    runtime = ROOT / ".codex"
    logs = runtime / "logs"
    logs.mkdir(parents=True, exist_ok=True)
    lock = (runtime / "heavy.lock").open("w")
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        lock.close()
        raise RuntimeError("Another heavy job is running; run routing/builds sequentially")
    try:
        budget = read_memory_budget()
        environment = os.environ.copy()
        environment["PATH"] = str(runtime / "runtime/node_modules/.bin") + os.pathsep + environment["PATH"]
        existing_options = environment.get("NODE_OPTIONS", "")
        if "max-old-space-size" in existing_options or "max_old_space_size" in existing_options:
            raise ValueError("Remove the existing Node heap override; this launcher budgets the VM limit")
        environment["NODE_OPTIONS"] = f"{existing_options} --max-old-space-size={budget['node_heap_mib']}".strip()
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        report = {"started_utc": stamp, "command": command, **budget,
                  "oom_counters_before": oom_counters()}
        print(json.dumps(report, indent=2), flush=True)
        log_path = logs / f"heavy-{stamp}.log"
        with log_path.open("w") as log:
            with subprocess.Popen(command, cwd=ROOT, env=environment,
                                  stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True) as child:
                for line in child.stdout:
                    print(line, end="", flush=True)
                    log.write(line)
                return_code = child.wait()
        report.update({"finished_utc": datetime.now(timezone.utc).isoformat(),
                       "return_code": return_code,
                       "peak_child_rss_kib": resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss,
                       "oom_counters_after": oom_counters(), "log": str(log_path.relative_to(ROOT))})
        (logs / f"heavy-{stamp}.json").write_text(json.dumps(report, indent=2) + "\n")
        print(json.dumps(report, indent=2), flush=True)
        return return_code if return_code >= 0 else 128 - return_code
    finally:
        lock.close()


if __name__ == "__main__":
    arguments = sys.argv[1:]
    if arguments[:1] != ["--"]:
        raise SystemExit("Usage: python3 cloud/run-heavy.py -- <command> [arguments]")
    raise SystemExit(run_command(arguments[1:]))
