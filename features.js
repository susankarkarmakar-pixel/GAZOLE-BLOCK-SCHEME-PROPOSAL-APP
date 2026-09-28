/* features.js - GAZOLE SCHEME PROPOSAL APP v5.0 */
var FX_CSS = [
  ":root{--fx:var(--primary,#0B2C4D)}",
  "",
  "/* ============ v5.0 additions (Overview, Fund Planner, Access Control) ============ */",
  ".ix-kpis{gap:10px;margin-bottom:14px}",
  ".ix-kpis .statcard{margin-bottom:0}",
  ".ix-row{display:grid;grid-template-columns:104px 1fr auto;gap:8px;align-items:center;padding:6px 4px;border-radius:8px;cursor:pointer}",
  ".ix-row.sel{background:var(--bluebg)}",
  ".ix-lab{font-size:12.5px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".ix-track{height:10px;border-radius:999px;background:#E5EAF1;overflow:hidden;display:block}",
  ".ix-fill{height:10px;border-radius:999px;background:var(--fx);display:block}",
  ".ix-val{font-size:12px;font-weight:700;color:var(--fx);text-align:right;white-space:nowrap;min-width:36px}",
  ".ix-row.zero .ix-lab,.ix-row.zero .ix-val{color:var(--muted2);font-weight:500}",
  "#ixDonut svg{width:180px;height:180px}",
  ".ix-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}",
  ".ix-tbl{border-collapse:collapse;width:100%;font-size:12px;min-width:420px}",
  ".ix-tbl th,.ix-tbl td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:center;white-space:nowrap}",
  ".ix-tbl th{color:var(--muted);font-weight:700;background:#F7F9FC}",
  ".ix-tbl td:first-child,.ix-tbl th:first-child{text-align:left;position:sticky;left:0;background:#fff;font-weight:700;color:var(--ink)}",
  ".ix-tbl th:first-child{background:#F7F9FC}",
  ".ix-tbl tr.tot td{font-weight:800;color:var(--fx);background:#F7F9FC}",
  ".ix-badge{width:34px;height:34px;border-radius:50%;background:var(--fx);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none}",
  ".ix-days{display:flex;align-items:flex-end;gap:4px;height:120px}",
  ".ix-day{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px}",
  ".ix-dbar{width:100%;max-width:18px;background:var(--fx);border-radius:4px 4px 0 0;display:block;min-height:2px}",
  ".ix-dn{font-size:10px;color:var(--muted);font-weight:700;min-height:12px}",
  ".ix-dl{font-size:10px;color:var(--muted2)}",
  ".denied{text-align:center;color:var(--muted);padding:26px 14px}",
  "",
  "/* fund planner */",
  ".fp-card{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--line2);border-radius:var(--radius);padding:12px 14px;margin-bottom:12px}",
  ".fp-card.dirty{border-left-color:var(--orange);background:#FFFBF4}",
  ".fp-title{font-size:14.5px;font-weight:700;color:var(--ink);line-height:1.35}",
  ".fp-meta{display:flex;flex-wrap:wrap;gap:4px 12px;color:var(--muted);font-size:12px;margin:6px 0 10px;align-items:center}",
  ".fp-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 10px}",
  ".fp-grid .field{margin-bottom:0}",
  "@media(max-width:360px){.fp-grid{grid-template-columns:1fr}}",
  ".fp-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px;flex-wrap:wrap}",
  ".fp-savebar{position:fixed;left:0;right:0;bottom:64px;z-index:65;background:#fff;border-top:1px solid var(--line2);box-shadow:0 -4px 14px rgba(16,40,70,.14);display:flex;align-items:center;gap:8px;padding:8px 12px}",
  ".fp-savebar span{flex:1;font-size:12.5px;font-weight:700;color:var(--fx)}",
  ".fp-savebar .btn{margin:0;padding:9px 14px}",
  ".warnline{background:var(--amberbg);color:var(--amber);border-radius:10px;padding:8px 12px;font-size:12.5px;font-weight:600;margin-bottom:10px}",
  "",
  "/* access control */",
  ".pm-group{font-size:11.5px;font-weight:800;color:var(--muted);margin:14px 0 2px}",
  ".pm-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--line)}",
  ".pm-t{flex:1;display:flex;flex-direction:column;gap:1px}",
  ".pm-t b{font-size:13.5px;color:var(--ink)}",
  ".pm-t small{font-size:11.5px;color:var(--muted2)}",
  ".pm-tag{display:inline-block;background:var(--amberbg);color:var(--amber);font-size:10.5px;font-weight:700;border-radius:999px;padding:1px 8px;margin-left:6px}",
  ".pm-sw{-webkit-appearance:none;appearance:none;width:46px;height:26px;border-radius:999px;background:#CBD5E1;position:relative;cursor:pointer;flex:none;border:none;outline:none;transition:background .15s}",
  ".pm-sw::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.3)}",
  ".pm-sw:checked{background:var(--green)}",
  ".pm-sw:checked::after{transform:translateX(20px)}",
  ".pm-sw:focus-visible{box-shadow:0 0 0 3px rgba(18,57,91,.25)}",
  ""
].join("\n");
(function(){ var s = document.createElement("style"); s.id = "features-css"; s.appendChild(document.createTextNode(FX_CSS)); document.head.appendChild(s); })();

/* ============ features.js v5.0 (GitHub Pages / APK version) - load AFTER app.js and offline.js ============ */
/* Adds: Project Overview (charts) - Fund & Priority Planner - Access Control (permissions).            */
/* app.js, offline.js and styles.css need no edit. Pure ASCII on purpose.                                */
(function(){

var CUR = 'home';
var PERMS = null;

/* ---------- small helpers ---------- */
function q1(sel, root){ return (root || document).querySelector(sel); }
function xNum(n){ return (Number(n) || 0).toLocaleString('en-IN'); }
function xMoney(n){
  n = Number(n) || 0;
  if (n >= 10000000) return '\u20B9' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '\u20B9' + (n / 100000).toFixed(2) + ' Lakh';
  return '\u20B9' + n.toLocaleString('en-IN');
}
function typeCode(label){
  for (var i = 0; i < CONFIG.schemeTypes.length; i++){
    if (CONFIG.schemeTypes[i].label === label || CONFIG.schemeTypes[i].code === label) return CONFIG.schemeTypes[i].code;
  }
  return '';
}
function hasVal(v){ return v !== '' && v !== null && v !== undefined; }

/* ---------- permissions (server is the real guard; this only hides buttons) ---------- */
function can(k){
  if (!USER) return false;
  if (USER.role === 'Admin') return true;
  if (!PERMS) return true;
  return PERMS[k] === true;
}
function isOwn(r){ return !!USER && String(r.enteredByMobile) === String(USER.mobile); }
function canEditRec(r){ return can('editAny') || (can('editOwn') && isOwn(r)); }
function canDelRec(r){ return can('deleteRecord') && (can('editAny') || isOwn(r)); }

function applyChrome(){
  if (!USER || !el('extraTools')) return;
  var admin = USER.role === 'Admin';
  show('btnTopNew', can('addScheme'));
  show('qaNewEntry', can('addScheme'));
  show('fltCsv', can('exportCsv'));
  show('xtInsights', can('viewDashboard'));
  show('xtPlan', can('setFund') || can('viewFund'));
  show('xtSurveyors', !admin && can('manageSurveyors'));
  show('xtPerms', admin);
  show('btnOpenPerms', admin);
  show('euPerms', admin);
  el('xtPlanSub').innerText = can('setFund') ? 'Set priority, fund type & amount for every scheme' : 'View fund & priority list';
  var anyTool = can('viewDashboard') || can('setFund') || can('viewFund') || admin || (!admin && can('manageSurveyors'));
  show('extraTools', anyTool);
  var wantMla = admin;
  var roleSel = el('auRole');
  var hasMla = roleSel.options.length > 1;
  if (wantMla !== hasMla) roleSel.innerHTML = wantMla ? '<option>Surveyor</option><option>MLA</option>' : '<option>Surveyor</option>';
}

/* ============ INSIGHTS (Project Overview) ============ */
var INS = { gp: '', type: '', status: '', metric: 'count' };
var METRICS = {
  count: { fn: function(r){ return 1; }, fmt: function(v){ return xNum(v); } },
  benef: { fn: function(r){ return Number(r.totalBenef) || 0; }, fmt: function(v){ return xNum(v); } },
  cost:  { fn: function(r){ return Number(r.estimatedCost) || 0; }, fmt: xMoney }
};
var STATUS_COLORS = { 'Pending Review': '#E6A817', 'Active': '#E25822', 'In Progress': '#1D4E89', 'Completed': '#1B7F4D' };

function insRecs(except){
  return RECORDS.filter(function(r){
    if (except !== 'gp' && INS.gp && r.gp !== INS.gp) return false;
    if (except !== 'type' && INS.type && r.schemeType !== INS.type) return false;
    if (except !== 'status' && INS.status && r.status !== INS.status) return false;
    return true;
  });
}
function groupSum(recs, keyFn, valFn){
  var m = {};
  recs.forEach(function(r){ var k = keyFn(r); m[k] = (m[k] || 0) + valFn(r); });
  return m;
}
function sortedRows(m, fmtLabel){
  return Object.keys(m).map(function(k){ return { k: k, label: fmtLabel ? fmtLabel(k) : k, v: m[k] }; })
    .sort(function(a, b){ return b.v - a.v || String(a.k).localeCompare(String(b.k)); });
}
function barsHtml(rows, chart, fmt, sel){
  if (!rows.length) return '<p class="muted">No data.</p>';
  var max = 0;
  rows.forEach(function(r){ if (r.v > max) max = r.v; });
  if (!max) max = 1;
  return rows.map(function(r){
    var txt = (r.text !== undefined && r.text !== null) ? r.text : fmt(r.v);
    return '<div class="ix-row' + (sel && sel === r.k ? ' sel' : '') + (r.v ? '' : ' zero') + '"' +
      (chart ? ' data-chart="' + chart + '" data-k="' + esc(r.k) + '"' : '') + '>' +
      '<span class="ix-lab" title="' + esc(r.k) + '">' + esc(r.label || r.k) + '</span>' +
      '<span class="ix-track"><span class="ix-fill" style="width:' + Math.round(r.v / max * 100) + '%"></span></span>' +
      '<span class="ix-val">' + esc(txt) + '</span></div>';
  }).join('');
}
function kpi(title, value, accent){
  return '<div class="statcard ' + (accent || 'accent-navy') + '"><small>' + esc(title) + '</small><b>' + esc(value) + '</b></div>';
}
function allGps(recs){
  var list = CONFIG.gpList.slice();
  recs.forEach(function(r){ if (r.gp && list.indexOf(r.gp) === -1) list.push(r.gp); });
  return list;
}
function syncInsSelects(){
  el('ixGp').value = INS.gp;
  el('ixType').value = INS.type;
  el('ixStatus').value = INS.status;
  var chips = el('ixMetric').querySelectorAll('[data-m]');
  for (var i = 0; i < chips.length; i++) chips[i].classList.toggle('active', chips[i].getAttribute('data-m') === INS.metric);
}

function renderInsights(){
  var ok = can('viewDashboard');
  show('ixBody', ok);
  show('ixDenied', !ok);
  if (!ok) return;
  syncInsSelects();
  var M = METRICS[INS.metric];
  var all = insRecs('');

  /* KPIs */
  var benef = 0, cost = 0, fund = 0, pend = 0, prio = 0, nofund = 0, gpSet = {};
  all.forEach(function(r){
    benef += Number(r.totalBenef) || 0;
    cost += Number(r.estimatedCost) || 0;
    fund += Number(r.fundAmount) || 0;
    if (r.status === 'Pending Review') pend++;
    if (hasVal(r.priority)) prio++;
    if (!r.fundType) nofund++;
    gpSet[r.gp] = 1;
  });
  var fundOn = can('viewFund');
  el('ixKpis').innerHTML =
    kpi('Total Schemes', xNum(all.length)) +
    kpi('GPs Covered', Object.keys(gpSet).length + ' / ' + CONFIG.gpList.length) +
    kpi('Beneficiaries', xNum(benef)) +
    kpi('Estimated Cost', xMoney(cost)) +
    (fundOn ? kpi('Fund Assigned', xMoney(fund)) : '') +
    (fundOn ? kpi('Priority Set', prio + ' / ' + all.length, 'accent-orange') : '') +
    (fundOn ? kpi('Fund Not Set', xNum(nofund), 'accent-orange') : '') +
    kpi('Pending Review', xNum(pend), 'accent-red');

  /* GP-wise */
  var gm = groupSum(insRecs('gp'), function(r){ return r.gp; }, M.fn);
  var gRows = allGps(RECORDS).map(function(g){ return { k: g, label: g, v: gm[g] || 0 }; });
  gRows.sort(function(a, b){ return b.v - a.v || a.k.localeCompare(b.k); });
  el('ixGpBars').innerHTML = barsHtml(gRows, 'gp', M.fmt, INS.gp);

  /* type-wise */
  var tm = groupSum(insRecs('type'), function(r){ return r.schemeType || '-'; }, M.fn);
  el('ixTypeBars').innerHTML = barsHtml(sortedRows(tm), 'type', M.fmt, INS.type);

  /* status donut */
  var stRecs = insRecs('status'), sc = {};
  CONFIG.statuses.forEach(function(s){ sc[s] = 0; });
  stRecs.forEach(function(r){ if (sc.hasOwnProperty(r.status)) sc[r.status]++; });
  var segs = CONFIG.statuses.map(function(s){ return { v: sc[s], c: STATUS_COLORS[s] || '#94A3B8', l: s }; })
    .filter(function(s){ return s.v > 0; });
  el('ixDonut').innerHTML = donutSvg(segs, stRecs.length, String(stRecs.length));
  el('ixLegend').innerHTML = '<div class="lg">' + CONFIG.statuses.map(function(s){
    return '<span class="lg-item" data-chart="status" data-k="' + esc(s) + '" style="cursor:pointer' + (INS.status === s ? ';font-weight:800;color:#B33C14' : '') + '">' +
      '<span class="lg-dot" style="background:' + (STATUS_COLORS[s] || '#94A3B8') + '"></span>' + esc(s) + ' (' + sc[s] + ')</span>';
  }).join('') + '</div>';

  /* nature of work */
  var nm = groupSum(all, function(r){ return r.natureOfWork || 'Not specified'; }, M.fn);
  el('ixNature').innerHTML = barsHtml(sortedRows(nm), '', M.fmt);

  /* beneficiaries by category */
  var bs = { SC: 0, ST: 0, General: 0, Minority: 0 };
  all.forEach(function(r){
    bs.SC += Number(r.benefSC) || 0; bs.ST += Number(r.benefST) || 0;
    bs.General += Number(r.benefGeneral) || 0; bs.Minority += Number(r.benefMinority) || 0;
  });
  el('ixBenef').innerHTML = barsHtml(Object.keys(bs).map(function(k){ return { k: k, label: k, v: bs[k] }; }), '', xNum);

  /* fund-wise */
  show('ixFundCard', fundOn);
  if (fundOn){
    var fm = {};
    all.forEach(function(r){
      var k = r.fundType || 'Not assigned';
      if (!fm[k]) fm[k] = { n: 0, a: 0 };
      fm[k].n++; fm[k].a += Number(r.fundAmount) || 0;
    });
    var fRows = Object.keys(fm).map(function(k){
      return { k: k, label: k, v: fm[k].n, text: fm[k].n + (fm[k].a ? ' \u00B7 ' + xMoney(fm[k].a) : '') };
    }).sort(function(a, b){ return b.v - a.v; });
    el('ixFund').innerHTML = barsHtml(fRows, '', xNum);
  }

  /* GP x type matrix */
  var tcount = groupSum(all, function(r){ return r.schemeType || '-'; }, function(){ return 1; });
  var tcols = Object.keys(tcount).sort(function(a, b){ return tcount[b] - tcount[a]; }).slice(0, 8);
  var gps = allGps(all), cell = {}, maxc = 1, rowTot = {};
  all.forEach(function(r){
    var k = r.gp + '|' + (r.schemeType || '-');
    cell[k] = (cell[k] || 0) + 1;
    rowTot[r.gp] = (rowTot[r.gp] || 0) + 1;
    if (cell[k] > maxc && tcols.indexOf(r.schemeType || '-') > -1) maxc = cell[k];
  });
  var mh = '<table class="ix-tbl"><thead><tr><th>GP</th>' + tcols.map(function(t){ return '<th>' + esc(t) + '</th>'; }).join('') + '<th>Other</th><th>Total</th></tr></thead><tbody>';
  gps.forEach(function(g){
    var shown = 0;
    mh += '<tr><td>' + esc(g) + '</td>';
    tcols.forEach(function(t){
      var c = cell[g + '|' + t] || 0; shown += c;
      mh += c ? '<td style="background:rgba(226,88,34,' + (0.08 + 0.55 * c / maxc).toFixed(2) + ');color:' + (c / maxc > 0.55 ? '#fff' : '#16283C') + ';font-weight:700">' + c + '</td>' : '<td style="color:#B8C2D0">-</td>';
    });
    var tot = rowTot[g] || 0;
    mh += '<td>' + (tot - shown || '-') + '</td><td><b>' + (tot || '-') + '</b></td></tr>';
  });
  el('ixMatrix').innerHTML = mh + '</tbody></table>';

  /* GP summary table */
  var agg = {};
  gps.forEach(function(g){ agg[g] = { n: 0, b: 0, c: 0, p: 0, f: 0 }; });
  all.forEach(function(r){
    var a = agg[r.gp]; if (!a) return;
    a.n++; a.b += Number(r.totalBenef) || 0; a.c += Number(r.estimatedCost) || 0;
    if (r.status === 'Pending Review') a.p++;
    if (hasVal(r.priority)) a.f++;
  });
  var th = '<table class="ix-tbl"><thead><tr><th>GP</th><th>Schemes</th><th>Beneficiaries</th><th>Est. Cost</th><th>Pending</th>' + (fundOn ? '<th>Priority set</th>' : '') + '</tr></thead><tbody>';
  var T = { n: 0, b: 0, c: 0, p: 0, f: 0 };
  gps.forEach(function(g){
    var a = agg[g];
    T.n += a.n; T.b += a.b; T.c += a.c; T.p += a.p; T.f += a.f;
    th += '<tr><td>' + esc(g) + '</td><td>' + a.n + '</td><td>' + xNum(a.b) + '</td><td>' + xMoney(a.c) + '</td><td>' + a.p + '</td>' + (fundOn ? '<td>' + a.f + '</td>' : '') + '</tr>';
  });
  th += '<tr class="tot"><td>Total</td><td>' + T.n + '</td><td>' + xNum(T.b) + '</td><td>' + xMoney(T.c) + '</td><td>' + T.p + '</td>' + (fundOn ? '<td>' + T.f + '</td>' : '') + '</tr></tbody></table>';
  el('ixTable').innerHTML = th;

  /* top priority list */
  show('ixTopCard', fundOn);
  if (fundOn){
    var pr = all.filter(function(r){ return hasVal(r.priority); })
      .sort(function(a, b){ return Number(a.priority) - Number(b.priority); }).slice(0, 10);
    el('ixTop').innerHTML = pr.length ? pr.map(function(r){
      return '<div class="srow" data-open="' + esc(r.id) + '" style="cursor:pointer"><span class="ix-badge">' + esc(r.priority) + '</span>' +
        '<span class="sname"><b>' + esc(r.schemeName || r.id) + '</b><small>' + esc(r.gp) + ' GP \u00B7 ' + esc(r.fundType || 'Fund not set') +
        (hasVal(r.fundAmount) ? ' \u00B7 ' + xMoney(r.fundAmount) : '') + '</small></span></div>';
    }).join('') : '<p class="muted">No priority set yet.</p>';
  }

  /* last 14 days */
  var days = [], i;
  for (i = 13; i >= 0; i--){ var d = new Date(); d.setDate(d.getDate() - i); days.push({ key: d.toDateString(), lab: d.getDate(), n: 0 }); }
  all.forEach(function(r){
    var k = dParse(r.createdAt).toDateString();
    for (var j = 0; j < days.length; j++) if (days[j].key === k) days[j].n++;
  });
  var dmax = 1; days.forEach(function(d){ if (d.n > dmax) dmax = d.n; });
  el('ixDays').innerHTML = '<div class="ix-days">' + days.map(function(d){
    return '<div class="ix-day"><span class="ix-dn">' + (d.n || '') + '</span><span class="ix-dbar" style="height:' + Math.round(d.n / dmax * 80) + 'px;' + (d.n ? '' : 'opacity:.25') + '"></span><span class="ix-dl">' + d.lab + '</span></div>';
  }).join('') + '</div>';
}

/* ============ FUND & PRIORITY PLANNER ============ */
var PLAN = { draft: {}, q: '', gp: '', show: 'all', sort: 'prio', visible: 30, order: null, swapId: null };

function fundList(){ return (CONFIG.fundTypes || []).filter(function(f){ return f !== 'Other'; }); }
function origOf(r){
  return { p: hasVal(r.priority) ? String(r.priority) : '', t: r.fundType || '', a: hasVal(r.fundAmount) ? String(r.fundAmount) : '' };
}
function workOf(r){ return PLAN.draft[r.id] || origOf(r); }
function setDraft(r, patch){
  var cur = PLAN.draft[r.id] || origOf(r);
  var w = { p: cur.p, t: cur.t, a: cur.a, o: !!cur.o };
  for (var k in patch) if (patch.hasOwnProperty(k)) w[k] = patch[k];
  PLAN.draft[r.id] = w;
}
function isOtherFund(w){ return !!w.o || (!!w.t && fundList().indexOf(w.t) === -1); }
function dirtyList(){
  var out = [];
  RECORDS.forEach(function(r){
    var w = PLAN.draft[r.id]; if (!w) return;
    var o = origOf(r);
    if (w.p !== o.p || w.t !== o.t || w.a !== o.a) out.push(r);
  });
  return out;
}
function takenMap(){
  var m = {};
  RECORDS.forEach(function(r){ var p = workOf(r).p; if (p !== '') m[p] = r.id; });
  return m;
}
function amtHint(a){ return a !== '' && !isNaN(Number(a)) ? xMoney(Number(a)) : ''; }
function prioOptions(r, w, taken){
  var N = Math.max(RECORDS.length, 1), cur = String(w.p), seen = false;
  var h = '<option value="">- none -</option>';
  for (var i = 1; i <= N; i++){
    var s = String(i);
    if (!taken[s] || taken[s] === r.id || s === cur){
      h += '<option value="' + s + '"' + (s === cur ? ' selected' : '') + '>' + s + '</option>';
      if (s === cur) seen = true;
    }
  }
  if (cur && !seen) h += '<option value="' + esc(cur) + '" selected>' + esc(cur) + '</option>';
  return h;
}
function planRow(r, taken){
  var w = workOf(r), o = origOf(r), fl = fundList();
  var other = isOtherFund(w), tsel = other ? '__other__' : w.t;
  var dirty = (w.p !== o.p || w.t !== o.t || w.a !== o.a);
  var ro = !can('setFund'), dis = ro ? ' disabled' : '';
  var h = '<div class="fp-card' + (dirty ? ' dirty' : '') + '" data-id="' + esc(r.id) + '">';
  h += '<div class="fp-title">' + esc(r.schemeName || r.id) + '</div>';
  h += '<div class="fp-meta"><span>\uD83D\uDCCD ' + esc(r.gp) + '</span><span>' + esc(r.schemeType) + '</span>' +
    (hasVal(r.estimatedCost) ? '<span>Est. ' + xMoney(r.estimatedCost) + '</span>' : '') +
    '<span class="pill ' + statusPill(r.status) + '">' + esc(r.status || '-') + '</span></div>';
  h += '<div class="fp-grid">';
  h += '<div class="field"><label>Priority</label><select class="fp-p"' + dis + '>' + prioOptions(r, w, taken) + '</select></div>';
  h += '<div class="field"><label>Fund type</label><select class="fp-t"' + dis + '><option value="">- Select -</option>' +
    fl.map(function(f){ return '<option value="' + esc(f) + '"' + (tsel === f ? ' selected' : '') + '>' + esc(f) + '</option>'; }).join('') +
    '<option value="__other__"' + (tsel === '__other__' ? ' selected' : '') + '>Other (type name)</option></select></div>';
  h += '<div class="field fp-o' + (other ? '' : ' hidden') + '" style="grid-column:1/-1"><label>Fund name</label><input class="fp-oi" value="' + esc(other ? w.t : '') + '" placeholder="Type the fund name"' + dis + '></div>';
  h += '<div class="field" style="grid-column:1/-1"><label>Amount (\u20B9)</label><input class="fp-a" inputmode="decimal" value="' + esc(w.a) + '" placeholder="0"' + dis + '><small class="muted fp-hint">' + amtHint(w.a) + '</small></div>';
  h += '</div><div class="fp-actions">' +
    (ro ? '' : '<button class="lc-btn fp-swap">\u21C4 Swap priority</button><button class="lc-btn fp-clr danger">Clear</button>') +
    '<button class="lc-btn fp-view">Details \u2192</button></div></div>';
  return h;
}
function planFiltered(){
  var qs = PLAN.q.toLowerCase();
  var list = RECORDS.filter(function(r){
    if (PLAN.gp && r.gp !== PLAN.gp) return false;
    var w = workOf(r);
    if (PLAN.show === 'none' && w.p !== '') return false;
    if (PLAN.show === 'set' && w.p === '') return false;
    if (PLAN.show === 'nofund' && w.t) return false;
    if (qs && (r.id + ' ' + r.schemeName + ' ' + r.village + ' ' + r.gp).toLowerCase().indexOf(qs) === -1) return false;
    return true;
  });
  list.sort(function(a, b){
    if (PLAN.sort === 'prio'){
      var pa = workOf(a).p, pb = workOf(b).p;
      var na = pa === '' ? 999999 : Number(pa), nb = pb === '' ? 999999 : Number(pb);
      if (na !== nb) return na - nb;
    }
    return dParse(b.createdAt) - dParse(a.createdAt);
  });
  return list;
}
function renderPlanner(keep){
  var box = el('fpList'); if (!box) return;
  var ok = can('setFund') || can('viewFund');
  show('fpBody', ok); show('fpDenied', !ok);
  if (!ok) return;
  if (!keep || !PLAN.order) PLAN.order = planFiltered().map(function(r){ return r.id; });
  var byId = {};
  RECORDS.forEach(function(r){ byId[r.id] = r; });
  var ids = PLAN.order.filter(function(id){ return byId[id]; });
  var taken = takenMap(), shown = Math.min(PLAN.visible, ids.length), html = '';
  for (var i = 0; i < shown; i++) html += planRow(byId[ids[i]], taken);
  box.innerHTML = html || '<div class="card center muted">No schemes found.</div>';
  var setN = 0, sum = 0, cnt = {}, dups = [];
  RECORDS.forEach(function(r){
    var w = workOf(r);
    if (w.p !== ''){ setN++; cnt[w.p] = (cnt[w.p] || 0) + 1; }
    sum += Number(w.a) || 0;
  });
  Object.keys(cnt).forEach(function(k){ if (cnt[k] > 1) dups.push(k); });
  el('fpSummary').innerText = ids.length + ' scheme' + (ids.length === 1 ? '' : 's') + ' shown \u00B7 Priority set: ' + setN + ' / ' + RECORDS.length + ' \u00B7 Total amount: ' + xMoney(sum);
  el('fpWarn').innerText = dups.length ? '\u26A0 Same priority used twice: ' + dups.join(', ') + ' - please fix one of them.' : '';
  show('fpWarn', dups.length > 0);
  show('fpNote', !can('setFund'));
  var more = el('fpMore');
  more.classList.toggle('hidden', ids.length <= shown);
  more.innerText = 'Load more (' + (ids.length - shown) + ' remaining)';
  syncBar();
}
function refreshPrio(){
  var taken = takenMap(), cards = el('fpList').querySelectorAll('.fp-card');
  for (var i = 0; i < cards.length; i++){
    var r = findRec(cards[i].getAttribute('data-id')); if (!r) continue;
    cards[i].querySelector('.fp-p').innerHTML = prioOptions(r, workOf(r), taken);
  }
}
function cardState(card, r){
  var w = workOf(r), o = origOf(r);
  card.classList.toggle('dirty', w.p !== o.p || w.t !== o.t || w.a !== o.a);
  card.querySelector('.fp-o').classList.toggle('hidden', !isOtherFund(w));
  syncBar();
}
function syncBar(){
  if (!el('fpBar')) return;
  var n = dirtyList().length;
  var on = CUR === 'fundplan' && n > 0 && can('setFund');
  show('fpBar', on);
  if (on) el('fpBarTxt').innerText = n + ' unsaved change' + (n === 1 ? '' : 's');
}
function syncPlanFilters(){
  el('fpQ').value = PLAN.q; el('fpGp').value = PLAN.gp; el('fpShow').value = PLAN.show; el('fpSort').value = PLAN.sort;
}
function savePlan(){
  var list = dirtyList(); if (!list.length) return;
  var seen = {};
  RECORDS.forEach(function(r){ var p = workOf(r).p; if (p !== '') seen[p] = (seen[p] || 0) + 1; });
  var ch = [];
  for (var i = 0; i < list.length; i++){
    var w = PLAN.draft[list[i].id];
    if (w.p !== '' && seen[w.p] > 1){ toast('Priority ' + w.p + ' is used by more than one scheme - change one.'); return; }
    if (w.a !== '' && isNaN(Number(w.a))){ toast('Amount must be a number.'); return; }
    ch.push({ id: list[i].id, fundType: w.t, fundAmount: w.a, priority: w.p });
  }
  var btn = el('fpSave'); btn.disabled = true; btn.innerText = 'Saving...';
  call('savePlanBulk', TOKEN, ch).then(function(res){
    btn.disabled = false; btn.innerText = 'Save changes';
    if (res && res.success){ PLAN.draft = {}; toast('Saved \u2714 ' + res.updated + ' scheme(s)'); loadRecords(false); }
    else toast((res && res.error) || 'Save failed.');
  }).catch(function(e){ btn.disabled = false; btn.innerText = 'Save changes'; toast('Error: ' + (e.message || e)); });
}
function openSwap(id){
  var a = findRec(id); if (!a) return;
  var opts = RECORDS.filter(function(r){ return r.id !== id && workOf(r).p !== ''; })
    .sort(function(x, y){ return Number(workOf(x).p) - Number(workOf(y).p); });
  if (!opts.length){ toast('No other scheme has a priority yet.'); return; }
  PLAN.swapId = id;
  var wa = workOf(a);
  el('swInfo').innerText = (a.schemeName || a.id) + '  -  now: ' + (wa.p !== '' ? 'Priority ' + wa.p : 'no priority');
  el('swTarget').innerHTML = opts.map(function(r){
    var nm = String(r.schemeName || r.id); if (nm.length > 60) nm = nm.slice(0, 58) + '..';
    return '<option value="' + esc(r.id) + '">P' + esc(workOf(r).p) + ' - ' + esc(nm) + '</option>';
  }).join('');
  show('modalSwap', true);
}
function doSwap(){
  var a = findRec(PLAN.swapId), b = findRec(val('swTarget'));
  if (!a || !b) return;
  var pa = workOf(a).p, pb = workOf(b).p;
  setDraft(a, { p: pb }); setDraft(b, { p: pa });
  show('modalSwap', false);
  renderPlanner(true);
  toast('Swapped: now ' + (a.schemeName || a.id).slice(0, 28) + ' = P' + (pb || '-') + ' \u00B7 press Save changes');
}
function bindPlanner(){
  var box = el('fpList');
  box.addEventListener('change', function(e){
    var t = e.target, card = t.closest ? t.closest('.fp-card') : null; if (!card) return;
    var r = findRec(card.getAttribute('data-id')); if (!r) return;
    if (t.classList.contains('fp-p')){ setDraft(r, { p: t.value }); refreshPrio(); }
    else if (t.classList.contains('fp-t')){
      var w = workOf(r);
      if (t.value === '__other__'){
        var keep = (w.t && fundList().indexOf(w.t) === -1) ? w.t : '';
        setDraft(r, { o: true, t: keep });
      } else setDraft(r, { o: false, t: t.value });
    } else if (t.classList.contains('fp-a')){ t.value = workOf(r).a; }
    cardState(card, r);
  });
  box.addEventListener('input', function(e){
    var t = e.target, card = t.closest ? t.closest('.fp-card') : null; if (!card) return;
    var r = findRec(card.getAttribute('data-id')); if (!r) return;
    if (t.classList.contains('fp-a')){
      var c = t.value.replace(/[^0-9.]/g, '');
      setDraft(r, { a: c });
      card.querySelector('.fp-hint').innerText = amtHint(c);
    } else if (t.classList.contains('fp-oi')){
      setDraft(r, { o: true, t: t.value.trim() });
    } else return;
    cardState(card, r);
  });
  box.addEventListener('click', function(e){
    var t = e.target, card = t.closest ? t.closest('.fp-card') : null; if (!card) return;
    var id = card.getAttribute('data-id'), r = findRec(id); if (!r) return;
    if (t.classList.contains('fp-swap')) openSwap(id);
    else if (t.classList.contains('fp-clr')){ setDraft(r, { p: '', t: '', a: '', o: false }); renderPlanner(true); }
    else if (t.classList.contains('fp-view')) openDetail(id);
  });
  el('fpQ').oninput = function(){ PLAN.q = this.value; PLAN.visible = 30; renderPlanner(false); };
  el('fpGp').onchange = function(){ PLAN.gp = this.value; PLAN.visible = 30; renderPlanner(false); };
  el('fpShow').onchange = function(){ PLAN.show = this.value; PLAN.visible = 30; renderPlanner(false); };
  el('fpSort').onchange = function(){ PLAN.sort = this.value; PLAN.visible = 30; renderPlanner(false); };
  el('fpMore').onclick = function(){ PLAN.visible += 30; renderPlanner(true); };
  el('fpSave').onclick = savePlan;
  el('fpDiscard').onclick = function(){ PLAN.draft = {}; renderPlanner(true); };
  el('fpBack').onclick = function(){ renderHome(); showScreen('home'); };
  el('swGo').onclick = doSwap;
  el('swClose').onclick = function(){ show('modalSwap', false); };
}

/* ============ ACCESS CONTROL (BDO only) ============ */
var PM = { defs: [], roles: {}, overrides: {}, users: [], target: 'role:Surveyor' };
function loadPerms(){
  call('getPermissionCenter', TOKEN).then(function(res){
    if (res.error){ toast(res.error); return; }
    PM.defs = res.defs || []; PM.roles = res.roles || {}; PM.overrides = res.overrides || {}; PM.users = res.users || [];
    renderPerms();
  }).catch(function(e){ toast(e.message || e); });
}
function pmUser(mobile){
  for (var i = 0; i < PM.users.length; i++) if (PM.users[i].mobile === mobile) return PM.users[i];
  return null;
}
function pmCurrent(){
  var parts = PM.target.split(':'), kind = parts[0], key = parts.slice(1).join(':');
  if (kind === 'user'){
    var u = pmUser(key);
    if (u){
      var base = PM.roles[u.role] || {}, ov = PM.overrides[key] || {}, map = {};
      PM.defs.forEach(function(d){ map[d.key] = ov.hasOwnProperty(d.key) ? !!ov[d.key] : !!base[d.key]; });
      return { kind: 'user', key: key, user: u, map: map, custom: ov };
    }
    PM.target = 'role:Surveyor'; kind = 'role'; key = 'Surveyor';
  }
  return { kind: 'role', key: key, map: PM.roles[key] || {}, custom: {} };
}
function renderPerms(){
  var sel = el('pmTarget');
  var html = '<optgroup label="Role (applies to everyone in that role)"><option value="role:Surveyor">All Surveyors</option><option value="role:MLA">MLA login</option></optgroup>';
  if (PM.users.length){
    html += '<optgroup label="Single login (special settings)">' + PM.users.map(function(u){
      return '<option value="user:' + esc(u.mobile) + '">' + esc(u.name) + ' - ' + esc(u.role) + ' - ' + esc(u.mobile) + (u.status === 'Active' ? '' : ' (blocked)') + '</option>';
    }).join('') + '</optgroup>';
  }
  sel.innerHTML = html;
  var cur = pmCurrent();
  sel.value = PM.target;
  el('pmNote').innerText = cur.kind === 'role'
    ? 'These switches apply to every ' + (cur.key === 'MLA' ? 'MLA' : 'Surveyor') + ' login (except a login that has its own special setting). The BDO/Admin login always has full access.'
    : 'These switches apply ONLY to ' + cur.user.name + '. Orange "special" tag = different from the ' + cur.user.role + ' role setting.';
  var out = '', lastGroup = '';
  PM.defs.forEach(function(d){
    if (d.group !== lastGroup){ out += '<div class="pm-group">' + esc(d.group) + '</div>'; lastGroup = d.group; }
    out += '<label class="pm-row"><span class="pm-t"><b>' + esc(d.label) +
      (cur.custom.hasOwnProperty(d.key) ? '<span class="pm-tag">special</span>' : '') + '</b><small>' + esc(d.desc) + '</small></span>' +
      '<input type="checkbox" class="pm-sw" data-k="' + esc(d.key) + '"' + (cur.map[d.key] ? ' checked' : '') + '></label>';
  });
  el('pmList').innerHTML = out;
  show('pmClear', cur.kind === 'user' && Object.keys(cur.custom).length > 0);
}
function savePerms(){
  var cur = pmCurrent(), map = {};
  var boxes = el('pmList').querySelectorAll('.pm-sw');
  for (var i = 0; i < boxes.length; i++) map[boxes[i].getAttribute('data-k')] = boxes[i].checked;
  var target = cur.kind === 'role' ? { type: 'role', role: cur.key } : { type: 'user', mobile: cur.key };
  el('pmSave').disabled = true;
  call('savePermissions', TOKEN, target, map).then(function(res){
    el('pmSave').disabled = false;
    if (res.success){ toast('Permissions saved \u2714 (takes effect on their next screen refresh)'); loadPerms(); }
    else toast(res.error || 'Failed.');
  }).catch(function(e){ el('pmSave').disabled = false; toast(e.message || e); });
}
function clearCustom(){
  var cur = pmCurrent(); if (cur.kind !== 'user') return;
  var map = {}, base = PM.roles[cur.user.role] || {};
  PM.defs.forEach(function(d){ map[d.key] = !!base[d.key]; });
  call('savePermissions', TOKEN, { type: 'user', mobile: cur.key }, map).then(function(res){
    if (res.success){ toast('Now follows the role setting \u2714'); loadPerms(); } else toast(res.error || 'Failed.');
  });
}
function openPerms(target){
  if (target) PM.target = target;
  showScreen('perms');
}

/* ============ BUILD THE NEW SCREENS (no need to touch Index.html) ============ */
function toolBtn(id, ic, title, sub){
  return '<button class="toolrow hidden" id="' + id + '"><span class="ticon"><i class="ic" data-ic="' + ic + '"></i></span>' +
    '<span class="ttext"><b>' + title + '</b><small id="' + id + 'Sub">' + sub + '</small></span></button>';
}
function optList(items, first){
  return '<option value="">' + esc(first) + '</option>' + items.map(function(x){ return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; }).join('');
}
function buildUi(){
  if (el('screen-insights')) return;
  var home = el('screen-home'), qg = home.querySelector('.quickgrid');
  var tools = document.createElement('div');
  tools.id = 'extraTools';
  tools.className = 'hidden';
  tools.innerHTML = '<h3 class="sectitle">Planning &amp; Insights</h3>' +
    toolBtn('xtInsights', 'chart', 'Project Overview', 'GP-wise, type-wise graphs &amp; summary') +
    toolBtn('xtPlan', 'money', 'Fund &amp; Priority Planner', 'Set priority, fund type &amp; amount for every scheme') +
    toolBtn('xtSurveyors', 'users', 'Manage Surveyors', 'Add, block or reset PIN of Surveyors') +
    toolBtn('xtPerms', 'lock', 'Access Control', 'Allow / deny features for Surveyor &amp; MLA logins');
  qg.parentNode.insertBefore(tools, qg.nextSibling);

  var main = el('mainArea');
  var gpOpts = optList(CONFIG.gpList, 'All GPs');
  var typeOpts = optList(CONFIG.schemeTypes.map(function(t){ return t.label; }), 'All Scheme Types');
  var statOpts = optList(CONFIG.statuses, 'All Statuses');
  var back = '<button class="backlink" id="BACKID"><i class="ic" data-ic="back"></i> Home</button>';

  var s1 = document.createElement('section');
  s1.id = 'screen-insights'; s1.className = 'screen';
  s1.innerHTML = back.replace('BACKID', 'ixBack') +
    '<div id="ixDenied" class="card denied hidden">You do not have permission to open the Project Overview.<br>Ask the BDO to switch it on.</div>' +
    '<div id="ixBody">' +
    '<div class="card"><h3>Filters</h3><div class="grid2">' +
    '<div class="field"><label>GP</label><select id="ixGp">' + gpOpts + '</select></div>' +
    '<div class="field"><label>Scheme Type</label><select id="ixType">' + typeOpts + '</select></div>' +
    '<div class="field"><label>Status</label><select id="ixStatus">' + statOpts + '</select></div>' +
    '<div class="field"><label>Bars show</label><div class="scopes" id="ixMetric">' +
    '<button class="chip active" data-m="count">Schemes</button><button class="chip" data-m="benef">Beneficiaries</button><button class="chip" data-m="cost">Cost</button></div></div>' +
    '</div><div class="rowline"><button class="btn ghost" id="ixClear">Clear filters</button><button class="btn ghost" id="ixOpen">Open in Records \u2192</button></div>' +
    '<p class="muted">Tip: tap any bar to filter every chart on this page.</p></div>' +
    '<div class="grid2 stats ix-kpis" id="ixKpis"></div>' +
    '<div class="card"><h3>GP-wise</h3><div id="ixGpBars"></div></div>' +
    '<div class="card"><h3>Scheme type-wise</h3><div id="ixTypeBars"></div></div>' +
    '<div class="card"><h3>Status</h3><div class="donutwrap"><div id="ixDonut"></div><div id="ixLegend"></div></div></div>' +
    '<div class="card"><h3>Nature of work</h3><div id="ixNature"></div></div>' +
    '<div class="card"><h3>Beneficiaries by category</h3><div id="ixBenef"></div></div>' +
    '<div class="card" id="ixFundCard"><h3>Fund-wise (schemes \u00B7 amount)</h3><div id="ixFund"></div></div>' +
    '<div class="card"><h3>GP \u00D7 Scheme type</h3><div class="ix-scroll" id="ixMatrix"></div></div>' +
    '<div class="card"><h3>GP summary</h3><div class="ix-scroll" id="ixTable"></div></div>' +
    '<div class="card" id="ixTopCard"><h3>Top priority schemes</h3><div id="ixTop"></div></div>' +
    '<div class="card"><h3>Entries - last 14 days</h3><div id="ixDays"></div></div>' +
    '</div>';
  main.appendChild(s1);

  var s2 = document.createElement('section');
  s2.id = 'screen-fundplan'; s2.className = 'screen';
  s2.innerHTML = back.replace('BACKID', 'fpBack') +
    '<div id="fpDenied" class="card denied hidden">You do not have permission to open the Fund &amp; Priority Planner.</div>' +
    '<div id="fpBody"><div class="card"><h3>Fund &amp; Priority Planner</h3>' +
    '<p class="muted" style="margin-bottom:10px">A priority number used once disappears from the other schemes\' lists. Use \u21C4 Swap to exchange two priorities. Nothing is saved until you press Save changes.</p>' +
    '<div class="searchbar"><i class="ic" data-ic="search"></i><input id="fpQ" placeholder="Search scheme, GP, village, ID..."></div>' +
    '<div class="grid2" style="margin-top:10px">' +
    '<div class="field"><label>GP</label><select id="fpGp">' + gpOpts + '</select></div>' +
    '<div class="field"><label>Show</label><select id="fpShow"><option value="all">All schemes</option><option value="none">Priority not set</option><option value="set">Priority set</option><option value="nofund">Fund not set</option></select></div>' +
    '<div class="field"><label>Order</label><select id="fpSort"><option value="prio">Priority order</option><option value="new">Newest first</option></select></div>' +
    '</div></div>' +
    '<div id="fpNote" class="note hidden">View only - you do not have permission to change fund or priority.</div>' +
    '<div id="fpWarn" class="warnline hidden"></div>' +
    '<div id="fpSummary" class="summary"></div><div id="fpList"></div>' +
    '<button id="fpMore" class="btn ghost block hidden">Load more</button><div style="height:56px"></div></div>';
  main.appendChild(s2);

  var s3 = document.createElement('section');
  s3.id = 'screen-perms'; s3.className = 'screen';
  s3.innerHTML = '<button class="backlink" id="pmBack"><i class="ic" data-ic="back"></i> Back to User Management</button>' +
    '<div class="card"><h3><i class="ic" data-ic="lock"></i> Access Control</h3>' +
    '<div class="field"><label>Set permissions for</label><select id="pmTarget"></select></div>' +
    '<div id="pmNote" class="note"></div><div id="pmList"></div>' +
    '<button class="btn primary block" id="pmSave"><i class="ic" data-ic="check"></i> Save permissions</button>' +
    '<button class="btn ghost block hidden" id="pmClear">Remove special settings (follow role)</button></div>';
  main.appendChild(s3);

  var bar = document.createElement('div');
  bar.id = 'fpBar'; bar.className = 'fp-savebar hidden';
  bar.innerHTML = '<span id="fpBarTxt"></span><button class="btn ghost" id="fpDiscard">Discard</button><button class="btn primary" id="fpSave">Save changes</button>';
  document.body.appendChild(bar);

  var mod = document.createElement('div');
  mod.id = 'modalSwap'; mod.className = 'modal hidden';
  mod.innerHTML = '<div class="modal-card"><div class="mhead"><b>\u21C4 Swap priority</b><button class="iconbtn" id="swClose">\u00D7</button></div>' +
    '<p class="muted" id="swInfo" style="margin-bottom:10px"></p>' +
    '<div class="field"><label>Swap with</label><select id="swTarget"></select></div>' +
    '<button class="btn primary block" id="swGo">Swap</button></div>';
  document.body.appendChild(mod);

  /* User Management screen: button to open Access Control; Edit-user popup: per-login permissions */
  var addBtn = el('btnAddUser');
  var pb = document.createElement('button');
  pb.id = 'btnOpenPerms'; pb.className = 'btn ghost block hidden';
  pb.innerHTML = '\uD83D\uDD10 Access Control (Surveyor / MLA permissions)';
  addBtn.parentNode.insertBefore(pb, addBtn);
  var ep = document.createElement('button');
  ep.id = 'euPerms'; ep.className = 'btn ghost block hidden';
  ep.innerHTML = '\uD83D\uDD10 Permissions of this login';
  el('euResetPin').parentNode.appendChild(ep);

  fillSelect(el('fpGp'), CONFIG.gpList, 'All GPs');
  paintIcons();
  bindNew();
  bindPlanner();
}

function bindNew(){
  el('xtInsights').onclick = function(){ showScreen('insights'); };
  el('xtPlan').onclick = function(){ PLAN.q = ''; PLAN.gp = ''; PLAN.show = 'all'; syncPlanFilters(); showScreen('fundplan'); };
  el('xtSurveyors').onclick = function(){ loadUsers(); showScreen('users'); };
  el('xtPerms').onclick = function(){ openPerms(); };
  el('btnOpenPerms').onclick = function(){ openPerms(); };
  el('euPerms').onclick = function(){ var m = val('euMobile'); show('modalEditUser', false); openPerms('user:' + m); };
  el('pmBack').onclick = function(){ loadUsers(); showScreen('users'); };
  el('pmTarget').onchange = function(){ PM.target = this.value; renderPerms(); };
  el('pmSave').onclick = savePerms;
  el('pmClear').onclick = clearCustom;

  el('ixBack').onclick = function(){ renderHome(); showScreen('home'); };
  el('ixGp').onchange = function(){ INS.gp = this.value; renderInsights(); };
  el('ixType').onchange = function(){ INS.type = this.value; renderInsights(); };
  el('ixStatus').onchange = function(){ INS.status = this.value; renderInsights(); };
  el('ixClear').onclick = function(){ INS.gp = ''; INS.type = ''; INS.status = ''; renderInsights(); };
  el('ixOpen').onclick = function(){
    recState.gp = INS.gp; recState.type = INS.type; recState.status = INS.status; recState.scope = 'all'; recState.q = '';
    recVisible = 10;
    el('fltGp').value = INS.gp; el('fltType').value = INS.type; el('fltStatus').value = INS.status; el('recSearch').value = '';
    syncScopeChips(); renderRecords(); showScreen('records');
  };
  el('screen-insights').addEventListener('click', function(e){
    var t = e.target; if (!t.closest) return;
    var row = t.closest('[data-chart]');
    if (row){
      var c = row.getAttribute('data-chart'), k = row.getAttribute('data-k');
      INS[c] = (INS[c] === k) ? '' : k;
      renderInsights(); return;
    }
    var op = t.closest('[data-open]');
    if (op){ openDetail(op.getAttribute('data-open')); return; }
    var mb = t.closest('[data-m]');
    if (mb){ INS.metric = mb.getAttribute('data-m'); renderInsights(); }
  });
}

/* ============ HOOK INTO THE EXISTING APP (wrappers - originals stay untouched) ============ */
TITLES.insights = 'Project Overview'; NAVMAP.insights = 'navHome';
TITLES.fundplan = 'Fund & Priority';  NAVMAP.fundplan = 'navHome';
TITLES.perms = 'Access Control';      NAVMAP.perms = 'navHome';

var _call = call;
call = function(){
  var p = _call.apply(null, arguments);
  return p.then(function(res){
    if (res && res.perms){ PERMS = res.perms; applyChrome(); }
    return res;
  });
};

var _showScreen = showScreen;
showScreen = function(name){
  _showScreen(name);
  CUR = name;
  if (name === 'insights') renderInsights();
  if (name === 'fundplan'){ PLAN.visible = 30; renderPlanner(false); }
  if (name === 'perms') loadPerms();
  syncBar();
};

var _refresh = refreshCurrentView;
refreshCurrentView = function(){
  _refresh();
  if (CUR === 'insights') renderInsights();
  if (CUR === 'fundplan') renderPlanner(true);
};

var _enter = enterApp;
enterApp = function(){
  _enter();
  buildUi();
  /* Scheme Type filter fix: the list stores labels, the old filter compared codes */
  el('fltType').innerHTML = '<option value="">All Scheme Types</option>' + CONFIG.schemeTypes.map(function(t){
    return '<option value="' + esc(t.label) + '">' + esc(t.label) + '</option>';
  }).join('');
  applyChrome();
};

var _recordCard = recordCard;
recordCard = function(r){
  var h = _recordCard(r);
  if (!canEditRec(r)) h = h.replace(/<button class="lc-btn" onclick="openForm\('[^']*'\)">Edit<\/button>/, '');
  if (hasVal(r.fundAmount) && h.indexOf('lc-fund') > -1){
    h = h.replace(/(<div class="lc-fund">[\s\S]*?)(<\/div>)/, function(m, a, b){ return a + ' \u00B7 ' + xMoney(r.fundAmount) + b; });
  }
  return h;
};

var _renderDetail = renderDetail;
renderDetail = function(id){
  _renderDetail(id);
  var r = findRec(id); if (!r) return;
  show('detEdit', canEditRec(r));
  show('detDelete', canDelRec(r));
  show('detFund', can('setFund'));
  show('detPrint', can('printReport'));
  show('detMenu', can('setFund') || canDelRec(r));
};

/* "Fund & Priority" in the record menu now opens the planner (search pre-filled with this scheme) */
openFund = function(){
  if (!DETAIL_ID) return;
  PLAN.q = DETAIL_ID; PLAN.gp = ''; PLAN.show = 'all'; syncPlanFilters();
  showScreen('fundplan');
};

/* Edit-form fix: the saved record has the type LABEL, the dropdown needs the CODE */
var _openForm = openForm;
openForm = function(id){
  _openForm(id);
  if (!id) return;
  var r = findRec(id); if (!r || !r.schemeType) return;
  var code = typeCode(r.schemeType);
  if (code && val('fSchemeType') !== code){
    el('fSchemeType').value = code;
    onSchemeTypeChange(); updateSchemeNamePreview(); updateSaveState();
  }
};

if (USER && CONFIG){ buildUi(); applyChrome(); }

})();
