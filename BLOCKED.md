# BLOCKED — what still needs Adi / parent (Kiroween 2026)

Everything the builder could do alone is done. These items need a live
browser, an account, or a decision — the builder has no live browser and was
told not to create accounts or sign in anywhere.

## 1. Kiro sign-in (authenticates the Kiro usage story)

- **What:** Sign in to Kiro once so the interactive agent can run in this repo.
- **How (5–10 min):** install Kiro CLI (`curl -fsSL https://cli.kiro.dev/install | bash`,
  already verified working, v3.4.0), then run `kiro-cli login` and complete the
  browser OAuth flow with an **AWS Builder ID** (free, no AWS account needed),
  GitHub, or Google. Then `kiro-cli chat` in the repo — it picks up the existing
  `.kiro/` specs, steering, and hooks automatically.
- **Why it matters:** the interactive Kiro agent never ran here (see
  KIRO_USAGE.md). The `.kiro/` artefacts are real and in Kiro's formats, but a
  signed-in session makes the "built using Kiro" claim complete instead of
  partial. Parent to decide whether to do this before submitting.
- **Optional, time-boxed:** request the 4,000 free Kiroween credits on the
  Devpost Resources tab **by 1 Dec 2026, 12:00 PM PT** (needs the Kiro account
  first; credits expire 31 Dec 2026).

## 2. Public GitHub repo

- **What:** create a public GitHub repo (suggested name `pantry-phantom`) and
  push this folder. Repo contents are complete and ready (MIT LICENSE included).
- **Needs:** a GitHub account + push from parent (no GitHub account is
  configured in this environment; `git remote` is empty).
- **Note:** do NOT add `.kiro/` to `.gitignore` — the Kiroween rules require
  `/.kiro` at the repo root. (This repo's `.gitignore` already complies.)

## 3. Live application URL

- **What:** deploy the static files to a public URL (GitHub Pages is the
  simplest: Settings → Pages → deploy from the repo root).
- **Needs:** the GitHub repo from item 2. No backend needed — pure static files.

## 4. YouTube demo video (public, < 3 min)

- **What:** upload `dev/demo/pantry-phantom-demo.mp4` to YouTube as a public
  video and take its URL for the Devpost form.
- **Needs:** Adi's YouTube/Google account (upload is not the builder's task).

## 5. Devpost submission

- **What:** fill the Kiroween 2026 Devpost form (repo URL, live URL, YouTube URL,
  descriptions from SUBMISSION.md) and submit.
- **Deadline:** **Friday, 4 Dec 2026, 2:00 PM PT** (= Sat 5 Dec 2026, 05:00 WIB).
- **Needs:** a Devpost account (parent/Adi) + items 2–4 done first.

## 6. Bonus prizes (optional, parent decides)

- **Blog Prize:** publish `BLOG_DRAFT.md` (Dev.to / Hashnode / GEMMA WORKS site).
- **Social Blitz:** post `SOCIAL_DRAFT.md` from Adi's account, hashtag
  `#KiroweenHackathon26` at the start.

## Nothing else is blocked

App build, verification, screenshots, demo video, specs/steering/hooks, README,
and all submission texts are complete in `~/workspace/prize-runs/kiroween/`.
