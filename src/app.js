(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var P = {}; PEOPLE.forEach(function (p) { P[p.id] = p; });
  var C = {}; COUPLES.forEach(function (c) { C[c.id] = c; });
  var COUPLE_OF = {}; COUPLES.forEach(function (c) { if (c.a) COUPLE_OF[c.a] = c.id; if (c.b) COUPLE_OF[c.b] = c.id; });
  var PILL = { record: 'Record', published: 'Published', unverified: 'Not yet verified', conflict: 'Sources disagree', family: 'Family folder' };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function s(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') el.textContent = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); return; }
    if (typeof kid === 'string' || typeof kid === 'number') el.appendChild(document.createTextNode(String(kid)));
    else el.appendChild(kid);
  }
  function lineClass(line) { return 'line-' + (line || 'all'); }
  function lineName(line) { return LINES[line] ? LINES[line].name : 'The marriage'; }

  function srcLinks(nums, prefix) {
    if (!nums || !nums.length) return null;
    var brackets = prefix !== undefined;
    var span = h('span', { class: 'src' }, brackets ? '[' : 'Sources ');
    nums.forEach(function (n, i) {
      if (i) span.appendChild(document.createTextNode(', '));
      span.appendChild(h('a', { href: '#src-' + n, title: (SOURCES[n - 1] || {}).t || '' }, String(n)));
    });
    if (brackets) span.appendChild(document.createTextNode(']'));
    return span;
  }
  function pill(k) { return h('span', { class: 'pill pill-' + k, text: PILL[k] || k }); }

  /* ---------------- story ---------------- */
  function renderFamilies() {
    var box = $('#families');
    Object.keys(LINES).forEach(function (key) {
      box.appendChild(h('article', { class: 'fam ' + lineClass(key) },
        h('h3', { text: LINES[key].name }),
        h('p', { text: LINES[key].blurb })));
    });
  }

  /* ---------------- tree ---------------- */
  var UNIT = 190, BW = 172, RH = 30, PAD = 7, W = 1520, HGT = 840;
  var ROW_Y = { 7: 14, 6: 78, 5: 142, 4: 206, 3: 296, 2: 418, 1: 540, 0: 662, kids: 782 };
  var COL = { ar: 0, lp: 1, ws: 2, sm: 3, ge: 4, jm: 5, jh: 6, dm: 7, ta: 4, aw: 5, bh: 6, ba: 4, j2: 4, j1: 4 };
  var tree = { g: null, view: { x: 0, y: 0, k: 1 }, frame: null, svg: null, nodes: {}, filter: 'all' };

  function coupleHeight(c) { return ((c.b || c.bLabel) ? 2 * RH : RH) + 2 * PAD; }
  function layoutTree() {
    COUPLES.forEach(function (c) {
      if (COL[c.id] !== undefined) c.x = 92 + COL[c.id] * UNIT;
    });
    [2, 1, 0].forEach(function (gen) {
      COUPLES.filter(function (c) { return c.gen === gen; }).forEach(function (c) {
        var xs = c.up.filter(Boolean).map(function (id) { return C[id].x; });
        c.x = xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
      });
    });
    COUPLES.forEach(function (c) { c.y = ROW_Y[c.gen]; c.h = coupleHeight(c); });
  }

  function personRow(c, id, yOff) {
    var p = P[id];
    var row = s('g', { 'class': 'prow ' + lineClass(p.line), transform: 'translate(0 ' + yOff + ')', tabindex: '0', role: 'button', 'aria-label': p.name + (p.dates ? ', ' + p.dates : '') });
    row.setAttribute('data-id', id);
    row.appendChild(s('rect', { 'class': 'hit', x: 6, y: 0, width: BW - 12, height: RH, rx: 4 }));
    row.appendChild(s('rect', { 'class': 'bar', x: 6, y: 5, width: 3, height: RH - 10, rx: 1 }));
    row.appendChild(s('text', { x: 15, y: 13, text: p.label || p.name }));
    row.appendChild(s('text', { 'class': 'sub', x: 15, y: 25, text: p.dates || p.sub || '' }));
    row.addEventListener('click', function () { if (!tree.dragged) openPerson(id); });
    row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPerson(id); } });
    return row;
  }

  function plainRow(label, sub, yOff, line) {
    var row = s('g', { 'class': 'prow plain ' + lineClass(line), transform: 'translate(0 ' + yOff + ')' });
    row.appendChild(s('rect', { 'class': 'bar', x: 6, y: 5, width: 3, height: RH - 10, rx: 1 }));
    row.appendChild(s('text', { x: 15, y: 13, text: label }));
    if (sub) row.appendChild(s('text', { 'class': 'sub', x: 15, y: 25, text: sub }));
    return row;
  }
  function renderTree() {
    layoutTree();
    tree.frame = $('#tree-frame');
    tree.svg = $('#tree-svg');
    tree.svg.setAttribute('viewBox', '0 0 ' + W + ' ' + HGT);
    tree.svg.removeAttribute('width'); tree.svg.removeAttribute('height');
    tree.g = s('g');
    tree.svg.appendChild(tree.g);
    var links = s('g', { 'class': 'links' });
    var nodes = s('g', { 'class': 'nodes' });
    tree.g.appendChild(links); tree.g.appendChild(nodes);

    COUPLES.forEach(function (c) {
      if (!c.up) return;
      var ups = c.up.filter(Boolean).map(function (id) { return C[id]; });
      if (!ups.length) return;
      var topY = c.y;
      if (ups.length === 1 && Math.abs(ups[0].x - c.x) < 1) {
        var u = ups[0];
        links.appendChild(s('path', { 'class': 'link', d: 'M' + u.x + ' ' + (u.y + u.h) + ' L' + c.x + ' ' + topY }));
      } else {
        var busY = topY - 22;
        var xs = ups.map(function (u) { return u.x; }).concat([c.x]);
        var x1 = Math.min.apply(null, xs), x2 = Math.max.apply(null, xs);
        var d = 'M' + x1 + ' ' + busY + ' L' + x2 + ' ' + busY;
        ups.forEach(function (u) { d += ' M' + u.x + ' ' + (u.y + u.h) + ' L' + u.x + ' ' + busY; });
        d += ' M' + c.x + ' ' + busY + ' L' + c.x + ' ' + topY;
        links.appendChild(s('path', { 'class': 'link', d: d }));
      }
    });

    COUPLES.forEach(function (c) {
      var line = P[c.a].line;
      var node = s('g', { 'class': 'node ' + lineClass(line), transform: 'translate(' + (c.x - BW / 2) + ' ' + c.y + ')' });
      node.setAttribute('data-couple', c.id);
      node.appendChild(s('rect', { 'class': 'box', x: 0, y: 0, width: BW, height: c.h, rx: 6 }));
      node.appendChild(personRow(c, c.a, PAD));
      if (c.b) node.appendChild(personRow(c, c.b, PAD + RH));
      else if (c.bLabel) node.appendChild(plainRow(c.bLabel, c.bSub || '', PAD + RH, line));
      nodes.appendChild(node);
      tree.nodes[c.id] = node;
    });

    var dc = C.dc;
    var kidsW = 340;
    var kids = s('g', { 'class': 'kids', transform: 'translate(' + (dc.x - kidsW / 2) + ' ' + ROW_Y.kids + ')' });
    links.appendChild(s('path', { 'class': 'link', d: 'M' + dc.x + ' ' + (dc.y + dc.h) + ' L' + dc.x + ' ' + ROW_Y.kids }));
    kids.appendChild(s('rect', { x: 0, y: 0, width: kidsW, height: 46, rx: 6 }));
    kids.appendChild(s('text', { 'class': 't1', x: kidsW / 2, y: 18, 'text-anchor': 'middle', text: "Donald and Cleo's children" }));
    kids.appendChild(s('text', { x: kidsW / 2, y: 35, 'text-anchor': 'middle', text: CHILDREN_ROW }));
    nodes.appendChild(kids);

    var labelX = C.dm.x + BW / 2 + 4;
    [['dc', 'Donald and Cleo'], ['jb', 'their parents']].forEach(function (pair) {
      var c = C[pair[0]];
      nodes.appendChild(s('text', { 'class': 'rowlabel', x: labelX, y: c.y + 14, 'text-anchor': 'end', text: pair[1] }));
    });
    nodes.appendChild(s('text', { 'class': 'rowlabel', x: C.ak.x - BW / 2 - 6, y: C.ak.y + 14, 'text-anchor': 'end', text: 'grandparents' }));
    nodes.appendChild(s('text', { 'class': 'rowlabel', x: labelX, y: ROW_Y[3] - 16, 'text-anchor': 'end', text: 'the immigrants, and the earliest known' }));
    nodes.appendChild(s('text', { 'class': 'rowlabel', x: C.ta.x + BW / 2 + 10, y: ROW_Y[7] + 26, text: 'eight generations to Maryland' }));

    setupPanZoom();
    $('#tree-fit').addEventListener('click', fitTree);
    $('#tree-home').addEventListener('click', function () { if (narrow()) focusCouple('dc', 1, 70); else focusCouple('dc', 1.1); });
    $('#tree-in').addEventListener('click', function () { zoomAt(1.25, tree.frame.clientWidth / 2, tree.frame.clientHeight / 2); });
    $('#tree-out').addEventListener('click', function () { zoomAt(0.8, tree.frame.clientWidth / 2, tree.frame.clientHeight / 2); });
    $$('.tree-tools .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('.tree-tools .chip').forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on');
        tree.filter = chip.getAttribute('data-line');
        $$('.prow', tree.svg).forEach(function (row) {
          var id = row.getAttribute('data-id');
          var line = id ? P[id].line : (row.className.baseVal.match(/line-(\w+)/) || [])[1];
          row.classList.toggle('is-dim', tree.filter !== 'all' && line !== tree.filter);
        });
      });
    });
    if (narrow()) focusCouple('dc', 1, 70); else fitTree();
  }

  function applyView() {
    var v = tree.view;
    tree.g.setAttribute('transform', 'translate(' + v.x.toFixed(1) + ' ' + v.y.toFixed(1) + ') scale(' + v.k.toFixed(3) + ')');
  }
  function frameScale() {
    /* user units per CSS pixel: the viewBox is scaled to the frame width (preserveAspectRatio meet) */
    var fw = tree.frame.clientWidth || 1, fh = tree.frame.clientHeight || 1;
    return Math.min(fw / W, fh / HGT);
  }
  function fitTree() {
    var fw = tree.frame.clientWidth, fh = tree.frame.clientHeight;
    var base = frameScale();
    /* with meet, the viewBox already fits; k=1 shows the whole tree centred by the browser */
    tree.view.k = 1; tree.view.x = 0; tree.view.y = 0;
    void fw; void fh; void base;
    applyView();
  }
  function focusCouple(id, cssPerUnit, topMargin) {
    /* centres the couple horizontally; vertically centres it, or, when topMargin is given,
       places the couple that many units below the frame's top edge so nothing unrelated shows above it */
    var c = C[id];
    var base = frameScale();
    var k = Math.min(8, Math.max(0.3, cssPerUnit / base)); /* so that one tree unit is cssPerUnit screen pixels */
    var fw = tree.frame.clientWidth / base, fh = tree.frame.clientHeight / base; /* frame size in user units at k=1 */
    var offX = (fw - W) / 2, offY = (fh - HGT) / 2; /* meet-centering offsets, in user units */
    tree.view.k = k;
    tree.view.x = fw / 2 - offX - c.x * k;
    if (topMargin != null) tree.view.y = -offY - (c.y - topMargin) * k;
    else tree.view.y = fh / 2 - offY - (c.y + c.h / 2) * k;
    applyView();
  }
  function narrow() { return tree.frame.clientWidth < 900; }
  function zoomAt(f, px, py) {
    /* px, py in CSS pixels relative to the frame; convert to user units */
    var base = frameScale();
    var fw = tree.frame.clientWidth / base, fh = tree.frame.clientHeight / base;
    var offX = (fw - W) / 2, offY = (fh - HGT) / 2;
    var ux = px / base - offX, uy = py / base - offY;
    var v = tree.view;
    var nk = Math.min(8, Math.max(0.3, v.k * f));
    v.x = ux - (ux - v.x) * (nk / v.k);
    v.y = uy - (uy - v.y) * (nk / v.k);
    v.k = nk;
    applyView();
  }
  function setupPanZoom() {
    var frame = tree.frame, pointers = {}, count = 0, last = null, pinch = null, moved = 0, listening = false;
    tree.dragged = false;
    function pt(e) { var r = frame.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    function pinchState() {
      var ids = Object.keys(pointers), a = pointers[ids[0]], b = pointers[ids[1]];
      return { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
    }
    function onMove(e) {
      if (!pointers[e.pointerId]) return;
      var p = pt(e); pointers[e.pointerId] = p;
      var base = frameScale();
      if (count === 1 && last) {
        var dx = p.x - last.x, dy = p.y - last.y;
        moved += Math.abs(dx) + Math.abs(dy);
        if (moved > 4) tree.dragged = true;
        tree.view.x += dx / base; tree.view.y += dy / base; last = p; applyView();
      } else if (count === 2 && pinch) {
        var now = pinchState();
        zoomAt(now.d / pinch.d, now.mx, now.my);
        tree.view.x += (now.mx - pinch.mx) / base; tree.view.y += (now.my - pinch.my) / base; applyView();
        pinch = now; tree.dragged = true;
      }
    }
    function onUp(e) {
      if (!pointers[e.pointerId]) return;
      delete pointers[e.pointerId]; count = Object.keys(pointers).length;
      if (count === 1) { var id = Object.keys(pointers)[0]; last = pointers[id]; pinch = null; }
      if (count === 0) {
        last = null; pinch = null; frame.classList.remove('is-dragging');
        window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp);
        listening = false;
        setTimeout(function () { tree.dragged = false; }, 0);
      }
    }
    frame.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      pointers[e.pointerId] = pt(e); count = Object.keys(pointers).length;
      moved = 0; tree.dragged = false;
      if (count === 1) { last = pointers[e.pointerId]; }
      else if (count === 2) { pinch = pinchState(); }
      frame.classList.add('is-dragging');
      if (!listening) {
        window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onUp);
        listening = true;
      }
    });
    frame.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      var p = pt(e);
      zoomAt(e.deltaY < 0 ? 1.15 : 0.87, p.x, p.y);
    }, { passive: false });
    window.addEventListener('resize', function () { applyView(); });
  }
  function showInTree(id) {
    var cid = COUPLE_OF[id];
    if (!cid) return;
    closePanel();
    $('#tree').scrollIntoView({ block: 'center' });
    setTimeout(function () {
      if (narrow()) focusCouple(cid, 1, 70); else focusCouple(cid, 1.15);
      var node = tree.nodes[cid];
      node.classList.add('is-active');
      setTimeout(function () { node.classList.remove('is-active'); }, 2600);
    }, 250);
  }

  /* ---------------- people ---------------- */
  var GROUPS = [
    { t: 'Donald and Cleo', f: function (p) { return p.gen === 0 && !p.side; } },
    { t: 'Their parents', f: function (p) { return p.gen === 1 && !p.side; } },
    { t: 'Grandparents', f: function (p) { return p.gen === 2 && !p.side; } },
    { t: 'The immigrants, and the earliest known', f: function (p) { return p.gen === 3 && !p.side; } },
    { t: 'Deeper roots', f: function (p) { return p.gen >= 4 && !p.side; } },
    { t: 'The wider family', f: function (p) { return p.side; } }
  ];
  function personCard(p) {
    return h('button', { class: 'pcard ' + lineClass(p.line), type: 'button', onclick: function () { openPerson(p.id); } },
      h('span', { class: 'n', text: p.name }),
      h('span', { class: 'd', text: p.dates || (p.born ? p.born : '') }),
      h('span', { class: 'r', text: p.role || '' }),
      h('span', { class: 'tag', text: p.context ? 'Context, not an ancestor' : lineName(p.line) + ' line' }));
  }
  var people = { line: 'all', q: '' };
  function renderPeople() {
    var box = $('#people-list'); box.innerHTML = '';
    var q = people.q.trim().toLowerCase();
    var list = PEOPLE.filter(function (p) {
      if (people.line !== 'all' && p.line !== people.line) return false;
      if (!q) return true;
      var hay = [p.name, p.nick, p.dates, p.born, p.died, p.buried, p.role, (p.family || []).join(' '), (p.found || []).map(function (f) { return f.t; }).join(' '), p.children, p.siblings].join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    if (!list.length) { box.appendChild(h('p', { class: 'people-empty', text: 'No one matches that. Try a surname, a place or a year.' })); return; }
    if (q) {
      box.appendChild(h('p', { class: 'people-group', text: list.length + (list.length === 1 ? ' match' : ' matches') }));
      box.appendChild(h('div', { class: 'people-grid' }, list.map(personCard)));
      return;
    }
    GROUPS.forEach(function (g) {
      var members = list.filter(g.f);
      if (!members.length) return;
      box.appendChild(h('p', { class: 'people-group', text: g.t }));
      box.appendChild(h('div', { class: 'people-grid' }, members.map(personCard)));
    });
  }
  function setupPeople() {
    $('#people-search').addEventListener('input', function (e) { people.q = e.target.value; renderPeople(); });
    $$('.people-tools .chip[data-pline]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('.people-tools .chip[data-pline]').forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on'); people.line = chip.getAttribute('data-pline'); renderPeople();
      });
    });
    renderPeople();
  }

  /* ---------------- timeline ---------------- */
  function renderTimeline() {
    var ol = $('#tl');
    EVENTS.forEach(function (ev) {
      var li = h('li', { class: lineClass(ev.line) });
      li.setAttribute('data-line', ev.line);
      var body = h('div', { class: 'b' }, ev.t);
      if (ev.n) body.appendChild(h('span', { class: 'new', text: 'new' }));
      var refs = srcLinks(ev.s, ' ');
      if (refs) { body.appendChild(document.createTextNode(' ')); body.appendChild(refs); }
      li.appendChild(h('div', { class: 'y', text: ev.y }));
      li.appendChild(body);
      ol.appendChild(li);
    });
    $$('.chip[data-tline]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('.chip[data-tline]').forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on');
        var line = chip.getAttribute('data-tline');
        $$('#tl li').forEach(function (li) { li.classList.toggle('is-hidden', line !== 'all' && li.getAttribute('data-line') !== line); });
      });
    });
  }

  /* ---------------- journeys ---------------- */
  function renderJourneys() {
    var svg = $('#jmap'), N = {}, NW = 168, NH = 46;
    JOURNEY.nodes.forEach(function (n) { N[n.id] = n; });
    [[100, 'Where they started'], [350, 'First home in America'], [600, 'Illinois and Kentucky'], [850, 'Vanderburgh County']].forEach(function (c) {
      svg.appendChild(s('text', { 'class': 'col', x: c[0], y: 26, 'text-anchor': 'middle', text: c[1] }));
    });
    var routes = s('g'), places = s('g');
    svg.appendChild(routes); svg.appendChild(places);
    var active = null;
    function setActive(line) {
      active = (active === line) ? null : line;
      $$('.route', svg).forEach(function (r) { r.classList.toggle('is-dim', !!active && r.getAttribute('data-line') !== active); });
      $$('.place', svg).forEach(function (pl) {
        var l = pl.getAttribute('data-line');
        pl.classList.toggle('is-dim', !!active && l !== active && l !== 'all');
      });
    }
    JOURNEY.edges.forEach(function (e) {
      var a = N[e.from], b = N[e.to], d, mid, anchor = 'middle', lx = 0, ly = -7;
      if (Math.abs(a.x - b.x) < 1) {
        var up = a.y > b.y;
        var v0 = [a.x, a.y + (up ? -NH / 2 : NH / 2)], v1 = [b.x, b.y + (up ? NH / 2 : -NH / 2)];
        d = 'M' + v0 + ' L' + v1;
        mid = [(v0[0] + v1[0]) / 2, (v0[1] + v1[1]) / 2]; anchor = 'start'; lx = 9; ly = 4;
      } else {
        var q0 = [a.x + NW / 2, a.y], q3 = [b.x - NW / 2, b.y];
        var dx = (q3[0] - q0[0]) * 0.5;
        var q1 = [q0[0] + dx, q0[1]], q2 = [q3[0] - dx, q3[1]];
        d = 'M' + q0 + ' C' + q1 + ' ' + q2 + ' ' + q3;
        mid = bezMid(q0, q1, q2, q3);
      }
      var g = s('g', { 'class': 'route ' + lineClass(e.line), role: 'button', tabindex: '0', 'aria-label': e.who + ', ' + e.label });
      g.setAttribute('data-line', e.line);
      g.appendChild(s('path', { 'class': 'hit', d: d }));
      g.appendChild(s('path', { d: d }));
      g.appendChild(s('text', { x: mid[0] + lx, y: mid[1] + ly, 'text-anchor': anchor, text: e.label }));
      g.addEventListener('click', function () { setActive(e.line); });
      g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setActive(e.line); } });
      routes.appendChild(g);
    });
    JOURNEY.nodes.forEach(function (n) {
      var g = s('g', { 'class': 'place ' + lineClass(n.line), transform: 'translate(' + (n.x - NW / 2) + ' ' + (n.y - NH / 2) + ')' });
      g.setAttribute('data-line', n.line);
      g.appendChild(s('rect', { x: 0, y: 0, width: NW, height: NH, rx: 7 }));
      g.appendChild(s('text', { x: NW / 2, y: 19, 'text-anchor': 'middle', text: n.l1 }));
      g.appendChild(s('text', { 'class': 'sub', x: NW / 2, y: 35, 'text-anchor': 'middle', text: n.l2 }));
      places.appendChild(g);
    });
    var ol = $('#routes');
    JOURNEY.edges.forEach(function (e) {
      var a = N[e.from], b = N[e.to];
      ol.appendChild(h('li', { class: lineClass(e.line) }, h('b', { text: e.who }), ' ', h('span', { text: a.l1 + ' to ' + b.l1 + ', ' + e.label })));
    });
  }
  function bezMid(p0, p1, p2, p3) {
    return [(p0[0] + 3 * p1[0] + 3 * p2[0] + p3[0]) / 8, (p0[1] + 3 * p1[1] + 3 * p2[1] + p3[1]) / 8];
  }

  /* ---------------- lawmen ---------------- */
  function renderLawmen() {
    var tb = $('#law-body');
    LAWMEN.forEach(function (l) {
      var td3 = h('td', {}, l.service);
      var refs = srcLinks(l.s, ' ');
      if (refs) { td3.appendChild(document.createTextNode(' ')); td3.appendChild(refs); }
      tb.appendChild(h('tr', { class: lineClass(l.line) }, h('td', { text: l.who }), h('td', { text: l.rel }), td3));
    });
  }

  /* ---------------- research ---------------- */
  function renderResearch() {
    var box = $('#findings');
    FINDINGS.forEach(function (f) {
      box.appendChild(h('article', { class: 'finding ' + lineClass(f.line) },
        h('h3', { text: f.h }),
        h('p', { text: f.t }),
        h('div', { class: 'meta' }, pill(f.k), srcLinks(f.s))));
    });
    var tb = $('#disagree-body');
    DISAGREEMENTS.forEach(function (d) {
      tb.appendChild(h('tr', {},
        h('td', { text: d.who }),
        h('td', { 'data-l': 'Family:', text: d.fam }),
        h('td', { 'data-l': 'Record:', text: d.rec }),
        h('td', { 'data-l': '' }, srcLinks(d.s, ''))));
    });
    var ol = $('#leads');
    LEADS.forEach(function (l) {
      ol.appendChild(h('li', {},
        h('div', { class: 'q', text: l.q }),
        h('div', { class: 'how', text: l.how }),
        h('div', { class: 'links' }, l.links.map(function (lk) { return h('a', { href: lk[1], target: '_blank', rel: 'noopener', text: lk[0] }); }))));
    });
    var sl = $('#sources-list');
    SOURCES.forEach(function (src) {
      var li = h('li', { id: 'src-' + src.n });
      var body = h('div', {}, src.u ? h('a', { href: src.u, target: '_blank', rel: 'noopener', text: src.t }) : src.t, ' ', pill(src.k));
      li.appendChild(body);
      sl.appendChild(li);
    });
  }

  /* ---------------- person panel ---------------- */
  var panel = { el: null, body: null, open: false, lastFocus: null, current: null };
  function kinButton(id) {
    var p = P[id]; if (!p) return null;
    return h('button', { type: 'button', text: p.name, onclick: function () { openPerson(id); } });
  }
  function openPerson(id) {
    var p = P[id]; if (!p) return;
    panel.current = id;
    ['line-zirkelbach', 'line-daily', 'line-wathen', 'line-vogt', 'line-all'].forEach(function (c) { panel.el.classList.remove(c); });
    panel.el.classList.add(lineClass(p.line));
    $('#panel-line').textContent = p.context ? 'Context, not an ancestor' : lineName(p.line) + ' line';
    $('#panel-name').textContent = p.name + (p.nick ? ' (' + p.nick + ')' : '');
    $('#panel-dates').textContent = p.dates || '';
    var body = panel.body; body.innerHTML = '';

    var facts = h('dl', { class: 'facts' });
    [['Born', p.born], ['Died', p.died], ['Buried', p.buried], ['Married', p.married]].forEach(function (f) {
      if (!f[1]) return;
      facts.appendChild(h('dt', { text: f[0] })); facts.appendChild(h('dd', { text: f[1] }));
    });
    if (facts.childNodes.length) body.appendChild(facts);

    if (p.family && p.family.length) {
      body.appendChild(h('section', { class: 'account' }, h('h3', { text: 'In the family account' }), p.family.map(function (t) { return h('p', { text: t }); })));
    }
    if (p.found && p.found.length) {
      body.appendChild(h('section', {}, h('h3', { text: 'What the records say' }),
        h('ul', { class: 'found' }, p.found.map(function (f) {
          return h('li', {}, h('span', { text: f.t }), h('div', { class: 'meta' }, pill(f.k), srcLinks(f.s)));
        }))));
    } else if (!p.context) {
      body.appendChild(h('section', {}, h('h3', { text: 'What the records say' }), h('p', { class: 'kinlist', text: 'Nothing found yet beyond the family account.' })));
    }

    var kinSec = h('section', {}, h('h3', { text: 'Family' }));
    var chips = h('div', { class: 'kin' });
    (p.parents || []).forEach(function (pid) { var b = kinButton(pid); if (b) chips.appendChild(b); });
    if (p.spouse) { var sb = kinButton(p.spouse); if (sb) chips.appendChild(sb); }
    var kids = PEOPLE.filter(function (q) { return (q.parents || []).indexOf(id) !== -1 && q.id !== id; });
    kids.forEach(function (k) { chips.appendChild(kinButton(k.id)); });
    if (chips.childNodes.length) kinSec.appendChild(chips);
    var lists = h('div', { class: 'kinlist' });
    if (p.spouseNote) lists.appendChild(h('p', { text: 'Also married: ' + p.spouseNote + '.' }));
    if (p.children) lists.appendChild(h('p', { text: 'Children: ' + p.children + '.' }));
    if (p.siblings) lists.appendChild(h('p', { text: 'Brothers and sisters: ' + p.siblings + '.' }));
    if (lists.childNodes.length) kinSec.appendChild(lists);
    if (chips.childNodes.length || lists.childNodes.length) body.appendChild(kinSec);

    var actions = h('div', { class: 'panel-actions' });
    actions.appendChild(h('button', { class: 'btn suggest', type: 'button', text: 'Suggest a correction', onclick: function () { closePanel(); openForm({ about: id }); } }));
    if (COUPLE_OF[id]) actions.appendChild(h('button', { class: 'btn', type: 'button', text: 'Show in the tree', onclick: function () { showInTree(id); } }));
    actions.appendChild(h('button', { class: 'btn', type: 'button', text: 'Copy link to this person', onclick: function () { copyLink(id); } }));
    body.appendChild(actions);

    if (!panel.open) {
      panel.lastFocus = document.activeElement;
      panel.el.hidden = false; $('#backdrop').hidden = false;
      requestAnimationFrame(function () { panel.el.classList.add('is-open'); $('#backdrop').classList.add('is-open'); });
      panel.open = true;
    }
    body.scrollTop = 0;
    $('#panel-close').focus();
    if (location.hash !== '#person-' + id) {
      try { history.replaceState(null, '', '#person-' + id); } catch (err) { location.hash = 'person-' + id; }
    }
  }
  function closePanel() {
    if (!panel.open) return;
    panel.open = false; panel.current = null;
    panel.el.classList.remove('is-open'); $('#backdrop').classList.remove('is-open');
    var done = function () { if (!panel.open) { panel.el.hidden = true; $('#backdrop').hidden = true; } };
    setTimeout(done, 320);
    if (/^#person-/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search); } catch (err) { /* ignore */ } }
    if (panel.lastFocus && panel.lastFocus.focus) panel.lastFocus.focus();
  }
  function copyLink(id) {
    var url = location.href.split('#')[0] + '#person-' + id;
    var ok = function () { toast('Link copied'); };
    var fallback = function () {
      var inp = h('input', { value: url, readonly: 'readonly', 'aria-label': 'Link' });
      inp.style.position = 'fixed'; inp.style.left = '-999px';
      document.body.appendChild(inp); inp.select();
      try { document.execCommand('copy'); ok(); } catch (err) { toast(url); }
      document.body.removeChild(inp);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, fallback); else fallback();
  }
  var toastTimer = null;
  function toast(msg) {
    var t = $('.toast'); if (!t) { t = h('div', { class: 'toast', role: 'status' }); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }
  function setupPanel() {
    panel.el = $('#panel'); panel.body = $('#panel-body');
    $('#panel-close').addEventListener('click', closePanel);
    $('#backdrop').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.open) closePanel(); });
    function fromHash() {
      var m = /^#person-([a-z0-9-]+)$/.exec(location.hash);
      if (m && P[m[1]]) { if (panel.current !== m[1]) openPerson(m[1]); }
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------------- nav highlight ---------------- */
  function setupNav() {
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.nav a').concat($$('.menu-list a')); var map = {};
    links.forEach(function (a) { var k = a.getAttribute('href').slice(1); (map[k] = map[k] || []).push(a); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-current'); });
        (map[en.target.id] || []).forEach(function (a) { a.classList.add('is-current'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main section').forEach(function (sec) { io.observe(sec); });
  }

  /* ---------------- sections menu ---------------- */
  function setupMenu() {
    var btn = $('#menu-btn'), list = $('#menu-list'), wrap = $('#menu');
    function open() { list.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
    function close() { list.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () { if (list.hidden) open(); else close(); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !list.hidden) { close(); btn.focus(); }
      if (list.hidden) return;
      var items = $$('a', list), i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (items[i - 1] || items[items.length - 1]).focus(); }
    });
  }

  /* ---------------- descendants ---------------- */
  function descNode(n, depth) {
    var li = h('li');
    var row = h('div', { class: 'dnode' }, h('span', { class: 'nm', text: n.name }));
    if (n.dates) row.appendChild(h('span', { class: 'dt', text: n.dates }));
    if (n.spouse) row.appendChild(h('span', { class: 'sp', text: 'married ' + n.spouse }));
    if (n.open) row.appendChild(h('span', { class: 'wait', text: 'no public record yet' }));
    if (depth > 0) row.appendChild(h('button', { class: 'add', type: 'button', text: '+ add to this branch', onclick: function () { openForm({ aboutLabel: n.name, rel: '' }); } }));
    if (n.note) row.appendChild(h('span', { class: 'nt' }, n.note, ' ', srcLinks(n.s, '')));
    else if (n.s && n.s.length) row.appendChild(h('span', { class: 'src' }, srcLinks(n.s, '')));
    li.appendChild(row);
    if (n.children && n.children.length) li.appendChild(h('ul', {}, n.children.map(function (c) { return descNode(c, depth + 1); })));
    return li;
  }
  function renderDescendants() {
    $('#descendants').appendChild(h('ul', {}, descNode(DESCENDANTS, 0)));
    var ul = $('#unplaced');
    $('#unplaced-n').textContent = UNPLACED.length + (UNPLACED.length === 1 ? ' record' : ' records');
    UNPLACED.forEach(function (u) {
      ul.appendChild(h('li', {}, h('b', { text: u.name }), h('span', { text: u.t }), ' ', srcLinks(u.s, ''),
        h('div', { class: 'uactions' },
          h('button', { class: 'add', type: 'button', text: 'Part of our family', onclick: function () { openForm({ aboutLabel: u.name, preset: 'Part of our family: ' + u.name + '. How they connect: ' }); } }),
          h('button', { class: 'add', type: 'button', text: 'Not related', onclick: function () { openForm({ aboutLabel: u.name, preset: 'Not related to this family: ' + u.name + '. How I know: ' }); } }))));
    });
    var cl = $('#changelog');
    CHANGELOG.forEach(function (c) { cl.appendChild(h('li', {}, h('span', { class: 'd', text: c.d }), h('span', { text: c.t }))); });
  }

  /* ---------------- contributions ---------------- */
  var form = { busy: false, last: '' };
  function aboutOptions() {
    var sel = $('#c-about');
    var groups = [['Donald and Cleo and their ancestors', PEOPLE.filter(function (p) { return !p.side; })], ['The wider family', PEOPLE.filter(function (p) { return p.side; })]];
    groups.forEach(function (g) {
      var og = h('optgroup', { label: g[0] });
      g[1].forEach(function (p) { og.appendChild(h('option', { value: p.id, text: p.name + (p.dates ? ' (' + p.dates + ')' : '') })); });
      sel.appendChild(og);
    });
    var og2 = h('optgroup', { label: "Donald and Cleo's family" });
    (function walk(n, depth) {
      if (depth > 0) og2.appendChild(h('option', { value: 'desc:' + n.name, text: n.name }));
      (n.children || []).forEach(function (c) { walk(c, depth + 1); });
    })(DESCENDANTS, 0);
    sel.appendChild(og2);
  }
  function openForm(pre) {
    pre = pre || {};
    $('#cdone').hidden = true; $('#cfail').hidden = true; $('#cform').hidden = false;
    var sel = $('#c-about');
    if (pre.about) sel.value = pre.about;
    else if (pre.aboutLabel) {
      var opt = Array.prototype.find.call(sel.options, function (o) { return o.value === 'desc:' + pre.aboutLabel; });
      if (opt) sel.value = opt.value; else { sel.value = ''; var note = $('#c-note'); if (pre.preset) note.value = pre.preset; else if (!note.value) note.value = 'About ' + pre.aboutLabel + ': '; }
    }
    $('#contribute').scrollIntoView({ block: 'start' });
    setTimeout(function () { $(pre.about || pre.aboutLabel ? '#c-note' : '#c-name').focus(); }, 350);
  }
  function submissionText(d) {
    var about = d.about ? (P[d.about] ? P[d.about].name : d.about.replace(/^desc:/, '')) : 'not about one person';
    return ['From: ' + d.name, 'Related: ' + (d.rel || 'not given'), 'About: ' + about, '', d.note, '', 'Source: ' + (d.source || 'not given'), 'Sent: ' + d.t].join('\n');
  }
  function readForm() {
    return { name: $('#c-name').value.trim(), rel: $('#c-rel').value.trim(), about: $('#c-about').value, note: $('#c-note').value.trim(), source: $('#c-source').value.trim(), web: $('#c-web').value };
  }
  function validate(d) {
    var ok = true;
    [['#c-name', d.name.length >= 2], ['#c-note', d.note.length >= 10]].forEach(function (f) {
      var fld = $(f[0]).closest('.field'); fld.classList.toggle('is-bad', !f[1]); if (!f[1]) ok = false;
    });
    return ok;
  }
  function chunk(str, size) { var out = []; for (var i = 0; i < str.length; i += size) out.push(str.slice(i, i + size)); return out.length ? out : ['']; }
  function sendSubmission(d) {
    /* each note goes to the relay as one or more small JSON messages; the inbox job reassembles the parts */
    var id = 'zw-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    var base = { v: 1, id: id, t: d.t, name: d.name, rel: d.rel, about: d.about, source: d.source, ua: 'site' };
    var parts = chunk(d.note, 2400);
    var url = 'https://ntfy.sh/' + INBOX.topic + '?title=' + encodeURIComponent('Family site: ' + d.name) + '&tags=family';
    var seq = Promise.resolve();
    parts.forEach(function (text, i) {
      var msg = Object.assign({}, i === 0 ? base : { v: 1, id: id, t: d.t }, { part: i + 1, of: parts.length, note: text });
      seq = seq.then(function () {
        return fetch(url, { method: 'POST', body: JSON.stringify(msg) }).then(function (r) { if (!r.ok) throw new Error('relay ' + r.status); });
      });
    });
    return seq.then(function () { return id; });
  }
  function ghIssueUrl(d) {
    var title = 'Family submission from ' + d.name;
    return 'https://github.com/' + INBOX.repo + '/issues/new?labels=family-submission&title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(submissionText(d));
  }
  function setupForm() {
    aboutOptions();
    $('#c-ghlink').href = 'https://github.com/' + INBOX.repo + '/issues?q=label%3Afamily-submission';
    var f = $('#cform');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.busy) return;
      var d = readForm(); d.t = new Date().toISOString();
      if (!validate(d)) { $('#c-status').textContent = 'Add your name and a note of at least a few words.'; return; }
      var text = submissionText(d); form.last = text;
      $('#c-copy').textContent = text; $('#c-copy2').textContent = text; $('#c-gh').href = ghIssueUrl(d);
      if (d.web) { f.hidden = true; $('#cdone').hidden = false; return; } /* a bot filled the hidden field: pretend */
      var recent = 0; try { recent = Number(localStorage.getItem('zw-sent') || 0); } catch (err) { /* ignore */ }
      if (Date.now() - recent < 20000) { $('#c-status').textContent = 'Give it a moment before sending another.'; return; }
      form.busy = true; $('#c-send').disabled = true; $('#c-status').textContent = 'Sending…';
      sendSubmission(d).then(function () {
        try { localStorage.setItem('zw-sent', String(Date.now())); } catch (err) { /* ignore */ }
        f.hidden = true; $('#cdone').hidden = false; $('#cdone').scrollIntoView({ block: 'nearest' });
        $('#c-note').value = ''; $('#c-source').value = '';
      }, function () {
        f.hidden = true; $('#cfail').hidden = false;
      }).then(function () { form.busy = false; $('#c-send').disabled = false; $('#c-status').textContent = ''; });
    });
    function copyText(btn) {
      var text = form.last;
      var ok = function () { toast('Copied'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () { selectPre(); });
      else selectPre();
      function selectPre() { var pre = btn.closest('.cdone, .cfail').querySelector('pre'); var r = document.createRange(); r.selectNodeContents(pre); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); toast('Select and copy the text'); }
    }
    $('#c-copybtn').addEventListener('click', function () { copyText(this); });
    $('#c-copybtn2').addEventListener('click', function () { copyText(this); });
    $('#c-again').addEventListener('click', function () { $('#cdone').hidden = true; f.hidden = false; $('#c-note').focus(); });
    $('#c-retry').addEventListener('click', function () { $('#cfail').hidden = true; f.hidden = false; });
    ['#c-name', '#c-note'].forEach(function (s) { $(s).addEventListener('input', function () { this.closest('.field').classList.remove('is-bad'); }); });
  }

  function init() {
    renderFamilies();
    renderTree();
    setupPeople();
    renderTimeline();
    renderJourneys();
    renderLawmen();
    renderResearch();
    renderDescendants();
    setupForm();
    setupPanel();
    setupMenu();
    setupNav();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
