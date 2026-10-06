import hashlib,json,struct
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description='Verify RP2040 UF2 block integrity against the built binary and exercise corruption rejection')
parser.add_argument('--artifacts',type=Path,required=True)
parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args()
build=args.artifacts
def review_uf2(raw,binary):
 if not raw or len(raw)%512: raise ValueError('Invalid UF2 length')
 payloads=[];count=len(raw)//512
 for number in range(count):
  block=raw[number*512:(number+1)*512]
  magic1,magic2,flags,address,size,index,total,family=struct.unpack_from('<8I',block)
  if (magic1,magic2,struct.unpack_from('<I',block,508)[0])!=(0x0a324655,0x9e5d5157,0x0ab16f30): raise ValueError('UF2 magic mismatch')
  if flags!=0x2000 or family!=0xe48bff56: raise ValueError('Not an RP2040 family UF2')
  if size!=256 or index!=number or total!=count or address!=0x10000000+256*number: raise ValueError('UF2 block sequence/address/length mismatch')
  if address+size>0x10200000: raise ValueError('UF2 exceeds programmer 2MiB flash')
  payloads.append(block[32:32+size])
 payload=b''.join(payloads)
 if count!=(len(binary)+255)//256 or payload[:len(binary)]!=binary or any(payload[len(binary):]): raise ValueError('UF2 does not reproduce built binary')
 return {'blocks':count,'payload_bytes':len(binary),'flash_base_hex':'0x10000000','family_hex':'0xe48bff56','all_blocks_sequence_addresses_and_magic_pass':True,'payload_matches_built_bin':True}
raw=(build/'standard-jst-programmer.uf2').read_bytes();binary=(build/'standard-jst-programmer.bin').read_bytes();report=review_uf2(raw,binary);negative=[]
for case,offset in [('wrong_family',28),('wrong_address',12),('corrupt_payload',32),('bad_trailer',508)]:
 changed=bytearray(raw);changed[offset]^=1
 try:review_uf2(bytes(changed),binary)
 except ValueError as error:negative.append({'case':case,'rejected':True,'reason':str(error)})
 else:raise AssertionError('Corrupt UF2 accepted: '+case)
report['negative_checks']=negative
report['artifacts']={name:{'bytes':(build/name).stat().st_size,'sha256':hashlib.sha256((build/name).read_bytes()).hexdigest()} for name in ['standard-jst-programmer.uf2','standard-jst-programmer.bin','standard-jst-programmer.elf']}
args.output.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
