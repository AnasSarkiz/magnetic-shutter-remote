"""Manual ESP32-C3 ROM flashing through standard-jst-programmer CDC0 UART.

Default performs image validation only. --write and an explicit CDC0 --port
are required to touch hardware. Uses public esptool4.8.1 existing-port API.
"""
import argparse
import hashlib
import io
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_IMAGE = ROOT/'firmware/artifacts/R8-DOIT-C3-hosted-2026-10-05/zephyr.bin'
DEFAULT_SHA256 = 'bef862d532945b309b30fa0f7bf2313db459de81f5261c3f8e4816d43de7e132'


def validate_image(path, expected_sha256, image_class, chip_id):
    raw=path.read_bytes()
    if len(raw)>4*1024*1024 or hashlib.sha256(raw).hexdigest()!=expected_sha256:
        raise ValueError('Image size/hash does not match the reviewed ESP32-C3 artifact')
    image=image_class(io.BytesIO(raw))
    image.verify()
    if image.chip_id!=chip_id:
        raise ValueError('Only ESP32-C3 images are accepted')
    if image.checksum!=image.calculate_checksum():
        raise ValueError('ESP image segment checksum differs')
    if image.append_digest and image.stored_digest!=image.calc_digest:
        raise ValueError('ESP image appended SHA256 differs')
    return {'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'chip_id':image.chip_id}


def flash(port,image,serial_module,esptool_module,rom_class):
    # Construct while closed so Windows receives DTR=true at port opening.
    with serial_module.Serial(port=None,baudrate=115200,timeout=3) as connection:
        connection.port=port
        connection.dtr=True
        connection.rts=False
        connection.open()
        esp=rom_class(connection,baud=115200)
        esp.connect('no_reset')
        if esp.secure_download_mode or esp.read_reg(esp.CHIP_DETECT_MAGIC_REG_ADDR) not in esp.CHIP_DETECT_MAGIC_VALUE:
            raise ValueError('A positively identified ESP32-C3 ROM in normal download mode is required')
        common=['--chip','esp32c3','--port',port,'--baud','115200',
                '--before','no_reset','--after','no_reset','--no-stub']
        esptool_module.main(common+['write_flash','--flash_mode','dio',
                             '--flash_freq','80m','--flash_size','4MB','0x0',str(image)],esp=esp)
        esptool_module.main(common+['verify_flash','0x0',str(image)],esp=esp)
    print('Flash and readback verification completed. Release BOOT and press RESET to run.')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image',type=Path,default=DEFAULT_IMAGE)
    parser.add_argument('--sha256',default=DEFAULT_SHA256,help='Reviewed image SHA256 for later authorized firmware revisions')
    parser.add_argument('--port',help='Explicit CDC0 UART device, never the CDC1 telemetry port')
    parser.add_argument('--write',action='store_true',help='Write flash after manually entering BOOT+RESET download mode')
    args=parser.parse_args()
    import esptool
    import serial
    from serial.tools import list_ports
    if esptool.__version__!='4.8.1' or serial.__version__!='3.5':
        raise ValueError('Install the reviewed host tools: esptool==4.8.1 pyserial==3.5')
    from esptool.bin_image import ESP32C3FirmwareImage
    from esptool.targets.esp32c3 import ESP32C3ROM
    result=validate_image(args.image,args.sha256,ESP32C3FirmwareImage,ESP32C3ROM.IMAGE_CHIP_ID)
    print('Image validation PASS:',result)
    if not args.write:
        print('No serial device opened. Use --write --port after following PROGRAMMING.md.')
        return
    if not args.port:
        parser.error('--write requires the explicit CDC0 --port')
    for port in list_ports.comports():
        if port.device==args.port and 'telemetry' in (' '.join(str(x or '') for x in [port.description,port.interface])).lower():
            raise ValueError('The selected port is telemetry CDC1; choose UART CDC0')
    print('Using manual reset with DTR enabled; board battery on, board USB-C unplugged.')
    flash(args.port,args.image,serial,esptool,ESP32C3ROM)


if __name__=='__main__':
    main()
