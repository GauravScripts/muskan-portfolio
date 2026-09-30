/* ==========================================================================
   Muskan Gupta — craft.js
   Working reconstructions of how Excel, PowerPoint, Word, audit/QA and
   analytics tooling are used. Everything here is illustrative: the
   structures are real, the numbers are stand-ins.
   ========================================================================== */
(() => {
  'use strict';
  const MG = window.MG || {};
  const $ = MG.$ || ((s, r = document) => r.querySelector(s));
  const $$ = MG.$$ || ((s, r = document) => Array.from(r.querySelectorAll(s)));
  const esc = MG.esc || ((s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const toast = MG.toast || (() => {});
  const root = $('#craft'); if (!root || !window.CRAFT) return;
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONS = {
    excel: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'),
    ppt: svg('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 12l3-3 3 2 4-4"/>'),
    word: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>'),
    audit: svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    analytics: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>')
  };
  const chevL = svg('<path d="m15 18-6-6 6-6"/>'), chevR = svg('<path d="m9 18 6-6-6-6"/>');
  const bar = (title, right = '') => `<div class="bar"><i></i><i></i><i></i><span class="t">${title}</span>${right ? `<span class="r">${right}</span>` : ''}</div>`;
  const now = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const fmtN = (n) => n.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const S = {
    tab: 'excel',
    xl: { sheet: 'scoring', th: 3.0, sel: null, goal: 3, goalRes: '', log: [
      ['09:12', 'm.gupta', 'Workbook opened · v3 · 28 topics loaded from Inputs'],
      ['09:14', 'm.gupta', 'Weights updated: Biodiversity 0.8 → 0.9 (stakeholder round 2)'],
      ['09:15', 'RunScoring()', 'Threshold 3.0 · 1 material · 6 monitor · 0 not material'],
      ['09:40', 'a.sharma', 'Review: formulas locked, data validation confirmed on B5:C11'] ] },
    ppt: { i: 0, view: 'slide', notes: false, rag: ['g', 'a', 'g', 'r', 'g'] },
    doc: { sec: '3', markup: true, comments: true, order: ['1', '2', '3', '4', '5', '6', '7'] },
    qa: { tab: 'checklist', th: 10, open: null, prep: false, rev: false, attached: new Set(), signed: '' , conf: 95, err: 5 },
    an: { tab: 'py', scen: 'orderly', hz: 2040, pass: 40, validate: true, dup: false, ran: false, hot: null }
  };

  /* ------------------------------ Excel ------------------------------ */
  const ROWS = [['Climate change', 4.6, 4.2, 1.0], ['Water & marine', 3.1, 2.4, 0.8], ['Biodiversity', 3.8, 2.1, 0.9], ['Circular economy', 2.7, 3.3, 0.8], ['Own workforce', 3.4, 2.9, 1.0], ['Value-chain workers', 4.1, 1.9, 0.9], ['Business conduct', 2.2, 3.6, 0.7]];
  const status = (i, f, th) => i >= th && f >= th ? ['Material', 'm'] : (i >= th || f >= th) ? ['Monitor', 'w'] : ['Not material', 'x'];
  const score = (i, f, w) => ((i + f) / 2 * w).toFixed(2);
  const xlCounts = (th) => { const m = ROWS.filter(([, i, f]) => status(i, f, th)[1] === 'm').length, w = ROWS.filter(([, i, f]) => status(i, f, th)[1] === 'w').length; return { m, w, x: ROWS.length - m - w }; };
  const xlRows = () => ROWS.map(([t, i, f, w], k) => { const [s, c] = status(i, f, S.xl.th); const rn = k + 5, sel = S.xl.sel === rn; return `<tr class="${sel ? 'sel' : ''}" data-rn="${rn}"><td class="rn">${rn}</td><td>${t}</td><td class="n${sel ? ' prec' : ''}">${i.toFixed(1)}</td><td class="n${sel ? ' prec' : ''}">${f.toFixed(1)}</td><td class="n w" data-k="${k}" title="Click to change the weight">${w.toFixed(1)}</td><td class="n">${score(i, f, w)}</td><td class="st ${c}${sel ? ' dep' : ''}">${s}</td></tr>`; }).join('');
  const xlFormula = () => {
    if (S.xl.sel) { const k = S.xl.sel - 5, [t, i, f] = ROWS[k], [s] = status(i, f, S.xl.th); return `<span class="ref">F${S.xl.sel}</span><span>=IF(AND(B${S.xl.sel}&gt;=Threshold,C${S.xl.sel}&gt;=Threshold),<b>"Material"</b>,IF(OR(B${S.xl.sel}&gt;=Threshold,C${S.xl.sel}&gt;=Threshold),<b>"Monitor"</b>,<b>"Not material"</b>)) <span class="fx">→ ${s} · precedents B${S.xl.sel}, C${S.xl.sel}, Inputs!B2 (${S.xl.th.toFixed(1)}) · ${t}</span></span>`; }
    return `<span class="ref">fx</span><span>=IF(AND([@Impact]&gt;=Threshold,[@Financial]&gt;=Threshold),<b>"Material"</b>,IF(OR([@Impact]&gt;=Threshold,[@Financial]&gt;=Threshold),<b>"Monitor"</b>,<b>"Not material"</b>)) <span class="fx">· click a row to trace precedents · click a weight to edit it</span></span>`;
  };
  const xlSheets = () => `<div class="xl-sheets" role="tablist" aria-label="Sheets">${[['inputs', 'Inputs'], ['scoring', 'Scoring'], ['heatmap', 'Heatmap'], ['log', 'Audit log']].map(([k, l]) => `<button type="button" role="tab" data-sheet="${k}" class="${S.xl.sheet === k ? 'on' : ''}" aria-selected="${S.xl.sheet === k}">${l}</button>`).join('')}</div>`;
  const xlCtl = () => { const c = xlCounts(S.xl.th); return `<div class="xl-ctl"><span>Threshold</span><input type="range" id="xl-th" min="2" max="4.5" step="0.1" value="${S.xl.th}" aria-label="Materiality threshold"><b id="xl-thv">${S.xl.th.toFixed(1)}</b><span id="xl-cnt">${c.m} material · ${c.w} monitor · ${c.x} not material</span></div>`; };
  const xlGoal = () => `<div class="xl-goal"><span>Goal seek: set material topics to</span><select id="xl-goal" aria-label="Target number of material topics">${[0, 1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}" ${n === S.xl.goal ? 'selected' : ''}>${n}</option>`).join('')}</select><span>by changing Threshold</span><button type="button" data-goal>Solve</button><span class="res" id="xl-goalres">${S.xl.goalRes}</span></div>`;
  function xlSheet() {
    if (S.xl.sheet === 'scoring') return `<div class="xl-formula" id="xl-formula">${xlFormula()}</div><div class="scroll"><table class="xl-grid" aria-label="Scoring table"><thead><tr><th class="rn"></th><th>A · Topic</th><th>B · Impact</th><th>C · Financial</th><th>D · Weight</th><th>E · Score</th><th>F · Status</th></tr></thead><tbody id="xl-body">${xlRows()}</tbody></table></div>${xlCtl()}${xlGoal()}`;
    if (S.xl.sheet === 'inputs') return `<div class="xl-inputs"><div class="xl-kv">
        <div><small>Named range · Threshold</small><b>=Inputs!$B$2 → ${S.xl.th.toFixed(1)}</b></div>
        <div><small>Named range · Weights</small><b>=Inputs!$B$5:$B$11</b></div>
        <div><small>Structured table</small><b>tblTopics · Scoring!A4:F11</b></div>
        <div><small>Data validation · B5:C11</small><b>Decimal between 1 and 5 · stop on error</b></div></div>
        <pre class="code" style="padding:.7rem .2rem 0"><span class="k">Sub</span> <span class="f">RunScoring</span>()
    <span class="k">Dim</span> r <span class="k">As</span> ListRow
    <span class="k">For Each</span> r <span class="k">In</span> Sheets(<span class="s">"Scoring"</span>).ListObjects(<span class="s">"tblTopics"</span>).ListRows
        r.Range(1, 6).Value = Score(r.Range(1, 2).Value, r.Range(1, 3).Value, [Threshold])
    <span class="k">Next</span> r
    LogChange <span class="s">"RunScoring"</span>, Environ(<span class="s">"Username"</span>), Now, [Threshold]
<span class="k">End Sub</span>

<span class="k">Private Sub</span> <span class="f">Worksheet_Change</span>(<span class="k">ByVal</span> Target <span class="k">As</span> Range)
    <span class="k">If Not</span> Intersect(Target, [Weights]) <span class="k">Is Nothing Then</span> LogChange <span class="s">"Weight"</span>, Environ(<span class="s">"Username"</span>), Now, Target.Address
<span class="k">End Sub</span>
<span class="c">' Every run and every weight edit writes who, when and what to the Audit log sheet</span></pre></div>${xlCtl()}`;
    if (S.xl.sheet === 'heatmap') {
      const th = S.xl.th; const cells = [];
      for (let f = 5; f >= 1; f--) { cells.push(`<span class="ax">${f}</span>`); for (let i = 1; i <= 5; i++) { const here = ROWS.filter(([, ii, ff]) => Math.round(ii) === i && Math.round(ff) === f); const [, k] = status(i, f, th); const bg = k === 'm' ? 'var(--hm-4)' : k === 'w' ? 'rgba(var(--accent3-rgb),.35)' : 'var(--surface-2)'; const col = k === 'm' ? '#fff' : 'var(--text)'; cells.push(`<span class="c" style="background:${bg};color:${col}" title="Impact ${i} · Financial ${f}${here.length ? ' · ' + here.map((r) => r[0]).join(', ') : ''}">${here.length ? `<span>${here.length === 1 ? esc(here[0][0]) : here.length + ' topics'}</span>` : ''}</span>`); } }
      cells.push('<span></span>'); for (let i = 1; i <= 5; i++) cells.push(`<span class="ax">${i}</span>`);
      return `<div class="xl-hm" role="img" aria-label="Materiality heatmap: impact on the horizontal axis, financial materiality on the vertical axis">${cells.join('')}</div><div class="xl-hm-cap">Conditional formatting: both scores ≥ ${th.toFixed(1)} → material (green) · one score ≥ ${th.toFixed(1)} → monitor (amber). Rows = financial, columns = impact.</div>${xlCtl()}`;
    }
    return `<div class="xl-log" id="xl-log" aria-live="polite">${S.xl.log.map(([t, u, m], i) => `<div class="${i >= 4 ? 'new' : ''}"><span>${t}</span><span class="u">${u}</span><b>${esc(m)}</b></div>`).join('')}</div><div class="note" style="border-top:0">Move the threshold, edit a weight or run goal seek on the Scoring sheet: the macro appends each change here</div>${xlCtl()}`;
  }
  const xlArt = () => `<div class="artifact">${bar('DMA_Scoring_v3.xlsm', '<span style="font-family:var(--font-mono);font-size:.6rem">Protected · macros enabled</span>')}${xlSheet()}${xlSheets()}<div class="note">Illustrative reconstruction · 7 of 28 topics shown</div></div>`;
  const xlLog = (who, msg) => { S.xl.log.push([now(), who, msg]); };

  /* ---------------------------- PowerPoint ---------------------------- */
  const hmCell = (v) => `<i class="c" style="background:var(--hm-${v})"></i>`;
  const WS = ['Flood defences · Plant A', 'Drainage and elevation · Plant B', 'Heat-stress measures · all sites', 'Hazard data and monitoring', 'FY27 budget approval'];
  const ragName = { g: 'On track', a: 'At risk', r: 'Off track' };
  function trackerBody() {
    const on = S.ppt.rag.filter((x) => x === 'g').length, red = WS.filter((_, i) => S.ppt.rag[i] === 'r');
    return { at: `${on} of ${WS.length} workstreams on track${red.length ? `; ${red.map((w) => w.split(' ·')[0].toLowerCase()).join(' and ')} need${red.length === 1 ? 's' : ''} a decision this quarter` : ' and no decisions are outstanding'}`,
      body: `<div class="body"><div class="rag" role="group" aria-label="Workstream status, click to change">${WS.map((w, i) => `<span>${w}</span><button type="button" class="${S.ppt.rag[i]}" data-rag="${i}" aria-label="${w}: ${ragName[S.ppt.rag[i]]}, click to change">${ragName[S.ppt.rag[i]]}</button>`).join('')}</div><div class="sw"><h6>Reading the tracker</h6><ul><li>Green: on plan and within budget</li><li>Amber: slipping, mitigation in hand</li><li>Red: needs a board decision</li></ul><div class="dec">Click a status to update the action title</div></div></div>` };
  }
  const SLIDES = [
    { n: 2, at: 'Climate exposure is concentrated in two plants and one horizon, so a phased ₹200Cr+ adaptation programme from FY27 protects output at the lowest cost',
      body: `<div class="body"><div class="kpis"><div><b>₹200Cr+</b><span>adaptation capex proposed, phased FY27–FY30</span></div><div><b>2 of 3</b><span>plants exceed flood design tolerance by 2040 under SSP3-8.5</span></div><div><b>3 × 3</b><span>scenarios × horizons modelled with NGFS pathways</span></div></div>
        <div class="sw"><h6>What the board is asked to decide</h6><ul><li>Approve the programme envelope and FY27 first phase</li><li>Mandate flood tolerance as a design criterion for new capex</li><li>Add climate exposure to the quarterly risk register</li></ul><div class="dec">Decision requested today: envelope and phase 1</div></div></div>`,
      notes: 'Open with the decision, not the method. The heatmap on slide 7 is the evidence; keep methodology in the appendix unless asked.' },
    { n: 7, at: 'Under SSP3-8.5, two of three plants exceed flood tolerance by 2040, so adaptation capex should be phased from FY27',
      body: `<div class="body"><div class="hm"><span></span><span>2030</span><span>2040</span><span>2050</span><span class="l">Plant A</span>${hmCell(2)}${hmCell(4)}${hmCell(5)}<span class="l">Plant B</span>${hmCell(2)}${hmCell(3)}${hmCell(4)}<span class="l">Plant C</span>${hmCell(1)}${hmCell(2)}${hmCell(2)}</div>
        <div class="sw"><h6>So what</h6><ul><li>Flood depth at plants A and B crosses design tolerance in the 2040 horizon</li><li>Heat stress adds output loss at all sites by 2050</li><li>Phasing early avoids peak-cost retrofits</li></ul><div class="dec">Decision requested: phased adaptation capex, ₹200Cr+</div></div></div>`,
      notes: 'Read the heatmap left to right: exposure rises with time under the hot-house pathway. Plant C stays low because it sits on higher ground.' },
    { n: 12, at: 'Under an orderly transition, pass-through and planned abatement cut 2040 carbon cost exposure by more than half',
      body: `<div class="body one">${bridgeSVG()}</div>`,
      notes: 'Bridge chart: gross exposure → pass-through → abatement → retained. Numbers are illustrative here; in the deck they come from the Power BI model.' },
    { n: 19, at: 'Sequencing adaptation by plant exposure spreads capex across four years and avoids peak-cost retrofits',
      body: `<div class="body one"><div class="gantt"><span>Plant A · flood defences</span><div class="g"><i style="left:0%;width:45%"></i></div><span>Plant B · drainage, elevation</span><div class="g"><i class="b" style="left:30%;width:45%"></i></div><span>All sites · heat stress</span><div class="g"><i class="c" style="left:55%;width:45%"></i></div><span>Monitoring &amp; review</span><div class="g"><i style="left:0%;width:100%;opacity:.35"></i></div><span></span><div class="yrs"><span>FY27</span><span>FY28</span><span>FY29</span><span>FY30</span></div></div></div>`,
      notes: 'Each bar maps to a capex line in the appendix. The review track is there to show the board this is monitored, not fire-and-forget.' },
    { n: 23, tracker: true, notes: 'Programme tracker for the quarterly follow-up. The action title is generated from the RAG statuses so the message never drifts from the data.' }
  ];
  function bridgeSVG() {
    const steps = [['Gross exposure', 40, 'total'], ['Pass-through', -16, 'down'], ['Planned abatement', -7, 'down'], ['Retained cost', 17, 'total']];
    const W = 420, H = 150, pad = 24, bw = 62, gap = (W - pad * 2 - bw * 4) / 3, max = 40, y = (v) => 118 - v / max * 90;
    let run = 0, out = '';
    steps.forEach(([l, v, k], i) => {
      const x = pad + i * (bw + gap); let top, h;
      if (k === 'total') { top = y(v); h = 118 - top; run = v; } else { const from = run, to = run + v; top = y(Math.max(from, to)); h = Math.abs(y(from) - y(to)); run = to; }
      const fill = k === 'total' ? 'var(--hm-4)' : 'var(--accent-3)';
      out += `<rect x="${x}" y="${top}" width="${bw}" height="${Math.max(2, h)}" rx="3" fill="${fill}"/><text x="${x + bw / 2}" y="${top - 5}" text-anchor="middle" font-size="9" font-weight="600" fill="var(--text)">${k === 'total' ? '$' + v + 'M' : v + 'M'}</text><text x="${x + bw / 2}" y="132" text-anchor="middle" font-size="7.5" fill="var(--muted)">${l}</text>`;
      if (i < steps.length - 1) out += `<line x1="${x + bw}" y1="${y(run)}" x2="${x + bw + gap}" y2="${y(run)}" stroke="var(--border-2)" stroke-dasharray="3 3"/>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bridge from $40M gross carbon cost exposure to $17M retained after pass-through and abatement"><line x1="${pad}" y1="118" x2="${W - pad}" y2="118" stroke="var(--border-2)"/>${out}<text x="${W - pad}" y="12" text-anchor="end" font-size="7.5" fill="var(--muted)">2040 · orderly · $M · illustrative</text></svg>`;
  }
  const slideOf = (s) => s.tracker ? { ...s, ...trackerBody() } : s;
  const SCQA = `<div class="scqa"><div><b>S</b><span>Three plants carry most of the group’s output. The board has never seen their climate exposure quantified.</span></div><div><b>C</b><span>Under SSP3-8.5 two plants exceed flood tolerance by 2040 and heat stress erodes output at all three by 2050.</span></div><div><b>Q</b><span>How much adaptation capital is needed, where, and when?</span></div><div><b>A</b><span>Phase ₹200Cr+ of flood resilience and heat adaptation from FY27, sequenced by plant exposure.</span></div></div>`;
  function pptArt() {
    const s = slideOf(SLIDES[S.ppt.i]);
    const main = S.ppt.view === 'slide' ? `<div class="slide" tabindex="0" aria-label="Slide ${s.n}: ${esc(s.at)}"><div class="at">${s.at}</div>${s.body}<div class="ft"><span>Source: NGFS scenarios, site hazard data · illustrative</span><span>${s.n} / 24</span></div></div>${S.ppt.notes ? `<div class="deck-notes"><b>Speaker notes · </b>${esc(s.notes)}</div>` : ''}`
      : S.ppt.view === 'scqa' ? SCQA
      : S.ppt.view === 'sorter' ? `<div class="sorter" role="group" aria-label="Slide sorter">${SLIDES.map((x, i) => { const y = slideOf(x); return `<button type="button" data-slide="${i}" class="${i === S.ppt.i ? 'on' : ''}"><b>Slide ${y.n}</b><span class="ln"></span><span>${esc(y.at.length > 90 ? y.at.slice(0, 88) + '…' : y.at)}</span></button>`; }).join('')}</div>`
      : `<div class="outline">${SLIDES.map((x, i) => { const y = slideOf(x); return `<button type="button" data-slide="${i}" class="${i === S.ppt.i ? 'on' : ''}"><b>${y.n}</b><span>${esc(y.at)}</span></button>`; }).join('')}</div>`;
    const views = `<div class="deck-views" role="group" aria-label="Deck view">${[['slide', 'Slide'], ['sorter', 'Sorter'], ['scqa', 'Storyline'], ['outline', 'Ghost deck']].map(([k, l]) => `<button type="button" data-pv="${k}" class="${S.ppt.view === k ? 'on' : ''}">${l}</button>`).join('')}<button type="button" data-notes class="${S.ppt.notes ? 'on' : ''}" aria-pressed="${S.ppt.notes}">Notes</button></div>`;
    return `<div class="artifact deck">${bar('Board_Climate_Risk_Deck.pptx · 24 slides', '<span style="font-family:var(--font-mono);font-size:.6rem">Pre-read sent T-5</span>')}<div id="ppt-view">${main}</div>
      <div class="deck-nav">${views}<div style="display:flex;align-items:center;gap:.5rem"><div class="dots" role="group" aria-label="Slides">${SLIDES.map((x, i) => `<button type="button" data-slide="${i}" class="${i === S.ppt.i ? 'on' : ''}" aria-label="Slide ${x.n}">${x.n}</button>`).join('')}</div><div class="arrows"><button type="button" data-dir="-1" aria-label="Previous slide" ${S.ppt.i === 0 ? 'disabled' : ''}>${chevL}</button><button type="button" data-dir="1" aria-label="Next slide" ${S.ppt.i === SLIDES.length - 1 ? 'disabled' : ''}>${chevR}</button></div></div></div>
      <div class="note">Illustrative reconstruction · action title carries the argument, exhibit carries the evidence · ← → to move between slides</div></div>`;
  }

  /* -------------------------------- Word -------------------------------- */
  const DOC = {
    '1': { title: 'Executive summary', page: 3, body: `<p>This framework assesses the readiness of eight licensed banks to disclose under IFRS S1 and IFRS S2. It evaluates governance, strategy, risk management and metrics against the ISSB requirements and three transition pathways <span class="xref" data-tip="Cross-reference field: renumbers automatically when sections move">(see {{sec:3}})</span>.</p><p>Readiness is uneven. <del>Most banks have started</del><ins>Five of eight banks have started</ins> governance work; none yet quantifies financed emissions with PCAF-grade data quality.</p>`,
      cmt: ['Reviewer 1 · “Replace ‘most’ with the count so the summary is auditable.”', 'Resolved · count taken from the bank-by-bank assessment, Table 6.1.'] },
    '2': { title: 'Governance readiness', page: 6, body: `<p>Each bank was assessed on board oversight, management roles and competency. Evidence was drawn from board charters, committee terms of reference and interviews.</p><div class="tc">Tracked change accepted in v6: “The Board <del>should consider establishing</del><ins>shall establish</ins> a standing climate committee with a documented escalation path.”</div>` },
    '3': { title: 'Strategy and transition pathways', page: 11, body: `<p>Three pathways frame the strategic assessment. Each bank’s lending book was mapped to sector exposure and then stress-tested against the pathway assumptions <span class="xref" data-tip="Appendix B lists the NGFS variables and vintages used">(Appendix B)</span>. Metrics follow in <span class="xref" data-tip="Cross-reference field">{{sec:5}}</span>.</p>`, children: [
      { title: 'Orderly transition', page: 12, body: `<p>Early, predictable policy. Carbon prices rise steadily; transition risk is manageable and physical risk stays low. Most banks are positioned for this pathway by default, which is the risk.</p>` },
      { title: 'Delayed transition', page: 14, body: `<p>Policy arrives late and sharply. Sudden repricing hits carbon-intensive borrowers; <ins>the two banks with the highest energy exposure see the largest expected-loss uplift.</ins></p>` },
      { title: 'Hot house world', page: 16, body: `<p>Limited policy action. Physical risk dominates: coastal collateral, agricultural lending and tourism assets carry the exposure. Requires asset-level hazard data rather than country averages.</p>` } ] },
    '4': { title: 'Risk management integration', page: 18, body: `<p>Assesses whether climate risk sits inside the existing risk taxonomy, appetite statements and ICAAP, or in a parallel sustainability process. The <span class="xref" data-tip="Cross-reference to the mapping table">requirement mapping in {{sec:5}}</span> shows where each bank stands.</p>` },
    '5': { title: 'Metrics and targets', page: 23, body: `<p>Requirement-to-evidence mapping for the disclosure metrics in IFRS S2 paragraphs 29–37.</p>
      <table class="map"><thead><tr><th>IFRS S2 requirement</th><th>Evidence expected</th><th>Sector status</th></tr></thead><tbody>
      <tr><td>¶29(a) Scope 1, 2, 3 emissions</td><td>GHG inventory, methodology note, assurance statement</td><td class="part">Partial</td></tr>
      <tr><td>¶29(a)(vi) Financed emissions</td><td>PCAF attribution, data-quality scores by asset class</td><td class="part">Partial</td></tr>
      <tr><td>¶29(b)–(c) Transition and physical risk exposure</td><td>Asset value exposed by pathway and horizon</td><td>Gap</td></tr>
      <tr><td>¶33–36 Targets</td><td>Baseline, interim milestones, governance of targets</td><td class="ok">Ready (3 banks)</td></tr></tbody></table>`,
      cmt: ['Reviewer 2 · “Is ‘Gap’ too strong for exposure metrics?”', 'Resolved · kept; no bank reported quantified exposure at the cut-off date.'] },
    '6': { title: 'Bank-by-bank assessment', page: 27, body: `<p>Eight banks scored across the four pillars on a 1–4 readiness scale. Names are withheld in this version; the regulator holds the keyed copy.</p><div class="toc"><div><span>Bank A · 3.1</span><span>Governance-led</span></div><div><span>Bank B · 2.8</span><span>Metrics gap</span></div><div><span>Bank C · 2.6</span><span>Strategy gap</span></div><div><span>Bank D · 2.2</span><span>Early stage</span></div><div class="l2"><span>Banks E–H</span><span>1.4 – 2.0</span></div></div>` },
    '7': { title: 'Recommendations and roadmap', page: 36, body: `<p>Sequenced recommendations for the regulator and for banks: governance in year one, quantified exposure in year two, assured metrics and targets by year three. Adopted into national sustainable finance guidance.</p>` }
  };
  const docNum = (id) => { const i = S.doc.order.indexOf(id.split('.')[0]); if (id.includes('.')) return `${i + 1}.${id.split('.')[1]}`; return String(i + 1); };
  const docEntry = (id) => { if (id.includes('.')) { const [p, c] = id.split('.'); return DOC[p].children[+c - 1]; } return DOC[id]; };
  const fill = (html) => html.replace(/\{\{sec:(\d+)\}\}/g, (_, id) => `Section ${docNum(id)}`);
  function docArt() {
    const sec = docEntry(S.doc.sec);
    const rows = S.doc.order.map((id, i) => `<div class="nv${id === S.doc.sec ? ' on' : ''}"><button type="button" role="tab" data-sec="${id}" class="${id === S.doc.sec ? 'on' : ''}" aria-selected="${id === S.doc.sec}">${i + 1}. ${esc(DOC[id].title)}</button><button type="button" class="mv" data-move="-1" aria-label="Move section up" ${i === 0 ? 'disabled' : ''}>▲</button><button type="button" class="mv" data-move="1" aria-label="Move section down" ${i === S.doc.order.length - 1 ? 'disabled' : ''}>▼</button></div>${(DOC[id].children || []).map((c, j) => `<div class="nv"><button type="button" role="tab" data-sec="${id}.${j + 1}" class="l2${`${id}.${j + 1}` === S.doc.sec ? ' on' : ''}" aria-selected="${`${id}.${j + 1}` === S.doc.sec}">${i + 1}.${j + 1} ${esc(c.title)}</button></div>`).join('')}`).join('');
    const nav = `<div class="navpane" role="tablist" aria-label="Navigation pane"><h6>Navigation · drag order with ▲▼</h6>${rows}</div>`;
    const page = `<div class="pg${S.doc.markup ? '' : ' final'}"><h6>${docNum(S.doc.sec)}. ${esc(sec.title)}</h6><div class="sub">IFRS S1/S2 Readiness Framework for the Banking Sector · Prepared for the Bank of Mauritius · v7 final · page ${sec.page} of 40</div>${fill(sec.body)}${S.doc.comments && sec.cmt ? `<div class="cmt"><b>Comment thread</b><span class="res">Resolved</span><br>${sec.cmt.map(esc).join('<br>')}</div>` : ''}</div>`;
    const tools = `<button type="button" data-markup class="${S.doc.markup ? 'on' : ''}" aria-pressed="${S.doc.markup}">Markup</button><button type="button" data-comments class="${S.doc.comments ? 'on' : ''}" aria-pressed="${S.doc.comments}">Comments</button><button type="button" data-fields title="Update all fields (F9)">Update fields</button>`;
    return `<div class="artifact">${bar('IFRS_S1_S2_Readiness_Framework_v7.docx', tools)}<div class="doc">${nav}${page}</div>
      <div class="doc-status"><span>Page ${sec.page} of 40</span><span>11,240 words</span><span>Styles: Heading 1–3 · numbered</span><span>Tracked changes: 14 resolved · 0 pending</span><span>Cross-references: 22 fields</span></div>
      <div class="note">Illustrative reconstruction · move a section with ▲▼ and watch numbering and cross-references update · hover a dotted reference · toggle Markup</div></div>`;
  }

  /* ----------------------------- Audit & QA ----------------------------- */
  const STEPS = [
    ['ok', 'Organisational boundary and consolidation approach confirmed', 'Step 1', 'Operational control confirmed against the legal entity list; three JVs excluded with rationale filed.'],
    ['ok', 'Emission factor versions tied out to database release 2026-09', 'Step 2', 'Every factor in the workbook carries the release tag; mismatches fail the build.'],
    ['ok', 'Unit conversions and completeness reconciled to source registers', 'Step 3', 'Utility bills, fuel cards and supplier returns reconciled line by line (see Tie-out).'],
    ['ok', 'Scope 2 reported location-based and market-based', 'Step 4', 'Contractual instruments verified; residual mix factor applied where certificates are missing.'],
    ['warn', 'Year-on-year variance above threshold explained and evidenced', 'Variance', 'Variance tab: every movement above the threshold needs a documented driver and evidence. Attach evidence there to clear the open items.'],
    ['todo', 'Four-eyes sign-off and evidence pack archived', 'Pending', 'Preparer and reviewer sign the control sheet; the pack is archived with the version hash.']
  ];
  const TIE = [['Scope 1 · stationary combustion', 12480.3, 12480.3], ['Scope 1 · mobile combustion', 3912.6, 3912.6], ['Scope 2 · location-based', 41902.7, 41902.7], ['Scope 2 · market-based', 38114.0, 38114.0], ['Scope 3 · cat 1 purchased goods', 208115.9, 207880.4], ['Scope 3 · cat 4 upstream transport', 9204.1, 9548.7]];
  const VAR = [['Stationary combustion', 12010.2, 12480.3, 'Boiler upgrade commissioning in Q2 · maintenance log'], ['Mobile combustion', 4410.9, 3912.6, 'Fleet electrification, 38 vehicles · asset register'], ['Purchased electricity', 44120.5, 41902.7, ''], ['Purchased goods', 176300.0, 208115.9, 'New supplier PCF data replaces spend-based factors · supplier pack'], ['Upstream transport', 8811.4, 9548.7, ''], ['Business travel', 1290.0, 2104.3, 'Post-pandemic travel normalisation · T&E export'], ['Waste', 610.2, 588.0, '']];
  const varState = () => { let flagged = 0, evid = 0; VAR.forEach(([, a, b, ex], i) => { const p = Math.abs((b - a) / a * 100); if (p > S.qa.th) { flagged++; if (ex || S.qa.attached.has(i)) evid++; } }); return { flagged, evid, open: flagged - evid }; };
  function qaArt() {
    const tabs = `<div class="qa-tabs" role="tablist">${[['checklist', 'Protocol'], ['tieout', 'Tie-out'], ['variance', 'Variance'], ['sampling', 'Sampling']].map(([k, l]) => `<button type="button" role="tab" data-qtab="${k}" class="${S.qa.tab === k ? 'on' : ''}" aria-selected="${S.qa.tab === k}">${l}</button>`).join('')}</div>`;
    const vs = varState(), signed = S.qa.prep && S.qa.rev, ready = signed && vs.open === 0;
    let body = '';
    if (S.qa.tab === 'checklist') {
      body = `<div class="qa">${STEPS.map(([k, t, tag, det], i) => {
        let kk = k, tg = tag; if (i === 4) { kk = vs.open ? 'warn' : 'ok'; tg = vs.open ? `${vs.open} open` : 'Cleared'; } if (i === 5) { kk = signed ? 'ok' : 'todo'; tg = signed ? `Signed ${S.qa.signed}` : 'Pending'; }
        return `<button type="button" class="row${kk === 'warn' ? ' flag' : ''}${S.qa.open === i ? ' open' : ''}" data-step="${i}" aria-expanded="${S.qa.open === i}"><i class="${kk}">${kk === 'ok' ? '✓' : kk === 'warn' ? '!' : ''}</i><span>${t}</span><small>${tg}</small></button><div class="det">${det}${i === 5 ? `<div class="signoff"><label><input type="checkbox" data-sign="prep" ${S.qa.prep ? 'checked' : ''}> Preparer · m.gupta</label><label><input type="checkbox" data-sign="rev" ${S.qa.rev ? 'checked' : ''}> Reviewer · a.sharma</label></div>` : ''}</div>`; }).join('')}</div>
        <div class="ready ${ready ? 'ok' : 'no'}">${ready ? '✓ Ready for assurance: all steps complete, evidence pack archived' : `Not yet ready for assurance: ${vs.open ? `${vs.open} variance${vs.open === 1 ? '' : 's'} open` : ''}${vs.open && !signed ? ' · ' : ''}${!signed ? 'sign-off pending' : ''}`}</div>`;
    } else if (S.qa.tab === 'tieout') {
      const rows = TIE.map(([l, a, b]) => { const d = b - a, p = d / a * 100, k = Math.abs(p) < 0.5 ? 'ok' : Math.abs(p) < 5 ? 'warn' : 'bad'; return `<tr><td>${l}</td><td class="num">${fmtN(a)}</td><td class="num">${fmtN(b)}</td><td class="num ${k}">${d === 0 ? '—' : (d > 0 ? '+' : '−') + fmtN(Math.abs(d))}</td><td class="${k}">${k === 'ok' ? '✓ tied' : k === 'warn' ? '! investigate' : '✗ break'}</td></tr>`; }).join('');
      const ta = TIE.reduce((s, r) => s + r[1], 0), tb = TIE.reduce((s, r) => s + r[2], 0);
      body = `<div class="scroll"><table class="tieout" aria-label="Tie-out of inventory to source registers"><thead><tr><th>Line (tCO₂e)</th><th>Source register</th><th>Inventory</th><th>Δ</th><th>Status</th></tr></thead><tbody>${rows}<tr><td><b>Total</b></td><td class="num"><b>${fmtN(ta)}</b></td><td class="num"><b>${fmtN(tb)}</b></td><td class="num">${(tb - ta > 0 ? '+' : '−') + fmtN(Math.abs(tb - ta))}</td><td class="warn">${((tb - ta) / ta * 100).toFixed(2)}%</td></tr></tbody></table></div><div class="note" style="border-top:0">Tolerance 0.5% per line · cat 4 movement traced to a supplier PCF update after cut-off, reconciled in v3</div>`;
    } else if (S.qa.tab === 'variance') {
      const th = S.qa.th;
      const rows = VAR.map(([l, a, b, ex], i) => { const p = (b - a) / a * 100, hit = Math.abs(p) > th, ev = ex || (S.qa.attached.has(i) ? 'Evidence attached · reviewer note' : ''); return `<tr><td>${l}</td><td class="num">${fmtN(a)}</td><td class="num">${fmtN(b)}</td><td class="num ${hit ? (ev ? 'warn' : 'bad') : ''}">${p > 0 ? '+' : ''}${p.toFixed(1)}%</td><td class="${hit ? (ev ? 'warn' : 'bad') : 'ok'}">${hit ? (ev ? 'Evidenced' : `<button type="button" class="att" data-att="${i}">Attach evidence</button>`) : 'Within threshold'}</td></tr>${hit && ev ? `<tr><td colspan="5" style="text-align:left;font-size:.62rem;color:var(--muted);padding-top:0">↳ ${esc(ev)}</td></tr>` : ''}`; }).join('');
      body = `<div class="xl-ctl" style="border-top:0"><span>Variance threshold</span><input type="range" id="qa-th" min="2" max="30" step="1" value="${th}" aria-label="Year-on-year variance threshold"><b id="qa-thv">±${th}%</b><span id="qa-cnt">${vs.flagged} flagged · ${vs.evid} evidenced · ${vs.open} open</span></div><div class="scroll"><table class="tieout" aria-label="Year-on-year variance analysis"><thead><tr><th>Category (tCO₂e)</th><th>FY25</th><th>FY26</th><th>YoY</th><th>Status</th></tr></thead><tbody id="qa-body">${rows}</tbody></table></div>`;
    } else {
      const z = { 90: 1.645, 95: 1.96, 99: 2.576 }[S.qa.conf], N = 1842, e = S.qa.err / 100, n0 = Math.ceil(z * z * 0.25 / (e * e)), n = Math.min(N, Math.ceil(n0 / (1 + (n0 - 1) / N)));
      const strata = [['Scope 1 lines', 212, 0.06], ['Scope 2 lines', 96, 0.29], ['Scope 3 · purchased goods', 1180, 0.53], ['Scope 3 · other categories', 354, 0.12]];
      const alloc = strata.map(([l, pop, share]) => [l, pop, share, Math.max(3, Math.round(n * pop / N))]);
      const cover = Math.min(99, Math.round(38 + n / N * 62));
      body = `<div class="xl-ctl" style="border-top:0"><span>Confidence</span><span class="ex-toggle" role="group">${[90, 95, 99].map((c) => `<button type="button" data-conf="${c}" class="${S.qa.conf === c ? 'on' : ''}">${c}%</button>`).join('')}</span><span>Tolerable error</span><input type="range" id="qa-err" min="2" max="10" step="1" value="${S.qa.err}" aria-label="Tolerable error"><b>±${S.qa.err}%</b></div>
        <div class="scroll"><table class="tieout" aria-label="Sampling plan"><thead><tr><th>Stratum</th><th>Population</th><th>Emissions share</th><th>Sample</th></tr></thead><tbody>${alloc.map(([l, pop, sh, k]) => `<tr><td>${l}</td><td class="num">${pop.toLocaleString('en-GB')}</td><td class="num">${Math.round(sh * 100)}%</td><td class="num"><b>${k}</b></td></tr>`).join('')}<tr><td><b>Total</b></td><td class="num"><b>${N.toLocaleString('en-GB')}</b></td><td class="num">100%</td><td class="num"><b>${alloc.reduce((s, r) => s + r[3], 0)}</b></td></tr></tbody></table></div>
        <div class="note" style="border-top:0">n = z²·p(1−p) / e², finite-population corrected · z = ${z} · the 20 largest lines are always tested in full · estimated emissions coverage ${cover}%</div>`;
    }
    return `<div class="artifact">${bar('GHG_Inventory_QA_Protocol_v3 · FY26 review')}${tabs}${body}
      <div class="qa-sum"><div><b>+30%</b><span>first-pass accuracy</span></div><div><b>−15h</b><span>senior review a month</span></div><div><b>+2</b><span>PCAF quality tiers</span></div></div>
      <div class="evid"><span>EF release 2026-09</span><span>Utility bills Q1–Q4</span><span>Fleet fuel cards</span><span>Supplier PCF pack</span><span>Control sheet v3</span></div>
      <div class="note">Illustrative checklist, reconciliations and sampling plan · outcomes from the résumé</div></div>`;
  }

  /* ------------------------------ Analytics ------------------------------ */
  const CODE = {
    py: () => `<span class="k">import</span> pandas <span class="k">as</span> pd

factors = (pd.read_parquet(<span class="s">"ef_2026_09.parquet"</span>)
             .query(<span class="s">"scope in [1, 2, 3] and region == 'IN'"</span>))
activity = pd.read_excel(<span class="s">"client_activity.xlsx"</span>, sheet_name=<span class="s">"FY26"</span>)

inv = (activity.merge(factors, on=[<span class="s">"category"</span>, <span class="s">"unit"</span>]${S.an.validate ? ', validate=<span class="s">"m:1"</span>' : ''})
               .assign(tco2e=<span class="k">lambda</span> d: d.quantity * d.factor / <span class="f">1_000</span>)
               .groupby([<span class="s">"scope"</span>, <span class="s">"category"</span>], as_index=<span class="k">False</span>)[<span class="s">"tco2e"</span>].sum())
<span class="c"># ${S.an.validate ? 'validate="m:1" fails loudly if a factor is missing or duplicated' : 'without validate=, a duplicated factor silently doubles the rows it matches'}</span>`,
    dax: () => `<span class="f">Retained carbon cost</span> :=
<span class="k">VAR</span> Price = SELECTEDVALUE ( Scenario[Carbon price] )
<span class="k">VAR</span> PassThrough = [Pass-through %]
<span class="k">RETURN</span>
    SUMX ( Sites, Sites[tCO2e] * Price * ( <span class="f">1</span> - PassThrough ) )

<span class="f">Exposure rank</span> :=
RANKX ( ALL ( Sites[Site] ), [Retained carbon cost], , DESC, DENSE )`,
    m: () => `<span class="k">let</span>
    Source   = Excel.Workbook(File.Contents(<span class="s">"supplier_returns.xlsx"</span>), <span class="k">true</span>),
    Combined = Table.Combine(List.Transform(Source[Data], <span class="k">each</span> Table.PromoteHeaders(_))),
    Typed    = Table.TransformColumnTypes(Combined, {{<span class="s">"Quantity"</span>, <span class="k">type</span> number}, {<span class="s">"Unit"</span>, <span class="k">type</span> text}}),
    Clean    = Table.SelectRows(Typed, <span class="k">each</span> [Quantity] &lt;&gt; <span class="k">null</span> <span class="k">and</span> [Unit] &lt;&gt; <span class="s">""</span>)
<span class="k">in</span>
    Clean`
  };
  function pyOut() {
    if (!S.an.ran) return `<span class="c">▶ Run to execute the pipeline against the FY26 activity file</span>`;
    if (S.an.dup && S.an.validate) return `Traceback (most recent call last):\n  File "ef_pipeline.py", line 8, in &lt;module&gt;\npandas.errors.MergeError: Merge keys are not unique in right dataset; not a many-to-one merge\n<span class="ok">✓ the duplicate factor (Purchased electricity · kWh · 2 rows) was caught before any number reached the client</span>`;
    if (S.an.dup) return `scope  category                 tco2e\n1      Stationary combustion   12,480.3\n2      Purchased electricity   <b style="color:var(--danger)">83,805.4</b>\n3      Purchased goods        208,115.9\n<span style="color:var(--danger)">✗ 218 activity rows matched two factors · Scope 2 overstated 2× · nothing flagged it</span>`;
    return `scope  category                 tco2e\n1      Stationary combustion   12,480.3\n2      Purchased electricity   41,902.7\n3      Purchased goods        208,115.9\n<span class="ok">✓ 0 unmatched factors · 3,412 activity rows · 0.8 s</span>`;
  }
  const OUT = { dax: `Scenario = Orderly · Price = $200/t · Pass-through = 40%\nRetained carbon cost = $12.0M · Exposure rank: Plant A = 1`, m: `7 supplier workbooks combined · 1,842 rows · 0 nulls after Clean · refresh 2.1 s` };
  const PATHS = { orderly: [100, 200, 300], disorderly: [20, 250, 400], hothouse: [15, 20, 25] };
  const SITES = [['Plant A', 46], ['Plant B', 31], ['Plant C', 23]];
  const DIMS = { site: ['DimSite', 'One row per plant; the flood-zone flag comes from the QGIS layer. Filters flow one way: DimSite → FactEmissions.'], scen: ['DimScenario', 'Pathway × horizon × carbon price. The report slicers sit on this table, so every measure re-evaluates against the selected scenario.'], factor: ['DimFactor', 'Release-tagged emission factors. Changing the release re-prices every fact row without touching the model.'], date: ['DimDate', 'Fiscal calendar for year-on-year and quarter views; marked as the date table for time intelligence.'] };
  function modelSVG() {
    const box = (key, x, y, t, cols, hot) => `<g class="dim${S.an.hot === key ? ' hot' : ''}" data-dim="${key}" tabindex="0" role="button" aria-label="${t}"><rect x="${x}" y="${y}" width="112" height="${18 + cols.length * 12}" rx="6" fill="${hot ? 'var(--accent-soft)' : 'var(--surface-2)'}" stroke="${hot ? 'var(--accent)' : 'var(--border-2)'}"/><text x="${x + 8}" y="${y + 13}" font-size="8.5" font-weight="700" fill="var(--text)">${t}</text>${cols.map((c, i) => `<text x="${x + 8}" y="${y + 26 + i * 12}" font-size="7.5" fill="var(--text-2)" font-family="JetBrains Mono, monospace">${c}</text>`).join('')}</g>`;
    const link = (key, x1, y1, x2, y2) => `<line class="rel${S.an.hot === key ? ' hot' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--border-2)" stroke-width="1.2"/><text x="${x1 + (x2 - x1) * .2}" y="${y1 + (y2 - y1) * .2 - 3}" font-size="7" fill="var(--muted)">1</text><text x="${x1 + (x2 - x1) * .85}" y="${y1 + (y2 - y1) * .85 - 3}" font-size="7" fill="var(--muted)">*</text>`;
    return `<svg viewBox="0 0 420 230" role="img" aria-label="Star schema: FactEmissions linked to site, scenario, factor and date dimensions">
      ${link('site', 80, 50, 165, 105)}${link('scen', 340, 50, 265, 105)}${link('factor', 80, 190, 165, 130)}${link('date', 340, 190, 265, 130)}
      <g><rect x="154" y="80" width="112" height="54" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="162" y="93" font-size="8.5" font-weight="700" fill="var(--text)">FactEmissions</text>${['site_key · scenario_key', 'factor_key · date_key', 'quantity · tco2e'].map((c, i) => `<text x="162" y="${106 + i * 12}" font-size="7.5" fill="var(--text-2)" font-family="JetBrains Mono, monospace">${c}</text>`).join('')}</g>
      ${box('site', 24, 14, 'DimSite', ['site_key · name', 'lat · lon · flood_zone'])}
      ${box('scen', 284, 14, 'DimScenario', ['scenario_key · pathway', 'horizon · carbon_price'])}
      ${box('factor', 24, 160, 'DimFactor', ['factor_key · release', 'category · unit · value'])}
      ${box('date', 284, 160, 'DimDate', ['date_key · fiscal_year', 'quarter · month'])}
    </svg>`;
  }
  function biHTML() {
    const prices = PATHS[S.an.scen], hz = [2030, 2040, 2050].indexOf(S.an.hz), price = prices[hz], pass = S.an.pass / 100;
    const vals = SITES.map(([n, kt]) => [n, kt * 1000 * price * (1 - pass) / 1e6]);
    const total = vals.reduce((s, v) => s + v[1], 0), max = Math.max(...vals.map((v) => v[1]), 0.001);
    const W = 420, H = 130, pad = 110;
    const bars = vals.map(([n, v], i) => { const y = 18 + i * 34, w = (v / max) * (W - pad - 60); return `<text x="${pad - 8}" y="${y + 13}" text-anchor="end" font-size="9" fill="var(--text-2)">${n}</text><rect x="${pad}" y="${y}" width="${Math.max(2, w)}" height="20" rx="4" fill="${i === 0 ? 'var(--hm-4)' : 'var(--hm-3)'}"/><text x="${pad + w + 6}" y="${y + 13}" font-size="9" font-weight="600" fill="var(--text)">$${v.toFixed(1)}M</text>`; }).join('');
    const seg = (k, opts, cur) => `<span class="seg" role="group">${opts.map(([v, l]) => `<button type="button" data-${k}="${v}" class="${String(cur) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</span>`;
    return `<div class="bi"><div class="slicers"><span class="lbl">Scenario</span>${seg('scen', [['orderly', 'Orderly'], ['disorderly', 'Disorderly'], ['hothouse', 'Hot house']], S.an.scen)}<span class="lbl">Horizon</span>${seg('hz', [[2030, '2030'], [2040, '2040'], [2050, '2050']], S.an.hz)}<span class="lbl">Pass-through</span><input type="range" id="bi-pass" min="0" max="100" step="5" value="${S.an.pass}" aria-label="Pass-through" style="width:90px;accent-color:var(--accent)"><b style="font-size:.7rem">${S.an.pass}%</b></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Retained carbon cost by site: ${vals.map((v) => `${v[0]} $${v[1].toFixed(1)}M`).join(', ')}">${bars}<text x="${W - 4}" y="${H - 4}" text-anchor="end" font-size="7.5" fill="var(--muted)">Retained carbon cost by site · $M · illustrative</text></svg>
      <div class="cards"><div><b>$${total.toFixed(1)}M</b><span>Retained carbon cost</span></div><div><b>$${price}/t</b><span>Carbon price · ${S.an.hz}</span></div><div><b>${(total / 40 * 100).toFixed(0)}%</b><span>of $40M energy spend</span></div></div></div>`;
  }
  function anArt() {
    const tabs = `<div class="code-tabs" role="tablist">${[['py', 'Python'], ['dax', 'DAX'], ['m', 'Power Query'], ['model', 'Data model'], ['bi', 'Report']].map(([k, l]) => `<button type="button" role="tab" data-code="${k}" class="${S.an.tab === k ? 'on' : ''}" aria-selected="${S.an.tab === k}">${l}</button>`).join('')}</div>`;
    let body;
    if (S.an.tab === 'py') body = `<div class="run-row"><button type="button" class="tg${S.an.validate ? ' on' : ''}" data-tg="validate" aria-pressed="${S.an.validate}"><i></i>validate="m:1"</button><button type="button" class="tg${S.an.dup ? ' on' : ''}" data-tg="dup" aria-pressed="${S.an.dup}"><i></i>inject a duplicate factor</button><button type="button" class="run" data-run>▶ Run</button></div><pre class="code" id="code-view">${CODE.py()}</pre><div class="code-out${S.an.ran && S.an.dup && S.an.validate ? ' err' : ''}" id="code-out">${pyOut()}</div>`;
    else if (CODE[S.an.tab]) body = `<pre class="code" id="code-view">${CODE[S.an.tab]()}</pre><div class="code-out" id="code-out">${OUT[S.an.tab]}</div>`;
    else if (S.an.tab === 'model') body = `<div class="model">${modelSVG()}</div><div class="model-read">${S.an.hot ? `<b>${DIMS[S.an.hot][0]}</b> · ${DIMS[S.an.hot][1]}` : 'Star schema behind the Power BI heatmaps: one fact table, four dimensions, single-direction relationships. Click a dimension to see what it does.'}</div>`;
    else body = biHTML();
    const title = { py: 'ef_pipeline.py · inventory build', dax: 'ClimateRisk.pbix · measures', m: 'SupplierReturns.pq · query', model: 'ClimateRisk.pbix · model view', bi: 'ClimateRisk.pbix · report view' }[S.an.tab];
    return `<div class="artifact">${bar(title)}${tabs}${body}<div class="note">Illustrative snippets in the style of the emission factor pipeline and heatmap model</div></div>`;
  }

  /* ------------------------------- Render ------------------------------- */
  const ART = { excel: xlArt, ppt: pptArt, word: docArt, audit: qaArt, analytics: anArt };
  function renderArt() { const a = $('.craft-art', root); if (a) a.innerHTML = ART[S.tab](); }
  function render() {
    const t = window.CRAFT.find((x) => x.key === S.tab);
    root.innerHTML = `<div class="craft-tabs" role="tablist" aria-label="Tools">${window.CRAFT.map((x) => `<button class="craft-tab" role="tab" type="button" data-tab="${x.key}" aria-selected="${x.key === S.tab}">${ICONS[x.key]}${esc(x.label)}</button>`).join('')}</div>
      <div class="craft-panel" role="tabpanel">
        <div class="craft-copy"><span class="kicker">${esc(t.kicker)}</span><h3>${esc(t.label)}</h3><p class="lead">${esc(t.lead)}</p>
          <h4>Techniques in daily use</h4><div class="chips">${t.techniques.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
          <h4>Where it shows up in my work</h4><ul>${t.evidence.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="craft-art">${ART[S.tab]()}</div>
      </div>`;
  }
  const refreshExcel = () => {
    const c = xlCounts(S.xl.th);
    const b = $('#xl-body', root); if (b) b.innerHTML = xlRows();
    const f = $('#xl-formula', root); if (f) f.innerHTML = xlFormula();
    const v = $('#xl-thv', root); if (v) v.textContent = S.xl.th.toFixed(1);
    const th = $('#xl-th', root); if (th) th.value = S.xl.th;
    const n = $('#xl-cnt', root); if (n) n.textContent = `${c.m} material · ${c.w} monitor · ${c.x} not material`;
    const g = $('#xl-goalres', root); if (g) g.textContent = S.xl.goalRes;
    if (S.xl.sheet === 'heatmap' || S.xl.sheet === 'log') renderArt();
  };

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]'); if (tab) { S.tab = tab.dataset.tab; render(); return; }
    // Excel
    const sh = e.target.closest('[data-sheet]'); if (sh) { S.xl.sheet = sh.dataset.sheet; renderArt(); return; }
    const wcell = e.target.closest('#xl-body td.w'); if (wcell) { const k = +wcell.dataset.k, old = ROWS[k][3]; ROWS[k][3] = +(old >= 1 ? 0.7 : old + 0.1).toFixed(1); xlLog('Worksheet_Change', `Weight ${ROWS[k][0]} ${old.toFixed(1)} → ${ROWS[k][3].toFixed(1)} · D${k + 5}`); refreshExcel(); return; }
    const tr = e.target.closest('#xl-body tr'); if (tr) { const rn = +tr.dataset.rn; S.xl.sel = S.xl.sel === rn ? null : rn; refreshExcel(); return; }
    if (e.target.closest('[data-goal]')) { const target = +($('#xl-goal', root)?.value ?? S.xl.goal); S.xl.goal = target; let best = null; for (let th = 4.5; th >= 2; th = +(th - 0.1).toFixed(1)) { const c = xlCounts(th).m; if (c === target) { best = th; break; } } 
      if (best === null) { let d = Infinity; for (let th = 2; th <= 4.5; th = +(th + 0.1).toFixed(1)) { const dd = Math.abs(xlCounts(th).m - target); if (dd < d) { d = dd; best = th; } } S.xl.goalRes = `No exact solution · closest is ${best.toFixed(1)} (${xlCounts(best).m} material)`; } else S.xl.goalRes = `Solved · Threshold = ${best.toFixed(1)}`;
      const old = S.xl.th; S.xl.th = best; lastLogged = best; xlLog('GoalSeek', `Target ${target} material · Threshold ${old.toFixed(1)} → ${best.toFixed(1)} · ${xlCounts(best).m} material`); refreshExcel(); return; }
    // PowerPoint
    const rag = e.target.closest('[data-rag]'); if (rag) { const i = +rag.dataset.rag; S.ppt.rag[i] = { g: 'a', a: 'r', r: 'g' }[S.ppt.rag[i]]; renderArt(); return; }
    const pv = e.target.closest('[data-pv]'); if (pv) { S.ppt.view = pv.dataset.pv; renderArt(); return; }
    const sl = e.target.closest('[data-slide]'); if (sl) { S.ppt.i = +sl.dataset.slide; S.ppt.view = 'slide'; renderArt(); return; }
    const dir = e.target.closest('[data-dir]'); if (dir) { S.ppt.i = Math.max(0, Math.min(SLIDES.length - 1, S.ppt.i + +dir.dataset.dir)); renderArt(); return; }
    if (e.target.closest('[data-notes]')) { S.ppt.notes = !S.ppt.notes; renderArt(); return; }
    // Word
    const mv = e.target.closest('[data-move]'); if (mv) { const id = S.doc.sec.split('.')[0], i = S.doc.order.indexOf(id), j = i + +mv.dataset.move; if (j >= 0 && j < S.doc.order.length) { [S.doc.order[i], S.doc.order[j]] = [S.doc.order[j], S.doc.order[i]]; renderArt(); toast(`Section moved · headings renumbered · 22 cross-reference fields updated`); } return; }
    const sec = e.target.closest('[data-sec]'); if (sec) { S.doc.sec = sec.dataset.sec; renderArt(); return; }
    if (e.target.closest('[data-markup]')) { S.doc.markup = !S.doc.markup; renderArt(); return; }
    if (e.target.closest('[data-comments]')) { S.doc.comments = !S.doc.comments; renderArt(); return; }
    if (e.target.closest('[data-fields]')) { toast('22 fields updated: table of contents, captions and cross-references'); return; }
    // Audit
    const qt = e.target.closest('[data-qtab]'); if (qt) { S.qa.tab = qt.dataset.qtab; renderArt(); return; }
    const att = e.target.closest('[data-att]'); if (att) { S.qa.attached.add(+att.dataset.att); renderArt(); toast('Evidence attached to the variance line'); return; }
    const cf = e.target.closest('[data-conf]'); if (cf) { S.qa.conf = +cf.dataset.conf; renderArt(); return; }
    const st = e.target.closest('[data-step]'); if (st && !e.target.closest('.signoff')) { S.qa.open = S.qa.open === +st.dataset.step ? null : +st.dataset.step; renderArt(); return; }
    // Analytics
    const cd = e.target.closest('[data-code]'); if (cd) { S.an.tab = cd.dataset.code; renderArt(); return; }
    const tg = e.target.closest('[data-tg]'); if (tg) { S.an[tg.dataset.tg] = !S.an[tg.dataset.tg]; S.an.ran = false; renderArt(); return; }
    if (e.target.closest('[data-run]')) { S.an.ran = true; renderArt(); return; }
    const sc = e.target.closest('[data-scen]'); if (sc) { S.an.scen = sc.dataset.scen; renderArt(); return; }
    const hz = e.target.closest('[data-hz]'); if (hz) { S.an.hz = +hz.dataset.hz; renderArt(); return; }
    const dm = e.target.closest('[data-dim]'); if (dm) { S.an.hot = S.an.hot === dm.dataset.dim ? null : dm.dataset.dim; renderArt(); return; }
  });
  root.addEventListener('change', (e) => {
    if (e.target.dataset.sign) { S.qa[e.target.dataset.sign] = e.target.checked; if (S.qa.prep && S.qa.rev) S.qa.signed = now(); renderArt(); return; }
    if (e.target.id !== 'xl-th' || S.xl.th === lastLogged) return;
    const c = xlCounts(S.xl.th);
    xlLog('RunScoring()', `Threshold ${lastLogged.toFixed(1)} → ${S.xl.th.toFixed(1)} · ${c.m} material · ${c.w} monitor · ${c.x} not material`);
    lastLogged = S.xl.th;
    if (S.xl.sheet === 'log') renderArt();
  });
  let lastLogged = S.xl.th;
  root.addEventListener('input', (e) => {
    if (e.target.id === 'xl-th') { S.xl.th = +e.target.value; S.xl.goalRes = ''; const c = xlCounts(S.xl.th); const b = $('#xl-body', root); if (b) b.innerHTML = xlRows(); const f = $('#xl-formula', root); if (f) f.innerHTML = xlFormula(); const v = $('#xl-thv', root); if (v) v.textContent = S.xl.th.toFixed(1); const n = $('#xl-cnt', root); if (n) n.textContent = `${c.m} material · ${c.w} monitor · ${c.x} not material`; const g = $('#xl-goalres', root); if (g) g.textContent = '';
      if (S.xl.sheet === 'heatmap') { const tmp = document.createElement('div'); tmp.innerHTML = xlSheet(); $('.xl-hm', root)?.replaceWith(tmp.querySelector('.xl-hm')); $('.xl-hm-cap', root)?.replaceWith(tmp.querySelector('.xl-hm-cap')); } }
    if (e.target.id === 'qa-th') { S.qa.th = +e.target.value; const tmp = document.createElement('div'); tmp.innerHTML = qaArt(); const nb = tmp.querySelector('#qa-body'), ob = $('#qa-body', root); if (nb && ob) ob.innerHTML = nb.innerHTML; const v = $('#qa-thv', root); if (v) v.textContent = `±${S.qa.th}%`; const c = $('#qa-cnt', root); if (c) c.textContent = tmp.querySelector('#qa-cnt').textContent; }
    if (e.target.id === 'qa-err') { S.qa.err = +e.target.value; renderArt(); }
    if (e.target.id === 'bi-pass') { S.an.pass = +e.target.value; renderArt(); }
  });
  root.addEventListener('keydown', (e) => {
    if (S.tab === 'ppt' && e.target.closest('.slide')) {
      if (e.key === 'ArrowRight' && S.ppt.i < SLIDES.length - 1) { S.ppt.i++; renderArt(); $('.slide', root)?.focus(); }
      if (e.key === 'ArrowLeft' && S.ppt.i > 0) { S.ppt.i--; renderArt(); $('.slide', root)?.focus(); }
    }
    if (e.target.closest('[data-dim]') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.target.closest('[data-dim]').click(); }
  });
  document.addEventListener('mg:craft', (e) => { if (ART[e.detail]) { S.tab = e.detail; render(); } });
  render();
})();
