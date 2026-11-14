export default function(component) {
const { parentElement, setTriggerValue } = component;
const root=parentElement.querySelector('#rn-story-wrap');
if(!root)return;

const robot=root.querySelector('#robotAnchor'), rotor=root.querySelector('#robotRotor'),orbit=root.querySelector('#orbit'),twirl=root.querySelector('#twirlLabel');
const scenes=Array.from(root.querySelectorAll('.scene'));
const waypoints=[
 {p:0, x:.76,y:.52,ry:-12,rz:-8,s:1.02},
 {p:.16,x:.64,y:.53,ry:-9,rz:-5,s:.98},
 {p:.29,x:.26,y:.56,ry:9,rz:5,s:.95},
 {p:.40,x:.27,y:.56,ry:15,rz:5,s:.95},
 {p:.50,x:.50,y:.50,ry:23,rz:0,s:1.15},
 {p:.68,x:.50,y:.50,ry:383,rz:0,s:1.15},
 {p:.78,x:.70,y:.48,ry:389,rz:-8,s:1.05},
 {p:1,x:.79,y:.58,ry:369,rz:5,s:.94}
];
function smooth(t){return t*t*(3-2*t)}
function sample(p){let b=waypoints.length-2;for(let i=0;i<waypoints.length-1;i++){if(p<=waypoints[i+1].p){b=i;break}}const a=waypoints[b],c=waypoints[b+1];const u=smooth(Math.min(1,Math.max(0,(p-a.p)/(c.p-a.p))));return {x:a.x+(c.x-a.x)*u,y:a.y+(c.y-a.y)*u,ry:a.ry+(c.ry-a.ry)*u,rz:a.rz+(c.rz-a.rz)*u,s:a.s+(c.s-a.s)*u}}
function render(){const rect=root.getBoundingClientRect();const range=Math.max(1,root.offsetHeight-window.innerHeight);const p=Math.min(1,Math.max(0,-rect.top/range));const r=sample(p);robot.style.left=(r.x*100)+'%';robot.style.top=(r.y*100)+'%';robot.style.transform='translate(-50%,-50%) scale('+r.s+')';rotor.style.transform='rotateY('+r.ry+'deg) rotateZ('+r.rz+'deg)';const sceneIndex=p<.16?0:p<.43?1:p<.69?2:p<.85?3:4;scenes.forEach((s,i)=>{const v=i===sceneIndex?1:0;s.style.opacity=v;s.classList.toggle('on',v===1)});const spin=Math.max(0,Math.min(1,(p-.48)/.23));const active=Math.sin(Math.PI*spin);orbit.style.opacity=active*.82;twirl.style.opacity=active;orbit.style.transform='translate(-50%,-50%) rotateX(66deg) rotateZ('+(spin*360)+'deg) scale('+(0.6+active*.4)+')';root.querySelector('#scrollHint').style.opacity=1-smooth(Math.min(1,p*10));root.querySelector('#progress').style.width=(p*100)+'%';root.querySelector('#counter').textContent=String(Math.min(5,Math.floor(p*5)+1)).padStart(2,'0')+' / 05';}
const grid=root.querySelector('#gridbox');for(let i=0;i<72;i++){const cell=document.createElement('div');cell.className='cell';if([17,18,30,42,43,55,56].includes(i))cell.classList.add('wall');if([26,27,28,40,52,53,54,66,67,68].includes(i))cell.classList.add('route');if(i===24)cell.classList.add('start');if(i===69)cell.classList.add('goal');grid.appendChild(cell)}

let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;render()})}
// Streamlit can scroll inside its main container, so listen to the scroll owner
// as well as the document. Neither listener initiates a Python rerun.
const scrollContainers=[window,document,document.querySelector('[data-testid="stMain"]'),document.querySelector('.stMain')].filter(Boolean);
scrollContainers.forEach(c=>c.addEventListener('scroll',schedule,{passive:true,capture:true}));
window.addEventListener('resize',schedule);
const buttons=root.querySelectorAll('[data-target]');
buttons.forEach(b=>b.addEventListener('click',()=>setTriggerValue('navigate',b.dataset.target)));
const scrollTargets=root.querySelectorAll('[data-scroll]');
scrollTargets.forEach(link=>link.addEventListener('click',()=>{
  // Scroll within the real parent page, whether Streamlit uses document or stMain.
  const percent=Number(link.dataset.scroll)||0;
  const scrollOwner=document.querySelector('[data-testid="stMain"]');
  const desired=root.getBoundingClientRect().top + percent*Math.max(1,root.offsetHeight-window.innerHeight);
  if(scrollOwner && scrollOwner.scrollHeight>scrollOwner.clientHeight+10){
    scrollOwner.scrollBy({top:desired,behavior:'smooth'});
  }else{window.scrollBy({top:desired,behavior:'smooth'});}
}));
render();
// Streamlit invokes this cleanup when the Home component is unmounted.
return ()=>{scrollContainers.forEach(c=>c.removeEventListener('scroll',schedule,true));window.removeEventListener('resize',schedule)};
}