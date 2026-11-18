# Kiroween 2026 — Submission package: Pantry Phantom

> For the parent/coordinator: everything needed to file the Devpost submission.
> Nothing here is submitted yet — all Devpost/GitHub/YouTube steps are BLOCKED
> (need parent/Adi, see BLOCKED.md).

## Hackathon

- **Event:** Kiroween 2026 — https://kiroween.devpost.com/
- **Category:** Costume Contest (any application + polished, unforgettable Halloween UI)
- **Deadline:** Friday, 4 Dec 2026, 2:00 PM PT (= Sat 5 Dec 2026, 05:00 WIB)
- **Prize pool:** $100,000 (1st $30,000, 2nd $20,000, 3rd $10,000, 4 categories
  @ $5,000 + bonuses). Entry is free.
- **Eligibility:** Indonesia is NOT on the excluded-countries list. New projects
  only (built 30 Oct – 4 Dec 2026). Team up to 3; this entry is solo (Adi / GEMMA WORKS).

## Project

- **Name:** Pantry Phantom
- **Tagline:** "What can I cook tonight with the food I already have?"
- **What it is:** A free, no-sign-up web app that matches 24 real, Halloween-named
  recipes against the ingredients in your kitchen. Match %, missing ingredients,
  shopping list, favourites, filters, random "Summon a recipe". Fully static,
  works offline, nothing leaves the browser.
- **Live URL:** _(to be filled after deploy — GitHub Pages recommended)_
- **Public GitHub repo:** _(to be created by parent — repo contents are ready in
  this folder; suggested name: `pantry-phantom`)_
- **Demo video:** `dev/demo/pantry-phantom-demo.mp4` (< 3 min) — to be uploaded to
  YouTube by parent/Adi (public), then the URL goes here.
- **License:** MIT (LICENSE file in repo root; visible in repo About section).

## Devpost fields (draft text)

### Elevator pitch (short description)

Pantry Phantom is a Halloween web app that ends the 6pm "what's for dinner?"
panic: tell it what's in your kitchen and it shows which of 24 real recipes
you can cook right now, how close you are on the rest, and what to buy. No
account, no tracking, no wasted food — just a friendly ghost in a haunted kitchen.

### What it does (long description)

Open Pantry Phantom and stock your virtual pantry — type ingredients or tap the
quick-add chips. Every recipe instantly shows a match percentage: 100% matches
glow green ("you have everything!"), the rest list exactly which ingredients
you're missing. Open any recipe for quantities and step-by-step method, send
its missing ingredients to a shopping list in one tap, save favourites, filter
by diet, time, or spookiness, or hit "Summon a recipe" and let the Phantom
decide dinner. All 24 recipes are real and cookable — Witch's Brew Pumpkin
Soup, Mummy Dogs, Ghostly Garlic Butter Pasta, Black Cat Brownies — with a
polished dark Halloween UI, floating ghosts, and pumpkin-orange accents.
Your pantry never leaves your device: it lives in localStorage, there is no
account and no server.

### How we built it (Kiro write-up — use KIRO_USAGE.md as source)

Built spec-first with Kiro: requirements in EARS notation, a design doc, and a
trackable task list under `.kiro/specs/pantry-phantom/`; steering files
(product/tech/structure) in `.kiro/steering/`; and two v1-schema agent hooks in
`.kiro/hooks/` (syntax check + recipe validation on save). Kiro CLI 3.4.0 was
installed and verified on Linux. See KIRO_USAGE.md for the full honest account,
including the one step that still needs the owner: a browser sign-in to
activate the interactive Kiro agent session.

### Challenges we ran into

- The Kiro CLI needs a browser OAuth sign-in (AWS Builder ID) that the headless
  build environment couldn't perform — so the spec/steering/hook artefacts were
  authored in Kiro's documented formats and validated by hand instead.
- The VM's Chromium kept crashing on Playwright's default launch flags
  (SIGTRAP) — worked around with a manually launched Chrome + CDP connection.
- A real bug caught by verification: `info.ingredients.length` in the recipe
  modal (the match object has no `ingredients` field) — fixed before shipping.

### What's next

- Optional: sign in to Kiro and re-run the spec tasks through the live agent.
- More recipes (seasonal sets), share-a-pantry via link, metric/imperial toggle.

## Submission checklist

- [x] Working app, verified in a real browser (Playwright, 0 page errors)
- [x] Public GitHub repo ready (contents in this folder; MIT license)
- [x] `/.kiro` directory at repo root with specs, steering, hooks (NOT in .gitignore)
- [x] Demo video < 3 min recorded (`dev/demo/pantry-phantom-demo.mp4`)
- [x] Screenshots (`dev/screenshots/`)
- [x] Honest Kiro usage write-up (`KIRO_USAGE.md`)
- [x] Blog draft (`BLOG_DRAFT.md`) + social draft (`SOCIAL_DRAFT.md`) — bonus prizes
- [ ] Push repo to public GitHub — BLOCKED (parent)
- [ ] Deploy live URL (GitHub Pages) — BLOCKED (parent)
- [ ] Upload demo video to YouTube (public) — BLOCKED (Adi/parent)
- [ ] Create Kiro account + request 4,000 free credits by 1 Dec 2026 12:00 PM PT — OPTIONAL, BLOCKED (Adi)
- [ ] Submit on Devpost before 4 Dec 2026 2:00 PM PT — BLOCKED (parent)
