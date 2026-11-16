// ═══════════════════════════════════════════════
// HEUTE: Start-Knopf, Tagesplan und Aufgaben der Lehrkraft
// ═══════════════════════════════════════════════
// Beides beruht auf demselben Prinzip: Jede Übung vergibt am Ende XP über
// addXP(). creditActivity() schaut dann, auf welcher Seite die Schülerin
// gerade ist (z.B. Vokabelset "soul5b1"), und schreibt die XP dem passenden
// Tagesplan-Schritt und der passenden Aufgabe gut.
//
// Gespeichert wird in:
//   P.plan  = {date:'2026-11-16', steps:[{k,id,xp,done}]}
//   P.tasks = [{id, t:Titel, d:Fälligkeit, added, doneAt, items:[{k,id,xp,done}]}]
// k = Art: v Vokabelset · g Grammatikthema · r Reading · l Listening ·
//          w Writing · i unregelmäßige Verben · x Wiederholen

// Ein Aufgaben-Link, mit dem die App geöffnet wurde (…/#aufgabe=XXXX).
// Muss gemerkt werden, bevor die Navigation den Hash überschreibt.
const _bootTaskHash = (location.hash||'').indexOf('#aufgabe=') === 0 ? location.hash : '';

function todayStr(){ return new Date().toISOString().slice(0,10); }
function tEsc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// Titel, Symbol, Zielseite und nötige XP zu einem Eintrag. null = gibt es nicht.
function itemInfo(k, id){
  if(k==='v'){ const t=VOCAB.find(x=>x.id===id); return t ? {icon:t.emoji||'🔤', title:t.title, route:['vocab-topic',id], need:15} : null; }
  if(k==='g'){ const t=GRAMMAR.find(x=>x.id===id); return t ? {icon:'📚', title:t.title, route:['grammar-topic',id], need:15} : null; }
  if(k==='r'){ const t=READING.find(x=>x.id===id); return t ? {icon:'📖', title:t.title, route:['reading-task',id], need:5} : null; }
  if(k==='l'){ const t=LISTENING.find(x=>x.id===id); return t ? {icon:'🎧', title:t.title, route:['listening-task',id], need:5} : null; }
  if(k==='w'){ const t=WRITING.find(x=>x.id===id); return t ? {icon:'✏️', title:t.title, route:['writing-task',id], need:5} : null; }
  if(k==='i') return {icon:'📋', title:'Irregular Verbs', route:['irreg','list'], need:15};
  if(k==='x') return {icon:'🔁', title:T('today_step_review'), route:null, need:5};
  return null;
}

// Zu welchem Eintrag gehört die Seite, auf der gerade geübt wird?
function activeItem(){
  if(typeof _state === 'undefined' || !_state) return null;
  const s = _state.section, sub = _state.sub;
  if(['vocab-topic','wordsearch','hangman','vocab-memory'].includes(s)) return sub ? {k:'v', id:sub} : null;
  if(['grammar-topic','grammar-exercise','grammar-quickfire'].includes(s)) return sub ? {k:'g', id:sub} : null;
  if(s==='grammar-check'){
    const id = (typeof _gcheck!=='undefined' && _gcheck) ? (_gcheck.topicId||_gcheck.id) : null;
    return id ? {k:'g', id} : null;
  }
  if(s==='reading-task') return sub ? {k:'r', id:sub} : null;
  if(s==='listening-task') return sub ? {k:'l', id:sub} : null;
  if(s==='writing-task') return sub ? {k:'w', id:sub} : null;
  if(s==='irreg' || s==='irreg-memory') return {k:'i', id:'all'};
  if(s==='review') return {k:'x', id:'review'};
  return null;
}

// Wird von addXP() aufgerufen (vor dem Speichern).
function creditActivity(n){
  const it = activeItem(); if(!it) return;
  let taskFinished = false, planFinished = false;
  (P.tasks||[]).forEach(t=>{
    if(t.doneAt) return;
    t.items.forEach(x=>{
      if(x.done || x.k!==it.k || x.id!==it.id) return;
      x.xp = (x.xp||0) + n;
      const info = itemInfo(x.k, x.id);
      if(info && x.xp >= info.need) x.done = 'auto';
    });
    if(t.items.every(x=>x.done)){ t.doneAt = todayStr(); taskFinished = true; }
  });
  const pl = P.plan;
  if(pl && pl.date === todayStr()){
    const before = pl.steps.every(s=>s.done);
    pl.steps.forEach(s=>{
      if(s.done || s.k!==it.k || s.id!==it.id) return;
      s.xp = (s.xp||0) + n;
      if(s.xp >= 5) s.done = true;
    });
    planFinished = !before && pl.steps.length > 0 && pl.steps.every(s=>s.done);
  }
  if(taskFinished || planFinished){
    setTimeout(()=>{
      try{
        confettiBurst(45);
        showToast(taskFinished ? '✅ '+T('task_done_toast') : '🎉 '+T('today_done_title'), 4000);
      }catch(e){}
    }, 900);
  }
}

// ── TAGESPLAN ──
// Bis zu 3 Schritte. Einmal am Tag zusammengestellt, damit die Liste nicht
// springt, während man sie abarbeitet.
function openTasks(){
  return (P.tasks||[]).filter(t=>!t.doneAt).sort((a,b)=>(a.d||'9999').localeCompare(b.d||'9999'));
}
function todayPlan(){
  const today = todayStr();
  let pl = P.plan, changed = false;
  if(!pl || pl.date !== today){ pl = {date:today, steps:[]}; changed = true; }
  if(pl.steps.length < 3 && !pl.full){
    const has = (k,id)=>pl.steps.some(s=>s.k===k && s.id===id);
    const cand = [];
    // 1. Aufgaben der Lehrkraft (höchstens zwei Schritte)
    let nTask = 0;
    openTasks().forEach(t=>t.items.forEach(x=>{ if(!x.done && nTask<2 && itemInfo(x.k,x.id)){ cand.push({k:x.k,id:x.id}); nTask++; } }));
    // 2. Fällige Wörter wiederholen
    if(srsDueList().length > 0) cand.push({k:'x', id:'review'});
    // 3. Grammatik: Schwerpunkt aus dem Sprach-Check, sonst nächstes offenes Thema
    const cls = P.cls || 7;
    const focusG = assessmentFocus().map(a=>a.id).find(id=>GRAMMAR.some(g=>g.id===id));
    const openG = t=>!(P.grammar[t.id] && P.grammar[t.id].completed);
    const nextG = GRAMMAR.find(t=>openG(t) && (t.cls||5) <= cls) || GRAMMAR.find(openG);
    if(focusG) cand.push({k:'g', id:focusG}); else if(nextG) cand.push({k:'g', id:nextG.id});
    // 4. Vokabeln: nächstes offenes Set der eigenen Klasse
    const openV = t=>!(P.vocab[t.id] && P.vocab[t.id].tested) && t.words && t.words.length;
    const nextV = VOCAB.find(t=>openV(t) && t.cls === cls) || VOCAB.find(openV);
    if(nextV) cand.push({k:'v', id:nextV.id});
    // 5. Lesen
    const nextR = READING.find(r=>!(P.reading||[]).includes(r.id));
    if(nextR) cand.push({k:'r', id:nextR.id});
    for(const c of cand){
      if(pl.steps.length >= 3) break;
      if(!has(c.k, c.id)){ pl.steps.push({k:c.k, id:c.id, xp:0, done:false}); changed = true; }
    }
    pl.full = true; changed = true;
  }
  if(changed){ P.plan = pl; save(); }
  return pl;
}
// Direkt ins Üben springen statt auf die Übersichtsseite des Themas:
//   Grammatik → beim ersten Mal die Themenseite (Observe → Regel → Übungen),
//               danach eine noch nicht bearbeitete Übung (leichteste zuerst)
//   Vokabeln  → Karteikarten beim ersten Mal, danach das Quiz
function launchItem(k, id){
  if(k==='x'){ startReview(); return; }
  if(k==='g'){
    const pool = GRAMMAR_POOL[id] || [];
    const hist = (P.gHistory||{})[id] || [];
    // Neues Thema: erst beobachten, dann Regel, dann Übungen (bewusst so).
    // Erst wenn schon geübt wurde, geht es direkt in die nächste Übung.
    if(!hist.length){ go('grammar-topic', id); return; }
    const doneIds = new Set(hist.map(h=>h.exId));
    const fresh = pool.filter(e=>!doneIds.has(e.id)).sort((a,b)=>(a.diff||1)-(b.diff||1));
    const ex = fresh[0] || pool[Math.floor(Math.random()*pool.length)];
    if(ex){ go('grammar-exercise', id, ex.id); return; }
    go('grammar-topic', id); return;
  }
  if(k==='v'){
    const seen = Object.keys(P.srs||{}).some(key=>key.indexOf(id+':')===0);
    startVocabMode(id, seen ? 'quiz' : 'flashcard'); return;
  }
  const info = itemInfo(k, id);
  if(info && info.route) go(info.route[0], info.route[1]); else go('home');
}
function planGo(i){
  const s = todayPlan().steps[i]; if(!s) return;
  launchItem(s.k, s.id);
}
// Der Start-Knopf: zum nächsten offenen Schritt; ist alles erledigt, eine freie 5-Minuten-Runde.
function startToday(){
  const pl = todayPlan();
  const i = pl.steps.findIndex(s=>!s.done);
  if(i >= 0) planGo(i); else startTimedSession(5);
}

function heroRing(pct){
  const r=24, c=2*Math.PI*r, off=c*(1-Math.min(100,pct)/100);
  return `<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style="flex-shrink:0">
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="7"/>
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="#FCD34D" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 32 32)"/>
    <text x="32" y="37" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${Math.round(Math.min(100,pct))}%</text>
  </svg>`;
}

// Der Kopf der Startseite: Begrüßung, Level, Tagesziel, Tagesplan, Start-Knopf.
function homeHeroHTML(){
  const lv = levelInfo(), dg = dailyXP(), goal = dailyGoal();
  const dgPct = Math.min(100, Math.round(dg/goal*100));
  const streak = currentStreak();
  const pl = todayPlan();
  const nextIdx = pl.steps.findIndex(s=>!s.done);
  const allDone = pl.steps.length > 0 && nextIdx < 0;
  const started = pl.steps.some(s=>s.done);
  const title = P.name ? T('home_title_name').replace('{name}', tEsc(P.name)) : T('home_title');
  const stepsHTML = pl.steps.map((s,i)=>{
    const info = itemInfo(s.k, s.id); if(!info) return '';
    const cls = s.done ? 'is-done' : (i===nextIdx ? 'is-next' : '');
    return `<button class="plan-step ${cls}" onclick="planGo(${i})">
      <span class="plan-dot">${s.done ? '✓' : (i+1)}</span>
      <span class="plan-icon">${info.icon}</span>
      <span class="plan-label">${tEsc(info.title)}</span>
    </button>`;
  }).join('');
  return `<section class="hero">
    <div class="hero-top">
      <button onclick="showProfile()" title="${T('profile_edit')}" aria-label="${T('profile_edit')}" class="hero-avatar">${P.avatar||'🙂'}</button>
      <div class="hero-greet">
        <h1>${title}</h1>
        <p>${T('home_level')||'Level'} ${lv.level} · ${P.xp||0} XP</p>
      </div>
      ${streak>=1 ? `<div class="hero-streak" title="${T('home_streak')}"><span class="hero-flame">🔥</span><strong>${streak}</strong><small>${T('home_streak')}</small></div>` : ''}
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-head"><span>🚀 ${T('home_level')||'Level'} ${lv.level}</span><span>${lv.inLevel}/${lv.need} XP</span></div>
        <div class="hero-bar"><div style="width:${Math.max(4,lv.pct)}%"></div></div>
        <p class="hero-stat-foot">${T('home_to_next')||'bis Level'} ${lv.level+1}</p>
      </div>
      <div class="hero-stat hero-stat-goal">
        ${heroRing(dgPct)}
        <div>
          <p class="hero-stat-title">${T('home_daily_goal')||'Tagesziel'}</p>
          <p class="hero-stat-foot">${dgPct>=100 ? '✓ '+(T('home_goal_done')||'Geschafft!') : dg+'/'+goal+' XP '+(T('home_today_label')||'heute')}</p>
        </div>
      </div>
    </div>
    <div class="hero-plan">
      <div class="hero-plan-head">
        <p>${allDone ? '🎉 '+T('today_done_title') : '🗺️ '+T('today_plan')}</p>
        <span>${pl.steps.filter(s=>s.done).length}/${pl.steps.length}</span>
      </div>
      <div class="plan-steps">${stepsHTML}</div>
      <button class="btn-start" onclick="startToday()">
        <span class="btn-start-icon">▶</span>
        <span>${allDone ? T('today_more') : (started ? T('today_continue') : T('today_start'))}</span>
      </button>
      ${allDone ? `<p class="hero-plan-note">${T('today_done_sub')}</p>` : ''}
    </div>
  </section>`;
}

// ── AUFGABEN DER LEHRKRAFT ──
// Link-Format: …/#aufgabe=<Base64 von {"v":1,"t":"Titel","d":"2026-11-20","i":["v:soul5b1","g:sp"]}>
function taskDecode(text){
  const m = String(text||'').match(/aufgabe=([A-Za-z0-9_\-]+)/);
  if(!m) return null;
  try{
    const b64 = m[1].replace(/-/g,'+').replace(/_/g,'/');
    const d = JSON.parse(decodeURIComponent(escape(atob(b64))));
    if(!d || !Array.isArray(d.i)) return null;
    const items = [];
    d.i.forEach(s=>{
      const mm = String(s).match(/^([vgrlwi]):([\w-]{1,40})$/);
      if(mm && itemInfo(mm[1], mm[2]) && !items.some(x=>x.k===mm[1]&&x.id===mm[2])) items.push({k:mm[1], id:mm[2], xp:0, done:false});
    });
    if(!items.length) return null;
    let h = 5381; for(let i=0;i<m[1].length;i++) h = ((h*33) ^ m[1].charCodeAt(i)) >>> 0;
    return {
      id: 't'+h.toString(36),
      t: String(d.t||'').slice(0,60),
      d: /^\d{4}-\d\d-\d\d$/.test(d.d||'') ? d.d : '',
      items
    };
  }catch(e){ return null; }
}
// Rückgabe: 'added' | 'exists' | 'invalid'
function taskImport(text, quiet){
  const t = taskDecode(text);
  if(!t){ if(!quiet) showToast(T('task_add_invalid'), 4000); return 'invalid'; }
  if(!P.tasks) P.tasks = [];
  if(P.tasks.some(x=>x.id===t.id)){ if(!quiet) showToast(T('task_exists'), 3500); return 'exists'; }
  t.added = todayStr();
  P.tasks.push(t);
  if(P.tasks.length > 20) P.tasks = P.tasks.slice(-20);
  // Tagesplan neu füllen: erledigte Schritte bleiben, die neue Aufgabe rückt nach vorn.
  if(P.plan && P.plan.date === todayStr()){
    P.plan.steps = P.plan.steps.filter(s=>s.done);
    P.plan.full = false;
  }
  save();
  if(!quiet) showToast('📌 '+T('task_added'), 4000);
  return 'added';
}
// Beim Start: Wurde die App über einen Aufgaben-Link geöffnet?
function consumeBootTask(quiet){
  if(!_bootTaskHash) return false;
  return taskImport(_bootTaskHash, quiet) === 'added';
}
// Link wird geöffnet, während die App schon läuft.
window.addEventListener('hashchange', ()=>{
  if((location.hash||'').indexOf('#aufgabe=') !== 0) return;
  const h = location.hash;
  taskImport(h, !P.onboarded);
  if(P.onboarded) go('home');
});

function taskTick(taskId, idx){
  const t = (P.tasks||[]).find(x=>x.id===taskId); if(!t) return;
  const x = t.items[idx]; if(!x || x.done==='auto') return;
  x.done = x.done ? false : 'self';
  const all = t.items.every(i=>i.done);
  t.doneAt = all ? todayStr() : '';
  save();
  if(all){ confettiBurst(45); showToast('✅ '+T('task_done_toast'), 4000); }
  go('home');
}
function taskRemove(taskId){
  if(!confirm(T('task_remove_confirm'))) return;
  P.tasks = (P.tasks||[]).filter(x=>x.id!==taskId);
  save(); go('home');
}
function taskGo(k, id){ launchItem(k, id); }

// ── STARTSEITE: Bereiche und Schwerpunkte ──
// Sechs große Kacheln ersetzen die frühere Linkliste.
function areaTilesHTML(){
  const gs = grammarStats();
  const words = VOCAB.reduce((s,t)=>s+(((P.vocab[t.id]||{}).known)||[]).length, 0);
  const due = srsDueList().length;
  const tiles = [
    {icon:'📚', label:T('label_grammar'),  sub:gs.done+'/'+GRAMMAR.length,                 go:"go('grammar')",        c:'blue'},
    {icon:'🔤', label:T('label_vocab'),    sub:words+' '+T('label_words'),                  go:"go('vocabulary')",     c:'green'},
    {icon:'📖', label:T('nav_reading'),    sub:(P.reading||[]).length+'/'+READING.length,   go:"go('reading-list')",   c:'violet'},
    {icon:'✏️', label:T('nav_writing'),    sub:(P.writing||[]).length+'/'+WRITING.length,   go:"go('writing-list')",   c:'pink'},
    {icon:'🎧', label:T('area_listening'), sub:(P.listening||[]).length+'/'+LISTENING.length, go:"go('listening-list')", c:'cyan'},
    {icon:'🎮', label:T('nav_games'),      sub:'',                                          go:"go('spiele')",         c:'amber'},
  ];
  return `<div class="area-grid">
    ${tiles.map(t=>`<button class="area-tile tone-${t.c}" onclick="${t.go}">
      <span class="area-icon">${t.icon}</span>
      <span class="area-label">${t.label}</span>
      ${t.sub?`<span class="area-sub">${t.sub}</span>`:''}
    </button>`).join('')}
  </div>
  <div class="quick-row">
    <button onclick="startReview()">🔁 ${T('nav_review')}${due>0?` <b>${due}</b>`:''}</button>
    <button onclick="go('irreg','list')">📋 ${T('nav_irreg')}</button>
    <button onclick="go('practice')">⚡ ${T('nav_practice')}</button>
    <button onclick="go('lernweg')">📈 ${T('nav_progress')}</button>
  </div>`;
}
// Schwerpunkte aus dem Sprach-Check und häufige Fehler in einer Karte.
function focusCardHTML(){
  const focus = assessmentFocus();
  const weak = getWeakAreas();
  if(!focus.length && !weak.length) return '';
  const seen = new Set();
  const chips = [];
  focus.forEach(t=>{
    seen.add(t.title);
    chips.push(`<button onclick="go('${t.route[0]}'${t.route[1]?`,'${t.route[1]}'`:''})">${tEsc(t.title)}</button>`);
  });
  weak.forEach(a=>{
    const plain = a.label.replace(/^\S+\s/, '');
    if(seen.has(plain)) return;
    chips.push(`<button onclick="${a.link}">${tEsc(a.label)} <b>${a.count}×</b></button>`);
  });
  return `<div class="card focus-card">
    <div class="focus-head"><span>🎯</span><div><h2>${T('home_focus_title')}</h2><p>${T('home_focus_short')}</p></div></div>
    <div class="focus-chips">${chips.join('')}</div>
  </div>`;
}
// Höchstens ein Hinweis gleichzeitig (Installation vor Sicherung vor Sprach-Check).
function oneNudgeHTML(){
  return installNudgeHTML() || backupNudgeHTML() || checkNudgeHTML();
}
function taskDueChip(t){
  if(!t.d) return '';
  const days = Math.round((new Date(t.d) - new Date(todayStr()))/86400000);
  const date = t.d.slice(8,10)+'.'+t.d.slice(5,7)+'.';
  let cls = 'due-ok', txt = T('task_days_left').replace('{n}', days);
  if(days < 0){ cls = 'due-late'; txt = T('task_overdue'); }
  else if(days === 0){ cls = 'due-today'; txt = T('task_due_today'); }
  else if(days === 1){ txt = T('task_day_left'); }
  return `<span class="task-due ${cls}">⏰ ${T('task_due')} ${date} · ${txt}</span>`;
}
function tasksHTML(){
  const today = todayStr();
  // Offene Aufgaben + frisch erledigte (noch 2 Tage sichtbar)
  const list = (P.tasks||[]).filter(t=>!t.doneAt || (new Date(today)-new Date(t.doneAt)) < 2*86400000);
  const cards = list.map(t=>{
    const done = t.items.filter(x=>x.done).length;
    const pct = Math.round(done/t.items.length*100);
    const rows = t.items.map((x,i)=>{
      const info = itemInfo(x.k, x.id); if(!info) return '';
      const part = x.done ? 100 : Math.min(90, Math.round((x.xp||0)/info.need*100));
      return `<div class="task-row ${x.done?'is-done':''}">
        <button class="task-check" onclick="taskTick('${t.id}',${i})" ${x.done==='auto'?'disabled':''} title="${T('task_tick')}" aria-label="${T('task_tick')}">${x.done?'✓':''}</button>
        <span class="task-icon">${info.icon}</span>
        <div class="task-main">
          <p>${tEsc(info.title)}</p>
          ${!x.done && part>0 ? `<div class="task-mini"><div style="width:${part}%"></div></div>` : ''}
        </div>
        ${x.done ? '' : `<button class="task-go" onclick="taskGo('${x.k}','${x.id}')">${T('task_go')} →</button>`}
      </div>`;
    }).join('');
    return `<div class="card task-card ${t.doneAt?'is-done':''}">
      <div class="task-head">
        <div class="task-pin">${t.doneAt?'🏆':'📌'}</div>
        <div style="flex:1;min-width:0">
          <p class="task-kicker">${T('task_card_title')}</p>
          <h2>${tEsc(t.t || T('task_untitled'))}</h2>
        </div>
        ${t.doneAt ? `<span class="task-due due-done">✓ ${T('task_done')}</span>` : taskDueChip(t)}
      </div>
      <div class="progress-bar-outer" style="margin:.75rem 0 .5rem"><div class="progress-bar-inner" style="width:${pct}%;background:#16A34A"></div></div>
      ${rows}
      <div class="task-foot">
        <span>${done}/${t.items.length} ${T('label_done_of')}</span>
        <button onclick="taskRemove('${t.id}')">${T('task_remove')}</button>
      </div>
    </div>`;
  }).join('');
  return `${cards}
    <div class="task-add-row"><button onclick="showTaskAdd()">📎 ${T('task_add')}</button></div>`;
}

// Für installierte Apps: Links öffnen sich auf dem iPad in Safari, nicht in
// der App. Deshalb kann man den Link hier auch einfügen.
function showTaskAdd(){
  if(document.getElementById('task-add-popup')) return;
  const ov = document.createElement('div');
  ov.id = 'task-add-popup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:1.25rem';
  ov.onclick = (e)=>{ if(e.target===ov) ov.remove(); };
  const canPaste = !!(navigator.clipboard && navigator.clipboard.readText);
  ov.innerHTML = `<div class="sheet">
    <div style="font-size:2.2rem;text-align:center">📎</div>
    <h2 style="font-size:1.15rem;font-weight:800;color:#0F172A;text-align:center;margin:.2rem 0 .3rem">${T('task_add_title')}</h2>
    <p style="font-size:.86rem;color:#64748B;text-align:center;margin-bottom:.9rem">${T('task_add_sub')}</p>
    <div style="display:flex;gap:.5rem">
      <input id="task-link-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${T('task_add_ph')}" class="field" style="flex:1;min-width:0">
      ${canPaste ? `<button class="btn-secondary" onclick="taskPaste()">${T('task_add_paste')}</button>` : ''}
    </div>
    <p id="task-add-err" style="display:none;font-size:.8rem;color:#DC2626;margin-top:.5rem">${T('task_add_invalid')}</p>
    <div style="display:flex;gap:.5rem;margin-top:1rem">
      <button class="btn-secondary" style="flex:1" onclick="document.getElementById('task-add-popup').remove()">${T('task_cancel')}</button>
      <button class="btn-primary" style="flex:2" onclick="taskAddSubmit()">${T('task_add_btn')}</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  const inp = document.getElementById('task-link-input');
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter') taskAddSubmit(); });
  inp.focus();
}
function taskPaste(){
  navigator.clipboard.readText().then(txt=>{
    const inp = document.getElementById('task-link-input'); if(inp) inp.value = txt||'';
  }).catch(()=>{});
}
function taskAddSubmit(){
  const inp = document.getElementById('task-link-input'); if(!inp) return;
  const res = taskImport(inp.value, true);
  if(res === 'invalid'){ document.getElementById('task-add-err').style.display = 'block'; return; }
  document.getElementById('task-add-popup').remove();
  showToast(res==='exists' ? T('task_exists') : '📌 '+T('task_added'), 4000);
  go('home');
}
