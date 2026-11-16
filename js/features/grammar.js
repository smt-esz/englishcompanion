// ═══════════════════════════════════════════════
// GRAMMAR
// ═══════════════════════════════════════════════
function renderWortarten(){
  const isDE = (P.lang||'en2')==='de';
  const sections=[
    {id:'noun',emoji:'🧩',title:'Nouns',color:'#EFF6FF',border:'#BFDBFE',accent:'#1E40AF',
     intro:isDE?'Nomen bezeichnen Personen, Tiere, Dinge oder abstrakte Begriffe. Im Englischen werden Nomen <strong>nicht großgeschrieben</strong> (außer am Satzanfang und bei Eigennamen).':'Nouns name people, animals, things or abstract ideas. In English, nouns are <strong>not capitalised</strong> (except at the start of a sentence and for proper nouns).',
     rows:isDE?[
       ['Singular (Einzahl)','a dog, the book, a city'],
       ['Plural (Mehrzahl)','dogs, books, cities — meist + s/es'],
       ['Eigennamen (immer groß)','London, Emma, Monday, English'],
       ['Zählbar / Nicht zählbar','a chair (zählbar) vs. water, music (nicht zählbar)'],
       ['Artikel','a/an = unbestimmt &nbsp;·&nbsp; the = bestimmt'],
     ]:[
       ['Singular','a dog, the book, a city'],
       ['Plural','dogs, books, cities — usually + s/es'],
       ['Proper nouns (always capital)','London, Emma, Monday, English'],
       ['Countable / Uncountable','a chair (countable) vs. water, music (uncountable)'],
       ['Articles','a/an = indefinite &nbsp;·&nbsp; the = definite'],
     ],
     examples:['I have <u>a dog</u>.','The <u>book</u> is on the table.','<u>Emma</u> lives in <u>London</u>.']
    },
    {id:'verb',emoji:'⚡',title:'Verbs',color:'#ECFDF5',border:'#6EE7B7',accent:'#065F46',
     intro:isDE?'Verben drücken Handlungen, Vorgänge oder Zustände aus. Im Englischen verändert sich das Verb je nach Zeitform und Person.':'Verbs express actions, events or states. In English, the verb form changes depending on tense and person.',
     rows:[
       ['Simple Present','I play · he play<strong>s</strong>'],
       ['Simple Past','I play<strong>ed</strong> / go → went (irreg.)'],
       ['Present Progressive','I <strong>am playing</strong> · she <strong>is</strong> play<strong>ing</strong>'],
       ['Going-to Future','I <strong>am going to</strong> play'],
       ['Present Perfect','I <strong>have played</strong> · she <strong>has</strong> play<strong>ed</strong>'],
       [isDE?'Modal Verbs – Modalverben':'Modal Verbs','can, must, should, will, may + infinitive'],
     ],
     examples:['She <u>plays</u> football every day.','We <u>went</u> to the cinema yesterday.','He <u>is reading</u> a book right now.']
    },
    {id:'adj',emoji:'🎨',title:'Adjectives',color:'#FFFBEB',border:'#FDE68A',accent:'#92400E',
     intro:isDE?'Adjektive beschreiben Nomen. Im Englischen stehen Adjektive <strong>vor dem Nomen</strong>. Sie verändern ihre Form nicht (kein Genus, kein Kasus).':'Adjectives describe nouns. In English, adjectives go <strong>before the noun</strong>. They do not change their form (no gender, no case).',
     rows:isDE?[
       ['Attributiv (vor Nomen)','a <strong>tall</strong> girl, an <strong>old</strong> house'],
       ['Prädikativ (nach to be)','She is <strong>tall</strong>. The house is <strong>old</strong>.'],
       ['Komparativ (Vergleich)','tall → tall<strong>er</strong> · good → <strong>better</strong>'],
       ['Superlativ (höchste Stufe)','tall → <strong>the tallest</strong> · good → <strong>the best</strong>'],
       ['Mehrs. Adjektive','interesting → more interesting / the most interesting'],
     ]:[
       ['Attributive (before noun)','a <strong>tall</strong> girl, an <strong>old</strong> house'],
       ['Predicative (after to be)','She is <strong>tall</strong>. The house is <strong>old</strong>.'],
       ['Comparative','tall → tall<strong>er</strong> · good → <strong>better</strong>'],
       ['Superlative','tall → <strong>the tallest</strong> · good → <strong>the best</strong>'],
       ['Long adjectives','interesting → more interesting / the most interesting'],
     ],
     examples:['I have a <u>new</u> bike.','The film was <u>boring</u>.','She is <u>taller</u> than her brother.']
    },
    {id:'adv-freq',emoji:'🔁',title:'Adverbs of Frequency',color:'#ECFEFF',border:'#A5F3FC',accent:'#155E75',
     intro:isDE?'Diese Adverbien sagen, <strong>wie oft</strong> etwas passiert. Sie stehen meist <strong>vor dem Hauptverb</strong>, aber <strong>nach</strong> to be.':'These adverbs say <strong>how often</strong> something happens. They usually go <strong>before the main verb</strong>, but <strong>after</strong> to be.',
     rows:[
       ['always',isDE?'immer (100 %)':'always (100%)'],
       ['usually / normally',isDE?'meistens (~80 %)':'most of the time (~80%)'],
       ['often',isDE?'oft (~60 %)':'often (~60%)'],
       ['sometimes',isDE?'manchmal (~40 %)':'sometimes (~40%)'],
       ['rarely / seldom',isDE?'selten (~20 %)':'rarely (~20%)'],
       ['never',isDE?'nie (0 %)':'never (0%)'],
     ],
     examples:['I <u>always</u> brush my teeth.','She <u>sometimes</u> watches TV.','He is <u>never</u> late.','They <u>often</u> play football at the weekend.']
    },
    {id:'adv-time',emoji:'⏰',title:'Adverbs of Time',color:'#ECFEFF',border:'#A5F3FC',accent:'#155E75',
     intro:isDE?'Zeitadverbien sagen, <strong>wann</strong> etwas passiert. Sie stehen am <strong>Satzanfang</strong> oder <strong>Satzende</strong> — nicht in der Satzmitte.':'Time adverbs say <strong>when</strong> something happens. They go at the <strong>start or end</strong> of the sentence — not in the middle.',
     rows:isDE?[
       ['Vergangenheit','yesterday, last week, two days ago, in 2020'],
       ['Gegenwart','today, now, at the moment, this week'],
       ['Zukunft','tomorrow, next Monday, in three days, soon'],
       ['Sonstiges','recently, already, yet, still, just'],
     ]:[
       ['Past','yesterday, last week, two days ago, in 2020'],
       ['Present','today, now, at the moment, this week'],
       ['Future','tomorrow, next Monday, in three days, soon'],
       ['Other','recently, already, yet, still, just'],
     ],
     examples:['<u>Yesterday</u>, we went to the park.','She is watching TV <u>at the moment</u>.<br><em>'+(isDE?'Tipp: Zeitadverbien können auch am Satzanfang stehen: <u>Every day</u>, my sister plays the guitar.':'Tip: Time adverbs can also go at the start: <u>Every day</u>, my sister plays the guitar.')+'</em>']
    },
    {id:'adv-manner',emoji:'🎯',title:'Adverbs of Manner',color:'#ECFEFF',border:'#A5F3FC',accent:'#155E75',
     intro:isDE?'Modaladverbien beschreiben, <strong>wie</strong> etwas passiert. Sie stehen meist <strong>nach dem Verb</strong> (oder nach dem Objekt). Bildung: Adjektiv + <strong>-ly</strong>.':'Adverbs of manner describe <strong>how</strong> something happens. They usually go <strong>after the verb</strong> (or after the object). Form: adjective + <strong>-ly</strong>.',
     rows:[
       ['quick → quickly',isDE?'schnell':'fast'],
       ['careful → carefully',isDE?'sorgfältig':'carefully'],
       ['loud → loudly',isDE?'laut':'loudly'],
       ['good → well',isDE?'gut (Ausnahme!)':'well (exception!)'],
       ['hard → hard',isDE?'hart / angestrengt (kein -ly)':'hard (no -ly)'],
       ['fast → fast',isDE?'schnell (kein -ly)':'fast (no -ly)'],
     ],
     examples:['She sings <u>beautifully</u>.','He works very <u>hard</u>.','Please speak <u>slowly</u>.']
    },
    {id:'prep',emoji:'📍',title:'Prepositions',color:'#F8FAFC',border:'#E2E8F0',accent:'#334155',
     intro:isDE?'Präpositionen zeigen <strong>Ort, Zeit oder Richtung</strong> an. Die wichtigsten drei für Zeit und Ort:':'Prepositions show <strong>place, time or direction</strong>. The most important ones for time and place:',
     rows:[
       ['at',isDE?'Uhrzeit, Orte (Punkt): <em>at 3 o\'clock, at school, at home</em>':'times, specific places: <em>at 3 o\'clock, at school, at home</em>'],
       ['on',isDE?'Wochentage, Daten, Flächen: <em>on Monday, on 5th May, on the table</em>':'days, dates, surfaces: <em>on Monday, on 5th May, on the table</em>'],
       ['in',isDE?'Monate, Jahre, Räume: <em>in July, in 2020, in the room, in Berlin</em>':'months, years, rooms: <em>in July, in 2020, in the room, in Berlin</em>'],
       ['to',isDE?'Richtung/Ziel: <em>go to school, travel to London</em>':'direction/destination: <em>go to school, travel to London</em>'],
       ['from',isDE?'Herkunft: <em>I\'m from Germany</em>':'origin: <em>I\'m from Germany</em>'],
       ['with',isDE?'Begleitung/Mittel: <em>with friends, write with a pen</em>':'company/means: <em>with friends, write with a pen</em>'],
     ],
     examples:['I go to school <u>at</u> 7:30.','We have English <u>on</u> Tuesdays.','She lives <u>in</u> Berlin.']
    },
    {id:'pronoun',emoji:'👤',title:'Pronouns',color:'#EFF6FF',border:'#BFDBFE',accent:'#1E40AF',
     intro:isDE?'Pronomen ersetzen Nomen. Im Englischen gibt es <strong>Subjekt-</strong> und <strong>Objektpronomen</strong> sowie Possessivpronomen.':'Pronouns replace nouns. In English there are <strong>subject</strong> and <strong>object pronouns</strong> as well as possessive pronouns.',
     rows:isDE?[
       ['Subjekt','I, you, he, she, it, we, they'],
       ['Objekt','me, you, him, her, it, us, them'],
       ['Possessiv (Attribut)','my, your, his, her, its, our, their'],
       ['Possessiv (allein)','mine, yours, his, hers, its, ours, theirs'],
       ['Reflexiv','-self / -selves: myself, yourself, himself ...'],
     ]:[
       ['Subject','I, you, he, she, it, we, they'],
       ['Object','me, you, him, her, it, us, them'],
       ['Possessive (before noun)','my, your, his, her, its, our, their'],
       ['Possessive (standalone)','mine, yours, his, hers, its, ours, theirs'],
       ['Reflexive','-self / -selves: myself, yourself, himself ...'],
     ],
     examples:['<u>She</u> likes <u>him</u>.','Is this book <u>yours</u>?','<u>He</u> hurt <u>himself</u>.']
    },
  ];
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
      <button onclick="go('grammar')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('grammar_back')}</button>
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('grammar_wortarten_title')}</h1>
        <p style="font-size:.85rem;color:#64748B">${T('grammar_wortarten_full_sub')}</p>
      </div>
    </div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;padding:.6rem 0;margin-bottom:.25rem">
      <button onclick="startWAQuiz()" class="btn-primary" style="font-size:.88rem">${T('grammar_wortarten_start_quiz')}</button>
      <span style="font-size:.82rem;color:#64748B">${T('grammar_wortarten_quiz_desc')}</span>
    </div>
    ${sections.map(s=>`<div class="card" style="background:${s.color};border-color:${s.border};padding:1.25rem 1.5rem">
      <h2 style="font-weight:800;color:${s.accent};margin-bottom:.5rem;font-size:1rem">${s.emoji} ${s.title}</h2>
      <p style="font-size:.88rem;color:#374151;margin-bottom:.85rem;line-height:1.6">${s.intro}</p>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem;margin-bottom:.85rem">
        ${s.rows.map((r,i)=>`<tr style="background:${i%2===0?'rgba(255,255,255,.6)':'rgba(255,255,255,.2)'}">
          <td style="padding:.4rem .75rem;font-weight:700;color:${s.accent};white-space:nowrap;border-radius:.25rem 0 0 .25rem;width:40%">${r[0]}</td>
          <td style="padding:.4rem .75rem;color:#374151">${r[1]}</td>
        </tr>`).join('')}
      </table>
      <div style="background:rgba(255,255,255,.7);border-radius:.75rem;padding:.6rem .9rem">
        <p style="font-size:.75rem;font-weight:700;color:${s.accent};margin-bottom:.3rem">${T('grammar_examples_heading')}</p>
        ${s.examples.map(e=>`<p style="font-size:.85rem;color:#1E293B;margin:.15rem 0">• ${e.replace(/<u>/g,'<u style="color:'+s.accent+';font-weight:700;text-decoration-color:'+s.accent+'">')}</p>`).join('')}
      </div>
    </div>`).join('')}
  </div>`;
}

// ═══════════════════════════════════════════════
// THEMEN-CHECK: "Bin ich sicher?" pro Grammatikthema
// 6 zufällige Fragen; ab 80 % gilt das Thema als gemeistert (✓ sicher).
// Darunter: konkrete Übungsempfehlungen, die die Lücken schließen.
// ═══════════════════════════════════════════════
let _gcheck = null;

function startGrammarCheck(topicId){
  const t = GRAMMAR.find(g=>g.id===topicId);
  if(!t) return;
  const pool = [
    ...t.exercises.filter(e=>e.type==='mc').flatMap(e=>e.questions||[]),
    ...((GRAMMAR_POOL[topicId]||[]).filter(e=>e.type==='mc').flatMap(e=>e.questions||[]))
  ];
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  _gcheck = {topicId, title:t.title, questions:pool.slice(0,6), idx:0, right:0, answered:false, done:false, logged:false};
  go('grammar-check', topicId);
}

function renderGrammarCheck(){
  const s = _gcheck;
  if(!s) return renderGrammarList();
  const t = GRAMMAR.find(g=>g.id===s.topicId);
  if(s.done){
    const pct = Math.round(s.right/s.questions.length*100);
    const safe = pct >= 80;
    if(!s.logged){
      s.logged = true;
      if(!P.grammar[s.topicId]) P.grammar[s.topicId] = {};
      P.grammar[s.topicId].checkPct = pct;
      P.grammar[s.topicId].checkDate = new Date().toISOString().slice(0,10);
      if(safe){ P.grammar[s.topicId].completed = true; confettiBurst(45); }
      else { if(!P.errors) P.errors={}; const k='grammar:'+s.topicId; P.errors[k]=(P.errors[k]||0)+1; }
      addXP(safe?10:5); checkBadges(); save();
    }
    return `<div class="space-y-4">
      <div class="card" style="text-align:center;padding:1.75rem">
        <div style="font-size:3rem">${safe?'🏅':'💪'}</div>
        <h2 style="font-size:1.3rem;font-weight:800;color:#1E293B;margin:.4rem 0">${safe?T('gc_safe'):T('gc_notyet_title')}</h2>
        <div style="font-size:2rem;font-weight:800;color:${safe?'#10B981':'#F59E0B'}">${pct}%</div>
        ${pb(pct, safe?'#10B981':'#F59E0B')}
        ${safe
          ? `<p style="font-size:.88rem;color:#059669;margin-top:.6rem">${T('gc_safe_sub')}</p>`
          : `<div style="text-align:left;margin-top:1rem;background:#FFFBEB;border:1px solid #FDE68A;border-radius:.75rem;padding:.8rem 1rem">
              <p style="font-size:.85rem;font-weight:700;color:#92400E;margin-bottom:.5rem">${T('gc_recommend')}</p>
              <div style="display:flex;flex-direction:column;gap:.4rem">
                <button onclick="go('grammar-topic','${s.topicId}')" style="text-align:left;background:#fff;border:1.5px solid #FDE68A;border-radius:.6rem;padding:.5rem .75rem;font-size:.85rem;font-weight:600;color:#92400E;cursor:pointer">💡 ${T('gc_rec_rule')}</button>
                ${(t?t.exercises:[]).map(ex=>`<button onclick="go('grammar-exercise','${s.topicId}','${ex.id}')" style="text-align:left;background:#fff;border:1.5px solid #FDE68A;border-radius:.6rem;padding:.5rem .75rem;font-size:.85rem;font-weight:600;color:#92400E;cursor:pointer">✏️ ${ex.title}</button>`).join('')}
              </div>
            </div>`}
        <div style="display:flex;gap:.6rem;justify-content:center;margin-top:1rem">
          <button class="btn-secondary" onclick="startGrammarCheck('${s.topicId}')">${T('btn_try_again')}</button>
          <button class="btn-primary" onclick="go('grammar-topic','${s.topicId}')">${T('grammar_back_topic')}</button>
        </div>
      </div>
    </div>`;
  }
  const q = s.questions[s.idx];
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('grammar-topic','${s.topicId}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${s.title}</button>
      <h1 style="font-size:1.2rem;font-weight:800;color:#1E293B;flex:1">🧭 ${T('gc_title')}</h1>
      <span style="font-size:.85rem;color:#94A3B8">${s.idx+1}/${s.questions.length}</span>
    </div>
    ${pb((s.idx/s.questions.length)*100,'#8B5CF6')}
    <div class="card space-y-3">
      <p style="font-weight:700;color:#1E293B;font-size:1rem;line-height:1.4">${q.q}</p>
      <div id="gc-opts">
        ${q.opts.map((o,oi)=>`<button class="opt-btn" id="gcopt-${oi}" onclick="gcPick(${oi})">${o}</button>`).join('')}
      </div>
      <div id="gc-feedback"></div>
    </div>
  </div>`;
}

function gcPick(oi){
  const s = _gcheck;
  if(s.answered) return;
  s.answered = true;
  const q = s.questions[s.idx];
  const right = oi === q.correct;
  if(right) s.right++;
  document.querySelectorAll('#gc-opts .opt-btn').forEach(b=>b.disabled=true);
  const btn = document.getElementById('gcopt-'+oi);
  if(btn) btn.className = right?'opt-btn opt-correct':'opt-btn opt-wrong';
  if(!right){ const cb=document.getElementById('gcopt-'+q.correct); if(cb) cb.className='opt-btn opt-correct'; }
  const fb = document.getElementById('gc-feedback');
  if(fb) fb.innerHTML = `${!right&&q.exp?`<div class="feedback-info">💡 ${q.exp}</div>`:''}
    <button class="btn-primary" style="width:100%;margin-top:.5rem" onclick="gcNext()">${s.idx+1<s.questions.length?T('btn_next'):T('ex_show_result')}</button>`;
}
function gcNext(){
  _gcheck.idx++;
  _gcheck.answered = false;
  if(_gcheck.idx >= _gcheck.questions.length) _gcheck.done = true;
  go('grammar-check', _gcheck.topicId);
}

function gDesc(t){ return (P.lang||'en2')==='de' ? (t.desc||'') : (t.descEN||t.desc||''); }

function renderGrammarList(){
  const cats = [...new Set(GRAMMAR.map(t=>t.cat))];
  return `<div class="space-y-8">
    <div><h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('grammar_title')}</h1>
    <p style="color:#64748B;margin-top:.3rem">${T('grammar_sub')}</p></div>
    <div onclick="go('grammar-wortarten')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#F0FDF4;border-color:#6EE7B7" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow=''">
      <span style="font-size:2rem">🔤</span>
      <div style="flex:1">
        <h3 style="font-weight:700;color:#1E293B">${T('grammar_wortarten')}</h3>
        <p style="font-size:.8rem;color:#64748B">${T('grammar_list_wortarten_sub')}</p>
      </div>
      <span style="color:#10B981">›</span>
    </div>
    ${cats.map(cat=>{
      const topics = GRAMMAR.filter(t=>t.cat===cat);
      return `<div class="card" style="padding:1.25rem">
        <h2 style="font-weight:700;color:#1E293B;margin-bottom:.75rem;font-size:1rem">${cat}</h2>
        <div style="display:flex;flex-direction:column;gap:.5rem">
          ${topics.map(t=>{
            const done = P.grammar[t.id]&&P.grammar[t.id].completed;
            const score = P.grammar[t.id]&&P.grammar[t.id].score;
            return `<div onclick="go('grammar-topic','${t.id}')" style="display:flex;align-items:center;gap:1rem;padding:.75rem 1rem;border-radius:.75rem;cursor:pointer;border:1.5px solid ${done?'#6EE7B7':'#F1F5F9'};background:${done?'#ECFDF5':'#fff'};transition:all .15s" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='${done?'#ECFDF5':'#fff'}'">
              <span style="font-size:1.2rem">${done?'✅':'⭕'}</span>
              <div style="flex:1">
                <p style="font-weight:600;color:#1E293B;font-size:.9rem">${t.title}</p>
                <p style="font-size:.75rem;color:#94A3B8">${t.level} · ${gDesc(t)}</p>
              </div>
              ${score!==undefined?`<span style="font-size:.75rem;font-weight:700;background:${score>=80?'#D1FAE5':'#F1F5F9'};color:${score>=80?'#065F46':'#64748B'};padding:.2rem .6rem;border-radius:99px">${score}%</span>`:''}
              <span style="color:#CBD5E1">›</span>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}
    <div style="border-top:1px solid #F1F5F9;padding-top:1rem;margin-top:.25rem">
      <p style="font-size:.72rem;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">${T('games_bonus_label')}</p>
      <div onclick="go('spiele')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#FFF7ED;border-color:#FED7AA" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow=''">
        <span style="font-size:2rem">🎮</span>
        <div style="flex:1">
          <h3 style="font-weight:700;color:#1E293B">${T('nav_games')}</h3>
          <p style="font-size:.8rem;color:#64748B">${T('grammar_games_sub')}</p>
        </div>
        <span style="color:#F97316">›</span>
      </div>
    </div>
  </div>`;
}

// Observe: Die farbigen Markierungen sind eine Hilfe, die man sich holt –
// zuerst sollen die Sätze ohne Hinweis betrachtet werden.
function toggleObsColors(){
  const list = document.getElementById('obs-list'); if(!list) return;
  const on = list.classList.toggle('show-colors');
  const btn = document.getElementById('obs-color-btn');
  if(btn) btn.textContent = '🎨 ' + T(on ? 'obs_colors_hide' : 'obs_colors_show');
}
function renderGrammarTopic(id){
  const t = GRAMMAR.find(g=>g.id===id);
  if(!t) return '<p>Topic not found.</p>';
  const pg = P.grammar[id]||{};
  const ohe = GRAMMAR_OHE[id]||{};
  const tab = _state.data || 'observe';

  const tBtn = (key,emoji,label) => `<button onclick="go('grammar-topic','${id}','${key}')"
    style="padding:.5rem 1.1rem;border-radius:.75rem;font-size:.85rem;font-weight:600;cursor:pointer;border:none;
    background:${tab===key?'#3B82F6':'#F1F5F9'};color:${tab===key?'#fff':'#64748B'};transition:all .15s">${emoji} ${label}</button>`;

  let content = '';
  if(tab==='observe'){
    const sentences = ohe.observe||t.examples.map(e=>e.en).slice(0,5);
    content = `<div class="card space-y-5">
      <p style="font-size:.88rem;color:#64748B;font-style:italic">${T('grammar_observe_intro')}</p>
      <div id="obs-list" style="display:flex;flex-direction:column;gap:.4rem">
        ${sentences.map(s=>`<div style="background:#F8FAFC;border-left:3px solid #3B82F6;padding:.55rem .85rem;border-radius:0 .5rem .5rem 0;font-size:.95rem;font-weight:600;color:#1E293B"><span class="obs-plain">${s}</span><span class="obs-color">${colorSentence(s,t.id)}</span></div>`).join('')}
        <div class="obs-color" style="margin-top:.4rem">${grammarLegendHTML(t.id)}</div>
      </div>
      <button class="chip-btn" id="obs-color-btn" onclick="toggleObsColors()">🎨 ${T('obs_colors_show')}</button>
      ${ohe.observeQ?`<div style="background:#FFFBEB;border-radius:.75rem;padding:.9rem;border:1px solid #FDE68A">
        <p style="font-weight:700;color:#92400E;font-size:.88rem;margin-bottom:.3rem">${T('grammar_your_task')}</p>
        <p style="font-size:.85rem;color:#44403C">${(P.lang||'en2')!=='de'&&ohe.observeQEN ? ohe.observeQEN : ohe.observeQ}</p>
        ${ohe.hint?`<button onclick="toggleObsHint()" id="obs-hint-btn" style="background:none;border:none;cursor:pointer;font-size:.82rem;color:#92400E;opacity:.6;margin-top:.25rem;padding:.15rem .4rem">${T('grammar_show_hint')}</button><div id="obs-hint-box" style="display:none;font-size:.8rem;color:#92400E;margin-top:.25rem;font-style:italic;padding:.3rem .6rem;background:#FFFBEB;border-radius:.4rem">${T('grammar_hint_prefix')} ${(P.lang||'en2')!=='de'&&ohe.hintEN ? ohe.hintEN : ohe.hint}</div>`:''}
      </div>`:''}
      ${ohe.signal?`<div>
        <p style="font-weight:600;color:#1E293B;font-size:.82rem;margin-bottom:.35rem">${T('grammar_signals')}</p>
        <div style="display:flex;gap:.35rem;flex-wrap:wrap">
          ${ohe.signal.map(s=>`<span style="background:#ECFEFF;color:#0E7490;padding:.2rem .6rem;border-radius:99px;font-size:.8rem;font-weight:500">${s}</span>`).join('')}
        </div>
      </div>`:''}
      <button onclick="go('grammar-topic','${id}','rule')" class="btn-primary" style="width:100%">${T('grammar_to_rule')}</button>
    </div>`;
  } else if(tab==='rule'){
    content = `<div class="space-y-5">
      <div class="card">
        <h2 style="font-weight:700;color:#1E293B;margin-bottom:.9rem">${T('grammar_formula')}</h2>
        ${renderFormula(id)}
        <div style="display:flex;gap:.5rem;margin-bottom:.75rem">
          <button id="lang-de" onclick="showLang('de')" class="${(P.lang||'en2')==='de'?'btn-primary':'btn-secondary'}" style="font-size:.8rem;padding:.4rem .9rem">${T('grammar_rules_de')}</button>
          <button id="lang-en" onclick="showLang('en')" class="${(P.lang||'en2')!=='de'?'btn-primary':'btn-secondary'}" style="font-size:.8rem;padding:.4rem .9rem">${T('grammar_rules_en')}</button>
        </div>
        <div id="expl-de" ${(P.lang||'en2')!=='de'?'style="display:none"':''}>
          ${t.exDE.map(p=>`<p style="color:#334155;font-size:.9rem;margin-bottom:.6rem">${colorExpl(p)}</p>`).join('')}
        </div>
        <div id="expl-en" ${(P.lang||'en2')==='de'?'style="display:none"':''}>
          ${t.exEN.map(p=>`<p style="color:#334155;font-size:.9rem;margin-bottom:.6rem">${colorExpl(p)}</p>`).join('')}
        </div>
      </div>
      <div class="card">
        <h2 style="font-weight:700;color:#1E293B;margin-bottom:.75rem">${T('grammar_examples')}</h2>
        ${grammarLegendHTML(t.id)}
        <div style="display:flex;flex-direction:column;gap:.5rem">
          ${t.examples.map(ex=>`<div style="padding:.6rem .75rem;background:#F8FAFC;border-radius:.75rem">
            <p style="font-weight:600;font-size:.9rem;margin-bottom:.2rem">${colorSentence(ex.en,t.id)}</p>
            <p style="color:#94A3B8;font-size:.82rem">${ex.de}</p>
          </div>`).join('')}
        </div>
      </div>
      ${t.mistakes?`<div id="mistakes-wrap" class="card" style="background:#FFF7ED;border-color:#FED7AA">
        <button onclick="toggleMistakes()" style="background:none;border:none;cursor:pointer;font-weight:700;color:#92400E;font-size:.9rem">${T('grammar_mistakes_btn')} <span id="mistakes-arrow">▼</span></button>
        <div id="mistakes-body" style="display:none;margin-top:.75rem">
          ${t.mistakes.map(m=>`<div style="margin-bottom:.75rem;padding:.6rem .75rem;background:#fff;border-radius:.5rem"><p style="color:#EF4444;font-size:.85rem;margin-bottom:.25rem">✗ <em>${m.wrong}</em></p><p style="color:#10B981;font-size:.85rem;margin-bottom:.2rem">✓ <strong>${m.correct}</strong></p>${m.tip?`<p style="font-size:.78rem;color:#64748B;margin-top:.1rem">💡 ${m.tip}</p>`:''}</div>`).join('')}
        </div>
      </div>`:''}
      <button onclick="go('grammar-topic','${id}','exercises')" class="btn-primary" style="width:100%">${T('grammar_now_practise')}</button>
    </div>`;
  } else {
    // exercises tab – difficulty-based (stars 1/2/3)
    const pool=GRAMMAR_POOL[id]||[];
    const d1Pool=pool.filter(e=>(e.diff||1)===1);
    const d2Pool=pool.filter(e=>(e.diff||1)===2);
    const d3Pool=pool.filter(e=>(e.diff||1)===3);
    if(!_gPick[id])_gPick[id]={};
    if(d1Pool.length&&!_gPick[id].d1){_gPick[id].d1=d1Pool[Math.floor(Math.random()*d1Pool.length)].id;}
    if(d2Pool.length&&!_gPick[id].d2){_gPick[id].d2=d2Pool[Math.floor(Math.random()*d2Pool.length)].id;}
    if(d3Pool.length&&!_gPick[id].d3){_gPick[id].d3=d3Pool[Math.floor(Math.random()*d3Pool.length)].id;}
    const ex1=d1Pool.find(e=>e.id===_gPick[id].d1);
    const ex2=d2Pool.find(e=>e.id===_gPick[id].d2);
    const ex3=d3Pool.find(e=>e.id===_gPick[id].d3);
    // history
    const hist=(P.gHistory&&P.gHistory[id])||[];
    const typeLabel=tp=>tp==='mc'?'Multiple Choice':tp==='fg'?T('type_fg'):tp==='wo'?T('type_wo'):tp;
    const lvlCard=(ex,diff)=>{
      if(!ex)return '';
      const starStr=['','⭐','⭐⭐','⭐⭐⭐'][diff]||'';
      const lastDone=hist.filter(h=>h.diff===diff);
      const lastEntry=lastDone.length?lastDone[lastDone.length-1]:null;
      return `<div style="background:#fff;border:2px solid #E2E8F0;border-radius:1rem;padding:1rem 1.1rem;display:flex;align-items:center;gap:.75rem;transition:border .15s" onmouseover="this.style.borderColor='#93C5FD'" onmouseout="this.style.borderColor='#E2E8F0'">
        <div style="font-size:1.4rem">📝</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;color:#1E293B;font-size:.88rem;margin-bottom:.25rem">${ex.title}</div>
          <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
            <span style="color:#F59E0B;font-size:.82rem">${starStr}</span>
            <span style="font-size:.72rem;background:#F1F5F9;color:#64748B;border-radius:99px;padding:.1rem .5rem">${typeLabel(ex.type)}</span>
            ${lastEntry?`<span style="font-size:.7rem;color:#94A3B8">${T('grammar_last')} ${lastEntry.pct}%</span>`:`<span style="font-size:.7rem;color:#10B981;font-weight:600">${T('grammar_new_task')}</span>`}
          </div>
        </div>
        <button onclick="go('grammar-exercise','${id}','${ex.id}')" class="btn-primary" style="font-size:.8rem;padding:.45rem 1rem;flex-shrink:0">Start →</button>
      </div>`;
    };
    // stats/history section
    const histSection=hist.length>0?`
      <details class="card" style="cursor:pointer;padding:.75rem 1rem;background:#F8FAFC">
        <summary style="font-weight:600;color:#64748B;font-size:.85rem">${T('grammar_done_tasks')} (${hist.length})</summary>
        <div style="margin-top:.75rem;display:flex;flex-direction:column;gap:.35rem">
          ${hist.slice(-10).reverse().map(h=>{
            const secs=Math.round((h.time||0)/1000);
            const timeStr=secs>=60?Math.floor(secs/60)+'m '+String(secs%60).padStart(2,'0')+'s':secs+'s';
            return `<div style="display:flex;align-items:center;gap:.5rem;font-size:.8rem;padding:.35rem .5rem;background:#fff;border-radius:.5rem">
              <span style="color:#F59E0B">${['','⭐','⭐⭐','⭐⭐⭐'][h.diff]||''}</span>
              <span style="flex:1;color:#1E293B;font-weight:600">${h.title||''}</span>
              <span style="color:${h.pct>=80?'#10B981':h.pct>=60?'#3B82F6':'#F59E0B'};font-weight:700">${h.pct}%</span>
              <span style="color:#94A3B8">⏱ ${timeStr}</span>
            </div>`;
          }).join('')}
        </div>
      </details>`:'';
    // related vocab topic for memory link
    const relVocab = VOCAB.find(v=>v.id===id) || null;
    content=`<div class="space-y-3">
      ${hist.length>0?`<div style="background:#EFF6FF;border-radius:.75rem;padding:.5rem .85rem;font-size:.82rem;color:#1D4ED8">${T('grammar_auto_change')}</div>`:''}
      ${lvlCard(ex1,1)}
      ${lvlCard(ex2,2)}
      ${lvlCard(ex3,3)}
      ${histSection}
      <div style="border-top:2px solid #E2E8F0;padding-top:.75rem;margin-top:.25rem">
        <p style="font-size:.78rem;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.6rem">${T('grammar_challenge_section')}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.5rem">
          <div onclick="go('grammar-quickfire','${id}')" style="cursor:pointer;padding:.75rem 1rem;background:linear-gradient(135deg,#FDF4FF,#EFF6FF);border-radius:.75rem;border:1.5px solid #C4B5FD">
            <div style="font-size:1.5rem;margin-bottom:.2rem">⚡</div>
            <p style="font-weight:700;color:#6B21A8;font-size:.85rem;margin-bottom:.1rem">Quick-Fire</p>
            <p style="font-size:.75rem;color:#94A3B8">${T('games_qf_topic_desc')}</p>
          </div>
          <div onclick="go('grammar-quickfire','mixed')" style="cursor:pointer;padding:.75rem 1rem;background:#FDF4FF;border-radius:.75rem;border:1.5px solid #E9D5FF">
            <div style="font-size:1.5rem;margin-bottom:.2rem">🎲</div>
            <p style="font-weight:700;color:#6B21A8;font-size:.85rem;margin-bottom:.1rem">${T('games_mixed_qs_label')}</p>
            <p style="font-size:.75rem;color:#94A3B8">${T('games_mixed_qs_desc')}</p>
          </div>
          ${relVocab&&relVocab.words.length>=4?`<div onclick="go('vocab-memory','${id}')" style="cursor:pointer;padding:.75rem 1rem;background:#EFF6FF;border-radius:.75rem;border:1.5px solid #BFDBFE">
            <div style="font-size:1.5rem;margin-bottom:.2rem">🃏</div>
            <p style="font-weight:700;color:#1D4ED8;font-size:.85rem;margin-bottom:.1rem">Memory</p>
            <p style="font-size:.75rem;color:#94A3B8">${T('label_vocab')}</p>
          </div>`:''}
          <div onclick="go('hangman')" style="cursor:pointer;padding:.75rem 1rem;background:#FFF7ED;border-radius:.75rem;border:1.5px solid #FED7AA">
            <div style="font-size:1.5rem;margin-bottom:.2rem">🎯</div>
            <p style="font-weight:700;color:#92400E;font-size:.85rem;margin-bottom:.1rem">${T('hm_title')}</p>
            <p style="font-size:.75rem;color:#94A3B8">${T('games_hm_desc_short')}</p>
          </div>
        </div>
      </div>
    </div>`;
  }

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
      <button onclick="go('grammar')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('grammar_back')}</button>
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${t.title}</h1>
        <p style="color:#64748B;font-size:.85rem"><span class="pill-${t.level.toLowerCase()}">${t.level}</span> · ${t.cat}</p>
      </div>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
      ${tBtn('observe','👀',T('grammar_tab_observe'))}
      ${tBtn('rule','💡',T('grammar_tab_rule'))}
      ${tBtn('exercises','✏️',T('grammar_tab_practise'))}
      ${(()=>{
        const g = P.grammar[t.id]||{};
        const safe = (g.checkPct||0) >= 80;
        return `<button onclick="startGrammarCheck('${t.id}')" style="margin-left:auto;padding:.5rem 1rem;border-radius:.75rem;font-size:.85rem;font-weight:700;cursor:pointer;border:1.5px solid ${safe?'#6EE7B7':'#C4B5FD'};background:${safe?'#ECFDF5':'#F5F3FF'};color:${safe?'#065F46':'#5B21B6'}">
          ${safe?`✓ ${T('gc_safe_chip')} (${g.checkPct}%)`:`🧭 ${T('gc_btn')}`}
        </button>`;
      })()}
    </div>
    ${content}
  </div>`;
}

function initGrammarLang(){
  const useLang=(P.lang||'en2')==='de'?'de':'en';
  showLang(useLang);
}
function showLang(lang){
  document.getElementById('expl-de').style.display = lang==='de'?'block':'none';
  document.getElementById('expl-en').style.display = lang==='en'?'block':'none';
  document.getElementById('lang-de').className = lang==='de'?'btn-primary':'btn-secondary';
  document.getElementById('lang-en').className = lang==='en'?'btn-primary':'btn-secondary';
  document.getElementById('lang-de').style.cssText = 'font-size:.8rem;padding:.4rem .9rem';
  document.getElementById('lang-en').style.cssText = 'font-size:.8rem;padding:.4rem .9rem';
}
// ═══ FOKUS-PRINZIP ═══
// Pro Grammatikthema werden nur die Kategorien gefärbt, um die es in
// diesem Thema geht – der Rest bleibt schwarz. So ist die Markierung
// nie lückenhaft und lenkt den Blick aufs Wesentliche.
// Darstellung (Leos Vorgabe): Endungen = gelber Marker, alles andere
// = Textfarbe. Signalwörter/Zeitangaben türkis.
const GRAMMAR_FOCUS = {
  sp:  {subject:1, verb:1, ending:1, aux:1, neg:1, wh:1, time:1},
  past:{verb:1, ending:1, aux:1, neg:1, wh:1, time:1},
  pp:  {subject:1, verb:1, ending:1, aux:1, neg:1, wh:1, time:1},
  gtf: {subject:1, verb:1, aux:1, neg:1, time:1},
  qn:  {subject:1, verb:1, aux:1, neg:1, wh:1},
  wo:  {subject:1, verb:1, aux:1, neg:1, wh:1, time:1, object:1}
};
const GC_ALL = {subject:1, verb:1, ending:1, aux:1, neg:1, wh:1, time:1, object:1};
// Legende zeigt nur die Kategorien, die im aktuellen Thema markiert werden
function grammarLegendHTML(topicId){
  const f = GRAMMAR_FOCUS[topicId] || GC_ALL;
  const META = [
    ['subject','#3B82F6','legend_subject'], ['verb','#10B981','legend_verb'],
    ['aux','#F97316','legend_aux'], ['neg','#EF4444','legend_neg'],
    ['wh','#8B5CF6','legend_wh'], ['ending','#FDE047','legend_ending'],
    ['time','#0891B2','legend_time'], ['object','#64748B','legend_object']
  ];
  return `<div style="font-size:.72rem;display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:.75rem">
    ${META.filter(m=>f[m[0]]).map(m=>`<span><span style="display:inline-block;width:.65rem;height:.65rem;background:${m[1]};border-radius:2px;margin-right:.25rem"></span>${T(m[2])}</span>`).join('')}
  </div>`;
}
// Erweiterte Signalwort-Erkennung (every evening, last year, two days ago, …)
const TIME_RX = /\b(yesterday|today|tomorrow|tonight|right now|now|at the moment|currently|soon|last (night|week|month|year|summer|winter|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|weekend)|next (week|month|year|summer|winter|Monday|Friday|Saturday|Sunday|weekend)|every (day|morning|afternoon|evening|night|week|month|year|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|weekend)|on (Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Sundays|school mornings)|at (weekends?|night)|after (school|dinner)|in the (mornings?|afternoons?|evenings?)|in \d{4}|(two|three|four|five|ten|a few) (days|weeks|months|years) ago|ago|always|usually|normally|often|sometimes|rarely|seldom|never|twice a week|once a week)\b/gi;

function colorSentence(s, topicId){
  const f = GRAMMAR_FOCUS[topicId] || GC_ALL;
  // Kontraktionen trennen: Hilfsverb orange + n't rot (don't = do + n't)
  if(f.neg){
    s = s.replace(/\b(do|does|did|is|are|was|were|has|have|had|would|should|could|must|need)(n't)/gi,
      (m,a,b)=>(f.aux?'<span style="color:#F97316;font-weight:700">'+a+'</span>':a)+'<span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">'+b+'</span>');
    s = s.replace(/\b(can|won|shan)('t)/gi,
      '<span style="color:#F97316;font-weight:700">$1</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">$2</span>');
  }
  if(f.aux) s = s.replace(/\b(did|does|do|was|were|is|are|am|will|can|could|would|should|shall|must|have|has|had)\b/gi,
    w => '<span style="color:#F97316;font-weight:700">'+w+'</span>');
  if(f.wh) s = s.replace(/\b(What|Where|When|Who|How|Why|Which)\b/g,
    '<span style="color:#8B5CF6;font-weight:700">$1</span>');
  if(f.subject) s = s.replace(/\b(I|You|We|They|He|She|It|you|we|they|he|she|it)\b/g,
    '<span style="color:#3B82F6;font-weight:700">$1</span>');
  if(f.ending && topicId==='past'){
    s = s.replace(/(\w+)(ied)\b/g,
      '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ied</span>');
    s = s.replace(/(\w{3,})(ed)\b/g,
      '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ed</span>');
  }
  if(f.ending && topicId==='pp'){
    s = s.replace(/(\w+)(-?ing)\b/g,
      '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">$2</span>');
  }
  if(f.verb) s = s.replace(/\b(play|plays|played|go|goes|went|have|has|had|read|reads|like|likes|speak|speaks|eat|eats|ate|drink|drinks|drank|watch|watches|watched|live|lives|lived|know|knew|think|thought|feel|felt|brush|brushes|listen|listens|clean|cleans|cleaned|swim|swam|write|wrote|run|ran|come|came|see|saw|make|made|get|got|take|took|give|gave|say|said|find|found|buy|bought|bring|brought|meet|met|sit|sat|sleep|slept|visit|visited|arrive|arrived|start|started|finish|finished|help|helped|move|moved|study|studied|collect|collected|train|trained|boil|boils|sing|sings|work|works|talk|talks|tidy|tidies|wear|wears|win|won|lose|lost)\b/g,
    (w) => {
      // Simple Present: die 3.-Person-Endung -s/-es als Marker
      if(f.ending && topicId==='sp'){
        const m = w.match(/^(\w+?)(es|s)$/);
        if(m && m[1].length>=3) return '<span style="color:#10B981;font-weight:700">'+m[1]+'</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">'+m[2]+'</span>';
      }
      return '<span style="color:#10B981;font-weight:700">'+w+'</span>';
    });
  if(f.time) s = s.replace(TIME_RX,
    '<span style="color:#0891B2;font-weight:600">$&</span>');
  return s;
}
function colorExpl(s){
  // Kontraktionen trennen: Hilfsverb orange + n't rot (don't = do + n't)
  s = s.replace(/\b(do|does|did|is|are|was|were|has|have|had|would|should|could|must|need)(n't)/gi,
    '<span style="color:#F97316;font-weight:700">$1</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">$2</span>');
  s = s.replace(/\b(can|won|shan)('t)/gi,
    '<span style="color:#F97316;font-weight:700">$1</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">$2</span>');
  s = s.replace(/\b(What|Where|When|Who|How|Why|Which)\b/g,
    '<span style="color:#8B5CF6;font-weight:700">$1</span>');
  s = s.replace(/\b(not)\b/g, '<span style="color:#EF4444;font-weight:700">not</span>');
  s = s.replace(/\b(do\/does|did|do|does|am\/is\/are|am|is|are|was\/were|was|were|will|have|has|had|can|could|would|should|shall|must)\b/gi,
    w => '<span style="color:#F97316;font-weight:700">'+w+'</span>');
  s = s.replace(/(\w+)(ied)\b/g,
    '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ied</span>');
  s = s.replace(/(\w{3,})(ed)\b/g,
    '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ed</span>');
  s = s.replace(/(\w+)(-ing)\b/g,
    '<span style="color:#10B981;font-weight:700">$1</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">$2</span>');
  s = s.replace(/going to/g, '<span style="color:#F97316;font-weight:700">going to</span>');
  // S/V/O-Begriffe in der Farbe des jeweiligen Satzglieds (Subjekt blau, Verb grün, Objekt grau)
  s = s.replace(/(Subject|Subjekt)\b/g,
    '<span style="background:#DBEAFE;color:#1E40AF;border-radius:3px;padding:0 3px;font-weight:700;font-size:.88em">$1</span>');
  s = s.replace(/(Verb)\b/g,
    '<span style="background:#D1FAE5;color:#065F46;border-radius:3px;padding:0 3px;font-weight:700;font-size:.88em">$1</span>');
  s = s.replace(/(Object|Objekt)\b/g,
    '<span style="background:#F1F5F9;color:#334155;border-radius:3px;padding:0 3px;font-weight:700;font-size:.88em">$1</span>');
  s = s.replace(/\b(I|You|We|They|He|She|It|he\/she\/it|I\/you\/we\/they)\b/g,
    '<span style="color:#3B82F6;font-weight:700">$1</span>');
  s = s.replace(/(yesterday|last week|last night|last summer|ago|tomorrow|next week|soon|always|usually|often|sometimes|never)/gi,
    '<span style="color:#0891B2;font-weight:600">$1</span>');
  return s;
}

function toggleMistakes(){
  const b = document.getElementById('mistakes-body');
  const a = document.getElementById('mistakes-arrow');
  if(b.style.display==='none'){ b.style.display='block'; a.textContent='▲'; }
  else { b.style.display='none'; a.textContent='▼'; }
}


// ═══════════════════════════════════════════════
// EXERCISES
// ═══════════════════════════════════════════════
let _ex = {};
let _exStartTime = 0;
let _gPick = {}; // exercise state

function rerollGrammar(topicId,typeKey){
  const pool=GRAMMAR_POOL[topicId]||[];
  const tf=typeKey==='mc'?'mc':typeKey==='fill'?'fg':'wo';
  const sub=pool.filter(e=>e.type===tf);
  if(!sub.length)return;
  const cur=_gPick[topicId]&&_gPick[topicId][typeKey];
  let pick;
  do{pick=sub[Math.floor(Math.random()*sub.length)];}while(pick.id===cur&&sub.length>1);
  if(!_gPick[topicId])_gPick[topicId]={};
  _gPick[topicId][typeKey]=pick.id;
  go('grammar-topic',topicId,'exercises');
}

function renderExercisePage(topicId, exId){
  const t=GRAMMAR.find(g=>g.id===topicId);
  if(!t)return '';
  const pool=GRAMMAR_POOL[topicId]||[];
  const ex=pool.find(e=>e.id===exId);
  if(!ex)return '';
  let items;
  if(ex.type==='mc'){items=(ex.questions||[]).map(q=>({...q,ans:q.opts[q.correct]}));}
  else if(ex.type==='fg'){items=(ex.sentences||[]).map(s=>({...s,text:s.pre+' ___ '+s.suf,answer:s.ans}));}
  else if(ex.type==='wo'){items=(ex.items||[]).map(i=>({...i,answer:i.correct||i.answer,words:i.words||(i.correct||i.answer||'').split(' ')}));}
  else{items=ex.items||ex.sentences||ex.questions||[];}
  _ex={topicId,exId,type:ex.type,items,state:'active',answers:[],score:0,idx:0,chosen:[]};
  _exStartTime = Date.now();
  // Check for active grammar exercise
  const hasActiveEx = _ex && _ex.topicId && _ex.state !== 'done' && _ex.state !== undefined;
  return `<div class="space-y-6">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('grammar-topic','${topicId}','exercises')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">← ${t.title}</button>
      <span style="font-weight:700;color:#1E293B;flex:1">${ex.title}</span>
      <button class="chip-btn" onclick="go('grammar-topic','${topicId}','rule')">📖 ${T('grammar_rule_chip')}</button>
    </div>
    <div id="ex-area">${renderExerciseArea()}</div>
  </div>`;
}

function renderExerciseArea(){
  if(_ex.state==='done') return renderExDone();
  if(_ex.type==='mc') return renderMC();
  if(_ex.type==='fg' || _ex.type==='fill') return renderFill();
  if(_ex.type==='wo' || _ex.type==='wordorder') return renderWO();
  if(_ex.type==='type') return renderTypeEx();
  return '<p style="color:red">Unbekannter Typ: '+_ex.type+'</p>';
}

// Multiple Choice
function renderMC(){
  const items = _ex.items;
  const i = _ex.idx;
  const q = items[i];
  const total = items.length;
  const dots = items.map((_,j)=>`<span style="display:inline-block;width:.6rem;height:.6rem;border-radius:50%;background:${j<i?'#10B981':j===i?'#3B82F6':'#E2E8F0'};margin:0 .2rem"></span>`).join('');

  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>${dots}</div>
      <span style="font-size:.8rem;color:#94A3B8">${i+1} / ${total}</span>
    </div>
    <p style="font-weight:600;color:#1E293B;font-size:1rem">${q.q}</p>
    <div id="opts-wrap">
      ${q.opts.map((o,oi)=>`<button class="opt-btn" id="opt-${oi}" onclick="pickMC(${oi},'${escQ(o)}','${escQ(q.ans)}')">${o}</button>`).join('')}
    </div>
    <div id="mc-feedback"></div>
  </div>`;
}

function escQ(s){ return (s||'').replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

function pickMC(oi, chosen, correct){
  const isRight = chosen === correct;
  document.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true);
  document.getElementById('opt-'+oi).className = isRight ? 'opt-btn opt-correct' : 'opt-btn opt-wrong';
  if(!isRight){
    const opts = _ex.items[_ex.idx].opts;
    const ci = opts.findIndex(o=>o===correct);
    if(ci>=0) document.getElementById('opt-'+ci).className = 'opt-btn opt-correct';
  }
  if(isRight) _ex.score++;
  _ex.answers.push({chosen, correct, right:isRight});
  const fb = document.getElementById('mc-feedback');
  const expText = _ex.items[_ex.idx] && _ex.items[_ex.idx].exp ? _ex.items[_ex.idx].exp : '';
  const expReveal = expText
    ? `<span onclick="this.style.display='none';this.nextElementSibling.style.display='block'" style="font-size:.78rem;color:#059669;cursor:pointer;text-decoration:underline;font-weight:600;display:block;margin-top:.4rem">${T('ex_why')}</span><span style="display:none;font-size:.85rem;color:#065F46;margin-top:.35rem">💡 ${expText}</span>`
    : '';
  fb.innerHTML = isRight
    ? `<div class="feedback-ok">${T('feedback_ok')}${expReveal}</div>`
    : `<div class="feedback-err">${T('feedback_wrong')} <strong>${correct}</strong>${expText?`<br><span style="font-size:.85rem;color:#7F1D1D;margin-top:.3rem;display:block">💡 ${expText}</span>`:''}</div>`;
  fb.innerHTML += `<button class="btn-primary" style="margin-top:.75rem" onclick="nextMC()">${_ex.idx+1<_ex.items.length?T('btn_next'):T('ex_show_result')}</button>`;
}

function nextMC(){
  _ex.idx++;
  if(_ex.idx >= _ex.items.length) { _ex.state='done'; }
  document.getElementById('ex-area').innerHTML = renderExerciseArea();
}

// Fill in the gaps
function renderFill(){
  const sentences = _ex.items;
  return `<div class="card space-y-5">
    <p style="font-weight:700;color:#1E293B">${T('ex_fill_instruction')}</p>
    ${sentences.map((s,i)=>`<div style="margin-bottom:.75rem;padding:.6rem .75rem;background:#F8FAFC;border-radius:.75rem">
      <p style="font-size:.95rem;color:#1E293B;line-height:2.2">
        ${s.hint?`<button onclick="toggleFillHint(${i})" title="${T('wo_hint')}" style="background:none;border:none;cursor:pointer;font-size:.95rem;padding:0 .3rem 0 0;vertical-align:middle;opacity:.6" id="hint-btn-${i}">💡</button>`:''}
        <span style="color:#3B82F6;font-weight:600">${s.pre}</span>
        <input class="gap-input" id="fill-${i}" type="text" placeholder="..." autocomplete="off" autocorrect="off" spellcheck="false">
        <span style="color:#1E293B"> ${(s.suf||'').replace(/\s*\([^)]+\)/,'')}</span>
        <span style="color:#94A3B8;font-size:.8rem"> ${(s.suf||'').match(/\(([^)]+)\)/)?'('+s.suf.match(/\(([^)]+)\)/)[1]+')':''}</span>
      </p>
      ${s.hint?`<div id="hint-box-${i}" style="display:none;font-size:.78rem;color:#3B82F6;margin-top:.2rem;font-style:italic;padding:.2rem .4rem;background:#EFF6FF;border-radius:.4rem">💡 ${s.hint}</div>`:''}
    </div>`).join('')}
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      <button class="btn-primary" onclick="checkFill()">${T('ex_check')}</button>
    </div>
    <div id="fill-feedback"></div>
  </div>`;
}

function checkFill(){
  let correct = 0;
  const sentences = _ex.items;
  sentences.forEach((s,i)=>{
    const inp = document.getElementById('fill-'+i);
    if(!inp) return;
    const val = inp.value.trim().toLowerCase();
    const ans = (s.answer||s.ans||'').toLowerCase();
    if(val===ans){
      inp.style.borderBottomColor='#10B981';
      inp.style.color='#065F46';
      correct++;
    } else {
      inp.style.borderBottomColor='#EF4444';
      inp.style.color='#991B1B';
    }
  });
  _ex.score = Math.round(correct/sentences.length*100);
  const fb = document.getElementById('fill-feedback');
  fb.innerHTML = `<div class="${correct===sentences.length?'feedback-ok':'feedback-err'}">${correct} ${T('ex_correct_of')} ${sentences.length} ${T('ex_correct_score')} (${_ex.score}%)</div>
    <div style="margin-top:.75rem">
      ${sentences.map((s,i)=>{
        const inp = document.getElementById('fill-'+i);
        const val = inp?inp.value.trim():'';
        const right = val.toLowerCase()===s.answer.toLowerCase();
        return right?'':  `<p style="font-size:.85rem;color:#64748B;margin-top:.3rem">✗ <strong style="color:#10B981">${s.answer}</strong>${s.hint?` <span style="color:#7F1D1D"> – 💡 ${s.hint}</span>`:''}${s.exp?` <span style="color:#7F1D1D"> – 💡 ${s.exp}</span>`:''}</p>`;
      }).join('')}
    </div>
    <button class="btn-primary" style="margin-top:.75rem" onclick="finishFill()">${T('ex_finish')}</button>`;
}

function toggleObsHint(){
  const box=document.getElementById('obs-hint-box');
  const btn=document.getElementById('obs-hint-btn');
  if(!box)return;
  const vis=box.style.display!=='none';
  box.style.display=vis?'none':'block';
  if(btn){btn.style.opacity=vis?'.6':'1';btn.textContent=vis?T('wo_hint'):T('wo_hint_hide');}
}
function toggleWOHint(){
  const box=document.getElementById('wo-hint-box');
  const btn=document.getElementById('wo-hint-btn');
  if(!box)return;
  const vis=box.style.display!=='none';
  box.style.display=vis?'none':'block';
  if(btn){btn.style.opacity=vis?'.6':'1';btn.textContent=vis?T('wo_hint'):T('wo_hint_hide');}
}
function toggleFillHint(i){
  const box = document.getElementById('hint-box-'+i);
  const btn = document.getElementById('hint-btn-'+i);
  if(!box) return;
  const visible = box.style.display!=='none';
  box.style.display = visible?'none':'block';
  if(btn) btn.style.opacity = visible?'.6':'1';
}

function showFillHints(){
  _ex.items.forEach((s,i)=>{
    const inp = document.getElementById('fill-'+i);
    if(inp && !inp.value) inp.placeholder = s.answer[0]+'…';
  });
}

function finishFill(){
  _ex.state='done';
  document.getElementById('ex-area').innerHTML = renderExerciseArea();
}

// WO chip normalization
const WO_PROPER=new Set(['Anna','Tim','Tom','Emma','Max','Sophie','Lucy','Ben','Liam','Mia','Lisa','Sara','Mike','Jake','Amy','London','Paris','Berlin','Munich','Hamburg','Rome','Madrid','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','January','February','March','April','May','June','July','August','September','October','November','December','English','German','French','Spanish','Italian']);
function normalizeWOChip(w){const s=w.replace(/[.!?,;:]+$/,'');if(s==='I'||WO_PROPER.has(s))return s;return s.charAt(0).toLowerCase()+s.slice(1);}

// Word Order
function renderWO(){
  const items = _ex.items;
  const i = _ex.idx;
  const item = items[i];
  const rawWords=item.phrases||item.words||item.answer.split(' ');
  const words=rawWords.map(normalizeWOChip);
  const shuffled=[...words].sort(()=>Math.random()-.5);
  _ex.woChosen=[];
  _ex.woShuffled=shuffled;
  _ex.woWords=words;
  _ex.woCorrect=item.correct||item.answer;

  const isQuestion = (item.correct||item.answer||'').trim().endsWith('?');
  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between">
      <p style="font-weight:700;color:#1E293B">${isQuestion ? T('wo_question') : T('wo_prompt')}</p>
      <span style="font-size:.8rem;color:#94A3B8">${i+1}/${items.length}</span>
    </div>
    ${isQuestion?`<div style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:.6rem;padding:.5rem .75rem;font-size:.83rem;color:#92400E;font-weight:600">${T('wo_question_hint')}</div>`:''}
    ${item.hint?`<button onclick="toggleWOHint()" id="wo-hint-btn" style="background:none;border:none;cursor:pointer;font-size:.82rem;color:#64748B;opacity:.6;padding:.1rem .3rem">💡 ${T('wo_hint')}</button><div id="wo-hint-box" style="display:none;font-size:.85rem;color:#64748B;font-style:italic;margin-top:.25rem;padding:.3rem .6rem;background:#F1F5F9;border-radius:.4rem">${item.hint}</div>`:''}
    <div class="drop-zone" id="wo-drop">
      <span style="color:#CBD5E1;font-size:.85rem" id="wo-placeholder">${T('ex_wo_placeholder')}</span>
    </div>
    <div id="wo-chips">
      ${shuffled.map((w,wi)=>`<span class="word-chip" id="wchip-${wi}" onclick="pickWO(${wi},'${escQ(w)}')">${w}</span>`).join('')}
    </div>
    <div style="display:flex;gap:.75rem">
      <button class="btn-primary" onclick="checkWO()">${T('wo_check')}</button>
      <button class="btn-secondary" onclick="clearWO()">${T('wo_reset')}</button>
    </div>
    <div id="wo-feedback"></div>
  </div>`;
}

function pickWO(wi, word){
  const chip = document.getElementById('wchip-'+wi);
  if(chip.classList.contains('chosen')) return;
  chip.classList.add('chosen');
  _ex.woChosen.push({wi, word});
  const drop = document.getElementById('wo-drop');
  const ph = document.getElementById('wo-placeholder');
  if(ph) ph.style.display='none';
  drop.innerHTML = _ex.woChosen.map((c,ci)=>`<span class="word-chip chosen" onclick="removeWO(${ci})">${c.word}</span>`).join('') + '<span id="wo-placeholder" style="display:none"></span>';
}

function removeWO(ci){
  const item = _ex.woChosen[ci];
  _ex.woChosen.splice(ci,1);
  const chip = document.getElementById('wchip-'+item.wi);
  if(chip) chip.classList.remove('chosen');
  const drop = document.getElementById('wo-drop');
  if(_ex.woChosen.length===0){
    drop.innerHTML = '<span style="color:#CBD5E1;font-size:.85rem" id="wo-placeholder">'+T('ex_wo_placeholder')+'</span>';
  } else {
    drop.innerHTML = _ex.woChosen.map((c,ci2)=>`<span class="word-chip chosen" onclick="removeWO(${ci2})">${c.word}</span>`).join('');
  }
}

function clearWO(){
  _ex.woChosen = [];
  document.querySelectorAll('.word-chip').forEach(c=>c.classList.remove('chosen'));
  document.getElementById('wo-drop').innerHTML = '<span style="color:#CBD5E1;font-size:.85rem">'+T('ex_wo_placeholder')+'</span>';
  document.getElementById('wo-feedback').innerHTML = '';
}

function checkWO(){
  const answer=_ex.woChosen.map(c=>c.word).join(' ');
  const item=_ex.items[_ex.idx];
  const correct=_ex.woCorrect||item.answer;
  const normWO=s=>s.toLowerCase().replace(/[.!?,;:]+/g,'').replace(/\s+/g,' ').trim();
  const nA=normWO(answer), nC=normWO(correct);
  let isRight=nA===nC;
  // Also accept: frequency adverb moved to sentence front
  const FREQ_ADVS = ['sometimes','always','never','usually','often','rarely','seldom','occasionally','normally'];
  if(!isRight && item.phrases && item.phrases.length>=3){
    const phN=item.phrases.map(p=>normWO(p));
    if(FREQ_ADVS.includes(phN[1])){
      const freqAdv=phN[1];
      const restParts=[phN[0],...phN.slice(2)];
      const altAnswer=freqAdv+' '+restParts.join(' ');
      if(nA===altAnswer) isRight=true;
    }
  }
  // Also accept: trailing adverbial phrase moved to front (or front phrase moved to end)
  if(!isRight && item.phrases && item.phrases.length>=2){
    const nPh=item.phrases.map(p=>normWO(p));
    const last=nPh[nPh.length-1];
    const first=nPh[0];
    if(nC.endsWith(' '+last)||nC===last){
      const base=nC.endsWith(' '+last)?nC.slice(0,nC.length-last.length-1):nC.slice(last.length);
      if(nA===last+' '+base.trim()) isRight=true;
    }
    if(!isRight&&(nC.startsWith(first+' ')||nC===first)){
      const base=nC.startsWith(first+' ')?nC.slice(first.length+1):nC.slice(first.length);
      if(nA===base.trim()+' '+first) isRight=true;
    }
  }
  if(isRight) _ex.score++;
  _ex.answers.push({answer, correct, right:isRight});
    const woItem = _ex.items[_ex.idx];
  const woExp = woItem && (woItem.exp || woItem.hint) ? (woItem.exp || woItem.hint) : '';
  const woExpReveal = woExp
    ? `<span onclick="this.style.display='none';this.nextElementSibling.style.display='block'" style="font-size:.78rem;color:#059669;cursor:pointer;text-decoration:underline;font-weight:600;display:block;margin-top:.4rem">${T('ex_why')}</span><span style="display:none;font-size:.85rem;color:#065F46;margin-top:.35rem">💡 ${woExp}</span>`
    : '';
  document.getElementById('wo-feedback').innerHTML = isRight
    ? `<div class="feedback-ok">${T('feedback_ok')}${woExpReveal}</div><button class="btn-primary" style="margin-top:.75rem" onclick="nextWO()">${_ex.idx+1<_ex.items.length?T('btn_next'):T('ex_show_result')}</button>`
    : `<div class="feedback-err">${T('ex_correct_would_be')} <strong>${correct}</strong>${woExp?`<br><span style="font-size:.85rem;color:#7F1D1D;margin-top:.3rem;display:block">💡 ${woExp}</span>`:''}</div><button class="btn-primary" style="margin-top:.75rem" onclick="nextWO()">${_ex.idx+1<_ex.items.length?T('btn_next'):T('ex_show_result')}</button>`;
}

function nextWO(){
  _ex.idx++;
  if(_ex.idx >= _ex.items.length) { _ex.state='done'; }
  document.getElementById('ex-area').innerHTML = renderExerciseArea();
}

// Done screen
function renderExDone(){
  const {topicId,exId,type,items,score}=_ex;
  const t=GRAMMAR.find(g=>g.id===topicId);
  const pool=GRAMMAR_POOL[topicId]||[];
  const curEx=pool.find(e=>e.id===exId);
  const curDiff=(curEx&&curEx.diff)||1;
  let pct=(type==='fill'||type==='fg')?score:Math.round((score/Math.max(1,items.length))*100);
  const passed=pct>=60;
  const timeTaken=Date.now()-(_exStartTime||Date.now());
  // Save to history
  if(!P.gHistory)P.gHistory={};
  if(!P.gHistory[topicId])P.gHistory[topicId]=[];
  P.gHistory[topicId].push({exId,diff:curDiff,pct,time:timeTaken,title:curEx?curEx.title:'',ts:Date.now()});
  // Legacy done flags
  if(!P.grammar[topicId])P.grammar[topicId]={mcDone:false,fillDone:false,woDone:false,completed:false};
  const tk=type==='mc'?'mcDone':type==='fg'?'fillDone':'woDone';
  P.grammar[topicId][tk]=true;
  const allDone=P.grammar[topicId].mcDone&&P.grammar[topicId].fillDone&&P.grammar[topicId].woDone;
  if(allDone){P.grammar[topicId].completed=true;P.grammar[topicId].score=pct;}
  // Error tracker
  if(type!=='fg'&&type!=='fill'){
    const _wrong=items.length-score;
    if(_wrong>0){if(!P.errors)P.errors={};const _ek='grammar:'+topicId;P.errors[_ek]=(P.errors[_ek]||0)+_wrong;}
  }
  addXP(passed?20:5);checkBadges();save();
  // Time display
  const secs=Math.round(timeTaken/1000);
  const timeStr=secs>=60?Math.floor(secs/60)+'m '+String(secs%60).padStart(2,'0')+'s':secs+'s';
  // Helper: pick exercise at given diff level
  function pickAtDiff(d){
    const dp=pool.filter(e=>(e.diff||1)===d);
    if(!dp.length)return null;
    const other=dp.filter(e=>e.id!==exId);
    return other.length?other[Math.floor(Math.random()*other.length)]:dp[0];
  }
  const samePick=pickAtDiff(curDiff);
  const upPick=curDiff<3?pickAtDiff(curDiff+1):null;
  const downPick=curDiff>1?pickAtDiff(curDiff-1):null;
  const starStr=['','⭐','⭐⭐','⭐⭐⭐'][curDiff]||'';
  return `<div class="card space-y-5" style="text-align:center">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B">${pct>=80?T('ex_result_excellent'):pct>=60?T('ex_result_good'):T('ex_result_practice')}</h2>
    <div style="font-size:2.5rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${pct}%</div>
    ${pb(pct,pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B')}
    <p style="font-size:.8rem;color:#94A3B8">⏱ ${timeStr} · ${starStr}</p>
    <div style="text-align:left;font-size:.85rem;font-weight:700;color:#64748B;margin-bottom:-.25rem">${T('ex_result_continue')}</div>
    <div style="display:flex;flex-direction:column;gap:.5rem">
      ${samePick?`<button class="btn-primary" style="background:#3B82F6" onclick="go('grammar-exercise','${topicId}','${samePick.id}')">${T('ex_result_same')} ${starStr} →</button>`:''}
      ${upPick?`<button class="btn-primary" style="background:#10B981" onclick="go('grammar-exercise','${topicId}','${upPick.id}')">${T('ex_result_higher')} ${'⭐'.repeat(curDiff+1)} →</button>`:''}
      ${downPick?`<button class="btn-secondary" onclick="go('grammar-exercise','${topicId}','${downPick.id}')">${T('ex_result_lower')} ${'⭐'.repeat(curDiff-1)} →</button>`:''}
      <button class="btn-secondary" onclick="endGrammarExercise('${topicId}')">${T('ex_finish_back')}</button>
    </div>
  </div>`;
}

function endGrammarExercise(topicId){
  // Reset picks so exercises tab shows fresh exercises
  _gPick[topicId] = {};
  go('grammar-topic', topicId, 'exercises');
}


const GRAMMAR_POOL = {
sp: [{id: "sp-mc-A", type: "mc", diff: 1, title: "Level 1 – Correct form", questions: [{q: "Tom ___ football every day.", opts: ["play", "plays", "playing", "is play"], correct: 1, exp: "Tom = he → plays"}, {q: "We ___ to school by bus.", opts: ["goes", "going", "go", "goed"], correct: 2, exp: "We → go"}, {q: "She ___ her room on Saturdays.", opts: ["clean", "cleans", "is cleaning", "cleaned"], correct: 1, exp: "she → cleans"}, {q: "They ___ TV in the evenings.", opts: ["watches", "watch", "is watching", "watchs"], correct: 1, exp: "They → watch"}, {q: "My cat ___ on the sofa all day.", opts: ["sleep", "sleeps", "sleeping", "sleeped"], correct: 1, exp: "cat = it → sleeps"}]}, {id: "sp-mc-B", type: "mc", diff: 1, title: "Level 1 – he/she/it forms", questions: [{q: "My sister ___ piano every afternoon.", opts: ["play", "plays", "played", "playing"], correct: 1, exp: "My sister = she → plays"}, {q: "The dog ___ in the garden.", opts: ["run", "runned", "runs", "running"], correct: 2, exp: "The dog = it → runs"}, {q: "He ___ to school by bike.", opts: ["goes", "go", "going", "goed"], correct: 0, exp: "he → goes"}, {q: "Lisa ___ lunch at school.", opts: ["eat", "eats", "eating", "eaten"], correct: 1, exp: "Lisa = she → eats"}, {q: "The bus ___ at 8 o'clock.", opts: ["leave", "leafs", "leaves", "leaved"], correct: 2, exp: "bus = it → leaves"}]}, {id: "sp-mc-C", type: "mc", diff: 2, title: "Level 2 – Negatives & questions", questions: [{q: "She ___ like broccoli.", opts: ["don't", "doesn't", "isn't", "not"], correct: 1, exp: "she → doesn't + base form"}, {q: "___ your parents work in an office?", opts: ["Does", "Do", "Are", "Is"], correct: 1, exp: "parents = they → Do"}, {q: "My brother ___ play guitar.", opts: ["don't", "isn't", "doesn't", "not"], correct: 2, exp: "brother = he → doesn't"}, {q: "___ she go to the gym every week?", opts: ["Do", "Does", "Is", "Has"], correct: 1, exp: "she → Does"}, {q: "I ___ eat meat.", opts: ["doesn't", "not", "don't", "isn't"], correct: 2, exp: "I → don't"}]}, {id: "sp-mc-D", type: "mc", diff: 2, title: "Level 2 – Mixed forms", questions: [{q: "What ___ you do at the weekend?", opts: ["does", "do", "did", "are"], correct: 1, exp: "you → do"}, {q: "___ Max and Tim like basketball?", opts: ["Does", "Do", "Is", "Are"], correct: 1, exp: "Max and Tim = they → Do"}, {q: "Where ___ your mum work?", opts: ["do", "does", "is", "did"], correct: 1, exp: "mum = she → does"}, {q: "My dad ___ drink coffee.", opts: ["doesn't", "don't", "isn't", "not"], correct: 0, exp: "dad = he → doesn't"}, {q: "Our teacher ___ us homework every day.", opts: ["give", "giving", "gives", "given"], correct: 2, exp: "teacher = she/he → gives"}]}, {id: "sp-mc-E", type: "mc", diff: 1, title: "Level 1 – Adverbs of frequency", questions: [{q: "She ___ eats breakfast before school.", opts: ["always", "every", "each", "never"], correct: 0, exp: "always = immer"}, {q: "He ___ watches TV. He prefers reading.", opts: ["never", "always", "often", "usually"], correct: 0, exp: "never = nie"}, {q: "I am ___ tired on Monday mornings.", opts: ["usually", "every", "each", "never"], correct: 0, exp: "usually = meistens"}, {q: "They ___ go swimming on Fridays.", opts: ["sometimes", "every", "never", "each"], correct: 0, exp: "sometimes = manchmal"}, {q: "We ___ have a big breakfast at the weekend.", opts: ["often", "every", "each", "always often"], correct: 0, exp: "often = oft"}]}, {id: "sp-fill-A", type: "fg", diff: 2, title: "Level 2 – In the classroom", sentences: [{pre: "Tom always", suf: "his homework before dinner. (do)", ans: "does", hint: "Tom = he → does"}, {pre: "Lisa and Emma", suf: "to school together. (walk)", ans: "walk", hint: "Lisa and Emma = they → walk"}, {pre: "Our teacher", suf: "us new words every week. (teach)", ans: "teaches", hint: "teacher → teach + es"}, {pre: "I", suf: "my pencil case every morning. (pack)", ans: "pack", hint: "I → base form"}, {pre: "The school bell", suf: "at half past seven. (ring)", ans: "rings", hint: "bell = it → rings"}]}, {id: "sp-fill-B", type: "fg", diff: 2, title: "Level 2 – Hobbies and animals", sentences: [{pre: "Max", suf: "football for the school team. (play)", ans: "plays", hint: "Max = he → plays"}, {pre: "My rabbit", suf: "carrots and lettuce. (eat)", ans: "eats", hint: "rabbit = it → eats"}, {pre: "Sophie", suf: "the guitar in her bedroom. (practise)", ans: "practises", hint: "Sophie = she → practises"}, {pre: "We", suf: "our dog twice a day. (walk)", ans: "walk", hint: "We → walk"}, {pre: "The birds", suf: "very loudly in the morning. (sing)", ans: "sing", hint: "birds = they → sing"}]}, {id: "sp-fill-C", type: "fg", diff: 2, title: "Level 2 – Negatives", sentences: [{pre: "She", suf: "meat. She is vegetarian. (eat)", ans: "doesn't eat", hint: "she → doesn't + base form"}, {pre: "My brothers", suf: "their rooms very often. (tidy)", ans: "don't tidy", hint: "they → don't + base form"}, {pre: "He", suf: "glasses. He has contact lenses. (wear)", ans: "doesn't wear", hint: "he → doesn't + base form"}, {pre: "I", suf: "coffee. I prefer tea. (like)", ans: "don't like", hint: "I → don't + base form"}, {pre: "Our cat", suf: "outside at night. (go)", ans: "doesn't go", hint: "cat = it → doesn't + base form"}]}, {id: "sp-fill-D", type: "fg", diff: 2, title: "Level 2 – Forming questions", sentences: [{pre: "___ your dad", suf: "by car? (go to work)", ans: "Does", hint: "Dad = he → Does"}, {pre: "___ the children", suf: "lunch at school? (eat)", ans: "Do", hint: "children = they → Do"}, {pre: "Where ___", suf: "your best friend live?", ans: "does", hint: "friend = he/she → does"}, {pre: "___ you", suf: "like spicy food?", ans: "Do", hint: "you → Do"}, {pre: "What time ___", suf: "school start?", ans: "does", hint: "school = it → does"}]}, {id: "sp-fill-E", type: "fg", diff: 2, title: "Level 2 – Mixed forms", sentences: [{pre: "My mum", suf: "early every morning. (wake up)", ans: "wakes up", hint: "mum = she → wakes up"}, {pre: "Birds", suf: "south in autumn. (fly)", ans: "fly", hint: "birds = they → fly"}, {pre: "The library", suf: "on Sundays. (open)", ans: "doesn't open", hint: "library = it → doesn't open"}, {pre: "I", suf: "my grandparents every Sunday. (visit)", ans: "visit", hint: "I → visit"}, {pre: "Emma", suf: "basketball but she loves swimming. (play)", ans: "doesn't play", hint: "Emma = she → doesn't play"}]}, {id: "sp-wo-A", type: "wo", diff: 3, title: "Level 3 – Affirmative sentences", items: [{phrases: ["i", "usually", "have breakfast", "at half seven"], correct: "I usually have breakfast at half seven"}, {phrases: ["she", "reads books", "in the evening"], correct: "She reads books in the evening"}, {phrases: ["they", "train", "twice a week"], correct: "They train twice a week"}, {phrases: ["my dad", "goes to work", "by car", "every morning"], correct: "My dad goes to work by car every morning"}, {phrases: ["the dog", "sleeps", "on the sofa", "all day"], correct: "The dog sleeps on the sofa all day"}]}, {id: "sp-wo-B", type: "wo", diff: 3, title: "Level 3 – Negatives", items: [{phrases: ["Anna", "doesn't do", "sport", "on school mornings"], correct: "Anna doesn't do sport on school mornings"}, {phrases: ["she", "doesn't like", "vegetables"], correct: "She doesn't like vegetables"}, {phrases: ["we", "don't watch", "TV", "in the morning"], correct: "We don't watch TV in the morning"}, {phrases: ["my brother", "doesn't tidy", "his room", "very often"], correct: "My brother doesn't tidy his room very often"}, {phrases: ["they", "don't eat", "meat"], correct: "They don't eat meat"}]}, {id: "sp-wo-C", type: "wo", diff: 3, title: "Level 3 – Questions", items: [{phrases: ["what", "do you", "do", "after school"], correct: "What do you do after school"}, {phrases: ["does", "she", "play", "the piano"], correct: "Does she play the piano"}, {phrases: ["where", "do", "your parents", "work"], correct: "Where do your parents work"}, {phrases: ["do", "they", "like", "pizza"], correct: "Do they like pizza"}, {phrases: ["what time", "does", "the bus", "leave"], correct: "What time does the bus leave"}]}, {id: "sp-wo-D", type: "wo", diff: 3, title: "Level 3 – Adverbs of frequency", items: [{phrases: ["i", "sometimes", "go", "to the cinema"], correct: "I sometimes go to the cinema"}, {phrases: ["she", "always", "brushes", "her teeth", "before bed"], correct: "She always brushes her teeth before bed"}, {phrases: ["he", "never", "does", "his homework"], correct: "He never does his homework"}, {phrases: ["we", "usually", "eat", "lunch", "at school"], correct: "We usually eat lunch at school"}, {phrases: ["they", "often", "play", "football", "at the weekend"], correct: "They often play football at the weekend"}]}, {id: "sp-wo-E", type: "wo", diff: 3, title: "Level 3 – Mixed", items: [{phrases: ["my sister", "plays", "the guitar", "every day"], correct: "My sister plays the guitar every day"}, {phrases: ["does", "Tom", "speak", "French"], correct: "Does Tom speak French"}, {phrases: ["she", "doesn't eat", "breakfast", "in the morning"], correct: "She doesn't eat breakfast in the morning"}, {phrases: ["we", "go", "swimming", "on Fridays"], correct: "We go swimming on Fridays"}, {phrases: ["what", "does", "your dad", "do", "at the weekend"], correct: "What does your dad do at the weekend"}]}],
  past: [{id: "past-mc-A", type: "mc", diff: 1, title: "Level 1 – Regular verbs (+ed)", questions: [{q: "Yesterday, I ___ a good film on TV.", opts: ["watch", "watched", "watching", "watches"], correct: 1, exp: "watch+ed"}, {q: "They ___ football last Saturday.", opts: ["play", "plays", "playing", "played"], correct: 3, exp: "play+ed"}, {q: "She ___ her room before dinner.", opts: ["clean", "cleans", "cleaning", "cleaned"], correct: 3, exp: "clean+ed"}, {q: "He ___ for his test all evening.", opts: ["study", "studies", "studying", "studied"], correct: 3, exp: "study → studied"}, {q: "We ___ to a new flat last year.", opts: ["move", "moves", "moving", "moved"], correct: 3, exp: "move+d"}]}, {id: "past-mc-B", type: "mc", diff: 1, title: "Level 1 – Irregular verbs", questions: [{q: "She ___ to school by bus last Monday.", opts: ["goed", "goes", "went", "go"], correct: 2, exp: "go → went"}, {q: "We ___ pizza for lunch yesterday.", opts: ["eat", "eated", "ate", "eaten"], correct: 2, exp: "eat → ate"}, {q: "He ___ his homework last night.", opts: ["do", "does", "did", "doed"], correct: 2, exp: "do → did"}, {q: "I ___ a great film last week.", opts: ["seed", "saw", "see", "seen"], correct: 1, exp: "see → saw"}, {q: "She ___ me a present for my birthday.", opts: ["gived", "gives", "given", "gave"], correct: 3, exp: "give → gave"}]}, {id: "past-mc-C", type: "mc", diff: 1, title: "Level 1 – was / were", questions: [{q: "I ___ at home yesterday.", opts: ["is", "are", "was", "were"], correct: 2, exp: "I → was"}, {q: "The children ___ very tired after the trip.", opts: ["was", "is", "were", "be"], correct: 2, exp: "children = they → were"}, {q: "The weather ___ terrible last week.", opts: ["were", "be", "is", "was"], correct: 3, exp: "weather = it → was"}, {q: "___ you at the party last night?", opts: ["Was", "Is", "Were", "Are"], correct: 2, exp: "you → Were"}, {q: "Max and Emma ___ not at school on Friday.", opts: ["was", "is", "were", "be"], correct: 2, exp: "Max and Emma = they → were"}]}, {id: "past-mc-D", type: "mc", diff: 2, title: "Level 2 – Negatives with didn't", questions: [{q: "She ___ come to school yesterday.", opts: ["don't", "doesn't", "didn't", "not"], correct: 2, exp: "didn't + base form"}, {q: "I ___ my bag this morning. (find)", opts: ["finded", "found", "find", "finds"], correct: 1, exp: "find → found"}, {q: "They ___ have lunch together yesterday.", opts: ["don't have", "doesn't have", "didn't have", "not had"], correct: 2, exp: "didn't + base form"}, {q: "He ___ watch the film. He was too tired.", opts: ["doesn't", "didn't", "don't", "wasn't"], correct: 1, exp: "didn't + base form"}, {q: "We ___ go to school last Monday. It was a holiday.", opts: ["don't", "doesn't", "didn't", "not"], correct: 2, exp: "didn't + base form"}]}, {id: "past-mc-E", type: "mc", diff: 2, title: "Level 2 – Questions with did", questions: [{q: "___ you watch the match last night?", opts: ["Do", "Does", "Did", "Were"], correct: 2, exp: "Did"}, {q: "___ he lose his keys?", opts: ["Do", "Does", "Did", "Was"], correct: 2, exp: "Did"}, {q: "Where ___ you go last summer?", opts: ["do", "does", "did", "were"], correct: 2, exp: "Where did you go?"}, {q: "___ they win the match?", opts: ["Do", "Were", "Is", "Did"], correct: 3, exp: "Did + subject + base form?"}, {q: "What ___ she buy at the market?", opts: ["do", "does", "did", "was"], correct: 2, exp: "What did she buy?"}]}, {id: "past-mc-F", type: "mc", diff: 2, title: "Level 2 – Mixed", questions: [{q: "Last summer, we ___ to Spain.", opts: ["go", "going", "went", "goed"], correct: 2, exp: "go → went"}, {q: "She ___ write the email yet.", opts: ["didn't", "doesn't", "don't", "wasn't"], correct: 0, exp: "didn't + base form"}, {q: "___ the film good?", opts: ["Did", "Were", "Was", "Is"], correct: 2, exp: "film = it → Was"}, {q: "He ___ his phone in the classroom.", opts: ["forget", "forgot", "forgeted", "forgets"], correct: 1, exp: "forget → forgot"}, {q: "___ they arrive on time?", opts: ["Was", "Were", "Did", "Does"], correct: 2, exp: "Did + subject + base form?"}]}, {id: "past-fill-A", type: "fg", diff: 2, title: "Level 2 – Regular verbs", sentences: [{pre: "Yesterday, Tom", suf: "his bedroom. (clean)", ans: "cleaned", hint: "clean + ed"}, {pre: "We", suf: "football after school last Friday. (play)", ans: "played", hint: "play + ed"}, {pre: "She", suf: "a long letter to her friend. (write)", ans: "wrote", hint: "write → wrote"}, {pre: "He", suf: "the bus this morning. (miss)", ans: "missed", hint: "miss + ed"}, {pre: "They", suf: "to a new house last month. (move)", ans: "moved", hint: "move → moved"}]}, {id: "past-fill-B", type: "fg", diff: 2, title: "Level 2 – Irregular verbs", sentences: [{pre: "Last week, I", suf: "a great book. (read)", ans: "read", hint: "read → read"}, {pre: "She", suf: "her friends at the park. (meet)", ans: "met", hint: "meet → met"}, {pre: "We", suf: "spaghetti for dinner. (have)", ans: "had", hint: "have → had"}, {pre: "He", suf: "his bike to school yesterday. (ride)", ans: "rode", hint: "ride → rode"}, {pre: "They", suf: "three goals in the match. (score)", ans: "scored", hint: "score → scored (regular!)"}]}, {id: "past-fill-C", type: "fg", diff: 2, title: "Level 2 – was / were", sentences: [{pre: "The film", suf: "really exciting. (be)", ans: "was", hint: "film = it → was"}, {pre: "We", suf: "at the zoo on Sunday. (be)", ans: "were", hint: "we → were"}, {pre: "___ you", suf: "at home yesterday evening? (be)", ans: "Were", hint: "you → Were"}, {pre: "The children", suf: "very loud at the party. (be)", ans: "were", hint: "children = they → were"}, {pre: "I", suf: "very hungry after sport. (be)", ans: "was", hint: "I → was"}]}, {id: "past-fill-D", type: "fg", diff: 2, title: "Level 2 – Negatives with didn't", sentences: [{pre: "She", suf: "her homework last night. (not do)", ans: "didn't do", hint: "didn't + base form: do"}, {pre: "We", suf: "to the party. We were ill. (not go)", ans: "didn't go", hint: "didn't + base form: go"}, {pre: "He", suf: "his lunch. He wasn't hungry. (not eat)", ans: "didn't eat", hint: "didn't + base form: eat"}, {pre: "I", suf: "the answer. (not know)", ans: "didn't know", hint: "didn't + base form: know"}, {pre: "They", suf: "the match. They lost 3-0. (not win)", ans: "didn't win", hint: "didn't + base form: win"}]}, {id: "past-fill-E", type: "fg", diff: 2, title: "Level 2 – A trip to the zoo", sentences: [{pre: "Last Saturday, our class", suf: "to the zoo. (go)", ans: "went", hint: "go → went"}, {pre: "We", suf: "the bus at half past nine. (take)", ans: "took", hint: "take → took"}, {pre: "The children", suf: "lots of animals. (see)", ans: "saw", hint: "see → saw"}, {pre: "It", suf: "really cold, so we wore our jackets. (be)", ans: "was", hint: "be → was"}, {pre: "On the way home, Emma", suf: "her purse. (lose)", ans: "lost", hint: "lose → lost"}]}, {id: "past-fill-F", type: "fg", diff: 2, title: "Level 2 – Questions with did", sentences: [{pre: "___ you", suf: "the homework? (do)", ans: "Did", hint: "Did + subject + base form?"}, {pre: "Where", suf: "she go on holiday? (did)", ans: "did", hint: "Where did she go?"}, {pre: "___ they", suf: "the match? (win)", ans: "Did", hint: "Did + subject + base form?"}, {pre: "What time", suf: "the film start? (did)", ans: "did", hint: "What time did... start?"}, {pre: "___ he", suf: "his keys? (find)", ans: "Did", hint: "Did he find...?"}]}, {id: "past-wo-A", type: "wo", diff: 3, title: "Level 3 – Affirmative sentences", items: [{phrases: ["we", "saw", "that film", "three days ago"], correct: "We saw that film three days ago"}, {phrases: ["she", "bought", "a new phone", "yesterday"], correct: "She bought a new phone yesterday"}, {phrases: ["my family", "went to", "the beach", "last summer"], correct: "My family went to the beach last summer"}, {phrases: ["he", "played", "football", "for two hours", "yesterday afternoon"], correct: "He played football for two hours yesterday afternoon"}, {phrases: ["they", "had", "a great time", "at the party"], correct: "They had a great time at the party"}]}, {id: "past-wo-B", type: "wo", diff: 3, title: "Level 3 – Negatives", items: [{phrases: ["she", "didn't come", "to the party", "last night"], correct: "She didn't come to the party last night"}, {phrases: ["we", "didn't do", "sport", "because it was raining"], correct: "We didn't do sport because it was raining"}, {phrases: ["he", "didn't eat", "his lunch"], correct: "He didn't eat his lunch"}, {phrases: ["i", "didn't see", "the film", "last weekend"], correct: "I didn't see the film last weekend"}, {phrases: ["they", "didn't win", "the match"], correct: "They didn't win the match"}]}, {id: "past-wo-C", type: "wo", diff: 3, title: "Level 3 – Questions", items: [{phrases: ["where", "did you go", "last summer"], correct: "Where did you go last summer"}, {phrases: ["did", "she", "pass", "her test"], correct: "Did she pass her test"}, {phrases: ["what", "did he", "have", "for breakfast"], correct: "What did he have for breakfast"}, {phrases: ["did", "they", "enjoy", "the film"], correct: "Did they enjoy the film"}, {phrases: ["when", "did", "your family", "move", "to this town"], correct: "When did your family move to this town"}]}, {id: "past-wo-D", type: "wo", diff: 3, title: "Level 3 – was / were", items: [{phrases: ["the match", "was", "really exciting"], correct: "The match was really exciting"}, {phrases: ["we", "were", "very tired", "after the hike"], correct: "We were very tired after the hike"}, {phrases: ["was", "the film", "good"], correct: "Was the film good"}, {phrases: ["they", "were not", "at school", "last Friday"], correct: "They were not at school last Friday"}, {phrases: ["where", "were you", "yesterday afternoon"], correct: "Where were you yesterday afternoon"}]}, {id: "past-wo-E", type: "wo", diff: 3, title: "Level 3 – Mixed", items: [{phrases: ["she", "studied", "very hard", "before the test"], correct: "She studied very hard before the test"}, {phrases: ["did", "he", "see", "Anna", "at the party"], correct: "Did he see Anna at the party"}, {phrases: ["they", "didn't arrive", "on time"], correct: "They didn't arrive on time"}, {phrases: ["i", "broke", "my phone", "last week"], correct: "I broke my phone last week"}, {phrases: ["what time", "did", "the train", "leave"], correct: "What time did the train leave"}]}],
wo: [{id: "wo-mc-A", type: "mc", diff: 1, title: "Level 1 – Word order multiple choice", questions: [{q: "Which word order is correct?", opts: ["Every day goes she to school.", "She goes every day to school.", "She goes to school every day.", "To school she every day goes."], correct: 2, exp: "Adverbs of time usually go at the end of the sentence."}, {q: "Choose the correct sentence:", opts: ["I always do my homework.", "Always I my homework do.", "I my homework always do.", "Do I always homework."], correct: 0, exp: "Adverbs of frequency go before the main verb."}, {q: "Which sentence is correct?", opts: ["Plays Tom football now.", "Tom now plays football.", "Tom plays football now.", "Now football Tom plays."], correct: 2, exp: "Time expressions often go at the end or the start."}, {q: "Correct order: he / to / goes / school / bus / by", opts: ["He by bus goes to school.", "He goes to school by bus.", "He goes by bus school to.", "By bus he school goes."], correct: 1, exp: "Subject - verb - destination - means of transport."}, {q: "Which sentence is correct?", opts: ["She is reading a book in her room.", "She a book in her room is reading.", "In her room a book she reads.", "A book reads she in her room."], correct: 0, exp: "Standard order: subject - verb - object - place."}]}, {id: "wo-mc-B", type: "mc", diff: 1, title: "Level 1 – Question sentences", questions: [{q: "Which question is correct?", opts: ["Where she lives?", "Where does she live?", "Where does she lives?", "Does she where live?"], correct: 1, exp: "Wh-question + auxiliary + subject + base form."}, {q: "Choose the correct question:", opts: ["Do you like pizza?", "You do like pizza?", "Like you pizza?", "You pizza like?"], correct: 0, exp: "Do/Does + subject + base form."}, {q: "Which question is right?", opts: ["What doing you?", "What you are doing?", "What are you doing?", "Are what you doing?"], correct: 2, exp: "Wh-question + auxiliary + subject + verb."}, {q: "Correct question:", opts: ["How old is she?", "How is old she?", "Is she how old?", "She how old is?"], correct: 0, exp: "How old + to be + subject."}, {q: "Choose the correct question:", opts: ["Does he has a dog?", "Has he a dog?", "Does he have a dog?", "He does have a dog?"], correct: 2, exp: "Does + subject + base form (have, not has)."}]}, {id: "wo-mc-C", type: "mc", diff: 1, title: "Level 1 – Negatives", questions: [{q: "Which negative is correct?", opts: ["She not likes cats.", "She don't like cats.", "She doesn't like cats.", "She doesn't likes cats."], correct: 2, exp: "She = 3rd person singular: doesn't + base form."}, {q: "Choose the correct negative:", opts: ["They doesn't play football.", "They not play football.", "They don't plays football.", "They don't play football."], correct: 3, exp: "Plural: don't + base form."}, {q: "Correct negative:", opts: ["I am not hungry.", "I not am hungry.", "I amn't hungry.", "I no am hungry."], correct: 0, exp: "To be: subject + am/is/are + not."}, {q: "Which sentence is right?", opts: ["We can't to swim.", "We cannot swimming.", "We can't swim.", "We don't can swim."], correct: 2, exp: "Modal verb + not + base form (without to)."}, {q: "Choose the negative:", opts: ["He isn't have a car.", "He doesn't has a car.", "He doesn't have a car.", "He haven't a car."], correct: 2, exp: "doesn't + base form (have, not has)."}]}, {id: "wo-fill-A", type: "fg", diff: 2, title: "Level 2 – Gap-fill word order", sentences: [{pre: "She", suf: "her homework after school.", ans: "does", hint: "3rd person singular present"}, {pre: "They always", suf: "to school by bike.", ans: "go", hint: "Plural: go (no -s)"}, {pre: "Where", suf: "you live?", ans: "do", hint: "Question with do/does"}, {pre: "He", suf: "like vegetables.", ans: "doesn't", hint: "Negative, 3rd person singular"}, {pre: "We", suf: "playing football right now.", ans: "are", hint: "Present Progressive: to be + -ing"}]}, {id: "wo-fill-B", type: "fg", diff: 2, title: "Level 2 – Insert question words", sentences: [{pre: "", suf: "does she live? – In Berlin.", ans: "Where", hint: "Asking about a place"}, {pre: "", suf: "old are you? – I'm 11.", ans: "How", hint: "Asking about age"}, {pre: "", suf: "is your favourite subject? – English.", ans: "What", hint: "Asking about a thing"}, {pre: "", suf: "comes to the party? – My friends.", ans: "Who", hint: "Asking about a person"}, {pre: "", suf: "do you go to school? – By bus.", ans: "How", hint: "Asking about manner (how)"}]}, {id: "wo-fill-C", type: "fg", diff: 2, title: "Level 2 – Complete sentence parts", sentences: [{pre: "Tom plays football", suf: "the afternoon.", ans: "in", hint: "Time: in the morning/afternoon/evening"}, {pre: "She goes to bed", suf: "nine o'clock.", ans: "at", hint: "Clock time: at + time"}, {pre: "We have English", suf: "Mondays.", ans: "on", hint: "Weekday: on Monday"}, {pre: "I do my homework", suf: "I come home.", ans: "when", hint: "Time conjunction"}, {pre: "He is good", suf: "maths.", ans: "at", hint: "good at something"}]}, {id: "wo-wo-A", type: "wo", diff: 3, title: "Level 3 – Order sentence parts", items: [{phrases: ["every day", "reads", "she", "a book"], correct: "She reads a book every day."}, {phrases: ["to school", "by bus", "goes", "he"], correct: "He goes to school by bus."}, {phrases: ["their homework", "always", "do", "they", "after dinner"], correct: "They always do their homework after dinner."}, {phrases: ["football", "like", "don't", "we"], correct: "We don't like football."}, {phrases: ["does", "she", "where", "live"], correct: "Where does she live?"}]}, {id: "wo-wo-B", type: "wo", diff: 3, title: "Level 3 – Build sentences", items: [{phrases: ["plays", "in", "the", "he", "garden"], correct: "He plays in the garden."}, {phrases: ["you", "do", "like", "what"], correct: "What do you like?"}, {phrases: ["TV", "watch", "we", "on", "Fridays"], correct: "We watch TV on Fridays."}, {phrases: ["have", "doesn't", "a", "she", "dog"], correct: "She doesn't have a dog."}, {phrases: ["is", "doing", "what", "he"], correct: "What is he doing?"}]}, {id: "wo-wo-C", type: "wo", diff: 3, title: "Level 3 – Forming answers", items: [{phrases: ["to", "school", "I", "go", "foot", "on"], correct: "I go to school on foot."}, {phrases: ["likes", "she", "reading", "books"], correct: "She likes reading books."}, {phrases: ["don't", "I", "vegetables", "like"], correct: "I don't like vegetables."}, {phrases: ["are", "they", "playing", "now"], correct: "They are playing now."}, {phrases: ["his", "does", "homework", "he", "never"], correct: "He never does his homework."}]}],
  pp: [
    {id:"pp-mc-A", type:"mc", diff:1, title:"Level 1 – Build forms",
     questions:[
      {q:"She ___ a book right now.", opts:["is reading","are reading","reads","read"], correct:0, exp:"she → is + verb-ing (Present Progressive for now)."},
      {q:"They ___ football in the garden.", opts:["is playing","are playing","play","plays"], correct:1, exp:"they → are + Verb-ing."},
      {q:"I ___ TV at the moment.", opts:["am watching","is watching","are watching","watch"], correct:0, exp:"I → am + Verb-ing."},
      {q:"Look! It ___ outside.", opts:["is raining","are raining","rains","rain"], correct:0, exp:"it → is + Verb-ing."},
      {q:"We ___ dinner right now.", opts:["is having","are having","have","has"], correct:1, exp:"we → are + Verb-ing."},
    ]},
    {id:"pp-mc-B", type:"mc", diff:1, title:"Level 1 – Signal words",
     questions:[
      {q:"Which word signals Present Progressive?", opts:["yesterday","right now","every day","last week"], correct:1, exp:"right now = gerade jetzt → Present Progressive."},
      {q:"He ___ his homework at the moment.", opts:["is doing","does","did","do"], correct:0, exp:"at the moment = gerade → is + Verb-ing."},
      {q:"___ she listening to music?", opts:["Is","Are","Do","Does"], correct:0, exp:"Progressive question: Is/Are + subject + verb-ing?"},
      {q:"He ___ working. He is on holiday.", opts:["isn't","aren't","doesn't","don't"], correct:0, exp:"he → isn't + verb-ing (negative)."},
      {q:"What ___ they doing over there?", opts:["are","is","do","does"], correct:0, exp:"they → are in questions and sentences."},
    ]},
    {id:"pp-mc-C", type:"mc", diff:2, title:"Level 2 – Spelling-Regeln",
     questions:[
      {q:"He ___ (run) in the park.", opts:["is running","is runing","are running","runs"], correct:0, exp:"run → running: Konsonant nach kurzem Vokal wird verdoppelt."},
      {q:"She ___ (write) a letter.", opts:["is writing","is writeing","are writing","writes"], correct:0, exp:"write → writing: the silent -e is dropped."},
      {q:"They ___ (sit) in the library.", opts:["are sitting","are siting","is sitting","sit"], correct:0, exp:"sit → sitting: Konsonant verdoppeln."},
      {q:"I ___ (make) breakfast.", opts:["am making","am makeing","am makking","is making"], correct:0, exp:"make → making: the silent -e is dropped."},
      {q:"The baby ___ (sleep) right now.", opts:["is sleeping","is sleping","are sleeping","sleep"], correct:0, exp:"sleep → sleeping: normales Verb, einfach +ing."},
    ]},
    {id:"pp-fg-A", type:"fg", diff:1, title:"Level 1 – Fill the gaps",
     items:[
      {pre:"Look!", suf:"(the dog / to bark)", ans:"The dog is barking", hint:"Subject + is/are + verb-ing"},
      {pre:"We", suf:"(to have) a great time!", ans:"are having", hint:"have → having (e weglassen)"},
      {pre:"She", suf:"(not / to listen) to me.", ans:"is not listening", hint:"isn't / is not + Verb-ing"},
      {pre:"It is Monday afternoon.", suf:"Tom (to play) computer games.", ans:"is playing", hint:"is + Verb-ing"},
      {pre:"Why", suf:"you (to laugh)?", ans:"are you laughing", hint:"are + subject + verb-ing in questions"},
    ]},
    {id:"pp-fg-B", type:"fg", diff:2, title:"Level 2 – Complete sentences",
     items:[
      {pre:"The children", suf:"(to run) around the garden.", ans:"are running", hint:"run → running (double the consonant)"},
      {pre:"Dad", suf:"(to sit) in the garden and reading.", ans:"is sitting", hint:"sit → sitting"},
      {pre:"Mum", suf:"(to make) a cake right now.", ans:"is making", hint:"make → making (e weglassen)"},
      {pre:"I", suf:"(to write) an email to my friend.", ans:"am writing", hint:"write → writing"},
      {pre:"They", suf:"(not / to swim) – the pool is closed.", ans:"are not swimming", hint:"swim → swimming + not"},
    ]},
    {id:"pp-wo-A", type:"wo", diff:2, title:"Level 2 – Order sentences",
     items:[
      {phrases:["She","is eating","lunch","right now"], correct:"She is eating lunch right now."},
      {phrases:["Are they","playing","football?"], correct:"Are they playing football?"},
      {phrases:["He","is not doing","his homework"], correct:"He is not doing his homework."},
      {phrases:["What","is she","reading?"], correct:"What is she reading?"},
      {phrases:["I","am listening","to music","at the moment"], correct:"I am listening to music at the moment."},
    ]},
    {id:"pp-wo-B", type:"wo", diff:3, title:"Level 3 – Negatives & questions",
     items:[
      {phrases:["Why","are you","not listening","to me?"], correct:"Why are you not listening to me?"},
      {phrases:["Is the dog","sitting","on the sofa?"], correct:"Is the dog sitting on the sofa?"},
      {phrases:["They","are not having","dinner","yet"], correct:"They are not having dinner yet."},
      {phrases:["He","is running","very","fast"], correct:"He is running very fast."},
      {phrases:["Are you","watching","TV","right now?"], correct:"Are you watching TV right now?"},
    ]},
  ],
  gtf: [{id: "gtf-mc-A", type: "mc", diff: 1, title: "Level 1 – going to basics", questions: [{q: "She ___ play football tomorrow.", opts: ["is going to", "are going to", "go to", "going"], correct: 0, exp: "She = is going to + base form."}, {q: "They ___ visit their grandma.", opts: ["is going to", "are going to", "go to", "am going to"], correct: 1, exp: "They = are going to + base form."}, {q: "I ___ buy a new bike.", opts: ["is going to", "are going to", "am going to", "go to"], correct: 2, exp: "I = am going to + base form."}, {q: "Look at those clouds! It ___ rain.", opts: ["is going to", "are going to", "am going to", "go"], correct: 0, exp: "Prediction with evidence = is going to."}, {q: "He ___ play tennis today.", opts: ["is not going to", "are not going to", "am not going to", "not going to"], correct: 0, exp: "Verneinung: He is not going to play tennis today. Das not steht zwischen is und going to."}]}, {id: "gtf-mc-B", type: "mc", diff: 1, title: "Level 1 – will vs. going to", questions: [{q: "Spontaneous decision: 'Someone's at the door.' 'I ___ get it!'", opts: ["am going to", "will", "goes to", "is going"], correct: 1, exp: "Spontaneous decision in the moment = will."}, {q: "Planned intention: She ___ study medicine.", opts: ["will", "is going to", "are going to", "goes"], correct: 1, exp: "Fixed plan = going to."}, {q: "Prediction with evidence: The bag is too heavy. It ___ break.", opts: ["will", "is going to", "are going to", "is going"], correct: 1, exp: "Visible evidence = going to."}, {q: "Offer: '___ I help you?'", opts: ["Am going to", "Are going to", "Will", "Go"], correct: 2, exp: "Offers = Will I / Shall I."}, {q: "Plan: We ___ go camping this summer.", opts: ["will", "are going to", "is going to", "am going to"], correct: 1, exp: "Planned activity = going to."}]}, {id: "gtf-mc-C", type: "mc", diff: 1, title: "Level 1 – Future time expressions", questions: [{q: "Which time expression does NOT fit the future?", opts: ["tomorrow", "next week", "yesterday", "in three days"], correct: 2, exp: "yesterday = past tense."}, {q: "Full form: '___' = is not going to", opts: ["isn't going to", "aren't going to", "not going to", "is not going"], correct: 0, exp: "isn't = is not (short form)."}, {q: "Correct question with going to:", opts: ["Is she going to come?", "She is going to come?", "Is she go to come?", "Goes she to come?"], correct: 0, exp: "Question: to be + subject + going to + base form."}, {q: "Right or wrong: 'I am going to visited my friend.'", opts: ["correct", "wrong – it must be 'visit'", "wrong – it must be 'visits'", "wrong – it must be 'visiting'"], correct: 1, exp: "going to + base form (visit), not visited."}, {q: "Future with going to – choose correctly:", opts: ["They going to win.", "They are go to win.", "They are going to win.", "They will going to win."], correct: 2, exp: "Subject + to be + going to + base form."}]}, {id: "gtf-mc-D", type: "mc", diff: 1, title: "Level 1 – building going to sentences", questions: [{q: "Anna firmly plans to cook:", opts: ["Anna is going to cooks.", "Anna are going to cook.", "Anna is going to cook.", "Anna goes to cook."], correct: 2, exp: "She = is going to + base form (no -s)."}, {q: "We plan to go swimming tomorrow:", opts: ["We am going to swim.", "We is going to swim.", "We are going swimming.", "We are going to swim."], correct: 3, exp: "We = are going to + base form."}, {q: "Negative: I will not eat this:", opts: ["I not am going to eat this.", "I amn't going to eat this.", "I am not going to eat this.", "I am going to not eat this."], correct: 2, exp: "I am not going to + base form."}, {q: "Question: Will you study tomorrow?", opts: ["Are you going to study tomorrow?", "You are going to study tomorrow?", "Do you going to study tomorrow?", "Will you going to study tomorrow?"], correct: 0, exp: "Are you going to + base form?"}, {q: "He ___ watch TV tonight.", opts: ["are going to", "am going to", "is going to", "go to"], correct: 2, exp: "He = is going to + base form."}]}, {id: "gtf-mc-E", type: "mc", diff: 1, title: "Level 1 – Context and use", questions: [{q: "You see someone trip. What do you say?", opts: ["He will fall.", "He is going to fall.", "He falls.", "He goes to fall."], correct: 1, exp: "Prediction with evidence = going to."}, {q: "What are you doing in the holidays?", opts: ["I am going to visit Paris.", "I will visit Paris tomorrow.", "I visited Paris.", "I go Paris."], correct: 0, exp: "Fixed plan = going to."}, {q: "Correct short answer: 'Is she going to study?' 'Yes, ___.", opts: ["she is", "she does", "she will", "she going"], correct: 0, exp: "Yes, she is. (short answer with to be)"}, {q: "Short negative: 'Are they going to come?' 'No, ___.", opts: ["they aren't", "they don't", "they won't", "they isn't"], correct: 0, exp: "No, they aren't. (going to)."}, {q: "Which sentence expresses a plan?", opts: ["I think it will snow.", "She is going to start a new school.", "He might come.", "They probably leave."], correct: 1, exp: "Fixed plan = going to."}]}, {id: "gtf-fill-A", type: "fg", diff: 2, title: "Level 2 – insert going to", sentences: [{pre: "She", suf: "going to start a new hobby.", ans: "is", hint: "She + is"}, {pre: "We are going to", suf: "a film tonight.", ans: "watch", hint: "going to + base form"}, {pre: "Are they going to", suf: "the party?", ans: "join", hint: "going to + base form"}, {pre: "He", suf: "not going to eat vegetables.", ans: "is", hint: "He + is (not)"}, {pre: "I am going to", suf: "my room.", ans: "clean", hint: "going to + base form"}]}, {id: "gtf-fill-B", type: "fg", diff: 2, title: "Level 2 – Future forms", sentences: [{pre: "Look at the sky! It", suf: "snow. (going to)", ans: "is going to", hint: "Prediction with evidence: is going to"}, {pre: "She has a plan: she", suf: "medicine at university.", ans: "is going to study", hint: "Fixed plan: is going to + base form"}, {pre: "'I need help.' 'I", suf: "you!'", ans: "will help", hint: "Spontaneous decision: will"}, {pre: "They", suf: "to Paris next summer.", ans: "are going to travel", hint: "Planned trip: are going to + base form"}, {pre: "I", suf: "join the team next year.", ans: "am going to", hint: "I + am going to + base form"}]}, {id: "gtf-fill-C", type: "fg", diff: 2, title: "Level 2 – Questions and negatives", sentences: [{pre: "", suf: "she going to join us?", ans: "Is", hint: "Question: Is/Are + subject + going to"}, {pre: "They", suf: "going to miss the bus.", ans: "aren't", hint: "Negative: aren't = are not"}, {pre: "", suf: "you going to study tonight?", ans: "Are", hint: "you = Are you..."}, {pre: "He", suf: "going to win. He's too slow.", ans: "isn't", hint: "He = isn't = is not"}, {pre: "I", suf: "going to eat that – it smells terrible.", ans: "am not", hint: "I = am not going to"}]}, {id: "gtf-fill-D", type: "fg", diff: 2, title: "Level 2 – Translations", sentences: [{pre: "Er wird morgen kommen. He", suf: "tomorrow.", ans: "is going to come", hint: "He + is going to + base form"}, {pre: "Wir werden das Spiel gewinnen. We", suf: "the game.", ans: "are going to win", hint: "We + are going to + base form"}, {pre: "Sie werden nicht kommen. They", suf: "come.", ans: "aren't going to", hint: "Negative: aren't going to"}, {pre: "Wirst du lernen?", suf: "you going to study?", ans: "Are", hint: "Question: Are + you"}, {pre: "Ich werde aufraumen. I", suf: "tidy up.", ans: "am going to", hint: "I + am going to + base form"}]}, {id: "gtf-fill-E", type: "fg", diff: 2, title: "Level 2 – mixed gaps", sentences: [{pre: "She is going to", suf: "a nurse.", ans: "become", hint: "going to + base form (become)"}, {pre: "Are you going to", suf: "your friends this weekend?", ans: "visit", hint: "going to + base form (visit)"}, {pre: "The match", suf: "to start soon.", ans: "is going", hint: "it = is going to"}, {pre: "They", suf: "going to travel by train.", ans: "are", hint: "they = are"}, {pre: "I am not going to", suf: "late.", ans: "be", hint: "going to + base form (be)"}]}, {id: "gtf-wo-A", type: "wo", diff: 3, title: "Level 3 – Order sentence parts", items: [{phrases: ["she", "is going to", "start", "a new hobby", "next week"], correct: "She is going to start a new hobby next week."}, {phrases: ["are", "they", "going to", "the game", "win?"], correct: "Are they going to win the game?"}, {phrases: ["I", "am not going to", "eat", "that"], correct: "I am not going to eat that."}, {phrases: ["Paris", "to", "he", "is going to", "travel"], correct: "He is going to travel to Paris."}, {phrases: ["tonight", "we", "are going to", "a film", "watch"], correct: "We are going to watch a film tonight."}]}, {id: "gtf-wo-B", type: "wo", diff: 3, title: "Level 3 – Future plans", items: [{phrases: ["buy", "a new", "she", "is going to", "phone"], correct: "She is going to buy a new phone."}, {phrases: ["study", "are", "they", "going to", "hard?"], correct: "Are they going to study hard?"}, {phrases: ["join", "I", "am going to", "the team"], correct: "I am going to join the team."}, {phrases: ["isn't", "he", "to", "going", "come"], correct: "He isn't going to come."}, {phrases: ["are", "we", "going to", "win?", "really"], correct: "Are we really going to win?"}]}, {id: "gtf-wo-C", type: "wo", diff: 3, title: "Level 3 – Describing plans", items: [{phrases: ["clean", "is going to", "she", "her room"], correct: "She is going to clean her room."}, {phrases: ["are", "you", "going to", "help", "me?"], correct: "Are you going to help me?"}, {phrases: ["they", "aren't", "going to", "the match", "miss"], correct: "They aren't going to miss the match."}, {phrases: ["next summer", "we", "are going to", "visit", "Rome"], correct: "We are going to visit Rome next summer."}, {phrases: ["the bus", "going to", "be", "late", "is"], correct: "The bus is going to be late."}]}],
  qn: [{id: "qn-mc-A", type: "mc", diff: 1, title: "Level 1 – Question words basics", questions: [{q: "___ is your name?", opts: ["Where", "Who", "What", "When"], correct: 2, exp: "What = Was (nach Sachen, Namen)."}, {q: "___ do you live?", opts: ["What", "Why", "Who", "Where"], correct: 3, exp: "Where = Wo (nach dem Ort)."}, {q: "___ is your birthday?", opts: ["Where", "Who", "What", "When"], correct: 3, exp: "When = asks about time."}, {q: "___ is your best friend?", opts: ["What", "Where", "Who", "When"], correct: 2, exp: "Who = asks about a person."}, {q: "___ do you go to school by bus?", opts: ["What", "Where", "When", "Why"], correct: 3, exp: "Why = Warum (nach dem Grund)."}]}, {id: "qn-mc-B", type: "mc", diff: 1, title: "Level 1 – How + adjective", questions: [{q: "___ old are you?", opts: ["What", "How", "Which", "Who"], correct: 1, exp: "How old = Wie alt."}, {q: "___ much does it cost?", opts: ["What", "Which", "How", "Where"], correct: 2, exp: "How much = Wie viel (Preis)."}, {q: "___ many students are in your class?", opts: ["What", "Where", "Who", "How"], correct: 3, exp: "How many = Wie viele (zaehlbar)."}, {q: "___ far is the school?", opts: ["What", "Why", "How", "Where"], correct: 2, exp: "How far = Wie weit."}, {q: "___ often do you play sports?", opts: ["How", "What", "Where", "Who"], correct: 0, exp: "How often = Wie oft."}]}, {id: "qn-mc-C", type: "mc", diff: 1, title: "Level 1 – What or Which?", questions: [{q: "___ colour do you like? (alle Farben moeglich)", opts: ["Which", "What", "Who", "Where"], correct: 1, exp: "What = open, no limited choice."}, {q: "___ subject do you prefer, English or Maths?", opts: ["What", "Who", "Which", "Where"], correct: 2, exp: "Which = from a limited choice."}, {q: "___ book is yours, the red or the blue one?", opts: ["What", "Who", "Where", "Which"], correct: 3, exp: "Which = choice from known options."}, {q: "___ time is it?", opts: ["Which", "Where", "Who", "What"], correct: 3, exp: "What time = Wie spaet ist es?"}, {q: "___ team do you support?", opts: ["Who", "Where", "When", "Which"], correct: 3, exp: "Which = aus mehreren Teams waehlen."}]}, {id: "qn-mc-D", type: "mc", diff: 1, title: "Level 1 – Question words in sentences", questions: [{q: "___ does she play tennis? On Saturdays.", opts: ["Why", "Where", "Who", "When"], correct: 3, exp: "When = asks about time (answer is a time)."}, {q: "___ is making that noise? Tom.", opts: ["What", "Where", "Who", "When"], correct: 2, exp: "Who = asks about a person (answer is a person)."}, {q: "___ does he do? He's a teacher.", opts: ["Who", "Where", "What", "When"], correct: 2, exp: "What = Was (Beruf als Antwort)."}, {q: "___ don't you like sport? Because it's boring.", opts: ["When", "Where", "Who", "Why"], correct: 3, exp: "Why = Warum (Grund als Antwort)."}, {q: "___ does she live? In Hamburg.", opts: ["Who", "Why", "When", "Where"], correct: 3, exp: "Where = Wo (Ort als Antwort)."}]}, {id: "qn-mc-E", type: "mc", diff: 1, title: "Level 1 – Sentence structure with question words", questions: [{q: "Which question is correct?", opts: ["Where she lives?", "Where does she live?", "Where does she lives?", "Where live she?"], correct: 1, exp: "Wh-word + auxiliary + subject + base form."}, {q: "Correct question:", opts: ["What you doing?", "What are you doing?", "What you are doing?", "What doing you?"], correct: 1, exp: "Wh-word + auxiliary + subject + verb."}, {q: "Correct question with 'who':", opts: ["Who he is?", "Who is he?", "Who does he is?", "He who is?"], correct: 1, exp: "Who + to be + subject."}, {q: "Which question is correct?", opts: ["How much costs it?", "How much does it costs?", "How much does it cost?", "How much it costs?"], correct: 2, exp: "How much + does + subject + base form."}, {q: "Choose the correct question:", opts: ["Why he doesn't come?", "Why doesn't he come?", "Why he don't come?", "Why don't comes he?"], correct: 1, exp: "Why + auxiliary + subject + base form."}]}, {id: "qn-fill-A", type: "fg", diff: 2, title: "Level 2 – Insert question words", sentences: [{pre: "", suf: "does she live? In Berlin.", ans: "Where", hint: "Place = Where"}, {pre: "", suf: "is your favourite colour? Blue.", ans: "What", hint: "Thing (open) = What"}, {pre: "", suf: "often do you read? Every day.", ans: "How", hint: "Haeufigkeit = How often"}, {pre: "", suf: "is coming to the party? My friends.", ans: "Who", hint: "Person = Who"}, {pre: "", suf: "don't you like fish? I hate the smell.", ans: "Why", hint: "Grund = Why"}]}, {id: "qn-fill-B", type: "fg", diff: 2, title: "Level 2 – How + adjective", sentences: [{pre: "", suf: "old is your sister? She's 14.", ans: "How", hint: "Age = How old"}, {pre: "", suf: "many books do you have? About 30.", ans: "How", hint: "Number (countable) = How many"}, {pre: "", suf: "much does the ticket cost? Five euros.", ans: "How", hint: "Price = How much"}, {pre: "", suf: "far is the station? Ten minutes on foot.", ans: "How", hint: "Distance = How far"}, {pre: "", suf: "tall are you? One metre sixty.", ans: "How", hint: "Groesse = How tall"}]}, {id: "qn-fill-C", type: "fg", diff: 2, title: "Level 2 – Completing questions", sentences: [{pre: "Where does he", suf: "? He works in a school.", ans: "work", hint: "Base form after does he"}, {pre: "What time", suf: "the film start? At seven.", ans: "does", hint: "Auxiliary: does + base form"}, {pre: "Who", suf: "your English teacher? Mr Brown.", ans: "is", hint: "Who + to be (no do/does when who = subject)"}, {pre: "How many siblings", suf: "she have? Two.", ans: "does", hint: "Auxiliary: does + base form"}, {pre: "Why", suf: "you late? Because I missed the bus.", ans: "are", hint: "to be: are you (no do/does)"}]}, {id: "qn-fill-D", type: "fg", diff: 2, title: "Level 2 – Answers and questions", sentences: [{pre: "'I live in Munich.' Frage:", suf: "do you live?", ans: "Where", hint: "Place = Where"}, {pre: "'I'm 12.' Frage:", suf: "old are you?", ans: "How", hint: "Age = How old"}, {pre: "'Her name is Anna.' Frage:", suf: "is her name?", ans: "What", hint: "Name = What"}, {pre: "'Because I love animals.' Frage:", suf: "do you want to be a vet?", ans: "Why", hint: "Grund = Why"}, {pre: "'My brother.' Frage:", suf: "is that?", ans: "Who", hint: "Person = Who"}]}, {id: "qn-fill-E", type: "fg", diff: 2, title: "Level 2 – What, Which or How?", sentences: [{pre: "", suf: "sport do you play? (keine Einschraenkung)", ans: "What", hint: "offen = What"}, {pre: "", suf: "bus goes to the centre, the 7 or the 12?", ans: "Which", hint: "begrenzte Auswahl = Which"}, {pre: "", suf: "long does the journey take?", ans: "How", hint: "Duration = How long"}, {pre: "", suf: "language do you want to learn next?", ans: "What", hint: "offen, keine Einschraenkung = What"}, {pre: "", suf: "team won, Barcelona or Madrid?", ans: "Which", hint: "zwei Optionen = Which"}]}, {id: "qn-wo-A", type: "wo", diff: 3, title: "Level 3 – Order questions", items: [{phrases: ["live", "do", "you", "where"], correct: "Where do you live?"}, {phrases: ["is", "your", "name", "what"], correct: "What is your name?"}, {phrases: ["old", "how", "are", "you"], correct: "How old are you?"}, {phrases: ["does", "he", "come", "from", "where"], correct: "Where does he come from?"}, {phrases: ["late", "you", "why", "are"], correct: "Why are you late?"}]}, {id: "qn-wo-B", type: "wo", diff: 3, title: "Level 3 – Forming questions", items: [{phrases: ["does", "what", "she", "do?"], correct: "What does she do?"}, {phrases: ["many", "how", "do", "you", "have", "brothers"], correct: "How many brothers do you have?"}, {phrases: ["favourite", "subject", "what's", "your"], correct: "What's your favourite subject?"}, {phrases: ["the party", "who", "coming to", "is"], correct: "Who is coming to the party?"}, {phrases: ["much", "how", "does", "it", "cost"], correct: "How much does it cost?"}]}, {id: "qn-wo-C", type: "wo", diff: 3, title: "Level 3 – Complex questions", items: [{phrases: ["long", "how", "does", "the film", "last"], correct: "How long does the film last?"}, {phrases: ["often", "how", "do", "you", "exercise"], correct: "How often do you exercise?"}, {phrases: ["which", "bus", "goes", "to the centre"], correct: "Which bus goes to the centre?"}, {phrases: ["aren't", "why", "coming", "you"], correct: "Why aren't you coming?"}, {phrases: ["far", "how", "is", "the station"], correct: "How far is the station?"}]}]
};

