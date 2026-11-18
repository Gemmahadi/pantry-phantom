# Tech — Pantry Phantom

## Stack

- **HTML + CSS + vanilla JavaScript.** No framework, no bundler, no build step.
- **Static hosting only.** Any static host works (GitHub Pages, Netlify, nginx).
  Run locally with any static server, e.g. `python3 -m http.server`.
- **Node.js** (for validation tooling only, not required at runtime).
- **Playwright + Chromium** for end-to-end verification (see `dev/test-app.py`).

## Conventions

- One file per concern: `index.html` (structure), `styles.css` (theme),
  `recipes.js` (data), `app.js` (logic). Keep it that way.
- Recipe data is the source of truth. Never hard-code recipe facts in `app.js`.
- Every recipe ingredient MUST use a canonical `key` that appears in
  `PANTRY_AISLES` (enforced by `scripts/validate-recipes.js`). This is the
  invariant that lets any recipe reach 100% from the on-screen chips alone.
- State changes always go through a full re-render (`renderAll()`). The app is
  small; partial updates are a bug farm, not an optimisation.
- `localStorage` keys are prefixed `pp-` (`pp-pantry`, `pp-favs`, `pp-shopping`).
- No external JS dependencies at runtime. The only external request is the
  optional Google Fonts stylesheet, with a system-font fallback.

## Commands

```bash
node --check recipes.js && node --check app.js   # syntax check
node scripts/validate-recipes.js                # recipe data integrity
python3 dev/test-app.py                         # Playwright e2e + screenshots
python3 -m http.server 8321                     # serve locally
```

## Constraints

- The repo root MUST contain `.kiro/` and it MUST NOT be listed in `.gitignore`
  (Kiroween 2026 submission requirement).
- The app must work from `file://` or any static host with no server code.
- Keep total page weight small; no images are shipped (all decoration is CSS/emoji).
