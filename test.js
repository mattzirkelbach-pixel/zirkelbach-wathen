// Runtime smoke test: load dist/index.html in jsdom, run the scripts, exercise the main paths.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
const errors = [];
const vc = new (require('jsdom').VirtualConsole)();
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + (e && e.message)));
vc.on('error', (m) => errors.push('console.error: ' + m));

const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc, url: 'https://example.org/family/' });
const { window } = dom;
const { document } = window;
const PEOPLE_ = window.eval('PEOPLE'); const COUPLES_ = window.eval('COUPLES');

// jsdom lacks layout; give the tree frame a size and stub scrollIntoView
Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', { get() { return this.id === 'tree-frame' ? 1000 : 400; }, configurable: true });
Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', { get() { return this.id === 'tree-frame' ? 700 : 300; }, configurable: true });
window.HTMLElement.prototype.scrollIntoView = function () {};
window.Element.prototype.scrollIntoView = function () {};
window.requestAnimationFrame = (fn) => setTimeout(fn, 0);

function assert(cond, msg) { if (!cond) errors.push('ASSERT: ' + msg); }

setTimeout(() => {
  try {
    assert(document.querySelectorAll('#families .fam').length === 4, 'four family blurbs');
    const rows = document.querySelectorAll('#tree .prow');
    assert(rows.length >= 30, 'tree rows rendered: ' + rows.length);
    assert(document.querySelectorAll('#tree .node').length === 21, 'tree couples: ' + document.querySelectorAll('#tree .node').length);
    assert(document.querySelectorAll('#tree .link').length >= 10, 'tree links');
    const cards = document.querySelectorAll('.pcard');
    assert(cards.length === PEOPLE_ ? true : cards.length > 30, 'people cards: ' + cards.length);
    assert(document.querySelectorAll('#tl li').length > 60, 'timeline entries: ' + document.querySelectorAll('#tl li').length);
    assert(document.querySelectorAll('#jmap .route').length === 11, 'journey routes: ' + document.querySelectorAll('#jmap .route').length);
    assert(document.querySelectorAll('#jmap .place').length === 12, 'journey places');
    assert(document.querySelectorAll('#law-body tr').length === 8, 'lawmen rows');
    assert(document.querySelectorAll('#findings .finding').length === 16, 'findings: ' + document.querySelectorAll('#findings .finding').length);
    assert(document.querySelectorAll('#disagree-body tr').length === 13, 'disagreements');
    assert(document.querySelectorAll('#leads li').length === 13, 'leads');
    assert(document.querySelectorAll('#sources-list li').length === 60, 'sources: ' + document.querySelectorAll('#sources-list li').length);
    assert(document.querySelectorAll('#descendants li').length >= 12, 'descendant nodes: ' + document.querySelectorAll('#descendants li').length);
    assert(document.querySelectorAll('#unplaced li').length === 7, 'unplaced');
    assert(document.querySelectorAll('#changelog li').length >= 1, 'changelog');
    assert(document.querySelectorAll('#c-about option').length > 40, 'about options: ' + document.querySelectorAll('#c-about option').length);
    // menu opens and closes
    const mb = document.getElementById('menu-btn'), ml = document.getElementById('menu-list');
    mb.click(); assert(ml.hidden === false && mb.getAttribute('aria-expanded') === 'true', 'menu opens');
    ml.querySelector('a').click(); assert(ml.hidden === true, 'menu closes on pick');
    // form validation blocks an empty submit, accepts a filled one (fetch stubbed)
    const sent = [];
    window.fetch = (url, opts) => { sent.push({ url, body: opts && opts.body }); return Promise.resolve({ ok: true, status: 200 }); };
    const cf = document.getElementById('cform');
    cf.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    assert(sent.length === 0 && document.querySelector('#c-name').closest('.field').classList.contains('is-bad'), 'empty form rejected');
    document.getElementById('c-name').value = 'Test Cousin';
    document.getElementById('c-rel').value = 'test';
    document.getElementById('c-note').value = 'x'.repeat(5000);
    cf.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

    // every source number cited exists
    const cited = new Set();
    document.querySelectorAll('a[href^="#src-"]').forEach((a) => cited.add(a.getAttribute('href').slice(5)));
    cited.forEach((n) => assert(document.getElementById('src-' + n), 'source #' + n + ' exists'));
    assert(cited.size > 30, 'sources cited: ' + cited.size);

    // open a person via a tree row click
    const peteRow = document.querySelector('#tree .prow[data-id="pete"]');
    assert(peteRow, 'pete row');
    peteRow.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    const panel = document.getElementById('panel');
    assert(panel.hidden === false, 'panel opened');
    assert(/Peter Frank Zirkelbach/.test(document.getElementById('panel-name').textContent), 'panel name');
    assert(document.querySelectorAll('#panel-body .found li').length === 6, 'pete findings: ' + document.querySelectorAll('#panel-body .found li').length);
    assert(window.location.hash === '#person-pete', 'hash set: ' + window.location.hash);
    assert(panel.classList.contains('line-zirkelbach'), 'panel line class');

    // navigate to a kin via chip, panel stays open
    const kin = Array.from(document.querySelectorAll('#panel-body .kin button')).find((b) => /Carolyn/.test(b.textContent));
    assert(kin, 'kin chip for Carrie');
    kin.click();
    assert(/Carolyn Daily/.test(document.getElementById('panel-name').textContent), 'navigated to Carrie');
    setTimeout(() => {
      assert(panel.classList.contains('is-open'), 'panel still open after kin navigation');
      // close with Escape
      document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      setTimeout(() => {
        assert(panel.hidden === true, 'panel hidden after escape');
        assert(!/person-/.test(window.location.hash), 'hash cleared: ' + window.location.hash);
        // search
        const input = document.getElementById('people-search');
        input.value = 'rabies'; input.dispatchEvent(new window.Event('input', { bubbles: true }));
        const hits = document.querySelectorAll('.pcard');
        assert(hits.length >= 1, 'search hits for rabies: ' + hits.length);
        input.value = ''; input.dispatchEvent(new window.Event('input', { bubbles: true }));
        // timeline filter
        document.querySelector('.chip[data-tline="vogt"]').click();
        const hidden = document.querySelectorAll('#tl li.is-hidden').length, total = document.querySelectorAll('#tl li').length;
        assert(hidden > 0 && hidden < total, 'timeline filter');
        // tree filter + zoom buttons
        document.querySelector('.tree-tools .chip[data-line="daily"]').click();
        assert(document.querySelectorAll('#tree .prow.is-dim').length > 0, 'tree filter dims');
        document.getElementById('tree-in').click(); document.getElementById('tree-out').click(); document.getElementById('tree-fit').click(); document.getElementById('tree-home').click();
        const tf = document.querySelector('#tree-svg > g').getAttribute('transform');
        assert(/translate\(/.test(tf) && !/NaN/.test(tf), 'tree transform ok: ' + tf);
        // hash deep link
        window.location.hash = '#person-john1';
        setTimeout(() => {
          assert(/John Wathen/.test(document.getElementById('panel-name').textContent), 'deep link opened john1: ' + document.getElementById('panel-name').textContent);
          // every tree row id resolves to a person, every person in a couple exists
          document.querySelectorAll('#tree .prow:not(.plain)').forEach((r) => assert(PEOPLE_.some((p) => p.id === r.getAttribute('data-id')), 'row person exists ' + r.getAttribute('data-id')));
          // all parents/spouse references resolve
          const ids = new Set(PEOPLE_.map((p) => p.id));
          PEOPLE_.forEach((p) => {
            (p.parents || []).forEach((q) => assert(ids.has(q), p.id + ' parent ' + q));
            if (p.spouse) assert(ids.has(p.spouse), p.id + ' spouse ' + p.spouse);
          });
          COUPLES_.forEach((c) => { assert(ids.has(c.a), 'couple a ' + c.a); if (c.b) assert(ids.has(c.b), 'couple b ' + c.b); (c.up || []).forEach((u) => { if (u) assert(COUPLES_.some((x) => x.id === u), 'up ' + u); }); });
          assert(sent.length === 3, 'long note split into 3 relay messages: ' + sent.length);
          if (sent.length) { const m = JSON.parse(sent[0].body); assert(m.part === 1 && m.of === 3 && m.name === 'Test Cousin' && /^zw-/.test(m.id), 'relay message shape'); assert(/ntfy\.sh\/zw-family-/.test(sent[0].url), 'relay url'); }
          assert(document.getElementById('cdone').hidden === false, 'thank-you shown');
          // finished
          if (errors.length) { console.log('FAILURES:\n' + errors.join('\n')); process.exit(1); }
          else { console.log('ALL CHECKS PASSED'); process.exit(0); }
        }, 50);
      }, 400);
    }, 50);
  } catch (e) { console.log('EXCEPTION', e && e.stack); process.exit(1); }
}, 100);
