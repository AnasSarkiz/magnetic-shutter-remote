import json,pathlib,html
root=pathlib.Path(__file__).resolve().parents[2]
p=root/'evidence/R8-toolchain-refresh-2026-10-23'
r=next(x for x in json.loads((p/'geometry-comparison.json').read_text()) if x['jlcpcb']=='C37616412')
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="1500" viewBox="0 0 2200 1500"><rect width="2200" height="1500" fill="#111827"/><g font-family="sans-serif" fill="#ffffff"><text x="70" y="65" font-size="35">USB4215-03-A / C37616412 — generated import comparison</text><text x="70" y="112" font-size="25">TSX source geometry, unrotated component coordinates. Not a regenerated PCB or CAM preview.</text>']
for i,(key,title) in enumerate([('original','Preserved qualified import'),('imported','Fresh CLI 0.1.2402 exact import')]):
 xoff=550+i*1080; yoff=750; scale=83
 svg.append(f'<text x="{xoff-420}" y="205" font-size="32">{title}</text>')
 for f in r[key]['features']:
  a=f['attributes']; kind=f['element']
  def mm(k):return float(str(a[k]).removesuffix('mm'))
  if kind=='smtpad':
   w,h=mm('width')*scale,mm('height')*scale;x=xoff+mm('pcbX')*scale-w/2;y=yoff-mm('pcbY')*scale-h/2
   svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#d6aa52" stroke="#fff" stroke-width="1"/>')
   svg.append(f'<text x="{x+w/2}" y="{y-15}" font-size="18" text-anchor="middle">{html.escape(a["portHints"][0].removeprefix("pin"))}</text>')
  elif kind=='platedhole':
   w,h=mm('outerWidth')*scale,mm('outerHeight')*scale;x=xoff+mm('pcbX')*scale;y=yoff-mm('pcbY')*scale
   svg.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="{w/2}" fill="#d6aa52" stroke="white"/>')
   w,h=mm('holeWidth')*scale,mm('holeHeight')*scale
   svg.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="{w/2}" fill="#111827" stroke="white"/>')
  elif kind=='solderpaste':
   pts=' '.join(f'{xoff+float(q["x"])*scale},{yoff-float(q["y"])*scale}' for q in a['points'])
   svg.append(f'<polygon points="{pts}" fill="#f472b6" fill-opacity="0.7" stroke="#ff83ca" stroke-width="2"/>')
 count=r[key]['counts'].get('solderpaste',0)
 svg.append(f'<text x="{xoff-420}" y="1220" font-size="32">Explicit paste polygons: {count} / 16</text><text x="{xoff-420}" y="1270" font-size="27">Copper: 12 lands. Plated shell slots: 4.</text>')
svg+=['<text x="70" y="1380" font-size="28">Gold = copper; pink = explicit paste; dark centers = plated slots.</text><text x="70" y="1430" font-size="26">All copper/drill geometry and 16 physical terminal identities match. Missing paste/process metadata blocks adoption.</text></g></svg>']
(p/'j1-import-comparison.svg').write_text(''.join(svg))
