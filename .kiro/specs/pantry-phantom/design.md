# Design — Pantry Phantom

## Overview

A zero-dependency static web app. Three files deliver the whole product:
`index.html` (structure), `styles.css` (Halloween theme), `recipes.js` (data),
`app.js` (state + rendering). No framework, no bundler, no backend. It can be
hosted anywhere static files work (GitHub Pages, Netlify, any web server) and
opened directly from disk.

## Architecture

```
index.html ── loads ──► styles.css
           ── loads ──► recipes.js  (RECIPES, PANTRY_AISLES, INGREDIENT_LABELS)
           ── loads ──► app.js      (state, matching, rendering, events)
```

### Data model

```js
Recipe = {
  id: string,            // kebab-case, unique
  name: string,          // Halloween display name
  tagline: string,       // one-line description
  time: number,          // minutes
  difficulty: "Easy" | "Medium",
  servings: number,
  tags: string[],        // "spooky" + diet tags: vegetarian | vegan | vegan-option | gluten-free
  ingredients: [{ key, name, qty }],   // key = canonical pantry key
  steps: string[]
}
```

- **Canonical keys**: every ingredient has a `key` (e.g. `"pumpkin puree"`).
  The pantry is a `Set` of keys. Matching is exact key equality — simple,
  predictable, and free of fuzzy-match surprises.
- **Quick-add coverage invariant**: every ingredient `key` used by any recipe
  MUST appear in `PANTRY_AISLES`, so any recipe can reach 100% using only the
  on-screen chips. Enforced by `scripts/validate-recipes.js`.
- **Display labels**: `INGREDIENT_LABELS` maps every key to a display name;
  free-text pantry entries fall back to title-cased input.

### State

| State | Storage | Shape |
|---|---|---|
| `pantry` | `localStorage["pp-pantry"]` | array of keys |
| `favorites` | `localStorage["pp-favs"]` | array of recipe ids |
| `shopping` | `localStorage["pp-shopping"]` | array of `{label, done}` |
| `filters` | in-memory only | `{diet, maxTime, spookyOnly, favsOnly, sort, query}` |

Rendering is a full re-render (`renderAll()`) on every state change. With 24
recipes this is trivially fast and keeps the code free of partial-update bugs.

### Matching

```
matchInfo(recipe) -> { have, missing, pct }
  have    = ingredients where pantry.has(key)
  missing = ingredients where !pantry.has(key)
  pct     = round(have / total * 100)
```

Sort: best match desc, then time asc. "Summon" picks uniformly at random from
recipes with pct >= 60 when such recipes exist, otherwise from all recipes.

### UI structure

- **Hero**: title, lede, three CTAs (Stock my pantry / Demo pantry / Summon),
  stats strip (24 recipes, 0 sign-ups, 0 wasted, 100% free & offline).
- **Pantry panel**: add-ingredient form with live suggestions, pantry chips,
  quick-add grouped by aisle (Vegetables, Dairy & Eggs, Meat & Fish, Pantry
  Staples, Spices & Extras).
- **Recipes panel**: filter bar (search, diet, max-time slider, spooky-only,
  favorites-only, sort, reset) + result count + responsive card grid.
  Cards show match badge (green 100% / gold ≥60% / muted below), name, tagline,
  meta, have/missing line, diet badges, favourite heart, View button.
- **Recipe modal**: match banner, ingredient checklist (✓ have / ○ missing),
  numbered steps, "Add missing to shopping list" (disabled at 100%),
  favourite toggle. Closes on Escape / × / backdrop click.
- **Shopping list panel**: check-off items (persisted), copy-to-clipboard,
  clear.
- **How it works**: three-step explainer. **Footer**: attribution + privacy note.

### Theming

CSS custom properties on `:root` (`--bg #0d0618`, `--card #221239`,
`--orange #ff7a1a`, `--gold #ffc93c`, `--green #7ee081`). Headings use the
"Creepster" display font from Google Fonts with a cursive/serif fallback, so
the app still renders correctly offline. Floating ghosts are a fixed,
`pointer-events: none` layer with a gentle `translateY` keyframe animation.

### Accessibility

- Cards are focusable (`tabindex="0"`) and open on Enter.
- Modal is `role="dialog"` + `aria-modal`, labelled by its title.
- All icon-only buttons have `aria-label`s; filter inputs have labels.

## Testing

- `node --check` on both JS files (also wired as a Kiro hook, see
  `.kiro/hooks/syntax-check-on-save.json`).
- `scripts/validate-recipes.js`: asserts 24 recipes, unique ids, every
  ingredient key covered by quick-add, non-empty steps/ingredients.
  (Also wired as a Kiro hook, `.kiro/hooks/validate-on-save.json`.)
- `dev/test-app.py`: Playwright end-to-end test over CDP against a local HTTP
  server — empty pantry, demo pantry, modal, shopping list, diet filter,
  search, summon — plus screenshots in `dev/screenshots/`. It asserts zero
  page errors.

## Decisions

- **Vanilla JS over a framework**: the app is small, must load instantly, and
  must run from any static host with no build step. A framework would add
  nothing but weight.
- **Exact key matching over fuzzy matching**: predictable for users ("I added
  garlic, the app knows I have garlic") and trivially testable.
- **localStorage over accounts**: privacy is a feature — no sign-up, no server,
  nothing leaves the device. This also satisfies the "free, no login" goal.
- **Static hosting over a backend**: the app needs no server at all, so the
  "working application URL" for the hackathon is a plain static deployment.
