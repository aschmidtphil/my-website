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
  }catch(e){det.innerHTML='<div style="color:var(--accent2-text);padding:1rem">Fehler.</div>';}
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

function renderPodcasts(){
  
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

var philZoomLevel=1;
var philBaseW=3600;
var philActiveEpoch='';
var philSearchTerm='';

function buildPhil(){
  
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
  {name:'Parmenides',slug:'parmenides',era:'Vorsokratik',dates:'ca. 520-460 v. Chr.',color:'#f7971e',quotes:['Denn dasselbe ist Denken und Sein.','Es ist; nicht-sein aber ist unmöglich.','Du wirst das Nichtseiende weder erkennen noch aussprechen können.'],desc:'Begründer der Ontologie. Sein Lehrgedicht über die Wege der Wahrheit setzt die radikale Differenz zwischen Sein und Nichtsein. Das Sein ist eins, unteilbar, ewig - Werden und Vergehen sind Illusionen der Sterblichen.',ideas:['Das Sein ist, das Nichtsein ist nicht','Identität von Denken und Sein','Sein als ungeteilte Kugel der Wahrheit'],why:'Parmenides hat die ontologische Grundfrage formuliert, die alle Metaphysik seit ihm beschäftigt. Seine Aporie - wie kann etwas werden? - ist immer noch ungelöst und prägt mein Nachdenken über Sein, Zeit und Endlichkeit.'},
  {name:'Anaximander',slug:'anaximander',era:'Vorsokratik',dates:'ca. 610-546 v. Chr.',color:'#f7971e',quotes:['Woraus aber das Werden ist den seienden Dingen, in das hinein geschieht auch ihr Vergehen nach der Notwendigkeit.','Der Urgrund aller Dinge ist das Apeiron — das Unbegrenzte.','Sie zahlen einander Strafe und Buße für ihre Ungerechtigkeit, gemäß der Ordnung der Zeit.'],desc:'Erster bekannter Philosoph, der das Apeiron (das Unbegrenzte) als Urgrund alles Seienden setzte. Aus dem Unbestimmten geht alles Bestimmte hervor und kehrt in es zurück - nach einer kosmischen Gerechtigkeit.',ideas:['Das Apeiron als unbegrenzter Urgrund','Werden und Vergehen als kosmische Gerechtigkeit','Erste Spekulation über Kosmos und Geologie'],why:'Anaximanders Apeiron-Lehre ist für mich eine der ersten ernsthaften metaphysischen Konzeptionen. Das Unbestimmte als Ursprung des Bestimmten - das berührt die gleichen Fragen wie Schellings Ungrund.'},
  {name:'Heraklit',slug:'heraklit',era:'Vorsokratik',dates:'ca. 540-480 v. Chr.',color:'#f7971e',quotes:['Alles fließt — und niemand steigt zweimal in denselben Fluss.','Der Krieg ist der Vater aller Dinge.','Den Wachenden ist eine einzige gemeinsame Welt; die Schlafenden aber wenden sich ein jeder in seine eigene.'],desc:'Philosoph des Werdens und der Gegensätze. Der Logos durchdringt das Universum, alle Dinge sind in stetem Wandel. Die Einheit der Gegensätze - Krieg ist Vater aller Dinge.',ideas:['Panta rhei: Alles fließt','Logos als verborgene Ordnung','Einheit der Gegensätze (enantiodromia)'],why:'Heraklit ist der Gegenpol zu Parmenides - und gerade in dieser Spannung wird Philosophie spannend. Sein Denken in Bewegung und Gegensätzen ist für mein Verständnis von Zeit zentral.'},
  {name:'Platon',slug:'platon',era:'Klassische Antike',dates:'428-348 v. Chr.',color:'#f7971e',quotes:['Das ungeprüfte Leben ist nicht wert, gelebt zu werden.','Die Idee des Guten steht jenseits des Seins an Würde und Macht.','Die Zeit ist ein bewegliches Abbild der im Einen verharrenden Ewigkeit.'],desc:'Begründer des philosophischen Idealismus. Seine Ideenlehre ist der erste systematische Versuch, das Verhältnis von Erscheinung und Wirklichkeit zu durchdenken. Die unsterbliche Seele erinnert sich an die Ideen - Anamnesis als Erkenntnistheorie.',ideas:['Ideenlehre: Wirklichkeit hinter dem Sichtbaren','Das Höhlengleichnis als Erkenntnisweg','Eros als Streben nach dem Guten'],why:'Platon hat die philosophischen Fragen gestellt, die mich bis heute beschäftigen: Was ist wirklich? Was ist das Gute? Wie kann endliches Denken das Unendliche berühren?'},
  {name:'Aristoteles',slug:'aristoteles',era:'Klassische Antike',dates:'384-322 v. Chr.',color:'#f7971e',quotes:['In allen natürlichen Dingen ist etwas Erstaunliches.',"Die Zeit ist die Maßzahl der Bewegung hinsichtlich des ‚davor' und ‚danach'.",'Alle Menschen streben von Natur aus nach Wissen.'],desc:'Aristoteles verkörpert das Ideal des systematischen Denkens: Logik, Ethik, Naturphilosophie, Poetik - alles aus einem Guss. Seine Tugendethik ist bis heute aktuell. Erster, der Wissenschaft als Disziplin denkt.',ideas:['Eudaimonia: Glück als tätige Entfaltung','Hylemorphismus: Form und Materie','Mesotes: Die goldene Mitte als ethisches Prinzip'],why:'Aristoteles lehrt das Denken im Konkreten. Nicht abstrakte Ideen jenseits der Welt, sondern die Form in der Materie - das hat mein philosophisches Denken geerdet.'},
  {name:'Plotin',slug:'plotin',era:'Neuplatonismus',dates:'204-270 n. Chr.',color:'#ff8060',quotes:['Alles, was ist, ist durch das Eine.','Das Schöne ist das Glänzen der ewigen Ideen durch die Materie.','Niemand findet das Eine, der nicht aufhört, es zu suchen.'],desc:'Plotins Drei-Hypostasen-Lehre (Das Eine - Nous - Seele) und die Emanationslehre sind philosophisch und theologisch gleichermaßen bedeutsam. Das Eine jenseits jeder Bestimmung. Brücke zwischen antiker Philosophie und christlicher Mystik.',ideas:['Das Eine: jenseits aller Prädikate','Emanation: Aus dem Einen strömt alles aus','Rückkehr (epistrophé) als Lebensaufgabe'],why:'Plotin hat mein Denken über Transzendenz und Immanenz geprägt. Die Frage nach dem Einen, das jenseits des Seins liegt, ist für mich eine der tiefsten philosophischen Fragen überhaupt.'},
  {name:'Johannes Scottus Eriugena',slug:'eriugena',era:'Karolingische Zeit',dates:'ca. 815-877',color:'#ff8060',quotes:['Gott ist das Wesen aller Dinge, jenseits aller Wesen, das Nichts wegen seiner Überfülle.','Niemand betritt den Himmel, außer durch Philosophie.','Die Autorität ist aus der wahren Vernunft hervorgegangen, nicht die Vernunft aus der Autorität.'],desc:'Irischer Theologe-Philosoph am Hof Karls des Kahlen. Sein System Periphyseon entwickelt eine kühne Vierteilung der Natur, die Schöpfer und Schöpfung in einem Gedanken zusammendenkt. Brücke zwischen Neuplatonismus und mittelalterlicher Mystik.',ideas:['Vier Naturen: schaffend/geschaffen × ungeschaffen/nicht schaffend','Negative Theologie: Gott ist nichts von alledem','Reditus: Rückkehr aller Dinge zu Gott'],why:'Eriugena denkt Pantheismus und Transzendenz zusammen, ohne sie zu verwechseln. Diese Balance fasziniert mich - und sein Werk weist auf Eckhart, Cusanus, Schelling voraus.'},
  {name:'Augustinus',slug:'augustinus',era:'Spätantike',dates:'354-430',color:'#ff6584',quotes:['Was ist also die Zeit? Wenn mich niemand darnach fragt, weiß ich es, wenn ich es aber einem, der mich fragt, erklären sollte, weiß ich es nicht.','Was tat Gott, bevor er Himmel und Erde schuf? [...] Er bereitet denen, die sich vermessen, jene hohen Geheimnisse zu ergründen, Höllen.','Liebe — und tu, was du willst.'],desc:'Kirchenvater und einer der wirkmächtigsten Denker der westlichen Tradition. Verband Neuplatonismus mit christlichem Denken. Seine Confessiones sind eine der ersten radikalen Selbstreflexionen der Philosophiegeschichte.',ideas:['Zeit als Bewusstseinsbewegung der Seele (distentio animi)','Das Böse als Privation des Guten','Innerlichkeit als philosophischer Weg'],why:'Augustinus\' Zeitphilosophie in den Confessiones gehört zu den wichtigsten Vorläufern moderner Phänomenologie. Sein Ringen mit der Zeit-Frage spricht mich tief an.'},
  {name:'Jakob Böhme',slug:'boehme',era:'Mystik',dates:'1575-1624',color:'#d090f0',quotes:['Das Nichts hungert nach dem Etwas.','Der Ungrund ist ein ewig Nichts und machet aber einen ewigen Anfang, als eine Sucht; Dann das Nichts ist eine Sucht nach Etwas','Das Nichts will nicht ein Nichts seyn und kann nicht ein Nichts seyn.'],desc:'Schuhmacher und mystischer Philosoph. Seine Visionen des Ungrunds, der dialektischen Spannung in Gott selbst und der Geburt des Lichts aus dem Dunkel haben den Deutschen Idealismus tief geprägt - besonders Schelling.',ideas:['Der Ungrund vor allem Sein','Sieben Quellgeister der göttlichen Selbstoffenbarung','Das Böse als notwendiges Moment des Lebens'],why:'Ohne Böhme keine Freiheitsschrift, keine Weltalter. Seine Denkfigur des Ungrunds steht im Zentrum meiner Schelling-Lektüre - und damit meines philosophischen Denkens überhaupt.'},
  {name:'Blaise Pascal',slug:'pascal',era:'Frühe Neuzeit',dates:'1623-1662',color:'#e85878',quotes:['Der Mensch ist nur ein Schilfrohr, das schwächste der Natur; aber er ist ein denkendes Schilfrohr.','Das Herz hat seine Gründe, die der Verstand nicht kennt.','Das ewige Schweigen dieser unendlichen Räume macht mir Angst.'],desc:'Mathematiker, Physiker, Philosoph. Seine Pensées entwickeln eine schonungslose Anthropologie: Der Mensch in der Mitte zwischen Allem und Nichts, zerrissen zwischen Größe und Elend. Die Religion als einzige Antwort auf diese Zerrissenheit.',ideas:['Mensch als Mittelding zwischen Nichts und Allem','Die Wette: Pari sur Dieu','Esprit de finesse vs. esprit de géométrie'],why:'Pascal kombiniert mathematische Strenge mit existenzieller Tiefe wie kein zweiter. Seine Meditation über die Stellung des Menschen zwischen den Abgründen - siehe Zitate-Seite - gehört zum Tiefsten, was je gedacht wurde.'},
  {name:'Nicolas Malebranche',slug:'malebranche',era:'Rationalismus',dates:'1638-1715',color:'#f85888',quotes:['Wir sehen alle Dinge in Gott.','Aufmerksamkeit ist das natürliche Gebet der Seele.','Die Ordnung ist das unwandelbare Gesetz der Geister.'],desc:'Französischer Cartesianer und Oratorianer. Vermittelt zwischen Descartes und Augustinus. Seine Vision-en-Dieu-Lehre und der Okkasionalismus sind kühne metaphysische Konstruktionen, die das Verhältnis von Geist und Materie radikal neu denken.',ideas:['Vision en Dieu: Wir sehen Ideen in Gott','Okkasionalismus: Gott als einzige wahre Ursache','Erkenntnistheorie als Theologie'],why:'Malebranche zeigt, wie weit ein konsequentes Denken gehen kann. Seine Lösung des Leib-Seele-Problems ist verrückt - aber konsequent. Solche Denker sind philosophisch unverzichtbar.'},
  {name:'Immanuel Kant',slug:'kant',era:'Aufklärung',dates:'1724-1804',color:'#e8c040',quotes:['Jede Wissenschaft ist so weit Wissenschaft, wie Mathematik in ihr ist.', 'Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie allgemeines Gesetz werde.','Aus so krummem Holze, als woraus der Mensch gemacht ist, kann nichts ganz Gerades gezimmert werden.','Zwei Dinge erfüllen das Gemüt mit immer neuer Bewunderung: der bestirnte Himmel über mir und das moralische Gesetz in mir.'],desc:'Kopernikanische Wende: Das Subjekt konstituiert die Erkenntnis. Die drei Kritiken haben die Philosophie neu ausgerichtet. Grenzen der Vernunft als ihre Bedingungen - die größte philosophische Selbstaufklärung der Neuzeit.',ideas:['Kategorischer Imperativ','Das Ding an sich bleibt unerkennbar','Kritik als philosophische Grundhaltung'],why:'Ohne Kant ist moderne Philosophie nicht zu verstehen. Das Heine-Zitat, das meiner Dissertation vorschwebte, zeigt das perfekt: Kant als der große Zerstörer - und doch der Ermöglicher.'},
  {name:'F. W. J. Schelling',slug:'schelling',era:'Dt. Idealismus',dates:'1775-1854',color:'#c8a020',quotes:['Nur wer Freiheit gekostet hat, kann das Verlangen empfinden, ihr alles analog zu machen.','Der Anfang ist nur als Anfang vom Ende her.','Das Wollen ist Urseyn.'],desc:'Hauptgegenstand meiner Dissertation. Sein Werk ist das umfangreichste des Deutschen Idealismus. Die Weltalterphilosophie als unvollendetes Hauptwerk, die Freiheitsschrift als Wendepunkt, die Spätphilosophie als christliche Metaphysik der Geschichte.',ideas:['Identität von Natur und Geist','Weltalterphilosophie als Geschichte des Absoluten','Freiheit und Ungrund als Mitte der Metaphysik'],why:'Schelling steht im Zentrum meiner Forschung. Seine Weltalterphilosophie ist für mich das aufregendste Fragment der Philosophiegeschichte - ein System, das bewusst offen bleibt. Und er ist der erste, der Theologie und Philosophie konsequent zusammendenkt.'},
  {name:'G. W. F. Hegel',slug:'hegel',era:'Dt. Idealismus',dates:'1770-1831',color:'#d0a830',quotes:['Das Wahre ist das Ganze.','Die Eule der Minerva beginnt erst mit der einbrechenden Dämmerung ihren Flug.','Was vernünftig ist, das ist wirklich; und was wirklich ist, das ist vernünftig.'],desc:'Höhepunkt und Vollendung des Deutschen Idealismus. Die Phänomenologie des Geistes als Bildungsroman des Bewusstseins. Dialektik als Bewegung der Begriffe. Die Wissenschaft der Logik als spekulative Ontologie der Moderne.',ideas:['Dialektik: These - Antithese - Synthese','Phänomenologie des Geistes als Selbstbildung','Weltgeschichte als Fortschritt im Bewusstsein der Freiheit'],why:'Hegel ist der große Antipode Schellings. Seine Aufhebung der Endlichkeit ist genau das, wogegen meine eigene Position der radikalen Endlichkeit sich richtet - aber ohne Hegel kein Schelling, kein Marx, kein Heidegger.'},
  {name:'Friedrich Hölderlin',slug:'hoelderlin',era:'Lyrik / Idealismus',dates:'1770-1843',color:'#b89040',quotes:['Wo aber Gefahr ist, wächst das Rettende auch.','Voll Verdienst, doch dichterisch, wohnet der Mensch auf dieser Erde.','Was bleibet aber, stiften die Dichter.'],desc:'Lyriker und Philosoph zugleich. Studienfreund von Hegel und Schelling im Tübinger Stift. Seine Dichtung denkt das Verhältnis von Mensch und Göttlichem in einer Tiefe, die der zeitgenössischen Philosophie ebenbürtig ist.',ideas:['Das Heilige als Grunderfahrung','Tragik der Moderne: Götterabschied','Dichtung als spekulativer Modus'],why:'Hölderlin zeigt, dass Philosophie und Dichtung an ihren Tiefen ineinander übergehen. Heidegger hat das ausführlich entwickelt - bei Hölderlin selbst liest man es unverstellt.'},
  {name:'Martin Heidegger',slug:'heidegger',era:'Phänomenologie',dates:'1889-1976',color:'#5b80e8',quotes:['Das Dasein ist ein Seiendes, dem es in seinem Sein um dieses Sein selbst geht.','Die Sprache ist das Haus des Seins.','Nur ein Gott kann uns noch retten.'],desc:'Sein und Zeit hat die Seinsfrage als Grundfrage der Philosophie neu gestellt. Dasein als In-der-Welt-sein, Sein-zum-Tode, Angst als Grundstimmung. Die spätere Kehre zur Geschichte des Seins und zur Sprache.',ideas:['Sein und Zeit als Grundfrage','Dasein als Sorgestruktur','Das Gestell als Wesen der modernen Technik'],why:'Heidegger hat das Denken über Endlichkeit, Zeit und Tod radikalisiert. Seine Analyse des Seins-zum-Tode ist für meine Philosophie der radikalen Endlichkeit grundlegend - auch wenn ich politisch andere Wege gehe.'},
  {name:'Emmanuel Levinas',slug:'levinas',era:'Phänomenologie / Ethik',dates:'1906-1995',color:'#7b60d8',quotes:['Das Antlitz des Anderen ist der Ort, an dem die Unendlichkeit in die Endlichkeit einbricht.','Die Ethik ist die erste Philosophie.','Das Antlitz spricht: Du sollst nicht töten.'],desc:'Phänomenologe und jüdischer Denker. Ethik als erste Philosophie - vor der Ontologie. Das Antlitz des Anderen als Spur des Unendlichen. Radikale Asymmetrie statt Dialog.',ideas:['Ethik als erste Philosophie','Das Antlitz des Anderen als Unendlichkeit','Verantwortung als Grundstruktur'],why:'Levinas denkt das Andere konsequenter als irgendjemand vor ihm. Seine Verschränkung von Phänomenologie und ethischer Tradition ist für meine eigene Position zentral.'},
  {name:'László Tengelyi',slug:'tengelyi',era:'Phänomenologie',dates:'1954-2014',color:'#6890c0',quotes:['Vom platonischen Sokrates stammt der Gedanke, dass das Leben erst dann wert ist, gelebt zu werden, wenn es untersucht wird.','Das Spezifische der Philosophie besteht für mich darin, das Leben innerhalb der Welt zu lokalisieren und im Gesamtzusammenhang der Welt zu betrachten.','Als Gesamtprojekt sollte sich die Phänomenologie m. E. als ein Weltentwurf verstehen.'],desc:'Ungarisch-deutscher Phänomenologe, Schüler von Paul Ricoeur, Professor in Wuppertal. Sein Werk verbindet Phänomenologie der narrativen Identität mit einer eigenständigen Metaphysik des Welt-Begriffs.',ideas:['Narrative Identität als Lebensgeschichte','Diakritische Methode der Phänomenologie','Welt und Unendlichkeit als phänomenologisches Grundproblem'],why:'Tengelyi ist für mich ein zentraler Bezugspunkt: Sowohl für die narrative Identitätstheorie als auch für sein Spätwerk Welt und Unendlichkeit, das genau die Fragen behandelt, die mich beschäftigen.'},
  {name:'Gottfried W. Leibniz',slug:'leibniz',era:'Rationalismus',dates:'1646-1716',color:'#e87060',quotes:['Diese Welt ist die beste aller möglichen Welten.','Nichts ist im Verstand, was nicht zuvor in den Sinnen war — außer der Verstand selbst.','Die Gegenwart ist schwanger mit der Zukunft.'],desc:'Universalgelehrter. Monadenlehre, Differentialrechnung, prästabilierte Harmonie, Theodizee. Sein Werk verbindet Mathematik, Metaphysik, Logik und Theologie in einer monumentalen Synthese.',ideas:['Monaden als spirituelle Atome','Prästabilierte Harmonie','Satz vom zureichenden Grund'],why:'Leibniz ist intellektuell überwältigend. Seine Monadologie ist eine der kühnsten metaphysischen Konstruktionen - und sein Optimismus eine echte Herausforderung für mein eigenes Denken.'},
  {name:'F. H. Jacobi',slug:'jacobi',era:'Glaubensphilosophie',dates:'1743-1819',color:'#e89060',quotes:['Mit dem Eintreten der Zeit verwandeln sich die Begriffe von Grund und Folge in die Begriffe von Ursache und Wirkung.','Diesen Fehler beging also Spinoza nicht; aber was er eigentlich zu Stande bringen wollte: eine natürliche Erklärung des Daseyns erdHcher und successiver Dinge, konnte durch seine neue Vorstellungsart so wenig, als durch irgend eine andre erreicht werden.','Denn die Folge, welche in den mathematischen gleichnissen vorgestellt wird, ist keine objektive und wirkliche, sondern eine subjektive und bloß idealische, die auch nicht einmal idealisch vorhanden sein könnte, wenn ihr nicht eine wirkliche Sukzession in dem Subjekt, welche sie in Gedanken erzeugt, zu Grunde läge, und dadurch das Stehende in ein Fließendes verwandelt würde.'],desc:'Antipode des Idealismus. Sein Streit mit Mendelssohn um Spinoza löste den Pantheismusstreit aus und gab dem Deutschen Idealismus seine Stoßrichtung. Glaubensphilosophie als Gegenposition zur Vernunftsystematik.',ideas:['Salto mortale: Sprung in den Glauben','Kritik des Spinozismus als Nihilismus','Endlichkeit als unhintergehbar'],why:'Jacobi ist mir wichtig, weil er die Grenzen jedes Systems aufzeigt. Seine Insistenz auf Endlichkeit als Ausgangspunkt allen Philosophierens trifft den Kern meiner eigenen Position.'},
  {name:'Søren Kierkegaard',slug:'kierkegaard',era:'Existenzphilosophie',dates:'1813-1855',color:'#5070b0',quotes:['Ich stecke den Finger ins Dasein - es riecht nach nichts.','Angst ist der Schwindel der Freiheit.','Das Leben kann nur rückwärts verstanden, aber muss vorwärts gelebt werden.'],desc:'Vater der Existenzphilosophie. Schrieb unter zahlreichen Pseudonymen über Angst, Verzweiflung, Glauben und die Stadien des Lebens. Radikale Subjektivität als Wahrheit. Gegen Hegels Systemphilosophie das Einzelne und Konkrete.',ideas:['Drei Stadien: Ästhetisch - Ethisch - Religiös','Angst als Schwindel der Freiheit','Sprung des Glaubens'],why:'Kierkegaards Denken trifft genau dort, wo Systemphilosophie versagt - beim konkret existierenden Einzelnen. Seine Diagnose der modernen Verzweiflung ist erschreckend aktuell.'},
  {name:'Baruch de Spinoza',slug:'spinoza',era:'Rationalismus',dates:'1632-1677',color:'#f85888',quotes:['Deus sive Natura - Gott oder die Natur.','Weine nicht, lache nicht, verstehe.','Frieden ist nicht die Abwesenheit von Krieg, sondern eine Tugend, die aus seelischer Stärke entspringt.'],desc:'Geometrische Ethik. Pantheismus als rigoroses System: eine Substanz mit unendlich vielen Attributen, von denen wir zwei kennen - Denken und Ausdehnung. Freiheit als Einsicht in die Notwendigkeit.',ideas:['Deus sive Natura','Freiheit als Einsicht in Notwendigkeit','Conatus: Streben jedes Dinges, in seinem Sein zu beharren'],why:'Spinozas Pantheismus ist die radikalste metaphysische Position der Neuzeit. Schellings ganzes Denken ist ohne Spinoza nicht zu verstehen - und Jacobis Spinoza-Kritik prägt mein eigenes Denken.'},
  {name:'Arthur Schopenhauer',slug:'schopenhauer',era:'Postidealismus',dates:'1788-1860',color:'#a05050',quotes:['Das Leben ist eine missliche Sache. Ich habe mir vorgesetzt, es damit hinzubringen, über dasselbe nachzudenken.','Das Leben pendelt wie ein Pendel hin und her zwischen Schmerz und Langeweile.','Jeder hält die Grenzen seines eigenen Gesichtsfeldes für die Grenzen der Welt.'],desc:'Pessimistischer Metaphysiker. Die Welt als Wille und Vorstellung: hinter den Phänomenen wirkt der blinde Wille, Quelle allen Leidens. Verneinung des Willens, Kunst und Mitleid als Wege der Befreiung.',ideas:['Die Welt als Wille und Vorstellung','Mitleid als Grundlage der Ethik','Verneinung des Willens'],why:'Schopenhauer hat den Pessimismus philosophisch ernsthaft gedacht. Seine Diagnose des Willens als Quelle des Leidens ist eine der wenigen ehrlichen Antworten auf die Frage nach dem Sinn des Lebens.'},
  {name:'Emil Cioran',slug:'cioran',era:'20. Jh.',dates:'1911-1995',color:'#606080',quotes:['Ein Buch ist ein aufgeschobener Selbstmord.','Es genügt nicht, geboren zu werden — man muss auch sterben.','Ich würde eine Welt lieben, in der es gar kein Kriterium gäbe, keine Form und keinerlei Prinzip, eine Welt der absoluten Unbestimmtheit. Denn in unserer Welt sind alle Kriterien, Formen und Prinzipien schal.', 'Ich weiß überhaupt nicht, weshalb wir hienieden etwas tun, warum wir Freude und Bestrebungen, Hoffnungen und Träume haben müssen. […] Aber was gibt es in dieser Welt schon zu gewinnen? […] Es gibt keinerlei Argumente für das Leben.', 'Es leuchtet ein, dass Gott eine Lösung war und dass man nie wieder eine ebenso befriedigende finden wird.'],desc:'Rumänisch-französischer Essayist und Aphoristiker. Kompromisslose Auseinandersetzung mit Pessimismus, Langeweile, Selbstmord, Glauben und Glaubenslosigkeit. Schreibt nicht in Systemen, sondern in Splittern.',ideas:['Schlaflosigkeit als philosophische Erfahrung','Existenz als Verfallserscheinung','Skepsis radikalisiert zur Mystik'],why:'Cioran sagt das, was die akademische Philosophie meidet. Seine Splitter über Tod, Langeweile und Glauben treffen mich - auch wenn ich nicht überall folgen kann oder will.'},
  {name:'Friedrich Nietzsche',slug:'nietzsche',era:'19. Jh.',dates:'1844-1900',color:'#fb923c',quotes:['Gott ist tot. Und wir haben ihn getötet.','Was mich nicht umbringt, macht mich stärker.','Wer mit Ungeheuern kämpft, mag zusehen, dass er nicht dabei zum Ungeheuer wird.'],desc:'Radikaler Kritiker der Metaphysik, der Moral und des Christentums. Der Übermensch als Antwort auf den Nihilismus. Die ewige Wiederkehr als Prüfstein der Lebensbejahung. Schreibt in Aphorismen statt in Systemen.',ideas:['Tod Gottes und Heraufkunft des Nihilismus','Umwertung aller Werte','Ewige Wiederkehr des Gleichen'],why:'Nietzsche ist die schärfste Stimme gegen jede unreflektierte Metaphysik. Auch wer ihm nicht folgt, muss seine Kritik ernst nehmen - sonst bleibt das eigene Denken naiv.'},
  {name:'Sigmund Freud',slug:'freud',era:'Psychoanalyse',dates:'1856-1939',color:'#7060b0',quotes:['Das Ich ist nicht Herr im eigenen Haus.','Wo Es war, soll Ich werden.','Unsere Kultur ist ganz allgemein auf der Unterdrückung von Trieben aufgebaut.'],desc:'Begründer der Psychoanalyse. Entdeckung des Unbewussten als treibender Kraft des seelischen Lebens. Triebtheorie, Verdrängung, Übertragung. Drei Kränkungen der Menschheit: Kopernikus, Darwin und er selbst.',ideas:['Das Unbewusste als Hauptschauplatz des Seelenlebens','Strukturmodell: Es - Ich - Über-Ich','Triebkonflikt und Verdrängung'],why:'Freud hat die Selbstdurchschaubarkeit des Bewusstseins zerstört. Wer über Freiheit und Verantwortung nachdenkt, muss seine Theorie der unbewussten Motive berücksichtigen - auch wo sie überholt ist.'},
  {name:'Jacques Derrida',slug:'derrida',era:'Poststrukturalismus',dates:'1930-2004',color:'#7060b0',quotes:['Es gibt kein Außerhalb des Textes.','Die Dekonstruktion findet statt, ich werde nichts machen.','Die Spur ist die Wiederkehr des Anderen im Selben.'],desc:'Begründer der Dekonstruktion. Sprache, Schrift, différance - das Spiel der Verschiebung und Ableitung als unhintergehbare Bedingung jeder Bedeutung. Lektüre als philosophische Praxis.',ideas:['Dekonstruktion als Lektürepraxis','Différance: Differieren und Aufschieben','Kritik des logozentrischen Denkens'],why:'Derrida lehrt, mit Texten und Begriffen vorsichtig umzugehen. Seine Lektüre Heideggers und der Phänomenologie ist mir wichtig, auch wenn ich seinen Stil nicht immer mag.'},
  {name:'David Hume',slug:'hume',era:'Empirismus',dates:'1711-1776',color:'#50b080',quotes:['Aus dem Sein folgt kein Sollen.','Die Vernunft ist Sklavin der Leidenschaften.','Gewohnheit ist die große Führerin des menschlichen Lebens.'],desc:'Radikaler Skeptiker und Empirist. Kausalität ist Gewohnheit, das Selbst ein Bündel von Eindrücken. Sein und Sollen sind kategorial getrennt. Weckte Kant aus dem dogmatischen Schlummer.',ideas:['Kausalität als Gewohnheit','Das Humsche Gesetz: Kein Sollen aus Sein','Das Selbst als Bündel von Eindrücken'],why:'Hume ist die nüchterne Gegenstimme zur kontinentalen Metaphysik. Seine Skepsis ist gesund - und seine Frage, was Begründung überhaupt heißt, ist immer noch offen.'},
  {name:'Nicolai Hartmann',slug:'n-hartmann',era:'Ontologie',dates:'1882-1950',color:'#6890c0',quotes:['Die Welt ist ein Schichtenbau realer Seinsweisen.','Das Reale ist das schwerere Sein gegenüber dem Ideellen.','Aporetik ist die unvollendete Methode der Philosophie.'],desc:'Begründer einer kritischen Ontologie. Schichtenmodell des Realen: Materie, Leben, Bewusstsein, Geist - jede Schicht hat ihre eigenen Kategorien. Unauflösbarkeit der Ebenen gegen jeden Reduktionismus.',ideas:['Schichtenontologie der Realität','Aporetik als philosophische Methode','Ethik der Werte gegen Wertrelativismus'],why:'Hartmann ist ein wenig vergessen, aber unterschätzt. Sein Schichtenmodell des Realen ist eine ernstzunehmende Alternative zum monistischen und dualistischen Denken.'},
  {name:'William James',slug:'wjames',era:'Pragmatismus',dates:'1842-1910',color:'#80b070',quotes:['Truth happens to an idea.','Glauben heißt, das zu tun, was wir wollen, vorausgesetzt, dass wir die Folgen tragen wollen.','Das größte Werkzeug gegen Stress ist unsere Fähigkeit, einen Gedanken einem anderen vorzuziehen.'],desc:'Mitbegründer des Pragmatismus und Pionier der Psychologie. Wahrheit als das, was sich bewährt. Religiöse Erfahrung als legitimer Gegenstand der Philosophie. Bewusstseinsstrom als Realität.',ideas:['Pragmatismus: Bedeutung ist Wirkung','Bewusstseinsstrom (stream of consciousness)','Vielfalt religiöser Erfahrung'],why:'James zeigt, dass Philosophie nicht nur kontinentale Spekulation sein muss. Seine Offenheit für religiöse Erfahrung und für die Pluralität des Wirklichen schätze ich sehr.'},
  {name:'Gershom Scholem',slug:'scholem',era:'Religionsphilosophie',dates:'1897-1982',color:'#a08060',quotes:['Mystik ist die Stimme dessen, was in der Religion verstummt ist.','Jeder bedeutende Gedanke birgt in sich einen Widerspruch.','Es gibt eine Wahrheit, aber sie ist nicht eine Aussage.'],desc:'Begründer der wissenschaftlichen Erforschung der jüdischen Mystik. Lebenslanger Freund Walter Benjamins. Seine Studien zur Kabbala haben eine ganze unterirdische Geistesgeschichte sichtbar gemacht.',ideas:['Wissenschaftliche Erschließung der Kabbala','Mystik als Gegenkraft im monotheistischen Denken','Zimzum: Selbstkontraktion Gottes als Schöpfung'],why:'Scholem öffnet ein philosophisch unterbeleuchtetes Feld. Die kabbalistische Denkfigur des Zimzum hat strukturelle Parallelen zu Schellings Ungrund - eine faszinierende Konstellation.'},
];

/* ── Mehrfach-Porträts (geteilt von Banner + Karten) ──
   Slugs mit mehreren Bildern: <slug>.jpg, <slug>1.jpg, <slug>2.jpg …
   Zahl = Anzahl Varianten GESAMT (inkl. Basisbild ohne Ziffer). */
window.MULTI_PORTRAITS = window.MULTI_PORTRAITS || {
  'schelling': 4,   // schelling.jpg, schelling1, schelling2, schelling3 (private Zeichnung)
  'kant': 2,        // kant.jpg + kant1.jpg
  // 'nietzsche': 2,
};
window._favChosenVariant = window._favChosenVariant || {};
window.resolveFavSlug = function(slug){
  const n = window.MULTI_PORTRAITS[slug];
  if (!n || n < 2) return slug;
  if (window._favChosenVariant[slug] === undefined) {
    const pick = Math.floor(Math.random() * n);
    window._favChosenVariant[slug] = pick === 0 ? slug : slug + pick;
  }
  return window._favChosenVariant[slug];
};

window.renderFavphil = function(){
  // Defensive: rebuild banner if function exists
  if(typeof window.buildFavphilBanner === 'function'){
    try { window.buildFavphilBanner(); } catch(e) { console.warn('banner build:', e); }
  }
  var grid=document.getElementById('favphil-grid');
  if(!grid) return;
  grid.innerHTML='';
  if(typeof FAVPHILS === 'undefined') return;
  FAVPHILS.forEach(function(p){
    var mono=p.name.split(/\s+/).pop().charAt(0);
    var card=document.createElement('div');card.className='favphil-card';
    card.style.borderTop='3px solid '+p.color;
    var ideasHTML=(p.ideas||[]).map(function(i){return '<li>'+i+'</li>';}).join('');
    var quote=p.quotes?p.quotes[Math.floor(Math.random()*p.quotes.length)]:(p.quote||'');
    var _pslug=window.resolveFavSlug(p.slug);
    card.innerHTML=
      '<div class="favphil-portrait">'
      +'<picture>'
      +  '<source srcset="assets/images/philosophen/'+_pslug+'.avif" type="image/avif">'
      +  '<source srcset="assets/images/philosophen/'+_pslug+'.webp" type="image/webp">'
      +  '<img src="assets/images/philosophen/'+_pslug+'.jpg" alt="'+p.name+'" loading="lazy" '
      +  'onerror="this.closest(\'picture\').style.display=\'none\';this.closest(\'picture\').nextElementSibling.style.display=\'flex\';">'
      +'</picture>'
      +'<span class="favphil-mono" style="display:none;color:'+p.color+';">'+mono+'</span>'
      +'<span class="favphil-portrait-era" style="background:'+p.color+';">'+p.era+'</span>'
      +'</div>'
      +'<div class="favphil-body">'
      +'<div class="favphil-name">'+p.name+'</div>'
      +'<div class="favphil-dates">'+p.dates+'</div>'
      +'<div class="favphil-quote">\u201E'+quote+'\u201C</div>'
      +'<div class="favphil-desc">'+(p.desc||'')+'</div>'
      +'<ul class="favphil-ideas">'+ideasHTML+'</ul>'
      +'<div class="favphil-why">'
      +'<div class="favphil-why-label">// WARUM DIESER DENKER</div>'
      +'<div class="favphil-why-text">'+(p.why||'')+'</div>'
      +'</div>'
      /* Auf dem Telefon klappen Leitgedanken und Begründung ein — 31 Karten
         à 861 px Text sind sonst 47 Bildschirme. Der Knopf ist ab 901 px
         ausgeblendet, die Karte dort unverändert vollständig. */
      +'<button type="button" class="favphil-mehr" '
      +'onclick="var c=this.closest(\'.favphil-card\');c.classList.toggle(\'offen\');'
      +'this.textContent=c.classList.contains(\'offen\')?\'weniger\':\'mehr lesen\';">'
      +'mehr lesen</button>'
      +'</div>';
    grid.appendChild(card);
  });
};
// Backward-compat alias
var renderFavphil = window.renderFavphil;

// ════════════════════════════════════════════════
// ZITATE
// ════════════════════════════════════════════════
// ════════════════════════════════════════════════
// ZITATE — EINZIGE QUELLE (global window.ZITATE, damit Startseiten-
// Rotation UND Zitate-Seite dieselben Daten nutzen). Hier bearbeiten.
// ════════════════════════════════════════════════
window.ZITATE=[

  // ── Heinrich Heine (jetzt Teil der regulären Sammlung) ──────
  {
    text: '„Wenn aber Immanuel Kant, dieser große Zerstörer im Reiche der Gedanken, an Terrorismus den Maximilian Robespierre weit übertraf, so hat er doch mit diesem manche Ähnlichkeiten, die zu einer Vergleichung beider Männer auffordern. Zunächst finden wir in beiden dieselbe unerbittliche, schneidende, poesielose, nüchterne Ehrlichkeit. Dann finden wir in beiden dasselbe Talent des Mißtrauens, nur daß es der eine gegen Gedanken ausübt und Kritik nennt, während der andere es gegen Menschen anwendet und republikanische Tugend betitelt. Im höchsten Grade jedoch zeigt sich in beiden der Typus des Spießbürgertums — die Natur hatte sie bestimmt, Kaffee und Zucker zu wiegen, aber das Schicksal wollte, daß sie andere Dinge abwögen, und legte dem einen einen König und dem anderen einen Gott auf die Waagschale … Und sie gaben das richtige Gewicht!"',
    pullquote: 'Und sie gaben das richtige Gewicht!',
    author: 'Heinrich Heine',
    source: 'Zur Geschichte der Religion und Philosophie in Deutschland (1834)',
    url: 'https://www.projekt-gutenberg.org/heine/religphi/religphi.html',
    kat: 'Literatur',
    portrait: 'heine',
    note: 'Das schwebte mir bei meiner Dissertation vor: mich von anderen Meinungen, Normen und Konventionen nicht beirren zu lassen und in Bezug auf Schelling einfach das richtige Gewicht anzugeben — dass er sich eher als Theologe denn als Philosoph verstand, auch wenn das im Fach nicht gern gehört wird.'
  },

  // ── Aristoteles ─────────────────────────────────────────────
  {
    text: 'In allen natürlichen Dingen ist etwas Erstaunliches.',
    original: 'ἐν πᾶσι γὰρ τοῖς φυσιχοῖς ἔνεστί τι θαυμαστόν.',
    author: 'Aristoteles',
    source: 'De Partibus Animalium 645a16 — Übersetzung: A. Schmidt',
    url: 'https://archive.org/details/bub_gb_ouQTAAAAYAAJ/page/226/mode/2up',
    kat: 'Antike',
    portrait: 'aristoteles'
  },

  // ── Platon ──────────────────────────────────────────────────
  {
    text: 'Die Idee des Guten steht jenseits des Seins. (ἐπέκεινα τῆς οὐσίας)',
    author: 'Platon',
    source: 'Politeia 509b',
    kat: 'Antike',
    portrait: 'platon'
  },

  // ── Plotin ──────────────────────────────────────────────────
  {
    text: 'Alles, was ist, ist durch das Eine.',
    author: 'Plotin',
    source: 'Enneaden VI,9 — Über das Gute oder das Eine',
    kat: 'Antike',
    portrait: 'plotin'
  },

  // ── Schelling ───────────────────────────────────────────────
  {
    text: 'Nur wer Freiheit gekostet hat, kann das Verlangen empfinden, ihr alles analog zu machen, sie über das ganze Universum zu verbreiten. Wer nicht auf diesem Weg zur Philosophie kommt, folgt und thut bloß andern nach, was sie thun; ohne Gefühl weßwegen sie es thun.',
    pullquote: 'Nur wer Freiheit gekostet hat, kann das Verlangen empfinden, ihr alles analog zu machen.',
    author: 'F. W. J. Schelling',
    source: 'Vom Wesen der menschlichen Freiheit und den damit zusammenhängenden Gegenständen (SW VII, 351)',
    kat: 'Freiheit',
    portrait: 'schelling'
  },

  // ── Pascal kurz ─────────────────────────────────────────────
  {
    text: 'Ich weiß nicht, wer mich in die Welt gesetzt hat, und auch nicht, was die Welt und ich selbst sind. Ich weiß nicht, was mein Körper, meine Sinne, meine Seele und selbst jener Teil meines Ichs sind, der denkt. Ich sehe überall nur Unendlichkeiten, die mich wie ein Atom und wie einen Schatten einschließen. Alles, was ich erkenne, ist, daß ich bald sterben muß; doch was ich am wenigsten begreife, ist gerade dieser Tod, dem ich nicht entgehen kann.',
    pullquote: 'Ich sehe überall nur Unendlichkeiten, die mich wie ein Atom und wie einen Schatten einschließen.',
    author: 'Blaise Pascal',
    source: 'Pensées',
    kat: '(Un-)Endlichkeit',
    portrait: 'pascal'
  },

  // ── Pascal — Gedanken Kap. 6 ────────────────────────────────
  {
    text: `Das erste, was sich dem Menschen bei einer Selbstbetrachtung darbietet, ist sein Körper, d. h. eine gewisse Masse Materie, die ihm eigen ist. Um aber zu begreifen, was sie sei, muß er sie vergleichen mit allem was über, und mit allem was unter ihm ist, damit er seine rechten Grenzen erkenne.

Er bleibe doch nicht dabei stehen, einfach die Gegenstände zu betrachten, welche ihn umgeben; er betrachte die ganze Natur in ihrer ganzen erhabenen Majestät; er beschaue jenes glänzende Licht, welches gleich einer ewigen Fackel das Universum erleuchtet; die Erde erscheine ihm wie ein Punkt, gegenüber dem weiten Umkreis, den dieses Gestirn beschreibt; und er möge darüber erstaunen, daß dieser weite Umkreis selbst nur ein verschwindender Punkt ist gegenüber dem, den die Sterne, die im Firmamente dahinrollen, umfassen. Wenn aber hier unser Denken stillsteht, so möge die Phantasie weiter schweifen. Sie wird weit eher ermüden auszumalen, als die Natur Farben darzureichen. Alles was wir von der Welt sehen, ist nur eine unmerkliche Spur in dem weiten Busen der Natur. Keine Idee reicht an die Ausdehnung ihrer Räume. Wir haben unsere Begriffe gut aufblasen, wir schaffen doch nur Atome gegenüber den wirklichen Dingen. Es ist eine unendliche Sphäre, deren Centrum überall, deren Peripherie nirgends ist.

Endlich ist es eins der größten deutlichen Kennzeichen der Allmacht Gottes, daß unsere Phantasie sich in diesem Gedanken verliert.

In sich zurückgekehrt, betrachte der Mensch, was er ist im Verhältnis zu dem, was ist; er erkenne sich als verirrt in diesem abgelegenen Bezirk der Natur; und darnach wie ihm dieser kleine Kerker, in welchem er wohnt, d. h. diese sichtbare Welt erscheint, lerne er die Erde, die Königreiche, die Städte, sich selbst, seinen wahren Werth schätzen.

Was ist der Mensch im Unendlichen? Wer kann es begreifen? Aber um ihm ein anderes ebenso erstaunliches Wunder zu zeigen, forsche er in den kleinsten Dingen, die er kennt. Ein Milbe z. B. biete ihm in der Winzigkeit ihres Körpers Theile unvergleichlich viel winziger, Beine mit Bändern, Adern in diesen Beinen, Blut in diesen Adern, Feuchtigkeit in diesem Blut, Tropfen in dieser Feuchtigkeit, Dämpfe in diesen Tropfen; er erschöpfe, indem er auch diese letzten Dinge noch theilt, all' seine Begriffskräfte, und der letzte Gegenstand, zu dem er gelangen kann, sei jetzt der unserer Betrachtung. Er denkt vielleicht, dies sei die äußerste Kleinheit der Natur. Ich will ihn darin einen neuen Abgrund sehen lassen. Ich will ihm nicht nur das sichtbare Universum, sondern auch alles, was er von der Unendlichkeit der Natur zu begreifen fähig ist, in dem Umkreis dieses unsichtbaren Atoms ausmalen. Er erblicke darin eine Unendlichkeit von Welten, deren jede ihr Firmament, ihre Planeten, ihre Erde hat in demselben Verhältnis, wie die sichtbare Welt; auf dieser Erde Thiere, schließlich auch wieder Milben, an denen er wieder findet, was er an den ersten gesehen, und noch an diesen anderen findet er wieder dasselbe, ohne Ende und Ruhe. Er verliere sich in diesen Wundern, die vermöge ihrer Kleinheit eben so erstaunlich, als die andern vermöge ihrer Größe. Denn wer wird nicht bewundern, daß unser Körper eben noch nicht wahrnehmbar im Universum, das seinerseits nicht wahrnehmbar im Busen des All, jetzt ein Koloß, eine Welt, ja vielmehr ein All ist gegenüber der äußersten Kleinheit, zu der man nicht gelangen kann?

Wer sich so betrachtet, wird ohne Zweifel erschrecken, sich in der Masse, die ihm die Natur gegeben, gleichsam schweben zu sehen zwischen den beiden Abgründen der Unendlichkeit und des Nichts, von welchen beiden er gleichweit entfernt ist. Er wird erzittern in der Erkenntnis dieser Wunder; und ich glaube, seine Neugier wird sich in Bewunderung wandeln und er wird geneigter sein, sie mit Schweigen zu beschauen, als mit Anmaßung zu erforschen.

Denn was ist schließlich der Mensch in der Natur? Ein Nichts gegenüber der Unendlichkeit, ein All gegenüber dem Nichts, ein Mittelding zwischen Nichts und Allem. Er ist von beiden Extremen unendlich entfernt, und sein Dasein ist nicht weniger weit vom Nichts, aus dem er hervorgegangen, als vom Unendlichen in das er verschlungen ist.

Seine Urtheilskraft nimmt in der Reihe der intelligiblen Dinge denselben Platz ein, wie sein Körper in der Ausdehnung der Natur; und alles, was er vermag, ist, einen gewissen Schein von der Mitte der Dinge zu begreifen, während er auf ewig daran verzweifeln muß, ihren Anfang und ihr Ende zu erkennen. Alle Dinge kommen aus dem Nichts und gehen zur Unendlichkeit. Wer vermag solchen erstaunlichen Schritten zu folgen? Der Schöpfer dieser Wunder begreift sie; kein anderer ist dessen fähig.

Dieser Zustand, der die Mitte hält zwischen den Extremen, kehrt in all' unsern Fähigkeiten wieder. Unsere Sinne empfinden kein Extrem. Zuviel Geräusch betäubt uns, zuviel Licht blendet uns, zu große Entfernung und zu große Nähe hindert das Sehen, zu große Länge und zu große Kürze verdunkeln eine Rede, zu viel Vergnügen belästigt, zu viel Gleichklang mißfällt. Wir spüren weder die äußerste Wärme noch die äußerste Kälte. Die extremen Eigenschaften sind unsere Feinde, und nicht empfindbar. Wir empfinden sie nicht mehr, wir erleiden sie. Zu große Jugend und zu großes Alter hindern den Geist; zu viel und zu wenig Nahrung bringt seine Thätigkeit in Unordnung; zu viel und zu wenig Unterricht verdummt ihn. Die extremen Dinge sind für uns als ob sie nicht wären, und wir sind nicht in ihrem Betracht. Sie entgehen uns oder wir ihnen.

Das ist unser wahrer Zustand. Das engt unser Erkennen ein in bestimmte Grenzen, die wir nicht überschreiten, unfähig alles zu wissen und alles absolut zu ignoriren. Wir befinden uns auf einer weiten Mitte; stets unsicher schwankend zwischen Unwissenheit und Erkenntnis; und wenn wir denken weiter vorwärts zu schreiten, so schwankt und entschlüpft unser Gegenstand unseren Händen; er verbirgt sich und flieht ewigliche Flucht: nichts kann ihn aushalten. Das ist unsere natürliche Lage und doch ist sie die unserer Neigung am meisten widersprechende. Wir brennen vor Begier, alles zu ergründen und einen Thurm zu erbauen, der bis in die Unendlichkeit reicht. Aber unser ganzes Gebäude kracht und die Erde öffnet sich bis in die Tiefen.`,
    pullquote: 'Ein Nichts gegenüber der Unendlichkeit, ein All gegenüber dem Nichts, ein Mittelding zwischen Nichts und Allem.',
    author: 'Blaise Pascal',
    source: 'Gedanken (Pensées), Kapitel 6',
    url: 'https://projekt-gutenberg.org/authors/blaise-pascal/books/gedanken/chapter/6/',
    kat: '(Un-)Endlichkeit',
    portrait: 'pascal'
  },

  // ── Nietzsche ───────────────────────────────────────────────
  {
    text: `Habt ihr nicht von jenem tollen Menschen gehört, der am hellen Vormittage eine Laterne anzündete, auf den Markt lief und unaufhörlich schrie: „Ich suche Gott! Ich suche Gott!" — Da dort gerade viele von Denen zusammenstanden, welche nicht an Gott glaubten, so erregte er ein großes Gelächter. Ist er denn verloren gegangen? Sagte der Eine. Hat er sich verlaufen wie ein Kind? Sagte der Andere. Oder hält er sich versteckt? Fürchtet er sich vor uns? Ist er zu Schiff gegangen? Ausgewandert? — so schrien und lachten sie durcheinander. Der tolle Mensch sprang mitten unter sie und durchbohrte sie mit seinen Blicken. „Wohin ist Gott? Rief er, ich will es euch sagen! Wir haben ihn getötet, — ihr und ich! Wir alle sind seine Mörder! Aber wie haben wir dies gemacht? Wie vermochten wir das Meer auszutrinken? Wer gab uns den Schwamm, um den ganzen Horizont wegzuwischen? Was taten wir, als wir diese Erde von ihrer Sonne losketteten? Wohin bewegt sie sich nun? Wohin bewegen wir uns? Fort von allen Sonnen? Stürzen wir nicht fortwährend? Und rückwärts, vorwärts, nach allen Seiten? Gibt es noch ein Oben und ein Unten? Irren wir nicht wie durch ein unendliches Nichts? Haucht uns nicht der leere Raum an? Ist es nicht kälter geworden? Kommt nicht immerfort die Nacht und mehr Nacht? Müssen nicht Laternen am Vormittage angezündet werden? Hören wir noch Nichts von dem Lärm der Totengräber, welche Gott begraben? Riechen wir noch Nichts von der göttlichen Verwesung? — auch Götter verwesen! Gott ist tot! Gott bleibt tot! Und wir haben ihn getötet! Wie trösten wir uns, die Mörder aller Mörder? Das Heiligste und Mächtigste, was die Welt bisher besaß, es ist unter unseren Messern verblutet, — wer wischt dies Blut von uns ab? Mit welchem Wasser könnten wir uns reinigen? Welche Sühnfeiern, welche heiligen Spiele werden wir erfinden müssen? Ist nicht die Größe dieser Tat zu groß für uns? Müssen wir nicht selber zu Göttern werden, um nur ihrer würdig zu erscheinen? Es gab nie eine größere Tat, — und wer nur immer nach uns geboren wird, gehört um dieser Tat willen in eine höhere Geschichte, als alle Geschichte bisher war!" — Hier schwieg der tolle Mensch und sah wieder seine Zuhörer an: auch sie schwiegen und blickten befremdet auf ihn. Endlich warf er seine Laterne auf den Boden, dass sie in Stücke sprang und erlosch. „Ich komme zu früh, sagte er dann, ich bin noch nicht an der Zeit. Dies ungeheure Ereignis ist noch unterwegs und wandert, — es ist noch nicht bis zu den Ohren der Menschen gedrungen. Blitz und Donner brauchen Zeit, das Licht der Gestirne braucht Zeit, Taten brauchen Zeit, auch nachdem sie getan sind, um gesehen und gehört zu werden. Die Tat ist ihnen immer noch ferner, als die fernsten Gestirne, — und doch haben sie dieselbe getan!" — Man erzählt noch, dass der tolle Mensch des selbigen Tages in verschiedene Kirchen eingedrungen sei und darin sein Requiem aeternam deo angestimmt habe. Hinausgeführt und zur Rede gesetzt, habe er immer nur dies entgegnet: „Was sind denn diese Kirchen noch, wenn sie nicht die Grüfte und Grabmäler Gottes sind?"`,
    pullquote: 'Gott ist tot! Gott bleibt tot! Und wir haben ihn getötet!',
    author: 'Friedrich Nietzsche',
    source: 'Die fröhliche Wissenschaft (1882), KSA Band 3, S. 480–482',
    url: 'https://www.projekt-gutenberg.org/nietzsch/froehl/froehl.html',
    kat: 'Metaphysik',
    portrait: 'nietzsche'
  },

  // ── Kierkegaard ─────────────────────────────────────────────
  {
    text: `Man steckt den Finger in die Erde, um zu riechen, in welchem Land man ist, ich stecke den Finger ins Dasein – es riecht nach nichts. Wo bin ich? Was heißt das: die Welt? Was bedeutet dieses Wort? Wer hat mich durch seine Tricks in die ganze Sache hereingezogen und lässt mich nun damit allein? Wer bin ich? Wie bin ich in die Welt hineingekommen; warum wurde ich nicht gefragt, warum nicht mit Sitten und Gebräuchen bekanntgemacht, sondern in Reih und Glied gesteckt, als wäre ich von einem Seelenverkäufer gekauft? Wie wurde ich Teilhaber an dem großen Unternehmen, das man die Wirklichkeit nennt? Warum soll ich Teilhaber sein? Ist einem das nicht freigestellt? Und wenn ich dazu gezwungen werden soll, wo ist dann der Diskussionsleiter, ich habe einen Einwand zu machen? Gibt es keinen Diskussionsleiter? Wohin soll ich mich mit meiner Klage wenden? Das Dasein ist ja eine Debatte, darf ich bitten, dass meine Überlegungen mit in Erwägung gezogen werden? Soll man das Dasein nehmen, wie es ist, wäre es dann nicht das beste, dass man erführe, wie es ist?`,
    pullquote: 'Ich stecke den Finger ins Dasein – es riecht nach nichts.',
    author: 'Søren Kierkegaard',
    source: 'Die Wiederholung',
    kat: 'Existenz',
    portrait: 'kierkegaard'
  },

  // ── Michael Ende — Momo ─────────────────────────────────────
  {
    text: `Was die kleine Momo konnte wie kein anderer, das war: zuhören. Das ist nichts Besonderes, wird nun vielleicht mancher Leser sagen, zuhören kann doch jeder. Aber das ist ein Irrtum. Wirklich zuhören können nur ganz wenige Menschen. Und so wie Momo sich aufs Zuhören verstand, war es ganz und gar einmalig.

Momo konnte so zuhören, dass dummen Leuten plötzlich sehr gescheite Gedanken kamen. Nicht etwa, weil sie etwas sagte oder fragte, was den anderen auf solche Gedanken brachte, nein, sie saß nur da und hörte einfach zu, mit aller Aufmerksamkeit und Anteilnahme. Dabei schaute sie den anderen mit ihren großen, dunklen Augen an und der Betreffende fühlte, wie in ihm auf einmal Gedanken auftauchten, von denen er nie geahnt hatte, dass sie in ihm steckten.

Sie konnte so zuhören, dass rastlose oder unentschlossene Leute auf einmal ganz genau wussten, was sie wollten. Oder dass Schüchterne sich plötzlich frei und mutig fühlten. Oder dass Unglückliche und Bedrückte zuversichtlich und froh wurden. Und wenn jemand meinte, sein Leben sei ganz verfehlt und bedeutungslos und er selbst nur irgendeiner unter Millionen, einer, auf den es überhaupt nicht ankommt und der ebenso schnell ersetzt werden kann wie ein kaputter Topf – und er ging hin und erzählte alles das der kleinen Momo, dann wurde ihm, noch während er redete, auf geheimnisvolle Weise klar, dass er sich gründlich irrte, dass es ihn, genauso wie er war, unter allen Menschen nur ein einziges Mal gab und dass er deshalb auf seine besondere Weise für die Welt wichtig war. So konnte Momo zuhören!`,
    pullquote: 'Wirklich zuhören können nur ganz wenige Menschen.',
    author: 'Michael Ende',
    source: 'Momo',
    kat: 'Literatur',
    portrait: 'momo'
  },

  // ── Immanuel Kant ───────────────────────────────────────────
  {
    text: 'Die menschliche Vernunft hat das besondere Schicksal in einer Gattung ihrer Erkenntnisse: daß sie durch Fragen belästigt wird, die sie nicht abweisen kann; denn sie sind ihr durch die Natur der Vernunft selbst aufgegeben, die sie aber auch nicht beantworten kann; denn sie übersteigen alles Vermögen der menschlichen Vernunft.',
    author: 'Immanuel Kant',
    source: 'Kritik der reinen Vernunft, Vorrede zur 1. Auflage (A VII)',
    url: 'https://www.projekt-gutenberg.org/kant/krva/krva001.html',
    kat: 'Metaphysik',
    portrait: 'kant'
  },
  // ── Heraklit (mit griechischem Original) ────────────────────
  {
    text: 'Die Grenzen der Seele wirst du nicht finden, auch wenn du jeden Weg abschreitest; so tiefen Logos hat sie.',
    original: 'ψυχῆς πείρατα ἰὼν οὐκ ἂν ἐξεύροιο, πᾶσαν ἐπιπορευόμενος ὁδόν· οὕτω βαθὺν λόγον ἔχει.',
    author: 'Heraklit',
    source: 'Fragment DK 22 B 45 (Diog. Laert. IX,7)',
    url: 'https://de.wikipedia.org/wiki/Heraklit',
    kat: 'Antike',
    portrait: 'heraklit'
  },
  // ── Aristoteles über Thales ─────────────────────────────────
  {
    text: 'Die meisten, die zuerst philosophierten, meinten, die Prinzipien aller Dinge seien nur stofflicher Natur; denn woraus alles Seiende ist und woraus es zuerst entsteht und worin es zuletzt vergeht, während die Substanz bestehen bleibt, das nennen sie das Element und das Prinzip der Dinge … und Thales, der Begründer dieser Art von Philosophie, sagt, es sei das Wasser.',
    author: 'Aristoteles',
    source: 'Metaphysik I 3, 983b — über Thales (Übers. Bonitz)',
    url: 'http://www.zeno.org/Philosophie/M/Aristoteles/Metaphysik/Erste+Abteilung.+Die+Hauptst%C3%BCcke/Einleitung/II.+Die+Lehre+von+den+Prinzipien+bei+den+Fr%C3%BCheren/A:+Die+%C3%A4lteren+Philosophen',
    kat: 'Antike',
    portrait: 'aristoteles'
  },
  // ── David Hume ──────────────────────────────────────────────
  {
    text: 'Let all the powers and elements of nature conspire to serve and obey one man: Let the sun rise and set at his command, the sea and rivers roll as he pleases, and the earth furnish spontaneously whatever may be useful or agreeable to him: He will still be miserable, till you give him some one person at least, with whom he may share his happiness, and whose esteem and friendship he may enjoy.',
    author: 'David Hume',
    source: 'A Treatise of Human Nature, II.2.5',
    url: 'https://davidhume.org/texts/t/2/2/5',
    kat: 'Freundschaft',
    portrait: 'hume'
  },
  // ── Yann Martel (Signaturzeile; Volltext bewusst nicht eingebettet) ──
  {
    text: "I must say a word about fear. It is life's only true opponent. Only fear can defeat life. It is a clever, treacherous adversary, how well I know. It has no decency, respects no law or convention, shows no mercy. It goes for your weakest spot, which it finds with unnerving ease. It begins in your mind, always ... so you must fight hard to express it. You must fight hard to shine the light of words upon it. Because if you don't, if your fear becomes a wordless darkness that you avoid, perhaps even manage to forget, you open yourself to further attacks of fear because you never truly fought the opponent who defeated you.",
    author: 'Yann Martel',
    source: 'Schiffbruch mit Tiger (Life of Pi)',
    url: 'https://www.goodreads.com/quotes/46179-i-must-say-a-word-about-fear-it-is-life-s',
    kat: 'Literatur',
    portrait: 'yann-martel'
  },
  // ── Erich Kästner ───────────────────────────────────────────
  {
    text: 'Es gibt nichts Gutes, außer: man tut es.',
    author: 'Erich Kästner',
    source: 'Kurz und bündig',
    url: 'https://books.google.at/books?id=zRZcAAAAMAAJ&q=%22es+gibt+nichts+Gutes%22',
    kat: 'Lebenskunst',
    portrait: 'erich-kaestner'
  },

  // ── Charles Darwin ──────────────────────────────────────────
  {
    text: 'Abstammung des Menschen jetzt bewiesen … Wer den Pavian versteht, würde mehr zur Metaphysik beitragen als John Locke.',
    pullquote: 'Wer den Pavian versteht, würde mehr zur Metaphysik beitragen als John Locke.',
    author: 'Charles Darwin',
    source: 'Zitiert nach Ian McEwan: Erkenntnis und Schönheit, Diogenes 2020, S. 81',
    kat: 'Metaphysik'
  },
];


// ════════════════════════════════════════════════
// ════════════════════════════════════════════════


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
/* Kurse, zu denen eine eigene Hausarbeit existiert. Klein und von Hand gepflegt
   (nur 4 Einträge), unabhängig von kurseData/documents.json. Steuert, ob das
   kleine Verweis-Badge in der Kursliste erscheint. Die Zuordnung selbst (welches
   Dokument zu welchem Kurs gehört) lebt in daten/documents-meta.json — hier
   wird nur gewusst, WELCHE Kursnamen einen Treffer haben. */
const KURS_HAS_WORK = new Set([
  'Theorien des objektiven Geistes',
  'Philosophie der Langeweile',
  'Der späte Schelling in seiner Zeit',
  'Martin Heidegger, Sein und Zeit 2',
]);

/* Sprung von hier (Studium) zur Seite "Eigene Arbeiten": navigiert dorthin und
   hebt dort die passende Zeile hervor (siehe pages/arbeiten.html, das dortige
   Skript liest window.__pendingHighlightCourse beim Rendern aus). */
window.jumpToDoc = function(courseName) {
  window.__pendingHighlightCourse = courseName;
  showPage('arbeiten');
};

/* Sprung von der Seite "Eigene Arbeiten" zum zugehörigen Kurs
   hier auf der Studium-Seite: navigiert hin, klappt das richtige Semester auf
   und scrollt zur Zeile. Pollt kurz, da showPage() den Seiten-Init asynchron
   mit kleiner Verzögerung ausführt (kein zuverlässiges await möglich). */
window.jumpToKurs = function(courseName) {
  showPage('studium');
  let tries = 0;
  (function tryFind(){
    tries++;
    const k = (typeof kurseData !== 'undefined') ? kurseData.find(x => x.name === courseName) : null;
    const list = document.getElementById('kurs-list');
    if (k && list && list.children.length) {
      const key = k.semNr + '|' + k.sem;
      if (!openSems.has(key)) { openSems.add(key); renderKurse(); }
      requestAnimationFrame(() => {
        const cells = document.querySelectorAll('#kurs-list td');
        for (const c of cells) {
          if (c.textContent.indexOf(courseName) === 0) {
            const row = c.closest('tr');
            if (row) {
              row.scrollIntoView({ behavior: 'smooth', block: 'center' });
              row.classList.add('kurs-row-flash');
              setTimeout(() => row.classList.remove('kurs-row-flash'), 2200);
            }
            break;
          }
        }
      });
      return;
    }
    if (tries < 25) setTimeout(tryFind, 50);   /* bis zu ~1,25s warten */
  })();
};

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
        +'<td>'+k.name+(KURS_HAS_WORK.has(k.name)?' <button type="button" class="kurs-pdf-link nur-arbeiten" onclick="jumpToDoc(\''+k.name.replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\')" title="Eigene Hausarbeit zu diesem Kurs ansehen">📄 Hausarbeit</button>':'')+'</td>'
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
// PAGE INIT REGISTRATIONS
// Called by nav.js on every page visit — no caching
// ════════════════════════════════════════════════
// Register inits IMMEDIATELY (not in DOMContentLoaded) to avoid race condition
// where nav.js may call _pageInits[id] before they're registered
if (typeof registerPageInit === 'function') {
  registerPageInit('favphil',    function() { renderFavphil(); });
  registerPageInit('zitate',     function() { renderZitate(); });
  /* Die Timeline startet sich selbst ueber init() am Ende ihres Skriptblocks.
     Hier nur nachziehen, was vom Zustand abhaengt. buildPhil() gehoert NICHT
     hierher — das ist die Funktion der Lieblingsphilosophen-Seite. */
  registerPageInit('philosophy', function() {
    setTimeout(function(){ try{ tlKreisLeiste(); }catch(e){} try{ tlkMarken(); }catch(e){} }, 0);
  });
  registerPageInit('buecher',    function() { renderBuecher(); });
  registerPageInit('nature',     function() { renderNature(); });
  registerPageInit('studium',    function() { buildFachFilter(); renderKurse(); });
  // podcasts and gaming are self-contained in their own page HTML
} else {
  /* Fallback if registerPageInit isn't defined yet — defer to DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function() {
    registerPageInit('favphil',    function() { renderFavphil(); });
    registerPageInit('zitate',     function() { renderZitate(); });
    registerPageInit('philosophy', function() {
      setTimeout(function(){ try{ tlKreisLeiste(); }catch(e){} try{ tlkMarken(); }catch(e){} }, 0);
    });
    registerPageInit('buecher',    function() { renderBuecher(); });
    registerPageInit('nature',     function() { renderNature(); });
    registerPageInit('studium',    function() { buildFachFilter(); renderKurse(); });
  });
}
