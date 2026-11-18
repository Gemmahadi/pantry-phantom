# Blog draft — "I Built a Recipe App with a Ghost in the Kitchen"

> Draft for the Kiroween 2026 Bonus Blog Prize. For parent/Adi to publish
> (Dev.to, Hashnode, or the GEMMA WORKS site). Not published yet.

---

Every night at 6pm, the same question haunts my kitchen: *what can I cook
with what's already here?* I built **Pantry Phantom** to answer it — a free
web app that matches 24 real recipes against the food in your pantry, dressed
up in its best Halloween costume for Kiroween 2026.

## The idea

The problem is small and universal: half a fridge, no plan, no desire for
another shopping trip. The app's job is equally small: you tap the ingredients
you have, it tells you what you can cook tonight — with a match percentage,
the exact missing ingredients, and a shopping list for the rest. Fully cookable
recipes glow green. That's the whole product, and it fits in four files.

## Building spec-first with Kiro

Kiro's signature move is that it plans before it codes. Before writing any
application code, I wrote the spec the way Kiro does it:

- **`requirements.md`** — user stories with acceptance criteria in EARS
  notation: *"WHEN the user adds an ingredient, THE SYSTEM SHALL persist it in
  localStorage."* Forty-plus criteria, each testable.
- **`design.md`** — architecture (four static files, no framework, no backend),
  the data model, and the matching algorithm (a plain count — honest by design).
- **`tasks.md`** — the implementation plan, checked off as each piece landed.

Around the spec sit Kiro's **steering files** — `product.md`, `tech.md`, and
`structure.md` — the persistent project context that keeps every future change
consistent with the original intent. And two **agent hooks** in the v1 JSON
schema: one runs `node --check` on every JavaScript save, the other validates
the recipe database (24 recipes, unique ids, every ingredient reachable from
the quick-add chips). The hooks caught nothing dramatic — but the verification
step did catch a real bug: the recipe modal referenced a field the match object
doesn't have. Specs don't prevent bugs; they make them findable.

## The honest part

Here's what I want to be straight about: the interactive Kiro agent never ran
in my build environment. Kiro CLI 3.4.0 installed and verified fine on Linux,
but signing in needs a browser OAuth flow, and my build VM has no browser
session. So the specs, steering, and hooks were authored in Kiro's real,
documented formats and validated by hand — and the sign-in is a five-minute job
waiting for me. The `.kiro/` directory is ready for the live agent to pick up
the moment I sign in. I think that's the right way to treat a hackathon rule
about tool usage: show the work, don't fake it.

## What the ghost does

- 🧺 Pantry with live suggestions and quick-add by aisle
- 🔍 Match % on all 24 recipes, live as you tap
- 🍲 Real recipes: Witch's Brew Pumpkin Soup, Mummy Dogs, Black Cat Brownies
- 🛒 One-tap shopping list from any recipe's missing ingredients
- 🔮 "Summon a recipe" for indecisive nights
- 🕷️ A dark haunted-kitchen UI with floating ghosts — the Costume Contest entry

No account, no tracking, no server. Your pantry never leaves your browser.

## Try it

The code is MIT-licensed on GitHub, the app runs from any static host, and the
demo video is under three minutes. If you cook one thing from it this week,
the ghost has done its job.

*Built for Kiroween 2026. Happy Halloween — and happy cooking.* 🎃👻

---

*Word count: ~470. Suggested tags: #KiroweenHackathon26 #Kiro #webdev #javascript #halloween #opensource*
