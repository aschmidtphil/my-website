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
  try { if (typeof drawMB       === 'function') drawMB(); }       catch(e){}
  try { if (typeof drawFourier  === 'function') drawFourier(); }  catch(e){}
  try { if (typeof sortArr !== 'undefined' && sortArr.length) drawSort(sortArr); } catch(e){}
}

// ── Language ─────────────────────────────────────
let _lang = 'de';
const TR = {
  de: {'t-hero-tag':'Data Scientist & Philosopher','t-s1':'Jahre Erfahrung','t-s2':'Semester','t-s3':'Zertifiziert','t-s4':'Neugier','t-sk-title':'Skills & Technologien','t-pr-title':'GitHub-Projekte','t-ab-title':'Über mich'},
  en: {'t-hero-tag':'Data Scientist & Philosopher','t-s1':'Years Experience','t-s2':'Semesters','t-s3':'Certified','t-s4':'Curiosity','t-sk-title':'Skills & Technologies','t-pr-title':'GitHub Projects','t-ab-title':'About Me'},
};
function toggleLang() {
  _lang = _lang === 'de' ? 'en' : 'de';
  Object.entries(TR[_lang]).forEach(([id,v]) => { const e = document.getElementById(id); if(e) e.textContent = v; });
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
    {id:'favphil',    icon:'★', label:'Lieblingsphilosophen'},
    {id:'zitate',     icon:'❝', label:'Lieblingszitate'},
    {id:'tshirts',    icon:'👕', label:'Philosophie-Shirts'},
    {divider:true},
    {id:'philosophy', icon:'⊕', label:'Philosophen-Timeline'},
    {id:'diss',       icon:'📖', label:'Dissertation'},
    {id:'phil-eigene',icon:'◈', label:'Meine Philosophie'},
  ]},
  {type:'group', label:'Akademisches', items:[
    {id:'studium',  icon:'📋', label:'Studium'},
    {id:'buecher',  icon:'📚', label:'Bücher'},
    {id:'podcasts', icon:'🎙', label:'Podcasts'},
  ]},
  {type:'group', label:'Interessen', items:[
    {id:'gaming', icon:'🎮', label:'Gaming'},
    {id:'nature', icon:'🌿', label:'Natur'},
    {id:'math',   icon:'∑',  label:'Mathematik'},
  ]},
  {type:'direct', id:'kontakt', label:'kontakt'},
];

// ── Page inits (called every visit) ──────────────
const _pageInits = {};
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

async function showPage(id) {
  if (_busy) return;
  _busy = true;

  // Update hash URL for direct links
  const newHash = '#' + id;
  if (location.hash !== newHash) history.pushState({page:id}, '', newHash);

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
  window.scrollTo(0, 0);

  // Audio
  if (PAGE_AUDIO[id]) setTimeout(PAGE_AUDIO[id], 350);

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

function updateNavActive(id) {
  document.querySelectorAll('.nav-direct,.nav-group-btn').forEach(b => b.classList.remove('active','group-active'));
  const d = document.getElementById('navbtn-' + id);
  if (d) { d.classList.add('active'); return; }
  NAV.forEach(g => {
    if (g.type !== 'group') return;
    if ((g.items||[]).some(it => it.id === id)) {
      const gb = document.getElementById('navgrp-' + g.label);
      if (gb) gb.classList.add('group-active');
    }
  });
}

// ── Nav builder ───────────────────────────────────
function buildNav() {
  const ul = document.getElementById('nav-groups');
  if (!ul) return;
  ul.innerHTML = '';

  NAV.forEach(item => {
    const li = document.createElement('li');

    if (item.type === 'direct') {
      const b = document.createElement('button');
      b.className = 'nav-direct'; b.id = 'navbtn-' + item.id;
      b.textContent = item.label;
      b.onclick = () => showPage(item.id);
      li.appendChild(b);

    } else {
      li.className = 'nav-group';
      const btn = document.createElement('button');
      btn.className = 'nav-group-btn'; btn.id = 'navgrp-' + item.label;
      btn.innerHTML = item.label + ' <span class="arr">▾</span>';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.nav-group').forEach(g => { if (g !== li) g.classList.remove('open'); });
        li.classList.toggle('open');
      });

      const dd = document.createElement('div');
      dd.className = 'nav-dropdown';
      (item.items||[]).forEach(it => {
        if (it.divider) { dd.appendChild(Object.assign(document.createElement('div'), {className:'nav-dropdown-divider'})); return; }
        const di = document.createElement('div');
        di.className = 'nav-dropdown-item';
        di.innerHTML = `<span class="icon">${it.icon}</span>${it.label}`;
        di.onclick = () => { li.classList.remove('open'); showPage(it.id); };
        dd.appendChild(di);
      });
      li.appendChild(btn); li.appendChild(dd);
    }
    ul.appendChild(li);
  });
}

function buildFooter() {
  const f = document.getElementById('site-footer');
  if (!f) return;
  f.innerHTML = `<p class="footer-txt">&copy; 2025 Alexander Schmidt</p>
    <div class="footer-links">
      <a href="https://github.com/aschmidtphil" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com/in/alexander-schmidt" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:aschmidtphil@gmail.com">Email</a>
    </div>`;
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(_theme);
  buildNav();
  buildFooter();

  // Read hash for direct links / page reload
  const startPage = (location.hash || '#home').slice(1) || 'home';
  showPage(startPage);

  // Browser back/forward
  window.addEventListener('popstate', e => {
    const id = (e.state && e.state.page) || (location.hash||'#home').slice(1) || 'home';
    showPage(id);
  });

  // Close dropdowns outside click or Escape
  document.addEventListener('click', e => {
    if (!e.target.closest('nav')) document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
  });
});
