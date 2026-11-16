// ═══════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════

// ── PROFIL: Name + Avatar ──
// Avatare als Belohnung: die ersten 6 sind frei, weitere schalten sich
// mit steigendem Level frei (sichtbar mit 🔒 im Profil).
const AVATAR_TIERS = [
  {lvl:1,  list:['🦊','🐼','🦁','🐸','🦄','🐨']},
  {lvl:2,  list:['🐯','🐙','🦜','🐬']},
  {lvl:3,  list:['🦉','🐢','🐝']},
  {lvl:5,  list:['🦖','🐺','⚽']},
  {lvl:7,  list:['🎸','🚀']},
  {lvl:10, list:['🌟','🍀']}
];
const AVATARS = AVATAR_TIERS.flatMap(t=>t.list);
function avatarLevel(a){ const t = AVATAR_TIERS.find(t=>t.list.includes(a)); return t?t.lvl:1; }
function avatarsUnlocked(){ const lv = levelInfo().level; return AVATARS.filter(a=>avatarLevel(a)<=lv); }

function showProfile(){
  if(document.getElementById('profile-popup')) return;
  const ov = document.createElement('div');
  ov.id = 'profile-popup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:1.25rem';
  ov.onclick = (e)=>{ if(e.target===ov) ov.remove(); };
  ov.innerHTML = `<div style="background:#fff;border-radius:1.1rem;max-width:24rem;width:100%;padding:1.4rem;box-shadow:0 12px 40px rgba(0,0,0,.25);max-height:85vh;overflow-y:auto">
    <h2 style="font-size:1.15rem;font-weight:800;color:#1E293B;margin-bottom:.75rem">${T('profile_title')}</h2>
    <label style="font-size:.82rem;font-weight:700;color:#475569;display:block;margin-bottom:.3rem">${T('profile_name_label')}</label>
    <input id="profile-name-input" type="text" maxlength="20" value="${(P.name||'').replace(/"/g,'&quot;')}" placeholder="${T('profile_name_ph')}"
      style="width:100%;border:1.5px solid #E2E8F0;border-radius:.75rem;padding:.55rem .75rem;font-size:.95rem;outline:none;box-sizing:border-box;margin-bottom:1rem">
    <p style="font-size:.82rem;font-weight:700;color:#475569;margin-bottom:.4rem">${T('profile_avatar_label')}</p>
    <div id="profile-avatars" style="display:grid;grid-template-columns:repeat(5,1fr);gap:.4rem;margin-bottom:.5rem">
      ${AVATARS.map(a=>{
        const locked = avatarLevel(a) > levelInfo().level;
        if(locked) return `<div title="${T('profile_avatar_locked_pre')}${avatarLevel(a)}" style="font-size:1.5rem;padding:.35rem;border-radius:.7rem;background:#F1F5F9;border:2px dashed #CBD5E1;text-align:center;position:relative;opacity:.55;filter:grayscale(1)">${a}<span style="position:absolute;bottom:-2px;right:0;font-size:.62rem;background:#475569;color:#fff;border-radius:99px;padding:0 .3rem">🔒${avatarLevel(a)}</span></div>`;
        return `<button onclick="pickAvatar('${a}')" data-av="${a}" style="font-size:1.5rem;padding:.35rem;border-radius:.7rem;cursor:pointer;background:${a===(P.avatar||'')?'#DBEAFE':'#F8FAFC'};border:2px solid ${a===(P.avatar||'')?'#3B82F6':'#E2E8F0'}">${a}</button>`;
      }).join('')}
    </div>
    <p style="font-size:.72rem;color:#94A3B8;margin-bottom:1rem">${T('profile_avatar_unlock_hint')}</p>
    <details style="margin-bottom:1rem">
      <summary style="cursor:pointer;font-size:.8rem;font-weight:700;color:#64748B">⚙️ ${T('profile_goal_label')}</summary>
      <div style="display:flex;gap:.4rem;margin-top:.5rem" id="profile-goal-btns">
        ${[15,30,45,60].map(g=>`<button onclick="pickGoal(${g})" data-goal="${g}" style="flex:1;padding:.4rem;border-radius:.6rem;font-size:.85rem;font-weight:700;cursor:pointer;background:${g===dailyGoal()?'#DCFCE7':'#F8FAFC'};border:2px solid ${g===dailyGoal()?'#16A34A':'#E2E8F0'};color:${g===dailyGoal()?'#166534':'#64748B'}">${g}</button>`).join('')}
      </div>
      <p style="font-size:.72rem;color:#94A3B8;margin-top:.35rem">${T('profile_goal_hint')}</p>
    </details>
    <button onclick="saveProfile()" class="btn-primary" style="width:100%">${T('profile_save')}</button>
  </div>`;
  document.body.appendChild(ov);
}
let _pendingGoal = null;
function pickGoal(g){
  _pendingGoal = g;
  document.querySelectorAll('#profile-goal-btns button').forEach(b=>{
    const sel = parseInt(b.getAttribute('data-goal'),10)===g;
    b.style.background = sel?'#DCFCE7':'#F8FAFC';
    b.style.borderColor = sel?'#16A34A':'#E2E8F0';
    b.style.color = sel?'#166534':'#64748B';
  });
}
let _pendingAvatar = null;
function pickAvatar(a){
  _pendingAvatar = a;
  document.querySelectorAll('#profile-avatars button').forEach(b=>{
    const sel = b.getAttribute('data-av')===a;
    b.style.background = sel?'#DBEAFE':'#F8FAFC';
    b.style.borderColor = sel?'#3B82F6':'#E2E8F0';
  });
}
function saveProfile(){
  const inp = document.getElementById('profile-name-input');
  P.name = (inp ? inp.value : '').trim().slice(0,20);
  if(_pendingAvatar !== null) P.avatar = _pendingAvatar;
  if(_pendingGoal !== null) P.dailyGoal = _pendingGoal;
  _pendingAvatar = null; _pendingGoal = null;
  save();
  const p = document.getElementById('profile-popup'); if(p) p.remove();
  document.getElementById('app').innerHTML = render(_state);
}

