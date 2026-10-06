import argparse,asyncio,datetime,hashlib,http.server,json,os,threading
from pathlib import Path
from playwright.async_api import async_playwright
root=Path.cwd();ui=root/'.codex/runtime/style-ui';e=root/'evidence/R8-style-vias-2026-10-06'
class Quiet(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ui),**kwargs)
 def log_message(self,*args):pass
async def main():
 parser=argparse.ArgumentParser();parser.add_argument('--label',required=True);parser.add_argument('--circuit',type=Path,default=root/'dist/index/circuit.json');args=parser.parse_args();out=e/(args.label+'-ui');out.mkdir(exist_ok=True)
 server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Quiet);threading.Thread(target=server.serve_forever,daemon=True).start();requests=[];errors=[];browser_modules=[]
 async with async_playwright() as p:
  proxy_uri=os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
  launch={'executable_path':'/usr/bin/chromium','headless':True,'args':['--no-sandbox']}
  if proxy_uri:launch['proxy']={'server':proxy_uri,'bypass':'127.0.0.1,localhost'}
  browser=await p.chromium.launch(**launch);page=await browser.new_page(viewport={'width':1600,'height':1050});page.on('pageerror',lambda exc:errors.append(getattr(exc,'stack',None) or str(exc)));page.on('console',lambda msg:errors.append('console:'+msg.type+':'+msg.text) if msg.type=='error' else None);page.on('requestfailed',lambda req:errors.append(req.url+' '+str(req.failure)))
  async def response(r):
   if r.url.startswith('https://jscdn.tscircuit.com/'):
    requests.append({'url':r.url,'status':r.status})
    if r.status==200:
     raw=await r.body();n='analyzer-response-'+str(len(browser_modules))+'.js';(out/n).write_bytes(raw);browser_modules.append({'url':r.url,'status':r.status,'path':n,'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw)})
  page.on('response',response)
  try:
   await page.goto(f'http://127.0.0.1:{server.server_port}/',wait_until='networkidle',timeout=45000)
   await page.locator('svg').first.wait_for(timeout=10000);await page.screenshot(path=str(out/'schematic-ui.png'))
   await page.mouse.click(700,450,button='right');await page.get_by_text('Run Style Analysis',exact=True).click(timeout=15000)
   await page.get_by_role('dialog').wait_for(timeout=10000)
   await page.wait_for_function("""() => [...document.querySelectorAll('[role=status],[role=alert]')].some(e => /(?:No style issues found|\\d+ style issues? found|Style analysis failed)/.test(e.textContent))""",timeout=60000)
   dialog=page.get_by_role('dialog');text=await dialog.inner_text();(out/'dialog.txt').write_text(text+'\n');images=await dialog.locator('section img').evaluate_all('(imgs) => imgs.map(i => ({description: i.alt,src: i.getAttribute("src")}))');sections=await dialog.locator('section').all_text_contents()
   issues=[]
   from urllib.parse import unquote
   for i,img in enumerate(images):
    svg=unquote(img['src'].partition(',')[2]);n=f'issue-{i+1:03}.svg';(out/n).write_text(svg);issues.append({'heading':sections[i],'description':img['description'],'svg':n})
   await page.screenshot(path=str(out/'style-dialog.png'),full_page=True)
   result={'observed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'browser_version':browser.version,'native_viewer_version':'2.0.99','circuit_path':str(args.circuit),'circuit_sha256':hashlib.sha256(args.circuit.read_bytes()).hexdigest(),'actual_native_ui_menu_clicked':True,'dialog':text,'issues':issues,'issue_count':len(issues),'http_requests':requests,'browser_modules':browser_modules,'browser_errors':errors,'tls_verification_disabled':False}
   (out/'review.json').write_text(json.dumps(result,indent=2)+'\n');print(text[:5000],flush=True)
   if 'Style analysis failed' in text:raise RuntimeError('Native UI style analyzer failed; retained actual browser errors')
  except Exception as exc:
   (out/'failure.json').write_text(json.dumps({'error':str(exc),'browser_errors':errors,'http_requests':requests,'browser_modules':browser_modules,'body':await page.locator('body').inner_text()},indent=2)+'\n')
   await page.screenshot(path=str(out/'failure.png'),full_page=True)
   raise
  finally:
   await browser.close();server.shutdown();server.server_close()
asyncio.run(main())
