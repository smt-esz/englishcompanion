// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
let _state = { section:'home', sub:null, data:null };

function go(section, sub, data){
  _navigate({ section, sub: sub||null, data: (data !== undefined && data !== null) ? data : null }, true);
}

// Browser-History: Zurück-Geste/-Taste führt zur vorherigen Seite statt
// die App zu schließen. Gleiche Seite (z.B. nächste Quizfrage) wird ersetzt,
// neue Seite angehängt.
window.addEventListener('popstate', e => {
  if(e.state && e.state.section) _navigate(e.state, false);
  else _navigate({section:'home', sub:null, data:null}, false);
});

function _navigate(st, writeHistory){
  const section = st.section;
  // Quick-Fire-Timer stoppen, wenn die Seite verlassen wird – sonst rendert
  // das Intervall jede Sekunde die neue Seite neu (Eingaben gehen verloren).
  if(typeof _qfState !== 'undefined' && _qfState.timer && section !== 'grammar-quickfire'){
    clearInterval(_qfState.timer);
    _qfState = {queue:[], qIdx:0, score:0, answered:0, history:[], time:60, timer:null, done:false, topicId:null, started:false};
  }
  // Vorlesen stoppen, wenn die Listening-Aufgabe verlassen wird
  if(_state && _state.section==='listening-task' && section!=='listening-task' && typeof lStop==='function'){ try { lStop(); } catch(e){} }
  const samePage = _state && _state.section===st.section && _state.sub===st.sub && _state.data===st.data;
  _state = st;
  // Mobil: offene Sidebar nach jeder Navigation automatisch schließen
  const _sb = document.getElementById('sidebar');
  if(_sb && _sb.classList.contains('open') && window.innerWidth < 900){
    _sb.classList.remove('open');
    const _ov = document.getElementById('sidebar-overlay'); if(_ov) _ov.style.display='none';
    const _cl = document.getElementById('sidebar-close'); if(_cl) _cl.style.display='none';
  }
  if(writeHistory && window.history && history.pushState){
    try{
      if(!history.state || samePage) history.replaceState(st, '', '#'+section);
      else history.pushState(st, '', '#'+section);
    }catch(e){}
  }
  document.getElementById('app').innerHTML = render(_state);
  document.querySelectorAll('.nav-link').forEach(el=>{
    const sec = el.getAttribute('onclick').match(/go\('([\w-]+)'/)?.[1];
    const gamesSecs = ['spiele','wordsearch','hangman','vocab-memory','irreg-memory','grammar-quickfire','grammar-wortarten-quiz'];
    let match = sec === section;
    if(sec === 'spiele' && gamesSecs.includes(section)) match = true;
    if(sec === 'reading-list' && (section==='reading-task'||section==='skills')) match = true;
    if(sec === 'listening-list' && section==='listening-task') match = true;
    if(sec === 'irreg' && section==='irreg-memory') match = true;
    if(sec === 'writing-list' && (section==='writing-task'||section==='writing-haiku'||section==='writing-acrostic'||section==='writing-prompts')) match = true;
    if(sec === 'grammar' && (section==='grammar-topic'||section==='grammar-exercise'||section==='grammar-wortarten')) match = true;
    if(sec === 'vocabulary' && (section==='vocab-topic'||section==='vocab-test')) match = true;
    el.classList.toggle('active', match);
  });
  // Fällig-Zähler am Wiederholen-Menüpunkt aktualisieren
  const _rb = document.getElementById('nav-review-badge');
  if(_rb){
    const _due = srsDueList().length;
    _rb.style.display = _due>0 ? 'inline-block' : 'none';
    _rb.textContent = _due;
  }
  // Aktiven Eintrag auch in der mobilen Bottom-Nav markieren
  document.querySelectorAll('#mobile-nav button').forEach(el=>{
    const sec = (el.getAttribute('onclick')||'').match(/go\('([\w-]+)'/)?.[1];
    let match = sec === section;
    if(sec === 'grammar' && (section==='grammar-topic'||section==='grammar-exercise'||section==='grammar-wortarten')) match = true;
    if(sec === 'vocabulary' && (section==='vocab-topic'||section==='vocab-test'||section==='dict-skills')) match = true;
    if(sec === 'reading-list' && section==='reading-task') match = true;
    el.classList.toggle('active', match);
  });
  window.scrollTo(0,0);
  bindAll();
  // floating session button
  const fbtn = document.getElementById('ts-float-btn');
  if(fbtn) fbtn.remove();
  if(_ts && _ts.items && _ts.items.length > 0 && !_ts.done && _ts._cur !== undefined && section !== 'timed-session' && section !== 'home'){
    const btn = document.createElement('button');
    btn.id = 'ts-float-btn';
    btn.innerHTML = T('ts_btn_float');
    btn.style.cssText = 'position:fixed;bottom:5rem;right:1rem;z-index:9999;background:#16A34A;color:#fff;border:none;border-radius:2rem;padding:.65rem 1.2rem;font-size:.85rem;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(22,163,74,.4);transition:opacity .2s';
    btn.onclick = () => tsReturn();
    document.body.appendChild(btn);
  }
}

function render(s){
  switch(s.section){
    case 'home': return renderHome();
    case 'grammar': return renderGrammarList();
    case 'grammar-wortarten': return renderWortarten();
    case 'grammar-topic': return renderGrammarTopic(s.sub);
    case 'grammar-exercise': return renderExercisePage(s.sub, s.data);
    case 'vocabulary': return renderVocabList();
    case 'dict-skills': return renderDictSkills();
    case 'vocab-topic': return renderVocabTopic(s.sub, s.data||'list');
    case 'irreg': return renderIrregVerbs(s.sub||s.data||'list');
    case 'spiele': return renderSpiele();
    case 'wordsearch': return renderWordSearch(s.sub);
    case 'hangman': return renderHangman(s.sub);
    case 'grammar-wortarten-quiz': return renderWAQuiz();
    case 'grammar-wortarten-quiz-done': return renderWAQuizDone();
    case 'vocab-memory': return renderVocabMemory(s.sub);
    case 'irreg-memory': return renderIrregMemory();
    case 'grammar-quickfire': return renderGrammarQuickfire(s.sub);
    case 'vocab-test': return renderVocabTest();
    case 'review': return renderReview();
    case 'grammar-check': return renderGrammarCheck();
    case 'skills': return renderReadingList();
    case 'reading-list': return renderReadingList();
    case 'reading-task': return renderReadingTask(s.sub);
    case 'writing-list': return renderWritingList();
    case 'writing-haiku': return renderHaikuTask();
    case 'writing-acrostic': return renderAcrosticTask();
    case 'writing-prompts': return renderWritingPrompts();
    case 'writing-task': return renderWritingTask(s.sub);
    case 'listening-list': return renderListeningList();
    case 'listening-task': return renderListeningTask(s.sub);
    case 'practice': return renderPractice();
    case 'timed-session': return renderTimedSession();
    case 'lernweg': return renderLernweg();
    case 'help': return renderHelp();
    case 'pwa-help': return renderPwaHelp();
    case 'extern': return renderExtern();
    default: return renderHome();
  }
}

function bindAll(){
  // auto-bind after render if needed
}

function pb(val, color){
  color = color||'#3B82F6';
  return `<div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${Math.max(0,Math.min(100,val))}%;background:${color}"></div></div>`;
}

