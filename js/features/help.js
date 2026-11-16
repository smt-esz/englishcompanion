// ═══════════════════════════════════════════════
// HELP & TIPS
// ═══════════════════════════════════════════════
function renderHelp(){
  const tips = [
    {emoji:'📚', q:'How do I learn vocabulary?', a:'Use flashcards every day – just 5–10 words per session. Say the word out loud, write a sentence with it, and test yourself the next day. The app\'s flashcard and quiz modes help you do exactly this.'},
    {emoji:'📝', q:'How do I practise grammar?', a:'Start with the explanation (in German or English), then work through Level 1 before moving to Level 2 and 3. Look at the examples carefully – notice the pattern, don\'t just memorise the rule.'},
    {emoji:'📖', q:'What if I don\'t understand a text?', a:'Read the vocabulary section first. Then read the whole text once for the main idea before looking at the questions. Don\'t stop at every unknown word – use the context to guess.'},
    {emoji:'✉️', q:'How do I write a good English email?', a:'Use the text type guide in the Writing section. Start with a greeting (Hi …,), write 2–3 short paragraphs, and end with a closing line. Use sentence starters and the useful phrases provided.'},
    {emoji:'🎯', q:'How do I prepare for a test?', a:'Use the Practice section and choose "Before the test". Review grammar topics you found difficult, practise irregular verbs, and do at least one Reading task. Don\'t try to learn everything the night before!'},
    {emoji:'⏱️', q:'How do I use SOUL time effectively?', a:'Set a goal at the start: e.g. "Today I will do 2 grammar exercises and learn 10 vocabulary words." Use the timer on the Home page for 5–15 minute sessions. Quality beats quantity.'},
    {emoji:'🔤', q:'What does A1 / A2 mean?', a:'A1 is beginner level – simple sentences, everyday vocabulary. A2 is elementary level – slightly longer texts, more grammar structures. The tasks in this app are labelled A1 or A2 so you always know the difficulty.'},
    {emoji:'🔥', q:'Tips for regular practice at home', a:'Little and often is the key! 10 minutes every day is much better than 1 hour once a week. Try to practise at the same time each day – before dinner or before bed works well for most students.'},
  ];
  return `<div class="space-y-6">
    <div>
      <h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('help_title')}</h1>
      <p style="color:#64748B;margin-top:.3rem">${T('help_sub')}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:.75rem">
      ${tips.map(tip=>`<details style="background:#fff;border:1.5px solid #E2E8F0;border-radius:.75rem;overflow:hidden">
        <summary style="padding:.85rem 1rem;cursor:pointer;display:flex;align-items:center;gap:.75rem;font-weight:600;color:#1E293B;list-style:none;-webkit-appearance:none">
          <span style="font-size:1.3rem;flex-shrink:0">${tip.emoji}</span>
          <span style="flex:1">${tip.q}</span>
          <span style="color:#94A3B8;font-size:.85rem">▾</span>
        </summary>
        <div style="padding:.75rem 1rem 1rem 1rem;border-top:1px solid #F1F5F9">
          <p style="font-size:.92rem;color:#374151;line-height:1.7">${tip.a}</p>
        </div>
      </details>`).join('')}
    </div>
    <div class="card" style="background:#EFF6FF;border-color:#BFDBFE;text-align:center">
      <p style="font-size:.9rem;color:#1E40AF;font-weight:600">💡 Need more practice?</p>
      <p style="font-size:.85rem;color:#3B82F6;margin-top:.3rem">Check out the external resources for extra exercises.</p>
      <button onclick="go('extern')" style="margin-top:.75rem;background:#3B82F6;color:#fff;border:none;border-radius:.75rem;padding:.6rem 1.2rem;font-size:.88rem;font-weight:600;cursor:pointer">${T('nav_extern')} →</button>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════
// EXTERNAL RESOURCES
// ═══════════════════════════════════════════════
function renderExtern(){
  const sites = [
    {emoji:'📚', title:'Englisch-Hilfen', url:'https://www.englisch-hilfen.de/', desc:'Grammar overviews, exercises, tests and vocabulary topics – comprehensive and free.', level:'A1–B2'},
    {emoji:'🇬🇧', title:'British Council – LearnEnglish Teens', url:'https://learnenglishteens.britishcouncil.org/skills', desc:'Listening, Reading, Writing and Speaking exercises at A1/A2 level. Authentic materials.', level:'A1–A2'},
    {emoji:'⚡', title:'ego4u', url:'https://www.ego4u.de/', desc:'Grammar exercises, explanations and tests. Good for Simple Present, Simple Past and more.', level:'A1–A2'},
    {emoji:'🃏', title:'Quizlet', url:'https://quizlet.com/', desc:'Create or use shared vocabulary sets. Great for flashcard practice and vocabulary games.', level:'A1–A2'},
    {emoji:'📺', title:'BBC Learning English', url:'https://www.bbc.co.uk/learningenglish', desc:'Short video clips, vocabulary in context, and grammar explanations from the BBC.', level:'A2–B1'},
    {emoji:'🎮', title:'LearnEnglish Kids – British Council', url:'https://www.britishcouncil.org/learnenglish-kids', desc:'Games, songs and stories for beginners. Ideal for A1 revision in a fun format.', level:'A1'},
  ];
  return `<div class="space-y-6">
    <div>
      <h1 style="font-size:1.8rem;font-weight:800;color:#1E293B">${T('extern_title')}</h1>
      <p style="color:#64748B;margin-top:.3rem">${T('extern_sub')}</p>
    </div>
    <div class="card" style="background:#FFFBEB;border-color:#FDE68A">
      <p style="font-size:.88rem;color:#92400E">💡 These are external websites – they will open in a new tab. Your progress in this app is not affected.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem">
      ${sites.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">
        <div class="card" style="cursor:pointer;transition:box-shadow .2s" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow=''">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem">
            <span style="font-size:1.6rem">${s.emoji}</span>
            <div>
              <h3 style="font-weight:700;color:#1E293B;font-size:.95rem">${s.title}</h3>
              <span style="font-size:.7rem;background:#DBEAFE;color:#1E40AF;padding:.15rem .5rem;border-radius:99px;font-weight:700">${s.level}</span>
            </div>
          </div>
          <p style="font-size:.83rem;color:#64748B;line-height:1.6">${s.desc}</p>
          <p style="font-size:.75rem;color:#3B82F6;margin-top:.5rem;font-weight:600">→ ${s.url.replace('https://','').split('/')[0]}</p>
        </div>
      </a>`).join('')}
    </div>
  </div>`;
}

function evalBadge(id){
  const gs = grammarStats();
  switch(id){
    case 'grammar-starter': return gs.done>=1;
    case 'grammar-pro': return gs.done>=5;
    case 'vocab-hero': return Object.values(P.vocab).some(v=>v.tested);
    case 'reading-detective': return P.reading.length>=1;
    case 'listening-pro': return P.listening.length>=1;
    case 'writing-explorer': return P.writing.length>=1;
    case 'irreg-champ': return (P.irreg||[]).length>=20;
    case 'simple-past-master': return !!(P.grammar['past']&&P.grammar['past'].completed);
    case 'streak-3': return currentStreak()>=3;
    case 'all-rounder': {
      const gs2=grammarStats();
      return gs2.done>=1&&Object.values(P.vocab).some(v=>v.tested)&&P.reading.length>=1&&P.writing.length>=1;
    }
    case 'streak-7': return currentStreak()>=7;
    case 'streak-30': return currentStreak()>=30;
    case 'first-game': return ['hangman','memory','qf','wordsearch'].some(k=>((P.gameStats||{})[k]||[]).length>0);
    case 'game-master': return ['hangman','memory','qf','wordsearch'].reduce((a,k)=>a+(((P.gameStats||{})[k]||[]).length),0)>=10;
    case 'word-collector': return VOCAB.reduce((s,t)=>s+(((P.vocab[t.id]||{}).known)||[]).length,0)>=100;
    case 'level-5': return (P.xp||0)>=400;
    default: return false;
  }
}

// ═══════════════════════════════════════════════
// PWA HELP
// ═══════════════════════════════════════════════
function renderPwaHelp(){
  const isEN = (P.lang||'en2') !== 'de';
  return `<div class="space-y-5">
    <div style="display:flex;align-items:center;gap:1rem">
      <button onclick="go('home')" style="background:none;border:none;color:#3B82F6;cursor:pointer;font-size:.9rem">← Home</button>
      <h1 style="font-size:1.5rem;font-weight:800;color:#1E293B">${T('pwa_install_title')}</h1>
    </div>
    <div class="card" style="background:#EFF6FF;border-color:#BFDBFE">
      <h2 style="font-weight:700;color:#1E40AF;margin-bottom:.75rem">${isEN?'How to install English Companion as an app':'So installierst du den English Companion als App'}</h2>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div style="background:#fff;border-radius:.75rem;padding:1rem;border:1px solid #DBEAFE">
          <p style="font-weight:700;color:#1E293B;margin-bottom:.4rem">${T('pwa_iphone_label')}</p>
          <ol style="font-size:.9rem;color:#374151;padding-left:1.25rem;line-height:1.9">
            <li>${isEN?'Open the page in <strong>Safari</strong>':'Öffne die Seite in <strong>Safari</strong>'}</li>
            <li>${isEN?'Tap the <strong>Share button</strong> (square with arrow)':'Tippe auf das <strong>Teilen-Symbol</strong> (Quadrat mit Pfeil nach oben)'}</li>
            <li>${isEN?'Select <strong>"Add to Home Screen"</strong>':'Wähle <strong>„Zum Home-Bildschirm"</strong>'}</li>
            <li>${isEN?'Tap <strong>"Add"</strong>':'Tippe auf <strong>„Hinzufügen"</strong>'}</li>
          </ol>
        </div>
        <div style="background:#fff;border-radius:.75rem;padding:1rem;border:1px solid #DBEAFE">
          <p style="font-weight:700;color:#1E293B;margin-bottom:.4rem">${T('pwa_android_label')}</p>
          <ol style="font-size:.9rem;color:#374151;padding-left:1.25rem;line-height:1.9">
            <li>${isEN?'Open the page in <strong>Chrome</strong>':'Öffne die Seite in <strong>Chrome</strong>'}</li>
            <li>${isEN?'Tap the <strong>three dots</strong> (Menu)':'Tippe auf die <strong>drei Punkte</strong> (Menü)'}</li>
            <li>${isEN?'Select <strong>"Add to Home screen"</strong>':'Wähle <strong>„Zum Startbildschirm hinzufügen"</strong>'}</li>
            <li>${isEN?'Tap <strong>"Add"</strong>':'Tippe auf <strong>„Hinzufügen"</strong>'}</li>
          </ol>
        </div>
        <div style="background:#fff;border-radius:.75rem;padding:1rem;border:1px solid #DBEAFE">
          <p style="font-weight:700;color:#1E293B;margin-bottom:.4rem">${T('pwa_pc_label')}</p>
          <ol style="font-size:.9rem;color:#374151;padding-left:1.25rem;line-height:1.9">
            <li>${isEN?'Click the <strong>install icon</strong> in the address bar (⊕)':'Klicke auf das <strong>Install-Symbol</strong> in der Adresszeile (⊕)'}</li>
            <li>${isEN?'Or: Menu → <strong>"Install app"</strong>':'Oder: Menü → <strong>„App installieren"</strong>'}</li>
          </ol>
        </div>
      </div>
    </div>
    <p style="font-size:.85rem;color:#64748B">${T('pwa_offline_note')}</p>
  </div>`;
}

