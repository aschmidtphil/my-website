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
      +'</div>';
    grid.appendChild(card);
  });
};
// Backward-compat alias
var renderFavphil = window.renderFavphil;

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
// PAGE INIT REGISTRATIONS
// Called by nav.js on every page visit — no caching
// ════════════════════════════════════════════════
// Register inits IMMEDIATELY (not in DOMContentLoaded) to avoid race condition
// where nav.js may call _pageInits[id] before they're registered
if (typeof registerPageInit === 'function') {
  registerPageInit('favphil',    function() { renderFavphil(); });
  registerPageInit('zitate',     function() { renderZitate(); });
  registerPageInit('tshirts',    function() { renderTshirts(); });
  registerPageInit('philosophy', function() { buildPhil(); });
  registerPageInit('buecher',    function() { renderBuecher(); });
  registerPageInit('nature',     function() { renderNature(); });
  registerPageInit('studium',    function() { buildFachFilter(); renderKurse(); });
  registerPageInit('math',       function() { initMath(); });
  // podcasts and gaming are self-contained in their own page HTML
} else {
  /* Fallback if registerPageInit isn't defined yet — defer to DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function() {
    registerPageInit('favphil',    function() { renderFavphil(); });
    registerPageInit('zitate',     function() { renderZitate(); });
    registerPageInit('tshirts',    function() { renderTshirts(); });
    registerPageInit('philosophy', function() { buildPhil(); });
    registerPageInit('buecher',    function() { renderBuecher(); });
    registerPageInit('nature',     function() { renderNature(); });
    registerPageInit('studium',    function() { buildFachFilter(); renderKurse(); });
    registerPageInit('math',       function() { initMath(); });
  });
}