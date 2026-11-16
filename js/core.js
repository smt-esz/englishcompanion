function applyA11y(){
  document.documentElement.classList.toggle('big-text', !!P.bigText);
  document.body.classList.toggle('easy-read', !!P.easyRead);
  const bb=document.getElementById('a11y-btn-big');
  const eb=document.getElementById('a11y-btn-easy');
  if(bb){ bb.classList.toggle('is-active', !!P.bigText); bb.setAttribute('aria-pressed', P.bigText ? 'true' : 'false'); }
  if(eb){ eb.classList.toggle('is-active', !!P.easyRead); eb.setAttribute('aria-pressed', P.easyRead ? 'true' : 'false'); }
}
function toggleBigText(){ P.bigText=!P.bigText; save(); applyA11y(); }
function toggleEasyRead(){ P.easyRead=!P.easyRead; save(); applyA11y(); }

function setLang(l){ 
  P.lang=l; _ttLang=null; save(); 
  document.getElementById('app').innerHTML=render(_state); 
  setTimeout(()=>{
    updateLangUI();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.getAttribute('data-i18n');
      const txt=T(key);
      if(txt&&txt!==key) el.textContent=txt;
    });
  },0); 
}


function getWeekNum(){
  const d = new Date(); d.setHours(0,0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  const y = new Date(d.getFullYear(),0,1);
  return Math.ceil((((d-y)/86400000)+1)/7);
}
function getWeekChallenge(){
  const wn = getWeekNum();
  if(!P.weekChallenge) P.weekChallenge = {week:0, done:[]};
  if(P.weekChallenge.week !== wn){ P.weekChallenge = {week:wn, done:[]}; save(); }
  const uncompleted = GRAMMAR.filter(t=>!(P.grammar[t.id]&&P.grammar[t.id].completed));
  const pool = uncompleted.length > 0 ? uncompleted : GRAMMAR;
  const target = pool[wn % pool.length];
  return {target, wc: P.weekChallenge};
}
function wcToggle(idx){
  if(!P.weekChallenge) P.weekChallenge = {week:getWeekNum(), done:[]};
  const i = P.weekChallenge.done.indexOf(idx);
  if(i === -1) P.weekChallenge.done.push(idx);
  else P.weekChallenge.done.splice(i,1);
  save();
  document.getElementById('app').innerHTML = render(_state);
}
// Streak zählt Übungs-Tage: Er wächst nur an Tagen, an denen XP verdient
// wurden (nicht durch bloßes Öffnen der App). Aufruf über addXP().
function bumpStreak(){
  const today = new Date().toISOString().slice(0,10);
  if(P.lastDate === today) return;
  const yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
  P.streak = P.lastDate === yest ? (P.streak||0) + 1 : 1;
  P.lastDate = today;
}
// Für die Anzeige: Streak ist 0, wenn gestern nicht geübt wurde.
function currentStreak(){
  const today = new Date().toISOString().slice(0,10);
  const yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
  return (P.lastDate===today || P.lastDate===yest) ? (P.streak||0) : 0;
}
function addXP(n){
  const prevLevel = Math.floor((P.xp||0)/XP_PER_LEVEL)+1;
  const today = new Date().toISOString().slice(0,10);
  const prevDay = (P.dayXPDate===today) ? (P.dayXP||0) : 0;
  P.xp = (P.xp||0) + n;
  if(P.dayXPDate !== today){ P.dayXPDate = today; P.dayXP = 0; }
  P.dayXP = (P.dayXP||0) + n;
  // XP-Tagebuch für den Wochenrückblick (letzte 30 Tage)
  if(!P.xpLog) P.xpLog = {};
  P.xpLog[today] = (P.xpLog[today]||0) + n;
  const cutoff = new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  for(const d in P.xpLog){ if(d < cutoff) delete P.xpLog[d]; }
  bumpStreak();
  // Tagesplan und Aufgaben der Lehrkraft fortschreiben (js/features/today.js)
  if(typeof creditActivity === 'function'){ try { creditActivity(n); } catch(e){} }
  save();
  // Erfolge sichtbar machen: XP-Chip immer, Feiern bei Level-Aufstieg
  // und beim Erreichen des Tagesziels.
  showXPChip(n);
  const newLevel = Math.floor(P.xp/XP_PER_LEVEL)+1;
  if(newLevel > prevLevel){ celebrateLevelUp(newLevel); }
  else if(prevDay < dailyGoal() && P.dayXP >= dailyGoal()){ celebrateGoal(); }
}
// Tagesziel: Standard 30 XP, im Profil anpassbar (P.dailyGoal)
function dailyGoal(){ return P.dailyGoal || DAILY_GOAL; }

// ── FEIERN: XP-Chip, Konfetti, Level-Up ──
function showXPChip(n){
  let c = document.getElementById('xp-chip');
  if(!c){ c = document.createElement('div'); c.id='xp-chip'; document.body.appendChild(c); }
  c.textContent = '+'+n+' XP';
  c.classList.add('show');
  clearTimeout(c._t);
  c._t = setTimeout(()=>c.classList.remove('show'), 1800);
}
function confettiBurst(count){
  const colors = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#0EA5E9'];
  for(let i=0;i<(count||40);i++){
    const b = document.createElement('div');
    b.className = 'confetti-bit';
    b.style.left = (Math.random()*100)+'vw';
    b.style.background = colors[i%colors.length];
    b.style.animationDuration = (1.6+Math.random()*1.4)+'s';
    b.style.animationDelay = (Math.random()*.4)+'s';
    const sz = (.3+Math.random()*.45)+'rem';
    b.style.width = sz; b.style.height = sz;
    document.body.appendChild(b);
    setTimeout(()=>b.remove(), 3600);
  }
}
function celebrateLevelUp(level){
  confettiBurst(60);
  if(document.getElementById('levelup-popup')) return;
  const unlocked = AVATAR_TIERS.find(t=>t.lvl===level);
  const ov = document.createElement('div');
  ov.id = 'levelup-popup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9995;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:1.25rem';
  ov.onclick = (e)=>{ if(e.target===ov) ov.remove(); };
  ov.innerHTML = `<div style="background:#fff;border-radius:1.1rem;max-width:20rem;width:100%;padding:1.6rem;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.3)">
    <div style="font-size:3rem">🚀</div>
    <h2 style="font-size:1.3rem;font-weight:800;color:#1E293B;margin:.4rem 0">${T('levelup_title')} ${level}!</h2>
    ${unlocked?`<p style="font-size:.85rem;color:#7C3AED;font-weight:600;margin-bottom:.2rem">${T('levelup_avatar')}</p>
    <p style="font-size:2rem;margin-bottom:.6rem">${unlocked.list.join(' ')}</p>`:''}
    <button class="btn-primary" style="width:100%" onclick="document.getElementById('levelup-popup').remove()">${T('levelup_go')}</button>
  </div>`;
  document.body.appendChild(ov);
}
function celebrateGoal(){
  confettiBurst(35);
  showToast('🎯 '+T('goal_reached_toast'));
}
// Summe der letzten 7 Tage (inkl. heute) + Anzahl Übungstage
function weekStats(){
  let xp = 0, days = 0;
  for(let i=0;i<7;i++){
    const d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
    const v = (P.xpLog||{})[d]||0;
    if(v>0){ xp += v; days++; }
  }
  return {xp, days};
}
const XP_PER_LEVEL = 100;
const DAILY_GOAL = 30;
function levelInfo(){
  const xp = P.xp||0;
  const level = Math.floor(xp/XP_PER_LEVEL)+1;
  const inLevel = xp % XP_PER_LEVEL;
  return { level, inLevel, need: XP_PER_LEVEL, pct: Math.round(inLevel/XP_PER_LEVEL*100), xp };
}
function dailyXP(){
  const today = new Date().toISOString().slice(0,10);
  return (P.dayXPDate===today) ? (P.dayXP||0) : 0;
}
function ringSVG(pct,color){
  const r=20, c=2*Math.PI*r, off=c*(1-Math.min(100,pct)/100);
  return `<svg width="54" height="54" viewBox="0 0 54 54" style="flex-shrink:0"><circle cx="27" cy="27" r="${r}" fill="none" stroke="#E2E8F0" stroke-width="6"/><circle cx="27" cy="27" r="${r}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 27 27)"/><text x="27" y="31" text-anchor="middle" font-size="13" font-weight="700" fill="#1E293B">${Math.round(pct)}%</text></svg>`;
}
function grammarStats(){
  return { done: Object.values(P.grammar).filter(g=>g.completed).length, total: GRAMMAR.length };
}
function checkBadges(){
  const add = id => { if(!P.badges.includes(id)){ P.badges.push(id); save(); } };
  const gs = grammarStats();
  if(gs.done >= 1) add('grammar-starter');
  if(gs.done >= 5) add('grammar-pro');
  if(Object.values(P.vocab).some(v=>v.tested)) add('vocab-hero');
  if(P.reading.length >= 1) add('reading-detective');
  if(P.listening.length >= 1) add('listening-pro');
  if(P.writing.length >= 1) add('writing-explorer');
  if(P.irreg.length >= 20) add('irreg-champ');
  if(P.grammar['past'] && P.grammar['past'].completed) add('simple-past-master');
  if(currentStreak() >= 3) add('streak-3');
  const gs2 = grammarStats();
  if(gs2.done>=1 && Object.values(P.vocab).some(v=>v.tested) && P.reading.length>=1 && P.writing.length>=1) add('all-rounder');
  if(currentStreak()>=7) add('streak-7');
  if(currentStreak()>=30) add('streak-30');
  const _gtot=['hangman','memory','qf','wordsearch'].reduce((a,k)=>a+(((P.gameStats||{})[k]||[]).length),0);
  if(_gtot>=1) add('first-game');
  if(_gtot>=10) add('game-master');
  const _known=VOCAB.reduce((s,t)=>s+(((P.vocab[t.id]||{}).known)||[]).length,0);
  if(_known>=100) add('word-collector');
  if((P.xp||0)>=400) add('level-5');
}


