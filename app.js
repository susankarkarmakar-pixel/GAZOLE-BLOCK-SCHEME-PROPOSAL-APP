/* ============ GAZOLE SCHEME PROPOSAL APP - app.js (GitHub Pages version) ============
 * Backend = your Apps Script deployment (Code.gs v4.3).
 * This file is pure English/ASCII so it can never get garbled again.
 */
var API_URL = 'https://script.google.com/macros/s/AKfycbxk48y9isiIMPVIThTrh4boN4o37Io3L-54azngm6AaynGx7OFuREu0a-XR2HaZVqBp2g/exec';

/* ---------- tiny utils ---------- */
function el(id){ return document.getElementById(id); }
function val(id){ var e = el(id); return e ? String(e.value || '').trim() : ''; }
function num(id){ var v = val(id); return v === '' ? 0 : (Number(v) || 0); }
function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function show(id, on){ el(id).classList.toggle('hidden', !on); }
function storeGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function storeSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
function storeDel(k){ try { localStorage.removeItem(k); } catch(e){} }

var TOKEN = storeGet('gzl_token') || '';
var USER = null;
var CONFIG = null;
var MOUZA_LIST = [];
var RECORDS = [];
var EDIT_ID = null;
var DETAIL_ID = null;
var PENDING_DETAIL = null;
var RP_MOBILE = null;
var photoB64 = null, photoMime = null, photoName = null;
var recVisible = 10;
var recState = { q:'', gp:'', type:'', status:'', sort:'new', scope:'all' };

/* ---------- server bridge (fetch to Apps Script doPost) ---------- */
function call(fn){
  var args = Array.prototype.slice.call(arguments, 1);
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ fn: fn, args: args })
  }).then(function(r){ return r.json(); }).then(function(res){
    if (res === null || res === undefined) {
      res = { error: 'Empty server response. Redeploy Apps Script with New version and access "Anyone".' };
    }
    if (res && res.error === 'SESSION_EXPIRED'){ sessionExpired(); throw new Error('SESSION_EXPIRED'); }
    return res;
  });
}
function sessionExpired(){
  TOKEN=''; storeDel('gzl_token'); USER=null;
  el('appShell').classList.add('hidden');
  el('loginScreen').classList.remove('hidden');
  el('loginScreen').classList.add('active');
  toast('Session expired - please login again.');
}

/* ---------- toast / fatal ---------- */
var toastTimer = null;
function toast(msg){
  var t = el('toast'); t.innerText = msg; t.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer = setTimeout(function(){ t.classList.add('hidden'); }, 3000);
}
function showFatal(msg){
  var f = el('fatalBanner'); f.innerText = msg; f.classList.remove('hidden');
}
window.onerror = function(msg){ showFatal(String(msg)); };

/* ---------- icons ---------- */
var ICONS = {
  bank:'M12 1L2 6v2h20V6L12 1zM4 10h3v7H4zM10.5 10h3v7h-3zM17 10h3v7h-3zM2 19h20v2H2z',
  home:'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z',
  doc:'M6 2h9l5 5v15H6V2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8zm0 4h8v1.5H8z',
  check:'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
  person:'M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z',
  plus:'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z',
  search:'M10 2a8 8 0 105.29 14.03l4.53 4.54 1.41-1.41-4.53-4.54A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z',
  filter:'M3 6h18v2H3V6zm4 6h10v2H7v-2zm3 6h4v2h-4v-2z',
  sync:'M12 4V1L8 5l4 4V6a6 6 0 11-6 6H4a8 8 0 108-8z',
  print:'M6 2h12v5h2a2 2 0 012 2v5h-4v8H6v-8H2V9a2 2 0 012-2h2V2zm2 2v3h8V4H8zm0 10v6h8v-6H8z',
  edit:'M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  trash:'M6 7h12l-1 14H7L6 7zm3-4h6l1 2h5v2H3V5h5l1-2z',
  money:'M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v1.5c1.8.3 3 1.5 3 3h-2c0-.8-.8-1.5-2-1.5s-2 .6-2 1.4c0 .7.6 1.1 2.2 1.5 2 .4 3.8 1.2 3.8 3.4 0 1.8-1.3 3-3 3.2V19h-2v-1.5c-1.8-.3-3-1.6-3-3.2h2c0 .9.8 1.6 2 1.6s2-.6 2-1.4c0-.7-.6-1.1-2.2-1.5-2-.4-3.8-1.2-3.8-3.3 0-1.7 1.2-2.9 3-3.2V7h2z',
  back:'M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z',
  dots:'M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z',
  eye:'M12 5c5 0 9.3 3.1 11 7-1.7 3.9-6 7-11 7S2.7 15.9 1 12c1.7-3.9 6-7 11-7zm0 2C8.2 7 4.8 9 3.2 12 4.8 15 8.2 17 12 17s7.2-2 8.8-5C19.2 9 15.8 7 12 7zm0 2a3 3 0 110 6 3 3 0 010-6z',
  eyeoff:'M3 4.3L4.3 3l16.7 16.7-1.3 1.3-3.2-3.2A12.8 12.8 0 0112 19c-5 0-9.3-3.1-11-7a12.6 12.6 0 014.9-5.6L3 4.3zM12 5c5 0 9.3 3.1 11 7a12.7 12.7 0 01-3.2 4.4l-2-2A3 3 0 0012 9h-.4L9.7 7.1A10 10 0 0112 5z',
  pin:'M12 2a7 7 0 017 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 017-7zm0 4.5A2.5 2.5 0 1012 11.5 2.5 2.5 0 0012 6.5z',
  chart:'M4 20h16v2H4v-2zM6 10h3v8H6v-8zm5-6h3v14h-3V4zm5 4h3v10h-3V8z',
  users:'M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM8 13c-3 0-6 1.6-6 3.6V19h12v-2.4c0-2-3-3.6-6-3.6zm8 0c-.5 0-1 .05-1.5.14 1 .9 1.5 2 1.5 3.46V19h6v-2.4c0-2-3-3.6-6-3.6z',
  logout:'M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10H10v2h8v14h-8v2h10V3z',
  lock:'M12 2a5 5 0 015 5v3h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1V7a5 5 0 015-5zm-3 8h6V7a3 3 0 00-6 0v3z',
  clock:'M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l4.7 2.8 1-1.6-3.7-2.2V7z',
  camera:'M9 3l-1.5 2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-3.5L15 3H9zm3 5a5 5 0 110 10 5 5 0 010-10z'
};
function paintIcons(){
  var nodes = document.querySelectorAll('[data-ic]');
  for (var i = 0; i < nodes.length; i++){
    var p = ICONS[nodes[i].getAttribute('data-ic')];
    if (p) nodes[i].innerHTML = '<svg viewBox="0 0 24 24"><path d="' + p + '"/></svg>';
  }
}

/* ---------- date helpers ---------- */
function dParse(v){ var d = new Date(v); return isNaN(d) ? new Date() : d; }
function fmtDate(v){ return dParse(v).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function fmtTime(v){ return dParse(v).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); }
function dateLabel(v){
  var d = dParse(v), today = new Date(), yest = new Date(); yest.setDate(today.getDate()-1);
  var same = function(a,b){ return a.toDateString() === b.toDateString(); };
  if (same(d,today)) return 'Today';
  if (same(d,yest)) return 'Yesterday';
  return d.toLocaleDateString('en-IN',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});
}
function timeAgo(v){
  var s = (Date.now() - dParse(v).getTime())/1000;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  return Math.floor(s/86400) + 'd ago';
}
function statusPill(st){
  st = String(st || '');
  if (st === 'Active') return 'green';
  if (st === 'Pending Review') return 'amber';
  if (st === 'In Progress') return 'blue';
  if (st === 'Completed') return 'gray';
  return 'gray';
}
function driveThumb(url, w){
  var m = String(url || '').match(/\/d\/([a-zA-Z0-9-_]+)/);
  return m ? ('https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w' + (w || 400)) : '';
}
function initials(name){
  var parts = String(name || '').trim().split(/\s+/);
  return ((parts[0]||'').charAt(0) + (parts[1]||'').charAt(0)).toUpperCase() || '-';
}
var AVCOLORS = [['#DCE7F5','#0B2C4D'],['#FCE4CC','#B05C10'],['#E5F5EC','#1B7F4D'],['#FBE9E7','#C0392B'],['#EFE6F7','#6B21A8']];
function avColor(name){ var h = 0, s = String(name||''); for (var i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) % 997; return AVCOLORS[h % AVCOLORS.length]; }

/* ---------- router ---------- */
var NAVMAP = { home:'navHome', records:'navRecords', detail:'navRecords', form:'navHome',
               analytics:'navHome', approvals:'navApprovals', users:'navHome', resetpin:'navHome', profile:'navProfile' };
var TITLES = { home:'Gazole Block, Malda', records:'Reports', detail:'Record', form:'Scheme Entry',
               analytics:'System Analytics', approvals:'Approvals', users:'User Management',
               resetpin:'Reset PIN', profile:'Profile' };
function showScreen(name){
  var screens = document.querySelectorAll('#mainArea .screen');
  for (var i=0;i<screens.length;i++) screens[i].classList.remove('active');
  var s = el('screen-' + name); if (s) s.classList.add('active');
  el('appTitle').innerText = TITLES[name] || 'Gazole Block, Malda';
  var navs = document.querySelectorAll('.bottomnav button');
  for (var j=0;j<navs.length;j++) navs[j].classList.remove('active');
  var nb = el(NAVMAP[name] || 'navHome'); if (nb) nb.classList.add('active');
  window.scrollTo(0,0);
}

/* ---------- login / boot ---------- */
function doLogin(){
  var m = val('loginMobile'), p = val('loginPin');
  el('loginError').classList.add('hidden');
  if (!/^\d{10}$/.test(m)){ loginErr('Enter a valid 10-digit mobile number.'); return; }
  if (!/^\d{4,6}$/.test(p)){ loginErr('PIN must be 4-6 digits.'); return; }
  el('loginBtn').disabled = true; el('loginBtn').innerText = 'Logging in...';
  call('login', m, p).then(function(res){
    el('loginBtn').disabled = false; el('loginBtn').innerText = 'Login';
    if (res.success){
      TOKEN = res.token; USER = res.user; storeSet('gzl_token', TOKEN);
      enterApp();
    } else loginErr(res.error || 'Login failed.');
  }).catch(function(e){
    el('loginBtn').disabled = false; el('loginBtn').innerText = 'Login';
    loginErr(e.message || 'Connection error.');
  });
}
function loginErr(msg){ var e = el('loginError'); e.innerText = msg; e.classList.remove('hidden'); }

function boot(){
  paintIcons();
  bindEvents();
  Promise.all([
    call('getConfig').then(function(c){ if (c && c.gpList) CONFIG = c; }).catch(function(){}),
    call('getMouzaList').then(function(m){ if (m && m.mouzas) MOUZA_LIST = m.mouzas; }).catch(function(){})
  ]).then(function(){
    if (!CONFIG){ showFatal('Config not loaded. Check API_URL in app.js and that the deployment access is "Anyone".'); return; }
    if (!TOKEN) return;
    call('whoAmI', TOKEN).then(function(res){
      if (res && res.success){ USER = res.user; enterApp(); }
      else { TOKEN=''; storeDel('gzl_token'); }
    }).catch(function(){});
  });
}

function enterApp(){
  el('loginScreen').classList.remove('active');
  el('loginScreen').classList.add('hidden');
  el('loginBtn').disabled = false; el('loginBtn').innerText = 'Login';
  el('loginError').classList.add('hidden');
  el('appShell').classList.remove('hidden');
  var canCreate = (USER.role === 'Admin' || USER.role === 'Surveyor');
  show('btnTopNew', canCreate);
  show('qaNewEntry', canCreate);
  show('adminTools', USER.role === 'Admin');
  show('navApprovals', USER.role === 'Admin');
  el('navRecordsLabel').innerText = (USER.role === 'Surveyor') ? 'My Reports' : 'Projects';
  recState.scope = (USER.role === 'Surveyor') ? 'mine' : 'all';
  syncScopeChips();
  populateStaticSelects();
  showScreen('home');
  loadRecords(true);
}

function populateStaticSelects(){
  fillSelect(el('fGp'), CONFIG.gpList, 'Select...');
  el('fSchemeType').innerHTML = '<option value="">Select...</option>' + CONFIG.schemeTypes.map(function(t){
    return '<option value="' + t.code + '">' + esc(t.label) + '</option>';
  }).join('');
  fillSelect(el('fNature'), CONFIG.natureOfWorkOptions, 'Select...');
  el('fLandBelongs').innerHTML = '<option value="">Select...</option>' + CONFIG.landBelongsTo.map(function(l){
    return '<option value="' + l.code + '">' + esc(l.label) + '</option>';
  }).join('');
  el('classList').innerHTML = CONFIG.classificationSuggestions.map(function(c){ return '<option value="' + esc(c) + '">'; }).join('');
  fillSelect(el('fltGp'), CONFIG.gpList, 'All GPs');
  el('fltType').innerHTML = '<option value="">All Scheme Types</option>' + CONFIG.schemeTypes.map(function(t){
    return '<option value="' + t.code + '">' + esc(t.label) + '</option>';
  }).join('');
  fillSelect(el('fltStatus'), CONFIG.statuses || ['Pending Review','Active','In Progress','Completed'], 'All Statuses');
  fillSelect(el('anGpFilter'), CONFIG.gpList, 'All Gram Panchayats');
  el('fdType').innerHTML = '<option value="">-</option>' + CONFIG.fundTypes.map(function(f){
    return '<option value="' + esc(f) + '">' + esc(f) + '</option>';
  }).join('');
}
function fillSelect(sel, items, first){
  sel.innerHTML = '<option value="">' + esc(first || 'Select...') + '</option>' + items.map(function(x){
    return '<option value="' + esc(x) + '">' + esc(x) + '</option>';
  }).join('');
}

/* ---------- data loading / sync ---------- */
function loadRecords(initial){
  call('getSchemes', TOKEN).then(function(res){
    if (res.error){ toast(res.error); return; }
    var last = Number(storeGet('gzl_last_sync') || 0);
    RECORDS = res.records || [];
    var fresh = 0;
    RECORDS.forEach(function(r){ if (dParse(r.createdAt).getTime() > last) fresh++; });
    if (initial){
      if (fresh > 0){ el('syncBadge').innerText = fresh; el('syncBadge').classList.remove('hidden'); }
      var ls = Number(storeGet('gzl_last_sync') || 0);
      el('syncLast').innerText = ls ? ('Last synced: ' + timeAgo(new Date(ls).toISOString())) : 'Not synced yet';
    } else {
      storeSet('gzl_last_sync', String(Date.now()));
      el('syncBadge').classList.add('hidden');
      el('syncLast').innerText = 'Last synced: just now';
      toast('Data synced.');
    }
    if (PENDING_DETAIL){
      var id = PENDING_DETAIL; PENDING_DETAIL = null;
      openDetail(id);
      return;
    }
    refreshCurrentView();
  }).catch(function(e){ toast('Sync failed: ' + (e.message || e)); });
}
function refreshCurrentView(){
  var active = document.querySelector('#mainArea .screen.active');
  if (!active) return;
  var id = active.id.replace('screen-','');
  if (id === 'home') renderHome();
  if (id === 'records') renderRecords();
  if (id === 'analytics') renderAnalytics();
  if (id === 'approvals') renderApprovals();
  if (id === 'detail' && DETAIL_ID) renderDetail(DETAIL_ID);
}

/* ---------- HOME ---------- */
function renderHome(){
  el('homeWelcome').innerText = 'Welcome, ' + USER.name + (USER.role === 'Admin' ? ' (BDO)' : '');
  var today = 0, pending = 0, active = 0;
  var tstr = new Date().toDateString();
  RECORDS.forEach(function(r){
    if (dParse(r.createdAt).toDateString() === tstr) today++;
    if (r.status === 'Pending Review') pending++;
    if (r.status === 'Active' || r.status === 'In Progress') active++;
  });
  el('qsToday').innerText = today;
  el('qsPending').innerText = pending;
  el('qsActive').innerText = active;
}

/* ---------- RECORDS ---------- */
function syncScopeChips(){
  el('scopeAll').classList.toggle('active', recState.scope === 'all');
  el('scopeMine').classList.toggle('active', recState.scope === 'mine');
}
function filteredRecords(){
  var q = recState.q.toLowerCase();
  var list = RECORDS.filter(function(r){
    if (recState.scope === 'mine' && String(r.enteredByMobile) !== String(USER.mobile)) return false;
    if (recState.gp && r.gp !== recState.gp) return false;
    if (recState.type && r.schemeType !== recState.type) return false;
    if (recState.status && r.status !== recState.status) return false;
    if (q){
      var hay = (r.id+' '+r.schemeName+' '+r.gp+' '+r.village+' '+r.ownerName+' '+r.enteredByName).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
  if (recState.sort === 'priority'){
    list.sort(function(a,b){
      var pa = a.priority === '' ? 999999 : Number(a.priority);
      var pb = b.priority === '' ? 999999 : Number(b.priority);
      return pa - pb || (dParse(b.createdAt) - dParse(a.createdAt));
    });
  } else {
    list.sort(function(a,b){ return dParse(b.createdAt) - dParse(a.createdAt); });
  }
  return list;
}
function renderRecords(){
  var list = filteredRecords();
  var todayCount = 0, tstr = new Date().toDateString();
  list.forEach(function(r){ if (dParse(r.createdAt).toDateString() === tstr) todayCount++; });
  el('recSummary').innerText = list.length + ' record' + (list.length===1?'':'s') + ' - ' + todayCount + ' today';
  var box = el('recList');
  if (!list.length){ box.innerHTML = '<div class="card center muted">No records found.</div>'; el('recLoadMore').classList.add('hidden'); return; }
  var html = '', lastLabel = null, shown = Math.min(recVisible, list.length);
  for (var i = 0; i < shown; i++){
    var r = list[i];
    var lbl = (recState.sort === 'new') ? dateLabel(r.createdAt) : null;
    if (lbl && lbl !== lastLabel){ html += '<div class="datehead">' + esc(lbl) + '</div>'; lastLabel = lbl; }
    html += recordCard(r);
  }
  box.innerHTML = html;
  attachImgFallbacks(box);
  var more = el('recLoadMore');
  more.classList.toggle('hidden', list.length <= shown);
  more.innerText = 'Load More Records (' + (list.length - shown) + ' remaining)';
}
function recordCard(r){
  var thumb = driveThumb(r.photoUrl, 500);
  var img = thumb ? '<img class="lc-photo" data-fb="1" src="' + thumb + '" alt="">' :
    '<div class="lc-photo empty"><span class="ic"><svg viewBox="0 0 24 24"><path d="' + ICONS.camera + '"/></svg></span></div>';
  var fund = (r.priority !== '' || r.fundType) ?
    '<div class="lc-fund">Fund: ' + (r.priority !== '' ? ('Priority ' + esc(r.priority)) : '') +
    (r.priority !== '' && r.fundType ? ' - ' : '') + (r.fundType ? esc(r.fundType) : '') + '</div>' : '';
  var actions = '<div class="lc-actions"><button class="lc-btn" onclick="openDetail(\'' + r.id + '\')">View Details</button>' +
    '<button class="lc-btn" onclick="openForm(\'' + r.id + '\')">Edit</button></div>';
  return '<div class="listcard">' + img +
    '<div class="lc-body"><div class="lc-top"><b class="lc-title">' + esc(r.schemeName || r.id) + '</b>' +
    '<span class="pill ' + statusPill(r.status) + '">' + esc(r.status || '-') + '</span></div>' +
    '<div class="lc-meta"><span>' + esc(r.gp) + ' GP</span><span>by ' + esc(r.enteredByName || '-') + '</span></div>' +
    '<div class="lc-meta"><span>' + fmtDate(r.createdAt) + ' ' + fmtTime(r.createdAt) + '</span></div>' +
    fund + actions + '</div></div>';
}
function attachImgFallbacks(root){
  var imgs = root.querySelectorAll('img[data-fb]');
  for (var i=0;i<imgs.length;i++){
    imgs[i].onerror = (function(img){ return function(){
      var d = document.createElement('div'); d.className = 'lc-photo empty'; d.innerText = 'No photo';
      img.parentNode.replaceChild(d, img);
    }; })(imgs[i]);
  }
}

/* ---------- DETAIL ---------- */
function openDetail(id){
  DETAIL_ID = id;
  el('detMenuBox').classList.add('hidden');
  renderDetail(id);
  showScreen('detail');
}
function findRec(id){ for (var i=0;i<RECORDS.length;i++) if (RECORDS[i].id === id) return RECORDS[i]; return null; }
function renderDetail(id){
  var r = findRec(id); if (!r){ toast('Record not found.'); return; }
  el('detId').innerText = r.id;
  var canFund = (USER.role === 'Admin' || USER.role === 'MLA');
  show('detFund', canFund);
  var thumb = driveThumb(r.photoUrl, 800);
  var html = '';
  if (thumb) html += '<div class="dphoto-wrap"><img class="dphoto" src="' + thumb + '"><span class="phototag">Site Photo</span></div>';
  html += '<div class="card"><div class="dlabel">Scheme Proposal</div>' +
    '<div class="dtitle">' + esc(r.schemeName || r.id) + '</div>' +
    '<span class="pill ' + statusPill(r.status) + '">' + esc(r.status || '-') + '</span>' +
    '<div class="drow"><span class="dicon"><i class="ic" data-ic="bank"></i></span><span class="dtext"><small>Gram Panchayat</small><b>' + esc(r.gp) + '</b></span></div>' +
    '<div class="drow"><span class="dicon"><i class="ic" data-ic="home"></i></span><span class="dtext"><small>Village / Sansad</small><b>' + esc(r.village) + (r.para ? ' (' + esc(r.para) + ')' : '') + '</b></span></div></div>';
  html += '<div class="card"><div class="drow"><span class="dicon"><i class="ic" data-ic="edit"></i></span><span class="dtext"><small>Nature of Work</small><b>' + esc(r.natureOfWork) + (r.natureOfWorkOther ? ' (' + esc(r.natureOfWorkOther) + ')' : '') + '</b></span></div>' +
    '<div class="drow"><span class="dicon"><i class="ic" data-ic="doc"></i></span><span class="dtext"><small>Scheme Type</small><b>' + esc(typeLabel(r.schemeType)) + '</b></span></div>' +
    (r.estimatedCost !== '' && r.estimatedCost !== undefined ? '<div class="drow"><span class="dicon"><i class="ic" data-ic="money"></i></span><span class="dtext"><small>Estimated Cost</small><b>Rs. ' + Number(r.estimatedCost).toLocaleString('en-IN') + '</b></span></div>' : '') + '</div>';
  html += '<div class="card"><h3>Land Records</h3><div class="dgrid">' +
    dcell('Mouza & JL', r.mouzaJl) + dcell('Plot No.', r.plotNo) +
    dcell('Khatiyan', r.khatiyan || '-') + dcell('Owner', r.ownerName) +
    dcell('Classification', r.classification || '-') + dcell('Land Belongs To', r.landBelongsTo) +
    '</div></div>';
  html += '<div class="card"><div class="benwrap"><h3 style="margin:0">Target Beneficiaries</h3>' +
    '<span class="bentotal"><small>Total:</small> ' + Number(r.totalBenef || 0).toLocaleString('en-IN') + '</span></div>' +
    '<div class="bengrid">' +
    '<div class="bencell"><small>SC</small><b>' + (r.benefSC||0) + '</b></div>' +
    '<div class="bencell"><small>ST</small><b>' + (r.benefST||0) + '</b></div>' +
    '<div class="bencell"><small>Minority</small><b>' + (r.benefMinority||0) + '</b></div>' +
    '<div class="bencell"><small>General</small><b>' + (r.benefGeneral||0) + '</b></div>' +
    '</div></div>';
  html += '<div class="card"><h3>Location & GPS</h3><div class="mapbox">' + mapSvg(r) +
    '<div class="mrow"><span>Start Point</span><b>' + esc(r.startPoint || r.lat || '-') + '</b></div>' +
    '<div class="mrow"><span>End Point / Venue</span><b>' + esc(r.endPoint || r.venue || '-') + '</b></div>' +
    '<div class="mrow"><span>Coordinates</span><b>' + esc(r.lat) + ', ' + esc(r.lng) + '</b></div>' +
    '</div><p style="margin-top:8px"><a target="_blank" href="https://maps.google.com/?q=' + esc(r.lat) + ',' + esc(r.lng) + '">Open in Google Maps</a></p></div>';
  html += '<div class="card"><div class="metatitle">Record Metadata</div>' +
    '<div class="drow"><span class="dicon"><i class="ic" data-ic="person"></i></span><span class="dtext"><small>Entered By</small><b>' + esc(r.enteredByName) + ' - ' + esc(r.enteredByMobile) + '</b></span></div>' +
    '<div class="drow"><span class="dicon"><i class="ic" data-ic="clock"></i></span><span class="dtext"><small>Created / Updated</small><b>' + fmtDate(r.createdAt) + ' ' + fmtTime(r.createdAt) + ' - up. ' + fmtDate(r.updatedAt) + '</b></span></div>' +
    ((r.fundType || r.priority !== '' || r.fundAmount !== '') ?
      '<div class="drow"><span class="dicon"><i class="ic" data-ic="money"></i></span><span class="dtext"><small>Fund / Priority</small><b>' +
      esc(r.fundType || '-') + (r.fundAmount !== '' && r.fundAmount !== undefined ? ' - Rs. ' + Number(r.fundAmount).toLocaleString('en-IN') : '') +
      (r.priority !== '' && r.priority !== undefined ? ' - Priority ' + esc(r.priority) : '') + '</b></span></div>' : '') +
    '</div>';
  el('detBody').innerHTML = html;
  paintIcons();
}
function dcell(l, v){ return '<div class="dcell"><small>' + esc(l) + '</small><b>' + esc(v || '-') + '</b></div>'; }
function typeLabel(code){
  if (!CONFIG) return code;
  for (var i=0;i<CONFIG.schemeTypes.length;i++) if (CONFIG.schemeTypes[i].code === code) return CONFIG.schemeTypes[i].label;
  return code;
}
function mapSvg(r){
  return '<svg viewBox="0 0 400 170" preserveAspectRatio="none">' +
    '<rect width="400" height="170" fill="#E7EFDD"/>' +
    '<rect x="18" y="14" width="110" height="60" rx="6" fill="#DCE8CC"/>' +
    '<rect x="250" y="90" width="130" height="64" rx="6" fill="#D3E3BF"/>' +
    '<rect x="150" y="30" width="90" height="46" rx="6" fill="#E2EDD4"/>' +
    '<path d="M40 130 C 120 60, 260 140, 360 45" stroke="#0B2C4D" stroke-width="4" fill="none" stroke-dasharray="8 6"/>' +
    '<circle cx="40" cy="130" r="9" fill="#1B7F4D" stroke="#fff" stroke-width="3"/>' +
    '<circle cx="360" cy="45" r="9" fill="#C0392B" stroke="#fff" stroke-width="3"/>' +
    '<text x="52" y="146" font-size="11" fill="#333">Start</text>' +
    '<text x="318" y="30" font-size="11" fill="#333">End</text></svg>';
}

/* ---------- APPROVALS ---------- */
function renderApprovals(){
  var pend = RECORDS.filter(function(r){ return r.status === 'Pending Review'; });
  el('apprSummary').innerText = pend.length + ' proposal' + (pend.length===1?'':'s') + ' waiting for approval';
  var box = el('apprList');
  if (!pend.length){ box.innerHTML = '<div class="card center muted">Nothing pending.</div>'; return; }
  var html = '';
  pend.forEach(function(r){
    html += '<div class="listcard"><div class="lc-body">' +
      '<div class="lc-top"><b class="lc-title">' + esc(r.schemeName || r.id) + '</b><span class="pill amber">Pending Review</span></div>' +
      '<div class="lc-meta"><span>' + esc(r.gp) + ' GP</span><span>by ' + esc(r.enteredByName) + '</span><span>' + fmtDate(r.createdAt) + '</span></div>' +
      '<div class="lc-actions">' +
      '<button class="lc-btn" onclick="openDetail(\'' + r.id + '\')">View</button>' +
      '<button class="lc-btn" onclick="setStatus(\'' + r.id + '\',\'Active\')">Approve</button>' +
      '<button class="lc-btn" onclick="setStatus(\'' + r.id + '\',\'In Progress\')">In Progress</button>' +
      '</div></div></div>';
  });
  box.innerHTML = html;
}
function setStatus(id, status){
  toast('Updating...');
  call('updateStatus', TOKEN, id, status).then(function(res){
    if (res.success){ toast(id + ' is now ' + status); loadRecords(false); }
    else toast(res.error || 'Failed.');
  }).catch(function(e){ toast(e.message); });
}

/* ---------- MOUZA / JL AUTO-FILL ---------- */
function getGpValue(){ return val('fGp'); }
function mouzasForGp(gp){
  if (!gp) return [];
  var g = gp.toLowerCase();
  return (MOUZA_LIST || []).filter(function(m){ return String(m.gp).toLowerCase() === g; });
}
function refreshMouzaOptions(){
  var sel = el('fMouza'), gp = getGpValue();
  var list = mouzasForGp(gp);
  var html = !gp ? '<option value="">Select GP first...</option>'
    : (list.length ? '<option value="">Select mouza...</option>' : '<option value="">No mouza list for this GP</option>');
  list.forEach(function(m){
    html += '<option value="' + esc(m.mouza) + '">' + esc(m.mouza) + ' (JL ' + (m.jl || '-') + ')</option>';
  });
  html += '<option value="__manual__">Not in list - type manually</option>';
  sel.innerHTML = html;
  onMouzaChange();
}
function onMouzaChange(){
  var sel = el('fMouza'), jl = el('fJl');
  var manual = sel.value === '__manual__';
  show('mouzaManualWrap', manual);
  if (manual){ jl.readOnly = false; jl.value = ''; jl.placeholder = 'Enter J.L. No.'; }
  else {
    var hit = null;
    mouzasForGp(getGpValue()).forEach(function(m){ if (m.mouza === sel.value) hit = m; });
    jl.readOnly = true; jl.value = hit ? hit.jl : ''; jl.placeholder = 'Auto';
  }
  updateSaveState();
}
function buildMouzaJlValue(){
  var sel = el('fMouza'), jl = val('fJl'), mouza = '';
  if (!sel) return '';
  if (sel.value === '__manual__') mouza = val('fMouzaManual');
  else mouza = sel.value;
  if (!mouza) return '';
  return jl ? (mouza + ', ' + jl) : mouza;
}
function setMouzaFromRecord(r){
  refreshMouzaOptions();
  var raw = String(r.mouzaJl || '').trim();
  var name = raw.split(',')[0].trim().toLowerCase();
  var hit = null;
  mouzasForGp(r.gp).forEach(function(m){ if (m.mouza.toLowerCase() === name) hit = m; });
  if (hit){ el('fMouza').value = hit.mouza; onMouzaChange(); }
  else {
    el('fMouza').value = '__manual__'; onMouzaChange();
    el('fMouzaManual').value = raw; el('fJl').value = '';
  }
}

/* ---------- FORM ---------- */
function openForm(id){
  EDIT_ID = id || null;
  photoB64 = null; photoMime = null; photoName = null;
  el('photoPreview').classList.add('hidden');
  if (el('fPhoto')) el('fPhoto').value = '';
  show('photoNote', false);
  var r = id ? findRec(id) : null;
  el('formTitle').innerText = r ? ('Edit: ' + r.id) : 'New Scheme Entry';
  el('fGp').value = r ? r.gp : '';
  el('fVillage').value = r ? r.village : '';
  el('fPara').value = r ? (r.para || '') : '';
  el('fSchemeType').value = r ? r.schemeType : '';
  el('fStartPoint').value = r ? (r.startPoint || '') : '';
  el('fEndPoint').value = r ? (r.endPoint || '') : '';
  el('fVenue').value = r ? (r.venue || '') : '';
  el('fNature').value = r ? (r.natureOfWork || '') : '';
  el('fNatureOther').value = r ? (r.natureOfWorkOther || '') : '';
  el('fEstCost').value = r ? (r.estimatedCost === '' || r.estimatedCost === undefined ? '' : r.estimatedCost) : '';
  el('fSchemeName').value = r ? (r.schemeName || '') : '';
  el('fLat').value = r ? (r.lat || '') : '';
  el('fLng').value = r ? (r.lng || '') : '';
  el('fPlot').value = r ? (r.plotNo || '') : '';
  el('fKhatiyan').value = r ? (r.khatiyan || '') : '';
  el('fClassification').value = r ? (r.classification || '') : '';
  el('fOwner').value = r ? (r.ownerName || '') : '';
  el('fLandBelongs').value = r ? landCode(r.landBelongsTo) : '';
  el('fBenefSC').value = r ? (r.benefSC || '') : '';
  el('fBenefST').value = r ? (r.benefST || '') : '';
  el('fBenefGeneral').value = r ? (r.benefGeneral || '') : '';
  el('fBenefMinority').value = r ? (r.benefMinority || '') : '';
  if (r){ setMouzaFromRecord(r); show('photoNote', !!r.photoUrl); }
  else { el('fMouza').innerHTML = '<option value="">Select GP first...</option>'; el('fJl').value = ''; show('mouzaManualWrap', false); }
  onSchemeTypeChange();
  onNatureChange();
  updateBenefTotal();
  updateSchemeNamePreview();
  updateSaveState();
  showScreen('form');
  if (!id) setTimeout(pcRestoreDraft, 50);
}
function landCode(label){
  if (!CONFIG) return '';
  for (var i=0;i<CONFIG.landBelongsTo.length;i++) if (CONFIG.landBelongsTo[i].label === label) return CONFIG.landBelongsTo[i].code;
  return '';
}
function currentTypeInfo(){
  var code = val('fSchemeType');
  if (!CONFIG) return null;
  for (var i=0;i<CONFIG.schemeTypes.length;i++) if (CONFIG.schemeTypes[i].code === code) return CONFIG.schemeTypes[i];
  return null;
}
function onSchemeTypeChange(){
  var info = currentTypeInfo();
  var isOther = info && info.code === 'other';
  var isRoad = info && info.category === 'ROAD_DRAIN';
  show('roadFields', !!isRoad);
  show('venueField', !!info && !isRoad);
  show('natureField', !!info && !isOther);
  onNatureChange();
  var nameInput = el('fSchemeName');
  if (isOther){
    nameInput.readOnly = false;
    el('schemeNameHint').innerText = 'You selected "Other" - type the Scheme Name yourself. *';
  } else {
    nameInput.readOnly = true;
    el('schemeNameHint').innerText = 'Auto-generated from the details above.';
  }
  updateSchemeNamePreview();
  updateSaveState();
}
function onNatureChange(){
  var info = currentTypeInfo();
  var showOther = info && info.code !== 'other' && val('fNature') === 'Others';
  show('natureOtherField', !!showOther);
  updateSchemeNamePreview();
}
function clientSchemeName(){
  var info = currentTypeInfo(); if (!info) return '';
  var fd = {
    village: val('fVillage'), gp: val('fGp'), startPoint: val('fStartPoint'), endPoint: val('fEndPoint'),
    venue: val('fVenue'), natureOfWork: val('fNature'), natureOfWorkOther: val('fNatureOther'),
    schemeNameOverride: val('fSchemeName')
  };
  var suffix = 'Vill. ' + fd.village + ', GP ' + fd.gp;
  if (info.code === 'other') return fd.schemeNameOverride;
  var verb = fd.natureOfWork === 'Others' ? (fd.natureOfWorkOther || '') : (fd.natureOfWork || '');
  var pre = verb ? verb + ' of ' : '';
  if (info.category === 'ROAD_DRAIN') return pre + info.label + ' from ' + (fd.startPoint || '?') + ' to ' + (fd.endPoint || '?') + ', ' + suffix;
  return pre + info.label + ' at ' + (fd.venue || '?') + ', ' + suffix;
}
function updateSchemeNamePreview(){
  var info = currentTypeInfo();
  if (info && info.code !== 'other') el('fSchemeName').value = clientSchemeName();
}
function updateBenefTotal(){
  el('benefTotal').innerText = (num('fBenefSC') + num('fBenefST') + num('fBenefGeneral') + num('fBenefMinority')).toLocaleString('en-IN');
}
function formRequiredOk(){
  var info = currentTypeInfo();
  if (!val('fGp') || !val('fVillage') || !info) return false;
  if (info.category === 'ROAD_DRAIN'){ if (!val('fStartPoint') || !val('fEndPoint')) return false; }
  else if (!val('fVenue')) return false;
  if (info.code === 'other'){ if (!val('fSchemeName')) return false; }
  else {
    if (!val('fNature')) return false;
    if (val('fNature') === 'Others' && !val('fNatureOther')) return false;
  }
  if (!val('fLat') || !val('fLng')) return false;
  if (!EDIT_ID && !photoB64) return false;
  if (!buildMouzaJlValue()) return false;
  if (!val('fPlot') || !val('fOwner') || !val('fLandBelongs')) return false;
  return true;
}
function updateSaveState(){ el('formSave').disabled = !formRequiredOk(); }

function collectForm(){
  return {
    gp: val('fGp'), village: val('fVillage'), para: val('fPara'),
    schemeType: val('fSchemeType'), startPoint: val('fStartPoint'), endPoint: val('fEndPoint'),
    venue: val('fVenue'), natureOfWork: val('fNature'), natureOfWorkOther: val('fNatureOther'),
    schemeNameOverride: val('fSchemeName'), estimatedCost: val('fEstCost'),
    lat: val('fLat'), lng: val('fLng'),
    mouzaJl: buildMouzaJlValue(), plotNo: val('fPlot'), khatiyan: val('fKhatiyan'),
    classification: val('fClassification'), ownerName: val('fOwner'), landBelongsTo: val('fLandBelongs'),
    benefSC: num('fBenefSC'), benefST: num('fBenefST'), benefGeneral: num('fBenefGeneral'), benefMinority: num('fBenefMinority'),
    photoBase64: photoB64, photoMimeType: photoMime, photoFileName: photoName
  };
}
function saveForm(){
  if (!formRequiredOk()){ toast('Please fill all mandatory (*) fields.'); return; }
  var fd = collectForm();
  var savedId = EDIT_ID;
  el('formSave').disabled = true; el('formSave').innerText = 'Saving...';
  var p = EDIT_ID ? call('updateScheme', TOKEN, EDIT_ID, fd) : call('addScheme', TOKEN, fd);
  p.then(function(res){
    el('formSave').disabled = false; el('formSave').innerText = 'Save Entry';
    if (res.success){
      toast('Saved. ' + (res.id || savedId || ''));
      pcClearDraft();
      PENDING_DETAIL = savedId || res.id;
      EDIT_ID = null;
      loadRecords(false);
    } else toast(res.error || 'Save failed.');
  }).catch(function(e){
    el('formSave').disabled = false; el('formSave').innerText = 'Save Entry';
    toast('Error: ' + e.message);
  });
}

/* geo */
function useGeo(){
  if (!navigator.geolocation){ toast('Geolocation not supported.'); return; }
  el('btnGeo').disabled = true;
  navigator.geolocation.getCurrentPosition(function(pos){
    el('fLat').value = pos.coords.latitude.toFixed(6);
    el('fLng').value = pos.coords.longitude.toFixed(6);
    el('btnGeo').disabled = false; updateSaveState(); pcSaveDraft();
    toast('Location captured.');
  }, function(err){
    el('btnGeo').disabled = false;
    toast('Could not get location: ' + err.message);
  }, { enableHighAccuracy:true, timeout:15000 });
}

/* ---------- PHOTO CAPTURE POPUP ---------- */
var pcStream = null, pcB64 = null, pcDraftTimer = null;
var PC_DRAFT_KEY = 'gzl_draft_v1';

function openPhotoModal(){
  pcB64 = null;
  el('modalPhoto').classList.remove('hidden');
  pcShow('pcChoose');
}
function closePhotoModal(){
  pcStopCamera();
  el('modalPhoto').classList.add('hidden');
}
function pcShow(id){
  ['pcChoose','pcCamWrap','pcPreviewWrap'].forEach(function(x){
    el(x).classList.toggle('hidden', x !== id);
  });
}
function pcStartCamera(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    toast('In-page camera not supported - opening camera app...');
    el('pcCamFallback').click();
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    .then(function(stream){
      pcStream = stream;
      el('pcVideo').srcObject = stream;
      pcShow('pcCamWrap');
    })
    .catch(function(err){
      toast('Camera permission not available - opening camera app...');
      el('pcCamFallback').click();
    });
}
function pcStopCamera(){
  if (pcStream){ pcStream.getTracks().forEach(function(t){ t.stop(); }); pcStream = null; }
}
function pcCapture(){
  var v = el('pcVideo');
  if (!v.videoWidth){ toast('Camera is warming up - try again.'); return; }
  var c = el('pcCanvas');
  var max = 1280;
  var sc = Math.min(1, max / Math.max(v.videoWidth, v.videoHeight));
  c.width = Math.round(v.videoWidth * sc);
  c.height = Math.round(v.videoHeight * sc);
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  pcB64 = c.toDataURL('image/jpeg', 0.7).split(',')[1];
  pcStopCamera();
  el('pcPreview').src = 'data:image/jpeg;base64,' + pcB64;
  pcShow('pcPreviewWrap');
}
function pcRetake(){ pcB64 = null; pcShow('pcChoose'); }
function pcPickGallery(){ el('pcFile').click(); }
function pcReadFile(input){
  var f = input.files[0]; if (!f) return;
  if (f.size > 8*1024*1024){ toast('Photo too large (max 8MB).'); input.value=''; return; }
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
    img.onload = function(){
      var c = el('pcCanvas'), max = 1280;
      var sc = Math.min(1, max / Math.max(img.width, img.height));
      c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      pcB64 = c.toDataURL('image/jpeg', 0.7).split(',')[1];
      el('pcPreview').src = 'data:image/jpeg;base64,' + pcB64;
      pcShow('pcPreviewWrap');
      input.value = '';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}
function pcUsePhoto(){
  if (!pcB64){ toast('Capture or choose a photo first.'); return; }
  photoB64 = pcB64; photoMime = 'image/jpeg'; photoName = 'site_photo.jpg';
  var pv = el('photoPreview');
  pv.src = 'data:image/jpeg;base64,' + pcB64;
  pv.classList.remove('hidden');
  updateSaveState();
  pcSaveDraft();
  closePhotoModal();
  toast('Photo added.');
}

/* ---------- draft auto-save ---------- */
function pcCollectDraft(){
  var ids = ['fGp','fVillage','fPara','fSchemeType','fStartPoint','fEndPoint','fVenue',
    'fNature','fNatureOther','fEstCost','fSchemeName','fLat','fLng','fMouza','fJl',
    'fMouzaManual','fPlot','fKhatiyan','fClassification','fOwner','fLandBelongs',
    'fBenefSC','fBenefST','fBenefGeneral','fBenefMinority'];
  var d = { t: Date.now(), photo: photoB64 };
  ids.forEach(function(i){ var e = el(i); if (e) d[i] = e.value; });
  return d;
}
function pcSaveDraft(){
  if (EDIT_ID) return;
  try { localStorage.setItem(PC_DRAFT_KEY, JSON.stringify(pcCollectDraft())); } catch(e){}
}
function pcClearDraft(){ try { localStorage.removeItem(PC_DRAFT_KEY); } catch(e){} }
function pcRestoreDraft(){
  try {
    var raw = localStorage.getItem(PC_DRAFT_KEY);
    if (!raw) return;
    var d = JSON.parse(raw);
    if (!d || (Date.now() - (d.t || 0)) > 6*3600*1000){ pcClearDraft(); return; }
    if (!(d.fGp || d.fVillage || d.fSchemeType || d.fLat || d.photo)) return;
    Object.keys(d).forEach(function(k){
      if (k==='t' || k==='photo' || k==='fMouza' || k==='fJl') return;
      var e = el(k); if (e && d[k]) e.value = d[k];
    });
    if (d.photo){
      photoB64 = d.photo; photoMime = 'image/jpeg'; photoName = 'site_photo.jpg';
      var pv = el('photoPreview');
      pv.src = 'data:image/jpeg;base64,' + photoB64;
      pv.classList.remove('hidden');
    }
    onSchemeTypeChange();
    refreshMouzaOptions();
    if (d.fMouza) el('fMouza').value = d.fMouza;
    onMouzaChange();
    if (d.fMouzaManual) el('fMouzaManual').value = d.fMouzaManual;
    if (d.fJl) el('fJl').value = d.fJl;
    updateBenefTotal();
    updateSaveState();
    toast('Unsaved form restored.');
  } catch(e){}
}

/* ---------- ANALYTICS ---------- */
function analyticsData(){
  var from = val('anFrom'), to = val('anTo');
  return RECORDS.filter(function(r){
    var d = dParse(r.createdAt);
    if (from && d < new Date(from + 'T00:00:00')) return false;
    if (to && d > new Date(to + 'T23:59:59')) return false;
    return true;
  });
}
function renderAnalytics(){
  var list = analyticsData();
  var total = list.length, benef = 0, cost = 0, pending = 0;
  list.forEach(function(r){
    benef += Number(r.totalBenef || 0);
    cost += Number(r.estimatedCost || 0);
    if (r.status === 'Pending Review') pending++;
  });
  el('anTotal').innerText = total.toLocaleString('en-IN');
  el('anBenef').innerText = (benef >= 1000 ? Math.round(benef/1000) + 'K+' : benef);
  el('anCost').innerText = 'Rs. ' + (cost/10000000).toFixed(1) + ' Cr';
  el('anPending').innerText = pending;
  var counts = { 'Active':0, 'In Progress':0, 'Completed':0, 'Pending Review':0 };
  list.forEach(function(r){ if (counts.hasOwnProperty(r.status)) counts[r.status]++; });
  var segs = [
    { v: counts['Active'], c: '#0B2C4D', l: 'Active' },
    { v: counts['In Progress'], c: '#B05C10', l: 'In Progress' },
    { v: counts['Completed'], c: '#BBD3F0', l: 'Completed' },
    { v: counts['Pending Review'], c: '#E6A817', l: 'Pending Review' }
  ].filter(function(s){ return s.v > 0; });
  el('anDonut').innerHTML = donutSvg(segs, total, Math.round((counts['Active']/ (total||1)) * 100) + '%');
  el('anLegend').innerHTML = '<div class="lg">' + segs.map(function(s){
    return '<span class="lg-item"><span class="lg-dot" style="background:' + s.c + '"></span>' + s.l + ' (' + Math.round(s.v/(total||1)*100) + '%)</span>';
  }).join('') + '</div>';
  var byGp = {};
  list.forEach(function(r){ byGp[r.gp] = (byGp[r.gp] || 0) + 1; });
  var gps = Object.keys(byGp).sort(function(a,b){ return byGp[b]-byGp[a]; }).slice(0,5);
  var maxGp = gps.length ? byGp[gps[0]] : 1;
  el('anTopGps').innerHTML = gps.length ? gps.map(function(g){
    return '<div class="barrow"><div class="bar-label"><span>' + esc(g) + ' GP</span><span>' + byGp[g] + '</span></div>' +
      '<div class="bar-track"><div class="bar-fill" style="width:' + Math.round(byGp[g]/maxGp*100) + '%"></div></div></div>';
  }).join('') : '<p class="muted">No data yet.</p>';
  renderTopSurveyors(list);
  var recent = list.slice(0,5);
  el('anRecent').innerHTML = recent.length ? recent.map(function(r){
    return '<div class="srow"><span class="ricon"><i class="ic" data-ic="doc"></i></span>' +
      '<span class="sname"><b>' + esc(r.schemeName || r.id) + '</b><small>Submitted by ' + esc(r.enteredByName) + ' - ' + timeAgo(r.createdAt) + '</small></span>' +
      '<span class="pill ' + statusPill(r.status) + '">' + esc(r.status) + '</span></div>';
  }).join('') : '<p class="muted">No submissions.</p>';
  paintIcons();
}
function renderTopSurveyors(list){
  var gpFilter = val('anGpFilter');
  var filtered = gpFilter ? list.filter(function(r){ return r.gp === gpFilter; }) : list;
  var by = {};
  filtered.forEach(function(r){
    var key = r.enteredByName || r.enteredByMobile;
    if (!by[key]) by[key] = { name: key, count: 0, gps: {} };
    by[key].count++;
    by[key].gps[r.gp] = (by[key].gps[r.gp] || 0) + 1;
  });
  var arr = Object.keys(by).map(function(k){ return by[k]; }).sort(function(a,b){ return b.count - a.count; }).slice(0,5);
  el('anTopSurveyors').innerHTML = arr.length ? arr.map(function(s){
    var zone = Object.keys(s.gps).sort(function(a,b){ return s.gps[b]-s.gps[a]; })[0] || '';
    var col = avColor(s.name);
    return '<div class="srow"><span class="savatar" style="background:' + col[0] + ';color:' + col[1] + '">' + initials(s.name) + '</span>' +
      '<span class="sname"><b>' + esc(s.name) + '</b><small>' + esc(zone) + ' Zone</small></span>' +
      '<span class="scount">' + s.count + ' Entries</span></div>';
  }).join('') : '<p class="muted">No data.</p>';
}
function donutSvg(segs, total, centerText){
  var r = 58, c = 2 * Math.PI * r, acc = 0;
  var svg = '<svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="' + r + '" fill="none" stroke="#EDF1F6" stroke-width="24"/>';
  segs.forEach(function(s){
    var frac = s.v / (total || 1);
    var dash = frac * c;
    svg += '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="' + s.c + '" stroke-width="24" ' +
      'stroke-dasharray="' + dash + ' ' + (c - dash) + '" stroke-dashoffset="' + (-acc * c) + '" transform="rotate(-90 80 80)"/>';
    acc += frac;
  });
  svg += '<text x="80" y="88" text-anchor="middle" font-size="22" font-weight="800" fill="#0B2C4D">' + centerText + '</text></svg>';
  return svg;
}

/* ---------- USERS / RESET PIN ---------- */
function loadUsers(){
  call('listUsers', TOKEN).then(function(res){
    if (res.error){ toast(res.error); return; }
    var html = '';
    (res.users || []).forEach(function(u){
      var col = avColor(u.name);
      html += '<div class="userrow"><span class="savatar" style="background:' + col[0] + ';color:' + col[1] + '">' + initials(u.name) + '</span>' +
        '<span class="ur-col"><b>' + esc(u.name) + '</b><small>' + esc(u.mobile) + ' - ' + esc(u.role) + '</small>' +
        '<span class="pill ' + (u.status === 'Active' ? 'green' : 'red') + '">' + esc(u.status) + '</span></span>' +
        '<span class="ur-btns"><button class="iconbtn" onclick="openEditUser(\'' + u.mobile + '\')">Edit</button>' +
        '<button class="iconbtn" onclick="openResetPin(\'' + u.mobile + '\')">PIN</button></span></div>';
    });
    el('userList').innerHTML = html || '<div class="card muted">No users.</div>';
  }).catch(function(e){ toast(e.message); });
}
function openEditUser(mobile){
  call('listUsers', TOKEN).then(function(res){
    var u = null; (res.users || []).forEach(function(x){ if (x.mobile === mobile) u = x; });
    if (!u) return;
    el('euMobile').value = u.mobile;
    el('euName').value = u.name;
    el('euStatus').value = u.status;
    el('modalEditUser').classList.remove('hidden');
  });
}
function openResetPin(mobile){
  el('modalEditUser').classList.add('hidden');
  RP_MOBILE = mobile;
  call('listUsers', TOKEN).then(function(res){
    var u = null; (res.users || []).forEach(function(x){ if (x.mobile === mobile) u = x; });
    if (!u){ toast('User not found.'); return; }
    var col = avColor(u.name);
    var av = el('rpAvatar'); av.innerText = initials(u.name); av.style.background = col[0]; av.style.color = col[1];
    el('rpName').innerText = u.name;
    el('rpRole').innerText = (u.role === 'Surveyor' ? 'Field Surveyor' : u.role);
    el('rpMobile').innerText = '+91 ' + u.mobile;
    el('rpStatus').innerText = String(u.status).toUpperCase();
    el('rpStatus').className = 'pill ' + (u.status === 'Active' ? 'green' : 'red');
    el('rpPin1').value = ''; el('rpPin2').value = '';
    showScreen('resetpin');
  });
}
function saveResetPin(){
  var p1 = val('rpPin1'), p2 = val('rpPin2');
  if (!/^\d{4,6}$/.test(p1)){ toast('PIN must be 4-6 digits.'); return; }
  if (p1 !== p2){ toast('PINs do not match.'); return; }
  call('updateUser', TOKEN, RP_MOBILE, { pin: p1 }).then(function(res){
    if (res.success){ toast('PIN reset done.'); showScreen('users'); loadUsers(); }
    else toast(res.error || 'Failed.');
  });
}

/* ---------- fund modal ---------- */
function openFund(){
  var r = findRec(DETAIL_ID); if (!r) return;
  el('fdType').value = r.fundType || '';
  el('fdAmount').value = r.fundAmount === '' || r.fundAmount === undefined ? '' : r.fundAmount;
  el('fdPriority').value = r.priority === '' || r.priority === undefined ? '' : r.priority;
  el('modalFund').classList.remove('hidden');
}
function saveFund(){
  call('updateFundPriority', TOKEN, DETAIL_ID, {
    fundType: val('fdType'), fundAmount: val('fdAmount'), priority: val('fdPriority')
  }).then(function(res){
    if (res.success){ el('modalFund').classList.add('hidden'); toast('Fund and priority saved.'); loadRecords(false); }
    else toast(res.error || 'Failed.');
  });
}

/* ---------- delete ---------- */
function deleteCurrent(){
  if (!DETAIL_ID) return;
  if (!confirm('Delete ' + DETAIL_ID + '? It will be moved to Deleted_Records.')) return;
  call('deleteScheme', TOKEN, DETAIL_ID).then(function(res){
    if (res.success){ toast('Deleted.'); el('detMenuBox').classList.add('hidden'); DETAIL_ID=null; showScreen('records'); loadRecords(false); }
    else toast(res.error || 'Failed.');
  });
}

/* ---------- CSV / PRINT ---------- */
function exportCsv(){
  var list = filteredRecords();
  var rows = [['Scheme ID','Created','GP','Village','Scheme Type','Scheme Name','Status','Priority','Fund Type','Fund Amount','Est. Cost','Surveyor','Mouza & JL','Plot No','Owner']];
  list.forEach(function(r){
    rows.push([r.id, fmtDate(r.createdAt), r.gp, r.village, typeLabel(r.schemeType), r.schemeName, r.status,
      r.priority, r.fundType, r.fundAmount, r.estimatedCost, r.enteredByName, r.mouzaJl, r.plotNo, r.ownerName]);
  });
  var csv = rows.map(function(row){
    return row.map(function(c){ c = String(c == null ? '' : c); return '"' + c.replace(/"/g,'""') + '"'; }).join(',');
  }).join('\n');
  var blob = new Blob(['\ufeff' + csv], { type:'text/csv' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'gazole_records.csv';
  document.body.appendChild(a); a.click(); a.remove();
}
function printReport(){
  var r = findRec(DETAIL_ID); if (!r) return;
  var thumb = driveThumb(r.photoUrl, 800);
  var html = '<div class="printable"><h1>Gazole Block, Malda - Scheme Proposal</h1>' +
    '<p><b>' + esc(r.id) + '</b> - ' + esc(r.status) + ' - Printed ' + fmtDate(new Date().toISOString()) + '</p>' +
    (thumb ? '<img src="' + thumb + '">' : '') +
    '<h2>Proposal</h2><p><b>' + esc(r.schemeName) + '</b></p>' +
    '<p>GP: ' + esc(r.gp) + ' - Village: ' + esc(r.village) + (r.para ? ' (' + esc(r.para) + ')' : '') + '</p>' +
    '<p>Scheme Type: ' + esc(typeLabel(r.schemeType)) + ' - Nature of Work: ' + esc(r.natureOfWork) + (r.natureOfWorkOther ? ' (' + esc(r.natureOfWorkOther) + ')' : '') + '</p>' +
    '<h2>Land Records</h2><table><tr><td>Mouza & JL</td><td>' + esc(r.mouzaJl) + '</td><td>Plot No.</td><td>' + esc(r.plotNo) + '</td></tr>' +
    '<tr><td>Khatiyan</td><td>' + esc(r.khatiyan || '-') + '</td><td>Owner</td><td>' + esc(r.ownerName) + '</td></tr>' +
    '<tr><td>Classification</td><td>' + esc(r.classification || '-') + '</td><td>Belongs To</td><td>' + esc(r.landBelongsTo) + '</td></tr></table>' +
    '<h2>Beneficiaries</h2><p>SC ' + (r.benefSC||0) + ' - ST ' + (r.benefST||0) + ' - General ' + (r.benefGeneral||0) + ' - Minority ' + (r.benefMinority||0) + ' - Total ' + (r.totalBenef||0) + '</p>' +
    '<h2>Location</h2><p>Lat ' + esc(r.lat) + ', Lng ' + esc(r.lng) + ' - ' + esc(r.location || '') + '</p>' +
    '<h2>Fund</h2><p>' + esc(r.fundType || '-') + (r.fundAmount !== '' && r.fundAmount !== undefined ? ' - Rs. ' + Number(r.fundAmount).toLocaleString('en-IN') : '') + (r.priority !== '' && r.priority !== undefined ? ' - Priority ' + esc(r.priority) : '') + '</p>' +
    '<br><br><p>______________________&nbsp;&nbsp;&nbsp;&nbsp;______________________</p>' +
    '<p>Surveyor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Block Development Officer</p>' +
    '</div>';
  el('printArea').innerHTML = html;
  setTimeout(function(){ window.print(); }, 300);
}

/* ---------- profile ---------- */
function renderProfile(){
  var col = avColor(USER.name);
  var av = el('pfAvatar'); av.innerText = initials(USER.name); av.style.background = col[0]; av.style.color = col[1];
  el('pfName').innerText = USER.name;
  el('pfRole').innerText = USER.role;
  el('pfMobile').innerText = '+91 ' + USER.mobile;
  var isAdmin = USER.role === 'Admin';
  show('pfAdminBox', isAdmin);
  if (isAdmin){
    call('getDataLocationInfo', TOKEN).then(function(res){
      if (res && !res.error){
        el('pfSheetLink').href = res.sheetUrl; el('pfSheetLink').innerText = res.sheetName;
        el('pfFolderLink').href = res.folderUrl; el('pfFolderLink').innerText = res.folderName;
      }
    });
  }
}
function doLogout(){
  call('logout', TOKEN);
  TOKEN=''; storeDel('gzl_token'); USER=null; RECORDS=[];
  el('appShell').classList.add('hidden');
  el('loginScreen').classList.remove('hidden');
  el('loginScreen').classList.add('active');
}

/* ---------- events ---------- */
function bindEvents(){
  el('loginBtn').onclick = doLogin;
  el('loginPin').addEventListener('keydown', function(e){ if (e.key === 'Enter') doLogin(); });

  var navBtns = document.querySelectorAll('.bottomnav button');
  for (var i=0;i<navBtns.length;i++){
    navBtns[i].onclick = (function(b){ return function(){
      var t = b.getAttribute('data-nav');
      if (t === 'home'){ renderHome(); showScreen('home'); }
      if (t === 'records'){ recVisible = 10; renderRecords(); showScreen('records'); }
      if (t === 'approvals'){ renderApprovals(); showScreen('approvals'); }
      if (t === 'profile'){ renderProfile(); showScreen('profile'); }
    }; })(navBtns[i]);
  }

  el('btnTopNew').onclick = function(){ openForm(null); };
  el('qaNewEntry').onclick = function(){ openForm(null); };
  el('qaMyReports').onclick = function(){ recState.scope = 'mine'; syncScopeChips(); recVisible=10; renderRecords(); showScreen('records'); };
  el('qaRecent').onclick = function(){ recState.sort='new'; recVisible=10; renderRecords(); showScreen('records'); };
  el('qaSync').onclick = function(){ loadRecords(false); };
  el('atAnalytics').onclick = function(){ renderAnalytics(); showScreen('analytics'); };
  el('atUsers').onclick = function(){ loadUsers(); showScreen('users'); };

  el('recSearch').oninput = function(){ recState.q = this.value; recVisible=10; renderRecords(); };
  el('scopeAll').onclick = function(){ recState.scope='all'; syncScopeChips(); renderRecords(); };
  el('scopeMine').onclick = function(){ recState.scope='mine'; syncScopeChips(); renderRecords(); };
  el('recFilterBtn').onclick = function(){ el('recFilterPanel').classList.toggle('hidden'); };
  el('fltGp').onchange = function(){ recState.gp = this.value; renderRecords(); };
  el('fltType').onchange = function(){ recState.type = this.value; renderRecords(); };
  el('fltStatus').onchange = function(){ recState.status = this.value; renderRecords(); };
  el('fltSort').onchange = function(){ recState.sort = this.value; renderRecords(); };
  el('fltClear').onclick = function(){
    recState.q=''; recState.gp=''; recState.type=''; recState.status=''; recState.sort='new';
    el('recSearch').value=''; el('fltGp').value=''; el('fltType').value=''; el('fltStatus').value=''; el('fltSort').value='new';
    renderRecords();
  };
  el('fltCsv').onclick = exportCsv;
  el('recLoadMore').onclick = function(){ recVisible += 10; renderRecords(); };

  el('detBack').onclick = function(){ showScreen('records'); };
  el('detMenu').onclick = function(){ el('detMenuBox').classList.toggle('hidden'); };
  el('detFund').onclick = function(){ el('detMenuBox').classList.add('hidden'); openFund(); };
  el('detDelete').onclick = function(){ el('detMenuBox').classList.add('hidden'); deleteCurrent(); };
  el('detEdit').onclick = function(){ openForm(DETAIL_ID); };
  el('detPrint').onclick = printReport;

  el('fGp').onchange = function(){ el('fMouzaManual').value=''; refreshMouzaOptions(); updateSchemeNamePreview(); updateSaveState(); pcSaveDraft(); };
  el('fMouza').onchange = function(){ onMouzaChange(); pcSaveDraft(); };
  el('fSchemeType').onchange = function(){ onSchemeTypeChange(); pcSaveDraft(); };
  el('fNature').onchange = function(){ onNatureChange(); pcSaveDraft(); };
  el('btnGeo').onclick = useGeo;
  ['fVillage','fPara','fStartPoint','fEndPoint','fVenue','fNatureOther','fSchemeName','fEstCost',
   'fLat','fLng','fMouzaManual','fJl','fPlot','fKhatiyan','fClassification','fOwner',
   'fBenefSC','fBenefST','fBenefGeneral','fBenefMinority'].forEach(function(id){
    el(id).addEventListener('input', function(){
      updateSchemeNamePreview(); updateBenefTotal(); updateSaveState();
    });
  });
  el('fLandBelongs').onchange = function(){ updateSaveState(); pcSaveDraft(); };
  el('formSave').onclick = saveForm;
  el('formCancel').onclick = function(){ EDIT_ID=null; showScreen(DETAIL_ID ? 'detail' : 'home'); };

  el('anApply').onclick = function(){ renderAnalytics(); };
  el('anGpFilter').onchange = function(){ renderTopSurveyors(analyticsData()); };

  el('btnAddUser').onclick = function(){
    el('auMobile').value=''; el('auPin').value=''; el('auName').value='';
    el('modalAddUser').classList.remove('hidden');
  };
  el('auSave').onclick = function(){
    call('createUser', TOKEN, { mobile: val('auMobile'), pin: val('auPin'), name: val('auName'), role: val('auRole') })
      .then(function(res){
        if (res.success){ el('modalAddUser').classList.add('hidden'); toast('Login created.'); loadUsers(); }
        else toast(res.error || 'Failed.');
      });
  };
  el('euSave').onclick = function(){
    call('updateUser', TOKEN, val('euMobile'), { name: val('euName'), status: val('euStatus') })
      .then(function(res){
        if (res.success){ el('modalEditUser').classList.add('hidden'); toast('User updated.'); loadUsers(); }
        else toast(res.error || 'Failed.');
      });
  };
  el('euResetPin').onclick = function(){ openResetPin(val('euMobile')); };

  el('rpBack').onclick = function(){ showScreen('users'); loadUsers(); };
  el('rpEye').onclick = function(){
    var t = el('rpPin1').type === 'password' ? 'text' : 'password';
    el('rpPin1').type = t; el('rpPin2').type = t;
  };
  el('rpSave').onclick = saveResetPin;

  el('pfSync').onclick = function(){ loadRecords(false); };
  el('pfLogout').onclick = doLogout;
  el('pfConnectBtn').onclick = function(){
    var url = val('pfConnectUrl'); if (!url){ toast('Paste a Sheet URL/ID first.'); return; }
    call('connectToSpreadsheet', TOKEN, url).then(function(res){
      if (res.success){ toast('Connected to ' + res.sheetName + ' (' + (res.records || 0) + ' records).'); loadRecords(false); }
      else toast(res.error || 'Failed.');
    });
  };

  var closers = document.querySelectorAll('[data-close]');
  for (var c=0;c<closers.length;c++){
    closers[c].onclick = (function(b){ return function(){ el(b.getAttribute('data-close')).classList.add('hidden'); }; })(closers[c]);
  }
  el('fdSave').onclick = saveFund;

  var pf = el('pcFile'); if (pf) pf.onchange = function(){ pcReadFile(this); };
  var cf = el('pcCamFallback'); if (cf) cf.onchange = function(){ pcReadFile(this); };

  document.addEventListener('input', function(e){
    var form = el('screen-form');
    if (form && form.contains(e.target)){
      clearTimeout(pcDraftTimer);
      pcDraftTimer = setTimeout(pcSaveDraft, 600);
    }
  });
  document.addEventListener('focusin', function(e){
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA') el('bottomNav').classList.add('hide');
  });
  document.addEventListener('focusout', function(){
    setTimeout(function(){ el('bottomNav').classList.remove('hide'); }, 200);
  });
}

boot();
