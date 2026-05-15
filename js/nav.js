/**
 * nav.js — Router, Theme, Language, Nav builder
 * Loads page HTML from pages/ folder into #page-root
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
    drawMB(); if (sortArr?.length) drawSort(sortArr); drawFourier();
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

      const dd = document.createElement('div');
      dd.className = 'nav-dropdown';

      item.items.forEach(it => {
        if (it.divider) {
          const d = document.createElement('div');
          d.className = 'nav-dropdown-divider';
          dd.appendChild(d);
          return;
        }
        const di = document.createElement('div');
        di.className = 'nav-dropdown-item';
        di.innerHTML = `<span class="icon">${it.icon}</span>${it.label}`;
        di.onclick = () => showPage(it.id);
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
  // Find group
  NAV_STRUCTURE.forEach(g => {
    if (g.type !== 'group') return;
    if (g.items.some(it => it.id === pageId)) {
      const gbtn = document.getElementById('navgrp-' + g.label);
      if (gbtn) gbtn.classList.add('group-active');
    }
  });
}

// ═══════════════════════════════════════════════
// PAGE ROUTER — loads HTML from pages/ folder
// ═══════════════════════════════════════════════
let _currentPage = null;
const _pageCache  = {};        // cache loaded page HTML
const _pageInits  = {};        // one-time init functions per page
let _pageInitDone = {};        // track which inits have run

function registerPageInit(pageId, fn) {
  _pageInits[pageId] = fn;
}

async function showPage(id) {
  if (_currentPage === id) return;
  _currentPage = id;

  const root = document.getElementById('page-root');
  if (!root) return;

  // Show loading state
  root.style.opacity = '0';

  // Load HTML (from cache or fetch)
  if (!_pageCache[id]) {
    try {
      const resp = await fetch(`pages/${id}.html`);
      if (!resp.ok) throw new Error(`pages/${id}.html not found`);
      _pageCache[id] = await resp.text();
    } catch (e) {
      root.innerHTML = `<div style="padding:4rem 3rem;color:var(--text3);font-family:var(--fm)">
        Seite <strong>${id}</strong> nicht gefunden.</div>`;
      root.style.opacity = '1';
      return;
    }
  }

  root.innerHTML = _pageCache[id];

  // Fade in
  root.style.transition = 'opacity .25s';
  setTimeout(() => { root.style.opacity = '1'; }, 20);

  updateNavActive(id);
  window.scrollTo(0, 0);

  // Run page init (once per session)
  if (_pageInits[id] && !_pageInitDone[id]) {
    _pageInitDone[id] = true;
    _pageInits[id]();
  } else if (_pageInits[id + '_always']) {
    _pageInits[id + '_always']();
  }
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(_theme);
  buildNav();

  // Build footer
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <p class="footer-txt">&copy; 2025 Alexander Schmidt</p>
      <div class="footer-links">
        <a href="https://github.com/aschmidtphil" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/alexander-schmidt" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:aschmidtphil@gmail.com">Email</a>
      </div>`;
  }

  // Load home on start
  showPage('home');
});
