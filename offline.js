/* ============ GAZOLE OFFLINE MODE (offline.js) - load AFTER app.js ============ */
(function () {
  if (typeof call !== 'function' || typeof el !== 'function') return;
  var _call = call;
  var OUTBOX_KEY = 'gzl_outbox_v1';
  var CACHE_KEY = 'gzl_records_cache_v1';
  var CREDS_KEY = 'gzl_creds_v1';
  var MUTATING = ['addScheme', 'updateScheme', 'updateStatus', 'updateFundPriority'];
  var flushing = false;
  function outbox() { try { return JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]'); } catch (e) { return []; } }
  function saveOutbox(q) { try { localStorage.setItem(OUTBOX_KEY, JSON.stringify(q)); } catch (e) {} updateBadge(); }
  function updateBadge() {
    var n = outbox().length;
    var b = el('syncBadge');
    if (b) { b.innerText = n; b.classList.toggle('hidden', n === 0); }
  }
  function isNetErr(err) {
    return !navigator.onLine || /failed to fetch|networkerror|network request failed|load failed|err_internet/i.test(String((err && err.message) || err));
  }
  call = function (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return _call.apply(null, arguments).then(function (res) {
      if (fn === 'login' && res && res.success) {
        try { localStorage.setItem(CREDS_KEY, JSON.stringify({ m: args[0], p: args[1] })); } catch (e) {}
      }
      if (fn === 'getSchemes' && res && res.records) {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(res.records)); } catch (e) {}
      }
      return res;
    }).catch(function (err) {
      if (MUTATING.indexOf(fn) > -1 && isNetErr(err)) {
        var q = outbox();
        q.push({ fn: fn, args: args, t: Date.now() });
        saveOutbox(q);
        toast('Offline - saved on device, will auto-sync (' + q.length + ' pending)');
        return { success: true, offline: true, id: '' };
      }
      if (fn === 'getSchemes' && isNetErr(err)) {
        var cached = null;
        try { cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) {}
        if (cached) {
          toast('Offline - showing last saved data');
          return { error: null, records: cached, role: (typeof USER !== 'undefined' && USER) ? USER.role : '', cached: true };
        }
      }
      throw err;
    });
  };
  function relogin() {
    var c = null; try { c = JSON.parse(localStorage.getItem(CREDS_KEY) || 'null'); } catch (e) {}
    if (!c) return Promise.resolve(false);
    return _call('login', c.m, c.p).then(function (r) {
      if (r && r.success) { TOKEN = r.token; USER = r.user; storeSet('gzl_token', TOKEN); return true; }
      return false;
    }).catch(function () { return false; });
  }
  function ensureToken() {
    if (!TOKEN) return relogin();
    return _call('whoAmI', TOKEN).then(function (r) { return (r && r.success) ? true : relogin(); })
      .catch(function () { return relogin(); });
  }
  function flushOutbox() {
    if (flushing || !navigator.onLine) return Promise.resolve();
    if (!outbox().length) { updateBadge(); return Promise.resolve(); }
    flushing = true;
    return ensureToken().then(function process() {
      var q2 = outbox();
      if (!q2.length) { done(true); return null; }
      var item = q2[0];
      var args = item.args.slice();
      args[0] = TOKEN;
      return _call.apply(null, [item.fn].concat(args)).then(function (res) {
        q2.shift(); saveOutbox(q2);
        if (res && res.error) toast('Sync: ' + res.error);
        return process();
      }).catch(function () { done(false); });
    }).catch(function () { done(false); });
  }
  function done(synced) {
    flushing = false; updateBadge();
    if (synced) { toast('Offline entries synced'); if (typeof loadRecords === 'function') loadRecords(false); }
  }
  window.addEventListener('online', flushOutbox);
  setTimeout(flushOutbox, 4000);
  setInterval(function () { if (outbox().length) flushOutbox(); }, 30000);
  updateBadge();
})();
