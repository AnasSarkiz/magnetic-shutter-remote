"""Verify the self-contained handoff without fetching, building or routing."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def verify_manifest(manifest_path):
    manifest = json.loads(manifest_path.read_text())
    baseline_root = (ROOT / manifest["source_directory"]).resolve()
    if not baseline_root.is_relative_to(ROOT):
        raise ValueError("Portable snapshot must remain inside this repository")
    for entry in manifest["files"]:
        source = (baseline_root / entry["path"]).resolve()
        if not source.is_relative_to(baseline_root):
            raise ValueError("Baseline path escapes its snapshot")
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        if digest != entry["sha256"]:
            raise ValueError(f"Frozen baseline changed: {entry['path']}")
    return len(manifest["files"])


def verify_vendor_archives():
    manifest = json.loads((ROOT / "tooling/R7-patches/manifest.json").read_text())
    for entry in manifest["sources"]:
        digest = hashlib.sha256((ROOT / entry["base_archive"]).read_bytes()).hexdigest()
        if digest != entry["base_sha256"]:
            raise ValueError(f"Toolchain source archive mismatch: {entry['base_archive']}")
    for entry in manifest["runtime_archives"]:
        digest = hashlib.sha256((ROOT / entry["path"]).read_bytes()).hexdigest()
        if digest != entry["sha256"]:
            raise ValueError(f"Toolchain runtime archive mismatch: {entry['path']}")


if __name__ == "__main__":
    count = verify_manifest(ROOT / "cloud/R7-PORTABLE-MANIFEST.json")
    verify_vendor_archives()
    print(f"Frozen R7 snapshot: {count}/{count} hashes PASS; recorded source/runtime archives PASS")
