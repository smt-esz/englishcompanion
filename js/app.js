// ═══════════════════════════════════════════════
// LANGUAGE UI UPDATE
// ═══════════════════════════════════════════════
function updateLangUI(){
  const lang = P.lang||'en2';
  // Update language buttons
  ['en1','en2','de'].forEach(l=>{
    const btn = document.getElementById('lang-btn-'+l);
    if(btn){ btn.classList.toggle('is-active', lang===l); btn.setAttribute('aria-pressed', lang===l ? 'true' : 'false'); }
  });
  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = T(key);
    if(val && val !== key) el.textContent = val;
  });
}

// ═══════════════════════════════════════════════
// PWA INSTALL PROMPT
// ═══════════════════════════════════════════════
let _deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if(btn) btn.style.display = 'block';
});

function triggerPWAInstall(){
  if(_deferredPrompt){
    _deferredPrompt.prompt();
    _deferredPrompt.userChoice.then(()=>{ _deferredPrompt=null; });
  } else {
    go('pwa-help');
  }
}

window.addEventListener('appinstalled', ()=>{
  const box = document.getElementById('pwa-install-box');
  if(box) box.style.display='none';
});

// ═══════════════════════════════════════════════
// SIDEBAR TOGGLE
// ═══════════════════════════════════════════════
function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  const cl = document.getElementById('sidebar-close');
  if(!sb) return;
  const isOpen = sb.classList.contains('open');
  if(isOpen){
    sb.classList.remove('open');
    if(ov) ov.style.display='none';
    if(cl) cl.style.display='none';
  } else {
    sb.classList.add('open');
    if(ov) ov.style.display='block';
    if(cl) cl.style.display='block';
  }
}


// ═══════════════════════════════════════════════
// VERSION BADGE + UPDATE POP-UP
// ═══════════════════════════════════════════════
function renderVersionBadge(){
  if(document.getElementById('version-badge')) document.getElementById('version-badge').remove();
  const b = document.createElement('div');
  b.id = 'version-badge';
  b.textContent = 'Beta ' + APP_VERSION;
  b.title = T('version_badge_title');
  b.onclick = ()=>showChangelog(false);
  b.style.cssText = 'position:fixed;bottom:calc(.5rem + env(safe-area-inset-bottom));right:.6rem;z-index:30;background:rgba(30,41,59,.78);color:#fff;font-size:.68rem;font-weight:600;padding:.2rem .55rem;border-radius:99px;cursor:pointer;letter-spacing:.02em;backdrop-filter:blur(4px);user-select:none';
  document.body.appendChild(b);
}

function changelogEntryHTML(e){
  return `<div style="margin-bottom:.6rem">
    <p style="font-weight:700;color:#1E293B;font-size:.85rem">Beta ${e.v}${e.date?` <span style="color:#94A3B8;font-weight:500">· ${e.date}</span>`:''}</p>
    <ul style="margin:.2rem 0 0 1.1rem;padding:0">
      ${e.items.map(it=>`<li style="font-size:.82rem;color:#475569;line-height:1.5">${it}</li>`).join('')}
    </ul>
  </div>`;
}
// Nur die neueste Version direkt zeigen, ältere hinter einem Aufklapper –
// sonst wird das Fenster zu lang.
function changelogHTML(){
  const latest = CHANGELOG[0] ? changelogEntryHTML(CHANGELOG[0]) : '';
  const older = CHANGELOG.slice(1);
  const olderHTML = older.length ? `<details style="margin-top:.4rem">
    <summary style="cursor:pointer;font-size:.78rem;font-weight:600;color:#3B82F6">${T('version_older')}</summary>
    <div style="margin-top:.5rem">${older.map(changelogEntryHTML).join('')}</div>
  </details>` : '';
  return latest + olderHTML;
}

function showUpdatePopup(){
  if(document.getElementById('update-popup')) return;
  const ov = document.createElement('div');
  ov.id = 'update-popup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:1.25rem';
  ov.innerHTML = `<div style="background:#fff;border-radius:1.1rem;max-width:24rem;width:100%;padding:1.4rem;box-shadow:0 12px 40px rgba(0,0,0,.25);max-height:85vh;overflow-y:auto">
    <div style="font-size:2rem;text-align:center;margin-bottom:.3rem">🎉</div>
    <h2 style="font-size:1.15rem;font-weight:800;color:#1E293B;text-align:center;margin-bottom:.3rem">${T('version_new_title')}</h2>
    <p style="font-size:.88rem;color:#64748B;text-align:center;margin-bottom:.9rem">${T('version_new_sub_pre')}<strong>${APP_VERSION}</strong>${T('version_new_sub_post')}</p>
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:.7rem;padding:.6rem .8rem;margin-bottom:.9rem">${changelogHTML()}</div>
    <p style="font-size:.74rem;color:#94A3B8;text-align:center;margin-bottom:.8rem">${T('version_progress_safe')}</p>
    <div style="display:flex;gap:.5rem">
      <button onclick="dismissUpdate()" style="flex:1;padding:.6rem;border-radius:.7rem;border:1.5px solid #E2E8F0;background:#fff;color:#64748B;font-weight:600;font-size:.85rem;cursor:pointer">${T('version_later')}</button>
      <button onclick="applyUpdate()" style="flex:2;padding:.6rem;border-radius:.7rem;border:none;background:#2563EB;color:#fff;font-weight:700;font-size:.85rem;cursor:pointer">${T('version_update_now')}</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
}

function showChangelog(){
  if(document.getElementById('changelog-popup')) return;
  const ov = document.createElement('div');
  ov.id = 'changelog-popup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:1.25rem';
  ov.onclick = (e)=>{ if(e.target===ov) ov.remove(); };
  ov.innerHTML = `<div style="background:#fff;border-radius:1.1rem;max-width:24rem;width:100%;padding:1.4rem;box-shadow:0 12px 40px rgba(0,0,0,.25);max-height:85vh;overflow-y:auto">
    <h2 style="font-size:1.1rem;font-weight:800;color:#1E293B;margin-bottom:.2rem">${T('version_changelog_title')}</h2>
    <p style="font-size:.78rem;color:#94A3B8;margin-bottom:.4rem">${T('version_current_pre')}<strong>Beta ${APP_VERSION}</strong></p>
    <p style="font-size:.8rem;color:#059669;font-weight:600;margin-bottom:.9rem">✓ ${T('version_uptodate')||'App ist aktuell'}</p>
    <div>${changelogHTML()}</div>
    <button onclick="document.getElementById('changelog-popup').remove()" style="margin-top:.6rem;width:100%;padding:.6rem;border-radius:.7rem;border:none;background:#F1F5F9;color:#475569;font-weight:600;font-size:.85rem;cursor:pointer">${T('version_close')}</button>
  </div>`;
  document.body.appendChild(ov);
}

function dismissUpdate(){
  P.seenVersion = APP_VERSION; save();
  const p = document.getElementById('update-popup'); if(p) p.remove();
}

function applyUpdate(){
  P.seenVersion = APP_VERSION; save();
  // Clear caches (Service Worker) but KEEP localStorage progress, then reload fresh.
  const done = ()=>location.reload(true);
  try{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations().then(rs=>{
        rs.forEach(r=>{ if(r.waiting) r.waiting.postMessage('SKIP_WAITING'); r.update().catch(()=>{}); });
      }).catch(()=>{});
    }
    if('caches' in window){
      caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(done).catch(done);
    } else done();
  }catch(e){ done(); }
}

function showToast(msg, ms){
  const old = document.getElementById('app-toast'); if(old) old.remove();
  const t = document.createElement('div');
  t.id = 'app-toast';
  t.textContent = msg;
  t.style.cssText = 'position:fixed;left:50%;bottom:5rem;transform:translateX(-50%);z-index:9999;background:#065F46;color:#fff;padding:.55rem 1rem;border-radius:.7rem;font-size:.82rem;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,.2);opacity:0;transition:opacity .25s';
  document.body.appendChild(t);
  requestAnimationFrame(()=>{ t.style.opacity='1'; });
  setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(), 300); }, ms||2600);
}
function checkVersion(){
  renderVersionBadge();
  // A brand-new user (no seenVersion yet) just gets the current version stored silently.
  if(!P.seenVersion){ P.seenVersion = APP_VERSION; save(); return; }
  if(P.seenVersion !== APP_VERSION){ showUpdatePopup(); return; }
  // Kein Toast mehr bei jedem Start – der Versions-Badge unten rechts reicht,
  // und per Klick darauf gibt es die "App ist aktuell"-Bestätigung.
}

// ═══════════════════════════════════════════════
// SERVICE WORKER
// ═══════════════════════════════════════════════
if('serviceWorker' in navigator){
  let _swReloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', ()=>{
    if(_swReloaded) return; _swReloaded = true; location.reload();
  });
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').then(reg=>{
      reg.update().catch(()=>{});
      setInterval(()=>{ reg.update().catch(()=>{}); }, 60*60*1000);
      reg.addEventListener('updatefound', ()=>{
        const nw = reg.installing; if(!nw) return;
        nw.addEventListener('statechange', ()=>{
          if(nw.state==='installed' && navigator.serviceWorker.controller){
            nw.postMessage('SKIP_WAITING');
          }
        });
      });
    }).catch(()=>{});
  });
}

// ═══════════════════════════════════════════════
// INITIALISE APP
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', ()=>{
  applyA11y();
  go('home');
  updateLangUI();
  requestPersist();
  if(!P.onboarded){
    // Kein Fortschritt im localStorage: zuerst in den Tagesständen
    // (IndexedDB) nachsehen, bevor das Onboarding neu beginnt.
    tryAutoRestore().then(restored=>{
      if(restored){
        consumeBootTask(true);
        applyA11y(); go('home'); updateLangUI();
        checkVersion();
        showToast(T('restore_ok'), 5000);
        return;
      }
      // Erstes Öffnen: verpflichtendes Onboarding (Name, Avatar, Klasse,
      // Sprach-Check). Das Update-Pop-up wird dabei still übersprungen.
      P.seenVersion = APP_VERSION; save();
      consumeBootTask(true); // Aufgabe aus dem Link schon vormerken
      renderVersionBadge();
      startOnboarding('full');
    });
  } else {
    if(_loadState === 'recovered'){ save(); showToast(T('restore_ok'), 5000); }
    else idbMirror(JSON.stringify(P)); // sorgt dafür, dass es einen Tagesstand von heute gibt
    if(consumeBootTask(false)) go('home');
    checkVersion();
  }
});
