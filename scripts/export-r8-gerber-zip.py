"""Package already-generated native Gerber/Excellon files without modifying them."""
import argparse
from zipfile import ZipFile, ZIP_DEFLATED
from pathlib import Path


def export_zip(gerber_directory, output):
    sources = sorted(gerber_directory.iterdir())
    if len(sources) != 12 or any(not source.is_file() for source in sources):
        raise ValueError('Expected exactly 12 reviewed native fabrication files')
    if output.resolve().parent == gerber_directory.resolve():
        raise ValueError('Archive must be outside the native fabrication directory')
    with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
        for source in sources:
            archive.write(source, source.name)
    print(f'{len(sources)} original native files packaged in {output}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('gerber_directory', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    export_zip(args.gerber_directory, args.output)
