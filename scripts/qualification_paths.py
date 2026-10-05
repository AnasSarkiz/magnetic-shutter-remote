"""Keep a new qualification run separate from preserved revision evidence.

Only output/input directories change. Geometry and validation rules do not.
"""
from dataclasses import dataclass
import os
from pathlib import Path


@dataclass(frozen=True)
class ReviewPaths:
    evidence: Path
    fabrication: Path
    cam_archive: Path


def project_directory(root, relative):
    candidate = (root / relative).resolve()
    if not candidate.is_relative_to(root.resolve()) or candidate == root.resolve():
        raise ValueError('Qualification directory must be inside the board project')
    return candidate


def get_review_paths(root):
    evidence = project_directory(root, os.environ.get(
        'MAGNETIC_REVIEW_EVIDENCE', 'evidence/R6'))
    fabrication = project_directory(root, os.environ.get(
        'MAGNETIC_REVIEW_FABRICATION', 'fabrication/R6'))
    archive_name = os.environ.get('MAGNETIC_REVIEW_CAM', 'R6-gerbers.zip')
    if Path(archive_name).name != archive_name or not archive_name.endswith('.zip'):
        raise ValueError('CAM archive must be a ZIP filename without a directory')
    return ReviewPaths(evidence, fabrication, fabrication / archive_name)
