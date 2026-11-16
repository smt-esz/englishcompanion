// ═══════════════════════════════════════════════
// SPACED REPETITION (Leitner-System)
// Jedes geübte Wort bekommt ein "Fach" (1–5). Richtig beantwortet →
// ein Fach höher, falsch → zurück in Fach 1. Je höher das Fach,
// desto später wird das Wort wieder fällig (1/3/7/14/30 Tage).
// Gespeichert in P.srs unter "topicId:wortIndex" → {b:Fach, d:Fälligkeitsdatum}.
// ═══════════════════════════════════════════════
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30]; // Tage bis zur Wiederholung, Index = Fach

function srsAddDays(n){ return new Date(Date.now()+n*86400000).toISOString().slice(0,10); }

// Auch die unregelmäßigen Verben folgen der Box-Logik ('irreg' als Pseudo-Thema)
function srsWordList(topicId){
  if(topicId==='irreg') return IRREG;
  const t = VOCAB.find(v=>v.id===topicId);
  return t ? t.words : null;
}
function srsUpdate(topicId, wordRef, correct){
  const list = srsWordList(topicId); if(!list) return;
  const idx = list.indexOf(wordRef); if(idx < 0) return;
  srsUpdateAt(topicId, idx, correct);
}
function srsUpdateAt(topicId, idx, correct){
  if(!P.srs) P.srs = {};
  const k = topicId+':'+idx;
  const e = P.srs[k] || {b:0};
  e.b = correct ? Math.min(5, (e.b||0)+1) : 1;
  e.d = srsAddDays(SRS_INTERVALS[e.b]);
  P.srs[k] = e;
  // Klare Regel: Fach 5 erreicht (5× richtig über Tage verteilt) =
  // Wort sitzt → automatisch als gelernt (✅) abhaken.
  if(e.b === 5){
    if(topicId==='irreg'){
      if(!P.irreg) P.irreg = [];
      if(!P.irreg.includes(idx)) P.irreg.push(idx);
    } else {
      if(!P.vocab[topicId]) P.vocab[topicId] = {known:[]};
      if(!P.vocab[topicId].known) P.vocab[topicId].known = [];
      if(!P.vocab[topicId].known.includes(idx)) P.vocab[topicId].known.push(idx);
    }
  }
  save();
}

// Alle heute (oder früher) fälligen Wörter (inkl. unregelmäßiger Verben)
function srsDueList(){
  if(!P.srs) return [];
  const today = new Date().toISOString().slice(0,10);
  const due = [];
  for(const k in P.srs){
    const e = P.srs[k];
    if(!e || !e.d || e.d > today) continue;
    const ci = k.lastIndexOf(':');
    const topicId = k.slice(0,ci), idx = parseInt(k.slice(ci+1),10);
    let w = null;
    if(topicId==='irreg'){
      const v = IRREG[idx];
      if(v) w = {en:'to '+v.inf, de:v.de, _irregForms:v.past+' – '+v.pp};
    } else {
      const t = VOCAB.find(v=>v.id===topicId);
      w = t && t.words[idx];
    }
    if(w) due.push({topicId, idx, w, box:e.b||1});
  }
  return due;
}

// ── Wiederholungs-Session ──
let _rev = null;

function startReview(){
  const due = [...srsDueList()].sort(()=>Math.random()-.5).slice(0,15);
  // Optionen pro Frage einmal vorbereiten (nicht bei jedem Rendern neu mischen)
  const items = due.map(d=>{
    let pool, topicTitle;
    if(d.topicId==='irreg'){
      pool = IRREG.map(v=>({en:'to '+v.inf, de:v.de}));
      topicTitle = T('nav_irreg');
    } else {
      const t = VOCAB.find(v=>v.id===d.topicId);
      pool = t.words;
      topicTitle = t.title;
    }
    const seenDe = new Set([d.w.de]);
    const wrong = [...pool].sort(()=>Math.random()-.5).filter(x=>{
      if(x.en===d.w.en || seenDe.has(x.de)) return false;
      seenDe.add(x.de); return true;
    }).slice(0,3);
    const opts = [...wrong.map(x=>x.de), d.w.de].sort(()=>Math.random()-.5);
    return {...d, opts, correct: opts.indexOf(d.w.de), topicTitle};
  });
  _rev = {items, idx:0, score:0, done:false, answered:false};
  go('review');
}

function renderReview(){
  const dueCount = srsDueList().length;
  if(!_rev || !_rev.items.length){
    return `<div class="space-y-5">
      <div style="display:flex;align-items:center;gap:1rem">
        <button onclick="go('home')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${T('nav_home')}</button>
        <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('review_title')}</h1>
      </div>
      <div class="card" style="text-align:center;padding:2rem">
        <div style="font-size:3rem">${dueCount>0?'🔁':'🌟'}</div>
        ${dueCount>0
          ? `<p style="font-weight:700;color:#1E293B;margin:.5rem 0">${dueCount} ${T('review_due_words')}</p>
             <button class="btn-primary" onclick="startReview()">${T('review_start')}</button>`
          : `<p style="font-weight:700;color:#1E293B;margin:.5rem 0">${T('review_none')}</p>
             <p style="font-size:.85rem;color:#64748B;margin-bottom:1rem">${T('review_none_sub')}</p>
             <button class="btn-primary" onclick="go('vocabulary')">${T('nav_vocab')}</button>`}
      </div>
    </div>`;
  }
  if(_rev.done){
    const pct = Math.round(_rev.score/_rev.items.length*100);
    return `<div class="card space-y-4" style="text-align:center;padding:2rem">
      <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
      <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B">${pct>=80?T('ex_result_excellent'):pct>=60?T('ex_result_good'):T('ex_result_practice')}</h2>
      <div style="font-size:2rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${_rev.score}/${_rev.items.length}</div>
      ${pb(pct,'#0EA5E9')}
      <p style="font-size:.82rem;color:#64748B">${T('review_done_sub')}</p>
      <div style="display:flex;gap:.75rem;justify-content:center">
        ${srsDueList().length>0?`<button class="btn-primary" onclick="startReview()">${T('review_more')}</button>`:''}
        <button class="btn-secondary" onclick="go('home')">${T('nav_home')}</button>
      </div>
    </div>`;
  }
  const it = _rev.items[_rev.idx];
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('home')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${T('nav_home')}</button>
      <h1 style="font-size:1.3rem;font-weight:800;color:#1E293B;flex:1">${T('review_title')}</h1>
      <span style="font-size:.85rem;color:#94A3B8">${_rev.idx+1}/${_rev.items.length}</span>
    </div>
    ${pb((_rev.idx/_rev.items.length)*100,'#0EA5E9')}
    <div class="card space-y-4">
      <p style="font-size:.72rem;color:#94A3B8;font-weight:600;text-transform:uppercase;letter-spacing:.05em">${it.topicTitle} · ${T('review_box')} ${it.box}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.75rem 0">
        <p style="font-weight:700;color:#1E293B;font-size:1.15rem">${it.w.en}</p>
        ${speakBtn(escQ(it.w.en))}
      </div>
      <div id="rev-opts">
        ${it.opts.map((o,oi)=>`<button class="opt-btn" id="revopt-${oi}" onclick="revPick(${oi})">${o}</button>`).join('')}
      </div>
      <div id="rev-feedback"></div>
    </div>
  </div>`;
}

function revPick(oi){
  if(_rev.answered) return;
  _rev.answered = true;
  const it = _rev.items[_rev.idx];
  const right = oi === it.correct;
  if(right) _rev.score++;
  srsUpdateAt(it.topicId, it.idx, right);
  document.querySelectorAll('#rev-opts .opt-btn').forEach(b=>b.disabled=true);
  const btn = document.getElementById('revopt-'+oi);
  if(btn) btn.className = right?'opt-btn opt-correct':'opt-btn opt-wrong';
  if(!right){
    const cb = document.getElementById('revopt-'+it.correct);
    if(cb) cb.className = 'opt-btn opt-correct';
  }
  const fb = document.getElementById('rev-feedback');
  if(fb) fb.innerHTML = (right
    ? `<div class="feedback-ok">${T('feedback_ok')} ${it.box<5?T('review_box_up'):''}</div>`
    : `<div class="feedback-err">${T('feedback_wrong')} <strong>${it.w.de}</strong>${it.w._irregForms?` <span style="font-size:.82rem;color:#B45309">(${it.w._irregForms})</span>`:''}<br><span style="font-size:.82rem">${T('review_box_down')}</span></div>`)
    + `<button class="btn-primary" style="margin-top:.75rem" onclick="revNext()">${_rev.idx+1<_rev.items.length?T('btn_next'):T('ex_show_result')}</button>`;
}

function revNext(){
  _rev.idx++;
  _rev.answered = false;
  if(_rev.idx >= _rev.items.length){
    _rev.done = true;
    addXP(Math.max(5, _rev.score));
    checkBadges(); save();
  }
  go('review');
}

