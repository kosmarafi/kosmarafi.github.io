await import("../evm-pos.js");
const K=globalThis.kzEvmPos;
async function findOwner(chain,npm,want){
 const r=await K._calls(chain,[[npm,"0x18160ddd"]]);const tot=BigInt(r[0]);const out=[];
 for(let k=1;k<300&&out.length<want;k+=5){const tb=await K._calls(chain,[[npm,"0x4f6ccce7"+(tot-BigInt(k)).toString(16).padStart(64,"0")]]);if(!tb[0])continue;const tid=BigInt(tb[0]);
  const [pos,own]=await K._calls(chain,[[npm,"0x99fbab88"+tid.toString(16).padStart(64,"0")],[npm,"0x6352211e"+tid.toString(16).padStart(64,"0")]]);
  if(!pos||!own)continue;const liq=BigInt("0x"+pos.slice(2+64*7,2+64*8));if(liq>0n){const o="0x"+own.slice(-40);const code=await fetch(K.CH[chain].rpc[0],{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_getCode",params:[o,"latest"]})}).then(r=>r.json());if(code.result==="0x"&&!out.includes(o))out.push(o)}}
 return out}
const sim=async(chain,from,tx,bal)=>{const ov={};if(bal)ov[from]={balance:"0x"+(10n**21n).toString(16)};const r=await fetch(K.CH[chain].rpc[0],{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_call",params:[{from,to:tx.to,data:tx.data,value:tx.value},"latest",ov]})});const j=await r.json();return j.error?"ERROR "+(j.error.message||"").slice(0,120):"OK"};
for(const d of K.DEX.filter(d=>["BASE","ARB","OP"].includes(d.chain)||d.k==="sushi")){
 let owners=[];try{owners=await findOwner(d.chain,d.npm,1)}catch(e){console.log("ERRfind",d.chain,d.k,e.message);continue}
 for(const o of owners){const P=(await K.positions(o)).filter(p=>p.npm===d.npm).slice(0,1);
  for(const p of P){console.log("POS",p.chainName,p.dex,p.pair,p.fee+"%","price",p.price.toPrecision(6),"rango",p.lo.toPrecision(5),"-",p.hi.toPrecision(5),"usd",p.usd.toFixed(2),"pend",p.pend.toFixed(3));
   for(const [n,tx] of [["harv",K.txHarvest(p,o)],["dec50",K.txDecrease(p,o,50,100)],["close",K.txClose(p,o,100)]])console.log("  SIM",n,await sim(p.chain,o,tx))}}
 if(!owners.length)console.log("NOOWNER",d.chain,d.k)}
// crear posición: info de pools y simulación de mint (se espera STF por falta de saldo/permiso, o OK si paga todo en nativo)
for(const [c,pool] of [["BASE","0x80891885537e20e240987385490017fc03d9d7ed"],["BASE","0x2db44af24dab2578e448aa2c6402c1bea52d0066"],["OP","0x478946bcd4a5a22b316470f5486fafb928c0ba25"],["ARB","0xc6962004f452be9203591991d15f6b388e09e8d0"],["BSC","0x172fcd41e0913e95784454622d1c3724f546f849"]]){
 const I=await K.poolInfo(c,pool);if(!I){console.log("INFO",c,pool,"no compatible");continue}
 console.log("INFO",c,I.dex,I.symA+"/"+I.symB,"fee",I.fee,"ts",I.ts,"price",I.price.toPrecision(6),"pxA",I.pxA.toFixed(4),"pxB",I.pxB.toFixed(4),"slip",I.slip);
 const t=K.ticks(I,I.price*0.95,I.price*1.05),sp=K.split(I,t.tl,t.tu);console.log("  ticks",t.tl,t.tu,"split A",sp.a.toFixed(3),"B",sp.b.toFixed(3));
 const who="0x000000000000000000000000000000000000dEaD";
 const a=10/I.pxA*sp.a,b=10/I.pxB*sp.b;const tx=K.txMint(I,who,t.tl,t.tu,a,b,100);console.log("  MINT sim",await sim(c,who,tx,true),"need",tx.need.length,"value",tx.value);
 // solo nativo: rango por debajo/encima para depositar un único token
 const nat=I.mA===I.wnative?"A":I.mB===I.wnative?"B":null;if(nat){const lo=nat==="A"?I.price*1.05:I.price*0.8,hi=nat==="A"?I.price*1.3:I.price*0.95;const t2=K.ticks(I,lo,hi);const tx2=K.txMint(I,who,t2.tl,t2.tu,nat==="A"?0.01:0,nat==="B"?0.01:0,100);console.log("  MINT solo nativo",await sim(c,who,tx2,true),"need",tx2.need.length)}}
