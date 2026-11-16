// ═══════════════════════════════════════════════
// OHE DATA (Observe – Hypothesise – Experiment)
// ═══════════════════════════════════════════════
const GRAMMAR_OHE = {
  'sp': {
    observe: [
      'I play football every Saturday.',
      'She plays tennis after school.',
      'They don\'t like homework.',
      'Does he speak French?',
      'Water boils at 100 degrees.'
    ],
    observeQ: 'Wann endet das Verb auf -s? Wann nicht? Schau dir das Subjekt an!',
    observeQEN: 'When does the verb end in -s? When doesn\'t it? Look at the subject!',
    hint: 'he / she / it → verb + s/es',
    signal: ['every day','always','usually','often','sometimes','never','on Mondays','at weekends'],
    formula: [
      {type:'pos', label:'✅ Positive', cols:['I / You / We / They','<strong style="color:#10B981">play</strong>','football.']},
      {type:'pos', label:'', cols:['He / She / It','<strong style="color:#10B981">play<span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">s</span></strong>','football.']},
      {type:'neg', label:'❌ Negative', cols:['I / You / We / They','<span style="color:#F97316;font-weight:700">do</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span> play','football.']},
      {type:'neg', label:'', cols:['He / She / It','<span style="color:#F97316;font-weight:700">does</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span> play','football.']},
      {type:'q', label:'❓ Question', cols:['<span style="color:#F97316;font-weight:700">Do</span>','you / we / they','play football?']},
      {type:'q', label:'', cols:['<span style="color:#F97316;font-weight:700">Does</span>','he / she / it','play football?']}
    ]
  },
  'past': {
    observe: [
      'I played football yesterday.',
      'She went to London last summer.',
      'They didn\'t watch TV last night.',
      'Did you see the film?',
      'We had a great time at the party.'
    ],
    observeQ: 'Welche Verben enden auf -ed? Welche sind ganz anders (unregelmäßig)? Was steht nach "didn\'t"?',
    observeQEN: 'Which verbs end in -ed? Which are completely different (irregular)? What comes after "didn\'t"?',
    hint: 'Regular: + ed &nbsp;|&nbsp; Irregular: own form (go→went)',
    hintEN: 'Regular: + ed &nbsp;|&nbsp; Irregular: own form (go→went)',
    signal: ['yesterday','last week','last night','last summer','ago','in 2020','two days ago'],
    formula: [
      {type:'pos', label:'✅ Regular', cols:['I / She / They','<strong style="color:#10B981">play<span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ed</span></strong>','football.']},
      {type:'pos', label:'✅ Irregular', cols:['She','<strong style="color:#10B981">went</strong>','to London.']},
      {type:'neg', label:'❌ Negative', cols:['all persons','<span style="color:#F97316;font-weight:700">did</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span> play','(base form!)']},
      {type:'q', label:'❓ Question', cols:['<span style="color:#F97316;font-weight:700">Did</span>','you / he / they','play? (base form!)']},
    ]
  },
  'wo': {
    observe: [
      'Tom plays football every day.',
      'She doesn\'t like cats.',
      'Do you like music?',
      'Yesterday, we visited the museum.'
    ],
    observeQ: 'In welcher Reihenfolge stehen Subjekt, Verb und Objekt? Wo steht die Zeitangabe?',
    observeQEN: 'In what order do subject, verb and object appear? Where does the time expression go?',
    hint: 'English: ALWAYS S – V – O (no exceptions!)',
    hintEN: 'English: ALWAYS S – V – O (no exceptions!)',
    signal: ['Subject → Verb → Object','Time: at start or end of sentence','Question: verb before subject'],
    formula: [
      {type:'pos', label:'✅ Positive', cols:['<span style="color:#3B82F6">S</span>','<span style="color:#10B981">V</span>','<span style="color:#64748B">O</span> + time']},
      {type:'neg', label:'❌ Negative', cols:['<span style="color:#3B82F6">S</span>','<span style="color:#F97316;font-weight:700">does</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span>/<span style="color:#F97316;font-weight:700">did</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span> + V','<span style="color:#64748B">O</span>']},
      {type:'q', label:'❓ Question', cols:['<span style="color:#F97316">Do/Does/Did</span>','<span style="color:#3B82F6">S</span>','<span style="color:#10B981">V</span>?']}
    ]
  },
  'pp': {
    observe: [
      'Look! She is riding her bike.',
      'We are watching TV right now.',
      'My dad is working in the garden at the moment.',
      'She isn\'t listening to music.'
    ],
    observeQ: 'Was haben alle Verben gemeinsam? Was steht immer vor dem Verb + -ing?',
    observeQEN: 'What do all the verbs have in common? What always comes before verb + -ing?',
    hint: 'am / is / are + verb + -ing',
    signal: ['now','right now','at the moment','Look!','Listen!','currently'],
    formula: [
      {type:'pos', label:'✅ Positive', cols:['I','<span style="color:#F97316;font-weight:700">am</span>','<span style="color:#10B981">read</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ing</span>.']},
      {type:'pos', label:'', cols:['He / She','<span style="color:#F97316;font-weight:700">is</span>','<span style="color:#10B981">talk</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ing</span>.']},
      {type:'pos', label:'', cols:['We / They','<span style="color:#F97316;font-weight:700">are</span>','<span style="color:#10B981">play</span><span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ing</span>.']},
      {type:'neg', label:'❌ Negative', cols:['He','<span style="color:#F97316;font-weight:700">is</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span>','watch<span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ing</span> TV.']},
      {type:'q', label:'❓ Question', cols:['<span style="color:#F97316;font-weight:700">Are</span> you','read<span style="background:#FEF08A;color:#713F12;border-radius:3px;padding:0 2px;font-weight:700">ing</span>','a book?']}
    ]
  },
  'gtf': {
    observe: [
      'I am going to visit my grandma next weekend.',
      'She is going to start a new hobby.',
      'We are not going to travel this summer.',
      'Is he going to join the team?'
    ],
    observeQ: 'Was steht immer zwischen am/is/are und dem Verb? Was kommt danach?',
    observeQEN: 'What always comes between am/is/are and the verb? What comes after it?',
    hint: 'am / is / are + going to + base form',
    hintEN: 'am / is / are + going to + base form',
    signal: ['tomorrow','next week','next summer','soon','this weekend'],
    formula: [
      {type:'pos', label:'✅ Positive', cols:['I','<span style="color:#F97316;font-weight:700">am</span> <span style="color:#F97316;font-weight:700">going to</span>','play football.']},
      {type:'pos', label:'', cols:['She','<span style="color:#F97316;font-weight:700">is</span> <span style="color:#F97316;font-weight:700">going to</span>','start a hobby.']},
      {type:'neg', label:'❌ Negative', cols:['We','<span style="color:#F97316;font-weight:700">are</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span> <span style="color:#F97316;font-weight:700">going to</span>','travel.']},
      {type:'q', label:'❓ Question', cols:['<span style="color:#F97316;font-weight:700">Is</span> he','<span style="color:#F97316;font-weight:700">going to</span>','join the team?']}
    ]
  },
  'qn': {
    observe: [
      'Do you like swimming?',
      'Does she play the violin?',
      'Did they win the match?',
      'Where does your dad work?',
      'I don\'t understand this.'
    ],
    observeQ: 'Welches Hilfsverb steht bei he/she/it? Welches im Simple Past? Was steht nach dem Hilfsverb?',
    observeQEN: 'Which auxiliary verb is used with he/she/it? Which in the Simple Past? What comes after the auxiliary?',
    hint: 'Present: do/does | Past: did | always + base form',
    hintEN: 'Present: do/does | Past: did | always + base form',
    signal: ['Do...?','Does...?','Did...?','Where/What/When/Who/How + do/does/did'],
    formula: [
      {type:'q', label:'❓ Present (I/you/we/they)', cols:['<span style="color:#F97316;font-weight:700">Do</span>','you','like pizza?']},
      {type:'q', label:'❓ Present (he/she/it)', cols:['<span style="color:#F97316;font-weight:700">Does</span>','she','play tennis?']},
      {type:'q', label:'❓ Past (all)', cols:['<span style="color:#F97316;font-weight:700">Did</span>','they','win?']},
      {type:'neg', label:'❌ Negative', cols:['I / you / we / they','<span style="color:#F97316;font-weight:700">do</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span>','like it.']},
      {type:'neg', label:'', cols:['He / she / it','<span style="color:#F97316;font-weight:700">does</span><span style="background:#FECACA;color:#7F1D1D;border-radius:3px;padding:0 2px;font-weight:700">n\'t</span>','like it.']}
    ]
  }
};

function renderFormula(id){
  const ohe = GRAMMAR_OHE[id];
  if(!ohe || !ohe.formula) return '';
  const bgMap = {pos:'#F0FDF4',neg:'#FFF5F5',q:'#F5F3FF'};
  const rows = ohe.formula.map(row=>`
    <tr style="background:${bgMap[row.type]||'#F8FAFC'}">
      <td style="padding:.5rem .6rem;font-size:.8rem;font-weight:700;color:#475569;white-space:nowrap;min-width:7rem">${row.label}</td>
      ${row.cols.map(col=>`<td style="padding:.5rem .6rem;font-size:.88rem;color:#1E293B">${col}</td>`).join('')}
    </tr>`).join('');
  // formula examples (2 sentences from observe array)
  const exSentences = (ohe.observe||[]).slice(0,2);
  const exHTML = exSentences.length ? `<div style="margin-top:.75rem">
    <p style="font-size:.75rem;font-weight:700;color:#64748B;margin-bottom:.35rem;text-transform:uppercase;letter-spacing:.04em">${T('grammar_examples')}</p>
    ${exSentences.map(s=>`<div style="background:#F1F5F9;border-left:3px solid #3B82F6;padding:.4rem .75rem;border-radius:0 .5rem .5rem 0;font-size:.9rem;font-weight:600;color:#1E293B;margin-bottom:.3rem">${colorSentence(s,id)}</div>`).join('')}
  </div>` : '';
  return `<div style="overflow-x:auto;margin-bottom:.5rem">
    <table style="border-collapse:collapse;width:100%;border-radius:.75rem;overflow:hidden;border:1px solid #E2E8F0">
      <thead><tr style="background:#1E293B"><th style="padding:.5rem .6rem;text-align:left;font-size:.75rem;color:#94A3B8;font-weight:600">${T('grammar_formula_col_type')}</th><th style="padding:.5rem .6rem;text-align:left;font-size:.75rem;color:#94A3B8;font-weight:600">${T('legend_subject')}</th><th style="padding:.5rem .6rem;text-align:left;font-size:.75rem;color:#94A3B8;font-weight:600">${T('grammar_formula_col_verb')}</th><th style="padding:.5rem .6rem;text-align:left;font-size:.75rem;color:#94A3B8;font-weight:600">${T('grammar_formula_col_obj')}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>${exHTML}`;
}

