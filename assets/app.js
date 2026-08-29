const STORAGE_SPINS="roulettePatternLab.v9.spins";
const STORAGE_PREDS="roulettePatternLab.v9.predictions";
let spins=[],predictions=[];
const $=x=>document.getElementById(x);
function loadData(){
  try{
    const a=JSON.parse(localStorage.getItem(STORAGE_SPINS)||"[]");
    const b=JSON.parse(localStorage.getItem(STORAGE_PREDS)||"[]");
    spins=Array.isArray(a)?a:[]; predictions=Array.isArray(b)?b:[];
    return true;
  }catch(e){spins=[];predictions=[];return false}
}
function saveData(){localStorage.setItem(STORAGE_SPINS,JSON.stringify(spins));localStorage.setItem(STORAGE_PREDS,JSON.stringify(predictions))}
function nextId(a){return a.reduce((m,x)=>Math.max(m,Number(x.id)||0),0)+1}
const W=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const RED=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const idx=n=>W.indexOf(Number(n));
function jump(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}
function dir(a,b){let x=jump(a,b);return x>0?"CW":x<0?"CCW":"SAME"}
function dist(a,b){return Math.abs(jump(a,b))}
function col(n){return n===0?"green":RED.has(Number(n))?"red":"black"}
function trans(h){const z=[];for(let i=1;i<h.length;i++)z.push({from:h[i-1],to:h[i],j:jump(h[i-1],h[i]),d:dir(h[i-1],h[i])});return z}
function jump(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}function dir(a,b){let x=jump(a,b);return x>0?"CW":x<0?"CCW":"SAME"}function dist(a,b){return Math.abs(jump(a,b))}function col(n){return n===0?"green":RED.has(n)?"red":"black"}
function pressFeedback(b){
  b.classList.remove("pressed"); void b.offsetWidth; b.classList.add("pressed");
  setTimeout(()=>b.classList.remove("pressed"),130);
}function trans(h){let z=[];for(let i=1;i<h.length;i++)z.push({from:h[i-1],to:h[i],j:jump(h[i-1],h[i]),d:dir(h[i-1],h[i])});return z}

function seqs(h){let out=[];for(let len=2;len<=Math.min(10,h.length-1);len++){let key=h.slice(-len).join(","),next=[];for(let i=0;i+len<h.length;i++)if(h.slice(i,i+len).join(",")===key)next.push(h[i+len]);if(next.length)out.push({len,key,next})}return out.sort((a,b)=>b.len-a.len)}
function model(h){if(h.length<12)return null;let s=Array(37).fill(.05),ev=[],t=trans(h),j=t.map(x=>x.j),d=t.map(x=>x.d),sp=seqs(h);
for(let p of sp.slice(0,5)){let c=Array(37).fill(0);p.next.forEach(n=>c[idx(n)]++);for(let n=0;n<37;n++)s[n]+=(c[n]/p.next.length)*(2+p.len);ev.push({x:"Secuencia repetida "+p.len+" pockets",y:p.key+" → "+p.next.join(","),n:p.next.length,w:2+p.len})}
let sig=t.map(x=>x.j+":"+x.d);for(let len=2;len<=Math.min(7,sig.length-1);len++){let key=sig.slice(-len).join("|"),next=[];for(let i=0;i+len<sig.length;i++)if(sig.slice(i,i+len).join("|")===key)next.push(h[i+len]);if(next.length){let c=Array(37).fill(0);next.forEach(n=>c[idx(n)]++);for(let n=0;n<37;n++)s[n]+=(c[n]/next.length)*5;ev.push({x:"Patrón salto+dirección "+len,y:key,n:next.length,w:5})}}
let lj=j.at(-1),jc=Array(37).fill(0);for(let i=0;i<j.length-1;i++)if(j[i]===lj)jc[j[i+1]+18]++;let jt=jc.reduce((a,b)=>a+b,0)+12;for(let k=0;k<37;k++)s[idx(W[(idx(h.at(-1))+k-18+37)%37])]+=((jc[k]+.35)/jt)*3.5;
let ld=d.at(-1),dc={CW:.5,CCW:.5,SAME:.5};for(let i=0;i<d.length-1;i++)if(d[i]===ld)dc[d[i+1]]++;let dt=dc.CW+dc.CCW+dc.SAME;for(let n=0;n<37;n++){let q=jump(h.at(-1),n)>0?"CW":jump(h.at(-1),n)<0?"CCW":"SAME";s[n]+=(dc[q]/dt)*2}
let row=Array(37).fill(0);for(let i=0;i<h.length-1;i++)if(h[i]===h.at(-1))row[idx(h[i+1])]++;let rt=row.reduce((a,b)=>a+b,0)+37;for(let n=0;n<37;n++)s[n]+=((row[n]+1)/rt)*2;
for(let i=Math.max(0,h.length-80);i<h.length-1;i++)s[idx(h[i+1])]+=Math.pow(.985,h.length-2-i)*.08;
let r=s.map((v,n)=>({n,v})).sort((a,b)=>b.v-a.v),tot=r.reduce((a,b)=>a+b.v,0),p=r.map(x=>({...x,p:x.v/tot})),best=p[0],expected=p.reduce((a,x)=>a+jump(h.at(-1),x.n)*x.p,0),cw=p.filter(x=>jump(h.at(-1),x.n)>0).reduce((a,x)=>a+x.p,0),ccw=p.filter(x=>jump(h.at(-1),x.n)<0).reduce((a,x)=>a+x.p,0);
return{target:best.n,prob:best.p,ranking:p.slice(0,12),expected,predDir:cw>=ccw?"CW":"CCW",cw,ccw,ev,sp,active:ev.length}}
function back(h){let o={n:0,hit:Array(10).fill(0),dir:0};for(let i=12;i<h.length;i++){let p=model(h.slice(0,i));if(!p)continue;o.n++;for(let r=0;r<=9;r++)if(dist(p.target,h[i])<=r)o.hit[r]++;if(dir(h[i-1],h[i])===p.predDir)o.dir++}return o}function pct(n,d){return d?(100*n/d).toFixed(1)+"%":"—"}

async function add(n){
  n=Number(n);
  const h=spins.map(x=>Number(x.result)),p=model(h),now=new Date().toISOString();
  const pid=nextId(predictions);
  predictions.push({id:pid,spinIndex:h.length+1,previous:h.at(-1)??null,prediction:p,actual:n,createdAt:now});
  spins.push({id:nextId(spins),result:n,createdAt:now,predictionId:pid});
  saveData();render();
}
function neighbors(n){let i=idx(n);return Array.from({length:11},(_,k)=>W[(i-5+k+37)%37])}
$("tol").onchange=render;function applyTheme(mode, save=true){
  const m=mode==="night"?"night":"day";
  document.body.classList.toggle("night",m==="night");
  $("theme").textContent=m==="night"?"☀":"☾";
  if(save) localStorage.setItem("rouletteTheme",m);
}
let savedTheme="day";
try{savedTheme=localStorage.getItem("rouletteTheme")==="night"?"night":"day"}catch(e){}
applyTheme(savedTheme,false);
$("theme").onclick=()=>applyTheme(document.body.classList.contains("night")?"day":"night");$("clearHistory").onclick=async()=>{if(!confirm("¿Borrar TODO el historial, predicciones y aprendizaje local? Esta acción no se puede deshacer."))return;spins=[];predictions=[];saveData();render()};
$("undo").onclick=async()=>{if(!spins.length)return;const x=spins.pop();predictions=predictions.filter(p=>p.id!==x.predictionId);saveData();render()};$("txt").onclick=async()=>{let s=(await all("spins")).sort((a,b)=>a.id-b.id),l=s.map((x,i)=>{let p=i?s[i-1].result:null;return(i+1)+" | "+x.result+" | "+(p==null?"":jump(p,x.result))+" | "+(p==null?"":dir(p,x.result))}).join("\\n"),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([l],{type:"text/plain"}));a.download="roulette-history-v8.txt";a.click()};$("json").onclick=async()=>{const d={schemaVersion:9,spins,predictions,wheel:W,exportedAt:new Date().toISOString()},a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(d,null,2)],{type:"application/json"}));a.download="roulette-pattern-lab-v9.json";a.click()};$("restoreBtn").onclick=()=>$("restore").click();$("restore").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(!Array.isArray(d.spins))throw Error("Backup inválido");if(!confirm("Reemplazar histórico?"))return;spins=d.spins;predictions=Array.isArray(d.predictions)?d.predictions:[];saveData();render()}catch(err){alert(err.message)}};
function buildNumberButtons(){
  const box=$("numbers");
  box.innerHTML="";
  for(let n=0;n<=36;n++){
    const b=document.createElement("button");
    b.type="button"; b.textContent=String(n); b.className=col(n);
    b.addEventListener("pointerdown",()=>pressFeedback(b)); b.addEventListener("click",()=>add(n));
    box.appendChild(b);
  }
}
(async()=>{
  buildNumberButtons();
  try{
    await open();$("db").textContent="DB OK";await render();
  }catch(e){
    $("db").textContent="DB ERROR";
    $("learning").textContent="No se pudo abrir la base de datos: "+e.message;
  }
})()