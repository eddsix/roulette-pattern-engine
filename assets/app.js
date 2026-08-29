const DB_NAME='RoulettePatternLabV4',DB_VERSION=1,SPINS='spins',PREDS='predictions';
const W=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
let db;const $=id=>document.getElementById(id);const idx=n=>W.indexOf(n);
function openDB(){return new Promise((ok,no)=>{const r=indexedDB.open(DB_NAME,DB_VERSION);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(SPINS))d.createObjectStore(SPINS,{keyPath:'id',autoIncrement:true});if(!d.objectStoreNames.contains(PREDS))d.createObjectStore(PREDS,{keyPath:'id',autoIncrement:true})};r.onsuccess=()=>{db=r.result;ok()};r.onerror=()=>no(r.error)})}
function all(st){return new Promise((ok,no)=>{const r=db.transaction(st).objectStore(st).getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function put(st,o){return new Promise((ok,no)=>{const r=db.transaction(st,'readwrite').objectStore(st).put(o);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function del(st,id){return new Promise((ok,no)=>{const r=db.transaction(st,'readwrite').objectStore(st).delete(id);r.onsuccess=ok;r.onerror=()=>no(r.error)})}
function signed(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}
function distance(a,b){return Math.abs(signed(a,b))}
function direction(a,b){const s=signed(a,b);return s>0?'CW':s<0?'CCW':'SAME'}
function neighbors(n,r=5){const i=idx(n);return Array.from({length:2*r+1},(_,k)=>W[(i-r+k+37)%37])}

function getTransitions(h){const out=[];for(let i=1;i<h.length;i++)out.push({from:h[i-1],to:h[i],jump:signed(h[i-1],h[i]),dir:direction(h[i-1],h[i])});return out}

function buildModel(h){
 if(h.length<12)return null;
 const scores=Array(37).fill(1),evidence=[];const t=getTransitions(h),j=t.map(x=>x.jump),d=t.map(x=>x.dir);
 // Current pocket transition: smoothed, but not dominant.
 const trans=Array.from({length:37},()=>Array(37).fill(1));
 for(let i=0;i<h.length-1;i++)trans[idx(h[i])][idx(h[i+1])]++;
 const row=trans[idx(h.at(-1))],rowSum=row.reduce((a,b)=>a+b,0);
 row.forEach((v,n)=>scores[n]+=(v/rowSum)*1.2);
 evidence.push({name:'Current-pocket transition',samples:h.length-1});

 // Conditional next-jump distribution.
 for(const order of [1,2,3]){
   if(j.length<=order)continue;
   const key=j.slice(-order).join(','),c=Array(37).fill(0);let total=0;
   for(let i=0;i+order<j.length;i++)if(j.slice(i,i+order).join(',')===key){c[j[i+order]+18]++;total++}
   if(total){for(let k=0;k<37;k++){const n=W[(idx(h.at(-1))+(k-18)+37)%37];scores[n]+=(c[k]/total)*3.0}evidence.push({name:'Jump pattern '+order,samples:total})}
 }
 // Conditional next-direction distribution.
 for(const order of [1,2,3]){
   if(d.length<=order)continue;
   const key=d.slice(-order).join('|'),c={CW:0,CCW:0,SAME:0};let total=0;
   for(let i=0;i+order<d.length;i++)if(d.slice(i,i+order).join('|')===key){c[d[i+order]]++;total++}
   if(total){for(let n=0;n<37;n++){let z=signed(h.at(-1),W[n]),q=z>0?'CW':z<0?'CCW':'SAME';scores[n]+=(c[q]/total)*2.2}evidence.push({name:'Direction pattern '+order,samples:total})}
 }
 // Joint jump+direction pattern.
 const sig=t.map(x=>x.jump+':'+x.dir);
 let patternCount=0;
 for(const order of [2,3,4]){
   if(sig.length<=order)continue;
   const key=sig.slice(-order).join('|'),c=Array(37).fill(0);let total=0;
   for(let i=0;i+order<sig.length;i++)if(sig.slice(i,i+order).join('|')===key){c[idx(h[i+order])]++;total++}
   if(total){patternCount++;for(let n=0;n<37;n++)scores[n]+=(c[n]/total)*4.0;evidence.push({name:'Joint jump+direction '+order,samples:total})}
 }
 // Previous-pair transition: learns common next pocket from the latest two pockets, if observed.
 if(h.length>=3){
   const key=h.slice(-2).join(',');
   const c=Array(37).fill(0);let total=0;
   for(let i=0;i+2<h.length;i++)if(h[i]+','+h[i+1]===key){c[idx(h[i+2])]++;total++}
   if(total){for(let n=0;n<37;n++)scores[n]+=(c[n]/total)*2.6;evidence.push({name:'Pocket pair pattern',samples:total})}
 }
 // Mild recency component across many observations.
 const start=Math.max(0,h.length-60);
 for(let i=start;i<h.length-1;i++){const age=(h.length-2)-i;scores[idx(h[i+1])]+=Math.pow(.985,age)*0.08}
 const rank=scores.map((score,n)=>({n,score})).sort((a,b)=>b.score-a.score);
 const total=rank.reduce((a,x)=>a+x.score,0);if(!total)return null;
 const r=rank.map(x=>({...x,p:x.score/total}));
 const best=r[0],expectedJump=r.reduce((a,x)=>a+signed(h.at(-1),x.n)*x.p,0);
 const cw=r.filter(x=>signed(h.at(-1),x.n)>0).reduce((a,x)=>a+x.p,0),ccw=r.filter(x=>signed(h.at(-1),x.n)<0).reduce((a,x)=>a+x.p,0);
 return {target:best.n,prob:best.p,ranking:r.slice(0,12),expectedJump,predDirection:cw>=ccw?'CW':'CCW',cw,ccw,evidence,patternCount};
}
function rate(ps,r){const a=ps.filter(x=>x.prediction&&x.actual!=null);return a.length?(100*a.filter(x=>distance(x.prediction.target,x.actual)<=r).length/a.length).toFixed(1)+'%':'—'}
function dirAcc(ps){const a=ps.filter(x=>x.prediction&&x.actual!=null&&x.previous!=null);return a.length?(100*a.filter(x=>direction(x.previous,x.actual)===x.prediction.predDirection).length/a.length).toFixed(1)+'%':'—'}
async function addSpin(n){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),h=ss.map(x=>x.result),p=buildModel(h),prev=h.at(-1)??null;const pid=await put(PREDS,{spinIndex:h.length+1,previous:prev,prediction:p,actual:null,createdAt:new Date().toISOString()});await put(SPINS,{result:n,createdAt:new Date().toISOString(),predictionId:pid});if(p){const q=(await all(PREDS)).find(x=>x.id===pid);q.actual=n;q.error=distance(p.target,n);q.actualDirection=prev==null?null:direction(prev,n);await put(PREDS,q)}await render()}
async function undo(){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id);if(!ss.length)return;const x=ss.at(-1);await del(SPINS,x.id);if(x.predictionId)await del(PREDS,x.predictionId);await render()}
async function txt(){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),lines=['ROULETTE PATTERN LAB v6.0','HISTORICAL SPINS'];for(let i=0;i<ss.length;i++){const prev=i?ss[i-1].result:'';const n=ss[i].result;lines.push(String(i+1).padStart(6,'0')+' | '+n+' | '+(prev!==''?signed(prev,n):'')+' | '+(prev!==''?direction(prev,n):'')+' | '+ss[i].createdAt)}const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain'}));a.download='roulette-history-v6.txt';a.click()}
async function backup(){const data={schemaVersion:6,exportedAt:new Date().toISOString(),wheel:W,spins:await all(SPINS),predictions:await all(PREDS)};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='roulette-pattern-lab-backup-v6.json';a.click()}
async function restore(file){try{const d=JSON.parse(await file.text());if(!Array.isArray(d.spins)||!Array.isArray(d.predictions))throw Error('Backup inválido');if(!confirm('Esto reemplazará el histórico actual. ¿Continuar?'))return;await new Promise((ok,no)=>{const t=db.transaction([SPINS,PREDS],'readwrite');t.objectStore(SPINS).clear();t.objectStore(PREDS).clear();t.oncomplete=ok;t.onerror=()=>no(t.error)});for(const x of d.spins)await put(SPINS,x);for(const x of d.predictions)await put(PREDS,x);await render();alert('Backup restaurado')}catch(e){alert(e.message)}}
async function render(){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),h=ss.map(x=>x.result),ps=await all(PREDS),p=buildModel(h),t=getTransitions(h);const cwCount=t.filter(x=>x.dir==='CW').length,ccwCount=t.filter(x=>x.dir==='CCW').length,rates={cw:t.length?100*cwCount/t.length:0,ccw:t.length?100*ccwCount/t.length:0};$('count').textContent=h.length+' spins';$('dbCount')?.textContent=h.length;$('history').innerHTML=h.slice(-24).map(n=>'<span>'+n+'</span>').join('');if(t.length){const x=t.at(-1);$('lastTransition').innerHTML='<b>'+x.from+'</b> → <b>'+x.to+'</b> · salto <b>'+x.jump+(x.jump>=0?'':'')+'</b> pockets · <b>'+x.dir+'</b> · distancia '+Math.abs(x.jump);$('jumpHistory').innerHTML=t.slice(-30).map((x,i)=>'<span>#'+(t.length-29+i)+' '+(x.jump>=0?'+':'')+x.jump+'</span>').join('');$('directionHistory').innerHTML=t.slice(-30).map((x,i)=>'<span>#'+(t.length-29+i)+' '+x.dir+'</span>').join('')}else{$('lastTransition').textContent='—';$('jumpHistory').textContent='—';$('directionHistory').textContent='—'}$('transitions').textContent=t.length;$('patterns').textContent=p?p.patternCount:0;$('cwRate').textContent=t.length?rates.cw.toFixed(1)+'%':'—';$('ccwRate').textContent=t.length?rates.ccw.toFixed(1)+'%':'—';if(p){$('target').textContent=p.target;$('signal').textContent=p.prob>=0.06?'SIGNAL':p.prob>=0.03?'WEAK SIGNAL':'LOW SIGNAL';$('probability').textContent='Probabilidad empírica del target: '+(p.prob*100).toFixed(2)+'%';$('jumpPrediction').textContent='Salto previsto: '+(p.expectedJump>=0?'+':'')+p.expectedJump.toFixed(2)+' pockets';$('directionPrediction').textContent='Dirección modelo: '+p.predDirection+' · CW '+(p.cw*100).toFixed(1)+'% / CCW '+(p.ccw*100).toFixed(1)+'%';$('zone').textContent='Zona ±5: '+neighbors(p.target,5).join(' · ');$('ranking').innerHTML=p.ranking.map((x,i)=>'<div class="rank"><b>#'+(i+1)+' '+x.n+'</b><div>'+ (x.p*100).toFixed(2)+'%</div><div class="bar"><i style="width:'+Math.max(2,100*x.p/p.ranking[0].p)+'%"></i></div></div>').join('');$('learningDetails').innerHTML=p.evidence.map(x=>'<div><b>'+x.name+'</b> · '+x.samples+' muestras</div>').join('')}else{$('target').textContent='—';$('signal').textContent='NO SIGNAL';$('probability').textContent='—';$('jumpPrediction').textContent='Salto previsto: —';$('directionPrediction').textContent='Dirección prevista: —';$('zone').textContent=h.length<12?'Necesitamos al menos 12 spins':'Sin evidencia suficiente';$('ranking').textContent='—';$('learningDetails').textContent='El motor necesita más datos'}$('pc').textContent=ps.filter(x=>x.prediction).length;$('r0').textContent=rate(ps,0);$('r1').textContent=rate(ps,1);$('r2').textContent=rate(ps,2);$('r3').textContent=rate(ps,3);$('r4').textContent=rate(ps,4);$('r5').textContent=rate(ps,5);$('dirAcc').textContent=dirAcc(ps);if($('saved'))$('saved').textContent=ss.length?ss.at(-1).createdAt:'—'}
(async()=>{try{await openDB();$('db').textContent='DB OK'}catch(e){$('db').textContent='DB ERROR';return}for(let n=0;n<=36;n++){const b=document.createElement('button');b.textContent=n;if(n===0)b.className='zero';b.onclick=()=>addSpin(n);$('numbers').appendChild(b)}$('undo').onclick=undo;$('txt').onclick=txt;$('json').onclick=backup;$('restoreBtn').onclick=()=>$('restore').click();$('restore').onchange=e=>e.target.files[0]&&restore(e.target.files[0]);await render()})()