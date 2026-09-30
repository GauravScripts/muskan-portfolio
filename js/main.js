/* ==========================================================================
   Muskan Gupta — Portfolio · main.js
   Vanilla JS: theme, nav, reveal, counters, experience explorer, insights
   (grid / timeline / map), reader, evidence explorer, sensitivity model,
   command palette. Craft artifacts live in craft.js.
   ========================================================================== */
(() => {
  'use strict';

  const SITE = {
    email: 'muskaangupta2307@gmail.com',
    linkedin: 'https://www.linkedin.com/in/muskan-gupta-46bba71a0/',
    linkedinHandle: 'linkedin.com/in/muskan-gupta-46bba71a0',
    name: 'Muskan Gupta',
    title: 'Deputy Manager, Sustainability · Deloitte India',
    resume: 'assets/Muskan_Gupta_Resume.pdf',
    docTitle: 'Muskan Gupta — Sustainability Consultant · Climate Risk, Decarbonization & ESG'
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';
  const scrollToEl = (el, offset = 84) => { if (!el) return; const top = el.getBoundingClientRect().top + window.scrollY - offset; window.scrollTo({ top, behavior: scrollBehavior }); };

  /* ---------------------------------------------------------------------
     Toast
  --------------------------------------------------------------------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg) => { if (!toast) return; toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200); };

  /* ---------------------------------------------------------------------
     Theme (light by default, dark on request)
  --------------------------------------------------------------------- */
  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');
  const setTheme = (t) => { root.setAttribute('data-theme', t); try { localStorage.setItem('mg-theme', t); } catch {} document.dispatchEvent(new CustomEvent('mg:theme', { detail: t })); };
  themeBtn?.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ---------------------------------------------------------------------
     Nav: scroll state, active link, drawer, progress bar
  --------------------------------------------------------------------- */
  const nav = $('#nav'), progress = $('#progress'), toTop = $('#to-top'), burger = $('#burger');
  const links = $$('.nav-links a[href^="#"]');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  function onScroll() {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 16);
    if (y < window.innerHeight * 0.4) links.forEach((a) => a.classList.remove('active'));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    toTop?.classList.toggle('show', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id)); });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((s) => spy.observe(s));
  const setDrawer = (open) => { nav.classList.toggle('open', open); burger?.setAttribute('aria-expanded', String(open)); burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  burger?.addEventListener('click', () => setDrawer(!nav.classList.contains('open')));
  $$('.nav-links a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
  document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target)) setDrawer(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) setDrawer(false); });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: scrollBehavior }));

  /* ---------------------------------------------------------------------
     Reveal on scroll + counters
  --------------------------------------------------------------------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('in'); revealObs.unobserve(en.target); });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
  const observeReveals = (scope = document) => $$('.reveal, .reveal-stagger', scope).forEach((el) => revealObs.observe(el));
  observeReveals();
  const revealNow = (scope) => requestAnimationFrame(() => $$('.reveal, .reveal-stagger', scope).forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in'); }));

  const fmt = (n, dec) => dec > 0 ? n.toFixed(dec) : Math.round(n).toLocaleString('en-IN');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target; counterObs.unobserve(el);
      const target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
      if (reduceMotion || isNaN(target)) { el.textContent = fmt(target, dec); return; }
      const dur = 1300, start = performance.now();
      const step = (now) => { const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(target * e, dec); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach((el) => counterObs.observe(el));

  /* ---------------------------------------------------------------------
     Contact helpers: copy, LinkedIn links, vCard, local time, Connect menu
  --------------------------------------------------------------------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); showToast(b.dataset.copyMsg || 'Copied to clipboard'); } catch { showToast(b.dataset.copy); }
  }));
  $$('[data-linkedin]').forEach((a) => { a.href = SITE.linkedin; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-vcard]').forEach((b) => b.addEventListener('click', () => {
    const v = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Gupta;Muskan;;;', 'FN:Muskan Gupta', 'TITLE:Deputy Manager, Sustainability', 'ORG:Deloitte India', `EMAIL;TYPE=INTERNET:${SITE.email}`, `URL:${SITE.linkedin}`, 'ADR;TYPE=WORK:;;;Gurugram;Haryana;122002;India', 'NOTE:Sustainability consultant. Climate risk, CSRD/ESRS, IFRS S1/S2, GHG accounting, decarbonization strategy.', 'END:VCARD'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard;charset=utf-8' })); a.download = 'Muskan_Gupta.vcf';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    showToast('Contact card downloaded');
  }));
  const lt = $('#local-time');
  if (lt) { const f = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }); const tick = () => { lt.textContent = `${f.format(new Date())} IST`; }; tick(); setInterval(tick, 30000); }

  const connect = (() => {
    const c = $('#connect'); if (!c) return { set() {} };
    const btn = c.querySelector(':scope > .btn');
    const set = (open) => { c.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); set(!c.classList.contains('open')); });
    document.addEventListener('click', (e) => { if (!c.contains(e.target) && !e.target.closest('[data-open-connect]')) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && c.classList.contains('open')) { set(false); btn.focus(); } });
    c.addEventListener('click', (e) => { if (e.target.closest('.connect-menu a, .connect-menu button')) set(false); });
    $$('[data-open-connect]').forEach((b) => b.addEventListener('click', () => { set(true); setTimeout(() => c.querySelector('.connect-menu a')?.focus(), 60); }));
    return { set };
  })();

  /* ---------------------------------------------------------------------
     Insights data + shared formatters
  --------------------------------------------------------------------- */
  const POSTS = window.POSTS || [], CATS = window.CATEGORIES || {};
  const monthName = (d) => { const [y, m] = d.split('-').map(Number); return new Date(y, m - 1, 1).toLocaleString('en-GB', { month: 'short', year: 'numeric' }); };
  const words = (s) => s.replace(/[*#>\-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const readTime = (p) => Math.max(1, Math.round(words(p.body) / 210));
  const metaHTML = (p, withReactions = true) => {
    const bits = [`<span>${monthName(p.date)}</span>`, `<span class="sep"></span><span>${readTime(p)} min read</span>`];
    if (withReactions && p.reactions) bits.push(`<span class="sep"></span><span>${p.reactions} reaction${p.reactions === 1 ? '' : 's'}${p.comments ? ` · ${p.comments} comment${p.comments === 1 ? '' : 's'}` : ''}</span>`);
    return `<div class="post-meta">${bits.join('')}</div>`;
  };
  const catHTML = (p) => `<span class="post-cat c-${p.cat}">${esc(CATS[p.cat]?.label || p.cat)}</span>`;
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  function renderBody(md) {
    const blocks = md.trim().split(/\n\s*\n/); let h = 0;
    return blocks.map((b) => {
      const lines = b.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.every((l) => /^- /.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
      if (lines.every((l) => /^\d+\. /.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
      if (/^> /.test(lines[0])) return `<blockquote>${inline(lines.map((l) => l.replace(/^> ?/, '')).join(' '))}</blockquote>`;
      if (/^## /.test(lines[0])) return `<h3 id="sec-${++h}">${inline(lines[0].slice(3))}</h3>`;
      return `<p>${inline(lines.join(' '))}</p>`;
    }).join('');
  }

  /* ---------------------------------------------------------------------
     Firms, technical toolkit and shared helpers
  --------------------------------------------------------------------- */
  const FIRMS = window.FIRMS || [], TECH = window.TECH || [], ENG = window.ENGAGEMENTS || [];
  const firmOf = (k) => FIRMS.find((f) => f.key === k);
  const wm = (k, extra = '') => { const f = firmOf(k); return f ? `<span class="wm ${k}${extra ? ' ' + extra : ''}" role="img" aria-label="${esc(f.name)}">${k === 'pwc' ? 'pwc' : esc(f.short)}</span>` : ''; };
  const techOf = (k) => TECH.find((t) => t.key === k);
  const techEngs = (k) => ENG.filter((r) => (r.tech || []).includes(k));
  const techFirms = (k) => FIRMS.filter((f) => techEngs(k).some((r) => r.firm === f.key)).map((f) => f.key);
  const LEVEL = { Advanced: [92, ''], Proficient: [72, 'l2'], Working: [55, 'l2'], Applied: [60, 'l3'] };
  const levelHTML = (lv) => `<span class="lvl ${LEVEL[lv]?.[1] || ''}">${esc(lv)}</span>`;
  const STANDARDS = 4; // tools adopted as team or client standards (résumé)
  const craftGo = (key) => { document.dispatchEvent(new CustomEvent('mg:craft', { detail: key })); const c = $('#craft'); if (c) scrollToEl(c, 76); };

  /* ---------------------------------------------------------------------
     Hero: technical toolkit console
  --------------------------------------------------------------------- */
  (() => {
    const el = $('#skills-console'), proof = $('#hero-proof'); if (!el || !TECH.length) return;
    let cur = 'excel';
    const groups = [['analytics', 'Analytics & visualization'], ['automation', 'Automation & AI']];
    const render = () => {
      const t = techOf(cur) || TECH[0]; const engs = techEngs(t.key), firms = techFirms(t.key);
      el.innerHTML = `<div class="card-head"><div><div class="card-kicker">Technical toolkit</div><div class="card-title">Select a skill to see how I use it</div></div><span class="card-badge">${TECH.length} tools · ${ENG.length} engagements</span></div>
        <div class="sk-groups">${groups.map(([g, l]) => `<div class="sk-group"><h4>${l}</h4><div class="sk-chips" role="tablist" aria-label="${l}">${TECH.filter((x) => x.group === g).map((x) => `<button type="button" role="tab" class="sk-chip" data-sk="${x.key}" aria-selected="${x.key === t.key}">${esc(x.label)}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="sk-detail" role="tabpanel" aria-live="polite">
          <div class="sk-detail-head"><div><strong>${esc(t.label)}</strong><small>${esc(t.sub)}</small></div>${levelHTML(t.level)}</div>
          <div class="sk-meter" aria-hidden="true"><i style="width:${LEVEL[t.level]?.[0] || 60}%"></i></div>
          <p>${esc(t.builds)}</p>
          <div class="sk-stats"><span><b>${engs.length}</b>engagement${engs.length === 1 ? '' : 's'}</span><span>${firms.length ? firms.map((k) => wm(k)).join('') : '<em>Internship and research work</em>'}</span></div>
          <div class="sk-links"><button type="button" data-go-craft="${t.craft}">See it in action →</button>${engs.length ? `<button type="button" data-go-tech="${t.key}">Filter ${engs.length} engagement${engs.length === 1 ? '' : 's'} →</button>` : ''}</div>
        </div>`;
      if (proof) {
        const xl = techEngs('excel').length, auto = techEngs('automation').length;
        proof.innerHTML = `<div><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg></span><span><strong>${xl} of ${ENG.length} engagements</strong>delivered on Excel models I built, ${auto} of them fully automated</span></div>
          <div><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span><span><strong>2.3M tCO₂e</strong>computed through a Python and Excel pipeline, ${STANDARDS} tools adopted as standards</span></div>`;
      }
    };
    el.addEventListener('click', (e) => {
      const c = e.target.closest('[data-sk]'); if (c) { cur = c.dataset.sk; render(); return; }
      const g = e.target.closest('[data-go-craft]'); if (g) { craftGo(g.dataset.goCraft); return; }
      const f = e.target.closest('[data-go-tech]'); if (f) { document.dispatchEvent(new CustomEvent('mg:tech', { detail: f.dataset.goTech })); }
    });
    el.addEventListener('keydown', (e) => {
      if (!e.target.matches('.sk-chip') || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      const chips = $$('.sk-chip', el), i = chips.indexOf(e.target), n = chips[(i + (e.key === 'ArrowRight' ? 1 : chips.length - 1)) % chips.length];
      cur = n.dataset.sk; render(); $(`.sk-chip[data-sk="${cur}"]`, el)?.focus(); e.preventDefault();
    });
    render();
  })();

  /* ---------------------------------------------------------------------
     Skills matrix (skills section)
  --------------------------------------------------------------------- */
  (() => {
    const el = $('#skills-matrix'); if (!el || !TECH.length) return;
    const open = new Set(['excel']);
    const render = () => {
      const rows = TECH.map((t) => { const engs = techEngs(t.key), firms = techFirms(t.key), isOpen = open.has(t.key);
        return `<div class="sm-row${isOpen ? ' open' : ''}" data-sm="${t.key}">
          <button class="sm-main" type="button" aria-expanded="${isOpen}" aria-controls="sm-${t.key}">
            <div class="sm-name"><strong>${esc(t.label)}</strong><small>${esc(t.sub)}</small></div>
            <div class="sm-level">${levelHTML(t.level)}<i><b style="width:${LEVEL[t.level]?.[0] || 60}%"></b></i></div>
            <div class="sm-count"><b>${engs.length}</b> / ${ENG.length}</div>
            <div class="sm-firms">${FIRMS.map((f) => wm(f.key, firms.includes(f.key) ? '' : 'dim')).join('')}</div>
            <div class="sm-tech">${esc(t.builds.split('.')[0])}.</div>
          </button>
          <div class="sm-body" id="sm-${t.key}"><div><div class="sm-detail">
            <div><h5>What I build with it</h5><p>${esc(t.builds)}</p><h5>Evidence</h5><ul>${t.evidence.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
              <div class="sk-links"><button type="button" data-go-craft="${t.craft}">Open the ${esc((window.CRAFT || []).find((c) => c.key === t.craft)?.label || 'toolkit')} reconstruction →</button>${engs.length ? `<button type="button" data-go-tech="${t.key}">Filter engagements →</button>` : ''}</div></div>
            <div><h5>Engagements using it</h5>${engs.length ? `<div class="eng">${engs.map((r) => `<a href="#xp-${r.id}" data-open-rec="${r.id}"><span>${esc(r.title)}</span>${wm(r.firm, 'sm')}</a>`).join('')}</div>` : '<p>Applied in research and internship work: see Education &amp; research below.</p>'}</div>
          </div></div></div>
        </div>`; }).join('');
      el.innerHTML = `<div class="sm-top"><div><h3>Skills matrix</h3><p>Self-assessed level, number of engagements, and the firms where each tool was used. Click a row for evidence.</p></div>
          <div class="firms" aria-label="Firms">${FIRMS.map((f) => `<span>${wm(f.key)}<small>${esc(f.roles[0].title)} · ${esc(f.span.replace(' — ', '–'))}</small></span>`).join('')}</div></div>
        <div class="sm-head" aria-hidden="true"><span>Skill</span><span>Level</span><span>Engagements</span><span>Applied at</span><span>Typical output</span></div>
        ${rows}
        <div class="sm-foot"><span>Levels are self-assessed. Engagement counts come from the ${ENG.length} records in the Experience section.</span><span>Also in daily use: Google Workspace, Teams, SharePoint</span></div>`;
    };
    el.addEventListener('click', (e) => {
      const g = e.target.closest('[data-go-craft]'); if (g) { craftGo(g.dataset.goCraft); return; }
      const f = e.target.closest('[data-go-tech]'); if (f) { document.dispatchEvent(new CustomEvent('mg:tech', { detail: f.dataset.goTech })); return; }
      if (e.target.closest('[data-open-rec]')) return;
      const m = e.target.closest('.sm-main'); if (!m) return;
      const row = m.closest('.sm-row'), k = row.dataset.sm; open.has(k) ? open.delete(k) : open.add(k);
      row.classList.toggle('open', open.has(k)); m.setAttribute('aria-expanded', String(open.has(k)));
    });
    render();
  })();

  /* ---------------------------------------------------------------------
     Experience explorer: career timeline, tool chart, outcomes, records
  --------------------------------------------------------------------- */
  const XP = (() => {
    const app = $('#xp-app'), careerEl = $('#career');
    if (!app || !window.ENGAGEMENTS) return { openRecord() {} };
    const E = window.ENGAGEMENTS, F = window.FIRMS, C = window.CAPS, CAREER = window.CAREER;
    let cap = 'all', firm = 'all', tool = 'all', view = 'story';
    const inView = (r) => (cap === 'all' || r.caps.includes(cap)) && (firm === 'all' || r.firm === firm) && (tool === 'all' || (r.tech || []).includes(tool));
    const opened = new Set();
    const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
    const firmName = (k) => F.find((f) => f.key === k)?.name || k;

    // Career timeline (Gantt)
    function renderCareer() {
      if (!careerEl || !CAREER) return;
      const now = new Date(); const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const idx = (ym) => { const [y, m] = (ym === 'now' ? nowKey : ym).split('-').map(Number); return y * 12 + (m - 1); };
      const start = idx(CAREER.start), end = idx('now') + 1, total = end - start;
      const pct = (i) => `${((i - start) / total * 100).toFixed(2)}%`;
      const years = []; for (let y = Math.ceil((start + 1) / 12); y * 12 < end; y++) years.push(y);
      const axis = years.map((y) => `<span style="left:${pct(y * 12)}">${y}</span>`).join('');
      const ticks = years.map((y) => `<i style="left:${pct(y * 12)}"></i>`).join('');
      const rows = CAREER.rows.map((r) => {
        const bars = r.bars.map((b) => {
          const a = idx(b.from), z = idx(b.to) + 1, left = pct(a), width = `${((z - a) / total * 100).toFixed(2)}%`;
          const cls = `career-bar k-${b.kind}${b.current ? ' current' : ''}${r.firm && firm === r.firm ? ' on' : ''}`;
          const title = `${b.title} · ${monthName(b.from)} – ${b.to === 'now' ? 'present' : monthName(b.to)}`;
          return r.firm ? `<button type="button" class="${cls}" style="left:${left};width:${width}" data-firm="${r.firm}" title="${esc(title)}" aria-label="${esc(title)}. Filter engagements by ${esc(r.label)}">${esc(b.title)}</button>` : `<i class="${cls}" style="left:${left};width:${width}" title="${esc(title)}">${esc(b.title)}</i>`;
        }).join('');
        return `<div class="career-label">${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</div><div class="career-track">${bars}</div>`;
      }).join('');
      careerEl.innerHTML = `<div class="career-head"><h3>Career timeline</h3><p>Click a role to filter the engagements below to that firm. Internships and the MSc are shown for context.</p></div>
        <div class="career-grid"><div class="career-axis">${axis}</div>${rows}<div class="career-ticks" aria-hidden="true">${ticks}<i class="career-now" style="left:${pct(end - 0.5)}"></i></div></div>
        <div class="career-legend"><span><i style="background:var(--hm-4)"></i>Consulting role</span><span><i style="background:var(--hm-5)"></i>Current role</span><span><i style="background:var(--hm-3)"></i>Internship / live project</span><span><i style="background:var(--accent-2)"></i>Education</span></div>`;
    }
    careerEl?.addEventListener('click', (e) => { const b = e.target.closest('[data-firm]'); if (!b) return; firm = firm === b.dataset.firm ? 'all' : b.dataset.firm; render(); scrollToEl(app, 96); });

    function recHTML(r) {
      const m = r.metrics[0], isOpen = opened.has(r.id) || view === 'metrics';
      const post = r.post ? POSTS.find((p) => p.id === r.post) : null;
      const tech = (r.tech || []).map(techOf).filter(Boolean);
      return `<article class="card rec${isOpen ? ' open' : ''}" data-rec="${r.id}" id="xp-${r.id}">
        <button class="rec-head" type="button" aria-expanded="${isOpen}" aria-controls="rec-${r.id}">
          <div><div class="rec-title">${esc(r.title)}</div><div class="rec-caps">${r.caps.map((c) => `<span class="${c === cap ? 'match' : ''}">${esc(C[c])}</span>`).join('')}${tech.map((t) => `<span class="t${t.key === tool ? ' match' : ''}">${esc(t.label)}</span>`).join('')}</div></div>
          <div class="rec-side"><div class="rec-metric"><b>${esc(m.v)}</b><small>${esc(m.l)}</small></div><span class="rec-chev" aria-hidden="true">${chev}</span></div>
        </button>
        <div class="rec-body" id="rec-${r.id}"><div>
          <div class="sar"><div class="s"><h5>Situation</h5><p>${esc(r.situation)}</p></div><div class="a"><h5>Action</h5><p>${esc(r.action)}</p></div><div class="r"><h5>Result</h5><p>${esc(r.result)}</p></div></div>
          ${r.build ? `<div class="build"><h5>Technical build</h5><p>${esc(r.build)}</p><div class="tech-chips">${tech.map((t) => `<button type="button" data-tool="${t.key}" class="${t.key === tool ? 'on' : ''}" aria-label="Filter engagements by ${esc(t.label)}">${esc(t.label)}</button>`).join('')}</div></div>` : ''}
          <div class="rec-foot"><div class="rec-metrics">${r.metrics.map((x) => `<span><b>${esc(x.v)}</b>${esc(x.l)}</span>`).join('')}</div>
            <div class="rec-links">${r.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}${post ? `<a href="#post-${post.id}" data-open-post="${post.id}">Essay: ${esc(post.title)} →</a>` : ''}</div></div>
        </div></div>
      </article>`;
    }
    function toolsHTML() {
      const counts = TECH.map((t) => ({ t, by: F.map((f) => E.filter((r) => r.firm === f.key && (r.tech || []).includes(t.key)).length) })).map((x) => ({ ...x, n: x.by.reduce((a, b) => a + b, 0) })).filter((x) => x.n).sort((a, b) => b.n - a.n);
      const max = Math.max(...counts.map((x) => x.n), 1);
      return `<div class="techbars-wrap"><h4>Technical tools across engagements <span>click a bar to filter</span></h4>
        <div class="techbars" role="group" aria-label="Tools by number of engagements">${counts.map(({ t, by, n }) => `<button type="button" class="techbar${tool === t.key ? ' on' : ''}" data-tool="${t.key}" aria-pressed="${tool === t.key}" aria-label="${esc(t.label)}: ${n} engagement${n === 1 ? '' : 's'} (${F.map((f, i) => `${f.short} ${by[i]}`).join(', ')})"><span class="lbl">${esc(t.label)}</span><span class="track">${by.map((c, i) => c ? `<i style="width:${(c / max * 100).toFixed(1)}%;background:${F[i].color}" title="${esc(F[i].short)}: ${c}"></i>` : '').join('')}</span><span class="n">${n}</span></button>`).join('')}</div>
        <div class="techbars-legend">${F.map((f) => `<span><i style="background:${f.color}"></i>${esc(f.short)}</span>`).join('')}<span>Bars count engagements where the tool was part of the build.</span></div></div>`;
    }
    function outcomesHTML(list) {
      return `<div class="outcomes-wrap"><h4>Headline outcomes in view <span>${list.length} engagement${list.length === 1 ? '' : 's'} · click to open</span></h4><div class="outcomes">${list.map((r) => `<button type="button" data-rec-open="${r.id}" title="${esc(r.title)}"><b>${esc(r.metrics[0].v)}</b>${esc(r.metrics[0].l)}</button>`).join('') || '<span class="xp-count">Nothing in view.</span>'}</div></div>`;
    }
    function render() {
      const counts = E.reduce((m, r) => { r.caps.forEach((c) => (m[c] = (m[c] || 0) + 1)); return m; }, {});
      const list = E.filter(inView);
      app.dataset.view = view;
      const toolLabel = tool !== 'all' ? techOf(tool)?.label : '';
      const chip = (k, l, n) => `<button type="button" class="filter${k === cap ? ' on' : ''}" data-cap="${k}">${esc(l)}<span class="n">${n}</span></button>`;
      const allOpen = list.length && list.every((r) => opened.has(r.id));
      const tools = `<div class="xp-tools">
        <div class="filters" role="group" aria-label="Filter by capability">${chip('all', 'All', E.length)}${Object.keys(C).map((k) => chip(k, C[k], counts[k] || 0)).join('')}</div>
        <div class="grp">
          <div class="sort" role="group" aria-label="Filter by firm"><button type="button" data-firm="all" class="${firm === 'all' ? 'on' : ''}">All firms</button>${F.map((f) => `<button type="button" data-firm="${f.key}" class="${firm === f.key ? 'on' : ''}">${esc(f.name.split(' ')[0])}</button>`).join('')}</div>
          <div class="sort" role="group" aria-label="View"><button type="button" data-view="story" class="${view === 'story' ? 'on' : ''}">Story</button><button type="button" data-view="metrics" class="${view === 'metrics' ? 'on' : ''}">Metrics</button></div>
          ${view === 'story' ? `<button type="button" class="filter" data-toggle-all="${allOpen ? 'close' : 'open'}">${allOpen ? 'Collapse all' : 'Expand all'}</button>` : ''}
          <span class="xp-count">${list.length} of ${E.length}${toolLabel ? ` · ${esc(toolLabel)} <button type="button" class="filter" data-tool="all" style="min-height:28px;padding:.2rem .6rem;margin-left:.4rem">Clear ×</button>` : ''}</span>
        </div></div>
        <div class="xp-secondary">${toolsHTML()}${outcomesHTML(list)}</div>`;
      const firms = F.filter((f) => list.some((r) => r.firm === f.key)).map((f) => `<section class="xp-firm">
          <div class="xp-meta">${wm(f.key)}<div class="xp-co">${esc(f.name)}</div><div class="xp-loc">${esc(f.loc)}</div><div class="xp-span">${esc(f.span)}</div>
            <div class="role-list">${f.roles.map((r) => `<div class="${r.current ? 'current' : ''}"><strong>${esc(r.title)}</strong><span>${esc(r.when)}</span></div>`).join('')}</div></div>
          <div class="records">${list.filter((r) => r.firm === f.key).map(recHTML).join('')}</div>
        </section>`).join('');
      app.innerHTML = tools + (firms || '<div class="records-empty">No engagements match this combination. Clear a filter to see more.</div>');
      $$('#career [data-firm]').forEach((b) => b.classList.toggle('on', b.dataset.firm === firm));
    }
    function openRecord(id, { scroll = true } = {}) {
      const r = E.find((x) => x.id === id); if (!r) return;
      if (!inView(r)) { cap = 'all'; firm = 'all'; tool = 'all'; }
      if (view !== 'story') view = 'story';
      opened.add(id); render();
      const el = $(`#xp-${id}`); if (!el) return;
      if (scroll) scrollToEl(el, 96);
      el.classList.add('hit'); setTimeout(() => el.classList.remove('hit'), 2200);
    }
    app.addEventListener('click', (e) => {
      const tl = e.target.closest('[data-tool]'); if (tl) { tool = tool === tl.dataset.tool ? 'all' : tl.dataset.tool; render(); return; }
      const c = e.target.closest('button[data-cap]'); if (c) { cap = c.dataset.cap; render(); return; }
      const f = e.target.closest('button[data-firm]'); if (f) { firm = f.dataset.firm; render(); return; }
      const v = e.target.closest('button[data-view]'); if (v) { view = v.dataset.view; render(); return; }
      const ta = e.target.closest('[data-toggle-all]'); if (ta) { const list = E.filter(inView); if (ta.dataset.toggleAll === 'open') list.forEach((r) => opened.add(r.id)); else list.forEach((r) => opened.delete(r.id)); render(); return; }
      const ro = e.target.closest('[data-rec-open]'); if (ro) { openRecord(ro.dataset.recOpen); return; }
      const hd = e.target.closest('.rec-head'); if (hd && view === 'story') { const rec = hd.closest('.rec'), id = rec.dataset.rec; opened.has(id) ? opened.delete(id) : opened.add(id); rec.classList.toggle('open', opened.has(id)); hd.setAttribute('aria-expanded', String(opened.has(id))); }
    });
    function setTool(k) { tool = k; cap = 'all'; firm = 'all'; view = 'story'; render(); scrollToEl(app, 96); }
    document.addEventListener('mg:tech', (e) => setTool(e.detail));
    renderCareer(); render();
    return { openRecord, setTool, list: E };
  })();
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-open-rec]'); if (!el) return;
    e.preventDefault(); XP.openRecord(el.dataset.openRec);
  });

  /* ---------------------------------------------------------------------
     Insights: filters, search, sort, views (grid / timeline / map)
  --------------------------------------------------------------------- */
  const grid = $('#posts-grid'), featWrap = $('#featured'), filtersEl = $('#filters'), searchEl = $('#post-search'), countEl = $('#post-count'), tlEl = $('#posts-timeline'), mapEl = $('#posts-map');
  let activeCat = 'all', query = '', sortMode = 'new', viewMode = 'grid';
  const loadSet = (k) => { try { return new Set(JSON.parse(localStorage.getItem(k) || '[]')); } catch { return new Set(); } };
  const saveSet = (k, s) => { try { localStorage.setItem(k, JSON.stringify([...s])); } catch {} };
  const saved = loadSet('mg-saved'), readSet = loadSet('mg-read');
  const hi = (s) => { const t = esc(s); if (!query) return t; const ws = query.split(/\s+/).filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); return ws.length ? t.replace(new RegExp(`(${ws.join('|')})`, 'gi'), '<mark class="hl">$1</mark>') : t; };
  const ICO = {
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
  };
  const CAT_COLOR = { climate: 'var(--accent)', disclosure: 'var(--accent-2)', nature: '#3f7d1e', netzero: 'var(--accent-3)', strategy: '#7c3aa8', community: '#b4234a' };
  const CAT_COLOR_DARK = { nature: '#9be27c', strategy: '#d9a8ff', community: '#ff9fb0' };
  const catColor = (c) => (root.getAttribute('data-theme') === 'dark' && CAT_COLOR_DARK[c]) || CAT_COLOR[c] || 'var(--muted)';

  function snippet(p) {
    if (!query) return null;
    const ws = query.split(/\s+/).filter(Boolean);
    const visible = `${p.title} ${p.hook}`.toLowerCase();
    if (ws.some((w) => visible.includes(w))) return null;
    const plain = p.body.replace(/[*#>]/g, '').replace(/\s+/g, ' ');
    const idx = plain.toLowerCase().indexOf(ws[0]); if (idx < 0) return null;
    let from = Math.max(0, idx - 90), to = Math.min(plain.length, idx + 130);
    if (from > 0) { const sp = plain.indexOf(' ', from); if (sp > -1 && sp < idx) from = sp + 1; }
    if (to < plain.length) { const sp = plain.lastIndexOf(' ', to); if (sp > idx) to = sp; }
    return `${from > 0 ? '…' : ''}${plain.slice(from, to).trim()}${to < plain.length ? '…' : ''}`;
  }
  const tagsHTML = (p, n = 3) => `<div class="post-tags">${p.tags.slice(0, n).map((t) => `<button type="button" data-tag="${esc(t)}" aria-label="Show essays about ${esc(t)}">${esc(t)}</button>`).join('')}</div>`;
  function cardHTML(p) {
    const isSaved = saved.has(p.id), isRead = readSet.has(p.id), snip = snippet(p);
    return `<article class="card post-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="Read: ${esc(p.title)}">
      <div class="card-actions">
        <button class="mini-btn tldr-btn" type="button" data-tldr aria-pressed="false" aria-label="Show key takeaways">TL;DR</button>
        <button class="mini-btn save-btn${isSaved ? ' on' : ''}" type="button" data-save aria-pressed="${isSaved}" aria-label="${isSaved ? 'Remove from saved' : 'Save for later'}">${ICO.bookmark}</button>
      </div>
      ${catHTML(p)}
      <h3>${hi(p.title)}</h3>
      <p class="hook">${snip ? `<span class="card-kicker" style="display:block;margin-bottom:.3rem">Matched in the essay</span>${hi(snip)}` : hi(p.hook)}</p>
      <ol class="tldr" aria-label="Key takeaways">${(p.takeaways || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
      ${tagsHTML(p)}
      ${p.explainer ? `<span class="ix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 4-4 3 3 5-6"/></svg>Interactive model inside</span>` : ''}
      <span class="read-more">Read essay ${ICO.arrow}</span>
      ${metaHTML(p).replace('</div>', `${isRead ? '<span class="sep"></span><span class="read-badge">' + ICO.check + 'Read</span>' : ''}</div>`)}
    </article>`;
  }
  function featuredHTML(p) {
    return `<article class="card featured reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="Read: ${esc(p.title)}">
      <div class="featured-body">
        <div style="display:flex;align-items:center;gap:.9rem;flex-wrap:wrap">${catHTML(p)}<span class="card-badge">Featured</span></div>
        <h3>${esc(p.title)}</h3>
        <p class="deck">${esc(p.deck)}</p>
        <span class="read-more">Read the full piece ${ICO.arrow}</span>
        ${metaHTML(p)}
      </div>
      <div class="featured-side"><blockquote>${esc(p.hook)}</blockquote></div>
    </article>`;
  }
  function matches(p) {
    if (activeCat === 'saved') { if (!saved.has(p.id)) return false; }
    else if (activeCat !== 'all' && p.cat !== activeCat) return false;
    if (!query) return true;
    const hay = `${p.title} ${p.deck} ${p.hook} ${p.tags.join(' ')} ${p.body} ${CATS[p.cat]?.label || ''}`.toLowerCase();
    return query.split(/\s+/).every((q) => hay.includes(q));
  }
  const visibleList = () => POSTS.filter(matches).sort(sortMode === 'top' ? (a, b) => (b.reactions || 0) - (a.reactions || 0) : () => 0);

  function timelineHTML(list) {
    const byMonth = new Map();
    [...list].sort((a, b) => a.date.localeCompare(b.date)).forEach((p) => { if (!byMonth.has(p.date)) byMonth.set(p.date, []); byMonth.get(p.date).push(p); });
    const cols = [...byMonth.entries()];
    if (!cols.length) return `<div class="posts-empty" style="grid-column:1/-1">No essays match “${esc(query)}”.</div>`;
    tlEl.style.setProperty('--n', cols.length);
    return cols.map(([m, ps]) => { const [y, mo] = m.split('-').map(Number); const mon = new Date(y, mo - 1, 1).toLocaleString('en-GB', { month: 'long' });
      return `<div class="tl-col"><div class="tl-month"><b>${mon}</b>${y} · ${ps.length} essay${ps.length === 1 ? '' : 's'}</div>${ps.map((p) => `<button type="button" class="tl-item${readSet.has(p.id) ? ' read' : ''}" data-id="${p.id}"><span class="post-cat c-${p.cat}">${esc(CATS[p.cat]?.short || p.cat)}</span><strong>${esc(p.title)}</strong><small>${readTime(p)} min read${p.reactions ? ` · ${p.reactions} reactions` : ''}</small></button>`).join('')}</div>`; }).join('');
  }

  // Topic map: essays clustered by category, linked by shared tags or series
  const MAP = (() => {
    const W = 880, H = 600;
    let built = null;
    function layout() {
      const cats = Object.keys(CATS).filter((c) => POSTS.some((p) => p.cat === c));
      const cx = W / 2, cy = H / 2 + 6, R = Math.min(W, H) * 0.36;
      const centers = {}; cats.forEach((c, i) => { const a = -Math.PI / 2 + i / cats.length * Math.PI * 2; centers[c] = [cx + Math.cos(a) * R * 1.25, cy + Math.sin(a) * R * 0.82]; });
      const nodes = POSTS.map((p) => ({ p, r: 7 + Math.min(10, (p.reactions || 0) / 9) }));
      cats.forEach((c) => { const group = nodes.filter((n) => n.p.cat === c); const [gx, gy] = centers[c]; const rr = group.length === 1 ? 0 : 42 + group.length * 12;
        group.forEach((n, i) => { const a = -Math.PI / 2 + i / group.length * Math.PI * 2 + 0.4; n.x = gx + Math.cos(a) * rr; n.y = gy + Math.sin(a) * rr * 0.62; }); });
      const series = Object.values(window.SERIES || {});
      const edges = [];
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].p, b = nodes[j].p;
        const shared = a.tags.filter((t) => b.tags.includes(t)).length;
        const inSeries = series.some((s) => s.posts.includes(a.id) && s.posts.includes(b.id));
        if (shared || inSeries) edges.push({ a: nodes[i], b: nodes[j], w: shared + (inSeries ? 2 : 0) });
      }
      return { cats, centers, nodes, edges };
    }
    function render() {
      if (!mapEl) return;
      built = built || layout();
      const { cats, centers, nodes, edges } = built;
      const vis = new Set(visibleList().map((p) => p.id));
      mapEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of ${POSTS.length} essays grouped by topic and connected by shared themes">
        ${cats.map((c) => `<text class="cluster" x="${centers[c][0]}" y="${centers[c][1] - (nodes.filter((n) => n.p.cat === c).length === 1 ? 22 : (42 + nodes.filter((n) => n.p.cat === c).length * 12) * 0.62 + 22)}" text-anchor="middle">${esc(CATS[c].label)}</text>`).join('')}
        ${edges.map((e) => `<line class="edge${vis.has(e.a.p.id) && vis.has(e.b.p.id) ? '' : ' dim'}" data-a="${e.a.p.id}" data-b="${e.b.p.id}" x1="${e.a.x}" y1="${e.a.y}" x2="${e.b.x}" y2="${e.b.y}" stroke-opacity="${Math.min(.9, .25 + e.w * .15)}"/>`).join('')}
        ${nodes.map((n) => `<g class="node${vis.has(n.p.id) ? '' : ' dim'}" data-id="${n.p.id}" tabindex="0" role="button" aria-label="Open: ${esc(n.p.title)}"><circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${catColor(n.p.cat)}"/><text x="${n.x}" y="${n.y + n.r + 11}" text-anchor="middle">${esc(shortTitle(n.p.title))}</text></g>`).join('')}
      </svg>
      <div class="map-foot"><div class="legend">${cats.map((c) => `<span><i style="background:${catColor(c)}"></i>${esc(CATS[c].label)}</span>`).join('')}</div><span>Lines connect essays that share tags or belong to the same thread. Node size follows reactions.</span></div>
      <div class="map-tip" id="map-tip"></div>`;
    }
    const shortTitle = (t) => { const s = t.split(/[:.?]/)[0].trim(); return s.length > 28 ? s.slice(0, 26).trim() + '…' : s; };
    function highlight(id) {
      const svg = $('svg', mapEl); if (!svg) return;
      const near = new Set([id]);
      $$('.edge', svg).forEach((l) => { const hit = id && (l.dataset.a === id || l.dataset.b === id); l.classList.toggle('hot', !!hit); if (hit) { near.add(l.dataset.a); near.add(l.dataset.b); } });
      $$('.node', svg).forEach((n) => n.classList.toggle('hot', !!id && near.has(n.dataset.id)));
    }
    mapEl?.addEventListener('pointerover', (e) => { const n = e.target.closest('.node'); if (!n) return; highlight(n.dataset.id); const p = POSTS.find((x) => x.id === n.dataset.id); const tip = $('#map-tip', mapEl); if (!tip || !p) return; const r = mapEl.getBoundingClientRect(), c = n.querySelector('circle').getBoundingClientRect(); tip.innerHTML = `${esc(p.title)}<small>${esc(CATS[p.cat]?.label || '')} · ${monthName(p.date)} · ${readTime(p)} min</small>`; tip.style.left = `${c.left + c.width / 2 - r.left}px`; tip.style.top = `${c.top - r.top}px`; tip.classList.add('show'); });
    mapEl?.addEventListener('pointerout', (e) => { if (e.target.closest('.node') && !e.relatedTarget?.closest?.('.node')) { highlight(null); $('#map-tip', mapEl)?.classList.remove('show'); } });
    mapEl?.addEventListener('focusin', (e) => { const n = e.target.closest('.node'); if (n) highlight(n.dataset.id); });
    mapEl?.addEventListener('keydown', (e) => { const n = e.target.closest('.node'); if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFromEl(n); } });
    document.addEventListener('mg:theme', () => { if (viewMode === 'map') render(); });
    return { render };
  })();

  function renderPosts() {
    if (!grid) return;
    const list = visibleList();
    const featured = (viewMode === 'grid' && activeCat === 'all' && !query && sortMode === 'new') ? list.find((p) => p.featured) : null;
    if (featWrap) { featWrap.innerHTML = featured ? featuredHTML(featured) : ''; featWrap.style.display = featured ? '' : 'none'; }
    grid.hidden = viewMode !== 'grid'; if (tlEl) tlEl.hidden = viewMode !== 'timeline'; if (mapEl) mapEl.hidden = viewMode !== 'map';
    if (viewMode === 'grid') {
      const rest = list.filter((p) => p !== featured);
      grid.innerHTML = rest.length ? rest.map(cardHTML).join('') : `<div class="posts-empty" style="grid-column:1/-1">No essays match “${esc(query)}”. Try “climate risk”, “CSRD” or “nature”.</div>`;
    } else if (viewMode === 'timeline') { tlEl.innerHTML = timelineHTML(list); }
    else if (viewMode === 'map') { MAP.render(); }
    if (countEl) countEl.textContent = `${list.length} essay${list.length === 1 ? '' : 's'}`;
    observeReveals($('#insights')); revealNow($('#insights'));
  }
  function renderFilters() {
    if (!filtersEl) return;
    const counts = POSTS.reduce((m, p) => (m[p.cat] = (m[p.cat] || 0) + 1, m), {});
    const items = [['all', 'All', POSTS.length], ...Object.keys(CATS).filter((k) => counts[k]).map((k) => [k, CATS[k].label, counts[k]])];
    if (saved.size) items.push(['saved', 'Saved', saved.size]); else if (activeCat === 'saved') activeCat = 'all';
    filtersEl.innerHTML = items.map(([k, l, n]) => `<button class="filter${k === activeCat ? ' on' : ''}" data-cat="${k}" type="button">${esc(l)}<span class="n">${n}</span></button>`).join('');
  }
  filtersEl?.addEventListener('click', (e) => { const b = e.target.closest('.filter'); if (!b) return; activeCat = b.dataset.cat; $$('.filter', filtersEl).forEach((f) => f.classList.toggle('on', f === b)); renderPosts(); });
  let searchTimer;
  searchEl?.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { query = searchEl.value.trim().toLowerCase(); renderPosts(); }, 120); });
  function filterByTag(tag) {
    query = tag.toLowerCase(); if (searchEl) searchEl.value = tag; activeCat = 'all'; renderFilters();
    if (viewMode === 'map') viewMode = 'grid';
    $$('#view [data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === viewMode));
    renderPosts(); scrollToEl($('#insights'), 72); showToast(`Showing essays about “${tag}”`);
  }

  /* ---------------------------------------------------------------------
     Reader modal (with table of contents)
  --------------------------------------------------------------------- */
  const reader = $('#reader'), panel = $('.reader-panel', reader), articleEl = $('#article'), rProgress = $('.reader-progress', reader), tocSide = $('#toc-side');
  let current = -1, lastFocus = null, closing = false;
  function relatedHTML(p) {
    let rel = POSTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3);
    if (rel.length < 3) rel = rel.concat(POSTS.filter((x) => x.id !== p.id && !rel.includes(x)).slice(0, 3 - rel.length));
    if (!rel.length) return '';
    return `<section class="related" id="related"><h4>More on ${esc(CATS[p.cat]?.label || 'this topic')}</h4><div class="related-grid">${rel.map((x) => `<a href="#post-${x.id}" data-open-post="${x.id}"><small>${esc(CATS[x.cat]?.label || '')}</small><strong>${esc(x.title)}</strong></a>`).join('')}</div></section>`;
  }
  const SERIES = window.SERIES || {};
  function seriesHTML(p) {
    const hit = Object.values(SERIES).find((s) => s.posts.includes(p.id)); if (!hit) return '';
    const n = hit.posts.indexOf(p.id) + 1;
    return `<div class="series"><span class="sk">Thread · ${esc(hit.label)} · ${n} of ${hit.posts.length}</span>${hit.posts.map((id, i) => { const x = POSTS.find((q) => q.id === id); return x ? `<a href="#post-${x.id}" data-open-post="${x.id}" class="${x.id === p.id ? 'cur' : ''}" ${x.id === p.id ? 'aria-current="true"' : ''}>${i + 1}. ${esc(x.title)}</a>` : ''; }).join('')}</div>`;
  }
  function articleHTML(p, i) {
    const prev = POSTS[i + 1], next = POSTS[i - 1];
    return `<div class="article-head">
        ${catHTML(p)}
        <h1>${esc(p.title)}</h1>
        <p class="deck">${esc(p.deck)}</p>
        <div class="byline">
          <div class="avatar">MG</div>
          <div class="who"><strong>${SITE.name}</strong><span>Sustainability consultant · climate risk, IFRS S2, CSRD</span></div>
          ${metaHTML(p)}
        </div>
        ${p.source ? `<div class="source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${esc(p.source)}</span></div>` : ''}
      </div>
      ${seriesHTML(p)}
      <div id="toc-inline-slot"></div>
      ${p.takeaways?.length ? `<aside class="takeaways" id="takeaways" aria-label="Key takeaways"><h4>Key takeaways</h4><ol>${p.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ol></aside>` : ''}
      <div class="figs" id="figs" hidden></div>
      <div class="article-body">${renderBody(p.body)}</div>
      <p class="gl-note" id="gl-note" hidden><i></i>Dotted terms show a definition on hover or tap</p>
      <div id="explainer-slot"></div>
      <div class="article-tags"><span class="lbl">Topics</span>${p.tags.map((t) => `<button type="button" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <div class="article-foot">
        <span>Originally published on LinkedIn · ${monthName(p.date)}</span>
        <button class="btn btn-ghost btn-sm" type="button" data-share>Copy link <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
      </div>
      <nav class="article-nav" aria-label="More essays">
        ${prev ? `<a href="#post-${prev.id}" class="prev" data-goto="${i + 1}"><small>← Older</small><strong>${esc(prev.title)}</strong></a>` : '<span></span>'}
        ${next ? `<a href="#post-${next.id}" class="next" data-goto="${i - 1}"><small>Newer →</small><strong>${esc(next.title)}</strong></a>` : '<span></span>'}
      </nav>
      ${relatedHTML(p)}`;
  }
  function buildToc() {
    const entries = [];
    if ($('#takeaways', articleEl)) entries.push(['takeaways', 'Key takeaways']);
    $$('.article-body h3', articleEl).forEach((h) => entries.push([h.id, h.textContent]));
    if ($('.explainer', articleEl)) entries.push(['explainer', 'Interactive model']);
    if ($('#related', articleEl)) entries.push(['related', 'Related essays']);
    const ex = $('.explainer', articleEl); if (ex) ex.id = 'explainer';
    const slot = $('#toc-inline-slot', articleEl);
    if (entries.length < 2) { if (tocSide) tocSide.innerHTML = ''; if (slot) slot.innerHTML = ''; return; }
    const list = entries.map(([id, t]) => `<li><a href="#${id}" data-toc="${id}">${esc(t)}</a></li>`).join('');
    if (tocSide) tocSide.innerHTML = `<nav class="toc"><h4>In this essay</h4><ol>${list}</ol></nav>`;
    if (slot) slot.innerHTML = `<details class="toc-inline"><summary>In this essay</summary><ol>${list}</ol></details>`;
  }
  function tocSpy() {
    if (!tocSide || !panel) return;
    const links = $$('[data-toc]', tocSide); if (!links.length) return;
    let cur = links[0].dataset.toc;
    links.forEach((a) => { const t = document.getElementById(a.dataset.toc); if (t && t.getBoundingClientRect().top - panel.getBoundingClientRect().top < 140) cur = a.dataset.toc; });
    links.forEach((a) => a.classList.toggle('on', a.dataset.toc === cur));
  }
  reader?.addEventListener('click', (e) => {
    const t = e.target.closest('[data-toc]'); if (!t) return;
    e.preventDefault(); const target = document.getElementById(t.dataset.toc); if (!target) return;
    const top = target.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - 90;
    panel.scrollTo({ top, behavior: scrollBehavior });
    t.closest('details')?.removeAttribute('open');
  });

  function openPost(i, push = true) {
    if (!reader || i < 0 || i >= POSTS.length) return;
    const p = POSTS[i]; current = i;
    articleEl.innerHTML = articleHTML(p, i);
    afterRender(p);
    if (!reader.classList.contains('open')) {
      lastFocus = document.activeElement;
      reader.classList.add('open'); document.body.classList.add('no-scroll');
      requestAnimationFrame(() => reader.classList.add('show'));
    }
    panel.scrollTop = 0; updateReaderProgress();
    document.title = `${p.title} — ${SITE.name}`;
    if (push) history.replaceState(null, '', `#post-${p.id}`);
    $('.reader-close', reader)?.focus();
  }
  function closeReader() {
    if (!reader?.classList.contains('open') || closing) return;
    closing = true;
    onReaderClose();
    reader.classList.remove('show');
    setTimeout(() => { reader.classList.remove('open'); document.body.classList.remove('no-scroll'); closing = false; }, 320);
    document.title = SITE.docTitle;
    if (location.hash.startsWith('#post-')) history.replaceState(null, '', '#insights');
    lastFocus?.focus?.();
    current = -1;
  }
  function updateReaderProgress() {
    if (!panel || !rProgress) return;
    const max = panel.scrollHeight - panel.clientHeight;
    const frac = max > 0 ? Math.min(panel.scrollTop / max, 1) : 1;
    rProgress.style.transform = `scaleX(${frac})`;
    const rem = $('#remaining'), p = POSTS[current];
    if (rem && p) { const left = Math.ceil(readTime(p) * (1 - frac)); rem.textContent = frac > 0.97 ? 'Finished' : `≈ ${Math.max(1, left)} min left`; }
    tocSpy();
  }
  panel?.addEventListener('scroll', updateReaderProgress, { passive: true });

  const openFromEl = (el) => { const id = el?.dataset.id; const i = POSTS.findIndex((p) => p.id === id); if (i > -1) openPost(i); };
  function toggleSaved(id) {
    saved.has(id) ? saved.delete(id) : saved.add(id); saveSet('mg-saved', saved);
    const on = saved.has(id);
    showToast(on ? 'Saved for later' : 'Removed from saved');
    $$(`#insights [data-id="${id}"] [data-save]`).forEach((b) => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Remove from saved' : 'Save for later'); });
    renderFilters();
    if (activeCat === 'saved') renderPosts();
    syncSaveBtn();
  }
  $('#insights')?.addEventListener('click', (e) => {
    const tg = e.target.closest('[data-tag]'); if (tg) { e.stopPropagation(); filterByTag(tg.dataset.tag); return; }
    const tl = e.target.closest('[data-tldr]');
    if (tl) { const card = tl.closest('.post-card'); const on = card.classList.toggle('show-tldr'); tl.setAttribute('aria-pressed', String(on)); return; }
    const sv = e.target.closest('[data-save]');
    if (sv) { toggleSaved(sv.closest('[data-id]').dataset.id); return; }
    const so = e.target.closest('#sort [data-sort]');
    if (so) { sortMode = so.dataset.sort; $$('#sort [data-sort]').forEach((b) => b.classList.toggle('on', b === so)); renderPosts(); return; }
    const vw = e.target.closest('#view [data-view]');
    if (vw) { viewMode = vw.dataset.view; $$('#view [data-view]').forEach((b) => b.classList.toggle('on', b === vw)); renderPosts(); return; }
    const el = e.target.closest('[data-id]'); if (el) openFromEl(el);
  });
  $('#insights')?.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.post-card, .featured')) { e.preventDefault(); openFromEl(e.target); }
  });

  reader?.addEventListener('click', (e) => {
    if (e.target.closest('.reader-close') || e.target.classList.contains('reader-backdrop')) return closeReader();
    const tg = e.target.closest('[data-tag]'); if (tg) { closeReader(); setTimeout(() => filterByTag(tg.dataset.tag), 340); return; }
    const go = e.target.closest('[data-goto]'); if (go) { e.preventDefault(); openPost(parseInt(go.dataset.goto, 10)); return; }
    if (e.target.closest('[data-share]')) { const url = deepLink(POSTS[current]); navigator.clipboard?.writeText(url).then(() => showToast('Essay link copied')).catch(() => showToast(url)); }
    if (e.target.classList.contains('gl')) { const was = e.target.classList.contains('on'); $$('.gl.on', articleEl).forEach((g) => g.classList.remove('on')); e.target.classList.toggle('on', !was); }
    if (e.target.closest('.reader-prev')) openPost(current + 1);
    if (e.target.closest('.reader-next')) openPost(current - 1);
  });
  document.addEventListener('keydown', (e) => {
    if (!reader?.classList.contains('open') || $('#cmdk')?.classList.contains('open')) return;
    if (e.target.matches('input, textarea')) return;
    if (e.key === 'Escape') closeReader();
    if (e.key === 'ArrowLeft') openPost(current + 1);
    if (e.key === 'ArrowRight') openPost(current - 1);
    if (e.key === 'Tab') {
      const f = $$('button, a[href], input, summary, [tabindex]:not([tabindex="-1"])', panel).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  function openFromHash() {
    const m = location.hash.match(/^#post-(.+)$/);
    if (m) { const i = POSTS.findIndex((p) => p.id === m[1]); if (i > -1) { $('#insights')?.scrollIntoView({ block: 'start' }); openPost(i, false); } return; }
    const x = location.hash.match(/^#xp-(.+)$/);
    if (x) XP.openRecord(x[1]);
  }
  window.addEventListener('hashchange', openFromHash);

  /* ---------------------------------------------------------------------
     Reading experience: glossary, prefs, listen, share, save, quotes
  --------------------------------------------------------------------- */
  const GLOSSARY = window.GLOSSARY || {};
  const glTerms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const glRe = glTerms.length ? new RegExp(`(?<![\\w-])(${glTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w-])`, 'g') : null;
  function applyGlossary(rootEl) {
    if (!glRe || !rootEl) return 0;
    const used = new Set(); let count = 0;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.parentElement.closest('.gl, a, code, h3') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const text = node.nodeValue; let m, last = 0, changed = false; const frag = document.createDocumentFragment(); glRe.lastIndex = 0;
      while ((m = glRe.exec(text))) {
        const term = m[1], key = term.toLowerCase();
        if (used.has(key)) continue;
        used.add(key); changed = true; count++;
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const span = document.createElement('span'); span.className = 'gl'; span.tabIndex = 0; span.setAttribute('data-tip', GLOSSARY[term]); span.textContent = term; frag.appendChild(span);
        last = m.index + term.length;
      }
      if (changed) { frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }
    });
    return count;
  }
  const prefs = Object.assign({ size: 1.06, font: 'sans', width: 'normal' }, (() => { try { return JSON.parse(localStorage.getItem('mg-read-prefs') || '{}'); } catch { return {}; } })());
  function applyPrefs() {
    const art = $('#article'), layout = $('.reader-layout'); if (!art) return;
    art.style.setProperty('--rf-size', prefs.size + 'rem');
    layout?.style.setProperty('--rf-width', prefs.width === 'wide' ? '900px' : '720px');
    $('.article-body', art)?.classList.toggle('serif', prefs.font === 'serif');
    $$('#aa-pop [data-font]').forEach((b) => b.classList.toggle('on', b.dataset.font === prefs.font));
    $$('#aa-pop [data-width]').forEach((b) => b.classList.toggle('on', b.dataset.width === prefs.width));
    const o = $('#aa-size'); if (o) o.textContent = Math.round(prefs.size / 1.06 * 100) + '%';
    try { localStorage.setItem('mg-read-prefs', JSON.stringify(prefs)); } catch {}
  }
  $('#aa-pop')?.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.size) prefs.size = Math.min(1.45, Math.max(0.9, +(prefs.size + (+b.dataset.size)).toFixed(2)));
    if (b.dataset.font) prefs.font = b.dataset.font;
    if (b.dataset.width) prefs.width = b.dataset.width;
    applyPrefs();
  });
  const tts = (() => {
    const btn = $('#tts-btn'); if (!btn) return { stop() {} };
    if (!('speechSynthesis' in window)) { btn.hidden = true; return { stop() {} }; }
    let utter = null, speaking = false;
    const ui = () => { btn.classList.toggle('on', speaking); btn.setAttribute('aria-pressed', String(speaking)); const l = $('.lbl', btn); if (l) l.textContent = speaking ? 'Pause' : (speechSynthesis.paused && utter ? 'Resume' : 'Listen'); };
    const stop = () => { try { speechSynthesis.cancel(); } catch {} speaking = false; utter = null; ui(); };
    const start = () => {
      const p = POSTS[current]; if (!p) return;
      const body = $('.article-body')?.innerText || '';
      utter = new SpeechSynthesisUtterance(`${p.title}. ${p.deck} ${body}`);
      utter.rate = 1; utter.lang = 'en-GB';
      const voices = speechSynthesis.getVoices();
      const v = voices.find((x) => /en[-_](IN|GB)/i.test(x.lang)) || voices.find((x) => /^en/i.test(x.lang)); if (v) utter.voice = v;
      utter.onend = () => { speaking = false; utter = null; ui(); }; utter.onerror = () => { speaking = false; ui(); };
      speechSynthesis.cancel(); speechSynthesis.speak(utter); speaking = true; ui();
    };
    btn.addEventListener('click', () => {
      if (speaking) { speechSynthesis.pause(); speaking = false; ui(); return; }
      if (speechSynthesis.paused && utter) { speechSynthesis.resume(); speaking = true; ui(); return; }
      start();
    });
    return { stop };
  })();
  $$('.tool-wrap > .tool').forEach((btn) => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const pop = btn.nextElementSibling, open = pop.classList.contains('open');
    $$('.pop.open').forEach((p) => p.classList.remove('open'));
    $$('.tool-wrap > .tool').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (!open) { pop.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  }));
  document.addEventListener('click', (e) => { if (!e.target.closest('.pop')) $$('.pop.open').forEach((p) => p.classList.remove('open')); });
  const deepLink = (p) => `${location.href.split('#')[0]}#post-${p.id}`;
  $('#share-pop')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-share-action]'); if (!b) return; const p = POSTS[current]; if (!p) return;
    const link = deepLink(p), act = b.dataset.shareAction;
    if (act === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank', 'noopener,width=640,height=640');
    if (act === 'copy') navigator.clipboard?.writeText(link).then(() => showToast('Essay link copied')).catch(() => showToast(link));
    if (act === 'print') setTimeout(() => window.print(), 50);
    $$('.pop.open').forEach((x) => x.classList.remove('open'));
  });
  function syncSaveBtn() {
    const b = $('#save-btn'), p = POSTS[current]; if (!b || !p) return;
    const on = saved.has(p.id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); const l = $('.lbl', b); if (l) l.textContent = on ? 'Saved' : 'Save';
  }
  $('#save-btn')?.addEventListener('click', () => { const p = POSTS[current]; if (p) toggleSaved(p.id); });
  const qp = $('#quote-pop');
  const hideQP = () => qp?.classList.remove('show');
  function onSelect() {
    if (!qp || !reader?.classList.contains('open')) return;
    const sel = window.getSelection(); const text = sel?.toString().trim() || '';
    if (text.length < 12 || !sel.rangeCount) return hideQP();
    const range = sel.getRangeAt(0), body = $('.article-body');
    if (!body || !body.contains(range.commonAncestorContainer)) return hideQP();
    const r = range.getBoundingClientRect();
    const below = r.top < 90;
    qp.classList.toggle('below', below);
    qp.style.left = `${Math.min(Math.max(r.left + r.width / 2, 90), window.innerWidth - 90)}px`;
    qp.style.top = `${Math.min(Math.max(below ? r.bottom : r.top, 70), window.innerHeight - 70)}px`;
    qp.dataset.q = text; qp.classList.add('show');
  }
  panel?.addEventListener('mouseup', () => setTimeout(onSelect, 10));
  panel?.addEventListener('touchend', () => setTimeout(onSelect, 50));
  panel?.addEventListener('scroll', hideQP, { passive: true });
  document.addEventListener('selectionchange', () => { if (!window.getSelection()?.toString().trim()) hideQP(); });
  qp?.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; const p = POSTS[current]; if (!p) return;
    const q = qp.dataset.q || '';
    if (b.dataset.q === 'copy') navigator.clipboard?.writeText(`“${q}”\n— Muskan Gupta, “${p.title}”\n${deepLink(p)}`).then(() => showToast('Quote copied with attribution'));
    hideQP(); window.getSelection()?.removeAllRanges();
  });

  let readDirty = false;
  function afterRender(p) {
    tts.stop(); hideQP();
    document.body.classList.add('reading');
    const n = applyGlossary($('.article-body', articleEl));
    const note = $('#gl-note'); if (note) note.hidden = n === 0;
    buildFigures(p); renderExplainer(p); buildToc();
    applyPrefs(); syncSaveBtn();
    if (!readSet.has(p.id)) { readSet.add(p.id); saveSet('mg-read', readSet); renderStats(); readDirty = true; }
  }
  function onReaderClose() {
    tts.stop(); hideQP(); document.body.classList.remove('reading');
    $$('.pop.open').forEach((x) => x.classList.remove('open'));
    if (readDirty) { readDirty = false; renderPosts(); }
  }

  /* ---------------------------------------------------------------------
     Reader: figures in this essay + interactive explainers
  --------------------------------------------------------------------- */
  const FIG_RE = /(?:[$€₹]\s?\d[\d,.]*\s?(?:B|M|K\+?|Cr\+?|bn|million|billion|trillion)?\+?|\d[\d,.]*\s?(?:%|km|m\b|tCO₂e|ktCO₂e|°C|trillion|billion|million|hours|jurisdictions))/g;
  function buildFigures() {
    const body = $('.article-body', articleEl), wrap = $('#figs'); if (!body || !wrap) return;
    const figs = []; const seen = new Set(); let m; FIG_RE.lastIndex = 0; const text = body.innerText;
    while ((m = FIG_RE.exec(text)) && figs.length < 8) { const f = m[0].trim(); if (f.length < 2 || seen.has(f)) continue; seen.add(f); figs.push(f); }
    if (!figs.length) { wrap.hidden = true; return; }
    const marked = [];
    figs.forEach((f, i) => {
      const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT); let node;
      while ((node = walker.nextNode())) {
        const idx = node.nodeValue.indexOf(f); if (idx < 0) continue;
        const span = document.createElement('span'); span.className = 'fig'; span.id = `fig-${i}`; span.textContent = f;
        const after = node.splitText(idx); after.nodeValue = after.nodeValue.slice(f.length); node.parentNode.insertBefore(span, after);
        marked.push([f, span.id]); break;
      }
    });
    if (!marked.length) { wrap.hidden = true; return; }
    wrap.innerHTML = `<span class="lbl">Figures in this essay</span>${marked.map(([f, id]) => `<button type="button" data-fig="${id}">${esc(f)}</button>`).join('')}`;
    wrap.hidden = false;
  }
  articleEl?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fig]'); if (!b) return;
    const t = document.getElementById(b.dataset.fig); if (!t) return;
    t.scrollIntoView({ block: 'center', behavior: scrollBehavior });
    t.classList.add('fig-hit'); t.classList.remove('fade');
    setTimeout(() => t.classList.add('fade'), 1600); setTimeout(() => t.classList.remove('fig-hit', 'fade'), 3200);
  });

  const seg = (name, opts, cur) => `<span class="ex-toggle" role="group">${opts.map(([v, l]) => `<button type="button" data-${name}="${v}" class="${String(v) === String(cur) ? 'on' : ''}">${l}</button>`).join('')}</span>`;
  const EXPLAINERS = {
    resolution: { title: 'Grid resolution versus the flood line', sub: 'A plant sits 800 m east of a floodplain. Change the model grid size and watch when the score can finally tell dry ground from flood zone.', tool: 'Python (NumPy)',
      logic: `cell_x        = np.floor(plant_x / cell_km) * cell_km\nflooded_share = np.clip(floodline_x - cell_x, 0, cell_km) / cell_km\nscore         = "High" if flooded_share > 0.5 else "Moderate" if flooded_share > 0.15 else "Low"`,
      render(el) {
        el.innerHTML = `<svg viewBox="0 0 320 200" id="ex-map" role="img" aria-label="Schematic map with a floodplain and a plant"></svg>
          <div class="ex-ctl"><span>Model grid cell</span><input type="range" id="ex-res" min="0" max="4" step="1" value="1" aria-label="Grid cell size"><b id="ex-resv">25 km</b></div><div class="ex-read" id="ex-read"></div>`;
        const SIZES = [50, 25, 10, 5, 1], svgEl = $('#ex-map', el), inp = $('#ex-res', el);
        const draw = () => {
          const km = SIZES[+inp.value], s = km * 10, fx = 168, fy = 96;
          const cx0 = Math.floor(fx / s) * s, cy0 = Math.floor(fy / s) * s;
          const flooded = Math.max(0, Math.min(160 - cx0, s)) / s;
          const score = flooded > 0.5 ? 'High' : flooded > 0.15 ? 'Moderate' : 'Low';
          let g = ''; for (let x = 0; x <= 320; x += s) g += `<line x1="${x}" y1="0" x2="${x}" y2="200" stroke="currentColor" stroke-opacity=".2"/>`; for (let y = 0; y <= 200; y += s) g += `<line x1="0" y1="${y}" x2="320" y2="${y}" stroke="currentColor" stroke-opacity=".2"/>`;
          svgEl.innerHTML = `<rect width="320" height="200" fill="var(--surface)" rx="10"/>
            <path d="M0 0 H160 C150 40 170 80 160 120 C150 160 165 180 160 200 H0 Z" fill="rgba(11,99,196,.18)"/>
            <path d="M160 0 C150 40 170 80 160 120 C150 160 165 180 160 200" stroke="var(--accent-2)" stroke-width="2" fill="none"/>
            <g color="var(--text)">${g}</g>
            <rect x="${cx0}" y="${cy0}" width="${Math.min(s, 320 - cx0)}" height="${Math.min(s, 200 - cy0)}" fill="rgba(178,93,10,.22)" stroke="var(--accent-3)" stroke-width="2"/>
            <circle cx="${fx}" cy="${fy}" r="6" fill="var(--accent)" stroke="var(--bg)" stroke-width="2"/>
            <text x="${fx + 10}" y="${fy - 8}" font-size="10" fill="var(--text)" font-family="Inter, sans-serif" font-weight="600">Plant · 800 m from the flood line</text>
            <text x="8" y="16" font-size="10" fill="var(--accent-2)" font-family="Inter, sans-serif" font-weight="600">Floodplain</text>
            <text x="8" y="192" font-size="9" fill="var(--muted)" font-family="Inter, sans-serif">Highlighted: the model cell that contains the plant</text>`;
          $('#ex-resv', el).textContent = `${km} km`;
          $('#ex-read', el).innerHTML = `At <strong>${km} km</strong> the cell containing the plant is <strong>${Math.round(flooded * 100)}% floodplain</strong>, so the model scores the site <strong>${score}</strong>. ${km > 1 ? 'The plant stands on dry ground, but at this resolution the score cannot see that.' : 'Only now does the score describe where the plant actually stands.'}`;
        };
        inp.addEventListener('input', draw); draw();
      } },
    materiality: { title: 'Where the threshold lands decides how long the list gets', sub: 'Fourteen illustrative topics scored on impact and financial materiality. Move the threshold and count what becomes “material”.', tool: 'Excel',
      logic: `<b>=IF(OR([@Impact]>=Threshold,[@Financial]>=Threshold),"Material","Not material")</b>\n<b>=COUNTIF(tblTopics[Status],"Material")</b>\n\nThreshold lives in one named cell (Inputs!B2), so the whole list re-scores from a single input.`,
      render(el) {
        const T = [['Climate change', 4.6, 4.3], ['Energy', 3.9, 3.7], ['Water', 3.2, 2.2], ['Biodiversity', 3.7, 1.8], ['Pollution', 2.9, 2.6], ['Circularity', 2.6, 3.1], ['Own workforce', 3.5, 3.0], ['Value-chain workers', 4.0, 1.7], ['Communities', 2.4, 1.6], ['Consumers', 2.1, 3.4], ['Business conduct', 2.3, 3.9], ['Data privacy', 1.6, 3.3], ['Tax transparency', 1.4, 2.4], ['Animal welfare', 1.2, 1.1]];
        el.innerHTML = `<svg viewBox="0 0 320 240" id="ex-mat" role="img" aria-label="Double materiality matrix"></svg><div class="ex-ctl"><span>Materiality threshold</span><input type="range" id="ex-th" min="1.5" max="4.5" step="0.1" value="3" aria-label="Threshold"><b id="ex-thv">3.0</b></div><div class="ex-read" id="ex-mread"></div>`;
        const svgEl = $('#ex-mat', el), inp = $('#ex-th', el), X = (v) => 40 + (v - 1) / 4 * 260, Y = (v) => 210 - (v - 1) / 4 * 190;
        const draw = () => {
          const th = +inp.value, mat = T.filter(([, i, f]) => i >= th || f >= th);
          svgEl.innerHTML = `<rect x="40" y="20" width="260" height="190" fill="var(--surface)" rx="8"/>
            <rect x="${X(th)}" y="20" width="${300 - X(th)}" height="190" fill="rgba(var(--accent-rgb),.10)"/><rect x="40" y="20" width="260" height="${Y(th) - 20}" fill="rgba(var(--accent-rgb),.10)"/>
            <line x1="${X(th)}" y1="20" x2="${X(th)}" y2="210" stroke="var(--accent)" stroke-dasharray="4 4"/><line x1="40" y1="${Y(th)}" x2="300" y2="${Y(th)}" stroke="var(--accent)" stroke-dasharray="4 4"/>
            ${T.map(([n, i, f]) => { const on = i >= th || f >= th; return `<circle cx="${X(i)}" cy="${Y(f)}" r="${on ? 6 : 4}" fill="${on ? 'var(--accent)' : 'var(--muted)'}" opacity="${on ? 1 : .55}"><title>${n}: impact ${i}, financial ${f}</title></circle>`; }).join('')}
            <text x="170" y="234" font-size="10" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif">Impact materiality →</text>
            <text x="14" y="115" font-size="10" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif" transform="rotate(-90 14 115)">Financial materiality →</text>`;
          $('#ex-thv', el).textContent = th.toFixed(1);
          $('#ex-mread', el).innerHTML = `<strong>${mat.length} of ${T.length}</strong> illustrative topics are material at this threshold${mat.length > 8 ? '. Too many to steer: this is the “identify too many” trap the essay describes.' : mat.length < 4 ? '. Few enough to focus on, if the evidence supports the cut.' : '. A workable list, provided each topic has evidence behind it.'} Hover a dot for the topic.`;
        };
        inp.addEventListener('input', draw); draw();
      } },
    funnel: { title: 'From governance to funded action', sub: 'The share of large companies at each step, as cited in the essay.', tool: 'Power BI (DAX)',
      logic: `Step share % :=\n  DIVIDE ( COUNTROWS ( FILTER ( Companies, Companies[Reached step] >= SELECTEDVALUE ( Steps[Order] ) ) ), COUNTROWS ( Companies ) )\n\nDrop-off := [Step share %] - CALCULATE ( [Step share %], Steps[Order] = SELECTEDVALUE ( Steps[Order] ) + 1 )`,
      render(el) {
        const rows = [['Disclose how they govern climate risk', 88], ['Have a transition plan', 27], ['Quantify what climate risk will cost them', 17], ['Align capital expenditure with the plan', 11]];
        el.innerHTML = `<div class="ex-bars">${rows.map(([l, v]) => `<div class="ex-bar"><span>${l}</span><b>${v}%</b><div class="track"><i style="width:0" data-w="${v}"></i></div></div>`).join('')}</div><p class="ex-sub">Sources as cited: the State of Corporate Sustainability Disclosure 2025 (S&amp;P 500) and a 2025 LSE analysis of 2,000+ listed companies. Governance is nearly universal; funded action is not.</p>`;
        requestAnimationFrame(() => $$('.ex-bar i', el).forEach((i) => { i.style.width = i.dataset.w + '%'; }));
      } },
    propagation: { title: 'One driver, three financial lines', sub: 'Set a carbon price and see how it travels from the energy line into supplier prices and finally margin. Elasticities are illustrative.', tool: 'Excel',
      logic: `Energy_line_%   = Carbon_price × 0.18\nSupply_line_%   = Carbon_price × 0.07\nMargin_pp       = Carbon_price × 0.03\n\n<b>=Carbon_price*INDEX(Elasticities, MATCH([@Line], Lines, 0))</b>   ' one elasticity table, every line reads from it`,
      render(el) {
        el.innerHTML = `<div class="ex-ctl"><span>Carbon price</span><input type="range" id="ex-cp" min="0" max="300" step="10" value="100" aria-label="Carbon price"><b id="ex-cpv">$100/t</b></div><div class="ex-bars" id="ex-flow"></div><div class="ex-read" id="ex-pread"></div>`;
        const inp = $('#ex-cp', el);
        const draw = () => {
          const p = +inp.value, energy = p * 0.18, supply = p * 0.07, margin = p * 0.03;
          const rows = [['Energy cost line', `+${energy.toFixed(0)}%`, Math.min(100, energy / 60 * 100)], ['Supply chain cost line', `+${supply.toFixed(0)}%`, Math.min(100, supply / 25 * 100)], ['Operating margin', `−${margin.toFixed(1)} pp`, Math.min(100, margin / 10 * 100)]];
          $('#ex-flow', el).innerHTML = rows.map(([l, v, w]) => `<div class="ex-bar"><span>${l}</span><b>${v}</b><div class="track"><i style="width:${w}%"></i></div></div>`).join('');
          $('#ex-cpv', el).textContent = `$${p}/t`;
          $('#ex-pread', el).innerHTML = p === 0 ? 'With no carbon price every line sits at today’s baseline.' : `A <strong>$${p}/t</strong> price lands first on the energy line, passes into supplier prices, and only then appears as margin. In an engagement the elasticities come from the client’s own cost structure, not from a slider.`;
        };
        inp.addEventListener('input', draw); draw();
      } },
    scopes: { title: 'Where the emissions are, and where the visibility ends', sub: 'A typical footprint split (illustrative) and the supplier tiers that Scope 3 reaches into.', tool: 'Python (pandas)',
      logic: `share = inv.groupby("scope")["tco2e"].sum() / inv["tco2e"].sum()\nvisible = inv[inv["tier"] <= 1]["tco2e"].sum() / inv["tco2e"].sum()   # what contracts and audits can reach`,
      render(el) {
        el.innerHTML = `<div class="ex-bars"><div class="ex-bar"><span>Scope 1 · direct operations</span><b>~8%</b><div class="track"><i style="width:8%;background:var(--hm-2)"></i></div></div><div class="ex-bar"><span>Scope 2 · purchased energy</span><b>~12%</b><div class="track"><i style="width:12%;background:var(--hm-3)"></i></div></div><div class="ex-bar"><span>Scope 3 · value chain</span><b>70–90%</b><div class="track"><i style="width:80%"></i></div></div></div>
          <div class="ex-steps" style="margin-top:1rem"><button type="button" class="on" data-tier="1"><small>Tier 1</small><strong>Direct suppliers</strong></button><button type="button" data-tier="2"><small>Tier 2</small><strong>Their suppliers</strong></button><button type="button" data-tier="3"><small>Tier 3 and beyond</small><strong>Raw materials and land</strong></button></div><div class="ex-read" id="ex-tier"></div>`;
        const T = { 1: 'Contracts, audits and data requests reach here. Most Scope 3 programmes stop at this tier.', 2: 'Visibility fades: no direct contract, patchy data, and often the first place where nobody tracks greenhouse gas emissions at all.', 3: 'Where deforestation, water stress and labour risk actually sit. Traceability is weakest exactly where impact is highest.' };
        const read = $('#ex-tier', el); read.textContent = T[1];
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-tier]'); if (!b) return; $$('[data-tier]', el).forEach((x) => x.classList.toggle('on', x === b)); read.textContent = T[b.dataset.tier]; });
      } },
    hierarchy: { title: 'The SBTi V2 hierarchy of action', sub: 'Three steps, in order of preference. Select one to see what it asks of a company.', tool: 'Excel',
      logic: `<b>=IF(Structural_constraint, "Sector-wide + direct action", IF(Collaborative_option, "Value-chain initiative", "Direct engagement"))</b>\n\nThe order is the rule: direct first, collaborative second, sector-wide only where constraints are documented.`,
      render(el) {
        const S = [['Direct value-chain engagement', 'Work with suppliers and customers, fix procurement, back renewable adoption. This remains the preferred pathway.'], ['Collaborative value-chain initiatives', 'Sourcing-region programmes, supply-shed and landscape efforts, and industry coalitions that accelerate reductions.'], ['Sector-wide decarbonization', 'Where structural constraints exist, such as immature technology or missing infrastructure, contribute to sector-level solutions alongside direct action.']];
        el.innerHTML = `<div class="ex-steps">${S.map(([t], i) => `<button type="button" data-step="${i}" class="${i === 0 ? 'on' : ''}"><small>Step ${i + 1}</small><strong>${t}</strong></button>`).join('')}</div><div class="ex-read" id="ex-step">${S[0][1]}</div>`;
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (!b) return; $$('[data-step]', el).forEach((x) => x.classList.toggle('on', x === b)); $('#ex-step', el).textContent = S[+b.dataset.step][1]; });
      } },
    collateral: { title: 'What a climate factor does to collateral value', sub: 'A bank pledges a corporate bond. Set the issuer’s transition exposure, disclosure quality and plan credibility and watch the collateral value a central bank would recognise.', tool: 'Excel',
      logic: `Climate_factor   = MIN(0.4, Exposure × Plan_multiplier × (1 + (3 − Disclosure_score) × 0.1))\nCollateral_value = Nominal × (1 − Base_haircut) × (1 − Climate_factor)\n\n<b>=Nominal*(1-Base_haircut)*(1-MIN(0.4,Exposure*Plan_mult*(1+(3-Disclosure)*0.1)))</b>`,
      render(el) {
        const S = { nominal: 100, exp: 'med', dq: 3, plan: 'partial' };
        const EXP = { low: 0.05, med: 0.15, high: 0.30 }, PLAN = { none: 1, partial: 0.6, credible: 0.3 };
        el.innerHTML = `<div class="ex-ctl"><span>Bond nominal</span><input type="range" id="cl-n" min="10" max="500" step="10" value="100"><b id="cl-nv">$100M</b></div>
          <div class="ex-ctl"><span>Sector transition exposure</span>${seg('exp', [['low', 'Low'], ['med', 'Medium'], ['high', 'High']], S.exp)}</div>
          <div class="ex-ctl"><span>Disclosure quality</span><input type="range" id="cl-dq" min="1" max="5" step="1" value="3"><b id="cl-dqv">3 / 5</b></div>
          <div class="ex-ctl"><span>Transition plan</span>${seg('plan', [['none', 'None'], ['partial', 'Partial'], ['credible', 'Credible']], S.plan)}</div>
          <div class="ex-bars" id="cl-bars" style="margin-top:.8rem"></div><div class="ex-read" id="cl-read"></div>`;
        const draw = () => { const base = 0.10, cf = Math.min(0.4, EXP[S.exp] * PLAN[S.plan] * (1 + (3 - S.dq) * 0.1)); const std = S.nominal * (1 - base), adj = std * (1 - cf);
          $('#cl-bars', el).innerHTML = [['Standard haircut only', std, std / S.nominal * 100, 'var(--hm-3)'], ['With the climate factor', adj, adj / S.nominal * 100, 'var(--hm-4)']].map(([l, v, w, c]) => `<div class="ex-bar"><span>${l}</span><b>$${v.toFixed(1)}M</b><div class="track"><i style="width:${w}%;background:${c}"></i></div></div>`).join('');
          $('#cl-read', el).innerHTML = `Climate factor <strong>${(cf * 100).toFixed(1)}%</strong>: the bank can borrow against <strong>$${adj.toFixed(1)}M</strong> instead of $${std.toFixed(1)}M. ${cf > 0.15 ? 'Weak disclosure and a thin plan cost real balance-sheet capacity.' : 'Credible plans and good disclosure keep the adjustment small.'}`; };
        el.addEventListener('input', (e) => { if (e.target.id === 'cl-n') { S.nominal = +e.target.value; $('#cl-nv', el).textContent = `$${S.nominal}M`; } if (e.target.id === 'cl-dq') { S.dq = +e.target.value; $('#cl-dqv', el).textContent = `${S.dq} / 5`; } draw(); });
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-exp],[data-plan]'); if (!b) return; if (b.dataset.exp) S.exp = b.dataset.exp; if (b.dataset.plan) S.plan = b.dataset.plan; $$('.ex-toggle button', el).forEach((x) => x.classList.toggle('on', (x.dataset.exp && x.dataset.exp === S.exp) || (x.dataset.plan && x.dataset.plan === S.plan))); draw(); });
        draw();
      } },
    maplens: { title: 'Is it really asset-level? Three questions', sub: 'Pick the data resolution behind a score and tick what the provider can show you. The verdict follows the essay’s three questions.', tool: 'Excel',
      logic: `<b>=IF(AND(Has_hazard_maps, Resolution_km<=1, Method_documented), "Asset-level", "Average presented as asset-level")</b>\n\nResolution ladder: country average ≈ 100 km · regional grid ≈ 25 km · asset-level hazard maps ≤ 1 km`,
      render(el) {
        const S = { res: 25, maps: false, method: false };
        el.innerHTML = `<div class="ex-ctl"><span>Data behind the score</span>${seg('res', [[100, 'Country average'], [25, '25 km grid'], [1, '≤1 km hazard map']], S.res)}</div>
          <div class="ex-two" style="margin-top:.8rem"><div class="ex-check"><label><input type="checkbox" id="ml-maps"> Provider can show the hazard maps for my asset</label><label><input type="checkbox" id="ml-method"> Exposure method is documented and reviewable</label></div>
          <div class="ex-bars"><div class="ex-bar"><span>What the score can distinguish</span><b id="ml-b"></b><div class="track"><i id="ml-i"></i></div></div></div></div><div class="ex-verdict" id="ml-v"></div>`;
        const draw = () => { const d = { 100: ['Country vs country', 15], 25: ['Region vs region', 40], 1: ['Floodplain vs higher ground 800 m away', 100] }[S.res]; $('#ml-b', el).textContent = d[0]; $('#ml-i', el).style.width = d[1] + '%';
          const ok = S.maps && S.method && S.res <= 1; const v = $('#ml-v', el); v.className = `ex-verdict ${ok ? 'ok' : 'no'}`;
          v.innerHTML = ok ? 'Asset-level claim supported.<small>Maps, resolution and method all check out: this score can inform a credit or insurance decision.</small>' : `Not asset-level yet.<small>${S.res > 1 ? `At ${S.res} km the score cannot separate a floodplain from higher ground. ` : ''}${!S.maps ? 'Ask to see the hazard maps. ' : ''}${!S.method ? 'Ask how exposure was assessed.' : ''}</small>`; };
        el.addEventListener('change', (e) => { if (e.target.id === 'ml-maps') S.maps = e.target.checked; if (e.target.id === 'ml-method') S.method = e.target.checked; draw(); });
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-res]'); if (!b) return; S.res = +b.dataset.res; $$('[data-res]', el).forEach((x) => x.classList.toggle('on', +x.dataset.res === S.res)); draw(); });
        draw();
      } },
    exposure: { title: 'ESG pressure on a business with no investors', sub: 'Four channels reach a private company without a single shareholder asking. Move the sliders to see which ones light up.', tool: 'Python',
      logic: `pressure = {\n  "customers":  listed_share,\n  "regulation": min(100, eu_share * 1.2 + listed_share * 0.3),\n  "brand":      min(100, brand_years * 2.5),\n  "talent":     min(100, headcount / 12),\n}\nchannels_above_50 = sum(v > 50 for v in pressure.values())`,
      render(el) {
        const S = { listed: 60, eu: 30, brand: 30, head: 500 };
        el.innerHTML = `<div class="ex-ctl"><span>Revenue from listed customers</span><input type="range" id="xp-l" min="0" max="100" step="5" value="60"><b id="xp-lv">60%</b></div>
          <div class="ex-ctl"><span>Revenue exported to the EU</span><input type="range" id="xp-e" min="0" max="100" step="5" value="30"><b id="xp-ev">30%</b></div>
          <div class="ex-ctl"><span>Years of brand equity</span><input type="range" id="xp-b" min="1" max="60" step="1" value="30"><b id="xp-bv">30 yrs</b></div>
          <div class="ex-ctl"><span>Headcount</span><input type="range" id="xp-h" min="20" max="3000" step="20" value="500"><b id="xp-hv">500</b></div>
          <div class="ex-bars" id="xp-bars" style="margin-top:.8rem"></div><div class="ex-read" id="xp-read"></div>`;
        const draw = () => { const P = [['Customers scoring you as a supplier', S.listed, 'CSRD, Scope 3 and due-diligence data requests flow upstream'], ['Regulation arriving through the supply chain', Math.min(100, S.eu * 1.2 + S.listed * 0.3), 'CBAM, EUDR, CS3D and PPWR bind exporters and their suppliers'], ['Brand and reputation', Math.min(100, S.brand * 2.5), 'Decades of equity can be undone in 72 hours'], ['Talent watching what the company stands for', Math.min(100, S.head / 12), 'Quiet decisions about whether to stay or go']];
          $('#xp-bars', el).innerHTML = P.map(([l, v, t]) => `<div class="ex-bar" title="${t}"><span>${l}</span><b>${Math.round(v)}</b><div class="track"><i style="width:${v}%;background:${v > 50 ? 'var(--hm-4)' : 'var(--hm-2)'}"></i></div></div>`).join('');
          const n = P.filter((x) => x[1] > 50).length; $('#xp-read', el).innerHTML = `<strong>${n} of 4</strong> channels are above 50 with no investor in the picture. ${n >= 3 ? 'That is the “why should we?” answer: the market is already scoring the business.' : n >= 1 ? 'Pressure is arriving indirectly, mostly through customers and regulation.' : 'Low direct pressure today, which is exactly when the cheapest preparation happens.'}`; };
        el.addEventListener('input', (e) => { const m = { 'xp-l': ['listed', 'xp-lv', (v) => `${v}%`], 'xp-e': ['eu', 'xp-ev', (v) => `${v}%`], 'xp-b': ['brand', 'xp-bv', (v) => `${v} yrs`], 'xp-h': ['head', 'xp-hv', (v) => `${v}`] }[e.target.id]; if (!m) return; S[m[0]] = +e.target.value; $('#' + m[1], el).textContent = m[2](S[m[0]]); draw(); });
        draw();
      } },
    rubric: { title: 'How judging weights decide a case competition', sub: 'Two illustrative teams, four criteria. Change the weights and watch the ranking flip: the rubric is the decision.', tool: 'Excel',
      logic: `Weighted score = SUMPRODUCT(Weights, Scores) / SUM(Weights)\n\n<b>=SUMPRODUCT($B$2:$E$2, B5:E5) / SUM($B$2:$E$2)</b>\n<b>=RANK.EQ(F5, $F$5:$F$6)</b>`,
      render(el) {
        const C = ['Research depth', 'Feasibility', 'Impact', 'Presentation'], W = [30, 30, 25, 15];
        const T = [['Team A · data-heavy', [9, 6, 8, 7]], ['Team B · pragmatic', [7, 9, 7, 9]]];
        el.innerHTML = C.map((c, i) => `<div class="ex-ctl"><span>${c}</span><input type="range" data-w="${i}" min="0" max="50" step="5" value="${W[i]}" aria-label="Weight for ${c}"><b id="rb-w${i}">${W[i]}%</b></div>`).join('') + `<div class="ex-table-wrap" style="margin-top:.8rem"><table class="ex-table" id="rb-t"></table></div><div class="ex-read" id="rb-read"></div>`;
        const draw = () => { const sum = W.reduce((a, b) => a + b, 0) || 1; const rows = T.map(([n, sc]) => [n, sc, sc.reduce((a, v, i) => a + v * W[i], 0) / sum]); const win = rows[0][2] >= rows[1][2] ? 0 : 1;
          $('#rb-t', el).innerHTML = `<thead><tr><th>Team</th>${C.map((c) => `<th>${c.split(' ')[0]}</th>`).join('')}<th>Weighted</th></tr></thead><tbody>${rows.map(([n, sc, w], i) => `<tr><td>${i === win ? '<b>★ ' + n + '</b>' : n}</td>${sc.map((v) => `<td class="n">${v}</td>`).join('')}<td class="n"><b>${w.toFixed(2)}</b></td></tr>`).join('')}</tbody>`;
          $('#rb-read', el).innerHTML = `<strong>${rows[win][0].split(' ·')[0]}</strong> wins by ${Math.abs(rows[0][2] - rows[1][2]).toFixed(2)} points. ${W[0] + W[2] > W[1] + W[3] ? 'Weighting research and impact rewards the team that went deep.' : 'Weighting feasibility and delivery rewards the team that could execute on Monday.'}`; };
        el.addEventListener('input', (e) => { if (e.target.dataset.w === undefined) return; W[+e.target.dataset.w] = +e.target.value; $('#rb-w' + e.target.dataset.w, el).textContent = e.target.value + '%'; draw(); });
        draw();
      } },
    naturevar: { title: 'Offsets versus a correlated nature shock', sub: 'A $2.4B portfolio with sector-level dependency on ecosystem services (ENCORE-style) against $8M of offsets. Set the severity of one ecosystem shock.', tool: 'Power BI (DAX)',
      logic: `Nature VaR :=\n  SUMX ( Sectors, Sectors[Weight] * [Portfolio AUM] * Sectors[Dependency] * [Shock severity] )\n\nOffset coverage % := DIVIDE ( [Offsets], [Nature VaR] )`,
      render(el) {
        const SEC = [['Food & agriculture', .22, .30], ['Water-intensive industry', .18, .22], ['Coastal real estate', .15, .18], ['Consumer goods', .25, .10], ['Technology & services', .20, .04]];
        const AUM = 2400, OFF = 8;
        el.innerHTML = `<div class="ex-ctl"><span>Ecosystem shock severity</span><input type="range" id="nv-s" min="0" max="100" step="5" value="40"><b id="nv-sv">40%</b></div><div class="ex-table-wrap"><table class="ex-table" id="nv-t"></table></div><div class="ex-kpis" id="nv-k"></div><div class="ex-read" id="nv-r"></div>`;
        const draw = () => { const sev = +$('#nv-s', el).value / 100; const rows = SEC.map(([n, w, d]) => [n, w, d, w * AUM * d * sev]); const loss = rows.reduce((a, r) => a + r[3], 0);
          $('#nv-sv', el).textContent = `${Math.round(sev * 100)}%`;
          $('#nv-t', el).innerHTML = `<thead><tr><th>Sector</th><th>Weight</th><th>Dependency</th><th>Loss</th></tr></thead><tbody>${rows.map(([n, w, d, l]) => `<tr><td>${n}</td><td class="n">${Math.round(w * 100)}%</td><td class="n">${d >= .2 ? 'High' : d >= .1 ? 'Medium' : 'Low'}</td><td class="n"><b>$${l.toFixed(1)}M</b></td></tr>`).join('')}</tbody>`;
          $('#nv-k', el).innerHTML = `<div><b class="down">$${loss.toFixed(0)}M</b><span>correlated loss across holdings</span></div><div><b>$${OFF}M</b><span>nature offsets held</span></div><div><b>${loss ? Math.min(999, Math.round(OFF / loss * 100)) : 0}%</b><span>of the loss the offsets “cover”</span></div>`;
          $('#nv-r', el).innerHTML = loss ? `The shock hits <strong>${rows.filter((r) => r[3] > 5).length} sectors at once</strong>; the offsets neutralise emissions, not this exposure. Managing it means treating nature as a risk factor next to duration and credit.` : 'No shock, no loss. The question is what the portfolio looks like when one arrives.'; };
        el.addEventListener('input', draw); draw();
      } },
    omnibus: { title: 'Who is still in scope after the Omnibus', sub: 'Enter a company’s size. The first CSRD thresholds and the Omnibus thresholds give different answers, and the disclosure burden changed with them.', tool: 'Excel',
      logic: `Original CSRD (large undertaking): 2 of 3 → employees > 250, turnover > €50M, balance sheet > €25M\nOmnibus:                              employees > 1,000 AND turnover > €450M\n\n<b>=IF(AND(Employees>1000, Turnover>450), "In scope", "Out of scope")</b>\n<b>=IF((Employees>250)+(Turnover>50)+(Assets>25)>=2, "In scope (original)", "Out")</b>`,
      render(el) {
        el.innerHTML = `<div class="ex-ctl"><span>Employees</span><input type="range" id="om-e" min="50" max="5000" step="50" value="800"><b id="om-ev">800</b></div><div class="ex-ctl"><span>Turnover (€M)</span><input type="range" id="om-t" min="10" max="1500" step="10" value="300"><b id="om-tv">€300M</b></div>
          <div class="ex-kpis" id="om-k"></div><div class="ex-bars" style="margin-top:.8rem"><div class="ex-bar"><span>ESRS data points before</span><b>1,100+</b><div class="track"><i style="width:100%"></i></div></div><div class="ex-bar"><span>ESRS data points after the Omnibus</span><b>≈320</b><div class="track"><i style="width:29%"></i></div></div></div><div class="ex-read" id="om-r"></div>`;
        const draw = () => { const e = +$('#om-e', el).value, t = +$('#om-t', el).value; $('#om-ev', el).textContent = e.toLocaleString('en-GB'); $('#om-tv', el).textContent = `€${t}M`;
          const orig = ((e > 250) + (t > 50) + (t > 25)) >= 2; const now = e > 1000 && t > 450;
          $('#om-k', el).innerHTML = `<div><b class="${orig ? 'down' : ''}">${orig ? 'In scope' : 'Out'}</b><span>original CSRD</span></div><div><b class="${now ? 'down' : 'up'}">${now ? 'In scope' : 'Out'}</b><span>after the Omnibus</span></div><div><b>${orig && !now ? 'Released' : orig && now ? 'Still bound' : 'Never bound'}</b><span>net effect</span></div>`;
          $('#om-r', el).innerHTML = orig && !now ? 'This company built for CSRD and is now out of scope: the leaders’ tax in one line. Its large customers still need its Scope 3 data.' : now ? 'Still reporting, now with fewer peers to compare against and suppliers who no longer have to provide structured data.' : 'Never in scope, yet listed customers and lenders will still ask for the numbers.'; };
        el.addEventListener('input', draw); draw();
      } },
    durability: { title: 'Two NbS projects, twenty years on', sub: 'Project A is well designed. Set Project B’s permanence risk, species-to-site fit and climate sensitivity, then compare the carbon each still holds by year 20.', tool: 'Python',
      logic: `t = np.arange(0, 21)\nretained = 1 - perm_loss * t/20 - 0.3 * climate_sens * (t/20)**2 - 0.2 * (1 - site_fit)\nvalue_y20 = credits * price * retained[-1]`,
      render(el) {
        const S = { perm: .25, fit: .55, sens: .6 };
        el.innerHTML = `<div class="ex-ctl"><span>B · permanence risk</span><input type="range" id="du-p" min="0" max="50" step="5" value="25"><b id="du-pv">25%</b></div><div class="ex-ctl"><span>B · species-to-site fit</span><input type="range" id="du-f" min="0" max="100" step="5" value="55"><b id="du-fv">55%</b></div><div class="ex-ctl"><span>B · climate sensitivity</span><input type="range" id="du-s" min="0" max="100" step="5" value="60"><b id="du-sv">60%</b></div>
          <svg viewBox="0 0 320 170" id="du-c" role="img" aria-label="Retained carbon over twenty years for two projects" style="margin-top:.6rem"></svg><div class="ex-legend"><span><i style="background:var(--hm-4)"></i>Project A</span><span><i style="background:var(--accent-3)"></i>Project B</span></div><div class="ex-read" id="du-r"></div>`;
        const curve = (perm, fit, sens) => Array.from({ length: 21 }, (_, t) => Math.max(0, 1 - perm * t / 20 - 0.3 * sens * (t / 20) ** 2 - 0.2 * (1 - fit)));
        const X = (t) => 36 + t / 20 * 270, Y = (v) => 150 - v * 130;
        const draw = () => { const A = curve(.03, .95, .15), B = curve(S.perm, S.fit, S.sens);
          const path = (arr) => arr.map((v, t) => `${t ? 'L' : 'M'}${X(t).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
          $('#du-c', el).innerHTML = `<rect x="36" y="20" width="270" height="130" fill="var(--surface)" rx="8"/>${[0, .5, 1].map((v) => `<line x1="36" x2="306" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--border)"/><text x="30" y="${Y(v) + 3}" font-size="9" text-anchor="end" fill="var(--muted)" font-family="Inter, sans-serif">${Math.round(v * 100)}%</text>`).join('')}<path d="${path(A)}" fill="none" stroke="var(--hm-4)" stroke-width="2.5"/><path d="${path(B)}" fill="none" stroke="var(--accent-3)" stroke-width="2.5"/><text x="170" y="166" font-size="9" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif">Years since issuance → 20</text>`;
          $('#du-pv', el).textContent = `${Math.round(S.perm * 100)}%`; $('#du-fv', el).textContent = `${Math.round(S.fit * 100)}%`; $('#du-sv', el).textContent = `${Math.round(S.sens * 100)}%`;
          $('#du-r', el).innerHTML = `By year 20 Project A still holds <strong>${Math.round(A[20] * 100)}%</strong> of its claimed carbon; Project B holds <strong>${Math.round(B[20] * 100)}%</strong>. ${B[20] < 0.6 ? 'Same hectares, same headline, half the value: this is the credit that stays unretired.' : 'Close enough to A that the market would price them similarly.'}`; };
        el.addEventListener('input', (e) => { if (e.target.id === 'du-p') S.perm = +e.target.value / 100; if (e.target.id === 'du-f') S.fit = +e.target.value / 100; if (e.target.id === 'du-s') S.sens = +e.target.value / 100; draw(); });
        draw();
      } },
    priority: { title: 'Mandate down, market pressure unchanged', sub: 'Regulatory pressure fell with the Omnibus. Investor, lender and customer pressure did not. Place a company on both axes and read the recommendation.', tool: 'Excel',
      logic: `<b>=IF(Market>=60, IF(Regulatory>=60, "Comply and use it", "Build for the market"), IF(Regulatory>=60, "Comply, minimally", "Watch and prepare"))</b>`,
      render(el) {
        el.innerHTML = `<div class="ex-ctl"><span>Regulatory pressure</span><input type="range" id="pr-r" min="0" max="100" step="5" value="30"><b id="pr-rv">30</b></div><div class="ex-ctl"><span>Market pressure (investors, lenders, customers)</span><input type="range" id="pr-m" min="0" max="100" step="5" value="75"><b id="pr-mv">75</b></div>
          <svg viewBox="0 0 320 200" id="pr-c" role="img" aria-label="Priority quadrant" style="margin-top:.6rem"></svg><div class="ex-verdict ok" id="pr-v"></div>`;
        const draw = () => { const r = +$('#pr-r', el).value, m = +$('#pr-m', el).value; $('#pr-rv', el).textContent = r; $('#pr-mv', el).textContent = m;
          const X = (v) => 40 + v / 100 * 260, Y = (v) => 180 - v / 100 * 160;
          const q = m >= 60 ? (r >= 60 ? ['Comply and use it', 'Both pressures are high: the reporting you must do is also the data your market wants.'] : ['Build for the market', 'The mandate eased but the demand did not. Keep the capability; drop the compliance theatre.']) : (r >= 60 ? ['Comply, minimally', 'A legal requirement without market pull: meet it efficiently and no more.'] : ['Watch and prepare', 'Low pressure today is the cheapest moment to build data foundations.']);
          $('#pr-c', el).innerHTML = `<rect x="40" y="20" width="260" height="160" fill="var(--surface)" rx="8"/><line x1="${X(60)}" y1="20" x2="${X(60)}" y2="180" stroke="var(--border-2)" stroke-dasharray="4 4"/><line x1="40" y1="${Y(60)}" x2="300" y2="${Y(60)}" stroke="var(--border-2)" stroke-dasharray="4 4"/>
            ${[[80, 90, 'Comply and use it'], [22, 90, 'Build for the market'], [80, 28, 'Comply, minimally'], [22, 28, 'Watch and prepare']].map(([x, y, t]) => `<text x="${X(x)}" y="${Y(y)}" font-size="8.5" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif">${t}</text>`).join('')}
            <circle cx="${X(r)}" cy="${Y(m)}" r="7" fill="var(--accent)" stroke="var(--bg)" stroke-width="2"/><text x="170" y="196" font-size="9" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif">Regulatory pressure →</text><text x="14" y="100" font-size="9" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif" transform="rotate(-90 14 100)">Market pressure →</text>`;
          $('#pr-v', el).innerHTML = `${q[0]}<small>${q[1]}</small>`; };
        el.addEventListener('input', draw); draw();
      } },
    ppwr: { title: 'Can this packaging still be sold in the EU?', sub: 'Tick what the packaging can demonstrate, pick the year, and see which PPWR rule blocks market access.', tool: 'Excel',
      logic: `Rule active = Start_year <= Year\nBlocked     = any rule that is active AND not met\n\n<b>=IF(SUMPRODUCT((Start<=Year)*(Met=FALSE))=0, "Eligible", "Blocked: " & TEXTJOIN(", ", TRUE, IF((Start<=Year)*(Met=FALSE), Rule, "")))</b>`,
      render(el) {
        const R = [['pfas', 'PFAS-free food-contact packaging', 2026], ['min', 'Minimised: no excess material for marketing', 2026], ['epr', 'One producer registered for EPR in the market', 2026], ['rec', 'Recyclable at scale (design-for-recycling grade)', 2030], ['reuse', 'Reuse or refill option where mandated', 2030]];
        const S = { year: 2026, met: new Set(['epr']) };
        el.innerHTML = `<div class="ex-ctl"><span>Placed on the market in</span>${seg('yr', [[2026, '2026'], [2030, '2030'], [2035, '2035'], [2040, '2040']], S.year)}</div><div class="ex-check" style="margin-top:.8rem">${R.map(([k, l, y]) => `<label><input type="checkbox" data-req="${k}" ${S.met.has(k) ? 'checked' : ''}> <span style="flex:1">${l}</span><small style="color:var(--muted)">from ${y}</small></label>`).join('')}</div><div class="ex-verdict" id="pp-v"></div>`;
        const draw = () => { const active = R.filter((r) => S.year >= r[2]); const blocked = active.filter((r) => !S.met.has(r[0])); const v = $('#pp-v', el); v.className = `ex-verdict ${blocked.length ? 'no' : 'ok'}`;
          v.innerHTML = blocked.length ? `Blocked in ${S.year} by ${blocked.length} rule${blocked.length === 1 ? '' : 's'}.<small>${blocked.map((r) => r[1]).join(' · ')}. Non-compliant food-contact stock has no transition period after August 2026.</small>` : `Eligible in ${S.year}.<small>${active.length} of ${R.length} rules active and met. ${S.year < 2030 ? 'Design-for-recycling grades tighten from 2030.' : 'Keep the technical documentation and conformity assessment current.'}</small>`; };
        el.addEventListener('change', (e) => { const k = e.target.dataset.req; if (!k) return; e.target.checked ? S.met.add(k) : S.met.delete(k); draw(); });
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-yr]'); if (!b) return; S.year = +b.dataset.yr; $$('[data-yr]', el).forEach((x) => x.classList.toggle('on', +x.dataset.yr === S.year)); draw(); });
        draw();
      } },
    usage: { title: 'Identified, but is it used?', sub: 'Six material topics from an illustrative assessment. Toggle where each one actually shows up and read the usage ratio.', tool: 'Power BI (DAX)',
      logic: `Usage % :=\n  DIVIDE ( COUNTROWS ( FILTER ( Topics, Topics[In risk register] && Topics[Has KPI] && Topics[In capex plan] ) ), COUNTROWS ( Topics ) )\n\nPartially used :=\n  COUNTROWS ( FILTER ( Topics, [Register] + [KPI] + [Capex] IN { 1, 2 } ) )`,
      render(el) {
        const T = ['Climate change', 'Water', 'Own workforce', 'Value-chain workers', 'Business conduct', 'Circularity'];
        const S = T.map((_, i) => [i < 2, i < 1, i < 1]); const cols = ['Risk register', 'KPI', 'Capex plan'];
        el.innerHTML = `<div class="ex-table-wrap"><table class="ex-table" id="us-t"></table></div><div class="ex-kpis" id="us-k"></div><div class="ex-read" id="us-r"></div>`;
        const draw = () => { $('#us-t', el).innerHTML = `<thead><tr><th>Material topic</th>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${T.map((t, i) => `<tr><td>${t}</td>${cols.map((c, j) => `<td><span class="ex-toggle"><button type="button" data-ij="${i}-${j}" class="${S[i][j] ? 'on' : ''}" aria-pressed="${S[i][j]}" aria-label="${t}: ${c}">${S[i][j] ? 'Yes' : 'No'}</button></span></td>`).join('')}</tr>`).join('')}</tbody>`;
          const full = S.filter((r) => r.every(Boolean)).length, partial = S.filter((r) => r.some(Boolean) && !r.every(Boolean)).length, none = T.length - full - partial;
          $('#us-k', el).innerHTML = `<div><b class="up">${full}</b><span>fully used: register, KPI and capex</span></div><div><b>${partial}</b><span>partially used</span></div><div><b class="${none ? 'down' : ''}">${none}</b><span>identified only</span></div>`;
          $('#us-r', el).innerHTML = `Usage ratio <strong>${Math.round(full / T.length * 100)}%</strong>. ${none >= 3 ? 'Most of the list is a reporting output, not a management input.' : full >= 4 ? 'The assessment is shaping decisions, which is the point.' : 'Halfway: material topics exist on paper and in a few registers, but not yet in the budget.'}`; };
        el.addEventListener('click', (e) => { const b = e.target.closest('[data-ij]'); if (!b) return; const [i, j] = b.dataset.ij.split('-').map(Number); S[i][j] = !S[i][j]; draw(); });
        draw();
      } },
    threshold: { title: 'Curves versus thresholds', sub: 'Climate damage is usually modelled as a smooth curve. Ecosystems tip. Move the pressure and compare what each model says you have lost.', tool: 'Python',
      logic: `p = pressure / 100\nloss_curve = p ** 2                                    # smooth, climate-style damage function\nloss_tip   = 1 / (1 + np.exp(-(pressure - 62) / 3.5))   # logistic tipping point near 62\ngap        = loss_tip - loss_curve`,
      render(el) {
        el.innerHTML = `<div class="ex-ctl"><span>Cumulative pressure on the ecosystem</span><input type="range" id="th-p" min="0" max="100" step="1" value="55"><b id="th-pv">55</b></div><svg viewBox="0 0 320 170" id="th-c" role="img" aria-label="Smooth damage curve versus tipping point" style="margin-top:.6rem"></svg><div class="ex-legend"><span><i style="background:var(--accent-2)"></i>Smooth curve</span><span><i style="background:var(--accent-3)"></i>Tipping point</span></div><div class="ex-kpis" id="th-k"></div><div class="ex-read" id="th-r"></div>`;
        const X = (p) => 36 + p / 100 * 270, Y = (v) => 150 - v * 125, curve = (p) => (p / 100) ** 2, tip = (p) => 1 / (1 + Math.exp(-(p - 62) / 3.5));
        const draw = () => { const p = +$('#th-p', el).value; $('#th-pv', el).textContent = p;
          const path = (f) => Array.from({ length: 101 }, (_, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(f(i)).toFixed(1)}`).join(' ');
          $('#th-c', el).innerHTML = `<rect x="36" y="20" width="270" height="130" fill="var(--surface)" rx="8"/><path d="${path(curve)}" fill="none" stroke="var(--accent-2)" stroke-width="2.5"/><path d="${path(tip)}" fill="none" stroke="var(--accent-3)" stroke-width="2.5"/><line x1="${X(p)}" y1="20" x2="${X(p)}" y2="150" stroke="var(--text)" stroke-dasharray="3 3"/><circle cx="${X(p)}" cy="${Y(curve(p))}" r="5" fill="var(--accent-2)"/><circle cx="${X(p)}" cy="${Y(tip(p))}" r="5" fill="var(--accent-3)"/><text x="170" y="166" font-size="9" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif">Pressure →</text>`;
          $('#th-k', el).innerHTML = `<div><b>${Math.round(curve(p) * 100)}%</b><span>loss on the smooth curve</span></div><div><b class="down">${Math.round(tip(p) * 100)}%</b><span>loss with a tipping point</span></div><div><b>55%</b><span>of global GDP moderately or highly dependent on nature</span></div>`;
          $('#th-r', el).innerHTML = p < 50 ? 'Both models agree while pressure is low. That agreement is what makes the threshold invisible in a stress test.' : p < 62 ? 'The curve says “manageable”. The system is a few points from flipping.' : 'The ecosystem has tipped: a forest that was a sink is now a source. No curve would have priced this.'; };
        el.addEventListener('input', draw); draw();
      } }
  };
  function renderExplainer(p) {
    const slot = $('#explainer-slot'); if (!slot) return;
    const ex = p.explainer && EXPLAINERS[p.explainer];
    if (!ex) { slot.innerHTML = ''; return; }
    slot.innerHTML = `<section class="explainer" aria-label="Interactive model"><h4>Interactive model<span>illustrative inputs</span></h4><div class="ex-title">${esc(ex.title)}</div><p class="ex-sub">${esc(ex.sub)}</p><div class="ex-body" id="ex-body"></div>${ex.logic ? `<details class="ex-logic"><summary>How this is calculated<span class="tool">${esc(ex.tool || 'Logic')}</span></summary><pre>${ex.logic}</pre></details>` : ''}</section>`;
    ex.render($('#ex-body', slot));
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-open-post]'); if (!el) return;
    e.preventDefault();
    const i = POSTS.findIndex((p) => p.id === el.dataset.openPost);
    if (i > -1) openPost(i);
  });

  function renderStats() {
    const el = $('#insights-stats'); if (!el || !POSTS.length) return;
    const sum = (k) => POSTS.reduce((s, p) => s + (p[k] || 0), 0);
    const floor10 = (n) => Math.floor(n / 10) * 10;
    const latest = POSTS.map((p) => p.date).sort().pop();
    const mins = POSTS.reduce((s, p) => s + readTime(p), 0);
    const read = [...readSet].filter((id) => POSTS.some((p) => p.id === id)).length;
    el.innerHTML = `<span><b>${POSTS.length}</b>essays</span><span><b>${mins}</b>min of reading</span><span><b>${floor10(sum('reactions'))}+</b>reactions</span><span><b>${monthName(latest)}</b>latest</span>${read ? `<span class="reading-progress">You’ve read <b>${read}</b>/${POSTS.length}<i><em style="width:${Math.round(read / POSTS.length * 100)}%"></em></i></span>` : ''}`;
  }
  renderFilters(); renderPosts(); renderStats(); openFromHash();

  /* ---------------------------------------------------------------------
     Framework evidence explorer
  --------------------------------------------------------------------- */
  const EVIDENCE = [
    { key: 'csrd', label: 'CSRD · ESRS · Double materiality', sub: 'EU sustainability reporting', applied: ['**Led the DMA workstream** for a Polish manufacturer: 28 material topics, 150+ data points, weighted thresholds and a full audit trail.', '**Built the VBA scoring tool** now used as the team standard; delivery cut from six weeks to two.', '**Gap assessments against ESRS** for 12+ clients, cross-mapped to GRI, SASB, TCFD and CDP.', '**Designed the DMA module** of an eight-module ESG programme for 50+ consultants.'], posts: ['double-materiality-sounds-simple', 'double-materiality-identified-but-used', 'the-leaders-tax-omnibus', 'is-csrd-still-a-priority'] },
    { key: 'ifrs', label: 'IFRS S1 / S2 (ISSB)', sub: 'Global sustainability and climate disclosure', applied: ['**Authored a 40-page readiness framework** for the Bank of Mauritius evaluating eight banks across three transition pathways; adopted by the regulator and cited in national policy guidance.', '**Disclosure gap assessments** against IFRS S1/S2 and ASRS for 12+ clients.', '**Trained 50+ consultants** on IFRS S1/S2 through reusable case-study IP.'], posts: ['ecb-climate-factor-collateral', 'the-resolution-gap', 'quantifying-climate-risk-start-with-your-numbers'] },
    { key: 'ngfs', label: 'TCFD · NGFS scenario analysis', sub: 'Transition and physical climate risk', applied: ['**Modelled three NGFS scenarios** (SSP1-2.6, SSP2-4.5, SSP3-8.5) across three horizons for a leading tyre manufacturer; board heatmaps informed ₹200Cr+ of adaptation capital.', '**Built C-suite risk registers** under 1.5°C and 3°C pathways for a four-sector technology conglomerate, informing $80M of adaptation investment.', '**Delivered board-level Power BI heatmaps** and strategy decks that fed capital allocation decisions.'], posts: ['the-resolution-gap', 'asset-level-ask-to-see-the-map', 'quantifying-climate-risk-start-with-your-numbers'] },
    { key: 'ghg', label: 'GHG Protocol · Scope 1, 2, 3', sub: 'Corporate carbon accounting', applied: ['**Built a Python/Excel emission factor database** used across 10+ Fortune 500 inventories, standardising 2.3M tCO₂e of Scope 1/2/3 calculations and halving calculation time.', '**Set QA protocols** for GHG inventory calculations, lifting first-pass accuracy by 30%.', '**Life cycle assessment** of polyethylene and polypropylene to support GAIL India’s Net Zero plan.'], posts: ['every-problem-leads-to-the-supply-chain', 'sbti-v2-era-of-implementation'] },
    { key: 'pcaf', label: 'PCAF financed emissions', sub: 'Financial-sector carbon accounting', applied: ['**Modelled financed emissions** for a $1.8B AUM asset manager across six funds and 200+ assets, with automated attribution and data-quality scoring (1–5).', '**Improved PCAF data quality scores by two tiers** through the emission factor database.', '**Enabled portfolio-level decarbonization target setting** for the asset manager.'], posts: ['ecb-climate-factor-collateral', 'offsets-compensate-they-dont-manage'] },
    { key: 'sbti', label: 'SBTi · Net zero pathways', sub: 'Target setting and decarbonization strategy', applied: ['**Developed three supplier decarbonization handbooks** covering 20+ technologies (solar, battery storage, green hydrogen) aligned with the client’s science-based targets; adopted across procurement.', '**Decarbonization pathway** for a major steel and power producer and a **green transition roadmap** for a South Asian oil and gas company at PwC.', '**Research** on the technological and political feasibility of India’s 2050 net zero position.'], posts: ['sbti-v2-era-of-implementation', 'every-problem-leads-to-the-supply-chain', 'slide-deck-vs-balance-sheet'] },
    { key: 'taxonomy', label: 'EU Taxonomy · SFDR', sub: 'Sustainable finance classification', applied: ['**Built a DNSH scoring matrix** with automated PAI indicator quantification for 30+ economic activities for a European investment fund, cutting assessment time by 40% versus manual benchmarking.'], posts: ['the-leaders-tax-omnibus', 'is-csrd-still-a-priority'] },
    { key: 'eudr', label: 'EUDR · PPWR · CBAM', sub: 'Market-access regulation', applied: ['**Led EUDR/PPWR readiness** for a global FMCG client: traceability mapped across 12 supplier tiers, eight circularity gaps identified, and a phased roadmap that secured a €1.5M investment.', '**Regulatory landscape mapping** for biofuels, plastic waste export and pyrolysis oil for an international oil major.'], posts: ['ppwr-packaging-market-access', 'every-problem-leads-to-the-supply-chain', 'esg-for-the-business-with-no-investors'] },
    { key: 'verra', label: 'Verra VCS · Carbon markets', sub: 'Carbon credits and offsets', applied: ['**Quantified VM0042 feasibility** for an agricultural client: a 12,000 tCO₂e baseline validated with additionality and leakage assessments, confirming $500K+ in annual credit revenue.', '**Thought leadership on climate finance, carbon markets and offsetting** at PwC, and research on domestic carbon market mechanisms at Emergent Ventures India.'], posts: ['two-nbs-projects-only-one-holds-value', 'offsets-compensate-they-dont-manage'] },
    { key: 'tnfd', label: 'TNFD · Nature risk', sub: 'Biodiversity and ecosystem dependence', applied: ['**Essays on nature-related financial risk**, offsets versus systemic exposure, and NbS durability, drawing on ENCORE, IBAT and scenario tools.', '**Deforestation and circularity exposure** assessed within the EUDR/PPWR readiness roadmap.'], posts: ['we-learned-to-measure-carbon-first', 'offsets-compensate-they-dont-manage', 'two-nbs-projects-only-one-holds-value'] },
    { key: 'brsr', label: 'BRSR Core · GRI · SASB · CDP', sub: 'Disclosure frameworks and cross-mapping', applied: ['**Cross-mapped GRI, SASB, TCFD and CDP** in disclosure gap assessments for 12+ clients, identifying 25+ improvement areas per client.', '**Designed the BRSR Core module** of the ESG capability programme for 50+ consultants.', '**Maiden GRI sustainability report** for an Assam-based petrochemical company.'], posts: ['double-materiality-identified-but-used', 'slide-deck-vs-balance-sheet'] }
  ];
  (() => {
    const chips = $('#evidence-chips'), panelEl = $('#evidence-panel'); if (!chips || !panelEl) return;
    const byId = (id) => POSTS.find((p) => p.id === id);
    const render = (key) => {
      const ev = EVIDENCE.find((x) => x.key === key) || EVIDENCE[0];
      $$('.chip.ev', chips).forEach((c) => { const on = c.dataset.ev === ev.key; c.classList.toggle('on', on); c.setAttribute('aria-pressed', String(on)); });
      const posts = ev.posts.map(byId).filter(Boolean);
      panelEl.innerHTML = `<div><div class="ev-title">${esc(ev.label)}</div><div class="ev-sub">${esc(ev.sub)}</div><h4>Where I have applied it</h4><ul>${ev.applied.map((a) => `<li>${inline(a)}</li>`).join('')}</ul></div>
        <div><h4>Essays on the topic</h4>${posts.length ? `<div class="ev-posts">${posts.map((p) => `<a href="#post-${p.id}" data-open-post="${p.id}"><small>${esc(CATS[p.cat]?.label || '')} · ${monthName(p.date)}</small>${esc(p.title)}</a>`).join('')}</div>` : '<p class="ev-empty">No essays on this yet.</p>'}</div>`;
    };
    chips.innerHTML = EVIDENCE.map((x) => `<button type="button" class="chip ev" data-ev="${x.key}" aria-pressed="false">${esc(x.label)}</button>`).join('');
    chips.addEventListener('click', (e) => { const c = e.target.closest('.chip.ev'); if (c) render(c.dataset.ev); });
    render('csrd');
  })();

  /* ---------------------------------------------------------------------
     Command palette (⌘K / Ctrl+K)
  --------------------------------------------------------------------- */
  (() => {
    const rootEl = $('#cmdk'), input = $('#cmdk-input'), list = $('#cmdk-list'); if (!rootEl || !input || !list) return;
    const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    const ICON = { go: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'), post: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'), act: svg('<path d="m13 2-2 9h6l-6 11 2-9H7z"/>'), rec: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>') };
    const secs = [['Technical skills & toolkit', '#skills'], ['Impact', '#impact'], ['About', '#about'], ['Where I add value', '#value'], ['Experience', '#experience'], ['Selected engagements', '#work'], ['Expertise & framework evidence', '#expertise'], ['Insights', '#insights'], ['Leadership & recognition', '#leadership'], ['Education', '#education'], ['Contact', '#contact']];
    const firmName = (k) => (window.FIRMS || []).find((f) => f.key === k)?.name || '';
    const items = [
      ...secs.map(([l, h]) => ({ group: 'Go to', label: l, hint: 'Section', icon: 'go', run: () => scrollToEl($(h), 72) })),
      { group: 'Actions', label: 'Download résumé (PDF)', hint: 'PDF', icon: 'act', run: () => window.open(SITE.resume, '_blank') },
      { group: 'Actions', label: 'View résumé online', hint: 'Page', icon: 'act', run: () => { location.href = 'resume.html'; } },
      { group: 'Actions', label: 'Copy email address', hint: SITE.email, icon: 'act', run: () => navigator.clipboard?.writeText(SITE.email).then(() => showToast('Email address copied')) },
      { group: 'Actions', label: 'Open contact options', hint: 'Connect', icon: 'act', run: () => connect.set(true) },
      { group: 'Actions', label: 'Save contact card (vCard)', hint: '.vcf', icon: 'act', run: () => $('[data-vcard]')?.click() },
      { group: 'Actions', label: 'Toggle light / dark theme', hint: 'Theme', icon: 'act', run: () => themeBtn?.click() },
      ...(window.ENGAGEMENTS || []).map((r) => ({ group: 'Engagements', label: r.title, hint: firmName(r.firm).split(' ')[0], icon: 'rec', keywords: `${r.tools.join(' ')} ${r.caps.join(' ')} ${r.metrics.map((m) => m.v + ' ' + m.l).join(' ')}`, run: () => XP.openRecord(r.id) })),
      ...TECH.map((t) => ({ group: 'Technical skills', label: t.label, hint: t.level, icon: 'act', keywords: `${t.sub} skill tool`, run: () => craftGo(t.craft) })),
      ...POSTS.map((p, i) => ({ group: 'Essays', label: p.title, hint: CATS[p.cat]?.short || '', icon: 'post', keywords: `${p.tags.join(' ')} ${p.deck}`, run: () => openPost(i) }))
    ];
    let filtered = items, sel = 0, lastFocusEl = null;
    const hay = (it) => `${it.label} ${it.group} ${it.hint} ${it.keywords || ''}`.toLowerCase();
    const render = () => {
      if (!filtered.length) { list.innerHTML = '<div class="cmdk-empty">Nothing matches. Try “climate”, “résumé” or “PCAF”.</div>'; return; }
      let html = '', lastGroup = '';
      filtered.forEach((it, i) => {
        if (it.group !== lastGroup) { html += `<div class="cmdk-group">${it.group}</div>`; lastGroup = it.group; }
        html += `<div class="cmdk-item" role="option" data-i="${i}" aria-selected="${i === sel}"><span class="ic">${ICON[it.icon]}</span><span class="t">${esc(it.label)}</span><span class="hint">${esc(it.hint)}</span></div>`;
      });
      list.innerHTML = html;
      list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    };
    const filter = () => {
      const ws = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      filtered = ws.length ? items.filter((it) => { const h = hay(it); return ws.every((w) => h.includes(w)); }) : items;
      sel = 0; render();
    };
    const isOpen = () => rootEl.classList.contains('open');
    const open = () => { lastFocusEl = document.activeElement; setDrawer(false); rootEl.classList.add('open'); requestAnimationFrame(() => rootEl.classList.add('show')); input.value = ''; filter(); setTimeout(() => input.focus(), 30); };
    const close = () => { rootEl.classList.remove('show'); setTimeout(() => rootEl.classList.remove('open'), 220); lastFocusEl?.focus?.(); };
    const run = (i) => { const it = filtered[i]; if (!it) return; close(); setTimeout(() => it.run(), 120); };
    $('#cmdk-btn')?.addEventListener('click', open);
    $('#drawer-search')?.addEventListener('click', open);
    rootEl.addEventListener('click', (e) => { if (e.target.classList.contains('cmdk-backdrop')) return close(); const it = e.target.closest('.cmdk-item'); if (it) run(+it.dataset.i); });
    list.addEventListener('pointermove', (e) => { const it = e.target.closest('.cmdk-item'); if (it && +it.dataset.i !== sel) { sel = +it.dataset.i; $$('.cmdk-item', list).forEach((x) => x.setAttribute('aria-selected', String(+x.dataset.i === sel))); } });
    input.addEventListener('input', filter);
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); isOpen() ? close() : open(); return; }
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
    }, true);
  })();

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // Shared helpers for craft.js
  window.MG = { $, $$, esc, toast: showToast, reduceMotion, openPost, openRecord: XP.openRecord, setTool: XP.setTool };
})();
