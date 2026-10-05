"""Guard the real UART contract and the manual-reset, DTR-enabled host helper."""
import hashlib
import io
from contextlib import redirect_stdout
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

ROOT=Path(__file__).resolve().parents[1]
SPEC=importlib.util.spec_from_file_location('r8_uart_flash',ROOT/'scripts/flash-r8-standard-jst.py')
FLASH=importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(FLASH)
EVIDENCE=ROOT/'evidence/R8-standard-programmer-2026-10-05/qualification'


class StandardProgrammer(unittest.TestCase):
    def test_published_host_and_target_contacts(self):
        c=json.loads((EVIDENCE/'programmer-0.8.0/circuit.json').read_text())
        j5=next(x for x in c if x['type']=='source_component' and x['name']=='J5')
        ports={p['pin_number']:p['name'] for p in c if p['type']=='source_port' and p['source_component_id']==j5['source_component_id']}
        self.assertEqual(ports,{1:'TX',2:'GND',3:'RX'})
        target=(ROOT/'src/remote-circuit.tsx').read_text().split('<BM03B_SRSS_TB_LF__SN_')[1].split('/>')[0]
        for pin,net in [(1,'UART_RX'),(2,'GND'),(3,'UART_TX'),(4,'GND'),(5,'GND')]:
            self.assertIn(f'pin{pin}: "net.{net}"',target)
        self.assertNotIn('net.V3',target)
        self.assertNotIn('net.EN',target)
        self.assertNotIn('net.BOOT',target)

    def test_default_image_is_preserved_c3(self):
        raw=FLASH.DEFAULT_IMAGE.read_bytes()
        self.assertEqual(hashlib.sha256(raw).hexdigest(),FLASH.DEFAULT_SHA256)
        self.assertEqual(raw[0],0xe9)
        self.assertEqual(int.from_bytes(raw[12:14],'little'),5)

    def test_image_validation_rejects_changed_wrong_chip_and_checksum(self):
        class Image:
            chip_id=5;checksum=1;append_digest=False
            def __init__(self,stream): self.data=stream.read()
            def verify(self): pass
            def calculate_checksum(self): return 1
        with tempfile.TemporaryDirectory() as directory:
            p=Path(directory)/'test.bin';p.write_bytes(b'valid')
            sha=hashlib.sha256(p.read_bytes()).hexdigest()
            self.assertEqual(FLASH.validate_image(p,sha,Image,5)['bytes'],5)
            with self.assertRaisesRegex(ValueError,'size/hash'):
                FLASH.validate_image(p,'0'*64,Image,5)
            with self.assertRaisesRegex(ValueError,'Only ESP32-C3'):
                FLASH.validate_image(p,sha,Image,12)
            Image.checksum=0
            with self.assertRaisesRegex(ValueError,'checksum'):
                FLASH.validate_image(p,sha,Image,5)

    def test_serial_open_preserves_dtr_and_manual_reset(self):
        events=[]
        class Port:
            def __init__(self,**kwargs):
                self.is_open=False
                self.port=kwargs['port']
                self.baudrate=kwargs['baudrate']
                self.dtr=False;self.rts=True
            def __enter__(self): return self
            def __exit__(self,*args): events.append('closed')
            def open(self):
                events.append(('open',self.port,self.dtr,self.rts,self.baudrate))
                self.is_open=True
        class Rom:
            secure_download_mode=False
            CHIP_DETECT_MAGIC_REG_ADDR=0x40001000
            CHIP_DETECT_MAGIC_VALUE=[0x6921506f]
            def read_reg(self,address): return 0x6921506f
            def __init__(self,port,baud): self.port=port
            def connect(self,mode): events.append(('connect',mode))
        def main(argv,esp): events.append(('esptool',argv,esp.port.dtr))
        with redirect_stdout(io.StringIO()):
            FLASH.flash('CDC0',Path('reviewed.bin'),SimpleNamespace(Serial=Port),SimpleNamespace(main=main),Rom)
        self.assertEqual(events[0],('open','CDC0',True,False,115200))
        self.assertEqual(events[1],('connect','no_reset'))
        commands=[e for e in events if isinstance(e,tuple) and e[0]=='esptool']
        self.assertEqual(len(commands),2)
        for _,argv,dtr in commands:
            self.assertTrue(dtr)
            self.assertEqual(argv[argv.index('--before')+1],'no_reset')
            self.assertEqual(argv[argv.index('--after')+1],'no_reset')
            self.assertIn('--no-stub',argv)
            self.assertIn('0x0',argv)
        self.assertIn('write_flash',commands[0][1]);self.assertIn('verify_flash',commands[1][1])
