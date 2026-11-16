// ═══════════════════════════════════════════════
// SKILLS / READING / WRITING / LISTENING
// ═══════════════════════════════════════════════
function renderSkills(){
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
    <div><h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">🎧 Skills</h1>
    <p style="color:#64748B;margin-top:.3rem">${T('skills_sub')}</p></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">
      ${[
        {onclick:"go('reading-list')",emoji:'📖',title:'Reading',desc:`${READING.length} ${T('skills_texts_label')} · A1–A2`,done:P.reading.length,total:READING.length,c:'#EDE9FE',b:'#DDD6FE',bc:'#8B5CF6'},
        {onclick:"go('writing-list')",emoji:'✏️',title:'Writing',desc:`${WRITING.length} ${T('writing_tasks_count')}`,done:P.writing.length,total:WRITING.length,c:'#FCE7F3',b:'#FBCFE8',bc:'#EC4899'},

      ].map(s=>`<div onclick="${s.onclick}" style="background:${s.c};border:2px solid ${s.b};border-radius:1.25rem;padding:1.5rem;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='${s.bc}'" onmouseout="this.style.borderColor='${s.b}'">
        <div style="font-size:2.5rem;margin-bottom:.75rem">${s.emoji}</div>
        <h3 style="font-weight:700;color:#1E293B;margin-bottom:.2rem">${s.title}</h3>
        <p style="font-size:.8rem;color:#64748B;margin-bottom:.75rem">${s.desc}</p>
        <div style="display:flex;justify-content:space-between;font-size:.75rem;color:#94A3B8;margin-bottom:.25rem"><span>${s.done}/${s.total} ${T('skills_done')}</span></div>
        ${pb(s.done/s.total*100,s.bc)}
      </div>`).join('')}
    </div>
  </div>`;
}

// ── READING ──
function renderReadingList(){
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
    <div style="display:flex;align-items:center;gap:1rem">
      <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('reading_title')}</h1>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem">
      ${READING.map(t=>{
        const done = P.reading.includes(t.id);
        return `<div onclick="go('reading-task','${t.id}')" class="card" style="cursor:pointer;border-color:${done?'#6EE7B7':'#F1F5F9'};background:${done?'#ECFDF5':'#fff'}">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
            <span class="pill-${t.level.toLowerCase()}">${t.level}</span>
            ${done?(()=>{const sc=P.readingScores&&P.readingScores[t.id]||0;const stars=sc>=90?'⭐⭐⭐':sc>=60?'⭐⭐':sc>0?'⭐':'✓';return `<span style="font-size:.8rem;color:#065F46;font-weight:700">${stars} ${T('writing_done_label')}</span>`;})():''}
          </div>
          <h3 style="font-weight:700;color:#1E293B;margin-bottom:.3rem">${t.title}</h3>
          <p style="font-size:.8rem;color:#64748B">${t.type||""}</p>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

let _rState = {id:'', phase:'vocab', answers:[], checked:false};
function renderReadingTask(id){
  const t = READING.find(r=>r.id===id);
  if(!t) return `<p>${T('error_not_found')}</p>`;
  if(_rState.id!==id){ _rState = {id, phase:'vocab', answers:[], checked:false}; }
  if(_rState.phase==='vocab') return renderReadingVocab(t);
  if(_rState.phase==='pre') return renderReadingPre(t);
  if(_rState.phase==='while') return renderReadingWhile(t);
  if(_rState.phase==='post') return renderReadingPost(t);
  if(_rState.phase==='done') return renderReadingDone(t);
  return '';
}

function _rStepBar(active){
  const steps=[T('reading_step_vocab'),T('reading_step_pre'),T('reading_step_while'),T('reading_step_post')];
  const nums={vocab:0,pre:1,while:2,post:3,done:4};
  const n=nums[active]||0;
  return `<div style="display:flex;gap:.3rem;margin-bottom:.2rem">
    ${steps.map((_,i)=>`<div style="flex:1;height:.3rem;border-radius:99px;background:${i<n?'#10B981':i===n?'#3B82F6':'#E2E8F0'}"></div>`).join('')}
  </div>
  <p style="font-size:.72rem;color:#94A3B8;margin-bottom:.6rem">${T('reading_step_label_pre')}${n+1}${T('reading_step_label_post')} ${steps[n]||'✓'}</p>`;
}

// Schritt 0 – Vokabelvorentlastung
function renderReadingVocab(t){
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
      <button onclick="go('reading-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← Reading</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${t.title}</h1>
      <span class="pill-${t.level.toLowerCase()}">${t.level}</span>
    </div>
    ${_rStepBar('vocab')}
    <div class="card">
      <h2 style="font-weight:700;color:#1E293B;margin-bottom:.4rem">📖 New Words</h2>
      <p style="font-size:.8rem;color:#64748B;margin-bottom:.75rem">${T('reading_vocab_hint')}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:.5rem">
        ${t.vocab.map(v=>`<div style="background:#F8FAFC;padding:.55rem .75rem;border-radius:.6rem">
          <div style="font-weight:700;color:#3B82F6;font-size:.93rem">${v.pos==='v'?'<em style="font-style:normal;color:#7C3AED;font-size:.7rem;margin-right:.2rem">to</em>'+v.en:v.en}</div>
          <div style="color:#64748B;font-size:.8rem">${v.de}</div>
        </div>`).join('')}
      </div>
    </div>
    <button class="btn-primary" onclick="_rState.phase='pre';go('reading-task','${t.id}')">${T('reading_next_pre')}</button>
  </div>`;
}

// Schritt 1 – Pre-Reading (Vorhersage / Aktivierung)
function renderReadingPre(t){
  const typeLabel = t.type ? ` – ${t.type}` : (t.topic ? ` – ${T('reading_pre_topic_label')} ${t.topic}` : '');
  const preTask = t.preTask ||
    `<strong>"${t.title}"</strong>${typeLabel}<br>${t.level==='A2'?T('reading_pre_default_a2'):T('reading_pre_default_a1')}`;
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center">
      <button onclick="_rState.phase='vocab';go('reading-task','${t.id}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('irreg_back')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${t.title}</h1>
    </div>
    ${_rStepBar('pre')}
    <div class="card" style="background:#EFF6FF;border-color:#BFDBFE">
      <h2 style="font-weight:700;color:#1E40AF;margin-bottom:.6rem">${T('reading_before_read')}</h2>
      <p style="color:#1D4ED8;font-size:.95rem;line-height:1.65">${preTask}</p>
      <p style="font-size:.8rem;color:#60A5FA;margin-top:.6rem">${T('reading_think_hint')}</p>
    </div>
    <button class="btn-primary" onclick="_rState.phase='while';go('reading-task','${t.id}')">${T('reading_to_text')}</button>
  </div>`;
}

// Schritt 2 – While-Reading (Text + Aufgaben, gist → detail)
function renderReadingWhile(t){
  const isChecked = _rState.checked;
  const gistQs   = t.questions.map((q,i)=>({...q,origIdx:i})).filter(q=>q.gist);
  const detailQs  = t.questions.map((q,i)=>({...q,origIdx:i})).filter(q=>!q.gist);

  const renderQ = (q, num) => {
    const ans = _rState.answers[q.origIdx];
    return `<div>
      <p style="font-weight:600;color:#1E293B;margin-bottom:.4rem">${num}. ${q.q}</p>
      ${q.type==='mc'
        ? q.opts.map(o=>{
            let cls='opt-btn';
            if(isChecked){ if(o===q.ans) cls+=' opt-correct'; else if(o===ans) cls+=' opt-wrong'; }
            else if(o===ans) cls+=' opt-selected';
            return `<button class="${cls}" ${isChecked?'disabled':''} onclick="pickRQ(${q.origIdx},'${escQ(o)}')">${o}</button>`;
          }).join('')
        : ['true','false'].map(val=>{
            let cls='opt-btn';
            if(isChecked){ if(val===q.ans) cls+=' opt-correct'; else if(val===ans) cls+=' opt-wrong'; }
            else if(val===ans) cls+=' opt-selected';
            return `<button class="${cls}" style="display:inline-block;width:48%;margin-right:1%" ${isChecked?'disabled':''} onclick="pickRQ(${q.origIdx},'${val}')">${val==='true'?'True ✓':'False ✗'}</button>`;
          }).join('')
      }
      ${isChecked&&q.exp?`<p style="font-size:.78rem;color:#64748B;margin-top:.2rem;font-style:italic">${q.exp}</p>`:''}
    </div>`;
  };

  let num=0;
  const gistSection = gistQs.length>0 ? `
    <div>
      <p style="font-size:.73rem;font-weight:700;color:#7C3AED;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">${T('reading_gist_label')}</p>
      <div class="space-y-4">${gistQs.map(q=>renderQ(q,++num)).join('')}</div>
    </div>` : '';

  const detailSection = `
    <div>
      ${gistQs.length>0?`<p style="font-size:.73rem;font-weight:700;color:#0369A1;text-transform:uppercase;letter-spacing:.06em;margin:.75rem 0 .5rem">${T('reading_detail_label')}</p>`:''}
      <div class="space-y-4">${detailQs.map(q=>renderQ(q,++num)).join('')}</div>
    </div>`;

  const correct = t.questions.filter((q,i)=>_rState.answers[i]===q.ans).length;
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
      <button onclick="_rState.phase='pre';go('reading-task','${t.id}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${T('reading_step_pre')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('reading_while_prefix')} ${t.title}</h1>
    </div>
    ${_rStepBar('while')}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;align-items:start">
      <div class="card" style="background:#FFFBEB;border-color:#FDE68A;max-height:80vh;overflow-y:auto">
        <h3 style="font-weight:700;color:#92400E;margin-bottom:.75rem;font-size:.9rem">📖 ${t.title}</h3>
        <div style="font-size:.88rem;color:#44403C;line-height:1.85;white-space:pre-line">${t.text}</div>
      </div>
      <div class="card space-y-4">
        ${gistSection}
        ${detailSection}
        ${!isChecked
          ? `<div id="reading-err" style="color:#EF4444;font-size:.83rem;font-weight:600;min-height:1.1rem"></div>
             <button class="btn-primary" onclick="checkReading('${t.id}')">${T('reading_check')}</button>`
          : `<div class="${correct===t.questions.length?'feedback-ok':'feedback-info'}" style="margin-top:.25rem">${correct}/${t.questions.length} ${T('ex_correct_score')} ✓</div>
             <button class="btn-primary" style="margin-top:.5rem" onclick="_rState.phase='post';go('reading-task','${t.id}')">${T('reading_next_post')}</button>`
        }
      </div>
    </div>
  </div>`;
}

// Schritt 3 – Post-Reading (Reflexion / Reaktion)
function renderReadingPost(t){
  const correct = t.questions.filter((q,i)=>_rState.answers[i]===q.ans).length;
  const tasks = t.postReading && t.postReading.length
    ? t.postReading
    : [{prompt: t.level==='A2'
        ? T('reading_pre_default_a2')
        : T('reading_pre_default_a1')}];
  const taskCards = tasks.map((task, idx) => `
    <div style="background:#F0FDF4;border:1.5px solid #6EE7B7;border-radius:.9rem;padding:1rem 1.1rem;margin-bottom:.75rem">
      <p style="color:#065F46;font-size:.9rem;line-height:1.6;margin-bottom:.6rem;font-weight:600">${T('reading_post_task')} ${tasks.length>1?idx+1+':':''} ${task.prompt}</p>
      <textarea id="post-task-${idx}" rows="3" style="width:100%;border:1.5px solid #6EE7B7;border-radius:.75rem;padding:.65rem .8rem;font-size:.9rem;resize:vertical;font-family:inherit;outline:none;box-sizing:border-box" placeholder="${T('reading_post_textarea_ph')}"></textarea>
    </div>`).join('');
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center">
      <button onclick="_rState.phase='while';go('reading-task','${t.id}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${T('reading_step_while')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('reading_step_post')}</h1>
    </div>
    ${_rStepBar('post')}
    <div class="card" style="background:#ECFDF5;border-color:#6EE7B7">
      <div class="${correct===t.questions.length?'feedback-ok':'feedback-info'}" style="margin-bottom:.75rem">
        ${correct}/${t.questions.length} ${T('ex_correct_score')}
      </div>
      <h2 style="font-weight:700;color:#065F46;margin-bottom:.8rem">${T('reading_post_heading')}</h2>
      ${taskCards}
    </div>
    <button class="btn-primary" onclick="finishReading('${t.id}')">${T('reading_finish')}</button>
  </div>`;
}

function pickRQ(qi, val){
  const sy = window.scrollY;
  _rState.answers[qi] = val;
  _rState.phase = 'while';
  go('reading-task', _rState.id);
  setTimeout(()=>window.scrollTo(0,sy),0);
}

function checkReading(id){
  const t = READING.find(r=>r.id===id);
  const unanswered = t.questions.reduce((n,q,i)=>n+(_rState.answers[i]===undefined?1:0),0);
  if(unanswered>0){
    const el=document.getElementById('reading-err');
    if(el) el.textContent=T('reading_unanswered_pre')+unanswered+T('reading_unanswered_post');
    return;
  }
  _rState.checked=true;
  _rState.phase='while';
  go('reading-task',id);
}

function finishReading(id){
  if(!P.reading.includes(id)) P.reading.push(id);
  const _rt = READING.find(r=>r.id===id);
  if(_rt && _rt.questions.length){
    const correct = _rt.questions.filter((q,i)=>_rState.answers[i]===q.ans).length;
    const newPct = Math.round(correct/_rt.questions.length*100);
    if(!P.readingScores) P.readingScores = {};
    if(!P.readingScores[id] || newPct > P.readingScores[id]) P.readingScores[id] = newPct;
  }
  addXP(20); checkBadges(); save();
  _rState.phase='done';
  go('reading-task',id);
}

function renderReadingDone(t){
  const correct = t.questions.filter((q,i)=>_rState.answers[i]===q.ans).length;
  const pct = Math.round(correct/t.questions.length*100);
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">${pct===100?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${T('reading_done_heading')}</h2>
    <div style="font-size:2rem;font-weight:800;color:${pct===100?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${pct}%</div>
    <p style="color:#64748B;margin:.25rem 0 1rem">${correct}/${t.questions.length} ${T('ex_correct_score')}</p>
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="_rState={id:'${t.id}',phase:'vocab',answers:[],checked:false};go('reading-task','${t.id}')">${T('btn_try_again')}</button>
      <button class="btn-primary" onclick="go('reading-list')">${T('btn_all_texts')}</button>
    </div>
  </div>`;
}



const WRITING_PROMPTS = [
  {emoji:'✈️', prompt:'You just came back from a holiday. Write a postcard to your best friend. Tell them where you went, what you did and what was the best moment.', level:'A1', minWords:50},
  {emoji:'🐶', prompt:'You found a stray dog on the way home from school. Write a diary entry about what happened and what you did.', level:'A1', minWords:50},
  {emoji:'🏫', prompt:'A new student joins your class next week. Write an email to them explaining what your school is like and giving them three tips.', level:'A1', minWords:60},
  {emoji:'🎂', prompt:'It is your best friend\'s birthday. Write them a short letter. Talk about a funny memory you share and wish them a happy birthday.', level:'A1', minWords:50},
  {emoji:'🌧️', prompt:'It was a rainy Saturday and you were stuck at home. Write about what you did and whether it was a good or bad day.', level:'A2', minWords:70},
  {emoji:'🔮', prompt:'Imagine you could have one superpower for one day. What would it be? What would you do with it? Write a short story.', level:'A2', minWords:70},
  {emoji:'🍕', prompt:'Your town is getting a new place. You can choose: a new park, a new cinema, or a new sports centre. Write which one you would choose and why.', level:'A2', minWords:70},
  {emoji:'👽', prompt:'You discovered a small alien sitting in your garden. Write a short story about what happened next. Use the Simple Past.', level:'A2', minWords:80},
  {emoji:'📱', prompt:'Some people say that teenagers spend too much time on their phones. Do you agree or disagree? Write your opinion with two reasons.', level:'A2', minWords:80},
  {emoji:'🏆', prompt:'Tell the story of a time when you were very proud of yourself or someone you know. What happened? How did it feel?', level:'A2', minWords:80},,
  // School & Family
  {emoji:'🏫', level:'A1', type:'email', minWords:50, prompt:'Write an email to a new English pen pal and describe your school day. What subjects do you have? What do you like or dislike?'},
  {emoji:'👨‍👩‍👧', level:'A1', type:'diary', minWords:40, prompt:'Write a diary entry about a fun afternoon with your family. What did you do together?'},
  // Food & Hobbies
  {emoji:'🍕', level:'A1', type:'postcard', minWords:30, prompt:'You are on holiday and tried amazing local food. Write a postcard to a friend and describe what you ate.'},
  {emoji:'⚽', level:'A1', type:'story', minWords:50, prompt:'Write a short story about a sports competition or hobby event you took part in (real or imaginary).'},
  // Travel & Holidays
  {emoji:'✈️', level:'A2', type:'postcard', minWords:40, prompt:'Write a postcard from a dream holiday destination. Describe the weather, the activities, and the food.'},
  {emoji:'🌍', level:'A2', type:'article', minWords:60, prompt:'Write a short newspaper article about an amazing travel destination. Include: where it is, what to see, and why people should visit.'},
  // Digital Life & Clubs
  {emoji:'📱', level:'A2', type:'letter', minWords:60, prompt:'Write a formal letter to a company suggesting a new school app. What should it do? Why would it be helpful?'},
  {emoji:'🎭', level:'A2', type:'article', minWords:60, prompt:'Write a short article for the school newspaper about an after-school club. What do you do? Why should others join?'},
  // Christmas & Festivals
  {emoji:'🎄', level:'A1', type:'postcard', minWords:30, prompt:'Write a Christmas postcard to a friend. What are your holiday traditions? What gift did you like best?'},
  {emoji:'🎉', level:'A2', type:'article', minWords:60, prompt:'Write a short article about a festival in your country or region. What happens? When is it? Why is it special?'},
  // Autumn / Maple Hill themed
  {emoji:'🍂', level:'A2', type:'diary', minWords:50, prompt:'Imagine you found a mysterious note in the attic. Write a diary entry about what happened next.'},
  {emoji:'🔍', level:'A2', type:'story', minWords:60, prompt:'Write a short mystery story set in a forest in autumn. Include: a clue, a riddle, and a surprising ending.'},
  // Peace & Helping
  {emoji:'☮️', level:'A2', type:'letter', minWords:60, prompt:'Write a letter to a local newspaper about why it is important to be kind and help others. Give two or three examples.'},
  {emoji:'🤝', level:'A1', type:'email', minWords:50, prompt:'A new student has just arrived at your school. Write them a friendly welcome email and give them tips for their first week.'},
  // Shopping
  {emoji:'🛒', level:'A1', type:'story', minWords:40, prompt:'Write a funny short story about a shopping trip that went wrong.'}
];

let _wpState = {prompt: null, text: '', wordCount: 0};

function normPhrase(s){ return (s||'').toLowerCase().replace(/[.…\s]+$/,'').replace(/\s+/g,' ').trim(); }
function writingStartersPhrases(t){
  const rawStarters = (t.starters||[]).slice();
  const rawPhrases = (t.phrases||[]).slice();
  // Starters: keep as the sentence-opener column.
  const starterKeys = new Set(rawStarters.map(normPhrase));
  // Phrases: drop any that match a starter (dedupe), keep the rest as multi-word expressions.
  const phrases = rawPhrases.filter(p=>!starterKeys.has(normPhrase(p)));
  return {starters: rawStarters, phrases};
}

function renderWritingPrompts(){
  const prompt = _wpState.prompt;
  const words = _wpState.text.trim().split(/\s+/).filter(Boolean).length;
  const minW = prompt ? prompt.minWords : 50;
  const enough = prompt && words >= minW;

  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('writing-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← Writing</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('writing_free_heading')}</h1>
    </div>

    <div class="card" style="background:linear-gradient(135deg,#FCE7F3,#F5D0FE);border-color:#F0ABFC">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap">
        <div style="flex:1">
          ${prompt
            ? `<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem">
                <span style="font-size:1.8rem">${prompt.emoji}</span>
                <span class="pill-${prompt.level.toLowerCase()}">${prompt.level}</span>
                <span style="font-size:.78rem;color:#94A3B8">min. ${prompt.minWords} ${T('label_words')}</span>
              </div>
              <p style="font-weight:600;color:#1E293B;font-size:1rem;line-height:1.6">${prompt.prompt}</p>`
            : `<p style="color:#64748B;font-size:.95rem">${T('writing_prompt_empty')}</p>`
          }
        </div>
        <button onclick="newWritingPrompt()" style="background:#EC4899;color:#fff;border:none;border-radius:.75rem;padding:.6rem 1.1rem;font-size:.85rem;font-weight:700;cursor:pointer;flex-shrink:0">
          ${prompt ? T('writing_new_prompt') : T('writing_get_prompt')}
        </button>
      </div>
      ${(()=>{ if(!prompt) return ''; const de=ttIsDE(); const tt=TEXT_TYPES.find(x=>prompt.type===x.id||(prompt.prompt&&TEXT_TYPES.some(t=>t.id===x.id&&prompt.prompt.toLowerCase().includes((de?t.titleDE:t.titleEN).toLowerCase())))); if(!tt) return ''; const ttl=de?tt.titleDE:tt.titleEN; const str=de?tt.structureDE:tt.structureEN; return `<details style="margin-top:.75rem;border-top:1px solid rgba(0,0,0,.08);padding-top:.75rem"><summary style="cursor:pointer;font-size:.85rem;font-weight:600;color:#475569;list-style:none">📚 ${tt.emoji} ${T('writing_tips_for_pre')}${ttl}${T('writing_tips_for_post')}</summary><div style="margin-top:.5rem;font-size:.82rem;color:#44403C"><strong>${T('writing_structure')}:</strong> ${str.join(' → ')}</div><div style="margin-top:.3rem;font-size:.82rem;color:#44403C"><strong>${T('writing_useful_phrases')}:</strong> ${tt.phrases.slice(0,4).join(' · ')}</div></details>`; })()}
    </div>

    ${prompt ? `
    <div class="card">
      <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
        <h3 style="font-weight:700;color:#1E293B;font-size:.9rem">${T('writing_your_text')}</h3>
        <span style="font-size:.8rem;font-weight:600;color:${enough?'#10B981':'#94A3B8'}">${words}/${minW} ${T('label_words')}</span>
      </div>
      <div style="margin-bottom:.5rem">
        <label style="font-size:.82rem;font-weight:600;color:#1E293B;display:block;margin-bottom:.25rem">${T('writing_name_submit')}</label>
        <input type="text" placeholder="${T('writing_name_ph')}" autocomplete="name"
          style="width:100%;border:1.5px solid #E2E8F0;border-radius:.5rem;padding:.4rem .75rem;font-size:.88rem;outline:none;box-sizing:border-box"
          oninput="_wpState.name=this.value" value="${_wpState.name||''}">
      </div>
      <div style="margin-bottom:.5rem">
        <label style="font-size:.82rem;font-weight:600;color:#1E293B;display:block;margin-bottom:.25rem">${T('writing_teacher_label')}</label>
        ${teacherSelectHTML(true)}
      </div>
      <textarea id="wp-area" rows="10"
        style="width:100%;border:2px solid ${enough?'#6EE7B7':'#E2E8F0'};border-radius:.75rem;padding:.75rem 1rem;font-size:.95rem;font-family:inherit;resize:vertical;outline:none;transition:border .15s"
        placeholder="${T('writing_textarea_ph')}"
        oninput="updateWP(this.value)">${_wpState.text}</textarea>
      ${pb(Math.min(100, words/minW*100), '#EC4899')}
      ${enough ? `<p style="font-size:.8rem;color:#10B981;margin-top:.3rem;font-weight:600">${T('writing_goal_reached')}</p>` : ''}
    </div>

    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      <div id="wp-feedback" style="display:none;margin-bottom:.5rem"></div>
      <button class="btn-primary" style="background:#EC4899" ${!enough?'disabled':''} onclick="saveWPText()">
        ${enough ? T('writing_save') : T('writing_too_few_words')+' ('+(minW-words)+')'}
      </button>
      <button class="btn-secondary" onclick="if(confirm(T('writing_confirm_delete'))){_wpState.text='';go('writing-prompts')}">${T('writing_delete')}</button>
      <button class="btn-secondary" style="border-color:#3B82F6;color:#3B82F6" onclick="mailFreeWriting()">${T('writing_send_teacher')}</button>
    </div>
    <div id="mail-fallback-free" style="display:none;background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:.75rem;padding:.9rem 1rem;margin-top:.25rem">
      <p style="font-size:.85rem;font-weight:600;color:#92400E;margin-bottom:.5rem">${T('writing_mail_fallback_free')}</p>
      <button id="copy-mail-btn-free" onclick="copyFreeWritingText()" style="background:#F59E0B;color:#fff;border:none;border-radius:.5rem;padding:.45rem .9rem;font-size:.85rem;font-weight:700;cursor:pointer">${T('writing_mail_copy')}</button>
    </div>
    ` : ''}
  </div>`;
}

function newWritingPrompt(){
  const idx = Math.floor(Math.random() * WRITING_PROMPTS.length);
  _wpState = {prompt: WRITING_PROMPTS[idx], text: '', wordCount: 0};
  go('writing-prompts');
}

function updateWP(val){
  _wpState.text = val;
  const minW = _wpState.prompt ? _wpState.prompt.minWords : 50;
  const words = val.trim().split(/\s+/).filter(Boolean).length;
  const spans = document.querySelectorAll('span');
  const wLabel = T('label_words');
  spans.forEach(s=>{ if(s.textContent.match(/\d+\/\d+/)) { s.textContent = words+'/'+minW+' '+wLabel; s.style.color=words>=minW?'#10B981':'#94A3B8'; } });
}

function saveWPText(){
  const text = _wpState.text || '';
  const minW = _wpState.prompt ? _wpState.prompt.minWords : 50;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const checks = [];
  if(words < minW) checks.push(T('writing_too_few_words')+' (min. '+minW+')');
  const iLower = (text.match(/\bi\b/g)||[]).length;
  if(iLower > 0) checks.push(T('writing_capital_i'));
  if(!/[.!?]\s*$/.test(text.trim())) checks.push(T('writing_no_punct'));
  const fb = document.getElementById('wp-feedback');
  if(checks.length > 0 && fb){
    fb.innerHTML = '<div class="feedback-err"><strong>'+T('writing_check_now')+'</strong> '+checks.join(' · ')+'</div>';
    fb.style.display='block'; return;
  }
  const firstFreeWriting = !P.writing.includes('prompt-free');
  if(firstFreeWriting){ P.writing.push('prompt-free'); addXP(30); }
  checkBadges(); save();
  if(fb){ fb.innerHTML='<div class="feedback-ok">✓ '+T('ex_result_good')+'</div>'; fb.style.display='block'; }
}

// ── WRITING ──

const MINI_WORDS = ['school','friend','happy','summer','music','animal','garden','night','cloud','dream','water','story'];
let _miniState = {type:'', word:'', text:'', lines:[]};

function getMiniWord(){ return MINI_WORDS[Math.floor(Math.random()*MINI_WORDS.length)]; }

function updateHaikuPreview(){
  const pv=document.getElementById('haiku-preview');
  if(!pv) return;
  const lines=_miniState.lines||[];
  const filled=lines.filter(Boolean);
  pv.innerHTML=filled.length?filled.join('<br>'):'<span style="color:#94A3B8">'+T('writing_lines_ph')+'</span>';
}
function renderHaikuTask(){
  if(!_miniState.word || _miniState.type!=='haiku') _miniState={type:'haiku',word:getMiniWord(),text:'',lines:['','','']};
  const s=_miniState;
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('writing-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('writing_back')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">🌸 ${T('writing_haiku_title')}</h1>
    </div>
    <div class="card" style="background:#FFFBEB;border-color:#FDE68A">
      <h3 style="font-weight:700;color:#92400E;margin-bottom:.4rem">${T('writing_haiku_what')}</h3>
      <p style="font-size:.88rem;color:#44403C;line-height:1.6">${(P.lang||'en2')!=='de'?'A haiku is a short poem with <strong>3 lines</strong> and <strong>17 syllables</strong>: Line 1 has <strong>5 syllables</strong>, Line 2 has <strong>7 syllables</strong>, Line 3 has <strong>5 syllables</strong>. Haiku poems often describe nature or a single moment.':'Ein Haiku ist ein kurzes Gedicht aus <strong>3 Zeilen</strong> und <strong>17 Silben</strong>: Zeile 1 hat <strong>5 Silben</strong>, Zeile 2 hat <strong>7 Silben</strong>, Zeile 3 hat <strong>5 Silben</strong>. Haikus beschreiben oft die Natur oder einen Moment.'}</p>
      <details style="margin-top:.75rem"><summary style="cursor:pointer;font-size:.82rem;font-weight:600;color:#B45309">${T('writing_syllable_btn')}</summary>
        <div style="margin-top:.5rem;font-size:.83rem;color:#44403C;line-height:1.7">
          <p>${(P.lang||'en2')!=='de'?'A <strong>syllable</strong> is a beat in a word. Each vowel (<em>a, e, i, o, u</em>) usually makes one syllable.':'Eine <strong>Silbe</strong> ist ein Lautbaustein eines Wortes. Jeder Vokal (<em>a, e, i, o, u</em>) bildet meist eine Silbe.'}</p>
          <p style="margin-top:.3rem"><strong>${T('grammar_examples')}:</strong> <em>hap-py</em> = 2 ${(P.lang||'en2')!=='de'?'syllables':'Silben'} · <em>beau-ti-ful</em> = 3 ${(P.lang||'en2')!=='de'?'syllables':'Silben'} · <em>frog</em> = 1 ${(P.lang||'en2')!=='de'?'syllable':'Silbe'}</p>
          <p style="margin-top:.3rem">💡 ${(P.lang||'en2')!=='de'?'Tip: Put your hand under your chin and say the word aloud. Each chin movement = one syllable!':'Tipp: Leg eine Hand ans Kinn und sprich das Wort laut. Jede Kinnbewegung = eine Silbe!'}</p>
        </div>
      </details>
      <div style="margin-top:.75rem;background:#fff;border-radius:.5rem;padding:.6rem .9rem;font-style:italic;font-size:.88rem;color:#475569;line-height:1.8">
        <p>An old silent pond… <em style="color:#94A3B8;font-size:.75rem">(5)</em></p>
        <p>A frog jumps into the pond. <em style="color:#94A3B8;font-size:.75rem">(7)</em></p>
        <p>Splash! Silence again. <em style="color:#94A3B8;font-size:.75rem">(5)</em></p>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
        <p style="font-weight:700;color:#1E293B">${T('writing_haiku_write')}${s.word?` (${T('writing_topic_label')} <strong>${s.word}</strong>)`:''}</p>
        <button onclick="_miniState.word=getMiniWord();document.getElementById('app').innerHTML=render(_state)" style="font-size:.78rem;padding:.25rem .6rem;border-radius:.5rem;background:#FEF3C7;border:1px solid #FDE68A;color:#92400E;cursor:pointer">${T('writing_new_word')}</button>
      </div>
      ${[T('writing_line1'),T('writing_line2'),T('writing_line3')].map((label,i)=>`
        <div style="margin-bottom:.5rem">
          <label style="font-size:.75rem;color:#94A3B8;font-weight:600">${label}</label>
          <input type="text" value="${(s.lines[i]||'').replace(/"/g,'&quot;')}" oninput="_miniState.lines[${i}]=this.value;updateHaikuPreview();" 
            style="width:100%;border:1.5px solid #E2E8F0;border-radius:.5rem;padding:.45rem .75rem;font-size:.95rem;font-family:inherit;outline:none;box-sizing:border-box;margin-top:.15rem">
        </div>`).join('')}
    </div>
    <div id="haiku-preview" style="background:#F0FDF4;border:1.5px solid #6EE7B7;border-radius:.75rem;padding:1rem;min-height:4rem;text-align:center;font-style:italic;font-size:1rem;line-height:2;color:#065F46">
      ${_miniState.lines&&_miniState.lines.filter(Boolean).length?_miniState.lines.filter(Boolean).join('<br>'):'<span style="color:#94A3B8">'+T('writing_lines_ph')+'</span>'}
    </div>
  </div>`;
}

function updateAcrosticPreview(){
  const ap=document.getElementById('acrostic-preview');
  if(!ap||!_miniState.word) return;
  ap.innerHTML=_miniState.word.split('').map((l,j)=>{
    const line=(_miniState.lines&&_miniState.lines[j])||'';
    return line
      ? '<div><strong style="color:#F59E0B">'+l+'</strong>'+(line.length>1?line.slice(1):'')+'</div>'
      : '<div style="color:#CBD5E1;font-size:.85rem">'+l+'___</div>';
  }).join('');
}
function renderAcrosticTask(){
  if(!_miniState.word || _miniState.type!=='acrostic') _miniState={type:'acrostic',word:getMiniWord().toUpperCase(),text:'',lines:{}};
  const s=_miniState;
  const letters=s.word.split('');
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('writing-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('writing_back')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">🔤 ${T('writing_acrostic_title')}</h1>
    </div>
    <div class="card" style="background:#FFFBEB;border-color:#FDE68A">
      <h3 style="font-weight:700;color:#92400E;margin-bottom:.4rem">${T('writing_acrostic_what')}</h3>
      <p style="font-size:.88rem;color:#44403C;line-height:1.6">${(P.lang||'en2')!=='de'?'An acrostic poem is a poem where the <strong>first letters</strong> of each line spell out a word. Each line starts with the given letter.':'Ein Akrostichon ist ein Gedicht, bei dem die <strong>Anfangsbuchstaben</strong> jeder Zeile zusammen ein Wort ergeben. Jede Zeile beginnt mit dem vorgegebenen Buchstaben.'}</p>
      <div style="margin-top:.75rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
        <div style="background:#fff;border-radius:.5rem;padding:.6rem .9rem;font-size:.82rem;color:#475569;line-height:1.9">
          <p style="font-size:.7rem;color:#94A3B8;font-weight:700;margin-bottom:.25rem">${T('writing_example1')}</p>
          <p><strong style="color:#F59E0B">S</strong>unny</p>
          <p><strong style="color:#F59E0B">U</strong>nique</p>
          <p><strong style="color:#F59E0B">M</strong>agical</p>
          <p><strong style="color:#F59E0B">M</strong>ighty</p>
          <p><strong style="color:#F59E0B">E</strong>xciting</p>
          <p><strong style="color:#F59E0B">R</strong>estful</p>
        </div>
        <div style="background:#fff;border-radius:.5rem;padding:.6rem .9rem;font-size:.82rem;color:#475569;line-height:1.9">
          <p style="font-size:.7rem;color:#94A3B8;font-weight:700;margin-bottom:.25rem">${T('writing_example2')}</p>
          <p><strong style="color:#F59E0B">S</strong>unshine warms my face</p>
          <p><strong style="color:#F59E0B">U</strong>nder clouds we play</p>
          <p><strong style="color:#F59E0B">M</strong>emories never fade</p>
          <p><strong style="color:#F59E0B">M</strong>agic in the air</p>
          <p><strong style="color:#F59E0B">E</strong>choes fill the park</p>
          <p><strong style="color:#F59E0B">R</strong>ising like the sun</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div style="margin-bottom:.75rem">
        <p style="font-weight:700;color:#1E293B;margin-bottom:.4rem">✍️ ${T('writing_acrostic_for')} <strong style="color:#F59E0B">${s.word}</strong></p>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;align-items:center">
          <button onclick="_miniState={type:'acrostic',word:getMiniWord().toUpperCase(),lines:{},level:s.level||'word'};document.getElementById('app').innerHTML=render(_state)" style="font-size:.78rem;padding:.25rem .6rem;border-radius:.5rem;background:#FEF3C7;border:1px solid #FDE68A;color:#92400E;cursor:pointer">${T('writing_random_word')}</button>
          <span style="font-size:.75rem;color:#94A3B8">${T('writing_or')}</span>
          <input type="text" placeholder="Type your word + Enter" maxlength="10"
            style="padding:.25rem .6rem;border-radius:.5rem;font-size:.78rem;border:1px solid #E2E8F0;outline:none;text-transform:uppercase"
            id="acrostic-custom-input"
          onkeydown="if(event.key==='Enter'){const w=this.value.toUpperCase().replace(/[^A-Z]/g,'');if(w.length>=2){_miniState={type:'acrostic',word:w,lines:{},level:'word'};document.getElementById('app').innerHTML=render(_state);}}"
          >
        </div>
      </div>
      ${letters.map((letter,i)=>`
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem">
          <span style="font-size:1.1rem;font-weight:800;color:#F59E0B;min-width:1.4rem;text-align:center;background:#FFFBEB;border-radius:.3rem;padding:.1rem .3rem">${letter}</span>
          <input type="text" value="${(s.lines[i]||'').replace(/"/g,'&quot;')}"
            oninput="_miniState.lines[${i}]=this.value;updateAcrosticPreview();"
            placeholder="${s.level==='phrase'?letter+T('writing_acrostic_ph_phrase'):letter+T('writing_acrostic_ph')}"
            style="flex:1;border:1.5px solid #E2E8F0;border-radius:.5rem;padding:.4rem .7rem;font-size:.9rem;font-family:inherit;outline:none">
        </div>`).join('')}
    </div>
    <div id="acrostic-preview" style="background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:.75rem;padding:1rem;min-height:3rem;font-size:.95rem;line-height:2;color:#1E293B">
      ${Object.keys(s.lines||{}).length?letters.map((letter,i)=>s.lines[i]?`<div><strong style="color:#F59E0B">${letter}</strong>${s.lines[i].slice(1)||''}</div>`:`<div style="color:#E2E8F0">${letter}...</div>`).join(''):'<span style="color:#94A3B8">'+T('writing_lines_ph')+'</span>'}
    </div>
  </div>`;
}

function ttIsDE(){
  if(_ttLang==='de') return true;
  if(_ttLang==='en') return false;
  return (P.lang||'en2')==='de';
}
function setTTLang(l){
  _ttLang = l;
  document.getElementById('app').innerHTML = render(_state);
}

function renderWritingList(){
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
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem">
      <div style="display:flex;align-items:center;gap:1rem">
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('writing_title')}</h1>
      </div>
      <button onclick="go('writing-prompts')" style="background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;border:none;border-radius:.75rem;padding:.65rem 1.25rem;font-size:.9rem;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(236,72,153,.35)">${T('writing_free_btn')}</button>
    </div>

    <h2 style="font-size:1rem;font-weight:700;color:#475569">${T('writing_tasks_heading')}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem">
      ${WRITING.map(t=>{
        const done = P.writing.includes(t.id);
        return `<div onclick="go('writing-task','${t.id}')" class="card" style="cursor:pointer;border-color:${done?'#F9A8D4':'#F1F5F9'};background:${done?'#FCE7F3':'#fff'}">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
            <span class="pill-${t.level.toLowerCase()}">${t.level}</span>
            ${done?`<span style="font-size:.8rem;color:#9D174D;font-weight:700">${T('writing_done_label')}</span>`:''}
          </div>
          <h3 style="font-weight:700;color:#1E293B;margin-bottom:.3rem">${t.title}</h3>
          <p style="font-size:.8rem;color:#64748B">${wGoal(t)}</p>
          <p style="font-size:.75rem;color:#94A3B8;margin-top:.3rem">min. ${t.min} ${T('label_words')}</p>
        </div>`;
      }).join('')}
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-top:.5rem">
      <h2 style="font-size:1rem;font-weight:700;color:#475569">${T('writing_text_types_heading')}</h2>
      <div style="display:flex;gap:.4rem">
        <button onclick="setTTLang('de')" style="font-size:.78rem;padding:.35rem .8rem;border-radius:.6rem;font-weight:600;cursor:pointer;border:1.5px solid ${ttIsDE()?'#3B82F6':'#E2E8F0'};background:${ttIsDE()?'#3B82F6':'#fff'};color:${ttIsDE()?'#fff':'#64748B'}">🇩🇪 Deutsch</button>
        <button onclick="setTTLang('en')" style="font-size:.78rem;padding:.35rem .8rem;border-radius:.6rem;font-weight:600;cursor:pointer;border:1.5px solid ${!ttIsDE()?'#3B82F6':'#E2E8F0'};background:${!ttIsDE()?'#3B82F6':'#fff'};color:${!ttIsDE()?'#fff':'#64748B'}">🇬🇧 English</button>
      </div>
    </div>
    <p style="font-size:.85rem;color:#64748B;margin-top:-.25rem">${T('writing_text_types_sub')}</p>
    <div style="display:flex;flex-direction:column;gap:.5rem">
      ${TEXT_TYPES.map(tt=>{
        const de=ttIsDE();
        const title=de?tt.titleDE:tt.titleEN;
        const structure=de?tt.structureDE:tt.structureEN;
        const tips=de?tt.tipsDE:tt.tipsEN;
        return `
        <details style="background:#fff;border:1.5px solid ${tt.border};border-radius:.75rem;overflow:hidden">
          <summary style="padding:.75rem 1rem;cursor:pointer;display:flex;align-items:center;gap:.75rem;background:${tt.color};font-weight:700;color:#1E293B;list-style:none;-webkit-appearance:none">
            <span style="font-size:1.4rem">${tt.emoji}</span>
            <span style="flex:1">${title}</span>
            <span style="font-size:.75rem;color:#64748B;font-weight:400">${T('writing_structure_tips')}</span>
          </summary>
          <div style="padding:1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem">
            <div>
              <p style="font-size:.8rem;font-weight:700;color:#475569;margin-bottom:.4rem">${T('writing_structure')}</p>
              ${structure.map(s=>`<p style="font-size:.82rem;color:#44403C;padding:.2rem 0;border-bottom:1px solid #F1F5F9">• ${s}</p>`).join('')}
            </div>
            <div>
              <p style="font-size:.8rem;font-weight:700;color:#475569;margin-bottom:.4rem">${T('writing_tips')}</p>
              ${tips.map(s=>`<p style="font-size:.82rem;color:#44403C;padding:.2rem 0">✓ ${s}</p>`).join('')}
              <p style="font-size:.8rem;font-weight:700;color:#475569;margin:0.6rem 0 .4rem">${T('writing_useful_phrases')}</p>
              ${tt.phrases.map(s=>`<p style="font-size:.82rem;color:#3B82F6;background:#EFF6FF;padding:.2rem .5rem;border-radius:.4rem;margin-bottom:.2rem">${s}</p>`).join('')}
            </div>
          </div>
        </details>`;}).join('')}
    </div>

    <h2 style="font-size:1rem;font-weight:700;color:#475569;margin-top:.5rem">${T('writing_creative_heading')||'Kreativ-Ecke'}</h2>
    <p style="font-size:.82rem;color:#94A3B8;margin-top:-.4rem">${T('writing_creative_sub')||'Zum Ausprobieren, wenn du Lust hast.'}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.6rem">
      <div onclick="go('writing-haiku')" class="card" style="cursor:pointer;background:#fff;border-color:#FDE68A;padding:.85rem">
        <div style="font-size:1.5rem;margin-bottom:.2rem">🌸</div>
        <h3 style="font-weight:700;color:#92400E;font-size:.88rem;margin-bottom:.15rem">${T('writing_haiku_create')}</h3>
        <p style="font-size:.76rem;color:#B45309">${T('writing_haiku_sub')}</p>
      </div>
      <div onclick="go('writing-acrostic')" class="card" style="cursor:pointer;background:#fff;border-color:#FDE68A;padding:.85rem">
        <div style="font-size:1.5rem;margin-bottom:.2rem">🔤</div>
        <h3 style="font-weight:700;color:#92400E;font-size:.88rem;margin-bottom:.15rem">${T('writing_acrostic_create')}</h3>
        <p style="font-size:.76rem;color:#B45309">${T('writing_acrostic_sub')}</p>
      </div>
    </div>
  </div>`;
}

function wGoal(t){ return (P.lang||'en2')==='de' ? (t.goalDE||t.goal||'') : (t.goalEN||t.goalDE||t.goal||''); }
function wChecklist(t){ return (P.lang||'en2')==='de' ? (t.checklistDE||t.checklist||[]) : (t.checklistEN||t.checklistDE||t.checklist||[]); }

let _wState = {id:'', text:'', checklist:[], submitted:false};
let _ttLang = null; // text-types display language override: null=follow app, 'de', 'en'
function renderWritingTask(id){
  const t = WRITING.find(w=>w.id===id);
  if(!t) return `<p>${T('error_not_found')}</p>`;
  if(_wState.id!==id){ _wState = {id, text:'', name:'', checklist:new Array(wChecklist(t).length).fill(false), submitted:false}; }

  const words = _wState.text.trim().split(/\s+/).filter(Boolean).length;
  const enough = words >= t.min;
  const done = P.writing.includes(id);

  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('writing-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← Writing</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${t.title}</h1>
    </div>

    <div class="card" style="background:#FCE7F3;border-color:#F9A8D4">
      <p style="font-weight:700;color:#831843;margin-bottom:.3rem">${T('writing_task_label')}</p>
      <p style="color:#44403C">${wGoal(t)}</p>
      <p style="font-size:.8rem;color:#9D174D;margin-top:.3rem">min. ${t.min} ${T('label_words')}</p>
    </div>

    ${(()=>{
      const wordPct = Math.min(100, Math.round(words/t.min*100));
      const checkDone = _wState.checklist.filter(Boolean).length;
      const checkPct = wChecklist(t).length ? Math.round(checkDone/wChecklist(t).length*100) : 100;
      const totalPct = Math.round((wordPct + checkPct) / 2);
      const col = totalPct >= 100 ? '#10B981' : totalPct >= 60 ? '#F59E0B' : '#EF4444';
      return `<div class="card" style="padding:.75rem 1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem">
          <span style="font-size:.85rem;font-weight:700;color:#1E293B">${T('writing_progress')}</span>
          <span style="font-size:.9rem;font-weight:800;color:${col}">${totalPct}%</span>
        </div>
        ${pb(totalPct, col)}
        <div style="display:flex;gap:1rem;margin-top:.4rem;font-size:.75rem;color:#64748B">
          <span>${T('writing_words_label')} ${words}/${t.min} (${wordPct}%)</span>
          <span>${T('writing_checklist_label')} ${checkDone}/${wChecklist(t).length} (${checkPct}%)</span>
        </div>
      </div>`;
    })()}

    ${(()=>{ const de=ttIsDE(); const tt=TEXT_TYPES.find(x=>x.matchType===t.type); if(!tt) return ''; const ttl=de?tt.titleDE:tt.titleEN; const str=de?tt.structureDE:tt.structureEN; const tps=de?tt.tipsDE:tt.tipsEN; return `<details style="background:${tt.color};border:1.5px solid ${tt.border};border-radius:.75rem;overflow:hidden"><summary style="padding:.65rem 1rem;cursor:pointer;display:flex;align-items:center;gap:.75rem;font-weight:700;color:#1E293B;list-style:none;-webkit-appearance:none"><span>${tt.emoji}</span><span style="flex:1;font-size:.9rem">${T('writing_text_type_label')} ${ttl}</span><span style="font-size:.75rem;color:#64748B;font-weight:400">${T('writing_structure_tips_short')}</span></summary><div style="padding:.75rem 1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.75rem"><div><p style="font-size:.78rem;font-weight:700;color:#475569;margin-bottom:.3rem">${T('writing_structure')}</p>${str.map(s=>`<p style="font-size:.8rem;color:#44403C;padding:.15rem 0;border-bottom:1px solid rgba(0,0,0,.05)">• ${s}</p>`).join('')}</div><div><p style="font-size:.78rem;font-weight:700;color:#475569;margin-bottom:.3rem">${T('writing_tips')}</p>${tps.map(s=>`<p style="font-size:.8rem;color:#44403C;padding:.15rem 0">✓ ${s}</p>`).join('')}</div></div></details>`; })()}

    ${(()=>{ const sp=writingStartersPhrases(t); return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.75rem">
      <div class="card">
        <h3 style="font-weight:700;color:#1E293B;margin-bottom:.5rem;font-size:.9rem">${T('writing_starters')}</h3>
        ${sp.starters.map(s=>`<p style="font-size:.85rem;color:#3B82F6;background:#EFF6FF;padding:.3rem .6rem;border-radius:.5rem;margin-bottom:.3rem">${s}</p>`).join('')}
      </div>
      ${sp.phrases.length?`<div class="card">
        <h3 style="font-weight:700;color:#1E293B;margin-bottom:.5rem;font-size:.9rem">${T('writing_phrases_heading')}</h3>
        ${sp.phrases.map(p=>`<p style="font-size:.85rem;color:#64748B;margin-bottom:.2rem">• ${p}</p>`).join('')}
      </div>`:''}
    </div>`; })()}

    <details class="card" style="cursor:pointer">
      <summary style="font-weight:600;color:#64748B;font-size:.9rem">${T('writing_example_show')}</summary>
      <p style="margin-top:.75rem;font-size:.9rem;color:#44403C;line-height:1.7;white-space:pre-line">${t.example}</p>
    </details>

    <div class="card">
      <div style="margin-bottom:.75rem">
        <label style="font-size:.85rem;font-weight:600;color:#1E293B;display:block;margin-bottom:.3rem">${T('writing_name_label')}</label>
        <input id="writing-name" type="text" placeholder="${T('writing_name_ph')}" autocomplete="name"
          style="width:100%;border:1.5px solid #E2E8F0;border-radius:.75rem;padding:.5rem .75rem;font-size:.9rem;outline:none;box-sizing:border-box"
          oninput="_wState.name=this.value" value="${_wState.name}">
      </div>
      <div style="margin-bottom:.75rem">
        <label style="font-size:.85rem;font-weight:600;color:#1E293B;display:block;margin-bottom:.3rem">${T('writing_teacher_label')}</label>
        ${teacherSelectHTML(false)}
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
        <h3 style="font-weight:700;color:#1E293B;font-size:.9rem">${T('writing_your_text')}</h3>
        <span style="font-size:.8rem;font-weight:600;color:${enough?'#10B981':'#94A3B8'}">${words}/${t.min} ${T('label_words')}</span>
      </div>
      <textarea id="writing-area" rows="10" style="width:100%;border:1.5px solid ${enough?'#6EE7B7':'#E2E8F0'};border-radius:.75rem;padding:.75rem;font-size:.95rem;font-family:inherit;resize:vertical;outline:none;transition:border .15s" placeholder="${T('writing_textarea_ph')}" oninput="updateWriting('${id}',this.value)">${_wState.text}</textarea>
      ${pb(Math.min(100,words/t.min*100),'#10B981')}
    </div>

    <div class="card">
      <h3 style="font-weight:700;color:#1E293B;margin-bottom:.75rem;font-size:.9rem">${T('writing_checklist_heading')}</h3>
      ${wChecklist(t).map((item,ci)=>`<div onclick="toggleWCheck('${id}',${ci})" style="display:flex;align-items:center;gap:.75rem;padding:.4rem 0;cursor:pointer">
        <span style="font-size:1.1rem">${_wState.checklist[ci]?'✅':'⭕'}</span>
        <span style="font-size:.9rem;color:#44403C;${_wState.checklist[ci]?'text-decoration:line-through;opacity:.5':''}">${item}</span>
      </div>`).join('')}
    </div>

    ${!done ? `<div id="writing-feedback" style="display:none"></div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      <button class="btn-primary" style="background:#EC4899;flex:1;min-width:10rem" onclick="submitWritingCheck('${id}')">${enough?T('writing_check_save'):T('writing_too_few_words')+' ('+(t.min-words)+')'}</button>
      ${(()=>{
        const cl = wChecklist(t);
        const clDone = cl.length===0 || cl.every((_,ci)=>_wState.checklist[ci]);
        const missing = !_wState.name.trim()||!(P.teacherEmail||'').trim();
        const disabled = !clDone || missing;
        return `<button class="btn-secondary" style="flex:1;min-width:10rem;border-color:#EC4899;color:#EC4899" ${disabled?`disabled title="${!clDone?T('writing_checklist_gate'):T('writing_teacher_required')}"`:''} onclick="mailWriting('${id}')">${T('writing_send_teacher')}</button>
        ${!clDone?`<p style="flex-basis:100%;font-size:.8rem;color:#B45309;background:#FFFBEB;border:1px solid #FDE68A;border-radius:.5rem;padding:.5rem .75rem;margin:0">☑️ ${T('writing_checklist_gate')}</p>`:''}`;
      })()}
    </div>
    <div id="mail-fallback-${id}" style="display:none;background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:.75rem;padding:.9rem 1rem;margin-top:.25rem">
      <p style="font-size:.85rem;font-weight:600;color:#92400E;margin-bottom:.5rem">${T('writing_mail_fallback_hint')}</p>
      <p style="font-size:.8rem;color:#64748B;margin-bottom:.5rem">${T('writing_mail_fallback_sub')}</p>
      <button id="copy-mail-btn" onclick="copyMailText()" style="background:#F59E0B;color:#fff;border:none;border-radius:.5rem;padding:.45rem .9rem;font-size:.85rem;font-weight:700;cursor:pointer">${T('writing_mail_copy')}</button>
    </div>`
    : `<div class="feedback-ok" style="margin-bottom:.75rem">✓ ${T('ex_result_good')}</div>
    <details class="card" style="cursor:pointer;margin-top:.5rem">
      <summary style="font-weight:600;color:#64748B;font-size:.9rem">${T('writing_show_submitted')}</summary>
      <div style="margin-top:.75rem">
        <div style="font-size:.85rem;font-weight:600;color:#475569;margin-bottom:.3rem">${T('writing_your_text_label')}</div>
        <p style="font-size:.9rem;color:#44403C;white-space:pre-line;line-height:1.7;background:#F8FAFC;padding:.75rem;border-radius:.5rem">${_wState.text||T('writing_no_text')}</p>
        ${(_wState.keywords && _wState.keywords.length) ? `<div style="margin-top:.5rem;font-size:.8rem;color:#065F46;background:#ECFDF5;padding:.5rem .75rem;border-radius:.5rem">${T('writing_keywords_found')} ${_wState.keywords.join(', ')}</div>` : ''}
      </div>
    </details>`}
  </div>`;
}

function updateWriting(id, val){
  _wState.text = val;
  const t = WRITING.find(w=>w.id===id);
  const words = val.trim().split(/\s+/).filter(Boolean).length;
  const enough = words >= t.min;
  const counter = document.querySelector('[id="writing-area"] ~ *');
  // just re-update word count display
  const spans = document.querySelectorAll('span');
  spans.forEach(s=>{ if(s.textContent.includes('/'+t.min)){ s.textContent = words+'/'+t.min+' '+T('label_words'); s.style.color=enough?'#10B981':'#94A3B8'; } });
}

function toggleWCheck(id, ci){
  _wState.checklist[ci] = !_wState.checklist[ci];
  const sy = window.scrollY;
  go('writing-task',id);
  setTimeout(()=>{
    window.scrollTo(0, sy);
    const ta=document.getElementById('writing-area'); if(ta) ta.value=_wState.text;
  },0);
}

const WRITING_KEYWORDS = {
  w1: ['my name is', 'years old', 'i live', 'i like', 'favourite', 'weekend', 'write soon'],
  w2: ['weather', 'yesterday', 'greetings from', 'see you', 'great time'],
  w3: ['saturday', 'sunday', 'first', 'then', 'finally', 'enjoyed', 'favourite'],
  w4: ['once', 'suddenly', 'said', 'because', 'in the end']
};

function submitWritingCheck(id){
  const t = WRITING.find(w=>w.id===id);
  const words = (_wState.text||'').trim().split(/\s+/).filter(Boolean).length;
  const checkDone = _wState.checklist.filter(Boolean).length;
  const missing = [];
  if(words < (t?t.min:60)) missing.push(T('writing_min_words_pre')+words+'/'+(t?t.min:60)+T('writing_min_words_post'));
  if(checkDone < (t?wChecklist(t).length:0)) missing.push(T('writing_checklist_pre')+checkDone+'/'+(t?wChecklist(t).length:0)+T('writing_checklist_post'));
  if(missing.length > 0){
    const fb = document.getElementById('writing-feedback');
    if(fb){
      fb.style.display='block';
      fb.innerHTML = `<div class="feedback-err"><strong>${T('writing_not_done_yet')}</strong><br>${missing.map(m=>'• '+m).join('<br>')}</div>`;
    }
    return;
  }
  submitWriting(id);
}

function submitWriting(id){
  const t = WRITING.find(w=>w.id===id);
  const text = _wState.text;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const checks = [];
  // word count
  if(words < t.min) checks.push('⚠ '+T('writing_too_few_words')+' (min. '+t.min+')');
  // I always capitalized
  const iLower = (text.match(/\bi\b/g)||[]).length;
  if(iLower > 0) checks.push('⚠ '+T('writing_capital_i'));
  // ends with punctuation
  if(!/[.!?]\s*$/.test(text.trim())) checks.push('⚠ '+T('writing_no_punct'));
  // checklist items
  const checked = (_wState.checklist||[]).filter(Boolean).length;
  const total = (wChecklist(t)||[]).length;
  if(checked < total) checks.push('⚠ '+T('writing_checklist_open_pre')+(total-checked)+T('writing_checklist_open_post'));

  // keyword check
  const kws = WRITING_KEYWORDS[id] || [];
  const textLower = text.toLowerCase();
  const kwResults = kws.map(k => ({kw: k, found: textLower.includes(k.toLowerCase())}));
  const missing = kwResults.filter(k => !k.found);

  const fb = document.getElementById('writing-feedback');
  if(fb) {
    let kwHtml = '';
    if(kwResults.length > 0){
      kwHtml = '<div style="margin-top:.5rem"><p style="font-size:.82rem;font-weight:700;color:#1E293B;margin-bottom:.4rem">'+T('writing_keywords_label')+'</p><div style="display:flex;flex-wrap:wrap;gap:.3rem">'
        + kwResults.map(k=>`<span style="font-size:.78rem;padding:.2rem .6rem;border-radius:99px;background:${k.found?'#D1FAE5':'#FEE2E2'};color:${k.found?'#065F46':'#991B1B'};font-weight:600">${k.found?'✅':'❌'} ${k.kw}</span>`).join('')
        + '</div></div>';
    }
    if(checks.length > 0){
      fb.innerHTML = '<div class="feedback-err" style="margin-bottom:.75rem"><strong>'+T('writing_please_check')+'</strong><ul style="margin:.4rem 0 0 1.2rem">'+checks.map(c=>'<li style="font-size:.85rem">'+c+'</li>').join('')+'</ul>'+kwHtml+'</div>';
      fb.style.display='block';
      return;
    } else if(missing.length > 0){
      fb.innerHTML = '<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:.75rem;padding:.75rem;margin-bottom:.75rem">'+kwHtml+'<p style="font-size:.8rem;color:#92400E;margin-top:.4rem">'+T('writing_can_submit')+'</p></div>';
      fb.style.display='block';
    } else {
      fb.innerHTML = '<div class="feedback-ok" style="margin-bottom:.75rem">'+kwHtml+'</div>';
      fb.style.display='block';
    }
  }
  // XP nur beim ersten Abschluss der Aufgabe – sonst lässt sich durch
  // wiederholtes Abgeben desselben Textes XP sammeln.
  const firstCompletion = !P.writing.includes(id);
  if(firstCompletion) P.writing.push(id);
  // Save submitted text + keywords for review
  const foundKws = (WRITING_KEYWORDS[id]||[]).filter(k=>(_wState.text||'').toLowerCase().includes(k));
  _wState.keywords = foundKws;
  if(firstCompletion) addXP(30);
  checkBadges(); save();
  go('writing-task',id);
}


function teacherSelectHTML(small){
  const opts = teacherOptions();
  const cur = (P.teacherEmail||'').trim();
  const known = opts.find(o=>o.email===cur);
  const isOther = cur && !known;
  const pad = small ? '.4rem .75rem' : '.5rem .75rem';
  const fs = small ? '.88rem' : '.9rem';
  const radius = small ? '.5rem' : '.75rem';
  let html = `<select onchange="onTeacherSelect(this.value)" style="width:100%;border:1.5px solid #E2E8F0;border-radius:${radius};padding:${pad};font-size:${fs};outline:none;box-sizing:border-box;background:#fff;cursor:pointer">`;
  html += `<option value="" ${!cur?'selected':''} disabled>${T('writing_teacher_choose')}</option>`;
  opts.forEach(o=>{
    html += `<option value="${o.email}" ${o.email===cur?'selected':''}>${o.name} (${o.email})</option>`;
  });
  html += `<option value="__other__" ${isOther?'selected':''}>${T('writing_teacher_other')}</option>`;
  html += `</select>`;
  // free-text field shown when "other" is chosen or a custom address is stored
  html += `<input type="email" id="teacher-other-input" placeholder="${T('writing_teacher_ph')}" autocomplete="email" inputmode="email"
    style="width:100%;margin-top:.4rem;border:1.5px solid #E2E8F0;border-radius:${radius};padding:${pad};font-size:${fs};outline:none;box-sizing:border-box;display:${isOther?'block':'none'}"
    oninput="setTeacherEmail(this.value)" value="${isOther?cur:''}">`;
  if(cur && (known||isOther)){
    html += `<p style="font-size:.72rem;color:#10B981;margin-top:.25rem;font-weight:600">${T('writing_teacher_saved')}</p>`;
  }
  return html;
}
function onTeacherSelect(val){
  if(val==='__other__'){
    const inp = document.getElementById('teacher-other-input');
    if(inp){ inp.style.display='block'; inp.focus(); }
    P.teacherEmail=''; save();
  } else {
    P.teacherEmail = val; save();
    const inp = document.getElementById('teacher-other-input');
    if(inp) inp.style.display='none';
  }
}
function setTeacherEmail(v){ P.teacherEmail = (v||'').trim(); save(); }

function mailFreeWriting(){
  const name = (_wpState.name||'').trim();
  const to = (P.teacherEmail||'').trim();
  const text = _wpState.text || '';
  // Friendly guard: need a name, a teacher address and some text
  const wpFb = document.getElementById('wp-feedback');
  const problems = [];
  if(!name) problems.push(T('writing_name_required'));
  if(!to) problems.push(T('writing_teacher_required'));
  if(!text.trim()) problems.push(T('writing_free_empty'));
  if(problems.length){
    if(wpFb){ wpFb.style.display='block'; wpFb.innerHTML = `<div class="feedback-err"><strong>${T('writing_not_done_yet')}</strong><br>${problems.map(m=>'• '+m).join('<br>')}</div>`; }
    return;
  }
  const prompt = _wpState.prompt;
  const promptText = prompt ? prompt.prompt : T('writing_free_heading');
  const wCount = text.trim().split(/\s+/).filter(Boolean).length;
  const subject = encodeURIComponent('[Free Writing] ' + promptText.substring(0,40) + ' – ' + name);
  const bodyText = T('writing_mail_greeting')+'\n\n' +
    T('writing_mail_student')+' ' + name + '\n' +
    T('writing_mail_prompt_label')+' ' + promptText + '\n' +
    T('writing_mail_words')+' ' + wCount + '\n\n' +
    '--- ' + T('writing_mail_text_label') + ' ---\n\n' + text;
  window._freeMailText = bodyText;
  const a = document.createElement('a');
  a.href = 'mailto:' + to + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText);
  a.click();
  setTimeout(()=>{ const fb=document.getElementById('mail-fallback-free'); if(fb) fb.style.display='block'; }, 400);
}

function copyFreeWritingText(){
  const text = window._freeMailText || '';
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>{ const b=document.getElementById('copy-mail-btn-free'); if(b){b.textContent='✓ Kopiert!';b.style.background='#10B981';} });
  } else {
    const ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    const b=document.getElementById('copy-mail-btn-free'); if(b){b.textContent='✓ Kopiert!';b.style.background='#10B981';}
  }
}

function mailWriting(id){
  const t = WRITING.find(w=>w.id===id);
  // Same completeness check as the save button before sending
  const wordsNow = (_wState.text||'').trim().split(/\s+/).filter(Boolean).length;
  const checkDoneNow = (_wState.checklist||[]).filter(Boolean).length;
  const missingNow = [];
  if(wordsNow < (t?t.min:60)) missingNow.push(T('writing_min_words_pre')+wordsNow+'/'+(t?t.min:60)+T('writing_min_words_post'));
  if(checkDoneNow < (t?wChecklist(t).length:0)) missingNow.push(T('writing_checklist_pre')+checkDoneNow+'/'+(t?wChecklist(t).length:0)+T('writing_checklist_post'));
  if(missingNow.length > 0){
    const fb = document.getElementById('writing-feedback');
    if(fb){ fb.style.display='block'; fb.innerHTML = `<div class="feedback-err"><strong>${T('writing_not_done_yet')}</strong><br>${missingNow.map(m=>'• '+m).join('<br>')}</div>`; }
    return;
  }
  const name = (_wState.name||'').trim() || 'Unbekannt';
  const text = _wState.text || '';
  const wCount = text.trim().split(/\s+/).filter(Boolean).length;
  const subject = encodeURIComponent('[Writing] ' + (t?t.title:T('writing_task_label')) + ' – ' + name);
  const bodyText = T('writing_mail_greeting')+'\n\n' +
    T('writing_mail_student')+' ' + name + '\n' +
    T('writing_mail_task_label')+' ' + (t?t.title:'') + '\n' +
    T('writing_mail_words')+' ' + wCount + '\n\n' +
    '--- ' + T('writing_mail_text_label') + ' ---\n\n' + text;
  const body = encodeURIComponent(bodyText);
  const to = (P.teacherEmail||'').trim();
  const mailto = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
  // Open mailto (works on devices with mail app configured)
  const a = document.createElement('a');
  a.href = mailto;
  a.click();
  // Show copy fallback hint after short delay
  setTimeout(()=>{
    const fb = document.getElementById('mail-fallback-' + id);
    if(fb) fb.style.display = 'block';
    // Store text for copy
    window._mailBodyText = bodyText;
  }, 400);
}

function copyMailText(){
  const text = window._mailBodyText || '';
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>{
      const btn = document.getElementById('copy-mail-btn');
      if(btn){ btn.textContent='✓ Kopiert!'; btn.style.background='#10B981'; }
    }).catch(()=>{ alert(T('writing_copy_manual')+'\n\n' + text); });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.getElementById('copy-mail-btn');
    if(btn){ btn.textContent='✓ Kopiert!'; btn.style.background='#10B981'; }
  }
}


