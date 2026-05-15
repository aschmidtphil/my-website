/**
 * nav.js — Router, Theme, Language, Nav builder
 * Works with file:// (no server needed) via embedded <template> tags
 * AND with http:// server via fetch() for the multi-file structure
 */

'use strict';

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
let _theme = localStorage.getItem('as-theme') || 'light';

function applyTheme(t) {
  _theme = t;
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.innerHTML = t === 'light' ? '&#127769;' : '&#9728;&#65039;';
  localStorage.setItem('as-theme', t);
}

function toggleTheme() {
  applyTheme(_theme === 'light' ? 'dark' : 'light');
  if (typeof drawMB === 'function' && _mathInited) {
    drawMB(); if (typeof sortArr !== 'undefined' && sortArr.length) drawSort(sortArr); drawFourier();
  }
}

// ═══════════════════════════════════════════════
// LANGUAGE
// ═══════════════════════════════════════════════
let _lang = 'de';

const TR = {
  de: {
    't-hero-tag': 'Data Scientist & Philosopher',
    't-s1': 'Jahre Erfahrung', 't-s2': 'Semester',
    't-s3': 'Zertifiziert',    't-s4': 'Neugier',
    't-sk-title': 'Skills & Technologien',
    't-pr-title': 'GitHub-Projekte',
    't-ab-title': 'Über mich',
  },
  en: {
    't-hero-tag': 'Data Scientist & Philosopher',
    't-s1': 'Years Experience', 't-s2': 'Semesters',
    't-s3': 'Certified',        't-s4': 'Curiosity',
    't-sk-title': 'Skills & Technologies',
    't-pr-title': 'GitHub Projects',
    't-ab-title': 'About Me',
  },
};

function toggleLang() {
  _lang = _lang === 'de' ? 'en' : 'de';
  Object.entries(TR[_lang]).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
}

// ═══════════════════════════════════════════════
// NAV STRUCTURE
// ═══════════════════════════════════════════════
const NAV_STRUCTURE = [
  { type: 'direct', id: 'home', label: 'home' },
  {
    type: 'group', label: 'Philosophie', items: [
      { id: 'favphil',    icon: '★', label: 'Lieblingsphilosophen' },
      { id: 'zitate',     icon: '❝', label: 'Lieblingszitate' },
      { id: 'tshirts',    icon: '👕', label: 'Philosophie-Shirts' },
      { divider: true },
      { id: 'philosophy', icon: '⊕', label: 'Philosophen-Timeline' },
      { id: 'diss',       icon: '📖', label: 'Dissertation' },
      { id: 'phil-eigene',icon: '◈', label: 'Meine Philosophie' },
    ],
  },
  {
    type: 'group', label: 'Akademisches', items: [
      { id: 'studium',  icon: '📋', label: 'Studium' },
      { id: 'buecher',  icon: '📚', label: 'Bücher' },
      { id: 'podcasts', icon: '🎙', label: 'Podcasts' },
    ],
  },
  {
    type: 'group', label: 'Interessen', items: [
      { id: 'gaming', icon: '🎮', label: 'Gaming' },
      { id: 'nature', icon: '🌿', label: 'Natur' },
      { id: 'math',   icon: '∑',  label: 'Mathematik' },
    ],
  },
  { type: 'direct', id: 'kontakt', label: 'kontakt' },
];

function buildNav() {
  const ul = document.getElementById('nav-groups');
  if (!ul) return;
  ul.innerHTML = '';

  NAV_STRUCTURE.forEach(item => {
    const li = document.createElement('li');

    if (item.type === 'direct') {
      const b = document.createElement('button');
      b.className = 'nav-direct';
      b.id = 'navbtn-' + item.id;
      b.textContent = item.label;
      b.onclick = () => showPage(item.id);
      if (item.id === 'home') b.classList.add('active');
      li.appendChild(b);
    } else {
      li.className = 'nav-group';
      const btn = document.createElement('button');
      btn.className = 'nav-group-btn';
      btn.id = 'navgrp-' + item.label;
      btn.innerHTML = item.label + ' <span class="arr">▾</span>';
      // Click toggles open class (for mobile / when hover not reliable)
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = li.classList.toggle('open');
        // Close other groups
        document.querySelectorAll('.nav-group').forEach(g => { if (g !== li) g.classList.remove('open'); });
      });

      const dd = document.createElement('div');
      dd.className = 'nav-dropdown';
      item.items.forEach(it => {
        if (it.divider) {
          dd.appendChild(Object.assign(document.createElement('div'), { className: 'nav-dropdown-divider' }));
          return;
        }
        const di = document.createElement('div');
        di.className = 'nav-dropdown-item';
        di.innerHTML = `<span class="icon">${it.icon}</span>${it.label}`;
        di.onclick = () => {
          li.classList.remove('open');
          // Hey Listen! when navigating to podcasts
          if (it.id === 'podcasts') {
            setTimeout(() => {
              try { const a = new Audio('assets/audio/hey_listen.mp3'); a.volume = 0.7; a.play().catch(()=>{}); } catch(e) {}
            }, 350);
          }
          showPage(it.id);
        };
        dd.appendChild(di);
      });
      li.appendChild(btn);
      li.appendChild(dd);
    }
    ul.appendChild(li);
  });
}

function updateNavActive(pageId) {
  document.querySelectorAll('.nav-direct, .nav-group-btn').forEach(b => {
    b.classList.remove('active', 'group-active');
  });
  const direct = document.getElementById('navbtn-' + pageId);
  if (direct) { direct.classList.add('active'); return; }
  NAV_STRUCTURE.forEach(g => {
    if (g.type !== 'group') return;
    if (g.items.some(it => it.id === pageId)) {
      const gbtn = document.getElementById('navgrp-' + g.label);
      if (gbtn) gbtn.classList.add('group-active');
    }
  });
}

// ═══════════════════════════════════════════════
// PAGE ROUTER
// Supports two modes:
//   1. file:// — reads from embedded <template id="page-xxx"> tags
//   2. http:// — fetches from pages/xxx.html (server required)
// ═══════════════════════════════════════════════
let _currentPage = null;
const _pageCache  = {};
const _pageInits  = {};
const _pageInitDone = {};

function registerPageInit(pageId, fn) {
  _pageInits[pageId] = fn;
}

function getPageFromTemplate(id) {
  const tmpl = document.getElementById('page-' + id);
  if (tmpl && tmpl.content) {
    // <template> element
    const div = document.createElement('div');
    div.appendChild(tmpl.content.cloneNode(true));
    return div.innerHTML;
  }
  if (tmpl) return tmpl.innerHTML;
  return null;
}

async function showPage(id) {
  if (_currentPage === id) return;
  _currentPage = id;

  const root = document.getElementById('page-root');
  if (!root) return;

  root.style.opacity = '0';

  // Try cache first
  if (!_pageCache[id]) {
    // Try embedded template (works with file://)
    const tplContent = getPageFromTemplate(id);
    if (tplContent !== null) {
      _pageCache[id] = tplContent;
    } else {
      // Try fetch (works with http://)
      try {
        const resp = await fetch('pages/' + id + '.html');
        if (resp.ok) {
          _pageCache[id] = await resp.text();
        } else {
          throw new Error('Not found');
        }
      } catch(e) {
        root.innerHTML = '<div style="padding:4rem 3rem;color:var(--text2);font-family:var(--fm)">'
          + '<h2 style="font-family:var(--fh);color:var(--text);margin-bottom:1rem">Seite nicht gefunden</h2>'
          + '<p style="margin-bottom:1rem">Die Seite <code style="background:var(--surface);padding:.2rem .4rem;border-radius:4px">' + id + '</code> konnte nicht geladen werden.</p>'
          + '<p style="color:var(--text3);font-size:.85rem">Wenn du die Datei direkt im Browser öffnest (file://), '
          + 'starte stattdessen einen lokalen Server:<br><br>'
          + '<code style="background:var(--surface);padding:.5rem 1rem;border-radius:6px;display:inline-block;margin-top:.5rem">'
          + 'python3 -m http.server 8080</code><br><br>'
          + 'und öffne dann <a href="http://localhost:8080" style="color:var(--accent)">http://localhost:8080</a></p>'
          + '</div>';
        root.style.opacity = '1';
        updateNavActive(id);
        return;
      }
    }
  }

  root.innerHTML = _pageCache[id];
  root.style.transition = 'opacity .22s';
  setTimeout(() => { root.style.opacity = '1'; }, 15);

  updateNavActive(id);
  window.scrollTo(0, 0);

  if (_pageInits[id] && !_pageInitDone[id]) {
    _pageInitDone[id] = true;
    _pageInits[id]();
  }
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(_theme);
  buildNav();

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = '<p class="footer-txt">&copy; 2025 Alexander Schmidt</p>'
      + '<div class="footer-links">'
      + '<a href="https://github.com/aschmidtphil" target="_blank" rel="noopener">GitHub</a>'
      + '<a href="https://linkedin.com/in/alexander-schmidt" target="_blank" rel="noopener">LinkedIn</a>'
      + '<a href="mailto:aschmidtphil@gmail.com">Email</a>'
      + '</div>';
  }

  showPage('home');

  // Close dropdowns when clicking outside nav
  document.addEventListener('click', e => {
    if (!e.target.closest('nav')) {
      document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
    }
  });
  // Close dropdown after page loads on mobile
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
  });
});
