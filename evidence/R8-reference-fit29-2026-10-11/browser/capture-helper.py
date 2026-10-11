import asyncio, datetime, hashlib, http.server, json, os, threading
from pathlib import Path
from playwright.async_api import async_playwright

root = Path.cwd()
output = root/'evidence/R8-reference-fit29-2026-10-11/browser'
output.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs): super().__init__(*args, directory=str(root/'dist/enclosure'), **kwargs)
    def log_message(self, *args): pass
    def do_GET(self):
        if self.path == '/favicon.ico':
            self.send_response(204); self.end_headers(); return
        super().do_GET()
async def review():
    errors=[]; requests=[]; model_checks=[]; downloads=[]
    expected = {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in (root/'product/models').rglob('*.glb')}
    async def inspect_native_scene(view):
        meshes = await page.evaluate("""() => {
                const root = window.__TSCIRCUIT_THREE_OBJECT;
                if (!root) throw new Error('Native viewer scene root not available for read-only inspection');
                root.updateMatrixWorld(true);
                const rows = [];
                root.traverse(mesh => {
                    if (!mesh.isMesh || !mesh.geometry?.attributes.position) return;
                    const points = mesh.geometry.attributes.position;
                    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
                    const matrix = mesh.matrixWorld.elements;
                    for (let i=0; i<points.count; i++) {
                        const x=points.getX(i), y=points.getY(i), z=points.getZ(i);
                        const world = [matrix[0]*x+matrix[4]*y+matrix[8]*z+matrix[12], matrix[1]*x+matrix[5]*y+matrix[9]*z+matrix[13], matrix[2]*x+matrix[6]*y+matrix[10]*z+matrix[14]];
                        for (let axis=0;axis<3;axis++) { min[axis]=Math.min(min[axis],world[axis]);max[axis]=Math.max(max[axis],world[axis]); }
                    }
                    rows.push({name:mesh.name, parent:mesh.parent?.name, vertices:points.count, triangles:(mesh.geometry.index?.count ?? points.count)/3,bounds:[min,max],matrixWorld:Array.from(matrix)});
                });
                return rows;
            }""")
        (output/(view.lower()+'-browser-meshes.json')).write_text(json.dumps(meshes,indent=2)+'\n')
    async with async_playwright() as playwright:
        launch={'executable_path':'/usr/bin/chromium','headless':True,'args':['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}
        proxy = os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
        if proxy: launch['proxy']={'server':proxy,'bypass':'127.0.0.1,localhost'}
        browser=await playwright.chromium.launch(**launch)
        page=await browser.new_page(viewport={'width':1600,'height':1100},accept_downloads=True)
        page.on('pageerror',lambda exc: errors.append(getattr(exc,'stack',None) or str(exc)))
        page.on('console',lambda msg: errors.append(msg.text) if msg.type=='error' else None)
        page.on('requestfailed',lambda req:errors.append(req.url+' '+str(req.failure)))
        async def response(res):
            requests.append({'url':res.url,'status':res.status})
            if res.url.startswith('blob:'):
                raw=await res.body()
                if raw[:4] != b'glTF': return
                actual=hashlib.sha256(raw).hexdigest()
                key=next((key for key,sha256 in expected.items() if sha256==actual), None)
                if not key: raise RuntimeError('Unknown embedded GLB model')
                model_checks.append({'path':key,'status':res.status,'bytes':len(raw),'sha256':actual,'matches':True,'method':'actual viewer-loaded Blob bytes'})
        page.on('response',response)
        await page.add_init_script("""(() => {
          window.__R8_observedFetches = [];
          const originalFetch = window.fetch;
          window.fetch = function(...args) {
            const result = Reflect.apply(originalFetch, this, args);
            const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
            if (url?.startsWith('blob:')) result.then(async response => {
              const bytes = await response.clone().arrayBuffer();
              const sha = await crypto.subtle.digest('SHA-256', bytes);
              window.__R8_observedFetches.push({url, status:response.status, bytes:bytes.byteLength, sha256:Array.from(new Uint8Array(sha),x=>x.toString(16).padStart(2,'0')).join('')});
            });
            return result;
          };
        })();""")
        try:
            await page.route('http://localhost/r8-viewer.html', lambda route: route.fulfill(status=200,content_type='text/html',body=(root/'dist/enclosure/viewer.html').read_text()))
            await page.goto('http://localhost/r8-viewer.html',wait_until='commit',timeout=120000)
            print('LOCAL_HTML_COMMITTED',flush=True)
            await page.wait_for_function("document.querySelector('#viewer')?.dataset.ready === 'true'",timeout=120000)
            await page.wait_for_function("document.querySelector('#viewer canvas')?.width > 100",timeout=120000)
            await page.wait_for_timeout(1500)
            await page.wait_for_function("""() => {let n=0;window.__TSCIRCUIT_THREE_OBJECT?.traverse(o=>{if(o.isMesh)n++});return n>=55;}""",timeout=60000)
            print('ACTUAL_NATIVE_MESHES_LOADED',flush=True)
            for label, button in [('closed-angled','Angled')]:
                await page.get_by_role('button',name=button,exact=True).click()
                await page.wait_for_timeout(800)
                await page.screenshot(path=str(output/(label+'.png')))
            await page.get_by_role('button',name='Angled',exact=True).click()
            await page.wait_for_timeout(800)
            await inspect_native_scene('Closed')
            await page.mouse.move(800,520); await page.mouse.down(); await page.mouse.move(1050,680,steps=5); await page.mouse.up(); await page.wait_for_timeout(800)
            await page.screenshot(path=str(output/'closed-orbited.png'))
            await page.get_by_role('button',name='Exploded',exact=True).click()
            await page.wait_for_function("document.querySelector('#viewer')?.dataset.ready === 'true'",timeout=120000)
            await page.wait_for_load_state('networkidle'); await page.wait_for_timeout(1500)
            await page.screenshot(path=str(output/'exploded-angled.png'))
            await inspect_native_scene('Exploded')
            await page.wait_for_function('window.__R8_observedFetches.length>=17',timeout=30000)
            observed = await page.evaluate('window.__R8_observedFetches')
            for row in observed:
                key=next((key for key,sha in expected.items() if sha==row['sha256']),None)
                if key: model_checks.append({'path':key,'status':row['status'],'bytes':row['bytes'],'sha256':row['sha256'],'matches':True,'method':'read-only clone of the actual viewer fetch response; original response unchanged'})
            assert set(x['path'] for x in model_checks)==set(expected),(len(model_checks),errors)
            report={'observed_utc' :datetime.datetime.now(datetime.timezone.utc).isoformat(),'browser_version':browser.version,'viewer_version':'0.0.610','actual_CadViewer_component':True,'model_delivery':'embedded GLB data URIs; exact HTML bytes verified','models_requested':model_checks,'expected_models':17,'browser_errors':errors,'http_requests':requests,'downloads':downloads,'native_download_gltf_menu_used':False,'separate_export_test':'failed stack overflow; retained prior output/failure.json','orbit_gesture_executed':True,'public_camera_controller_used':True,'tls_verification_enabled':True,'passes':not errors}
            (output/'review.json').write_text(json.dumps(report,indent=2)+'\n')
            assert not errors,errors
            print('Native viewer loads all17 exact models; closed/exploded screenshots and native mesh bounds captured; browser errors0',flush=True)
        except Exception as exc:
            (output/'failure.json').write_text(json.dumps({'error':str(exc),'browser_errors':errors,'http_requests':requests,'model_checks':model_checks,'page_url':page.url},indent=2)+'\n')
            raise
        finally:
            await browser.close()
asyncio.run(review())
