// ═══════════════════════════════════════════════
// PRACTICE
// ═══════════════════════════════════════════════
const PRACTICE_SETS = [
  {id:'ps1',emoji:'⚡',title:'5-Minute Simple Present',desc:'Quick tasks on the Simple Present: fill in verbs, form questions',duration:5,area:'grammar',cls:5,links:[{label:'Simple Present',sec:'grammar-topic',sub:'sp'}]},
  {id:'ps2',emoji:'📝',title:'10-Minute Simple Past',desc:'Simple Past exercises: verb forms, negatives and questions',duration:10,area:'grammar',cls:6,links:[{label:'Simple Past',sec:'grammar-topic',sub:'past'},{label:'Irregular Verbs Trainer',sec:'irreg',sub:'list'}]},
  {id:'ps3',emoji:'🏫',title:'Vocabulary Boost – School',desc:'School vocabulary: flashcards and quiz',duration:5,area:'vocabulary',cls:5,links:[{label:'Vocabulary: School',sec:'vocab-topic',sub:'school'}]},
  {id:'ps4',emoji:'📖',title:'10-Minute Reading',desc:'Read an A1/A2 text and complete the tasks',duration:10,area:'reading',cls:'both',links:[{label:'Reading-Texte',sec:'reading-list',sub:null}]},
  {id:'ps5',emoji:'📋',title:'Irregular Verbs – 15 Minutes',desc:'Flashcards, multiple choice and writing test for 15 verbs',duration:15,area:'vocabulary',cls:6,links:[{label:'Irregular Verbs Trainer',sec:'irreg',sub:'list'}]},
  {id:'ps6',emoji:'🧩',title:'Mixed Grammar – Year 5',desc:'Simple Present, word order and questions – mixed exercises',duration:15,area:'mixed',cls:5,links:[{label:'Simple Present',sec:'grammar-topic',sub:'sp'},{label:'Word Order',sec:'grammar-topic',sub:'wo'},{label:'Questions & Negatives',sec:'grammar-topic',sub:'qn'}]},
  {id:'ps7',emoji:'✉️',title:'Writing – Write an Email',desc:'Write an email to a pen pal',duration:15,area:'writing',cls:5,links:[{label:'Email to a Pen Pal',sec:'writing-task',sub:'w1'}]},
  {id:'ps8',emoji:'🎯',title:'Test Preparation – Simple Past',desc:'Verb forms, negatives, questions and irregular verbs',duration:15,area:'mixed',cls:6,links:[{label:'Simple Past',sec:'grammar-topic',sub:'past'},{label:'Irregular Verbs',sec:'irreg',sub:'list'}]},
];


// ═══════════════════════════════════════════════
// TIMED SESSION
// ═══════════════════════════════════════════════
let _ts = {items:[], idx:0, done:false, minutes:10};

function buildSessionItems(minutes){
  const counts = {5:{g:1,v:1,r:1},10:{g:2,v:2,r:1},15:{g:3,v:2,r:1,w:1},20:{g:3,v:3,r:2,w:1}};
  const plan = counts[minutes]||counts[10];
  const items = [];
  // Schwerpunkte zuerst: Themen aus dem Sprach-Check und aus "Noch üben"
  // (P.errors) kommen bevorzugt ins Paket – so schließt die Session Lücken.
  const focusIds = new Set(assessmentFocus().map(a=>a.id));
  for(const k in (P.errors||{})){ if(k.indexOf('grammar:')===0) focusIds.add(k.slice(8)); }
  const gTopics = [...GRAMMAR].sort((a,b)=>
    ((focusIds.has(b.id)?1:0)-(focusIds.has(a.id)?1:0)) || Math.random()-.5);
  let gCount = 0;
  for(const t of gTopics){
    if(gCount >= (plan.g||2)) break;
    const gPool=GRAMMAR_POOL[t.id]||[];
    const mcPicks=gPool.filter(e=>e.type==='mc');
    if(mcPicks.length){
      const rnd=mcPicks[Math.floor(Math.random()*mcPicks.length)];
      const rndId=rnd.id;
      items.push({type:'grammar',label:'📚 '+t.title,go:function(){go('grammar-exercise',t.id,rndId);}});
      gCount++;
    }
  }
  // Fällige Wörter haben Vorrang: ein Wiederholen-Block ersetzt ein Vokabelthema
  let vSlots = plan.v||2;
  if(srsDueList().length > 0){
    items.push({type:'vocab', label:'🔁 ' + T('review_title').replace('🔁 ',''), go:function(){ startReview(); }});
    vSlots--;
  }
  const vTopics = [...VOCAB].sort(()=>Math.random()-.5).slice(0, Math.max(0, vSlots));
  for(const v of vTopics){
    items.push({type:'vocab', label:'🔤 ' + v.title, go:function(){ go('vocab-topic',v.id,'flashcard'); }});
  }
  if(plan.r){
    const rTexts = [...READING].sort(()=>Math.random()-.5).slice(0, plan.r);
    for(const r of rTexts){
      items.push({type:'reading', label:'📖 ' + r.title, go:function(){ go('reading-task',r.id); }});
    }
  }
  if(plan.w){
    items.push({type:'writing', label:T('ts_free_writing'), go:function(){ go('writing-prompts'); }});
  }
  return items.sort(()=>Math.random()-.5);
}

function startTimedSession(minutes){
  _ts = {items: buildSessionItems(minutes), idx:0, done:false, minutes};
  go('timed-session');
}

function renderTimedSession(){
  if(_ts.items.length===0){
    return '<div class="card" style="text-align:center;padding:2rem"><p>No exercises found.</p><button class="btn-primary" onclick="go(\'home\')">Zur Startseite</button></div>';
  }
  if(_ts.done){
    return `<div class="card space-y-5" style="text-align:center;padding:2rem">
      <div style="font-size:3rem">&#127881;</div>
      <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B">Session done!</h2>
      <p style="color:#64748B">You completed all ${_ts.items.length} exercises. Well done!</p>
      <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-secondary" onclick="go('home')">&#8592; Home</button>
        <button class="btn-primary" style="background:#16A34A" onclick="startTimedSession(${_ts.minutes})">${_ts.minutes} min again</button>
      </div>
    </div>`;
  }
  const total = _ts.items.length;
  const pct = Math.round(_ts.idx/total*100);
  // Check for active grammar exercise
  const hasActiveEx = _ex && _ex.topicId && _ex.state !== 'done' && _ex.state !== undefined;
  return `<div class="space-y-6">
    ${hasActiveEx ? `<div onclick="go('grammar-exercise','${_ex.topicId}','${_ex.exId||''}')" class="card" style="cursor:pointer;background:#FEF3C7;border-color:#FDE68A;display:flex;align-items:center;gap:1rem" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'" onmouseout="this.style.boxShadow=''">
      <span style="font-size:1.8rem">⚡</span>
      <div style="flex:1">
        <p style="font-weight:700;color:#92400E;font-size:.95rem">${T('grammar_open_ex')}</p>
        <p style="font-size:.82rem;color:#B45309">${GRAMMAR.find(g=>g.id===_ex.topicId)?.title||T('grammar_ex_fallback')} ${T('grammar_open_ex_hint')}</p>
      </div>
      <span style="color:#F59E0B;font-size:1.2rem">›</span>
    </div>` : ''}
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('home')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">&#8592; Cancel</button>
      <div>
        <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">&#9201;&#65039; ${_ts.minutes}-min session</h1>
        <p style="color:#64748B;font-size:.85rem">${_ts.idx} / ${total} done</p>
      </div>
    </div>
    ${pct>0?`<div style="background:#E2E8F0;border-radius:99px;height:.5rem;overflow:hidden"><div style="background:#16A34A;height:100%;width:${pct}%;transition:width .4s"></div></div>`:''}
    <div style="display:flex;flex-direction:column;gap:.75rem">
      ${_ts.items.map((item,i)=>{
        const isDone = i < _ts.idx;
        const isCur  = i === _ts.idx;
        return `<div style="background:${isDone?'#F0FDF4':isCur?'#EFF6FF':'#F8FAFC'};border:2px solid ${isDone?'#86EFAC':isCur?'#BFDBFE':'#F1F5F9'};border-radius:1rem;padding:1rem;display:flex;align-items:center;gap:1rem;${isCur?'cursor:pointer;':''}opacity:${isDone||isCur?'1':'.55'}"
          ${isCur?`onclick="tsGo(${i})"`:''} ${isCur?`onmouseover="this.style.borderColor='#3B82F6'" onmouseout="this.style.borderColor='#BFDBFE'"`:''}>
          <div style="font-size:1.4rem">${isDone?'&#9989;':isCur?'&#9654;&#65039;':'&#8987;'}</div>
          <div style="flex:1">
            <p style="font-weight:600;color:#1E293B;font-size:.9rem">${item.label}</p>
            <p style="font-size:.75rem;color:#64748B">${isDone?T('ts_done_label'):isCur?T('ts_start_now'):T('ts_not_yet')}</p>
          </div>
        </div>`;
      }).join('')}
    </div>
    <button class="btn-primary" style="width:100%;background:#16A34A" onclick="tsGo(${_ts.idx})">
      Jetzt: ${_ts.items[_ts.idx].label} &#8594;
    </button>
  </div>`;
}

function tsGo(i){
  _ts._cur = i;
  _ts.items[i].go();
}

function tsReturn(){
  if(_ts._cur !== undefined){
    _ts.idx = _ts._cur + 1;
    if(_ts.idx >= _ts.items.length) _ts.done = true;
  }
  go('timed-session');
}

function renderPractice(){
  let fCls = 'all', fArea = 'all', fDur = 'all';
  // read from state if set
  if(_state.data){ fCls=_state.data.cls||'all'; fArea=_state.data.area||'all'; fDur=_state.data.dur||'all'; }

  const filtered = PRACTICE_SETS.filter(ps=>{
    const clsOk = fCls==='all' || String(ps.cls)===fCls || ps.cls==='both';
    const areaOk = fArea==='all' || ps.area===fArea;
    const durOk = fDur==='all' || ps.duration===Number(fDur);
    return clsOk && areaOk && durOk;
  });

  const fBtn = (key, val, label, cur) => `<button onclick="setPFilter('${key}','${val}')" style="padding:.4rem .85rem;border-radius:.75rem;font-size:.8rem;font-weight:600;cursor:pointer;border:none;background:${cur===val?'#F97316':'#F1F5F9'};color:${cur===val?'#fff':'#64748B'};margin:.2rem">${label}</button>`;

  // Check for active grammar exercise
  const hasActiveEx = _ex && _ex.topicId && _ex.state !== 'done' && _ex.state !== undefined;
  return `<div class="space-y-6">
    ${hasActiveEx ? `<div onclick="go('grammar-exercise','${_ex.topicId}','${_ex.exId||''}')" class="card" style="cursor:pointer;background:#FEF3C7;border-color:#FDE68A;display:flex;align-items:center;gap:1rem" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'" onmouseout="this.style.boxShadow=''">
      <span style="font-size:1.8rem">⚡</span>
      <div style="flex:1">
        <p style="font-weight:700;color:#92400E;font-size:.95rem">${T('grammar_open_ex')}</p>
        <p style="font-size:.82rem;color:#B45309">${GRAMMAR.find(g=>g.id===_ex.topicId)?.title||T('grammar_ex_fallback')} ${T('grammar_open_ex_hint')}</p>
      </div>
      <span style="color:#F59E0B;font-size:1.2rem">›</span>
    </div>` : ''}
    <div><h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('practice_title')}</h1>
    <p style="color:#64748B;margin-top:.3rem">${T('practice_sub')}</p></div>
    <div class="card" style="background:linear-gradient(135deg,#F0FDF4,#DCFCE7);border-color:#86EFAC">
      <h2 style="font-weight:700;color:#166534;margin-bottom:.4rem">${T('home_timer')}</h2>
      <p style="font-size:.85rem;color:#16A34A;margin-bottom:1rem">${T('home_timer_sub')}</p>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        ${[5,10,15,20].map(min=>`<button class="btn-primary" style="background:#16A34A" onclick="startTimedSession(${min})">${min} ${T('home_timer_min')}</button>`).join('')}
      </div>
    </div>

    <div class="card space-y-3">
      <p style="font-weight:600;color:#1E293B;font-size:.9rem">Filter</p>
      <div>
        <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.3rem">${T('practice_filter_class')}</p>
        ${fBtn('cls','all',T('practice_all'),fCls)}${fBtn('cls','5',T('practice_class5'),fCls)}${fBtn('cls','6',T('practice_class6'),fCls)}
      </div>
      <div>
        <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.3rem">${T('practice_filter_area')}</p>
        ${['all','grammar','vocabulary','reading','writing','mixed'].map(a=>fBtn('area',a,a==='all'?T('practice_all'):a==='grammar'?T('label_grammar'):a==='vocabulary'?T('label_vocab'):a==='reading'?T('nav_reading'):a==='writing'?T('nav_writing'):T('practice_mixed'),fArea)).join('')}
      </div>
      <div>
        <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.3rem">${T('practice_filter_time')}</p>
        ${['all','5','10','15'].map(d=>fBtn('dur',d,d==='all'?T('practice_all'):d+' '+T('practice_minutes'),fDur)).join('')}
      </div>
    </div>

    ${filtered.length===0
      ? `<div class="card" style="text-align:center;padding:2rem;color:#94A3B8">${T('practice_none_found')}</div>`
      : `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem">
          ${filtered.map(ps=>`<div class="card space-y-4">
            <div style="display:flex;gap:1rem;align-items:flex-start">
              <span style="font-size:2rem;flex-shrink:0">${ps.emoji}</span>
              <div style="flex:1">
                <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.4rem">
                  <span style="background:#FFEDD5;color:#C2410C;font-size:.7rem;font-weight:700;padding:.15rem .5rem;border-radius:99px">${ps.duration} ${T('practice_minutes')}</span>
                  <span style="background:#F1F5F9;color:#64748B;font-size:.7rem;padding:.15rem .5rem;border-radius:99px">${ps.cls==='both'?T('practice_class_both'):T('practice_filter_class')+' '+ps.cls}</span>
                  <span style="background:#F1F5F9;color:#64748B;font-size:.7rem;padding:.15rem .5rem;border-radius:99px">${ps.area==='grammar'?T('label_grammar'):ps.area==='vocabulary'?T('label_vocab'):ps.area==='reading'?T('nav_reading'):ps.area==='writing'?T('nav_writing'):T('practice_mixed')}</span>
                </div>
                <h3 style="font-weight:700;color:#1E293B;font-size:.9rem">${ps.title}</h3>
                <p style="font-size:.8rem;color:#64748B;margin-top:.2rem">${ps.desc}</p>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:.4rem">
              ${ps.links.map(l=>`<button onclick="go('${l.sec}','${l.sub||''}')" style="display:flex;align-items:center;justify-content:space-between;background:#EFF6FF;color:#3B82F6;border:none;border-radius:.75rem;padding:.6rem 1rem;font-size:.85rem;font-weight:600;cursor:pointer;text-align:left">${l.label} <span>›</span></button>`).join('')}
            </div>
          </div>`).join('')}
        </div>`
    }
  </div>`;
}

function setPFilter(key, val){
  const d = _state.data || {cls:'all',area:'all',dur:'all'};
  d[key] = val;
  _state.data = d;
  document.getElementById('app').innerHTML = renderPractice();
}

