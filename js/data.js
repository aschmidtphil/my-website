/**
 * data.js — All static content data
 * Edit this file to update content on the website.
 */

'use strict';

// DATA — Bücher
// ════════════════════════════════════════════════
let buecher=[
  {jahr:'ca. 1992',autor:'Hagen, Sabine',titel:'Tiere, liebe Tiere',erschj:'1992',bereich:'Kinderbuch',status:'gelesen',notes:'Kindheitserinnerung'},
  {jahr:'ca. 1998',autor:'Stehr, Sabine',titel:'Elf ist freundlich und fünf ist laut',erschj:'1994',bereich:'Kinderbuch',status:'gelesen',notes:'Kindheitserinnerung'},
  {jahr:'2012',autor:'Taylor, Charles',titel:'Quellen des Selbst',erschj:'1989',bereich:'Philosophie',status:'intensiv gelesen',notes:'Studium Philosophie'},
  {jahr:'2012',autor:'Aristoteles',titel:'Metaphysik',erschj:'ca. 350 v.Chr.',bereich:'Philosophie',status:'intensiv gelesen',notes:'Studium'},
  {jahr:'2012',autor:'Hegel, G. W. F.',titel:'Phänomenologie des Geistes',erschj:'1807',bereich:'Philosophie',status:'intensiv gelesen',notes:'Studium'},
  {jahr:'2012',autor:'Snell, Bruno',titel:'Die Entdeckung des Geistes',erschj:'1946',bereich:'Philosophie',status:'gelesen',notes:'Studium'},
  {jahr:'2017',autor:'Ariès, Philippe',titel:'Geschichte des Todes',erschj:'1977',bereich:'Sachbuch',status:'gelesen',notes:''},
  {jahr:'2017',autor:'Schelling, F. W. J.',titel:'Die Weltalter (alle drei Druckfassungen)',erschj:'1811–1815',bereich:'Philosophie',status:'intensiv gelesen',notes:'Dissertationsprojekt'},
  {jahr:'2017',autor:'Tilliette, Xavier',titel:'Schelling (Biographie)',erschj:'2004',bereich:'Biographie',status:'gelesen',notes:''},
  {jahr:'2017',autor:'Schelling, F. W. J.',titel:'Freiheitsschrift',erschj:'1809',bereich:'Philosophie',status:'intensiv gelesen',notes:'Seminarlektüre'},
  {jahr:'2017',autor:'Schelling, F. W. J.',titel:'Stuttgarter Privatvorlesungen',erschj:'1810',bereich:'Philosophie',status:'intensiv gelesen',notes:''},
  {jahr:'2017',autor:'Römer, Inga',titel:'Das Zeitdenken bei Husserl, Heidegger und Ricoeur',erschj:'2010',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2018',autor:'Schelling, F. W. J.',titel:'Clara. Über den Zusammenhang der Natur mit der Geisterwelt',erschj:'1862',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2018',autor:'Aurel, Marc',titel:'Selbstbetrachtungen',erschj:'ca. 170–180',bereich:'Philosophie',status:'gelesen',notes:'Stoizismus'},
  {jahr:'2018',autor:'Schelling, F. W. J.',titel:'System der Weltalter',erschj:'1827',bereich:'Philosophie',status:'intensiv gelesen',notes:'Dissertation'},
  {jahr:'2018',autor:'Schelling, F. W. J.',titel:'Initia Philosophiae Universiae (Erlanger Vorlesung)',erschj:'1820/21',bereich:'Philosophie',status:'intensiv gelesen',notes:'Dissertation'},
  {jahr:'2018',autor:'Arndt / Jaeschke',titel:'Geschichte der Philosophie Band IX, 2',erschj:'2012',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2018',autor:'Gordon, Sarah / Barad, Karen',titel:'Das Café der Existenzialisten',erschj:'2016',bereich:'Sachbuch',status:'gelesen',notes:''},
  {jahr:'2019',autor:'Friedrich, Hans-Joachim',titel:'Der Ungrund der Freiheit im Denken von Böhme, Schelling und Heidegger',erschj:'2009',bereich:'Philosophie',status:'intensiv gelesen',notes:'Schellingiana Bd. 24'},
  {jahr:'2019',autor:'Tengelyi, László',titel:'Welt und Unendlichkeit',erschj:'2014',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2019',autor:'Habermas, Jürgen',titel:'Das Absolute und die Geschichte',erschj:'1954',bereich:'Philosophie',status:'gelesen',notes:'Frühe Schelling-Arbeit'},
  {jahr:'2019',autor:'Jacobi, Friedrich Heinrich',titel:'Über die Lehre des Spinoza',erschj:'1785',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2019',autor:'Eilenberger, Wolfram',titel:'Zeit der Zauberer',erschj:'2018',bereich:'Sachbuch',status:'gelesen',notes:'Wittgenstein, Heidegger, Benjamin, Cassirer'},
  {jahr:'2020',autor:'Yorikawa, Joji',titel:'Das System der Philosophie und das Nichts',erschj:'2007',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Müller-Lüneschloß, Vicky',titel:'Über das Verhältnis von Natur und Geisterwelt',erschj:'2012',bereich:'Philosophie',status:'gelesen',notes:'Schelling'},
  {jahr:'2020',autor:'Safranski, Rüdiger',titel:'Hölderlin: Komm! ins Offene, Freund!',erschj:'2019',bereich:'Biographie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Schnell, Alexander',titel:'Seinsschwingungen',erschj:'2017',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Angehrn, Emil',titel:'Philosophie zwischen Ursprungsdenken und Ursprungskritik',erschj:'1996',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Trawny, Peter',titel:'Philosophie der Liebe',erschj:'2018',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Sommer, Konstanze',titel:'Zwischen Metaphysik und Metaphysikkritik',erschj:'2016',bereich:'Philosophie',status:'teilweise',notes:'Erste Hälfte'},
  {jahr:'2020',autor:'Grünwald, Martin',titel:'Homo Hapticus',erschj:'2017',bereich:'Sachbuch',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Ostritsch, Sebastian',titel:'Hegel. Der Weltphilosoph',erschj:'2020',bereich:'Biographie',status:'gelesen',notes:''},
  {jahr:'2020',autor:'Eilenberger, Wolfram',titel:'Feuer der Freiheit',erschj:'2020',bereich:'Sachbuch',status:'gelesen',notes:'Audible'},
  {jahr:'2020',autor:'Heidegger, Martin',titel:'GA 42 – Schelling vom Wesen der menschlichen Freiheit',erschj:'2016',bereich:'Philosophie',status:'intensiv gelesen',notes:'Erneute Lektüre'},
  {jahr:'2020',autor:'Sandkaulen, Birgit',titel:'System und Freiheit',erschj:'2019',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2021',autor:'Anonymus',titel:'Traktat über die drei Betrüger',erschj:'ca. 1700',bereich:'Philosophie',status:'gelesen',notes:'Frühaufklärung'},
  {jahr:'2021',autor:'Sandkaulen, Birgit',titel:'Grund und Ursache. Die Vernunftkritik Jacobis',erschj:'2000',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2021',autor:'Scholtz, Gunter',titel:'Philosophie des Meeres',erschj:'2016',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2021',autor:'Schelling, F. W. J.',titel:'Darstellung meines Systems der Philosophie (1801)',erschj:'1801',bereich:'Philosophie',status:'intensiv gelesen',notes:'Erneute Lektüre'},
  {jahr:'2021',autor:'Xian, Gang',titel:'Schellings Idee der Weltalterphilosophie und seine Lehre von der Zeit',erschj:'2019',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2021',autor:'Oberleitner, Alexander',titel:'Michael Endes Philosophie',erschj:'2020',bereich:'Sachbuch',status:'gelesen',notes:''},
  {jahr:'2021',autor:'Trawny, Peter',titel:'Krise der Wahrheit',erschj:'2021',bereich:'Philosophie',status:'gelesen',notes:''},
  {jahr:'2022',autor:'Schelling, F. W. J.',titel:'Die Weltalter – Dritter Druck',erschj:'1815',bereich:'Philosophie',status:'intensiv gelesen',notes:'Dissertation – finale Fassung'},
  {jahr:'2023',autor:'Schmidt, Alexander',titel:'Schellings Zeittheorie. Das verborgene System hinter der Weltalterphilosophie.',erschj:'2023',bereich:'Philosophie',status:'intensiv gelesen',notes:'Eigene Dissertation'},
  {jahr:'2024',autor:'Biernat / Wilson',titel:'Play Nice! (Avicii-Biographie)',erschj:'2024',bereich:'Biographie',status:'gelesen',notes:'Auch Audible'},
  {jahr:'2024',autor:'Montaigne, Michel de',titel:'Essais',erschj:'1580',bereich:'Literatur',status:'gelesen',notes:''},
  {jahr:'2024',autor:'Bakewell, Sarah',titel:'Wie soll ich leben? Das Leben Montaignes',erschj:'2010',bereich:'Biographie',status:'gelesen',notes:''},
  {jahr:'2024',autor:'Antognazza, Maria Rosa',titel:'Die beste aller möglichen Welten: Leibniz',erschj:'2009',bereich:'Biographie',status:'gelesen',notes:''},
  {jahr:'2024',autor:'Aurel, Marc',titel:'Selbstbetrachtungen',erschj:'ca. 170',bereich:'Philosophie',status:'gelesen',notes:'Erneute Lektüre'},
  {jahr:'2025',autor:'Ahrens, Sven',titel:'Den Netten beißen die Hunde',erschj:'2023',bereich:'Selbstentwicklung',status:'gelesen',notes:''},
  {jahr:'2025',autor:'Stahl, Stefanie',titel:'Das Kind in dir muss Heimat finden',erschj:'2015',bereich:'Selbstentwicklung',status:'gelesen',notes:''},
  {jahr:'2025',autor:'Mohr, Mans',titel:'Tim – Die offizielle Avicii-Biografie',erschj:'2021',bereich:'Biographie',status:'gelesen',notes:''},
];

// ════════════════════════════════════════════════
// DATA — Gaming DB
// ════════════════════════════════════════════════
const DB = {
  wc3:[
    {badge:'gb-human',badgeText:'HUMAN',title:'Human Alliance',text:'Stärke in Synergien von Priestern und Towerverteidigung. Militia-Rush als Earlygame-Strategie kombiniert mit Knight-Push im Lategame.',tags:['Tower Rush','Paladin Stack','Militia Micro']},
    {badge:'gb-orc',badgeText:'ORC',title:'Orcish Horde',text:'Far Seer mit Chain Lightning dominiert das Earlygame. Raiders für Creeping-Effizienz. Blademaster-Harass als klassischer Opener.',tags:['Blademaster','Raider Harass','Tauren']},
    {badge:'gb-ne',badgeText:'NIGHT ELF',title:'Nachtelfen + Tavernenhelden',text:'Meine Lieblingstaktik: Nachtelfen als Basis kombiniert mit starken Tavernenhelden. Die Taverne erlaubt situatives Reagieren auf jeden Gegner. Ich wollte Progamer werden — und habe tatsächlich den ein oder anderen Pro geschlagen.',tags:['Taverne','Nachtelfen','Progamer-Traum']},
    {badge:'gb-ud',badgeText:'UNDEAD',title:'Scourge',text:'Death Knight als dominanter Anführer mit Unholy Aura. Lich für AoE-Kontrolle. Gargoyle-Rush bei Luftschwäche des Gegners.',tags:['Death Knight','Lich','Abomination']},
  ],
  sc:[
    {badge:'gb-sc',badgeText:'STARCRAFT',title:'StarCraft — eine Lebensbegleitung',text:'Seit der Jugend. StarCraft 1 und 2. Die Protoss sind meine Rasse — nicht wegen ihrer Stärke, sondern wegen ihrer Würde und Tragik.',tags:['Protoss','Brood War','SC2']},
    {badge:'gb-sc',badgeText:'PROTOSS',title:'Warum Protoss',text:'Zealots. Carriers. High Templar und ihre Psi-Storms. Die Protoss spielen sich wie ein philosophisches Argument: Disziplin als Fundament, Geist als Waffe.',tags:['Zealot','Carrier','High Templar']},
    {badge:'gb-sc',badgeText:'BROOD WAR',title:'Brood War — der Maßstab',text:'Brood War bleibt das Maß aller Dinge. Die mechanische Tiefe, das Unit-Micro, die Karten — nichts hat das je übertroffen.',tags:['Brood War','Remastered','Micro']},
    {badge:'gb-sc',badgeText:'SC2',title:'StarCraft II',text:'SC2 ist zugänglicher. Das Einheitendesign ist brillant — Colossus, Immortal, Void Ray. Die Wings-of-Liberty-Kampagne ist eine der besten RTS-Kampagnen überhaupt.',tags:['Wings of Liberty','Colossus','Immortal']},
  ],
  diablo:[
    {badge:'gb-diablo',badgeText:'DIABLO',title:'Diablo — seit Teil 3',text:'Eingestiegen mit Diablo 3. Das ursprüngliche Negativurteil der Community verstand ich nicht — das Spiel ist glorreich. Nach Reaper of Souls wurde aus einem mittelmäßigen ein exzellentes Spiel.',tags:['Diablo 3','D4','Action-RPG']},
    {badge:'gb-diablo',badgeText:'D3',title:'Diablo 3 — unterschätzt',text:'Monk und Witch Doctor sind meine Lieblingsklassen. Das Paragon-System und die Saison-Mechanik haben D3 zu einem der langlebigsten ARPGs gemacht.',tags:['Monk','Witch Doctor','Reaper of Souls']},
    {badge:'gb-diablo',badgeText:'D4',title:'Diablo 4 — Ambition',text:'Lilith als Antagonistin ist brillant. Die offene Welt und das Worldbuilding sind das bisher stärkste der Reihe.',tags:['Lilith','Open World','Seasons']},
    {badge:'gb-diablo',badgeText:'KLASSEN',title:'Lieblingsklassen',text:'Necromancer für den philosophischen Touch: Herrschaft über Leben und Tod als Spielmechanik. Rogue für Eleganz des Bewegungsflusses.',tags:['Necromancer','Rogue','Sorcerer']},
  ],
  sotc:[
    {badge:'gb-sotc',badgeText:'SOTC',title:'Shadow of the Colossus',text:'Das Spiel, das ich am meisten als Kunst bezeichnen würde. 16 gigantische Kolosse, eine leere Welt, eine Frage nach dem Preis des Handelns.',tags:['Agro','Wander','Team Ico']},
    {badge:'gb-sotc',badgeText:'LIEBLING',title:'Lieblingskoloss: Malus',text:'Der finale Koloss — ein Monument aus Stein, das aus dem Sturm ragt. Der Aufstieg ist ein Ritual. Monumental und still.',tags:['Final Boss','Malus','Epik']},
    {badge:'gb-sotc',badgeText:'THEMA',title:'Stille als Erzählmittel',text:'Kein Dialog, keine NPC-Quests. Die Welt spricht durch Architektur, Wind und das Schweigen der Kolosse.',tags:['Game Design','Stille','Atmosphäre']},
    {badge:'gb-sotc',badgeText:'KUNST',title:'Philosophisches Spiel',text:'Shadow of the Colossus stellt die philosophisch tiefste Frage der Spielegeschichte: Was bist du bereit zu opfern — und verwandelt dich das Opfer in das, was du bekämpfst?',tags:['Ethik','Opfer','Transformation']},
  ],
  hk:[
    {badge:'gb-hk',badgeText:'HOLLOW KNIGHT',title:'Hollow Knight',text:'Metroidvania-Meisterwerk von Team Cherry. Handgezeichnete Welt, präzises Gameplay, melancholische Tiefe.',tags:['Metroidvania','Team Cherry','Silksong']},
    {badge:'gb-hk',badgeText:'BOSS',title:'Lieblingsbosse',text:'Mantis Lords für elegante Choreographie. Pure Vessel als emotionaler Höhepunkt. Nightmare King Grimm für Intensität.',tags:['Mantis Lords','Pure Vessel','NKG']},
    {badge:'gb-hk',badgeText:'LORE',title:'Lore & Worldbuilding',text:'Die Geschichte von Hallownest entfaltet sich durch Fragmente — Grabinschriften, Träume, stumme Begegnungen.',tags:['Pale King','Radiance','Void']},
  ],
  ff:[
    {badge:'gb-ff',badgeText:'FF VII',title:'Final Fantasy VII',text:'Charakterentwicklung und emotionales Storytelling in Reinform. Cloud Strife als komplexer Antiheld mit gebrochener Identität.',tags:['Cloud','Sephiroth','Midgar']},
    {badge:'gb-ff',badgeText:'FF VI',title:'Final Fantasy VI',text:'Terra, Kefka, Oper — ein Ensemble-Cast ohne Parallele. Kefkas nihilistischer Triumph ist einer der kühnsten Wendepunkte der Spielegeschichte.',tags:['Terra','Kefka','Oper']},
    {badge:'gb-ff',badgeText:'FF IX',title:'Final Fantasy IX',text:'Rückkehr zu den Wurzeln. Zidane ist einer der wenigen positiv-empathischen Protagonisten der Serie.',tags:['Zidane','Vivi','Alexandria']},
    {badge:'gb-ff',badgeText:'MUSIK',title:'Nobuo Uematsu',text:'One-Winged Angel. Terra\'s Theme. Melodies of Life. Uematsu hat eine eigene Sprache für emotionale Tiefe erschaffen.',tags:['Uematsu','OST','One-Winged Angel']},
  ],
  lufia:[
    {badge:'gb-lufia',badgeText:'SNES 1995',title:'Lufia 2 — ein vergessenes Meisterwerk',text:'Lufia 2: Rise of the Sinistrals (SNES, 1995) hat Konzepte vorweggenommen, die erst Jahre später anderswo auftauchten.',tags:['SNES','RPG','Rise of the Sinistrals']},
    {badge:'gb-lufia',badgeText:'PROTO-POKÉMON',title:'Kapselmonster',text:'Lange vor Pokémons Mainstream-Durchbruch: Kapselmonster, die man findet, füttert und entwickelt — 1995, mit eigenem Affektionssystem.',tags:['Kapselmonster','1995','Innovation']},
    {badge:'gb-lufia',badgeText:'PROTO-ROGUELITE',title:'Die Ahnenhöhle',text:'99 Stockwerke, prozedural generiert, kein Save: eines der ersten Roguelite-Dungeons. Lufia 2 hat das Genre vorweggenommen.',tags:['Ahnenhöhle','99 Floors','Dungeon']},
    {badge:'gb-lufia',badgeText:'FINALE',title:'Das tragische Ende',text:'Das Finale von Lufia 2 ist eines der emotional stärksten Enden der SNES-Ära. Maxim und Selan — kein Triumph, sondern Verlust.',tags:['Maxim','Selan','Finale']},
  ],
  kknd:[
    {badge:'gb-kknd',badgeText:'KKND2',title:'KKND 2 — verstecktes Meisterwerk',text:'Erhalten als Teil einer Play-the-Games-Sammlung. Erste Reaktion: Baby-Motorräder? Zweite Reaktion: Das ist eines der tiefsten RTS der 90er.',tags:['RTS','1998','Krossfire']},
    {badge:'gb-kknd',badgeText:'DESIGN',title:'Designvorsprung',text:'KKND2 war seinen Konkurrenten in vielem voraus: Ressourcenmanagement, KI-Aggressivität, Unit-Diversität.',tags:['Design','1998','Unterschätzt']},
    {badge:'gb-kknd',badgeText:'RITUAL',title:'Das KKND-Ritual',text:'KKND2 spiele ich immer dann durch, wenn ich einen langen Urlaub habe oder einen neuen PC kaufe. Ein Ritual.',tags:['Ritual','Urlaub','Neuer PC']},
  ],
  fc:[
    {badge:'gb-fc',badgeText:'PS1 1998',title:'Future Cop L.A.P.D.',text:'Future Cop ist heute nicht mehr legal erhältlich — Abandonware. Für mich eines der prägendsten PS1-Spiele überhaupt.',tags:['PS1','1998','Abandonware']},
    {badge:'gb-fc',badgeText:'SKY CAPTAIN',title:'Der Sky Captain',text:'Der Sky Captain und seine unvergesslichen Sprüche. Die Walker-Transformation zwischen Kampf- und Hover-Modus war 1998 ein Designgewinn.',tags:['Sky Captain','Walker','Hover']},
    {badge:'gb-fc',badgeText:'ABANDONWARE',title:'Verlust durch Copyright',text:'EA hält die Rechte, macht aber nichts damit. Ein Paradebeispiel für den kulturellen Verlust durch Copyright ohne Verwertung.',tags:['EA','Copyright','Lost Games']},
  ],
  sg:[
    {badge:'gb-sg',badgeText:'VISUAL NOVEL',title:'Steins;Gate — Zeitreise als Philosophie',text:'Das beste Visual Novel und eine der besten Zeitreise-Geschichten überhaupt. Okabe Rintaros Einsamkeit — das ist Philosophie in Spielform.',tags:['Visual Novel','Zeitreise','5pb']},
    {badge:'gb-sg',badgeText:'OKABE',title:'Okabe Rintaro',text:'Kaum eine Figur hat mich mehr berührt. Ein Mann, der die Last aller möglichen Timelines trägt, weil er der einzige ist, der sich erinnert. El Psy Kongroo.',tags:['Okabe','Kyouma','El Psy Kongroo']},
    {badge:'gb-sg',badgeText:'PHILOSOPHIE',title:'Parallele zur Dissertation',text:'Schellings Weltalter denkt Geschichte als Verzweigung möglicher Welten. Steins;Gate denkt dasselbe — in Narrativform. Beide fragen: Was gibt dem Sein eine Richtung?',tags:['Zeitphilosophie','Schelling','Worldlines']},
  ],
  pw:[
    {badge:'gb-pw',badgeText:'ACE ATTORNEY',title:'Phoenix Wright — Logik als Spielprinzip',text:'Gericht als Thriller, Argumentation als Spielmechanik. Das Aufdecken von Widersprüchen ist das reinste Vergnügen.',tags:['Capcom','Ace Attorney','DS']},
    {badge:'gb-pw',badgeText:'LOGIK',title:'Logik & Rhetorik',text:'Phoenix Wright lehrt Zuhören, Widersprüche erkennen, Argumente aufbauen. Eine philosophische Übung in Spielform — Sokrates hätte es geliebt.',tags:['Logik','Widerspruch','Rhetorik']},
    {badge:'gb-pw',badgeText:'CHARAKTERE',title:'Lieblingscharaktere',text:'Miles Edgeworth als perfekter Antagonist-turned-Ally. Franziska von Karma. Godot.',tags:['Edgeworth','Franziska','Godot']},
  ],
  mmbn:[
    {badge:'gb-mmbn',badgeText:'GBA',title:'Mega Man Battle Network',text:'Die Battle Network-Reihe (GBA, 2001–2006) verbindet Action-RPG mit Deck-Building und einer faszinierenden Cyber-Welt-Doppelstruktur.',tags:['GBA','Action-RPG','Deck-Building']},
    {badge:'gb-mmbn',badgeText:'BATTLE SYSTEM',title:'Das Chip-Deck-System',text:'Eines der kreativsten Battle-Systeme seiner Zeit. Jede Begegnung ist ein kleines Puzzle. Program Advances als Belohnung für Vorbereitung.',tags:['Chips','Program Advance','Battle']},
    {badge:'gb-mmbn',badgeText:'LORE',title:'Cyber-Welt & Doppelstruktur',text:'Mensch und NetNavi leben symbiotisch — diese Doppelstruktur von analog und digital war 2001 visionär.',tags:['SciLab','Internet','NetNavi']},
  ],
  podcasts:[
    {name:'Lex Fridman Podcast',host:'Lex Fridman',desc:'Tiefgründige Gespräche mit Wissenschaftlern, KI-Forschern und Philosophen über die großen Fragen der Zeit.',icon:'🎙️',iconBg:'#1a1a2e',tags:['KI','Wissenschaft','Tech']},
    {name:'The Tim Ferriss Show',host:'Tim Ferriss',desc:'Interviews mit Weltklasse-Performern — ihre Routinen, Werkzeuge und mentalen Modelle.',icon:'⏱️',iconBg:'#1a2e1a',tags:['Performance','Business','Leben']},
    {name:'Huberman Lab',host:'Andrew Huberman',desc:'Neurowissenschaft für den Alltag. Schlaf, Fokus, Motivation — wissenschaftlich fundiert und praktisch anwendbar.',icon:'🧠',iconBg:'#1a1a2e',tags:['Neurowissenschaft','Gesundheit','Bio']},
    {name:'Philosophy Bites',host:'Warburton & Edmonds',desc:'Kurze, dichte Gespräche mit Philosophen über einzelne Ideen. Der perfekte Einstieg in neue Denker.',icon:'🔮',iconBg:'#1e1a2e',tags:['Philosophie','Ideen','Ethik']},
    {name:'Darknet Diaries',host:'Jack Rhysider',desc:'True-crime Stories aus der Welt der Hacker, Spionage und Cybersicherheit.',icon:'🕵️',iconBg:'#1a1f1a',tags:['Security','Tech','Stories']},
    {name:'Machine Learning Street Talk',host:'Tim Scarfe',desc:'Technisch tiefe Diskussionen über Machine Learning Research.',icon:'🤖',iconBg:'#0a1a2e',tags:['ML','Research','Deep Dives']},
  ],
};

// ════════════════════════════════════════════════
// DATA — Philosopher Timeline (82 Philosophen)
// ════════════════════════════════════════════════
const PHILS_DATA = [
  {name:'Thales',birth:-624,death:-546,epoch:'Vorsokratik',color:'#6c63ff',x:0.03,above:true,desc:'Erster Philosoph des Abendlands. Erklärte die Welt aus Wasser statt aus Mythen.',ideas:['Wasser als Urstoff aller Dinge','Hylozoismus: Alles ist beseelt','Begründer der Naturphilosophie']},
  {name:'Anaximander',birth:-610,death:-546,epoch:'Vorsokratik',color:'#6c63ff',x:0.04,above:false,desc:'Schüler des Thales. Postulierte das Apeiron (das Unbegrenzte) als Urstoff.',ideas:['Das Apeiron als unbegrenzter Urstoff','Entstehung der Welt aus dem Unbegrenzten','Älteste erhaltene Prosa der griechischen Philosophie']},
  {name:'Anaximenes',birth:-585,death:-525,epoch:'Vorsokratik',color:'#6c63ff',x:0.05,above:true,desc:'Sah Luft als Urprinzip: Verdichtung erzeugt Wasser und Erde; Verdünnung erzeugt Feuer.',ideas:['Luft als Urprinzip (Arche)','Verdichtung und Verdünnung als kosmische Prozesse','Seele als Luft']},
  {name:'Pythagoras',birth:-570,death:-495,epoch:'Vorsokratik',color:'#8b80ff',x:0.06,above:false,desc:'Mathematiker und Mystiker. Die Wirklichkeit ist im Kern mathematische Struktur.',ideas:['Zahlen als Grundstruktur der Wirklichkeit','Pythagorischer Lehrsatz','Seelenwanderung (Metempsychose)']},
  {name:'Heraklit',birth:-535,death:-475,epoch:'Vorsokratik',color:'#6c63ff',x:0.07,above:true,desc:'Denker des ewigen Wandels. Der Logos verbindet die Gegensätze.',ideas:['Alles fließt (panta rhei)','Logos als Weltvernunft','Einheit der Gegensätze']},
  {name:'Parmenides',birth:-515,death:-450,epoch:'Vorsokratik',color:'#7a6fff',x:0.08,above:false,desc:'Begründer der Ontologie. Das Sein ist ewig, unteilbar, unveränderlich. Wandel ist Illusion.',ideas:['Sein ist — Nichtsein ist nicht','Denken und Sein sind dasselbe','Grundlegung der Ontologie']},
  {name:'Zenon v. Elea',birth:-490,death:-430,epoch:'Vorsokratik',color:'#7a6fff',x:0.09,above:true,desc:'Schüler des Parmenides. Erfand die Paradoxien um die Illusorität der Bewegung zu beweisen.',ideas:['Achilles und die Schildkröte','Dichotomie-Paradoxon','Verteidigung des Parmenideischen Seins']},
  {name:'Empedokles',birth:-495,death:-435,epoch:'Vorsokratik',color:'#6c63ff',x:0.10,above:false,desc:'Lehrte vier Wurzeln: Feuer, Wasser, Luft, Erde — verbunden durch Liebe, getrennt durch Streit.',ideas:['Vier-Elemente-Lehre','Liebe und Streit als kosmische Kräfte','Erste Evolutionstheorie']},
  {name:'Demokrit',birth:-460,death:-371,epoch:'Vorsokratik',color:'#5a50e8',x:0.12,above:false,desc:'Begründer des Atomismus. Die Welt besteht aus unteilbaren Atomen im leeren Raum.',ideas:['Atomismus: Alles aus Atomen und leerem Raum','Determinismus: Alles hat eine Ursache','Empfehlung des heiteren Lebens']},
  {name:'Sokrates',birth:-469,death:-399,epoch:'Klassisch',color:'#f7971e',x:0.14,above:true,desc:'Begründer der ethischen Philosophie. Schrieb nichts — lebt durch Platons Dialoge. Starb für sein Denken.',ideas:['Ich weiß dass ich nichts weiß','Mäeutik: Die Hebammenkunst des Denkens','Tugend ist lehrbar']},
  {name:'Protagoras',birth:-490,death:-420,epoch:'Sophistik',color:'#e88040',x:0.15,above:false,desc:'Führender Sophist. Relativierte objektive Wahrheit und Moral.',ideas:['Der Mensch ist das Maß aller Dinge','Rhetorisches Überzeugen statt Wahrheitssuche','Agnostizismus gegenüber den Göttern']},
  {name:'Platon',birth:-428,death:-348,epoch:'Klassisch',color:'#f7971e',x:0.17,above:true,desc:'Schüler des Sokrates. Gründer der Akademie. Sein Werk umfasst nahezu alle philosophischen Disziplinen.',ideas:['Ideenlehre: Die wahre Wirklichkeit ist nicht sichtbar','Das Höhlengleichnis','Philosophenkönig im Idealstaat']},
  {name:'Aristoteles',birth:-384,death:-322,epoch:'Klassisch',color:'#f7971e',x:0.20,above:false,desc:'Universalgelehrter und Begründer der Logik. Tutor Alexanders des Großen.',ideas:['Syllogismus: Die erste formale Logik','Eudaimonia als höchstes Gut','Hylomorphismus: Form und Materie als Einheit']},
  {name:'Epikur',birth:-341,death:-270,epoch:'Hellenismus',color:'#43e97b',x:0.23,above:true,desc:'Nicht vulgäre Lust sondern Seelenruhe (Ataraxia) und Freundschaft als höchstes Gut.',ideas:['Ataraxia: Seelenruhe als höchstes Gut','Freundschaft als Fundament des guten Lebens','Der Tod geht uns nichts an']},
  {name:'Zenon v. Kition',birth:-334,death:-262,epoch:'Hellenismus',color:'#43e97b',x:0.24,above:false,desc:'Begründer der Stoa. Tugend ist das einzige Gut.',ideas:['Tugend als einziges Gut','Naturgemäßes Leben','Kosmopolitismus: Alle sind Weltbürger']},
  {name:'Pyrrhon',birth:-360,death:-270,epoch:'Hellenismus',color:'#43e97b',x:0.25,above:true,desc:'Begründer des Skeptizismus. Wir können nichts mit Sicherheit wissen.',ideas:['Epoché: Urteilsenthaltung als Lebenshaltung','Ataraxia durch Nicht-Urteilen','Begründer des Pyrrhonischen Skeptizismus']},
  {name:'Plotin',birth:204,death:270,epoch:'Spätantike',color:'#ff6584',x:0.33,above:true,desc:'Bedeutendster Neuplatoniker. Drei-Hypostasen-Lehre: Das Eine — Nous — Seele.',ideas:['Das Eine: jenseits aller Bestimmungen','Emanation: Aus dem Einen strömt alles aus','Rückkehr der Seele zum Einen']},
  {name:'Porphyrios',birth:234,death:305,epoch:'Spätantike',color:'#ff6584',x:0.34,above:false,desc:'Schüler Plotins. Herausgeber der Enneaden. Sein Isagoge prägte mittelalterliche Logik.',ideas:['Herausgabe von Plotins Enneaden','Universalienproblem','Kritik am Christentum']},
  {name:'Proklos',birth:412,death:485,epoch:'Spätantike',color:'#ff6584',x:0.36,above:true,desc:'Letzter großer Neuplatoniker. Systematisierte den Neuplatonismus zu einem Gesamtwerk.',ideas:['Systematisierung des Neuplatonismus','Die Elemente der Theologie','Einfluss auf Pseudo-Dionysius']},
  {name:'Augustinus',birth:354,death:430,epoch:'Spätantike',color:'#ff6584',x:0.38,above:false,desc:'Kirchenvater. Verband Neuplatonismus mit christlichem Denken.',ideas:['Das Böse als Privation des Guten','Gottestaat vs. Erdenstaat','Zeit als Bewusstseinsbewegung der Seele']},
  {name:'Boethius',birth:477,death:524,epoch:'Spätantike',color:'#e87070',x:0.39,above:true,desc:'Im Gefängnis schrieb er den Trost der Philosophie — eines der meistgelesenen Bücher des Mittelalters.',ideas:['Trost der Philosophie','Übertragung aristotelischer Logik ins Lateinische','Universalienproblem']},
  {name:'Ps.-Dionysius',birth:500,death:530,epoch:'Frühes MA',color:'#98d8d8',x:0.41,above:false,desc:'Verband Neuplatonismus mit christlicher Mystik. Grundlagen der negativen Theologie.',ideas:['Apophatische Theologie','Hierarchien der Engel und Kirche','Mystische Einigung mit Gott']},
  {name:'Avicenna',birth:980,death:1037,epoch:'Islamische Philos.',color:'#60c060',x:0.46,above:false,desc:'Bedeutendster islamischer Philosoph und Arzt. Synthese von Aristoteles und islamischer Theologie.',ideas:['Kommentar zu Aristoteles','Der fliegende Mensch: Beweis für die Seele','Essenz und Existenz als trennbare Prinzipien']},
  {name:'Averroes',birth:1126,death:1198,epoch:'Islamische Philos.',color:'#60c060',x:0.48,above:true,desc:'Großer Kommentator des Aristoteles.',ideas:['Aristoteles-Kommentare','Einheit des aktiven Intellekts','Trennung von Philosophie und Religion']},
  {name:'Anselm',birth:1033,death:1109,epoch:'Scholastik',color:'#98d8d8',x:0.47,above:false,desc:'Begründer der Scholastik. Erfand den ontologischen Gottesbeweis.',ideas:['Credo ut intelligam','Ontologischer Gottesbeweis','Wahrheitstheorie']},
  {name:'Thomas v. Aquin',birth:1225,death:1274,epoch:'Scholastik',color:'#98d8d8',x:0.51,above:true,desc:'Synthesis von Aristoteles und christlicher Theologie in der Summa Theologica.',ideas:['Fünf Gottesbeweise','Naturrecht','Glaube und Vernunft als komplementär']},
  {name:'Duns Scotus',birth:1266,death:1308,epoch:'Scholastik',color:'#88c8c8',x:0.52,above:false,desc:'Kritiker des Thomas. Lehrte die Univozität des Seins.',ideas:['Univozität des Seinsbegriffs','Haecceitas: Das Diesheit-Prinzip','Voluntarismus: Wille über Intellekt']},
  {name:'Wilhelm v. Ockham',birth:1287,death:1347,epoch:'Scholastik',color:'#88c8c8',x:0.53,above:true,desc:'Begründer des Nominalismus. Universalien existieren nur als Namen.',ideas:['Universalien sind nur Namen','Ockhams Rasiermesser','Trennung von Philosophie und Theologie']},
  {name:'Meister Eckhart',birth:1260,death:1328,epoch:'Mystik',color:'#d090f0',x:0.54,above:false,desc:'Dominikaner-Mystiker. Gottesgeburt in der Seele — radikale Einheitsontologie.',ideas:['Gottesgeburt in der Seele','Abgeschiedenheit als höchste Tugend','Seelenfünklein als göttlicher Kern']},
  {name:'Nikolaus v. Kues',birth:1401,death:1464,epoch:'Renaissance',color:'#f85888',x:0.57,above:false,desc:'Kardinal und Universalgelehrter. Coincidenzia oppositorum: In Gott fallen Gegensätze zusammen.',ideas:['Coincidentia oppositorum','Docta ignorantia: Das gelehrte Nichtwissen','Unendlichkeit des Universums']},
  {name:'Pico della Mirandola',birth:1463,death:1494,epoch:'Renaissance',color:'#f85888',x:0.58,above:true,desc:'Die Rede über die Würde des Menschen begründet den modernen Humanismus.',ideas:['Würde des Menschen','Der Mensch kann sich selbst formen','Synthesis aller Weisheitstraditionen']},
  {name:'Montaigne',birth:1533,death:1592,epoch:'Renaissance',color:'#e87070',x:0.59,above:false,desc:'Erfinder des Essays als Gattung. Philosophie als Selbsterkenntnis und Lebenskunst.',ideas:['Was weiß ich? (Que sais-je?)','Essay als neue philosophische Gattung','Stoische Gelassenheit gegenüber dem Tod']},
  {name:'Giordano Bruno',birth:1548,death:1600,epoch:'Renaissance',color:'#f85888',x:0.60,above:true,desc:'Lehrte das unendliche Universum mit unzähligen Welten. Starb auf dem Scheiterhaufen.',ideas:['Unendlichkeit des Universums','Unzählige bewohnte Welten','Pantheismus']},
  {name:'Francis Bacon',birth:1561,death:1626,epoch:'Renaissance',color:'#e87070',x:0.61,above:false,desc:'Begründer der modernen Wissenschaftsmethode. Wissen ist Macht.',ideas:['Induktive Methode','Novum Organum','Vier Idola als Hindernisse der Erkenntnis']},
  {name:'Descartes',birth:1596,death:1650,epoch:'Rationalismus',color:'#e85878',x:0.63,above:true,desc:'Vater der modernen Philosophie. Methodischer Zweifel als Weg zur sicheren Erkenntnis.',ideas:['Cogito ergo sum','Methodischer Zweifel','Körper-Geist-Dualismus']},
  {name:'Hobbes',birth:1588,death:1679,epoch:'Rationalismus',color:'#e07070',x:0.64,above:false,desc:'Begründer des modernen politischen Denkens.',ideas:['Naturzustand: Bellum omnium contra omnes','Gesellschaftsvertrag','Der Staat als Leviathan']},
  {name:'Pascal',birth:1623,death:1662,epoch:'Rationalismus',color:'#d06060',x:0.65,above:true,desc:'Mathematiker und religiöser Denker. Der Mensch als denkendes Rohr.',ideas:['Der Mensch ist ein denkendes Rohr','Pascals Wette','Gründe des Herzens']},
  {name:'Spinoza',birth:1632,death:1677,epoch:'Rationalismus',color:'#f85888',x:0.66,above:false,desc:'Radikaler Pantheist. Deus sive Natura. Freiheit als Einsicht in die Notwendigkeit.',ideas:['Deus sive Natura','Freiheit als Einsicht in die Notwendigkeit','Geometrische Methode der Ethik']},
  {name:'Locke',birth:1632,death:1704,epoch:'Empirismus',color:'#60c090',x:0.67,above:false,desc:'Begründer des politischen Liberalismus. Das Bewusstsein als tabula rasa.',ideas:['Tabula rasa: Keine angeborenen Ideen','Naturrecht auf Leben, Freiheit und Eigentum','Gewaltenteilung']},
  {name:'Leibniz',birth:1646,death:1716,epoch:'Rationalismus',color:'#e87060',x:0.68,above:true,desc:'Universalgenie. Erfand Differential- und Integralrechnung. Die beste aller möglichen Welten.',ideas:['Monadologie','Die beste aller möglichen Welten','Prästabilierte Harmonie']},
  {name:'Berkeley',birth:1685,death:1753,epoch:'Empirismus',color:'#50b080',x:0.69,above:true,desc:'Radikaler Idealist. Esse est percipi: Sein heißt wahrgenommen werden.',ideas:['Esse est percipi','Immaterialismus','Gott als Garant der Wahrnehmung']},
  {name:'Vico',birth:1668,death:1744,epoch:'Aufklärung',color:'#ffd166',x:0.71,above:true,desc:'Begründer der Geschichtsphilosophie. Verum et factum convertuntur.',ideas:['Verum-Factum-Prinzip','Drei Zeitalter der Geschichte','Neue Wissenschaft']},
  {name:'Hume',birth:1711,death:1776,epoch:'Empirismus',color:'#50b080',x:0.70,above:false,desc:'Radikaler Skeptiker. Kausalität ist Gewohnheit. Weckte Kant aus dem dogmatischen Schlummer.',ideas:['Kausalität ist Gewohnheit keine Einsicht','Das Selbst ist ein Bündel von Eindrücken','Sein und Sollen: Das Humsche Gesetz']},
  {name:'Rousseau',birth:1712,death:1778,epoch:'Aufklärung',color:'#ffd166',x:0.73,above:true,desc:'Der natürliche Mensch ist gut — die Gesellschaft korrumpiert ihn.',ideas:['Der natürliche Mensch ist gut','Gesellschaftsvertrag und Volkssouveränität','Emile: Erziehung zur Entfaltung']},
  {name:'Voltaire',birth:1694,death:1778,epoch:'Aufklärung',color:'#ffd166',x:0.72,above:false,desc:'Leitfigur der Aufklärung. Radikale Religionskritik.',ideas:['Écrasez l\'infâme: Kampf gegen Fanatismus','Satirische Kritik des Optimismus (Candide)','Deismus']},
  {name:'Kant',birth:1724,death:1804,epoch:'Deutscher Idealismus',color:'#e8c040',x:0.75,above:false,desc:'Kopernikanische Wende: Das Subjekt konstituiert die Erkenntnis. Kategorischer Imperativ.',ideas:['Kategorischer Imperativ','Kritik der reinen Vernunft','Das Ding an sich bleibt unerkennbar']},
  {name:'Fichte',birth:1762,death:1814,epoch:'Deutscher Idealismus',color:'#d0b030',x:0.77,above:true,desc:'Radikalisierte Kant. Das Ich setzt sich selbst und das Nicht-Ich.',ideas:['Das Ich setzt sich selbst','Wissenschaftslehre','Tathandlung statt Faktum']},
  {name:'Schelling',birth:1775,death:1854,epoch:'Deutscher Idealismus',color:'#c8a020',x:0.78,above:false,desc:'Naturphilosoph und Spätphilosoph. Die Weltalterphilosophie als Geschichte des Absoluten.',ideas:['Identitätsphilosophie: Natur und Geist sind eins','Weltalterphilosophie: Geschichte des Absoluten','Freiheitsschrift: Das Böse als Möglichkeit der Freiheit']},
  {name:'Hegel',birth:1770,death:1831,epoch:'Deutscher Idealismus',color:'#c09010',x:0.79,above:true,desc:'Dialektik als Gesetz des Geistes. Das Absolute verwirklicht sich in der Zeit.',ideas:['These – Antithese – Synthese','Phänomenologie des Geistes','Der Weltgeist in der Geschichte']},
  {name:'Schopenhauer',birth:1788,death:1860,epoch:'Pessimismus',color:'#e07070',x:0.80,above:false,desc:'Der Wille als blindes kosmisches Prinzip. Das Leben ist Leiden.',ideas:['Der Wille als blinder Weltgrund','Erlösung durch Kunst und Askese','Verneinung des Willens zum Leben']},
  {name:'Feuerbach',birth:1804,death:1872,epoch:'Kritische Philos.',color:'#c07050',x:0.81,above:true,desc:'Gott ist eine Projektion menschlicher Wünsche. Prägte Marx.',ideas:['Gott ist eine Projektion des Menschen','Materialismus gegen Hegels Idealismus','Das Wesen des Christentums']},
  {name:'Kierkegaard',birth:1813,death:1855,epoch:'Existenzphilosophie',color:'#fb923c',x:0.82,above:true,desc:'Begründer des Existenzialismus. Gegen Hegels System. Die drei Stadien des Lebens.',ideas:['Drei Existenzstadien: Ästhetisch – Ethisch – Religiös','Entweder/Oder: Radikale Entscheidung','Der Sprung zum Glauben']},
  {name:'Marx',birth:1818,death:1883,epoch:'Kritische Philos.',color:'#c06040',x:0.82,above:false,desc:'Stellt Hegel vom Kopf auf die Füße. Materielle Verhältnisse treiben die Geschichte.',ideas:['Historischer Materialismus','Entfremdung der Arbeit','Basis und Überbau']},
  {name:'Nietzsche',birth:1844,death:1900,epoch:'Existenzphilosophie',color:'#fb923c',x:0.84,above:true,desc:'Radikaler Kritiker aller abendländischen Werte. Umwertung aller Werte.',ideas:['Gott ist tot','Wille zur Macht','Übermensch und ewige Wiederkehr']},
  {name:'Dilthey',birth:1833,death:1911,epoch:'Lebensphilosophie',color:'#e08030',x:0.85,above:false,desc:'Begründer der Geisteswissenschaften. Verstehen als eigene Methode.',ideas:['Verstehen vs. Erklären','Geisteswissenschaften als eigene Methodik','Hermeneutik']},
  {name:'Bergson',birth:1859,death:1941,epoch:'Lebensphilosophie',color:'#e09040',x:0.86,above:true,desc:'Philosophie der Zeit und des Lebens. Die Dauer (durée) als echte Zeit.',ideas:['Durée: Die echte gelebte Zeit','Élan vital: Lebensschwung','Intuition als höhere Erkenntnisform']},
  {name:'Husserl',birth:1859,death:1938,epoch:'Phänomenologie',color:'#5b80e8',x:0.87,above:false,desc:'Begründer der Phänomenologie. Zu den Sachen selbst. Intentionalität als Grundstruktur.',ideas:['Intentionalität: Bewusstsein ist immer Bewusstsein von etwas','Epoché','Lebenswelt als Fundament']},
  {name:'Frege',birth:1848,death:1925,epoch:'Analytisch',color:'#67e8f9',x:0.87,above:true,desc:'Begründer der modernen Logik und Sprachphilosophie.',ideas:['Moderne Prädikatenlogik','Sinn und Bedeutung','Begründer der analytischen Philosophie']},
  {name:'Russell',birth:1872,death:1970,epoch:'Analytisch',color:'#67e8f9',x:0.88,above:false,desc:'Mitbegründer der analytischen Philosophie. Logischer Atomismus.',ideas:['Logischer Atomismus','Principia Mathematica','Philosophie als logische Analyse']},
  {name:'Heidegger',birth:1889,death:1976,epoch:'Phänomenologie',color:'#5b80e8',x:0.89,above:true,desc:'Fundamentalontologie. Das Sein als die vergessene Frage. Dasein als In-der-Welt-sein.',ideas:['Sein und Zeit: Die Seinsfrage als erste Frage','Dasein als Sorgestruktur','Das Gestell als Wesen der Technik']},
  {name:'Wittgenstein',birth:1889,death:1951,epoch:'Analytisch',color:'#67e8f9',x:0.89,above:false,desc:'Zwei Philosophien: Früh Grenzen der Sprache, spät Sprachspiele als Lebensformen.',ideas:['Worüber man nicht sprechen kann...','Sprachspiele und Lebensformen','Philosophische Probleme als Sprachverwirrungen']},
  {name:'Scheler',birth:1874,death:1928,epoch:'Phänomenologie',color:'#4a70d8',x:0.90,above:true,desc:'Phänomenologische Wertethik. Der Mensch als ens amans — das liebende Wesen.',ideas:['Wertethik gegen Kants formale Ethik','Der Mensch als weltoffenes Wesen','Ressentiment']},
  {name:'Jaspers',birth:1883,death:1969,epoch:'Existenzphilosophie',color:'#fb923c',x:0.90,above:false,desc:'Grenzsituationen als Weckruf zur Existenz.',ideas:['Grenzsituationen: Tod Leiden Kampf Schuld','Kommunikation als Bedingung von Existenz','Die Schuldfrage (1945)']},
  {name:'Benjamin',birth:1892,death:1940,epoch:'Kritische Theorie',color:'#a060d0',x:0.91,above:true,desc:'Das Kunstwerk im Zeitalter der technischen Reproduzierbarkeit. Dialektische Bilder.',ideas:['Aura und ihr Verlust','Dialektisches Bild','Jetztzeit der Geschichte']},
  {name:'Adorno',birth:1903,death:1969,epoch:'Kritische Theorie',color:'#9050c0',x:0.91,above:false,desc:'Negative Dialektik als Widerstand gegen Identitätsdenken.',ideas:['Negative Dialektik','Dialektik der Aufklärung','Es gibt kein richtiges Leben im falschen']},
  {name:'Merleau-Ponty',birth:1908,death:1961,epoch:'Phänomenologie',color:'#4a70d8',x:0.92,above:false,desc:'Leibphänomenologie. Der Leib als primäres Subjekt der Erfahrung.',ideas:['Der Leib als Subjekt','Phänomenologie der Wahrnehmung','Chiasmus: Fleisch der Welt']},
  {name:'Sartre',birth:1905,death:1980,epoch:'Existenzphilosophie',color:'#fb923c',x:0.92,above:true,desc:'Existenz geht der Essenz voraus. Zur Freiheit verurteilt.',ideas:['Existenz geht der Essenz voraus','Zur Freiheit verurteilt','Das Andere als Blick']},
  {name:'Levinas',birth:1906,death:1995,epoch:'Phänomenologie',color:'#4060c8',x:0.93,above:false,desc:'Das Antlitz des Anderen als ethisches Ur-Phänomen. Ethik als erste Philosophie.',ideas:['Das Antlitz des Anderen als ethischer Anspruch','Ethik als erste Philosophie','Jenseits des Seins']},
  {name:'Camus',birth:1913,death:1960,epoch:'Existenzphilosophie',color:'#fb923c',x:0.93,above:true,desc:'Philosoph des Absurden. Man muss sich Sisyphus als glücklich vorstellen.',ideas:['Das Absurde','Rebellion als Antwort','Man muss sich Sisyphus als glücklich vorstellen']},
  {name:'Beauvoir',birth:1908,death:1986,epoch:'Existenzphilosophie',color:'#fb923c',x:0.94,above:false,desc:'Man wird nicht als Frau geboren — man wird es.',ideas:['Man wird nicht als Frau geboren','Das andere Geschlecht','Existenzialistische Ethik']},
  {name:'Gadamer',birth:1900,death:2002,epoch:'Hermeneutik',color:'#e08030',x:0.94,above:true,desc:'Begründer der philosophischen Hermeneutik. Verstehen als Horizontverschmelzung.',ideas:['Wirkungsgeschichte','Horizontverschmelzung','Das Spiel als Struktur des Kunstwerks']},
  {name:'Foucault',birth:1926,death:1984,epoch:'Poststrukturalismus',color:'#f472b6',x:0.95,above:false,desc:'Macht durchzieht alle Diskurse und produziert Wissen.',ideas:['Macht-Wissen','Diskursanalyse','Biopolitik']},
  {name:'Derrida',birth:1930,death:2004,epoch:'Poststrukturalismus',color:'#f472b6',x:0.95,above:true,desc:'Begründer der Dekonstruktion. Kein Außerhalb des Textes.',ideas:['Dekonstruktion','Il n\'y a pas de hors-texte','Différance']},
  {name:'Deleuze',birth:1925,death:1995,epoch:'Poststrukturalismus',color:'#f472b6',x:0.96,above:false,desc:'Philosoph der Differenz. Rhizom statt Baum als Modell des Denkens.',ideas:['Differenz als primär','Rhizom: Netz-Denken','Deterritorialisierung']},
  {name:'Rawls',birth:1921,death:2002,epoch:'Politische Philos.',color:'#30b060',x:0.97,above:false,desc:'Begründer des modernen politischen Liberalismus.',ideas:['Schleier des Nichtwissens','Zwei Grundsätze der Gerechtigkeit','Priorität der Grundfreiheiten']},
  {name:'Habermas',birth:1929,death:0,epoch:'Gegenwart',color:'#4ade80',x:0.97,above:true,desc:'Theorie des kommunikativen Handelns. Die Moderne als unvollendetes Projekt.',ideas:['Kommunikatives Handeln','Diskursethik','Die Moderne ist ein unvollendetes Projekt']},
  {name:'Rorty',birth:1931,death:2007,epoch:'Neopragmatismus',color:'#20a050',x:0.97,above:false,desc:'Abkehr von der Wahrheitssuche. Solidarität statt Objektivität.',ideas:['Nützlichkeit statt Wahrheit','Kontingenz','Solidarität als Ersatz für Objektivität']},
  {name:'Sloterdijk',birth:1947,death:0,epoch:'Gegenwart',color:'#4ade80',x:0.98,above:false,desc:'Kulturphilosoph. Sphären-Trilogie als Neubestimmung des Raums.',ideas:['Sphären-Trilogie','Zorn und Zeit','Du musst dein Leben ändern']},
];

const EPOCHS_META = [
  {name:'Vorsokratik',color:'#6c63ff'},{name:'Sophistik',color:'#e88040'},{name:'Klassisch',color:'#f7971e'},
  {name:'Hellenismus',color:'#43e97b'},{name:'Spätantike',color:'#ff6584'},{name:'Frühes MA',color:'#98d8d8'},
  {name:'Islamische Philos.',color:'#60c060'},{name:'Scholastik',color:'#88c8c8'},{name:'Mystik',color:'#d090f0'},
  {name:'Renaissance',color:'#f85888'},{name:'Rationalismus',color:'#e85878'},{name:'Empirismus',color:'#50b080'},
  {name:'Aufklärung',color:'#ffd166'},{name:'Deutscher Idealismus',color:'#c8a020'},{name:'Pessimismus',color:'#e07070'},
  {name:'Kritische Philos.',color:'#c06040'},{name:'Existenzphilosophie',color:'#fb923c'},{name:'Lebensphilosophie',color:'#e08030'},
  {name:'Phänomenologie',color:'#5b80e8'},{name:'Analytisch',color:'#67e8f9'},{name:'Kritische Theorie',color:'#9050c0'},
  {name:'Hermeneutik',color:'#e09040'},{name:'Poststrukturalismus',color:'#f472b6'},{name:'Politische Philos.',color:'#30b060'},
  {name:'Neopragmatismus',color:'#20a050'},{name:'Gegenwart',color:'#4ade80'},
];

// ════════════════════════════════════════════════
// DATA — Kurse (from Excel import)
// ════════════════════════════════════════════════
let kurseData=[];
(function(){
const raw=[
["WS 2009/10",1,"BA","Informatik","Informatik 1 (Vorlesung)","Vorlesung","Prof. Dr. Frommer"],
["WS 2009/10",1,"BA","Informatik","Informatik 1 (Übung)","Übung",""],
["WS 2009/10",1,"BA","Mathematik","Analysis 1 (Vorlesung)","Vorlesung","Prof. Dr. Hartmut Pecher"],
["WS 2009/10",1,"BA","Mathematik","Analysis 1 (Übung)","Übung",""],
["WS 2009/10",1,"BA","Mathematik","Analysis 1 (Tutorium)","Tutorium",""],
["WS 2009/10",1,"BA","Mathematik","Lineare Algebra 1 (Vorlesung)","Vorlesung","Prof. Dr. Markus Reineke"],
["WS 2009/10",1,"BA","Mathematik","Lineare Algebra 1 (Übung)","Übung",""],
["SS 2010",2,"BA","Mathematik","Analysis 2","Vorlesung","Prof. Dr. Hartmut Pecher"],
["SS 2010",2,"BA","Mathematik","Lineare Algebra 2","Vorlesung","Prof. Dr. Markus Reineke"],
["SS 2010",2,"BA","Philosophie","Das Antinomiekapitel von Kants KrV","Seminar","Prof. Dr. László Tengelyi"],
["SS 2010",2,"BA","Philosophie","Husserls Lebenswelt","Vorlesung","Prof. Dr. Smail Rapic"],
["SS 2010",2,"BA","Philosophie","Von Hegel zu Nietzsche","Vorlesung","Prof. Dr. László Tengelyi"],
["WS 2010/11",3,"BA","Mathematik","Analysis 3","Vorlesung","Prof. Dr. Klaus Fritzsche"],
["WS 2010/11",3,"BA","Mathematik","Einführung in die Stochastik","Vorlesung","Prof. Dr. Rüdiger"],
["WS 2010/11",3,"BA","Philosophie","Kant: Metaphysik der Sitten, Tugendlehre","Seminar","Dr. Inga Römer"],
["WS 2010/11",3,"BA","Philosophie","Platons Theorie der Gerechtigkeit","Seminar","Udo Rameil"],
["WS 2010/11",3,"BA","Philosophie","Albert Einstein als Philosoph","Blockseminar","Dr. Dennis Lehmkuhl"],
["SS 2011",4,"BA","Mathematik","Elementare Zahlentheorie","Vorlesung","Prof. Dr. Roland Huber"],
["SS 2011",4,"BA","Philosophie","Einführung in die Logik","Vorlesung","Dr. Dennis Lehmkuhl"],
["SS 2011",4,"BA","Philosophie","Die Physikvorlesung des Aristoteles","Seminar","Prof. Dr. László Tengelyi"],
["SS 2011",4,"BA","Philosophie","Politeia","Seminar","PD Dr. Georg Siegmann"],
["SS 2011",4,"BA","Philosophie","Kausalität und Freiheit","Vorlesung","Prof. Dr. László Tengelyi"],
["SS 2011",4,"BA","Philosophie","Nietzsche","Vorlesung","Dr. Tobias Klass"],
["WS 2011/12",5,"BA","Mathematik","Seminar zur Elementaren Zahlentheorie","Seminar","Prof. Dr. Roland Huber"],
["WS 2011/12",5,"BA","Philosophie","Theorien des objektiven Geistes","Blockseminar","Dr. Matthias Wunsch"],
["WS 2011/12",5,"BA","Philosophie","Philosophie der Langeweile","Seminar","Prof. Dr. Gregor Schiemann"],
["WS 2011/12",5,"BA","Philosophie","Philosophie von Raum und Zeit","Seminar","Dr. Dennis Lehmkuhl"],
["WS 2011/12",5,"BA","Philosophie","Platons Timaios","Seminar","Prof. Dr. László Tengelyi"],
["WS 2011/12",5,"BA","Philosophie","Die Handlung und das handelnde Selbst","Vorlesung","Prof. Dr. László Tengelyi"],
["WS 2011/12",5,"BA","Philosophie","Michel Foucault: Analytik der Macht","Seminar","Dr. Tobias Klass"],
["WS 2011/12",5,"BA","Philosophie","Kants Einleitungen in die KdU","Seminar","Prof. Dr. Manfred Baum"],
["WS 2011/12",5,"BA","Philosophie","Platon: Sophistes","Seminar","Prof. Dr. Manfred Baum, PD Dr. Georg Siegmann"],
["SS 2012",6,"BA","Mathematik","Einführung in die Algebra","Vorlesung","Prof. Dr. Sascha Orlik"],
["SS 2012",6,"BA","Philosophie","Einführung in die Phänomenologische Metaphysik","Oberseminar","Prof. Dr. László Tengelyi"],
["SS 2012",6,"BA","Philosophie","Von Bergson zu Deleuze","Vorlesung","Prof. Dr. László Tengelyi"],
["SS 2012",6,"BA","Philosophie","Von der Hyle zur Erde","Vorlesung","Prof. Dr. Peter Trawny"],
["SS 2012",6,"BA","Philosophie","Hegel Phänomenologie des Geistes","Vorlesung","PD Dr. Georg Siegmann"],
["WS 2012/13",7,"BA","Philosophie","Einführung in die Philosophie der Antike","Vorlesung","Prof. Dr. László Tengelyi"],
["WS 2012/13",7,"BA","Philosophie","Die Geburt der Tragödie","Seminar","Prof. Dr. Peter Trawny"],
["WS 2012/13",7,"BA","Philosophie","Aristoteles: Metaphysik","Seminar","PD Dr. Georg Siegmann"],
["WS 2012/13",7,"BA","Philosophie","Husserls Schichtentheorie der Welt","Oberseminar","Prof. Dr. László Tengelyi"],
["WS 2012/13",7,"BA","Griechisch","Griechisch Grund- und Mittelstufe 1","Seminar","Dr. Robert Cramer"],
["WS 2012/13",7,"BA","Französisch","Französisch Grundstufe I","Seminar","Anne Rüschoff"],
["SS 2013",8,"BA","Philosophie","Gott und Sein. Philosophie des Mittelalters","Vorlesung","Prof. Dr. Peter Trawny"],
["SS 2013",8,"BA","Philosophie","Theodor W. Adorno: Geistige Erfahrung","Seminar","Prof. Dr. László Tengelyi"],
["SS 2013",8,"BA","Philosophie","Einführung in die Analytische Philosophie","Proseminar","Dr. Matthias Wunsch"],
["SS 2013",8,"BA","Philosophie","Metaphysik als Problem","Vorlesung","Prof. Dr. László Tengelyi"],
["SS 2013",8,"BA","Philosophie","Phänomenologie und Philosophie des Geistes","Oberseminar","Prof. Dr. László Tengelyi"],
["SS 2013",8,"BA","Philosophie","Platon: Theaitetos","Seminar","Prof. Dr. Manfred Baum, PD Dr. Georg Siegmann"],
["SS 2013",8,"BA","Philosophie","Sigmund Freud: Kulturtheoretische Schriften","Seminar","Dr. Tobias Klass"],
["SS 2013",8,"BA","Griechisch","Griechisch Mittelstufe I","Seminar","Dr. Robert Cramer"],
["WS 2013/14",9,"BA","Philosophie","Die Nikomachische Ethik","Seminar","Prof. Dr. László Tengelyi"],
["WS 2013/14",9,"BA","Philosophie","Der späte Schelling","Vorlesung","Prof. Dr. László Tengelyi"],
["WS 2013/14",9,"BA","Philosophie","Husserls phänomenologische Zeitanalyse","Oberseminar","Prof. Dr. László Tengelyi"],
["WS 2013/14",9,"BA","Philosophie","Martin Heidegger: Der Satz vom Grund","Kolloquium","Prof. Dr. Tengelyi, Prof. Dr. Trawny, PD Dr. Siegmann, Dr. Römer"],
["WS 2013/14",9,"BA","Philosophie","Schopenhauer","Vorlesung","PD Dr. Georg Siegmann"],
["SS 2014",10,"MA","Philosophie","Der späte Schelling in seiner Zeit","Vorlesung","Prof. Dr. László Tengelyi"],
["SS 2014",10,"MA","Philosophie","Von Plotin zu Proklos","Seminar","Prof. Dr. László Tengelyi"],
["SS 2014",10,"MA","Philosophie","Martin Heidegger, Sein und Zeit 1","Seminar","Dr. Inga Römer"],
["SS 2014",10,"MA","Philosophie","Heidegger – Hölderlins Hymne: Der Ister","Kolloquium","Prof. Dr. Tengelyi, Prof. Dr. Trawny, PD Dr. Siegmann, Dr. Römer"],
["SS 2014",10,"MA","Philosophie","Husserls Logische Untersuchungen","Oberseminar","Prof. Dr. László Tengelyi"],
["WS 2014/15",11,"MA","Philosophie","Martin Heidegger, Sein und Zeit 2","Seminar","Dr. Inga Römer"],
["WS 2014/15",11,"MA","Philosophie","Kants Antinomienlehre","Seminar","Prof. Dr. Manfred Baum, PD Dr. Siegmann"],
["WS 2014/15",11,"MA","Philosophie","Husserls Cartesianische Meditationen","Seminar","Prof. Dr. Peter Trawny"],
["SS 2015",12,"MA","Philosophie","Eine Einführung in die Metaphysik","Seminar","Dr. Inga Römer"],
["SS 2015",12,"MA","Philosophie","Die phänomenologische Bewegung","Vorlesung","Dr. Inga Römer"],
["WS 2015/16",13,"MA","Philosophie","Immanuel Kants KdrV","Seminar","Dr. Inga Römer"],
["WS 2015/16",13,"MA","Philosophie","Husserl: Grenzprobleme der Phänomenologie","Oberseminar","Dr. Inga Römer"],
["WS 2015/16",13,"MA","Philosophie","J. G. Fichte: Wissenschaftslehre nova methodo","Seminar","Dr. Inga Römer"],
["SS 2016",14,"MA","Philosophie","System des transzendentalen Idealismus","Seminar","Dr. Inga Römer"],
["SS 2016",14,"MA","Philosophie","Adorno: Ontologie und Dialektik","Kolloquium","Prof. Dr. Peter Trawny, Dr. Inga Römer"],
["WS 2016/17",15,"MA","Philosophie","Die aktuelle Realismus-Idealismus Debatte","Seminar","Prof. Dr. Alexander Schnell"],
["WS 2016/17",15,"MA","Philosophie","Einführung in Fichtes Wissenschaftslehre","Seminar","Prof. Dr. Alexander Schnell"],
["WS 2016/17",15,"MA","Philosophie","Cusanus: Die Jagd nach der Weisheit","Seminar","PD Dr. Georg Siegmann"],
["SS 2017",16,"Prom","Philosophie","Aktuelle Probleme der phän. Forschung (Richir)","Oberseminar","Prof. Dr. Alexander Schnell"],
["SS 2017",16,"Prom","Philosophie","Heidegger – Das Ende der Philosophie","Seminar","Prof. Dr. Peter Trawny"],
["SS 2017",16,"Prom","Philosophie","Platon: Mythos und Wahrheit","Seminar","Prof. Dr. Alexander Schnell"],
["WS 2017/18",17,"Prom","Philosophie","Aktuelle Probleme (Richir – Phänomen und Unendlichkeit)","Oberseminar","Prof. Dr. Alexander Schnell"],
["WS 2017/18",17,"Prom","Philosophie","Einführung in Heideggers Philosophie","Seminar","Prof. Dr. Alexander Schnell"],
["SS 2018",18,"Prom","Philosophie","Aktuelle Probleme (Husserl – Krisis)","Oberseminar","Prof. Dr. Alexander Schnell"],
["SS 2018",18,"Prom","Philosophie","Heidegger – Beiträge zur Philosophie","Seminar","Prof. Dr. Alexander Schnell"],
["WS 2018/19",19,"Prom","Philosophie","Aktuelle Probleme (Husserl – Geometrie)","Oberseminar","Prof. Dr. Alexander Schnell"],
["SS 2019",20,"Prom","Philosophie","Aktuelle Probleme – Vorträge","Oberseminar","Prof. Dr. Alexander Schnell"],
["SS 2019",20,"Prom","Philosophie","Meister Eckhart: Die mystischen Schriften","Seminar","Prof. Dr. Peter Trawny"],
["SS 2019",20,"Prom","Philosophie","Levinas: Jenseits des Seins 1","Seminar","Prof. Dr. Schnell, Prof. Dr. Trawny"],
["WS 2019/20",21,"Prom","Philosophie","Aktuelle Probleme (Eugen Fink)","Oberseminar","Prof. Dr. Alexander Schnell"],
["WS 2019/20",21,"Prom","Philosophie","Levinas: Jenseits des Seins 2","Seminar","Prof. Dr. Schnell, Prof. Dr. Trawny"],
["SS 2020",22,"Prom","Philosophie","Zur Geschichte der Seele","Vorlesung","Prof. Dr. Peter Trawny"],
["SS 2020",22,"Prom","Philosophie","Hölderlin – Der Tod des Empedokles","Seminar","Prof. Dr. Peter Trawny"],
["WS 2020/21",23,"Prom","Philosophie","Aktuelle Probleme (Derrida – Husserls Problem der Genese)","Oberseminar","Prof. Dr. Alexander Schnell"],
["WS 2020/21",23,"Prom","Philosophie","Rilke: Duineser Elegien","Seminar","Prof. Dr. Peter Trawny"],
["SS 2021",24,"Prom","Philosophie","Aktuelle Probleme (Kommentar zu Kants Kategoriendeduktion)","Oberseminar","Prof. Dr. Alexander Schnell"],
["SS 2021",24,"Prom","Philosophie","Adorno – Meditationen zur Metaphysik","Seminar","Prof. Dr. Alexander Schnell"],
["SS 2021",24,"Prom","Philosophie","Schellings Freiheitsschrift","Seminar","Dr. Philip Flock"],
["WS 2021/22",25,"Prom","Philosophie","Aktuelle Probleme (Husserl C-Manuskripte)","Oberseminar","Prof. Dr. Alexander Schnell"],
["WS 2021/22",25,"Prom","Philosophie","Plotin: Über das Eine oder das Gute","Seminar","Prof. Dr. Peter Trawny"],
["WS 2021/22",25,"Prom","Philosophie","Fichte: Anweisung zum seligen Leben 1","Seminar","Prof. Dr. Schnell, Prof. Dr. Ohst"],
["SS 2022",26,"Prom","Philosophie","Fichte: Anweisung zum seligen Leben 2","Seminar","Prof. Dr. Schnell, Prof. Dr. Ohst"],
["SS 2022",26,"Prom","Philosophie","Schelling: System der gesamten Philosophie (1804)","Seminar","Dr. Thomas Kisser"],
["WS 2022/23",27,"Prom","Philosophie","Aktuelle Probleme (Derrida – Gewalt und Metaphysik)","Oberseminar","Prof. Dr. Alexander Schnell"],
["WS 2022/23",27,"Prom","Philosophie","Einführung in die Phänomenologie Marc Richirs","Blockseminar","Prof. Dr. Alexander Schnell"],
];
raw.forEach(function(r){
  kurseData.push({sem:r[0],semNr:r[1],phase:r[2],fach:r[3],name:r[4],art:r[5],dozent:r[6]});
});
})();

// ════════════════════════════════════════════════
/**
 * philosophers_v2.js
 * Tiered Philosophy Timeline — Google Maps style
 *
 * tier: 1 = immer sichtbar (die ~15 Giganten)
 *       2 = ab Zoom ×1.4 (wichtige Denker)
 *       3 = ab Zoom ×2.2 (alle Denker)
 *       4 = ab Zoom ×3.5 (Randfiguren, Schüler)
 *
 * x: 0–1 Normalisierung auf Zeitachse -700 ... 2025
 *    Formel: (year + 700) / 2725
 *
 * influences: [{to: 'Name', type: 'student'|'critic'|'inspires'|'develops'}]
 *   student   = blau,  Lehrer→Schüler
 *   critic    = rot,   kritische Reaktion / Widerlegung
 *   inspires  = grün,  Inspiration / Einfluss
 *   develops  = lila,  Weiterentwicklung / Fortsetzung
 */

const PHILS_V2 = [

  // ── VORSOKRATIK ─────────────────────────────────────────
  { name:'Thales', birth:-624, death:-546, epoch:'Vorsokratik', color:'#6c63ff', tier:2, above:true,
    desc:'Erster Philosoph des Abendlands. Erklärte die Welt aus natürlichen Prinzipien statt Mythen.',
    ideas:['Wasser als Urstoff aller Dinge','Hylozoismus: Alles ist beseelt','Begründer der Naturphilosophie'],
    influences:[{to:'Anaximander',type:'student'},{to:'Anaximenes',type:'student'}]},

  { name:'Anaximander', birth:-610, death:-546, epoch:'Vorsokratik', color:'#6c63ff', tier:3, above:false,
    desc:'Schüler des Thales. Das Apeiron (das Unbegrenzte) als Urstoff — keine bestimmte Substanz.',
    ideas:['Das Apeiron als Urstoff','Entstehung aus dem Unbegrenzten','Früheste Prosa der Philosophie'],
    influences:[{to:'Anaximenes',type:'student'}]},

  { name:'Anaximenes', birth:-585, death:-525, epoch:'Vorsokratik', color:'#6c63ff', tier:3, above:true,
    desc:'Luft als Urprinzip: Verdichtung erzeugt Wasser und Erde; Verdünnung Feuer.',
    ideas:['Luft als Arche','Verdichtung und Verdünnung','Seele als Luft'],
    influences:[]},

  { name:'Pythagoras', birth:-570, death:-495, epoch:'Vorsokratik', color:'#8b80ff', tier:2, above:false,
    desc:'Mathematiker und Mystiker. Zahlen als Grundstruktur der Wirklichkeit.',
    ideas:['Zahlen als Grundstruktur','Pythagorischer Lehrsatz','Seelenwanderung (Metempsychose)'],
    influences:[{to:'Platon',type:'inspires'}]},

  { name:'Heraklit', birth:-535, death:-475, epoch:'Vorsokratik', color:'#6c63ff', tier:2, above:true,
    desc:'Denker des ewigen Wandels. Der Logos verbindet die Gegensätze.',
    ideas:['Alles fließt — panta rhei','Logos als Weltvernunft','Einheit der Gegensätze'],
    influences:[{to:'Platon',type:'inspires'},{to:'Hegel',type:'inspires'},{to:'Heidegger',type:'inspires'}]},

  { name:'Parmenides', birth:-515, death:-450, epoch:'Vorsokratik', color:'#7a6fff', tier:2, above:false,
    desc:'Begründer der Ontologie. Das Sein ist ewig, unteilbar, unveränderlich.',
    ideas:['Sein ist — Nichtsein ist nicht','Denken und Sein sind dasselbe','Grundlegung der Ontologie'],
    influences:[{to:'Zenon v. Elea',type:'student'},{to:'Platon',type:'critic'},{to:'Aristoteles',type:'critic'}]},

  { name:'Zenon v. Elea', birth:-490, death:-430, epoch:'Vorsokratik', color:'#7a6fff', tier:3, above:true,
    desc:'Erfand die Bewegungsparadoxien zum Beweis der parmenideischen Thesen.',
    ideas:['Achilles und die Schildkröte','Dichotomie-Paradoxon','Verteidigung des Parmenides'],
    influences:[]},

  { name:'Empedokles', birth:-495, death:-435, epoch:'Vorsokratik', color:'#6c63ff', tier:3, above:false,
    desc:'Vier Wurzeln: Feuer, Wasser, Luft, Erde — verbunden durch Liebe, getrennt durch Streit.',
    ideas:['Vier-Elemente-Lehre','Liebe und Streit als Kräfte','Proto-Evolutionstheorie'],
    influences:[{to:'Aristoteles',type:'critic'}]},

  { name:'Demokrit', birth:-460, death:-371, epoch:'Vorsokratik', color:'#5a50e8', tier:2, above:true,
    desc:'Begründer des Atomismus. Unteilbare Atome im leeren Raum — Vorläufer moderner Physik.',
    ideas:['Atomismus','Determinismus','Heiteres Leben als Ziel'],
    influences:[{to:'Epikur',type:'inspires'},{to:'Descartes',type:'inspires'}]},

  { name:'Anaxagoras', birth:-500, death:-428, epoch:'Vorsokratik', color:'#6c63ff', tier:3, above:false,
    desc:'Nous (Geist) als Ordnungsprinzip. Erste Ahnung eines Dualismus von Geist und Materie.',
    ideas:['Nous als kosmischer Geist','Alles enthält einen Anteil von allem','Erste Theorie der Sonnenfinsternis'],
    influences:[{to:'Sokrates',type:'inspires'}]},

  { name:'Protagoras', birth:-490, death:-420, epoch:'Sophistik', color:'#e88040', tier:3, above:true,
    desc:'Führender Sophist. Relativierte objektive Wahrheit.',
    ideas:['Der Mensch ist das Maß aller Dinge','Rhetorisches Überzeugen','Agnostizismus'],
    influences:[{to:'Sokrates',type:'critic'}]},

  // ── KLASSISCHE ANTIKE ────────────────────────────────────
  { name:'Sokrates', birth:-469, death:-399, epoch:'Klassisch', color:'#f7971e', tier:1, above:true,
    desc:'Begründer der ethischen Philosophie. Schrieb nichts — lebt durch Platons Dialoge.',
    ideas:['Ich weiß dass ich nichts weiß','Mäeutik: Hebammenkunst des Denkens','Tugend ist lehrbar'],
    influences:[{to:'Platon',type:'student'},{to:'Xenophon',type:'student'},{to:'Antisthenes',type:'student'}]},

  { name:'Xenophon', birth:-430, death:-354, epoch:'Klassisch', color:'#e8a030', tier:4, above:false,
    desc:'Schüler des Sokrates. Historiker und Feldherr. Überlieferte Erinnerungen an Sokrates.',
    ideas:['Memorabilia: Erinnerungen an Sokrates','Anabasis: Kriegsbericht','Sokratische Ethik im Alltag'],
    influences:[]},

  { name:'Antisthenes', birth:-445, death:-365, epoch:'Klassisch', color:'#e8a030', tier:4, above:true,
    desc:'Schüler des Sokrates. Begründer der Kynischen Schule.',
    ideas:['Tugend als einziges Gut','Askese als Lebensform','Begründer des Kynismus'],
    influences:[{to:'Diogenes',type:'student'}]},

  { name:'Diogenes v. Sinope', birth:-412, death:-323, epoch:'Kynismus', color:'#c87020', tier:3, above:false,
    desc:'Der Kyniker. Lebte in einer Tonne, forderte Alexander: "Geh mir aus der Sonne".',
    ideas:['Radikale Bedürfnislosigkeit','Kosmopolitismus','Kritik an gesellschaftlichen Konventionen'],
    influences:[{to:'Zenon v. Kition',type:'inspires'}]},

  { name:'Platon', birth:-428, death:-348, epoch:'Klassisch', color:'#f7971e', tier:1, above:false,
    desc:'Begründer der Akademie. Sein Werk umfasst nahezu alle philosophischen Disziplinen.',
    ideas:['Ideenlehre: Wirklichkeit hinter dem Sichtbaren','Das Höhlengleichnis','Philosophenkönig im Idealstaat'],
    influences:[{to:'Aristoteles',type:'student'},{to:'Plotin',type:'inspires'},{to:'Augustinus',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  { name:'Aristoteles', birth:-384, death:-322, epoch:'Klassisch', color:'#f7971e', tier:1, above:true,
    desc:'Universalgelehrter. Begründer der Logik, Ethik, Physik, Poetik, Politik.',
    ideas:['Syllogismus: Die erste formale Logik','Eudaimonia als höchstes Gut','Hylomorphismus: Form und Materie'],
    influences:[{to:'Theophrast',type:'student'},{to:'Thomas v. Aquin',type:'inspires'},{to:'Averroes',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  { name:'Theophrast', birth:-371, death:-287, epoch:'Klassisch', color:'#e8a030', tier:4, above:false,
    desc:'Schüler und Nachfolger des Aristoteles. Botaniker und Charakterschreiber.',
    ideas:['Charaktere: Psychologische Typen','Botanik als Wissenschaft','Weiterentwicklung der Peripatetik'],
    influences:[]},

  // ── HELLENISMUS ──────────────────────────────────────────
  { name:'Epikur', birth:-341, death:-270, epoch:'Hellenismus', color:'#43e97b', tier:2, above:true,
    desc:'Seelenruhe (Ataraxia) und Freundschaft als höchstes Gut. Nicht Lust im vulgären Sinn.',
    ideas:['Ataraxia als höchstes Gut','Freundschaft als Fundament','Der Tod geht uns nichts an'],
    influences:[{to:'Lukrez',type:'develops'}]},

  { name:'Zenon v. Kition', birth:-334, death:-262, epoch:'Hellenismus', color:'#43e97b', tier:2, above:false,
    desc:'Begründer der Stoa. Tugend als einziges Gut; Leidenschaft zu überwinden.',
    ideas:['Tugend als einziges Gut','Naturgemäßes Leben','Kosmopolitismus'],
    influences:[{to:'Kleanthes',type:'student'},{to:'Chrysipp',type:'develops'},{to:'Marc Aurel',type:'inspires'}]},

  { name:'Kleanthes', birth:-330, death:-232, epoch:'Hellenismus', color:'#43e97b', tier:4, above:true,
    desc:'Nachfolger Zenons. Überlieferte die Stoa und schrieb den Zeushymnus.',
    ideas:['Zeushymnus','Pneuma als kosmisches Prinzip','Stoa nach Zenon'],
    influences:[{to:'Chrysipp',type:'student'}]},

  { name:'Chrysipp', birth:-279, death:-206, epoch:'Hellenismus', color:'#43e97b', tier:3, above:false,
    desc:'Dritter Leiter der Stoa. Systematisierte die stoische Logik und Ethik.',
    ideas:['Systematische stoische Logik','Lekton als sprachliche Bedeutung','Rettung der Stoa durch Argumente'],
    influences:[]},

  { name:'Pyrrhon', birth:-360, death:-270, epoch:'Hellenismus', color:'#43e97b', tier:3, above:true,
    desc:'Begründer des Skeptizismus. Epoché: Urteilsenthaltung als Lebenshaltung.',
    ideas:['Epoché: Urteilsenthaltung','Ataraxia durch Nicht-Urteilen','Pyrrhonischer Skeptizismus'],
    influences:[{to:'Sextus Empiricus',type:'develops'}]},

  { name:'Sextus Empiricus', birth:160, death:210, epoch:'Hellenismus', color:'#43e97b', tier:4, above:false,
    desc:'Spätantiker Skeptiker. Hauptquelle für den pyrrhonischen Skeptizismus.',
    ideas:['Hypotyposes: Grundriss des Pyrrhonismus','Gegen die Wissenschaften','Skeptische Argumente'],
    influences:[{to:'Montaigne',type:'inspires'},{to:'Hume',type:'inspires'}]},

  { name:'Lukrez', birth:-99, death:-55, epoch:'Hellenismus', color:'#43e97b', tier:3, above:true,
    desc:'Römischer Epikureer. De rerum natura — Atomismus als Lehrgedicht.',
    ideas:['De rerum natura','Epikureismus in Latein','Materialismus als Trost'],
    influences:[]},

  { name:'Cicero', birth:-106, death:-43, epoch:'Hellenismus', color:'#60c090', tier:3, above:false,
    desc:'Römischer Staatsmann und Philosoph. Überlieferte griechische Philosophie auf Lateinisch.',
    ideas:['Naturrecht und Pflichten','De officiis','Popularisierung griechischer Philosophie'],
    influences:[{to:'Augustinus',type:'inspires'}]},

  // ── SPÄTANTIKE ───────────────────────────────────────────
  { name:'Philon v. Alexandrien', birth:-25, death:50, epoch:'Spätantike', color:'#ff8090', tier:4, above:true,
    desc:'Jüdischer Philosoph. Verband jüdische Theologie mit platonischer Philosophie.',
    ideas:['Logos als Mittler zwischen Gott und Welt','Allegorische Schriftauslegung','Vorläufer der Gnosis'],
    influences:[{to:'Plotin',type:'inspires'},{to:'Augustinus',type:'inspires'}]},

  { name:'Marc Aurel', birth:121, death:180, epoch:'Spätantike', color:'#ff8090', tier:2, above:false,
    desc:'Kaiser und Stoiker. Meditationen als persönliches Tagebuch der Selbstprüfung.',
    ideas:['Stoische Gleichmut','Pflicht über persönliches Glück','Das Innere ist stets frei'],
    influences:[]},

  { name:'Plotin', birth:204, death:270, epoch:'Spätantike', color:'#ff6584', tier:1, above:true,
    desc:'Bedeutendster Neuplatoniker. Das Eine — Nous — Seele als drei Hypostasen.',
    ideas:['Das Eine: jenseits aller Bestimmungen','Emanation: Aus dem Einen strömt alles aus','Rückkehr der Seele zum Einen'],
    influences:[{to:'Porphyrios',type:'student'},{to:'Proklos',type:'develops'},{to:'Augustinus',type:'inspires'},{to:'Meister Eckhart',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  { name:'Porphyrios', birth:234, death:305, epoch:'Spätantike', color:'#ff6584', tier:3, above:false,
    desc:'Schüler Plotins. Herausgeber der Enneaden. Isagoge prägte mittelalterliche Logik.',
    ideas:['Herausgabe von Plotins Enneaden','Universalienproblem','Kritik am Christentum'],
    influences:[{to:'Proklos',type:'develops'}]},

  { name:'Proklos', birth:412, death:485, epoch:'Spätantike', color:'#ff6584', tier:3, above:true,
    desc:'Letzter großer Neuplatoniker. Systematisierte den Neuplatonismus.',
    ideas:['Elemente der Theologie','Systematisierung des Neuplatonismus','Einfluss auf Pseudo-Dionysius'],
    influences:[{to:'Ps.-Dionysius Areopagita',type:'inspires'}]},

  { name:'Augustinus', birth:354, death:430, epoch:'Spätantike', color:'#ff6584', tier:1, above:false,
    desc:'Kirchenvater. Verband Neuplatonismus mit christlichem Denken. Prägte westliche Theologie.',
    ideas:['Das Böse als Privation des Guten','Gottestaat vs. Erdenstaat','Zeit als Bewusstseinsbewegung der Seele'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'},{to:'Anselm',type:'inspires'},{to:'Luther',type:'inspires'}]},

  { name:'Boethius', birth:477, death:524, epoch:'Spätantike', color:'#e87070', tier:3, above:true,
    desc:'Im Gefängnis schrieb er den Trost der Philosophie — eines der meistgelesenen Bücher.',
    ideas:['Trost der Philosophie','Aristoteles-Übersetzungen ins Lateinische','Universalienproblem'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'}]},

  // ── FRÜHES MITTELALTER ───────────────────────────────────
  { name:'Ps.-Dionysius Areopagita', birth:500, death:530, epoch:'Frühes MA', color:'#98d8d8', tier:3, above:false,
    desc:'Verband Neuplatonismus mit christlicher Mystik. Negative Theologie.',
    ideas:['Apophatische Theologie','Hierarchien der Engel','Mystische Einigung mit Gott'],
    influences:[{to:'Meister Eckhart',type:'inspires'},{to:'Nikolaus v. Kues',type:'inspires'}]},

  { name:'Johannes Scottus Eriugena', birth:815, death:877, epoch:'Frühes MA', color:'#98d8d8', tier:4, above:true,
    desc:'Erster bedeutender westlicher Systematiker. Pantheistische Naturphilosophie.',
    ideas:['Periphyseon: Vier Einteilungen der Natur','Pantheismus avant la lettre','Ps.-Dionysius auf Latein'],
    influences:[]},

  // ── ISLAMISCHE PHILOSOPHIE ───────────────────────────────
  { name:'Al-Kindi', birth:801, death:873, epoch:'Islamisch', color:'#60c060', tier:4, above:false,
    desc:'Erster arabischer Philosoph. Übersetzte und kommentierte Aristoteles.',
    ideas:['Erster arabischer Philosoph','Aristoteles-Rezeption','Intellektlehre'],
    influences:[{to:'Avicenna',type:'inspires'}]},

  { name:'Al-Farabi', birth:872, death:950, epoch:'Islamisch', color:'#60c060', tier:4, above:true,
    desc:'Der zweite Lehrer (nach Aristoteles). Verband Platon und Aristoteles.',
    ideas:['Zweiter Lehrer (nach Aristoteles)','Ideale Stadt (nach Platon)','Intellektlehre'],
    influences:[{to:'Avicenna',type:'inspires'}]},

  { name:'Avicenna', birth:980, death:1037, epoch:'Islamisch', color:'#60c060', tier:2, above:false,
    desc:'Bedeutendster islamischer Philosoph und Arzt. Essenz und Existenz als trennbar.',
    ideas:['Fliegender Mensch: Beweis für die Seele','Essenz und Existenz trennbar','Aristoteles-Kommentare'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'},{to:'Averroes',type:'critic'}]},

  { name:'Al-Ghazali', birth:1058, death:1111, epoch:'Islamisch', color:'#60c060', tier:3, above:true,
    desc:'Theologe und Mystiker. Kritisierte die islamischen Philosophen scharf.',
    ideas:['Inkohärenz der Philosophen (gegen Avicenna)','Mystische Erfahrung als Erkenntnisweg','Sufi-Spiritualität'],
    influences:[{to:'Averroes',type:'critic'}]},

  { name:'Averroes', birth:1126, death:1198, epoch:'Islamisch', color:'#60c060', tier:2, above:false,
    desc:'Großer Kommentator des Aristoteles. Einheit des aktiven Intellekts.',
    ideas:['Aristoteles-Kommentare','Einheit des aktiven Intellekts','Trennung von Philosophie und Religion'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'},{to:'Duns Scotus',type:'critic'}]},

  { name:'Maimonides', birth:1138, death:1204, epoch:'Islamisch', color:'#60c060', tier:3, above:true,
    desc:'Bedeutendster jüdischer Philosoph. Führer der Unschlüssigen.',
    ideas:['Führer der Unschlüssigen','Negative Theologie im Judentum','Aristoteles und Torah'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'}]},

  // ── SCHOLASTIK ───────────────────────────────────────────
  { name:'Anselm v. Canterbury', birth:1033, death:1109, epoch:'Scholastik', color:'#98d8d8', tier:3, above:false,
    desc:'Begründer der Scholastik. Credo ut intelligam. Ontologischer Gottesbeweis.',
    ideas:['Credo ut intelligam','Ontologischer Gottesbeweis','Fides quaerens intellectum'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'}]},

  { name:'Petrus Abaelardus', birth:1079, death:1142, epoch:'Scholastik', color:'#98d8d8', tier:3, above:true,
    desc:'Universalienstreit: Nominalismus gegen Realismus. Theologe und Liebhaber (Héloïse).',
    ideas:['Universalienstreit: Konzeptualismus','Sic et Non: Dialektische Methode','Ethik der Absicht'],
    influences:[{to:'Thomas v. Aquin',type:'inspires'}]},

  { name:'Thomas v. Aquin', birth:1225, death:1274, epoch:'Scholastik', color:'#98d8d8', tier:1, above:false,
    desc:'Synthesis von Aristoteles und christlicher Theologie in der Summa Theologica.',
    ideas:['Fünf Gottesbeweise','Naturrecht als Grundlage','Glaube und Vernunft als komplementär'],
    influences:[{to:'Duns Scotus',type:'critic'},{to:'Wilhelm v. Ockham',type:'critic'}]},

  { name:'Duns Scotus', birth:1266, death:1308, epoch:'Scholastik', color:'#88c8c8', tier:3, above:true,
    desc:'Subtiler Doktor. Univozität des Seins. Haecceitas als Individuationsprinzip.',
    ideas:['Univozität des Seinsbegriffs','Haecceitas: Das Diesheit-Prinzip','Voluntarismus: Wille über Intellekt'],
    influences:[{to:'Wilhelm v. Ockham',type:'critic'}]},

  { name:'Wilhelm v. Ockham', birth:1287, death:1347, epoch:'Scholastik', color:'#88c8c8', tier:2, above:false,
    desc:'Begründer des Nominalismus. Universalien sind nur Namen. Ockhams Rasiermesser.',
    ideas:['Universalien sind nur Namen','Ockhams Rasiermesser','Trennung von Philosophie und Theologie'],
    influences:[{to:'Luther',type:'inspires'},{to:'Francis Bacon',type:'inspires'}]},

  { name:'Roger Bacon', birth:1214, death:1294, epoch:'Scholastik', color:'#88c8c8', tier:4, above:true,
    desc:'Franciscaner und Empiriker. Forderte Experiment und Mathematik als Methode.',
    ideas:['Experiment als Erkenntnisweg','Mathematik als Sprache der Natur','Optik und Naturwissenschaft'],
    influences:[{to:'Francis Bacon',type:'inspires'}]},

  // ── MYSTIK ───────────────────────────────────────────────
  { name:'Meister Eckhart', birth:1260, death:1328, epoch:'Mystik', color:'#d090f0', tier:1, above:true,
    desc:'Dominikaner-Mystiker. Gottesgeburt in der Seele. Radikale Einheitsontologie.',
    ideas:['Gottesgeburt in der Seele','Abgeschiedenheit als höchste Tugend','Seelenfünklein als göttlicher Kern'],
    influences:[{to:'Johannes Tauler',type:'student'},{to:'Nikolaus v. Kues',type:'inspires'},{to:'Hegel',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  { name:'Johannes Tauler', birth:1300, death:1361, epoch:'Mystik', color:'#d090f0', tier:4, above:false,
    desc:'Schüler Eckharts. Deutsche Mystik zur Frömmigkeitspraxis.',
    ideas:['Gelassenheit','Gottesgeburt als Praxis','Einfluss auf Luther'],
    influences:[{to:'Luther',type:'inspires'}]},

  { name:'Hildegard v. Bingen', birth:1098, death:1179, epoch:'Mystik', color:'#d090f0', tier:3, above:true,
    desc:'Mystikerin, Äbtissin, Naturkundlerin und Komponistin.',
    ideas:['Viriditas: Lebenskraft Gottes','Visionäre Theologie','Universale Harmonie'],
    influences:[]},

  // ── RENAISSANCE ──────────────────────────────────────────
  { name:'Nikolaus v. Kues', birth:1401, death:1464, epoch:'Renaissance', color:'#f85888', tier:2, above:false,
    desc:'Coincidentia oppositorum: In Gott fallen Gegensätze zusammen. Docta ignorantia.',
    ideas:['Coincidentia oppositorum','Docta ignorantia: Das gelehrte Nichtwissen','Unendlichkeit des Universums'],
    influences:[{to:'Giordano Bruno',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  { name:'Pico della Mirandola', birth:1463, death:1494, epoch:'Renaissance', color:'#f85888', tier:3, above:true,
    desc:'Rede über die Würde des Menschen — Gründungstext des Humanismus.',
    ideas:['Würde des Menschen','Der Mensch kann sich selbst formen','Synthesis aller Weisheit'],
    influences:[]},

  { name:'Montaigne', birth:1533, death:1592, epoch:'Renaissance', color:'#e87070', tier:2, above:false,
    desc:'Erfinder des Essays. Philosophie als Selbsterkenntnis und Lebenskunst.',
    ideas:['Was weiß ich? (Que sais-je?)','Essay als Gattung','Stoische Gelassenheit'],
    influences:[{to:'Pascal',type:'inspires'},{to:'Descartes',type:'inspires'}]},

  { name:'Giordano Bruno', birth:1548, death:1600, epoch:'Renaissance', color:'#f85888', tier:2, above:true,
    desc:'Lehrte das unendliche Universum mit unzähligen Welten. Starb auf dem Scheiterhaufen.',
    ideas:['Unendlichkeit des Universums','Unzählige bewohnte Welten','Pantheismus'],
    influences:[{to:'Spinoza',type:'inspires'}]},

  { name:'Francis Bacon', birth:1561, death:1626, epoch:'Renaissance', color:'#e87070', tier:2, above:false,
    desc:'Begründer der modernen Wissenschaftsmethode. Wissen ist Macht — Induktion statt Deduktion.',
    ideas:['Induktive Methode','Novum Organum','Vier Idola der Erkenntnis'],
    influences:[{to:'Locke',type:'inspires'},{to:'Hume',type:'inspires'}]},

  { name:'Machiavelli', birth:1469, death:1527, epoch:'Renaissance', color:'#e87070', tier:3, above:true,
    desc:'Begründer der modernen Politikwissenschaft. Der Zweck heiligt die Mittel.',
    ideas:['Realpolitik: Macht ohne Moral','Der Fürst','Virtù und Fortuna'],
    influences:[{to:'Hobbes',type:'inspires'}]},

  // ── RATIONALISMUS ────────────────────────────────────────
  { name:'Descartes', birth:1596, death:1650, epoch:'Rationalismus', color:'#e85878', tier:1, above:true,
    desc:'Vater der modernen Philosophie. Cogito ergo sum. Methodischer Zweifel.',
    ideas:['Cogito ergo sum','Methodischer Zweifel','Körper-Geist-Dualismus'],
    influences:[{to:'Spinoza',type:'critic'},{to:'Leibniz',type:'critic'},{to:'Malebranche',type:'student'},{to:'Pascal',type:'critic'}]},

  { name:'Hobbes', birth:1588, death:1679, epoch:'Rationalismus', color:'#e07070', tier:2, above:false,
    desc:'Begründer des modernen politischen Denkens. Der Staat als Leviathan.',
    ideas:['Naturzustand: Bellum omnium contra omnes','Gesellschaftsvertrag','Leviathan: Der sterbliche Gott'],
    influences:[{to:'Locke',type:'critic'},{to:'Rousseau',type:'critic'}]},

  { name:'Pascal', birth:1623, death:1662, epoch:'Rationalismus', color:'#d06060', tier:2, above:true,
    desc:'Mathematiker und religiöser Denker. Der Mensch als denkendes Rohr.',
    ideas:['Der Mensch ist ein denkendes Rohr','Pascals Wette','Gründe des Herzens'],
    influences:[]},

  { name:'Malebranche', birth:1638, death:1715, epoch:'Rationalismus', color:'#d06060', tier:4, above:false,
    desc:'Cartesianischer Theologe. Okkasionalismus: Gott als einzige Ursache.',
    ideas:['Okkasionalismus','Wir sehen alle Dinge in Gott','Verbindung Descartes und Augustinus'],
    influences:[]},

  { name:'Spinoza', birth:1632, death:1677, epoch:'Rationalismus', color:'#f85888', tier:1, above:false,
    desc:'Pantheist: Deus sive Natura. Freiheit als Einsicht in die Notwendigkeit.',
    ideas:['Deus sive Natura','Freiheit als Einsicht in Notwendigkeit','Geometrische Methode der Ethik'],
    influences:[{to:'Hegel',type:'inspires'},{to:'Schelling',type:'inspires'},{to:'Jacobi',type:'critic'}]},

  { name:'Leibniz', birth:1646, death:1716, epoch:'Rationalismus', color:'#e87060', tier:2, above:true,
    desc:'Universalgenie. Monadologie. Die beste aller möglichen Welten.',
    ideas:['Monadologie','Die beste aller möglichen Welten','Prästabilierte Harmonie'],
    influences:[{to:'Wolff',type:'student'},{to:'Kant',type:'critic'},{to:'Schelling',type:'inspires'}]},

  { name:'Wolff', birth:1679, death:1754, epoch:'Rationalismus', color:'#d07050', tier:4, above:false,
    desc:'Systematisierer von Leibniz. Lehrte Kant und die deutsche Schulphilosophie.',
    ideas:['Systematisierung Leibniz\'scher Philosophie','Deutsche Schulphilosophie','Ontologie als Wissenschaft'],
    influences:[{to:'Kant',type:'inspires'}]},

  // ── EMPIRISMUS ───────────────────────────────────────────
  { name:'Locke', birth:1632, death:1704, epoch:'Empirismus', color:'#60c090', tier:2, above:true,
    desc:'Begründer des politischen Liberalismus. Tabula rasa. Alles Wissen aus Erfahrung.',
    ideas:['Tabula rasa: Keine angeborenen Ideen','Naturrecht auf Leben, Freiheit, Eigentum','Gewaltenteilung'],
    influences:[{to:'Berkeley',type:'critic'},{to:'Hume',type:'inspires'},{to:'Rousseau',type:'inspires'}]},

  { name:'Berkeley', birth:1685, death:1753, epoch:'Empirismus', color:'#50b080', tier:3, above:false,
    desc:'Radikaler Idealist. Esse est percipi: Sein heißt wahrgenommen werden.',
    ideas:['Esse est percipi','Immaterialismus','Gott als Garant der Wahrnehmung'],
    influences:[{to:'Hume',type:'inspires'}]},

  { name:'Hume', birth:1711, death:1776, epoch:'Empirismus', color:'#50b080', tier:1, above:true,
    desc:'Radikaler Skeptiker. Kausalität ist Gewohnheit. Weckte Kant aus dem dogmatischen Schlummer.',
    ideas:['Kausalität ist nur Gewohnheit','Das Selbst ist ein Bündel von Eindrücken','Sein und Sollen: Das Humsche Gesetz'],
    influences:[{to:'Kant',type:'critic'},{to:'Bentham',type:'inspires'}]},

  // ── AUFKLÄRUNG ───────────────────────────────────────────
  { name:'Vico', birth:1668, death:1744, epoch:'Aufklärung', color:'#ffd166', tier:3, above:false,
    desc:'Begründer der Geschichtsphilosophie. Verum et factum convertuntur.',
    ideas:['Verum-Factum-Prinzip','Drei Zeitalter der Geschichte','Neue Wissenschaft'],
    influences:[{to:'Herder',type:'inspires'},{to:'Hegel',type:'inspires'}]},

  { name:'Voltaire', birth:1694, death:1778, epoch:'Aufklärung', color:'#ffd166', tier:2, above:true,
    desc:'Leitfigur der Aufklärung. Radikale Religionskritik. Écrasez l\'infâme!',
    ideas:['Écrasez l\'infâme!','Satire des Optimismus (Candide)','Deismus und Religionskritik'],
    influences:[]},

  { name:'Montesquieu', birth:1689, death:1755, epoch:'Aufklärung', color:'#ffd166', tier:3, above:false,
    desc:'Geist der Gesetze. Gewaltenteilung als politisches Prinzip.',
    ideas:['Geist der Gesetze','Gewaltenteilung als Staatsform','Soziologische Gesetzestheorie'],
    influences:[{to:'Kant',type:'inspires'},{to:'Rousseau',type:'inspires'}]},

  { name:'Rousseau', birth:1712, death:1778, epoch:'Aufklärung', color:'#ffd166', tier:2, above:true,
    desc:'Der natürliche Mensch ist gut — die Gesellschaft korrumpiert ihn.',
    ideas:['Der natürliche Mensch ist gut','Gesellschaftsvertrag und Volkssouveränität','Emile: Erziehung'],
    influences:[{to:'Kant',type:'inspires'},{to:'Schiller',type:'inspires'},{to:'Hegel',type:'inspires'}]},

  { name:'Condillac', birth:1714, death:1780, epoch:'Aufklärung', color:'#eec040', tier:4, above:false,
    desc:'Sensualismus: Alle geistigen Fähigkeiten aus der Empfindung abgeleitet.',
    ideas:['Sensualismus','Sprache als Denken','Locke auf Französisch'],
    influences:[]},

  { name:'Herder', birth:1744, death:1803, epoch:'Aufklärung', color:'#eec040', tier:3, above:true,
    desc:'Geschichtsphilosoph und Sprachtheoretiker. Gegenaufklärung und Sturm und Drang.',
    ideas:['Sprache als Medium des Denkens','Volksgeist: Kultureller Relativismus','Kritik an Kant'],
    influences:[{to:'Hegel',type:'inspires'},{to:'Schelling',type:'inspires'}]},

  // ── DEUTSCHER IDEALISMUS ─────────────────────────────────
  { name:'Kant', birth:1724, death:1804, epoch:'Dt. Idealismus', color:'#e8c040', tier:1, above:false,
    desc:'Kopernikanische Wende: Das Subjekt konstituiert die Erkenntnis.',
    ideas:['Kategorischer Imperativ','Kritik der reinen Vernunft: Grenzen der Erkenntnis','Das Ding an sich bleibt unerkennbar'],
    influences:[{to:'Fichte',type:'student'},{to:'Schiller',type:'inspires'},{to:'Schopenhauer',type:'critic'},{to:'Hegel',type:'critic'},{to:'Reinhold',type:'student'}]},

  { name:'Reinhold', birth:1757, death:1823, epoch:'Dt. Idealismus', color:'#d0b030', tier:4, above:true,
    desc:'Popularisierte Kant und bereitete den Weg für Fichte.',
    ideas:['Elementarphilosophie','Popularisierung Kants','Satz des Bewusstseins'],
    influences:[{to:'Fichte',type:'inspires'}]},

  { name:'Schiller', birth:1759, death:1805, epoch:'Dt. Idealismus', color:'#d0b030', tier:3, above:false,
    desc:'Dichter und Ästhetiker. Ästhetische Erziehung als Weg zur Freiheit.',
    ideas:['Ästhetische Erziehung des Menschen','Über naive und sentimentalische Dichtung','Spiel als Freiheitsvollzug'],
    influences:[{to:'Schelling',type:'inspires'},{to:'Hegel',type:'inspires'}]},

  { name:'Jacobi', birth:1743, death:1819, epoch:'Dt. Idealismus', color:'#c0a010', tier:2, above:true,
    desc:'Kritiker des Rationalismus. Glaube als Fundament. Pantheismusstreit gegen Spinoza.',
    ideas:['Glaube als Fundament der Vernunft','Pantheismusstreit (gegen Spinoza)','Ungrund der Freiheit'],
    influences:[{to:'Schelling',type:'inspires'},{to:'Fichte',type:'critic'},{to:'Hegel',type:'critic'}]},

  { name:'Fichte', birth:1762, death:1814, epoch:'Dt. Idealismus', color:'#d0b030', tier:2, above:false,
    desc:'Radikalisierte Kant. Das Ich setzt sich selbst und das Nicht-Ich.',
    ideas:['Das Ich setzt sich selbst','Wissenschaftslehre','Tathandlung statt Faktum'],
    influences:[{to:'Schelling',type:'student'},{to:'Hegel',type:'student'},{to:'Schleiermacher',type:'inspires'}]},

  { name:'Schleiermacher', birth:1768, death:1834, epoch:'Dt. Idealismus', color:'#c0a010', tier:3, above:true,
    desc:'Theologe und Hermeneutiker. Begründer der modernen Hermeneutik.',
    ideas:['Hermeneutischer Zirkel','Religion als Gefühl schlechthinniger Abhängigkeit','Gesprächs-Dialektik'],
    influences:[{to:'Dilthey',type:'inspires'},{to:'Gadamer',type:'inspires'}]},

  { name:'Schelling', birth:1775, death:1854, epoch:'Dt. Idealismus', color:'#c8a020', tier:1, above:false,
    desc:'Naturphilosoph und Spätphilosoph. Weltalterphilosophie als Geschichte des Absoluten.',
    ideas:['Identitätsphilosophie: Natur und Geist sind eins','Weltalterphilosophie: Geschichte des Absoluten','Freiheitsschrift: Das Böse als Möglichkeit der Freiheit'],
    influences:[{to:'Hegel',type:'critic'},{to:'Kierkegaard',type:'inspires'},{to:'Marx',type:'critic'},{to:'Nietzsche',type:'inspires'},{to:'Heidegger',type:'inspires'}]},

  { name:'Hegel', birth:1770, death:1831, epoch:'Dt. Idealismus', color:'#c09010', tier:1, above:true,
    desc:'Dialektik als Weltprinzip. Das Absolute verwirklicht sich in der Zeit.',
    ideas:['These – Antithese – Synthese','Phänomenologie des Geistes','Der Weltgeist in der Geschichte'],
    influences:[{to:'Marx',type:'critic'},{to:'Kierkegaard',type:'critic'},{to:'Feuerbach',type:'student'},{to:'Adorno',type:'critic'},{to:'Benedetto Croce',type:'develops'}]},

  // ── 19. JAHRHUNDERT ──────────────────────────────────────
  { name:'Schopenhauer', birth:1788, death:1860, epoch:'19. Jh.', color:'#e07070', tier:2, above:false,
    desc:'Der Wille als blindes kosmisches Prinzip. Das Leben ist Leiden.',
    ideas:['Der Wille als blinder Weltgrund','Erlösung durch Kunst und Askese','Verneinung des Willens'],
    influences:[{to:'Nietzsche',type:'inspires'},{to:'Wittgenstein',type:'inspires'},{to:'Freud',type:'inspires'}]},

  { name:'Feuerbach', birth:1804, death:1872, epoch:'19. Jh.', color:'#c07050', tier:3, above:true,
    desc:'Gott ist eine Projektion menschlicher Wünsche. Anthropologische Wende.',
    ideas:['Gott als Projektion','Materialismus gegen Hegel','Das Wesen des Christentums'],
    influences:[{to:'Marx',type:'inspires'}]},

  { name:'Marx', birth:1818, death:1883, epoch:'19. Jh.', color:'#c06040', tier:1, above:false,
    desc:'Stellt Hegel vom Kopf auf die Füße. Materielle Verhältnisse treiben die Geschichte.',
    ideas:['Historischer Materialismus','Entfremdung der Arbeit','Basis und Überbau'],
    influences:[{to:'Engels',type:'develops'},{to:'Lenin',type:'develops'},{to:'Gramsci',type:'develops'},{to:'Lukács',type:'develops'}]},

  { name:'Engels', birth:1820, death:1895, epoch:'19. Jh.', color:'#b05030', tier:4, above:true,
    desc:'Mitbegründer des Marxismus. Dialektischer Materialismus.',
    ideas:['Dialektischer Materialismus','Anti-Dühring','Ursprung der Familie'],
    influences:[]},

  { name:'Kierkegaard', birth:1813, death:1855, epoch:'19. Jh.', color:'#fb923c', tier:1, above:true,
    desc:'Begründer des Existenzialismus. Gegen Hegels System. Sprung zum Glauben.',
    ideas:['Drei Existenzstadien','Entweder/Oder: Radikale Entscheidung','Der Sprung zum Glauben'],
    influences:[{to:'Jaspers',type:'inspires'},{to:'Heidegger',type:'inspires'},{to:'Sartre',type:'inspires'}]},

  { name:'Comte', birth:1798, death:1857, epoch:'19. Jh.', color:'#e0a030', tier:3, above:false,
    desc:'Begründer des Positivismus und der Soziologie als Wissenschaft.',
    ideas:['Drei Stadien der Menschheit','Positivismus als Weltanschauung','Soziologie als Wissenschaft'],
    influences:[{to:'Mill',type:'inspires'},{to:'Spencer',type:'inspires'}]},

  { name:'Mill', birth:1806, death:1873, epoch:'19. Jh.', color:'#e0a030', tier:3, above:true,
    desc:'Utilitarismus: Das größte Glück der größten Zahl. Liberalismus.',
    ideas:['Utilitarismus: Größtes Glück','On Liberty: Freiheit des Individuums','Induktive Logik'],
    influences:[{to:'Russell',type:'inspires'},{to:'Rawls',type:'inspires'}]},

  { name:'Nietzsche', birth:1844, death:1900, epoch:'19. Jh.', color:'#fb923c', tier:1, above:false,
    desc:'Radikaler Kritiker aller abendländischen Werte. Umwertung aller Werte.',
    ideas:['Gott ist tot','Wille zur Macht als Grundtrieb','Übermensch und ewige Wiederkehr'],
    influences:[{to:'Heidegger',type:'inspires'},{to:'Foucault',type:'inspires'},{to:'Deleuze',type:'develops'},{to:'Jaspers',type:'inspires'}]},

  { name:'Dilthey', birth:1833, death:1911, epoch:'19. Jh.', color:'#e08030', tier:2, above:true,
    desc:'Begründer der Geisteswissenschaften. Verstehen als eigene Methode.',
    ideas:['Verstehen vs. Erklären','Geisteswissenschaften als Methodik','Hermeneutik des Lebens'],
    influences:[{to:'Heidegger',type:'inspires'},{to:'Gadamer',type:'inspires'},{to:'Jaspers',type:'inspires'}]},

  { name:'Spencer', birth:1820, death:1903, epoch:'19. Jh.', color:'#d09020', tier:4, above:false,
    desc:'Sozialer Darwinismus. Evolution als universales Prinzip.',
    ideas:['Sozialer Darwinismus','Überleben des Stärksten auf Gesellschaft angewendet','Synthetische Philosophie'],
    influences:[]},

  { name:'Peirce', birth:1839, death:1914, epoch:'Pragmatismus', color:'#20a060', tier:3, above:true,
    desc:'Begründer des Pragmatismus. Semiotik und Abduktion.',
    ideas:['Pragmatismus: Bedeutung durch Handlungsfolgen','Semiotik: Zeichentheorie','Abduktion als Schlussprinzip'],
    influences:[{to:'James',type:'student'},{to:'Dewey',type:'inspires'},{to:'Rorty',type:'inspires'}]},

  { name:'James', birth:1842, death:1910, epoch:'Pragmatismus', color:'#20a060', tier:3, above:false,
    desc:'Pragmatismus: Wahrheit als das, was sich bewährt.',
    ideas:['Wahrheit als Nützlichkeit','Radikaler Empirismus','Varieties of Religious Experience'],
    influences:[{to:'Dewey',type:'inspires'},{to:'Bergson',type:'inspires'}]},

  { name:'Dewey', birth:1859, death:1952, epoch:'Pragmatismus', color:'#20a060', tier:3, above:true,
    desc:'Pragmatismus und Demokratie. Erziehung als gesellschaftliche Praxis.',
    ideas:['Demokratie und Erziehung','Instrumentalismus','Erfahrung als Grundbegriff'],
    influences:[{to:'Rorty',type:'inspires'}]},

  { name:'Bergson', birth:1859, death:1941, epoch:'Lebensphilosophie', color:'#e09040', tier:2, above:false,
    desc:'Durée als echte gelebte Zeit gegen die raumhafte Messung.',
    ideas:['Durée: Echte gelebte Zeit','Élan vital: Lebensschwung','Intuition als höhere Erkenntnis'],
    influences:[{to:'Husserl',type:'inspires'},{to:'Merleau-Ponty',type:'inspires'},{to:'Deleuze',type:'develops'}]},

  // ── 20. JAHRHUNDERT ──────────────────────────────────────
  { name:'Frege', birth:1848, death:1925, epoch:'Analytisch', color:'#67e8f9', tier:2, above:true,
    desc:'Begründer der modernen Logik und Sprachphilosophie.',
    ideas:['Moderne Prädikatenlogik','Sinn und Bedeutung','Begründer der analytischen Philosophie'],
    influences:[{to:'Russell',type:'student'},{to:'Wittgenstein',type:'inspires'},{to:'Carnap',type:'inspires'}]},

  { name:'Russell', birth:1872, death:1970, epoch:'Analytisch', color:'#67e8f9', tier:2, above:false,
    desc:'Mitbegründer der analytischen Philosophie. Logischer Atomismus.',
    ideas:['Logischer Atomismus','Principia Mathematica','Philosophie als logische Analyse'],
    influences:[{to:'Wittgenstein',type:'student'},{to:'Carnap',type:'inspires'},{to:'Quine',type:'inspires'}]},

  { name:'Moore', birth:1873, death:1958, epoch:'Analytisch', color:'#57d8e9', tier:3, above:true,
    desc:'Common Sense-Philosophie. Naturalistische Fehlschluss in der Ethik.',
    ideas:['Common Sense als Ausgangspunkt','Naturalistischer Fehlschluss','Analytische Methode in der Ethik'],
    influences:[{to:'Wittgenstein',type:'inspires'}]},

  { name:'Husserl', birth:1859, death:1938, epoch:'Phänomenologie', color:'#5b80e8', tier:1, above:false,
    desc:'Begründer der Phänomenologie. Zu den Sachen selbst. Intentionalität als Grundstruktur.',
    ideas:['Intentionalität: Bewusstsein ist immer von etwas','Epoché: Einklammerung der Einstellung','Lebenswelt als Fundament'],
    influences:[{to:'Heidegger',type:'student'},{to:'Merleau-Ponty',type:'inspires'},{to:'Sartre',type:'inspires'},{to:'Levinas',type:'student'}]},

  { name:'Brentano', birth:1838, death:1917, epoch:'Phänomenologie', color:'#4a70d8', tier:3, above:true,
    desc:'Vorläufer Husserls. Intentionalität als Merkmal psychischer Akte.',
    ideas:['Intentionalität als psychisches Merkmal','Deskriptive Psychologie','Akt und Inhalt'],
    influences:[{to:'Husserl',type:'student'},{to:'Meinong',type:'student'}]},

  { name:'Meinong', birth:1853, death:1920, epoch:'Phänomenologie', color:'#4a70d8', tier:4, above:false,
    desc:'Gegenstandstheorie. Es gibt auch Gegenstände, die nicht existieren.',
    ideas:['Gegenstandstheorie','Rundes Viereck als Gegenstand','Existenz vs. Subsistenz'],
    influences:[{to:'Russell',type:'critic'}]},

  { name:'Wittgenstein', birth:1889, death:1951, epoch:'Analytisch', color:'#67e8f9', tier:1, above:true,
    desc:'Zwei Philosophien: Früh Grenzen der Sprache, spät Sprachspiele als Lebensformen.',
    ideas:['Worüber man nicht sprechen kann, muss man schweigen','Sprachspiele und Lebensformen','Philosophische Probleme als Sprachverwirrungen'],
    influences:[{to:'Carnap',type:'inspires'},{to:'Austin',type:'inspires'},{to:'Anscombe',type:'student'}]},

  { name:'Carnap', birth:1891, death:1970, epoch:'Analytisch', color:'#57d8e9', tier:3, above:false,
    desc:'Logischer Empirismus. Wiener Kreis. Metaphysik als sinnlos.',
    ideas:['Logischer Empirismus','Wiener Kreis','Metaphysik als Pseudoaussagen'],
    influences:[{to:'Quine',type:'critic'},{to:'Popper',type:'critic'}]},

  { name:'Popper', birth:1902, death:1994, epoch:'Analytisch', color:'#57d8e9', tier:2, above:true,
    desc:'Falsifikationismus: Nicht Verifikation, sondern Widerlegbarkeit als Wissenschaftskriterium.',
    ideas:['Falsifikationismus','Kritischer Rationalismus','Offene Gesellschaft und ihre Feinde'],
    influences:[{to:'Kuhn',type:'critic'},{to:'Lakatos',type:'develops'}]},

  { name:'Quine', birth:1908, death:2000, epoch:'Analytisch', color:'#57d8e9', tier:3, above:false,
    desc:'Holismus: Unsere Sätze stehen als Netz vor dem Tribunal der Erfahrung.',
    ideas:['Zwei Dogmen des Empirismus','Ontologische Relativität','Naturalisierte Erkenntnistheorie'],
    influences:[{to:'Davidson',type:'inspires'},{to:'Rorty',type:'inspires'}]},

  { name:'Austin', birth:1911, death:1960, epoch:'Analytisch', color:'#57d8e9', tier:3, above:true,
    desc:'Ordinary Language Philosophy. Sprechakttheorie.',
    ideas:['Sprechakttheorie','Ordinary Language Philosophy','How to Do Things with Words'],
    influences:[{to:'Searle',type:'student'},{to:'Habermas',type:'inspires'}]},

  { name:'Ryle', birth:1900, death:1976, epoch:'Analytisch', color:'#57d8e9', tier:4, above:false,
    desc:'Begriff des Geistes. Kategorienfehler. Der Geist als Gespenst in der Maschine.',
    ideas:['Kategorienfehler','Gespenst in der Maschine (gegen Descartes)','Wissen wie vs. Wissen dass'],
    influences:[]},

  { name:'Heidegger', birth:1889, death:1976, epoch:'Phänomenologie', color:'#5b80e8', tier:1, above:false,
    desc:'Fundamentalontologie. Das Sein als die vergessene Frage. Dasein als In-der-Welt-sein.',
    ideas:['Sein und Zeit: Die Seinsfrage','Dasein als Sorgestruktur','Das Gestell als Wesen der Technik'],
    influences:[{to:'Gadamer',type:'student'},{to:'Sartre',type:'inspires'},{to:'Levinas',type:'critic'},{to:'Derrida',type:'inspires'},{to:'Arendt',type:'student'}]},

  { name:'Scheler', birth:1874, death:1928, epoch:'Phänomenologie', color:'#4a70d8', tier:3, above:true,
    desc:'Phänomenologische Wertethik. Der Mensch als weltoffenes Wesen.',
    ideas:['Wertethik gegen Kant','Der Mensch als weltoffenes Wesen','Ressentiment'],
    influences:[{to:'Heidegger',type:'inspires'},{to:'Wojtyla',type:'inspires'}]},

  { name:'Jaspers', birth:1883, death:1969, epoch:'Existenz.', color:'#fb923c', tier:2, above:false,
    desc:'Grenzsituationen als Weckruf zur Existenz. Kommunikation als Bedingung.',
    ideas:['Grenzsituationen: Tod, Leiden, Kampf, Schuld','Kommunikation als Bedingung','Die Schuldfrage (1945)'],
    influences:[]},

  { name:'Lukács', birth:1885, death:1971, epoch:'Krit. Theorie', color:'#9050c0', tier:3, above:true,
    desc:'Verdinglichung und Klassenbewusstsein. Westlicher Marxismus.',
    ideas:['Verdinglichung','Geschichte und Klassenbewusstsein','Westlicher Marxismus'],
    influences:[{to:'Adorno',type:'inspires'},{to:'Benjamin',type:'inspires'}]},

  { name:'Horkheimer', birth:1895, death:1973, epoch:'Krit. Theorie', color:'#9050c0', tier:3, above:false,
    desc:'Mitgründer der Frankfurter Schule. Kritische Theorie vs. traditionelle Theorie.',
    ideas:['Kritische Theorie vs. traditionelle','Instrumentelle Vernunft','Dialektik der Aufklärung (mit Adorno)'],
    influences:[{to:'Adorno',type:'develops'},{to:'Habermas',type:'inspires'}]},

  { name:'Benjamin', birth:1892, death:1940, epoch:'Krit. Theorie', color:'#a060d0', tier:2, above:true,
    desc:'Kulturphilosoph. Aura und technische Reproduzierbarkeit. Dialektische Bilder.',
    ideas:['Aura und ihr Verlust','Passagenwerk: Paris als Urtext der Moderne','Jetztzeit der Geschichte'],
    influences:[{to:'Adorno',type:'inspires'},{to:'Derrida',type:'inspires'}]},

  { name:'Adorno', birth:1903, death:1969, epoch:'Krit. Theorie', color:'#9050c0', tier:2, above:false,
    desc:'Negative Dialektik als Widerstand gegen Identitätsdenken. Auschwitz als Zäsur.',
    ideas:['Negative Dialektik','Dialektik der Aufklärung','Es gibt kein richtiges Leben im falschen'],
    influences:[{to:'Habermas',type:'inspires'}]},

  { name:'Gramsci', birth:1891, death:1937, epoch:'Krit. Theorie', color:'#8040b0', tier:3, above:true,
    desc:'Hegemonie als kulturelle Vorherrschaft. Organischer Intellektueller.',
    ideas:['Kulturelle Hegemonie','Organischer Intellektueller','Philosophie der Praxis'],
    influences:[{to:'Foucault',type:'inspires'}]},

  { name:'Arendt', birth:1906, death:1975, epoch:'Politische Philo.', color:'#30b060', tier:2, above:false,
    desc:'Banalität des Bösen. Vita activa: Handeln als politisches Grundprinzip.',
    ideas:['Banalität des Bösen','Vita activa: Arbeiten, Herstellen, Handeln','Ursprünge des Totalitarismus'],
    influences:[]},

  { name:'Merleau-Ponty', birth:1908, death:1961, epoch:'Phänomenologie', color:'#4a70d8', tier:2, above:true,
    desc:'Leibphänomenologie. Der Leib als primäres Subjekt der Erfahrung.',
    ideas:['Der Leib als Subjekt','Phänomenologie der Wahrnehmung','Chiasmus: Fleisch der Welt'],
    influences:[{to:'Derrida',type:'inspires'},{to:'Levinas',type:'inspires'}]},

  { name:'Sartre', birth:1905, death:1980, epoch:'Existenz.', color:'#fb923c', tier:1, above:false,
    desc:'Existenz geht der Essenz voraus. Zur Freiheit verurteilt.',
    ideas:['Existenz geht der Essenz voraus','Zur Freiheit verurteilt','Das Andere als verdinglichender Blick'],
    influences:[{to:'Beauvoir',type:'inspires'},{to:'Fanon',type:'inspires'}]},

  { name:'Beauvoir', birth:1908, death:1986, epoch:'Existenz.', color:'#fb923c', tier:2, above:true,
    desc:'Existenzialistische Feministin. Man wird nicht als Frau geboren — man wird es.',
    ideas:['Man wird nicht als Frau geboren','Das andere Geschlecht','Existenzialistische Ethik'],
    influences:[{to:'Butler',type:'inspires'}]},

  { name:'Levinas', birth:1906, death:1995, epoch:'Phänomenologie', color:'#4060c8', tier:1, above:false,
    desc:'Das Antlitz des Anderen als ethisches Ur-Phänomen. Ethik als erste Philosophie.',
    ideas:['Das Antlitz des Anderen','Ethik als erste Philosophie','Jenseits des Seins'],
    influences:[{to:'Derrida',type:'inspires'},{to:'Habermas',type:'inspires'}]},

  { name:'Camus', birth:1913, death:1960, epoch:'Existenz.', color:'#fb923c', tier:2, above:true,
    desc:'Philosoph des Absurden. Man muss sich Sisyphus als glücklich vorstellen.',
    ideas:['Das Absurde','Rebellion als Antwort','Man muss sich Sisyphus als glücklich vorstellen'],
    influences:[]},

  { name:'Gadamer', birth:1900, death:2002, epoch:'Hermeneutik', color:'#e08030', tier:2, above:false,
    desc:'Begründer der philosophischen Hermeneutik. Horizontverschmelzung.',
    ideas:['Wirkungsgeschichte','Horizontverschmelzung','Das Spiel als Struktur des Kunstwerks'],
    influences:[{to:'Ricoeur',type:'inspires'}]},

  { name:'Ricoeur', birth:1913, death:2005, epoch:'Hermeneutik', color:'#d07020', tier:3, above:true,
    desc:'Hermeneutik und Phänomenologie verbunden. Narrative Identität.',
    ideas:['Narrative Identität','Hermeneutik des Verdachts','Zeit und Erzählung'],
    influences:[]},

  { name:'Kuhn', birth:1922, death:1996, epoch:'Wissenschaftsphilo.', color:'#60b0a0', tier:2, above:false,
    desc:'Paradigmenwechsel als Struktur wissenschaftlicher Revolutionen.',
    ideas:['Paradigmenwechsel','Inkommensurabilität','Normalwissenschaft vs. Revolution'],
    influences:[{to:'Feyerabend',type:'inspires'},{to:'Foucault',type:'inspires'}]},

  { name:'Feyerabend', birth:1924, death:1994, epoch:'Wissenschaftsphilo.', color:'#50a090', tier:3, above:true,
    desc:'Anything goes — gegen die Methode. Anarchistischer Erkenntnistheoretiker.',
    ideas:['Anything goes','Gegen die Methode','Wissenschaftlicher Pluralismus'],
    influences:[]},

  // ── POSTSTRUKTURALISMUS & GEGENWART ──────────────────────
  { name:'Lévi-Strauss', birth:1908, death:2009, epoch:'Strukturalismus', color:'#e060a0', tier:3, above:false,
    desc:'Begründer des Strukturalismus. Mythologie als unbewusstes System.',
    ideas:['Strukturalismus in der Anthropologie','Mythologie als unbewusstes System','Rohe und gekochte Dinge'],
    influences:[{to:'Derrida',type:'critic'},{to:'Foucault',type:'inspires'}]},

  { name:'Althusser', birth:1918, death:1990, epoch:'Strukturalismus', color:'#e060a0', tier:4, above:true,
    desc:'Strukturalistischer Marxismus. Ideologische Staatsapparate.',
    ideas:['Strukturalistischer Marxismus','Ideologische Staatsapparate','Epistemologischer Bruch'],
    influences:[{to:'Foucault',type:'inspires'},{to:'Derrida',type:'inspires'}]},

  { name:'Foucault', birth:1926, death:1984, epoch:'Poststrukturalismus', color:'#f472b6', tier:1, above:false,
    desc:'Macht durchzieht alle Diskurse und produziert Wissen. Archäologie des Wissens.',
    ideas:['Macht-Wissen: Wissen ist Ausdruck von Macht','Diskursanalyse als Methode','Biopolitik: Macht über das Leben'],
    influences:[{to:'Derrida',type:'inspires'},{to:'Butler',type:'develops'}]},

  { name:'Derrida', birth:1930, death:2004, epoch:'Poststrukturalismus', color:'#f472b6', tier:2, above:true,
    desc:'Begründer der Dekonstruktion. Différance als Aufschub jeder Bedeutung.',
    ideas:['Dekonstruktion binärer Oppositionen','Il n\'y a pas de hors-texte','Différance: Aufschub und Unterschied'],
    influences:[{to:'Butler',type:'inspires'},{to:'Žižek',type:'inspires'}]},

  { name:'Deleuze', birth:1925, death:1995, epoch:'Poststrukturalismus', color:'#f472b6', tier:2, above:false,
    desc:'Philosoph der Differenz. Rhizom statt Baum als Denkmodell.',
    ideas:['Differenz als primär','Rhizom: Netz-Denken','Deterritorialisierung (mit Guattari)'],
    influences:[{to:'Žižek',type:'inspires'}]},

  { name:'Lyotard', birth:1924, death:1998, epoch:'Poststrukturalismus', color:'#e462b6', tier:3, above:true,
    desc:'Das postmoderne Wissen. Ende der großen Erzählungen.',
    ideas:['Ende der großen Erzählungen','Das Différend','Postmoderne und Wissen'],
    influences:[]},

  { name:'Baudrillard', birth:1929, death:2007, epoch:'Poststrukturalismus', color:'#e462b6', tier:3, above:false,
    desc:'Simulation und Simulacra. Die Wirklichkeit ist durch Zeichen ersetzt.',
    ideas:['Simulation und Simulacra','Die Hyperrealität','Die Wirklichkeit ist verschwunden'],
    influences:[]},

  { name:'Butler', birth:1956, death:0, epoch:'Gegenwart', color:'#4ade80', tier:3, above:true,
    desc:'Gender als Performanz — nicht Natur, sondern wiederholte Handlung.',
    ideas:['Gender als Performanz','Das Unbehagen der Geschlechter','Kritik der ethischen Gewalt'],
    influences:[]},

  { name:'Žižek', birth:1949, death:0, epoch:'Gegenwart', color:'#4ade80', tier:3, above:false,
    desc:'Lacanian marxist. Ideologiekritik durch Populärkultur.',
    ideas:['Ideologie und Fantasie','Das Erhabene Objekt der Ideologie','Hegel und Lacan verbunden'],
    influences:[]},

  { name:'Searle', birth:1932, death:0, epoch:'Analytisch', color:'#57d8e9', tier:3, above:true,
    desc:'Sprechakttheorie weiterentwickelt. Chinesisches Zimmer gegen starke KI.',
    ideas:['Sprechakttheorie','Chinesisches Zimmer (gegen starke KI)','Intentionalität als Grundbegriff'],
    influences:[]},

  { name:'Davidson', birth:1917, death:2003, epoch:'Analytisch', color:'#57d8e9', tier:3, above:false,
    desc:'Anomaler Monismus. Triangulation als Modell der Bedeutung.',
    ideas:['Anomaler Monismus: Geist und Körper','Davidsons Dreieck der Bedeutung','Radikale Interpretation'],
    influences:[]},

  { name:'Rawls', birth:1921, death:2002, epoch:'Politische Philo.', color:'#30b060', tier:2, above:true,
    desc:'Begründer des modernen politischen Liberalismus. Schleier des Nichtwissens.',
    ideas:['Schleier des Nichtwissens','Zwei Grundsätze der Gerechtigkeit','Priorität der Grundfreiheiten'],
    influences:[{to:'Habermas',type:'inspires'},{to:'Nozick',type:'critic'}]},

  { name:'Nozick', birth:1938, death:2002, epoch:'Politische Philo.', color:'#20a050', tier:3, above:false,
    desc:'Libertärer Gegenentwurf zu Rawls. Der minimale Staat als einzig legitimer.',
    ideas:['Libertarismus: Minimaler Staat','Anarchy State and Utopia','Kritik an Rawls\' Umverteilung'],
    influences:[]},

  { name:'Habermas', birth:1929, death:0, epoch:'Gegenwart', color:'#4ade80', tier:1, above:false,
    desc:'Theorie des kommunikativen Handelns. Die Moderne als unvollendetes Projekt.',
    ideas:['Kommunikatives Handeln','Diskursethik: Das bessere Argument','Die Moderne ist ein unvollendetes Projekt'],
    influences:[{to:'Honneth',type:'student'}]},

  { name:'Honneth', birth:1949, death:0, epoch:'Gegenwart', color:'#3abe70', tier:3, above:true,
    desc:'Anerkennungstheorie als Weiterentwicklung der Kritischen Theorie.',
    ideas:['Kampf um Anerkennung','Verdinglichung als Anerkennungsvergessenheit','Soziale Freiheit'],
    influences:[]},

  { name:'Rorty', birth:1931, death:2007, epoch:'Neopragmatismus', color:'#20a050', tier:2, above:false,
    desc:'Abkehr von Wahrheitssuche. Solidarität statt Objektivität. Ironie als Haltung.',
    ideas:['Nützlichkeit statt Wahrheit','Kontingenz von Sprache und Selbst','Solidarität als Ersatz für Objektivität'],
    influences:[]},

  { name:'Sloterdijk', birth:1947, death:0, epoch:'Gegenwart', color:'#4ade80', tier:2, above:true,
    desc:'Kulturphilosoph. Sphären-Trilogie als Neubestimmung des Raums.',
    ideas:['Sphären-Trilogie: Blasen, Globen, Schäume','Zorn und Zeit','Du musst dein Leben ändern'],
    influences:[]},

  { name:'Tengelyi', birth:1954, death:2014, epoch:'Phänomenologie', color:'#4a70d8', tier:3, above:false,
    desc:'Phänomenologe. Welt und Unendlichkeit. Lehrer von Alexander Schmidt.',
    ideas:['Welt und Unendlichkeit','Neue Phänomenologie des Geistes','Erfahrung und Ausdruck'],
    influences:[{to:'Schnell',type:'inspires'}]},

  { name:'Schnell', birth:1967, death:0, epoch:'Phänomenologie', color:'#3a60b8', tier:3, above:true,
    desc:'Transzendentalphilosoph und Phänomenologe. Betreuer der Dissertation von Alexander Schmidt.',
    ideas:['Seinsschwingungen','Transzendentalphilosophie nach Kant','Betreuer: Schellings Zeittheorie (Schmidt)'],
    influences:[]},

  { name:'Fanon', birth:1925, death:1961, epoch:'Politische Philo.', color:'#30b060', tier:3, above:false,
    desc:'Postkoloniale Theorie. Die Verdammten dieser Erde.',
    ideas:['Die Verdammten dieser Erde','Schwarze Haut, weiße Masken','Befreiung durch Gewalt'],
    influences:[{to:'Butler',type:'inspires'}]},

];

/**
 * INFLUENCE TYPES
 * student   → Lehrer-Schüler, direkte Ausbildung
 * critic    → Kritische Reaktion, Widerlegung, Streit
 * inspires  → Inspiration, Einfluss, Weiterdenken
 * develops  → Direkte Weiterentwicklung des Ansatzes
 */
const INFLUENCE_COLORS = {
  student:  '#5b80e8',   // blau
  critic:   '#e8527a',   // rot/pink
  inspires: '#22c55e',   // grün
  develops: '#a78bfa',   // lila
};

/**
 * TIER THRESHOLDS (zoomLevel)
 * tier 1: always visible (zoom ≥ 0.5)
 * tier 2: zoom ≥ 1.0   (default)
 * tier 3: zoom ≥ 1.8
 * tier 4: zoom ≥ 2.8
 */
const TIER_THRESHOLDS = { 1: 0.5, 2: 1.0, 3: 1.8, 4: 2.8 };

/**
 * EPOCH METADATA — for filter buttons
 */
const EPOCHS_META_V2 = [
  { name:'Vorsokratik',        color:'#6c63ff' },
  { name:'Sophistik',          color:'#e88040' },
  { name:'Klassisch',          color:'#f7971e' },
  { name:'Kynismus',           color:'#c87020' },
  { name:'Hellenismus',        color:'#43e97b' },
  { name:'Pragmatismus',       color:'#20a060' },
  { name:'Spätantike',         color:'#ff6584' },
  { name:'Frühes MA',          color:'#98d8d8' },
  { name:'Islamisch',          color:'#60c060' },
  { name:'Scholastik',         color:'#88c8c8' },
  { name:'Mystik',             color:'#d090f0' },
  { name:'Renaissance',        color:'#f85888' },
  { name:'Rationalismus',      color:'#e85878' },
  { name:'Empirismus',         color:'#50b080' },
  { name:'Aufklärung',         color:'#ffd166' },
  { name:'Dt. Idealismus',     color:'#c8a020' },
  { name:'19. Jh.',            color:'#c06040' },
  { name:'Lebensphilosophie',  color:'#e09040' },
  { name:'Strukturalismus',    color:'#e060a0' },
  { name:'Phänomenologie',     color:'#5b80e8' },
  { name:'Analytisch',         color:'#67e8f9' },
  { name:'Existenz.',          color:'#fb923c' },
  { name:'Krit. Theorie',      color:'#9050c0' },
  { name:'Wissenschaftsphilo.',color:'#60b0a0' },
  { name:'Hermeneutik',        color:'#e08030' },
  { name:'Politische Philo.',  color:'#30b060' },
  { name:'Poststrukturalismus',color:'#f472b6' },
  { name:'Neopragmatismus',    color:'#20a050' },
  { name:'Gegenwart',          color:'#4ade80' },
];
