/**
 * nav.js — Router · Theme · Language · Nav
 *
 * Fixes:
 *  1. Hash-based URLs (#home, #philosophy …) → direct links work on GitHub Pages
 *  2. Pages re-render every visit → content never disappears on fast tab switching
 *  3. <script> tags inside loaded HTML are properly re-executed
 *  4. Single DOMContentLoaded — no conflict with pages.js
 *  5. Dropdown: hover + click-toggle + Escape closes
 *  6. Audio easter eggs: hey_listen.mp3 on Podcasts nav click
 */
'use strict';

// ── Theme ────────────────────────────────────────
let _theme = localStorage.getItem('as-theme') || 'light';

function applyTheme(t) {
  _theme = t;
  document.documentElement.setAttribute('data-theme', t);
  const b = document.getElementById('theme-btn');
  if (b) b.innerHTML = t === 'light' ? '&#127769;' : '&#9728;&#65039;';
  localStorage.setItem('as-theme', t);
}
function toggleTheme() {
  applyTheme(_theme === 'light' ? 'dark' : 'light');
}

// ── Style / Theme System ─────────────────────
// style = 'standard' | 'neon-noir'
// theme = 'light' | 'dark'
// They are independent: neon-noir has its own light/dark

let _style = localStorage.getItem('as-style') || 'standard';

function applyStyle(style) {
  _style = style;
  localStorage.setItem('as-style', style);
  // neon-noir.css scopes all alt rules under html[data-style="neon-noir"]
  var altStyles = ['neon-noir','brutalist','elegant','terminal','glass'];
  if (altStyles.indexOf(style) >= 0) {
    document.documentElement.setAttribute('data-style', style);
  } else {
    document.documentElement.removeAttribute('data-style');
  }
  updateStyleBtn();
  if (style === 'neon-noir') {
    setTimeout(function(){ if (typeof patchHeroCanvas === 'function') patchHeroCanvas(); }, 80);
  }
}

function updateStyleBtn() {
  const btn = document.getElementById('style-btn');
  if (!btn) return;
  const labels = { 'standard': '◐', 'neon-noir': '✦', 'brutalist': '▪' };
  btn.textContent = labels[_style] || '◐';
  btn.title = _style === 'standard' ? 'Style: Standard' : 'Style: Neon Noir';
}

function openStylePicker() {
  var picker = document.getElementById('_style_picker');
  if (picker) { picker.remove(); return; }

  picker = document.createElement('div');
  picker.id = '_style_picker';
  picker.style.cssText = 'position:fixed;top:64px;right:1rem;'
    + 'background:var(--card);border:1px solid var(--border2);border-radius:12px;'
    + 'box-shadow:0 8px 32px rgba(0,0,0,.28);z-index:9000;overflow:hidden;min-width:192px;'
    + 'backdrop-filter:blur(16px);';

  // Helper: create a clickable row
  function makeRow(icon, label, desc, isActive, onClick) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:.65rem;padding:.65rem 1rem;cursor:pointer;'
      + 'font-family:var(--fm);font-size:.78rem;color:var(--text2);transition:background .15s;';
    var iconEl = document.createElement('span');
    iconEl.style.cssText = 'font-size:1rem;width:20px;text-align:center;flex-shrink:0;';
    iconEl.textContent = icon;
    var textEl = document.createElement('div');
    textEl.style.flex = '1';
    var labelEl = document.createElement('div');
    labelEl.style.cssText = 'font-weight:600;color:var(--text);';
    labelEl.textContent = label;
    textEl.appendChild(labelEl);
    if (desc) {
      var descEl = document.createElement('div');
      descEl.style.cssText = 'font-size:.68rem;color:var(--text3);';
      descEl.textContent = desc;
      textEl.appendChild(descEl);
    }
    row.appendChild(iconEl);
    row.appendChild(textEl);
    if (isActive) {
      var check = document.createElement('span');
      check.style.cssText = 'margin-left:auto;color:var(--accent-text);font-weight:700;';
      check.textContent = '✓';
      row.appendChild(check);
    }
    row.addEventListener('mouseenter', function() { row.style.background = 'var(--surface)'; });
    row.addEventListener('mouseleave', function() { row.style.background = ''; });
    row.addEventListener('click', function(e) { e.stopPropagation(); onClick(); picker.remove(); });
    return row;
  }

  function makeLabel(txt) {
    var el = document.createElement('div');
    el.style.cssText = 'padding:.6rem 1rem .3rem;font-family:var(--fm);font-size:.65rem;'
      + 'color:var(--text3);letter-spacing:.1em;text-transform:uppercase;';
    el.textContent = txt;
    return el;
  }

  function makeDivider() {
    var el = document.createElement('div');
    el.style.cssText = 'height:1px;background:var(--border);margin:.3rem 0;';
    return el;
  }

  picker.appendChild(makeLabel('Design'));
  picker.appendChild(makeRow('◻', 'Standard',    'Hell & aufgeräumt',     _style === 'standard',   function() { applyStyle('standard'); }));
  picker.appendChild(makeRow('✦', 'Neon Noir',   'Dunkel & dramatisch',   _style === 'neon-noir',  function() { applyStyle('neon-noir'); }));
  picker.appendChild(makeRow('▪', 'Brutalist',   'Scharf & editorial',    _style === 'brutalist',  function() { applyStyle('brutalist'); }));
  picker.appendChild(makeRow('✿', 'Elegant',     'Crème, Gold, Kunst',    _style === 'elegant',    function() { applyStyle('elegant'); }));
  picker.appendChild(makeRow('▶', 'Terminal',    '80er Retro-Monitor',    _style === 'terminal',   function() { applyStyle('terminal'); }));
  picker.appendChild(makeRow('◈', 'Glassmorphism','Tiefes Violett, Blur', _style === 'glass',      function() { applyStyle('glass'); }));
  picker.appendChild(makeDivider());
  picker.appendChild(makeLabel('Modus'));
  picker.appendChild(makeRow('☀️', 'Hell',   '', _theme === 'light', function() { applyTheme('light'); }));
  picker.appendChild(makeRow('🌙', 'Dunkel', '', _theme === 'dark',  function() { applyTheme('dark'); }));

  var footer = document.createElement('div');
  footer.style.cssText = 'padding:.5rem 1rem .75rem;font-family:var(--fm);font-size:.64rem;color:var(--text3);';
  footer.textContent = 'Klick außen zum Schließen';
  picker.appendChild(footer);

  document.body.appendChild(picker);

  // Close on outside click
  setTimeout(function() {
    function close(e) {
      if (!e.target.closest('#_style_picker') && !e.target.closest('#style-btn')) {
        picker.remove();
        document.removeEventListener('click', close);
      }
    }
    document.addEventListener('click', close);
  }, 50);
}



// ── Audio easter eggs ─────────────────────────────
function playAudio(file, toastTxt) {
  try { const a = new Audio('assets/audio/' + file); a.volume = 0.72; a.play().catch(()=>{}); } catch(e) {}
  const toast = document.getElementById('_as_toast') || createToast();
  toast.textContent = '🔊 ' + toastTxt;
  toast.style.cssText += 'transform:translateY(0);opacity:1;';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.transform = 'translateY(80px)'; toast.style.opacity = '0'; }, 3500);
}
function createToast() {
  const t = document.createElement('div');
  t.id = '_as_toast';
  t.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:var(--card);border:1px solid var(--border2);'
    + 'border-radius:12px;padding:.75rem 1.25rem;box-shadow:0 8px 32px rgba(0,0,0,.2);font-family:var(--fm);'
    + 'font-size:.78rem;color:var(--text2);z-index:9999;pointer-events:none;'
    + 'transform:translateY(80px);opacity:0;transition:all .35s cubic-bezier(.34,1.56,.64,1);';
  document.body.appendChild(t);
  return t;
}
const PAGE_AUDIO = {
  podcasts: () => playAudio('hey_listen.mp3', 'Hey, listen!'),
};

// ── Nav structure ─────────────────────────────────
const NAV = [
  {type:'direct', id:'home', label:'home'},
  {type:'group',  label:'Philosophie', items:[
    {id:'favphil',    icon:'⭐', label:'Lieblingsphilosophen'},
    {id:'zitate',     icon:'💬', label:'Lieblingszitate'},
    {id:'unendlichkeit', icon:'🌌', label:'Unendlichkeit'},
    {divider:true},
    {id:'philosophy', icon:'⏳', label:'Philosophen-Timeline'},
    {id:'philosophy', sub:['karte'], icon:'🌍', label:'Weltkarte der Denker'},
    {id:'goetter',    icon:'🔱', label:'Götterkosmos'},
    {id:'diss',       icon:'📖', label:'Dissertation'},
    {id:'phil-eigene',icon:'🧭', label:'Meine Philosophie'},
    {id:'argumente',  icon:'⚖️', label:'Bibliothek der Argumente'},
    {id:'arbeiten',   icon:'📄', label:'Eigene Arbeiten'},
  ]},
  {type:'group', label:'Akademisches', items:[
    {id:'studium',  icon:'🎓', label:'Studium'},
    {id:'buecher',  icon:'📚', label:'Bücher'},
    {id:'podcasts', icon:'🎧', label:'Podcasts'},
  ]},
  {type:'group', label:'Interessen', items:[
    {id:'gaming', icon:'🎮', label:'Gaming'},
    {id:'chor',   icon:'🎵', label:'Chor im Loch'},
    {id:'shirts', icon:'👕', label:'Philosophen-Shirts'},
    {id:'nature', icon:'🌿', label:'Natur'},
  ]},
  {type:'group', label:'Kontakt', items:[
    {id:'kontakt',   icon:'✉️', label:'Kontakt'},
    {id:'impressum', icon:'⚖️', label:'Impressum & Recht'},
  ]},
];

// ── Page inits (called every visit) ──────────────
const _pageInits = {};
window._pageInits = _pageInits;   /* global spiegeln: Seiten-Scripts erkennen den zentralen Dispatcher */
function registerPageInit(id, fn) { _pageInits[id] = fn; }

// ── HTML cache (content only — not init state) ───
const _htmlCache = {};

async function getPageHTML(id) {
  if (_htmlCache[id]) return _htmlCache[id];

  // Try embedded <template> first (works with file://)
  const tpl = document.getElementById('page-' + id);
  if (tpl) {
    const div = document.createElement('div');
    if (tpl.content) div.appendChild(tpl.content.cloneNode(true));
    else div.innerHTML = tpl.innerHTML;
    _htmlCache[id] = div.innerHTML;
    return _htmlCache[id];
  }

  // Fall back to fetch (http://)
  try {
    const r = await fetch('pages/' + id + '.html');
    if (r.ok) { _htmlCache[id] = await r.text(); return _htmlCache[id]; }
  } catch(e) {}
  return null;
}

// ── Router ────────────────────────────────────────
let _busy = false;

/* Füllt alle <span data-zahl="…"> aus den Datenbeständen.
   Fehlt ein Bestand (Skript noch nicht geladen), bleibt der Wert im HTML
   stehen — deshalb steht dort immer ein plausibler Rückfallwert. */
function zahlenNachtragen() {
  const felder = document.querySelectorAll('[data-zahl]');
  if (!felder.length) return;
  const G = window.GODS_DATA;
  const werte = {};
  if (G && G.panthea) {
    const kosmen = Object.values(G.panthea);
    werte.kosmen = kosmen.length;
    werte.gestalten = kosmen.reduce((s, p) => s + p.gods.length, 0);
  }
  if (typeof PHILS_V2 !== 'undefined') werte.denker = PHILS_V2.length;
  if (typeof FAV_PHILS !== 'undefined' && FAV_PHILS.length) werte.favphil = FAV_PHILS.length;
  felder.forEach(el => {
    const w = werte[el.getAttribute('data-zahl')];
    if (typeof w === 'number' && w > 0) el.textContent = w;
  });
}
let _currentPage = null;
let _ersterAufbau = true;

/* Hash-Pfade: '#goetter/griechisch/eros' → { page:'goetter', sub:['griechisch','eros'] }.
   Erste Komponente = Seiten-ID, Rest = Sub-Route für die Seite (Deep-Links /
   Permalinks). Seiten ohne Sub-Route verhalten sich exakt wie bisher. */
function parseHash(h) {
  const raw = (h !== undefined ? h : (location.hash || '#home')).replace(/^#/, '');
  const seg = raw.split('/').map(s => { try { return decodeURIComponent(s); } catch(e) { return s; } })
                 .filter(Boolean);
  return { page: seg[0] || 'home', sub: seg.slice(1) };
}

async function showPage(id, sub) {
  if (_busy) return;
  /* Falls versehentlich ein voller Pfad übergeben wird ('goetter/griechisch') */
  if (id && id.indexOf('/') >= 0) { const p = parseHash('#' + id); id = p.page; sub = sub || p.sub; }
  /* GitHub-Veröffentlichung: Dissertation/Eigene Arbeiten nicht erreichbar → auf Home umleiten */
  if ((id === 'diss' || id === 'arbeiten') && document.documentElement.getAttribute('data-publish') === 'github') {
    id = 'home'; sub = null;
  }
  _busy = true;
  // Sub-Route für die Seite hinterlegen; Seiten-Handler der vorigen Seite löschen
  window._routeSub = (sub && sub.length) ? sub.slice() : [];
  window._pageSubApply = null;

  // Update hash URL for direct links
  const newHash = '#' + id + (window._routeSub.length ? '/' + window._routeSub.map(encodeURIComponent).join('/') : '');
  if (location.hash !== newHash) history.pushState({page:id}, '', newHash);
  _currentPage = id;

  const root = document.getElementById('page-root');
  if (!root) { _busy = false; return; }

  root.style.transition = 'opacity .15s';
  root.style.opacity    = '0';

  const html = await getPageHTML(id);

  if (!html) {
    root.innerHTML = `<div style="padding:4rem 3rem;font-family:var(--fm);color:var(--text2)">
      <h2 style="font-family:var(--fh);color:var(--text);margin-bottom:1rem">Seite nicht gefunden</h2>
      <p>Starte einen lokalen Server: <code style="background:var(--surface);padding:.2rem .5rem;border-radius:4px">python3 -m http.server 8080</code></p>
    </div>`;
    root.style.opacity = '1';
    _busy = false;
    return;
  }

  // Inject HTML
  root.innerHTML = html;

  // Re-execute <script> tags (innerHTML doesn't run them)
  root.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    s.textContent = old.textContent;
    old.replaceWith(s);
  });

  requestAnimationFrame(() => { root.style.opacity = '1'; });

  updateNavActive(id);
  seitenTitelSetzen(id);
  navMenueSchliessen();
  window.scrollTo(0, 0);

  /* Nach dem Wechsel den Fokus in den Inhalt legen: Vorleseprogramme
     lesen dann die neue Seite vor, und die Tabulatorfolge beginnt oben.
     Beim allerersten Aufbau nicht — dort soll der Fokus im Dokument
     bleiben, damit der Sprunglink als erstes erreichbar ist. */
  if (_ersterAufbau) { _ersterAufbau = false; }
  else { root.focus({ preventScroll: true }); }

  // Audio
  if (PAGE_AUDIO[id]) setTimeout(PAGE_AUDIO[id], 350);

  /* Zahlen aus den Daten nachtragen. Auf der Seite standen sie jahrelang fest
     im Text und lagen zuletzt um Hunderte daneben — 775 statt 866 Gestalten,
     353 statt 580 Denker. Wer künftig Daten ergänzt, muss nichts nachpflegen.
     Die Werte im HTML sind Rückfallwerte, falls das Skript nicht läuft. */
  zahlenNachtragen();

  // Run page init — EVERY time (not cached)
  if (_pageInits[id]) {
    setTimeout(() => {
      try { _pageInits[id](); } catch(e) { console.warn('init error', id, e); }
      _busy = false;
    }, 60);
  } else {
    _busy = false;
  }
}

/* ── Seitentitel ──────────────────────────────────────────────────────
   Bis hierher hieß jede der 18 Seiten im Browser-Tab „Alexander Schmidt".
   Für Lesezeichen, Verlauf und Vorleseprogramme braucht jede Seite einen
   eigenen Titel; die Beschriftungen stehen ohnehin schon in NAV. */
const SEITEN_TITEL = (() => {
  const m = { home: 'Startseite' };
  NAV.forEach(g => {
    if (g.type === 'direct') { if (!m[g.id]) m[g.id] = g.label; return; }
    (g.items || []).forEach(it => { if (it.id && !m[it.id]) m[it.id] = it.label; });
  });
  return m;
})();

function seitenTitelSetzen(id) {
  const t = SEITEN_TITEL[id];
  document.title = t && id !== 'home'
    ? t + ' — Alexander Schmidt'
    : 'Alexander Schmidt — Philosophie, Mythologie, Phänomenologie';
}

/* ── Verweise statt Schaltflächen ─────────────────────────────────────
   Die Menüpunkte sind jetzt <a href="#seite">. Beim einfachen Linksklick
   übernimmt der Router wie bisher; mit Strg/Cmd, Umschalt oder mittlerer
   Maustaste lässt der Handler den Browser gewähren — dann öffnet sich
   die Seite wirklich in einem neuen Tab oder Fenster. */
function navLinkKlick(e, id, sub) {
  if (e.defaultPrevented) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return true;
  e.preventDefault();
  navMenueSchliessen();
  showPage(id, sub || null);
  return false;
}

function navHash(id, sub) {
  return '#' + id + (sub && sub.length ? '/' + sub.map(encodeURIComponent).join('/') : '');
}

/* ── Aufklappfächer schließen ─────────────────────────────────────────
   An einer Stelle gebündelt, damit `aria-expanded` nie auseinanderläuft. */
function navGruppenZu(ausser) {
  document.querySelectorAll('.nav-group').forEach(g => {
    if (g === ausser) return;
    g.classList.remove('open');
    const b = g.querySelector('.nav-group-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
}

/* ── Menüfach für schmale Fenster ─────────────────────────────────── */
function navMenueUmschalten() {
  const n = document.querySelector('nav');
  const b = document.getElementById('nav-burger');
  if (!n || !b) return;
  const auf = !n.classList.contains('offen');
  n.classList.toggle('offen', auf);
  b.setAttribute('aria-expanded', auf ? 'true' : 'false');
  b.setAttribute('aria-label', auf ? 'Menü schließen' : 'Menü öffnen');
  if (!auf) navGruppenZu();
}

function navMenueSchliessen() {
  const n = document.querySelector('nav');
  const b = document.getElementById('nav-burger');
  if (n) n.classList.remove('offen');
  if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Menü öffnen'); }
  navGruppenZu();
}

/* Sprunglink: Fokus in den Inhalt setzen, ohne den Hash zu verändern —
   der Hash steuert hier ja die Seitenwahl. */
function navZumInhalt(e) {
  e.preventDefault();
  const r = document.getElementById('page-root');
  if (!r) return;
  r.focus({ preventScroll: true });
  r.scrollIntoView({ block: 'start' });
}

function updateNavActive(id) {
  document.querySelectorAll('.nav-direct,.nav-group-btn').forEach(b => {
    b.classList.remove('active','group-active');
    b.removeAttribute('aria-current');
  });
  const d = document.getElementById('navbtn-' + id);
  if (d) { d.classList.add('active'); d.setAttribute('aria-current','page'); return; }
  NAV.forEach(g => {
    if (g.type !== 'group') return;
    if ((g.items||[]).some(it => it.id === id)) {
      const gb = document.getElementById('navgrp-' + g.label);
      if (gb) gb.classList.add('group-active');
    }
  });
  /* Innerhalb der Gruppe den genauen Punkt auszeichnen */
  document.querySelectorAll('.nav-dropdown-item').forEach(a => {
    if (a.getAttribute('data-id') === id && !a.getAttribute('data-sub')) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
}

// ── Nav builder ───────────────────────────────────
function buildNav() {
  const ul = document.getElementById('nav-groups');
  if (!ul) return;
  ul.innerHTML = '';

  NAV.forEach((item, gi) => {
    const li = document.createElement('li');

    if (item.type === 'direct') {
      const a = document.createElement('a');
      a.className = 'nav-direct'; a.id = 'navbtn-' + item.id;
      a.href = navHash(item.id);
      a.textContent = item.label;
      a.addEventListener('click', e => navLinkKlick(e, item.id));
      li.appendChild(a);

    } else {
      li.className = 'nav-group';
      const ddId = 'navdd-' + gi;
      const btn = document.createElement('button');
      btn.className = 'nav-group-btn'; btn.id = 'navgrp-' + item.label;
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', ddId);
      btn.innerHTML = item.label + ' <span class="arr" aria-hidden="true">▾</span>';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        navGruppenZu(li);
        const auf = !li.classList.contains('open');
        li.classList.toggle('open', auf);
        btn.setAttribute('aria-expanded', auf ? 'true' : 'false');
      });

      /* Wandert der Fokus mit dem Tabulator aus der Gruppe heraus,
         klappt das Fach zu — sonst blieben mehrere offen stehen.
         relatedTarget ist das Element, das den Fokus bekommt. */
      li.addEventListener('focusout', e => {
        if (window.innerWidth <= 900) return;   /* im Mobilfach bleibt es offen */
        if (e.relatedTarget && li.contains(e.relatedTarget)) return;
        li.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });

      const dd = document.createElement('div');
      dd.className = 'nav-dropdown'; dd.id = ddId;
      const _ghPublish = document.documentElement.getAttribute('data-publish') === 'github';
      (item.items||[]).forEach(it => {
        if (it.divider) { dd.appendChild(Object.assign(document.createElement('div'), {className:'nav-dropdown-divider'})); return; }
        if (it.pubGithubHide && _ghPublish) return;   /* in der GitHub-Version verbergen */
        const a = document.createElement('a');
        a.className = 'nav-dropdown-item';
        a.href = navHash(it.id, it.sub);
        a.setAttribute('data-id', it.id);
        if (it.sub) a.setAttribute('data-sub', it.sub.join('/'));
        /* Das Emoji ist Schmuck — Vorleseprogramme sollen es überspringen */
        a.innerHTML = `<span class="icon" aria-hidden="true">${it.icon}</span>${it.label}`;
        a.addEventListener('click', e => {
          li.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          navLinkKlick(e, it.id, it.sub || null);
        });
        dd.appendChild(a);
      });
      li.appendChild(btn); li.appendChild(dd);
    }
    ul.appendChild(li);
  });
}

function buildFooter() {
  const f = document.getElementById('site-footer');
  if (!f) return;
  f.innerHTML = `<p class="footer-txt">&copy; 2026 Alexander Schmidt</p>
    <div class="footer-links">
      <a href="https://github.com/aschmidtphil" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com/in/alexander-schmidt" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:aschmidtphil@gmail.com">Email</a>
      <a href="#impressum" onclick="showPage('impressum');return false;">Impressum &amp; Recht</a>
    </div>`;
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(_theme);
  buildNav();
  buildFooter();

  // Read hash for direct links / page reload (inkl. Sub-Routen wie #goetter/griechisch/eros)
  const start = parseHash();
  applyStyle(_style);
    showPage(start.page, start.sub);

  // Browser back/forward
  window.addEventListener('popstate', () => {
    const r = parseHash();
    /* Gleiche Seite, nur Sub-Route geändert (z. B. Figur-Permalink im Götterkosmos):
       die Seite selbst übernimmt — ohne vollständigen Re-Render. */
    if (r.page === _currentPage && typeof window._pageSubApply === 'function') {
      window._routeSub = r.sub;
      try { window._pageSubApply(r.sub); } catch(e) { console.warn('sub-route error', e); }
      return;
    }
    showPage(r.page, r.sub);
  });

  // Aufklappfächer und Mobilmenü schließen: Klick daneben oder Escape
  document.addEventListener('click', e => {
    if (!e.target.closest('nav') && !e.target.closest('.skip-link')) navMenueSchliessen();
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    /* Escape gibt den Fokus an den auslösenden Knopf zurück, damit man
       nicht aus der Navigation herausfällt. */
    const off = document.querySelector('.nav-group.open');
    const imMenue = document.activeElement && document.activeElement.closest('nav');
    navMenueSchliessen();
    if (off && imMenue) { const b = off.querySelector('.nav-group-btn'); if (b) b.focus(); }
  });

  /* Wird das Fenster wieder breit, darf kein halboffenes Mobilfach
     zurückbleiben. */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) navMenueSchliessen();
  });
});


/* ═══════════════════════════════════════════════════════════════════
   Sofortsuche über die ganze Seite (Strg+K bzw. ⌘K, oder „/")

   Durchsucht in einem Feld: Seiten, die Kosmen und alle Figuren des
   Götterkosmos, die Philosophen der Timeline, Zitate, Shirts und die
   hinterlegten Dokumente. Der Index wird erst beim ersten Öffnen
   gebaut — bis dahin kostet die Suche nichts.

   Bewusst eigenständig: eigenes CSS wird zur Laufzeit eingefügt, damit
   das Modul in index.html und in den Einzelseiten unter pages/ gleich
   funktioniert, ohne dass ein Stylesheet angefasst werden muss.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var offen=false, index=null, treffer=[], wahl=0;

  function css(){
    if(document.getElementById('sk-css')) return;
    var s=document.createElement('style'); s.id='sk-css';
    s.textContent=[
'.sk-huelle{position:fixed;inset:0;z-index:9999;display:none;background:rgba(6,7,14,.62);backdrop-filter:blur(3px)}',
'.sk-huelle.auf{display:block}',
'.sk-box{position:absolute;left:50%;top:12vh;transform:translateX(-50%);width:min(680px,92vw);',
'  background:var(--bg2,#15161d);border:1px solid var(--border,#333);border-radius:14px;',
'  box-shadow:0 24px 70px rgba(0,0,0,.55);overflow:hidden}',
'.sk-kopf{display:flex;align-items:center;gap:.7rem;padding:.9rem 1.1rem;border-bottom:1px solid var(--border,#333)}',
'.sk-lupe{opacity:.5;font-size:1rem}',
'.sk-feld{flex:1;background:transparent;border:0;outline:0;color:var(--text,#eee);font-size:1.02rem;font-family:inherit}',
'.sk-feld::placeholder{color:var(--text3,#888)}',
'.sk-esc{font-family:var(--fm,monospace);font-size:.6rem;letter-spacing:.1em;color:var(--text3,#888);',
'  border:1px solid var(--border,#333);border-radius:5px;padding:.2rem .45rem}',
'.sk-liste{max-height:56vh;overflow-y:auto;padding:.4rem 0}',
'.sk-gruppe{font-family:var(--fm,monospace);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;',
'  color:var(--text3,#888);padding:.7rem 1.1rem .3rem}',
'.sk-eintrag{display:flex;align-items:center;gap:.75rem;padding:.5rem 1.1rem;cursor:pointer;border-left:2px solid transparent}',
'.sk-eintrag.aktiv{background:rgba(255,255,255,.06);border-left-color:var(--accent,#c9a227)}',
'.sk-sym{width:1.5rem;text-align:center;opacity:.75;font-size:.95rem;flex-shrink:0}',
'.sk-txt{min-width:0;flex:1}',
'.sk-t{font-size:.9rem;color:var(--text,#eee);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.sk-u{font-size:.72rem;color:var(--text3,#888);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:.1rem}',
'.sk-t b{color:var(--accent,#c9a227);font-weight:700}',
'.sk-leer{padding:1.6rem 1.1rem;text-align:center;color:var(--text3,#888);font-size:.86rem}',
'.sk-fuss{display:flex;gap:1.1rem;padding:.55rem 1.1rem;border-top:1px solid var(--border,#333);',
'  font-family:var(--fm,monospace);font-size:.6rem;color:var(--text3,#888)}',
'.sk-knopf{background:transparent;border:1px solid var(--border,#333);color:var(--text2,#bbb);',
'  border-radius:8px;padding:.3rem .6rem;cursor:pointer;font-family:var(--fm,monospace);font-size:.62rem;letter-spacing:.06em}',
'.sk-knopf:hover{border-color:var(--accent,#c9a227);color:var(--accent,#c9a227)}'
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ── Index aufbauen ─────────────────────────────────────────── */
  function bauen(){
    var e=[];
    function add(o){ o.such=(o.t+' '+(o.u||'')).toLowerCase(); e.push(o); }

    try{                                            // Seiten
      (window.NAV_GROUPS||[]).forEach(function(gr){
        (gr.items||[]).forEach(function(it){
          add({grp:'Seiten',sym:it.icon||'▸',t:it.label,u:'Seite',geh:function(){nav(it.id);}});
        });
      });
    }catch(x){}
    if(!e.length){                                  // Rückfall: Navigation aus dem DOM
      try{
        document.querySelectorAll('#nav-groups a[data-page]').forEach(function(a){
          var id=a.getAttribute('data-page');
          add({grp:'Seiten',sym:'▸',t:(a.textContent||'').trim(),u:'Seite',geh:function(){nav(id);}});
        });
      }catch(x){}
    }

    try{                                            // Götterkosmos
      var D=window.GODS_DATA;
      if(D&&D.panthea){
        Object.keys(D.panthea).forEach(function(pk){
          var P=D.panthea[pk];
          add({grp:'Kosmen',sym:'✦',t:P.label,u:(P.gods?P.gods.length+' Figuren':'Kosmos'),
               geh:function(){nav('goetter');}});
          (P.gods||[]).forEach(function(g){
            add({grp:'Figuren',sym:'◆',t:g.name,u:P.label+(g.domain?' · '+g.domain.slice(0,70):''),
                 geh:function(){ nav('goetter'); spaeter(function(){
                   if(window.gxJumpTo) window.gxJumpTo(pk,g.id); }); }});
          });
        });
      }
    }catch(x){}

    try{                                            // Philosophen
      var L=(typeof PHILS_V2!=='undefined')?PHILS_V2:(window.PHILS_V2||[]);
      L.filter(Boolean).forEach(function(p){
        var lz=(p.birth<0? Math.abs(p.birth)+' v. Chr.' : p.birth)+(p.death? '–'+p.death : '');
        add({grp:'Philosophen',sym:'✎',t:p.display||p.name,u:lz+(p.epoch? ' · '+p.epoch:''),
             geh:function(){nav('philosophy');}});
      });
    }catch(x){}

    try{                                            // Zitate
      (window.ZITATE||[]).forEach(function(z){
        add({grp:'Zitate',sym:'❝',t:z.text.slice(0,90),u:z.author+(z.kat? ' · '+z.kat:''),
             geh:function(){nav('zitate');}});
      });
    }catch(x){}

    try{                                            // Shirts
      (window.SHIRTS||[]).forEach(function(s){
        add({grp:'Shirts',sym:'👕',t:s.t,u:s.denker+' · '+s.kat,geh:function(){nav('shirts');}});
      });
    }catch(x){}

    try{                                            // Dokumente
      (window.DOCUMENTS_DATA||[]).forEach(function(d){
        add({grp:'Dokumente',sym:'📄',t:d.title||d.filename,
             u:(d.pages? d.pages+' Seiten':'')+(d.sizeMB? ' · '+d.sizeMB+' MB':''),
             geh:function(){nav('arbeiten');}});
      });
    }catch(x){}

    return e;
  }

  function nav(id){ zu(); if(typeof showPage==='function') showPage(id);
    else if(window.showPage) window.showPage(id); }
  function spaeter(fn){                              // wartet, bis die Seite bereit ist
    var n=0; (function tick(){ n++;
      try{ if(fn()!==false) return; }catch(x){}
      if(n<40) setTimeout(tick,60);
    })();
  }

  /* ── Suchen und Bewerten ────────────────────────────────────── */
  function suchen(q){
    q=(q||'').trim().toLowerCase();
    if(!q) return index.filter(function(o){return o.grp==='Seiten';}).slice(0,8);
    var out=[];
    for(var i=0;i<index.length;i++){
      var o=index[i], p=o.such.indexOf(q);
      if(p<0) continue;
      var punkte=p===0?0:(o.such[p-1]===' '?1:2);        // Wortanfang schlägt Mitte
      if(o.t.toLowerCase()===q) punkte=-1;               // exakter Titel zuerst
      out.push({o:o,s:punkte*1000+p});
    }
    out.sort(function(a,b){return a.s-b.s;});
    return out.slice(0,60).map(function(x){return x.o;});
  }

  function hervor(text,q){
    var t=String(text).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});
    if(!q) return t;
    var i=t.toLowerCase().indexOf(q.toLowerCase());
    if(i<0) return t;
    return t.slice(0,i)+'<b>'+t.slice(i,i+q.length)+'</b>'+t.slice(i+q.length);
  }

  /* ── Oberfläche ─────────────────────────────────────────────── */
  function zeichnen(q){
    var liste=document.getElementById('sk-liste'); if(!liste) return;
    treffer=suchen(q); wahl=0;
    if(!treffer.length){ liste.innerHTML='<div class="sk-leer">Nichts gefunden.</div>'; return; }
    var h='', letzte='';
    treffer.forEach(function(o,i){
      if(o.grp!==letzte){ letzte=o.grp; h+='<div class="sk-gruppe">'+o.grp+'</div>'; }
      h+='<div class="sk-eintrag'+(i===0?' aktiv':'')+'" data-i="'+i+'">'
        +'<span class="sk-sym">'+o.sym+'</span><span class="sk-txt">'
        +'<div class="sk-t">'+hervor(o.t,q)+'</div>'
        +(o.u?'<div class="sk-u">'+hervor(o.u,q)+'</div>':'')+'</span></div>';
    });
    liste.innerHTML=h;
    liste.querySelectorAll('.sk-eintrag').forEach(function(el){
      el.addEventListener('mouseenter',function(){ setzen(+el.getAttribute('data-i')); });
      el.addEventListener('click',function(){ treffer[+el.getAttribute('data-i')].geh(); });
    });
  }
  function setzen(i){
    var liste=document.getElementById('sk-liste'); if(!liste||!treffer.length) return;
    wahl=Math.max(0,Math.min(treffer.length-1,i));
    var els=liste.querySelectorAll('.sk-eintrag');
    els.forEach(function(el,j){ el.classList.toggle('aktiv',j===wahl); });
    if(els[wahl]) els[wahl].scrollIntoView({block:'nearest'});
  }

  function auf(){
    css(); bau();
    if(!index) index=bauen();
    var h=document.getElementById('sk-huelle'); if(!h) return;
    h.classList.add('auf'); offen=true;
    var f=document.getElementById('sk-feld'); f.value=''; zeichnen('');
    setTimeout(function(){ f.focus(); },30);
  }
  function zu(){
    var h=document.getElementById('sk-huelle');
    if(h) h.classList.remove('auf');
    offen=false;
  }

  function bau(){
    if(document.getElementById('sk-huelle')) return;
    var h=document.createElement('div'); h.className='sk-huelle'; h.id='sk-huelle';
    h.setAttribute('role','dialog'); h.setAttribute('aria-modal','true');
    h.setAttribute('aria-label','Sofortsuche über die ganze Seite');
    h.innerHTML=
      '<div class="sk-box">'
     +'<div class="sk-kopf"><span class="sk-lupe">⌕</span>'
     +'<input class="sk-feld" id="sk-feld" type="text" autocomplete="off" spellcheck="false"'
     +' placeholder="Figuren, Philosophen, Zitate, Shirts, Seiten …" aria-label="Suchbegriff">'
     +'<span class="sk-esc">ESC</span></div>'
     +'<div class="sk-liste" id="sk-liste"></div>'
     +'<div class="sk-fuss"><span>↑↓ wählen</span><span>⏎ öffnen</span><span>ESC schließen</span></div>'
     +'</div>';
    document.body.appendChild(h);
    h.addEventListener('click',function(e){ if(e.target===h) zu(); });
    var f=h.querySelector('#sk-feld');
    f.addEventListener('input',function(){ zeichnen(f.value); });
    f.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'){ e.preventDefault(); setzen(wahl+1); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); setzen(wahl-1); }
      else if(e.key==='Enter'){ e.preventDefault(); if(treffer[wahl]) treffer[wahl].geh(); }
      else if(e.key==='Escape'){ e.preventDefault(); zu(); }
    });
  }

  /* ── Auslöser: Tastatur und ein Knopf in der Navigation ─────── */
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if((e.ctrlKey||e.metaKey) && k==='k'){ e.preventDefault(); offen?zu():auf(); return; }
    if(k==='escape' && offen){ zu(); return; }
    if(k==='/' && !offen){
      var t=(e.target&&e.target.tagName||'').toLowerCase();
      if(t==='input'||t==='textarea'||t==='select'||(e.target&&e.target.isContentEditable)) return;
      e.preventDefault(); auf();
    }
  });
  window.skOeffnen=auf;

  function knopf(){
    var ziel=document.querySelector('.nav-right');
    if(!ziel || document.getElementById('sk-knopf')) return;
    var b=document.createElement('button');
    b.id='sk-knopf'; b.className='sk-knopf'; b.type='button';
    b.title='Suche über die ganze Seite (Strg+K)';
    b.setAttribute('aria-label','Suche über die ganze Seite öffnen');
    b.textContent='⌕ Suche';
    b.addEventListener('click',auf);
    ziel.insertBefore(b, ziel.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){css();knopf();});
  else { css(); knopf(); }
})();

