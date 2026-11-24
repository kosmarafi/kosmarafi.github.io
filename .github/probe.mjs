import { chromium } from "playwright";
const owners=["2tGNCBysAWdyLCtSxyiNPMuLHcxAd9BN5xVWYEDBwHEz","AhXkpxcNzpo5u8dS4ZHibm3tG39AofBELyRr8ossTG6a","Eqoc4DrRBnhx3oC2yq4X9vrSCj939B6Sw8Jp25iJkZ2W","3bnGGsmijMEQQYAZ5WtKMbSe6v8icPsucLGuVAX2TvaJ","EDsUBSnJv8Mi8kf74u9Buh8nxSBUY21qRquTm63nXZFZ"];
const b=await chromium.launch();const pg=await b.newPage();const errs=[];pg.on("pageerror",e=>errs.push(e.message));
await pg.goto("https://kosmarafi.github.io/?t="+Date.now(),{waitUntil:"networkidle"});
const out=await pg.evaluate(async(owners)=>{
 const L=[];const log=(...a)=>L.push(a.join(" "));
 try{await import("./sdk/kz-met.js?v="+Date.now())}catch(e){log("IMPORTERR",e.message);return L}
 const K=window.kzMet,RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";log("met",K&&K.version,"rpc",RPC.slice(0,40));
 const sim=async(b)=>{let bin="";const u=new Uint8Array(b);for(let i=0;i<u.length;i++)bin+=String.fromCharCode(u[i]);const rr=await fetch(RPC,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"simulateTransaction",params:[btoa(bin),{encoding:"base64",sigVerify:false,replaceRecentBlockhash:true}]})});const r=(await rr.json()).result;const v=r&&r.value;return v&&v.err?"ERR "+JSON.stringify(v.err)+" "+(v.logs||[]).filter(l=>/rror|failed/.test(l)).slice(-2).join(" · ").slice(0,200):"OK"};
 let done=0;
 for(const o of owners){if(done>=2)break;let P;try{P=await K.positions({rpc:RPC,owner:o})}catch(e){log("POSERR",String(e.message).slice(0,200));continue}
  if(!P.length){log("NOPOS",o);continue}
  for(const p of P.slice(0,1)){done++;log("POS",p.pair,"fee",p.fee,"bins",p.lowerBin,p.upperBin,"price",p.price.toPrecision(6),"rango",p.lo.toPrecision(5),"-",p.hi.toPrecision(5),"A",p.amtA.toFixed(5),p.symA,"B",p.amtB.toFixed(5),p.symB,"usd",p.usd.toFixed(2),"pend",p.pend.toFixed(4));
   for(const k of ["harv","dec","close","inc"]){try{const r=await K.buildManage({rpc:RPC,owner:o,pool:p.pool,position:p.mint,kind:k,pct:50,amountA:0.000001,amountB:0.000001});const res=[];for(const x of r.txs)res.push(await sim(x));log("  SIM",k,r.txs.length+" tx",res.join(" | "))}catch(e){log("  BUILDERR",k,String(e.message).slice(0,200))}}
   try{const r=await K.buildOpen({rpc:RPC,owner:o,pool:p.pool,lower:p.price*0.97,upper:p.price*1.03,amountA:0.000001,amountB:0.000001,slipBps:100});log("  OPEN",r.txs.length+" tx bins",r.lowerBin,r.upperBin,"sim",await sim(r.txs[0]))}catch(e){log("  OPENERR",String(e.message).slice(0,200))}
 }}
 return L},owners);
out.forEach(l=>console.log(l));console.log("ERRS",JSON.stringify(errs).slice(0,400));await b.close();
