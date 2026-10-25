# Momente pflegen

Die Route bleibt `#nature`. Das Archiv läuft statisch auf GitHub Pages und lässt sich auch durch direktes Öffnen der `index.html` verwenden. Für `file://` wird der erzeugte Datenspiegel `js/momente-data.js` geladen. Nach Änderungen an `daten/momente.json` deshalb `python scripts/spiegel-synchronisieren.py` ausführen und den Browser neu laden. Über HTTP wird weiterhin die JSON-Quelle geladen. Alternativ im Projektordner `python -m http.server 8080` ausführen und `http://localhost:8080/#nature` öffnen.

## Neue Statusmeldung

1. Einen Ordner `assets/momente/2026-10-11-beispiel/` für **optimierte, ausdrücklich zur Veröffentlichung ausgewählte** Medien anlegen. Originale und Bildschirmaufnahmen bleiben außerhalb des öffentlichen Repositorys.
2. In `daten/momente.json` einen Eintrag im Array `statuses` ergänzen. Die Reihenfolge der Einträge ist egal: Das Datum wird absteigend sortiert. Die Reihenfolge in `items` entspricht dagegen genau der Abspielreihenfolge.
3. `python scripts/spiegel-synchronisieren.py` ausführen, im lokalen Browser prüfen; JSON, erzeugten Datenspiegel und Medien zusammen veröffentlichen. Keine manuelle Skript- oder Templateänderung erforderlich.

```json
{
  "id": "2026-10-11-beispiel",
  "title": "Eigener Titel",
  "publishedAt": "2026-10-11",
  "description": "Optionaler Beschreibungstext",
  "cover": "assets/momente/2026-10-11-beispiel/vorschau.webp",
  "coverAlt": "Beschreibung des Vorschaubilds",
  "demo": false,
  "provenance": {
    "kind": "manual",
    "mediaMatchConfidence": null,
    "sourceRecordingRef": null
  },
  "items": [
    {
      "type": "image",
      "src": "assets/momente/2026-10-11-beispiel/01.webp",
      "alt": "Beschreibung für Vorleseprogramme",
      "text": "Eigene Bildunterschrift\nWeitere Zeile",
      "duration": 6,
      "textPosition": "bottom",
      "fit": "contain"
    },
    {
      "type": "video",
      "src": "assets/momente/2026-10-11-beispiel/02.mp4",
      "textPosition": "overlay",
      "fit": "contain"
    }
  ]
}
```

Pflichtfelder einer Meldung: eindeutige `id`, `title`, `publishedAt` (ISO-Datum), `cover`, nichtleeres `items`. Pflichtfelder eines Elements: `type` (`image` oder `video`), `src`. Medienpfade müssen lokal unter `assets/momente/` liegen; einfache Dateinamen ohne Leerzeichen verwenden. Das Beispiel nennt Platzhalterpfade, die vor Verwendung durch vorhandene Dateien ersetzt werden müssen.

Optionale Elementfelder: `text`, `alt`, `location` (bewusst gewählter öffentlicher Ortsname), `date` (ISO-Datum), `duration` (Bilddauer in Sekunden, Standard 6), `textPosition` (historische Angabe `bottom` oder `overlay`; der Viewer zeigt Texte inzwischen immer außerhalb des Mediums), `fit` (`contain` oder ausdrücklich `cover`), `objectPosition` (z. B. `center` oder `50% 30%`). Videos laufen bis zum Ende. Die Demo-Meldungen lassen sich vollständig löschen; auch ein leeres `statuses`-Array ist erlaubt.

## Medienaufbereitung

`whatsapp_status_import.ipynb` führt lokal von der Bildschirmaufnahme über OCR, Originalsuche und manuelle Prüfung zum Webexport. Installation, absoluter `BASE_DIR` und alle Stellschrauben sind im Notebook erklärt. Der vollständige Importcode ist eingebettet; seine gemeinsame Quelle ist `scripts/whatsapp_import.py`. Nach Änderungen daran `python scripts/notebook-erzeugen.py` ausführen. Das Layout mit Installation, Konfiguration und kommentierten Arbeitsschritten orientiert sich am vorhandenen Desktop-Bildnotebook.

- Bilder: WebP oder JPEG, längste Kante etwa 1600–1920 Pixel, Qualität etwa 80–85. Kein erzwungener Zuschnitt. Kleine Vorschau separat exportieren (etwa 720 Pixel).
- Videos: vorzugsweise MP4 mit H.264/AAC, etwa 720p–1080p, browsergeeigneter Pixelform `yuv420p` und `faststart`. Metadaten entfernen. Die technische Demo verwendet WebM (VP8/Opus).
- Beispiel bei installiertem FFmpeg: `ffmpeg -i ORIGINAL.mp4 -map_metadata -1 -vf "scale=1080:1080:force_original_aspect_ratio=decrease:force_divisible_by=2" -c:v libx264 -crf 24 -pix_fmt yuv420p -c:a aac -movflags +faststart WEB.mp4`.
- Originale nicht in `src` eintragen. Metadaten auch in Exportdateien prüfen. Der Viewer liest keine GPS- oder Personenmetadaten, aber eingebettete Metadaten öffentlich hochgeladener Dateien wären weiterhin zugänglich.

## Späterer Import

`schemaVersion: 1` versieht das Dokument mit einer Formatversion. Sowohl Meldungen als auch Elemente dürfen `provenance` besitzen: `kind` (`manual`, `reconstructed`, `demo`), `mediaMatchConfidence` (0–1 oder `null` bei unbekannt), `sourceRecordingRef` (anonyme Referenz oder `null`), optional `sourceTimeRange` mit `startSeconds`/`endSeconds` und `reviewed` (Boolean). Dadurch kann jedes rekonstruierte Element separat zugeordnet und geprüft werden.

Diese Felder werden nicht angezeigt, sind im öffentlichen JSON aber lesbar. Nur anonyme Referenzen aufnehmen, keine lokalen Pfade, Namen von Kontakten, GPS oder privaten Aufnahme-URLs. Private Herkunftsinformationen gehören in ein separates lokales Importmanifest. Der Notebook-Import legt Prüflisten und Sicherungen unter `outputs/status-import/` an; der wiederverwendbare SQLite-/Bild-/Merkmalscache liegt unter `outputs/status-import-cache/`. Automatische Treffer bleiben Vorschläge, bis alle Elemente bestätigt sind. Die Suche nutzt Datum/Medientyp, perceptual hashing, ORB/LSH und geometrische Gegenprüfung; Videos werden zunächst anhand von fünf Frames verglichen.

Die vorhandene `.gitignore` ignoriert `*.ipynb`; sie wurde unverändert gelassen. Das Notebook liegt lokal vor und ist im Liefer-ZIP enthalten. Private Ausgaben und Cache gehören nicht in die Website-Veröffentlichung. Die üblichen GitHub-Pages-Dateien benötigen weiterhin weder Python noch einen Serverprozess.

## Originalpfade und Texte für weitere Veröffentlichungen

`python scripts/status-listen-exportieren.py` erzeugt unter `outputs/status-listen/` für jeden rekonstruierten Status eine Textdatei mit Reihenfolge, vollständigen Originalpfaden und unveränderten Bildunterschriften. `ALLE-STATUS.txt` fasst alles zusammen; JSON-Dateien enthalten dieselben Zuordnungen zur maschinellen Weiterverarbeitung. Die Exportscripte aktualisieren diese Listen automatisch. Grundlage sind die geprüften Manifeste in `scripts/fixtures/` und das aktive Archiv; alle Originalpfade und Texte werden dabei abgeglichen. Die Listen sind persönliche Arbeitshilfen und werden als separates ZIP geliefert.

## Bedienung und Prüfung

Auf Fenstern ab 1100 × 600 Pixeln steht der Text in einer eigenen Lesespalte rechts neben dem Medium, vertikal mittig. Die Schrift wächst bis 26,4 Pixel auf WQHD. Kleinere Fenster zeigen den Text darunter; auf flachen Querformatfenstern ab 600 Pixel Breite steht er daneben. Lange Texte bleiben scrollbar. Die Textfläche wird auch ohne Text reserviert: Medien und Pfeile behalten dadurch bei jedem Wechsel dieselbe Geometrie. Unterschiedliche Seitenverhältnisse werden unverzerrt und ohne zusätzlichen Zuschnitt eingepasst. Stellschrauben: `.momente-content` und `.momente-caption` in `css/momente.css`; Telefonregeln am Ende von `index.html`. `node scripts/test-momente-layout.cjs` prüft sechs Fenstergrößen einschließlich WQHD.

Smartphone-Optimierung vom 25. Oktober: Unter 900 Pixel Breite sind Bildunterschriften 18–21 Pixel groß und erhalten 35 % des Inhaltsbereichs. Der Textkasten wächst nur bis zur benötigten Höhe; die reservierte Zeile hält die Bildfläche dennoch konstant. Für Touch-Telefone mit einem verkleinerten Desktop-Layoutviewport greift zusätzlich ein eigener, ausschließlich auf den Viewer begrenzter Block am Ende von `index.html`. Er skaliert Schrift, Touchflächen und Musikmenü relativ zur Viewportbreite. So bleiben sie auch bei einem 980-Pixel-Layoutviewport auf einem tatsächlich schmalen Smartphone lesbar. Die Browser-Viewport-Einstellung und andere Unterseiten werden nicht verändert. `node scripts/test-momente-smartphone.cjs` prüft echte Touch-/Mobile-Kontexte mit Geräte-Pixeldichte 2, 320/360/390 Pixel Gerätebreite, kurze/lange/leere Texte, Video, Musikmenü und eine verkleinerte 980-Pixel-Ansicht. Zusätzlich vergleicht er die Desktop-Geometrie mit der veröffentlichten Vorgängerversion. Der optionale erste Parameter wählt einen anderen Website-Ordner, etwa `.tmp-momente/release-push`.

## Hintergrundmusik ergänzen und bedienen

Die zentrale Songliste ist **`js/momente-songs.js`**. MP3-Dateien unter **`assets/audio/momente/`** ablegen und je Song einen Eintrag ergänzen, zum Beispiel:

```js
window.MOMENTE_SONGS = [
  { title: 'Mein erster Song', src: 'assets/audio/momente/mein-erster-song.mp3' },
  { title: 'Mein zweiter Song', src: 'assets/audio/momente/mein-zweiter-song.mp3' }
];
```

Dateinamen ohne Leerzeichen und Umlaute verwenden. Die Liste funktioniert direkt mit `file://` und mit relativen GitHub-Pages-Pfaden; ein weiterer Datenspiegel ist nicht erforderlich. Enthalten sind die beiden bereitgestellten Suno-MP3s **Magic Groove** (`magic-groove.mp3`) und **Buoyant Groove** (`buoyant-groove.mp3`). Es sind unveränderte Kopien mit webgeeigneten Dateinamen; die ursprünglichen MP3-/WAV-Dateien bleiben unberührt. Der frühere Platzhalter wird nicht mehr verwendet und gehört nicht zur Veröffentlichung. Bei nur einem Song sind Songwahl und Vor-/Zurückschalter deaktiviert; weitere Einträge aktivieren sie automatisch.

Die Galerie enthält keinen Musikplayer. Im geöffneten Viewer steht unten rechts eine kleine Musiknote. Sie öffnet und schließt ein schwebendes Bedienfeld; Medienfläche, Textbereich und Navigationspfeile behalten dabei dieselbe Größe und Position. Das Menü ist anfangs geschlossen und die Musik deaktiviert. Öffnen allein lädt keine MP3 und startet keine Musik. „Musik abspielen“ oder eine bewusste Songwahl starten die Wiedergabe. „Musik pausieren“ hält die Position fest, „Ausschalten“ beendet die Wiedergabe und gibt die Audioquelle frei. Das Bedienfeld enthält Songliste, Vor/Zurück, Lautstärke (anfangs 30 %), Stummschaltung und optionale automatische Fortsetzung. Einklappen unterbricht aktive Musik nicht. Escape klappt zunächst das Musikmenü ein; ein weiterer Druck schließt den Viewer. Songwahl, Lautstärke, Stummschaltung und automatische Fortsetzung bleiben innerhalb der Sitzung erhalten, werden aber nicht dauerhaft gespeichert. Die automatische Fortsetzung läuft am Listenende wieder zum ersten Stück; bei nur einem Stück wiederholt sie dieses. Ohne diese Option endet die Wiedergabe am Songende. Externe Musikdienste werden nicht angesprochen.

Eine einzige Audioinstanz in `js/momente.js` verwaltet den ausdrücklichen Wiedergabewunsch getrennt von vorübergehenden Unterbrechungen. Laufender Videoton hat Vorrang: Musik pausiert schon vor dem Videostart bzw. dem Einschalten des Videotons. Pausiert oder endet das Video, wird es stummgeschaltet oder folgt darauf ein Foto, läuft zuvor aktive Musik an derselben Position weiter. Eine manuelle Musikpause oder „Ausschalten“ verhindert das automatische Fortsetzen. Ein stummes Video darf neben Musik laufen. Die Videoton-Einstellung bleibt beim Wechsel zwischen Meldungen erhalten. Beim Wechsel des Browser-Tabs pausiert die Musik; beim Zurückkehren darf sie entsprechend dem vorherigen Nutzerwunsch fortsetzen. Der Viewer bleibt nach einem Tabwechsel pausiert. Schließen des Viewers pausiert die Musik; erneutes Öffnen einer Meldung startet sie nicht automatisch. Song und Wiedergabeposition bleiben für bewusstes Fortsetzen erhalten. Beim Verlassen der Momente-Seite werden beide Medien gestoppt und die Audioquelle freigegeben; die Navigation ruft dafür `window.stopMomente()` auf.

Fehlende Audiodateien zeigen einen Fehler im Player und stoppen den Wiedergabewunsch. Songwahl und erneutes Abspielen bleiben möglich. Bedienelemente funktionieren per Tastatur; Pfeiltasten in Songwahl und Lautstärkeregler wechseln keine Slides. Leertaste auf einem Button aktiviert dessen eigene Funktion.

`node scripts/test-momente-musik.cjs` prüft echte MP3-/Videowiedergabe, gegenseitigen Tonvorrang, Videoende, schnelle Wechsel, manuelle Pause, Playlist, Fehlerfälle, Tastatur, feste Medienflächen in sechs Fenstergrößen und die vorhandenen Seitenrouten. Der Test nutzt kurzzeitig zwei zusätzliche Einträge derselben MP3 sowie eine absichtlich fehlende Datei, ohne die veröffentlichte Songliste zu verändern. `node scripts/test-momente-projektpfad.cjs` prüft die tatsächlichen Archivmedien unter dem GitHub-Pages-Unterverzeichnis. Geräte-/Browsergrenzen bleiben: Die automatische Wiederaufnahme kann insbesondere auf Mobilgeräten vom Browser blockiert werden; dann muss erneut bewusst abgespielt werden. Hörqualität und Lautstärke sind von Alexander auf seinen Geräten zu prüfen.

Pfeiltasten, Klick links/rechts oder horizontales Wischen wechseln Elemente. Leertaste und Pauseknopf pausieren beziehungsweise setzen fort; Escape schließt zunächst ein offenes Musikmenü, danach den Viewer. Die kompakte Leiste unmittelbar unter dem Inhaltsbereich zeigt Pause/Fortsetzen mit Tooltip und Accessibility-Label sowie einen Tonknopf ausschließlich bei Videos. Der Pauseknopf steuert bei Bildern die automatische Statusfolge. Die Leiste reserviert stets 44 Pixel Höhe, damit ihre wechselnden Funktionen das Layout nicht verschieben. Native Video-Bedienelemente werden nicht zusätzlich eingeblendet, weil Pause und Ton bereits hier vorhanden sind. Browser können Wiedergabe verweigern; dann zeigt der Knopf das Play-Symbol und ein bewusster Klick startet erneut. Bei reduzierter Bewegung beginnt der Viewer pausiert. Seitenwechsel und Schließen stoppen das Video; der Fokus kehrt zur Kachel zurück. Am Ende geht es zur nächsten, älteren Meldung, am Archivende zur Galerie. Ein Wechsel in einen anderen Browser-Tab pausiert.

Windows stellt Länderflaggen häufig nur als Regionalcode dar, etwa `JP` statt der Japan-Flagge. Der Momente-Viewer ersetzt deshalb `🇯🇵` bei der Anzeige durch eine lokal mit CSS gezeichnete Flagge. Der zugrunde liegende Text und kopierte Inhalt bleiben unverändert; es wird kein Emoji-Dienst geladen. Weitere Länderflaggen benötigen eine entsprechende lokale Klasse und Zuordnung in `js/momente.js` und `css/momente.css`.

`index.html` bleibt Quelle für Templates, Navigation und die bisherigen Inline-Skripte. `python scripts/spiegel-synchronisieren.py` erzeugt `pages/*.html` sowie `js/data.js`, `js/nav.js`, `js/pages.js` und den JSON-Spiegel `js/momente-data.js`. Die Dateien `js/momente.js`, `css/momente.css` und `daten/momente.json` sind eigenständig. Telefonregeln stehen im letzten Stilblock der `index.html`.

Browserprüfung: `npm.cmd install --no-save --package-lock=false --prefix .tmp-momente playwright`, danach `node scripts/test-momente.cjs`. Der Test nutzt das lokal installierte Chrome, erstellt nur bei fehlender Datei den synthetischen Demo-Testclip und speichert Screenshots in `.tmp-momente/`. Dieser temporäre Ordner gehört nicht in die Veröffentlichung. Die `.gitignore` wurde nicht geändert.
