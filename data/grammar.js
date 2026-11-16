const GRAMMAR = [
  { id:'sp', slug:'sp', title:'Simple Present', level:'A1', cls:5, cat:'Tenses',
    desc:'Gewohnheiten, Fakten, regelmäßige Handlungen', descEN:'Habits, facts and regular actions',
    exDE:['Das Simple Present benutzt du für Dinge, die regelmäßig passieren oder immer wahr sind: Gewohnheiten, Hobbys, Fakten.',
           'Für I/you/we/they nimmst du die Grundform des Verbs. Für he/she/it hängst du -s oder -es an.',
           'Verneinung: don\'t (I/you/we/they) + Grundform oder doesn\'t (he/she/it) + Grundform.',
           'Fragen: Do / Does + Subjekt + Grundform?'],
    exEN:['Use the Simple Present for habits, routines and general truths.',
           'For he/she/it: add -s or -es. For I/you/we/they: use the base form.',
           'Negatives: don\'t / doesn\'t + base form. Questions: Do / Does + subject + base form?'],
    examples:[
      {en:'I play football every Saturday.',de:'Ich spiele jeden Samstag Fußball.'},
      {en:'She reads books in the evening.',de:'Sie liest abends Bücher.'},
      {en:'They don\'t like pizza.',de:'Sie mögen keine Pizza.'},
      {en:'Does he speak French?',de:'Spricht er Französisch?'},
      {en:'Water boils at 100 degrees.',de:'Wasser kocht bei 100 Grad.'}
    ],
    mistakes:[
      {wrong:'She play tennis.',correct:'She plays tennis.',tip:'With he/she/it, always add -s to the verb!'},
      {wrong:'He don\'t like cats.',correct:'He doesn\'t like cats.',tip:'With he/she/it use "doesn\'t", not "don\'t".'},
      {wrong:'Does she plays football?',correct:'Does she play football?',tip:'After does/doesn\'t use the base form – no -s!'}
    ],
    exercises:[
      { id:'sp-mc-1', type:'mc', diff:1, title:'Level 1 – Start: Choose the correct form',
        questions:[
          {q:'Tom ___ football every day.',opts:['play','plays','playing','is play'],correct:1,exp:'Tom = he/she/it → plays'},
          {q:'We ___ to school by bus.',opts:['goes','going','go','goed'],correct:2,exp:'We → base form: go'},
          {q:'She ___ her room on Saturdays.',opts:['clean','cleans','is cleaning','cleaned'],correct:1,exp:'she → cleans'},
          {q:'They ___ TV in the evenings.',opts:['watches','watch','is watching','watchs'],correct:1,exp:'They → base form: watch'},
          {q:'My cat ___ on the sofa all day.',opts:['sleep','sleeps','sleeping','sleeped'],correct:1,exp:'My cat = it → sleeps'}
        ]
      },
      { id:'sp-fg-1', type:'fg', diff:1, title:'Level 1 – Start: Fill the gaps',
        sentences:[
          {pre:'I',suf:'football on Fridays. (play)',ans:'play',hint:'I → base form'},
          {pre:'She',suf:'her teeth every morning. (brush)',ans:'brushes',hint:'she → +es'},
          {pre:'We',suf:'in London. (live)',ans:'live',hint:'we → base form'},
          {pre:'He',suf:'to music in his room. (listen)',ans:'listens',hint:'he → +s'},
          {pre:'They',suf:'a dog. (have)',ans:'have',hint:'they → have (nicht haves!)'}
        ]
      },
      { id:'sp-mc-2', type:'mc', diff:2, title:'Level 2 – Training: Negatives & questions',
        questions:[
          {q:'She ___ like broccoli.',opts:['don\'t','doesn\'t','isn\'t','not'],correct:1,exp:'she → doesn\'t + base form'},
          {q:'___ your parents work in an office?',opts:['Does','Do','Are','Is'],correct:1,exp:'"your parents" = they → Do'},
          {q:'My brother ___ play guitar, but he sings.',opts:['don\'t','isn\'t','doesn\'t','not'],correct:2,exp:'"My brother" = he → doesn\'t'},
          {q:'___ she go to the gym every week?',opts:['Do','Does','Is','Has'],correct:1,exp:'she → Does'},
          {q:'I ___ eat meat. I\'m a vegetarian.',opts:['doesn\'t','not','don\'t','isn\'t'],correct:2,exp:'I → don\'t + base form'}
        ]
      },
      { id:'sp-wo-1', type:'wo', diff:3, title:'Level 3 – Challenge: Build sentences',
        items:[
          {phrases:['I','usually','have breakfast','at half seven.'],correct:'I usually have breakfast at half seven.',hint:'Time expressions often go at the end.'},
          {phrases:['Anna',"doesn't do",'sport','on school mornings.'],correct:"Anna doesn't do sport on school mornings.",hint:'Negative: doesn\'t + base form'},
          {phrases:['What','do you','do','after school?'],correct:'What do you do after school?',hint:'Wh-question: question word + auxiliary + subject + verb'},
          {phrases:['They','train','twice a week.'],correct:'They train twice a week.'}
        ]
      }
    ]
  },
  { id:'past', slug:'past', title:'Simple Past', level:'A2', cls:6, cat:'Tenses',
    desc:'Abgeschlossene Handlungen in der Vergangenheit', descEN:'Completed actions in the past',
    exDE:['Das Simple Past benutzt du für Dinge, die in der Vergangenheit abgeschlossen sind.',
           'Regelmäßige Verben: +ed (play→played). Verb endet auf -e: +d (live→lived). Konsonant-Vokal-Konsonant: letzten Buchstaben verdoppeln (stop→stopped).',
           'Unregelmäßige Verben haben eigene Formen: go→went, see→saw, have→had. Diese musst du auswendig lernen!',
           'Verneinung: didn\'t + Grundform (alle Personen). Fragen: Did + Subjekt + Grundform?'],
    exEN:['Use the Simple Past for completed actions in the past. Time markers: yesterday, last week, ago.',
           'Regular verbs: add -ed. Irregular verbs: learn them by heart (go→went, see→saw).',
           'Negatives: didn\'t + base form. Questions: Did + subject + base form?'],
    examples:[
      {en:'I played football yesterday.',de:'Ich habe gestern Fußball gespielt.'},
      {en:'She went to London last summer.',de:'Sie fuhr letzten Sommer nach London.'},
      {en:'They didn\'t watch TV last night.',de:'Sie haben gestern Abend kein TV geschaut.'},
      {en:'Did you see the film?',de:'Hast du den Film gesehen?'},
      {en:'We had a great time at the party.',de:'Wir hatten eine tolle Zeit auf der Party.'}
    ],
    mistakes:[
      {wrong:'I goed to the park.',correct:'I went to the park.',tip:'go is irregular: go → went.'},
      {wrong:'She didn\'t went home.',correct:'She didn\'t go home.',tip:'After didn\'t always use the base form: go, not went.'},
      {wrong:'Did he played football?',correct:'Did he play football?',tip:'After did always use the base form: play, not played.'}
    ],
    exercises:[
      { id:'past-mc-1a', type:'mc', diff:1, title:'Level 1.1 – Regular verbs (+ed)',
        questions:[
          {q:'Yesterday, I ___ a good film on TV.',opts:['watch','watched','watching','watches'],correct:1,exp:'Regular: watch + ed = watch<strong>ed</strong>.'},
          {q:'They ___ football in the park last Saturday.',opts:['play','plays','playing','played'],correct:3,exp:'Regular: play + ed = play<strong>ed</strong>.'},
          {q:'She ___ her room before dinner.',opts:['clean','cleans','cleaning','cleaned'],correct:3,exp:'Regular: clean + ed = clean<strong>ed</strong>.'},
          {q:'He ___ for his test all evening.',opts:['study','studies','studying','studied'],correct:3,exp:'study → studi<strong>ed</strong> (-y wird zu -ied).'},
          {q:'We ___ to a new flat last year.',opts:['move','moves','moving','moved'],correct:3,exp:'move + d = mov<strong>ed</strong> (endet auf -e, nur +d).'}
        ]
      },
      { id:'past-mc-1b', type:'mc', diff:1, title:'Level 1.2 – Irregular verbs',
        questions:[
          {q:'She ___ to school by bus last Monday.',opts:['goed','goes','went','go'],correct:2,exp:'go is irregular: go → went.'},
          {q:'We ___ pizza for lunch yesterday.',opts:['eat','eated','ate','eaten'],correct:2,exp:'eat is irregular: eat → ate.'},
          {q:'He ___ his homework last night.',opts:['do','does','did','doed'],correct:2,exp:'do is irregular: do → did.'},
          {q:'I ___ a great film last week.',opts:['seed','saw','see','seen'],correct:1,exp:'see is irregular: see → saw.'},
          {q:'She ___ me a present for my birthday.',opts:['gived','gives','given','gave'],correct:3,exp:'give is irregular: give → gave.'}
        ]
      },
      { id:'past-mc-2', type:'mc', diff:2, title:'Level 2 – Training: Negatives & questions',
        questions:[
          {q:'She ___ come to school yesterday.',opts:['don\'t','doesn\'t','didn\'t','not'],correct:2,exp:'Past negative: didn\'t + base form.'},
          {q:'___ you watch the match last night?',opts:['Do','Does','Did','Were'],correct:2,exp:'Past question: Did.'},
          {q:'I ___ my bag this morning. (find)',opts:['finded','found','find','finds'],correct:1,exp:'find is irregular: find → found.'},
          {q:'They ___ lunch together yesterday.',opts:['don\'t have','doesn\'t have','didn\'t have','not had'],correct:2,exp:'didn\'t + Grundform.'},
          {q:'___ he lose his keys?',opts:['Do','Does','Did','Was'],correct:2,exp:'Past question: Did.'}
        ]
      },
      { id:'past-wo-1', type:'wo', diff:3, title:'Level 3 – Challenge: Simple Past sentences',
        items:[
          {phrases:['We','saw','that film','three days ago.'],correct:'We saw that film three days ago.',hint:'saw = Simple Past of see (irregular)'},
          {phrases:['She',"didn't come",'to the party','last night.'],correct:"She didn't come to the party last night.",hint:'didn\'t + Grundform (come, nicht came!)'},
          {phrases:['Where','did you go','last summer?'],correct:'Where did you go last summer?',hint:'Wh-question: Where + did + subject + base form'},
          {phrases:['She','bought','a new phone','yesterday.'],correct:'She bought a new phone yesterday.',hint:'bought = Simple Past von buy'}
        ]
      }
    ]
  },
  { id:'wo', slug:'wo', title:'Word Order in English', level:'A1', cls:5, cat:'Sentence Structure',
    desc:'Subjekt – Verb – Objekt: die feste Reihenfolge im Englischen', descEN:'Subject – Verb – Object: the fixed word order in English',
    exDE:['Im Englischen gilt fast immer: Subjekt (S) – Verb (V) – Objekt (O). Diese Reihenfolge ist unveränderlich!',
           'Zeitangaben stehen am Anfang oder am Ende des Satzes, nie in der Mitte.',
           'In Fragen kommt das Hilfsverb vor das Subjekt: Do you...? / Can she...?',
           'Verneinungen direkt nach dem Hilfsverb: She doesn\'t... / They didn\'t...'],
    exEN:['English word order is fixed: Subject – Verb – Object.',
           'Time adverbials go at the beginning or end of the sentence.',
           'Questions: auxiliary verb before subject. Negatives: after the auxiliary.'],
    examples:[
      {en:'Tom reads a book every evening.',de:'Tom liest jeden Abend ein Buch.'},
      {en:'My sister plays the piano.',de:'Meine Schwester spielt Klavier.'},
      {en:'Do you like football?',de:'Magst du Fußball?'},
      {en:'She doesn\'t watch TV on Mondays.',de:'Sie schaut montags kein TV.'},
      {en:'Yesterday, we visited the museum.',de:'Gestern besuchten wir das Museum.'}
    ],
    mistakes:[
      {wrong:'I like very much chocolate.',correct:'I like chocolate very much.',tip:'Object goes directly after the verb – "very much" comes after that.'},
      {wrong:'She every day plays tennis.',correct:'She plays tennis every day.',tip:'"every day" goes at the end, not between subject and verb.'},
      {wrong:'Why she is late?',correct:'Why is she late?',tip:'In questions: verb before subject!'}
    ],
    exercises:[
      { id:'wo-mc-1', type:'mc', diff:1, title:'Level 1 – Start: Choose the correct sentence',
        questions:[
          {q:'Which sentence is right?',opts:['Tom every day football plays.','Tom plays football every day.','Every day Tom football plays.','Football Tom plays every day.'],correct:1,exp:'S (Tom) – V (plays) – O (football) – Zeit (every day).'},
          {q:'Which sentence is right?',opts:['Does she like pizza?','She does like pizza?','Like she does pizza?','Pizza does she like?'],correct:0,exp:'Questions: Does + S + base form + object.'},
          {q:'Which sentence is right?',opts:['I very much like ice cream.','I like very much ice cream.','I like ice cream very much.','Ice cream I like very much.'],correct:2,exp:'"Very much" steht nach dem Objekt.'},
          {q:'Which sentence is right?',opts:['She doesn\'t eat meat.','She meat doesn\'t eat.','She eat doesn\'t meat.','Meat she doesn\'t eat.'],correct:0,exp:'S + doesn\'t + Grundform + Objekt.'}
        ]
      },
      { id:'wo-wo-1', type:'wo', diff:2, title:'Level 2 – Training: Order sentence parts',
        items:[
          {phrases:['He','reads books','every morning.'],correct:'He reads books every morning.',hint:'S – V – O – time'},
          {phrases:['We','play','in the garden.'],correct:'We play in the garden.'},
          {phrases:['She',"doesn't like",'cats.'],correct:"She doesn't like cats.",hint:'Negative: doesn\'t + base form'},
          {phrases:['Do you','like','music?'],correct:'Do you like music?',hint:'Questions: auxiliary + subject + verb'},
          {phrases:['Yesterday','we visited','the museum.'],correct:'Yesterday we visited the museum.',hint:'The time expression can go at the start!'}
        ]
      }
    ]
  },
  { id:'pp', slug:'pp', title:'Present Progressive', level:'A1', cls:5, cat:'Tenses',
    desc:'Handlungen, die gerade jetzt passieren', descEN:'Actions happening right now',
    exDE:['Das Present Progressive benutzt du für Dinge, die gerade jetzt in diesem Moment passieren.',
           'Bildung: am / is / are + Verb + -ing. Signalwörter: now, at the moment, right now, Look!, Listen!',
           'Schreibregel: Verb endet auf -e → e fällt weg (write→writing). Kurze Verben verdoppeln den letzten Konsonanten (run→running).'],
    exEN:['Use the Present Progressive for actions happening right now.',
           'Form: am / is / are + verb + -ing.',
           'Spelling: drop final -e (write→writing). Double final consonant in short verbs (run→running).'],
    examples:[
      {en:'I am reading a book right now.',de:'Ich lese gerade ein Buch.'},
      {en:'She is talking on the phone.',de:'Sie telefoniert gerade.'},
      {en:'They are playing in the garden.',de:'Sie spielen gerade im Garten.'},
      {en:'What are you doing?',de:'Was machst du gerade?'},
      {en:'He isn\'t watching TV at the moment.',de:'Er schaut gerade nicht fern.'}
    ],
    mistakes:[
      {wrong:'She is play tennis.',correct:'She is playing tennis.',tip:'Don\'t forget: verb + -ing!'},
      {wrong:'They are runing.',correct:'They are running.',tip:'run → running (double the final consonant).'}
    ],
    exercises:[
      { id:'pp-mc-1', type:'mc', diff:1, title:'Level 1 – Start: Choose the correct form',
        questions:[
          {q:'Look! She ___ her bike.',opts:['rides','is riding','riding','is ride'],correct:1,exp:'Gerade jetzt → is + riding.'},
          {q:'We ___ TV right now.',opts:['watches','are watching','is watching','watch'],correct:1,exp:'"We" → are watching.'},
          {q:'My dad ___ in the garden at the moment.',opts:['work','works','is working','are working'],correct:2,exp:'"My dad" = he → is working.'},
          {q:'Listen! The birds ___!',opts:['sing','are singing','is singing','singing'],correct:1,exp:'"The birds" = they → are singing.'},
          {q:'She ___ a letter at the moment. (write)',opts:['writes','is writing','are writing','writing'],correct:1,exp:'is + writing (-e is dropped).'}
        ]
      }
    ]
  },
  { id:'gtf', slug:'gtf', title:'Going-to Future', level:'A2', cls:6, cat:'Tenses',
    desc:'Geplante Vorhaben und Absichten in der Zukunft', descEN:'Plans and intentions for the future',
    exDE:['Das going-to future benutzt du für Dinge, die du bereits geplant hast.',
           'Bildung: am / is / are + going to + Grundform.',
           'Signalwörter: tomorrow, next week, soon, next summer.',
           'Verneinung: am not / isn\'t / aren\'t + going to + Grundform. Frage: Am/Is/Are + Subjekt + going to + Grundform?'],
    exEN:['Use going-to future for plans and intentions already decided.',
           'Form: am / is / are + going to + base form.',
           'Negative: isn\'t / aren\'t going to. Question: Is/Are + subject + going to?'],
    examples:[
      {en:'I am going to visit my grandma next weekend.',de:'Ich werde nächstes Wochenende meine Oma besuchen.'},
      {en:'She is going to start a new hobby.',de:'Sie wird ein neues Hobby anfangen.'},
      {en:'We are not going to travel this summer.',de:'Wir werden diesen Sommer nicht reisen.'},
      {en:'Is he going to join the team?',de:'Wird er dem Team beitreten?'}
    ],
    mistakes:[
      {wrong:'She going to play tennis.',correct:'She is going to play tennis.',tip:'Don\'t forget: is/am/are before "going to"!'},
      {wrong:'I am going to played football.',correct:'I am going to play football.',tip:'After "going to" always use the base form – no -ed!'}
    ],
    exercises:[
      { id:'gtf-mc-1', type:'mc', diff:1, title:'Level 1 – Start: Correct form',
        questions:[
          {q:'She ___ visit her aunt next week.',opts:['going to','is going to','are going to','be going to'],correct:1,exp:'"She" → is going to.'},
          {q:'We ___ buy a new car soon.',opts:['am going to','is going to','are going to','going to'],correct:2,exp:'"We" → are going to.'},
          {q:'___ he going to join the club?',opts:['Do','Is','Are','Does'],correct:1,exp:'"he" → Is + he + going to?'},
          {q:'I ___ study for the test tomorrow.',opts:['is going to','am going to','are going to','going to'],correct:1,exp:'"I" → am going to.'},
          {q:'They ___ come to the party.',opts:['isn\'t going to','aren\'t going to','not going to','don\'t going to'],correct:1,exp:'"They" → aren\'t going to.'}
        ]
      }
    ]
  },
  { id:'qn', slug:'qn', title:'Questions and Negatives', level:'A1', cls:5, cat:'Sentence Structure',
    desc:'Fragen stellen und Sätze verneinen im Present und Past', descEN:'Asking questions and forming negatives in present and past',
    exDE:['Im Englischen brauchst du Hilfsverben für Fragen und Verneinungen.',
           'Simple Present: do (I/you/we/they) oder does (he/she/it) + Grundform.',
           'Simple Past: did (alle Personen) + Grundform.',
           'W-Fragen: Fragewort + Hilfsverb + Subjekt + Grundform?'],
    exEN:['Use auxiliary verbs to form questions and negatives.',
           'Present: do/does + base form. Past: did + base form.',
           'Wh-questions: wh-word + auxiliary + subject + base form?'],
    examples:[
      {en:'Do you like swimming?',de:'Magst du Schwimmen?'},
      {en:'Does she play the violin?',de:'Spielt sie Geige?'},
      {en:'Did they win the match?',de:'Haben sie das Spiel gewonnen?'},
      {en:'Where does your dad work?',de:'Wo arbeitet dein Vater?'},
      {en:'I don\'t understand this.',de:'Ich verstehe das nicht.'}
    ],
    mistakes:[
      {wrong:'Where she lives?',correct:'Where does she live?',tip:'Question word + does + subject + base form.'},
      {wrong:'She didn\'t came.',correct:'She didn\'t come.',tip:'After didn\'t always use the base form!'},
      {wrong:'Does he likes coffee?',correct:'Does he like coffee?',tip:'After does always use the base form – no -s!'}
    ],
    exercises:[
      { id:'qn-mc-1', type:'mc', diff:1, title:'Level 1 – Start: Choose question/negative',
        questions:[
          {q:'___ she speak Spanish?',opts:['Do','Does','Is','Did'],correct:1,exp:'"she" → Does.'},
          {q:'He ___ understand the question.',opts:['don\'t','not','doesn\'t','didn\'t'],correct:2,exp:'"He" → doesn\'t + Grundform.'},
          {q:'___ you go to the concert last night?',opts:['Do','Does','Did','Were'],correct:2,exp:'Past → Did.'},
          {q:'Where ___ you live?',opts:['does','do','did','is'],correct:1,exp:'"You" → do.'},
          {q:'They ___ play football yesterday.',opts:['don\'t','doesn\'t','didn\'t','not'],correct:2,exp:'Past negative: didn\'t.'}
        ]
      }
    ]
  }
];

