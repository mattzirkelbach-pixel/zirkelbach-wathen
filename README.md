# Zirkelbach–Wathen family site

Live at **https://mattzirkelbach-pixel.github.io/zirkelbach-wathen/**

The site is one self-contained page, built from the files in `src/`. It works on phones, in light and dark mode, and needs no account to read or to contribute.

## How the family contributes

1. On the site, **Add to the tree** (top right, or from any person's page) opens a form. No account needed.
2. The note goes to a relay and, within three hours, the **Family inbox** action files it as an issue here, labeled `family-submission`. The repository owner is notified by GitHub.
3. The family historian (or Claude, on its daily check) reviews each issue and applies it to every part of the site that shows it, following **UPDATING.md**, updates `src/data.js`, pushes, comments on the issue with what changed, and closes it. Every push republishes the site.
4. Changes are credited in the site's **Updates from the family** list.

People with a GitHub account can also open an issue directly with the *Add to the tree* template.

Everything sent in is public. Living relatives appear on the site by name only.

## Editing

- `src/data.js` holds all the content: `PEOPLE`, `COUPLES`, `EVENTS`, `JOURNEY`, `LAWMEN`, `FINDINGS`, `DISAGREEMENTS`, `LEADS`, `DESCENDANTS`, `UNPLACED`, `CHANGELOG`, `SOURCES`.
  Each person has `family` (the family account, kept as written) and `found` (research notes, each with a confidence mark and source numbers), so the two never get mixed.
- `src/body.html`, `src/style.css`, `src/app.js` are the page.
- `node build.js` writes `dist/index.html` (the whole site) and `dist/artifact.html` (the same page for a claude.ai preview).
- `npm install && npm test` builds and runs the jsdom smoke test.
- `node scripts/inbox.mjs --dry-run` shows what is waiting on the relay without filing anything.

Confidence marks on research notes: `record` (an original record or a transcription), `published` (a county history or compiled genealogy), `unverified` (a search-result title, a surname site, tradition), `conflict` (sources disagree).

## Hosting elsewhere

`dist/index.html` is the entire site. Copy it anywhere that serves static files, or open it from disk. Fonts come from Google Fonts when online and fall back to system faces offline.
