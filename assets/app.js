const DB="RoulettePatternLabV4",W=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],RED=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);let db;
const $=x=>document.getElementById(x),idx=n=>W.indexOf(n);
function open(){return new Promise((ok,no)=>{let r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{let d=r.result;if(!d.objectStoreNames.contains("spins"))d.createObjectStore("spins",{keyPath:"id",autoIncrement:true});if(!d.objectStoreNames.contains("predictions"))d.createObjectStore("predictions",{keyPath:"id",autoIncrement:true})};r.onsuccess=()=>{db=r.result;ok()};r.onerror=()=>no(r.error)})}
function all(s){return new Promise((ok,no)=>{let r=db.transaction(s).objectStore(s).getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function put(s,o){return new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).put(o);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
function del(s,id){return new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).delete(id);r.onsuccess=ok;r.onerror=()=>no(r.error)})}
function jump(a,b){let x=(idx(b)-idx(a)+37)%37;return x>18?x-37:x}function dir(a,b){let x=jump(a,b);return x>0?"CW":x<0?"CCW":"SAME"}function dist(a,b){return Math.abs(jump(a,b))}function col(n){return n===0?"green":RED.has(n)?"red":"black"}function trans(h){let z=[];for(let i=1;i<h.length;i++)z.push({from:h[i-1],to:h[i],j:jump(h[i-1],h[i]),d:dir(h[i-1],h[i])});return z}

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

async function add(n){let ss=(await all("spins")).sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||"")||((a.id||0)-(b.id||0))),h=ss.map(x=>Number(x.result)),p=model(h),id=await put("predictions",{spinIndex:h.length+1,previous:h.at(-1)??null,prediction:p,actual:n,createdAt:new Date().toISOString()});await put("spins",{result:Number(n),createdAt:new Date().toISOString(),predictionId:id});await render()}
async function render(){
 let ss=(await all("spins")).sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||"")||((a.id||0)-(b.id||0))),h=ss.map(x=>Number(x.result)),ps=(await all("predictions")).sort((a,b)=>a.id-b.id),p=model(h),t=trans(h),bt=back(h),tol=+$("tol").value;
 $("spins").textContent=h.length;$("predCount").textContent=ps.filter(x=>x.prediction).length;$("evaluated").textContent=bt.n;$("history").innerHTML=h.slice(-24).map(n=>"<span class='"+col(n)+"'>"+n+"</span>").join("");
 if(t.length){let x=t.at(-1);$("transition").innerHTML="<b>"+x.from+"</b> → <b>"+x.to+"</b> · salto <b>"+(x.j>=0?"+":"")+x.j+"</b> · <b>"+x.d+"</b>";$("jumpHistory").innerHTML=t.slice(-30).map(x=>"<span>"+(x.j>=0?"+":"")+x.j+"</span>").join("");$("directionHistory").innerHTML=t.slice(-30).map(x=>"<span>"+x.d+"</span>").join("")}
 if(p){$("target").textContent=p.target;$("signal").textContent=p.prob>=.06?"SEÑAL":p.prob>=.035?"SEÑAL DÉBIL":"BAJA SEÑAL";$("probability").textContent="Probabilidad empírica: "+(p.prob*100).toFixed(2)+"%";let sj=jump(h.at(-1),p.target);$("jumpPrediction").textContent="Salto previsto: "+(sj>=0?"+":"")+sj+" pockets · esperado "+(p.expected>=0?"+":"")+p.expected.toFixed(2);$("directionPrediction").textContent="Dirección: "+p.predDir+" · CW "+(p.cw*100).toFixed(1)+"% / CCW "+(p.ccw*100).toFixed(1)+"%";$("zone").textContent="Zona ±5: "+neighbors(p.target).join(" · ");$("ranking").innerHTML=p.ranking.map((x,i)=>"<div class='rank'><b>#"+(i+1)+" "+x.n+"</b><div>"+(x.p*100).toFixed(2)+"%</div><div class='bar'><i style='width:"+Math.max(2,100*x.p/p.ranking[0].p)+"%'></i></div></div>").join("");$("explanation").innerHTML=p.ev.map(x=>"<div><b>"+x.x+"</b> · "+x.n+" muestras · "+x.y+"</div>").join("");$("alerts").innerHTML=p.sp.slice(0,4).map(x=>"<div class='alert'><b>SECUENCIA HISTÓRICA ACTIVADA</b><br>"+x.key+" → "+x.next.join(", ")+" · "+x.next.length+" coincidencias</div>").join("")||"No hay secuencia repetida suficiente."}else{$("target").textContent="—";$("signal").textContent="SIN SEÑAL";$("probability").textContent="Probabilidad: —";$("jumpPrediction").textContent="Salto previsto: —";$("directionPrediction").textContent="Dirección: —";$("zone").textContent=h.length<12?"Necesitamos al menos 12 spins":"—";$("ranking").textContent="—";$("alerts").textContent=h.length<12?"Aún no hay suficiente histórico.":"Sin patrón activo."}
 $("r0").textContent=pct(bt.hit[0],bt.n);$("r1").textContent=pct(bt.hit[1],bt.n);$("r3").textContent=pct(bt.hit[3],bt.n);$("r5").textContent=pct(bt.hit[5],bt.n);$("r9").textContent=pct(bt.hit[9],bt.n);$("btDir").textContent=pct(bt.dir,bt.n);$("baseline").textContent=bt.n?(100*(2*tol+1)/37).toFixed(1)+"%":"—";$("winRate").textContent=pct(bt.hit[tol],bt.n);$("vsBase").textContent=bt.n?(((bt.hit[tol]/bt.n-(2*tol+1)/37)*100>=0?"+":"")+((bt.hit[tol]/bt.n-(2*tol+1)/37)*100).toFixed(1)+" pp"):"—";$("dirAcc").textContent=pct(bt.dir,bt.n);
 let rows=ps.filter(x=>x.prediction&&x.actual!=null).slice(-30).reverse();$("predHistory").innerHTML=rows.map(x=>{let w=dist(x.prediction.target,x.actual)<=tol;return"<div class='predRow'><b>#"+x.spinIndex+"</b><span>"+x.prediction.target+" → "+x.actual+" · "+dist(x.prediction.target,x.actual)+"p</span><span>"+(x.prediction.predDir||"—")+"</span><b class='"+(w?"win":"loss")+"'>"+(w?"WIN":"LOSS")+"</b></div>"}).join("")||"—";
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
$("theme").onclick=()=>applyTheme(document.body.classList.contains("night")?"day":"night");$("clearHistory").onclick=async()=>{
  if(!confirm("¿Borrar TODO el historial, predicciones y aprendizaje local? Esta acción no se puede deshacer."))return;
  await new Promise((ok,no)=>{let t=db.transaction(["spins","predictions"],"readwrite");t.objectStore("spins").clear();t.objectStore("predictions").clear();t.oncomplete=ok;t.onerror=()=>no(t.error)});
  render();
};
$("undo").onclick=async()=>{let s=(await all("spins")).sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||"")||((a.id||0)-(b.id||0)));if(s.length){let x=s.at(-1);await del("spins",x.id);if(x.predictionId)await del("predictions",x.predictionId);render()}};$("txt").onclick=async()=>{let s=(await all("spins")).sort((a,b)=>a.id-b.id),l=s.map((x,i)=>{let p=i?s[i-1].result:null;return(i+1)+" | "+x.result+" | "+(p==null?"":jump(p,x.result))+" | "+(p==null?"":dir(p,x.result))}).join("\\n"),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([l],{type:"text/plain"}));a.download="roulette-history-v8.txt";a.click()};$("json").onclick=async()=>{let d={schemaVersion:8,spins:await all("spins"),predictions:await all("predictions"),wheel:W},a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(d,null,2)],{type:"application/json"}));a.download="roulette-pattern-lab-v8.json";a.click()};$("restoreBtn").onclick=()=>$("restore").click();$("restore").onchange=async e=>{let d=JSON.parse(await e.target.files[0].text());if(!confirm("Reemplazar histórico?"))return;let t=db.transaction(["spins","predictions"],"readwrite");t.objectStore("spins").clear();t.objectStore("predictions").clear();t.oncomplete=async()=>{for(let x of d.spins||[])await put("spins",x);for(let x of d.predictions||[])await put("predictions",x);render()}};
function buildNumberButtons(){
  const box=$("numbers");
  box.innerHTML="";
  for(let n=0;n<=36;n++){
    const b=document.createElement("button");
    b.type="button"; b.textContent=String(n); b.className=col(n);
    b.addEventListener("click",()=>add(n));
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