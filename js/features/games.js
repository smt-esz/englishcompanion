// ═══════════════════════════════════════════════
// SPIELE
// ═══════════════════════════════════════════════

function renderSpiele(){
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
      <button onclick="go('home')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">← ${T('nav_home')}</button>
      <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('games_title')}</h1>
    </div>
    <p style="color:#64748B">${T('games_sub')}</p>
    <div class="card" style="display:flex;align-items:center;gap:.75rem;background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border-color:#C4B5FD;padding:.7rem 1rem">
      <span style="font-size:1.4rem">🚀</span>
      <p style="font-size:.85rem;color:#4338CA;font-weight:600">${T('home_level')||'Level'} ${levelInfo().level} · ${T('games_unlock_hint')||'Sammle XP und schalte nach und nach mehr Spiele frei!'}</p>
    </div>

    ${(()=>{
      // Eine Karte pro Spiel: großes Icon, kurze Beschreibung, Themenwahl
      // direkt auf der Karte – statt einer Kachel pro Thema.
      const memTopics = VOCAB.filter(t=>t.words.length>=4);
      const selStyle = 'width:100%;margin-top:.6rem;padding:.45rem .6rem;border-radius:.6rem;font-size:.82rem;border:1.5px solid #E2E8F0;background:#fff;cursor:pointer;box-sizing:border-box';
      const REQ = {'⚡':1,'🃏':1,'🔍':2,'🎯':3,'🧪':4};
      const _lvl = levelInfo().level;
      const gameCard = (emoji, bg, border, titleColor, title, desc, body) => {
        const req = REQ[emoji]||1;
        if(_lvl < req){
          return `
        <div class="card" style="background:#F8FAFC;border-color:#E2E8F0;padding:1.1rem 1.25rem;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.25rem">
            <span style="font-size:2rem;flex-shrink:0;filter:grayscale(1);opacity:.55">${emoji}</span>
            <div style="min-width:0">
              <h3 style="font-weight:800;color:#64748B;font-size:1rem">${title} 🔒</h3>
              <p style="font-size:.78rem;color:#94A3B8">${desc}</p>
            </div>
          </div>
          <div style="margin-top:auto;background:#EEF2FF;border:1px dashed #C7D2FE;border-radius:.6rem;padding:.55rem .7rem;text-align:center;font-size:.82rem;color:#4338CA;font-weight:700">🔒 ${T('games_unlock_at')||'Ab Level'} ${req}</div>
        </div>`;
        }
        return `
        <div class="card" style="background:${bg};border-color:${border};padding:1.1rem 1.25rem;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.25rem">
            <span style="font-size:2rem;flex-shrink:0">${emoji}</span>
            <div style="min-width:0">
              <h3 style="font-weight:800;color:${titleColor};font-size:1rem">${title}</h3>
              <p style="font-size:.78rem;color:#64748B">${desc}</p>
            </div>
          </div>
          <div style="margin-top:auto">${body}</div>
        </div>`;
      };
      const vocabOpts = memTopics.map(t=>`<option value="${t.id}">${t.emoji} ${vocabTitle(t)}</option>`).join('');
      return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.9rem">

        ${gameCard('⚡','linear-gradient(135deg,#FDF4FF,#F5F3FF)','#C4B5FD','#6B21A8', 'Quick-Fire', T('qf_sub'), `
          <div style="display:flex;gap:.5rem">
            <button onclick="go('grammar-quickfire','mixed')" style="flex:1;padding:.5rem;border-radius:.6rem;border:none;background:#7C3AED;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">📚 ${T('label_grammar')}</button>
            <button onclick="go('grammar-quickfire','v:mixed')" style="flex:1;padding:.5rem;border-radius:.6rem;border:none;background:#8B5CF6;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">🔤 ${T('label_vocab')}</button>
          </div>
          <select onchange="if(this.value)go('grammar-quickfire',this.value);this.selectedIndex=0" style="${selStyle}">
            <option value="">${T('games_pick_topic')}</option>
            <optgroup label="📚 ${T('label_grammar')}">${GRAMMAR.map(t=>`<option value="${t.id}">${t.title}</option>`).join('')}</optgroup>
            <optgroup label="🔤 ${T('label_vocab')}">${memTopics.map(t=>`<option value="v:${t.id}">${t.emoji} ${vocabTitle(t)}</option>`).join('')}</optgroup>
          </select>`)}

        ${gameCard('🃏','#EFF6FF','#BFDBFE','#1D4ED8', 'Memory', T('games_memory_desc'), `
          <div style="display:flex;gap:.5rem">
            <button onclick="goMemory(['${memTopics.map(t=>t.id).join("','")}'][Math.floor(Math.random()*${memTopics.length})])" style="flex:1;padding:.5rem;border-radius:.6rem;border:none;background:#3B82F6;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">🎲 ${T('games_random')}</button>
            <button onclick="startIrregMemory('irr2')" style="flex:1;padding:.5rem;border-radius:.6rem;border:none;background:#F59E0B;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">📋 ${T('nav_irreg')}</button>
          </div>
          <select onchange="if(this.value)goMemory(this.value);this.selectedIndex=0" style="${selStyle}">
            <option value="">${T('games_pick_topic')}</option>${vocabOpts}
          </select>`)}

        ${gameCard('🔍','#F0FDF4','#6EE7B7','#065F46', T('ws_title'), T('games_ws_desc'), `
          <button onclick="go('wordsearch')" style="width:100%;padding:.5rem;border-radius:.6rem;border:none;background:#10B981;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">▶ ${T('games_play')}</button>
          <p style="font-size:.7rem;color:#94A3B8;margin-top:.4rem">${T('games_topic_ingame')}</p>`)}

        ${gameCard('🎯','#FFF7ED','#FED7AA','#92400E', T('hm_title'), T('games_hm_desc'), `
          <button onclick="go('hangman','mixed')" style="width:100%;padding:.5rem;border-radius:.6rem;border:none;background:#F97316;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer">▶ ${T('games_play')}</button>
          <select onchange="if(this.value){startHangman(this.value);go('hangman',this.value);}this.selectedIndex=0" style="${selStyle}">
            <option value="">${T('games_pick_topic')}</option>
            <option value="irreg">📋 ${T('nav_irreg')}</option>${vocabOpts}
          </select>`)}

        ${gameCard('🧪','#FFFBEB','#FDE68A','#92400E', T('games_quiz_corner'), T('games_quiz_corner_desc'), `
          <div style="display:flex;flex-direction:column;gap:.4rem">
            <button onclick="go('irreg','mc')" style="padding:.45rem;border-radius:.6rem;border:1.5px solid #FDE68A;background:#fff;color:#92400E;font-size:.8rem;font-weight:700;cursor:pointer;text-align:left">🧪 Irregular Verb Quiz</button>
            <button onclick="go('irreg','flashcard')" style="padding:.45rem;border-radius:.6rem;border:1.5px solid #FDE68A;background:#fff;color:#92400E;font-size:.8rem;font-weight:700;cursor:pointer;text-align:left">🃏 ${T('games_verb_cards_label')}</button>
            <button onclick="startWAQuiz()" style="padding:.45rem;border-radius:.6rem;border:1.5px solid #FDE68A;background:#fff;color:#92400E;font-size:.8rem;font-weight:700;cursor:pointer;text-align:left">🔤 ${T('wa_title').replace('🔤 ','')}</button>
          </div>`)}

      </div>`;
    })()}

    ${(()=>{
      const gs = P.gameStats||{};
      const allEntries = [
        ...(gs.hangman||[]).slice(0,3).map(e=>({...e, game:'🎯 Hangman', detail:e.won?`✅ ${e.word}${e.duration?' · '+e.duration+'s':''}`:`💀 ${e.word}`})),
        ...(gs.memory||[]).slice(0,3).map(e=>({...e, game:'🃏 Memory', detail:`${e.moves} ${T('mem_moves')}${e.duration?' · '+e.duration+'s':''}`})),
        ...(gs.qf||[]).slice(0,3).map(e=>({...e, game:'⚡ Quick-Fire', detail:`${e.score} ${T('ex_correct_score')} · ${e.pct}%`})),
        ...(gs.wordsearch||[]).slice(0,3).map(e=>({...e, game:'🔍 '+T('ws_title'), detail:`${e.found}/${e.total} ${T('label_words')}${e.duration?' · '+e.duration+'s':''}`})),
      ].sort((a,b)=>0); // keep order as-is
      if(!allEntries.length) return '';
      const rows = allEntries.map(e=>`<div style="display:flex;align-items:center;gap:.5rem;padding:.35rem 0;border-bottom:1px solid #FEF9C3;font-size:.8rem">
        <span style="font-weight:700;min-width:5.5rem;color:#1E293B">${e.game}</span>
        <span style="flex:1;color:#475569">${e.detail}</span>
        <span style="color:#94A3B8;font-size:.72rem">${e.date||''} ${e.time||''}</span>
      </div>`).join('');
      return `<details style="margin-top:.5rem">
        <summary style="cursor:pointer;font-size:.88rem;font-weight:700;color:#92400E;background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:.75rem;padding:.6rem 1rem;list-style:none;display:flex;align-items:center;justify-content:space-between">
          🏅 ${T('leaderboard_heading_short')} <span style="font-size:.75rem;color:#B45309">▾</span>
        </summary>
        <div style="background:#FFFBEB;border:1.5px solid #FDE68A;border-top:none;border-radius:0 0 .75rem .75rem;padding:.75rem 1rem">${rows}</div>
      </details>`;
    })()}
  </div>`;
}

// ── WORD SEARCH ──────────────────────────────────────────────────
let _wsState = {found:[], grid:[], words:[]};

let _wsTopicId = 'mixed';
function buildWordSearch(topicId){
  _wsTopicId = topicId||'mixed';
  let wordPool;
  if(topicId==='irreg'){
    wordPool = IRREG.map(v=>({en:v.inf.replace(/^to /,''), de:v.de})).filter(w=>!/\s/.test(w.en)&&w.en.length>=3&&w.en.length<=10);
  } else if(topicId && topicId!=='mixed'){
    const t = VOCAB.find(v=>v.id===topicId);
    wordPool = t ? t.words.filter(w=>w.en&&!/\s/.test(w.en.replace(/^to /,''))&&w.en.replace(/^to /,'').length>=3&&w.en.replace(/^to /,'').length<=10) : [];
  }
  if(!wordPool||wordPool.length<5){
    wordPool = VOCAB.flatMap(t=>t.words).filter(w=>w.en&&!/\s/.test(w.en.replace(/^to /,''))&&w.en.replace(/^to /,'').length>=3&&w.en.replace(/^to /,'').length<=10);
  }
  wordPool = [...wordPool].sort(()=>Math.random()-.5);
  const SIZE = 14;
  const grid = Array.from({length:SIZE}, ()=>Array(SIZE).fill(''));
  const placed = [];
  const dirs = [[0,1],[1,0],[1,1],[-1,1]];

  function tryPlace(word){
    for(let t=0;t<60;t++){
      const [dr,dc] = dirs[Math.floor(Math.random()*dirs.length)];
      const r = Math.floor(Math.random()*SIZE);
      const c = Math.floor(Math.random()*SIZE);
      let ok = true;
      for(let i=0;i<word.length;i++){
        const nr=r+i*dr, nc=c+i*dc;
        if(nr<0||nr>=SIZE||nc<0||nc>=SIZE||(grid[nr][nc]&&grid[nr][nc]!==word[i])){ok=false;break;}
      }
      if(ok){
        for(let i=0;i<word.length;i++) grid[r+i*dr][c+i*dc]=word[i];
        placed.push({word, r, c, dr, dc});
        return true;
      }
    }
    return false;
  }

  const usedEntries = [];
  for(const wp of wordPool){
    const w = wp.en.replace(/^to /,'').toUpperCase();
    if(w.length<3||w.length>10||usedEntries.find(e=>e.word===w)) continue;
    if(tryPlace(w)) usedEntries.push({word:w, de:wp.de});
    if(usedEntries.length>=12) break;
  }
  const usedWords = usedEntries.map(e=>e.word);
  const wordMap = Object.fromEntries(usedEntries.map(e=>[e.word, e.de]));

  const ALPHA='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++)
    if(!grid[r][c]) grid[r][c]=ALPHA[Math.floor(Math.random()*26)];

  _wsState = {found:[], grid, words:usedWords, wordMap, placed, SIZE, selecting:false, selStart:null, selCells:[], startTime:null};
}

function renderWordSearch(topicId){
  topicId = topicId||_wsTopicId||'mixed';
  if(!_wsState.grid.length || _wsTopicId!==topicId) buildWordSearch(topicId);
  const s = _wsState;
  const allFound = s.found.length === s.words.length;
  
  const cellStyle = (r,c) => {
    const inSel = s.selCells.some(([sr,sc])=>sr===r&&sc===c);
    const isFound = s.placed.filter(p=>s.found.includes(p.word)).some(p=>{
      for(let i=0;i<p.word.length;i++) if(p.r+i*p.dr===r&&p.c+i*p.dc===c) return true; return false;
    });
    return `width:2rem;height:2rem;line-height:2rem;text-align:center;font-size:.85rem;font-weight:700;cursor:pointer;border-radius:.3rem;user-select:none;` +
      (isFound?'background:#6EE7B7;color:#065F46;':inSel?'background:#BFDBFE;color:#1E40AF;':'background:#F8FAFC;color:#1E293B;');
  };
  
  const gridPx = s.SIZE*32 + (s.SIZE-1)*2 + 6;
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('btn_back_games')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('ws_title')}</h1>
    </div>
    <div style="font-size:.78rem;color:#64748B;background:#FFFBEB;border:1px solid #FDE68A;border-radius:.5rem;padding:.4rem .75rem">
      🧭 ${T('ws_dirs')}
    </div>
    <div style="max-width:${gridPx}px">
      ${pb(s.found.length/Math.max(1,s.words.length)*100,'#F59E0B')}
      <div style="font-size:.8rem;color:#64748B;margin-bottom:.4rem">${T('ws_found')}: ${s.found.length}/${s.words.length}</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:.6rem;width:100%">
      <div style="max-width:max-content">
        <div style="display:inline-grid;grid-template-columns:repeat(${s.SIZE},2rem);gap:2px;background:#E2E8F0;padding:3px;border-radius:.5rem">
          ${s.grid.map((row,r)=>row.map((cell,c)=>`<div style="${cellStyle(r,c)}" id="ws-${r}-${c}" onclick="wsClickCell(${r},${c})">${cell}</div>`).join('')).join('')}
        </div>
        <div style="margin-top:.6rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
          <button onclick="buildWordSearch(_wsTopicId);go('wordsearch',_wsTopicId)" style="background:#EF4444;color:#fff;border:none;border-radius:.5rem;padding:.4rem .8rem;font-size:.82rem;cursor:pointer">${T('mem_new')}</button>
          <select onchange="buildWordSearch(this.value);go('wordsearch',this.value)" style="padding:.35rem .6rem;border-radius:.5rem;font-size:.8rem;border:1px solid #E2E8F0;background:#fff;cursor:pointer">
            <option value="mixed" ${_wsTopicId==='mixed'?'selected':''}>${T('hm_mixed')}</option>
            <option value="irreg" ${_wsTopicId==='irreg'?'selected':''}>📋 ${T('nav_irreg')}</option>
            ${VOCAB.filter(t=>t.words.filter(w=>w.en&&!/\s/.test(w.en.replace(/^to /,''))&&w.en.replace(/^to /,'').length>=3).length>=5).map(t=>`<option value="${t.id}" ${_wsTopicId===t.id?'selected':''}>${t.emoji} ${t.title.split('–').pop().trim()}</option>`).join('')}
          </select>
        </div>
        ${allFound?`<div class="feedback-ok" style="margin-top:.5rem">${T('ws_all_found')}${s.startTime?' ('+Math.round((Date.now()-s.startTime)/1000)+'s)':''}<br><span style="font-size:.8rem;color:#16A34A">${T('ws_auto_restart')}</span></div>${memLeaderboard('wordsearch')}`:''}
        <div style="margin-top:.6rem;display:flex;flex-wrap:wrap;gap:.3rem;max-width:100%">
          ${s.words.map(w=>`<span style="font-size:.82rem;padding:.25rem .5rem;border-radius:.4rem;font-weight:600;${s.found.includes(w)?'background:#D1FAE5;color:#065F46;text-decoration:line-through;':'background:#FFFBEB;color:#92400E;border:1px solid #FDE68A;'}">${s.found.includes(w)?'✓ ':''}${w}</span>`).join('')}
        </div>
        <details style="margin-top:.6rem">
          <summary style="cursor:pointer;font-size:.82rem;font-weight:600;color:#F59E0B">${T('ws_hint')}</summary>
          <div style="margin-top:.4rem;display:flex;flex-direction:column;gap:.2rem">
            ${s.words.map(w=>{
              const p=s.placed.find(pl=>pl.word===w);
              const dirs={'0,1':'→','1,0':'↓','1,1':'↘','-1,1':'↗','0,-1':'←','-1,0':'↑','-1,-1':'↖','1,-1':'↙'};
              const dir=p?dirs[p.dr+','+p.dc]||'?':'?';
              return `<span style="font-size:.8rem;color:#475569"><strong>${w}</strong> ${(s.wordMap&&s.wordMap[w])?'= '+(s.wordMap[w]):''} <span style="color:#F59E0B;font-size:.85rem">${s.found.includes(w)?dir:'—'}</span></span>`;
            }).join('')}
          </div>
        </details>
      </div>
    </div>
  </div>`;
}

function wsClickCell(r, c){
  const s = _wsState;
  if(!s.startTime) s.startTime = Date.now();
  if(!s.selStart){
    s.selStart = {r,c};
    s.selCells = [[r,c]];
  } else {
    const r0=s.selStart.r, c0=s.selStart.c;
    const dr=r===r0?0:Math.sign(r-r0), dc=c===c0?0:Math.sign(c-c0);
    const len=Math.max(Math.abs(r-r0),Math.abs(c-c0))+1;
    const cells=[];
    for(let i=0;i<len;i++) cells.push([r0+i*dr, c0+i*dc]);
    const word=cells.map(([cr,cc])=>s.grid[cr][cc]).join('');
    const wordRev=word.split('').reverse().join('');
    const match=s.words.find(w=>w===word||w===wordRev);
    if(match&&!s.found.includes(match)){
      s.found.push(match);
      if(s.found.length===s.words.length){
        const dur=s.startTime?Math.round((Date.now()-s.startTime)/1000):null;
        if(!P.gameStats) P.gameStats={hangman:[],memory:[],qf:[],wordsearch:[]};
        if(!P.gameStats.wordsearch) P.gameStats.wordsearch=[];
        const now=new Date(); P.gameStats.wordsearch.unshift({date:now.toLocaleDateString('de-DE'),time:now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}),found:s.words.length,total:s.words.length,duration:dur,topic:_wsTopicId});
        if(P.gameStats.wordsearch.length>20) P.gameStats.wordsearch.pop(); save();
        addXP(5); checkBadges();
        // Auto-start a fresh round after a short celebration
        s.autoRestart = true;
        setTimeout(()=>{ if(_state && _state.section==='wordsearch'){ buildWordSearch(_wsTopicId); go('wordsearch',_wsTopicId); } }, 2200);
      }
    }
    s.selStart=null; s.selCells=[];
  }
  document.getElementById('app').innerHTML=render(_state);
}

let _memState = {cards:[], flipped:[], matched:[], moves:0, topicId:null, done:false, memMode:'text'};
function renderVocabMemory(topicId, memMode){
  memMode = 'text';
  const t = VOCAB.find(v=>v.id===topicId) || VOCAB[0];
  
  if(!_memState.cards.length || _memState.topicId !== topicId){
    const PAIR_EMOJIS = ['🐱','🐶','🦊','🐸','🦁','🐯','🐨','🐼','🦜','🦄','🐙','🦋','🌺','🍕','🎸','⚽'];
    function fyshuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
    const wordPool=fyshuffle([...t.words]);
    const words=wordPool.slice(0,8);
    const cards = [];
    words.forEach((w,i)=>{
      const pairEmoji = PAIR_EMOJIS[i % PAIR_EMOJIS.length];
      cards.push({id:i*2,   pair:i, text:w.en, pairEmoji, type:'en', matched:false});
      cards.push({id:i*2+1, pair:i, text:w.de, pairEmoji, type:'de', matched:false});
    });
    fyshuffle(cards);
    _memState = {cards, flipped:[], matched:[], moves:0, topicId, done:false, memMode, startTime:null};
  }
  if(memMode !== _memState.memMode) _memState.memMode = memMode;
  const s = _memState;
  const allDone = s.matched.length === s.cards.length/2;
  
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('btn_back_games')}</button>
      <h1 style="font-size:1.3rem;font-weight:800;color:#1E293B;flex:1">🃏 Memory – ${t.emoji} ${vocabTitle(t).split('–').pop().trim()}</h1>
      <span style="font-size:.82rem;color:#64748B">${T('mem_moves_label')} ${s.moves}</span>
    </div>
    <div style="display:flex;gap:.5rem">
      <button onclick="_memState={cards:[],flipped:[],matched:[],moves:0,memMode:'text'};go('vocab-memory','${topicId}')" style="padding:.4rem .9rem;border-radius:.625rem;font-size:.8rem;font-weight:600;cursor:pointer;border:none;background:#F1F5F9;color:#64748B;margin-left:auto">${T('mem_new')}</button>
    </div>
    ${allDone?`<div class="feedback-ok" style="font-size:1.05rem;text-align:center">${T('mem_found_all_short').replace('{moves}',s.moves)}${s.duration?` (${s.duration}s)`:''}</div><div style="text-align:center;margin-top:.25rem">${memLeaderboard('memory')}</div>`:''}
    <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.4rem;max-width:360px">
      ${s.cards.map(card=>{
        const isFlipped = s.flipped.includes(card.id) || s.matched.includes(card.pair);
        const isMatched = s.matched.includes(card.pair);
        let cardContent = '?';
        if(isFlipped||isMatched){
          const fs = card.text.length>12?'.62rem':card.text.length>8?'.72rem':'.82rem';
          cardContent = `<span style="font-size:${fs};font-weight:700;color:${isMatched?'#065F46':'#1E293B'}">${card.text}</span>`;
        }
        const bg = isMatched?'#D1FAE5':isFlipped?'#EFF6FF':'#F1F5F9';
        const border = isMatched?'2px solid #6EE7B7':isFlipped?'2px solid #93C5FD':'2px solid #E2E8F0';
        return `<div onclick="memFlip(${card.id})" style="height:78px;border-radius:.6rem;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:.3rem;cursor:pointer;transition:all .15s;background:${bg};border:${border}">${isFlipped||isMatched?cardContent:'<span style="font-size:1.2rem;color:#94A3B8">?</span>'}</div>`;
      }).join('')}
    </div>
    <div style="text-align:center;font-size:.82rem;color:#94A3B8">${T('mem_found_pairs_pre')}${s.matched.length}/${s.cards.length/2}${T('mem_found_pairs_post')}</div>
  </div>`;
}

function renderMemMode(topicId, mode){
  _memState.memMode = mode;
  document.getElementById('app').innerHTML = render(_state);
}

function memFlip(cardId){
  const s = _memState;
  if(s.flipped.length>=2 || s.flipped.includes(cardId)) return;
  const card = s.cards.find(c=>c.id===cardId);
  if(!card || s.matched.includes(card.pair)) return;
  if(!s.startTime && s.flipped.length===0) s.startTime=Date.now();
  s.flipped.push(cardId);
  if(s.flipped.length===2){
    s.moves++;
    const [a,b] = s.flipped.map(id=>s.cards.find(c=>c.id===id));
    if(a.pair===b.pair){
      s.matched.push(a.pair); s.flipped=[];
      if(s.matched.length===s.cards.length/2){
        s.duration = s.startTime ? Math.round((Date.now()-s.startTime)/1000) : null;
        if(!P.gameStats) P.gameStats={hangman:[],memory:[],qf:[],wordsearch:[]};
        if(!P.gameStats.memory) P.gameStats.memory=[];
        const _prevM=(P.gameStats.memory||[]); const _isRecM=_prevM.length>0 && s.moves < Math.min(..._prevM.map(g=>g.moves||9999));
        const now=new Date(); P.gameStats.memory.unshift({date:now.toLocaleDateString('de-DE'),time:now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}),moves:s.moves,duration:s.duration,topic:s.topicId});
        if(P.gameStats.memory.length>20) P.gameStats.memory.pop(); save();
        addXP(5); checkBadges();
        if(_isRecM && typeof showToast==='function') showToast('🏆 '+(T('record_new')||'Neuer Rekord!'));
      }
    }
    else { setTimeout(()=>{ s.flipped=[]; document.getElementById('app').innerHTML=render(_state); },900); }
  }
  document.getElementById('app').innerHTML = render(_state);
}
// route vocab-memory with mode param
function goMemory(topicId, mode){ _memState={cards:[],flipped:[],matched:[],moves:0,memMode:mode||'text'}; go('vocab-memory',topicId); }

function startIrregMemory(mode){
  // mode='irr2': inf↔past  mode='irr3': inf↔past–pp
  function fyS(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  const pool=fyS([...IRREG]).slice(0,8);
  const cards=[];
  pool.forEach((v,i)=>{
    const inf='to '+v.inf;
    const b2=v.past;
    const b3=v.past+' / '+v.pp;
    cards.push({id:i*2,   pair:i, text:inf,            type:'inf', matched:false, pairEmoji:''});
    cards.push({id:i*2+1, pair:i, text:mode==='irr3'?b3:b2, type:'form', matched:false, pairEmoji:''});
  });
  fyS(cards);
  _memState={cards,flipped:[],matched:[],moves:0,topicId:'_irreg_'+mode,done:false,memMode:'text',startTime:null,irMode:mode};
  go('irreg-memory');
}

function fmtGameDate(e){ return e.date+(e.time?' '+e.time:''); }
function memLeaderboard(type){
  const raw = (P.gameStats&&P.gameStats[type])||[];
  if(!raw.length) return '';
  // Echte Bestenliste: nach Leistung sortieren, nicht nach Datum
  const entries = [...raw].sort((a,b)=>{
    if(type==='memory')     return (a.moves||9999)-(b.moves||9999) || (a.duration||9999)-(b.duration||9999);
    if(type==='qf')         return (b.score||0)-(a.score||0) || (b.pct||0)-(a.pct||0);
    if(type==='hangman')    return (b.won?1:0)-(a.won?1:0) || (a.duration||9999)-(b.duration||9999);
    if(type==='wordsearch') return (b.found||0)-(a.found||0) || (a.duration||9999)-(b.duration||9999);
    return 0;
  });
  const rows = entries.slice(0,5).map((e,i)=>{
    let detail='';
    if(type==='memory') detail=`${e.moves} ${T('mem_moves')}${e.duration?' · '+e.duration+'s':''}`;
    if(type==='qf') detail=`${e.score} ${T('ex_correct_score')} · ${e.pct}%`;
    if(type==='hangman') detail=`${e.won?'✅':'💀'} ${e.word}${e.duration?' · '+e.duration+'s':''}`;
    if(type==='wordsearch') detail=`${e.found}/${e.total} ${T('label_words')}${e.duration?' · '+e.duration+'s':''}`;
    return `<div style="display:flex;gap:.5rem;font-size:.75rem;color:#475569;padding:.2rem 0;border-bottom:1px solid #F1F5F9">
      <span style="color:#F59E0B;font-weight:700;min-width:1rem">${i+1}.</span>
      <span style="flex:1">${detail}</span>
      <span style="color:#94A3B8">${fmtGameDate(e)}</span>
    </div>`;
  }).join('');
  return `<details style="margin-top:.5rem;text-align:left"><summary style="cursor:pointer;font-size:.78rem;font-weight:600;color:#F59E0B">${T('leaderboard')}</summary><div style="margin-top:.4rem;background:#FFFBEB;border-radius:.5rem;padding:.5rem .75rem">${rows}</div></details>`;
}



// ── WORTARTEN QUIZ ───────────────────────────────────────────────
const WORTARTEN_QUIZ = [
  {q:'What word class is "beautiful"?', opts:['Noun','Verb','Adjective','Adverb'], ans:2, exp:'Adjectives describe nouns. "Beautiful" describes a person or thing.'},
  {q:'What word class is "quickly"?', opts:['Adjective','Adverb','Noun','Verb'], ans:1, exp:'Adverbs of manner describe HOW something happens. They often end in -ly.'},
  {q:'What word class is "run"?', opts:['Noun','Adjective','Adverb','Verb'], ans:3, exp:'Verbs describe actions or states. "To run" is an action verb.'},
  {q:'What word class is "happiness"?', opts:['Verb','Adjective','Noun','Adverb'], ans:2, exp:'Nouns name people, places, things or abstract ideas. "Happiness" is an abstract noun.'},
  {q:'Identify the noun: "The tall girl runs fast."', opts:['tall','runs','fast','girl'], ans:3, exp:'"Girl" is a noun — it names a person. "Tall" is an adjective, "runs" is a verb, "fast" is an adverb.'},
  {q:'Identify the adjective: "She has a new red bag."', opts:['has','new','bag','She'], ans:1, exp:'"New" (and "red") are adjectives — they describe the noun "bag".'},
  {q:'Where does the adverb of frequency "always" go?', opts:['Before the subject','After the object','Before the main verb','At the end of the sentence'], ans:2, exp:'"Always" goes before the main verb: I always eat breakfast. But after to be: She is always late.'},
  {q:'What is the correct plural of "city"?', opts:['citys','cityes','cities','cityes'], ans:2, exp:'Nouns ending in -y → change y to i + es: city → cities.'},
  {q:'Which word is a preposition?', opts:['quickly','beautiful','at','run'], ans:2, exp:'"At" is a preposition showing time or place: at school, at 3 o\'clock.'},
  {q:'Which sentence uses a pronoun correctly?', opts:['Her is my friend.','She is my friend.','Hers is my friend.','Him is here.'], ans:1, exp:'"She" is a subject pronoun. We use subject pronouns at the start of a sentence as the subject.'},
  {q:'What word class is "in" in: "The book is in the bag"?', opts:['Adjective','Adverb','Conjunction','Preposition'], ans:3, exp:'"In" is a preposition showing where the book is (location).'},
  {q:'Which is an adverb of time?', opts:['slowly','beautiful','yesterday','happy'], ans:2, exp:'"Yesterday" tells us WHEN something happened — it\'s an adverb of time.'},
  {q:'Identify the verb: "My brother usually plays football."', opts:['My brother','usually','plays','football'], ans:2, exp:'"Plays" is the verb — it describes the action. "Usually" is an adverb of frequency.'},
  {q:'Which word is a subject pronoun?', opts:['me','him','her','they'], ans:3, exp:'"They" is a subject pronoun (used as the subject of a verb). Me, him, and her are object pronouns.'},
  {q:'What type of adverb is "never"?', opts:['Adverb of time','Adverb of manner','Adverb of frequency','Adverb of place'], ans:2, exp:'"Never" is an adverb of frequency — it says how often (0%) something happens.'},
];
let _waQState = {idx:0, score:0, chosen:null, history:[], shuffled:null};

function startWAQuiz(){
  const shuffled = [...WORTARTEN_QUIZ].sort(()=>Math.random()-.5).slice(0,10);
  _waQState = {idx:0, score:0, chosen:null, history:[], shuffled};
  go('grammar-wortarten-quiz');
}

function waQPick(oi){
  if(_waQState.chosen!==null) return;
  _waQState.chosen = oi;
  const q = _waQState.shuffled[_waQState.idx];
  const right = oi === q.ans;
  if(right) _waQState.score++;
  _waQState.history.push({right, chosen:q.opts[oi], correct:q.opts[q.ans], q:q.q});
  document.getElementById('app').innerHTML = render(_state);
}

function waQNext(){
  _waQState.idx++;
  _waQState.chosen = null;
  if(_waQState.idx >= _waQState.shuffled.length) { _state.section='grammar-wortarten-quiz-done'; }
  document.getElementById('app').innerHTML = render(_state);
}

function renderWAQuiz(){
  const s = _waQState;
  if(!s.shuffled) { startWAQuiz(); return render(_state); }
  const q = s.shuffled[s.idx];
  const answered = s.chosen !== null;
  const isRight = answered && s.chosen === q.ans;
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('grammar-wortarten')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('wa_back')}</button>
      <h1 style="font-size:1.3rem;font-weight:800;color:#1E293B">${T('wa_title')}</h1>
      <span style="margin-left:auto;font-size:.85rem;color:#64748B">${s.idx+1}/${s.shuffled.length}</span>
    </div>
    <div class="card">
      <p style="font-weight:700;color:#1E293B;font-size:.98rem;line-height:1.5;margin-bottom:1rem">${q.q}</p>
      <div style="display:flex;flex-direction:column;gap:.5rem">
        ${q.opts.map((opt,i)=>{
          let bg='#F8FAFC', border='#E2E8F0', col='#1E293B';
          if(answered){
            if(i===q.ans){bg='#D1FAE5';border='#6EE7B7';col='#065F46';}
            else if(i===s.chosen&&!isRight){bg='#FEE2E2';border='#FCA5A5';col='#991B1B';}
          }
          return `<button onclick="${answered?'':'waQPick('+i+')'}" style="text-align:left;padding:.7rem 1rem;border-radius:.75rem;border:2px solid ${border};background:${bg};color:${col};font-size:.9rem;font-weight:600;cursor:${answered?'default':'pointer'};transition:all .15s">${['A','B','C','D'][i]}. ${opt}</button>`;
        }).join('')}
      </div>
      ${answered?`<div style="margin-top:.75rem;padding:.7rem;background:${isRight?'#ECFDF5':'#FFF7ED'};border-radius:.75rem;font-size:.85rem;color:${isRight?'#065F46':'#92400E'}">
        ${isRight?T('feedback_ok'):T('wa_wrong_fb')} 💡 ${q.exp}
      </div>
      <button class="btn-primary" style="margin-top:.75rem;width:100%" onclick="waQNext()">${s.idx+1<s.shuffled.length?T('wa_next_q'):T('ex_show_result')}</button>`:''}
    </div>
    <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${Math.round((s.idx/(s.shuffled.length))*100)}%;background:#8B5CF6"></div></div>
  </div>`;
}

function renderWAQuizDone(){
  const s = _waQState;
  const pct = Math.round(s.score/s.shuffled.length*100);
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.3rem;font-weight:800;color:#1E293B;margin:.5rem 0">${T('wa_done_heading')}</h2>
    <div style="font-size:2rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${pct}%</div>
    <p style="color:#64748B;margin:.25rem 0 1rem">${s.score}/${s.shuffled.length} ${T('ex_correct_score')}</p>
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="startWAQuiz()">${T('btn_try_again')}</button>
      <button class="btn-primary" onclick="go('grammar-wortarten')">${T('wa_back')}</button>
    </div>
  </div>`;
}

// ── HANGMAN ──────────────────────────────────────────────────────
let _hmState = {word:'', display:[], guessed:[], wrong:0, maxWrong:10, done:false, won:false, topicId:null, hintShown:false, letterRevealed:false, hint:'', example:'', wordTopic:'', challengeMode:false, startTime:null};

function hmHighlight(sentence, word){
  if(!sentence||!word) return sentence||'';
  try{
    const re = new RegExp('('+word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\w*)','ig');
    return sentence.replace(re, '<strong style="color:#16A34A;background:#DCFCE7;padding:0 .15rem;border-radius:.2rem">$1</strong>');
  }catch(e){ return sentence; }
}

function hmSVG(wrong, challengeMode){
  const gallows = `
    <line x1="10" y1="90" x2="130" y2="90" stroke="#94A3B8" stroke-width="3"/>
    <line x1="60" y1="90" x2="60" y2="10" stroke="#94A3B8" stroke-width="3"/>
    <line x1="60" y1="10" x2="100" y2="10" stroke="#94A3B8" stroke-width="3"/>
    <line x1="100" y1="10" x2="100" y2="12" stroke="#94A3B8" stroke-width="2"/>`;

  const fullParts = [
    '<line x1="10" y1="90" x2="130" y2="90" stroke="#1E293B" stroke-width="3"/>',
    '<line x1="60" y1="90" x2="60" y2="10" stroke="#1E293B" stroke-width="3"/>',
    '<line x1="60" y1="10" x2="100" y2="10" stroke="#1E293B" stroke-width="3"/>',
    '<line x1="100" y1="10" x2="100" y2="14" stroke="#1E293B" stroke-width="2"/>',
    '<circle cx="100" cy="24" r="10" stroke="#1E293B" stroke-width="2.5" fill="none"/>',
    '<line x1="100" y1="34" x2="100" y2="62" stroke="#1E293B" stroke-width="2.5"/>',
    '<line x1="100" y1="42" x2="78" y2="57" stroke="#1E293B" stroke-width="2.5"/>',
    '<line x1="100" y1="42" x2="122" y2="57" stroke="#1E293B" stroke-width="2.5"/>',
    '<line x1="100" y1="62" x2="80" y2="84" stroke="#1E293B" stroke-width="2.5"/>',
    '<line x1="100" y1="62" x2="120" y2="84" stroke="#1E293B" stroke-width="2.5"/>',
  ];
  const bodyParts = [
    '<circle cx="100" cy="24" r="10" stroke="#EF4444" stroke-width="2.5" fill="none"/>',
    '<line x1="100" y1="34" x2="100" y2="62" stroke="#EF4444" stroke-width="2.5"/>',
    '<line x1="100" y1="42" x2="78" y2="57" stroke="#EF4444" stroke-width="2.5"/>',
    '<line x1="100" y1="42" x2="122" y2="57" stroke="#EF4444" stroke-width="2.5"/>',
    '<line x1="100" y1="62" x2="80" y2="84" stroke="#EF4444" stroke-width="2.5"/>',
    '<line x1="100" y1="62" x2="120" y2="84" stroke="#EF4444" stroke-width="2.5"/>',
  ];
  let svgContent = '';
  if(challengeMode){
    svgContent = gallows + bodyParts.slice(0, wrong).join('');
  } else {
    svgContent = fullParts.slice(0, wrong).join('');
  }
  return `<svg viewBox="0 0 140 95" width="140" height="95" style="display:block;margin:0 auto">${svgContent}</svg>`;
}
function startHangman(topicId){
  let wordPool;
  if(topicId && topicId !== 'mixed'){
    const t = VOCAB.find(v=>v.id===topicId);
    wordPool = t ? t.words.map(w=>({...w,_topicTitle:(t.title||'')})).filter(w=>w.en&&w.en.replace(/^to /,'').length>=3&&w.en.replace(/^to /,'').length<=14&&!/\s/.test(w.en.replace(/^to /,''))) : [];
  }
  if(topicId==='irreg'){
    wordPool = IRREG.map(v=>({en:v.inf.replace(/^to /,''), de:v.de, example:(v.ex||'')})).filter(w=>w.en.length>=3&&w.en.length<=14&&!/\s/.test(w.en));
  } else if(!wordPool || wordPool.length < 3){
    wordPool = VOCAB.flatMap(t=>t.words.map(w=>({...w, _topicTitle:(t.title||'')}))).filter(w=>w.en&&w.en.replace(/^to /,'').length>=3&&w.en.replace(/^to /,'').length<=14&&!/\s/.test(w.en.replace(/^to /,'')));
  }
  const picked = wordPool[Math.floor(Math.random()*wordPool.length)];
  const rawWord = picked.en.replace(/^to /,'').toLowerCase();
  const _challengeMode = _hmState.challengeMode||false;
  const _topicObj = (topicId && topicId!=='mixed' && topicId!=='irreg') ? VOCAB.find(v=>v.id===topicId) : (picked._srcTopic||null);
  _hmState = {
    word: rawWord,
    hint: picked.de,
    example: picked.example||'',
    wordTopic: picked._topicTitle||'',
    topicId: topicId||'mixed',
    display: rawWord.split('').map(c=>({char:c, shown:!/[a-z]/.test(c)})),
    guessed: [],
    wrong: 0,
    maxWrong: _challengeMode ? 6 : 10,
    done: false,
    won: false,
    hintShown: false,
    letterRevealed: false,
    challengeMode: _challengeMode
  };
}

function hmGuess(letter){
  if(_hmState.done) return;
  letter = letter.toLowerCase();
  if(_hmState.guessed.includes(letter)) return;
  if(!_hmState.startTime) _hmState.startTime=Date.now();
  _hmState.guessed.push(letter);
  const hasLetter = _hmState.display.some(d=>d.char===letter);
  if(hasLetter){
    _hmState.display.forEach(d=>{ if(d.char===letter) d.shown=true; });
    if(_hmState.display.every(d=>d.shown)){ _hmState.done=true; _hmState.won=true; }
  } else {
    _hmState.wrong++;
    if(_hmState.wrong >= _hmState.maxWrong){ _hmState.done=true; _hmState.won=false; }
  }
  if(_hmState.done){
    const dur=_hmState.startTime?Math.round((Date.now()-_hmState.startTime)/1000):null;
    if(!P.gameStats) P.gameStats={hangman:[],memory:[],qf:[],wordsearch:[]};
    if(!P.gameStats.hangman) P.gameStats.hangman=[];
    const now=new Date(); P.gameStats.hangman.unshift({date:now.toLocaleDateString('de-DE'),time:now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}),won:_hmState.won,word:_hmState.word.toUpperCase(),duration:dur,mode:_hmState.challengeMode?'challenge':'normal'});
    if(P.gameStats.hangman.length>20) P.gameStats.hangman.pop(); save();
    if(_hmState.won){ addXP(5); checkBadges(); }
  }
  document.getElementById('app').innerHTML = render(_state);
}

function hmHint(){
  if(_hmState.done || _hmState.hintShown) return;
  _hmState.hintShown = true;
  _hmState.wrong = Math.min(_hmState.wrong + 3, _hmState.maxWrong);
  if(_hmState.wrong >= _hmState.maxWrong){ _hmState.done=true; _hmState.won=false; }
  document.getElementById('app').innerHTML = render(_state);
}
function hmRevealLetter(){
  if(_hmState.done || _hmState.letterRevealed) return;
  // pick a random not-yet-shown letter position
  const hidden = _hmState.display.filter(d=>/[a-z]/.test(d.char) && !d.shown);
  if(!hidden.length) return;
  const pick = hidden[Math.floor(Math.random()*hidden.length)].char;
  _hmState.letterRevealed = true;
  if(!_hmState.startTime) _hmState.startTime=Date.now();
  if(!_hmState.guessed.includes(pick)) _hmState.guessed.push(pick);
  _hmState.display.forEach(d=>{ if(d.char===pick) d.shown=true; });
  _hmState.wrong = Math.min(_hmState.wrong + 1, _hmState.maxWrong);
  if(_hmState.display.every(d=>d.shown)){ _hmState.done=true; _hmState.won=true;
    const dur=_hmState.startTime?Math.round((Date.now()-_hmState.startTime)/1000):null;
    if(!P.gameStats) P.gameStats={hangman:[],memory:[],qf:[],wordsearch:[]};
    if(!P.gameStats.hangman) P.gameStats.hangman=[];
    const now=new Date(); P.gameStats.hangman.unshift({date:now.toLocaleDateString('de-DE'),time:now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}),won:true,word:_hmState.word.toUpperCase(),duration:dur,mode:_hmState.challengeMode?'challenge':'normal'});
    if(P.gameStats.hangman.length>20) P.gameStats.hangman.pop(); save();
    addXP(5); checkBadges();
  } else if(_hmState.wrong >= _hmState.maxWrong){ _hmState.done=true; _hmState.won=false; }
  document.getElementById('app').innerHTML = render(_state);
}
function setHMMode(challenge){
  _hmState.challengeMode = challenge;
  startHangman(_hmState.topicId||'mixed');
  go('hangman', _hmState.topicId||'mixed');
}
function renderHangman(topicId){
  if(!_hmState.word || _hmState.topicId !== (topicId||'mixed')){
    startHangman(topicId||'mixed');
  }
  const s = _hmState;
  const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const topicVocab = VOCAB.filter(t=>t.words.length>=3);

  const wordDisplay = s.display.map(d=>
    `<span style="display:inline-flex;flex-direction:column;align-items:center;margin:0 .2rem">
      <span style="font-size:1.5rem;font-weight:800;color:${s.done&&!s.won?'#EF4444':'#1E293B'};min-width:1.2rem;text-align:center;letter-spacing:.05em">
        ${d.shown||(s.done&&!s.won) ? d.char.toUpperCase() : '&nbsp;'}
      </span>
      <span style="width:1.2rem;height:2px;background:${d.shown?'#10B981':'#64748B'};border-radius:1px;display:block"></span>
    </span>`
  ).join('');

  const letterBtns = ALPHA.map(l=>{
    const used = s.guessed.includes(l);
    const correct = used && s.display.some(d=>d.char===l);
    const wrong = used && !correct;
    return `<button onclick="hmGuess('${l}')" ${used||s.done?'disabled':''} style="width:2.2rem;height:2.2rem;border-radius:.5rem;font-weight:700;font-size:.88rem;cursor:${used||s.done?'default':'pointer'};border:none;background:${correct?'#D1FAE5':wrong?'#FEE2E2':s.done?'#F1F5F9':'#EFF6FF'};color:${correct?'#065F46':wrong?'#991B1B':s.done?'#CBD5E1':'#1D4ED8'};transition:all .1s">${l.toUpperCase()}</button>`;
  }).join('');

  const modeButtons = `<div style="display:flex;gap:.4rem;align-items:center;margin-bottom:.6rem">
    <span style="font-size:.8rem;font-weight:600;color:#64748B">${T('hm_mode_label')}</span>
    <button onclick="setHMMode(false)" style="padding:.25rem .7rem;border-radius:.5rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${!s.challengeMode?'#3B82F6':'#F1F5F9'};color:${!s.challengeMode?'#fff':'#64748B'}">${T('hm_mode_normal')}</button>
    <button onclick="setHMMode(true)" style="padding:.25rem .7rem;border-radius:.5rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${s.challengeMode?'#EF4444':'#F1F5F9'};color:${s.challengeMode?'#fff':'#64748B'}">${T('hm_mode_challenge')}</button>
  </div>`;
  const topicSelector = `<div style="display:flex;gap:.4rem;flex-wrap:wrap;align-items:center;margin-bottom:.5rem">
    <span style="font-size:.8rem;font-weight:600;color:#64748B">${T('hm_topic_label')}</span>
    <button onclick="startHangman('mixed');go('hangman','mixed')" style="padding:.25rem .6rem;border-radius:.5rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${(!s.topicId||s.topicId==='mixed')?'#3B82F6':'#F1F5F9'};color:${(!s.topicId||s.topicId==='mixed')?'#fff':'#64748B'}">${T('hm_mixed')}</button>
    ${topicVocab.map(t=>`<button onclick="startHangman('${t.id}');go('hangman','${t.id}')" style="padding:.25rem .6rem;border-radius:.5rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:${s.topicId===t.id?'#3B82F6':'#F1F5F9'};color:${s.topicId===t.id?'#fff':'#64748B'}">${t.emoji} ${t.title.split('–').pop().trim().split(' ').slice(0,2).join(' ')}</button>`).join('')}
  </div>`;

  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('btn_back_games')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('hm_title')}</h1>
    </div>
    ${modeButtons}
    ${topicSelector}
    <div class="card" style="text-align:center;padding:1.25rem">
      ${hmSVG(s.wrong, s.challengeMode)}
      <div style="margin:.75rem 0;font-size:.85rem;color:#64748B;font-weight:600">${s.wrong}/${s.maxWrong} ${T('hm_errors')}</div>
      ${s.wordTopic ? `<div style="margin:.25rem 0 .5rem;display:inline-block;font-size:.74rem;font-weight:700;color:#5B21B6;background:#EDE9FE;padding:.2rem .7rem;border-radius:99px">${T('hm_topic_hint')} ${s.wordTopic}</div>` : ''}
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:.15rem;margin:.75rem 0">${wordDisplay}</div>
      ${s.done
        ? s.won
          ? `<div class="feedback-ok" style="margin-top:.5rem">${T('hm_win')}<br><span style="font-size:1.5rem;font-weight:800;letter-spacing:.08em;color:#065F46;display:inline-block;margin:.3rem 0">${s.word.toUpperCase()}</span><br><span style="font-size:.85rem">🇩🇪 ${s.hint}</span>${s.example?`<br><span style="font-size:.82rem;color:#475569;font-style:italic;margin-top:.25rem;display:inline-block">„${hmHighlight(s.example, s.word)}“</span>`:''}${s.startTime?`<br><span style="font-size:.75rem;color:#64748B">${Math.round((Date.now()-s.startTime)/1000)}s</span>`:''}</div>`
          : `<div class="feedback-err" style="margin-top:.5rem">${T('hm_lose')}<br><span style="font-size:1.5rem;font-weight:800;letter-spacing:.08em;color:#991B1B;display:inline-block;margin:.3rem 0">${s.word.toUpperCase()}</span><br><span style="font-size:.85rem">🇩🇪 ${s.hint}</span>${s.example?`<br><span style="font-size:.82rem;color:#475569;font-style:italic;margin-top:.25rem;display:inline-block">„${hmHighlight(s.example, s.word)}“</span>`:''}</div>`
        : `<div style="font-size:.8rem;color:#94A3B8;margin-top:.25rem">${T('hm_remaining_pre')}${s.maxWrong-s.wrong}${T('hm_remaining_post')}</div>`}
      ${s.hintShown && !s.done ? `<div style="margin-top:.4rem;font-size:.85rem;color:#6D28D9;background:#EDE9FE;padding:.35rem .75rem;border-radius:.5rem;display:inline-block">🇩🇪 ${s.hint}</div>` : ''}
      ${!s.done ? `<div style="display:flex;gap:.4rem;justify-content:center;flex-wrap:wrap;margin-top:.5rem">
        ${!s.hintShown ? `<button onclick="hmHint()" style="padding:.35rem .85rem;border-radius:.6rem;font-size:.78rem;font-weight:600;cursor:pointer;border:1.5px solid #F59E0B;background:#FFFBEB;color:#92400E">${T('hm_hint')}</button>` : ''}
        ${!s.letterRevealed ? `<button onclick="hmRevealLetter()" style="padding:.35rem .85rem;border-radius:.6rem;font-size:.78rem;font-weight:600;cursor:pointer;border:1.5px solid #3B82F6;background:#EFF6FF;color:#1D4ED8">${T('hm_reveal_letter')}</button>` : ''}
      </div>` : ''}
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center">${letterBtns}</div>
    ${s.done ? `<div style="text-align:center"><button class="btn-primary" onclick="startHangman('${s.topicId}');go('hangman','${s.topicId}')">${T('hm_play_again')}</button></div>` : ''}
  </div>`;
}

// ── GRAMMAR QUICKFIRE ────────────────────────────────────────────
let _qfState = {queue:[], qIdx:0, score:0, answered:0, history:[], time:60, timer:null, done:false, topicId:null, started:false};

function buildQFQueue(topicId){
  // Vokabel-Modus: 'v:mixed' (alle Themen) oder 'v:<topicId>' –
  // Frage = englisches Wort, Antworten = 4 deutsche Bedeutungen.
  if(topicId && topicId.indexOf('v:')===0){
    const vid = topicId.slice(2);
    const topics = vid==='mixed' ? VOCAB.filter(t=>t.words.length>=4) : VOCAB.filter(t=>t.id===vid);
    const pairs = [];
    topics.forEach(t=>t.words.forEach(w=>pairs.push({t,w})));
    for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}
    return pairs.slice(0,60).map(({t,w})=>{
      const seenDe = new Set([w.de]);
      const wrong = [...t.words].sort(()=>Math.random()-.5).filter(x=>{
        if(x.en===w.en || seenDe.has(x.de)) return false; seenDe.add(x.de); return true;
      }).slice(0,3);
      const opts = [...wrong.map(x=>x.de), w.de].sort(()=>Math.random()-.5);
      return {q: w.en, opts, correct: opts.indexOf(w.de), _vTopic: t.id, _vWord: w};
    }).filter(q=>q.opts.length===4);
  }
  // Grammatik: alle MC-Fragen aus dem Pool
  const pool = topicId==='mixed'
    ? Object.values(GRAMMAR_POOL).flat()
    : (GRAMMAR_POOL[topicId]||[]);
  const allQ = pool.filter(e=>e.type==='mc').flatMap(e=>e.questions||[]);
  // Shuffle
  for(let i=allQ.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[allQ[i],allQ[j]]=[allQ[j],allQ[i]];}
  return allQ;
}
// Titel für den Start-/Ergebnisbildschirm des Quick-Fire
function qfTopicTitle(topicId){
  if(topicId==='mixed') return T('qf_mixed_title');
  if(topicId && topicId.indexOf('v:')===0){
    const vid = topicId.slice(2);
    if(vid==='mixed') return T('qf_vocab_mixed');
    const t = VOCAB.find(v=>v.id===vid);
    return t ? t.emoji+' '+vocabTitle(t) : T('qf_vocab_mixed');
  }
  const g = GRAMMAR.find(g=>g.id===topicId);
  return g ? g.title : 'Quick-Fire';
}

function renderGrammarQuickfire(topicId){
  const s = _qfState;
  if(!s.queue.length || s.topicId!==topicId){
    _qfState = {queue:buildQFQueue(topicId), qIdx:0, score:0, answered:0, history:[], time:60, timer:null, done:false, topicId, started:false};
    return renderQFReady(topicId);
  }
  if(!s.started) return renderQFReady(topicId);
  if(s.done) return renderQFDone(topicId);
  if(!s.queue.length){ _qfState.done=true; return renderQFDone(topicId); }
  const q = s.queue[s.qIdx % s.queue.length];
  
  const timePct = (s.time/60)*100;
  const timeColor = s.time<=10?'#EF4444':s.time<=20?'#F59E0B':'#10B981';
  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="clearInterval(_qfState.timer);go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.85rem">${T('btn_back_games')}</button>
      <h1 style="font-size:1.3rem;font-weight:800;color:#1E293B;flex:1">${T('qf_title')}</h1>
      <div style="display:flex;align-items:center;gap:.5rem"><div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:.75rem;padding:.2rem .75rem;font-weight:800;color:#92400E;font-size:1.1rem">${s.score} ✓</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:.75rem">
      <div style="flex:1;height:.5rem;background:#E2E8F0;border-radius:1rem;overflow:hidden">
        <div style="height:100%;width:${timePct}%;background:${timeColor};border-radius:1rem;transition:width .9s linear"></div>
      </div>
      <span style="font-size:1.1rem;font-weight:800;color:${timeColor};min-width:2.5rem;text-align:right">⏱${s.time}s</span>
    </div>
    <div class="card space-y-3" style="padding:1.25rem">
      <p style="font-size:.72rem;color:#94A3B8;font-weight:600;text-transform:uppercase;letter-spacing:.05em">${T('qf_question_label')} ${s.answered+1}</p>
      <p style="font-weight:700;color:#1E293B;font-size:1rem;line-height:1.4">${q.q}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
        ${q.opts.map((o,oi)=>`<button onpointerdown="qfPick(${oi})" style="background:#F8FAFC;border:2px solid #E2E8F0;border-radius:.75rem;padding:.75rem;font-size:.88rem;font-weight:600;color:#1E293B;cursor:pointer;text-align:left;transition:background .1s;-webkit-tap-highlight-color:transparent" onpointerenter="this.style.background='#FFFBEB';this.style.borderColor='#FDE68A'" onpointerleave="this.style.background='#F8FAFC';this.style.borderColor='#E2E8F0'">${o}</button>`).join('')}
      </div>
    </div>
    <div style="text-align:center;margin-top:.25rem;font-size:.88rem;color:#92400E;font-weight:700">${T('qf_score')}: ${s.score} · ${T('qf_answered')}: ${s.answered}</div>
  </div>`;
}

function renderQFReady(topicId){
  const t = {title: qfTopicTitle(topicId)};
  // Show best score if available
  const best = (P.qfBest||{})[topicId];
  const bestHTML = best ? `<p style="font-size:.85rem;color:#8B5CF6;margin-bottom:1rem">${T('qf_best_pre')}<strong>${best.score} ${T('ex_correct_score')}</strong>${T('qf_best_post')}</p>` : '';
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('btn_back_games')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">⚡ Quick-Fire-Quiz</h1>
    </div>
    <div class="card" style="text-align:center;padding:2rem">
      <p style="font-size:3rem;margin-bottom:.75rem">⚡</p>
      <h2 style="font-weight:800;color:#1E293B;margin-bottom:.4rem">${t?t.title:'Grammatik'}</h2>
      <p style="color:#64748B;margin-bottom:.75rem;font-size:.9rem">${T('qf_sub')}</p>
      ${bestHTML}
      <button onclick="startQF('${topicId}')" class="btn-primary" style="font-size:1.1rem;padding:.75rem 2rem">${T('qf_go')}</button>
    </div>
  </div>`;
}

function renderQFDone(topicId){
  const s = _qfState;
  const total = s.answered;
  const pct = total>0 ? Math.round(s.score/total*100) : 0;
  // Update best score – nur einmal pro Runde speichern (die Seite kann
  // z.B. beim Sprachwechsel neu gerendert werden, sonst doppelte Einträge).
  if(!P.qfBest) P.qfBest={};
  const prev = P.qfBest[topicId];
  const isNewBest = s._logged ? !!s._wasNewBest : (!prev || s.score > prev.score);
  if(!s._logged){
    s._logged = true;
    s._wasNewBest = isNewBest;
    if(isNewBest) P.qfBest[topicId]={score:s.score,total,pct};
    if(isNewBest && prev && typeof showToast==='function'){ showToast('🏆 '+(T('record_new')||'Neuer Rekord!')); }
    if(!P.gameStats) P.gameStats={hangman:[],memory:[],qf:[],wordsearch:[]};
    if(!P.gameStats.qf) P.gameStats.qf=[];
    if(total>0){ const now=new Date(); P.gameStats.qf.unshift({date:now.toLocaleDateString('de-DE'),time:now.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}),score:s.score,pct,answered:total,topic:topicId}); if(P.gameStats.qf.length>20) P.gameStats.qf.pop(); }
    save();
    // 1 XP pro richtiger Antwort
    if(s.score>0){ addXP(s.score); checkBadges(); }
  }

  // Overview table of answered questions
  const histHTML = s.history.length ? `
    <div style="margin-top:1.25rem;text-align:left">
      <p style="font-size:.78rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">${T('qf_your_answers')}</p>
      <div style="max-height:16rem;overflow-y:auto;border-radius:.75rem;border:1px solid #E2E8F0">
        ${s.history.map((h,i)=>`
        <div style="padding:.6rem .75rem;border-bottom:1px solid #F1F5F9;background:${h.right?'#F0FDF4':'#FFF5F5'}">
          <p style="font-size:.78rem;font-weight:600;color:#1E293B;margin-bottom:.15rem">${i+1}. ${h.q}</p>
          <p style="font-size:.75rem;color:${h.right?'#059669':'#DC2626'}">
            ${h.right?'✅':'✗'} ${h.chosen}${!h.right?` <span style="color:#059669">→ ${h.correctText}</span>`:''}
          </p>
        </div>`).join('')}
      </div>
    </div>` : '';

  return `<div class="space-y-4">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('spiele')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('btn_back_games')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('qf_done_heading')}</h1>
    </div>
    <div class="card" style="text-align:center;padding:1.5rem">
      <p style="font-size:2.5rem">${pct>=80?'🏆':pct>=60?'⭐':'💪'}</p>
      <p style="font-size:1.8rem;font-weight:800;color:#1E293B;margin:.25rem 0">${s.score} ${T('ex_correct_score')}</p>
      <p style="color:#64748B;font-size:.9rem">${T('ex_correct_of')} ${total} · ${pct}%</p>
      ${s.score>0?`<p style="display:inline-block;background:#F5F3FF;color:#7C3AED;font-weight:800;font-size:.95rem;border-radius:99px;padding:.3rem .9rem;margin-top:.4rem">⭐ +${s.score} XP</p>`:''}
      ${isNewBest&&total>0?`<p style="color:#8B5CF6;font-weight:700;font-size:.9rem;margin-top:.4rem">${T('qf_new_record')}</p>`:''}
      ${total>0?memLeaderboard('qf'):''}
      ${pb(pct, pct>=80?'#10B981':pct>=60?'#F59E0B':'#EF4444')}
      ${histHTML}
      <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1rem">
        <button onclick="_qfState={queue:[],done:false,topicId:null,started:false,history:[],score:0,answered:0,qIdx:0,time:60,timer:null};go('grammar-quickfire','${topicId}')" class="btn-primary">${T('btn_new')}</button>
        <button onclick="go('spiele')" class="btn-secondary">${T('btn_back_games')}</button>
      </div>
    </div>
  </div>`;
}

function startQF(topicId){
  _qfState.started=true;
  _qfState.timer = setInterval(()=>{
    _qfState.time--;
    if(_qfState.time<=0){ clearInterval(_qfState.timer); _qfState.done=true; }
    document.getElementById('app').innerHTML=render(_state);
  },1000);
  document.getElementById('app').innerHTML=render(_state);
}

function qfPick(oi){
  const s = _qfState;
  if(s.done||!s.queue.length) return;
  const q = s.queue[s.qIdx % s.queue.length];
  if(!q) return;
  const right = oi === q.correct;
  if(right) s.score++;
  s.answered++;
  s.history.push({q:q.q, chosen:q.opts[oi], correctText:q.opts[q.correct], right});
  // Vokabel-Quick-Fire zählt in die Wiederholungs-Boxen
  if(q._vWord) srsUpdate(q._vTopic, q._vWord, right);
  s.qIdx++;
  // If we've gone through all questions, reshuffle for next cycle
  if(s.qIdx>0 && s.qIdx % s.queue.length === 0){
    for(let i=s.queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s.queue[i],s.queue[j]]=[s.queue[j],s.queue[i]];}
  }
  document.getElementById('app').innerHTML=render(_state);
}

// ── LISTENING ──
function renderListeningList(){
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
      <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">🎧 Listening</h1>
    </div>
    <div class="card" style="background:#ECFDF5;border-color:#6EE7B7">
      <p style="font-size:.9rem;color:#065F46">${T('listening_list_hint')}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem">
      ${LISTENING.map(t=>{
        const done = P.listening.includes(t.id);
        return `<div onclick="go('listening-task','${t.id}')" class="card" style="cursor:pointer;border-color:${done?'#6EE7B7':'#F1F5F9'};background:${done?'#ECFDF5':'#fff'}">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
            <span class="pill-${t.level.toLowerCase()}">${t.level}</span>
            ${done?`<span style="font-size:.8rem;color:#065F46;font-weight:700">${T('writing_done_label')}</span>`:''}
          </div>
          <h3 style="font-weight:700;color:#1E293B;margin-bottom:.3rem">${t.title}</h3>
          <p style="font-size:.8rem;color:#64748B">${t.type||""}</p>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

let _lState = {id:'', phase:'vocab', answers:[], checked:false, showScript:false};
function renderListeningTask(id){
  const t = LISTENING.find(l=>l.id===id);
  if(!t) return `<p>${T('error_not_found')}</p>`;
  if(_lState.id!==id){ _lState = {id, phase:'vocab', answers:[], checked:false, showScript:false}; }

  if(_lState.phase==='vocab') return renderListeningVocab(t);
  if(_lState.phase==='script') return renderListeningScript(t);
  if(_lState.phase==='answer') return renderListeningAnswers(t);
  if(_lState.phase==='done') return renderListeningDone(t);
  return '';
}

function renderListeningVocab(t){
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center">
      <button onclick="go('listening-list')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← Listening</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${t.title}</h1>
    </div>
    <div class="card">
      <h2 style="font-weight:700;color:#1E293B;margin-bottom:.75rem">${T('listening_vocab_heading')}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.4rem">
        ${t.vocab.map(v=>`<div style="background:#ECFDF5;padding:.5rem .75rem;border-radius:.6rem">
          <span style="font-weight:600;color:#065F46">${v.en}</span><span style="color:#94A3B8;font-size:.8rem"> – ${v.de}</span>
        </div>`).join('')}
      </div>
    </div>
    <button class="btn-primary" style="background:#10B981" onclick="_lState.phase='script';go('listening-task','${t.id}')">🎧 ${T('listening_to_audio')}</button>
  </div>`;
}

// ── Anhören über die Vorlesefunktion des Geräts ──
// Der Dialog wird Zeile für Zeile vorgelesen, der Text bleibt verborgen und
// lässt sich über einen eigenen Knopf einblenden. Sprecher bekommen – wenn
// das Gerät mehrere englische Stimmen hat – unterschiedliche Stimmen,
// sonst unterschiedliche Tonhöhen.
let _lTTS = {playing:false, line:-1, total:0, slow:false, token:0, id:''};
function listeningLines(t){
  return String(t.script||'').split('\n').map(s=>s.trim()).filter(Boolean).map(s=>{
    const m = s.match(/^([A-Za-z][\w .'-]{0,24}):\s*(.+)$/);
    return m ? {who:m[1], text:m[2]} : {who:'', text:s};
  });
}
function lStop(){
  _lTTS.token++; _lTTS.playing = false; _lTTS.line = -1;
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  lUpdateUI();
}
function lPlay(id){
  const t = LISTENING.find(l=>l.id===id);
  if(!t || !window.speechSynthesis) return;
  if(_lTTS.playing){ lStop(); return; }
  const lines = listeningLines(t);
  const speakers = [...new Set(lines.map(l=>l.who))];
  const all = window.speechSynthesis.getVoices() || [];
  let voices = all.filter(v=>/^en[-_]GB/i.test(v.lang));
  if(voices.length < 2) voices = voices.concat(all.filter(v=>/^en/i.test(v.lang) && !voices.includes(v)));
  const pitches = [1, 1.25, 0.8, 1.1];
  window.speechSynthesis.cancel();
  const token = ++_lTTS.token;
  _lTTS.playing = true; _lTTS.line = 0; _lTTS.total = lines.length; _lTTS.id = id;
  lines.forEach((ln, i)=>{
    const u = new SpeechSynthesisUtterance(ttsClean(ln.text));
    const si = Math.max(0, speakers.indexOf(ln.who));
    u.lang = 'en-GB';
    if(voices.length){ u.voice = voices[si % voices.length]; u.lang = u.voice.lang; }
    // Gleiche Stimme für alle? Dann über die Tonhöhe unterscheiden.
    u.pitch = voices.length >= speakers.length ? 1 : pitches[si % pitches.length];
    u.rate = _lTTS.slow ? 0.7 : 0.92;
    u.onstart = ()=>{ if(token !== _lTTS.token) return; _lTTS.line = i; lUpdateUI(ln.who); };
    if(i === lines.length-1){
      u.onend = ()=>{ if(token !== _lTTS.token) return; _lTTS.playing = false; _lTTS.line = lines.length; _lTTS.heard = true; lUpdateUI(); };
    }
    u.onerror = ()=>{ if(token !== _lTTS.token) return; _lTTS.playing = false; lUpdateUI(); };
    window.speechSynthesis.speak(u);
  });
  lUpdateUI(lines[0].who);
}
function lToggleSlow(){
  _lTTS.slow = !_lTTS.slow;
  const was = _lTTS.playing, id = _lTTS.id;
  if(was){ lStop(); lPlay(id); } else lUpdateUI();
}
function lToggleScript(){
  _lState.showScript = !_lState.showScript;
  const box = document.getElementById('l-script'), btn = document.getElementById('l-script-btn');
  if(box) box.style.display = _lState.showScript ? 'block' : 'none';
  if(btn) btn.textContent = '📄 ' + T(_lState.showScript ? 'listening_hide_text' : 'listening_show_text');
}
function lUpdateUI(who){
  const btn = document.getElementById('l-play'), now = document.getElementById('l-now'), bar = document.getElementById('l-bar'), slow = document.getElementById('l-slow');
  if(btn){ btn.classList.toggle('is-playing', _lTTS.playing); btn.innerHTML = _lTTS.playing ? '■' : '▶'; btn.setAttribute('aria-label', T(_lTTS.playing ? 'listening_stop' : 'listening_play')); }
  if(slow) slow.classList.toggle('is-active', _lTTS.slow);
  const total = _lTTS.total || 1;
  if(bar) bar.style.width = (_lTTS.line < 0 ? 0 : Math.min(100, Math.round((_lTTS.line + (_lTTS.playing?1:0)) / total * 100))) + '%';
  if(now){
    now.textContent = _lTTS.playing ? ((who ? who + ' · ' : '') + (_lTTS.line+1) + '/' + total)
      : (_lTTS.line >= total && _lTTS.total ? T('listening_again') : T('listening_ready'));
  }
}

function renderListeningScript(t){
  const canSpeak = !!window.speechSynthesis;
  if(_lTTS.id !== t.id){ _lTTS = {playing:false, line:-1, total:0, slow:_lTTS.slow, token:_lTTS.token+1, id:t.id}; }
  const showText = _lState.showScript || !canSpeak;
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center">
      <button onclick="lStop();_lState.phase='vocab';go('listening-task','${t.id}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">${T('irreg_back')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${t.title}</h1>
    </div>
    ${canSpeak ? `<div class="card player">
      <button id="l-play" class="player-btn" onclick="lPlay('${t.id}')" aria-label="${T('listening_play')}">▶</button>
      <div class="player-main">
        <p class="player-title">🎧 ${t.title}</p>
        <p class="player-now" id="l-now">${T('listening_ready')}</p>
        <div class="player-track"><div id="l-bar" style="width:0%"></div></div>
      </div>
      <button id="l-slow" class="chip-btn ${_lTTS.slow?'is-active':''}" onclick="lToggleSlow()">🐢 ${T('listening_slow')}</button>
    </div>
    <div class="card" style="background:#EFF6FF;border-color:#BFDBFE">
      <p style="font-size:.85rem;color:#1E40AF">💡 ${T('listening_tts_hint')}</p>
    </div>` : `<div class="card" style="background:#FEF2F2;border-color:#FCA5A5"><p style="font-size:.85rem;color:#991B1B">${T('listening_no_tts')}</p></div>`}
    <div>
      ${canSpeak ? `<button class="chip-btn" id="l-script-btn" onclick="lToggleScript()">📄 ${T(showText?'listening_hide_text':'listening_show_text')}</button>` : ''}
      <div id="l-script" class="card" style="display:${showText?'block':'none'};margin-top:.75rem;background:#ECFDF5;border-color:#6EE7B7">
        <div style="font-size:.95rem;color:#1E293B;line-height:2;white-space:pre-line;background:#fff;border-radius:.75rem;padding:1rem">${t.script}</div>
      </div>
    </div>
    <button class="btn-primary" style="background:#10B981" onclick="lStop();_lState.phase='answer';go('listening-task','${t.id}')">${T('listening_to_tasks')}</button>
  </div>`;
}

function renderListeningAnswers(t){
  const isChecked = _lState.checked;
  return `<div class="space-y-5">
    <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
      <button onclick="_lState.phase='script';go('listening-task','${t.id}')" style="background:none;border:none;color:#3B82F6;cursor:pointer">← ${T('listening_tasks_heading')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('listening_tasks_heading')}</h1>
    </div>
    <div class="card space-y-6">
      ${t.questions.map((q,qi)=>{
        const ans = _lState.answers[qi];
        return `<div>
          <p style="font-weight:600;color:#1E293B;margin-bottom:.5rem">${qi+1}. ${q.q}</p>
          ${q.type==='mc'
            ? q.opts.map((o,oi)=>{
                let cls='opt-btn';
                if(isChecked){ if(o===q.ans) cls+=' opt-correct'; else if(o===ans) cls+=' opt-wrong'; }
                else if(o===ans) cls+=' opt-selected';
                return `<button class="${cls}" ${isChecked?'disabled':''} onclick="pickLQ(${qi},'${escQ(o)}')">${o}</button>`;
              }).join('')
            : ['true','false'].map(val=>{
                let cls='opt-btn';
                if(isChecked){ if(val===q.ans) cls+=' opt-correct'; else if(val===ans) cls+=' opt-wrong'; }
                else if(val===ans) cls+=' opt-selected';
                return `<button class="${cls}" style="display:inline-block;width:48%;margin-right:1%" ${isChecked?'disabled':''} onclick="pickLQ(${qi},'${val}')">${val==='true'?'True ✓':'False ✗'}</button>`;
              }).join('')
          }
        </div>`;
      }).join('')}
      ${isChecked
        ? `<div id="listen-score"></div>
           <button class="btn-primary" style="background:#10B981;margin-top:.5rem" onclick="finishListening('${t.id}')">${T('ex_finish')}</button>`
        : `<button class="btn-primary" style="background:#10B981" onclick="checkListening('${t.id}')">${T('ex_check')}</button>`
      }
    </div>
    ${isChecked?'':`<details class="card" style="cursor:pointer">
      <summary style="font-size:.85rem;color:#64748B">${T('listening_read_again')}</summary>
      <div style="margin-top:.75rem;font-size:.9rem;color:#1E293B;line-height:1.9;white-space:pre-line">${t.script}</div>
    </details>`}
  </div>`;
}

function pickLQ(qi, val){
  _lState.answers[qi] = val;
  go('listening-task',_lState.id);
  _lState.phase='answer';
}

function checkListening(id){
  _lState.checked = true;
  const t = LISTENING.find(l=>l.id===id);
  let correct = t.questions.filter((q,i)=>_lState.answers[i]===q.ans).length;
  go('listening-task',id);
  _lState.phase='answer';
  setTimeout(()=>{
    const el=document.getElementById('listen-score');
    if(el) el.innerHTML=`<div class="${correct===t.questions.length?'feedback-ok':'feedback-info'}">${correct}/${t.questions.length} ${T('ex_correct_score')}</div>`;
  },50);
}

function finishListening(id){
  if(!P.listening.includes(id)) P.listening.push(id);
  addXP(20); checkBadges(); save();
  _lState.phase='done';
  go('listening-task',id);
}

function renderListeningDone(t){
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">🎧</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${T('listening_done_heading')}</h2>
    <div style="margin-top:1.5rem;display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="_lState={id:'${t.id}',phase:'vocab',answers:[],checked:false};go('listening-task','${t.id}')">${T('btn_try_again')}</button>
      <button class="btn-primary" style="background:#10B981" onclick="go('listening-list')">${T('btn_all_dialogues')}</button>
    </div>
  </div>`;
}


