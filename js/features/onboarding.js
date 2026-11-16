// ═══════════════════════════════════════════════
// ONBOARDING + SPRACH-CHECK
// Beim ersten Öffnen verpflichtend: Name + Avatar → Klasse → Einstufungs-
// Check (2 Fragen je Grammatikthema). Ergebnis wird in P.assessments
// gespeichert und kann später als "Zwischenstand" wiederholt werden –
// so wird die Entwicklung sichtbar.
// ═══════════════════════════════════════════════
let _ob = null;

// Die Check-Bereiche: alle Grammatikthemen + Vokabular + Hörverstehen.
// route = wohin die Schwerpunkt-Buttons führen.
function assessmentAreas(){
  return [
    ...GRAMMAR.map(t=>({id:t.id, title:t.title, route:['grammar-topic',t.id]})),
    {id:'vocab', title:T('area_vocab'), route:['vocabulary']},
    {id:'listening', title:T('area_listening'), route:['listening-list']}
  ];
}

function buildAssessmentQuestions(){
  const qs = [];
  // 1) Grammatik: 2 Fragen je Thema
  GRAMMAR.forEach(t=>{
    const pool = [
      ...t.exercises.filter(e=>e.type==='mc').flatMap(e=>e.questions||[]),
      ...((typeof GRAMMAR_POOL!=='undefined' && GRAMMAR_POOL[t.id])||[]).filter(e=>e.type==='mc').flatMap(e=>e.questions||[])
    ];
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    pool.slice(0,2).forEach(q=>qs.push({kind:'grammar', topic:t.id, title:t.title, q}));
  });
  // 2) Vokabular: 5 Wörter aus dem Grundwortschatz (EN → DE wählen)
  const basics = VOCAB.filter(t=>t.cat==='basics' && t.words.length>=4);
  const usedEn = new Set();
  const shuffledB = [...basics].sort(()=>Math.random()-.5);
  for(let i=0; i<5 && shuffledB.length; i++){
    const t = shuffledB[i % shuffledB.length];
    const candidates = t.words.filter(w=>!usedEn.has(w.en));
    if(!candidates.length) continue;
    const w = candidates[Math.floor(Math.random()*candidates.length)];
    usedEn.add(w.en);
    const seenDe = new Set([w.de]);
    const wrong = [...t.words].sort(()=>Math.random()-.5).filter(x=>{
      if(x.en===w.en || seenDe.has(x.de)) return false; seenDe.add(x.de); return true;
    }).slice(0,3);
    const opts = [...wrong.map(x=>x.de), w.de].sort(()=>Math.random()-.5);
    qs.push({kind:'vocab', topic:'vocab', topicId:t.id, w, title:T('area_vocab'), q:{q:w.en, opts, correct:opts.indexOf(w.de)}});
  }
  // 3) Hörverstehen: 2× Wort anhören und aus 4 ähnlichen wählen
  for(let i=0; i<2 && shuffledB.length; i++){
    const t = shuffledB[(i+3) % shuffledB.length];
    const candidates = t.words.filter(w=>!usedEn.has(w.en) && w.en.length<=24);
    if(candidates.length<4) continue;
    const w = candidates[Math.floor(Math.random()*candidates.length)];
    usedEn.add(w.en);
    const wrong = candidates.filter(x=>x.en!==w.en).sort(()=>Math.random()-.5).slice(0,3);
    const opts = [...wrong.map(x=>x.en), w.en].sort(()=>Math.random()-.5);
    qs.push({kind:'listen', topic:'listening', topicId:t.id, w, title:T('area_listening'), text:w.en, q:{q:'', opts, correct:opts.indexOf(w.en)}});
  }
  for(let i=qs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[qs[i],qs[j]]=[qs[j],qs[i]];}
  return qs;
}

// mode 'full' = erstes Öffnen (Name+Avatar+Klasse+Check) · 'check' = nur Zwischenstand
function startOnboarding(mode){
  _ob = { mode: mode||'full', step: mode==='check'?3:1,
    name: P.name||'', avatar: P.avatar||'', cls: P.cls||0,
    questions: buildAssessmentQuestions(), qIdx: 0, right: 0, perTopic: {}, answered: false };
  renderOnboarding();
}

function renderOnboarding(){
  let ov = document.getElementById('onboarding-popup');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'onboarding-popup';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:1rem';
    document.body.appendChild(ov);
  }
  ov.innerHTML = `<div style="background:#fff;border-radius:1.1rem;max-width:26rem;width:100%;padding:1.4rem;box-shadow:0 12px 40px rgba(0,0,0,.3);max-height:90vh;overflow-y:auto">${obStepHTML()}</div>`;
}

function obStepHTML(){
  const s = _ob;
  if(s.step===1){
    return `<div style="text-align:center;font-size:2.2rem;margin-bottom:.3rem">👋</div>
      <h2 style="font-size:1.2rem;font-weight:800;color:#1E293B;text-align:center;margin-bottom:.3rem">${T('ob_welcome_title')}</h2>
      <p style="font-size:.85rem;color:#64748B;text-align:center;margin-bottom:1rem">${T('ob_welcome_sub')}</p>
      <label style="font-size:.82rem;font-weight:700;color:#475569;display:block;margin-bottom:.3rem">${T('profile_name_label')}</label>
      <input id="ob-name" type="text" maxlength="20" value="${(s.name||'').replace(/"/g,'&quot;')}" placeholder="${T('profile_name_ph')}"
        style="width:100%;border:1.5px solid #E2E8F0;border-radius:.75rem;padding:.55rem .75rem;font-size:.95rem;outline:none;box-sizing:border-box;margin-bottom:1rem">
      <p style="font-size:.82rem;font-weight:700;color:#475569;margin-bottom:.4rem">${T('profile_avatar_label')}</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.4rem;margin-bottom:1rem">
        ${avatarsUnlocked().map(a=>`<button onclick="obPickAvatar('${a}')" data-av="${a}" style="font-size:1.5rem;padding:.35rem;border-radius:.7rem;cursor:pointer;background:${a===s.avatar?'#DBEAFE':'#F8FAFC'};border:2px solid ${a===s.avatar?'#3B82F6':'#E2E8F0'}">${a}</button>`).join('')}
      </div>
      <p id="ob-name-hint" style="display:none;font-size:.8rem;color:#DC2626;margin-bottom:.5rem">${T('ob_name_required')}</p>
      <button class="btn-primary" style="width:100%" onclick="obNext1()">${T('btn_next')}</button>
      ${s.mode==='full' ? `<button onclick="document.getElementById('ob-import-file').click()" style="width:100%;margin-top:.7rem;background:none;border:none;color:#2563EB;font-size:.82rem;font-weight:600;cursor:pointer;text-decoration:underline">${T('ob_restore_link')}</button>
      <input id="ob-import-file" type="file" accept="application/json,.json" style="display:none" onchange="importProgress(this, true)">` : ''}`;
  }
  if(s.step===2){
    return `<div style="text-align:center;font-size:2.2rem;margin-bottom:.3rem">🏫</div>
      <h2 style="font-size:1.2rem;font-weight:800;color:#1E293B;text-align:center;margin-bottom:.3rem">${T('ob_cls_title')}</h2>
      <p style="font-size:.85rem;color:#64748B;text-align:center;margin-bottom:1.25rem">${T('ob_cls_sub')}</p>
      <div style="display:flex;gap:.75rem">
        <button onclick="obSetCls(5)" style="flex:1;padding:1.1rem .5rem;border-radius:.9rem;border:2px solid #BFDBFE;background:#EFF6FF;font-size:1.05rem;font-weight:800;color:#1E40AF;cursor:pointer">${T('vocab_k5')}</button>
        <button onclick="obSetCls(6)" style="flex:1;padding:1.1rem .5rem;border-radius:.9rem;border:2px solid #FDE68A;background:#FFFBEB;font-size:1.05rem;font-weight:800;color:#92400E;cursor:pointer">${T('vocab_k6')}</button>
        <button onclick="obSetCls(7)" style="flex:1;padding:1.1rem .5rem;border-radius:.9rem;border:2px solid #DDD6FE;background:#F5F3FF;font-size:1.05rem;font-weight:800;color:#5B21B6;cursor:pointer">${T('vocab_k7')}</button>
      </div>
      <p style="font-size:.75rem;color:#94A3B8;margin-top:.6rem;text-align:center">${T('ob_cls7_hint')}</p>`;
  }
  if(s.step===3){
    const item = s.questions[s.qIdx];
    if(!item){ s.step=4; return obStepHTML(); }
    return `<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem">
        <span style="font-size:1.4rem">🧭</span>
        <div style="flex:1">
          <p style="font-weight:800;color:#1E293B;font-size:.95rem">${T('ob_check_title')}</p>
          <p style="font-size:.75rem;color:#94A3B8">${s.qIdx+1}/${s.questions.length} · ${item.title}</p>
        </div>
      </div>
      ${pb((s.qIdx/s.questions.length)*100,'#8B5CF6')}
      ${s.qIdx===0&&!s.answered?`<p style="font-size:.8rem;color:#64748B;background:#F5F3FF;border-radius:.5rem;padding:.5rem .7rem;margin:.6rem 0">${T('ob_check_sub')}</p>`:''}
      ${item.kind==='listen'
        ? `<div style="text-align:center;margin:.75rem 0">
             <p style="font-weight:700;color:#1E293B;font-size:.95rem;margin-bottom:.5rem">${T('ob_listen_prompt')}</p>
             <button onclick="speak('${escQ(item.text)}','en-GB')" style="font-size:2rem;background:#EFF6FF;border:2px solid #93C5FD;border-radius:50%;width:4.2rem;height:4.2rem;cursor:pointer" title="${T('listen_play')}">🔊</button>
           </div>`
        : item.kind==='vocab'
        ? `<p style="font-weight:700;color:#1E293B;font-size:1rem;line-height:1.4;margin:.75rem 0">${T('ob_vocab_prompt')} <strong>${item.q.q}</strong> ${speakBtn(escQ(item.q.q))}</p>`
        : `<p style="font-weight:700;color:#1E293B;font-size:1rem;line-height:1.4;margin:.75rem 0">${item.q.q}</p>`}
      <div id="ob-opts">
        ${item.q.opts.map((o,oi)=>`<button class="opt-btn" id="obopt-${oi}" onclick="obAnswer(${oi})">${o}</button>`).join('')}
      </div>
      <div id="ob-feedback"></div>`;
  }
  // Schritt 4: Ergebnis
  const total = s.questions.length;
  const pct = total>0 ? Math.round(s.right/total*100) : 0;
  const rows = assessmentAreas().map(t=>{
    const r = s.perTopic[t.id]||{right:0,total:0};
    if(r.total===0) return '';
    const tp = Math.round(r.right/r.total*100);
    return `<div style="margin-bottom:.5rem">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.15rem">
        <span style="font-weight:600;color:#334155">${t.title}</span>
        <span style="color:${tp>=60?'#059669':'#DC2626'};font-weight:700">${r.right}/${r.total}</span>
      </div>
      ${pb(tp, tp>=60?'#10B981':'#F59E0B')}
    </div>`;
  }).join('');
  const focus = assessmentAreas().filter(t=>{ const r=s.perTopic[t.id]; return r&&r.total>0&&(r.right/r.total)<0.6; });
  return `<div style="text-align:center;font-size:2.2rem;margin-bottom:.3rem">${pct>=80?'🏆':pct>=50?'💪':'🌱'}</div>
    <h2 style="font-size:1.2rem;font-weight:800;color:#1E293B;text-align:center;margin-bottom:.2rem">${T('ob_result_title')}</h2>
    <p style="font-size:1.6rem;font-weight:800;text-align:center;color:${pct>=60?'#10B981':'#F59E0B'};margin-bottom:.75rem">${pct}%</p>
    <div style="background:#F8FAFC;border-radius:.75rem;padding:.75rem;margin-bottom:.75rem">${rows}</div>
    ${focus.length?`<div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:.75rem;padding:.7rem .8rem;margin-bottom:.9rem">
      <p style="font-size:.82rem;font-weight:700;color:#92400E;margin-bottom:.25rem">🎯 ${T('ob_focus_label')}</p>
      <p style="font-size:.82rem;color:#B45309">${focus.map(t=>t.title).join(' · ')}</p>
    </div>`:`<p style="font-size:.85rem;color:#059669;font-weight:600;text-align:center;margin-bottom:.9rem">${T('ob_allgood')}</p>`}
    <button class="btn-primary" style="width:100%" onclick="finishOnboarding()">${T('ob_start_btn')}</button>`;
}

let _obPendingAvatar = null;
function obPickAvatar(a){
  _ob.avatar = a;
  document.querySelectorAll('#onboarding-popup [data-av]').forEach(b=>{
    const sel = b.getAttribute('data-av')===a;
    b.style.background = sel?'#DBEAFE':'#F8FAFC';
    b.style.borderColor = sel?'#3B82F6':'#E2E8F0';
  });
}
function obNext1(){
  const inp = document.getElementById('ob-name');
  const name = (inp?inp.value:'').trim();
  if(name.length < 2){ const h=document.getElementById('ob-name-hint'); if(h)h.style.display='block'; return; }
  _ob.name = name.slice(0,20);
  if(!_ob.avatar) _ob.avatar = AVATARS[0];
  _ob.step = 2;
  renderOnboarding();
}
function obSetCls(c){ _ob.cls = c; _ob.step = 3; renderOnboarding(); }
function obAnswer(oi){
  const s = _ob;
  if(s.answered) return;
  s.answered = true;
  const item = s.questions[s.qIdx];
  const right = oi === item.q.correct;
  if(right) s.right++;
  if(!s.perTopic[item.topic]) s.perTopic[item.topic] = {right:0,total:0};
  s.perTopic[item.topic].total++;
  if(right) s.perTopic[item.topic].right++;
  // Der Check füttert das Training: Fehler landen in "Noch üben",
  // Vokabeln wandern in den Leitner-Wiederholungsplan.
  if(!right){
    if(!P.errors) P.errors = {};
    if(item.kind==='grammar'){ const k='grammar:'+item.topic; P.errors[k]=(P.errors[k]||0)+1; }
    if(item.kind==='vocab' || item.kind==='listen'){ const k='vocab:'+item.topicId; P.errors[k]=(P.errors[k]||0)+1; }
  }
  if((item.kind==='vocab' || item.kind==='listen') && item.w) srsUpdate(item.topicId, item.w, right);
  document.querySelectorAll('#ob-opts .opt-btn').forEach(b=>b.disabled=true);
  const btn = document.getElementById('obopt-'+oi);
  if(btn) btn.className = right?'opt-btn opt-correct':'opt-btn opt-wrong';
  if(!right){ const cb=document.getElementById('obopt-'+item.q.correct); if(cb) cb.className='opt-btn opt-correct'; }
  const fb = document.getElementById('ob-feedback');
  if(fb) fb.innerHTML = `<button class="btn-primary" style="width:100%;margin-top:.6rem" onclick="obNextQ()">${s.qIdx+1<s.questions.length?T('btn_next'):T('ex_show_result')}</button>`;
}
function obNextQ(){
  _ob.qIdx++;
  _ob.answered = false;
  if(_ob.qIdx >= _ob.questions.length) _ob.step = 4;
  renderOnboarding();
}
function finishOnboarding(){
  const s = _ob;
  if(s.mode==='full'){
    P.name = s.name; P.avatar = s.avatar;
    if(s.cls) P.cls = s.cls;
  }
  const total = s.questions.length;
  if(!P.assessments) P.assessments = [];
  P.assessments.push({ date: new Date().toISOString().slice(0,10),
    pct: total>0?Math.round(s.right/total*100):0, perTopic: s.perTopic });
  if(P.assessments.length > 12) P.assessments.shift();
  P.onboarded = true;
  addXP(10); checkBadges(); save();
  _ob = null;
  const ov = document.getElementById('onboarding-popup'); if(ov) ov.remove();
  go(_state && _state.section==='lernweg' ? 'lernweg' : 'home');
}
// Letzter Check: Bereiche unter 60 % (für die Schwerpunkt-Karte auf der Startseite)
function assessmentFocus(){
  const a = (P.assessments||[])[P.assessments?P.assessments.length-1:0];
  if(!a) return [];
  return assessmentAreas().filter(t=>{ const r=a.perTopic[t.id]; return r&&r.total>0&&(r.right/r.total)<0.6; });
}

function getWeakAreas(){
  const errors = P.errors || {};
  return Object.entries(errors)
    .map(([key, count]) => {
      const [type, id] = key.split(':');
      let label = '', link = '';
      if(type === 'grammar'){
        const t = GRAMMAR.find(g=>g.id===id);
        label = t ? '📚 ' + t.title : ''; link = `go('grammar-topic','${id}')`;
      } else if(type === 'vocab'){
        const t = VOCAB.find(v=>v.id===id);
        label = t ? '🔤 ' + t.title : ''; link = `go('vocab-topic','${id}')`;
      }
      return {label, count, link};
    })
    .filter(a => a.label)
    .sort((a,b) => b.count - a.count)
    .slice(0, 3);
}

function renderHome(){
  const gs = grammarStats();
  const vocabDone = Object.values(P.vocab).filter(v=>v.tested).length;
  const totalDone = gs.done + vocabDone + P.reading.length + P.writing.length + P.listening.length;
  const totalAll = GRAMMAR.length + VOCAB.length + READING.length + WRITING.length + LISTENING.length;
  const pct = Math.round(totalDone/Math.max(1,totalAll)*100);

  const nextG = GRAMMAR.find(t=>!(P.grammar[t.id]&&P.grammar[t.id].completed));
  const nextV = VOCAB.find(t=>!(P.vocab[t.id]&&P.vocab[t.id].tested));

  return `
  <div class="space-y-8">
    ${homeHeroHTML()}

    ${!P.name ? `<div class="card" style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;background:#F5F3FF;border-color:#C4B5FD;cursor:pointer" onclick="showProfile()">
      <div style="font-size:1.8rem">👋</div>
      <div style="flex:1;min-width:12rem">
        <p style="font-weight:700;color:#4C1D95;font-size:.92rem">${T('profile_setup_title')}</p>
        <p style="font-size:.8rem;color:#6D28D9">${T('profile_setup_sub')}</p>
      </div>
      <button class="btn-primary" style="background:#7C3AED" onclick="event.stopPropagation();showProfile()">${T('profile_setup_btn')}</button>
    </div>` : ''}


    ${tasksHTML()}

    ${oneNudgeHTML()}

    ${classGoalHTML()}

    ${focusCardHTML()}

    <h2 class="zone-title">🧭 ${T('home_explore_zone')}</h2>

    ${areaTilesHTML()}

    ${(()=>{
      const {target:wct,wc} = getWeekChallenge();
      const relV = VOCAB.find(v=>v.id===wct.id) || VOCAB.find(v=>v.cat==='soul5') || VOCAB[0];
      const wcTasks = [
        {label:`${T('wc_task_grammar')}: „${wct.title}“`, onclick:`go('grammar-topic','${wct.id}')`},
        {label:`${T('wc_task_vocab')}: ${relV?'"'+relV.title+'"':''}`, onclick:`go('vocab-topic','${relV?relV.id:'v1'}')`},
        {label:T('wc_task_reading'), onclick:`go('reading-list')`},
      ];
      const allDone = wc.done.length >= 3;
      return `<details class="card week-card" ${wc.done.length>0&&!allDone?'open':''}>
        <summary><span>🏅 ${T('home_challenge').replace(/^\S+\s/,'')}</span><span class="week-count">${wc.done.length}/3</span></summary>
        <p style="font-size:.8rem;color:#B45309;margin:.6rem 0;font-weight:600">${T('week_challenge_topic')}: ${wct.title}</p>
        ${allDone
          ? `<div style="text-align:center;padding:.5rem 0"><div style="font-size:2.2rem">🏆</div><p style="font-weight:700;color:#059669;margin-top:.25rem">${T('home_challenge_done')}</p><p style="font-size:.8rem;color:#64748B">${T('wc_done_sub')}</p></div>`
          : wcTasks.map((t,i)=>`<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem 0;border-top:1px solid rgba(253,230,138,.7)">
              <span onclick="wcToggle(${i})" style="font-size:1.2rem;cursor:pointer;flex-shrink:0">${wc.done.includes(i)?'✅':'⬜'}</span>
              <div style="flex:1;font-size:.85rem;color:#78350F">${t.label}</div>
              <button class="chip-btn" onclick="${t.onclick}">${T('label_open')}</button>
            </div>`).join('')}
      </details>`;
    })()}
  </div>`;
}


