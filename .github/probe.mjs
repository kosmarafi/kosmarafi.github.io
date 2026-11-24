import { id } from "ethers";
await import("../evm-pos.js");
const K=globalThis.kzEvmPos;
// selectores
const sigs={balanceOf:"balanceOf(address)",tokenOfOwnerByIndex:"tokenOfOwnerByIndex(address,uint256)",positions:"positions(uint256)",factory:"factory()",getPool:"getPool(address,address,uint24)",slot0:"slot0()",decimals:"decimals()",symbol:"symbol()",collect:"collect((uint256,address,uint128,uint128))",decrease:"decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))",increase:"increaseLiquidity((uint256,uint256,uint256,uint256,uint256,uint256))",burn:"burn(uint256)",unwrap:"unwrapWETH9(uint256,address)",sweep:"sweepToken(address,uint256,address)",weth:"WETH9()",refund:"refundETH()",allowance:"allowance(address,address)",approve:"approve(address,uint256)",multicall:"multicall(bytes[])"};
for(const [k,s] of Object.entries(sigs))console.log("SEL",k,id(s).slice(0,10));
const hex=s=>s;
async function findOwner(chain,npm,want){
 const r=await K._calls(chain,[[npm,"0x18160ddd"]]);const tot=BigInt(r[0]);const out=[];
 for(let k=1;k<400&&out.length<want;k+=7){const tb=await K._calls(chain,[[npm,"0x4f6ccce7"+(tot-BigInt(k)).toString(16).padStart(64,"0")]]);const tid=BigInt(tb[0]||"0x0");
  const [pos,own]=await K._calls(chain,[[npm,"0x99fbab88"+tid.toString(16).padStart(64,"0")],[npm,"0x6352211e"+tid.toString(16).padStart(64,"0")]]);
  if(!pos||!own)continue;const liq=BigInt("0x"+pos.slice(2+64*7,2+64*8));if(liq>0n){const o="0x"+own.slice(-40);if(!out.includes(o))out.push(o)}}
 return out}
for(const d of K.DEX){
 const owners=await findOwner(d.chain,d.npm,2);console.log("\n==",d.chain,d.name,"owners",owners.join(","));
 for(const o of owners){
  const P=(await K.positions(o)).filter(p=>p.npm===d.npm);
  for(const p of P.slice(0,2)){
   console.log("POS",p.chainName,p.dex,p.pair,p.fee+"%","id",p.tokenId,"price",p.price.toPrecision(6),"rango",p.lo.toPrecision(6),"-",p.hi.toPrecision(6),"A",p.amtA.toFixed(6),p.symA,"B",p.amtB.toFixed(6),p.symB,"usd",p.usd.toFixed(2),"pend",p.pend.toFixed(4));
   for(const [n,tx] of [["harv",K.txHarvest(p,o)],["dec50",K.txDecrease(p,o,50,100)],["close",K.txClose(p,o,100)]]){
    const r=await fetch(K.CH[p.chain].rpc[0],{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_call",params:[{from:o,to:tx.to,data:tx.data,value:tx.value},"latest"]})});const j=await r.json();
    console.log("  SIM",n,j.error?"ERROR "+JSON.stringify(j.error).slice(0,200):"OK")}
  }
  if(P.errors)console.log("errors",P.errors)}
}
