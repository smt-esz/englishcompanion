// ═══════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════
const SK = 'soul_english_v1';
// ── DATENSICHERHEIT ──
// Der Fortschritt liegt an drei Stellen im Browser:
//   1. SK         – der aktuelle Stand (localStorage)
//   2. SK_BAK     – der Stand vom letzten App-Start (localStorage)
//   3. IndexedDB  – ein Stand pro Tag, die letzten 7 Tage
// Ein unlesbarer Stand wird nie still verworfen, sondern unter SK_BROKEN
// aufgehoben. Gegen das komplette Löschen der Websitedaten (Safari nach
// 7 Tagen ohne Nutzung) hilft nur die Sicherungsdatei, siehe shareProgress().
const SK_BAK = SK + '_bak';
const SK_BROKEN = SK + '_broken';
let _loadState = 'empty'; // 'ok' | 'recovered' | 'broken' | 'empty'
function _parseP(raw){
  try{
    const d = JSON.parse(raw);
    return (d && typeof d==='object' && 'vocab' in d && 'grammar' in d) ? d : null;
  }catch(e){ return null; }
}
let P = (() => {
  let raw = null, bak = null;
  try { raw = localStorage.getItem(SK); bak = localStorage.getItem(SK_BAK); } catch(e){}
  if(raw){
    const d = _parseP(raw);
    if(d){
      _loadState = 'ok';
      if(d.onboarded){ try { localStorage.setItem(SK_BAK, raw); } catch(e){} }
      return Object.assign(defP(), d);
    }
    try { localStorage.setItem(SK_BROKEN, raw); } catch(e){}
  }
  const b = bak && _parseP(bak);
  if(b){ _loadState = 'recovered'; return Object.assign(defP(), b); }
  _loadState = raw ? 'broken' : 'empty';
  return defP();
})();
function defP(){
  return {grammar:{}, vocab:{}, irreg:[], reading:[], writing:[], listening:[], badges:[], streak:0, lastDate:'', xp:0, errors:{}, gHistory:{}, readingScores:{}, weekChallenge:{week:0,done:[]}, gameStats:{hangman:[], memory:[], qf:[], wordsearch:[]}, dayXP:0, dayXPDate:'', lang:'en2', teacherEmail:'', seenVersion:'', bigText:false, easyRead:false, name:'', avatar:'', srs:{}};
}
let _saveWarned = false;
function save(){
  let json;
  try { json = JSON.stringify(P); } catch(e){ return; }
  try { localStorage.setItem(SK, json); }
  catch(e){
    if(!_saveWarned){ _saveWarned = true; try { showToast(T('save_failed'), 6000); } catch(_){} }
  }
  idbMirror(json);
}

// ── IndexedDB-Spiegel: ein Stand pro Tag, die letzten 7 Tage ──
const IDB_NAME = 'ec-backup', IDB_STORE = 'snap', IDB_KEEP = 7;
function idbOpen(){
  return new Promise((res, rej)=>{
    try{
      const r = indexedDB.open(IDB_NAME, 1);
      r.onupgradeneeded = ()=>r.result.createObjectStore(IDB_STORE);
      r.onsuccess = ()=>res(r.result);
      r.onerror = ()=>rej(r.error);
      r.onblocked = ()=>rej(new Error('blocked'));
    }catch(e){ rej(e); }
  });
}
let _idbTimer = null, _idbJson = null;
// Gebündelt schreiben: viele save()-Aufrufe hintereinander → ein Schreibvorgang.
function idbMirror(json){
  if(!P.onboarded) return; // ein leeres Profil überschreibt nie eine Sicherung
  _idbJson = json;
  if(_idbTimer) return;
  _idbTimer = setTimeout(idbFlush, 1500);
}
function idbFlush(){
  if(_idbTimer){ clearTimeout(_idbTimer); _idbTimer = null; }
  const json = _idbJson; _idbJson = null;
  if(!json) return Promise.resolve(false);
  const day = new Date().toISOString().slice(0,10);
  return idbOpen().then(db=>new Promise(res=>{
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const st = tx.objectStore(IDB_STORE);
    st.put({json, ts: Date.now()}, day);
    const kr = st.getAllKeys();
    kr.onsuccess = ()=>{
      const keys = kr.result.slice().sort();
      keys.slice(0, Math.max(0, keys.length - IDB_KEEP)).forEach(k=>st.delete(k));
    };
    tx.oncomplete = ()=>{ db.close(); res(true); };
    tx.onerror = tx.onabort = ()=>{ db.close(); res(false); };
  })).catch(()=>false);
}
// Beim Verlassen der App sofort schreiben, nicht erst nach der Wartezeit.
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') idbFlush(); });
window.addEventListener('pagehide', ()=>{ idbFlush(); });

// Alle Tagesstände, neuester zuerst.
function idbSnapshots(){
  return idbOpen().then(db=>new Promise(res=>{
    const out = [];
    const tx = db.transaction(IDB_STORE, 'readonly');
    const c = tx.objectStore(IDB_STORE).openCursor(null, 'prev');
    c.onsuccess = ()=>{ const cur = c.result; if(cur){ out.push({day:cur.key, json:cur.value.json}); cur.continue(); } };
    tx.oncomplete = ()=>{ db.close(); res(out); };
    tx.onerror = tx.onabort = ()=>{ db.close(); res([]); };
  })).catch(()=>[]);
}
// App startet ohne Fortschritt → neuesten brauchbaren Tagesstand zurückholen.
function tryAutoRestore(){
  const timeout = new Promise(res=>setTimeout(()=>res([]), 2500));
  return Promise.race([idbSnapshots(), timeout]).then(list=>{
    for(const s of list){
      const d = _parseP(s.json);
      if(d && d.onboarded){ P = Object.assign(defP(), d); save(); return true; }
    }
    return false;
  }).catch(()=>false);
}
// Bewusstes Zurücksetzen: alle Kopien löschen, sonst käme der Stand wieder.
function resetAllProgress(){
  try { localStorage.removeItem(SK); localStorage.removeItem(SK_BAK); localStorage.removeItem(SK_BROKEN); } catch(e){}
  if(_idbTimer){ clearTimeout(_idbTimer); _idbTimer = null; }
  _idbJson = null;
  idbOpen().then(db=>{
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).clear();
    tx.oncomplete = tx.onerror = tx.onabort = ()=>db.close();
  }).catch(()=>{});
  P = defP();
  go('home');
}
// Browser bitten, die Daten nicht automatisch zu löschen.
function requestPersist(){
  try{
    if(navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(()=>{});
  }catch(e){}
}
// Läuft die App als installierte App (Home-Bildschirm) oder im Browser-Tab?
function isStandaloneApp(){
  return navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}
function isIOSDevice(){
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints > 1);
}

