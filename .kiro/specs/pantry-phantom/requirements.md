# Requirements — Pantry Phantom

> Spec for the Kiroween 2026 entry (Costume Contest). Written in EARS notation,
> the format Kiro specs use for acceptance criteria.

## Introduction

Pantry Phantom is a free, no-sign-up web app that answers one question:
**"What can I cook tonight with the food I already have?"** The user stocks a
virtual pantry, and the app matches 24 real, cookable, Halloween-named recipes
against it, showing a match percentage and exactly which ingredients are missing.
The UI is a polished Halloween "haunted kitchen" (dark purple, pumpkin orange,
floating ghosts). The app is fully static — no backend, no build step, no tracking —
and works offline once loaded.

## Glossary

- **Pantry**: the set of ingredient keys the user says they have, stored in `localStorage`.
- **Match %**: `have / total ingredients × 100` for a recipe against the pantry.
- **Fully cookable**: a recipe with match % = 100.
- **Missing ingredient**: a recipe ingredient whose key is not in the pantry.

## Requirements

### Requirement 1 — Pantry management

**User Story:** As a home cook, I want to record what is in my kitchen, so the
app can match recipes against food I actually have.

#### Acceptance Criteria

1. WHEN the user types an ingredient and submits the form, THE SYSTEM SHALL add
   it to the pantry and persist it in `localStorage`.
2. WHEN the user types at least 2 characters, THE SYSTEM SHALL suggest matching
   known ingredients that are not already in the pantry.
3. WHEN the user taps a quick-add chip, THE SYSTEM SHALL toggle that ingredient
   in or out of the pantry.
4. WHEN the user clicks a pantry chip, THE SYSTEM SHALL remove that ingredient
   from the pantry.
5. WHEN the user clicks "Clear pantry", THE SYSTEM SHALL empty the pantry.
6. WHEN the page reloads, THE SYSTEM SHALL restore the pantry from `localStorage`.

### Requirement 2 — Recipe matching

**User Story:** As a home cook, I want to see which recipes I can cook with what
I have, so I do not need an extra shopping trip.

#### Acceptance Criteria

1. WHEN the pantry changes, THE SYSTEM SHALL recompute the match % of every recipe.
2. WHEN a recipe's match % is 100, THE SYSTEM SHALL display it with a green
   "100% match" badge and the text "you have everything!".
3. WHEN a recipe's match % is below 100, THE SYSTEM SHALL list the missing
   ingredients by name (first 3, then an ellipsis).
4. WHEN the pantry is empty, THE SYSTEM SHALL still list all recipes (all at 0%
   match) so the user can browse.
5. THE SYSTEM SHALL ship with at least 20 real recipes, each with real ingredients,
   quantities, and numbered steps that produce the dish as named.

### Requirement 3 — Discovery: search, filter, sort

**User Story:** As a home cook, I want to narrow recipes by diet, time, and taste,
so I find tonight's dinner fast.

#### Acceptance Criteria

1. WHEN the user types in the search box, THE SYSTEM SHALL filter recipes by name,
   tagline, or ingredient, live.
2. WHEN the user selects a diet (Vegetarian / Vegan / Gluten-free), THE SYSTEM
   SHALL show only recipes tagged with that diet.
3. WHEN the user moves the max-time slider, THE SYSTEM SHALL show only recipes
   whose cooking time is at or below the selected value.
4. WHEN the user enables "Spooky only", THE SYSTEM SHALL show only Halloween-themed recipes.
5. WHEN the user enables "Favorites only", THE SYSTEM SHALL show only favourited recipes.
6. WHEN the user changes the sort control, THE SYSTEM SHALL order recipes by best
   match, quickest first, or name A–Z.
7. WHEN no recipe matches the active filters, THE SYSTEM SHALL show an empty state
   with a "Clear all filters" action.

### Requirement 4 — Recipe detail

**User Story:** As a home cook, I want the full recipe before I start cooking,
so I know the steps and what I still need.

#### Acceptance Criteria

1. WHEN the user opens a recipe, THE SYSTEM SHALL show its name, tagline, time,
   difficulty, servings, match %, and full ingredient list with quantities.
2. WHEN an ingredient is in the pantry, THE SYSTEM SHALL mark it with a green
   check; WHEN it is missing, THE SYSTEM SHALL mark it with a gold circle.
3. WHEN the user opens a recipe, THE SYSTEM SHALL show its preparation steps in order.
4. WHEN the user presses Escape or the close button or the backdrop, THE SYSTEM
   SHALL close the recipe detail.

### Requirement 5 — Shopping list

**User Story:** As a home cook, I want missing ingredients collected in one list,
so my next shop is a single trip.

#### Acceptance Criteria

1. WHEN the user clicks "Add missing to shopping list" in a recipe, THE SYSTEM
   SHALL add each missing ingredient (with quantity) to the shopping list, without duplicates.
2. WHEN a recipe has no missing ingredients, THE SYSTEM SHALL disable that button.
3. WHEN the user checks an item, THE SYSTEM SHALL mark it done (struck through)
   and persist that state.
4. WHEN the user clicks "Copy list", THE SYSTEM SHALL copy the plain-text list
   to the clipboard.
5. WHEN the user clicks "Clear list", THE SYSTEM SHALL empty the shopping list.
6. WHEN the page reloads, THE SYSTEM SHALL restore the shopping list from `localStorage`.

### Requirement 6 — Favorites and random pick

**User Story:** As a returning cook, I want to save favourites and get a surprise
pick, so dinner decisions are easy.

#### Acceptance Criteria

1. WHEN the user toggles a recipe's heart, THE SYSTEM SHALL persist the favourite
   in `localStorage` and update the heart state everywhere.
2. WHEN the user clicks "Summon a recipe", THE SYSTEM SHALL open a random recipe,
   preferring recipes with a match of 60% or higher when any exist.

### Requirement 7 — Halloween presentation (Costume Contest)

**User Story:** As a Kiroween judge, I want the app to look unmistakably Halloween,
so the Costume Contest theme is visible in every screen.

#### Acceptance Criteria

1. THE SYSTEM SHALL use a dark haunted-kitchen palette (deep purple background,
   pumpkin-orange accents, gold highlights) on every screen.
2. THE SYSTEM SHALL give every recipe a Halloween name while keeping its ingredients
   and steps real and cookable.
3. THE SYSTEM SHALL include floating ghost/pumpkin decorations that do not interfere
   with content or clicks.
4. THE SYSTEM SHALL remain fully usable on a 360 px wide phone screen.

### Requirement 8 — Static, private, offline

**User Story:** As a user, I want the app to work without an account or server,
so my pantry data never leaves my device.

#### Acceptance Criteria

1. THE SYSTEM SHALL run as static files (`index.html` + CSS + JS) with no build
   step and no server-side code.
2. THE SYSTEM SHALL send no pantry, favourite, or shopping data to any server.
3. THE SYSTEM SHALL work with no network after first load, except for the optional
   Google Fonts stylesheet (system-font fallback applies when it is unavailable).
