"""Record the Pantry Phantom demo video (<3 min) via Playwright video capture over CDP.
Chrome is launched manually (Playwright's own launch flags SIGTRAP in this VM)."""
import time, threading, http.server, functools, subprocess, urllib.request, shutil, os
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8321/"
ROOT = "/home/hatch/workspace/prize-runs/kiroween"
CHROME = "/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome"

_handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
_srv = http.server.ThreadingHTTPServer(("127.0.0.1", 8321), _handler)
threading.Thread(target=_srv.serve_forever, daemon=True).start()

shutil.rmtree("/tmp/pp-demo-profile", ignore_errors=True)
chrome = subprocess.Popen([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu",
    "--remote-debugging-port=9222", "--user-data-dir=/tmp/pp-demo-profile",
    "--window-size=1280,720", "--hide-scrollbars", "--mute-audio", "about:blank"],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for _ in range(40):
    try:
        urllib.request.urlopen("http://127.0.0.1:9222/json/version", timeout=2); break
    except Exception:
        time.sleep(0.5)
else:
    raise SystemExit("Chrome CDP never came up")

def pause(s):
    time.sleep(s)

try:
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://127.0.0.1:9222")
        ctx = b.new_context(viewport={"width": 1280, "height": 720},
                            record_video_dir=f"{ROOT}/dev/demo",
                            record_video_size={"width": 1280, "height": 720})
        pg = ctx.new_page()
        pg.goto(BASE, wait_until="networkidle")
        pause(3)                                        # hero
        pg.click("#demo-pantry")                        # stock demo pantry
        pause(2)
        pg.evaluate("document.querySelector('#recipes').scrollIntoView()")
        pause(3)                                        # recipe grid, matched
        pg.evaluate("window.scrollBy(0, 500)")
        pause(2)
        # open a recipe with missing ingredients
        pg.evaluate("""() => {
          const cards = [...document.querySelectorAll('.card')];
          const c = cards.find(x => !x.querySelector('.match').textContent.includes('100%'));
          (c || cards[0]).scrollIntoView({block: 'center'});
        }""")
        pause(1)
        pg.evaluate("""() => {
          const cards = [...document.querySelectorAll('.card')];
          const c = cards.find(x => !x.querySelector('.match').textContent.includes('100%'));
          (c || cards[0]).click();
        }""")
        pause(3)                                        # modal: ingredients
        pg.evaluate("document.querySelector('.modal-box').scrollTop = 300")
        pause(2)
        pg.click("#add-missing")                        # missing -> shopping list
        pause(2)
        pg.click("#modal-close")
        pause(1)
        # filter: vegetarian, then search pumpkin
        pg.select_option("#diet", "vegetarian")
        pause(2.5)
        pg.fill("#search", "pumpkin")
        pause(2.5)
        pg.fill("#search", "")
        pg.select_option("#diet", "")
        pause(1)
        pg.click("#summon")                             # summon a recipe
        pause(3)
        pg.click("#modal-close")
        pause(1)
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")  # shopping list
        pause(3)
        pg.evaluate("window.scrollTo(0, 0)")            # back to hero
        pause(2)
        pg.close()
        ctx.close()
        b.close()
finally:
    chrome.terminate()

print("recording done, files:", os.listdir(f"{ROOT}/dev/demo"))
