/* Geometric Algebra for Neural Networks: project page logic (no dependencies). */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = (tag, attrs = {}, html = '') => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') el.className = v; else el.setAttribute(k, v === true ? '' : v);
    }
    if (html) el.innerHTML = html;
    return el;
  };
  // turn unicode sub/superscript runs ("𝔾₃,₀,₁", "2⁴") into <sub>/<sup> after escaping
  const SUBMAP = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '−', 'ₙ': 'n', 'ₖ': 'k', 'ₚ': 'p', 'ᵣ': 'r' };
  const math = (t) => esc(t).replace(/[₀-₉₊₋ₙₖₚᵣ](?:,?[₀-₉₊₋ₙₖₚᵣ])*/g, (m) => `<sub>${[...m].map((c) => SUBMAP[c] ?? c).join('')}</sub>`);
  const ALGS = ['EGA', 'PGA', 'CGA', 'STA', 'General'];
  const ALG_NAMES = { EGA: 'Euclidean GA', PGA: 'Projective GA', CGA: 'Conformal GA', STA: 'Spacetime algebra', General: 'General Clifford' };

  let papers = [], byKey = new Map(), tables = {}, meta = {};

  // ------------------------------------------------------------ utilities
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = h('textarea'); ta.value = text; document.body.append(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      ta.remove(); return ok;
    }
  }

  function initCopy() {
    $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
      const ok = await copyText($(b.dataset.copy).textContent);
      toast(ok ? b.dataset.copied || 'Copied' : 'Copy failed. Select the text and copy it manually.');
    }));
  }

  function initTheme() {
    const btn = $('.theme-toggle');
    btn.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme
        || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('gann-theme', next); } catch (e) { /* storage blocked */ }
    });
  }

  function initScrollSpy() {
    const links = $$('.topbar nav a');
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-here'));
          map.get(en.target.id)?.classList.add('is-here');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  const shortAuthors = (a) => (!a || !a.length) ? '' : a.length <= 3 ? a.join(', ') : `${a.slice(0, 3).join(', ')} et al.`;
  const algTag = (a) => `<span class="tag" data-alg="${esc(a)}" title="${esc(ALG_NAMES[a] || a)}">${esc(a === 'General' ? 'Clifford' : a)}</span>`;
  const figNum = (file) => meta.figures.findIndex((f) => f.file === file) + 1;

  // ------------------------------------------------------------ hero
  const BASES = {
    EGA: ['1', '2', '3'],
    PGA: ['0', '1', '2', '3'],
    CGA: ['1', '2', '3', '+', '−'],
    STA: ['0', '1', '2', '3'],
  };
  const SUBS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', '+': '₊', '−': '₋' };
  const GRADE_NAMES = ['scalar', 'vectors', 'bivectors', 'trivectors', '4-vectors', '5-vectors'];

  function combos(arr, k) {
    if (k === 0) return [[]];
    if (arr.length < k) return [];
    const [head, ...rest] = arr;
    return [...combos(rest, k - 1).map((c) => [head, ...c]), ...combos(rest, k)];
  }

  function renderLattice(alg, animate) {
    const lat = $('.lattice');
    const stage = $('#lattice-stage');
    const basis = BASES[alg];
    const n = basis.length;
    lat.dataset.alg = alg;
    lat.classList.toggle('many', n >= 5);
    stage.innerHTML = '';
    let i = 0;
    for (let k = 0; k <= n; k++) {
      const row = h('div', { class: 'grade-row' });
      const label = k === n ? 'pseudoscalar' : GRADE_NAMES[k];
      row.append(h('span', { class: 'glabel', 'aria-hidden': 'true' }, `<b>${k}</b> ${label}`));
      const tiles = h('div', { class: 'tiles' });
      row.append(tiles);
      for (const c of combos(basis, k)) {
        const txt = k === 0 ? '<span>1</span>' : `<span>e<sub>${c.join('')}</sub></span>`;
        const t = k === n ? 1 : 0.06 + 0.11 * k;
        const b = h('span', {
          class: 'blade' + (k === n ? ' top' : ''),
          style: `--t:${t.toFixed(2)};--i:${i++}`,
          title: `grade ${k} (${k === n ? 'pseudoscalar' : GRADE_NAMES[k].replace(/s$/, '')})`,
        }, txt);
        tiles.append(b);
      }
      stage.append(row);
    }
    stage.setAttribute('aria-label', `${alg}: ${2 ** n} basis blades arranged by grade ${[...Array(n + 1).keys()].map((k) => combos(basis, k).length).join(', ')}`);
    lat.classList.remove('animate');
    if (animate) { void lat.offsetWidth; lat.classList.add('animate'); }

    const row = tables['tab:ga_compare'].rows.find((r) => r.cells[0].text === alg);
    const [, sig, sym, objs, take, works] = row.cells;
    $('#lattice-cap').innerHTML = `
      <div><span class="k">Signature</span><span class="v">${math(sig.text)}</span></div>
      <div><span class="k">Basis blades</span><span class="v">2<sup>${n}</sup> = ${2 ** n}</span></div>
      <div><span class="k">Native symmetry</span><span class="v">${esc(sym.text)}</span></div>
      <div class="full"><span class="k">Native objects and actions</span><span class="v">${esc(objs.text)}</span></div>
      <div class="full"><span class="k">Design takeaway</span><span class="v">${esc(take.text)}</span></div>
      <div class="full"><span class="k">Representative works</span>${(works.items || []).map(workBtn).join(' ')}</div>`;
    bindWorkBtns($('#lattice-cap'));
  }

  function initHero() {
    const sentences = meta.abstract.split(/(?<=\.)\s+/);
    $('#tldr').textContent = sentences.find((s) => s.startsWith('We therefore conclude')) || sentences[0];
    const libs = tables['tab:software_ecosystem'].rows.length;
    const settings = tables['tab:empirical_matrix'].rows.length;
    $('#hero-stats').innerHTML = [
      [papers.length, 'cited works'],
      [4, 'algebras compared'],
      [settings, 'evidence settings'],
      [libs, 'libraries'],
    ].map(([v, k]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

    const tabs = $('.lattice-tabs');
    ['EGA', 'PGA', 'CGA', 'STA'].forEach((a, idx) => {
      const b = h('button', { role: 'tab', type: 'button', 'data-alg': a, 'aria-selected': String(a === 'PGA'), tabindex: a === 'PGA' ? '0' : '-1', 'aria-controls': 'lattice-stage', id: `tab-${a}` }, a);
      b.addEventListener('click', () => select(a, true));
      b.addEventListener('keydown', (e) => {
        const order = ['EGA', 'PGA', 'CGA', 'STA'];
        let j = order.indexOf(a);
        if (e.key === 'ArrowRight') j = (j + 1) % 4; else if (e.key === 'ArrowLeft') j = (j + 3) % 4; else return;
        e.preventDefault(); select(order[j], true); $(`#tab-${order[j]}`).focus();
      });
      tabs.append(b);
    });
    function select(a, anim) {
      $$('[role="tab"]', tabs).forEach((t) => { const on = t.dataset.alg === a; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
      tabs.dataset.alg = a;
      $('#lattice-stage').setAttribute('aria-labelledby', `tab-${a}`);
      renderLattice(a, anim);
    }
    select('PGA', true);
  }

  // ------------------------------------------------------------ abstract & figures
  function initAbstract() {
    $('#abstract-text').textContent = meta.abstract;
    $('#keywords').innerHTML = meta.keywords.map((k) => `<li>${esc(k)}</li>`).join('');
    $$('figcaption[data-fig]').forEach((fc) => {
      const f = meta.figures.find((x) => x.file === fc.dataset.fig);
      if (f) fc.innerHTML = `<b>Figure ${figNum(f.file)}.</b> ${esc(f.caption)}`;
    });
    const g = $('#gallery');
    const lb = $('#lightbox');
    meta.figures.forEach((f, i) => {
      const b = h('button', { type: 'button', 'aria-label': `Enlarge figure ${i + 1}` },
        `<img src="assets/figures/${esc(f.file)}.webp" alt="" loading="lazy"><span><b>Figure ${i + 1}.</b> ${esc(f.caption)}</span>`);
      b.addEventListener('click', () => {
        $('img', lb).src = `assets/figures/${f.file}.webp`;
        $('img', lb).alt = `Figure ${i + 1}`;
        $('.lb-cap', lb).innerHTML = `<b>Figure ${i + 1}.</b> ${esc(f.caption)}`;
        lb.showModal();
      });
      g.append(b);
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  }

  // ------------------------------------------------------------ algebra selector
  function initSelector() {
    const t = tables['tab:algebra_decision'];
    const wrap = $('#needs');
    t.rows.forEach((r, i) => {
      const alg = /^[A-Z]{3}$/.test(r.cells[1].text) ? r.cells[1].text : 'none';
      const lab = h('label', { class: 'need', 'data-alg': alg },
        `<input type="radio" name="need" value="${i}" ${i === 1 ? 'checked' : ''}>
         <span><span class="need-t">${esc(r.cells[0].text)}</span>
         <span class="need-alg">${alg === 'none' ? 'GA not recommended' : `Prefer ${alg}`}</span></span>`);
      wrap.append(lab);
    });
    wrap.addEventListener('change', (e) => show(+e.target.value));
    $('#failure-note').textContent = t.notes[0] || '';
    function show(i) {
      const r = t.rows[i];
      const [need, prefer, why, avoid, tasks] = r.cells.map((c) => c.text);
      const alg = /^[A-Z]{3}$/.test(prefer) ? prefer : 'none';
      const v = $('#verdict');
      v.dataset.alg = alg;
      let facts = '';
      const cmp = tables['tab:ga_compare'].rows.find((x) => x.cells[0].text === alg);
      if (cmp) {
        const n = BASES[alg].length;
        facts = `<div class="facts">
          <span class="fact">Signature <b>${math(cmp.cells[1].text)}</b></span>
          <span class="fact"><b>${2 ** n}</b> basis blades</span>
          <span class="fact">Symmetry <b>${esc(cmp.cells[2].text)}</b></span></div>`;
      }
      v.innerHTML = `
        <div class="verdict-top">
          <span class="alg-big">${alg === 'none' ? 'No GA' : esc(alg)}</span>
          <span class="alg-name">${alg === 'none' ? 'a non-GA equivariant or conventional model' : esc(ALG_NAMES[alg])}</span>
        </div>
        ${facts}
        <dl>
          <dt>Task need</dt><dd>${esc(need)}</dd>
          <dt>Why</dt><dd>${esc(why)}</dd>
          <dt>Avoid if</dt><dd>${esc(avoid)}</dd>
          <dt>Representative tasks</dt><dd>${esc(tasks)}</dd>
        </dl>
        ${alg !== 'none' ? `<p class="paper-row"><button type="button" class="link-btn" data-show-alg="${alg}">Show ${alg} works in the explorer</button></p>` : ''}`;
      const btn = $('[data-show-alg]', v);
      if (btn) btn.addEventListener('click', () => { Explorer.reset(); Explorer.state.algs.add(alg); Explorer.update(); go('#explorer'); });
    }
    show(1);
  }

  // ------------------------------------------------------------ work buttons (link to explorer)
  function workBtn(item) {
    return `<button type="button" class="work-btn" data-keys="${esc(item.keys.join(','))}" data-label="${esc(item.label)}">${esc(item.label)}</button>`;
  }
  function bindWorkBtns(root) {
    $$('.work-btn', root).forEach((b) => b.addEventListener('click', () => {
      Explorer.pin(b.dataset.label, b.dataset.keys.split(','));
    }));
  }
  function go(sel) {
    const el = $(sel);
    el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  // ------------------------------------------------------------ explorer
  const Explorer = {
    state: null,
    limit: 30,
    fresh() {
      return { q: '', sections: new Set(), subs: new Set(), algs: new Set(), y0: null, y1: null, inTable: false, community: true, pin: null, sort: 'discussed' };
    },
    reset() { this.state = this.fresh(); this.limit = 30; this.syncControls(); },

    init() {
      this.state = this.fresh();
      this.readURL();
      const years = papers.map((p) => p.year).filter(Boolean);
      this.minY = Math.min(...years); this.maxY = Math.max(...years);
      const opts = [];
      for (let y = this.maxY; y >= this.minY; y--) if (years.includes(y)) opts.push(y);
      $('#y0').innerHTML = `<option value="">any</option>` + opts.slice().reverse().map((y) => `<option>${y}</option>`).join('');
      $('#y1').innerHTML = `<option value="">any</option>` + opts.map((y) => `<option>${y}</option>`).join('');

      let tq;
      $('#q').addEventListener('input', (e) => { clearTimeout(tq); tq = setTimeout(() => { this.state.q = e.target.value; this.limit = 30; this.update(); }, 120); });
      $('#y0').addEventListener('change', (e) => { this.state.y0 = e.target.value ? +e.target.value : null; this.update(); });
      $('#y1').addEventListener('change', (e) => { this.state.y1 = e.target.value ? +e.target.value : null; this.update(); });
      $('#sort').addEventListener('change', (e) => { this.state.sort = e.target.value; this.update(); });
      $('#f-table').addEventListener('change', (e) => { this.state.inTable = e.target.checked; this.update(); });
      $('#f-community').addEventListener('change', (e) => { this.state.community = e.target.checked; this.update(); });
      $('#reset').addEventListener('click', () => { this.reset(); this.update(); $('#q').focus(); });
      $('.filters-toggle').addEventListener('click', (e) => {
        const open = $('#filters').classList.toggle('open');
        e.currentTarget.setAttribute('aria-expanded', String(open));
      });
      $('#more').addEventListener('click', () => { this.limit += 40; this.renderResults(this.lastList); });
      this.syncControls();
      this.update();
      let rw;
      window.addEventListener('resize', () => { clearTimeout(rw); rw = setTimeout(() => this.renderHist(this.lastList), 150); });
    },

    readURL() {
      const p = new URLSearchParams(location.search);
      const s = this.state;
      if (p.get('q')) s.q = p.get('q');
      if (p.get('sec')) p.get('sec').split('|').forEach((x) => s.sections.add(x));
      if (p.get('sub')) p.get('sub').split('|').forEach((x) => s.subs.add(x));
      if (p.get('alg')) p.get('alg').split('|').forEach((x) => s.algs.add(x));
      if (p.get('y0')) s.y0 = +p.get('y0');
      if (p.get('y1')) s.y1 = +p.get('y1');
      if (p.get('sort')) s.sort = p.get('sort');
      if (p.get('keys')) s.pin = { label: p.get('pin') || 'Selected works', keys: p.get('keys').split(',') };
    },
    writeURL() {
      const s = this.state, p = new URLSearchParams();
      if (s.q) p.set('q', s.q);
      if (s.sections.size) p.set('sec', [...s.sections].join('|'));
      if (s.subs.size) p.set('sub', [...s.subs].join('|'));
      if (s.algs.size) p.set('alg', [...s.algs].join('|'));
      if (s.y0) p.set('y0', s.y0);
      if (s.y1) p.set('y1', s.y1);
      if (s.sort !== 'discussed') p.set('sort', s.sort);
      if (s.pin) { p.set('pin', s.pin.label); p.set('keys', s.pin.keys.join(',')); }
      const qs = p.toString();
      history.replaceState(null, '', qs ? `?${qs}${location.hash}` : location.pathname + location.hash);
    },

    syncControls() {
      const s = this.state;
      $('#q').value = s.q;
      $('#y0').value = s.y0 ?? '';
      $('#y1').value = s.y1 ?? '';
      $('#sort').value = s.sort;
      $('#f-table').checked = s.inTable;
      $('#f-community').checked = s.community;
    },

    pin(label, keys) {
      this.reset();
      this.state.pin = { label, keys };
      this.update();
      go('#explorer');
    },

    tokens(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); },

    match(p, s, skip) {
      if (p.community && !s.community) return false;
      if (s.pin && !s.pin.keys.includes(p.key)) return false;
      if (skip !== 'sec' && s.sections.size && !p.sections.some((x) => s.sections.has(x))) return false;
      if (skip !== 'sec' && s.subs.size && !p.subsections.some((x) => s.subs.has(x))) return false;
      if (skip !== 'alg' && s.algs.size && !p.algebras.some((x) => s.algs.has(x))) return false;
      if (s.y0 && (!p.year || p.year < s.y0)) return false;
      if (s.y1 && (!p.year || p.year > s.y1)) return false;
      if (s.inTable && !(p.tables && p.tables.length)) return false;
      if (s.q) {
        const hay = p._hay;
        if (!this.tokens(s.q).every((t) => hay.includes(t))) return false;
      }
      return true;
    },

    update() {
      const s = this.state;
      const list = papers.filter((p) => this.match(p, s));
      const sorters = {
        n: (a, b) => (a.n ?? 1e4) - (b.n ?? 1e4),
        discussed: (a, b) => (b.subsections.length + b.tables.length) - (a.subsections.length + a.tables.length) || (a.n ?? 1e4) - (b.n ?? 1e4),
        new: (a, b) => (b.year ?? 0) - (a.year ?? 0) || (a.n ?? 1e4) - (b.n ?? 1e4),
        old: (a, b) => (a.year ?? 1e4) - (b.year ?? 1e4) || (a.n ?? 1e4) - (b.n ?? 1e4),
        title: (a, b) => a.title.localeCompare(b.title),
      };
      list.sort(sorters[s.sort] || sorters.discussed);
      this.lastList = list;
      this.renderFacets();
      this.renderToggle();
      this.renderPin();
      this.renderHist(list);
      this.renderResults(list);
      this.writeURL();
    },

    renderFacets() {
      const s = this.state;
      const base = papers.filter((p) => this.match(p, s, 'sec'));
      const secEl = $('#f-section');
      secEl.innerHTML = '';
      meta.outline.forEach((o) => {
        const n = base.filter((p) => p.sections.includes(o.short)).length;
        const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(s.sections.has(o.short)) },
          `${esc(o.short)} <span class="n">${n}</span>`);
        b.addEventListener('click', () => {
          if (s.sections.has(o.short)) { s.sections.delete(o.short); [...s.subs].filter((x) => x.startsWith(o.num + '-')).forEach((x) => s.subs.delete(x)); }
          else s.sections.add(o.short);
          this.limit = 30; this.update();
        });
        secEl.append(b);
      });
      // subsections of the selected sections
      const subEl = $('#f-sub');
      const subs = meta.outline.filter((o) => s.sections.has(o.short)).flatMap((o) => o.subs);
      subEl.hidden = !subs.length;
      subEl.innerHTML = '';
      subs.forEach((sub) => {
        const id = `${sub.num} ${sub.title}`;
        const n = base.filter((p) => p.subsections.includes(id)).length;
        if (!n && !s.subs.has(id)) return;
        const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(s.subs.has(id)), title: sub.title },
          `${esc(sub.num)} ${esc(sub.title.length > 28 ? sub.title.slice(0, 26) + '…' : sub.title)} <span class="n">${n}</span>`);
        b.addEventListener('click', () => { s.subs.has(id) ? s.subs.delete(id) : s.subs.add(id); this.limit = 30; this.update(); });
        subEl.append(b);
      });
      const algBase = papers.filter((p) => this.match(p, s, 'alg'));
      const algEl = $('#f-alg');
      algEl.innerHTML = '';
      ALGS.forEach((a) => {
        const n = algBase.filter((p) => p.algebras.includes(a)).length;
        const b = h('button', { type: 'button', class: 'chip alg', 'data-alg': a, 'aria-pressed': String(s.algs.has(a)), title: ALG_NAMES[a] },
          `${a === 'General' ? 'Clifford (general)' : a} <span class="n">${n}</span>`);
        b.addEventListener('click', () => { s.algs.has(a) ? s.algs.delete(a) : s.algs.add(a); this.limit = 30; this.update(); });
        algEl.append(b);
      });
    },

    renderToggle() {
      const s = this.state;
      const n = s.sections.size + s.subs.size + s.algs.size + (s.y0 || s.y1 ? 1 : 0) + (s.inTable ? 1 : 0);
      $('.filters-toggle').textContent = n ? `Filters (${n} active)` : 'Filters';
    },

    renderPin() {
      const el = $('#pin');
      const pin = this.state.pin;
      el.hidden = !pin;
      if (!pin) return;
      el.innerHTML = `<span>Showing works for <strong>${esc(pin.label)}</strong></span>`;
      const b = h('button', { type: 'button' }, 'Show all papers');
      b.addEventListener('click', () => { this.state.pin = null; this.update(); });
      el.append(b);
    },

    renderHist(list) {
      const lo = 2000, hi = this.maxY;
      const buckets = [{ label: 'pre-2000', test: (y) => y && y < lo, y0: this.minY, y1: lo - 1 }];
      for (let y = lo; y <= hi; y++) buckets.push({ label: String(y), test: (v) => v === y, y0: y, y1: y });
      const all = buckets.map((b) => papers.filter((p) => !p.community && b.test(p.year)).length);
      const cur = buckets.map((b) => list.filter((p) => b.test(p.year)).length);
      const max = Math.max(...all, 1);
      const el = $('#hist');
      const W = Math.max(280, Math.round(el.clientWidth || 640)), H = 96, pad = 20, gap = W < 500 ? 1.5 : 3;
      const bw = (W - gap * (buckets.length - 1)) / buckets.length;
      const s = this.state;
      let svg = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="group" aria-label="Works per year">`;
      buckets.forEach((b, i) => {
        const x = i * (bw + gap);
        const ha = (all[i] / max) * (H - pad);
        const hc = (cur[i] / max) * (H - pad);
        const sel = s.y0 === b.y0 && s.y1 === b.y1;
        svg += `<rect x="${x}" y="${H - pad - ha}" width="${bw}" height="${Math.max(ha, 0)}" rx="1.5" class="bar" tabindex="0" role="button" aria-label="${b.label}: ${cur[i]} of ${all[i]} works${sel ? ', selected' : ''}" data-i="${i}"><title>${b.label}: ${cur[i]} shown of ${all[i]}</title></rect>`;
        if (hc > 0) svg += `<rect x="${x}" y="${H - pad - hc}" width="${bw}" height="${hc}" rx="1.5" class="bar on${sel ? ' sel' : ''}" data-i="${i}" aria-hidden="true" style="pointer-events:none"></rect>`;
        const step = W < 500 ? 10 : 5;
        if (i === 0 || (b.y0 === b.y1 && b.y0 % step === 0 && b.y0 > lo && hi - b.y0 >= 3) || i === buckets.length - 1) {
          svg += `<text x="${i === 0 ? x : i === buckets.length - 1 ? x + bw : x + bw / 2}" y="${H - 5}" text-anchor="${i === 0 ? 'start' : i === buckets.length - 1 ? 'end' : 'middle'}">${i === 0 ? 'earlier' : b.label}</text>`;
        }
      });
      svg += '</svg>';
      el.innerHTML = svg;
      $$('rect.bar[tabindex]', el).forEach((r) => {
        const act = () => {
          const b = buckets[+r.dataset.i];
          if (s.y0 === b.y0 && s.y1 === b.y1) { s.y0 = null; s.y1 = null; } else { s.y0 = b.y0; s.y1 = b.y1; }
          this.syncControls(); this.update();
        };
        r.addEventListener('click', act);
        r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
      });
    },

    hl(text) {
      const toks = this.tokens(this.state.q).filter((t) => t.length > 1);
      let out = esc(text);
      if (!toks.length) return out;
      const re = new RegExp('(' + toks.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
      return out.replace(re, '<mark>$1</mark>');
    },

    renderResults(list) {
      const total = papers.filter((p) => !p.community || this.state.community).length;
      $('#count').innerHTML = list.length === total
        ? `<b>${list.length}</b> works`
        : `<b>${list.length}</b> of ${total} works`;
      const ol = $('#results');
      ol.innerHTML = '';
      if (!list.length) {
        ol.innerHTML = `<li class="empty">No works match these filters. Remove a filter or try a broader search term, such as an algebra (“PGA”) or a domain (“protein”).</li>`;
        $('#more').hidden = true;
        return;
      }
      const frag = document.createDocumentFragment();
      list.slice(0, this.limit).forEach((p) => frag.append(this.card(p)));
      ol.append(frag);
      const rest = list.length - this.limit;
      $('#more').hidden = rest <= 0;
      $('#more').textContent = `Show ${Math.min(rest, 40)} more`;
    },

    card(p) {
      const li = h('li', { class: 'paper' });
      const main = p.links[0];
      const names = (p.names || []).slice(0, 2).map((n) => `<span>${this.hl(n)}</span>`).join('');
      const subs = p.subsections || [];
      const shown = subs.slice(0, 3);
      const where = p.community
        ? `<span class="where">Community addition${p.note ? `: ${esc(p.note)}` : ''}</span>`
        : `<span class="where">Discussed in ${shown.length
          ? shown.map((s) => `<button type="button" data-sub="${esc(s)}" title="Filter by ${esc(s)}">§${esc(s.split(' ')[0])} ${esc(s.split(' ').slice(1).join(' '))}</button>`).join(', ')
          : esc(p.sections.join(', '))}${subs.length > 3 ? ` and ${subs.length - 3} more` : ''}</span>`;
      const ctx = (p.contexts || []).filter((c) => c.text);
      li.innerHTML = `
        <span class="ref${p.community ? ' comm' : ''}">${p.community ? 'new' : `[${p.n}]`}</span>
        <div>
          <h3 class="paper-title"><a href="${esc(main.url)}" rel="noopener">${this.hl(p.title)}</a>${names ? `<span class="paper-names">${names}</span>` : ''}</h3>
          <p class="paper-meta">${this.hl(shortAuthors(p.authors))}${p.venue || p.year ? (shortAuthors(p.authors).endsWith('.') ? ' ' : '. ') : ''}<span class="venue">${esc(p.venue)}</span>${p.year ? `${p.venue ? ', ' : ''}${p.year}` : ''}</p>
          <div class="paper-row">
            ${p.algebras.map(algTag).join('')}
            <span class="links">${p.links.map((l) => `<a href="${esc(l.url)}" rel="noopener">${esc(l.kind)}</a>`).join('')}</span>
            ${where}
          </div>
          ${ctx.length ? `<details class="ctx"><summary>What the survey says</summary><blockquote>${ctx.map((c) => `<p><span class="sec">§${esc(c.num)}</span>${this.hl(c.text)}</p>`).join('')}</blockquote></details>` : ''}
        </div>`;
      $$('[data-sub]', li).forEach((b) => b.addEventListener('click', () => {
        const sub = b.dataset.sub;
        const sec = meta.outline.find((o) => sub.startsWith(o.num + '-'));
        this.state.pin = null;
        if (sec) this.state.sections.add(sec.short);
        this.state.subs.add(sub);
        this.limit = 30;
        this.update();
        go('#explorer');
      }));
      return li;
    },
  };

  // ------------------------------------------------------------ architecture families & tables
  function initFamilies() {
    const t = tables['tab:architecture_taxonomy'];
    const wrap = $('#families');
    t.rows.forEach((r) => {
      const [fam, prim, data, sym, works, cav] = r.cells;
      const keys = [...new Set((works.items || []).flatMap((i) => i.keys))];
      const card = h('article', { class: 'family' }, `
        <h3>${esc(fam.text)}</h3>
        <p class="prim">${esc(prim.text)}</p>
        <dl><dt>Data</dt><dd>${esc(data.text)}</dd><dt>Symmetry</dt><dd>${esc(sym.text)}</dd><dt>Caveat</dt><dd>${esc(cav.text)}</dd></dl>
        <div class="works">${(works.items || []).map(workBtn).join('')}</div>`);
      const see = h('button', { type: 'button', class: 'see' }, `See all ${keys.length} in the explorer`);
      see.addEventListener('click', () => Explorer.pin(fam.text, keys));
      card.append(see);
      wrap.append(card);
    });
    bindWorkBtns(wrap);
  }

  function cellHTML(c, col, header) {
    if (c.items && c.items.length) return c.items.map(workBtn).join('');
    const tx = c.text;
    if (header === 'Evidence') return `<span class="grade ${tx.startsWith('Mod') ? 'moderate' : 'prelim'}">${tx.startsWith('Prelim') ? 'Preliminary' : esc(tx)}</span>`;
    if (/^(Yes|No|Partial)$/.test(tx)) return `<span class="dot ${tx.toLowerCase()}">${tx}</span>`;
    if (col === 0 && ALGS.includes(tx)) return `<span class="tag" data-alg="${tx}">${tx}</span>`;
    return math(tx);
  }

  function renderTable(el, t, opts = {}) {
    const sortable = opts.sortable || [];
    let rows = t.rows.slice();
    let sortCol = null, dir = 1;
    const draw = () => {
      const visible = rows.filter(opts.filter || (() => true));
      el.innerHTML = `<thead><tr>${t.header.map((hd, i) => `<th scope="col"${sortable.includes(i) ? ` aria-sort="${sortCol === i ? (dir > 0 ? 'ascending' : 'descending') : 'none'}"` : ''}>${sortable.includes(i) ? `<button type="button" data-col="${i}">${esc(hd)}</button>` : esc(hd)}</th>`).join('')}</tr></thead>
        <tbody>${visible.map((r) => `<tr${opts.rowClass ? ` class="${opts.rowClass(r)}"` : ''}>${r.cells.map((c, i) => `<td>${cellHTML(c, i, t.header[i])}</td>`).join('')}</tr>`).join('')}</tbody>`;
      $$('th button', el).forEach((b) => b.addEventListener('click', () => {
        const c = +b.dataset.col;
        dir = sortCol === c ? -dir : 1; sortCol = c;
        rows.sort((a, b2) => a.cells[c].text.localeCompare(b2.cells[c].text) * dir);
        draw();
        $(`th button[data-col="${c}"]`, el).focus();
      }));
      bindWorkBtns(el);
    };
    draw();
    return { redraw: (filter) => { opts.filter = filter; draw(); } };
  }

  function initTables() {
    renderTable($('#t-encodings'), tables['tab:ga_encodings']);
    const ev = renderTable($('#t-evidence'), tables['tab:empirical_matrix'], { sortable: [0, 4] });
    $$('.evidence-tools .seg').forEach((b) => b.addEventListener('click', () => {
      $$('.evidence-tools .seg').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const g = b.dataset.grade;
      ev.redraw(g === 'all' ? null : (r) => r.cells[4].text === g);
    }));
    renderTable($('#t-paradigms'), {
      ...tables['tab:non_ga_comparison'],
      header: tables['tab:non_ga_comparison'].header.slice(0, 6),
      rows: tables['tab:non_ga_comparison'].rows.map((r) => ({ cells: r.cells.slice(0, 6).map((c) => ({ text: c.text })) })),
    }, { rowClass: (r) => r.cells[0].text.startsWith('GA-native') ? 'ga-row' : '' });

    const meters = { Established: 3, 'Plausible but not yet general': 2, 'Currently unproven': 1 };
    $('#status').innerHTML = meta.evidence_status.map((s) => `
      <div><h3><span class="meter" aria-hidden="true">${[1, 2, 3].map((k) => `<i class="${k <= (meters[s.label] || 0) ? 'on' : ''}"></i>`).join('')}</span>${esc(s.label)}</h3>
      <p>${esc(s.text.charAt(0).toUpperCase() + s.text.slice(1))}</p></div>`).join('');
    $('#practice').innerHTML = meta.benchmarking_practice.map((s) => `<li><div><b>${esc(s.label)}</b><span>${esc(s.text)}</span></div></li>`).join('');
  }

  function initLibs() {
    const t = tables['tab:software_ecosystem'];
    const groups = new Map();
    t.rows.forEach((r) => { if (!groups.has(r.group)) groups.set(r.group, []); groups.get(r.group).push(r); });
    const notes = {
      'ML-facing libraries': 'native deep-learning tensors',
      'General-purpose scripting tooling': 'preprocessing and prototyping',
      'Compiled / systems libraries': 'performance-sensitive kernels',
    };
    const wrap = $('#libs');
    groups.forEach((rows, name) => {
      const g = h('div', { class: 'lib-group' }, `<h3>${esc(name)} <small>${esc(notes[name] || '')}</small></h3>`);
      const grid = h('div', { class: 'lib-grid' });
      rows.forEach((r) => {
        const [lib, lang, dl, scope, use] = r.cells;
        const key = (lib.keys || [])[0];
        const p = byKey.get(key);
        const link = p && p.links.find((l) => l.kind !== 'Scholar');
        const el = h(link ? 'a' : 'div', link ? { class: 'lib', href: link.url, rel: 'noopener' } : { class: 'lib' }, `
          <div class="lib-top"><span class="lib-name">${esc(lib.text)}${dl.text ? '<span class="dl" title="Native deep-learning tensor support">DL</span>' : ''}</span><span class="lib-lang">${esc(lang.text)}</span></div>
          <span class="lib-scope">${math(scope.text)}</span>
          <p class="lib-use">${esc(use.text.charAt(0).toUpperCase() + use.text.slice(1))}</p>`);
        grid.append(el);
      });
      g.append(grid);
      wrap.append(g);
    });
  }

  // ------------------------------------------------------------ boot
  async function boot() {
    initTheme();
    initCopy();
    initScrollSpy();
    const get = (f) => fetch(f).then((r) => { if (!r.ok) throw new Error(`${f}: ${r.status}`); return r.json(); });
    try {
      [papers, tables, meta] = await Promise.all([get('data/papers.json'), get('data/tables.json'), get('data/meta.json')]);
    } catch (e) {
      $('#results').innerHTML = `<li class="empty">The paper data could not be loaded (${esc(e.message)}). If you opened this file directly from disk, serve the folder instead: <code>python3 -m http.server</code>.</li>`;
      return;
    }
    let community = [];
    try { community = await get('data/community.json'); } catch (e) { community = []; }
    community.forEach((c, i) => papers.push({
      key: c.key || `community-${i}`, n: null, community: true, title: c.title, names: c.names || [],
      authors: c.authors || [], year: c.year || null, venue: c.venue || '', links: c.links && c.links.length ? c.links : [{ kind: 'Link', url: c.url || '#' }],
      sections: [], subsections: [], tables: [], algebras: c.algebras || [], contexts: [], note: c.note || '',
    }));
    papers.forEach((p) => {
      p._hay = [p.title, (p.names || []).join(' '), (p.authors || []).join(' '), p.venue, p.key, p.year, (p.algebras || []).join(' '),
        (p.contexts || []).map((c) => c.text || '').join(' ')].join(' ').toLowerCase();
      byKey.set(p.key, p);
    });
    initHero();
    initAbstract();
    initSelector();
    Explorer.init();
    initFamilies();
    initTables();
    initLibs();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
