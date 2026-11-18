# Tasks — Pantry Phantom

Spec: `.kiro/specs/pantry-phantom/` — requirements.md, design.md, tasks.md.
Status: all tasks implemented and verified 18 Nov 2026 (see Verification below).

## Implementation tasks

- [x] 1. Create the static app shell
  - [x] 1.1 `index.html`: hero, pantry panel, recipes panel, shopping list,
        how-it-works, footer, recipe modal skeleton
  - [x] 1.2 `styles.css`: haunted-kitchen theme (CSS variables, responsive grid,
        floating-ghost layer, modal, mobile ≤640px rules)
  - [x] 1.3 Favicon as inline SVG ghost; Creepster display font with system fallback

- [x] 2. Build the recipe database (`recipes.js`)
  - [x] 2.1 24 real recipes with Halloween names, real ingredients/quantities/steps
  - [x] 2.2 Canonical ingredient keys + `PANTRY_AISLES` quick-add groups
        (Vegetables, Dairy & Eggs, Meat & Fish, Pantry Staples, Spices & Extras)
  - [x] 2.3 `INGREDIENT_LABELS` display-name map for every key

- [x] 3. Implement app logic (`app.js`)
  - [x] 3.1 Pantry state in `localStorage` + add form with live suggestions
  - [x] 3.2 Quick-add chips (toggle) and pantry chips (remove), clear pantry
  - [x] 3.3 `matchInfo()` scoring + full re-render on state change
  - [x] 3.4 Recipe cards with match badges, diet badges, favourite hearts
  - [x] 3.5 Filters: search, diet, max-time slider, spooky-only, favourites-only,
        sort (match / quickest / A–Z), reset, empty state
  - [x] 3.6 Recipe modal: have/missing checklist, steps, add-missing-to-shopping
        (disabled at 100%), favourite toggle, Escape/backdrop close
  - [x] 3.7 Shopping list: check-off (persisted), copy to clipboard, clear,
        duplicate-safe adds
  - [x] 3.8 "Summon a recipe" (random, prefers ≥60% matches) + demo pantry button

- [x] 4. Add Kiro project configuration (`.kiro/`)
  - [x] 4.1 Specs: `requirements.md` (EARS), `design.md`, `tasks.md` (this file)
  - [x] 4.2 Steering: `product.md`, `tech.md`, `structure.md`
  - [x] 4.3 Hooks (v1 schema, per kiro.dev/docs/hooks): syntax check + recipe
        validation on save
  - [x] 4.4 `settings/mcp.json` (no MCP servers configured)

- [x] 5. Add validation tooling
  - [x] 5.1 `scripts/validate-recipes.js` — recipe integrity checks
        (count, unique ids, quick-add coverage, non-empty fields)
  - [x] 5.2 `node --check` on `recipes.js` and `app.js`

- [x] 6. Verify end to end
  - [x] 6.1 Playwright test (`dev/test-app.py`) over CDP: empty pantry → demo
        pantry (16 items, 1 fully cookable) → modal 88% → shopping +1 →
        vegetarian filter (17) → search "pumpkin" (2) → summon — zero page errors
  - [x] 6.2 Screenshots reviewed: hero, recipe grid, modal (`dev/screenshots/`)
  - [x] 6.3 Demo video recorded (`dev/demo/pantry-phantom-demo.mp4`, < 3 min)

## Verification (18 Nov 2026, VM)

- `node --check recipes.js && node --check app.js` — clean.
- `node scripts/validate-recipes.js` — 24 recipes, unique ids, all ingredient
  keys covered by quick-add. (One real bug found and fixed during verification:
  `info.ingredients.length` in `openRecipe` — `matchInfo` returns no
  `ingredients` field; fixed to `recipe.ingredients.length`.)
- Playwright run: exit 0, 0 page errors. The only console entry was the Google
  Fonts stylesheet failing through the VM's egress proxy
  (`ERR_TUNNEL_CONNECTION_FAILED`); the system-font fallback renders correctly,
  and the font loads normally on an unrestricted network.

## Known limitations

- The Creepster display font needs network access to Google Fonts; offline it
  falls back to a serif face (still readable, less spooky).
- No user accounts or cloud sync by design (privacy feature, Requirement 8).
