// ═══════════════════════════════════════════════
// IRREGULAR VERBS
// ═══════════════════════════════════════════════
let _irState = {mode:'list', idx:0, flipped:false, mcIdx:0, mcScore:0, mcAnswers:[], writeIdx:0, writeScore:0, writeAnswers:[], writeSent:false};

let _irregRulesOpened = false;
function renderIrregMemory(){
  const s=_memState;
  if(!s.cards||!s.cards.length){ startIrregMemory('irr2'); return renderIrregMemory(); }
  const allDone=s.matched.length===s.cards.length/2;
  const mode=s.irMode||'irr2';
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('irreg','list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← Irregular Verbs</button>
      <h1 style="font-size:1.2rem;font-weight:800;color:#1E293B;flex:1">🃏 Memory – ${mode==='irr3'?'Inf → Past → PP':'Inf → Simple Past'}</h1>
      <span style="font-size:.82rem;color:#64748B">${T('mem_moves')}: ${s.moves}</span>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button onclick="startIrregMemory('irr2')" style="padding:.4rem .8rem;border-radius:.625rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${mode==='irr2'?'#F59E0B':'#F1F5F9'};color:${mode==='irr2'?'#fff':'#64748B'}">Inf ↔ Past</button>
      <button onclick="startIrregMemory('irr3')" style="padding:.4rem .8rem;border-radius:.625rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${mode==='irr3'?'#F59E0B':'#F1F5F9'};color:${mode==='irr3'?'#fff':'#64748B'}">Inf ↔ Past+PP</button>
      <button onclick="startIrregMemory(mode)" style="padding:.4rem .8rem;border-radius:.625rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:#F1F5F9;color:#64748B;margin-left:auto">${T('mem_new')}</button>
    </div>
    ${allDone?`<div class="feedback-ok" style="text-align:center;font-size:1.05rem">${T('mem_found_all').replace('{pairs}',s.cards.length/2).replace('{moves}',s.moves)}</div>`:''}
    <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.4rem;max-width:360px">
      ${s.cards.map(card=>{
        const isFlipped=s.flipped.includes(card.id)||s.matched.includes(card.pair);
        const isMatched=s.matched.includes(card.pair);
        const fs=card.text.length>14?'.55rem':card.text.length>10?'.65rem':'.78rem';
        const bg=isMatched?'#D1FAE5':isFlipped?'#FFFBEB':'#F1F5F9';
        const border=isMatched?'2px solid #6EE7B7':isFlipped?'2px solid #F59E0B':'2px solid #E2E8F0';
        const content=isFlipped||isMatched?`<span style="font-size:${fs};font-weight:700;color:${isMatched?'#065F46':card.type==='inf'?'#1E293B':'#92400E'}">${card.text}</span>`:'<span style="font-size:1.2rem;color:#94A3B8">?</span>';
        return `<div onclick="memFlip(${card.id})" style="height:72px;border-radius:.6rem;display:flex;align-items:center;justify-content:center;text-align:center;padding:.3rem;cursor:pointer;transition:all .15s;background:${bg};border:${border}">${content}</div>`;
      }).join('')}
    </div>
    <div style="font-size:.8rem;color:#64748B;text-align:center">${T('ws_found')}: ${s.matched.length}/${s.cards.length/2} ${T('mem_pairs')}</div>
  </div>`;
}


function renderIrregVerbs(mode){
  _irState.mode = mode||'list';
  const known = new Set(P.irreg||[]);
  const modeBtns = ['list','flashcard','mc','write'].map(m=>`<button onclick="${m==='list'?`go('irreg','list')`:`startIrregMode('${m}')`}" style="padding:.5rem 1rem;border-radius:.75rem;font-size:.8rem;font-weight:600;cursor:pointer;border:none;background:${mode===m?'#F59E0B':'#F1F5F9'};color:${mode===m?'#fff':'#64748B'}">${m==='list'?T('irreg_mode_list'):m==='flashcard'?T('irreg_mode_cards'):m==='mc'?T('irreg_mode_quiz'):T('irreg_mode_write')}</button>`).join('')+
    `<span style="margin-left:auto;display:flex;gap:.5rem;align-items:center">`+
    gamesMenu([
      {label:'🃏 Memory · Inf ↔ Past', onclick:`startIrregMemory('irr2')`},
      {label:'🃏 Memory · Inf ↔ Past + PP', onclick:`startIrregMemory('irr3')`},
      {label:T('irreg_mode_ws'), onclick:`buildWordSearch('irreg');go('wordsearch','irreg')`},
      {label:'🎯 Hangman', onclick:`startHangman('irreg');go('hangman','irreg')`}
    ])+
    `<button class="chip-btn" onclick="printIrreg()">🖨️ ${T('vocab_print')||'Drucken'}</button></span>`;

  let content = '';
  if(mode==='list') content = renderIrregList(known);
  else if(mode==='flashcard') content = renderIrregFC(known);
  else if(mode==='mc') content = renderIrregMC(known);
  else if(mode==='write') content = renderIrregWrite();

  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">📋 Irregular Verbs</h1>
        <p style="color:#64748B;font-size:.85rem">${known.size}/30 ${T('irreg_learned')}</p>
      </div>
    </div>
    ${pb(known.size/30*100,'#F59E0B')}
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">${modeBtns}</div>
    ${content}
  </div>`;
}

function patternLabel(p){
  const l=P.lang||'en1';
  if(l==='de') return p==='echo'?'🔁 Echo':p==='same'?'🔒 Gleich':p==='iau'?'🌊 i→a→u':'⭐ Merken';
  return p==='echo'?'🔁 Echo':p==='same'?'🔒 Same':p==='iau'?'🌊 i→a→u':'⭐ Learn';
}
function patternColor(p){
  return p==='echo'?'#DBEAFE':p==='same'?'#D1FAE5':p==='iau'?'#FDE8D8':'#F3E8FF';
}
function patternTextColor(p){
  return p==='echo'?'#1E40AF':p==='same'?'#065F46':p==='iau'?'#92400E':'#6B21A8';
}

function renderIrregList(known){
  const patternInfo = [
    {p:'same', icon:'🔒', title:T('pat_same_title'), desc:'put – put – put · read – read – read', hint:T('pat_same_hint')},
    {p:'echo', icon:'🔁', title:T('pat_echo_title'), desc:'get – got – got · feel – felt – felt', hint:T('pat_echo_hint')},
    {p:'iau',  icon:'🌊', title:T('pat_iau_title'),  desc:'drink – drank – drunk · swim – swam – swum', hint:T('pat_iau_hint')},
    {p:'other',icon:'⭐', title:T('pat_other_title'),desc:'go – went – gone · be – was/were – been', hint:T('pat_other_hint')},
  ];

  const patternCards = patternInfo.map(({p,icon,title,desc,hint})=>`
    <div style="padding:.75rem 1rem;border-radius:.75rem;background:${patternColor(p)};border:1px solid ${patternTextColor(p)}33;margin-bottom:.4rem">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.2rem">
        <span style="font-size:1.1rem">${icon}</span>
        <span style="font-weight:700;font-size:.9rem;color:${patternTextColor(p)}">${title}</span>
      </div>
      <p style="font-size:.82rem;color:#64748B;font-family:monospace;font-weight:700;margin-bottom:.25rem">${desc}</p>
      <p style="font-size:.82rem;color:#475569;line-height:1.45">💡 ${hint}</p>
    </div>`).join('');

  return `<div class="space-y-4">
    <div style="background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:.75rem;padding:.9rem 1rem">
      <p style="font-weight:700;color:#1D4ED8;margin-bottom:.3rem;font-size:.92rem">${T('irreg_discover')}</p>
      <p style="font-size:.85rem;color:#1E3A8A;line-height:1.5">${T('irreg_discover_text')}</p>
    </div>

    <div class="card" style="overflow-x:auto;padding:.75rem">
      <p style="font-size:.78rem;color:#64748B;margin-bottom:.5rem"><span class="forms-btn" style="pointer-events:none">🔊</span> ${T('irreg_listen_forms_hint')}</p>
      <div style="display:grid;grid-template-columns:2rem 1fr 1fr 1fr 1fr;gap:.15rem .5rem;align-items:start;min-width:380px">
        <div></div>
        <div style="font-size:.68rem;color:#F59E0B;font-weight:700;padding:.3rem 0;border-bottom:2px solid #FEF3C7">${T('irreg_col_inf')}</div>
        <div style="font-size:.68rem;color:#F59E0B;font-weight:700;padding:.3rem 0;border-bottom:2px solid #F1F5F9">${T('irreg_col_past')}</div>
        <div style="font-size:.68rem;color:#10B981;font-weight:700;padding:.3rem 0;border-bottom:2px solid #F1F5F9">${T('irreg_col_pp')}</div>

        <div style="font-size:.68rem;color:#94A3B8;font-weight:700;padding:.3rem 0;border-bottom:2px solid #F1F5F9">${T('irreg_col_de')}</div>
        ${IRREG.map((v,i)=>{
          const isKnown = known.has(i);
          const pat = v.pattern||'other';
          return `
            <span style="display:flex;flex-direction:column;align-items:center;gap:.2rem"><span onclick="toggleIrreg(${i})" style="cursor:pointer;font-size:1rem">${isKnown?'✅':'⭕'}</span><button class="forms-btn" onclick="speakForms(${i})" title="${v.inf} – ${v.past} – ${v.pp}" aria-label="${T('irreg_listen_forms')}">🔊</button></span>
            <span style="font-weight:700;color:#1E293B;padding:.3rem 0;font-size:.88rem;display:flex;flex-direction:column;gap:.15rem">
              <span style="display:flex;align-items:center;gap:.1rem"><span onclick="toggleIrreg(${i})" style="cursor:pointer">to ${v.inf}</span>${speakBtn('to '+escQ(v.inf))}</span>
              ${_irregRulesOpened?`<span style="font-size:.68rem;font-weight:700;padding:.1rem .35rem;border-radius:.25rem;background:${patternColor(pat)};color:${patternTextColor(pat)};display:inline-block">${patternLabel(pat)}</span>`:''}
            </span>
            <span style="color:#B45309;font-weight:600;padding:.3rem 0;font-size:.85rem;display:flex;align-items:center;gap:.15rem">
              <span>${v.past}</span>${speakBtn(escQ(v.past))}
            </span>
            <span style="color:#065F46;font-weight:600;padding:.3rem 0;font-size:.85rem;display:flex;align-items:center;gap:.15rem">
              <span>${v.pp}</span>${speakBtn(escQ(v.pp))}
            </span>

            <span onclick="toggleIrreg(${i})" style="color:#64748B;font-size:.8rem;cursor:pointer;padding:.3rem 0">${v.de}${(()=>{
              const e=(P.srs||{})['irreg:'+i]; const b=e?(e.b||0):0;
              return b>0?` <span title="${T('review_box')} ${b}/5" style="font-size:.6rem;font-weight:800;color:${b>=4?'#059669':'#0369A1'};background:${b>=4?'#ECFDF5':'#F0F9FF'};border:1px solid ${b>=4?'#6EE7B7':'#BAE6FD'};border-radius:99px;padding:.05rem .35rem;white-space:nowrap">${b}/5</span>`:'';
            })()}</span>`;
        }).join('')}
      </div>
    </div>

    ${_irregRulesOpened
      ? `<div class="card" style="background:#FAFAF5">
          <h3 style="font-weight:700;color:#1E293B;margin-bottom:.75rem">${T('irreg_patterns_title')}</h3>
          ${patternCards}
        </div>`
      : `<button onclick="_irregRulesOpened=true;document.getElementById('app').innerHTML=render(_state)" style="width:100%;padding:.75rem 1rem;border-radius:.75rem;font-size:.9rem;font-weight:700;cursor:pointer;border:none;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;text-align:left">
          ${T('irreg_rules_btn')}
        </button>`
    }
  </div>`;
}

function toggleIrregFC(origIdx){
  if(!P.irreg) P.irreg = [];
  const pos = P.irreg.indexOf(origIdx);
  if(pos>=0) P.irreg.splice(pos,1); else P.irreg.push(origIdx);
  // Box-Logik: Selbsteinschätzung auf der Karteikarte zählt (wie bei Vokabeln)
  srsUpdateAt('irreg', origIdx, pos<0);
  checkBadges(); save();
  go('irreg','flashcard');
}

function toggleIrreg(idx){
  if(!P.irreg) P.irreg = [];
  const pos = P.irreg.indexOf(idx);
  if(pos>=0) P.irreg.splice(pos,1); else P.irreg.push(idx);
  checkBadges();
  save();
  const known = new Set(P.irreg);
  const isKnown = known.has(idx);
  const row = document.querySelectorAll('[onclick^="toggleIrreg"]')[idx];
  if(row){
    row.style.background = isKnown?'#FFFBEB':'#F8FAFC';
    row.style.borderColor = isKnown?'#FDE68A':'#F1F5F9';
    row.querySelector('span').textContent = isKnown?'✅':'⭕';
  }
}

let _irFC = {idx:0, flipped:false};
let _irShuffled = [];
function startIrregMode(m){
  if(m==='list') _irregRulesOpened=false;
  if(m !== 'list'){
    _irShuffled = [...IRREG].sort(()=>Math.random()-.5);
    _irFC = {idx:0, flipped:false};
    _irMC = {idx:0, score:0, answers:[], done:false};
    _irWr = {idx:0, score:0, checked:false, pastVal:'', ppVal:'', pastOk:false, ppOk:false, done:false};
  }
  go('irreg', m);
}
function renderIrregFC(known){
  const i = _irFC.idx;
  const _irPool = _irShuffled.length ? _irShuffled : IRREG;
  const v = _irPool[i];
  const origIdx = IRREG.findIndex(x=>x.id===v.id);
  return `<div class="card space-y-4">
    <div style="display:flex;justify-content:space-between;font-size:.85rem;color:#94A3B8">
      <span>${i+1}/30</span><span>${known.size} ${T('label_learned')}</span>
    </div>
    <div class="flashcard" onclick="flipIrregCard()" style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:2px solid #FDE68A;border-radius:1rem;padding:1.5rem;text-align:center;cursor:pointer">
      <div style="display:flex;align-items:center;justify-content:center;gap:.5rem">
        <p style="font-size:1.4rem;font-weight:800;color:#92400E" id="ifc-base">to ${v.inf}</p>
        ${speakBtn('to '+escQ(v.inf))}
      </div>
      <p style="font-size:.82rem;color:#B45309;margin-top:.3rem">${T('vocab_flip_hint')}</p>
      <div id="ifc-back" style="display:none;margin-top:.75rem">
        <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap">
          <div>
            <p style="font-size:.7rem;color:#94A3B8;margin-bottom:.2rem">Simple Past</p>
            <div style="display:flex;align-items:center;justify-content:center;gap:.3rem">
              <p style="font-size:1.2rem;font-weight:700;color:#B45309">${v.past}</p>
              ${speakBtn(escQ(v.past))}
            </div>
          </div>
          <div>
            <p style="font-size:.7rem;color:#94A3B8;margin-bottom:.2rem">Past Participle</p>
            <div style="display:flex;align-items:center;justify-content:center;gap:.3rem">
              <p style="font-size:1.2rem;font-weight:700;color:#065F46">${v.pp}</p>
              ${speakBtn(escQ(v.pp))}
            </div>
          </div>
        </div>
        <button class="chip-btn" style="margin-top:.75rem" onclick="event.stopPropagation();speakForms(${origIdx})">🔊 ${v.inf} – ${v.past} – ${v.pp}</button>
        <p style="color:#64748B;margin-top:.75rem;font-size:.9rem">${v.de}</p>
        <p style="color:#94A3B8;font-size:.78rem;margin-top:.3rem;font-style:italic">${v.ex||''}</p>
      </div>
    </div>
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="irFCNav(-1)">${T('vocab_fc_back')}</button>
      <button onclick="toggleIrregFC(${origIdx})" style="padding:.5rem 1rem;border-radius:.75rem;font-size:.85rem;font-weight:600;cursor:pointer;border:none;background:${known.has(origIdx)?'#FFFBEB':'#F1F5F9'};color:${known.has(origIdx)?'#92400E':'#64748B'}">
        ${known.has(origIdx)?T('vocab_fc_learned'):T('vocab_fc_practice')}
      </button>
      <button class="btn-primary" style="background:#F59E0B" onclick="irFCNav(1)">${T('ex_next')}</button>
    </div>
  </div>`;
}
function flipIrregCard(){
  const back = document.getElementById('ifc-back');
  back.style.display = back.style.display==='none'?'block':'none';
}
function irFCNav(d){ const _l=(_irShuffled.length||IRREG.length)-1; _irFC.idx = Math.max(0,Math.min(_l,_irFC.idx+d)); go('irreg','flashcard'); }

let _irMC = {idx:0, score:0, answers:[]};
function renderIrregMC(known){
  if(_irMC.done) return renderIrregMCDone();
  const _irPool = _irShuffled.length ? _irShuffled : IRREG;
  const v = _irPool[_irMC.idx];
  const wrong = _irPool.filter((_,i)=>i!==_irMC.idx).sort(()=>Math.random()-.5).slice(0,3);
  const opts = [...wrong.map(w=>w.past), v.past].sort(()=>Math.random()-.5);
  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between">
      <span style="font-size:.85rem;color:#94A3B8">${_irMC.idx+1}/30</span>
      <span style="font-size:.85rem;color:#10B981;font-weight:600">${_irMC.score} ${T('ex_correct_score')}</span>
    </div>
    <p style="font-weight:700;color:#1E293B;font-size:1.1rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:.4rem">Simple Past von: <span style="color:#F59E0B">to ${v.inf}</span>${speakBtn('to '+escQ(v.inf))}</p>
    <div id="irmc-opts">
      ${opts.map((o,oi)=>`<button class="opt-btn" id="irmc-${oi}" onclick="pickIrMC(${oi},'${escQ(o)}','${escQ(v.past)}')">${o}</button>`).join('')}
    </div>
    <div id="irmc-fb"></div>
  </div>`;
}
function pickIrMC(oi, chosen, correct){
  const isRight = chosen===correct;
  document.querySelectorAll('#irmc-opts .opt-btn').forEach(b=>b.disabled=true);
  document.getElementById('irmc-'+oi).className = isRight?'opt-btn opt-correct':'opt-btn opt-wrong';
  if(!isRight) document.querySelectorAll('#irmc-opts .opt-btn').forEach(b=>{ if(b.textContent.trim()===correct) b.className='opt-btn opt-correct'; });
  if(isRight) _irMC.score++;
  _irMC.answers.push({right:isRight});
  // Box-Logik: auch das Verb-Quiz zählt in die Wiederholungs-Fächer
  const _irPoolMC = _irShuffled.length ? _irShuffled : IRREG;
  srsUpdate('irreg', _irPoolMC[_irMC.idx], isRight);
  const fb = document.getElementById('irmc-fb');
  fb.innerHTML = (isRight?`<div class="feedback-ok">${T('feedback_ok')}</div>`:`<div class="feedback-err">${T('feedback_wrong')} <strong>${correct}</strong></div>`)
    + `<button class="btn-primary" style="margin-top:.75rem;background:#F59E0B" onclick="nextIrMC()">${_irMC.idx<29?T('btn_next'):T('ex_show_result')}</button>`;
}
function nextIrMC(){
  _irMC.idx++;
  if(_irMC.idx>=30){ _irMC.done=true; }
  go('irreg','mc');
}
function renderIrregMCDone(){
  const pct = Math.round(_irMC.score/30*100);
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${pct}% ${T('ex_correct_score')}</h2>
    ${pb(pct,'#F59E0B')}
    <div style="margin-top:1rem;display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="_irMC={idx:0,score:0,answers:[],done:false};go('irreg','mc')">${T('btn_try_again')}</button>
      <button class="btn-primary" style="background:#F59E0B" onclick="go('irreg','list')">${T('vocab_to_list')}</button>
    </div>
  </div>`;
}

let _irWr = {idx:0, score:0, answers:[], checked:false, val:''};
function renderIrregWrite(){
  if(_irWr.done) return renderIrregWriteDone();
  const _irPool = _irShuffled.length ? _irShuffled : IRREG;
  const v = _irPool[_irWr.idx];
  const isChecked = _irWr.checked;
  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between">
      <span style="font-size:.85rem;color:#94A3B8">${_irWr.idx+1}/15 (${T('irreg_write_counter')})</span>
    </div>
    <p style="font-weight:700;color:#1E293B;text-align:center;display:flex;align-items:center;justify-content:center;gap:.4rem">${T('irreg_write_fill')} <span style="color:#F59E0B;font-size:1.2rem">to ${v.inf}</span>${speakBtn('to '+escQ(v.inf))}</p>
    <div style="display:flex;flex-direction:column;gap:.5rem">
      <div style="display:flex;align-items:center;gap:.75rem">
        <label style="font-size:.85rem;color:#64748B;min-width:5rem">Simple Past:</label>
        <input id="ir-past" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="..." class="gap-input" style="flex:1;font-size:1rem;color:${isChecked?(_irWr.pastOk?'#065F46':'#991B1B'):'#1E293B'}" ${isChecked?'disabled':''} value="${isChecked?(_irWr.pastVal||''):''}">
        ${isChecked?`<span style="${_irWr.pastOk?'color:#10B981':'color:#EF4444'};font-size:.8rem;font-weight:600">${_irWr.pastOk?'✓':('→ '+v.past)}</span>`:''}
      </div>
      <div style="display:flex;align-items:center;gap:.75rem">
        <label style="font-size:.85rem;color:#64748B;min-width:5rem">Past Participle:</label>
        <input id="ir-pp" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="..." class="gap-input" style="flex:1;font-size:1rem;color:${isChecked?(_irWr.ppOk?'#065F46':'#991B1B'):'#1E293B'}" ${isChecked?'disabled':''} value="${isChecked?(_irWr.ppVal||''):''}">
        ${isChecked?`<span style="${_irWr.ppOk?'color:#10B981':'color:#EF4444'};font-size:.8rem;font-weight:600">${_irWr.ppOk?'✓':('→ '+v.pp)}</span>`:''}
      </div>
    </div>
    ${!isChecked?`<button class="btn-primary" style="background:#F59E0B" onclick="checkIrWrite()">${T('ex_check')}</button>`
      :`<button class="btn-primary" style="background:#F59E0B" onclick="nextIrWrite()">${_irWr.idx<14?T('btn_next'):T('ex_show_result')}</button>`}
  </div>`;
}
function checkIrWrite(){
  const _irPool = _irShuffled.length ? _irShuffled : IRREG;
  const v = _irPool[_irWr.idx];
  const past = document.getElementById('ir-past').value.trim();
  const pp = document.getElementById('ir-pp').value.trim();
  _irWr.pastVal = past;
  _irWr.ppVal = pp;
  _irWr.pastOk = past.toLowerCase()===v.past.toLowerCase();
  _irWr.ppOk = pp.toLowerCase()===(v.pp||'').toLowerCase();
  if(_irWr.pastOk && _irWr.ppOk) _irWr.score++;
  _irWr.checked = true;
  // Box-Logik: Schreiben zählt in die Wiederholungs-Fächer
  srsUpdate('irreg', v, _irWr.pastOk && _irWr.ppOk);
  go('irreg','write');
}
function nextIrWrite(){
  _irWr.idx++;
  _irWr.checked = false;
  if(_irWr.idx>=15){ _irWr.done=true; }
  go('irreg','write');
}
function renderIrregWriteDone(){
  const pct = Math.round(_irWr.score/15*100);
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${pct}% ${T('ex_correct_score')}</h2>
    ${pb(pct,'#F59E0B')}
    <div style="margin-top:1rem;display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="_irWr={idx:0,score:0,answers:[],done:false,checked:false};go('irreg','write')">${T('btn_try_again')}</button>
      <button class="btn-primary" style="background:#F59E0B" onclick="go('irreg','list')">${T('vocab_to_list')}</button>
    </div>
  </div>`;
}


