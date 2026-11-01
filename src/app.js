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
      var L = LINES[key];
      var device;
      if (L.arms) {
        device = document.createElementNS(SVGNS, 'svg'); device.setAttribute('class', 'arms'); device.setAttribute('role', 'img'); device.setAttribute('aria-label', L.armsCap);
        var u = document.createElementNS(SVGNS, 'use'); u.setAttribute('href', '#' + L.arms); device.appendChild(u);
      } else {
        device = document.createElementNS(SVGNS, 'svg'); device.setAttribute('class', 'arms mark-only'); device.setAttribute('role', 'img'); device.setAttribute('aria-label', L.armsCap);
        var u2 = document.createElementNS(SVGNS, 'use'); u2.setAttribute('href', '#' + L.mark); device.appendChild(u2);
      }
      box.appendChild(h('article', { class: 'plate ' + lineClass(key) },
        h('div', { class: 'plate-top' }, device, h('div', { class: 'plate-title' }, h('h3', { text: L.name }), h('span', { class: 'arms-kind', text: L.armsKind === 'sept' ? 'Arms of the name' : L.armsKind === 'place' ? 'Arms of the place they left' : 'No arms recorded' }))),
        h('p', { class: 'meaning', text: L.meaning }),
        h('p', { text: L.blurb }),
        h('p', { class: 'arms-cap', text: L.armsCap }),
        h('div', { class: 'route' }, h('b', { text: L.from }), h('span', { class: 'arrow', text: '→' }), h('b', { text: L.to }), h('span', { text: L.when }))));
    });
  }

  /* ---------------- tree ---------------- */
  var UNIT = 190, BW = 172, RH = 30, PAD = 7, W = 1520, HGT = 1250;
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
    var by = yearOf(p.dates && /^\d{4}/.test(p.dates) ? p.dates : p.born); if (by) row.setAttribute('data-born', String(by));
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
        links.appendChild(s('path', { 'class': 'link', 'data-for': c.id, d: 'M' + u.x + ' ' + (u.y + u.h) + ' L' + c.x + ' ' + topY }));
      } else {
        var busY = topY - 22;
        var xs = ups.map(function (u) { return u.x; }).concat([c.x]);
        var x1 = Math.min.apply(null, xs), x2 = Math.max.apply(null, xs);
        var d = 'M' + x1 + ' ' + busY + ' L' + x2 + ' ' + busY;
        ups.forEach(function (u) { d += ' M' + u.x + ' ' + (u.y + u.h) + ' L' + u.x + ' ' + busY; });
        d += ' M' + c.x + ' ' + busY + ' L' + c.x + ' ' + topY;
        links.appendChild(s('path', { 'class': 'link', 'data-for': c.id, d: d }));
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

    tree.descLinks = links; tree.descNodes = nodes; renderDescTree();

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
    $('#tree-home').addEventListener('click', function () { focusCouple('dc', narrow() ? 1 : 1.1); });
    $('#tree-in').addEventListener('click', function () { zoomAt(1.25, tree.frame.clientWidth / 2, tree.frame.clientHeight / 2); });
    $('#tree-out').addEventListener('click', function () { zoomAt(0.8, tree.frame.clientWidth / 2, tree.frame.clientHeight / 2); });
    $$('.tree-tools .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('.tree-tools .chip').forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on');
        tree.filter = chip.getAttribute('data-line');
        applyLineFilter(true);
      });
    });
    fitTree();
  }


  /* ---------- descendants inside the tree: expandable, with add points ---------- */
  var DW = 150, DH = 44, DGAP = 14, DROW = 96, DTOP = 790;
  var descOpen = {};
  function descKey(path) { return path.join('/'); }
  function descWidth(n, path) {
    var kids = n.children || [];
    var open = descOpen[descKey(path)];
    if (!open || !kids.length) return DW;
    var w = kids.reduce(function (a, c, i) { return a + descWidth(c, path.concat(i)) + DGAP; }, 0) + DW; /* + the add card */
    return Math.max(DW, w);
  }
  function renderDescTree() {
    var g = tree.descG; if (g) g.parentNode.removeChild(g);
    var lg = tree.descLG; if (lg) lg.parentNode.removeChild(lg);
    g = tree.descG = s('g', { 'class': 'desc-g' }); lg = tree.descLG = s('g', { 'class': 'desc-links' });
    tree.descLinks.appendChild(lg); tree.descNodes.appendChild(g);
    var dc = C.dc, kids = DESCENDANTS.children;
    descOpen[''] = true;
    var total = kids.reduce(function (a, c, i) { return a + descWidth(c, [i]) + DGAP; }, 0) + DW;
    var x = dc.x - total / 2, busY = DTOP - 22;
    lg.appendChild(s('path', { 'class': 'link', d: 'M' + dc.x + ' ' + (dc.y + dc.h) + ' L' + dc.x + ' ' + busY }));
    var centers = [];
    kids.forEach(function (c, i) { var w = descWidth(c, [i]); centers.push(placeDesc(c, [i], x + w / 2, DTOP, g, lg)); x += w + DGAP; });
    var addC = x + DW / 2; addCard(g, addC, DTOP, "Donald and Cleo's children", 'Add a child');
    centers.push(addC);
    lg.appendChild(s('path', { 'class': 'link', d: 'M' + Math.min.apply(null, centers) + ' ' + busY + ' L' + Math.max.apply(null, centers) + ' ' + busY + centers.map(function (cx) { return ' M' + cx + ' ' + busY + ' L' + cx + ' ' + DTOP; }).join('') }));
    if (tree.filter && tree.filter !== 'all') applyLineFilter(false);
  }
  function placeDesc(n, path, cx, y, g, lg) {
    var key = descKey(path), kids = n.children || [], open = !!descOpen[key];
    var card = s('g', { 'class': 'dcard prow line-zirkelbach' + (n.open ? ' is-open-branch' : ''), transform: 'translate(' + (cx - DW / 2) + ' ' + y + ')', tabindex: '0', role: 'button',
      'aria-label': n.name + (n.dates ? ', ' + n.dates : '') + (kids.length ? (open ? ', expanded' : ', has ' + kids.length + ' below') : '') });
    var cby = n.dates && /^\d{1,2} \w+ \d{4}|^\d{4}/.test(n.dates) ? yearOf(n.dates) : null; if (cby && !/died/.test(n.dates)) card.setAttribute('data-born', String(cby));
    card.appendChild(s('rect', { 'class': 'dbox', x: 0, y: 0, width: DW, height: DH, rx: 6 }));
    card.appendChild(s('rect', { 'class': 'bar', x: 6, y: 7, width: 3, height: DH - 14, rx: 1 }));
    var nm = n.name.replace(/ “[^”]+”/, '').replace(/^(\S+) .* (\S+)$/, function (m, a, b) { return m.length > (kids.length ? 17 : 22) ? a + ' ' + b : m; });
    var lim = kids.length ? 17 : 22, slim = kids.length ? 20 : 25;
    card.appendChild(s('text', { x: 15, y: 18, text: nm.length > lim ? nm.slice(0, lim - 1) + '…' : nm }));
    var sub = n.dates || (n.spouse ? 'm. ' + n.spouse.split(',')[0] : (n.open ? 'no public record yet' : ''));
    card.appendChild(s('text', { 'class': 'sub', x: 15, y: 33, text: sub.length > slim ? sub.slice(0, slim - 1) + '…' : sub }));
    if (kids.length) {
      card.appendChild(s('circle', { 'class': 'dtog', cx: DW - 14, cy: DH / 2, r: 9 }));
      card.appendChild(s('text', { 'class': 'dtog-t', x: DW - 14, y: DH / 2 + 4, 'text-anchor': 'middle', text: open ? '−' : String(kids.length) }));
    }
    function act() {
      if (tree.dragged) return;
      if (kids.length) { descOpen[key] = !open; renderDescTree(); }
      else openDescPanel(n);
    }
    card.addEventListener('click', act);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    card.addEventListener('dblclick', function () { openDescPanel(n); });
    g.appendChild(card);
    if (open && kids.length) {
      var ny = y + DROW, busY = ny - 22, x = cx - descWidth(n, path) / 2, centers = [];
      kids.forEach(function (c, i) { var w = descWidth(c, path.concat(i)); centers.push(placeDesc(c, path.concat(i), x + w / 2, ny, g, lg)); x += w + DGAP; });
      var addC = x + DW / 2; addCard(g, addC, ny, n.name, 'Add someone'); centers.push(addC);
      lg.appendChild(s('path', { 'class': 'link', d: 'M' + cx + ' ' + (y + DH) + ' L' + cx + ' ' + busY + ' M' + Math.min.apply(null, centers) + ' ' + busY + ' L' + Math.max.apply(null, centers) + ' ' + busY + centers.map(function (c2) { return ' M' + c2 + ' ' + busY + ' L' + c2 + ' ' + ny; }).join('') }));
    }
    return cx;
  }
  function addCard(g, cx, y, parentName, label) {
    var a = s('g', { 'class': 'daddcard', transform: 'translate(' + (cx - DW / 2) + ' ' + y + ')', tabindex: '0', role: 'button', 'aria-label': label + ' under ' + parentName });
    a.appendChild(s('rect', { x: 0, y: 0, width: DW, height: DH, rx: 6 }));
    a.appendChild(s('text', { x: DW / 2, y: 27, 'text-anchor': 'middle', text: '+ ' + label }));
    var go = function () { if (!tree.dragged) openForm({ aboutLabel: parentName, preset: label === 'Add a child' ? "Adding to Donald and Cleo's children: " : 'Adding under ' + parentName + ': ' }); };
    a.addEventListener('click', go);
    a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    g.appendChild(a);
  }
  function openDescPanel(n) {
    /* a lightweight panel for descendants, reusing the person drawer */
    panel.current = 'desc';
    ['line-zirkelbach', 'line-daily', 'line-wathen', 'line-vogt', 'line-all'].forEach(function (c) { panel.el.classList.remove(c); });
    panel.el.classList.add('line-zirkelbach');
    $('#panel-mark-use').setAttribute('href', '#mark-zirkelbach');
    highlightLineage(null);
    $('#panel-line').textContent = "Donald and Cleo's family";
    $('#panel-name').textContent = n.name;
    $('#panel-dates').textContent = n.dates || '';
    var body = panel.body; body.innerHTML = '';
    var facts = h('dl', { class: 'facts' });
    if (n.spouse) { facts.appendChild(h('dt', { text: 'Married' })); facts.appendChild(h('dd', { text: n.spouse })); }
    if (n.children && n.children.length) { facts.appendChild(h('dt', { text: 'Children' })); facts.appendChild(h('dd', { text: n.children.map(function (c) { return c.name; }).join(', ') })); }
    if (facts.childNodes.length) body.appendChild(facts);
    body.appendChild(h('section', {}, h('h3', { text: 'What the records say' }),
      h('p', { class: 'kinlist' }, n.note || (n.open ? 'No public record yet. Living relatives appear by name only.' : 'Named in a relative\'s obituary. Living relatives appear by name only.'), ' ', srcLinks(n.s, ''))));
    body.appendChild(h('div', { class: 'panel-actions' },
      h('button', { class: 'btn suggest', type: 'button', text: 'Add or correct', onclick: function () { closePanel(); openForm({ aboutLabel: n.name }); } })));
    if (!panel.open) {
      panel.lastFocus = document.activeElement; panel.el.hidden = false; $('#backdrop').hidden = false;
      requestAnimationFrame(function () { panel.el.classList.add('is-open'); $('#backdrop').classList.add('is-open'); });
      panel.open = true;
    }
    $('#panel-close').focus();
  }


  function lineOfRow(row) {
    if (row.classList.contains('dcard') || row.classList.contains('daddcard')) return 'zirkelbach';
    var id = row.getAttribute('data-id');
    if (id && P[id]) return P[id].line;
    var m = (row.getAttribute('class') || '').match(/line-(\w+)/); return m ? m[1] : 'all';
  }
  function applyLineFilter(zoom) {
    var f = tree.filter || 'all', box = null;
    $$('.prow, .daddcard', tree.svg).forEach(function (row) {
      var on = f === 'all' || lineOfRow(row) === f;
      row.classList.toggle('is-dim', !on);
      if (on && f !== 'all') {
        var g = row.closest('.node') || row; if (!g.getBBox) return; var b = g.getBBox(), tr = (g.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
        var x = (tr ? +tr[1] : 0) + b.x, y = (tr ? +tr[2] : 0) + b.y;
        if (row.closest('.node') !== g) { /* standalone row */ }
        box = box ? [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x + b.width), Math.max(box[3], y + b.height)] : [x, y, x + b.width, y + b.height];
      }
    });
    $$('.node', tree.svg).forEach(function (n) { n.classList.toggle('is-dim', f !== 'all' && !n.querySelector('.prow:not(.is-dim)')); });
    $$('.link', tree.svg).forEach(function (l) { l.classList.toggle('is-dim', f !== 'all'); });
    if (!zoom) return;
    if (f === 'all' || !box) fitTree(); else fitBox(box);
  }
  function fitBox(b) {
    var base = frameScale();
    var fw = tree.frame.clientWidth / base, fh = tree.frame.clientHeight / base;
    var offX = (fw - W) / 2, offY = (fh - HGT) / 2;
    var bw = Math.max(200, b[2] - b[0]), bh = Math.max(150, b[3] - b[1]);
    var k = Math.min(8, Math.max(0.3, Math.min(fw / bw, fh / bh) * 0.9));
    tree.view.k = k;
    tree.view.x = fw / 2 - offX - (b[0] + b[2]) / 2 * k;
    tree.view.y = fh / 2 - offY - (b[1] + b[3]) / 2 * k;
    applyView();
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
    var ws = p.name.replace(/[“”"().]/g, '').split(/\s+/).filter(function (w) { return /^[A-Z]/.test(w) && !/^(Jr|Sr|The|Gen)$/.test(w); });
    var initials = ws.length > 1 ? ws[0][0] + ws[ws.length - 1][0] : (ws[0] || '?')[0];
    return h('button', { class: 'pcard ' + lineClass(p.line), type: 'button', onclick: function () { openPerson(p.id); } },
      h('span', { class: 'mono', 'aria-hidden': 'true', text: initials }),
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

  /* ---------------- timeline (drives the globe) ---------------- */
  function yearOf(str) { var m = /(\d{4})/.exec(str || ''); return m ? +m[1] : null; }
  function renderTimeline() {
    var ol = $('#tl');
    EVENTS.forEach(function (ev) {
      var li = h('li', { class: lineClass(ev.line) });
      li.setAttribute('data-line', ev.line);
      var y = yearOf(ev.y); if (y) li.setAttribute('data-year', String(y));
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
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var y = +en.target.getAttribute('data-year');
          if (y && !TIME.playing && !TIME.scrubbing) TIME.set(y, 'scroll');
        });
      }, { rootMargin: '-42% 0px -50% 0px', threshold: 0 });
      $$('#tl li[data-year]').forEach(function (li) { io.observe(li); });
    }
    TIME.on(function (y) {
      var best = null;
      $$('#tl li[data-year]').forEach(function (li) {
        var ly = +li.getAttribute('data-year');
        li.classList.toggle('is-far', Math.abs(ly - y) > 40);
        if (ly <= y && (!best || ly >= +best.getAttribute('data-year'))) best = li;
      });
      $$('#tl li.is-now').forEach(function (li) { li.classList.remove('is-now'); });
      if (best) best.classList.add('is-now');
    });
  }

  /* ---------------- lawmen ---------------- */
  function renderService() {
    var box = $('#service'); if (!box) return;
    var y0 = 1870, y1 = 2030, left = 170, right = 24, rowH = 30, top = 26, width = 900;
    var rows = SERVICE.slice().sort(function (a, b) { return a.from - b.from; });
    var height = top + rows.length * rowH + 10;
    var svg = s('svg', { viewBox: '0 0 ' + width + ' ' + height, role: 'img', 'aria-label': 'Years of police and township service by family member' });
    var X = function (y) { return left + (y - y0) / (y1 - y0) * (width - left - right); };
    for (var y = 1880; y <= 2020; y += 20) {
      svg.appendChild(s('line', { 'class': 'grid', x1: X(y), x2: X(y), y1: top - 8, y2: height - 8 }));
      svg.appendChild(s('text', { 'class': 'axis', x: X(y), y: 12, 'text-anchor': 'middle', text: String(y) }));
    }
    rows.forEach(function (r, i) {
      var yy = top + i * rowH, end = r.to || 2026;
      var g = s('g', { 'class': lineClass(r.line) });
      g.appendChild(s('text', { 'class': 'who', x: left - 10, y: yy + 15, 'text-anchor': 'end', text: r.who }));
      g.appendChild(s('rect', { 'class': 'bar' + (r.to ? '' : ' open') + (r.approx ? ' open' : ''), x: X(r.from), y: yy + 4, width: Math.max(4, X(end) - X(r.from)), height: 16 }));
      g.appendChild(s('text', { 'class': 'yrs', x: X(end) + 6, y: yy + 16, text: r.from + (r.to ? '–' + r.to : ' →') + (r.approx ? ' ≈' : '') }));
      g.appendChild(s('title', { text: r.who + ': ' + r.note }));
      svg.appendChild(g);
    });
    box.appendChild(svg);
  }
  function renderLawmen() {
    renderService();
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
    $('#panel-mark-use').setAttribute('href', '#' + ((LINES[p.line] || {}).mark || 'mark-zirkelbach'));
    highlightLineage(COUPLE_OF[id]);
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
  function highlightLineage(cid) {
    $$('.is-path', tree.svg).forEach(function (el) { el.classList.remove('is-path'); });
    if (!cid) return;
    var down = {}; COUPLES.forEach(function (c) { (c.up || []).forEach(function (u) { if (u) down[u] = c.id; }); });
    var cur = cid, guard = 0;
    while (cur && guard++ < 12) {
      if (tree.nodes[cur]) tree.nodes[cur].classList.add('is-path');
      var nxt = down[cur];
      if (nxt) $$('.link[data-for="' + nxt + '"]', tree.svg).forEach(function (l) { l.classList.add('is-path'); });
      cur = nxt;
    }
    if (tree.nodes.dc) tree.nodes.dc.classList.add('is-path');
  }
  function closePanel() {
    if (!panel.open) return;
    panel.open = false; panel.current = null; highlightLineage(null);
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

  /* ======================= time ======================= */
  var TIME = {
    year: YEAR_MAX, playing: false, scrubbing: false, listeners: [],
    on: function (fn) { this.listeners.push(fn); },
    set: function (y, why) {
      y = Math.max(YEAR_MIN, Math.min(YEAR_MAX, Math.round(y)));
      if (y === this.year && why !== 'force') return;
      this.year = y; var self = this;
      this.listeners.forEach(function (fn) { try { fn(y, why); } catch (e) { /* keep going */ } });
    }
  };
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function presenceAt(place, y) {
    return (place.at || []).reduce(function (a, span) { return a + (y >= span[0] && y <= span[1] ? span[2] : 0); }, 0);
  }
  var BORN = []; /* [{name, born, died, line}] for the "living in" readout */
  function buildBornIndex() {
    PEOPLE.forEach(function (p) {
      if (p.context) return;
      var born = yearOf(/^\d{4}/.test(p.dates || '') ? p.dates : p.born);
      var died = null; var m = /–\s*(?:after\s*)?(\d{4})|died\s+(?:\d{1,2}\s+\w+\s+)?(\d{4})/.exec(p.dates || '');
      if (m) died = +(m[1] || m[2]); else if (p.died) died = yearOf(p.died);
      if (!born && died && /died/.test(p.dates || '')) return;
      if (born) BORN.push({ name: p.name, born: born, died: died, line: p.line });
    });
    (function walk(n) {
      (n.children || []).forEach(function (c) {
        var born = yearOf(c.dates || ''), died = null, m = /–\s*(?:\d{1,2}\s+\w+\s+)?(\d{4})/.exec(c.dates || '');
        if (/^died/.test(c.dates || '')) { died = born; born = null; }
        else if (m) died = +m[1];
        if (born) BORN.push({ name: c.name, born: born, died: died, line: 'zirkelbach' });
        walk(c);
      });
    })(DESCENDANTS);
    BORN.sort(function (a, b) { return a.born - b.born; });
  }
  function setupTime() {
    buildBornIndex();
    var slider = $('#year'), big = $('#year-big'), sub = $('#year-sub'), play = $('#play'), reset = $('#year-reset');
    if (!slider) return;
    var ticks = $('#ticks');
    [1670, 1750, 1800, 1850, 1900, 1950, 2000].forEach(function (y) {
      var sp = h('span', { text: String(y) }); sp.style.left = ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN) * 100) + '%'; ticks.appendChild(sp);
    });
    slider.addEventListener('input', function () { TIME.scrubbing = true; TIME.set(+slider.value, 'slider'); clearTimeout(slider._t); slider._t = setTimeout(function () { TIME.scrubbing = false; }, 400); });
    var raf = null, last = 0;
    function stop() { TIME.playing = false; play.textContent = '▶'; play.setAttribute('aria-label', 'Play through time'); if (raf) cancelAnimationFrame(raf); raf = null; }
    function step(ts) {
      if (!TIME.playing) return;
      if (!last) last = ts;
      var dt = Math.min(100, ts - last); last = ts;
      /* fast through the quiet stretches, lingering while a crossing draws */
      var y = TIME.year, crossing = ROUTES.some(function (r) { return y >= r.y && y <= r.y + Math.max(r.dur, 3); });
      var speed = crossing ? 7 : y < 1785 ? 80 : y < 1860 ? 20 : y < 1940 ? 22 : 40; /* years per second */
      TIME.set(Math.min(YEAR_MAX, y + dt / 1000 * speed), 'play');
      if (TIME.year >= YEAR_MAX) { stop(); return; }
      raf = requestAnimationFrame(step);
    }
    play.addEventListener('click', function () {
      if (TIME.playing) { stop(); return; }
      if (TIME.year >= YEAR_MAX) TIME.set(YEAR_MIN, 'play');
      TIME.playing = true; last = 0; play.textContent = '❚❚'; play.setAttribute('aria-label', 'Pause');
      raf = requestAnimationFrame(step);
    });
    reset.addEventListener('click', function () { stop(); TIME.set(YEAR_MAX, 'reset'); });
    var asof = $('#tree-asof');
    if (asof) asof.addEventListener('click', function () { stop(); TIME.set(YEAR_MAX, 'reset'); });
    TIME.on(function (y, why) {
      if (why !== 'slider') slider.value = String(y);
      big.textContent = String(y);
      sub.textContent = y >= YEAR_MAX ? 'the family today' : y < 1700 ? 'a carpenter sails from Bristol' : y < 1790 ? 'a century in Charles County, Maryland' : y < 1817 ? 'Catholic Maryland moves to Kentucky' : y < 1837 ? 'the Irish reach Gallatin County' : y < 1853 ? 'the Germans arrive in Vanderburgh County' : y < 1885 ? 'farms at St. James, the Pond Settlement, Knight Township' : y < 1905 ? 'the move to Ridgway, and back' : y < 1931 ? 'Evansville: a saloon, a badge, a farm on Pollack Avenue' : y < 1960 ? 'Donald and Cleo raise six children' : 'the family spreads out';
      /* where */
      var rows = Object.keys(PLACES).map(function (k) { return { k: k, p: PLACES[k], w: presenceAt(PLACES[k], y) }; }).filter(function (r) { return r.w > 0; }).sort(function (a, b) { return b.w - a.w; });
      var where = $('#where'); where.innerHTML = '';
      if (rows.length) { where.appendChild(h('b', { text: 'Where the family was' })); where.appendChild(document.createElement('br')); rows.slice(0, 5).forEach(function (r) { where.appendChild(h('span', { class: 'w ' + lineClass(r.p.line) }, h('i'), r.p.n.split(',')[0] + (r.p.r ? ', ' + r.p.r : ''))); }); }
      /* living */
      var alive = BORN.filter(function (b) { return b.born <= y && (b.died == null || b.died >= y); });
      var box = $('#alive'); box.innerHTML = '';
      if (y >= YEAR_MAX) { box.appendChild(h('b', { text: BORN.length + ' people on this site' })); box.appendChild(document.createTextNode(' with a known birth year, from John Wathen in the 1640s to the family today.')); }
      else if (alive.length) { box.appendChild(h('b', { text: alive.length + (alive.length === 1 ? ' person' : ' people') + ' on this site living in ' + y })); box.appendChild(document.createTextNode(': ' + alive.slice(0, 7).map(function (b) { return b.name.replace(/ “[^”]+”/, ''); }).join(', ') + (alive.length > 7 ? ' and ' + (alive.length - 7) + ' more' : '') + '.')); }
      else box.appendChild(h('span', { text: 'No one on this site had been born yet.' }));
      /* tree reveal */
      var tf = $('#tree-frame');
      if (tf) {
        $$('[data-born]', tf).forEach(function (el) { el.classList.toggle('is-unborn', +el.getAttribute('data-born') > y); });
        if (asof) { asof.hidden = y >= YEAR_MAX; asof.textContent = 'Showing the family as of ' + y + ' · show everyone'; }
      }
    });
    TIME.set(YEAR_MAX, 'force');
  }

  /* ======================= globe ======================= */
  var DOTS = null, DENSE = null, DENSE_B = null, GEO_LINES = null;
  function unpackI16(b64) {
    var bin = atob(b64), n = bin.length / 2, out = new Int16Array(n);
    for (var i = 0; i < n; i++) { var v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8); out[i] = v > 32767 ? v - 65536 : v; }
    return out;
  }
  function toVecs(i16, scale) {
    var m = i16.length / 2, xs = new Float32Array(m), ys = new Float32Array(m), zs = new Float32Array(m);
    for (var j = 0; j < m; j++) {
      var lat = i16[2 * j] / scale * Math.PI / 180, lon = i16[2 * j + 1] / scale * Math.PI / 180, c = Math.cos(lat);
      xs[j] = c * Math.sin(lon); ys[j] = Math.sin(lat); zs[j] = c * Math.cos(lon);
    }
    return { n: m, x: xs, y: ys, z: zs };
  }
  function toLines(i16) { /* array of Float32Array [x,y,z,...] */
    var lines = [], cur = [];
    for (var i = 0; i < i16.length; i += 2) {
      if (i16[i] === 32767) { if (cur.length >= 6) lines.push(new Float32Array(cur)); cur = []; continue; }
      var lat = i16[i] / 100 * Math.PI / 180, lon = i16[i + 1] / 100 * Math.PI / 180, c = Math.cos(lat);
      cur.push(c * Math.sin(lon), Math.sin(lat), c * Math.cos(lon));
    }
    if (cur.length >= 6) lines.push(new Float32Array(cur));
    return lines;
  }
  function geo() {
    if (!DOTS) {
      DOTS = toVecs(unpackI16(LAND_DOTS_B64), 10);
      DENSE = typeof DENSE_DOTS_B64 !== 'undefined' ? toVecs(unpackI16(DENSE_DOTS_B64), 100) : { n: 0 };
      DENSE_B = typeof DENSE_B_DOTS_B64 !== 'undefined' ? toVecs(unpackI16(DENSE_B_DOTS_B64), 100) : { n: 0 };
      GEO_LINES = typeof LINES_US_B64 !== 'undefined' ? { us: toLines(unpackI16(LINES_US_B64)), eu: toLines(unpackI16(LINES_EU_B64)), county: toLines(unpackI16(LINES_COUNTY_B64)) } : { us: [], eu: [], county: [] };
    }
    return DOTS;
  }
  function vec(lat, lon) { var la = lat * Math.PI / 180, lo = lon * Math.PI / 180, c = Math.cos(la); return [c * Math.sin(lo), Math.sin(la), c * Math.cos(lo)]; }
  function angleBetween(a, b) { return Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))); }
  function slerp(a, b, t) {
    var om = angleBetween(a, b);
    if (om < 1e-6) return a.slice();
    var sa = Math.sin((1 - t) * om) / Math.sin(om), sb = Math.sin(t * om) / Math.sin(om);
    return [a[0] * sa + b[0] * sb, a[1] * sa + b[1] * sb, a[2] * sa + b[2] * sb];
  }
  function cssColor(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function lineHex(line) { return cssColor(line === 'daily' ? '--c-d' : line === 'wathen' ? '--c-w' : line === 'vogt' ? '--c-v' : line === 'zirkelbach' ? '--c-z' : '--ink-2'); }
  function hexToRgb(hex) { var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex); return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [120, 120, 120]; }
  function visDur(r) { return Math.max(r.dur, 3); }

  function Globe(canvas, opts) {
    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return null;
    var dots = geo();
    var ZMAX = opts.zmax || 18, ZMIN = 1.05;
    var G = { canvas: canvas, ctx: ctx, lon: -40, lat: 28, zoom: 1.15, tLon: null, tLat: null, tZoom: null, manualUntil: 0, idleAt: 0, dragging: false, year: YEAR_MAX, needs: true, visible: true, auto: opts.auto !== false, size: 0, ease: opts.ease || 0.08 };
    var routes = ROUTES.map(function (r) {
      var a = PLACES[r.from], b = PLACES[r.to], va = vec(a.lat, a.lon), vb = vec(b.lat, b.lon), pts = [];
      var ang = angleBetween(va, vb), lift = 0.012 + 0.09 * Math.min(1, ang / 1.2), N = ang > 0.3 ? 72 : 40;
      for (var i = 0; i <= N; i++) { var tt = i / N, v = slerp(va, vb, tt), k = 1 + lift * Math.sin(tt * Math.PI); pts.push([v[0] * k, v[1] * k, v[2] * k]); }
      return { r: r, va: va, vb: vb, pts: pts, rgb: hexToRgb(lineHex(r.line)) };
    });
    var places = Object.keys(PLACES).map(function (k) { var p = PLACES[k]; return { k: k, p: p, v: vec(p.lat, p.lon), rgb: hexToRgb(lineHex(p.line)) }; });
    function resize() {
      var rect = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      var sz = Math.max(1, Math.floor(Math.min(rect.width, rect.height || rect.width)));
      if (sz === G.size && canvas.width === Math.floor(sz * dpr)) return;
      G.size = sz; canvas.width = Math.floor(sz * dpr); canvas.height = Math.floor(sz * dpr); G.dpr = dpr; G.needs = true;
    }
    function rot() { var lo = G.lon * Math.PI / 180, la = G.lat * Math.PI / 180; G.cl = Math.cos(lo); G.sl = Math.sin(lo); G.ca = Math.cos(la); G.sa = Math.sin(la); }
    function proj(x, y, z) { var x1 = x * G.cl - z * G.sl, z1 = x * G.sl + z * G.cl; return [x1, y * G.ca - z1 * G.sa, y * G.sa + z1 * G.ca]; }
    /* where the camera should be for a given year: the recent crossings, and the family's home cluster */
    function focusFor(y) {
      var pts = [];
      routes.forEach(function (rt) { if (y >= rt.r.y && y <= rt.r.y + visDur(rt.r) + 5) { pts.push({ v: rt.va, w: 3 }); pts.push({ v: rt.vb, w: 3 }); } });
      var pres = places.map(function (pl) { return { pl: pl, w: presenceAt(pl.p, y) * (pl.p.lon < -30 ? 1.4 : 1) }; }).filter(function (o) { return o.w > 0; }).sort(function (a, b) { return b.w - a.w; });
      if (pres.length) { var top = pres[0]; pres.forEach(function (o) { if (angleBetween(o.pl.v, top.pl.v) < 0.36) pts.push({ v: o.pl.v, w: o.w }); }); }
      if (!pts.length) return { lat: 30, lon: -40, zoom: 1.15 };
      var cx = 0, cy = 0, cz = 0; pts.forEach(function (o) { cx += o.v[0] * o.w; cy += o.v[1] * o.w; cz += o.v[2] * o.w; });
      var L = Math.hypot(cx, cy, cz) || 1, c = [cx / L, cy / L, cz / L], th = 0;
      pts.forEach(function (o) { th = Math.max(th, angleBetween(o.v, c)); });
      var zoom = Math.max(ZMIN, Math.min(ZMAX, 0.78 / Math.max(Math.sin(th), 0.012)));
      return { lat: Math.max(8, Math.min(58, Math.asin(c[1]) * 180 / Math.PI)), lon: Math.atan2(c[0], c[2]) * 180 / Math.PI, zoom: zoom };
    }
    function draw() {
      resize(); rot();
      var S = canvas.width, cx = S / 2, cy = S / 2, R0 = S * 0.46, Z = G.zoom, R = R0 * Z, c = ctx;
      var dotRGB = cssColor('--globe-dot') || '27, 32, 38', seaRGB = cssColor('--globe-sea') || '233, 234, 227', heatRGB = cssColor('--heat') || '214, 122, 38';
      var y = G.year, lim = S * 0.52; /* cull radius from centre, in canvas px */
      c.clearRect(0, 0, S, S);
      /* sphere */
      c.save(); c.beginPath(); c.arc(cx, cy, Math.min(R, S), 0, 6.2832); c.clip();
      var grd = c.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      grd.addColorStop(0, 'rgba(' + seaRGB + ', 0.0)'); grd.addColorStop(1, 'rgba(' + seaRGB + ', 1)');
      c.fillStyle = 'rgba(' + seaRGB + ', 0.55)'; c.fillRect(0, 0, S, S);
      c.fillStyle = grd; c.fillRect(0, 0, S, S);
      c.restore();
      if (R < S * 0.75) { c.strokeStyle = 'rgba(' + dotRGB + ', 0.18)'; c.lineWidth = Math.max(1, S / 700); c.beginPath(); c.arc(cx, cy, R, 0, 6.2832); c.stroke(); }
      /* land dots */
      var r0 = Math.max(0.9, S / 420) * Math.min(2.0, 1 + 0.12 * (Z - 1)), buckets = [[], [], [], []];
      function pushDots(D, rr, frac) {
        var step = frac >= 1 ? 1 : Math.max(1, Math.round(1 / Math.max(frac, 0.02)));
        for (var i = 0; i < D.n; i += step) {
          var p = proj(D.x[i], D.y[i], D.z[i]); if (p[2] <= 0.02) continue;
          var sx = cx + p[0] * R, sy = cy - p[1] * R; if (sx < -lim || sx > S + lim || sy < -lim || sy > S + lim) continue;
          buckets[p[2] > 0.75 ? 3 : p[2] > 0.5 ? 2 : p[2] > 0.25 ? 1 : 0].push(sx, sy, rr);
        }
      }
      pushDots(dots, r0, 1);
      var denseA = Math.max(0, Math.min(1, (Z - 1.8) / 1.8)), denseB = Math.max(0, Math.min(1, (Z - 11) / 4));
      if (denseA > 0 && DENSE.n) pushDots(DENSE, r0 * (0.6 + 0.3 * denseA), denseA);
      if (denseB > 0 && DENSE_B.n) pushDots(DENSE_B, r0 * (0.5 + 0.35 * denseB), denseB);
      [0.18, 0.32, 0.5, 0.68].forEach(function (a, bi) {
        var b = buckets[bi]; if (!b.length) return; c.fillStyle = 'rgba(' + dotRGB + ', ' + a + ')'; c.beginPath();
        for (var k = 0; k < b.length; k += 3) { var rr = b[k + 2] * (0.75 + bi * 0.1); c.moveTo(b[k] + rr, b[k + 1]); c.arc(b[k], b[k + 1], rr, 0, 6.2832); }
        c.fill();
      });
      /* close-range lines: coasts and borders, then counties */
      function drawLines(set, alpha, width) {
        if (!set.length || alpha <= 0) return;
        c.strokeStyle = 'rgba(' + dotRGB + ', ' + alpha + ')'; c.lineWidth = width; c.lineJoin = 'round'; c.beginPath();
        for (var li = 0; li < set.length; li++) {
          var L = set[li], pen = false;
          for (var i = 0; i < L.length; i += 3) {
            var p = proj(L[i], L[i + 1], L[i + 2]);
            if (p[2] <= 0) { pen = false; continue; }
            var sx = cx + p[0] * R, sy = cy - p[1] * R;
            if (sx < -lim || sx > S + lim || sy < -lim || sy > S + lim) { pen = false; continue; }
            if (!pen) { c.moveTo(sx, sy); pen = true; } else c.lineTo(sx, sy);
          }
        }
        c.stroke();
      }
      var la = Math.max(0, Math.min(1, (Z - 2.2) / 2.5));
      if (la > 0) { drawLines(GEO_LINES.us, 0.38 * la, Math.max(0.8, S / 900)); drawLines(GEO_LINES.eu, 0.38 * la, Math.max(0.8, S / 900)); }
      var ca = Math.max(0, Math.min(1, (Z - 7) / 5));
      if (ca > 0) drawLines(GEO_LINES.county, 0.22 * ca, Math.max(0.6, S / 1300));
      /* glows: presence at this year */
      var gz = Math.pow(Z, 0.3), gdim = 1 / (1 + 0.035 * (Z - 1));
      places.forEach(function (pl) {
        var w = presenceAt(pl.p, y); if (!w) return;
        var p = proj(pl.v[0], pl.v[1], pl.v[2]); if (p[2] <= 0) return;
        var sx = cx + p[0] * R, sy = cy - p[1] * R; if (sx < -lim || sx > S + lim || sy < -lim || sy > S + lim) return;
        var rad = Math.min(S * 0.15, R0 * (0.04 + 0.03 * Math.sqrt(w)) * gz) * (0.6 + 0.4 * p[2]);
        var a0 = Math.min(0.7, 0.22 + 0.07 * Math.sqrt(w)) * p[2] * gdim;
        var g = c.createRadialGradient(sx, sy, 0, sx, sy, rad);
        g.addColorStop(0, 'rgba(' + heatRGB + ', ' + a0 + ')'); g.addColorStop(0.45, 'rgba(' + heatRGB + ', ' + (a0 * 0.45) + ')'); g.addColorStop(1, 'rgba(' + heatRGB + ', 0)');
        c.fillStyle = g; c.beginPath(); c.arc(sx, sy, rad, 0, 6.2832); c.fill();
        c.fillStyle = 'rgba(' + pl.rgb.join(',') + ', ' + (0.9 * p[2]) + ')'; c.beginPath(); c.arc(sx, sy, Math.max(1.6, S / 260) * Math.min(1.6, Math.pow(Z, 0.2)), 0, 6.2832); c.fill();
      });
      /* routes */
      c.lineCap = 'round'; c.lineJoin = 'round';
      routes.forEach(function (rt) {
        var r = rt.r, prog = (y - r.y) / visDur(r); if (prog <= 0) return; prog = Math.min(1, prog);
        var done = prog >= 1, n = Math.floor(prog * (rt.pts.length - 1)), col = rt.rgb.join(',');
        c.strokeStyle = 'rgba(' + col + ', ' + (done ? 0.55 : 0.95) + ')'; c.lineWidth = Math.max(1.2, S / (done ? 500 : 360));
        c.beginPath(); var pen = false;
        for (var i = 0; i <= n; i++) {
          var q = rt.pts[i], p = proj(q[0], q[1], q[2]);
          if (p[2] <= -0.05) { pen = false; continue; }
          var sx = cx + p[0] * R, sy = cy - p[1] * R;
          if (!pen) { c.moveTo(sx, sy); pen = true; } else c.lineTo(sx, sy);
        }
        c.stroke();
        if (!done && n > 0) { var hq = rt.pts[n], hp = proj(hq[0], hq[1], hq[2]); if (hp[2] > -0.05) { c.fillStyle = 'rgba(' + col + ', 1)'; c.beginPath(); c.arc(cx + hp[0] * R, cy - hp[1] * R, Math.max(2.2, S / 150), 0, 6.2832); c.fill(); } }
      });
      /* labels */
      if (opts.labels !== false) {
        var vis = places.map(function (pl) { var w = presenceAt(pl.p, y); var p = proj(pl.v[0], pl.v[1], pl.v[2]); return { pl: pl, w: w, p: p, sx: cx + p[0] * R, sy: cy - p[1] * R }; })
          .filter(function (o) { return o.w > 0 && o.p[2] > 0.2 && o.sx > 0 && o.sx < S && o.sy > 0 && o.sy < S; }).sort(function (a, b) { return b.w - a.w; }).slice(0, Z > 6 ? 10 : S > 700 ? 6 : 4);
        c.font = Math.round(Math.max(10.5, S / 50)) + 'px ' + (cssColor('--font-ui') || 'system-ui'); c.textBaseline = 'middle';
        var used = [];
        vis.forEach(function (o) {
          var sx = o.sx + S / 80, sy = o.sy;
          if (used.some(function (u) { return Math.abs(u[1] - sy) < S / 36 && Math.abs(u[0] - sx) < S / 5; })) return;
          used.push([sx, sy]);
          var label = Z > 6 ? o.pl.p.n.split(',')[0] : o.pl.p.n.split(',')[0].replace(' and Knight Township', '').replace(' and Ridgway', '').replace(' and St. Wendel', '');
          c.lineWidth = 3; c.strokeStyle = 'rgba(' + seaRGB + ', 0.85)'; c.strokeText(label, sx, sy);
          c.fillStyle = 'rgba(' + dotRGB + ', ' + (0.6 + 0.4 * o.p[2]) + ')'; c.fillText(label, sx, sy);
        });
      }
      G.needs = false;
    }
    function tick(ts) {
      if (!G.visible) { G.raf = null; return; }
      var moving = false, k = G.ease;
      if (!G.dragging && ts > G.manualUntil) {
        if (G.tLon != null) {
          var dl = ((G.tLon - G.lon + 540) % 360) - 180, da = G.tLat - G.lat, dz = Math.log(G.tZoom / G.zoom);
          if (Math.abs(dl) > 0.03 || Math.abs(da) > 0.03 || Math.abs(dz) > 0.004) { G.lon += dl * k; G.lat += da * k; G.zoom *= Math.exp(dz * k); moving = true; }
        } else if (G.auto && !reducedMotion && ts - G.idleAt > 4000) { G.lon += 0.035 / Math.sqrt(G.zoom); moving = true; }
      }
      if (moving || G.needs) draw();
      G.raf = requestAnimationFrame(tick);
    }
    /* pointer: drag turns, pinch zooms, a tap on a place looks at it */
    var ptrs = {}, last = null, pinch0 = null, moved = 0;
    function pt(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    function manual() { G.manualUntil = performance.now() + (opts.manualHold || 9000); G.idleAt = performance.now(); G.needs = true; }
    function zoomBy(f, px, py) {
      var nz = Math.max(ZMIN, Math.min(ZMAX * 1.6, G.zoom * f));
      if (px != null) { /* keep the point under the cursor fixed, approximately */
        var S = G.size, dx = (px - S / 2) / (S * 0.46), dy = (py - S / 2) / (S * 0.46), k = 180 / Math.PI;
        G.lon += dx * (1 / G.zoom - 1 / nz) * k; G.lat = Math.max(-80, Math.min(80, G.lat - dy * (1 / G.zoom - 1 / nz) * k));
      }
      G.zoom = nz; manual();
    }
    canvas.addEventListener('pointerdown', function (e) { if (e.button) return; ptrs[e.pointerId] = pt(e); var ids = Object.keys(ptrs); if (ids.length === 1) { G.dragging = true; last = ptrs[e.pointerId]; moved = 0; } else if (ids.length === 2) { var a = ptrs[ids[0]], b = ptrs[ids[1]]; pinch0 = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z: G.zoom }; } try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } });
    canvas.addEventListener('pointermove', function (e) {
      if (!ptrs[e.pointerId]) return; var p = pt(e); ptrs[e.pointerId] = p; var ids = Object.keys(ptrs);
      if (ids.length >= 2 && pinch0) { var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; G.zoom = Math.max(ZMIN, Math.min(ZMAX * 1.6, pinch0.z * d / pinch0.d)); manual(); moved = 99; return; }
      if (!G.dragging || !last) return;
      var k = 180 / Math.max(200, G.size) / G.zoom;
      moved += Math.abs(p[0] - last[0]) + Math.abs(p[1] - last[1]);
      G.lon += (p[0] - last[0]) * k * 0.9; G.lat = Math.max(-80, Math.min(80, G.lat + (p[1] - last[1]) * k * 0.9)); last = p; manual();
    });
    function up(e) {
      if (ptrs[e.pointerId] && moved < 5 && opts.tapFocus) {
        var p = ptrs[e.pointerId], S = G.size, R = S * 0.46 * G.zoom, best = null;
        places.forEach(function (pl) { var q = proj(pl.v[0], pl.v[1], pl.v[2]); if (q[2] <= 0) return; var d = Math.hypot(S / 2 + q[0] * R - p[0], S / 2 - q[1] * R - p[1]); if (d < 18 && (!best || d < best.d)) best = { d: d, pl: pl }; });
        if (best) { G.tLat = best.pl.p.lat; G.tLon = best.pl.p.lon; G.tZoom = Math.max(G.zoom, 12); G.manualUntil = performance.now() + 14000; var w = presenceAt(best.pl.p, G.year); toast(best.pl.p.n + (best.pl.p.r ? ', ' + best.pl.p.r : '') + (w ? ': about ' + w + ' of the family in ' + G.year : ': no one here in ' + G.year)); }
      }
      delete ptrs[e.pointerId]; var ids = Object.keys(ptrs);
      if (ids.length < 2) pinch0 = null;
      if (!ids.length) { G.dragging = false; last = null; G.idleAt = performance.now(); } else { last = ptrs[ids[0]]; }
    }
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    if (opts.wheel) canvas.addEventListener('wheel', function (e) { if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault(); var p = pt(e); zoomBy(e.deltaY < 0 ? 1.18 : 0.85, p[0], p[1]); }, { passive: false });
    if (opts.wheel) canvas.addEventListener('dblclick', function (e) { var p = pt(e); zoomBy(1.8, p[0], p[1]); });
    canvas.addEventListener('keydown', function (e) {
      var d = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 6], ArrowDown: [0, -6] }[e.key];
      if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomBy(1.3); return; }
      if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomBy(0.77); return; }
      if (!d) return; e.preventDefault(); G.lon += d[0] / G.zoom; G.lat = Math.max(-80, Math.min(80, G.lat + d[1] / G.zoom)); manual();
    });
    canvas.tabIndex = 0;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { G.visible = en[0].isIntersecting; if (G.visible && !G.raf) G.raf = requestAnimationFrame(tick); }, { threshold: 0.05 }).observe(canvas);
    window.addEventListener('resize', function () { G.needs = true; });
    if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', function () { routes.forEach(function (rt) { rt.rgb = hexToRgb(lineHex(rt.r.line)); }); places.forEach(function (pl) { pl.rgb = hexToRgb(lineHex(pl.p.line)); }); G.needs = true; }); }
    G.setYear = function (y, follow) {
      G.year = y; G.needs = true;
      if (follow) { var f = focusFor(y); G.tLat = f.lat; G.tLon = f.lon; G.tZoom = Math.min(ZMAX, f.zoom); }
    };
    G.zoomBy = zoomBy;
    G.release = function () { G.manualUntil = 0; G.setYear(G.year, true); };
    G.lookAt = function (lon, lat, zoom) { G.tLon = lon; G.tLat = lat; G.tZoom = zoom || G.zoom; };
    G.raf = requestAnimationFrame(tick);
    return G;
  }
  function setupGlobes() {
    var hero = $('#globe-hero'), main = $('#globe-main');
    var gh = hero && Globe(hero, { auto: true, labels: false, zmax: 5.5, ease: 0.05, manualHold: 6000 });
    var gm = main && Globe(main, { auto: true, labels: true, zmax: 18, ease: 0.09, wheel: true, tapFocus: true });
    if (gh) {
      if (reducedMotion) { gh.setYear(YEAR_MAX, false); gh.lookAt(-45, 30, 1.2); }
      else {
        var t0 = null, LEN = 13000, HOLD = 4500, lastY = -1;
        (function loop(ts) {
          if (!t0) t0 = ts;
          var el = (ts - t0) % (LEN + HOLD), yr = Math.round(el < LEN ? YEAR_MIN + (YEAR_MAX - YEAR_MIN) * easeInOut(el / LEN) : YEAR_MAX);
          if (yr !== lastY) { gh.setYear(yr, true); lastY = yr; }
          requestAnimationFrame(loop);
        })(0);
      }
    }
    if (gm) {
      TIME.on(function (y, why) { gm.setYear(y, true); });
      var zi = $('#g-in'), zo = $('#g-out'), zf = $('#g-fit');
      if (zi) zi.addEventListener('click', function () { gm.zoomBy(1.5); });
      if (zo) zo.addEventListener('click', function () { gm.zoomBy(0.67); });
      if (zf) zf.addEventListener('click', function () { gm.release(); });
    }
    function easeInOut(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  }

  function init() {
    renderFamilies();
    renderTree();
    setupPeople();
    renderTimeline();
    renderLawmen();
    renderResearch();
    renderDescendants();
    setupForm();
    setupPanel();
    setupMenu();
    setupNav();
    setupTime();
    setupGlobes();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
