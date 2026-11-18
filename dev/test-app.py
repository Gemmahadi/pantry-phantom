import sys, time, threading, http.server, functools, subprocess, os, signal
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8321/"
OUT = "/home/hatch/workspace/prize-runs/kiroween/dev/screenshots"
CHROME = "/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome"

_handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory="/home/hatch/workspace/prize-runs/kiroween")
_srv = http.server.ThreadingHTTPServer(("127.0.0.1", 8321), _handler)
threading.Thread(target=_srv.serve_forever, daemon=True).start()

# Launch Chrome ourselves (headless, CDP) — Playwright's own launch flags SIGTRAP in this VM.
import urllib.request, json
_prof = "/tmp/pp-chrome-profile"
subprocess.run(["rm", "-rf", _prof])
_log = open("/tmp/pp-chrome.log", "w")
chrome = subprocess.Popen([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu",
    "--remote-debugging-port=9222", f"--user-data-dir={_prof}",
    "--window-size=1280,900", "--hide-scrollbars", "--mute-audio", "about:blank"],
    stdout=_log, stderr=subprocess.STDOUT)
for _ in range(40):
    try:
        urllib.request.urlopen("http://127.0.0.1:9222/json/version", timeout=2)
        break
    except Exception:
        time.sleep(0.5)
else:
    print("CHROME CDP NEVER CAME UP"); print(open("/tmp/pp-chrome.log").read()[-2000:])
    raise SystemExit(1)

errors = []
try:
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://127.0.0.1:9222")
        ctx = b.contexts[0] if b.contexts else b.new_context(viewport={"width": 1280, "height": 900})
        pg = ctx.pages[0] if ctx.pages else ctx.new_page()
        pg.set_viewport_size({"width": 1280, "height": 900})
        pg.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
        pg.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        pg.goto(BASE, wait_until="networkidle")
        time.sleep(1)
        pg.screenshot(path=f"{OUT}/01-hero-empty.png")
        print("cards with empty pantry:", pg.locator(".card").count())
        pg.click("#demo-pantry")
        time.sleep(0.6)
        print("pantry count:", pg.locator("#pantry-count").inner_text())
        print("cookable line:", pg.locator("#cookable-count").inner_text())
        print("result count:", pg.locator("#result-count").inner_text())
        pg.screenshot(path=f"{OUT}/02-demo-pantry.png")
        # open a recipe that has missing ingredients (to test the shopping list flow)
        pg.evaluate("""() => {
          const cards = [...document.querySelectorAll('.card')];
          const c = cards.find(x => !x.querySelector('.match').textContent.includes('100%'));
          (c || cards[0]).click();
        }""")
        time.sleep(0.5)
        print("modal title:", pg.locator("#modal-title").inner_text())
        print("modal match:", pg.locator("#modal-match").inner_text())
        pg.screenshot(path=f"{OUT}/03-recipe-modal.png")
        pg.click("#add-missing")
        time.sleep(0.4)
        print("shopping count:", pg.locator("#shopping-count").inner_text())
        pg.click("#modal-close")
        time.sleep(0.3)
        pg.select_option("#diet", "vegetarian")
        time.sleep(0.4)
        print("vegetarian result:", pg.locator("#result-count").inner_text())
        pg.fill("#search", "pumpkin")
        time.sleep(0.4)
        print("search pumpkin:", pg.locator("#result-count").inner_text())
        pg.fill("#search", "")
        pg.select_option("#diet", "")
        pg.click("#summon")
        time.sleep(0.5)
        print("summon modal:", pg.locator("#modal-title").inner_text())
        pg.screenshot(path=f"{OUT}/04-summon.png")
        pg.click("#modal-close")
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)
        pg.screenshot(path=f"{OUT}/05-full-page.png", full_page=True)
        b.close()
finally:
    chrome.terminate()

print("JS errors:", errors if errors else "NONE")
