# Applying a family submission

Every addition or correction has to reach every part of the site that shows it, not just one text field.
All content lives in `src/data.js`; the page builds every view from it. Work through this list for each submission.

## 1. Where the fact goes

| The submission is about… | Edit | What that changes on the site |
|---|---|---|
| Someone below Donald and Cleo (their children, grandchildren, spouses) | `DESCENDANTS` node: `name`, `dates` ("born – died", e.g. `"1950 – 2025"`), `spouse` (name, then dates in parentheses, then the marriage year), `spouseLife: [born, died]`, `note`, `s`, `children` | The interactive tree under Donald and Cleo, the "Donald and Cleo's family" list, the form's "About" menu, and the "living in [year]" count on the timeline |
| An ancestor or relative already in `PEOPLE` | The person's `dates`, `born`, `died`, `buried`, `role`, `parents`, `spouse`, `children`, `siblings`, and `found` (one line per new fact, with a confidence mark and source numbers). Leave `family` as written; it is the family's own account. | The person's page, their card under People, the pedigree tree rows, search, the form menu, the living-in count |
| A new ancestor | A `PEOPLE` entry, plus a `COUPLES` entry (with `up` links) if they belong in the pedigree | All of the above, plus the pedigree tree |
| A move to a new place, or new dates at a place | `PLACES` (`at: [[from, to, rough headcount]]`) and a `ROUTES` entry (`from`, `to`, `y`, `dur`, `line`, `who`, `s`) | The globes (lines and glow), "Where the family was", the camera's framing |
| A dated event | `EVENTS` (`y`, `line`, `t`, `s`) | The timeline beside the globe |
| Police, sheriff or military service | `SERVICE` (chart bars) and `LAWMEN` (table rows) | The Lawmen chapter |
| A record that contradicts another | `DISAGREEMENTS`, and mark the `found` line `conflict` | The Research chapter, the person's page |
| Someone in `UNPLACED` confirmed or ruled out | Move them into `DESCENDANTS` or `PEOPLE`, or delete them from `UNPLACED` | The "not yet placed" fold, and the tree if confirmed |
| A crossing worth narrating at the top of the page | `STORY` in `src/app.js` | The opening globe's captions and beat dots |

## 2. Always

- Keep new entries as short as the ones around them. For descendants and spouses: name, dates, who they married, their children, and for the deceased where they are buried. Someone who married in gets their name, dates and the marriage, not their siblings, parents, schooling, career or personal background. If a source gives more, cite it and leave the detail in the source.

- Add the source to `SOURCES` (next number, with `u` link and `k` = `record` | `published` | `unverified`) and cite it in every `s` list you touched.
- Add a line to `CHANGELOG` (newest first) saying what changed and who sent it in (first name only).
- If a fact changes a count the smoke test checks (sources, unplaced, findings, tree couples), update `test.js` to match.
- Living people: name and relationship only, exactly as a family member or an obituary gives them. No addresses, birthdays, or anything from a data broker.

## 3. Check and ship

```
node build.js && node test.js        # must print ALL CHECKS PASSED
git commit -am "…" && git push       # Pages republishes in about a minute
```

Then comment on the issue with what changed and where it shows on the site, and close it.
