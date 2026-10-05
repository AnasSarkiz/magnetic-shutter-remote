"""Minimal reproduction of the project audit's incorrect direct-board assumption."""
import json
from pathlib import Path

circuit = json.loads(Path('dist/index/circuit.json').read_text())
placed = next(row for row in circuit if row['type'] == 'pcb_component' and row['pcb_component_id'] == 'pcb_component_0')
if placed['positioned_relative_to_pcb_board_id'] != 'pcb_board_0':
    raise ValueError('Unsupported coordinate frame')
