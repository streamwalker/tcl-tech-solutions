(()=>{
 const key='tcl-emblem-intro-v1';let seen=false;try{seen=sessionStorage.getItem(key)==='1'}catch{}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const style=document.createElement('style');style.textContent=`html.reactor-pending{overflow:hidden}.reactor-pending body>*:not(#reactor-intro){visibility:hidden!important}#reactor-intro{position:fixed;inset:0;z-index:2147483000;background:#03080c;display:grid;place-items:center;color:#eaf9ff;font-family:Arial,sans-serif;transition:opacity .6s;max-width:none;max-height:none;width:100%;height:100%;border:0;padding:0;margin:0}#reactor-intro video{position:absolute;width:100%;height:100%;object-fit:contain;background:#03080c}#reactor-intro .reactor-title{position:absolute;bottom:10%;text-align:center;letter-spacing:.28em;font-size:12px;text-shadow:0 2px 14px #000}#reactor-intro small{display:block;margin-top:14px;color:#9eb7bf;letter-spacing:.17em;font-size:9px}#reactor-intro button{position:absolute;right:5%;top:6%;padding:13px 20px;background:#0a171ec9;color:#d6c092;border:1px solid #85734c;font-size:12px;cursor:pointer}#reactor-intro button:focus-visible{outline:2px solid #8beaff;outline-offset:4px}@media(max-width:700px){#reactor-intro video{object-fit:contain}#reactor-intro .reactor-title{bottom:18%;font-size:10px}}`;document.head.append(style);
 let failsafe;
 const clearGate=()=>document.documentElement.classList.remove('reactor-pending');
 if(!seen&&!reduced.matches){document.documentElement.classList.add('reactor-pending');failsafe=setTimeout(clearGate,20000)}
 window.playReactorIntro=()=>{
 if(document.querySelector('#reactor-intro')||reduced.matches){clearGate();return}
 const previous=document.activeElement;const overlay=document.createElement('div');overlay.id='reactor-intro';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','TCL Tech Solutions reactor introduction');overlay.innerHTML='<video muted playsinline preload="auto" poster="./media/reactor-emblem-poster.jpg" aria-label="TCL Tech Solutions emblem surrounded by lightning"></video><button type="button">Skip intro ↗</button>';
 const video=overlay.querySelector('video');video.muted=true;video.src='./media/reactor-emblem-intro.mp4';let closed=false;let timer;
 const finish=()=>{if(closed)return;closed=true;clearTimeout(timer);clearTimeout(failsafe);video.pause();clearGate();overlay.style.opacity='0';overlay.style.pointerEvents='none';document.removeEventListener('keydown',keyboard);setTimeout(()=>overlay.remove(),600);if(previous?.isConnected)previous.focus({preventScroll:true})};
 const keyboard=e=>{if(e.key==='Escape'){e.preventDefault();finish()}if(e.key==='Tab'){e.preventDefault();overlay.querySelector('button').focus()}};
 document.documentElement.classList.add('reactor-pending');document.body.append(overlay);overlay.querySelector('button').onclick=finish;overlay.querySelector('button').focus();document.addEventListener('keydown',keyboard);video.addEventListener('ended',finish,{once:true});video.addEventListener('error',finish,{once:true});timer=setTimeout(finish,20000);video.addEventListener('playing',()=>{clearTimeout(timer);timer=setTimeout(finish,(Number.isFinite(video.duration)?Math.max(0,video.duration-video.currentTime):10)*1000+3000)},{once:true});try{sessionStorage.setItem(key,'1')}catch{}video.play().catch(finish);
 };
 const ready=()=>{if(!seen&&!reduced.matches)window.playReactorIntro();else clearGate()};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
