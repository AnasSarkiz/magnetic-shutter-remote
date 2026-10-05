"""Save the manufacturer's PDF linked by the public assembly listing."""
import html
import pathlib
import re
import urllib.request

PARTS = {
    'C2941005': 'YIYUAN-YTSPS22E58LM',
    'C136720': 'Korean_HropartsElec-SK_12E12G5',
    'C720477': 'XUNPU-TS_1088_AR02016',
    'C2286': 'Hubei_KENTO_Elec-KT0603R',
    'C8545': 'Jiangsu_Changjing_Electronics_Technology-2N7002',
    'C22844': '0603WAF1621T5E',
    'C282505': 'CCTC-TCC0603COG470J500CT',
    'C14663': 'YAGEO-CC0603KRX7R9BB104',
}
for part_number, slug in PARTS.items():
    destination = pathlib.Path('references') / f'{part_number}-manufacturer.pdf'
    if destination.exists():
        print(part_number, 'already saved')
        continue
    page_url = f'https://jlcpcb.com/partdetail/{slug}/{part_number}'
    page = urllib.request.urlopen(page_url).read().decode()
    links = re.findall(r'https[^\s"<>]+\.pdf[^\s"<>]*', page)
    errors = []
    for link in dict.fromkeys(links):
        link = html.unescape(link).replace('\\u0026', '&').replace('\\/', '/')
        try:
            content = urllib.request.urlopen(link).read()
        except Exception as error:
            errors.append(str(error))
            continue
        if content.startswith(b'%PDF'):
            destination.write_bytes(content)
            print(part_number, len(content), page_url)
            break
    else:
        print(part_number, 'FAILED', errors)
