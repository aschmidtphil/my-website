/**
 * pages.js — All page renderers and interactivity
 * Registers page inits with nav.js router.
 */

'use strict';

// GAMING — with cover art
// ════════════════════════════════════════════════
var gameRendered={};
var RAWG_COVERS={
  wc3:'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be3e.jpg',
  sc:'https://media.rawg.io/media/games/d58/d588e4b8a7a38d77e8e9c53a9e3e7a6e.jpg',
  diablo:'https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg',
  sotc:'https://media.rawg.io/media/screenshots/c08/c08c7d4406bef4edc65a3bafee0a3c47.jpg',
  hk:'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',
  ff:'https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg',
  sg:'https://media.rawg.io/media/games/5f2/5f2c52c1a87ded1a49e25a7b1c9dc4d4.jpg',
  pw:'https://media.rawg.io/media/games/f1a/f1a09bfad4070bbdbe5d0aad0c56d2fb.jpg',
};
var GAME_EMOJI={wc3:'⚔️',sc:'🚀',diablo:'💀',sotc:'🗿',hk:'🦋',ff:'✨',lufia:'🗡️',kknd:'💥',fc:'🤖',sg:'⏰',pw:'⚖️',mmbn:'💾',pokemon:'🔴'};

function renderGameCards(){
  Object.keys(DB).forEach(function(s){
    if(s==='podcasts'||s==='nature')return;
    if(gameRendered[s])return;
    gameRendered[s]=true;
    var grid=document.getElementById(s+'-grid');
    if(!grid)return;
    grid.innerHTML='';
    var cover=RAWG_COVERS[s];
    var emoji=GAME_EMOJI[s]||'🎮';
    (DB[s]||[]).forEach(function(item){
      var card=document.createElement('div');card.className='game-card';
      var coverHtml=cover
        ?'<div class="game-card-cover-wrap"><img class="game-card-cover" src="'+cover+'" alt="'+item.title+'" loading="lazy" onerror="this.parentElement.innerHTML=\'<div class=\\\"game-card-cover-placeholder\\\">'+emoji+'</div>\'"></div>'
        :'<div class="game-card-cover-placeholder">'+emoji+'</div>';
      card.innerHTML=coverHtml+'<div class="game-card-body">'
        +'<span class="game-badge '+item.badge+'">'+item.badgeText+'</span>'
        +'<div class="game-card-title">'+item.title+'</div>'
        +'<div class="game-card-text">'+item.text+'</div>'
        +'<div class="tags">'+item.tags.map(function(t){return '<span class="tag">'+t+'</span>';}).join('')+'</div>'
        +'</div>';
      grid.appendChild(card);
    });
  });
}

function showGTab(name,idx){
  document.querySelectorAll('.g-section').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('.gtab').forEach(function(b){b.classList.remove('active');});
  var sec=document.getElementById('gs-'+name);
  if(sec)sec.classList.add('active');
  document.querySelectorAll('.gtab')[idx].classList.add('active');
  if(name==='pokemon'&&!pokeLoaded)loadPoke();
  else renderGameCards();
}

// ════════════════════════════════════════════════
// POKÉMON
// ════════════════════════════════════════════════
var pokeLoaded=false,allPoke=[],filtPoke=[],pokeOff=0,typeCache={},BATCH=24;
async function loadPoke(){
  if(pokeLoaded)return;pokeLoaded=true;
  try{
    var r=await fetch('https://pokeapi.co/api/v2/pokemon?limit=493');
    var d=await r.json();
    allPoke=d.results.map(function(p,i){return{name:p.name,id:i+1};});
    filtPoke=allPoke.slice();renderPokeGrid();
  }catch(e){document.getElementById('poke-grid').innerHTML='<div class="poke-loading-msg">PokeAPI nicht erreichbar.</div>';}
}
function renderPokeGrid(){
  var grid=document.getElementById('poke-grid');
  if(pokeOff===0)grid.innerHTML='';
  filtPoke.slice(pokeOff,pokeOff+BATCH).forEach(function(p){grid.appendChild(makePokeCard(p));});
  pokeOff+=BATCH;
  var more=document.getElementById('poke-more');
  if(more)more.style.display=pokeOff<filtPoke.length?'block':'none';
}
function makePokeCard(p){
  var c=document.createElement('div');c.className='poke-card';
  c.innerHTML='<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+p.id+'.png" alt="'+p.name+'" loading="lazy">'
    +'<div class="poke-name">'+p.name+'</div>'
    +'<div class="poke-num">#'+String(p.id).padStart(3,'0')+'</div>'
    +'<div class="poke-types" id="pt-'+p.id+'"><span class="type-badge type-normal">?</span></div>';
  c.onclick=function(){showPokeDet(p.id);};
  loadPokeTypes(p.id);return c;
}
async function loadPokeTypes(id){
  if(typeCache[id])return;
  try{var r=await fetch('https://pokeapi.co/api/v2/pokemon/'+id);var d=await r.json();typeCache[id]=d;
  var el=document.getElementById('pt-'+id);
  if(el)el.innerHTML=d.types.map(function(t){return'<span class="type-badge type-'+t.type.name+'">'+t.type.name+'</span>';}).join('');}catch(e){}
}
async function showPokeDet(id){
  var det=document.getElementById('poke-detail');
  det.innerHTML='<div style="color:var(--text3);font-family:var(--fm);padding:1rem">Lade…</div>';
  det.classList.add('show');
  try{
    var d=typeCache[id];
    if(!d){var r=await fetch('https://pokeapi.co/api/v2/pokemon/'+id);d=await r.json();typeCache[id]=d;}
    var sc={hp:'#ff6b35',attack:'#f7c948',defense:'#5aa0e8','special-attack':'#e85878','special-defense':'#3ba844',speed:'#a890f0'};
    det.innerHTML='<img class="poke-big-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png" alt="'+d.name+'">'
      +'<div style="flex:1;min-width:200px"><div class="poke-big-name">'+d.name+'</div>'
      +'<div style="display:flex;gap:.4rem;margin-bottom:.85rem">'+d.types.map(function(t){return'<span class="type-badge type-'+t.type.name+'">'+t.type.name+'</span>';}).join('')+'</div>'
      +'<div style="display:flex;gap:1.25rem;margin-bottom:.85rem;flex-wrap:wrap">'
      +'<div><div style="font-family:var(--fm);font-size:.65rem;color:var(--text3)">HÖHE</div><div style="font-weight:500">'+d.height/10+'m</div></div>'
      +'<div><div style="font-family:var(--fm);font-size:.65rem;color:var(--text3)">GEWICHT</div><div style="font-weight:500">'+d.weight/10+'kg</div></div>'
      +'</div>'
      +d.stats.map(function(s){return'<div class="stat-bar"><span class="stat-label-sm">'+s.stat.name.replace('special-','sp.')+'</span><span class="stat-val">'+s.base_stat+'</span><div class="stat-track"><div class="stat-fill" style="width:'+Math.min(100,s.base_stat/255*100)+'%;background:'+(sc[s.stat.name]||'var(--accent)')+'"></div></div></div>';}).join('')
      +'</div>';
    det.scrollIntoView({behavior:'smooth',block:'nearest'});
  }catch(e){det.innerHTML='<div style="color:var(--accent2);padding:1rem">Fehler.</div>';}
}
function filterPoke(){
  var q=document.getElementById('poke-search').value.toLowerCase();
  var type=document.getElementById('type-filter').value;
  var gen=parseInt(document.getElementById('gen-filter').value)||0;
  filtPoke=allPoke.filter(function(p){
    if(q&&p.name.indexOf(q)<0)return false;
    if(gen){var r=[[1,151],[152,251],[252,386],[387,493]];var mm=r[gen-1];if(p.id<mm[0]||p.id>mm[1])return false;}
    if(type&&typeCache[p.id]&&typeCache[p.id].types.map(function(t){return t.type.name;}).indexOf(type)<0)return false;
    return true;
  });
  pokeOff=0;renderPokeGrid();
}
function loadMorePoke(){renderPokeGrid();}

// ════════════════════════════════════════════════
// PODCASTS
// ════════════════════════════════════════════════
var podRendered=false;
function renderPodcasts(){
  if(podRendered)return;podRendered=true;
  var grid=document.getElementById('pod-grid');
  DB.podcasts.forEach(function(p){
    var c=document.createElement('div');c.className='card pod-card';
    c.innerHTML='<div class="pod-icon" style="background:'+(p.iconBg||'#1a1a2e')+'">'+p.icon+'</div>'
      +'<div><div class="pod-name">'+p.name+'</div><div class="pod-host">'+p.host+'</div>'
      +'<div class="pod-desc">'+p.desc+'</div>'
      +'<div class="tags">'+p.tags.map(function(t){return'<span class="tag">'+t+'</span>';}).join('')+'</div></div>';
    grid.appendChild(c);
  });
}

// ════════════════════════════════════════════════
// NATUR — categories
// ════════════════════════════════════════════════
var natureRendered=false;
var NATURE_CATS={
  'Eigene Fotos':{desc:'Persönliche Aufnahmen — festgehaltene Momente.',items:[
    {src:'assets/images/Natur/20250921_191313.webp',srcAvif:'assets/images/Natur/20250921_191313.avif',location:'September 2025',title:'Herbstlicht',desc:'Ein stiller Moment — Licht und Schatten kurz vor dem Abend.'},
    {src:'assets/images/Natur/20250921_191315.webp',srcAvif:'assets/images/Natur/20250921_191315.avif',location:'September 2025',title:'Weite',desc:'Der Blick öffnet sich — Raum zum Atmen, Raum zum Denken.'},
  ]},
  'Meer & Küste':{desc:'Wasser, Horizont und das Gefühl der Weite.',items:[
    {emoji:'🌊',bg:'linear-gradient(135deg,#0a4a6e,#1a8ab0)',location:'Nordsee',title:'Ebbe bei Sonnenuntergang',desc:'Wenn das Watt sich entblößt und der Horizont in Orange taucht.'},
  ]},
  'Wald & Gebirge':{desc:'Ruhe und Größe in der terrestrischen Natur.',items:[
    {emoji:'🏔️',bg:'linear-gradient(135deg,#2d4a1e,#4a8030)',location:'Alpen, Österreich',title:'Morgennebel im Hochgebirge',desc:'Vor dem Aufstieg liegt die Welt noch unter Wolken.'},
    {emoji:'🌲',bg:'linear-gradient(135deg,#1a3020,#2a5530)',location:'Schwarzwald',title:'Lichtstrahlen im alten Wald',desc:'Eine Kathedrale aus Licht und Grün.'},
  ]},
  'Nacht & Kosmos':{desc:'Dunkelheit als Bedingung des Lichts.',items:[
    {emoji:'🌌',bg:'linear-gradient(135deg,#050510,#0a0a2a)',location:'Eifel, Deutschland',title:'Sternenhimmel',desc:'Hier draußen wird klar, wie weit das Universum reicht.'},
  ]},
};
var activeCat='Eigene Fotos';
function renderNature(){
  var nav=document.getElementById('nature-cat-nav');
  if(!nav)return;
  if(!nav.children.length){
    Object.keys(NATURE_CATS).forEach(function(cat){
      var b=document.createElement('button');
      b.className='nature-cat-btn'+(cat===activeCat?' active':'');
      b.textContent=cat;
      b.onclick=function(){
        activeCat=cat;
        document.querySelectorAll('.nature-cat-btn').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        renderNatureCat();
      };
      nav.appendChild(b);
    });
  }
  renderNatureCat();
}
function renderNatureCat(){
  var lbl=document.getElementById('nature-cat-label');
  var grid=document.getElementById('nature-grid');
  var data=NATURE_CATS[activeCat];
  if(lbl)lbl.innerHTML='<h3>'+activeCat+'</h3><p>'+data.desc+'</p>';
  grid.innerHTML='';
  data.items.forEach(function(n){
    var card=document.createElement('div');card.className='nature-card';
    var imgHtml=n.src
      ?'<div style="overflow:hidden;border-radius:14px 14px 0 0;line-height:0"><picture>'
        +(n.srcAvif?'<source srcset="'+n.srcAvif+'" type="image/avif">':'')
        +'<source srcset="'+n.src+'" type="image/webp">'
        +'<img class="nature-card-img" src="'+n.src+'" alt="'+n.title+'" loading="lazy"></picture></div>'
      :'<div class="nature-img-area" style="background:'+(n.bg||'#111')+'"><span style="font-size:3.5rem">'+(n.emoji||'')+'</span></div>';
    card.innerHTML=imgHtml
      +'<div class="nature-img-info"><div class="nature-loc">📍 '+n.location+'</div>'
      +'<div class="nature-title">'+n.title+'</div><div class="nature-desc">'+n.desc+'</div></div>';
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════
// PHILOSOPHEN TIMELINE — with zoom
// ════════════════════════════════════════════════
var philBuilt=false;
var philZoomLevel=1;
var philBaseW=3600;
var philActiveEpoch='';
var philSearchTerm='';

function buildPhil(){
  if(philBuilt)return;philBuilt=true;
  // Epoch buttons
  var btns=document.getElementById('epoch-btns');
  btns.innerHTML='<button class="epoch-btn active" onclick="philFilterEpoch(\'\',this)">Alle</button>';
  EPOCHS_META.forEach(function(e){
    var b=document.createElement('button');b.className='epoch-btn';
    b.style.borderColor=e.color+'55';
    b.innerHTML='<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:'+e.color+';margin-right:4px;vertical-align:middle"></span>'+e.name;
    b.onclick=function(){philFilterEpoch(e.name,this);};
    btns.appendChild(b);
  });
  renderTimeline();
  // Drag to scroll
  var sc=document.getElementById('tl-scroll');
  var isDown=false,sX,sL;
  sc.addEventListener('mousedown',function(e){isDown=true;sX=e.pageX-sc.offsetLeft;sL=sc.scrollLeft;});
  sc.addEventListener('mouseleave',function(){isDown=false;});
  sc.addEventListener('mouseup',function(){isDown=false;});
  sc.addEventListener('mousemove',function(e){if(!isDown)return;e.preventDefault();sc.scrollLeft=sL-(e.pageX-sc.offsetLeft-sX);});
}

function renderTimeline(){
  var W=philBaseW*philZoomLevel;
  var AY=240;
  var inner=document.getElementById('tl-inner');
  inner.innerHTML='<div class="tl-axis"></div>';
  inner.style.width=W+'px';
  inner.style.height='480px';
  // Year marks
  var years=[-600,-400,-200,0,200,400,600,800,1000,1200,1400,1500,1600,1700,1750,1800,1850,1900,1925,1950,1975,2000,2025];
  years.forEach(function(y){
    var pct=(y+700)/2800;
    var x=pct*W;
    var lbl=document.createElement('div');
    lbl.className='tl-yr'+(Math.abs(y)%400===0?' tl-yr-major':'');
    lbl.style.left=x+'px';
    lbl.textContent=y<0?Math.abs(y)+' v.Chr.':y===0?'0':y+'';
    inner.appendChild(lbl);
    // tick
    var tick=document.createElement('div');
    tick.style.cssText='position:absolute;left:'+x+'px;top:'+(AY+2)+'px;width:1px;height:'+(Math.abs(y)%400===0?10:6)+'px;background:rgba(128,128,128,'+(Math.abs(y)%400===0?.35:.2)+')';
    inner.appendChild(tick);
  });
  // Philosopher nodes
  PHILS_DATA.forEach(function(p,i){
    var px=p.x*W;
    var node=document.createElement('div');
    node.className='tl-node';
    node.setAttribute('data-epoch',p.epoch);
    node.setAttribute('data-name',p.name.toLowerCase());
    var LH=60;
    var above=p.above;
    var dotTop=AY-5;
    var lineTop=above?AY-LH:AY+2;
    var cardTop=above?AY-LH-80:AY+LH+2;
    node.style.cssText='left:'+px+'px;top:0;position:absolute;';
    node.innerHTML='<div class="tl-dot" style="background:'+p.color+';top:'+dotTop+'px;"></div>'
      +'<div class="tl-line" style="top:'+lineTop+'px;height:'+LH+'px;"></div>'
      +'<div class="tl-card" style="top:'+cardTop+'px;">'
      +'<div class="tl-card-name" style="color:'+p.color+'">'+p.name+'</div>'
      +'<div class="tl-card-dates">'+(p.birth<0?Math.abs(p.birth)+' v.Chr.':p.birth)+'–'+(p.death===0?'heute':(p.death<0?Math.abs(p.death)+' v.Chr.':p.death))+'</div>'
      +'<div class="tl-card-dates" style="margin-top:2px;opacity:.7">'+p.epoch+'</div>'
      +'</div>';
    node.onclick=function(){openPhilModal(p);};
    inner.appendChild(node);
  });
  applyPhilFilters();
}

function philZoom(factor){
  philZoomLevel=Math.max(0.5,Math.min(4,philZoomLevel*factor));
  var sc=document.getElementById('tl-scroll');
  var ratio=sc.scrollLeft/sc.scrollWidth;
  renderTimeline();
  sc.scrollLeft=ratio*sc.scrollWidth;
}
function philZoomReset(){philZoomLevel=1;renderTimeline();}

function philFilterEpoch(ep,btn){
  philActiveEpoch=ep;
  document.querySelectorAll('.epoch-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  applyPhilFilters();
}
function filterPhilSearch(){
  philSearchTerm=document.getElementById('phil-search').value.toLowerCase();
  applyPhilFilters();
}
function applyPhilFilters(){
  document.querySelectorAll('.tl-node').forEach(function(n){
    var epochMatch=!philActiveEpoch||n.getAttribute('data-epoch')===philActiveEpoch;
    var nameMatch=!philSearchTerm||n.getAttribute('data-name').indexOf(philSearchTerm)>=0;
    n.style.opacity=(epochMatch&&nameMatch)?'1':'0.1';
    n.style.pointerEvents=(epochMatch&&nameMatch)?'auto':'none';
  });
}

function openPhilModal(p){
  document.getElementById('m-epoch').innerHTML='<span style="color:'+p.color+'">'+p.epoch+'</span>';
  document.getElementById('m-name').textContent=p.name;
  document.getElementById('m-dates').textContent=(p.birth<0?Math.abs(p.birth)+' v. Chr.':p.birth)+' – '+(p.death===0?'heute':(p.death<0?Math.abs(p.death)+' v. Chr.':p.death));
  document.getElementById('m-desc').textContent=p.desc;
  document.getElementById('m-ideas').innerHTML=p.ideas.map(function(i){return'<li>'+i+'</li>';}).join('');
  document.getElementById('phil-modal').classList.add('open');
}

// ════════════════════════════════════════════════
// LIEBLINGSPHILOSOPHEN
// ════════════════════════════════════════════════
var FAVPHILS=[
  {name:'Platon',era:'Klassische Antike',dates:'428–348 v. Chr.',color:'#f7971e',
   quote:'Die untersuchte Leben ist nicht wert, gelebt zu werden.',
   desc:'Platons Ideenlehre ist der erste systematische Versuch, das Verhältnis von Erscheinung und Wirklichkeit zu durchdenken. Die unsterbliche Seele, die sich an die Ideen erinnert — Anamnesis als Erkenntnistheorie.',
   ideas:['Ideenlehre: Wirklichkeit hinter dem Sichtbaren','Das Höhlengleichnis als Erkenntnisweg','Eros als Streben nach dem Guten'],
   why:'Platon hat die philosophischen Fragen gestellt, die mich bis heute beschäftigen: Was ist wirklich? Was ist das Gute? Wie kann endliches Denken das Unendliche berühren?'},
  {name:'Aristoteles',era:'Klassische Antike',dates:'384–322 v. Chr.',color:'#e87820',
   quote:'Der Mensch ist von Natur ein politisches Wesen.',
   desc:'Aristoteles verkörpert das Ideal des systematischen Denkens: Logik, Ethik, Naturphilosophie, Poetik — alles aus einem Guss. Seine Tugendethik ist bis heute aktuell.',
   ideas:['Eudaimonia: Glück als tätige Entfaltung','Hylomorphismus: Form und Materie','Meson: Die goldene Mitte als ethisches Prinzip'],
   why:'Aristoteles lehrt das Denken im Konkreten. Nicht abstrakte Ideen, sondern die Form in der Materie — das hat mein philosophisches Denken geerdet.'},
  {name:'Plotin',era:'Neuplatonismus',dates:'204–270 n. Chr.',color:'#ff6584',
   quote:'Das Schöne ist das Glänzen der ewigen Ideen durch die Materie.',
   desc:'Plotins Drei-Hypostasen-Lehre (Das Eine – Nous – Seele) und die Emanationslehre sind philosophisch und theologisch gleichermaßen bedeutsam. Das Eine jenseits jeder Bestimmung.',
   ideas:['Das Eine: jenseits aller Prädikate','Emanation: Aus dem Einen strömt alles aus','Rückkehr (epistrophé) als Lebensaufgabe'],
   why:'Plotin hat mein Denken über Transzendenz und Immanenz geprägt. Die Frage nach dem Einen, das jenseits des Seins liegt, ist für mich eine der tiefsten philosophischen Fragen überhaupt.'},
  {name:'Meister Eckhart',era:'Deutsche Mystik',dates:'1260–1328',color:'#d090f0',
   quote:'Das Schweigen ist nichts anderes als die Abwesenheit aller Bilder.',
   desc:'Eckhart verband scholastische Präzision mit mystischer Tiefe. Die Gottesgeburt in der Seele — Gott gebiert sich selbst im Seelenfünklein. Sprache an der Grenze des Sagbaren.',
   ideas:['Gottesgeburt in der Seele','Abgeschiedenheit als höchste Tugend','Das Seelenfünklein als göttlicher Kern'],
   why:'Eckhart ist der Philosoph der radikalen Innerlichkeit. Sein Denken bewegt sich genau an der Grenze zwischen Ontologie und Mystik — genau dort, wo auch mein philosophisches Interesse liegt.'},
  {name:'Kant',era:'Aufklärung / Dt. Idealismus',dates:'1724–1804',color:'#e8c040',
   quote:'Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie allgemeines Gesetz werde.',
   desc:'Kants Kopernikanische Wende hat die Philosophie neu ausgerichtet. Das Subjekt konstituiert die Erkenntnis — nicht umgekehrt. Die Grenzen der Vernunft sind zugleich ihre Bedingungen.',
   ideas:['Kategorischer Imperativ','Das Ding an sich bleibt unerkennbar','Kritik als philosophische Grundhaltung'],
   why:'Ohne Kant ist moderne Philosophie nicht zu verstehen. Das Heine-Zitat, das mein Dissertationsmotto ist, zeigt das perfekt: Kant als der große Zerstörer — und doch der Ermöglicher.'},
  {name:'Schelling',era:'Deutscher Idealismus',dates:'1775–1854',color:'#c8a020',
   quote:'Die Natur soll der sichtbare Geist, der Geist die unsichtbare Natur sein.',
   desc:'Schellings Werk ist das umfangreichste des Deutschen Idealismus. Die Weltalterphilosophie, die Freiheitsschrift, die Naturphilosophie — ein Denken in ständiger Bewegung.',
   ideas:['Identitätsphilosophie: Natur und Geist sind eins','Weltalterphilosophie: Geschichte des Absoluten','Freiheitsschrift: Das Böse als Möglichkeit der Freiheit'],
   why:'Schelling ist der Hauptgegenstand meiner Dissertation. Seine Weltalterphilosophie ist für mich das aufregendste Fragment der Philosophiegeschichte — ein System, das bewusst offen bleibt.'},
  {name:'Heidegger',era:'Phänomenologie',dates:'1889–1976',color:'#5b80e8',
   quote:'Das Dasein ist ein Seiendes, dem es in seinem Sein um dieses Sein selbst geht.',
   desc:'Sein und Zeit hat die Frage nach dem Sein als die grundlegende Frage der Philosophie neu gestellt. Das Dasein als In-der-Welt-sein, Sein-zum-Tode, Angst als Grundstimmung.',
   ideas:['Sein und Zeit: Die Seinsfrage','Dasein als Sorgestruktur','Das Gestell als Wesen der modernen Technik'],
   why:'Heidegger hat meinen Blick auf die Zeitlichkeit grundlegend verändert. Die Analyse des Daseins als Sein-zum-Tode ist für meine Philosophie der radikalen Endlichkeit unverzichtbar.'},
  {name:'Levinas',era:'Phänomenologie',dates:'1906–1995',color:'#4060c8',
   quote:'Das Antlitz öffnet die ursprünglichste Sprache.',
   desc:'Levinas hat gegen Heidegger die Ethik als erste Philosophie gesetzt. Das Antlitz des Anderen als ethisches Ur-Phänomen — vor aller Ontologie steht die Verantwortung.',
   ideas:['Das Antlitz des Anderen als ethischer Anspruch','Ethik als erste Philosophie (vor der Ontologie)','Jenseits des Seins: Anders als Sein geschieht'],
   why:'Levinas hat mein philosophisches Denken geöffnet für das, was die Ontologie übersteigt. Die Begegnung mit dem Anderen als das Ereignis, das der eigenen Existenz Kontur gibt.'},
];

function renderFavPhil(){
  var grid=document.getElementById('favphil-grid');
  if(!grid||grid.children.length)return;
  FAVPHILS.forEach(function(p){
    var card=document.createElement('div');card.className='favphil-card';
    card.innerHTML='<div class="favphil-header" style="background:linear-gradient(135deg,'+p.color+'18,'+p.color+'08)">'
      +'<div class="favphil-era" style="color:'+p.color+'">'+p.era+'</div>'
      +'<div class="favphil-name" style="color:'+p.color.replace(/[0-9a-f]{2}$/,'')+'">'+p.name+'</div>'
      +'<div class="favphil-dates">'+p.dates+'</div>'
      +'</div>'
      +'<div class="favphil-body">'
      +'<div class="favphil-quote">&bdquo;'+p.quote+'&ldquo;</div>'
      +'<div class="favphil-desc">'+p.desc+'</div>'
      +'<ul class="favphil-ideas">'+p.ideas.map(function(i){return'<li>'+i+'</li>';}).join('')+'</ul>'
      +'<div class="favphil-why"><div class="favphil-why-label">// WARUM DIESER DENKER</div>'
      +'<div class="favphil-why-text">'+p.why+'</div></div>'
      +'</div>';
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════
// ZITATE
// ════════════════════════════════════════════════
var ZITATE=[
  {text:'Wenn aber Immanuel Kant, dieser große Zerstörer im Reiche der Gedanken, an Terrorismus den Maximilian Robespierre weit übertraf, so hat er doch mit diesem manche Ähnlichkeiten [...] Und sie gaben das richtige Gewicht!',
   author:'Heinrich Heine',source:'Zur Geschichte der Religion und Philosophie in Deutschland, 1834',kat:'Motto',large:true},
  {text:'Das Antlitz öffnet die ursprünglichste Sprache. Das Antlitz ist Bedeutung für sich allein.',
   author:'Emmanuel Levinas',source:'Totalität und Unendlichkeit',kat:'Phänomenologie'},
  {text:'Seid still und erkennet, daß ich Gott bin.',
   author:'Meister Eckhart',source:'Predigt über Ps. 46,11',kat:'Mystik'},
  {text:'Die Zeit ist kein äußerer Rahmen, in dem Dinge geschehen, sondern die innere Möglichkeit des Geschehens selbst.',
   author:'Alexander Schmidt',source:'Schellings Zeittheorie, 2024',kat:'Eigenes'},
  {text:'Alles fließt — panta rhei. Man kann nicht zweimal in denselben Fluss steigen.',
   author:'Heraklit',source:'Fragment (bei Platon)',kat:'Antike'},
  {text:'Die untersuchte Leben ist nicht wert, gelebt zu werden.',
   author:'Sokrates',source:'Platons Apologie',kat:'Antike'},
  {text:'Dieu pèse la pensée de Kant — et il donne le juste poids.',
   author:'Heinrich Heine',source:'Umschreibung',kat:'Motto'},
  {text:'Das Dasein ist ein Seiendes, dem es in seinem Sein um dieses Sein selbst geht.',
   author:'Martin Heidegger',source:'Sein und Zeit, §4',kat:'Phänomenologie'},
  {text:'Endlichkeit ist nicht das Gegenteil von Unendlichkeit, sondern ihre innere Bedingung.',
   author:'Alexander Schmidt',source:'Philosophie der radikalen Endlichkeit',kat:'Eigenes'},
  {text:'Das Böse ist nicht ein Prinzip für sich, sondern nur ein Mißverhältnis des Eigenlebens zur Identität des Lichts- und Dunkelprinzips.',
   author:'F. W. J. Schelling',source:'Philosophische Untersuchungen über das Wesen der menschlichen Freiheit, 1809',kat:'Schelling'},
  {text:'Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie allgemeines Gesetz werde.',
   author:'Immanuel Kant',source:'Grundlegung zur Metaphysik der Sitten',kat:'Kant'},
  {text:'Gott ist tot. Gott bleibt tot. Und wir haben ihn getötet.',
   author:'Friedrich Nietzsche',source:'Die fröhliche Wissenschaft, §125',kat:'Nietzsche'},
  {text:'Die Natur soll der sichtbare Geist, der Geist die unsichtbare Natur sein.',
   author:'F. W. J. Schelling',source:'Ideen zu einer Philosophie der Natur',kat:'Schelling'},
  {text:'Man muss sich Sisyphus als glücklich vorstellen.',
   author:'Albert Camus',source:'Der Mythos des Sisyphus',kat:'Existenz'},
  {text:'Daten sind endlich: Sie sind Schnitte durch eine Wirklichkeit, die sie nie vollständig erfassen können.',
   author:'Alexander Schmidt',source:'Persönliche Notiz',kat:'Eigenes'},
  {text:'Das Schweigen ist nichts anderes als die Abwesenheit aller Bilder.',
   author:'Meister Eckhart',source:'Deutsche Predigten',kat:'Mystik'},
  {text:'Cogito ergo sum.',
   author:'René Descartes',source:'Discours de la méthode, 1637',kat:'Rationalismus'},
  {text:'Worüber man nicht sprechen kann, darüber muss man schweigen.',
   author:'Ludwig Wittgenstein',source:'Tractatus Logico-Philosophicus, 7',kat:'Analytisch'},
  {text:'Es gibt kein richtiges Leben im falschen.',
   author:'Theodor W. Adorno',source:'Minima Moralia',kat:'Kritische Theorie'},
  {text:'In data we trust — but only if we understand its limits.',
   author:'Alexander Schmidt',source:'Data Science Notiz',kat:'Eigenes'},
];
var activeZKat='Alle';
function renderZitate(){
  var filter=document.getElementById('zitat-filter');
  if(filter&&!filter.children.length){
    var kats=['Alle'].concat([...new Set(ZITATE.map(function(z){return z.kat;}))]);
    kats.forEach(function(k){
      var b=document.createElement('button');
      b.className='zf-btn'+(k==='Alle'?' active':'');
      b.textContent=k;
      b.onclick=function(){
        activeZKat=k;
        document.querySelectorAll('.zf-btn').forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        renderZitatGrid();
      };
      filter.appendChild(b);
    });
  }
  renderZitatGrid();
}
function renderZitatGrid(){
  var grid=document.getElementById('zitat-grid');if(!grid)return;
  grid.innerHTML='';
  var f=activeZKat==='Alle'?ZITATE:ZITATE.filter(function(z){return z.kat===activeZKat;});
  f.forEach(function(z){
    var card=document.createElement('div');card.className='zitat-card';
    card.innerHTML='<div class="zitat-text'+(z.large?' large':'')+'">'+z.text+'</div>'
      +'<div class="zitat-author">'+z.author+'</div>'
      +(z.source?'<div class="zitat-source">'+z.source+'</div>':'')
      +'<span class="zitat-kat">'+z.kat+'</span>';
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════
// T-SHIRTS
// ════════════════════════════════════════════════
var TSHIRTS=[
  {name:'Kant — Der Zerstörer',sub:'Immanuel Kant',color:'#e8c040',emoji:'⚖️',
   desc:'Das Heine-Motiv: Kant als Robespierre des Geistes. Das Shirt, das mein Dissertations-Motto trägt.'},
  {name:'Sokrates — I Know Nothing',sub:'Sokrates / Platon',color:'#f7971e',emoji:'🏺',
   desc:'Das bekannteste Philosophie-Zitat überhaupt — und das ehrlichste. Sokrates als Verkörperung intellektueller Demut.'},
  {name:'Nietzsche — Gott ist tot',sub:'Friedrich Nietzsche',color:'#fb923c',emoji:'⚡',
   desc:'Die provokanteste Diagnose der Moderne. Nietzsche als Kulturepidemiologe.'},
  {name:'Heidegger — Sein und Zeit',sub:'Martin Heidegger',color:'#5b80e8',emoji:'⏳',
   desc:'Die Seinsfrage als Grundfrage. Ein Shirt für alle, die sich im ontologischen Unterschied bewegen.'},
  {name:'Schelling — Das Eine und das Andere',sub:'F. W. J. Schelling',color:'#c8a020',emoji:'∞',
   desc:'Schellings Weltalter: Das Absolute als das, was sich selbst erzählt. Mein persönlichstes Philosophen-Shirt.'},
  {name:'Platon — Das Höhlengleichnis',sub:'Platon',color:'#f7971e',emoji:'🔦',
   desc:'Alle sitzen wir in der Höhle und halten Schatten für die Wirklichkeit. Das älteste Erkenntnistheorie-Motiv.'},
  {name:'Aristoteles — Eudaimonia',sub:'Aristoteles',color:'#e87820',emoji:'🌿',
   desc:'Das gute Leben als tätige Entfaltung der eigenen Anlagen. Aristoteles als Lebenshilfephilosoph avant la lettre.'},
  {name:'Meister Eckhart — Abgeschiedenheit',sub:'Meister Eckhart',color:'#d090f0',emoji:'🕯️',
   desc:'Die höchste Tugend ist Abgeschiedenheit — leerer Geist als Bedingung der Gottesgeburt.'},
  {name:'Levinas — Das Antlitz',sub:'Emmanuel Levinas',color:'#4060c8',emoji:'👁️',
   desc:'Das Antlitz des Anderen als ethisches Ur-Phänomen. Du-Ethik vor aller Ontologie.'},
  {name:'Wittgenstein — Whereof one cannot speak',sub:'Ludwig Wittgenstein',color:'#67e8f9',emoji:'🔇',
   desc:'Der letzte Satz des Tractatus als vollständige Philosophie in einem Satz.'},
];
function renderTshirts(){
  var grid=document.getElementById('tshirt-grid');
  if(!grid||grid.children.length)return;
  TSHIRTS.forEach(function(t){
    var card=document.createElement('div');card.className='tshirt-card';
    var bg='linear-gradient(135deg,'+t.color+'22,'+t.color+'08)';
    card.innerHTML='<div class="tshirt-visual" style="background:'+bg+'">'
      +'<span style="font-size:4rem">'+t.emoji+'</span>'
      +'<span style="position:absolute;bottom:10px;left:0;right:0;text-align:center;font-family:var(--fm);font-size:.68rem;color:'+t.color+';letter-spacing:.1em">thephilosophersshirt.com</span>'
      +'</div>'
      +'<div class="tshirt-body">'
      +'<div class="tshirt-name">'+t.name+'</div>'
      +'<div class="tshirt-sub" style="color:'+t.color+'">'+t.sub+'</div>'
      +'<div class="tshirt-desc">'+t.desc+'</div>'
      +'</div>';
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════
// MATHEMATIK
// ════════════════════════════════════════════════
var mathInited=false;
function initMath(){
  if(!mathInited){mathInited=true;setTimeout(function(){drawMB();initSort();drawFourier();},120);}
}
function showMTab(name,idx){
  document.querySelectorAll('.m-section').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('.mtab').forEach(function(b){b.classList.remove('active');});
  document.getElementById('ms-'+name).classList.add('active');
  document.querySelectorAll('.mtab')[idx].classList.add('active');
  if(name==='sort')initSort();if(name==='fourier')drawFourier();if(name==='mandelbrot')drawMB();
}
var mbV={x:-2.5,y:-1.25,w:3.5,h:2.5};
function drawMB(){
  var c=document.getElementById('mb-canvas');if(!c)return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height,mi=parseInt(document.getElementById('mb-iter').value);
  var vl=document.getElementById('mb-val');if(vl)vl.textContent=mi;
  var img=ctx.createImageData(W,H);
  for(var px=0;px<W;px++)for(var py=0;py<H;py++){
    var x0=mbV.x+px/W*mbV.w,y0=mbV.y+py/H*mbV.h,x=0,y=0,i=0;
    while(x*x+y*y<=4&&i<mi){var xt=x*x-y*y+x0;y=2*x*y+y0;x=xt;i++;}
    var idx=(py*W+px)*4;
    if(i===mi){img.data[idx]=10;img.data[idx+1]=10;img.data[idx+2]=20;img.data[idx+3]=255;}
    else{var t=i/mi;img.data[idx]=Math.floor(9*(1-t)*t*t*t*255);img.data[idx+1]=Math.floor(15*Math.pow(1-t,2)*t*t*255);img.data[idx+2]=Math.floor(8.5*Math.pow(1-t,3)*t*255);img.data[idx+3]=255;}
  }
  ctx.putImageData(img,0,0);
}
function resetMB(){mbV={x:-2.5,y:-1.25,w:3.5,h:2.5};drawMB();}
document.addEventListener('click',function(e){
  var c=document.getElementById('mb-canvas');if(!c||e.target!==c)return;
  var r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  var cx=mbV.x+px*mbV.w,cy=mbV.y+py*mbV.h;
  mbV.w*=0.4;mbV.h*=0.4;mbV.x=cx-mbV.w/2;mbV.y=cy-mbV.h/2;drawMB();
});
var sortArr=[],sortRunning=false;
function initSort(){
  sortRunning=false;
  var n=parseInt((document.getElementById('sort-size')||{value:60}).value);
  sortArr=Array.from({length:n},function(){return Math.floor(Math.random()*300)+20;});
  drawSort(sortArr);
}
function drawSort(arr,h1,h2){
  h1=h1==null?-1:h1;h2=h2==null?-1:h2;
  var c=document.getElementById('sort-canvas');if(!c)return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height;
  var dark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.fillStyle=dark?'#111118':'#f0f0f8';ctx.fillRect(0,0,W,H);
  var bw=Math.max(1,(W-20)/arr.length-1);
  arr.forEach(function(v,i){
    ctx.fillStyle=i===h1?'#e8527a':i===h2?'#22c55e':'#5b52e8';
    ctx.fillRect(10+i*(bw+1),H-v-5,bw,v);
  });
}
async function runSort(){
  if(sortRunning)return;sortRunning=true;
  var algo=document.getElementById('sort-algo').value,arr=sortArr.slice();
  var delay=function(ms){return new Promise(function(r){setTimeout(r,ms);});};
  var d=function(a,i,j){sortArr=a.slice();drawSort(sortArr,i,j);};
  if(algo==='bubble'){for(var i=0;i<arr.length-1;i++)for(var j=0;j<arr.length-i-1;j++){if(!sortRunning)return;if(arr[j]>arr[j+1]){var tmp=arr[j];arr[j]=arr[j+1];arr[j+1]=tmp;}d(arr,j,j+1);await delay(6);}}
  else if(algo==='insertion'){for(var i=1;i<arr.length;i++){var j=i;while(j>0&&arr[j-1]>arr[j]){var t=arr[j-1];arr[j-1]=arr[j];arr[j]=t;j--;if(!sortRunning)return;d(arr,j,j+1);await delay(10);}}}
  else if(algo==='quick'){
    async function qs(a,lo,hi){if(lo>=hi||!sortRunning)return;var p=a[hi],i2=lo;for(var j=lo;j<hi;j++){if(a[j]<p){var t=a[i2];a[i2]=a[j];a[j]=t;i2++;}d(arr,j,i2);await delay(4);if(!sortRunning)return;}var t=a[i2];a[i2]=a[hi];a[hi]=t;await qs(a,lo,i2-1);await qs(a,i2+1,hi);}
    await qs(arr,0,arr.length-1);
  }else{
    async function ms(a,lo,hi){if(lo>=hi||!sortRunning)return;var mid=Math.floor((lo+hi)/2);await ms(a,lo,mid);await ms(a,mid+1,hi);var tmp=[],i2=lo,j=mid+1;while(i2<=mid&&j<=hi)tmp.push(a[i2]<=a[j]?a[i2++]:a[j++]);while(i2<=mid)tmp.push(a[i2++]);while(j<=hi)tmp.push(a[j++]);for(var k=0;k<tmp.length;k++){a[lo+k]=tmp[k];d(arr,lo+k,-1);await delay(3);}}
    await ms(arr,0,arr.length-1);
  }
  if(sortRunning){sortArr=arr.slice();drawSort(sortArr);}sortRunning=false;
}
function drawFourier(){
  var terms=parseInt((document.getElementById('f-terms')||{value:5}).value);
  var fv=document.getElementById('f-val');if(fv)fv.textContent=terms;
  var shape=(document.getElementById('f-shape')||{value:'square'}).value;
  var c=document.getElementById('f-canvas');if(!c)return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height;
  var dark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.fillStyle=dark?'#111118':'#f0f0f8';ctx.fillRect(0,0,W,H);
  var freqs=[],totalR=0;
  for(var k=0;k<terms;k++){
    var n=2*k+1;
    var amp=shape==='square'?4/(Math.PI*n):shape==='sawtooth'?2/(Math.PI*n):8/(Math.PI*Math.PI*n*n)*(k%2===0?1:-1);
    freqs.push({n:n,amp:Math.abs(amp),phase:amp<0?Math.PI:0});totalR+=Math.abs(amp);
  }
  var sc=60/totalR,pts=[];
  for(var xi=0;xi<W-160;xi++){var t=xi/400*2*Math.PI,y=H/2;freqs.forEach(function(f){y+=f.amp*sc*Math.sin(f.n*t+f.phase);});pts.push({x:xi+160,y:y});}
  ctx.beginPath();pts.forEach(function(p,i){ctx[i?'lineTo':'moveTo'](p.x,p.y);});
  ctx.strokeStyle='#5b52e8';ctx.lineWidth=2;ctx.stroke();
  var bx=80,by=H/2;
  freqs.forEach(function(f,k){
    var r=f.amp*sc;
    ctx.beginPath();ctx.arc(bx,by,r,0,Math.PI*2);
    ctx.strokeStyle='hsl('+(200+k*18)+',65%,'+(dark?'55%':'40%')+')';ctx.lineWidth=0.8;ctx.stroke();
    var ex=bx+r*Math.cos(f.phase),ey=by+r*Math.sin(f.phase);
    ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(ex,ey);
    ctx.strokeStyle='hsl('+(200+k*18)+',65%,'+(dark?'65%':'45%')+')';ctx.lineWidth=1.5;ctx.stroke();
    bx=ex;by=ey;
  });
}

// ════════════════════════════════════════════════
// BÜCHER
// ════════════════════════════════════════════════
var buchSort='jahr',buchDir=1;
var ctxCls={Philosophie:'ctx-philo',Literatur:'ctx-lit',Sachbuch:'ctx-sach',Tech:'ctx-tech',Biographie:'ctx-bio',Kinderbuch:'ctx-kind',Selbstentwicklung:'ctx-selbst'};
var stCls={'gelesen':'st-gelesen','intensiv gelesen':'st-intensiv','teilweise':'st-teilw'};

function setBuchSort(col){
  if(buchSort===col)buchDir*=-1; else{buchSort=col;buchDir=1;}
  document.querySelectorAll('.sort-btn').forEach(function(b){b.classList.remove('active');});
  var s=document.getElementById('sb-'+col.charAt(0).toUpperCase()+col.slice(1));
  if(s)s.classList.add('active');
  renderBuecher();
}
function renderBuecher(){
  var q=(document.getElementById('buch-search')||{value:''}).value.toLowerCase();
  var ctx=(document.getElementById('buch-ctx-filter')||{value:''}).value;
  var sta=(document.getElementById('buch-status-filter')||{value:''}).value;
  var f=buecher.filter(function(b){
    if(ctx&&b.bereich!==ctx)return false;
    if(sta&&b.status!==sta)return false;
    if(q&&b.titel.toLowerCase().indexOf(q)<0&&b.autor.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
  f.sort(function(a,b){
    var va=a[buchSort]||'',vb=b[buchSort]||'';
    if(buchSort==='jahr'){return(parseInt(va.replace(/\D/g,''))||0)-(parseInt(vb.replace(/\D/g,''))||0)*buchDir;}
    return va.localeCompare(vb,'de')*buchDir;
  });
  var tb=document.getElementById('buch-tbody');
  if(!tb)return;
  tb.innerHTML='';
  f.forEach(function(b){
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+b.jahr+'</td><td>'+b.autor+'</td>'
      +'<td><span class="b-title">'+b.titel+'</span></td>'
      +'<td class="b-year">'+b.erschj+'</td>'
      +'<td><span class="ctx-badge '+(ctxCls[b.bereich]||'ctx-sach')+'">'+b.bereich+'</span></td>'
      +'<td><span class="status-badge '+(stCls[b.status]||'st-gelesen')+'">'+b.status+'</span></td>'
      +'<td class="b-notes">'+(b.notes||'—')+'</td>';
    tb.appendChild(tr);
  });
  var stats=document.getElementById('buch-stats');
  if(stats){
    stats.innerHTML='<div class="pstat"><span class="pstat-num">'+f.length+'</span><span class="pstat-lbl">BÜCHER</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+f.filter(function(b){return b.bereich==='Philosophie';}).length+'</span><span class="pstat-lbl">PHILOSOPHIE</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+f.filter(function(b){return b.status==='intensiv gelesen';}).length+'</span><span class="pstat-lbl">INTENSIV</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+new Set(f.map(function(b){return b.bereich;})).size+'</span><span class="pstat-lbl">BEREICHE</span></div>';
  }
}

// ════════════════════════════════════════════════
// STUDIUM
// ════════════════════════════════════════════════
var studiumBuilt=false,activeFach='',openSems=new Set();
var fachColors={Philosophie:'phil',Mathematik:'math',Informatik:'info',Griechisch:'gr',Französisch:'fr'};
function fachCls(f){return 'fach-'+(fachColors[f]||'sonstig');}

function buildFachFilter(){
  var div=document.getElementById('fach-filter');if(!div)return;
  ['Alle','Philosophie','Mathematik','Informatik','Griechisch','Französisch'].forEach(function(f){
    var b=document.createElement('button');
    b.className='ff-btn'+(f==='Alle'?' active ff-all':'');
    b.textContent=f;
    if(f!=='Alle')b.classList.add('ff-'+(fachColors[f]||'sonstig'));
    b.onclick=function(){
      activeFach=f==='Alle'?'':f;
      document.querySelectorAll('.ff-btn').forEach(function(x){x.classList.remove('active');});
      b.classList.add('active');
      if(f==='Alle')b.style.background='var(--accent)';
      renderKurse();
    };
    div.appendChild(b);
  });
}
function renderKurse(){
  var q=(document.getElementById('kurs-search')||{value:''}).value.toLowerCase();
  var dir=(document.getElementById('sort-sem')||{value:'asc'}).value==='asc'?1:-1;
  var f=kurseData.filter(function(k){
    if(activeFach&&k.fach!==activeFach)return false;
    if(q&&k.name.toLowerCase().indexOf(q)<0&&k.fach.toLowerCase().indexOf(q)<0&&k.sem.toLowerCase().indexOf(q)<0&&(k.dozent||'').toLowerCase().indexOf(q)<0)return false;
    return true;
  });
  var groups={};
  f.forEach(function(k){
    var key=k.semNr+'|'+k.sem;
    if(!groups[key])groups[key]={semNr:k.semNr,sem:k.sem,phase:k.phase,kurse:[]};
    groups[key].kurse.push(k);
  });
  var keys=Object.keys(groups).sort(function(a,b){return(groups[a].semNr-groups[b].semNr)*dir;});
  var list=document.getElementById('kurs-list');if(!list)return;
  list.innerHTML='';
  if(!keys.length){list.innerHTML='<div class="no-results">Keine Veranstaltungen gefunden.</div>';return;}
  keys.forEach(function(key){
    var g=groups[key];
    var isOpen=openSems.has(key)||q.length>0;
    var phCls={BA:'ph-ba',MA:'ph-ma',Prom:'ph-prom'}[g.phase]||'ph-ba';
    var phLbl={BA:'Bachelor',MA:'Master',Prom:'Promotion'}[g.phase]||g.phase;
    var semLbl=g.phase==='BA'?g.semNr+'. Sem. (BA)':g.phase==='MA'?(g.semNr-9)+'. Sem. (MA)':(g.semNr-15)+'. Sem. (Prom)';
    var wrap=document.createElement('div');wrap.className='sem-group';
    var hdr=document.createElement('div');hdr.className='sem-header';
    hdr.innerHTML='<span class="sem-badge">'+g.sem+'</span><span class="sem-name">'+semLbl+'</span>'
      +'<span class="sem-phase '+phCls+'">'+phLbl+'</span>'
      +'<span class="sem-count">'+g.kurse.length+' Kurse</span>'
      +'<span class="sem-toggle'+(isOpen?' open':'')+'">&#9654;</span>';
    var tw=document.createElement('div');tw.className='kurs-wrap'+(isOpen?' open':'');
    var tbl=document.createElement('table');tbl.className='kurs-table';
    tbl.innerHTML='<thead><tr><th>Fach</th><th>Veranstaltung</th><th>Art</th><th>Dozent/in</th></tr></thead>';
    var tbody=document.createElement('tbody');
    g.kurse.forEach(function(k){
      var tr=document.createElement('tr');
      tr.innerHTML='<td><span class="fach-dot '+fachCls(k.fach)+'"></span>'+k.fach+'</td>'
        +'<td>'+k.name+'</td>'
        +'<td>'+(k.art?'<span class="veranst-badge">'+k.art+'</span>':'')+'</td>'
        +'<td class="dozent-cell">'+(k.dozent||'')+'</td>';
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);tw.appendChild(tbl);
    hdr.onclick=function(){
      var tog=hdr.querySelector('.sem-toggle');
      var open=tw.classList.toggle('open');
      tog.classList.toggle('open',open);
      if(open)openSems.add(key);else openSems.delete(key);
    };
    wrap.appendChild(hdr);wrap.appendChild(tw);list.appendChild(wrap);
  });
  var stats=document.getElementById('studium-stats');
  if(stats){
    stats.innerHTML='<div class="pstat"><span class="pstat-num">'+f.length+'</span><span class="pstat-lbl">KURSE GESAMT</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+new Set(f.map(function(k){return k.semNr;})).size+'</span><span class="pstat-lbl">SEMESTER</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+f.filter(function(k){return k.fach==='Philosophie';}).length+'</span><span class="pstat-lbl">PHILOSOPHIE</span></div>'
      +'<div class="pstat"><span class="pstat-num">'+f.filter(function(k){return k.fach==='Mathematik';}).length+'</span><span class="pstat-lbl">MATHEMATIK</span></div>';
  }
}

// ════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',function(){
  applyTheme(_theme);
  buildNav();

  // Page init hooks
  registerPageInit('favphil',   function(){renderFavPhil();});
  registerPageInit('zitate',    function(){renderZitate();});
  registerPageInit('tshirts',   function(){renderTshirts();});
  registerPageInit('philosophy',function(){buildPhil();});
  registerPageInit('gaming',    function(){renderGameCards();});
  registerPageInit('buecher',   function(){renderBuecher();});
  registerPageInit('podcasts',  function(){renderPodcasts();});
  registerPageInit('nature',    function(){renderNature();});
  registerPageInit('studium',   function(){
    if(!studiumBuilt){buildFachFilter();renderKurse();studiumBuilt=true;}
    else renderKurse();
  });
  registerPageInit('math',      function(){initMath();});

  // Render on load
  initSort();
  renderBuecher();
});
