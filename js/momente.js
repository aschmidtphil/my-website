/* Statisches Statusarchiv: keine externen Dienste, keine Metadaten-Auswertung. */
(function(){
  'use strict';
  let archive, dialog, media, frame, statusIndex=0, itemIndex=0, elapsed=0, last=0;
  let paused=false, ready=false, muted=true, opener, previousOverflow, generation=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const date=s=>new Intl.DateTimeFormat('de-DE',{dateStyle:'long',timeZone:'UTC'}).format(new Date(s));
  const item=()=>archive.statuses[statusIndex].items[itemIndex];
  // Eine Audioinstanz; der Nutzerwunsch bleibt unabhängig von Videounterbrechungen.
  const music=new Audio();music.preload='none';music.volume=.3;
  const songs=(window.MOMENTE_SONGS||[]).filter(s=>s.title&&typeof s.src==='string'&&/^assets\/audio\/momente\/[\w./-]+\.mp3$/.test(s.src)&&!s.src.includes('..'));
  let musicPanel, musicIndex=0, musicWanted=false, musicError='', musicAttempt=0, videoClaim=false;
  function videoHasSound(){return Boolean(dialog&&media&&media.tagName==='VIDEO'&&!muted&&!media.muted&&!media.ended&&!paused&&(videoClaim||!media.paused));}
  function musicUI(){
    if(!musicPanel)return;
    const song=songs[musicIndex];
    musicPanel.querySelector('#music-current').textContent=song?song.title:'Keine Musik hinterlegt';
    const play=musicPanel.querySelector('#music-play');
    play.textContent=musicWanted?'Musik pausieren':'Musik abspielen';play.setAttribute('aria-pressed',String(musicWanted));play.disabled=!song;
    musicPanel.querySelector('#music-select').value=String(musicIndex);
    musicPanel.querySelector('#music-mute').textContent=music.muted?'Stummschaltung aufheben':'Stummschalten';
    musicPanel.querySelector('#music-mute').setAttribute('aria-pressed',String(music.muted));
    musicPanel.querySelector('#music-state').textContent=musicError||(musicWanted?(document.hidden?'Musik pausiert im Hintergrund':videoHasSound()?'Musik pausiert während Videoton':music.paused?'Musik wird geladen …':'Musik läuft'):'Musik aus / pausiert');
    musicPanel.querySelector('#music-state').title=musicPanel.querySelector('#music-state').textContent;
  }
  function syncMusic(){
    const allowed=dialog&&musicWanted&&songs.length&&!document.hidden&&!videoHasSound();
    if(!allowed){musicAttempt++;music.pause();musicUI();return;}
    if(!music.getAttribute('src'))music.src=songs[musicIndex].src;
    if(music.paused){
      const attempt=++musicAttempt;
      music.play().then(()=>{if(attempt===musicAttempt)musicUI();}).catch(error=>{
        if(attempt!==musicAttempt||error.name==='AbortError')return;
        musicWanted=false;musicError='Musik konnte nicht gestartet werden. Bitte erneut abspielen.';musicUI();
      });
    }
    musicUI();
  }
  function selectSong(index,activate=false){
    if(!songs.length)return;
    if(activate)musicWanted=true;
    musicAttempt++;music.pause();musicIndex=(index+songs.length)%songs.length;musicError='';
    music.removeAttribute('src');music.load();syncMusic();
  }
  function disableMusic(){musicWanted=false;musicAttempt++;music.pause();music.removeAttribute('src');music.load();musicError='';musicUI();}
  function mountMusic(){
    if(!musicPanel){
      musicPanel=el('section');musicPanel.id='momente-music';musicPanel.setAttribute('aria-label','Hintergrundmusik');
      musicPanel.innerHTML='<div><strong>Hintergrundmusik</strong><button type="button" id="music-collapse" title="Musikplayer einklappen" aria-label="Musikplayer einklappen">✕</button></div><span id="music-current"></span><div><button type="button" id="music-prev" title="Vorheriger Song" aria-label="Vorheriger Song">‹</button><label for="music-select">Song</label><select id="music-select"></select><button type="button" id="music-next" title="Nächster Song" aria-label="Nächster Song">›</button></div><div><button type="button" id="music-play">Musik abspielen</button><button type="button" id="music-off">Ausschalten</button></div><div><label for="music-volume">Lautstärke</label><input id="music-volume" type="range" min="0" max="100" value="30"><button type="button" id="music-mute">Stummschalten</button></div><label><input type="checkbox" id="music-auto" checked> Nächsten Song automatisch abspielen</label><small id="music-state" role="status"></small>';
      const select=musicPanel.querySelector('#music-select');
      songs.forEach((song,index)=>{const option=el('option','',song.title);option.value=index;select.append(option);});
      musicPanel.querySelector('#music-play').onclick=()=>{musicWanted=!musicWanted;musicError='';syncMusic();};
      musicPanel.querySelector('#music-off').onclick=disableMusic;
      select.onchange=()=>selectSong(Number(select.value),true);
      musicPanel.querySelector('#music-prev').onclick=()=>selectSong(musicIndex-1,true);
      musicPanel.querySelector('#music-next').onclick=()=>selectSong(musicIndex+1,true);
      musicPanel.querySelector('#music-collapse').onclick=()=>setMusicOpen(false);
      musicPanel.querySelector('#music-volume').oninput=e=>{music.volume=Number(e.target.value)/100;musicUI();};
      musicPanel.querySelector('#music-mute').onclick=()=>{music.muted=!music.muted;musicUI();};
      ['music-prev','music-next','music-select'].forEach(id=>{musicPanel.querySelector('#'+id).disabled=songs.length<2;});
    }
    musicPanel.hidden=true;musicUI();
  }
  function setMusicOpen(expanded){
    if(!dialog)return;
    musicPanel.hidden=!expanded;
    const button=dialog.querySelector('#music-toggle');
    button.setAttribute('aria-expanded',String(expanded));
    button.title=expanded?'Musikplayer einklappen':'Musikplayer öffnen';button.setAttribute('aria-label',button.title);
    if(!expanded&&musicPanel.contains(document.activeElement))button.focus();
  }
  music.addEventListener('playing',musicUI);
  music.addEventListener('error',()=>{if(!music.getAttribute('src'))return;musicWanted=false;musicAttempt++;music.pause();music.removeAttribute('src');music.load();musicError='Audiodatei nicht verfügbar. Bitte einen anderen Song wählen oder erneut versuchen.';musicUI();});
  music.addEventListener('ended',()=>{
    if(musicWanted&&musicPanel.querySelector('#music-auto').checked)selectSong(musicIndex+1);
    else{musicWanted=false;musicUI();}
  });
  function localPath(s){return typeof s==='string'&&/^assets\/momente\/[\w./-]+$/.test(s)&&!s.includes('..');}
  function safeExternalUrl(s){try{return typeof s==='string'&&new URL(s).protocol==='https:';}catch{return false;}}
  function validate(data){
    if(data.schemaVersion!==1||!Array.isArray(data.statuses))throw Error('Unbekanntes Datenformat');
    const ids=new Set();
    data.statuses.forEach(s=>{
      if(!s.id||ids.has(s.id)||!s.title||!/^\d{4}-\d{2}-\d{2}$/.test(s.publishedAt)||!Number.isFinite(Date.parse(s.publishedAt))||!localPath(s.cover)||!Array.isArray(s.items)||!s.items.length)throw Error('Ungültige Statusmeldung');
      ids.add(s.id);
      s.items.forEach(i=>{if(!['image','video'].includes(i.type)||!localPath(i.src)|| (i.duration!==undefined&&(!Number.isFinite(i.duration)||i.duration<=0))||(i.externalUrl!==undefined&&!safeExternalUrl(i.externalUrl))||(i.externalOnly!==undefined&&(typeof i.externalOnly!=='boolean'||!i.externalUrl)))throw Error('Ungültiges Medienelement');});
    });
    data.statuses.sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));return data;
  }
  async function renderNature(){
    const grid=document.getElementById('momente-grid');if(!grid)return;
    const message=document.getElementById('momente-state');
    try{
      if(!archive){
        if(location.protocol==='file:'){
          if(!window.MOMENTE_DATA)throw Error('Lokaler Datenspiegel fehlt');
          archive=validate(structuredClone(window.MOMENTE_DATA));
        }else{
          const r=await fetch('daten/momente.json');if(!r.ok)throw Error('HTTP '+r.status);archive=validate(await r.json());
        }
      }
      if(!grid.isConnected)return;
      grid.replaceChildren();message.textContent=archive.statuses.length?(archive.statuses.every(s=>s.demo)?'Demo-Archiv · Die folgenden Medien und Texte sind reine Funktionsbeispiele.':'Archivierte Statusmeldungen · Neueste zuerst.'):'Noch keine Momente archiviert.';
      archive.statuses.forEach((s,index)=>{
        const card=el('button','momente-card');card.type='button';
        const img=el('img');img.src=s.cover;img.alt=s.coverAlt||'';img.loading='lazy';
        const body=el('span','momente-card-body');
        if(s.demo)body.append(el('small','','DEMO · Keine persönliche Statusmeldung'));
        body.append(el('strong','',s.title),el('small','',date(s.publishedAt)+' · '+s.items.length+' Elemente'));
        if(s.description)body.append(el('span','',s.description));card.append(img,body);card.onclick=()=>open(index,card);grid.append(card);
      });
    }catch(e){message.textContent='Das Archiv konnte nicht geladen werden. Bitte daten/momente.json prüfen und die Datenspiegel mit scripts/spiegel-synchronisieren.py aktualisieren.';console.warn('Momente:',e.message);}
  }
  function open(index,card){
    if(dialog)close();opener=card;statusIndex=index;itemIndex=0;paused=reduced.matches;
    dialog=el('dialog','momente-viewer');dialog.setAttribute('aria-label','Momente – Status-Viewer');
    dialog.innerHTML='<div class="momente-shell"><div class="momente-progress" aria-hidden="true"></div><div class="momente-toolbar"><div class="momente-heading" aria-live="polite"></div><button type="button" data-action="close" title="Viewer schließen" aria-label="Viewer schließen">✕</button></div><div class="momente-stage"><button type="button" class="momente-arrow momente-prev" data-action="prev" aria-label="Vorheriges Element">‹</button><button type="button" class="momente-arrow momente-next" data-action="next" aria-label="Nächstes Element">›</button></div><div class="momente-caption" tabindex="0" aria-label="Bildunterschrift"></div><div id="momente-controls" role="group" aria-label="Medienwiedergabe"><button type="button" data-action="pause"></button><button type="button" data-action="sound"></button><button type="button" id="music-toggle" aria-controls="momente-music" aria-expanded="false" aria-label="Musikplayer öffnen" title="Musikplayer öffnen">♪</button></div><div class="momente-meta"></div><div class="momente-help">Links / rechts: wechseln · Leertaste: Pause · Escape: schließen</div></div>';
    // Bild und Text bilden gemeinsam den Lesebereich; der Text verdeckt keine Medien.
    const content=el('div','momente-content');
    const shell=dialog.querySelector('.momente-shell'),initialStage=dialog.querySelector('.momente-stage');
    shell.insertBefore(content,initialStage);content.append(initialStage,dialog.querySelector('.momente-caption'));
    mountMusic();dialog.querySelector('#momente-controls').append(musicPanel);
    dialog.querySelector('#music-toggle').onclick=()=>setMusicOpen(musicPanel.hidden);
    document.body.append(dialog);previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
    dialog.addEventListener('keydown',e=>{if(e.key==='Escape'&&!musicPanel.hidden){e.preventDefault();e.stopPropagation();setMusicOpen(false);return;}if(e.target.closest('input,select,summary,#momente-music'))return;if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}if(e.code==='Space'&&!e.target.closest('button,a')){e.preventDefault();toggle();}});
    dialog.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action;if(a==='close')close();else if(a==='pause')toggle();else if(a==='sound'){muted=!muted;if(media&&media.tagName==='VIDEO'){if(!muted){videoClaim=!paused;syncMusic();}media.muted=muted;}syncMusic();buttons();}else step(a==='next'?1:-1);});
    const stage=dialog.querySelector('.momente-stage');let touch;
    stage.addEventListener('touchstart',e=>{touch={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
    stage.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)){e.preventDefault();step(dx<0?1:-1);}touch=null;},{passive:false});
    stage.onclick=e=>{if(e.target.closest('button,a,.momente-caption'))return;step(e.clientX<stage.getBoundingClientRect().left+stage.clientWidth/2?-1:1);};
    dialog.showModal();show();dialog.querySelector('[data-action="close"]').focus();
  }
  function buttons(){
    if(!dialog)return;
    const video=media&&media.tagName==='VIDEO',p=dialog.querySelector('[data-action="pause"]');
    p.textContent=paused?'▶':'Ⅱ';p.setAttribute('aria-pressed',String(paused));
    p.title=(video?'Video':'Statusfolge')+(paused?' fortsetzen':' pausieren');p.setAttribute('aria-label',p.title);
    const s=dialog.querySelector('[data-action="sound"]');
    if(!video&&document.activeElement===s)p.focus();
    s.hidden=!video;s.disabled=!video;
    s.textContent=muted?'🔇':'🔊';s.title=muted?'Videoton einschalten':'Videoton ausschalten';s.setAttribute('aria-label',s.title);s.setAttribute('aria-pressed',String(!muted));
    // Native Video-Steuerung bleibt aus: Pause und Ton gibt es genau einmal in dieser Leiste.
  }
  function stopMedia(){cancelAnimationFrame(frame);videoClaim=false;if(media){if(media.tagName==='VIDEO'){media.onpause=media.onplay=media.onended=media.onplaying=media.onwaiting=null;media.pause();media.removeAttribute('src');media.load();}media.remove();media=null;}}
  function close(){if(!dialog)return;generation++;stopMedia();musicWanted=false;musicPanel.remove();dialog.close();dialog.remove();dialog=null;syncMusic();document.body.style.overflow=previousOverflow;if(opener&&opener.isConnected)opener.focus();}
  function setCaption(element,text,externalUrl,externalLabel){
    element.replaceChildren();
    String(text).split(/(🇯🇵)/u).forEach(teil=>{
      if(teil==='🇯🇵'){
        const flagge=el('span','momente-flag momente-flag-jp',teil);
        flagge.setAttribute('role','img');flagge.setAttribute('aria-label','Flagge Japans');element.append(flagge);
      }else if(teil)element.append(document.createTextNode(teil));
    });
    if(externalUrl){
      const link=el('a','momente-external-link',externalLabel||'Externen Link öffnen');
      link.href=externalUrl;link.target='_blank';link.rel='noopener noreferrer';element.append(link);
    }
  }
  function show(){
    stopMedia();const token=++generation;elapsed=0;last=0;ready=false;
    const s=archive.statuses[statusIndex],i=item(),stage=dialog.querySelector('.momente-stage');
    stage.querySelectorAll('.momente-message').forEach(n=>n.remove());
    const progress=dialog.querySelector('.momente-progress');progress.replaceChildren();s.items.forEach((_,n)=>{const segment=el('div','momente-segment');segment.append(el('span'));if(n<itemIndex)segment.firstChild.style.width='100%';progress.append(segment);});
    const heading=dialog.querySelector('.momente-heading');heading.replaceChildren(el('span','',s.title),el('small','',(s.demo?'DEMO · ':'')+date(s.publishedAt)+' · '+(itemIndex+1)+' / '+s.items.length));
    const caption=dialog.querySelector('.momente-caption');setCaption(caption,i.text||'',i.externalOnly?null:i.externalUrl,i.externalLabel);caption.scrollTop=0;
    dialog.querySelector('.momente-meta').textContent=[i.location,i.date?date(i.date):null,i.textIncomplete?'Text in der Bildschirmaufnahme abgeschnitten':null].filter(Boolean).join(' · ');
    if(i.externalOnly){
      media=el('a','momente-link-preview');media.href=i.externalUrl;media.target='_blank';media.rel='noopener noreferrer';media.setAttribute('aria-label',i.externalLabel||'Externen Link öffnen');
      media.append(el('span','momente-link-preview-icon','▶'),el('strong','',i.externalLabel||'Externen Link öffnen'),el('small','','youtube.com'));
      ready=true;stage.prepend(media);syncMusic();buttons();frame=requestAnimationFrame(tick);return;
    }
    media=el(i.type==='video'?'video':'img','momente-media');media.style.objectFit=i.fit==='cover'?'cover':'contain';media.style.objectPosition=i.objectPosition||'center';
    const fail=()=>{if(token!==generation)return;paused=true;videoClaim=false;ready=false;syncMusic();buttons();stage.append(el('div','momente-message','Medium nicht verfügbar. Mit dem Pfeil zum nächsten Element wechseln.'));};
    media.onerror=fail;
    if(i.type==='video'){
      media.setAttribute('aria-label',i.alt||'Statusvideo');
      media.playsInline=true;media.muted=muted;media.preload='metadata';
      media.onloadeddata=()=>{if(token!==generation)return;ready=true;if(!paused)playVideo(token);};
      media.onended=()=>{if(token!==generation)return;videoClaim=false;if(!paused)step(1);else syncMusic();};
      media.onplay=()=>{if(token===generation)syncMusic();};
      media.onpause=()=>{if(token===generation){videoClaim=false;syncMusic();}};
      media.onvolumechange=()=>{if(token===generation)syncMusic();};
      media.onwaiting=()=>{ready=false;};media.onplaying=()=>{ready=true;};
    }else{media.alt=i.alt||'Statusbild';media.onload=()=>{if(token===generation){ready=true;last=0;}};}
    videoClaim=i.type==='video'&&!muted&&!paused;syncMusic();
    media.src=i.src;stage.prepend(media);buttons();frame=requestAnimationFrame(tick);
  }
  function playVideo(token){videoClaim=!muted;syncMusic();const result=media.play();if(result)result.catch(()=>{if(token===generation){paused=true;videoClaim=false;syncMusic();buttons();}});}
  function toggle(){if(!dialog)return;paused=!paused;last=0;if(media.tagName==='VIDEO'){if(paused){videoClaim=false;media.pause();}else playVideo(generation);}syncMusic();buttons();}
  function tick(now){
    if(!dialog)return;const dt=last?now-last:0;last=now;
    if(!paused&&ready){let fraction;if(item().type==='image'){elapsed+=dt;fraction=elapsed/((item().duration||6)*1000);}else fraction=Number.isFinite(media.duration)&&media.duration>0?media.currentTime/media.duration:0;
      dialog.querySelectorAll('.momente-segment span')[itemIndex].style.width=Math.min(100,fraction*100)+'%';if(item().type==='image'&&fraction>=1){step(1);return;}}
    frame=requestAnimationFrame(tick);
  }
  function step(direction){itemIndex+=direction;if(itemIndex<0){if(statusIndex===0){itemIndex=0;show();return;}statusIndex--;itemIndex=archive.statuses[statusIndex].items.length-1;}else if(itemIndex>=archive.statuses[statusIndex].items.length){statusIndex++;if(statusIndex>=archive.statuses.length){close();return;}itemIndex=0;}show();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&dialog&&!paused)toggle();syncMusic();});
  window.addEventListener('hashchange',()=>{if(location.hash.split('/')[0]!=='#nature'){musicWanted=false;close();disableMusic();}});
  window.addEventListener('pagehide',()=>{musicWanted=false;close();disableMusic();});
  window.stopMomente=()=>{musicWanted=false;close();disableMusic();};
  window.renderNature=renderNature;
})();
