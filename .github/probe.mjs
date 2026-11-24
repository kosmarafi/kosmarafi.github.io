const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<10;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1500));continue}return (await r.json()).result}};
const sigs=await call("getSignaturesForAddress",["at1s2AR2Ury6CFpXqpd4r6EpUPKiZ5uKBg8xWZaYDWu",{limit:250}]);
let n=0,below=0,cache={};
for(const s of sigs){if(s.err)continue;const t=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);if(!t)continue;
 const ixs=t.transaction.message.instructions;const pre=ixs.find(i=>i.programId==="wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"&&i.accounts&&i.accounts.length>8);if(!pre)continue;
 if(!(t.meta.logMessages||[]).some(l=>l.includes("HarvestSwapAndReinvestPre")))continue;
 // automation = la cuenta propiedad del programa entre las del ix
 let auto=null,ad=null;for(const a of pre.accounts.slice(0,6)){if(cache[a]===undefined){const ai=await call("getAccountInfo",[a,{encoding:"base64"}]);cache[a]=ai&&ai.value&&ai.value.owner==="wpAutoU2kNC95CB9SzvSRmhC52ncPabVY225e3pfQA8"?Buffer.from(ai.value.data[0],"base64"):null}if(cache[a]){auto=a;ad=cache[a];break}}
 if(!ad)continue;
 // condiciones desde el byte 98: [1 ts i64 opt(1+u32)] [2 thrA] [3 thrB]
 let o=98,thr={};while(o<290&&ad[o]){const k=ad[o];if(k===1){o+=9;o+=ad[o]===1?5:1}else if(k===2||k===3){thr[k]=ad.readBigUInt64LE(o+1);o+=9}else break}
 const mA=ad.subarray(368,400),mB=ad.subarray(400,432);
 const bs=require=null;
 const inner=[];for(const g of t.meta.innerInstructions||[])for(const ix of g.instructions)if(ix.parsed&&ix.parsed.type==="transferChecked")inner.push(ix.parsed.info);
 // las dos primeras transferencias son el cobro de comisiones (A y B)
 const first={};for(const x of inner){if(!(x.mint in first))first[x.mint]=BigInt(x.tokenAmount.amount);if(Object.keys(first).length>=2)break}
 const vals=Object.entries(first);n++;
 const okA=thr[2]===undefined||vals.some(([m,v])=>v>=thr[2]),line=vals.map(([m,v])=>m.slice(0,4)+":"+v).join(" ")+" thrA "+thr[2]+" thrB "+thr[3];
 // comparar por orden: primera transferencia = A
 const vA=vals[0]?vals[0][1]:0n,vB=vals[1]?vals[1][1]:0n;const bA=thr[2]!==undefined&&vA<thr[2],bB=thr[3]!==undefined&&vB<thr[3];
 if(bA||bB){below++;console.log("BELOW",s.signature.slice(0,8),line,"A<thr",bA,"B<thr",bB)}
 if(n>=120)break}
console.log("ejecuciones analizadas",n,"con algún token bajo el mínimo",below);
