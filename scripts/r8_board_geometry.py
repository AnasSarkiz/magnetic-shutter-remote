"""Read the actual R8 outline and qualified all-layer antenna exclusion."""
from shapely.geometry import Polygon, box


def board_outline(circuit):
    boards = [e for e in circuit if e['type'] == 'pcb_board']
    if len(boards) != 1:
        raise ValueError('Expected one native R8 board')
    board = boards[0]
    outline = Polygon([(p['x'], p['y']) for p in board['outline']])
    if not outline.is_valid or outline.is_empty:
        raise ValueError('Invalid native board outline')
    x, y = board['center']['x'], board['center']['y']
    bounds = (x-board['width']/2, y-board['height']/2,
              x+board['width']/2, y+board['height']/2)
    if any(abs(a-b) > 0.0001 for a, b in zip(outline.bounds, bounds)):
        raise ValueError('Native outline and board dimensions differ')
    return outline


def rf_exclusion(circuit):
    source = [e for e in circuit if e['type'] == 'source_component' and e['name'] == 'U1']
    if len(source) != 1:
        raise ValueError('Expected one fitted radio U1')
    radio = [e for e in circuit if e['type'] == 'pcb_component'
             and e['source_component_id'] == source[0]['source_component_id']]
    if len(radio) != 1:
        raise ValueError('Expected one physical radio U1')
    bands = [e for e in circuit if e['type'] == 'pcb_keepout'
             and e.get('excluded_pcb_component_ids') == [radio[0]['pcb_component_id']]]
    if len(bands) != 1:
        raise ValueError('Expected one explicit radio antenna exclusion')
    band = bands[0]
    if band['shape'] != 'rect' or set(band['layers']) != {'top', 'bottom'}:
        raise ValueError('Antenna exclusion must cover both copper layers')
    x, y = band['center']['x'], band['center']['y']
    exclusion = box(x-band['width']/2, y-band['height']/2,
                    x+band['width']/2, y+band['height']/2)
    bounds = board_outline(circuit).bounds
    if (band['height'] < 8.7-0.0001 or exclusion.bounds[0] > bounds[0]+0.0001
            or exclusion.bounds[2] < bounds[2]-0.0001
            or abs(exclusion.bounds[1]-bounds[1]) > 0.0001):
        raise ValueError('Qualified 8.7mm antenna band must span the board edge')
    return exclusion
