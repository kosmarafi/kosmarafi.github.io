const RPC="https://mainnet.helius-rpc.com/?api-key=d69a3929-b7b3-4523-8dea-9d82a0bcfd36";
const H={"content-type":"application/json",origin:"https://kosmarafi.github.io"};
const call=async(m,p)=>{for(let i=0;i<8;i++){const r=await fetch(RPC,{method:"POST",headers:H,body:JSON.stringify({jsonrpc:"2.0",id:1,method:m,params:p})});if(r.status===429){await new Promise(z=>setTimeout(z,1200));continue}return (await r.json()).result}};
const AUTO="EyTd3kbpSmRKyJ9nuujZpzPRUGX7P36dftrWm7he8B8c",DEL="BTx1hsRXg4EL1MzATNtWZcuVcnnBK9PNVUaYfAjXrbSY";
const sigs=await call("getSignaturesForAddress",[AUTO,{limit:1000}]);console.log("n sigs",sigs.length);
const pick=[sigs[sigs.length-1],sigs[0]];
for(const s of pick){const t=await call("getTransaction",[s.signature,{encoding:"jsonParsed",maxSupportedTransactionVersion:0}]);
 console.log("== tx",s.signature.slice(0,10),"err",JSON.stringify(t.meta.err));
 for(const k of t.transaction.message.accountKeys)console.log("  key",k.pubkey,k.signer?"SIGNER":"",k.writable?"w":"");
 for(const ix of t.transaction.message.instructions){console.log("  ix",ix.programId, ix.parsed?JSON.stringify(ix.parsed).slice(0,300):("data "+ix.data+" accs "+(ix.accounts||[]).join(",")))}
 for(const g of (t.meta.innerInstructions||[]))for(const ix of g.instructions){console.log("   inner",ix.programId.slice(0,6),ix.parsed?JSON.stringify(ix.parsed).slice(0,250):("accs "+(ix.accounts||[]).map(a=>a.slice(0,6)).join(",")))}
 console.log("  logs",JSON.stringify(t.meta.logMessages).slice(0,1200));
}
const di=await call("getAccountInfo",[DEL,{encoding:"base64"}]);console.log("delegate acct",JSON.stringify(di&&di.value&&{owner:di.value.owner,lamports:di.value.lamports}));
const ds=await call("getSignaturesForAddress",[DEL,{limit:5}]);console.log("delegate sigs",ds&&ds.length);
