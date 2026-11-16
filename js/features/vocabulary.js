// ═══════════════════════════════════════════════
// VOCABULARY
// ═══════════════════════════════════════════════

// ── RANDOM VOCAB TEST ──
let _rvt = {items:[], idx:0, score:0, flipped:false, done:false};

function buildVocabTestItems(n){
  n = n || 20;
  const all = [];
  VOCAB.forEach(t=>{ t.words.forEach(w=>{ all.push({word:w, topic:t.title, topicId:t.id}); }); });
  // shuffle
  for(let i=all.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [all[i],all[j]]=[all[j],all[i]]; }
  return all.slice(0, Math.min(n, all.length)).map(item=>{
    const isDE = Math.random() < 0.5;
    return { word:item.word, topic:item.topic, isDE, prompt:isDE?item.word.de:item.word.en, correct:isDE?item.word.en:item.word.de };
  });
}

function startVocabTest(n){
  _rvt = {items:buildVocabTestItems(n), idx:0, score:0, flipped:false, done:false};
  go('vocab-test');
}

function rvtFlip(){
  _rvt.flipped = !_rvt.flipped;
  go('vocab-test');
}

function rvtAnswer(correct){
  const cur = _rvt.items[_rvt.idx];
  if(cur && cur.topicId) srsUpdate(cur.topicId, cur.word, correct);
  if(correct){
    _rvt.score++;
  } else {
    // Mit Zurücklegen: falsche Karte ans Ende der Warteschlange
    _rvt.items.push(_rvt.items[_rvt.idx]);
  }
  _rvt.idx++;
  _rvt.flipped = false;
  if(_rvt.idx>=_rvt.items.length) _rvt.done=true;
  go('vocab-test');
}

function renderVocabTest(){
  if(_rvt.items.length===0){
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
        <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('vocab_test_setup_title')}</h1>
      </div>
      <div class="card space-y-4" style="text-align:center;padding:2rem">
        <div style="font-size:3rem">🎯</div>
        <h2 style="font-size:1.2rem;font-weight:700;color:#1E293B">${T('vocab_how_many')}</h2>
        <p style="font-size:.85rem;color:#64748B">${T('vocab_how_many_sub')}</p>
        <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">
          ${[10,20,30].map(n=>`<button class="btn-primary" style="background:#8B5CF6;min-width:5rem" onclick="startVocabTest(${n})">${n} ${T('vocab_cards_label')}</button>`).join('')}
        </div>
      </div>
    </div>`;
  }
  if(_rvt.done){
    const pct = Math.round(_rvt.score/_rvt.items.length*100);
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
        <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${T('vocab_result_title')}</h1>
      </div>
      <div class="card" style="text-align:center;padding:2rem">
        <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
        <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${pct>=80?T('ex_result_excellent'):pct>=60?T('ex_result_good'):T('ex_result_practice')}</h2>
        <div style="font-size:2.5rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${_rvt.score}/${_rvt.items.length}</div>
        ${pb(pct,'#8B5CF6')}
        <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1rem">
          <button class="btn-secondary" onclick="_rvt={items:[],idx:0,score:0,flipped:false,done:false};go('vocab-test')">${T('vocab_new_test')}</button>
          <button class="btn-primary" onclick="go('vocabulary')">${T('vocab_to_overview')}</button>
        </div>
      </div>
    </div>`;
  }
  const item = _rvt.items[_rvt.idx];
  const pct = Math.round(_rvt.idx/_rvt.items.length*100);
  const flipped = _rvt.flipped;
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
      <h1 style="font-size:1.4rem;font-weight:800;color:#1E293B">${T('vocab_test_title')}</h1>
      <span style="font-size:.8rem;color:#64748B;margin-left:auto">✅ ${_rvt.score} ${T('vocab_score_known')} · ${_rvt.items.length-_rvt.idx} ${T('vocab_score_open')}</span>
    </div>
    ${pb(pct,'#8B5CF6')}
    <div onclick="rvtFlip()" class="flashcard" style="background:linear-gradient(135deg,${flipped?'#F5F3FF,#EDE9FE':'#EFF6FF,#DBEAFE'});border:2px solid ${flipped?'#C4B5FD':'#BFDBFE'};border-radius:1.25rem;padding:2rem;text-align:center;cursor:pointer;min-height:10rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem">
      <p style="font-size:.75rem;color:#94A3B8">${item.isDE?'🇩🇪 Deutsch':'🇬🇧 Englisch'} · ${item.topic}</p>
      <p style="font-size:1.5rem;font-weight:800;color:#1E293B">${item.prompt}</p>
      ${!flipped
        ? `<p style="font-size:.82rem;color:#8B5CF6;margin-top:.5rem">${T('vocab_flip_hint')}</p>`
        : `<div style="border-top:1.5px solid ${flipped?'#C4B5FD':'#BFDBFE'};padding-top:.75rem;width:100%">
            <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.3rem">${item.isDE?'🇬🇧 Englisch':'🇩🇪 Deutsch'}</p>
            <p style="font-size:1.3rem;font-weight:700;color:#6D28D9">${item.correct}</p>
           </div>`
      }
    </div>
    ${flipped
      ? `<div style="display:flex;gap:.75rem">
          <button style="flex:1;padding:.75rem;border-radius:.75rem;border:2px solid #FCA5A5;background:#FFF5F5;color:#991B1B;font-weight:700;cursor:pointer;font-size:.95rem" onclick="rvtAnswer(false)">${T('vocab_fc_again')}</button>
          <button style="flex:1;padding:.75rem;border-radius:.75rem;border:2px solid #6EE7B7;background:#F0FDF4;color:#065F46;font-weight:700;cursor:pointer;font-size:.95rem" onclick="rvtAnswer(true)">${T('vocab_fc_known')}</button>
        </div>`
      : `<p style="text-align:center;font-size:.8rem;color:#94A3B8">${T('vocab_fc_rate_hint')}</p>`
    }
  </div>`;
}

let _vFilter = 'all';
function setVFilter(f){ _vFilter=f; document.getElementById('app').innerHTML=render(_state); }
function vFilterMatch(t, f){
  if(f==='all') return true;
  if(f==='soul5') return t.cat==='soul5' || (t.cat==='basics' && (t.cls===5||t.cls===0));
  if(f==='soul6') return t.cat==='soul6' || (t.cat==='basics' && (t.cls===6||t.cls===0));
  if(f==='basics') return t.cat==='basics';
  if(f==='onlysoul5') return t.cat==='soul5';
  if(f==='onlysoul6') return t.cat==='soul6';
  return true;
}
function vocabTitle(t){
  // Localize "Baustein N – Rest" → "Module N – Rest" (EN) / "Baustein N – Rest" (DE)
  const m = (t.title||'').match(/^Baustein\s+(\d+)\s*[–-]\s*(.*)$/);
  if(m){
    const prefix = (P.lang||'en2')==='de' ? 'Baustein' : 'Module';
    return prefix + ' ' + m[1] + ' – ' + m[2];
  }
  return t.title;
}

// ===== Vocabulary search =====
let _vSearch = '';
function setVSearch(v){
  _vSearch = v;
  const app = document.getElementById('app');
  app.innerHTML = render(_state);
  const inp = document.getElementById('vsearch');
  if(inp){ inp.focus(); const val = inp.value; inp.value=''; inp.value=val; }
}

// ===== Printable A4 vocabulary list =====
function printVocab(id){
  const t = VOCAB.find(v=>v.id===id); if(!t) return;
  const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const rows = t.words.map((w,i)=>`<tr>
    <td style="border:1px solid #999;padding:4px 6px;text-align:right;color:#777;width:8mm">${i+1}</td>
    <td style="border:1px solid #999;padding:4px 6px;font-weight:bold;width:30%">${esc(w.en)}</td>
    <td style="border:1px solid #999;padding:4px 6px;width:30%">${esc(w.de)}</td>
    <td style="border:1px solid #999;padding:4px 6px;font-style:italic;color:#333">${esc(w.example||'')}</td>
  </tr>`).join('');
  const old = document.getElementById('print-overlay'); if(old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'print-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:#fff;overflow:auto;-webkit-overflow-scrolling:touch';
  ov.innerHTML = `
    <div class="no-print" style="position:sticky;top:0;display:flex;gap:.5rem;justify-content:space-between;align-items:center;padding:.7rem 1rem;background:#F8FAFC;border-bottom:1px solid #E2E8F0">
      <button onclick="closePrint()" style="padding:.5rem .9rem;border-radius:.7rem;border:1.5px solid #E2E8F0;background:#fff;color:#334155;font-weight:600;font-size:.85rem;cursor:pointer">‹ ${T('vocab_print_back')||'Zurück'}</button>
      <strong style="font-size:.88rem;color:#1E293B;text-align:center;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.title)}</strong>
      <button onclick="window.print()" style="padding:.5rem .9rem;border-radius:.7rem;border:none;background:#2563EB;color:#fff;font-weight:700;font-size:.85rem;cursor:pointer">🖨️ ${T('vocab_print')||'Drucken'}</button>
    </div>
    <div id="print-area" style="padding:1rem 1.25rem;max-width:800px;margin:0 auto;color:#111">
      <h1 style="font-size:1.3rem;font-weight:800;margin:0 0 .2rem">${esc(t.title)}</h1>
      <p style="font-size:.82rem;color:#555;margin:0 0 1rem">${t.words.length} ${T('label_words')||'Wörter'} &middot; My English Companion</p>
      <table style="width:100%;border-collapse:collapse;font-size:.9rem">
        <thead><tr>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">#</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">English</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Deutsch</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Example</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  document.body.appendChild(ov);
  ov.scrollTop = 0;
}
function closePrint(){
  const o = document.getElementById('print-overlay'); if(o) o.remove();
}
function printIrreg(){
  if(typeof IRREG==='undefined') return;
  const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const td = (c,extra)=>`<td style="border:1px solid #999;padding:4px 6px;${extra||''}">${c}</td>`;
  const rows = IRREG.map((v,i)=>`<tr>
    ${td(i+1,'text-align:right;color:#777;width:8mm')}
    ${td(esc(v.inf),'font-weight:bold')}
    ${td(esc(v.past))}
    ${td(esc(v.pp))}
    ${td(esc(v.de),'color:#444')}
    ${td(esc(v.ex||''),'font-style:italic;color:#333')}
  </tr>`).join('');
  const title = 'Irregular Verbs';
  const old = document.getElementById('print-overlay'); if(old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'print-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:#fff;overflow:auto;-webkit-overflow-scrolling:touch';
  ov.innerHTML = `
    <div class="no-print" style="position:sticky;top:0;display:flex;gap:.5rem;justify-content:space-between;align-items:center;padding:.7rem 1rem;background:#F8FAFC;border-bottom:1px solid #E2E8F0">
      <button onclick="closePrint()" style="padding:.5rem .9rem;border-radius:.7rem;border:1.5px solid #E2E8F0;background:#fff;color:#334155;font-weight:600;font-size:.85rem;cursor:pointer">‹ ${T('vocab_print_back')||'Zurück'}</button>
      <strong style="font-size:.88rem;color:#1E293B;text-align:center;flex:1">${title}</strong>
      <button onclick="window.print()" style="padding:.5rem .9rem;border-radius:.7rem;border:none;background:#2563EB;color:#fff;font-weight:700;font-size:.85rem;cursor:pointer">🖨️ ${T('vocab_print')||'Drucken'}</button>
    </div>
    <div id="print-area" style="padding:1rem 1.25rem;max-width:800px;margin:0 auto;color:#111">
      <h1 style="font-size:1.3rem;font-weight:800;margin:0 0 .2rem">${title}</h1>
      <p style="font-size:.82rem;color:#555;margin:0 0 1rem">${IRREG.length} ${T('label_words')||'Wörter'} &middot; My English Companion</p>
      <table style="width:100%;border-collapse:collapse;font-size:.88rem">
        <thead><tr>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">#</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Infinitive</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Simple Past</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Past Participle</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Deutsch</th>
          <th style="border:1px solid #999;padding:4px 6px;background:#eee;text-align:left">Example</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  document.body.appendChild(ov);
  ov.scrollTop = 0;
}

// ===== Dictionary Skills page =====
function renderDictSkills(){
  const isDE = (P.lang||'en2')==='de';
  const card = (emoji, title, body) => `<div class="card" style="margin-bottom:1rem">
    <h2 style="font-size:1rem;font-weight:800;color:#1E293B;margin-bottom:.5rem">${emoji} ${title}</h2>
    <div style="font-size:.9rem;color:#475569;line-height:1.65">${body}</div>
  </div>`;
  const ex = s => `<span style="font-family:monospace;background:#F1F5F9;padding:.05rem .35rem;border-radius:.3rem">${s}</span>`;
  const abbr = isDE ? [
    ['Pl', 'Plural', 'mouse; <em>Pl:</em> mice'],
    ['Br', 'britisches Englisch', 'col<strong>ou</strong>r'],
    ['US', 'amerikanisches Englisch', 'col<strong>o</strong>r'],
    ['umg', 'umgangssprachlich', 'coke = <em>umg</em> Cola'],
    ['*', 'unregelmäßiges englisches Verb', 'run – ran – run'],
    ['•', 'englischer Grundwortschatz', 'collect'],
    ['↔', 'Gegenteil von', 'big ↔ small'],
    ['!', 'Achtung, aufgepasst!', 'leicht zu verwechseln']
  ] : [
    ['Pl', 'plural', 'mouse; <em>Pl:</em> mice'],
    ['Br', 'British English', 'col<strong>ou</strong>r'],
    ['US', 'American English', 'col<strong>o</strong>r'],
    ['umg', 'informal (colloquial)', 'coke = <em>informal</em> for cola'],
    ['*', 'irregular English verb', 'run – ran – run'],
    ['•', 'basic English vocabulary', 'collect'],
    ['↔', 'opposite of', 'big ↔ small'],
    ['!', 'careful!', 'easy to mix up']
  ];
  const abbrRows = abbr.map(r=>`<tr>
    <td style="border:1px solid #E2E8F0;padding:.35rem .5rem;font-family:monospace;font-weight:700;text-align:center;white-space:nowrap">${r[0]}</td>
    <td style="border:1px solid #E2E8F0;padding:.35rem .5rem">${r[1]}</td>
    <td style="border:1px solid #E2E8F0;padding:.35rem .5rem;color:#64748B">${r[2]}</td>
  </tr>`).join('');
  const abbrTable = `<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.82rem;margin-top:.4rem">
    <thead><tr>
      <th style="border:1px solid #E2E8F0;padding:.35rem .5rem;background:#F8FAFC;text-align:left">Symbol</th>
      <th style="border:1px solid #E2E8F0;padding:.35rem .5rem;background:#F8FAFC;text-align:left">${isDE?'Bedeutung':'Meaning'}</th>
      <th style="border:1px solid #E2E8F0;padding:.35rem .5rem;background:#F8FAFC;text-align:left">${isDE?'Beispiel':'Example'}</th>
    </tr></thead><tbody>${abbrRows}</tbody></table></div>
    <p style="font-size:.75rem;color:#94A3B8;margin-top:.4rem">${isDE?'Die genauen Symbole stehen vorne oder hinten in deinem Wörterbuch. Sie können je nach Verlag etwas anders aussehen.':'You can find the exact symbols at the front or back of your dictionary. They can look a little different depending on the publisher.'}</p>`;

  return `<div class="space-y-3">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
      <div>
        <h1 style="font-size:1.7rem;font-weight:800;color:#1E293B">📖 ${T('dict_title')}</h1>
        <p style="color:#64748B;font-size:.85rem">${T('dict_page_sub')}</p>
      </div>
    </div>

    <div class="card" style="background:#ECFEFF;border-color:#A5F3FC">
      <p style="font-size:.88rem;color:#155E75;line-height:1.6">🏁 ${isDE?'Stell dir ein Wörterbuch wie ein Auto vor: Wenn du weißt, wie es funktioniert, bringt es dich zuverlässig ans Ziel. Hier kommen deine Fahrstunden (aus ENG-Racers).':'Think of a dictionary like a car: if you know how it works, it will always get you where you want to go. Here are your driving lessons (from ENG-Racers).'}</p>
    </div>

    ${isDE ? `
    ${card('🔁','1. Zwei Teile, zwei Richtungen', 'Ein zweisprachiges Wörterbuch hat zwei Teile: <strong>Englisch&nbsp;→&nbsp;Deutsch</strong> und <strong>Deutsch&nbsp;→&nbsp;Englisch</strong>. Du kannst also in beide Richtungen nachschlagen. Wenn du ein englisches Wort nicht kennst, suchst du im Englisch-Deutsch-Teil. Brauchst du ein englisches Wort, suchst du im Deutsch-Englisch-Teil (Rückwärtssuche).')}
    ${card('🔤','2. Das ABC nutzen', 'Das Wörterbuch ist nach dem Alphabet sortiert. Schau auf den <strong>ersten Buchstaben</strong>, dann den zweiten, dann den dritten.<br>Beispiel: '+ex('cat')+' kommt vor '+ex('dog')+', und '+ex('class')+' kommt vor '+ex('clean')+' (c-l-a vor c-l-e).')}
    ${card('🧭','3. Kolumnentitel & Stichwort', 'Oben auf jeder Seite stehen zwei Wörter, die <strong>Kolumnentitel</strong>. Sie zeigen das erste Stichwort (links oben) und das letzte Stichwort (rechts unten) der Seite. Liegt dein Wort im Alphabet dazwischen, ist es auf dieser Seite. Das <strong>Stichwort</strong> ist das fett gedruckte Wort, das du suchst. So findest du schnell, ohne jede Zeile zu lesen.')}
    ${card('📄','4. Aufbau einer Wörterbuchseite', 'Schau dir einen Eintrag genau an: fett das Stichwort, dann oft die <strong>Lautschrift</strong> in eckigen Klammern, die <strong>Wortart</strong> als Abkürzung und dann die Bedeutung(en). Viele Wörterbücher haben auch <strong>Info-Boxen</strong> mit Extra-Wissen.')}
    ${card('🏷️','5. Abkürzungen & Symbole', 'Einträge enthalten Abkürzungen und Symbole. Die wichtigsten:'+abbrTable)}
    ${card('🧩','6. Die Wortart erkennen', 'Die Abkürzung sagt dir die <strong>Wortart</strong>: '+ex('n')+' = Substantiv (noun), '+ex('v')+' = Verb, '+ex('adj')+' = Adjektiv, '+ex('adv')+' = Adverb. Vorsicht: Manche Wörter haben mehr als eine Wortart, z.B. '+ex('fast')+' (schnell als Adjektiv, aber auch fasten als Verb).')}
    ${card('🔎','7. Ein Wort, viele Bedeutungen', 'Viele Wörter haben <strong>mehrere Bedeutungen</strong>. Lies alle und wähle die, die zu deinem Satz passt.<br>Beispiel „Strom": '+ex('electricity')+' (elektrischer Strom), '+ex('current')+' (Strömung) oder '+ex('river')+' (großer Fluss). Bei <em>The radio needs electricity.</em> passt nur '+ex('electricity')+'.')}
    ${card('🗣️','8. Sprachstil (Stilregister)', 'Achte auf den richtigen Sprachstil. Nicht jedes Wort passt in jede Situation, genau wie zwischen „Karre" und „Auto" oder „labern" und „sprechen". '+ex('umg')+' im Wörterbuch heißt umgangssprachlich. In einer förmlichen E-Mail nimmst du besser das neutrale Wort.')}
    ${card('🔗','9. Phrasal Verbs nachschlagen', 'Ein <strong>phrasal verb</strong> ist ein Verb plus Zusatz (Präposition oder Adverb). Der Zusatz kann die Bedeutung völlig ändern:<br>'+ex('to look for')+' = suchen<br>'+ex('to look after')+' = sich kümmern um<br>'+ex('to look at')+' = ansehen<br>Im Wörterbuch stehen sie direkt nach dem Grundverb, oft mit dem Hinweis PHRASAL VERB.')}
    ${card('✅','Checkliste vor dem Aufschreiben', 'Habe ich die <strong>Grundform</strong> gesucht (Verben im Infinitiv, Nomen im Singular)? &middot; Stimmt die <strong>Wortart</strong>? &middot; Passt die <strong>Bedeutung</strong> zum Satz? &middot; Schreibe das Wort mit Übersetzung und einem Beispielsatz in deinen Hefter.')}
    ` : `
    ${card('🔁','1. Two parts, two directions', 'A bilingual dictionary has two parts: <strong>English&nbsp;→&nbsp;German</strong> and <strong>German&nbsp;→&nbsp;English</strong>. You can look words up in both directions. If you do not know an English word, use the English–German part. If you need an English word, use the German–English part.')}
    ${card('🔤','2. Use the ABC', 'A dictionary is sorted alphabetically. Look at the <strong>first letter</strong>, then the second, then the third.<br>Example: '+ex('cat')+' comes before '+ex('dog')+', and '+ex('class')+' comes before '+ex('clean')+' (c-l-a before c-l-e).')}
    ${card('🧭','3. Guide words & headword', 'At the top of every page there are two words, the <strong>guide words</strong>. They show the first headword (top left) and the last headword (bottom right) of the page. If your word comes between them in the alphabet, it is on this page. The <strong>headword</strong> is the word in bold that you are looking for.')}
    ${card('📄','4. How a dictionary page works', 'Look closely at an entry: the headword in bold, then often the <strong>phonetics</strong> in square brackets, the <strong>word class</strong> as a short form, and then the meaning(s). Many dictionaries also have <strong>info boxes</strong> with extra facts.')}
    ${card('🏷️','5. Short forms & symbols', 'Entries use short forms and symbols. The most important ones:'+abbrTable)}
    ${card('🧩','6. Spot the word class', 'The short form tells you the <strong>word class</strong>: '+ex('n')+' = noun, '+ex('v')+' = verb, '+ex('adj')+' = adjective, '+ex('adv')+' = adverb. Careful: some words have more than one word class, e.g. '+ex('fast')+' (quick as an adjective, but also a verb meaning not to eat).')}
    ${card('🔎','7. One word, many meanings', 'Many words have <strong>several meanings</strong>. Read all of them and choose the one that fits your sentence.<br>Example German „Strom": '+ex('electricity')+', '+ex('current')+' (in a river) or '+ex('river')+' (a large stream). In <em>The radio needs electricity.</em> only '+ex('electricity')+' fits.')}
    ${card('🗣️','8. Style (register)', 'Watch out for the right style. Not every word fits every situation. '+ex('umg')+' / <em>informal</em> in the dictionary means colloquial language. In a formal email it is better to use the neutral word.')}
    ${card('🔗','9. Looking up phrasal verbs', 'A <strong>phrasal verb</strong> is a verb plus a particle (preposition or adverb). The particle can completely change the meaning:<br>'+ex('to look for')+' = to search<br>'+ex('to look after')+' = to take care of<br>'+ex('to look at')+' = to view<br>In the dictionary they come right after the base verb, often marked PHRASAL VERB.')}
    ${card('✅','Checklist before you write it down', 'Did I look up the <strong>base form</strong> (verbs in the infinitive, nouns in the singular)? &middot; Is the <strong>word class</strong> right? &middot; Does the <strong>meaning</strong> fit my sentence? &middot; Write the word with its translation and an example sentence in your folder.')}
    `}

    <div onclick="go('vocabulary')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#EFF6FF;border-color:#BFDBFE">
      <span style="font-size:1.6rem">🔤</span>
      <div style="flex:1"><h3 style="font-weight:700;color:#1E293B">${T('dict_to_vocab')||'Zu den Vokabeln'}</h3></div>
      <span style="color:#3B82F6">›</span>
    </div>
  </div>`;
}

// ── VOKABEL-LERNPFAD ──
// Empfohlene Reihenfolge passend zur Klasse: erst der Grundwortschatz der
// eigenen Klassenstufe, dann die SOUL-Bausteine, dann der Rest.
// Klasse 7 (Wiederholung) und "keine Klasse": alles gleichrangig.
function vocabOrder(){
  const cls = P.cls||0;
  const byB = (a,b)=>(a.baustein||0)-(b.baustein||0);
  const basics = VOCAB.filter(t=>t.cat==='basics'||!t.cat);
  const soul5 = VOCAB.filter(t=>t.cat==='soul5').sort(byB);
  const soul6 = VOCAB.filter(t=>t.cat==='soul6').sort(byB);
  if(cls===5) return [...basics.filter(t=>!t.cls||t.cls===5), ...soul5, ...basics.filter(t=>t.cls===6), ...soul6];
  if(cls===6) return [...basics.filter(t=>!t.cls||t.cls===6), ...soul6, ...basics.filter(t=>t.cls===5), ...soul5];
  return [...basics, ...soul5, ...soul6];
}
function topicPct(t){
  const k = ((P.vocab[t.id]||{}).known||[]).length;
  return t.words.length ? Math.round(k/t.words.length*100) : 0;
}
function vocabPathHTML(){
  const order = vocabOrder();
  const next = order.find(t=>topicPct(t) < 80);
  if(!next) return '';
  const inProgress = order.filter(t=>t!==next && topicPct(t)>0 && topicPct(t)<80).slice(0,3);
  return `<div class="card" style="background:linear-gradient(135deg,#EFF6FF,#E0F2FE);border-color:#93C5FD">
    <p style="font-size:.72rem;font-weight:800;color:#1D4ED8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.6rem">📍 ${T('path_title')}</p>
    <div onclick="go('vocab-topic','${next.id}')" style="display:flex;align-items:center;gap:.9rem;background:#fff;border:1.5px solid #BFDBFE;border-radius:.9rem;padding:.75rem 1rem;cursor:pointer">
      <span style="font-size:2rem">${next.emoji}</span>
      <div style="flex:1;min-width:0">
        <p style="font-size:.7rem;font-weight:700;color:#1D4ED8">${T('path_next')}</p>
        <p style="font-weight:800;color:#1E293B;font-size:.95rem">${vocabTitle(next)}</p>
        <div style="margin-top:.3rem">${pb(topicPct(next),'#3B82F6')}</div>
      </div>
      <span style="color:#3B82F6;font-size:1.2rem">›</span>
    </div>
    ${inProgress.length?`<p style="font-size:.72rem;font-weight:700;color:#64748B;margin:.7rem 0 .35rem">${T('path_continue')}</p>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      ${inProgress.map(t=>`<button onclick="go('vocab-topic','${t.id}')" style="background:#fff;border:1.5px solid #E2E8F0;border-radius:.6rem;padding:.35rem .7rem;font-size:.8rem;font-weight:600;color:#334155;cursor:pointer">${t.emoji} ${vocabTitle(t)} · ${topicPct(t)}%</button>`).join('')}
    </div>`:''}
  </div>`;
}

function renderVocabList(){
  const soul5  = VOCAB.filter(t=>t.cat==='soul5').sort((a,b)=>(a.baustein||0)-(b.baustein||0));
  const soul6  = VOCAB.filter(t=>t.cat==='soul6').sort((a,b)=>(a.baustein||0)-(b.baustein||0));
  const basics = VOCAB.filter(t=>!t.cat||t.cat==='basics');

  const topicCard = t => {
    const vp = P.vocab[t.id]||{};
    const known = (vp.known||[]).length;
    const pct = t.words.length ? Math.round(known/t.words.length*100) : 0;
    return `<div onclick="go('vocab-topic','${t.id}')" class="card" style="cursor:pointer;transition:all .15s" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.06)'">
      <div style="font-size:2rem;margin-bottom:.5rem">${t.emoji}</div>
      <h3 style="font-weight:700;color:#1E293B;margin-bottom:.2rem;font-size:.95rem">${vocabTitle(t)}</h3>
      <p style="font-size:.75rem;color:#94A3B8;margin-bottom:.75rem">${t.words.length} ${T('label_words')}</p>
      <div style="display:flex;justify-content:space-between;font-size:.75rem;color:#94A3B8;margin-bottom:.25rem">
        <span>${known}/${t.words.length} ${T('label_learned')}</span>
        <span>${pct}%</span>
      </div>
      ${pb(pct,'#10B981')}
      ${(vp.tested)?`<span style="font-size:.7rem;color:#065F46;font-weight:700;margin-top:.4rem;display:block">${T('vocab_quiz_done_label')}</span>`:''}
    </div>`;
  };

  const catSection = (topics, label, icon, emptyMsg) => {
    if(!topics.length) return `<div style="margin-bottom:1.5rem">
      <h2 style="font-size:1rem;font-weight:800;color:#1E293B;margin-bottom:.75rem">${icon} ${label}</h2>
      <div class="card" style="color:#94A3B8;font-size:.88rem;padding:.75rem 1rem">${emptyMsg}</div>
    </div>`;
    return `<div style="margin-bottom:1.5rem">
      <h2 style="font-size:1rem;font-weight:800;color:#1E293B;margin-bottom:.75rem">${icon} ${label}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem">
        ${topics.map(topicCard).join('')}
      </div>
    </div>`;
  };

  const filteredVocab = VOCAB.filter(t=>vFilterMatch(t,_vFilter));
  const soul5topics  = filteredVocab.filter(t=>t.cat==='soul5').sort((a,b)=>(a.baustein||0)-(b.baustein||0));
  const soul6topics  = filteredVocab.filter(t=>t.cat==='soul6').sort((a,b)=>(a.baustein||0)-(b.baustein||0));
  const basicstopics = filteredVocab.filter(t=>t.cat==='basics'||!t.cat);
  const _q=(_vSearch||'').trim().toLowerCase();
  let searchHTML='';
  if(_q){
    const _esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const _hi=s=>{ if(!s) return ''; const i=s.toLowerCase().indexOf(_q); if(i<0) return _esc(s); return _esc(s.slice(0,i))+'<mark style="background:#FEF08A">'+_esc(s.slice(i,i+_q.length))+'</mark>'+_esc(s.slice(i+_q.length)); };
    const _rows=[];
    VOCAB.filter(t=>vFilterMatch(t,_vFilter)).forEach(t=>(t.words||[]).forEach(w=>{
      if((w.en&&w.en.toLowerCase().includes(_q))||(w.de&&w.de.toLowerCase().includes(_q))) _rows.push({t,w});
    }));
    if(!_rows.length){
      searchHTML='<div class="card" style="color:#94A3B8">'+(T('vsearch_none')||'Keine Treffer.')+'</div>';
    } else {
      searchHTML='<div class="card"><p style="font-weight:700;color:#1E293B;margin-bottom:.6rem;font-size:.9rem">'+_rows.length+' '+(T('vsearch_hits')||'Treffer')+'</p>'
        + _rows.slice(0,400).map(r=>'<div onclick="go(\'vocab-topic\',\''+r.t.id+'\')" style="display:flex;justify-content:space-between;gap:.6rem;padding:.5rem .25rem;border-bottom:1px solid #F1F5F9;cursor:pointer"><span style="font-weight:600;color:#1E293B;font-size:.88rem;flex:1">'+_hi(r.w.en)+'</span><span style="color:#64748B;font-size:.85rem;flex:1">'+_hi(r.w.de)+'</span><span style="color:#94A3B8;font-size:.72rem;white-space:nowrap">'+r.t.emoji+' '+vocabTitle(r.t)+'</span></div>').join('')
        + '</div>';
    }
  }
  const fBtn = (f,l) => `<button onclick="setVFilter('${f}')" style="padding:.4rem .85rem;border-radius:.75rem;font-size:.8rem;font-weight:600;cursor:pointer;border:none;background:${_vFilter===f?'#F97316':'#F1F5F9'};color:${_vFilter===f?'#fff':'#64748B'};margin:.2rem">${l}</button>`;
  return `<div class="space-y-4">
    <div><h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('vocab_title')}</h1>
    <p style="color:#64748B;margin-top:.3rem">${T('vocab_sub')}</p></div>

    <div class="card" style="background:#F8FAFC;border-color:#E2E8F0">
      <p style="font-size:.84rem;color:#475569;line-height:1.6">${T('vocab_intro')}</p>
    </div>

    <div class="card space-y-2">
      <input id="vsearch" type="search" value="${(_vSearch||'').replace(/"/g,'&quot;')}" oninput="setVSearch(this.value)" placeholder="${T('vsearch_ph')||'Wort suchen (Englisch oder Deutsch)…'}" style="width:100%;padding:.55rem .8rem;border:1.5px solid #E2E8F0;border-radius:.7rem;font-size:.9rem;outline:none">
      <p style="font-weight:600;color:#1E293B;font-size:.9rem">Filter</p>
      <div>${fBtn('all',T('vocab_all'))}${fBtn('soul5',T('vocab_k5'))}${fBtn('soul6',T('vocab_k6'))}${fBtn('basics',T('vocab_basics'))}${fBtn('onlysoul5',T('vocab_onlysoul5')||'SOUL 5')}${fBtn('onlysoul6',T('vocab_onlysoul6')||'SOUL 6')}</div>
    </div>

    ${_q? searchHTML : `
    ${_vFilter==='all'?vocabPathHTML():''}
    <details ${(!P.cls || P.cls===7 || _vFilter!=='all') ? 'open' : ''}>
      <summary style="cursor:pointer;font-size:.9rem;font-weight:700;color:#3B82F6;padding:.4rem 0">${T('path_all')} (${filteredVocab.length})</summary>
      <div style="margin-top:.75rem">
        ${soul5topics.length?catSection(soul5topics,T('lernweg_soul5'),'📘',T('vocab_coming_soon')):''}
        ${soul6topics.length?catSection(soul6topics,T('lernweg_soul6'),'📗',T('vocab_coming_soon')):''}
        ${basicstopics.length?catSection(basicstopics,T('lernweg_basics'),'🔤',''):''}
      </div>
    </details>`}

    <div onclick="go('vocab-test')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#F5F3FF;border-color:#C4B5FD">
      <span style="font-size:2rem">🎯</span>
      <div style="flex:1">
        <h3 style="font-weight:700;color:#1E293B">${T('vocab_random_test_title')}</h3>
        <p style="font-size:.8rem;color:#64748B">${T('vocab_random_test_sub')}</p>
      </div>
      <span style="color:#8B5CF6">›</span>
    </div>

    <div onclick="go('irreg','list')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#FFFBEB;border-color:#FDE68A">
      <span style="font-size:2rem">📋</span>
      <div style="flex:1">
        <h3 style="font-weight:700;color:#1E293B">${T('nav_irreg')}</h3>
        <p style="font-size:.8rem;color:#64748B">${T('vocab_irreg_sub')}</p>
      </div>
      <div>
        <div style="font-size:.8rem;font-weight:700;color:#92400E">${P.irreg.length}/30</div>
        ${pb(P.irreg.length/30*100,'#F59E0B')}
      </div>
      <span style="color:#FCD34D">›</span>
    </div>

    <div style="border-top:1px solid #F1F5F9;padding-top:1rem;margin-top:.25rem">
      <p style="font-size:.72rem;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">${T('games_bonus_label')}</p>
      <div onclick="go('spiele')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#FFF7ED;border-color:#FED7AA">
        <span style="font-size:2rem">🎮</span>
        <div style="flex:1">
          <h3 style="font-weight:700;color:#1E293B">${T('nav_games')}</h3>
          <p style="font-size:.8rem;color:#64748B">${T('grammar_games_sub')}</p>
        </div>
        <span style="color:#F97316">›</span>
      </div>
      <div onclick="go('dict-skills')" class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem;background:#ECFEFF;border-color:#A5F3FC;margin-top:.5rem">
        <span style="font-size:2rem">📖</span>
        <div style="flex:1">
          <h3 style="font-weight:700;color:#1E293B">${T('dict_title')||'Wörterbucharbeit'}</h3>
          <p style="font-size:.8rem;color:#64748B">${T('dict_sub')||'So findest du Wörter im Wörterbuch.'}</p>
        </div>
        <span style="color:#06B6D4">›</span>
      </div>
    </div>
  </div>`;
}

function renderVocabTopic(id, mode){
  const t = VOCAB.find(v=>v.id===id);
  if(!t) return `<p>${T('error_not_found')}</p>`;
  mode = mode||'list';
  const vp = P.vocab[id]||{known:[]};
  const known = new Set(vp.known||[]);

  const tabBtn = (m, label) => `<button onclick="startVocabMode('${id}','${m}')" style="padding:.5rem 1rem;border-radius:.75rem;font-size:.85rem;font-weight:600;cursor:pointer;border:none;background:${mode===m?'#3B82F6':'#F1F5F9'};color:${mode===m?'#fff':'#64748B'};transition:all .15s">${label}</button>`;
  const tabBtn2 = (m, label) => tabBtn(m, label);

  let content = '';
  if(mode==='list') content = renderVocabList2(t, known, id);
  else if(mode==='flashcard') content = renderFlashcard(t, id);
  else if(mode==='quiz') content = renderVocabQuiz(t, id);
  else if(mode==='type') content = renderVocabType(t, id);
  else if(mode==='listen') content = renderVocabListen(t, id);
  else if(mode==='speak') content = renderVocabSpeak(t, id);

  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
      <button onclick="go('vocabulary')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">${T('irreg_back')}</button>
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:#1E293B">${t.emoji} ${t.title}</h1>
        <p style="color:#64748B;font-size:.85rem">${t.words.length} ${T('label_words')}</p>
      </div>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      ${tabBtn('list',T('vocab_tab_list'))}
      ${tabBtn('flashcard',T('vocab_tab_fc'))}
      ${tabBtn('quiz','🧪 Quiz')}
      ${tabBtn('type',T('vocab_tab_write'))}
      ${tabBtn('listen',T('vocab_tab_listen'))}
      ${srAvailable()?tabBtn('speak',T('vocab_tab_speak')):''}
      <span style="margin-left:auto;display:flex;gap:.5rem;align-items:center">
        ${gamesMenu([
          ...(t.words.length>=4 ? [{label:'🃏 Memory', onclick:`go('vocab-memory','${id}')`}] : []),
          {label:'⚡ Quick-Fire', onclick:`go('grammar-quickfire','v:${id}')`},
          {label:'🎯 '+T('hm_title').replace(/^\S+\s/,''), onclick:`startHangman('${id}');go('hangman','${id}')`},
          {label:T('vocab_all_games'), onclick:`go('spiele')`}
        ])}
        <button class="chip-btn" onclick="printVocab('${id}')">🖨️ ${T('vocab_print')||'Drucken'}</button>
      </span>
    </div>
    ${content}
  </div>`;
}


// ── Web Speech API ──
// Text fürs Vorlesen aufbereiten: Die Stimme soll bei "was / were" nicht
// "was slash were" sagen, sondern eine kurze Pause machen.
function ttsClean(text){
  return String(text||'')
    .replace(/\s*\/\s*/g, ', ')        // was/were → was, were
    .replace(/\s+[–—-]\s+/g, ', ')     // begin – began → begin, began
    .replace(/\s*\((sb|sth|so)\.?\)/gi, '') // (sb.) / (sth.) nicht mitlesen
    .replace(/\bsb\.?(?=\s|$)/g, 'somebody').replace(/\bsth\.?(?=\s|$)/g, 'something')
    .replace(/_{2,}/g, ' ');
}
function speak(text, lang){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(ttsClean(text));
  u.lang = lang || 'en-GB';
  u.rate = 0.88;
  window.speechSynthesis.speak(u);
}
// Unregelmäßige Verben im Dreischritt: begin – began – begun (mit Pausen).
function speakForms(i){
  const v = IRREG[i]; if(!v || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  [v.inf, v.past, v.pp].forEach(part=>{
    const u = new SpeechSynthesisUtterance(ttsClean(part));
    u.lang = 'en-GB'; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  });
}

// Ein Knopf „🎮 Spiele" statt einer Reihe einzelner Spiele-Knöpfe.
// items = [{label, onclick}]
function gamesMenu(items){
  return `<details class="menu">
    <summary class="chip-btn">🎮 ${T('nav_games')} ▾</summary>
    <div class="menu-pop">${items.map(it=>`<button onclick="${it.onclick}">${it.label}</button>`).join('')}</div>
  </details>`;
}
document.addEventListener('click', e=>{
  document.querySelectorAll('details.menu[open]').forEach(d=>{
    if(!d.contains(e.target) || e.target.closest('.menu-pop button')) d.removeAttribute('open');
  });
});
function speakBtn(text, lang){
  const l = lang || 'en-GB';
  return `<button onclick="event.stopPropagation();speak('${text}','${l}')" title="Aussprache" style="background:none;border:none;cursor:pointer;font-size:.95rem;padding:.1rem .25rem;color:#CBD5E1;line-height:1" onmouseover="this.style.color='#3B82F6'" onmouseout="this.style.color='#CBD5E1'">🔊</button>`;
}

function startVocabMode(id, mode){
  if(mode==='flashcard'){
    // Force reshuffle: reset _fc so renderFlashcard sees a new topic and reshuffles
    _fc = {id:'', idx:0, flipped:false, direction:(_fc&&_fc.direction)||'en-de', words:[]};
  } else if(mode==='quiz'){
    if(_vqState[id]) _vqState[id] = {};
  } else if(mode==='type'){
    if(_vtState[id]) _vtState[id] = {};
  } else if(mode==='listen'){
    if(_vlState[id]) _vlState[id] = {};
  } else if(mode==='speak'){
    if(_vsState[id]) _vsState[id] = {};
  }
  go('vocab-topic', id, mode);
}

// ═══════════════════════════════════════════════
// DIKTAT-MODUS: Hören & Tippen (TTS spricht, Schüler schreibt)
// ═══════════════════════════════════════════════
let _vlState = {};
function listenableWords(t){
  // Für das Diktat eignen sich kurze Einträge (keine langen Classroom-Phrasen)
  const short = t.words.filter(w=>w.en.replace(/^to\s+/,'').length<=20 && !/[?!.,]/.test(w.en));
  return short.length>=5 ? short : t.words;
}
function renderVocabListen(t, id){
  if(!_vlState[id] || !_vlState[id].active){
    const pool = [...listenableWords(t)].sort(()=>Math.random()-.5).slice(0,12);
    _vlState[id] = {words:pool, idx:0, score:0, checked:false, lastRight:false, val:'', done:false, active:true};
  }
  const qs = _vlState[id];
  if(qs.done){
    const pct = Math.round(qs.score/Math.max(1,qs.answered||qs.words.length)*100);
    return `<div class="card" style="text-align:center;padding:2rem">
      <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
      <div style="font-size:2.2rem;font-weight:800;color:${pct>=80?'#10B981':'#3B82F6'}">${pct}%</div>
      ${pb(pct,'#0EA5E9')}
      <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1rem">
        <button class="btn-secondary" onclick="_vlState['${id}']={};go('vocab-topic','${id}','listen')">${T('btn_try_again')}</button>
        <button class="btn-primary" onclick="go('vocab-topic','${id}','list')">${T('vocab_to_list')}</button>
      </div>
    </div>`;
  }
  const w = qs.words[qs.idx];
  return `<div class="card space-y-4" style="text-align:center">
    <div style="display:flex;justify-content:space-between;font-size:.85rem;color:#94A3B8">
      <span>${qs.idx+1}/${qs.words.length}</span><span style="color:#10B981;font-weight:600">${qs.score} ${T('ex_correct_score')}</span>
    </div>
    ${pb((qs.idx/qs.words.length)*100,'#0EA5E9')}
    <p style="font-size:.85rem;color:#64748B">${T('listen_prompt')}</p>
    <button onclick="speak('${escQ(w.en)}','en-GB')" style="font-size:2.6rem;background:#EFF6FF;border:2px solid #93C5FD;border-radius:50%;width:5rem;height:5rem;cursor:pointer" title="${T('listen_play')}">🔊</button>
    <div>
      <input id="vlisten-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" ${qs.checked?'disabled':''} value="${(qs.val||'').replace(/"/g,'&quot;')}"
        onkeydown="if(event.key==='Enter'&&!_vlState['${id}'].checked)checkVocabListen('${id}')"
        style="width:100%;max-width:20rem;border:2px solid ${qs.checked?(qs.lastRight?'#6EE7B7':'#FCA5A5'):'#E2E8F0'};border-radius:.75rem;padding:.6rem .8rem;font-size:1rem;text-align:center;outline:none;box-sizing:border-box" placeholder="${T('listen_ph')}">
    </div>
    ${qs.checked
      ? `<div class="${qs.lastRight?'feedback-ok':'feedback-err'}" style="text-align:left">${qs.lastRight?T('feedback_ok'):T('feedback_wrong')+' <strong>'+w.en+'</strong>'}<br><span style="font-size:.82rem;color:#64748B">${w.de}</span></div>
         <button class="btn-primary" onclick="nextVocabListen('${id}')">${qs.idx+1<qs.words.length?T('btn_next'):T('ex_show_result')}</button>`
      : `<button class="btn-primary" onclick="checkVocabListen('${id}')">${T('btn_check')}</button>`}
  </div>`;
}
function checkVocabListen(id){
  const qs = _vlState[id];
  const inp = document.getElementById('vlisten-input');
  qs.val = inp ? inp.value.trim() : '';
  const w = qs.words[qs.idx];
  const target = normalizeVocab(w.en);
  const given = normalizeVocab(qs.val);
  const right = given===target || (given.length>0 && vocabEditDistance(target, given) <= vocabAllowedTypos(target));
  qs.checked = true; qs.lastRight = right;
  qs.answered = (qs.answered||0)+1;
  if(right) qs.score++;
  srsUpdate(id, w, right);
  go('vocab-topic', id, 'listen');
}
function nextVocabListen(id){
  const qs = _vlState[id];
  if(!qs.lastRight) qs.words.push(qs.words[qs.idx]);
  qs.idx++; qs.checked=false; qs.val='';
  if(qs.idx >= qs.words.length){ qs.done = true; addXP(15); checkBadges(); save(); }
  go('vocab-topic', id, 'listen');
  setTimeout(()=>{ const i=document.getElementById('vlisten-input'); if(i) i.focus(); },0);
}

// ═══════════════════════════════════════════════
// AUSSPRACHE-TRAINING (Web Speech Recognition, Chrome/Edge)
// ═══════════════════════════════════════════════
function srAvailable(){ return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
let _vsState = {};
let _srInstance = null;
function renderVocabSpeak(t, id){
  if(!srAvailable()){
    return `<div class="card" style="text-align:center;padding:2rem"><p style="font-size:2rem">🎤</p><p style="color:#64748B;font-size:.9rem">${T('speak_not_supported')}</p></div>`;
  }
  if(!_vsState[id] || !_vsState[id].active){
    const pool = [...listenableWords(t)].sort(()=>Math.random()-.5).slice(0,10);
    _vsState[id] = {words:pool, idx:0, score:0, done:false, listening:false, heard:'', result:null, active:true};
  }
  const qs = _vsState[id];
  if(qs.done){
    const pct = Math.round(qs.score/Math.max(1,qs.words.length)*100);
    return `<div class="card" style="text-align:center;padding:2rem">
      <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
      <div style="font-size:2.2rem;font-weight:800;color:${pct>=80?'#10B981':'#3B82F6'}">${qs.score}/${qs.words.length}</div>
      ${pb(pct,'#8B5CF6')}
      <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1rem">
        <button class="btn-secondary" onclick="_vsState['${id}']={};go('vocab-topic','${id}','speak')">${T('btn_try_again')}</button>
        <button class="btn-primary" onclick="go('vocab-topic','${id}','list')">${T('vocab_to_list')}</button>
      </div>
    </div>`;
  }
  const w = qs.words[qs.idx];
  return `<div class="card space-y-4" style="text-align:center">
    <div style="display:flex;justify-content:space-between;font-size:.85rem;color:#94A3B8">
      <span>${qs.idx+1}/${qs.words.length}</span><span style="color:#10B981;font-weight:600">${qs.score} ${T('ex_correct_score')}</span>
    </div>
    ${pb((qs.idx/qs.words.length)*100,'#8B5CF6')}
    <p style="font-size:.85rem;color:#64748B">${T('speak_prompt')}</p>
    <p style="font-size:1.5rem;font-weight:800;color:#1E293B">${w.en} ${speakBtn(escQ(w.en))}</p>
    <p style="font-size:.85rem;color:#94A3B8">${w.de}</p>
    <button id="vs-mic" onclick="startSpeakCheck('${id}')" ${qs.listening?'disabled':''}
      style="font-size:2.4rem;background:${qs.listening?'#FEE2E2':'#F5F3FF'};border:2px solid ${qs.listening?'#F87171':'#C4B5FD'};border-radius:50%;width:5rem;height:5rem;cursor:pointer">${qs.listening?'⏺️':'🎤'}</button>
    <p style="font-size:.78rem;color:#94A3B8">${qs.listening?T('speak_listening'):T('speak_tap_mic')}</p>
    ${qs.result!==null ? `<div class="${qs.result?'feedback-ok':'feedback-info'}" style="text-align:left">
        ${qs.result?T('speak_great'):T('speak_heard')+' „'+(qs.heard||'–')+'“ – '+T('speak_try_again')}
      </div>
      <div style="display:flex;gap:.6rem;justify-content:center">
        ${!qs.result?`<button class="btn-secondary" onclick="startSpeakCheck('${id}')">🎤 ${T('btn_try_again')}</button>`:''}
        <button class="btn-primary" onclick="nextVocabSpeak('${id}')">${qs.idx+1<qs.words.length?T('btn_next'):T('ex_show_result')}</button>
      </div>` : ''}
  </div>`;
}
function startSpeakCheck(id){
  const qs = _vsState[id];
  if(qs.listening) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  try{ if(_srInstance) _srInstance.abort(); }catch(e){}
  const rec = new SR();
  _srInstance = rec;
  rec.lang = 'en-GB'; rec.interimResults = false; rec.maxAlternatives = 5;
  qs.listening = true; qs.result = null; qs.heard = '';
  go('vocab-topic', id, 'speak');
  const target = normalizeVocab(qs.words[qs.idx].en);
  rec.onresult = (e)=>{
    const alts = Array.from(e.results[0]).map(r=>normalizeVocab(r.transcript||''));
    qs.heard = (e.results[0][0].transcript||'').trim();
    const tol = vocabAllowedTypos(target);
    const hit = alts.some(a => a===target || a.includes(target) || target.includes(a) && a.length>2 || vocabEditDistance(target,a)<=tol);
    qs.listening = false;
    if(qs.result===null){ if(hit) qs.score++; qs.result = hit; }
    if(hit) srsUpdate(id, qs.words[qs.idx], true);
    go('vocab-topic', id, 'speak');
  };
  rec.onerror = (e)=>{
    qs.listening = false;
    qs.result = false;
    qs.heard = e.error==='not-allowed' ? T('speak_mic_denied') : '';
    go('vocab-topic', id, 'speak');
  };
  rec.onend = ()=>{
    if(qs.listening){ qs.listening=false; if(qs.result===null){ qs.result=false; } go('vocab-topic', id, 'speak'); }
  };
  try{ rec.start(); }catch(e){ qs.listening=false; }
}
function nextVocabSpeak(id){
  const qs = _vsState[id];
  qs.idx++; qs.result=null; qs.heard='';
  if(qs.idx >= qs.words.length){ qs.done = true; addXP(15); checkBadges(); save(); }
  go('vocab-topic', id, 'speak');
}

function renderVocabList2(t, known, id){
  return `<div class="card">
    <div style="display:flex;justify-content:space-between;margin-bottom:.4rem">
      <p style="font-weight:600;color:#1E293B">${known.size}/${t.words.length} ${T('label_learned')}</p>
      <button onclick="markAllKnown('${id}')" style="font-size:.8rem;color:#3B82F6;background:none;border:none;cursor:pointer">${T('vocab_all_learned')}</button>
    </div>
    <details style="margin-bottom:1rem;background:#F0F9FF;border:1px solid #BAE6FD;border-radius:.6rem;padding:.5rem .75rem">
      <summary style="cursor:pointer;font-size:.78rem;font-weight:700;color:#0369A1">ℹ️ ${T('box_expl_title')}</summary>
      <p style="font-size:.78rem;color:#0C4A6E;line-height:1.6;margin-top:.4rem">${T('box_expl_body')}</p>
    </details>
    <div style="display:flex;flex-direction:column;gap:.4rem">
      ${t.words.map((w,i)=>{
        const isKnown = known.has(i);
        const srsE = (P.srs||{})[id+':'+i];
        const box = srsE ? (srsE.b||0) : 0;
        return `<div id="vw-${id}-${i}" style="display:flex;flex-direction:column;padding:.6rem .75rem;border-radius:.75rem;background:${isKnown?'#ECFDF5':'#F8FAFC'};cursor:pointer;transition:all .15s" onclick="toggleKnown('${id}',${i})">
          <div style="display:flex;align-items:flex-start;gap:.6rem;flex-wrap:wrap">
            <span class="vw-status" style="font-size:1.1rem;flex-shrink:0">${isKnown?'✅':'⭕'}</span>
            <span style="display:inline-flex;align-items:center;gap:.15rem;flex:1 1 9rem;min-width:0">
              <span style="font-weight:600;color:#1E293B;overflow-wrap:anywhere;word-break:break-word">${w.en}</span>
              ${speakBtn(escQ(w.en))}
            </span>
            <span style="color:#64748B;font-size:.88rem;flex:1 1 7rem;text-align:right;overflow-wrap:anywhere;word-break:break-word">${w.de}</span>
            ${box>0?`<span title="${T('review_box')} ${box}/5" style="font-size:.62rem;font-weight:800;flex-shrink:0;align-self:center;color:${box>=4?'#059669':'#0369A1'};background:${box>=4?'#ECFDF5':'#F0F9FF'};border:1px solid ${box>=4?'#6EE7B7':'#BAE6FD'};border-radius:99px;padding:.08rem .45rem;white-space:nowrap">${T('review_box')} ${box}/5</span>`:''}
          </div>
          ${w.example?`<div style="font-size:.75rem;color:#94A3B8;font-style:italic;margin-top:.25rem;padding-left:1.9rem;line-height:1.4;overflow-wrap:anywhere">${w.example}</div>`:''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function toggleKnown(id, idx){
  if(!P.vocab[id]) P.vocab[id] = {known:[]};
  const known = P.vocab[id].known;
  const pos = known.indexOf(idx);
  if(pos>=0) known.splice(pos,1); else known.push(idx);
  save();
  const isKnown = pos<0;
  const el = document.getElementById(`vw-${id}-${idx}`);
  if(el){
    el.style.background = isKnown?'#ECFDF5':'#F8FAFC';
    const st = el.querySelector('.vw-status');
    if(st) st.textContent = isKnown?'✅':'⭕';
  }
}

function markAllKnown(id){
  const t = VOCAB.find(v=>v.id===id);
  if(!t) return;
  if(!P.vocab[id]) P.vocab[id] = {known:[]};
  P.vocab[id].known = t.words.map((_,i)=>i);
  save();
  go('vocab-topic',id,'list');
}

let _fc = {id:'', idx:0, flipped:false, direction:'en-de', words:[]};
function renderFlashcard(t, id){
  const vp = P.vocab[id]||{known:[]};
  const known = new Set(vp.known||[]);
  // On topic change: shuffle and store origIdx for toggleKnown
  if(_fc.id !== id){
    const shuffled = [...t.words].map((w,origIdx)=>({...w,origIdx})).sort(()=>Math.random()-.5);
    _fc = {id, idx:0, flipped:false, direction:_fc.direction||'en-de', words:shuffled};
  }
  if(_fc.done){
    const total = t.words.length;
    const learned = (vp.known||[]).length;
    const pct = total?Math.round(learned/total*100):0;
    return `<div class="card space-y-4" style="text-align:center;padding:2rem 1.25rem">
      <div style="font-size:2.5rem">${pct>=80?'🏆':pct>=50?'🎉':'📘'}</div>
      <h2 style="font-size:1.3rem;font-weight:800;color:#1E293B">${T('fc_done_title')}</h2>
      <p style="color:#64748B;font-size:.95rem">${T('fc_done_sub_pre')}${total}${T('fc_done_sub_mid')}${learned}${T('fc_done_sub_post')}</p>
      <div style="height:.6rem;background:#E2E8F0;border-radius:1rem;overflow:hidden;max-width:18rem;margin:.5rem auto">
        <div style="height:100%;width:${pct}%;background:#10B981;border-radius:1rem"></div>
      </div>
      <p style="font-size:1.4rem;font-weight:800;color:#10B981">${pct}%</p>
      ${(()=>{ const r=Object.values(_fc.rated||{}); if(!r.length) return ''; const yes=r.filter(x=>x).length, no=r.length-yes;
        return `<p style="font-size:.9rem;color:#475569;font-weight:600">✓ ${yes} ${T('fc_know')} · ↻ ${no} ${T('fc_again')}</p>`; })()}
      <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-top:.5rem">
        ${Object.values(_fc.rated||{}).some(x=>x===false)?`<button class="btn-primary" style="background:#F59E0B" onclick="fcRestart('${id}',true)">↻ ${T('fc_done_missed').replace('{n}', Object.values(_fc.rated).filter(x=>x===false).length)}</button>`:''}
        <button class="${Object.values(_fc.rated||{}).some(x=>x===false)?'btn-secondary':'btn-primary'}" onclick="fcRestart('${id}')">${T('fc_done_again')}</button>
        <button class="btn-secondary" onclick="startVocabMode('${id}','quiz')">${T('fc_done_quiz')}</button>
        <button class="btn-secondary" onclick="go('vocabulary')">${T('fc_done_back')}</button>
      </div>
    </div>`;
  }
  const i = _fc.idx;
  const w = _fc.words[i];
  const origIdx = w.origIdx !== undefined ? w.origIdx : i;
  const dir = _fc.direction || 'en-de';
  const frontText = dir === 'en-de' ? w.en : w.de;
  const backText  = dir === 'en-de' ? w.de : w.en;
  const frontColor = dir === 'en-de' ? '#1E40AF' : '#064E3B';
  return `<div class="card space-y-4">
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;color:#94A3B8">
      <span>${i+1}/${_fc.words.length}</span>
      <button onclick="toggleFCDir('${id}')" style="font-size:.75rem;background:#F1F5F9;border:none;border-radius:.5rem;padding:.25rem .6rem;cursor:pointer;color:#475569;font-weight:600">
        ${dir==='en-de'?'🇬🇧→🇩🇪':'🇩🇪→🇬🇧'}
      </button>
      <span>${known.size} ${T('label_learned')}</span>
    </div>
    <div class="flashcard card fc-swipe" id="fc-card" onclick="fcCardClick()" onpointerdown="fcDown(event)" onpointermove="fcMove(event)" onpointerup="fcUp(event,'${id}',${origIdx})" onpointercancel="fcCancel()" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-color:#BFDBFE;min-height:10rem">
      ${known.has(origIdx)?`<span class="fc-badge">✅ ${T('label_learned')}</span>`:''}
      <span class="fc-stamp fc-stamp-yes">✓ ${T('fc_know')}</span><span class="fc-stamp fc-stamp-no">↻ ${T('fc_again')}</span>
      <div style="display:flex;align-items:center;justify-content:center;gap:.5rem">
        <p style="font-size:1.4rem;font-weight:700;color:${frontColor};text-align:center" id="fc-front">${frontText}</p>
        ${dir==='en-de'?speakBtn(escQ(frontText)):''}
      </div>
      ${dir==='en-de' && w.example ? `
      <button onclick="event.stopPropagation();this.style.display='none';document.getElementById('fc-example').style.display='block'"
        style="margin-top:.5rem;background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;border-radius:.6rem;padding:.3rem .7rem;font-size:.78rem;font-weight:600;cursor:pointer">💡 ${T('fc_hint_btn')}</button>
      <p id="fc-example" style="display:none;font-size:.85rem;color:#92400E;font-style:italic;margin-top:.5rem;text-align:center;background:#FFFBEB;border-radius:.5rem;padding:.4rem .7rem">📝 ${w.example}</p>` : ''}
      <p style="font-size:1rem;color:#3B82F6;margin-top:.5rem" id="fc-back-hint">${T('vocab_flip_hint')}</p>
      <div style="display:none" id="fc-back">
        <p style="font-size:1.3rem;color:#64748B;text-align:center">${backText}</p>
        ${dir!=='en-de' && w.example?`<p style="font-size:.82rem;color:#94A3B8;font-style:italic;margin-top:.5rem;text-align:center">📝 ${w.example}</p>`:''}
      </div>
    </div>
    <div id="fc-ask" class="fc-actions">
      <button class="btn-primary fc-flip" onclick="flipCard()">🔄 ${T('fc_flip')}</button>
    </div>
    <div id="fc-rate" class="fc-actions" style="display:none">
      <button class="fc-no" onclick="fcAnswer('${id}',${origIdx},false)"><b>↻</b><span>${T('fc_again')}</span></button>
      <button class="fc-yes" onclick="fcAnswer('${id}',${origIdx},true)"><b>✓</b><span>${T('fc_know')}</span></button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">
      <button class="chip-btn" onclick="fcNav(-1)" ${i===0?'disabled':''}>${T('vocab_fc_back')}</button>
      <p style="font-size:.75rem;color:#94A3B8;text-align:right">${T('fc_swipe_hint')}</p>
    </div>
  </div>`;
}

// Flashcard-Selbsteinschätzung zählt jetzt auch in die Wiederholungs-Boxen:
// "Gelernt" = ein Fach höher, "Noch üben" = zurück in Fach 1.
function fcMark(id, origIdx){
  const t = VOCAB.find(v=>v.id===id);
  const wasKnown = !!(P.vocab[id] && (P.vocab[id].known||[]).includes(origIdx));
  toggleKnown(id, origIdx);
  if(t && t.words[origIdx]) srsUpdate(id, t.words[origIdx], !wasKnown);
  renderFCStatus(origIdx, id);
}

function flipCard(){
  const front = document.getElementById('fc-front');
  const back = document.getElementById('fc-back');
  const hint = document.getElementById('fc-back-hint');
  const ask = document.getElementById('fc-ask'), rate = document.getElementById('fc-rate');
  if(back.style.display==='none'){
    back.style.display='block'; hint.style.display='none'; front.style.opacity='.3';
    // Erst nach dem Umdrehen kann man sich bewerten.
    if(ask) ask.style.display='none'; if(rate) rate.style.display='flex';
    _fc.flipped = true;
  } else {
    back.style.display='none'; hint.style.display='block'; front.style.opacity='1';
  }
}

// Karteikarte bewerten: „Gewusst" hakt das Wort ab (✅) und schiebt es im
// Wiederholungsplan ein Fach höher, „Noch üben" nimmt den Haken weg und
// legt es zurück in Fach 1. Danach kommt automatisch die nächste Karte.
function fcAnswer(id, origIdx, knew){
  const t = VOCAB.find(v=>v.id===id);
  if(!P.vocab[id]) P.vocab[id] = {known:[]};
  if(!P.vocab[id].known) P.vocab[id].known = [];
  const known = P.vocab[id].known, pos = known.indexOf(origIdx);
  if(knew && pos < 0) known.push(origIdx);
  if(!knew && pos >= 0) known.splice(pos, 1);
  if(t && t.words[origIdx]) srsUpdate(id, t.words[origIdx], knew); else save();
  if(!_fc.rated) _fc.rated = {};
  _fc.rated[origIdx] = knew;
  const card = document.getElementById('fc-card');
  if(card){ card.classList.add(knew ? 'fc-out-yes' : 'fc-out-no'); }
  const last = _fc.idx >= _fc.words.length-1;
  setTimeout(()=>{
    if(last){ addXP(10); checkBadges(); }
    fcNav(1);
  }, 220);
}
// Wischen: nach rechts = gewusst, nach links = noch üben (nur nach dem Umdrehen).
let _fcDrag = null, _fcSwiped = false;
function fcDown(e){ if(e.target.closest('button')) return; _fcDrag = {x:e.clientX, dx:0}; }
function fcMove(e){
  if(!_fcDrag) return;
  _fcDrag.dx = e.clientX - _fcDrag.x;
  const card = document.getElementById('fc-card'); if(!card || Math.abs(_fcDrag.dx) < 8) return;
  card.style.transition = 'none';
  card.style.transform = `translateX(${_fcDrag.dx}px) rotate(${_fcDrag.dx/28}deg)`;
  card.classList.toggle('fc-lean-yes', _fc.flipped && _fcDrag.dx > 40);
  card.classList.toggle('fc-lean-no', _fc.flipped && _fcDrag.dx < -40);
}
function fcUp(e, id, origIdx){
  if(!_fcDrag) return;
  const dx = _fcDrag.dx; _fcDrag = null;
  const card = document.getElementById('fc-card');
  if(Math.abs(dx) < 8) return; // normales Antippen → der Klick dreht um
  _fcSwiped = true; setTimeout(()=>{ _fcSwiped = false; }, 60);
  if(card){ card.style.transition = ''; card.classList.remove('fc-lean-yes','fc-lean-no'); }
  if(Math.abs(dx) > 70 && _fc.flipped){ fcAnswer(id, origIdx, dx > 0); return; }
  if(card) card.style.transform = '';
  if(Math.abs(dx) > 70 && !_fc.flipped) flipCard();
}
function fcCancel(){
  _fcDrag = null;
  const card = document.getElementById('fc-card');
  if(card){ card.style.transition = ''; card.style.transform = ''; card.classList.remove('fc-lean-yes','fc-lean-no'); }
}
function fcCardClick(){ if(_fcSwiped) return; flipCard(); }

function fcNav(dir){
  if(!_fc.words.length) return;
  // Advancing past the last card → show completion summary
  if(dir>0 && _fc.idx >= _fc.words.length-1){
    _fc.done = true;
    go('vocab-topic',_fc.id,'flashcard');
    return;
  }
  _fc.idx = Math.max(0, Math.min(_fc.words.length-1, _fc.idx+dir));
  _fc.flipped = false;
  go('vocab-topic',_fc.id,'flashcard');
}
// onlyMissed = true: nur die Karten wiederholen, die eben „Noch üben" waren.
function fcRestart(id, onlyMissed){
  const all = [...(VOCAB.find(v=>v.id===id)||{words:[]}).words].map((w,origIdx)=>({...w,origIdx}));
  const rated = _fc.rated || {};
  const pick = onlyMissed ? all.filter(w=>rated[w.origIdx] === false) : all;
  _fc.done = false; _fc.idx = 0; _fc.flipped = false; _fc.rated = {};
  _fc.words = (pick.length ? pick : all).sort(()=>Math.random()-.5);
  go('vocab-topic',id,'flashcard');
}
function toggleFCDir(id){
  _fc.direction = (_fc.direction||'en-de') === 'en-de' ? 'de-en' : 'en-de';
  _fc.flipped = false;
  go('vocab-topic', id, 'flashcard');
}

function renderFCStatus(idx, id){
  const vp = P.vocab[id]||{known:[]};
  const known = new Set(vp.known||[]);
  const btn = document.getElementById('fc-known-btn');
  if(btn){
    btn.style.background = known.has(idx)?'#ECFDF5':'#F1F5F9';
    btn.style.color = known.has(idx)?'#065F46':'#64748B';
    btn.textContent = known.has(idx)?T('vocab_fc_learned'):T('vocab_fc_practice');
  }
}

let _vqState = {};
function renderVocabQuiz(t, id){
  if(!_vqState[id] || !_vqState[id].active){
    const shuffled = [...t.words].sort(()=>Math.random()-.5);
    _vqState[id] = {words: shuffled, idx:0, score:0, answers:[], active:true, done:false};
  }
  const qs = _vqState[id];
  if(qs.done) return renderVocabQuizDone(t, id);
  const w = qs.words[qs.idx];
  // Falsche Optionen: keine doppelten deutschen Übersetzungen zulassen
  // (manche Themen haben Synonyme mit gleicher Übersetzung)
  const seenDe = new Set([w.de]);
  const wrong = [...t.words].sort(()=>Math.random()-.5).filter(x=>{
    if(x.en===w.en || seenDe.has(x.de)) return false;
    seenDe.add(x.de); return true;
  }).slice(0,3);
  const opts = [...wrong, w].sort(()=>Math.random()-.5);

  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between">
      <span style="font-size:.85rem;color:#94A3B8">${qs.idx+1}/${qs.words.length}</span>
      <span style="font-size:.85rem;color:#10B981;font-weight:600">${qs.score} ${T('ex_correct_score')}</span>
    </div>
    ${pb((qs.idx/qs.words.length)*100,'#10B981')}
    <div style="display:flex;align-items:center;justify-content:center;gap:.4rem;padding:1rem 0">
      <p style="font-weight:700;color:#1E293B;font-size:1.1rem">${w.en}</p>
      ${speakBtn(escQ(w.en))}
    </div>
    <div id="vq-opts">
      ${opts.map((o,oi)=>`<button class="opt-btn" id="vqopt-${oi}" onclick="pickVQ(${oi},'${escQ(o.de)}','${escQ(w.de)}')">${o.de}</button>`).join('')}
    </div>
    <div id="vq-feedback"></div>
  </div>`;
}

function pickVQ(oi, chosen, correct){
  const isRight = chosen===correct;
  document.querySelectorAll('#vq-opts .opt-btn').forEach(b=>b.disabled=true);
  document.getElementById('vqopt-'+oi).className = isRight?'opt-btn opt-correct':'opt-btn opt-wrong';
  if(!isRight){
    const opts = document.querySelectorAll('#vq-opts .opt-btn');
    opts.forEach(b=>{ if(b.textContent.trim()===correct) b.className='opt-btn opt-correct'; });
  }
  const qs = _vqState[_state.sub];
  if(isRight) qs.score++;
  qs.answers.push({chosen,correct,right:isRight});
  srsUpdate(_state.sub, qs.words[qs.idx], isRight);
  const fb = document.getElementById('vq-feedback');
  fb.innerHTML = (isRight?`<div class="feedback-ok">${T('feedback_ok')}</div>`:`<div class="feedback-err">${T('feedback_wrong')} <strong>${correct}</strong></div>`)
    + `<button class="btn-primary" style="margin-top:.75rem" onclick="nextVQ()">${T('btn_next')}</button>`;
}

function nextVQ(){
  const id = _state.sub;
  const qs = _vqState[id];
  const lastAns = qs.answers[qs.answers.length-1];
  if(lastAns && !lastAns.right){
    // Mit Zurücklegen: falsche Wörter ans Ende
    qs.words.push(qs.words[qs.idx]);
    if(!P.errors)P.errors={};const _vek='vocab:'+id;P.errors[_vek]=(P.errors[_vek]||0)+1;
  }
  qs.idx++;
  if(qs.idx >= qs.words.length){
    qs.done = true;
    P.vocab[id] = P.vocab[id]||{known:[]};
    P.vocab[id].tested = true;
    P.vocab[id].quizScore = Math.round(qs.score/Math.max(1,qs.answers.length)*100);
    addXP(20);
    checkBadges();
    save();
  }
  go('vocab-topic',id,'quiz');
}

function renderVocabQuizDone(t, id){
  const qs = _vqState[id];
  const pct = Math.round(qs.score/qs.words.length*100);
  return `<div class="card space-y-5" style="text-align:center">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B">${pct>=80?T('ex_result_excellent'):pct>=60?T('ex_result_good'):T('ex_result_practice')}</h2>
    <div style="font-size:2.5rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${pct}%</div>
    ${pb(pct)}
    <div style="display:flex;gap:.75rem;justify-content:center">
      <button class="btn-secondary" onclick="_vqState['${id}']={done:false};go('vocab-topic','${id}','quiz')">${T('btn_try_again')}</button>
      <button class="btn-primary" onclick="go('vocab-topic','${id}','list')">${T('vocab_to_list')}</button>
    </div>
  </div>`;
}



let _vtState = {};
function renderVocabType(t, id){
  if(!_vtState[id] || !_vtState[id].active){
    const shuffled = [...t.words].sort(()=>Math.random()-.5);
    _vtState[id] = {words: shuffled, idx:0, score:0, checked:false, val:'', direction:'en-de', done:false, active:true};
  }
  const qs = _vtState[id];
  if(qs.done) return renderVocabTypeDone(t, id);
  const w = qs.words[qs.idx];
  const isDE = qs.direction === 'en-de';
  const prompt = isDE ? w.en : w.de;
  const correct = isDE ? w.de : w.en;

  return `<div class="card space-y-5">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
      <span style="font-size:.85rem;color:#94A3B8">${qs.idx+1}/${qs.words.length}</span>
      <button onclick="_vtState['${id}'].direction=_vtState['${id}'].direction==='en-de'?'de-en':'en-de';go('vocab-topic','${id}','type')" style="font-size:.78rem;background:#F1F5F9;border:none;border-radius:.625rem;padding:.3rem .7rem;cursor:pointer;color:#64748B">
        ${qs.direction==='en-de'?T('vocab_type_en_de'):T('vocab_type_de_en')} (${T('vocab_fc_switch')})
      </button>
    </div>
    ${pb(qs.idx/qs.words.length*100,'#3B82F6')}
    <div style="text-align:center;padding:1.25rem;background:#EFF6FF;border-radius:1rem">
      <p style="font-size:.8rem;color:#64748B;margin-bottom:.4rem">${isDE?'Englisch':'Deutsch'}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:.4rem">
        <p style="font-size:1.5rem;font-weight:800;color:#1E40AF">${prompt}</p>
        ${isDE?speakBtn(escQ(prompt)):''}
      </div>
    </div>
    ${!qs.checked
      ? `<div>
          <input id="vtype-input" type="text" autocomplete="off" autocorrect="off" spellcheck="false"
            placeholder="${isDE?'Deutsche Übersetzung...':'English translation...'}"
            style="width:100%;border:2px solid #E2E8F0;border-radius:.75rem;padding:.75rem 1rem;font-size:1rem;outline:none;transition:border .15s"
            onkeydown="if(event.key==='Enter')checkVocabType('${id}','${escQ(correct)}')"
            oninput="this.style.borderColor='#3B82F6'"
            value="${qs.val}">
          <button class="btn-primary" style="margin-top:.75rem;width:100%" onclick="checkVocabType('${id}','${escQ(correct)}')">${T('btn_check')}</button>
        </div>`
      : `<div class="${qs.lastRight?'feedback-ok':'feedback-err'}" style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
          <span>${qs.lastRight?(qs.lastTypo?T('feedback_almost')+' <strong>'+correct+'</strong>':T('feedback_ok')):T('feedback_wrong')+' <strong>'+correct+'</strong>'}</span>
          ${!isDE ? speakBtn(escQ(w.en)) : ''}
        </div>
        <button class="btn-primary" style="margin-top:.75rem" onclick="nextVocabType('${id}')">${qs.idx+1<qs.words.length?T('ex_next'):T('vocab_result_label')}</button>`
    }
  </div>`;
}

function normalizeVocab(s){
  return s.toLowerCase()
    .replace(/^to\s+/,'')
    .replace(/^(der|die|das|the|a|an)\s+/i,'')
    .replace(/[.,!?;:]/g,'')
    .replace(/[-–]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

// Levenshtein distance for small typo tolerance
function vocabEditDistance(a, b){
  const m=a.length, n=b.length;
  if(Math.abs(m-n) > 2) return 99; // shortcut: too different
  const dp = Array.from({length:m+1}, (_,i)=>[i, ...Array(n).fill(0)]);
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const cost = a[i-1]===b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
    }
  }
  return dp[m][n];
}
// How many typos to allow based on word length
function vocabAllowedTypos(answer){
  const len = answer.replace(/\s/g,'').length;
  if(len <= 4) return 0;   // short words: must be exact
  if(len <= 8) return 1;   // medium: 1 typo
  return 2;                // long words/phrases: 2 typos
}

function checkVocabType(id, correct){
  const inp = document.getElementById('vtype-input');
  const val = inp ? inp.value.trim() : '';
  _vtState[id].val = val;
  const normVal = normalizeVocab(val);
  // find the current word to check alts
  const qs = _vtState[id];
  const t = VOCAB.find(v=>v.id===id);
  const w = qs.words[qs.idx] || (t ? t.words[qs.idx] : null);
  const alts = (w && w.alts) ? w.alts : [];
  // build list of accepted answers: correct + alts
  const accepted = [correct, ...alts].map(a=>normalizeVocab(a));
  // fuzzy: bei mehrteiligen Antworten reicht ein ganzes Wort der Lösung
  // (Wortgrenzen-Prüfung – sonst würden beliebige Buchstabenfolgen wie
  // "wes" für "Schwester" akzeptiert)
  const fuzzyOk = accepted.some(a => normVal.length > 2 && a !== normVal && (' '+a+' ').includes(' '+normVal+' '));
  const exactOk = accepted.some(a => a === normVal);
  // typo tolerance: accept small edit distance, scaled to word length
  let typoOk = false;
  if(!exactOk && !fuzzyOk && normVal.length > 0){
    typoOk = accepted.some(a => vocabEditDistance(a, normVal) <= vocabAllowedTypos(a));
  }
  const isRight = exactOk || fuzzyOk || typoOk;
  _vtState[id].checked = true;
  _vtState[id].lastRight = isRight;
  _vtState[id].lastTypo = (typoOk && !exactOk && !fuzzyOk);
  if(isRight) _vtState[id].score++;
  if(w) srsUpdate(id, w, isRight);
  go('vocab-topic', id, 'type');
}

function nextVocabType(id){
  const qs = _vtState[id];
  if(!qs.lastRight){
    // Mit Zurücklegen: falsche Antwort ans Ende der Warteschlange
    qs.words.push(qs.words[qs.idx]);
    if(!P.errors)P.errors={};const _tek='vocab:'+id;P.errors[_tek]=(P.errors[_tek]||0)+1;
  }
  qs.idx++;
  qs.checked = false;
  qs.val = '';
  if(qs.idx >= qs.words.length){
    qs.done = true;
    const t = VOCAB.find(v=>v.id===id);
    const total = t ? t.words.length : qs.words.length;
    P.vocab[id] = P.vocab[id]||{known:[]};
    P.vocab[id].typed = true;
    P.vocab[id].typeScore = Math.round(qs.score/Math.max(1,total)*100);
    addXP(15); checkBadges(); save();
  }
  go('vocab-topic', id, 'type');
}

function renderVocabTypeDone(t, id){
  const qs = _vtState[id];
  const pct = Math.round(qs.score/qs.words.length*100);
  return `<div class="card" style="text-align:center;padding:2rem">
    <div style="font-size:3rem">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#1E293B;margin:.5rem 0">${pct>=80?T('ex_result_excellent'):pct>=60?T('ex_result_good'):T('ex_result_practice')}</h2>
    <div style="font-size:2.5rem;font-weight:800;color:${pct>=80?'#10B981':pct>=60?'#3B82F6':'#F59E0B'}">${pct}%</div>
    ${pb(pct)}
    <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1rem">
      <button class="btn-secondary" onclick="_vtState['${id}']={};go('vocab-topic','${id}','type')">${T('btn_try_again')}</button>
      <button class="btn-primary" onclick="go('vocab-topic','${id}','list')">${T('vocab_to_list')}</button>
    </div>
  </div>`;
}

