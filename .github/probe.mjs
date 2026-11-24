globalThis.window=globalThis;
const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
// Connection de web3 con cabecera origin
const W=await import("@solana/web3.js");const Orig=W.Connection;
await import("./src/met.js");const K=globalThis.kzMet;
// buscar dueños recientes de posiciones (firmantes de AddLiquidity en DLMM)
const sigs=await call("getSignaturesForAddress",["LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo",{limit:120}]);const owners=[];
for(const s of sigs){if(s.err||owners.length>=4)continue;const t=await call("getTransaction",[s.signature,{encoding:"json",maxSupportedTransactionVersion:0}]);if(!t)continue;if((t.meta.logMessages||[]).some(l=>/AddLiquidity/.test(l))){const o=t.transaction.message.accountKeys[0];if(!owners.includes(o))owners.push(o)}}
console.log("owners",owners.join(","));
const sim=async(b)=>{const r=await call("simulateTransaction",[Buffer.from(b).toString("base64"),{encoding:"base64",sigVerify:false,replaceRecentBlockhash:true}]);return r&&r.value&&r.value.err?"ERR "+JSON.stringify(r.value.err)+" "+(r.value.logs||[]).filter(l=>/rror|failed/.test(l)).slice(-2).join(" · ").slice(0,200):"OK"};
let done=0;
for(const o of owners){if(done>=2)break;let P;try{P=await K.positions({rpc:RPC,owner:o})}catch(e){console.log("POSERR",e.message.slice(0,200));continue}
 for(const p of P.slice(0,1)){done++;console.log("POS",p.pair,"fee",p.fee,"bins",p.lowerBin,p.upperBin,"price",p.price.toPrecision(6),"rango",p.lo.toPrecision(5),"-",p.hi.toPrecision(5),"A",p.amtA.toFixed(5),p.symA,"B",p.amtB.toFixed(5),p.symB,"usd",p.usd.toFixed(2),"pend",p.pend.toFixed(4));
  for(const k of ["harv","dec","close"]){try{const r=await K.buildManage({rpc:RPC,owner:o,pool:p.pool,position:p.mint,kind:k,pct:50});const res=[];for(const b of r.txs)res.push(await sim(b));console.log("  SIM",k,r.txs.length+" tx",res.join(" | "))}catch(e){console.log("  BUILDERR",k,e.message.slice(0,200))}}
  try{const r=await K.buildOpen({rpc:RPC,owner:o,pool:p.pool,lower:p.price*0.97,upper:p.price*1.03,amountA:p.amtA*0.001,amountB:p.amtB*0.001,slipBps:100});console.log("  OPEN",r.txs.length+" tx bins",r.lowerBin,r.upperBin,"sim",await sim(r.txs[0]))}catch(e){console.log("  OPENERR",e.message.slice(0,200))}
 }}
