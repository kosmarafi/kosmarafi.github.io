const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<6;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1000));continue}return (await r.json()).result}};
const W="8AMfcuNiwoQH8xKiytkujH5JVjiskER8eRTK7XAfhQ21";
const sigs=await call("getSignaturesForAddress",[W,{limit:12}]);
for(const s of sigs){
  const tx=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);
  if(!tx)continue;
  const progs=[...new Set(tx.transaction.message.instructions.map(i=>i.programId))];
  console.log("\n### "+s.signature+" "+new Date(s.blockTime*1000).toISOString()+" err="+JSON.stringify(s.err));
  console.log("signers: "+tx.transaction.message.accountKeys.filter(k=>k.signer).map(k=>k.pubkey).join(", "));
  console.log("programs: "+progs.join(", "));
  const logs=(tx.meta.logMessages||[]).filter(l=>/Instruction:|invoke \[1\]/.test(l));
  console.log(logs.slice(0,25).join("\n"));
  if((tx.meta.logMessages||[]).some(l=>/[Dd]elegat|[Aa]uto|[Cc]ompound|Approve/.test(l))){
    console.log("--- DETALLE");
    tx.transaction.message.instructions.forEach((i,k)=>console.log(k,i.programId,i.parsed?JSON.stringify(i.parsed).slice(0,400):("accounts="+(i.accounts||[]).join(",")+" data="+i.data)));
    (tx.meta.innerInstructions||[]).forEach(g=>g.instructions.forEach(i=>console.log("  inner",g.index,i.programId,i.parsed?JSON.stringify(i.parsed).slice(0,300):("data="+i.data))));
    console.log((tx.meta.logMessages||[]).join("\n").slice(0,3000));
  }
}
