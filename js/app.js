
(()=>{
'use strict';
const VERSION='14.0', KEY='roulettePatternLab.v14', THEME_KEY='roulettePatternLab.theme';
const FAMILIES=['sequence','jump','joint','pair','transition'];
const CACHE_LIMIT=80;
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const wheel=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const pos=new Map(wheel.map((n,i)=>[n,i]));
const red=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const cache={candidates:new Map(),familyTarget:new Map(),familyBacktest:new Map(),meta:new Map(),model:new Map(),memory:new Map(),trans:new Map()};
const emptyPerf=()=>({n:0,hit:0,exact:0,edge:0,recentEdge:0,robustEdge:0,stability:0,stability20:0,windowEdge:0});
let S=loadState();
function fresh(){return {version:VERSION,spins:[],predictions:[],settings:{tol:3,chartWindow:60}}}
function normalize(x){
  const s=fresh();
  if(!x||typeof x!=='object')return s;
  s.spins=Array.isArray(x.spins)?x.spins.map((v,i)=>({id:Number(v.id)||i+1,result:Number(v.result),createdAt:v.createdAt||new Date().toISOString()})).filter(v=>Number.isInteger(v.result)&&v.result>=0&&v.result<=36):[];
  s.settings={tol:clamp(Number(x.settings?.tol)||3,1,9),chartWindow:[30,60,120].includes(Number(x.settings?.chartWindow))?Number(x.settings.chartWindow):60};
  s.predictions=Array.isArray(x.predictions)?x.predictions:[];
  s.version=VERSION;
  return s;
}
function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x?.spins)return normalize(x)}catch{} for(const k of ['roulettePatternLab.v13.6','roulettePatternLab.v13.5','roulettePatternLab.v13.4','roulettePatternLab.v12','roulettePatternLab.v10']){try{const x=JSON.parse(localStorage.getItem(k)||'null');if(x?.spins){const s=normalize(x);localStorage.setItem(KEY,JSON.stringify(s));return s}}catch{}} return fresh()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}}
function invalidateAll(){Object.values(cache).forEach(m=>m.clear())}
function hashHistory(h,tol){let x=2166136261;for(let i=0;i<h.length;i++){x^=h[i]+i*31;x=Math.imul(x,16777619)}return (x>>>0)+'|'+tol+'|'+h.length+(h.length?h[h.length-1]:'')}
function keyArr(a){return a.join(',')}
function idx(n){return pos.get(n) ?? 0}
function col(n){return n===0?'green':red.has(n)?'red':'black'}
function jmp(a,b){if(a==null||b==null)return 0;let d=idx(b)-idx(a);if(d>18)d-=37;if(d<-18)d+=37;return d}
function dist(a,b){return Math.min(Math.abs(idx(a)-idx(b)),37-Math.abs(idx(a)-idx(b)))}
function dir(a,b){const j=jmp(a,b);return j>0?'CW':j<0?'CCW':'SAME'}
function neigh(n,t){return Array.from({length:2*t+1},(_,k)=>wheel[(idx(n)-t+k+37*4)%37])}
function baseline(t){return (2*t+1)/37}
function pct(a,b){return b?(100*a/b).toFixed(1)+'%':'—'}
function robustEdgeWilson(hit,n,tol){
  if(!n)return 0;
  const z=1.96,p=hit/n,den=1+z*z/n,center=(p+z*z/(2*n))/den,half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den;
  return center-half-baseline(tol);
}
function getTrans(h){const k=keyArr(h);if(cache.trans.has(k))return cache.trans.get(k);const a=[];for(let i=1;i<h.length;i++)a.push({from:h[i-1],to:h[i],j:jmp(h[i-1],h[i]),d:dir(h[i-1],h[i])});cache.trans.set(k,a);return a}
function candidates(h,f){
  const key=hashHistory(h,0)+'|'+f;if(cache.candidates.has(key))return cache.candidates.get(key);
  if(h.length<12){cache.candidates.set(key,[]);return []}
  const out=[];
  if(f==='sequence'){
    for(let l=2;l<=Math.min(8,h.length-1);l++){const sig=h.slice(-l).join(',');const next=[];for(let i=0;i+l<h.length;i++){if(h.slice(i,i+l).join(',')===sig)next.push(h[i+l])}if(next.length>=2)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='jump'){
    const a=getTrans(h).map(x=>x.j);for(let l=2;l<=Math.min(6,a.length-1);l++){const sig=a.slice(-l).join(',');const next=[];for(let i=0;i+l<a.length;i++){if(a.slice(i,i+l).join(',')===sig)next.push(a[i+l])}if(next.length>=2)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='joint'){
    const a=getTrans(h).map(x=>x.j+':'+x.d);for(let l=2;l<=Math.min(6,a.length-1);l++){const sig=a.slice(-l).join('|');const next=[];for(let i=0;i+l<a.length;i++){if(a.slice(i,i+l).join('|')===sig)next.push(h[i+l])}if(next.length>=2)out.push({type:f,len:l,key:sig,occ:next.length,next})}
  }else if(f==='pair'){
    const sig=h.slice(-2).join(','),next=[];for(let i=0;i+2<h.length;i++)if(h[i]+','+h[i+1]===sig)next.push(h[i+2]);if(next.length>=2)out.push({type:f,len:2,key:sig,occ:next.length,next});
  }else{
    const sig=String(h.at(-1)),next=[];for(let i=0;i<h.length-1;i++)if(h[i]===h.at(-1))next.push(h[i+1]);if(next.length>=2)out.push({type:f,len:1,key:sig,occ:next.length,next});
  }
  const r=out.sort((a,b)=>b.len-a.len||b.occ-a.occ);cache.candidates.set(key,r);return r;
}
function weightedFamilyTarget(h,f){
  const key=hashHistory(h,0)+'|'+f;if(cache.familyTarget.has(key))return cache.familyTarget.get(key);
  const cs=candidates(h,f);if(!cs.length){cache.familyTarget.set(key,null);return null}
  const q=Array(37).fill(0);
  cs.slice(0,5).forEach(p=>{const reliability=clamp(0.58+0.05*Math.min(p.occ,10)+0.045*Math.min(p.len,8),0.58,1.25);const uniq=new Set(p.next);uniq.forEach(n=>q[idx(n)]+=reliability/Math.max(1,uniq.size))});
  let best=0;for(let n=1;n<37;n++)if(q[n]>q[best])best=n;const ans=q[best]?best:null;cache.familyTarget.set(key,ans);return ans;
}
function familyBacktest(h,f,tol){
  const key=hashHistory(h,tol)+'|'+f;if(cache.familyBacktest.has(key))return cache.familyBacktest.get(key);
  if(h.length<14){const z=emptyPerf();cache.familyBacktest.set(key,z);return z}
  const start=Math.max(12,h.length-160),rows=[];
  for(let i=start;i<h.length;i++){const t=weightedFamilyTarget(h.slice(0,i),f);if(t==null)continue;rows.push({hit:dist(t,h[i])<=tol,exact:dist(t,h[i])===0})}
  if(!rows.length){const z=emptyPerf();cache.familyBacktest.set(key,z);return z}
  const n=rows.length,hit=rows.filter(x=>x.hit).length,exact=rows.filter(x=>x.exact).length,recent=rows.slice(-Math.min(20,n)),rh=recent.filter(x=>x.hit).length;
  const edge=hit/n-baseline(tol),recentEdge=rh/recent.length-baseline(tol),robust=robustEdgeWilson(hit,n,tol),mid=Math.max(10,Math.floor(n/2)),a=rows.slice(0,mid),b=rows.slice(mid),ra=a.length?a.filter(x=>x.hit).length/a.length:0,rb=b.length?b.filter(x=>x.hit).length/b.length:0;
  const stability20=clamp(1-Math.abs(edge-recentEdge)/Math.max(0.05,Math.abs(edge)+0.02),0,1),stabilityHalf=clamp(1-Math.abs(ra-rb)/Math.max(0.10,Math.abs(ra)+Math.abs(rb)+0.10),0,1);
  const result={n,hit,exact,edge,recentEdge,robustEdge:robust,stability:0.55*stability20+0.45*stabilityHalf,stability20,windowEdge:edge};cache.familyBacktest.set(key,result);return result;
}
function metaBacktest(h,tol){
  const key=hashHistory(h,tol)+'|meta';if(cache.meta.has(key))return cache.meta.get(key);const combos={};
  for(let i=Math.max(14,h.length-140);i<h.length;i++){
    const hh=h.slice(0,i),targets={};FAMILIES.forEach(f=>targets[f]=weightedFamilyTarget(hh,f));const active=FAMILIES.filter(f=>targets[f]!=null);
    for(let a=0;a<active.length;a++)for(let b=a+1;b<active.length;b++){const fa=active[a],fb=active[b],same=targets[fa]===targets[fb];if(!same)continue;const k=fa+'+'+fb;(combos[k]??={n:0,hit:0}).n++;if(dist(targets[fa],h[i])<=tol)combos[k].hit++}
  }
  const out={};Object.entries(combos).forEach(([k,v])=>out[k]={...v,edge:v.hit/v.n-baseline(tol),robustEdge:robustEdgeWilson(v.hit,v.n,tol)});cache.meta.set(key,out);return out;
}
function adaptive(h,tol){
  const perf={},weights={};FAMILIES.forEach(f=>{const p=familyBacktest(h,f,tol);perf[f]=p;const sample=clamp(p.n/70,0,1),robustBoost=clamp(1+p.robustEdge*7,0.45,1.65),recency=clamp(1+p.recentEdge*4,0.65,1.35),stability=0.78+0.22*p.stability;weights[f]=clamp(0.55+0.90*sample*robustBoost*recency*stability,0.45,2.0)});return {perf,weights,meta:metaBacktest(h,tol)};
}
function calibrateRelative(scores){
  const floor=0.015,temps=scores.map(v=>Math.sqrt(Math.max(v,0)));const sum=temps.reduce((a,b)=>a+b,0)||1;return temps.map(v=>Math.max(floor,v/sum));
}
function model(h,tol){
  const key=hashHistory(h,tol);if(cache.model.has(key))return cache.model.get(key);if(h.length<12)return null;
  const a=adaptive(h,tol),score=Array(37).fill(0.018),support=Array(37).fill(0),familyTargets={};
  for(const f of FAMILIES){const w=a.weights[f],cs=candidates(h,f),ft=weightedFamilyTarget(h,f);familyTargets[f]=ft;cs.slice(0,5).forEach(q=>{const lenBoost=q.len>=6?1.25:q.len>=4?1.12:1,occBoost=clamp(Math.log2(q.occ+1)/2,0.5,1.35),sampleConfidence=clamp(q.occ/7,0.35,1),localW=w*lenBoost*occBoost*sampleConfidence,uniq=[...new Set(q.next)];uniq.forEach(n=>{score[idx(n)]+=localW/Math.max(1,uniq.length);support[idx(n)]++})})}
  Object.entries(a.meta).forEach(([k,m])=>{if(m.n<6||m.robustEdge<=0)return;const [fa,fb]=k.split('+'),t=familyTargets[fa];if(t!=null&&familyTargets[fb]===t){score[idx(t)]+=clamp(m.robustEdge*16,0.03,0.55);support[idx(t)]+=0.5}});
  const last=h.at(-1),row=Array(37).fill(0);for(let i=0;i<h.length-1;i++)if(h[i]===last)row[idx(h[i+1])]++;const rz=row.reduce((a,b)=>a+b,0);if(rz)for(let n=0;n<37;n++)if(row[n])score[n]+=0.95*(row[n]/rz);
  const recent=h.slice(-10),cnt=new Map();recent.forEach(n=>cnt.set(n,(cnt.get(n)||0)+1));for(let n=0;n<37;n++){const c=cnt.get(n)||0;if(c>=3)score[n]*=(c===3?0.90:c===4?0.82:0.72)}
  const probs=calibrateRelative(score),ranked=score.map((v,n)=>({n,v,p:probs[n],support:support[n],transition:row[n]})).sort((a,b)=>b.p-a.p||b.support-a.support||b.transition-a.transition),top=ranked[0],second=ranked[1],lead=top.p-second.p;
  let cw=0,ccw=0;for(const x of ranked){const j=jmp(last,x.n);if(j>0)cw+=x.p;else if(j<0)ccw+=x.p}const active=FAMILIES.filter(f=>a.perf[f].n>0).length;
  const familyRobust=FAMILIES.map(f=>a.perf[f].n?a.perf[f].robustEdge:0).filter(x=>Number.isFinite(x)),avgRobust=familyRobust.length?familyRobust.reduce((s,x)=>s+x,0)/familyRobust.length:0;
  const familyRecent=FAMILIES.map(f=>a.perf[f].n?a.perf[f].recentEdge:0).filter(x=>Number.isFinite(x)),avgRecent=familyRecent.length?familyRecent.reduce((s,x)=>s+x,0)/familyRecent.length:0;
  const edge=top.p-baseline(tol),robustEdge=avgRobust,consensusCount=FAMILIES.filter(f=>a.perf[f].n&&familyTargets[f]===top.n).length,consensus=active?consensusCount/active:0;
  const stability=clamp(0.55*clamp(1-Math.abs(avgRobust-avgRecent)/Math.max(0.05,Math.abs(avgRobust)+0.02),0,1)+0.45*(FAMILIES.reduce((s,f)=>s+(a.perf[f].n?a.perf[f].stability:0),0)/Math.max(1,active)),0,1);
  const recentQuality=clamp((avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1),sampleQuality=clamp((a.perf[topSupportFamily(ranked, a, familyTargets, top.n)]?.n||0)/100,0,1);
  const confidence=Math.round(clamp(28+lead*1000+clamp(top.support/Math.max(1,active),0,1)*22+consensus*25+stability*12+clamp(avgRobust*400,-8,20),5,99));
  const quality=Math.round(clamp(consensus*28+stability*22+clamp((robustEdge+0.03)/0.08,0,1)*25+clamp((Math.log1p(Math.max(0,top.support))/3),0,1)*10+recentQuality*15,0,100));
  const signal=!ranked.length||active<2||confidence<45||edge<0.003||robustEdge<=0?'NONE':confidence>=72&&robustEdge>=0.008&&quality>=70?'HIGH':'LOW';
  const target=ranked.length?top.n:null,jump=target==null?null:jmp(last,target);
  const result={target,prob:target==null?0:top.p,ranking:ranked.slice(0,12),predDir:cw>=ccw?'CW':'CCW',cw,ccw,adaptive:a,seq:candidates(h,'sequence').slice(0,4),joint:candidates(h,'joint').slice(0,3),jumps:candidates(h,'jump').slice(0,3),edge,robustEdge,confidence,signal,lead,avgEdge:avgRobust,avgRecent,stability,consensusCount,activeModels:active,jump,quality,familyTargets};
  cache.model.set(key,result);if(cache.model.size>CACHE_LIMIT)cache.model.delete(cache.model.keys().next().value);return result;
}
function topSupportFamily(ranked,a,targets,n){let best=FAMILIES[0],bn=-1;for(const f of FAMILIES){const q=a.perf[f];if(targets[f]===n&&(q.n>bn)){best=f;bn=q.n}}return best}
function rebuildPredictions(){
  const h=S.spins.map(x=>x.result),out=[];for(let i=0;i<h.length;i++){const prior=h.slice(0,i);if(prior.length<12)continue;const p=model(prior,S.settings.tol);if(p)out.push({id:out.length+1,spinIndex:i+1,previous:prior.at(-1)??null,prediction:p,actual:h[i],createdAt:S.spins[i].createdAt||new Date().toISOString()})}S.predictions=out;
}
function ensurePredictions(){
  const expected=Math.max(0,S.spins.length-12),last=S.predictions.at(-1)?.spinIndex||0;if(S.predictions.length!==expected||last!==S.spins.length){rebuildPredictions();save()}
}
function backtest(tol){ensurePredictions();const rows=S.predictions.filter(x=>x?.prediction?.target!=null&&x.spinIndex<=S.spins.length),n=rows.length,hit=rows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length,exact=rows.filter(x=>dist(x.prediction.target,x.actual)===0).length,dirHit=rows.filter(x=>x.prediction.predDir&&x.previous!=null&&x.prediction.predDir===dir(x.previous,x.actual)).length;return {n,hit,exact,dir:dirHit,rows}}
function patternMemory(h){const key=hashHistory(h,0);if(cache.memory.has(key))return cache.memory.get(key);const mem={};FAMILIES.forEach(f=>candidates(h,f).forEach(q=>{const k=q.type+'|'+q.key;if(!mem[k])mem[k]={type:q.type,key:q.key,occ:q.occ,next:{}};mem[k].occ=Math.max(mem[k].occ,q.occ);q.next.forEach(n=>mem[k].next[n]=(mem[k].next[n]||0)+1)}));const out=Object.values(mem);cache.memory.set(key,out);return out}
function add(n){
  const value=Number(n),h=S.spins.map(x=>x.result),now=new Date().toISOString();
  const p=h.length>=12?model(h,S.settings.tol):null;
  S.spins.push({id:S.spins.length?Math.max(...S.spins.map(x=>x.id))+1:1,result:value,createdAt:now});
  if(p)S.predictions.push({id:S.predictions.length?Math.max(...S.predictions.map(x=>x.id))+1:1,spinIndex:S.spins.length,previous:h.at(-1)??null,prediction:p,actual:value,createdAt:now});
  invalidateAll();save();render();
}
function undo(){if(!S.spins.length)return;S.spins.pop();S.predictions=(S.predictions||[]).filter(x=>x.spinIndex<=S.spins.length);invalidateAll();save();render()}
function clearAll(){if(confirm('¿Borrar todo el histórico?')){S=fresh();invalidateAll();save();render()}}
function render(){
  const h=S.spins.map(x=>x.result),t=getTrans(h),p=model(h,S.settings.tol),bt=backtest(S.settings.tol),tol=S.settings.tol;
  document.querySelectorAll('.tolText').forEach(e=>e.textContent=tol);$('counter').textContent=h.length+' spins';$('evals').textContent=bt.n;$('tolLabel').textContent=tol;
  $('history').innerHTML=h.slice(-80).reverse().map(n=>`<span class="result ${col(n)}">${n}</span>`).join('')||'<span class="muted">Sin resultados</span>';
  $('jumps').innerHTML=t.slice(-80).reverse().map(x=>`<span class="chip">${x.j>=0?'+':''}${x.j}</span>`).join('')||'<span class="muted">—</span>';
  $('dirs').innerHTML=t.slice(-80).reverse().map(x=>`<span class="chip">${x.d}</span>`).join('')||'<span class="muted">—</span>';
  $('tol').value=String(tol);
  if(!p){renderEmpty(h);drawChart();return}
  const tg=$('target');tg.textContent=p.target==null?'—':p.target;tg.className='target '+(p.target==null?'black':col(p.target));$('prob').textContent=p.target==null?'—':(p.prob*100).toFixed(2)+'%';
  const sm=p.signal==='HIGH'?'SEÑAL FUERTE':p.signal==='LOW'?'SEÑAL DÉBIL':'SIN EDGE';$('signal').textContent=sm;$('signal').className='signal '+(p.signal==='HIGH'?'high':p.signal==='LOW'?'low':'none');
  $('predDir').textContent=p.target==null?'Dirección: —':`Dirección: ${p.predDir} · CW ${(p.cw*100).toFixed(1)}% / CCW ${(p.ccw*100).toFixed(1)}%`;$('predJump').textContent=p.target==null?'Salto previsto: —':`Salto previsto: ${p.jump>=0?'+':''}${p.jump} pockets`;$('zone').textContent=p.target==null?'No hay zona con evidencia suficiente':neigh(p.target,tol).join(' · ');
  $('confidence').textContent=p.confidence+'/100';$('edge').textContent=fmtPP(p.edge);$('support').textContent=p.activeModels+'/'+FAMILIES.length;$('qualityMini').textContent=p.quality+'/100';$('quality').textContent=p.quality;$('qualityFill').style.width=p.quality+'%';$('qualitySummary').textContent=`La calidad combina consenso, estabilidad, edge robusto, tamaño de muestra y comportamiento reciente. No equivale a una probabilidad garantizada de acierto.`;
  $('qConsensus').textContent=Math.round((p.activeModels?p.consensusCount/p.activeModels:0)*100)+'/100';$('qStability').textContent=Math.round(p.stability*100)+'/100';$('qRobust').textContent=fmtPP(p.robustEdge);$('qSample').textContent=Math.round(clamp((p.adaptive.perf[topSupportFamily(p.ranking,p.adaptive,p.familyTargets,p.target)]?.n||0)/100,0,1)*100)+'/100';$('qRecent').textContent=Math.round(clamp((p.avgRecent+baseline(tol))/(Math.max(0.001,1-baseline(tol))),0,1)*100)+'/100';
  $('robustEdge').textContent=fmtPP(p.robustEdge);$('consensus').textContent=p.consensusCount+'/'+p.activeModels;$('stability').textContent=Math.round(p.stability*100)+'/100';
  $('ranking').innerHTML=p.ranking.slice(0,3).map((x,i)=>`<div class="rank"><div class="ranktop"><span>#${i+1} · ${x.n}${x.support?` · ${x.support} apoyos`:''}</span><b>${(x.p*100).toFixed(2)}%</b></div><div class="bar"><i style="width:${Math.max(2,100*x.p/p.ranking[0].p)}%"></i></div></div>`).join('');
  $('alerts').innerHTML=[...p.seq,...p.joint,...p.jumps].slice(0,7).map(q=>`<div class="alert"><b>${q.type==='sequence'?'SECUENCIA':q.type==='joint'?'SALTO + DIRECCIÓN':'PATRÓN DE SALTOS'}</b><br>${esc(q.key).replaceAll(',',' → ')} · ${q.occ} coincidencias · siguientes: ${q.next.join(', ')}</div>`).join('')||'<span class="muted">No hay patrón repetido suficiente.</span>';
  $('weights').innerHTML=FAMILIES.map(k=>{const v=p.adaptive.weights[k],q=p.adaptive.perf[k];return `<div class="weight"><span class="muted">${k}</span><br><b>${v.toFixed(2)}×</b><div class="muted">${q.n} tests · ±${tol}: ${pct(q.hit,q.n)} · edge ${q.n?fmtPP(q.edge):'—'} · reciente ${q.n?fmtPP(q.recentEdge):'—'} · robusto ${q.n?fmtPP(q.robustEdge):'—'}</div></div>`}).join('');
  $('weightSummary').textContent='Los pesos se calculan únicamente con resultados disponibles antes de cada evaluación. Las predicciones históricas no se recalculan al añadir spins nuevos.';
  $('learningSummary').textContent=FAMILIES.map(f=>{const q=p.adaptive.perf[f];return q.n?`${f}: ${q.n} tests, ${fmtPP(q.edge)} histórico, ${fmtPP(q.recentEdge)} reciente, ${Math.round(q.stability*100)}/100 estabilidad`:`${f}: sin muestra`}).join(' · ');
  $('predHistory').innerHTML=bt.rows.slice(-60).reverse().map(x=>{const pr=x.prediction,win=dist(pr.target,x.actual)<=tol,j=pr.jump==null?'—':`${pr.jump>=0?'+':''}${pr.jump}`;return `<div class="prow"><b>#${x.spinIndex}</b><span>${pr.target} → ${x.actual}</span><span>${j} pockets</span><span>${pr.confidence}/100</span><b class="${win?'win':'loss'}">${win?'WIN':'LOSS'}</b></div>`}).join('')||'—';
  const base=100*baseline(tol), recentRows=bt.rows.slice(-20),recentRate=recentRows.length?100*recentRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/recentRows.length:null,chartRows=bt.rows.slice(-Number(S.settings.chartWindow)),chartRate=chartRows.length?100*chartRows.filter(x=>dist(x.prediction.target,x.actual)<=tol).length/chartRows.length:null;
  $('chartRate').textContent=chartRate==null?'—':chartRate.toFixed(1)+'%';$('chartBase').textContent=base.toFixed(1)+'%';$('chartEdge').textContent=chartRate==null?'—':((chartRate-base>=0?'+':'')+(chartRate-base).toFixed(1)+' pp');$('chartEval').textContent=chartRows.length;$('chartRecent').textContent=recentRate==null?'—':recentRate.toFixed(1)+'%';
  drawChart();
}
function renderEmpty(h){$('target').textContent='—';$('target').className='target black';$('prob').textContent='—';$('signal').textContent=h.length<12?'ESPERANDO DATOS':'SIN SEÑAL';$('signal').className='signal';$('predDir').textContent='Dirección: —';$('predJump').textContent='Salto previsto: —';$('zone').textContent=h.length<12?`Se necesitan al menos 12 spins`:'—';$('confidence').textContent='—';$('edge').textContent='—';$('support').textContent='—';$('qualityMini').textContent='—';$('robustEdge').textContent='—';$('consensus').textContent='—';$('stability').textContent='—';$('quality').textContent='—';$('qualityFill').style.width='0%';$('qualitySummary').textContent='';['qConsensus','qStability','qRobust','qSample','qRecent'].forEach(id=>$(id).textContent='—');$('ranking').innerHTML='';$('alerts').innerHTML=h.length<12?'Se necesitan al menos 12 spins.':'—';$('weights').innerHTML=FAMILIES.map(k=>`<div class="weight"><span class="muted">${k}</span><br><b>—</b><div class="muted">Sin muestra</div></div>`).join('');$('learningSummary').textContent='';$('predHistory').innerHTML='—';}
function drawChart(){
  const c=$('chart'),d=devicePixelRatio||1,w=c.clientWidth||500,hh=c.clientHeight||240;c.width=w*d;c.height=hh*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,w,hh);const rows=S.predictions.filter(r=>r?.prediction?.target!=null),tol=S.settings.tol,win=Number(S.settings.chartWindow),slice=rows.slice(-win);if(!slice.length){x.fillStyle=getComputedStyle(document.body).getPropertyValue('--muted');x.font='12px system-ui';x.fillText('Aún no hay suficientes predicciones evaluadas.',12,25);return}
  const vals=[];let hits=0;const base=100*baseline(tol);slice.forEach(r=>{if(dist(r.prediction.target,r.actual)<=tol)hits++;vals.push(100*hits/(vals.length+1))});const color=getComputedStyle(document.body).getPropertyValue('--accent');x.strokeStyle=color;x.lineWidth=2;x.beginPath();vals.forEach((y,i,a)=>{const xx=8+i*(w-16)/Math.max(1,a.length-1),yy=hh-16-y*(hh-30)/100;i?x.lineTo(xx,yy):x.moveTo(xx,yy)});x.stroke();x.strokeStyle=getComputedStyle(document.body).getPropertyValue('--muted');x.lineWidth=1;x.setLineDash([4,4]);const by=hh-16-base*(hh-30)/100;x.beginPath();x.moveTo(8,by);x.lineTo(w-8,by);x.stroke();x.setLineDash([]);
}
function fmtPP(v){return (v*100>=0?'+':'')+(v*100).toFixed(1)+' pp'}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
$('theme').onclick=()=>{document.body.classList.toggle('night');const n=document.body.classList.contains('night');localStorage.setItem(THEME_KEY,n?'night':'day');$('theme').textContent=n?'Modo día':'Modo noche';drawChart()};
$('undo').onclick=undo;$('clear').onclick=clearAll;
$('tol').onchange=()=>{S.settings.tol=Number($('tol').value);invalidateAll();rebuildPredictions();save();render()};
$('chartWindow').value=String(S.settings.chartWindow);$('chartWindow').onchange=()=>{S.settings.chartWindow=Number($('chartWindow').value);save();drawChart()};
for(let n=0;n<=36;n++){const b=document.createElement('button');b.className='num '+col(n);b.textContent=n;b.onpointerdown=()=>{b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),120)};b.onclick=()=>add(n);$('numbers').appendChild(b)}
if(localStorage.getItem(THEME_KEY)==='night'){document.body.classList.add('night');$('theme').textContent='Modo día'}
ensurePredictions();render();
})();
