import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import './style.css';
import './content.js';
const BASE=import.meta.env.BASE_URL;
const FLOOR_SPACING=6.1;
const rooms=[
 {id:'sky-lounge',key:'04-sky-lounge',floor:'04',title:'Sky Lounge',kicker:'LIVE ABOVE THE ORDINARY',description:'Gather. Unwind. Stay a little longer. The journey begins with warm spaces, shared moments, and entertainment that belongs in your life.',tags:['Outdoor entertainment','Connected living']},
 {id:'design-lab',key:'03-design-lab',floor:'03',title:'Design Lab',kicker:'FROM POSSIBILITY TO PRECISION',description:'Materials meet imagination. Explore the details that turn a screen, a wall, and a room into one considered experience.',tags:['Builder design','Pre-wire planning']},
 {id:'cinema-deck',key:'02-cinema-deck',floor:'02',title:'Cinema Deck',kicker:'FEEL EVERY FRAME',description:'The lights soften. The room settles. Sound and picture become an experience worth staying home for.',tags:['Home theater','Immersive sound']},
 {id:'command-center',key:'01-command-center',floor:'01',title:'Command Center',kicker:'EVERYTHING IN HARMONY',description:'Step behind the experience. A cinematic vision of screens, systems, and people working together.',tags:['System coordination','Connected spaces']},
 {id:'operations',key:'B1-operations',floor:'B1',title:'Operations',kicker:'THE NEXT LEVEL OF READINESS',description:'Every extraordinary experience starts with preparation. The crew comes together as the tower reveals its futuristic side.',tags:['Professional installation','Ongoing support']}
];
const offerings=[["/services#premium-installations", "Outdoor & whole-home audio", "Connected entertainment for patios, gathering spaces, and every room in your home."], ["/builder-deck", "Builder design & pre-wire", "Coordinate technology with your floor plans, from structured wiring and conduit planning to trim-out and system calibration."], ["/services#home-theater-technology", "Home theater technology", "Bring sound and picture together with immersive theaters, projection, acoustic treatment, and integrated controls."], ["/services#enterprise-networks", "Networks & smart automation", "Connect lighting, security, entertainment, and business systems through thoughtfully designed networks and automation."], ["/services#managed-services", "Installation & ongoing support", "From professional installation to training and continuing support, keep your connected systems ready for everyday use."]];
rooms.forEach((r,i)=>{r.href=offerings[i][0];r.offering=offerings[i][1];r.description=offerings[i][2];r.kicker=r.offering.toUpperCase()});
const menu=document.querySelector('#site-menu');document.querySelector('#menu-toggle').onclick=()=>menu.showModal();document.querySelector('#close-menu').onclick=()=>menu.close();menu.addEventListener('click',e=>{if(e.target===menu)menu.close()});
document.querySelector('#rooms').innerHTML=rooms.map(r=>`<section class="room" id="${r.id}" aria-labelledby="title-${r.id}"><div class="room-copy"><span class="level-number">LEVEL ${r.floor}</span><p class="eyebrow">${r.kicker}</p><h2 id="title-${r.id}">${r.title}</h2><div class="room-line"></div><p class="description">${r.description}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="floor-entry" href="${r.href}">Explore ${r.offering} <span>↗</span></a></div></section>`).join('');
document.querySelector('.floor-nav').innerHTML=rooms.map(r=>`<a target="_self" href="#${r.id}" aria-label="Level ${r.floor}: ${r.title}">${r.floor}</a>`).join('');
const stage=document.querySelector('#stage'),fallback=document.querySelector('#stage-fallback'),canvas=document.querySelector('#tower');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const compact=matchMedia('(max-width: 900px), (orientation: portrait)');
let paused=reduce.matches,scene,camera,renderer,model,car,raf=0,previous=0,time=0,visible=false,active=0,progress=0,needsRender=true;
let overview=false,mixer,overviewBlend=0;
let targetY=0,currentY=0,pointerX=0,dragX=0,dragStart=0,captured=null,lookX=0;
const panels=[],glows=[],videos=[],metrics={frames:0,drawCalls:0,triangles:0,loaded:false};
// Optional paths are intentionally null until the blocked video production succeeds.
let videoManifest={};
fetch(BASE+'media/video-manifest.json').then(r=>r.ok?r.json():{}).then(m=>{videoManifest=m;syncVideo(active)}).catch(()=>{});
function motionLabel(){document.body.classList.toggle('paused',paused);const b=document.querySelector('#motion');b.textContent=paused?'Resume motion':'Pause motion';b.setAttribute('aria-pressed',String(paused));}
document.querySelector('#overview-toggle').onclick=()=>{overview=!overview;document.querySelector('#overview-toggle').setAttribute('aria-pressed',String(overview));document.querySelector('#overview-toggle').textContent=overview?'Enter this floor':'Tower overview';document.body.classList.toggle('overview-mode',overview);wake()};
motionLabel();document.querySelector('#motion').onclick=()=>{paused=!paused;motionLabel();syncVideo(active);wake()};reduce.addEventListener('change',()=>{paused=reduce.matches;motionLabel();updateScroll();syncVideo(active);wake()});
function updateScroll(){
 const sections=rooms.map(r=>document.getElementById(r.id)),vh=innerHeight;
 const first=sections[0].offsetTop-vh*.22,last=document.getElementById('project-next').offsetTop-vh*.75;
 const wasVisible=visible;visible=scrollY<last;
 if(wasVisible!==visible)syncVideo(active);
 document.body.classList.toggle('in-tower',visible);
 let i=0;while(i<rooms.length-1&&scrollY>=sections[i+1].offsetTop-vh*.22)i++;
 const start=sections[i].offsetTop-vh*.22,end=i<rooms.length-1?sections[i+1].offsetTop-vh*.22:start+sections[i].offsetHeight;
 const local=THREE.MathUtils.clamp((scrollY-start)/(end-start),0,1);
 const blend=THREE.MathUtils.smoothstep(local,.64,1);
 targetY=-(i+((reduce.matches||paused||compact.matches)?0:(i<rooms.length-1?blend:0)))*FLOOR_SPACING;
 if(reduce.matches||paused||compact.matches)currentY=targetY;
 if(active!==i){dragX=0;active=i;fallback.src=BASE+'media/'+rooms[i].key+'.webp';fallback.alt=rooms[i].title+' populated room concept';syncVideo(i)}
 const entry=document.querySelector('#active-offering');entry.href=rooms[i].href;entry.textContent='Explore '+rooms[i].offering+' ↗';
 document.querySelector('#stage-floor').textContent=rooms[i].floor+' / '+rooms[i].title.toUpperCase();
 document.querySelectorAll('.floor-nav a').forEach((a,n)=>a.setAttribute('aria-current',String(n===i&&visible)));
 progress=THREE.MathUtils.clamp(scrollY/(document.documentElement.scrollHeight-innerHeight),0,1);
 document.querySelector('#journey-progress').style.width=progress*100+'%';document.querySelector('#journey-percent').textContent=String(Math.round(progress*100)).padStart(2,'0')+'%';
 needsRender=true;wake();
}
async function syncVideo(index){
 videos.forEach((v,i)=>{if(v&&(i!==index||paused||!visible||document.hidden))v.pause()});
 if(!renderer||!panels[index]||!visible||paused||document.hidden)return;
 const key=rooms[index].key,url=videoManifest[key];if(!url)return;
 if(!videos[index]){
  const v=document.createElement('video');v.src=BASE+url;v.muted=true;v.loop=true;v.playsInline=true;v.preload='metadata';videos[index]=v;
  v.addEventListener('loadeddata',()=>{const tex=new THREE.VideoTexture(v);tex.colorSpace=THREE.SRGBColorSpace;panels[index].material.map=tex;panels[index].material.needsUpdate=true;wake()});
  v.addEventListener('error',()=>{document.querySelector('#stage-error').textContent='Motion unavailable. Showing the room artwork.'});
 }
 videos[index].play().catch(()=>{});
}
function resize(){if(!renderer)return;const {width:w,height:h}=stage.getBoundingClientRect();renderer.setSize(w,h,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));camera.aspect=w/h;camera.updateProjectionMatrix();needsRender=true;wake()}
function wake(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
function frame(now){raf=0;const dt=Math.min((now-previous)/1000||.016,.05);previous=now;if(!renderer||!visible)return;
 if(!paused){time+=dt;mixer?.update(dt);}
 currentY=THREE.MathUtils.lerp(currentY,targetY,1-Math.exp(-dt*8));lookX=THREE.MathUtils.lerp(lookX,paused?0:pointerX*.26+dragX,1-Math.exp(-dt*4));
 // Fit the whole artwork on smaller screens; retain cinematic framing on desktop.
 const t=1-Math.exp(-dt*3);overviewBlend=THREE.MathUtils.lerp(overviewBlend,overview?1:0,t);
 const halfFov=Math.tan(THREE.MathUtils.degToRad(36/2));
 const fitted=compact.matches;
 const distance=fitted?Math.max(5.06/(2*halfFov),9/(2*halfFov*camera.aspect))*1.015+.58:Math.min(4.80/(2*halfFov),9.0/(2*halfFov*camera.aspect))+.58;
 const pan=fitted?0:lookX;
 const hero=scrollY<innerHeight*.65;
 const cy=THREE.MathUtils.lerp(currentY+(hero&&!fitted?.22:0),-(rooms.length-1)*FLOOR_SPACING/2,overviewBlend);
 const cz=THREE.MathUtils.lerp(distance,Math.max((rooms.length-1)*FLOOR_SPACING*1.85+5.5,23/camera.aspect),overviewBlend);
 camera.position.set(THREE.MathUtils.lerp(pan,5,overviewBlend),cy+(fitted?0:.12),cz);
 camera.lookAt(THREE.MathUtils.lerp(pan,-.4,overviewBlend),cy,0);
 if(car)car.position.y=currentY;
 glows.forEach((g,i)=>{g.material.opacity=paused?.13:.1+.055*Math.sin(time*1.6+i);});
 panels.forEach((p,i)=>p.visible=overviewBlend>.1||Math.abs(p.position.y-currentY)<9);
 renderer.render(scene,camera);metrics.frames++;metrics.drawCalls=renderer.info.render.calls;metrics.triangles=renderer.info.render.triangles;needsRender=false;
 if(!paused||Math.abs(currentY-targetY)>.002||Math.abs(lookX)>.002||Math.abs(overviewBlend-(overview?1:0))>.002)wake();
}
async function init(){try{
 renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x080c0e,0);scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1,.1,120);
 scene.add(new THREE.HemisphereLight(0xd0e6ea,0x182125,2));const lamp=new THREE.DirectionalLight(0xffd79c,3);lamp.position.set(2,9,10);scene.add(lamp);
 const gltf=await new GLTFLoader().loadAsync(BASE+'tower-five-levels.glb');model=gltf.scene;scene.add(model);car=model.getObjectByName('Elevator_car');if(gltf.animations.length){mixer=new THREE.AnimationMixer(model);gltf.animations.forEach(clip=>mixer.clipAction(clip).play());metrics.animationClips=gltf.animations.length;}
 const loader=new THREE.TextureLoader();await Promise.all(rooms.map(async(r,i)=>{
 const texture=await loader.loadAsync(BASE+'media/'+r.key+'.webp');texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
 const panel=new THREE.Mesh(new THREE.PlaneGeometry(9,5.06),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));panel.position.set(0,-i*FLOOR_SPACING,.58);scene.add(panel);panels[i]=panel;
 const glow=new THREE.Mesh(new THREE.PlaneGeometry(.025,4.72),new THREE.MeshBasicMaterial({color:0x55d7ec,transparent:true,opacity:.15,blending:THREE.AdditiveBlending,depthWrite:false}));glow.position.set(-4.43,-i*FLOOR_SPACING,.61);scene.add(glow);glows.push(glow);
 }));
 stage.classList.add('ready');metrics.loaded=true;resize();updateScroll();syncVideo(active);
 }catch(e){console.error(e);stage.classList.remove('ready');document.querySelector('#stage-error').textContent='Room gallery mode';renderer?.dispose();renderer=null;}}
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stage.classList.remove('ready');document.querySelector('#stage-error').textContent='Room gallery mode';cancelAnimationFrame(raf);raf=0;renderer=null});
stage.addEventListener('pointermove',e=>{if(paused)return;const r=stage.getBoundingClientRect();if(captured===e.pointerId){dragX=THREE.MathUtils.clamp((e.clientX-dragStart)/r.width*1.2,-.6,.6)}else if(e.pointerType==='mouse')pointerX=(e.clientX-r.left)/r.width-.5;wake()});
stage.addEventListener('pointerdown',e=>{if(!e.isPrimary||paused)return;captured=e.pointerId;dragStart=e.clientX;stage.setPointerCapture(e.pointerId)});
function release(e){if(captured!==e.pointerId)return;captured=null;if(innerWidth>760)dragX=0;if(stage.hasPointerCapture(e.pointerId))stage.releasePointerCapture(e.pointerId);wake()}
['pointerup','pointercancel','lostpointercapture'].forEach(n=>stage.addEventListener(n,release));stage.addEventListener('pointerleave',()=>{pointerX=0;wake()});
let lastViewportWidth=innerWidth;
addEventListener('scroll',updateScroll,{passive:true});addEventListener('resize',()=>{const preserveFloor=innerWidth!==lastViewportWidth&&visible&&scrollY>100;const roomId=rooms[active].id;lastViewportWidth=innerWidth;resize();if(preserveFloor)scrollTo({top:document.getElementById(roomId).offsetTop,behavior:'instant'});updateScroll()});new ResizeObserver(resize).observe(stage);document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;videos.forEach(v=>v?.pause())}else{previous=performance.now();syncVideo(active);wake()}});
// Read-only production diagnostics for QA; no private data.
window.towerDiagnostics=()=>({...metrics,activeFloor:rooms[active].floor,reducedMotion:reduce.matches,paused,visible,viewport:[innerWidth,innerHeight],fitMode:compact.matches?'contain':'cinematic',stageSize:[stage.clientWidth,stage.clientHeight],imageCorners:camera&&panels[active]?[-1,1].flatMap(x=>[-1,1].map(y=>new THREE.Vector3(x*4.5,panels[active].position.y+y*2.53,.58).project(camera).toArray())):[],videoClips:Object.values(videoManifest).filter(Boolean).length,mixerTime:mixer?.time,floorCount:rooms.length,animatedFin:model?.getObjectByName(`Floor_${rooms.length-1}_motorized_fin_1_0`)?.quaternion.toArray()});
addEventListener('pagehide',e=>{cancelAnimationFrame(raf);raf=0;videos.forEach(v=>v?.pause());if(e.persisted)return;scene?.traverse(o=>{o.geometry?.dispose();if(o.material){const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{m.map?.dispose();m.dispose()})}});renderer?.dispose()});
addEventListener('pageshow',e=>{if(e.persisted){previous=performance.now();syncVideo(active);wake()}});
// Preserve old shared floor and closing links after retiring the final concept room.
function normalizeLegacyHash(){
 const next=location.hash==='#armor-lab'?'operations':location.hash==='#suit-up'?'project-next':null;
 if(!next)return;
 history.replaceState(null,'',location.pathname+location.search+'#'+next);
 requestAnimationFrame(()=>document.getElementById(next)?.scrollIntoView({behavior:'instant'}));
}
addEventListener('hashchange',normalizeLegacyHash);
normalizeLegacyHash();init();updateScroll();
