# my-website

Persönliche Website von **Alexander Schmidt** — Philosophie, Mythologie und Phänomenologie.

**→ [aschmidtphil.github.io/my-website](https://aschmidtphil.github.io/my-website/)**

---
## Features

- 🌍 Götterkosmos (775 Figuren)
- 📚 Philosophen-Timeline (353 Philosophen)
- ♾️ Unendlichkeit (Canvas-Zoom)
- 🎨 mehrere Themes
- 🌐 Deutsch / Englisch
- 🔍 Volltextsuche

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- SVG
- GitHub Pages


## Worum es geht

Eine wissenschaftliche Selbstdarstellung, die zugleich der Versuch ist, philosophische und
mythologische Zusammenhänge sichtbar statt nur beschreibbar zu machen. Die Seite ist ohne Framework
gebaut: reines HTML, CSS und JavaScript, ohne Abhängigkeiten, ohne Build-Schritt.

### Die drei größeren Stücke

**Götterkosmos** — 33 Traditionen mit 775 Gestalten, von den mesopotamischen Göttern über Shintō,
Buddhismus und die aztekische Kosmologie bis zu den Grundworten von Kant, Hegel, Heidegger und
Derrida. Fünf Ansichten: Porträts, Sternbild, ein Entsprechungs-Atlas als Sehnendiagramm, eine
logarithmische Zeitleiste und eine filter- und exportierbare Tabelle. Die 114 Entsprechungsgruppen
sind nach Art der Beziehung typisiert — Identität, Übernahme, Analogie oder Gegenstellung — und zwar
je Verbindung, nicht je Gruppe: Zeus und Jupiter sind eine Übernahme, Zeus und Thor eine Analogie,
obwohl beide in derselben Gruppe stehen.

**Philosophen-Timeline** — 353 Denker über 2500 Jahre, mit Epochen, Disziplinen, Strömungen und
einem Einflussnetz aus 357 belegten Beziehungen samt Verbindungssuche zwischen zwei Denkern.
Kulturkreise (Europa, islamische Welt, Indien, China, Africana) sind zuschaltbar.

**Unendlichkeit** — eine endlose Zoomfahrt vom Weltraum bis unter eine Milbe und zurück, in einem
Canvas gerechnet. Acht Biome, prozedurale Landschaft, Klangatmosphäre, philosophische Begleittexte.

Dazu: die eigene Philosophie in neun Kapiteln, die Dissertation zu Schelling, eigene Arbeiten,
Lieblingszitate, Studium, Bücher, Interessen.

---

## Aufbau

```
index.html          Die gesamte Seite: Templates, Stile, Skripte
pages/              Spiegel der Seiten-Templates (Einzelaufruf, Suchmaschinen)
js/                 Daten und regenerierte Skriptblöcke
  goetter-data.js     Götterkosmos: Pantheen, Entsprechungen, Motive
  data.js             Philosophen, Epochen, Studium
  nav.js, pages.js    Navigation und Seitenlogik
css/                Themes (u. a. Elegant, Brutalist, Neon-Noir, Terminal, Glass)
assets/             Bilder, Bildnachweise, Dokumente
```

**Wichtig für Änderungen:** `index.html` ist die Quelle. Alle Seiten liegen dort als
`<template id="page-…">`; die Dateien unter `pages/` und die Skripte `js/nav.js`, `js/pages.js`,
`js/data.js` werden daraus regeneriert. Wer nur `pages/` bearbeitet, sieht die Änderung nicht — der
Loader nimmt immer zuerst das Template.

---

## Bedienung

- **Strg+K** (oder `/`) öffnet die Suche über die ganze Seite — Figuren, Philosophen, Zitate, Seiten
- Mehrere Farbschemata und Sprachumschaltung oben rechts
- Die Zoomfahrt startet mit ▶ oder reagiert auf Mausrad, Ziehen und Pinch

---

## Quellen und Bilder

Alle Figuren des Götterkosmos sind quellenbelegt; die Belege stehen in jedem Kosmos unter
„Kernquellen". Bilder stammen weit überwiegend von **Wikimedia Commons** unter freien Lizenzen; die
vollständigen Nachweise mit Urheber und Lizenz finden sich im Impressum der Seite.

Wo für abstrakte Begriffe keine Bildüberlieferung existiert — etwa bei den philosophischen Kosmen —
stehen entweder Monogramme oder ausdrücklich als solche gekennzeichnete **KI-Sinnbilder**. Diese sind
keine historischen Abbildungen und im Nachweis entsprechend vermerkt.

---

## Lizenz

Der Quellcode darf frei nachgenutzt werden. **Texte, Dissertation und eigene Arbeiten** unterliegen
dem Urheberrecht des Verfassers. **Bilder** unterliegen den jeweils im Impressum genannten Lizenzen.
