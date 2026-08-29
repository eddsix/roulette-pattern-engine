const W=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const DB_NAME='RoulettePatternLab';const DB_VERSION=1;const SPINS='spins';const PREDS='predictions';const BACKUP_KEY='roulette_pattern_lab_backup_v3';
let db=null;

const $=id=>document.getElementById(id);
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB_NAME,DB_VERSION);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(SPINS))d.createObjectStore(SPINS,{keyPath:'id',autoIncrement:true});if(!d.objectStoreNames.contains(PREDS))d.createObjectStore(PREDS,{keyPath:'id',autoIncrement:true})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function getAll(store){return new Promise((res,rej)=>{const r=db.transaction(store,'readonly').objectStore(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function put(store,obj){return new Promise((res,rej)=>{const r=db.transaction(store,'readwrite').objectStore(store).put(obj);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function del(store,id){return new Promise((res,rej)=>{const r=db.transaction(store,'readwrite').objectStore(store).delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
function clear(store){return new Promise((res,rej)=>{const r=db.transaction(store,'readwrite').objectStore(store).clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}

const idx=n=>W.indexOf(n);
function signedDistance(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}
function pocketDistance(a,b){return Math.abs(signedDistance(a,b))}
function neighbors(n,r=3){let i=idx(n);return Array.from({length:2*r+1},(_,k)=>W[(i-r+k+37)%37])}
function sector(n,count=6){return Math.floor(idx(n)*count/37)}

function sequenceCandidate(h,order){
  if(h.length<=order)return null;
  const key=h.slice(-order).join(',');
  const counts={};let total=0;
  for(let i=0;i+order<h.length;i++)if(h.slice(i,i+order).join(',')===key){const n=h[i+order];counts[n]=(counts[n]||0)+1;total++}
  if(!total)return null;
  const [n,v]=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  return {target:+n,rate:v/total,samples:total,name:'Pattern '+order};
}
function distanceCandidate(h,order){
  if(h.length<=order+1)return null;
  const ds=[];for(let i=1;i<h.length;i++)ds.push(signedDistance(h[i-1],h[i]));
  const key=ds.slice(-order).join(',');
  const counts={};let total=0;
  for(let i=0;i+order<ds.length;i++)if(ds.slice(i,i+order).join(',')===key){const x=ds[i+order];counts[x]=(counts[x]||0)+1;total++}
  if(!total)return null;
  const [off,v]=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  return {target:W[(idx(h.at(-1))+Number(off)+37)%37],rate:v/total,samples:total,name:'Offset '+order,offset:Number(off)};
}
function sectorCandidate(h){
  if(h.length<12)return null;
  const cur=sector(h.at(-1));const counts={};let total=0;
  for(let i=0;i<h.length-1;i++)if(sector(h[i])===cur){const q=sector(h[i+1]);counts[q]=(counts[q]||0)+1;total++}
  if(!total)return null;
  const [sec,v]=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  const nums=W.filter(n=>sector(n)===Number(sec));
  return {target:nums[Math.floor(nums.length/2)],rate:v/total,samples:total,name:'Sector '+Number(sec+1)};
}
function makePrediction(h){
  if(h.length<12)return null;
  const c=[sequenceCandidate(h,2),sequenceCandidate(h,3),sequenceCandidate(h,4),distanceCandidate(h,2),distanceCandidate(h,3),sectorCandidate(h)].filter(Boolean);
  if(!c.length)return null;
  const scores={};
  for(const x of c)scores[x.target]=(scores[x.target]||0)+x.rate*Math.log10(x.samples+1);
  const rank=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const total=rank.reduce((s,x)=>s+x[1],0);
  const best=rank[0];
  return {target:Number(best[0]),confidence:best[1]/total,range:3,evidence:c,createdAt:new Date().toISOString()};
}
function evaluation(preds,r){
  const a=preds.filter(x=>x.prediction&&x.actual!==null&&x.actual!==undefined);
  return a.length?(100*a.filter(x=>pocketDistance(x.prediction.target,x.actual)<=r).length/a.length).toFixed(1)+'%':'—';
}

async function addSpin(n){
  const spins=(await getAll(SPINS)).sort((a,b)=>a.id-b.id);
  const h=spins.map(x=>x.result);
  // Prediction is created from the history BEFORE the new result.
  const p=makePrediction(h);
  const predId=await put(PREDS,{spinIndex:h.length+1,prediction:p,actual:null,createdAt:new Date().toISOString()});
  await put(SPINS,{result:n,createdAt:new Date().toISOString(),predictionId:predId});
  if(p){const q=(await getAll(PREDS)).find(x=>x.id===predId);q.actual=n;q.error=pocketDistance(p.target,n);await put(PREDS,q)}
  await render();
}

async function undo(){
  const spins=(await getAll(SPINS)).sort((a,b)=>a.id-b.id);if(!spins.length)return;
  const last=spins.at(-1);await del(SPINS,last.id);
  if(last.predictionId)await del(PREDS,last.predictionId);
  await render();
}
async function backup(){
  const data={schemaVersion:3,exportedAt:new Date().toISOString(),spins:await getAll(SPINS),predictions:await getAll(PREDS)};
  localStorage.setItem(BACKUP_KEY,JSON.stringify(data));
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='roulette-pattern-lab-backup.json';a.click();
}
async function restore(file){
  const text=await file.text();const data=JSON.parse(text);
  if(!Array.isArray(data.spins)||!Array.isArray(data.predictions))throw new Error('Backup inválido');
  if(!confirm('Restaurar este backup reemplazará el histórico actual. ¿Continuar?'))return;
  await clear(SPINS);await clear(PREDS);
  for(const x of data.spins)await put(SPINS,x);
  for(const x of data.predictions)await put(PREDS,x);
  await render();
}

async function render(){
  const spins=(await getAll(SPINS)).sort((a,b)=>a.id-b.id),h=spins.map(x=>x.result),preds=await getAll(PREDS),p=makePrediction(h);
  $('count').textContent=h.length+' spins';
  $('history').innerHTML=h.slice(-20).map(n=>'<span>'+n+'</span>').join('');
  if(p){$('target').textContent=p.target;$('signal').textContent=p.confidence>=.55?'SIGNAL':'WEAK SIGNAL';$('confidence').textContent='Model confidence: '+(p.confidence*100).toFixed(1)+'%';$('zone').textContent='Zona ±3: '+neighbors(p.target,3).join(' · ');$('evidence').innerHTML=p.evidence.map(x=>'<div><b>'+x.name+'</b> → '+x.target+' · '+(x.rate*100).toFixed(1)+'% · '+x.samples+' muestras</div>').join('')}
  else{$('target').textContent='—';$('signal').textContent='NO SIGNAL';$('confidence').textContent='—';$('zone').textContent=h.length<12?'Necesitamos al menos 12 spins':'No hay evidencia suficiente';$('evidence').textContent='Sin candidatos con evidencia suficiente.'}
  $('pc').textContent=preds.filter(x=>x.prediction).length;$('exact').textContent=evaluation(preds,0);$('r1').textContent=evaluation(preds,1);$('r3').textContent=evaluation(preds,3);
}

(async()=>{
  try{db=await openDB();$('dbStatus').textContent='DB OK'}catch(e){$('dbStatus').textContent='DB ERROR';alert('No se pudo abrir la base de datos local.')}
  for(let n=0;n<=36;n++){const b=document.createElement('button');b.textContent=n;if(n===0)b.className='zero';b.onclick=()=>addSpin(n);$('numbers').appendChild(b)}
  $('undo').onclick=undo;$('backup').onclick=backup;$('restore').onchange=e=>e.target.files[0]&&restore(e.target.files[0]);
  await render();
})()
