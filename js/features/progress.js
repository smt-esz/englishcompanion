// ═══════════════════════════════════════════════
// LERNWEG
// ═══════════════════════════════════════════════
// ── BACKUP-ERINNERUNG ──
// Alle 3 Wochen sanft an den Export erinnern (localStorage kann z.B.
// auf iPhones gelöscht werden, wenn die App nicht installiert ist).
function backupNudgeHTML(){
  if(!P.onboarded || (P.xp||0) < 30) return '';
  const today = new Date().toISOString().slice(0,10);
  // Wöchentlich sichern; „Später" verschiebt nur um 2 Tage.
  if(P.lastBackup && (new Date(today) - new Date(P.lastBackup)) < 7*86400000) return '';
  if(P.backupNudge && (new Date(today) - new Date(P.backupNudge)) < 2*86400000) return '';
  return `<div class="card" id="backup-nudge" style="background:#FFFBEB;border-color:#FDE68A;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
    <div style="font-size:1.6rem">💾</div>
    <div style="flex:1;min-width:12rem">
      <p style="font-weight:700;color:#92400E;font-size:.92rem">${T('backup_nudge_title')}</p>
      <p style="font-size:.8rem;color:#B45309">${T('backup_nudge_sub')}</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button class="btn-primary" style="background:#F59E0B" onclick="shareProgress()">${T('backup_nudge_btn')}</button>
      <button class="btn-secondary" style="border-color:#FDE68A;color:#92400E" onclick="snoozeBackupNudge()">${T('backup_nudge_later')}</button>
    </div>
  </div>`;
}
function snoozeBackupNudge(){
  P.backupNudge = new Date().toISOString().slice(0,10); save();
  const el = document.getElementById('backup-nudge'); if(el) el.remove();
}

// ── INSTALL-HINWEIS ──
// Im Safari-Tab löscht iOS die Daten nach 7 Tagen ohne Nutzung; als App auf
// dem Home-Bildschirm nicht. Außerdem haben Tab und App getrennte Speicher.
function installNudgeHTML(){
  if(!P.onboarded || !isIOSDevice() || isStandaloneApp()) return '';
  const today = new Date().toISOString().slice(0,10);
  if(P.installNudge && (new Date(today) - new Date(P.installNudge)) < 3*86400000) return '';
  return `<div class="card" id="install-nudge" style="background:#FEF2F2;border-color:#FCA5A5;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
    <div style="font-size:1.6rem">📲</div>
    <div style="flex:1;min-width:12rem">
      <p style="font-weight:700;color:#991B1B;font-size:.92rem">${T('install_nudge_title')}</p>
      <p style="font-size:.8rem;color:#B91C1C">${T('install_nudge_sub')}</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button class="btn-primary" style="background:#DC2626" onclick="go('pwa-help')">${T('install_nudge_btn')}</button>
      <button class="btn-secondary" style="border-color:#FCA5A5;color:#991B1B" onclick="snoozeInstallNudge()">${T('backup_nudge_later')}</button>
    </div>
  </div>`;
}
function snoozeInstallNudge(){
  P.installNudge = new Date().toISOString().slice(0,10); save();
  const el = document.getElementById('install-nudge'); if(el) el.remove();
}

// ── SICHERUNGSDATEI ──
function backupFileName(){
  const d = new Date();
  const stamp = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const who = (P.name||'').trim().replace(/[^\wäöüÄÖÜß-]+/g,'-');
  return 'english-companion-'+(who?who+'-':'')+stamp+'.json';
}
function markBackupDone(){
  P.lastBackup = new Date().toISOString().slice(0,10); save();
  const el = document.getElementById('backup-nudge'); if(el) el.remove();
}
// Sicherung über das Teilen-Menü (iPad: „In Dateien sichern", AirDrop, Mail
// mit echtem Anhang). Wo das nicht geht: normaler Download.
function shareProgress(){
  let file = null;
  try { file = new File([JSON.stringify(P)], backupFileName(), {type:'application/json'}); } catch(e){}
  if(file && navigator.canShare && navigator.share && navigator.canShare({files:[file]})){
    navigator.share({files:[file], title:'English Companion'})
      .then(()=>{ markBackupDone(); showToast(T('backup_share_ok'), 4000); })
      .catch(err=>{ if(!err || err.name!=='AbortError') exportProgress(); });
    return;
  }
  exportProgress();
  const el = document.getElementById('backup-nudge'); if(el) el.remove();
}

// ── CHECK-ERINNERUNG ──
// Nach 6 Wochen ohne Sprach-Check sanft an den Zwischenstand erinnern.
function checkNudgeHTML(){
  if(!P.onboarded) return '';
  const as = P.assessments||[];
  if(!as.length) return '';
  const today = new Date().toISOString().slice(0,10);
  const lastCheck = as[as.length-1].date;
  if((new Date(today) - new Date(lastCheck)) < 42*86400000) return '';
  if(P.checkNudge && (new Date(today) - new Date(P.checkNudge)) < 14*86400000) return '';
  return `<div class="card" id="check-nudge" style="background:#F5F3FF;border-color:#C4B5FD;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
    <div style="font-size:1.6rem">🧭</div>
    <div style="flex:1;min-width:12rem">
      <p style="font-weight:700;color:#4C1D95;font-size:.92rem">${T('check_nudge_title')}</p>
      <p style="font-size:.8rem;color:#6D28D9">${T('check_nudge_sub')}</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button class="btn-primary" style="background:#7C3AED" onclick="startOnboarding('check')">${T('ob_check_repeat')}</button>
      <button class="btn-secondary" style="border-color:#C4B5FD;color:#6D28D9" onclick="snoozeCheckNudge()">${T('backup_nudge_later')}</button>
    </div>
  </div>`;
}
function snoozeCheckNudge(){
  P.checkNudge = new Date().toISOString().slice(0,10); save();
  const el = document.getElementById('check-nudge'); if(el) el.remove();
}

// Fortschritt exportieren UND direkt eine E-Mail an die Lehrkraft öffnen.
// mailto kann keine Anhänge mitschicken – die Mail erklärt deshalb,
// dass die gerade heruntergeladene Datei angehängt werden muss.
function mailProgress(){
  const to = (P.teacherEmail||'').trim();
  if(!to){
    const sel = document.getElementById('backup-teacher-select');
    if(sel){ sel.style.display='block'; sel.scrollIntoView({behavior:'smooth',block:'center'}); }
    showToast(T('backup_mail_pick_teacher'));
    return;
  }
  exportProgress();
  const d = new Date();
  const stamp = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const fname = 'english-companion-fortschritt-'+stamp+'.json';
  const name = P.name || '';
  const subject = encodeURIComponent('[English Companion] '+T('backup_mail_subject')+(name?' – '+name:''));
  const body = encodeURIComponent(
    T('backup_mail_body_1')+'\n\n'+
    T('backup_mail_body_2')+' '+fname+'\n'+
    T('backup_mail_body_3')+'\n\n'+
    (name?T('writing_mail_student')+' '+name+'\n':'')+
    'Level '+levelInfo().level+' · '+(P.xp||0)+' XP'
  );
  setTimeout(()=>{ window.location.href = 'mailto:'+to+'?subject='+subject+'&body='+body; }, 400);
}

function exportProgress(){
  try{
    P.lastBackup = new Date().toISOString().slice(0,10); save();
    const data = JSON.stringify(P);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const d = new Date();
    const stamp = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'english-companion-fortschritt-'+stamp+'.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }catch(e){ alert(T('backup_export_error')); }
}
// fromOnboarding = true: Aufruf vom Willkommens-Bildschirm (noch kein
// Fortschritt vorhanden, also keine Rückfrage zum Überschreiben).
function importProgress(input, fromOnboarding){
  const file = input.files && input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e)=>{
    try{
      const data = JSON.parse(e.target.result);
      // Basic sanity check: must look like our progress object
      if(typeof data!=='object' || data===null || !('vocab' in data) || !('grammar' in data)){
        alert(T('backup_import_invalid')); return;
      }
      if(!fromOnboarding && !confirm(T('backup_import_confirm'))) return;
      // Merge onto a fresh default so missing keys get sane defaults
      P = Object.assign(defP(), data);
      if(fromOnboarding && P.name) P.onboarded = true;
      P.seenVersion = APP_VERSION;
      save();
      if(fromOnboarding && P.onboarded){
        const ov = document.getElementById('onboarding-popup'); if(ov) ov.remove();
        _ob = null;
        applyA11y(); updateLangUI(); renderVersionBadge();
        go('home');
        showToast(T('backup_import_ok'), 4000);
        return;
      }
      alert(T('backup_import_ok'));
      if(fromOnboarding){ startOnboarding('full'); return; }
      go('lernweg');
    }catch(err){ alert(T('backup_import_invalid')); }
    finally { input.value = ''; }
  };
  reader.onerror = ()=>alert(T('backup_import_invalid'));
  reader.readAsText(file);
}

function renderLernweg(){
  const gs = grammarStats();
  // Count individual ✅-marked words across all topics
  const totalKnownWords = VOCAB.reduce((sum,t)=>sum+(((P.vocab[t.id]||{}).known)||[]).length,0);
  const totalVocabWords = VOCAB.reduce((sum,t)=>sum+t.words.length,0);
  const vocabDone = totalKnownWords;
  const vocabTot = totalVocabWords;

  const badgesHTML = BADGES.map(b=>{
    const earned = evalBadge(b.id);
    return `<div class="badge-box ${earned?'badge-earned':'badge-locked'}" style="min-width:0">
      <div style="font-size:1.8rem">${b.emoji}</div>
      <p style="font-weight:700;font-size:.8rem;color:#1E293B;margin:.3rem 0">${(P.lang||'en2')==='de'?b.title:(b.titleEN||b.title)}</p>
      <p style="font-size:.7rem;color:#64748B">${(P.lang||'en2')==='de'?b.descDE:b.descEN}</p>
    </div>`;
  }).join('');

  return `<div class="space-y-8">
    <div><h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('lernweg_title')}</h1>
    <p style="color:#64748B;margin-top:.3rem">${T('lernweg_sub')}</p></div>

    <div class="card" style="display:flex;align-items:center;gap:1rem;background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border-color:#C4B5FD">
      <div style="font-size:2rem">🚀</div>
      <div style="flex:1;min-width:0">
        <p style="font-weight:800;color:#1E293B">${T('home_level')||'Level'} ${levelInfo().level} · ${P.xp||0} XP</p>
        <div style="margin-top:.35rem">${pb(levelInfo().pct,'#8B5CF6')}</div>
      </div>
      ${currentStreak()>=1?`<div style="text-align:center"><div style="font-size:1.4rem">🔥</div><div style="font-weight:800;color:#1E293B">${currentStreak()}</div></div>`:''}
    </div>

    ${(()=>{ // Wochenrückblick
      const w = weekStats();
      return `<div class="card" style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <div style="font-size:1.8rem">📅</div>
        <div style="flex:1;min-width:10rem">
          <p style="font-weight:800;color:#1E293B;font-size:.95rem">${T('week_review_title')}</p>
          <p style="font-size:.85rem;color:#64748B">${w.xp} XP · ${w.days} ${T('week_review_days')}</p>
        </div>
        <div style="display:flex;gap:.3rem;align-items:flex-end;height:2.6rem">
          ${[6,5,4,3,2,1,0].map(i=>{
            const d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
            const v = (P.xpLog||{})[d]||0;
            const h = Math.min(100, v/dailyGoal()*100);
            return `<div title="${d}: ${v} XP" style="width:.75rem;height:${Math.max(8,h)}%;background:${v>0?'#10B981':'#E2E8F0'};border-radius:2px"></div>`;
          }).join('')}
        </div>
      </div>`;
    })()}

    ${(()=>{ // Sprach-Check: letzter Stand + Entwicklung + Wiederholen
      const as = P.assessments||[];
      const last = as[as.length-1];
      const prev = as.length>1 ? as[as.length-2] : null;
      const topicRows = last ? assessmentAreas().map(t=>{
        const r = last.perTopic[t.id]; if(!r||!r.total) return '';
        const tp = Math.round(r.right/r.total*100);
        let trend = '';
        if(prev && prev.perTopic[t.id] && prev.perTopic[t.id].total){
          const pp = Math.round(prev.perTopic[t.id].right/prev.perTopic[t.id].total*100);
          trend = tp>pp ? ' <span style="color:#059669;font-weight:700">▲</span>' : tp<pp ? ' <span style="color:#DC2626;font-weight:700">▼</span>' : ' <span style="color:#94A3B8">▬</span>';
        }
        return `<div style="margin-bottom:.4rem">
          <div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:.1rem">
            <span style="color:#334155;font-weight:600">${t.title}${trend}</span>
            <span style="color:${tp>=60?'#059669':'#D97706'};font-weight:700">${tp}%</span>
          </div>${pb(tp, tp>=60?'#10B981':'#F59E0B')}</div>`;
      }).join('') : '';
      const historyLine = as.length>1 ? `<p style="font-size:.75rem;color:#94A3B8;margin-top:.5rem">${T('ob_history_label')} ${as.map(a=>`${a.date.slice(5)}: <strong>${a.pct}%</strong>`).join(' → ')}</p>` : '';
      return `<div class="card space-y-3" style="background:linear-gradient(135deg,#F5F3FF,#FAF5FF);border-color:#C4B5FD">
        <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">
          <span style="font-size:1.6rem">🧭</span>
          <h2 style="font-weight:700;color:#1E293B;flex:1">${T('ob_check_title')}</h2>
          <button class="btn-primary" style="background:#7C3AED" onclick="startOnboarding('check')">${last?T('ob_check_repeat'):T('ob_check_do')}</button>
        </div>
        ${last ? `<p style="font-size:.8rem;color:#6D28D9">${T('ob_last_check')} ${last.date} · <strong>${last.pct}%</strong>${prev?` (${T('ob_prev_check')} ${prev.pct}%)`:''}</p>
        <div>${topicRows}</div>${historyLine}` : `<p style="font-size:.85rem;color:#6D28D9">${T('ob_check_none')}</p>`}
      </div>`;
    })()}

    ${(()=>{ // Level-Roadmap: was kommt in den nächsten Leveln?
      const lv = levelInfo();
      const milestones = [];
      AVATAR_TIERS.filter(t=>t.lvl>1).forEach(t=>milestones.push({lvl:t.lvl, label:t.list.join(' ')}));
      milestones.push({lvl:4, label:'🏅 ' + T('roadmap_badge_lvl5')});
      milestones.sort((a,b)=>a.lvl-b.lvl);
      const rows = milestones.map(m=>{
        const reached = lv.level >= m.lvl;
        const xpNeeded = (m.lvl-1)*XP_PER_LEVEL;
        return `<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem 0;border-bottom:1px solid #F1F5F9;${reached?'':'opacity:.75'}">
          <span style="font-size:.78rem;font-weight:800;color:${reached?'#059669':'#64748B'};min-width:4.2rem">${reached?'✅':'🔒'} ${T('home_level')||'Level'} ${m.lvl}</span>
          <span style="flex:1;font-size:.95rem">${m.label}</span>
          <span style="font-size:.72rem;color:#94A3B8;white-space:nowrap">${reached?'':xpNeeded+' XP'}</span>
        </div>`;
      }).join('');
      return `<div class="card space-y-2">
        <h2 style="font-weight:700;color:#1E293B">🗺️ ${T('roadmap_title')}</h2>
        <p style="font-size:.8rem;color:#64748B">${T('roadmap_sub').replace('{xp}', String(lv.need - lv.inLevel)).replace('{next}', String(lv.level+1))}</p>
        ${rows}
      </div>`;
    })()}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem">
      ${[
        {icon:'📚',label:T('label_grammar'),val:gs.done,tot:GRAMMAR.length,c:'#3B82F6'},
        {icon:'🔤',label:T('label_vocab'),val:vocabDone,tot:vocabTot,c:'#10B981'},
        {icon:'📖',label:'Reading',val:P.reading.length,tot:READING.length,c:'#8B5CF6'},
        {icon:'✏️',label:'Writing',val:P.writing.length,tot:WRITING.length,c:'#EC4899'},
      ].map(s=>`<div class="card" style="text-align:center;padding:1rem">
        <div style="font-size:1.5rem">${s.icon}</div>
        <p style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.2rem 0">${s.val}<span style="font-size:.8rem;color:#CBD5E1">/${s.tot}</span></p>
        <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.4rem">${s.label}</p>
        ${pb(s.val/s.tot*100,s.c)}
      </div>`).join('')}
    </div>

    <div class="card space-y-3">
      <h2 style="font-weight:700;color:#1E293B">${T('lernweg_games_heading')}</h2>
      ${(()=>{
        const g=P.gameStats||{};
        const hm=g.hangman||[], me=g.memory||[], qf=g.qf||[], ws=g.wordsearch||[];
        const total=hm.length+me.length+qf.length+ws.length;
        if(!total) return `<p style="font-size:.85rem;color:#94A3B8">${T('lernweg_games_none')}</p>`;
        const hmWon=hm.filter(x=>x.won).length;
        const qfBest=qf.length?Math.max(...qf.map(x=>x.pct||0)):0;
        const meBest=me.length?Math.min(...me.map(x=>x.moves||9999)):0;
        const row=(emoji,name,info)=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.45rem .15rem;border-bottom:1px solid #F1F5F9">
          <span style="font-size:1.3rem">${emoji}</span>
          <span style="flex:1;font-weight:600;color:#1E293B;font-size:.88rem">${name}</span>
          <span style="font-size:.8rem;color:#64748B;text-align:right">${info}</span></div>`;
        return row('🎯','Hangman', hm.length?(hm.length+'× · '+hmWon+' '+T('lernweg_games_won')):'–')
          + row('🃏','Memory', me.length?(me.length+'× · '+T('lernweg_games_best')+' '+meBest+' '+T('lernweg_games_moves')):'–')
          + row('⚡','Quick-Fire', qf.length?(qf.length+'× · '+T('lernweg_games_best')+' '+qfBest+'%'):'–')
          + row('🔎','Wordsearch', ws.length?(ws.length+'×'):'–');
      })()}
      <button onclick="go('spiele')" class="btn-secondary" style="width:100%;margin-top:.4rem">${T('nav_games')} ›</button>
    </div>

    <div class="card space-y-4">
      <h2 style="font-weight:700;color:#1E293B;margin-bottom:.75rem">${T('lernweg_vocab_by_cat')}</h2>
      ${(()=>{
        const soul5 = VOCAB.filter(t=>t.cat==='soul5');
        const soul6 = VOCAB.filter(t=>t.cat==='soul6');
        const basics = VOCAB.filter(t=>!t.cat||t.cat==='basics');
        const renderGroup = (topics, label) => {
          if(!topics.length) return '';
          return `<div style="margin-bottom:.75rem">
            <p style="font-size:.82rem;font-weight:700;color:#475569;margin-bottom:.3rem">${label}</p>
            <div style="display:flex;flex-wrap:wrap;gap:.3rem">
              ${topics.map(t=>{
                const vp=P.vocab[t.id]||{};
                const pct=t.words.length?Math.round((vp.known||[]).length/t.words.length*100):0;
                return `<span style="font-size:.78rem;padding:.25rem .5rem;border-radius:.4rem;background:${pct>=80?'#D1FAE5':pct>=40?'#FEF3C7':'#F1F5F9'};color:${pct>=80?'#065F46':pct>=40?'#92400E':'#475569'}">${t.emoji} ${t.title.split('–').pop().trim()} ${pct}%</span>`;
              }).join('')}
            </div>
          </div>`;
        };
        return renderGroup(soul5,T('lernweg_soul5')) + renderGroup(soul6,T('lernweg_soul6')) + renderGroup(basics,T('lernweg_basics'));
      })()}
    </div>

    <div class="card space-y-4">
      <h2 style="font-weight:700;color:#1E293B">${T('lernweg_my_badges')}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.5rem">${badgesHTML}</div>
    </div>

    <div class="card space-y-3">
      <h2 style="font-weight:700;color:#1E293B">${T('lernweg_grammar_progress')}</h2>
      ${GRAMMAR.map(t=>{
        const gp = P.grammar[t.id]||{};
        const done = gp.completed;
        return `<div onclick="go('grammar-topic','${t.id}')" style="display:flex;align-items:center;gap:1rem;padding:.5rem .75rem;border-radius:.75rem;cursor:pointer;background:${done?'#ECFDF5':'#F8FAFC'}">
          <span>${done?'✅':'⭕'}</span>
          <div style="flex:1">
            <p style="font-size:.9rem;font-weight:600;color:${done?'#1E293B':'#64748B'}">${t.title}</p>
            <p style="font-size:.75rem;color:#94A3B8">${t.level}</p>
          </div>
          ${gp.score!==undefined?`<span style="font-size:.75rem;font-weight:700;background:${gp.score>=80?'#D1FAE5':'#F1F5F9'};color:${gp.score>=80?'#065F46':'#64748B'};padding:.2rem .5rem;border-radius:99px">${gp.score}%</span>`:''}
        </div>`;
      }).join('')}
    </div>

    <div class="card space-y-3">
      <h2 style="font-weight:700;color:#1E293B">${T('lernweg_vocab_progress')}</h2>
      ${VOCAB.map(t=>{
        const vp = P.vocab[t.id]||{known:[]};
        const known = (vp.known||[]).length;
        const pct = Math.round(known/t.words.length*100);
        return `<div onclick="go('vocab-topic','${t.id}')" style="display:flex;align-items:center;gap:1rem;padding:.5rem .75rem;border-radius:.75rem;cursor:pointer">
          <span style="font-size:1.3rem">${t.emoji}</span>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;font-size:.85rem">
              <span style="font-weight:600;color:#1E293B">${t.title}</span>
              <span style="color:#94A3B8">${known}/${t.words.length}</span>
            </div>
            ${pb(pct,'#10B981')}
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="card space-y-3">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2 style="font-weight:700;color:#1E293B">Irregular Verbs</h2>
        <button onclick="go('irreg','list')" style="font-size:.85rem;color:#F59E0B;background:none;border:none;cursor:pointer">${T('lernweg_trainer')}</button>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.85rem;color:#64748B">
        <span>${(P.irreg||[]).length}/30 ${T('irreg_learned')}</span>
        <span>${Math.round((P.irreg||[]).length/30*100)}%</span>
      </div>
      ${pb((P.irreg||[]).length/30*100,'#F59E0B')}
    </div>

    ${currentStreak()>0?`<div class="card" style="background:#FFF7ED;border-color:#FED7AA;display:flex;align-items:center;gap:1rem">
      <span style="font-size:2.5rem">🔥</span>
      <div>
        <p style="font-weight:700;color:#92400E">${currentStreak()}${T('lernweg_streak_days_post')}</p>
        <p style="font-size:.85rem;color:#C2410C">${currentStreak()===1?T('lernweg_streak_start'):T('lernweg_streak_cont_pre')+currentStreak()+T('lernweg_streak_cont_post')}</p>
      </div>
    </div>`:''}

    <div class="card" style="border-color:#BFDBFE">
      <h3 style="font-weight:600;color:#1E293B;font-size:.9rem;margin-bottom:.4rem">${T('backup_title')}</h3>
      <p style="font-size:.8rem;color:#94A3B8;margin-bottom:.75rem">${T('backup_desc')}</p>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button onclick="shareProgress()" style="background:#2563EB;color:#fff;border:none;border-radius:.625rem;padding:.5rem .9rem;font-size:.85rem;font-weight:600;cursor:pointer">${T('backup_share_btn')}</button>
        <button onclick="exportProgress()" style="background:#EFF6FF;color:#1D4ED8;border:none;border-radius:.625rem;padding:.5rem .9rem;font-size:.85rem;font-weight:600;cursor:pointer">${T('backup_export_btn')}</button>
        <button onclick="mailProgress()" style="background:#ECFDF5;color:#047857;border:none;border-radius:.625rem;padding:.5rem .9rem;font-size:.85rem;font-weight:600;cursor:pointer">${T('backup_mail_btn')}</button>
        <button onclick="document.getElementById('import-file').click()" style="background:#F1F5F9;color:#475569;border:none;border-radius:.625rem;padding:.5rem .9rem;font-size:.85rem;font-weight:600;cursor:pointer">${T('backup_import_btn')}</button>
        <input id="import-file" type="file" accept="application/json,.json" style="display:none" onchange="importProgress(this)">
      </div>
      <div id="backup-teacher-select" style="display:${(P.teacherEmail||'').trim()?'none':'block'};margin-top:.6rem;max-width:22rem">
        <p style="font-size:.78rem;color:#64748B;margin-bottom:.3rem">${T('backup_mail_teacher_hint')}</p>
        ${teacherSelectHTML(true)}
      </div>
    </div>

    <div class="card" style="border-color:#FCA5A5">
      <h3 style="font-weight:600;color:#64748B;font-size:.9rem;margin-bottom:.4rem">${T('lernweg_reset_title')}</h3>
      <p style="font-size:.8rem;color:#94A3B8;margin-bottom:.75rem">${T('lernweg_reset_desc')}</p>
      <button onclick="if(confirm(T('lernweg_reset_confirm'))){resetAllProgress();}" style="color:#EF4444;background:none;border:none;cursor:pointer;font-size:.9rem;font-weight:600">${T('lernweg_reset_btn')}</button>
    </div>
  </div>`;
}

