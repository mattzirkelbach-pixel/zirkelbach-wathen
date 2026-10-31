# Zirkelbach–Wathen family site

One file, no build step, no accounts: `index.html` is the whole site. It works offline, on phones, in light and dark mode, and anyone can open it without Claude.

## Put it online (pick one)

- **Netlify Drop** (fastest, free, no account needed to try): go to https://app.netlify.com/drop and drag the folder that contains `index.html` onto the page. You get a public link in a few seconds.
- **GitHub Pages**: create a repository, upload `index.html`, then in the repo's Settings choose Pages and publish from the main branch. The site appears at `https://<you>.github.io/<repo>/`.
- **Cloudflare Pages**: Workers & Pages, then Create, then Upload assets, and upload the folder.
- **Any web host**: upload `index.html` to the folder your host serves.

## Share a person

Every person has a link of the form `…/index.html#person-pete` (the id is the lowercase name used in the tree, for example `person-cleo`, `person-john-daily`, `person-john1`). The panel has a "Copy link to this person" button.

## Edit it

Everything is inside `index.html`:

- The people, timeline, journeys, findings and sources are plain JavaScript data near the bottom, in the first `<script>` block (`PEOPLE`, `EVENTS`, `JOURNEY`, `LAWMEN`, `FINDINGS`, `DISAGREEMENTS`, `LEADS`, `SOURCES`).
- Each person has `family` (the family account, kept as written) and `found` (research notes, each with a confidence mark and source numbers), so the two never get mixed.
- Confidence marks: `record`, `published`, `unverified`, `conflict`.

Fonts are pulled from Google Fonts when online; without a connection the page falls back to the system serif and sans.

## What is in it

- Story: the four families and the braid of lines that meet in 1930.
- Tree: eight generations, pannable and zoomable, every name opens a page.
- People: searchable, grouped by generation, with the wider family.
- Timeline: 1670 to 2026, filterable by family line.
- Journeys: how each line reached Vanderburgh County.
- Lawmen: the family's police service.
- Research: what the records added on 31 October 2026, where they disagree with the family account, and the open questions with the record that would settle each.
- Sources: fifty numbered sources, most free to read online.

Living relatives appear by name only.
