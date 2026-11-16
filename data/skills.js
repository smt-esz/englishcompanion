const READING = [
  { id:'r1', title:'My New School', level:'A1', type:'E-Mail',
    vocab:[{en:'arrive',de:'ankommen',pos:'v',example:'The train arrives at eight o\'clock.'},{en:'timetable',de:'Stundenplan',example:'My timetable has five lessons a day.'},{en:'corridor',de:'Flur',example:'We wait in the corridor before the lesson.'},{en:'canteen',de:'Mensa',example:'I eat lunch in the school canteen.'},{en:'nervous',de:'nervös',example:'Sophie was nervous on her first day.'}],
    text:`Hi Emma,\n\nHow are you? I'm writing to tell you about my new school. It's called Hillside Academy.\n\nMy first day was last Monday. I was really nervous, but my new teacher, Mr Brown, is very friendly.\n\nThe school is quite big. There are 800 pupils and 50 teachers. There is a sports hall, a library and a big canteen.\n\nMy timetable is great. I have English, Maths, Science, Art and PE. My favourite subject is Art.\n\nI eat lunch in the canteen. The food is really good! Today I had pasta and a salad.\n\nSchool finishes at half past three. Then I take the bus home. It takes about 20 minutes.\n\nWrite soon!\nSophie`,
    questions:[
      {q:"How does Sophie feel about her new school?",type:'mc',opts:["She hates it and misses her old school.","She is nervous, but she likes what she sees.","She is completely relaxed and happy.","She finds it boring and too big."],ans:"She is nervous, but she likes what she sees.",exp:"Sophie was nervous, but: nice teacher, good timetable, tasty food – she likes the school.",gist:true},
      {q:'Sophie was happy and relaxed on her first day.',type:'tf',ans:'false',exp:'Wrong – she was nervous.'},
      {q:'How many pupils does the school have?',type:'mc',opts:['500','800','1000','600'],ans:'800',exp:'"There are 800 pupils."'},
      {q:"What is Sophie's favourite subject?",type:'mc',opts:['Maths','English','Art','PE'],ans:'Art',exp:'"My favourite subject is Art."'},
      {q:'How long does the bus ride take?',type:'mc',opts:['10 minutes','15 minutes','20 minutes','30 minutes'],ans:'20 minutes',exp:'"It takes about 20 minutes."'}
    ],
    vocabId:'school',
    postReading:[
      {prompt:'Write 2–3 sentences: What is your school like? Name one thing that is similar to Hillside Academy and one thing that is different.'},
      {prompt:'Sophie says her favourite subject is Art. What is your favourite subject and why? Write 1–2 sentences.'}
    ]
  },
  { id:'r2', title:'My Best Friend', level:'A1', type:'Blogpost',
    vocab:[{en:'funny',de:'lustig',example:'My best friend is really funny – she always makes me laugh.'},{en:'kind',de:'nett / freundlich',example:'Our teacher is very kind and helps everyone.'},{en:'always',de:'immer',example:'I always do my homework after dinner.'},{en:'sometimes',de:'manchmal',example:'We sometimes go to the park at the weekend.'},{en:'neighbourhood',de:'Nachbarschaft',example:'Lena lives in my neighbourhood, just three houses away.'}],
    text:`This is a short text about my best friend, Lena.\n\nLena is twelve years old. She lives in my neighbourhood, just three houses away. We go to the same school and we are in the same class.\n\nLena is tall and has long brown hair. She always wears colourful clothes. Her favourite colour is purple.\n\nLena loves reading books and listening to music. She also plays the guitar very well. She practises every evening.\n\nWe usually spend our free time together. On Saturdays, we go to the swimming pool or to the park. Sometimes we watch films.\n\nLena is really funny and kind. She always helps me with my maths homework! I think she is the best friend you can have.`,
    questions:[
      {q:"What kind of person is Lena?",type:'mc',opts:["Shy and quiet","Sporty and competitive","Funny and kind","Serious and hard-working"],ans:"Funny and kind",exp:"\"Lena is really funny and kind.\" – das steht direkt im letzten Absatz.",gist:true},
      {q:'Lena has long brown hair.',type:'tf',ans:'true',exp:'Richtig – steht im zweiten Absatz.'},
      {q:'What instrument does Lena play?',type:'mc',opts:['piano','drums','guitar','flute'],ans:'guitar',exp:'"She also plays the guitar very well."'},
      {q:'What do they do on Saturdays?',type:'mc',opts:['go to the cinema','go swimming or to the park','play computer games','do homework'],ans:'go swimming or to the park',exp:'"On Saturdays, we go to the swimming pool or to the park."'}
    ],
    vocabId:'family',
    postReading:[
      {prompt:'Think about your best friend. Write 3 sentences to describe them. Use adjectives from the text or your own.'},
      {prompt:'The text says Lena always helps with maths. Write 1–2 sentences: What does your best friend always do for you?'}
    ]
  },
  { id:'r3', title:'A Day in London', level:'A2', type:'Tagebucheintrag',
    vocab:[{en:'Thames',de:'Themse',example:'The River Thames flows through the centre of London.'},{en:'double-decker bus',de:'Doppeldeckerbus',example:'We got on a red double-decker bus to see the city.'},{en:'queue',de:'anstehen',pos:'v',example:'We had to queue for 20 minutes at the museum.'},{en:'stunning',de:'atemberaubend',example:'The view from the London Eye was absolutely stunning.'},{en:'exhausted',de:'erschöpft',example:'After the long day, we were completely exhausted.'}],
    text:`Tuesday, 23rd July\n\nWhat an amazing day! We got up early this morning because we had a lot planned.\n\nFirst, we took the underground (the Tube) to Tower Bridge. It was really busy. Tower Bridge is incredible – it's right on the River Thames.\n\nAfter that, we visited the Tower of London. We had to queue for about 20 minutes, but it was worth it. We saw the Crown Jewels. A Beefeater guard gave us a tour.\n\nFor lunch, we had fish and chips near the Thames. It was delicious! Then we got on a double-decker bus and went to Buckingham Palace. We saw the Changing of the Guard.\n\nIn the evening, we went on the London Eye. From the top, you can see the whole city. It was breathtaking.\n\nI was completely exhausted when we got back to the hotel at ten o'clock.`,
    questions:[
      {q:"How does the writer feel at the end of the day?",type:'mc',opts:["Bored – they did too little.","Exhausted but very happy.","Disappointed because it rained.","Angry because the queues were too long."],ans:"Exhausted but very happy.",exp:"\"What an amazing day!\" – aber: \"I was completely exhausted when we got back.\"",gist:true},
      {q:'They had to wait in a queue at the Tower of London.',type:'tf',ans:'true',exp:'"We had to queue for about 20 minutes."'},
      {q:'What did they eat for lunch?',type:'mc',opts:['pizza','a sandwich','fish and chips','a burger'],ans:'fish and chips',exp:'"For lunch, we had fish and chips."'},
      {q:'They saw the Changing of the Guard at Tower Bridge.',type:'tf',ans:'false',exp:'Falsch – sie sahen es bei Buckingham Palace.'},
      {q:'What time did they get back to the hotel?',type:'mc',opts:['eight o\'clock','nine o\'clock','ten o\'clock','eleven o\'clock'],ans:'ten o\'clock',exp:'"when we got back to the hotel at ten o\'clock"'}
    ]
    ,vocabId:'holidays'
    ,postReading:[
      {prompt:'Imagine you visited London for one day. Which of the places in the text would you most like to visit? Write 2 sentences and give a reason.'}
      ,{prompt:'The writer felt "completely exhausted" at the end. Write 2 sentences: Describe a day when you felt exhausted. What did you do?'}
    ]
  },
  { id:'r4', title:'My Digital Life', level:'A2', type:'Blogeintrag',
    vocab:[{en:'addicted',de:'süchtig',example:'Some people are addicted to their smartphones.'},{en:'limit',de:'begrenzen',pos:'v',example:'My parents limit my screen time to two hours a day.'},{en:'concentrate',de:'sich konzentrieren',pos:'v',example:'I can\'t concentrate when the TV is on.'},{en:'admit',de:'zugeben',pos:'v',example:'I have to admit that I check my phone too often.'},{en:'balance',de:'Balance',example:'It is important to have a good balance between online and offline time.'}],
    text:`Hi, my name is Felix and I'm thirteen years old. Today I want to write about digital life.\n\nI spend a lot of time on my phone and laptop. In the evenings, I usually watch videos online or play games with my friends.\n\nMy parents say I am on my phone too much. They have set a screen time limit of two hours on school days. At first, I was really annoyed. But now I think they are right. When I used my phone all evening, I couldn't concentrate at school.\n\nNow I try to have a good balance. I turn off my phone when I'm doing homework. I also try to spend time offline – I go cycling, meet friends, or read a book.\n\nI have to admit that sometimes I still check my phone too often. But I think it's important to know when to put it away.`,
    questions:[
      {q:"What is Felix's main message in his text?",type:'mc',opts:["Phones are always bad and should be banned.","A good balance with screen time is important.","Parents should not set screen time limits.","He plays video games all day and loves it."],ans:"A good balance with screen time is important.",exp:"\"I think it's important to know when to put it away.\" – Schlussgedanke des Textes.",gist:true},
      {q:"How long is Felix's screen time limit on school days?",type:'mc',opts:['one hour','two hours','three hours','no limit'],ans:'two hours',exp:'"a screen time limit of two hours on school days"'},
      {q:'When does Felix turn off his phone?',type:'mc',opts:['at dinner time','when doing homework','after ten o\'clock','never'],ans:'when doing homework',exp:'"I turn off my phone when I\'m doing homework."'},
      {q:'Felix thinks his parents were right to set a limit.',type:'tf',ans:'true',exp:'"now I think they are right."'}
    ],
    vocabId:'digital',
    postReading:[
      {prompt:'Felix has a two-hour screen time limit. Do you think that is a good idea? Write 2–3 sentences and give your opinion.'},
      {prompt:'What do you do when you are offline? Write 2 sentences. Use: I go..., I meet..., I read..., or your own ideas.'}
    ]
  },
  { id:'r5', title:'Emma\'s Hobby', level:'A1', type:'Beschreibung', topic:'Free Time & Hobbies',
    vocab:[{en:'hobby',de:'das Hobby',example:'My hobby is collecting stamps from different countries.'},{en:'collect',de:'sammeln',pos:'v',example:'Emma collects stamps from over 40 countries.'},{en:'stamps',de:'Briefmarken',example:'I found some old stamps at the market last Saturday.'},{en:'proud',de:'stolz',example:'I am very proud of my stamp collection.'},{en:'special',de:'besonders',example:'My favourite stamp is special because it comes from Japan.'}],
    text:`My name is Emma and I have a great hobby. I collect stamps. I have stamps from over 40 countries! My favourite stamp is from Japan – it has a beautiful picture of Mount Fuji.
Every Saturday I go to the market with my dad. Sometimes we find old stamps there. Last week I found a stamp from 1965. It was very cheap – only 50 cents!
My best friend Lena doesn\'t collect stamps. She thinks it\'s boring. But I think it\'s really interesting because you can learn a lot about different countries. My teacher says I\'m very creative. I\'m very proud of my collection.`,
    questions:[
      {q:"How does Emma feel about her hobby?",type:'mc',opts:["Embarrassed – her friend thinks it is boring.","Bored – she wants to stop.","Very proud and enthusiastic.","Unsure – she doesn't know if it's worth it."],ans:"Very proud and enthusiastic.",exp:"\"I'm very proud of my collection.\" – letzter Absatz.",gist:true},
      {q:'How many countries does Emma have stamps from?',type:'mc',opts:['more than 20','more than 30','more than 40','more than 50'],ans:'more than 40'},
      {q:'Emma\'s favourite stamp is from Japan.',type:'tf',ans:'true'},
      {q:'Lena also collects stamps.',type:'tf',ans:'false'},
      {q:'Where does Emma go every Saturday?',type:'mc',opts:['to the library','to the park','to the market','to school'],ans:'to the market'}
    ]
    ,vocabId:'hobbies'
    ,postReading:[
      {prompt:'What is your favourite hobby or free-time activity? Write 2\u20133 sentences. Use: I love / enjoy / like ... -ing.'}
      ,{prompt:'Emma\'s friend Lena thinks stamp collecting is boring. Do you agree? Write 1\u20132 sentences and give a reason.'}
    ]
  },
  { id:'r6', title:'A Visit to the Zoo', level:'A1', type:'Erlebnisbericht', topic:'Animals & Places',
    vocab:[{en:'giraffe',de:'die Giraffe',example:'The biggest giraffe was almost six metres tall!'},{en:'enclosure',de:'das Gehege',example:'The giraffes were in a large enclosure near the entrance.'},{en:'feed',de:'füttern',pos:'v',example:'We could feed the giraffes leaves through the fence.'},{en:'scary',de:'gruselig',example:'Tom thought the spiders in the reptile house were scary.'},{en:'amazing',de:'unglaublich',example:'It was amazing to see the giraffes so close up!'}],
    text:`Last Sunday, our class went to the zoo. It was our end-of-year trip. We travelled by coach and it took about one hour.
At the zoo, we saw lots of animals. My favourite animals were the giraffes. They are so tall – the biggest one was almost six metres! We could feed them leaves through the fence. It was amazing.
We also saw elephants, lions and penguins. The penguins were really funny – they ran very fast on their little legs! Tom from my class thought the spiders in the reptile house were scary, but I thought they were interesting.
At lunchtime we ate our sandwiches near the lake. We saw some ducks and a heron. On the way home, almost everyone fell asleep on the coach. It was a brilliant day!`,
    questions:[
      {q:"What was the general mood of the zoo trip?",type:'mc',opts:["Disappointing – the animals were boring.","Scary – especially the reptile house.","Fun and exciting for everyone.","Too tiring – nobody enjoyed it."],ans:"Fun and exciting for everyone.",exp:"\"It was a brilliant day!\" – so endet der Text.",gist:true},
      {q:'How tall was the biggest giraffe?',type:'mc',opts:['four metres','five metres','almost six metres','seven metres'],ans:'almost six metres'},
      {q:'The students could feed the giraffes.',type:'tf',ans:'true'},
      {q:'Tom thought the spiders were interesting.',type:'tf',ans:'false'},
      {q:'What did they do at lunchtime?',type:'mc',opts:['bought ice cream','ate sandwiches near the lake','visited the gift shop','watched a show'],ans:'ate sandwiches near the lake'}
    ],
    vocabId:'school',
    postReading:[
      {prompt:'The writer says the giraffes were their favourite animals. What is your favourite animal? Write 2 sentences and explain why.'},
      {prompt:'Describe a school trip or a day out you remember. Where did you go? Write 2–3 sentences in the Simple Past.'}
    ]
  },
  { id:'r7', title:'A Weekend in Berlin', level:'A2', type:'Reisebericht', topic:'Travel & Cities',
    vocab:[{en:'capital',de:'die Hauptstadt',example:'Berlin is the capital of Germany.'},{en:'memorial',de:'das Denkmal',example:'The Holocaust Memorial in Berlin is very moving.'},{en:'incredible',de:'unglaublich',example:'The Brandenburg Gate is an incredible landmark.'},{en:'exhausted',de:'erschöpft'},{en:'recommend',de:'empfehlen',pos:'v',example:'I would definitely recommend visiting Berlin to everyone.'}],
    text:`Last weekend, my family and I visited Berlin, the capital of Germany. We went by train and arrived on Friday evening. Our hotel was right in the centre of the city, which was perfect.
On Saturday morning, we visited the Brandenburg Gate. It\'s one of the most famous landmarks in Europe and it was really impressive. Then we walked to the Holocaust Memorial. It was a very moving experience – there are 2,711 concrete blocks of different heights and you can walk between them. I felt very small and emotional.
In the afternoon, we took a boat trip on the River Spree. From the boat, we could see lots of important buildings. In the evening, we ate at a Vietnamese restaurant near our hotel. The food was delicious.
On Sunday, we visited Museum Island. There are five world-famous museums there! We could only go to two because we didn\'t have enough time. My favourite was the Pergamon Museum. By Sunday evening, we were completely exhausted but very happy. I would definitely recommend Berlin to everyone!`,
    questions:[
      {q:"How did the family feel about their weekend in Berlin?",type:'mc',opts:["Disappointed – the museums were closed.","Exhausted and unhappy.","Very happy, despite being tired.","Bored – Berlin was too quiet."],ans:"Very happy, despite being tired.",exp:"\"completely exhausted but very happy\" – vorletzter Satz.",gist:true},
      {q:'The Holocaust Memorial has 2,711 concrete blocks.',type:'tf',ans:'true'},
      {q:'What did they do on Saturday afternoon?',type:'mc',opts:['visited a museum','went shopping','took a boat trip','watched a film'],ans:'took a boat trip'},
      {q:'They visited all five museums on Museum Island.',type:'tf',ans:'false'},
      {q:'Overall, the family had a good time in Berlin.',type:'tf',ans:'true'}
    ],
    vocabId:'holidays',
    postReading:[
      {prompt:'The writer visited the Holocaust Memorial and felt "very small and emotional." Why do you think a place can make you feel this way? Write 2 sentences.'},
      {prompt:'Would you like to visit Berlin? Write 2–3 sentences. Use: I would like to... because... / I would definitely visit... / I am interested in...'}
    ]
  },
  { id:'r8', title:'My Exchange Student', level:'A2', type:'Persönlicher Bericht', topic:'People & Friendship',
    vocab:[{en:'exchange student',de:'der Austauschschüler',example:'Marcus is an exchange student from Manchester, England.'},{en:'nervous',de:'nervös'},{en:'homesick',de:'Heimweh haben'},{en:'settle in',de:'sich eingewöhnen',pos:'v',example:'After the first week, Marcus started to settle in at school.'},{en:'grateful',de:'dankbar',example:'I am really grateful that Marcus came to stay with us.'}],
    text:`Three weeks ago, an exchange student called Marcus came to stay with us. He\'s from Manchester, England, and he\'s going to be here for six weeks.
When he first arrived, he seemed quite nervous. He didn\'t say much at dinner and I think he was a little homesick. My mum made his favourite food – pasta – to help him feel at home.
After the first week, Marcus started to settle in. He came to school with me and made some friends quickly. His German isn\'t perfect, but everyone says his accent is funny in a nice way! He plays in our school football team now and he\'s really good.
At weekends, we show him around our town. Last Saturday, we cycled to the lake and had a barbecue. Marcus said it was one of the best days of his life. He also taught us some English slang words – but I can\'t write them here because my teacher would not be happy!
I\'m really grateful that Marcus came to stay with us. I think we\'ve become good friends, and I\'m already planning to visit him in Manchester next summer.`,
    questions:[
      {q:"How has the relationship between the narrator and Marcus developed?",type:'mc',opts:["They still do not know each other well.","Marcus is homesick and unhappy.","They have become good friends.","The narrator finds Marcus difficult to live with."],ans:"They have become good friends.",exp:"\"I think we've become good friends.\" – vorletzter Absatz.",gist:true},
      {q:'Marcus felt very comfortable when he first arrived.',type:'tf',ans:'false'},
      {q:'What did Marcus\'s mum cook to help him feel at home?',type:'mc',opts:['fish and chips','pasta','pizza','soup'],ans:'pasta'},
      {q:'Marcus plays in the school football team.',type:'tf',ans:'true'},
      {q:'What is the narrator planning to do next summer?',type:'mc',opts:['come to England','visit Manchester','go to London','move to England'],ans:'visit Manchester'}
    ],
    vocabId:'family',
    postReading:[
      {prompt:'Marcus felt homesick when he first arrived. Write 2 sentences: How do you think it feels to live in a different country? What would be the hardest thing?'},
      {prompt:'The narrator and Marcus became good friends. Write 2–3 sentences about a friendship that is important to you. What makes them a good friend?'}
    ]
  }
];

// ── TEXT TYPES ─────────────────────────────────────────────────
const TEXT_TYPES = [
  { id:'email', titleDE:'E-Mail', titleEN:'Email', emoji:'📧', matchType:'E-Mail',
    color:'#EFF6FF', border:'#BFDBFE',
    descDE:'Eine E-Mail ist informell, freundlich und direkt. Sie hat einen klaren Aufbau.',
    descEN:'An email is informal, friendly and direct. It has a clear structure.',
    structureDE:['Anrede: Hi [Name],','Einleitung: Worum geht es?','Hauptteil: Deine Infos / Fragen','Schluss: Abschlusssatz','Unterschrift: Best wishes, / See you, [Dein Name]'],
    structureEN:['Greeting: Hi [name],','Opening: What is it about?','Main part: your info / questions','Closing: a final sentence','Signature: Best wishes, / See you, [your name]'],
    tipsDE:['Schreib locker und freundlich – wie an einen Freund.','Stell Gegenfragen: "What about you?"','Nutze Abkürzungen: I\'m, I\'ve, can\'t.'],
    tipsEN:['Write in a relaxed, friendly way – like to a friend.','Ask questions back: "What about you?"','Use contractions: I\'m, I\'ve, can\'t.'],
    phrases:['Hi [name],','My name is ... and I am ... years old.','I live in ... with my family.','My favourite hobby is ...','What do you like doing?','Write back soon!','Best wishes,'],
  },
  { id:'postcard', titleDE:'Postkarte', titleEN:'Postcard', emoji:'🏖️', matchType:'Postkarte',
    color:'#FFF7ED', border:'#FED7AA',
    descDE:'Eine Postkarte ist sehr kurz. Du beschreibst, wo du bist und was du machst. Kein langer Text!',
    descEN:'A postcard is very short. You describe where you are and what you are doing. No long text!',
    structureDE:['Ort & Datum: oben rechts (z.B. London, July 14th)','Anrede: Dear [Name],','2–4 Sätze: Wo bist du? Was machst du? Wie ist das Wetter?','Abschluss: Wish you were here! / Miss you!','Unterschrift'],
    structureEN:['Place & date: top right (e.g. London, July 14th)','Greeting: Dear [name],','2–4 sentences: Where are you? What are you doing? How is the weather?','Closing: Wish you were here! / Miss you!','Signature'],
    tipsDE:['Bleib kurz – Postkarten haben wenig Platz.','Nutze Präsens oder Present Progressive.','Beschreib Wetter, Essen, Sehenswürdigkeiten.'],
    tipsEN:['Keep it short – postcards have little space.','Use the present simple or present progressive.','Describe the weather, food and sights.'],
    phrases:['I am in [place] right now.','The weather is sunny/hot/amazing.','Yesterday we visited ...','The food here is delicious.','I really miss you!','Wish you were here!'],
  },
  { id:'diary', titleDE:'Tagebucheintrag', titleEN:'Diary Entry', emoji:'📔', matchType:'Tagebucheintrag',
    color:'#F0FDF4', border:'#BBF7D0',
    descDE:'Ein Tagebuch ist privat – du schreibst, was du erlebt hast und wie du dich gefühlt hast. Persönlich und ehrlich.',
    descEN:'A diary is private – you write what you experienced and how you felt. Personal and honest.',
    structureDE:['Datum: oben (z.B. Saturday, 14th July)','Anrede: Dear Diary,','Was ist passiert? (Chronologisch)','Wie hast du dich gefühlt?','Abschluss / Ausblick','Unterschrift: [Dein Name]'],
    structureEN:['Date: at the top (e.g. Saturday, 14th July)','Greeting: Dear Diary,','What happened? (in order)','How did you feel?','Closing / outlook','Signature: [your name]'],
    tipsDE:['Schreib in der Vergangenheit (Simple Past).','Nutze Gefühlswörter: excited, nervous, happy, tired.','Sei ehrlich – niemand liest es außer dir!'],
    tipsEN:['Write in the past (Simple Past).','Use feeling words: excited, nervous, happy, tired.','Be honest – no one reads it but you!'],
    phrases:['Dear Diary,','Today was ...','First, I ... Then, I ...','I felt really ... because ...','The best part was ...','I can\'t wait for ...','[Your name]'],
  },
  { id:'story', titleDE:'Kurzgeschichte', titleEN:'Short Story', emoji:'📖', matchType:'Kurzgeschichte',
    color:'#FDF4FF', border:'#E9D5FF',
    descDE:'Eine Geschichte hat einen Anfang, einen Höhepunkt und ein Ende. Sie braucht interessante Charaktere und eine Spannung.',
    descEN:'A story has a beginning, a climax and an ending. It needs interesting characters and some tension.',
    structureDE:['Einleitung: Wer? Wo? Wann?','Konflikt / Problem: Was passiert?','Höhepunkt: Der spannendste Moment','Lösung: Wie wird das Problem gelöst?','Schluss: Was hat sich verändert?'],
    structureEN:['Introduction: Who? Where? When?','Conflict / problem: What happens?','Climax: the most exciting moment','Resolution: How is the problem solved?','Ending: What has changed?'],
    tipsDE:['Starte spannend: "It was a dark and stormy night..."','Benutze Adjektive und Adverbien.','Nutze direkte Rede: "I can\'t believe it!" she said.','Vergangenheit: Simple Past für die Haupthandlung.'],
    tipsEN:['Start with tension: "It was a dark and stormy night..."','Use adjectives and adverbs.','Use direct speech: "I can\'t believe it!" she said.','Past: use the Simple Past for the main action.'],
    phrases:['One day, ...','Suddenly, ...','After a while, ...','In the end, ...','She/He felt ... because ...','To her/his surprise, ...'],
  },
  { id:'letter', titleDE:'Brief', titleEN:'Formal Letter', emoji:'✉️', matchType:'Brief',
    color:'#FFF1F2', border:'#FECDD3',
    descDE:'Ein formeller Brief ist höflicher als eine E-Mail. Er hat einen strengen Aufbau und wird vollständig ausgeschrieben.',
    descEN:'A formal letter is more polite than an email. It has a strict structure and is written out in full.',
    structureDE:['Absenderadresse & Datum (oben rechts)','Anrede: Dear Mr/Ms [Name], oder Dear Sir/Madam,','Einleitung: Ich schreibe, weil...','Hauptteil: Dein Anliegen','Schluss: I look forward to hearing from you.','Unterschrift: Yours sincerely, / Yours faithfully,'],
    structureEN:['Sender address & date (top right)','Greeting: Dear Mr/Ms [name], or Dear Sir/Madam,','Opening: I am writing because...','Main part: your request','Closing: I look forward to hearing from you.','Signature: Yours sincerely, / Yours faithfully,'],
    tipsDE:['Keine Abkürzungen (I am, nicht I\'m).','Höfliche Sprache: Could you please... / I would like to...','Klarer, sachlicher Ton – keine Umgangssprache.'],
    tipsEN:['No contractions (I am, not I\'m).','Polite language: Could you please... / I would like to...','Clear, factual tone – no slang.'],
    phrases:['Dear Mr/Ms [name],','I am writing to ...','I would like to ...','Could you please ...','I look forward to hearing from you.','Yours sincerely,'],
  },
  { id:'article', titleDE:'Zeitungsartikel', titleEN:'Newspaper Article', emoji:'📰', matchType:'Zeitungsartikel',
    color:'#F0F9FF', border:'#BAE6FD',
    descDE:'Ein Zeitungsartikel berichtet über echte oder erfundene Ereignisse. Er ist sachlich, informativ und klar strukturiert.',
    descEN:'A newspaper article reports on real or invented events. It is factual, informative and clearly structured.',
    structureDE:['Überschrift (Headline): kurz, knackig, informativ','Lead: Wer? Was? Wo? Wann? Warum? (1–2 Sätze)','Hauptteil: Details, Fakten, Zitate','Schluss: Ausblick oder Fazit'],
    structureEN:['Headline: short, snappy, informative','Lead: Who? What? Where? When? Why? (1–2 sentences)','Main part: details, facts, quotes','Ending: outlook or conclusion'],
    tipsDE:['Schreib in der dritten Person (he/she/they).','Nutze Fakten, keine Meinungen (außer in Zitaten).','Kurze, klare Sätze – ein Gedanke pro Satz.','Überschrift macht neugierig.'],
    tipsEN:['Write in the third person (he/she/they).','Use facts, not opinions (except in quotes).','Short, clear sentences – one idea per sentence.','Make the headline catchy.'],
    phrases:['On [date], ...','According to ...','Witnesses reported that ...','The event took place at ...','[Name] said: "..."','It is expected that ...'],
  },
];

const WRITING = [
  { id:'w1', title:'Email to a Pen Pal', level:'A1', type:'E-Mail', min:60,
    goalDE:'Du schreibst eine E-Mail an deinen neuen Brieffreund / deine neue Brieffreundin aus England. Stell dich vor und erzähle von dir.',
    goalEN:'You are writing an email to your new pen pal from England. Introduce yourself and tell them about you.',
    example:`Hi Sam,\n\nMy name is Mia and I'm twelve years old. I live in Leipzig, Germany. I have one brother and two cats.\n\nMy favourite subjects at school are English and Art. I love drawing and listening to music.\n\nAt the weekend, I usually go swimming or meet my friends.\n\nWhat about you? Write soon!\nMia`,
    phrases:['My name is ... and I am ... years old.','I live in ... (city), Germany.','I have ... (brothers/sisters).','My favourite subject is ...','I love / like / enjoy ...-ing.','At the weekend, I usually ...','What about you?','Write soon!'],
    starters:['My name is ...','I am ... years old.','I live in ...','My favourite ... is ...','At the weekend, ...','What about you?'],
    checklistDE:['Begrüßung (Hi / Dear ...)','Meinen Namen und Alter genannt','Wo ich wohne','Meine Familie erwähnt','Meine Hobbys beschrieben','Eine Frage gestellt','Abschluss (Write soon! / Best wishes,)','„I" immer groß','Punkte am Satzende'],
    checklistEN:['Greeting (Hi / Dear ...)','Gave my name and age','Where I live','Mentioned my family','Described my hobbies','Asked a question','Closing (Write soon! / Best wishes,)','"I" always capital','Full stops at sentence ends']
  },
  { id:'w2', title:'Postcard from Your Holiday', level:'A1', type:'Postkarte', min:50,
    goalDE:'Du bist im Urlaub und schreibst eine Postkarte an deine beste Freundin / deinen besten Freund.',
    goalEN:'You are on holiday and writing a postcard to your best friend.',
    example:`Hi Tom,\n\nGreetings from Spain! The weather here is great – it's very sunny and hot.\n\nYesterday, we went to the beach and swam in the sea. In the evening, we had dinner at a nice restaurant. The food was delicious!\n\nTomorrow we are going to visit an old castle.\n\nI am having a great time. See you soon!\n\nBest wishes,\nLaura`,
    phrases:['Greetings from ...','The weather here is ... (sunny / rainy / hot / cold).','Yesterday, we went to ... / we visited ...','The food is / was delicious!','I am having a great time.','See you soon!','Best wishes,'],
    starters:['Greetings from ...','The weather here is ...','Yesterday, we ...','Today, we ...','Tomorrow, we are going to ...','I am having ...'],
    checklistDE:['Begrüßung (Greetings from ...)','Wetter beschrieben','Was ich gestern gemacht habe (Simple Past)','Ausblick auf morgen (going-to)','Abschluss geschrieben','„I" immer groß'],
    checklistEN:['Greeting (Greetings from ...)','Described the weather','What I did yesterday (Simple Past)','Outlook for tomorrow (going-to)','Wrote a closing','"I" always capital']
  },
  { id:'w3', title:'Diary Entry – My Weekend', level:'A2', type:'Tagebucheintrag', min:80,
    goalDE:'Schreibe einen Tagebucheintrag über dein letztes Wochenende. Was hast du gemacht? Wie war es?',
    goalEN:'Write a diary entry about your last weekend. What did you do? How was it?',
    example:`Saturday, 15th April\n\nWhat a great weekend!\n\nOn Saturday morning, I got up at nine o'clock. Then I had breakfast with my family. After that, my friend Lucas came to my house and we played football for two hours. It was really fun!\n\nIn the afternoon, we went to the cinema. We watched the new superhero film. It was exciting but a bit too long.\n\nOn Sunday, I stayed at home. In the morning, I helped my mum with the shopping.\n\nAll in all, it was a really good weekend!`,
    phrases:['On Saturday / Sunday ...','In the morning / afternoon / evening ...','First, ... Then, ... After that, ...','It was (really) fun / exciting / boring / nice.','All in all, ...'],
    starters:['On Saturday morning, I ...','First, I ...','Then, we ...','After that, ...','It was ...','All in all, ...'],
    checklistDE:['Datum und Wochentag','Simple Past benutzt','Zeitangaben benutzt','Verbindungswörter (first, then, after that)','Gefühle ausgedrückt','Mindestens 3 Zeitangaben'],
    checklistEN:['Date and weekday','Used the Simple Past','Used time expressions','Linking words (first, then, after that)','Expressed feelings','At least 3 time expressions']
  },
  { id:'w4', title:'A Short Story', level:'A2', type:'Kurzgeschichte', min:80,
    goalDE:'Schreibe eine kurze Geschichte. Beginne mit: "It was a dark and stormy night..." oder wähle einen eigenen Anfang.',
    goalEN:'Write a short story. Start with: "It was a dark and stormy night..." or choose your own beginning.',
    example:`It was a dark and stormy night. Tom was walking home from football training when he heard a strange noise.\n\nHe stopped and looked around. The street was empty. Then he saw something moving in the bushes.\n\nTom's heart was beating fast. He walked slowly towards the bushes. Suddenly, a small cat jumped out! It was wet and scared.\n\nTom smiled. "Don't worry," he said, "I'll take you home."\n\nFrom that day on, the cat slept on Tom's bed every night.`,
    phrases:['It was a ... night / morning.','Suddenly, ...','At that moment, ...','He / She saw / heard / felt ...','In the end, ... / Finally, ...','From that day on, ...'],
    starters:['It was a ... night.','Suddenly, ...','He / She looked at ...','In the end, ...'],
    checklistDE:['Spannenden Anfang','Simple Past benutzt','Verbindungswörter (then, suddenly, after that)','Adjektive benutzt','Ende geschrieben','Mindestens eine direkte Rede'],
    checklistEN:['Exciting opening','Used the Simple Past','Linking words (then, suddenly, after that)','Used adjectives','Wrote an ending','At least one piece of direct speech']
  }
];

const LISTENING = [
  { id:'l1', title:'At the Café', level:'A1', topic:'Food / Everyday Situations',
    vocab:[{en:'order',de:'bestellen'},{en:'large / small',de:'groß / klein'},{en:'to go',de:'zum Mitnehmen'},{en:'change',de:'Wechselgeld'},{en:'to stay',de:'hierbleiben'}],
    script:`Waiter: Good morning! What can I get you?\nCustomer: Hi! Can I have a hot chocolate and a cheese sandwich, please?\nWaiter: Sure! Would you like a large or a small hot chocolate?\nCustomer: A large one, please. How much is that?\nWaiter: That's four pounds fifty.\nCustomer: Here you go. Five pounds.\nWaiter: And fifty pence change. Would you like to eat here or take away?\nCustomer: I'll eat here, thanks.\nWaiter: Of course. I'll bring it to your table.\nCustomer: Thank you!`,
    questions:[
      {q:'What does the customer order?',type:'mc',opts:['a tea and a cake','a hot chocolate and a cheese sandwich','a coffee and a sandwich','a juice and a burger'],ans:'a hot chocolate and a cheese sandwich'},
      {q:'What size hot chocolate does the customer choose?',type:'mc',opts:['small','medium','large','extra large'],ans:'large'},
      {q:'The customer pays exactly four pounds fifty.',type:'tf',ans:'false'},
      {q:'The customer decides to eat at the café.',type:'tf',ans:'true'}
    ]
  },
  { id:'l2', title:'Weekend Plans', level:'A1', topic:'Free Time / Making Plans',
    vocab:[{en:'match',de:'das Spiel'},{en:'invite',de:'einladen'},{en:'free',de:'frei'},{en:'maybe',de:'vielleicht'},{en:'definitely',de:'auf jeden Fall'}],
    script:`Anna: Hi Jake! Are you doing anything this weekend?\nJake: On Saturday I'm going to watch the football match with my dad. It starts at three.\nAnna: Oh nice! What about Sunday?\nJake: I'm not sure yet. Maybe I'll go cycling. What are you doing?\nAnna: On Saturday I'm free in the afternoon. Do you want to come over?\nJake: Yeah, that sounds great! I can come after the match. Is four o'clock okay?\nAnna: Perfect! I'll invite Mia too. We can watch a film.\nJake: Brilliant. See you on Saturday!\nAnna: Don't forget to bring some snacks!\nJake: Definitely!`,
    questions:[
      {q:'What is Jake doing on Saturday afternoon?',type:'mc',opts:['going cycling','watching a film','watching a football match','going shopping'],ans:'watching a football match'},
      {q:'Anna is going shopping on Sunday.',type:'tf',ans:'false'},
      {q:'What time does Jake say he can come to Anna\'s?',type:'mc',opts:['three o\'clock','four o\'clock','five o\'clock','two o\'clock'],ans:'four o\'clock'},
      {q:'Anna is going to invite Mia as well.',type:'tf',ans:'true'}
    ]
  },
  { id:'l3', title:'A Phone Call', level:'A2', topic:'Everyday Communication',
    vocab:[{en:'hold on',de:'warte kurz'},{en:'available',de:'verfügbar'},{en:'cancel',de:'absagen'},{en:'appointment',de:'der Termin'},{en:'unfortunately',de:'leider'}],
    script:`Leo: Hello?\nSophie: Hi Leo, it's Sophie. Are you free tomorrow evening?\nLeo: Tomorrow? Hold on, let me check. Oh, unfortunately I have football training. It starts at six.\nSophie: Oh no! What about Wednesday?\nLeo: Wednesday evening should be fine. What's the plan?\nSophie: There's a new film at the cinema. Do you want to go?\nLeo: That sounds great! What time does it start?\nSophie: There's one at half past seven. Is that okay?\nLeo: Yes, perfect. Where shall we meet?\nSophie: How about outside the cinema at quarter past seven?\nLeo: Good idea. Should I invite Tom as well?\nSophie: Yes, definitely!\nLeo: Great, I'll text him now. See you Wednesday!\nSophie: Brilliant! See you then!`,
    questions:[
      {q:'Why can\'t Leo meet on Tuesday?',type:'mc',opts:['He is working.','He has football training.','He is visiting family.','He is going to the cinema.'],ans:'He has football training.'},
      {q:'They decide to meet on Thursday.',type:'tf',ans:'false'},
      {q:'What time does the film start?',type:'mc',opts:['seven o\'clock','half past six','half past seven','quarter past seven'],ans:'half past seven'},
      {q:'Where do they agree to meet?',type:'mc',opts:['at the bus stop','at Leo\'s house','outside the cinema','at the station'],ans:'outside the cinema'},
      {q:'Leo is going to invite Tom.',type:'tf',ans:'true'}
    ]
  }
];

