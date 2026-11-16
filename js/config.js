// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
// VERSION & CHANGELOG
// Bei jedem neuen Upload:
//  1) APP_VERSION erhöhen (z.B. '1.1')
//  2) Oben in CHANGELOG einen neuen Eintrag ergänzen
//  3) In sw.js die CACHE-Zahl erhöhen (sonst lädt die App die alte Datei!)
// Die SuS sehen die Version unten rechts und bekommen
// beim ersten Öffnen der neuen Version ein Update-Pop-up.
// ═══════════════════════════════════════════════
const APP_VERSION = '2.8';
const CHANGELOG = [
  { v:'2.8', date:'2026', items:[
    'Neue Startseite mit Start-Knopf: Dein Plan für heute zeigt dir drei Schritte, ein Tipp auf „Los geht’s" bringt dich zum nächsten.',
    'Aufgaben von deiner Lehrkraft erscheinen jetzt direkt auf der Startseite. Einen Aufgaben-Link fügst du über „Aufgabe hinzufügen" ein.',
    'Neues Aussehen auf allen Seiten und ein aufgeräumtes Menü: Lernen, Üben, Ich. Sprache und Lesehilfen findest du unten im Menü.',
    'Hörverstehen: Dein Gerät liest dir den Dialog jetzt vor. Den Text blendest du erst ein, wenn du ihn brauchst.',
    'Unregelmäßige Verben: Mit 🔊 hörst du alle drei Formen nacheinander (begin – began – begun).',
    'Grammatik entdecken: Die farbigen Markierungen holst du dir jetzt selbst als Hilfe dazu.',
    'Die Startseite ist kürzer: sechs große Kacheln führen in die Bereiche. Die Zeit-Session findest du jetzt unter „Üben".',
  ]},
  { v:'2.7', date:'2026', items:[
    'Dein Fortschritt ist besser geschützt: Die App legt jeden Tag automatisch eine Kopie an und holt sie zurück, falls etwas verloren geht.',
    'Neue Sicherung über das Teilen-Menü („In Dateien sichern", AirDrop). Die Erinnerung kommt jetzt einmal pro Woche.',
    'Sicherung laden geht jetzt direkt auf dem Willkommens-Bildschirm.',
  ]},
  { v:'2.6', date:'2026', items:[
    'Spiele werden nach und nach freigeschaltet: mit steigendem Level kommen neue Spiele dazu.',
    'Fehler bei einer Going-to-future-Verneinung korrigiert (das not steht jetzt richtig in der Lücke).',
  ]},
  { v:'2.5', date:'2026', items:[
    'Quick-Fire jetzt auch mit Vokabeln – pro Thema oder alle gemischt. Richtige Antworten zählen in die Boxen.',
    'Spiele-Seite aufgeräumt: eine Karte pro Spiel mit Themenwahl statt vieler Kacheln.',
  ]},
  { v:'2.4', date:'2026', items:[
    'Unregelmäßige Verben folgen jetzt der Box-Logik: Quiz, Schreiben und Karteikarten zählen in die Fächer, fällige Verben erscheinen beim Wiederholen.',
    'Wortsuche: Unregelmäßige Verben sind jetzt als Thema auswählbar.',
    'Fragen wie Did you...? werden jetzt richtig eingefärbt (Hilfsverb am Satzanfang).',
    'Sprachwechsel-Lücken geschlossen (Verb-Muster, Listening-Tipps, Klassen-Labels).',
  ]},
  { v:'2.3.1', date:'2026', items:[
    'Verneinungen noch klarer: didn\'t = did (Hilfsverb, orange) + n\'t (roter Marker) – wie beim gelben Endungs-Marker.',
  ]},
  { v:'2.3', date:'2026', items:[
    'Grammatik-Farben nach dem Fokus-Prinzip: Jedes Thema markiert nur noch das, worum es geht – Endungen als gelber Marker, Signalwörter türkis.',
    'Neu: Themen-Check pro Grammatikthema – ab 80 % gilt ein Thema als sicher, darunter gibt es passende Übungsempfehlungen.',
    'Vokabeln: Dein Lernweg empfiehlt das nächste Thema passend zu deiner Klasse (neu: auch Klasse 7). Box-Erklärung und alle Übungsmodi zählen in die Boxen.',
    'Wiederholen ist jetzt im Menü – mit Anzeige, wie viele Wörter fällig sind.',
    'Das Übungspaket bevorzugt jetzt deine Schwerpunkte und fällige Wörter.',
  ]},
  { v:'2.2', date:'2026', items:[
    'Level-Aufstiege und das Tagesziel werden jetzt mit Konfetti gefeiert – und jede Aktivität zeigt dir deine +XP.',
    'Quick-Fire und Spiele geben jetzt XP (1 pro richtiger Antwort bzw. Bonus).',
    'Tagesziel im Profil einstellbar. Karteikarten: Beispielsatz als Hinweis vorn, Rückseite nur noch die Übersetzung.',
    'Vokabeln: Fach-Anzeige pro Wort – bei Fach 5 hakt sich ein Wort automatisch als sicher ab.',
    'Mobil: Bottom-Leiste stabiler und schöner, Menü schließt nach Auswahl, kompakterer Startbereich.',
  ]},
  { v:'2.1', date:'2026', items:[
    'Sprach-Check prüft jetzt auch Vokabular und Hörverstehen – Fehler wandern automatisch in deinen Wiederholungsplan.',
    'Erinnerung an den Zwischenstand-Check alle 6 Wochen.',
    'Neu: Klassenziel-Anzeige (wenn von der Lehrkraft aktiviert).',
    'Fortschritt kann jetzt direkt per E-Mail an die Lehrkraft geschickt werden.',
  ]},
  { v:'2.0', date:'2026', items:[
    'Neu: Sprach-Check beim ersten Start – die App zeigt dir deine Übungs-Schwerpunkte und deine Entwicklung.',
    'Neu: Vokabeln hören & tippen (Diktat) und Aussprache-Training mit dem Mikrofon.',
    'Neue Avatare, die du mit deinem Level freischaltest, plus Level-Fahrplan und Wochenrückblick.',
    'Grammatik-Farben verfeinert: do+n\'t wird getrennt gezeigt, Endungen sind jetzt gelb markiert.',
    'Writing: Erst Checkliste abhaken, dann an die Lehrkraft senden.',
  ]},
  { v:'1.5', date:'2026', items:[
    'Neu: Profil mit Name und Avatar – die App begrüßt dich persönlich.',
    'Grammatik: einheitliche Farben (Subjekt blau · Verb grün · Hilfsverb orange · Verneinung rot · Fragewort lila · Endung pink).',
    'Update-Fenster ist jetzt kürzer und scrollbar.',
  ]},
  { v:'1.4', date:'2026', items:[
    'Neu: Wiederholen mit Lernplan – geübte Vokabeln kommen in Fächer (1–5) und werden nach 1/3/7/14/30 Tagen wieder fällig.',
    'Die Zurück-Taste/-Geste führt jetzt zur vorherigen Seite statt die App zu schließen.',
    'Die App lädt nichts mehr von fremden Servern (Datenschutz) und startet schneller – Schrift und Styles liegen jetzt in der App.',
    'Streak zählt jetzt echte Übungstage, nicht nur das Öffnen der App.',
    'Bestenliste zeigt jetzt die besten Ergebnisse (nicht die neuesten).',
    'Mobile Ansicht: Menü wird oben nicht mehr von der Kopfleiste verdeckt.',
    'Neue Erinnerung, den Lernfortschritt regelmäßig zu sichern.',
    'Navigation ist jetzt per Tastatur bedienbar.',
    'Pip-Baustein: "to slip (on sth.)" und "to slip away" werden jetzt unterschieden.',
  ]},
  { v:'1.3.1', date:'2026', items:[
    'Quick-Fire: Timer stoppt jetzt korrekt, wenn du das Spiel verlässt.',
    'Quick-Fire: Ergebnis wird nicht mehr doppelt in der Bestenliste gespeichert.',
    'Vokabeln tippen: Antworten werden genauer geprüft (keine zufälligen Buchstabenfolgen mehr richtig).',
    'Vokabel-Quiz: keine doppelten Antwortmöglichkeiten mehr.',
    'Food & Drinks: doppelte Vokabeln (recipe, meat) entfernt.',
  ]},
  { v:'1.3', date:'2026', items:[
    'Neues Level-System: Sammle XP und steige im Level auf.',
    'Tagesziel mit Fortschrittsring auf der Startseite.',
    'Deine Streak ist jetzt immer sichtbar.',
    'Neue Abzeichen: 7- und 30-Tage-Streak, Spiele-Start, Spiele-Meister, 100 Wörter, Level 5.',
    'Hinweis Neuer Rekord bei Memory und Quick-Fire.',
  ]},
  { v:'1.2', date:'2026', items:[
    'Vokabeln: neue Filter SOUL 5 und SOUL 6.',
    'Wörterbuch-Seite jetzt unten bei den Spielen statt ganz oben.',
    'Writing: Haiku und Akrostichon in die Kreativ-Ecke verschoben, Fokus auf die Hauptaufgaben.',
    'My Progress: Übersicht über gespielte Spiele.',
    'Unregelmäßige Verben haben jetzt eine Druckfunktion.',
    'Druckansicht öffnet in der App mit Zurück-Button (kein neues Fenster mehr).',
    'Satzbauübungen: deutlicher Hinweis, wenn eine Frage gebildet werden soll.',
    'Grammatik: doppeltes Emoji auf Deutsch behoben.',
  ]},
  { v:'1.1', date:'2026', items:[
    'Alle SOUL-Bausteine als Vokabeln ergänzt (Klasse 5: Holidays, Party; Klasse 6: Maple Hill, Christmas, Peacemakers, Pip).',
    'Neuer A1-Grundwortschatz: häufige Verben, Adjektive, Zahlen, Farben, Tage/Monate/Zeit und kleine Wörter.',
    'Neue Seite Wörterbucharbeit (Dictionary Skills).',
    'Vokabel-Suchfeld und Druckansicht (A4).',
    'Größere Schrift wirkt jetzt auf die ganze App.',
    'Die App aktualisiert sich automatisch, wenn das Gerät online ist.',
  ]},
  { v:'1.0', date:'2026', items:[
    'Erste Beta-Version des English Companion.',
  ]},
  // Beispiel für den nächsten Upload:
  // { v:'1.1', date:'2026', items:[
  //   'Hangman: Beispielsatz am Ende ergänzt.',
  //   'Vokabeln: Tabelle auf dem Handy lesbarer.',
  // ]},
];

// ═══════════════════════════════════════════════
// LEHRKRÄFTE – hier einfach Namen pflegen.
// Aus "Vorname Nachname" wird automatisch
// vorname.nachname@esz-baddueben.de
// Umlaute werden ersetzt (ä→ae, ö→oe, ü→ue, ß→ss).
// ═══════════════════════════════════════════════
const TEACHER_DOMAIN = 'esz-baddueben.de';
const TEACHER_NAMES = [
  'Leonart Schmitt',
  // weitere Lehrkräfte hier ergänzen, z.B.:
  // 'Anna Müller',
  // 'Tom Becker',
];
function teacherEmailFromName(name){
  const map = {'ä':'ae','ö':'oe','ü':'ue','ß':'ss','Ä':'ae','Ö':'oe','Ü':'ue'};
  const slug = (name||'').trim().toLowerCase()
    .replace(/[äöüßÄÖÜ]/g, ch=>map[ch]||ch)
    .replace(/[^a-z\s.-]/g,'')
    .replace(/\s+/g,'.');
  return slug ? slug + '@' + TEACHER_DOMAIN : '';
}
function teacherOptions(){
  return TEACHER_NAMES.map(n=>({name:n, email:teacherEmailFromName(n)}));
}

// ═══════════════════════════════════════════════
// KLASSENZIEL (optional) – hier als Lehrkraft pflegen.
// active auf true setzen, Zeitraum und XP-Ziel pro Schüler anpassen.
// Jeder Schüler sieht auf der Startseite seinen eigenen Beitrag
// (gezählt werden XP im Zeitraum; das XP-Tagebuch reicht 30 Tage zurück,
// der Zeitraum sollte also höchstens ~4 Wochen lang sein).
// Die Klassensumme siehst du in teacher.html über die Schüler-Exporte.
// ═══════════════════════════════════════════════
const CLASS_GOAL = {
  active: false,
  label: 'Fit in die Ferien!',
  perStudentXP: 300,
  from: '2026-07-01',
  until: '2026-07-24'
};

function classGoalHTML(){
  if(!CLASS_GOAL.active) return '';
  const today = new Date().toISOString().slice(0,10);
  if(today < CLASS_GOAL.from || today > CLASS_GOAL.until) return '';
  let xp = 0;
  for(const d in (P.xpLog||{})){ if(d >= CLASS_GOAL.from && d <= CLASS_GOAL.until) xp += P.xpLog[d]; }
  const pct = Math.min(100, Math.round(xp/CLASS_GOAL.perStudentXP*100));
  return `<div class="card" style="background:linear-gradient(135deg,#FDF4FF,#FAE8FF);border-color:#E9D5FF">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem">
      <span style="font-size:1.6rem">🏆</span>
      <div style="flex:1;min-width:0">
        <p style="font-weight:800;color:#6B21A8;font-size:.95rem">${T('classgoal_title')}: ${CLASS_GOAL.label}</p>
        <p style="font-size:.78rem;color:#9333EA">${T('classgoal_until')} ${CLASS_GOAL.until}</p>
      </div>
      <span style="font-weight:800;color:#6B21A8;white-space:nowrap">${xp}/${CLASS_GOAL.perStudentXP} XP</span>
    </div>
    ${pb(pct,'#A855F7')}
    <p style="font-size:.78rem;color:#9333EA;margin-top:.35rem">${pct>=100?T('classgoal_done'):T('classgoal_your')}</p>
  </div>`;
}

