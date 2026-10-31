// Family-site inbox: pull notes from the relay topic and file each one as a repository issue.
// Runs in GitHub Actions on a schedule (see .github/workflows/inbox.yml) and can be run by hand:
//   node scripts/inbox.mjs            -> files new notes as issues, updates inbox/seen.json
//   node scripts/inbox.mjs --dry-run  -> prints what it would file, writes nothing
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const src = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
const TOPIC = (src.match(/topic:\s*"([^"]+)"/) || [])[1];
const REPO = process.env.GITHUB_REPOSITORY || (src.match(/repo:\s*"([^"]+)"/) || [])[1];
if (!TOPIC) throw new Error('relay topic not found in src/data.js');

const DRY = process.argv.includes('--dry-run');
const SEEN_PATH = new URL('../inbox/seen.json', import.meta.url);
const seen = existsSync(SEEN_PATH) ? JSON.parse(readFileSync(SEEN_PATH, 'utf8')) : { ids: {} };
const now = Date.now();
for (const [id, t] of Object.entries(seen.ids)) if (now - t > 4 * 86400e3) delete seen.ids[id]; // the relay forgets after 12 hours; keep 4 days to be safe

const LABEL = 'family-submission';
const MAX_PER_RUN = 25;

const res = await fetch(`https://ntfy.sh/${TOPIC}/json?poll=1&since=24h`);
if (!res.ok) throw new Error(`relay answered ${res.status}`);
const lines = (await res.text()).split('\n').filter(Boolean);

const parts = new Map(); // submission id -> { base, parts: Map(part -> text), time }
for (const line of lines) {
  let m; try { m = JSON.parse(line); } catch { continue; }
  if (m.event !== 'message' || typeof m.message !== 'string') continue;
  let body; try { body = JSON.parse(m.message); } catch { continue; }
  if (!body || body.v !== 1 || typeof body.id !== 'string' || !/^zw-[a-z0-9-]{6,40}$/.test(body.id)) continue;
  const entry = parts.get(body.id) || { base: null, parts: new Map(), time: m.time, of: body.of || 1 };
  if (body.part === 1 || !body.part) entry.base = body;
  entry.parts.set(body.part || 1, String(body.note || ''));
  entry.of = Math.max(entry.of, Number(body.of) || 1);
  parts.set(body.id, entry);
}

const clean = (s, n) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, n);
const people = Object.fromEntries([...src.matchAll(/\{ id: "([a-z0-9-]+)", line: "[a-z]+", gen: -?\d+,(?: side: true,)?(?: context: true,)? name: "([^"]+)"/g)].map(m => [m[1], m[2]]));

let filed = 0;
for (const [id, e] of parts) {
  if (seen.ids[id]) continue;
  if (!e.base) continue; // first part never arrived; it will be back next run if the relay still has it
  if (filed >= MAX_PER_RUN) break;
  const b = e.base;
  const note = Array.from({ length: e.of }, (_, i) => e.parts.get(i + 1) ?? '[part missing]').join('');
  const name = clean(b.name, 120) || 'Unnamed';
  const rel = clean(b.rel, 200);
  const aboutRaw = clean(b.about, 200);
  const about = aboutRaw.startsWith('desc:') ? aboutRaw.slice(5) : (people[aboutRaw] || aboutRaw);
  const source = clean(b.source, 300);
  const sent = clean(b.t, 40);
  const title = `Family submission from ${name}${about ? `: ${about}` : ''}`.slice(0, 200);
  const body = [
    `**From:** ${name}`,
    `**Related:** ${rel || 'not given'}`,
    `**About:** ${about || 'not about one person'}`,
    `**Source:** ${source || 'not given'}`,
    `**Sent:** ${sent || new Date(e.time * 1000).toISOString()}`,
    '',
    '---',
    '',
    clean(note, 20000) || '(empty note)',
    '',
    '---',
    `Submission id: ${id}. Filed by the inbox job from the site's form. When this has been added to the site, note what changed in a comment and close the issue.`
  ].join('\n');

  if (DRY) { console.log(`would file: ${title}\n${body}\n`); filed++; seen.ids[id] = now; continue; }
  const out = execFileSync('gh', ['issue', 'create', '--repo', REPO, '--title', title, '--label', LABEL, '--body', body], { encoding: 'utf8' });
  console.log(`filed ${id}: ${out.trim()}`);
  seen.ids[id] = now;
  filed++;
}

if (!DRY) writeFileSync(SEEN_PATH, JSON.stringify(seen, null, 2) + '\n');
console.log(`${filed} filed, ${parts.size} submission(s) on the relay, ${Object.keys(seen.ids).length} remembered`);
