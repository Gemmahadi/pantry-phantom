# Structure — Pantry Phantom

```
pantry-phantom/                 # repo root (this directory)
├── index.html                  # App shell: hero, pantry, recipes, shopping, modal
├── styles.css                  # Haunted-kitchen theme (CSS variables, responsive)
├── recipes.js                  # Recipe data: RECIPES, PANTRY_AISLES, INGREDIENT_LABELS
├── app.js                      # State, matching, rendering, events
├── scripts/
│   └── validate-recipes.js     # Data-integrity checks (run by hook + CI)
├── .kiro/
│   ├── specs/
│   │   └── pantry-phantom/
│   │       ├── requirements.md # EARS requirements
│   │       ├── design.md       # Architecture + decisions
│   │       └── tasks.md        # Implementation plan + verification log
│   ├── steering/
│   │   ├── product.md          # What the app is and who it is for
│   │   ├── tech.md             # Stack, conventions, commands
│   │   └── structure.md        # This file
│   ├── hooks/
│   │   ├── syntax-check-on-save.json
│   │   └── validate-on-save.json
│   └── settings/
│       └── mcp.json            # No MCP servers configured
├── dev/                        # Dev-only, not part of the shipped app
│   ├── test-app.py             # Playwright e2e test (CDP)
│   ├── screenshots/            # Verified screenshots
│   └── demo/                   # Demo video (< 3 min)
├── README.md
├── KIRO_USAGE.md               # Honest write-up of how Kiro was used
├── SUBMISSION.md               # Devpost submission package
├── BLOG_DRAFT.md               # Draft blog post (Bonus Blog Prize)
├── SOCIAL_DRAFT.md             # Draft social post (Social Blitz)
├── BLOCKED.md                  # What still needs Adi / parent
├── LICENSE                     # MIT
└── .gitignore                  # MUST NOT contain .kiro (Kiroween rule)
```

## Naming

- Recipe ids: kebab-case, unique (`witchs-brew-pumpkin-soup`).
- Ingredient keys: lowercase, singular-ish canonical names (`pumpkin puree`).
- `localStorage` keys: `pp-` prefixed.
- CSS classes: semantic, kebab-case (`.card`, `.match`, `.pct-full`).
- Hook files: kebab-case, one hook file per concern, v1 JSON schema.
