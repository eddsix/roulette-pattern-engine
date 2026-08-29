const DB_NAME="RoulettePatternLabV4",DB_VERSION=1,SPINS="spins",PREDS="predictions";
const W=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
let db;
const $=id=>document.getElementById(id),idx=n=>W.indexOf(n);
function openDB(){return new Promise((ok,no)=>{const r=indexedDB.open(DB_NAME,DB_VERSION);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(SPINS))d.createObjectStore(SPINS,{keyPath:"id",autoIncrement:true});if(!d.objectStoreNames.contains(PREDS))d.createObjectStore(PREDS,{keyPath:"id",autoIncrement:true})};r.onsuccess=()=>{db=r.result;ok()};r.onerror=()=>no(r.error)})}
function all(st){return new Promise((ok,no)=>{const r=db.transaction(st).objectStore(st).getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function put(st,o){return new Promise((ok,no)=>{const r=db.transaction(st,"readwrite").objectStore(st).put(o);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function del(st,id){return new Promise((ok,no)=>{const r=db.transaction(st,"readwrite").objectStore(st).delete(id);r.onsuccess=ok;r.onerror=()=>no(r.error)})}
function signed(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}
function distance(a,b){return Math.abs(signed(a,b))}
function direction(a,b){const s=signed(a,b);return s>0?"CW":s<0?"CCW":"SAME"}
function neighbors(n,r=5){const i=idx(n);return Array.from({length:2*r+1},(_,k)=>W[(i-r+k+37)%37])}
function transitions(h){const z=[];for(let i=1;i<h.length;i++)z.push({from:h[i-1],to:h[i],jump:signed(h[i-1],h[i]),dir:direction(h[i-1],h[i])});return z}
function normalize(c,s=.5){const total=c.reduce((a,b)=>a+b,0)+37*s;return c.map(x=>(x+s)/total)}

function model(h){
 if(h.length<12)return null;
 const score=Array(37).fill(0),ev=[],t=transitions(h),j=t.map(x=>x.jump),d=t.map(x=>x.dir);
 // 1. Full transition matrix, conditioned on the current pocket.
 const row=Array(37).fill(0);for(let i=0;i<h.length-1;i++)if(h[i]===h.at(-1))row[idx(h[i+1])]++;
 const rp=normalize(row,1);for(let n=0;n<37;n++)score[n]+=rp[n]*2.0;
 ev.push({name:"Transición desde pocket actual",samples:row.reduce((a,b)=>a+b,0),weight:2});
 // 2. Learn the next jump from the latest jump, with signed pocket offsets.
 const lj=j.at(-1),jc=Array(37).fill(0);for(let i=0;i<j.length-1;i++)if(j[i]===lj)jc[j[i+1]+18]++;
 const jp=normalize(jc,.35);for(let k=0;k<37;k++){const q=k-18,n=W[(idx(h.at(-1))+q+37)%37];score[n]+=jp[k]*3.5}
 ev.push({name:"Siguiente salto | "+(lj>=0?"+":"")+lj,samples:jc.reduce((a,b)=>a+b,0),weight:3.5});
 // 3. Learn the next direction from the latest direction.
 const ld=d.at(-1),dc={CW:.35,CCW:.35,SAME:.35};for(let i=0;i<d.length-1;i++)if(d[i]===ld)dc[d[i+1]]++;
 const dt=dc.CW+dc.CCW+dc.SAME;for(let n=0;n<37;n++){const s=signed(h.at(-1),n),q=s>0?"CW":s<0?"CCW":"SAME";score[n]+=(dc[q]/dt)*2.5}
 ev.push({name:"Siguiente dirección | "+ld,samples:Math.max(0,d.filter(x=>x===ld).length-1),weight:2.5});
 // 4. Joint jump+direction signatures.
 const sig=t.map(x=>x.jump+":"+x.dir);let active=0;
 for(const o of [2,3,4,5]){
   if(sig.length<=o)continue;const key=sig.slice(-o).join("|"),c=Array(37).fill(0);let total=0;
   for(let i=0;i+o<sig.length;i++)if(sig.slice(i,i+o).join("|")===key){c[idx(h[i+o])]++;total++}
   if(total){active++;for(let n=0;n<37;n++)score[n]+=(c[n]/total)*5;ev.push({name:"Patrón conjunto salto+dirección · orden "+o,samples:total,weight:5})}
 }
 // 5. Pure jump patterns.
 for(const o of [2,3,4]){
   if(j.length<=o)continue;const key=j.slice(-o).join(","),c=Array(37).fill(0);let total=0;
   for(let i=0;i+o<j.length;i++)if(j.slice(i,i+o).join(",")===key){const q=j[i+o],n=W[(idx(h.at(-1))+q+37)%37];c[idx(n)]++;total++}
   if(total){for(let n=0;n<37;n++)score[n]+=(c[n]/total)*3.2;ev.push({name:"Patrón puro de saltos · orden "+o,samples:total,weight:3.2})}
 }
 // 6. Pocket-pair pattern.
 if(h.length>=3){const key=h.at(-2)+","+h.at(-1),c=Array(37).fill(0);let total=0;for(let i=0;i+2<h.length;i++)if(h[i]+","+h[i+1]===key){c[idx(h[i+2])]++;total++}if(total){for(let n=0;n<37;n++)score[n]+=(c[n]/total)*3;ev.push({name:"Patrón de pareja de pockets",samples:total,weight:3})}}
 // 7. Small recency signal, intentionally weak.
 for(let i=Math.max(0,h.length-80);i<h.length-1;i++){const age=h.length-2-i;score[idx(h[i+1])]+=Math.pow(.985,age)*.08}
 // 8. No neighbor bonus: all 37 pockets are ranked only by learned evidence.
 const rank=score.map((v,n)=>({n,score:v})).sort((a,b)=>b.score-a.score),total=rank.reduce((a,x)=>a+x.score,0);if(!total)return null;
 const r=rank.map(x=>({...x,p:x.score/total})),best=r[0];
 const expected=r.reduce((a,x)=>a+signed(h.at(-1),x.n)*x.p,0);
 const cw=r.filter(x=>signed(h.at(-1),x.n)>0).reduce((a,x)=>a+x.p,0),ccw=r.filter(x=>signed(h.at(-1),x.n)<0).reduce((a,x)=>a+x.p,0);
 return {target:best.n,prob:best.p,ranking:r.slice(0,12),expectedJump:expected,predDirection:cw>=ccw?"CW":"CCW",cw,ccw,evidence:ev,activePatterns:active}
}

function backtest(h){
 const out={n:0,hit:[0,0,0,0,0,0],dirHit:0,dirN:0};
 for(let i=12;i<h.length;i++){const p=model(h.slice(0,i));if(!p)continue;out.n++;for(let r=0;r<=5;r++)if(distance(p.target,h[i])<=r)out.hit[r]++;if(i>0){out.dirN++;if(direction(h[i-1],h[i])===p.predDirection)out.dirHit++}}
 return out
}
function pct(n,d){return d?(100*n/d).toFixed(1)+"%":"—"}

async function addSpin(n){
 const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),h=ss.map(x=>x.result),p=model(h);
 const pid=await put(PREDS,{spinIndex:h.length+1,previous:h.at(-1)??null,prediction:p,actual:n,createdAt:new Date().toISOString()});
 await put(SPINS,{result:n,createdAt:new Date().toISOString(),predictionId:pid});
 await render()
}
async function undo(){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id);if(!ss.length)return;const x=ss.at(-1);await del(SPINS,x.id);if(x.predictionId)await del(PREDS,x.predictionId);await render()}
async function exportTxt(){const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),lines=["ROULETTE PATTERN LAB v7.0","HISTORICAL SPINS",""];for(let i=0;i<ss.length;i++){const prev=i?ss[i-1].result:null,n=ss[i].result;lines.push(String(i+1).padStart(6,"0")+" | "+n+" | "+(prev===null?"":signed(prev,n))+" | "+(prev===null?"":direction(prev,n))+" | "+ss[i].createdAt)}const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/plain"}));a.download="roulette-history-v7.txt";a.click()}
async function backup(){const data={schemaVersion:7,wheel:W,exportedAt:new Date().toISOString(),spins:await all(SPINS),predictions:await all(PREDS)};const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));a.download="roulette-pattern-lab-backup-v7.json";a.click()}
async function restore(file){try{const d=JSON.parse(await file.text());if(!Array.isArray(d.spins))throw Error("Backup inválido");if(!confirm("Esto reemplazará el histórico actual. ¿Continuar?"))return;await new Promise((ok,no)=>{const t=db.transaction([SPINS,PREDS],"readwrite");t.objectStore(SPINS).clear();t.objectStore(PREDS).clear();t.oncomplete=ok;t.onerror=()=>no(t.error)});for(const x of d.spins)await put(SPINS,x);for(const x of (Array.isArray(d.predictions)?d.predictions:[]))await put(PREDS,x);await render();alert("Backup restaurado")}catch(e){alert(e.message)}}

async function render(){
 const ss=(await all(SPINS)).sort((a,b)=>a.id-b.id),h=ss.map(x=>x.result),ps=await all(PREDS),p=model(h),t=transitions(h),bt=backtest(h);
 $("count").textContent=h.length+" spins";$("sCount").textContent=h.length;$("tCount").textContent=t.length;
 $("history").innerHTML=h.slice(-24).map(n=>"<span>"+n+"</span>").join("");
 if(t.length){const x=t.at(-1);$("transition").innerHTML="<b>"+x.from+"</b> → <b>"+x.to+"</b> · salto <b>"+(x.jump>=0?"+":"")+x.jump+"</b> pockets · <b>"+x.dir+"</b> · distancia "+Math.abs(x.jump);$("jumpHistory").innerHTML=t.slice(-30).map((x,i)=>"<span>#"+(t.length-29+i)+" "+(x.jump>=0?"+":"")+x.jump+"</span>").join("");$("directionHistory").innerHTML=t.slice(-30).map((x,i)=>"<span>#"+(t.length-29+i)+" "+x.dir+"</span>").join("")}else{$("transition").textContent="—";$("jumpHistory").textContent="—";$("directionHistory").textContent="—"}
 const dc={CW:0,CCW:0,SAME:0};t.forEach(x=>dc[x.dir]++);$("cw").textContent=pct(dc.CW,t.length);$("ccw").textContent=pct(dc.CCW,t.length);$("same").textContent=pct(dc.SAME,t.length);$("dirTotal").textContent=t.length;
 if(p){$("target").textContent=p.target;$("signal").textContent=p.prob>=.06?"SEÑAL":p.prob>=.035?"SEÑAL DÉBIL":"BAJA SEÑAL";$("probability").textContent="Probabilidad empírica del target: "+(p.prob*100).toFixed(2)+"%";$("jumpPrediction").textContent="Salto previsto: "+(p.expectedJump>=0?"+":"")+p.expectedJump.toFixed(2)+" pockets";$("directionPrediction").textContent="Dirección prevista: "+p.predDirection+" · CW "+(p.cw*100).toFixed(1)+"% / CCW "+(p.ccw*100).toFixed(1)+"%";$("zone").textContent="Zona ±5: "+neighbors(p.target,5).join(" · ");$("ranking").innerHTML=p.ranking.map((x,i)=>"<div class='rank'><b>#"+(i+1)+" "+x.n+"</b><div>"+(x.p*100).toFixed(2)+"%</div><div class='bar'><i style='width:"+Math.max(2,100*x.p/p.ranking[0].p)+"%'></i></div></div>").join("");$("pCount").textContent=p.activePatterns;$("learning").innerHTML=p.evidence.map(x=>"<div><b>"+x.name+"</b> · "+x.samples+" muestras · peso "+x.weight+"</div>").join("")}else{$("target").textContent="—";$("signal").textContent="SIN SEÑAL";$("probability").textContent="Probabilidad empírica: —";$("jumpPrediction").textContent="Salto previsto: —";$("directionPrediction").textContent="Dirección prevista: —";$("zone").textContent=h.length<12?"Necesitamos al menos 12 spins":"Sin evidencia suficiente";$("ranking").textContent="—";$("pCount").textContent="0";$("learning").textContent="El modelo comienza a generar predicciones con 12 spins de entrenamiento."}
 $("vCount").textContent=bt.n;for(let r=0;r<=5;r++)$("r"+r).textContent=pct(bt.hit[r],bt.n);$("dirAcc").textContent=pct(bt.dirHit,bt.dirN);$("baseline5").textContent=bt.n?(100*11/37).toFixed(1)+"%":"—";$("backtestNote").textContent=bt.n?"Evaluadas "+bt.n+" predicciones históricas sin mirar su resultado futuro.":"La primera evaluación walk-forward aparece cuando existen al menos 13 spins."
}

(async()=>{try{await openDB();$("db").textContent="DB OK"}catch(e){$("db").textContent="DB ERROR";return}for(let n=0;n<=36;n++){const b=document.createElement("button");b.textContent=n;if(n===0)b.className="zero";b.onclick=()=>addSpin(n);$("numbers").appendChild(b)}$("undo").onclick=undo;$("txt").onclick=exportTxt;$("json").onclick=backup;$("restoreBtn").onclick=()=>$("restore").click();$("restore").onchange=e=>e.target.files[0]&&restore(e.target.files[0]);await render()})()